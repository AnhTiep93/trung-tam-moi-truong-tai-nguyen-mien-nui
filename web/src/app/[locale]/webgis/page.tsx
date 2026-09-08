import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WebGisMap } from "@/components/webgis/webgis-map";
import { getCollection } from "@/lib/strapi";
import type { GisLayer } from "@/lib/types";

export async function generateMetadata() {
  const t = await getTranslations("webgis");
  return { title: t("title") };
}

export default async function WebGisPage() {
  const locale = await getLocale();
  const t = await getTranslations("webgis");
  const common = await getTranslations("common");

  const layersRes = await getCollection<GisLayer>("gis-layers", {
    locale,
    query: "sort=order:asc",
  }).catch(() => null);

  const layers = layersRes?.data ?? [];

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <p className="mt-4 inline-block rounded-md bg-accent-400/10 px-3 py-1 text-sm text-accent-600">
        {t("demoNotice")}
      </p>

      <div className="mt-8">
        {layers.length > 0 ? (
          <WebGisMap layers={layers} />
        ) : (
          <p className="text-neutral-500">{common("noData")}</p>
        )}
      </div>
    </Container>
  );
}
