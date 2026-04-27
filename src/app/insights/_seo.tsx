import type { Metadata } from "next";
import { articles } from "./_data";
import type { Locale } from "@/i18n/dictionaries";

const BASE_URL = "https://www.ohitech.co.kr";

// ─── og:image map (slug → 대표 이미지) ───────────────────────────────────────
const ARTICLE_OG_IMAGE: Record<string, string> = {
  "laser-equipment":    "/images/insights/laser-ns-vs-fs.png",
  "waterjet-laser":     "/images/insights/waterjet-si-wafer-pocket.png",
  "esc":                "/images/insights/esc-product-detail.png",
  "wafer-carrier":      "/images/insights/semiconductor-parts-detail.png",
  "dry-vacuum-pump":    "/images/insights/semiconductor-parts-detail.png",
  "oring":              "/images/insights/semiconductor-parts-detail.png",
  "thermal-management": "/images/insights/thermal-material-detail.png",
  "ev-charging":        "/images/insights/ev-charger-lineup.png",
};

// ─── FAQ 파서 ─────────────────────────────────────────────────────────────────
// body 마크다운에서 **Q1. ...** / answer 패턴을 추출
export function extractFaq(body: string): { question: string; answer: string }[] {
  const results: { question: string; answer: string }[] = [];
  const lines = body.split("\n");
  let i = 0;
  while (i < lines.length) {
    const qMatch = lines[i].match(/^\*\*Q\d+\.\s+(.+?)\*\*\s*$/);
    if (qMatch) {
      const question = qMatch[1].trim();
      const answerLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].match(/^\*\*Q\d+\./)) {
        const trimmed = lines[i].trim();
        if (trimmed) answerLines.push(trimmed);
        i++;
      }
      if (answerLines.length > 0) {
        results.push({ question, answer: answerLines.join(" ") });
      }
    } else {
      i++;
    }
  }
  return results;
}

// ─── 메타데이터 헬퍼 ──────────────────────────────────────────────────────────
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
      images: [
        {
          url: `${BASE_URL}/images/logo-large.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}/images/logo-large.png`],
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

// ─── 카테고리 OG 이미지 ────────────────────────────────────────────────────────
const CATEGORY_OG_IMAGE: Record<string, string> = {
  "semiconductor-parts": "/images/insights/esc-product-detail.png",
  "laser-equipment":     "/images/insights/laser-ns-vs-fs.png",
  "thermal-management":  "/images/insights/thermal-material-detail.png",
  "ev-charging":         "/images/insights/ev-charger-lineup.png",
};

type CategoryMeta = {
  label: { ko: string; en: string; zh: string };
  desc: { ko: string; en: string; zh: string };
};

export function buildCategoryMetadata(
  categorySlug: string,
  meta: CategoryMeta,
  locale: Locale
): Metadata {
  const title = meta.label[locale];
  const description = meta.desc[locale];
  const canonicalPath = `/insights/${categorySlug}`;
  const ogImagePath = CATEGORY_OG_IMAGE[categorySlug] ?? "/images/logo-large.png";
  const ogLocale = locale === "ko" ? "ko_KR" : locale === "zh" ? "zh_CN" : "en_US";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${canonicalPath}`,
      siteName: "OHI Tech",
      locale: ogLocale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}${ogImagePath}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}${ogImagePath}`],
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

export function buildArticleMetadata(slug: string, locale: Locale, canonicalPathOverride?: string): Metadata {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  const meta = getMetaForSlug(slug, locale)!;
  const canonicalPath = canonicalPathOverride ?? `/insights/${slug}`;
  const ogImagePath = ARTICLE_OG_IMAGE[slug] ?? "/images/logo-large.png";
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
      images: [
        {
          url: `${BASE_URL}${ogImagePath}`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}${ogImagePath}`],
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

// ─── JSON-LD 컴포넌트들 ───────────────────────────────────────────────────────

/** ItemList 스키마 — /insights 목록 페이지용 */
export function ItemListJsonLd({ locale }: { locale: Locale }) {
  const meta = getInsightsListMeta(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: meta.title,
    description: meta.description,
    url: `${BASE_URL}/insights`,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title[locale] || article.title.ko,
      url: `${BASE_URL}/insights/${article.category}/${article.slug}`,
      description: article.description[locale] || article.description.ko,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/** Article 스키마 (기존) */
export function ArticleJsonLd({ slug, locale, urlOverride }: { slug: string; locale: Locale; urlOverride?: string }) {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;
  const title = article.title[locale] || article.title.ko;
  const description = article.description[locale] || article.description.ko;
  const ogImagePath = ARTICLE_OG_IMAGE[slug] ?? "/images/logo-large.png";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: `${BASE_URL}${ogImagePath}`,
    author: { "@type": "Organization", name: "OHI Tech", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "OHI Tech",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/images/logo-header.png` },
    },
    datePublished: article.publishedAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    url: urlOverride ?? `${BASE_URL}/insights/${slug}`,
    inLanguage: locale === "ko" ? "ko" : locale === "zh" ? "zh" : "en",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/** FAQPage 스키마 — body에서 Q&A 자동 추출 */
export function FaqPageJsonLd({ slug, locale }: { slug: string; locale: Locale }) {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;
  const body = article.body[locale] || article.body.ko;
  const faqs = extractFaq(body);
  if (faqs.length === 0) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/** BreadcrumbList 스키마 */
export function BreadcrumbJsonLd({
  slug,
  locale,
  categorySlug,
  categoryLabel,
  articleTitle,
  articleUrlOverride,
}: {
  slug: string;
  locale: Locale;
  categorySlug: string;
  categoryLabel: string;
  articleTitle: string;
  articleUrlOverride?: string;
}) {
  const insightsLabel = locale === "ko" ? "인사이트" : locale === "zh" ? "洞察" : "Insights";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: insightsLabel,
        item: `${BASE_URL}/insights`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel,
        item: `${BASE_URL}/insights/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: articleTitle,
        item: articleUrlOverride ?? `${BASE_URL}/insights/${slug}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
