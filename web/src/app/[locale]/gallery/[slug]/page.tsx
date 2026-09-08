import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { getEntryBySlug, getStrapiMediaUrl } from "@/lib/strapi";
import { mediaAlbumCategoryLabels, getLabel } from "@/lib/labels";
import { toEmbedUrl } from "@/lib/video";
import type { MediaAlbum } from "@/lib/types";

export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("gallery");

  const album = await getEntryBySlug<MediaAlbum>("media-albums", slug, {
    locale,
    query: "populate[0]=coverImage&populate[1]=images",
  }).catch(() => null);

  if (!album) {
    notFound();
  }

  const embedUrl = album.videoUrl ? toEmbedUrl(album.videoUrl) : null;

  return (
    <Container className="py-16">
      <Link
        href="/gallery"
        className="text-sm font-medium text-primary-600 hover:underline"
      >
        ← {t("backToGallery")}
      </Link>

      <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-wide text-accent-600">
        {getLabel(mediaAlbumCategoryLabels, album.category, locale)}
      </span>
      <h1 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">
        {album.title}
      </h1>

      {embedUrl ? (
        <div className="mt-6 aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            src={embedUrl}
            title={album.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : album.videoUrl ? (
        <a
          href={album.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-primary-600 hover:underline"
        >
          {t("video")} →
        </a>
      ) : null}

      {album.images && album.images.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {album.images.map((image, index) => {
            const url = getStrapiMediaUrl(image);
            if (!url) return null;
            return (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg bg-neutral-200"
              >
                <Image
                  src={url}
                  alt={image.alternativeText || album.title}
                  fill
                  sizes="(min-width: 1024px) 240px, 45vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </Container>
  );
}
