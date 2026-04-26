import type { Metadata } from "next";
import { articles } from "./_data";
import type { Locale } from "@/i18n/dictionaries";

const BASE_URL = "https://www.ohitech.co.kr";

export function getMetaForSlug(slug: string, locale: Locale): { title: string; description: string; keywords: string[] } | null {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;
  return {
    title: article.title[locale] || article.title.ko,
    description: article.description[locale] || article.description.ko,
    keywords: article.keywords[locale] || article.keywords.ko,
  };
}

export function getInsightsListMeta(locale: Locale): { title: string; description: string } {
  const meta: Record<Locale, { title: string; description: string }> = {
    ko: {
      title: "기술 인사이트 — 반도체·레이저·EV·열관리 전문 가이드 | OHI Tech",
      description: "반도체 ESC, 웨이퍼 캐리어, 드라이 진공펌프, O-ring, 레이저 장비, EV 충전, 열관리 솔루션에 대한 전문 기술 가이드. OHI Tech 기술 인사이트.",
    },
    en: {
      title: "Technical Insights — Semiconductor, Laser, EV & Thermal Management Guides | OHI Tech",
      description: "Expert technical guides on semiconductor ESC, wafer carriers, dry vacuum pumps, O-rings, laser equipment, EV charging, and thermal management solutions.",
    },
    zh: {
      title: "技术洞察 — 半导体、激光、EV与热管理专业指南 | OHI Tech",
      description: "半导体ESC、晶圆载体、干式真空泵、O形圈、激光设备、EV充电及热管理解决方案的专业技术指南。",
    },
  };
  return meta[locale];
}

export function buildInsightsMetadata(locale: Locale): Metadata {
  const meta = getInsightsListMeta(locale);
  const canonicalPath = "/insights";
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}${canonicalPath}`,
      siteName: "OHI Tech",
      locale: locale === "ko" ? "ko_KR" : locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        ko: `${BASE_URL}${canonicalPath}`,
        en: `${BASE_URL}${canonicalPath}?lang=en`,
        zh: `${BASE_URL}${canonicalPath}?lang=zh`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export function buildArticleMetadata(slug: string, locale: Locale): Metadata {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  const meta = getMetaForSlug(slug, locale)!;
  const canonicalPath = `/insights/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}${canonicalPath}`,
      siteName: "OHI Tech",
      locale: locale === "ko" ? "ko_KR" : locale === "zh" ? "zh_CN" : "en_US",
      type: "article",
      publishedTime: article.publishedAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: ["OHI Tech"],
    },
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        ko: `${BASE_URL}${canonicalPath}`,
        en: `${BASE_URL}${canonicalPath}?lang=en`,
        zh: `${BASE_URL}${canonicalPath}?lang=zh`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export function ArticleJsonLd({ slug, locale }: { slug: string; locale: Locale }) {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;
  const title = article.title[locale] || article.title.ko;
  const description = article.description[locale] || article.description.ko;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Organization", name: "OHI Tech", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "OHI Tech",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/images/logo-header.png` },
    },
    datePublished: article.publishedAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    url: `${BASE_URL}/insights/${slug}`,
    inLanguage: locale === "ko" ? "ko" : locale === "zh" ? "zh" : "en",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
