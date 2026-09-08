import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCollection } from "@/lib/strapi";
import type {
  Person,
  Project,
  NewsItem,
  MediaAlbum,
  TrainingCourse,
} from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const STATIC_PATHS = [
  "",
  "/about",
  "/team",
  "/fields",
  "/research",
  "/services",
  "/webgis",
  "/training",
  "/news",
  "/library",
  "/gallery",
  "/partners",
  "/facilities",
  "/contact",
];

async function getSlugs<T extends { slug: string | null }>(
  collection: string
): Promise<string[]> {
  try {
    const res = await getCollection<T>(collection, {
      query: "pagination[limit]=200",
      revalidate: 3600,
    });
    return res.data.map((item) => item.slug).filter((slug): slug is string => Boolean(slug));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [people, projects, news, albums, courses] = await Promise.all([
    getSlugs<Person>("people"),
    getSlugs<Project>("projects"),
    getSlugs<NewsItem>("news-items"),
    getSlugs<MediaAlbum>("media-albums"),
    getSlugs<TrainingCourse>("training-courses"),
  ]);

  const dynamicPaths = [
    ...people.map((slug) => `/team/${slug}`),
    ...projects.map((slug) => `/research/projects/${slug}`),
    ...news.map((slug) => `/news/${slug}`),
    ...albums.map((slug) => `/gallery/${slug}`),
    ...courses.map((slug) => `/training/${slug}`),
  ];

  const allPaths = [...STATIC_PATHS, ...dynamicPaths];

  return allPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
    }))
  );
}
