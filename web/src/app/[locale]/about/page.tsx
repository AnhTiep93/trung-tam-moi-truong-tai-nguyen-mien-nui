import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/ui/timeline";
import { OrgChart } from "@/components/ui/org-chart";

export async function generateMetadata() {
  const t = await getTranslations("about");
  return { title: t("title") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  const infoRows: [string, string][] = [
    [t("general.nameVi"), t("general.nameViValue")],
    [t("general.nameEn"), t("general.nameEnValue")],
    [t("general.shortName"), t("general.shortNameValue")],
    [t("general.parentOrg"), t("general.parentOrgValue")],
    [t("general.address"), t("general.addressValue")],
    [t("general.phone"), t("general.phoneValue")],
    [t("general.email"), t("general.emailValue")],
  ];

  const milestones = t.raw("history.milestones") as {
    year: string;
    text: string;
  }[];
  const functionItems = t.raw("functions.items") as string[];
  const structureLevels = t.raw("structure.levels") as string[];

  return (
    <Container className="py-16">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <h3 className="col-span-full text-xl font-semibold text-neutral-900">
          {t("general.title")}
        </h3>
        {infoRows.map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg border border-neutral-200 bg-white p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {label}
            </p>
            <p className="mt-1 text-neutral-800">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-semibold text-neutral-900">
          {t("history.title")}
        </h3>
        <p className="mt-2 text-sm text-accent-600">{t("history.note")}</p>
        <div className="mt-8">
          <Timeline milestones={milestones} />
        </div>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900">
            {t("functions.title")}
          </h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {functionItems.map((item) => (
              <li
                key={item}
                className="rounded-md bg-primary-50 px-3 py-2 text-sm text-primary-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-neutral-900">
            {t("vision.title")}
          </h3>
          <p className="mt-4 text-neutral-700">
            <strong>{t("vision.visionLabel")}: </strong>
            {t("vision.vision")}
          </p>
          <p className="mt-3 text-neutral-700">
            <strong>{t("vision.missionLabel")}: </strong>
            {t("vision.mission")}
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-semibold text-neutral-900">
          {t("structure.title")}
        </h3>
        <div className="mt-8">
          <OrgChart levels={structureLevels} />
        </div>
      </div>
    </Container>
  );
}
