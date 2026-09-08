import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { SearchBox } from "./search-box";

export function SiteHeader() {
  const site = useTranslations("site");
  const nav = useTranslations("nav");

  const navItems = [
    { href: "/", label: nav("home") },
    { href: "/about", label: nav("about") },
    { href: "/team", label: nav("team") },
    { href: "/fields", label: nav("fields") },
    { href: "/research", label: nav("research") },
    { href: "/services", label: nav("services") },
    { href: "/webgis", label: nav("webgis") },
    { href: "/training", label: nav("training") },
    { href: "/news", label: nav("news") },
    { href: "/library", label: nav("library") },
    { href: "/gallery", label: nav("gallery") },
    { href: "/contact", label: nav("contact") },
  ];

  return (
    <header className="relative border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-500 text-sm font-bold text-white">
            {site("shortName")}
          </span>
          <span className="hidden text-sm font-semibold text-neutral-900 lg:block">
            {site("name")}
          </span>
        </Link>

        <nav className="hidden flex-1 flex-wrap items-center justify-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-2 text-sm font-medium whitespace-nowrap text-neutral-700 hover:bg-neutral-100 hover:text-primary-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SearchBox />
          <LanguageSwitcher />
          <MobileNav items={navItems} />
        </div>
      </div>
    </header>
  );
}
