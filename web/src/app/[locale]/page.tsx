import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { NewsCard } from "@/components/cards/news-card";
import { ServiceCard } from "@/components/cards/service-card";
import { PartnerLogo } from "@/components/cards/partner-logo";
import { fields } from "@/lib/fields-data";
import { getCollection } from "@/lib/strapi";
import type { Project, NewsItem, Service, Partner } from "@/lib/types";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("home");

  const [projectsRes, newsRes, servicesRes, partnersRes] = await Promise.all([
    getCollection<Project>("projects", {
      locale,
      query: "sort=id:desc&pagination[limit]=3",
    }).catch(() => null),
    getCollection<NewsItem>("news-items", {
      locale,
      query: "sort=publishedDate:desc&pagination[limit]=3",
    }).catch(() => null),
    getCollection<Service>("services", {
      locale,
      query: "sort=order:asc&pagination[limit]=4",
    }).catch(() => null),
    getCollection<Partner>("partners", {
      locale,
      query: "sort=order:asc",
    }).catch(() => null),
  ]);

  return (
    <>
      <section className="bg-gradient-to-b from-primary-700 to-primary-500 text-white">
        <Container className="py-24 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-primary-100">
            {t("hero.eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-primary-50 sm:text-lg">
            {t("hero.slogan")}
          </p>
          <Link
            href="/fields"
            className="mt-8 inline-block rounded-md bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            {t("hero.cta")}
          </Link>
        </Container>
      </section>

      <Container className="py-16">
        <h2 className="text-2xl font-bold text-neutral-900">
          {t("intro.title")}
        </h2>
        <p className="mt-4 max-w-3xl text-neutral-600">{t("intro.body")}</p>
        <p className="mt-4 inline-block rounded-md bg-accent-400/10 px-3 py-1 text-sm text-accent-600">
          {t("intro.placeholderNote")}
        </p>
      </Container>

      <section className="bg-neutral-100 py-16">
        <Container>
          <SectionHeading eyebrow={t("fields.eyebrow")} title={t("fields.title")} />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {fields.map((field) => (
              <Link
                key={field.slug}
                href={`/fields/${field.slug}`}
                className="flex flex-col items-center gap-2 rounded-lg border border-neutral-200 bg-white p-4 text-center transition hover:border-primary-400 hover:shadow-sm"
              >
                <span className="text-3xl">{field.icon}</span>
                <span className="text-sm font-medium text-neutral-800">
                  {field.title[locale as "vi" | "en"]}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {projectsRes && projectsRes.data.length > 0 ? (
        <Container className="py-16">
          <SectionHeading
            eyebrow={t("projects.eyebrow")}
            title={t("projects.title")}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectsRes.data.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      ) : null}

      {newsRes && newsRes.data.length > 0 ? (
        <section className="bg-neutral-100 py-16">
          <Container>
            <SectionHeading eyebrow={t("news.eyebrow")} title={t("news.title")} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {newsRes.data.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {servicesRes && servicesRes.data.length > 0 ? (
        <Container className="py-16">
          <SectionHeading
            eyebrow={t("services.eyebrow")}
            title={t("services.title")}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servicesRes.data.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      ) : null}

      {partnersRes && partnersRes.data.length > 0 ? (
        <section className="bg-neutral-100 py-16">
          <Container>
            <SectionHeading
              eyebrow={t("partners.eyebrow")}
              title={t("partners.title")}
            />
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {partnersRes.data.map((partner) => (
                <PartnerLogo key={partner.id} partner={partner} />
              ))}
            </div>
            <Link
              href="/partners"
              className="mt-6 inline-block text-sm font-medium text-primary-600 hover:underline"
            >
              {t("partners.title")} →
            </Link>
          </Container>
        </section>
      ) : null}

      <section className="bg-primary-700 py-16 text-center text-white">
        <Container>
          <h2 className="text-2xl font-bold">{t("contact.title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-50">
            {t("contact.body")}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            {t("contact.cta")}
          </Link>
        </Container>
      </section>
    </>
  );
}
