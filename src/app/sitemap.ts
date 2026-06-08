import { MetadataRoute } from "next";
import { articles } from "./insights/_data";

const BASE = "https://www.ohitech.co.kr";

function alt(url: string) {
  return {
    languages: {
      ko: url,
      en: `${url}?lang=en`,
      zh: `${url}?lang=zh`,
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
  // { slug: "power-distribution",   priority: 0.8, lastModified: new Date("2026-05-20") }, // 계약 완료 전 비노출
];

const semiconductorSubs: { slug: string; priority: number }[] = [
  { slug: "esc",             priority: 0.9 },
  { slug: "wafer-carrier",   priority: 0.8 },
  { slug: "dry-vacuum-pump", priority: 0.8 },
  { slug: "oring",           priority: 0.7 },
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
