import type { Locale } from "@/i18n/dictionaries";

export function getLocale(searchParams: Record<string, string | string[] | undefined>): Locale {
  const lang = typeof searchParams?.lang === "string" ? searchParams.lang : "ko";
  if (lang === "en" || lang === "zh" || lang === "ko") return lang;
  return "ko";
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
