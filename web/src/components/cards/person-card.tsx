import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getStrapiMediaUrl } from "@/lib/strapi";
import type { Person } from "@/lib/types";

export function PersonCard({ person }: { person: Person }) {
  const photoUrl = getStrapiMediaUrl(person.photo);
  const content = (
    <>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-200">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={person.fullName}
            fill
            sizes="(min-width: 768px) 240px, 45vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-neutral-400">
            {person.fullName.charAt(0)}
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="font-semibold text-neutral-900">
          {person.academicTitle ? `${person.academicTitle} ` : ""}
          {person.fullName}
        </p>
        {person.position ? (
          <p className="text-sm text-neutral-600">{person.position}</p>
        ) : null}
      </div>
    </>
  );

  if (person.slug) {
    return (
      <Link
        href={`/team/${person.slug}`}
        className="block transition hover:opacity-90"
      >
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}
