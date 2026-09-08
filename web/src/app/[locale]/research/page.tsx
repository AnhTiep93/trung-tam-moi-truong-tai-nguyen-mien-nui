import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { getCollection } from "@/lib/strapi";
import { projectLevelLabels, publicationTypeLabels, getLabel } from "@/lib/labels";
import type { Project, ProjectLevel, Publication } from "@/lib/types";

const LEVELS: ProjectLevel[] = [
  "nha-nuoc",
  "bo",
  "tinh",
  "dai-hoc",
  "quoc-te",
  "doanh-nghiep",
];

export async function generateMetadata() {
  const t = await getTranslations("research");
  return { title: t("title") };
}

export default async function ResearchPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const { level } = await searchParams;
  const locale = await getLocale();
  const t = await getTranslations("research");
  const common = await getTranslations("common");

  const query = level ? `filters[level][$eq]=${level}&sort=id:desc` : "sort=id:desc";

  const [projectsRes, publicationsRes] = await Promise.all([
    getCollection<Project>("projects", { locale, query }).catch(() => null),
    getCollection<Publication>("publications", {
      locale,
      query: "sort=year:desc",
    }).catch(() => null),
  ]);

  return (
    <Container className="py-16">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-neutral-900">
          {t("tabProjects")}
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/research"
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              !level
                ? "bg-primary-500 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {common("allLevels")}
          </Link>
          {LEVELS.map((lvl) => (
            <Link
              key={lvl}
              href={`/research?level=${lvl}`}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                level === lvl
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {getLabel(projectLevelLabels, lvl, locale)}
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectsRes && projectsRes.data.length > 0 ? (
            projectsRes.data.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="text-neutral-500">{common("noData")}</p>
          )}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-lg font-semibold text-neutral-900">
          {t("tabPublications")}
        </h2>

        <div className="mt-6 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
          {publicationsRes && publicationsRes.data.length > 0 ? (
            publicationsRes.data.map((publication) => (
              <div key={publication.id} className="p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-secondary-600">
                  {getLabel(publicationTypeLabels, publication.type, locale)}
                  {publication.year ? ` · ${publication.year}` : ""}
                </span>
                <p className="mt-1 font-medium text-neutral-900">
                  {publication.title}
                </p>
                {publication.authors ? (
                  <p className="mt-1 text-sm text-neutral-600">
                    {publication.authors}
                  </p>
                ) : null}
              </div>
            ))
          ) : (
            <p className="p-4 text-neutral-500">{common("noData")}</p>
          )}
        </div>
      </div>
    </Container>
  );
}
