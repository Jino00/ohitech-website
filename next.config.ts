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
      // 삭제한 인사이트 글·카테고리(2026-10-22, 레이저·TECO) — 글 4개(laser-equipment·waterjet-laser·teco-ecm-motor·contactor-guide)와
      // 카테고리 laser-equipment·power-distribution·hvac-solution(TECO 글 하나뿐이라 비게 됨)은 목록으로 보낸다. ?lang=는 그대로 따라간다.
      { source: "/insights/waterjet-laser",               destination: "/insights", permanent: true },
      { source: "/insights/laser-equipment",              destination: "/insights", permanent: true },
      { source: "/insights/laser-equipment/:path*",       destination: "/insights", permanent: true },
      { source: "/insights/power-distribution",           destination: "/insights", permanent: true },
      { source: "/insights/power-distribution/:path*",    destination: "/insights", permanent: true },
      { source: "/insights/hvac-solution",                destination: "/insights", permanent: true },
      { source: "/insights/hvac-solution/:path*",         destination: "/insights", permanent: true },
      // 옛 숨김 펌프 하위 페이지 → 새 드라이 진공 펌프 카테고리(Grand Hitek 한국 총판).
      { source: "/products/semiconductor-parts/dry-vacuum-pump", destination: "/products/vacuum-pump", permanent: true },
      // 삭제한 제품 카테고리(src/lib/removedCategories.ts) — 로케일(?lang=)은 쿼리로 그대로 따라간다.
      { source: "/products/laser-equipment",            destination: "/products", permanent: true },
      { source: "/products/laser-equipment/:path*",     destination: "/products", permanent: true },
      { source: "/products/power-distribution",         destination: "/products", permanent: true },
      { source: "/products/power-distribution/:path*",  destination: "/products", permanent: true },
    ];
  },
};

export default nextConfig;
