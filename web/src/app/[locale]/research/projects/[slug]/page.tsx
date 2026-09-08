import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { RichText } from "@/components/ui/rich-text";
import { getEntryBySlug, getStrapiMediaUrl } from "@/lib/strapi";
import { projectLevelLabels, getLabel } from "@/lib/labels";
import { getField } from "@/lib/fields-data";
import type { Project } from "@/lib/types";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = (await getLocale()) as "vi" | "en";
  const t = await getTranslations("research");
  const common = await getTranslations("common");

  const project = await getEntryBySlug<Project>("projects", slug, {
    locale,
    query: "populate=coverImage",
  }).catch(() => null);

  if (!project) {
    notFound();
  }

  const coverUrl = getStrapiMediaUrl(project.coverImage);
  const field = project.field ? getField(project.field) : null;

  const infoRows: [string, string | null][] = [
    [common("leadResearcher"), project.leadResearcher],
    [common("hostInstitution"), project.hostInstitution],
    [common("partnerInstitutions"), project.partnerInstitutions],
    [
      common("period"),
      project.startDate || project.endDate
        ? `${project.startDate ?? "?"} – ${project.endDate ?? "?"}`
        : null,
    ],
    [common("budget"), project.budget],
    [common("location"), project.location],
  ];

  return (
    <Container className="py-16">
      <Link
        href="/research"
        className="text-sm font-medium text-primary-600 hover:underline"
      >
        ← {t("backToResearch")}
      </Link>

      {coverUrl ? (
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-200">
          <Image
            src={coverUrl}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
          {getLabel(projectLevelLabels, project.level, locale)}
        </span>
        {field ? (
          <Link
            href={`/fields/${field.slug}`}
            className="inline-block rounded-full bg-secondary-500/10 px-3 py-1 text-xs font-semibold text-secondary-600"
          >
            {field.icon} {field.title[locale]}
          </Link>
        ) : null}
      </div>

      <h1 className="mt-3 text-2xl font-bold text-neutral-900 sm:text-3xl">
        {project.title}
      </h1>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        {infoRows
          .filter(([, value]) => Boolean(value))
          .map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                {label}
              </dt>
              <dd className="mt-1 text-neutral-800">{value}</dd>
            </div>
          ))}
      </dl>

      {project.objective ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">
            {common("objective")}
          </h2>
          <div className="mt-2">
            <RichText content={project.objective} />
          </div>
        </div>
      ) : null}

      {project.result ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">
            {common("result")}
          </h2>
          <div className="mt-2">
            <RichText content={project.result} />
          </div>
        </div>
      ) : null}
    </Container>
  );
}
