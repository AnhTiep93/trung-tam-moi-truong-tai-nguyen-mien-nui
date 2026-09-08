import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { fields } from "@/lib/fields-data";

export async function generateMetadata() {
  const t = await getTranslations("fields");
  return { title: t("title") };
}

export default async function FieldsPage() {
  const locale = (await getLocale()) as "vi" | "en";
  const t = await getTranslations("fields");

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <Link
            key={field.slug}
            href={`/fields/${field.slug}`}
            className="rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-primary-400 hover:shadow-sm"
          >
            <span className="text-3xl">{field.icon}</span>
            <h3 className="mt-3 font-semibold text-neutral-900">
              {field.title[locale]}
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              {field.summary[locale]}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
