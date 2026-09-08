import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { RichText } from "@/components/ui/rich-text";
import { getEntryBySlug, getStrapiMediaUrl } from "@/lib/strapi";
import { newsCategoryLabels, getLabel } from "@/lib/labels";
import type { NewsItem } from "@/lib/types";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("news");

  const news = await getEntryBySlug<NewsItem>("news-items", slug, {
    locale,
    query: "populate=coverImage",
  }).catch(() => null);

  if (!news) {
    notFound();
  }

  const imageUrl = getStrapiMediaUrl(news.coverImage);

  return (
    <Container className="py-16">
      <Link
        href="/news"
        className="text-sm font-medium text-primary-600 hover:underline"
      >
        ← {t("backToNews")}
      </Link>

      {imageUrl ? (
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-200">
          <Image
            src={imageUrl}
            alt={news.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-wide text-accent-600">
        {getLabel(newsCategoryLabels, news.category, locale)}
      </span>
      <h1 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">
        {news.title}
      </h1>
      {news.publishedDate ? (
        <p className="mt-2 text-sm text-neutral-500">{news.publishedDate}</p>
      ) : null}

      {news.content ? (
        <div className="mt-6">
          <RichText content={news.content} />
        </div>
      ) : news.summary ? (
        <p className="mt-6 text-neutral-700">{news.summary}</p>
      ) : null}
    </Container>
  );
}
