import type { Locale } from "@/i18n/dictionaries";

/** Returns "?lang=en" / "?lang=zh" for non-Korean locales, "" for Korean (default). */
export function lp(locale: Locale): string {
  return locale === "ko" ? "" : `?lang=${locale}`;
}

/** Like lp() but appends extra query params after lang. */
export function lq(locale: Locale, extra: string): string {
  return locale === "ko" ? `?${extra}` : `?lang=${locale}&${extra}`;
}

export function getLocale(searchParams: Record<string, string | string[] | undefined>): Locale {
  const lang = typeof searchParams?.lang === "string" ? searchParams.lang : "ko";
  if (lang === "en" || lang === "zh" || lang === "ko") return lang;
  return "ko";
}

/**
 * Builds a canonical + hreflang alternates object.
 * canonical is self-referential per locale (en/zh point to their own ?lang= URL)
 * so each language version is independently indexable. x-default → ko canonical.
 */
export function buildAlternates(canonicalUrl: string, locale: Locale = "ko") {
  const en = `${canonicalUrl}?lang=en`;
  const zh = `${canonicalUrl}?lang=zh`;
  return {
    canonical: locale === "en" ? en : locale === "zh" ? zh : canonicalUrl,
    languages: {
      ko: canonicalUrl,
      en,
      zh,
      "x-default": canonicalUrl,
    },
  };
}

export function localizedField<T extends Record<string, unknown>>(
  item: T,
  field: string,
  locale: Locale
): string {
  const key = `${field}_${locale}`;
  const val = item[key];
  if (typeof val === "string" && val) return val;
  // fallback to English, then Korean
  const enKey = `${field}_en`;
  const koKey = `${field}_ko`;
  return (typeof item[enKey] === "string" ? item[enKey] : (typeof item[koKey] === "string" ? item[koKey] : "")) as string;
}
