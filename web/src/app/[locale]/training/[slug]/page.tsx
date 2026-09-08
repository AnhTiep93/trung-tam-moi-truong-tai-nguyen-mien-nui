import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { RichText } from "@/components/ui/rich-text";
import { CourseRegistrationForm } from "@/components/forms/course-registration-form";
import { getEntryBySlug, getStrapiMediaUrl } from "@/lib/strapi";
import type { TrainingCourse } from "@/lib/types";

export default async function TrainingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("training");

  const course = await getEntryBySlug<TrainingCourse>("training-courses", slug, {
    locale,
    query: "populate=coverImage",
  }).catch(() => null);

  if (!course) {
    notFound();
  }

  const coverUrl = getStrapiMediaUrl(course.coverImage);

  return (
    <Container className="py-16">
      <Link
        href="/training"
        className="text-sm font-medium text-primary-600 hover:underline"
      >
        ← {t("backToTraining")}
      </Link>

      {coverUrl ? (
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-200">
          <Image
            src={coverUrl}
            alt={course.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <span
        className={`mt-6 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
          course.registrationOpen
            ? "bg-primary-50 text-primary-600"
            : "bg-neutral-100 text-neutral-500"
        }`}
      >
        {course.registrationOpen
          ? t("registrationOpen")
          : t("registrationClosed")}
      </span>

      <h1 className="mt-3 text-2xl font-bold text-neutral-900 sm:text-3xl">
        {course.title}
      </h1>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {course.duration ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {t("duration")}
            </dt>
            <dd className="mt-1 text-neutral-800">{course.duration}</dd>
          </div>
        ) : null}
        {course.schedule ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {t("schedule")}
            </dt>
            <dd className="mt-1 text-neutral-800">{course.schedule}</dd>
          </div>
        ) : null}
        {course.location ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {t("location")}
            </dt>
            <dd className="mt-1 text-neutral-800">{course.location}</dd>
          </div>
        ) : null}
      </dl>

      {course.description ? (
        <div className="mt-8">
          <RichText content={course.description} />
        </div>
      ) : course.summary ? (
        <p className="mt-8 text-neutral-700">{course.summary}</p>
      ) : null}

      {course.registrationOpen ? (
        <div className="mt-10 max-w-xl rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            {t("registerTitle")}
          </h2>
          <div className="mt-4">
            <CourseRegistrationForm courseDocumentId={course.documentId} />
          </div>
        </div>
      ) : null}
    </Container>
  );
}
