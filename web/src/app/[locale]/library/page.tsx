import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCollection, getStrapiMediaUrl } from "@/lib/strapi";
import { documentCategoryLabels, getLabel } from "@/lib/labels";
import type { LibraryDocument, DocumentCategory } from "@/lib/types";

const CATEGORIES: DocumentCategory[] = [
  "van-ban-phap-luat",
  "tieu-chuan-quy-chuan",
  "tai-lieu-gis",
  "tai-lieu-moi-truong",
  "tai-lieu-dat-dai",
  "tai-lieu-quy-hoach",
  "bao-cao-nghien-cuu",
];

export async function generateMetadata() {
  const t = await getTranslations("library");
  return { title: t("title") };
}

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const locale = await getLocale();
  const t = await getTranslations("library");
  const common = await getTranslations("common");

  const query = category
    ? `filters[category][$eq]=${category}&sort=publishedDate:desc&populate=file`
    : "sort=publishedDate:desc&populate=file";

  const documentsRes = await getCollection<LibraryDocument>("documents", {
    locale,
    query,
  }).catch(() => null);

  const documents = documentsRes?.data ?? [];

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/library"
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
            href={`/library?category=${cat}`}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              category === cat
                ? "bg-primary-500 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {getLabel(documentCategoryLabels, cat, locale)}
          </Link>
        ))}
      </div>

      <div className="mt-8 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {documents.length > 0 ? (
          documents.map((doc) => {
            const fileUrl = getStrapiMediaUrl(doc.file);
            return (
              <div
                key={doc.id}
                className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-secondary-600">
                    {getLabel(documentCategoryLabels, doc.category, locale)}
                  </span>
                  <p className="mt-1 font-medium text-neutral-900">
                    {doc.title}
                  </p>
                  {doc.summary ? (
                    <p className="mt-1 text-sm text-neutral-600">
                      {doc.summary}
                    </p>
                  ) : null}
                </div>
                {fileUrl ? (
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-md bg-primary-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary-600"
                  >
                    {t("download")}
                  </a>
                ) : null}
              </div>
            );
          })
        ) : (
          <p className="p-4 text-neutral-500">{common("noData")}</p>
        )}
      </div>
    </Container>
  );
}
