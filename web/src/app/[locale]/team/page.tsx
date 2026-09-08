import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PersonCard } from "@/components/cards/person-card";
import { getCollection } from "@/lib/strapi";
import { personGroupLabels, getLabel } from "@/lib/labels";
import type { Person, PersonGroup } from "@/lib/types";

const GROUP_ORDER: PersonGroup[] = [
  "ban-giam-doc",
  "nha-khoa-hoc",
  "nghien-cuu-vien",
  "ky-thuat-vien",
  "cong-tac-vien",
];

export async function generateMetadata() {
  const t = await getTranslations("team");
  return { title: t("title") };
}

export default async function TeamPage() {
  const locale = await getLocale();
  const t = await getTranslations("team");

  const peopleRes = await getCollection<Person>("people", {
    locale,
    query: "sort=order:asc&populate=photo",
  }).catch(() => null);

  const people = peopleRes?.data ?? [];

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      {people.length === 0 ? (
        <p className="mt-8 text-neutral-500">
          {(await getTranslations("common"))("noData")}
        </p>
      ) : (
        GROUP_ORDER.map((group) => {
          const groupPeople = people.filter((p) => p.group === group);
          if (groupPeople.length === 0) return null;

          return (
            <div key={group} className="mt-12">
              <h3 className="text-lg font-semibold text-neutral-900">
                {getLabel(personGroupLabels, group, locale)}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {groupPeople.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </div>
          );
        })
      )}
    </Container>
  );
}
