import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { NewsCard } from "@/components/cards/news-card";
import { getCollection } from "@/lib/strapi";
import { newsCategoryLabels, getLabel } from "@/lib/labels";
import type { NewsItem, NewsCategory } from "@/lib/types";

const CATEGORIES: NewsCategory[] = [
  "hoat-dong-trung-tam",
  "nghien-cuu-khoa-hoc",
  "hoi-thao",
  "dao-tao",
  "chuyen-giao-cong-nghe",
  "hop-tac-quoc-te",
  "thuc-dia",
  "tuyen-dung",
  "thong-bao",
];

export async function generateMetadata() {
  const t = await getTranslations("news");
  return { title: t("title") };
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const locale = await getLocale();
  const t = await getTranslations("news");
  const common = await getTranslations("common");

  const query = category
    ? `filters[category][$eq]=${category}&sort=publishedDate:desc`
    : "sort=publishedDate:desc";

  const newsRes = await getCollection<NewsItem>("news-items", {
    locale,
    query,
  }).catch(() => null);

  const news = newsRes?.data ?? [];

  return (
    <Container className="py-16">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/news"
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
            href={`/news?category=${cat}`}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              category === cat
                ? "bg-primary-500 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {getLabel(newsCategoryLabels, cat, locale)}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.length > 0 ? (
          news.map((item) => <NewsCard key={item.id} news={item} />)
        ) : (
          <p className="text-neutral-500">{common("noData")}</p>
        )}
      </div>
    </Container>
  );
}
