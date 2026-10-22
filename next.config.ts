import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    // HSTS: 모든 응답에 HTTPS 강제(2년, 서브도메인 포함). preload는 제출형 비가역 약정이라 제외.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/insights/esc",            destination: "/insights/semiconductor-parts/esc",            permanent: true },
      { source: "/insights/wafer-carrier",  destination: "/insights/semiconductor-parts/wafer-carrier",  permanent: true },
      { source: "/insights/dry-vacuum-pump",destination: "/insights/semiconductor-parts/dry-vacuum-pump",permanent: true },
      { source: "/insights/oring",          destination: "/insights/semiconductor-parts/oring",          permanent: true },
      { source: "/insights/waterjet-laser", destination: "/insights/laser-equipment/waterjet-laser",     permanent: true },
      // 삭제한 제품 카테고리(src/lib/removedCategories.ts) — 로케일(?lang=)은 쿼리로 그대로 따라간다.
      { source: "/products/laser-equipment",            destination: "/products", permanent: true },
      { source: "/products/laser-equipment/:path*",     destination: "/products", permanent: true },
      { source: "/products/power-distribution",         destination: "/products", permanent: true },
      { source: "/products/power-distribution/:path*",  destination: "/products", permanent: true },
    ];
  },
};

export default nextConfig;
