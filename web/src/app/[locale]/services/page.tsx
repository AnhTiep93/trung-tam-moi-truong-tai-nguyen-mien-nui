import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/cards/service-card";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { getCollection } from "@/lib/strapi";
import type { Service } from "@/lib/types";

export async function generateMetadata() {
  const t = await getTranslations("services");
  return { title: t("title") };
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = await getTranslations("services");
  const common = await getTranslations("common");

  const servicesRes = await getCollection<Service>("services", {
    locale,
    query: "sort=order:asc",
  }).catch(() => null);

  const services = servicesRes?.data ?? [];

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <p className="text-neutral-500">{common("noData")}</p>
        )}
      </div>

      <div className="mt-16 max-w-2xl rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-neutral-900">
          {t("requestTitle")}
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          {t("requestDescription")}
        </p>
        <div className="mt-6">
          <ConsultationForm
            services={services.map((s) => ({
              documentId: s.documentId,
              name: s.name,
            }))}
          />
        </div>
      </div>
    </Container>
  );
}
