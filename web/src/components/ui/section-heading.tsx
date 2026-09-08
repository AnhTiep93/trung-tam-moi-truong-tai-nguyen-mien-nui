export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 text-2xl font-bold text-neutral-900 sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-neutral-600">{description}</p>
      ) : null}
    </div>
  );
}
