import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCollection, getStrapiMediaUrl } from "@/lib/strapi";
import type { Partner, PartnerType } from "@/lib/types";

export async function generateMetadata() {
  const t = await getTranslations("partners");
  return { title: t("title") };
}

function PartnerRow({ partner, t }: { partner: Partner; t: (key: string) => string }) {
  const logoUrl = getStrapiMediaUrl(partner.logo);

  return (
    <div className="flex items-start gap-4 rounded-lg border border-neutral-200 bg-white p-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={partner.name}
            fill
            sizes="64px"
            className="object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-neutral-400">
            {partner.name.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <p className="font-semibold text-neutral-900">{partner.name}</p>
        {partner.cooperationContent ? (
          <p className="mt-1 text-sm text-neutral-600">
            {partner.cooperationContent}
          </p>
        ) : null}
        {partner.website ? (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm text-primary-600 hover:underline"
          >
            {t("visitWebsite")} →
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default async function PartnersPage() {
  const locale = await getLocale();
  const t = await getTranslations("partners");
  const common = await getTranslations("common");

  const partnersRes = await getCollection<Partner>("partners", {
    locale,
    query: "sort=order:asc",
  }).catch(() => null);

  const partners = partnersRes?.data ?? [];
  const groups: Record<PartnerType, Partner[]> = {
    "trong-nuoc": partners.filter((p) => p.type === "trong-nuoc"),
    "quoc-te": partners.filter((p) => p.type === "quoc-te"),
  };

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      {partners.length === 0 ? (
        <p className="mt-8 text-neutral-500">{common("noData")}</p>
      ) : (
        <>
          {groups["trong-nuoc"].length > 0 ? (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-neutral-900">
                {t("domestic")}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {groups["trong-nuoc"].map((partner) => (
                  <PartnerRow key={partner.id} partner={partner} t={t} />
                ))}
              </div>
            </div>
          ) : null}

          {groups["quoc-te"].length > 0 ? (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-neutral-900">
                {t("international")}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {groups["quoc-te"].map((partner) => (
                  <PartnerRow key={partner.id} partner={partner} t={t} />
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </Container>
  );
}
