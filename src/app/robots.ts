import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: "Yeti",  // Naver bot
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: "https://www.ohitech.co.kr/sitemap.xml",
  };
}
