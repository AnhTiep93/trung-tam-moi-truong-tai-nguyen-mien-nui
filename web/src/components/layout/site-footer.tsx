import { useTranslations } from "next-intl";

export function SiteFooter() {
  const site = useTranslations("site");
  const footer = useTranslations("footer");

  return (
    <footer className="border-t border-neutral-200 bg-neutral-100">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600 sm:px-6">
        <p className="font-semibold text-neutral-900">{site("name")}</p>
        <p>{site("org")}</p>
        <p className="mt-4">
          © {new Date().getFullYear()} {site("shortName")}. {footer("rights")}
        </p>
      </div>
    </footer>
  );
}
