import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { siteSearch } from "@/lib/search";

export async function generateMetadata() {
  const t = await getTranslations("search");
  return { title: t("title") };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const locale = await getLocale();
  const t = await getTranslations("search");

  const results = query ? await siteSearch(query, locale) : [];

  return (
    <Container className="py-16">
      <SectionHeading
        title={t("title")}
        description={
          query ? `${t("resultsFor")} "${query}"` : t("promptEmpty")
        }
      />

      <div className="mt-8 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {query && results.length === 0 ? (
          <p className="p-4 text-neutral-500">{t("noResults")}</p>
        ) : null}

        {results.map((result, index) => (
          <Link
            key={`${result.type}-${index}`}
            href={result.href}
            className="block p-4 hover:bg-neutral-50"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-secondary-600">
              {t(`types.${result.type}`)}
            </span>
            <p className="mt-1 font-medium text-neutral-900">
              {result.title}
            </p>
            {result.description ? (
              <p className="mt-1 text-sm text-neutral-600">
                {result.description}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </Container>
  );
}
