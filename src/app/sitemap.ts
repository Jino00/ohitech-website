import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.ohitech.co.kr";
  const locales = ["ko", "en", "zh"];
  const pages = ["", "/about", "/products", "/partners", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const lang of locales) {
      entries.push({
        url: `${baseUrl}${page}?lang=${lang}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
