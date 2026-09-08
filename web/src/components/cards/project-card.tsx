import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projectLevelLabels, getLabel } from "@/lib/labels";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale();
  const t = useTranslations("common");

  const inner = (
    <>
      <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
        {getLabel(projectLevelLabels, project.level, locale)}
      </span>
      <h3 className="mt-3 font-semibold text-neutral-900">{project.title}</h3>
      {project.leadResearcher ? (
        <p className="mt-2 text-sm text-neutral-600">
          {t("leadResearcher")}: {project.leadResearcher}
        </p>
      ) : null}
    </>
  );

  if (project.slug) {
    return (
      <Link
        href={`/research/projects/${project.slug}`}
        className="block rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-primary-400 hover:shadow-sm"
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      {inner}
    </div>
  );
}
