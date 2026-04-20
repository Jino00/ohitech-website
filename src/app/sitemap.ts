import { MetadataRoute } from "next";

const baseUrl = "https://www.ohitech.co.kr";

const pages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "",          changeFrequency: "weekly",  priority: 1.0 },
  { path: "/about",    changeFrequency: "monthly", priority: 0.8 },
  { path: "/products", changeFrequency: "weekly",  priority: 0.9 },
  { path: "/partners", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact",  changeFrequency: "monthly", priority: 0.6 },
];

const productCategories: { slug: string; priority: number }[] = [
  { slug: "semiconductor-parts",  priority: 0.8 },
  { slug: "ev-charging",          priority: 0.8 },
  { slug: "thermal-management",   priority: 0.8 },
  { slug: "laser-equipment",      priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    entries.push({
      url: `${baseUrl}${page.path}?lang=ko`,
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
      url: `${baseUrl}/products?lang=ko&category=${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: cat.priority,
      alternates: {
        languages: {
          ko: `${baseUrl}/products?lang=ko&category=${cat.slug}`,
          en: `${baseUrl}/products?lang=en&category=${cat.slug}`,
          zh: `${baseUrl}/products?lang=zh&category=${cat.slug}`,
        },
      },
    });
  }

  return entries;
}
