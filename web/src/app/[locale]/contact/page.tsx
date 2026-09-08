import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ConsultationForm } from "@/components/forms/consultation-form";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  return { title: t("title") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const about = await getTranslations("about");

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            {t("infoTitle")}
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-neutral-800">
                {about("general.parentOrg")}
              </dt>
              <dd className="text-neutral-600">
                {about("general.parentOrgValue")}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-neutral-800">
                {about("general.address")}
              </dt>
              <dd className="text-neutral-600">
                {about("general.addressValue")}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-neutral-800">
                {about("general.phone")}
              </dt>
              <dd className="text-neutral-600">
                {about("general.phoneValue")}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-neutral-800">
                {about("general.email")}
              </dt>
              <dd className="text-neutral-600">
                {about("general.emailValue")}
              </dd>
            </div>
          </dl>

          <div className="mt-6 aspect-[4/3] w-full overflow-hidden rounded-lg border border-neutral-200">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps?q=Truong+Dai+hoc+Nong+Lam+Thai+Nguyen&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            {t("formTitle")}
          </h2>
          <div className="mt-4">
            <ConsultationForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
