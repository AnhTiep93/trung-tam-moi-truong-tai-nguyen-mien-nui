import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getStrapiMediaUrl } from "@/lib/strapi";
import { newsCategoryLabels, getLabel } from "@/lib/labels";
import type { NewsItem } from "@/lib/types";

export function NewsCard({ news }: { news: NewsItem }) {
  const locale = useLocale();
  const imageUrl = getStrapiMediaUrl(news.coverImage);

  const content = (
    <>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={news.title}
            fill
            sizes="(min-width: 768px) 360px, 90vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="mt-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
          {getLabel(newsCategoryLabels, news.category, locale)}
        </span>
        <h3 className="mt-1 font-semibold text-neutral-900">{news.title}</h3>
        {news.publishedDate ? (
          <p className="mt-1 text-xs text-neutral-500">{news.publishedDate}</p>
        ) : null}
        {news.summary ? (
          <p className="mt-2 text-sm text-neutral-600">{news.summary}</p>
        ) : null}
      </div>
    </>
  );

  if (news.slug) {
    return (
      <Link
        href={`/news/${news.slug}`}
        className="block transition hover:opacity-90"
      >
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}
