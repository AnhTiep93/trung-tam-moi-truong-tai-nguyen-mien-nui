import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCollection, getStrapiMediaUrl } from "@/lib/strapi";
import { mediaAlbumCategoryLabels, getLabel } from "@/lib/labels";
import type { MediaAlbum, MediaAlbumCategory } from "@/lib/types";

const CATEGORIES: MediaAlbumCategory[] = [
  "khao-sat-thuc-dia",
  "hoi-thao",
  "nghien-cuu",
  "dao-tao",
  "lam-viec-dia-phuong",
  "hop-tac-quoc-te",
];

export async function generateMetadata() {
  const t = await getTranslations("gallery");
  return { title: t("title") };
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const locale = await getLocale();
  const t = await getTranslations("gallery");
  const common = await getTranslations("common");

  const query = category
    ? `filters[category][$eq]=${category}&sort=publishedDate:desc&populate=coverImage`
    : "sort=publishedDate:desc&populate=coverImage";

  const albumsRes = await getCollection<MediaAlbum>("media-albums", {
    locale,
    query,
  }).catch(() => null);

  const albums = albumsRes?.data ?? [];

  return (
    <Container className="py-16">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/gallery"
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            !category
              ? "bg-primary-500 text-white"
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          }`}
        >
          {t("filterAll")}
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/gallery?category=${cat}`}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              category === cat
                ? "bg-primary-500 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {getLabel(mediaAlbumCategoryLabels, cat, locale)}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {albums.length > 0 ? (
          albums.map((album) => {
            const coverUrl = getStrapiMediaUrl(album.coverImage);
            return (
              <Link
                key={album.id}
                href={`/gallery/${album.slug}`}
                className="block overflow-hidden rounded-lg border border-neutral-200 bg-white transition hover:border-primary-400 hover:shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full bg-neutral-200">
                  {coverUrl ? (
                    <Image
                      src={coverUrl}
                      alt={album.title}
                      fill
                      sizes="(min-width: 768px) 360px, 90vw"
                      className="object-cover"
                    />
                  ) : null}
                  {album.videoUrl ? (
                    <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-white">
                      {t("video")}
                    </span>
                  ) : null}
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
                    {getLabel(mediaAlbumCategoryLabels, album.category, locale)}
                  </span>
                  <p className="mt-1 font-medium text-neutral-900">
                    {album.title}
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-neutral-500">{common("noData")}</p>
        )}
      </div>
    </Container>
  );
}
