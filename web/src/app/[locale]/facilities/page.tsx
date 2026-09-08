import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCollection, getStrapiMediaUrl } from "@/lib/strapi";
import type { Equipment, EquipmentType } from "@/lib/types";

export async function generateMetadata() {
  const t = await getTranslations("facilities");
  return { title: t("title") };
}

function EquipmentCard({
  item,
  t,
}: {
  item: Equipment;
  t: (key: string) => string;
}) {
  const imageUrl = getStrapiMediaUrl(item.image);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-neutral-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="(min-width: 768px) 320px, 90vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <h3 className="mt-3 font-semibold text-neutral-900">{item.name}</h3>
      {item.specifications ? (
        <p className="mt-2 text-sm text-neutral-600">
          <span className="font-medium text-neutral-700">
            {t("specifications")}:
          </span>{" "}
          {item.specifications}
        </p>
      ) : null}
      {item.function ? (
        <p className="mt-1 text-sm text-neutral-600">
          <span className="font-medium text-neutral-700">
            {t("function")}:
          </span>{" "}
          {item.function}
        </p>
      ) : null}
    </div>
  );
}

export default async function FacilitiesPage() {
  const locale = await getLocale();
  const t = await getTranslations("facilities");
  const common = await getTranslations("common");

  const equipmentRes = await getCollection<Equipment>("equipment-items", {
    locale,
    query: "sort=order:asc&populate=image",
  }).catch(() => null);

  const items = equipmentRes?.data ?? [];
  const groups: Record<EquipmentType, Equipment[]> = {
    "phong-lab": items.filter((i) => i.type === "phong-lab"),
    "thiet-bi": items.filter((i) => i.type === "thiet-bi"),
  };

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      {items.length === 0 ? (
        <p className="mt-8 text-neutral-500">{common("noData")}</p>
      ) : (
        <>
          {groups["phong-lab"].length > 0 ? (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-neutral-900">
                {t("rooms")}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {groups["phong-lab"].map((item) => (
                  <EquipmentCard key={item.id} item={item} t={t} />
                ))}
              </div>
            </div>
          ) : null}

          {groups["thiet-bi"].length > 0 ? (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-neutral-900">
                {t("equipment")}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {groups["thiet-bi"].map((item) => (
                  <EquipmentCard key={item.id} item={item} t={t} />
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </Container>
  );
}
