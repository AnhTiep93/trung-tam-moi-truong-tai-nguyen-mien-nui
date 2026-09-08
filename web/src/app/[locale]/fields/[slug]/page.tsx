import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/cards/project-card";
import { ServiceCard } from "@/components/cards/service-card";
import { getField, fields } from "@/lib/fields-data";
import { getCollection } from "@/lib/strapi";
import type { Project, Service } from "@/lib/types";

export function generateStaticParams() {
  return fields.map((field) => ({ slug: field.slug }));
}

export default async function FieldDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = (await getLocale()) as "vi" | "en";
  const t = await getTranslations("fields");

  const field = getField(slug);
  if (!field) {
    notFound();
  }

  const [projectsRes, servicesRes] = await Promise.all([
    getCollection<Project>("projects", {
      locale,
      query: `filters[field][$eq]=${field.slug}`,
    }).catch(() => null),
    field.relatedServiceGroup
      ? getCollection<Service>("services", {
          locale,
          query: `filters[group][$eq]=${field.relatedServiceGroup}`,
        }).catch(() => null)
      : Promise.resolve(null),
  ]);

  return (
    <Container className="py-16">
      <Link
        href="/fields"
        className="text-sm font-medium text-primary-600 hover:underline"
      >
        ← {t("title")}
      </Link>

      <div className="mt-4 flex items-start gap-4">
        <span className="text-4xl">{field.icon}</span>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            {field.title[locale]}
          </h1>
          <p className="mt-2 max-w-2xl text-neutral-600">
            {field.summary[locale]}
          </p>
        </div>
      </div>

      <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {field.activities[locale].map((activity) => (
          <li
            key={activity}
            className="rounded-md bg-primary-50 px-3 py-2 text-sm text-primary-700"
          >
            {activity}
          </li>
        ))}
      </ul>

      {projectsRes && projectsRes.data.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-900">
            {t("relatedProjects")}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectsRes.data.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ) : null}

      {servicesRes && servicesRes.data.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-900">
            {t("relatedServices")}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicesRes.data.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      ) : null}
    </Container>
  );
}
