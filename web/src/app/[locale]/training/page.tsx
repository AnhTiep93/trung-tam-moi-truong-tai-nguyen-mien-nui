import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCollection, getStrapiMediaUrl } from "@/lib/strapi";
import type { TrainingCourse } from "@/lib/types";

export async function generateMetadata() {
  const t = await getTranslations("training");
  return { title: t("title") };
}

export default async function TrainingPage() {
  const locale = await getLocale();
  const t = await getTranslations("training");
  const common = await getTranslations("common");

  const coursesRes = await getCollection<TrainingCourse>("training-courses", {
    locale,
    query: "populate=coverImage",
  }).catch(() => null);

  const courses = coursesRes?.data ?? [];

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.length > 0 ? (
          courses.map((course) => {
            const coverUrl = getStrapiMediaUrl(course.coverImage);
            return (
              <Link
                key={course.id}
                href={`/training/${course.slug}`}
                className="block overflow-hidden rounded-lg border border-neutral-200 bg-white transition hover:border-primary-400 hover:shadow-sm"
              >
                <div className="relative aspect-[16/9] w-full bg-neutral-200">
                  {coverUrl ? (
                    <Image
                      src={coverUrl}
                      alt={course.title}
                      fill
                      sizes="(min-width: 768px) 360px, 90vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-4">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                      course.registrationOpen
                        ? "bg-primary-50 text-primary-600"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {course.registrationOpen
                      ? t("registrationOpen")
                      : t("registrationClosed")}
                  </span>
                  <p className="mt-2 font-semibold text-neutral-900">
                    {course.title}
                  </p>
                  {course.summary ? (
                    <p className="mt-2 text-sm text-neutral-600">
                      {course.summary}
                    </p>
                  ) : null}
                  {course.duration ? (
                    <p className="mt-2 text-xs text-neutral-500">
                      {t("duration")}: {course.duration}
                    </p>
                  ) : null}
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-neutral-500">{common("noData")}</p>
        )}
      </div>
    </Container>
  );
}
