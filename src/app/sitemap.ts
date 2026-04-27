import { MetadataRoute } from "next";
import { articles } from "./insights/_data";

const baseUrl = "https://www.ohitech.co.kr";

const pages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "",                                    changeFrequency: "weekly",  priority: 1.0 },
  { path: "/about",                              changeFrequency: "monthly", priority: 0.8 },
  { path: "/products",                           changeFrequency: "weekly",  priority: 0.9 },
  { path: "/insights",                           changeFrequency: "weekly",  priority: 0.8 },
  { path: "/insights/semiconductor-parts",       changeFrequency: "weekly",  priority: 0.7 },
  { path: "/insights/laser-equipment",           changeFrequency: "weekly",  priority: 0.7 },
  { path: "/insights/thermal-management",        changeFrequency: "weekly",  priority: 0.7 },
  { path: "/insights/ev-charging",               changeFrequency: "weekly",  priority: 0.7 },
  { path: "/contact",                            changeFrequency: "monthly", priority: 0.6 },
];

const productCategories: { slug: string; priority: number }[] = [
  { slug: "semiconductor-parts",  priority: 0.9 },
  { slug: "ev-charging",          priority: 0.8 },
  { slug: "thermal-management",   priority: 0.8 },
  { slug: "laser-equipment",      priority: 0.8 },
];

const semiconductorSubs: { slug: string; priority: number }[] = [
  { slug: "esc",             priority: 0.9 },
  { slug: "wafer-carrier",   priority: 0.8 },
  { slug: "dry-vacuum-pump", priority: 0.8 },
  { slug: "oring",           priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    entries.push({
      url: `${baseUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          ko: `${baseUrl}${page.path}?lang=ko`,
          en: `${baseUrl}${page.path}?lang=en`,
          zh: `${baseUrl}${page.path}?lang=zh`,
        },
      },
    });
  }

  for (const cat of productCategories) {
    entries.push({
      url: `${baseUrl}/products/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: cat.priority,
      alternates: {
        languages: {
          ko: `${baseUrl}/products/${cat.slug}?lang=ko`,
          en: `${baseUrl}/products/${cat.slug}?lang=en`,
          zh: `${baseUrl}/products/${cat.slug}?lang=zh`,
        },
      },
    });
  }

  for (const sub of semiconductorSubs) {
    entries.push({
      url: `${baseUrl}/products/semiconductor-parts/${sub.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: sub.priority,
      alternates: {
        languages: {
          ko: `${baseUrl}/products/semiconductor-parts/${sub.slug}?lang=ko`,
          en: `${baseUrl}/products/semiconductor-parts/${sub.slug}?lang=en`,
          zh: `${baseUrl}/products/semiconductor-parts/${sub.slug}?lang=zh`,
        },
      },
    });
  }

  for (const article of articles) {
    entries.push({
      url: `${baseUrl}/insights/${article.category}/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          ko: `${baseUrl}/insights/${article.category}/${article.slug}?lang=ko`,
          en: `${baseUrl}/insights/${article.category}/${article.slug}?lang=en`,
          zh: `${baseUrl}/insights/${article.category}/${article.slug}?lang=zh`,
        },
      },
    });
  }

  return entries;
}
