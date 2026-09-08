import type { StrapiListResponse, StrapiItemResponse, StrapiMedia } from "./types";

const STRAPI_URL =
  process.env.STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1337";

export function getStrapiMediaUrl(media: StrapiMedia | null | undefined) {
  if (!media?.url) return null;
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
}

interface FetchOptions {
  locale?: string;
  query?: string;
  revalidate?: number;
}

async function strapiFetch<T>(
  path: string,
  { locale, query, revalidate = 300 }: FetchOptions = {}
): Promise<T> {
  const params = new URLSearchParams(query);
  if (locale) params.set("locale", locale);

  const url = `${STRAPI_URL}/api${path}${params.toString() ? `?${params.toString()}` : ""}`;

  const res = await fetch(url, { next: { revalidate } });

  if (!res.ok) {
    throw new Error(`Strapi request failed (${res.status}): ${url}`);
  }

  return res.json();
}

export async function getCollection<T>(
  collection: string,
  options: FetchOptions = {}
): Promise<StrapiListResponse<T>> {
  return strapiFetch<StrapiListResponse<T>>(`/${collection}`, options);
}

export async function getEntryBySlug<T extends { slug: string | null }>(
  collection: string,
  slug: string,
  options: FetchOptions = {}
): Promise<T | null> {
  const query = new URLSearchParams(options.query);
  query.set("filters[slug][$eq]", slug);

  const result = await strapiFetch<StrapiListResponse<T>>(`/${collection}`, {
    ...options,
    query: query.toString(),
  });

  return result.data[0] ?? null;
}

export async function getSingleEntry<T>(
  collection: string,
  id: number | string,
  options: FetchOptions = {}
): Promise<T> {
  const result = await strapiFetch<StrapiItemResponse<T>>(
    `/${collection}/${id}`,
    options
  );
  return result.data;
}
