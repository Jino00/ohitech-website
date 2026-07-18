import { MetadataRoute } from "next";
import { articles } from "./insights/_data";
import { GOOGLE_NOINDEX_SLUGS } from "./insights/_seo";

const BASE = "https://www.ohitech.co.kr";

function alt(url: string) {
  return {
    languages: {
      ko: url,
      en: `${url}?lang=en`,
      zh: `${url}?lang=zh`,
      ja: `${url}?lang=ja`,
      "x-default": url,
    },
  };
}

const staticPages: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified: Date;
}[] = [
  { path: "/",                                      changeFrequency: "weekly",  priority: 1.0, lastModified: new Date("2026-05-19") },
  { path: "/about",                                 changeFrequency: "monthly", priority: 0.8, lastModified: new Date("2026-04-01") },
  { path: "/products",                              changeFrequency: "weekly",  priority: 0.9, lastModified: new Date("2026-05-19") },
  { path: "/insights",                              changeFrequency: "weekly",  priority: 0.8, lastModified: new Date("2026-05-19") },
  { path: "/insights/semiconductor-parts",          changeFrequency: "weekly",  priority: 0.7, lastModified: new Date("2026-04-20") },
  { path: "/insights/laser-equipment",              changeFrequency: "weekly",  priority: 0.7, lastModified: new Date("2026-04-20") },
  { path: "/insights/thermal-management",           changeFrequency: "weekly",  priority: 0.7, lastModified: new Date("2026-04-28") },
  { path: "/insights/ev-charging",                  changeFrequency: "weekly",  priority: 0.7, lastModified: new Date("2026-04-20") },
  { path: "/insights/hvac-solution",                changeFrequency: "weekly",  priority: 0.7, lastModified: new Date("2026-04-29") },
  { path: "/insights/power-distribution",           changeFrequency: "weekly",  priority: 0.7, lastModified: new Date("2026-05-22") },
  { path: "/contact",                               changeFrequency: "monthly", priority: 0.6, lastModified: new Date("2026-04-01") },
];

const productCategories: { slug: string; priority: number; lastModified: Date }[] = [
  { slug: "semiconductor-parts",  priority: 0.9, lastModified: new Date("2026-04-20") },
  { slug: "ev-charging",          priority: 0.8, lastModified: new Date("2026-04-20") },
  { slug: "thermal-management",   priority: 0.8, lastModified: new Date("2026-05-19") },
  { slug: "laser-equipment",      priority: 0.8, lastModified: new Date("2026-04-20") },
  { slug: "power-distribution",   priority: 0.8, lastModified: new Date("2026-07-17") },
];

const semiconductorSubs: { slug: string; priority: number }[] = [
  { slug: "esc",             priority: 0.9 },
  { slug: "wafer-carrier",   priority: 0.8 },
  { slug: "rps-repair",      priority: 0.8 },
  // 노출 보류(2026-07): dry-vacuum-pump·oring — 메뉴/사이트맵 미노출 + noindex
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    const url = `${BASE}${page.path}`;
    entries.push({
      url,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: alt(url),
    });
  }

  for (const cat of productCategories) {
    const url = `${BASE}/products/${cat.slug}`;
    entries.push({
      url,
      lastModified: cat.lastModified,
      changeFrequency: "monthly",
      priority: cat.priority,
      alternates: alt(url),
    });
  }

  for (const sub of semiconductorSubs) {
    const url = `${BASE}/products/semiconductor-parts/${sub.slug}`;
    entries.push({
      url,
      lastModified: new Date("2026-04-20"),
      changeFrequency: "monthly",
      priority: sub.priority,
      alternates: alt(url),
    });
  }

  for (const article of articles) {
    // 구글 noindex 글(TECO 등)은 사이트맵에서 제외 — sitemap 등재 ↔ googleBot:noindex 모순 방지.
    // 일반 robots는 index 유지라 네이버 Yeti는 내부 링크로 계속 색인한다.
    if (GOOGLE_NOINDEX_SLUGS.has(article.slug)) continue;
    const url = `${BASE}/insights/${article.category}/${article.slug}`;
    entries.push({
      url,
      lastModified: article.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: alt(url),
    });
  }

  return entries;
}
