import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { RichText } from "@/components/ui/rich-text";
import { getEntryBySlug, getStrapiMediaUrl } from "@/lib/strapi";
import { personGroupLabels, getLabel } from "@/lib/labels";
import type { Person } from "@/lib/types";

export default async function PersonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("team");

  const person = await getEntryBySlug<Person>("people", slug, {
    locale,
    query: "populate=photo",
  }).catch(() => null);

  if (!person) {
    notFound();
  }

  const photoUrl = getStrapiMediaUrl(person.photo);

  return (
    <Container className="py-16">
      <Link
        href="/team"
        className="text-sm font-medium text-primary-600 hover:underline"
      >
        ← {t("backToTeam")}
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-[240px_1fr]">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-200">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={person.fullName}
              fill
              sizes="240px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-neutral-400">
              {person.fullName.charAt(0)}
            </div>
          )}
        </div>

        <div>
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
            {getLabel(personGroupLabels, person.group, locale)}
          </span>
          <h1 className="mt-3 text-2xl font-bold text-neutral-900">
            {person.academicTitle ? `${person.academicTitle} ` : ""}
            {person.fullName}
          </h1>
          {person.position ? (
            <p className="mt-1 text-neutral-600">{person.position}</p>
          ) : null}

          <dl className="mt-6 space-y-3 text-sm">
            {person.specialization ? (
              <div>
                <dt className="font-semibold text-neutral-800">
                  {(await getTranslations("common"))("specialization")}
                </dt>
                <dd className="text-neutral-600">{person.specialization}</dd>
              </div>
            ) : null}
            {person.researchFields ? (
              <div>
                <dt className="font-semibold text-neutral-800">
                  {(await getTranslations("common"))("researchFields")}
                </dt>
                <dd className="text-neutral-600">{person.researchFields}</dd>
              </div>
            ) : null}
            {person.email ? (
              <div>
                <dt className="font-semibold text-neutral-800">
                  {t("detail.email")}
                </dt>
                <dd>
                  <a
                    href={`mailto:${person.email}`}
                    className="text-primary-600 hover:underline"
                  >
                    {person.email}
                  </a>
                </dd>
              </div>
            ) : null}
            {person.orcid ? (
              <div>
                <dt className="font-semibold text-neutral-800">
                  {t("detail.orcid")}
                </dt>
                <dd className="text-neutral-600">{person.orcid}</dd>
              </div>
            ) : null}
            {person.googleScholar ? (
              <div>
                <dt className="font-semibold text-neutral-800">
                  {t("detail.googleScholar")}
                </dt>
                <dd>
                  <a
                    href={person.googleScholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    {person.googleScholar}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>

      {person.bio ? (
        <div className="mt-10">
          <RichText content={person.bio} />
        </div>
      ) : null}
    </Container>
  );
}
