"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export function SearchBox() {
  const t = useTranslations("search");
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="hidden items-center lg:flex">
      <label className="sr-only" htmlFor="site-search">
        {t("placeholder")}
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("placeholder")}
        className="w-40 rounded-md border border-neutral-200 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none"
      />
    </form>
  );
}
