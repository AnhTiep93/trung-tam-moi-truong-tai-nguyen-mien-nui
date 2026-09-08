import { getCollection } from "./strapi";
import type {
  Person,
  Project,
  Publication,
  Service,
  NewsItem,
  LibraryDocument,
  TrainingCourse,
  Partner,
  Equipment,
} from "./types";

export interface SearchResult {
  type:
    | "person"
    | "project"
    | "publication"
    | "service"
    | "news"
    | "document"
    | "training"
    | "partner"
    | "equipment";
  title: string;
  description: string | null;
  href: string;
}

const RESULTS_PER_TYPE = 5;

async function searchCollection<T>(
  collection: string,
  field: string,
  query: string,
  locale: string
) {
  try {
    const res = await getCollection<T>(collection, {
      locale,
      query: `filters[${field}][$containsi]=${encodeURIComponent(
        query
      )}&pagination[limit]=${RESULTS_PER_TYPE}`,
    });
    return res.data;
  } catch {
    return [];
  }
}

export async function siteSearch(
  query: string,
  locale: string
): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) return [];

  const [
    people,
    projects,
    publications,
    services,
    news,
    documents,
    courses,
    partners,
    equipment,
  ] = await Promise.all([
    searchCollection<Person>("people", "fullName", query, locale),
    searchCollection<Project>("projects", "title", query, locale),
    searchCollection<Publication>("publications", "title", query, locale),
    searchCollection<Service>("services", "name", query, locale),
    searchCollection<NewsItem>("news-items", "title", query, locale),
    searchCollection<LibraryDocument>("documents", "title", query, locale),
    searchCollection<TrainingCourse>("training-courses", "title", query, locale),
    searchCollection<Partner>("partners", "name", query, locale),
    searchCollection<Equipment>("equipment-items", "name", query, locale),
  ]);

  const results: SearchResult[] = [
    ...people
      .filter((p) => p.slug)
      .map((p) => ({
        type: "person" as const,
        title: p.fullName,
        description: p.position,
        href: `/team/${p.slug}`,
      })),
    ...projects
      .filter((p) => p.slug)
      .map((p) => ({
        type: "project" as const,
        title: p.title,
        description: p.leadResearcher,
        href: `/research/projects/${p.slug}`,
      })),
    ...publications.map((p) => ({
      type: "publication" as const,
      title: p.title,
      description: p.authors,
      href: `/research`,
    })),
    ...services
      .filter((s) => s.slug)
      .map((s) => ({
        type: "service" as const,
        title: s.name,
        description: s.summary,
        href: `/services`,
      })),
    ...news
      .filter((n) => n.slug)
      .map((n) => ({
        type: "news" as const,
        title: n.title,
        description: n.summary,
        href: `/news/${n.slug}`,
      })),
    ...documents.map((d) => ({
      type: "document" as const,
      title: d.title,
      description: d.summary,
      href: `/library`,
    })),
    ...courses
      .filter((c) => c.slug)
      .map((c) => ({
        type: "training" as const,
        title: c.title,
        description: c.summary,
        href: `/training/${c.slug}`,
      })),
    ...partners.map((p) => ({
      type: "partner" as const,
      title: p.name,
      description: p.cooperationContent,
      href: `/partners`,
    })),
    ...equipment.map((e) => ({
      type: "equipment" as const,
      title: e.name,
      description: e.function,
      href: `/facilities`,
    })),
  ];

  return results;
}
