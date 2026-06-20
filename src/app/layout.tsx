import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const BASE_URL = "https://www.ohitech.co.kr";

export const metadata: Metadata = {
  title: {
    default: "OHI Tech — 글로벌 반도체·첨단산업 솔루션",
    template: "%s | OHI Tech",
  },
  description: "한국 반도체 장비 부품 수출, 해외 첨단 기술 국내 공급 전문 무역 기업. EV 충전·열관리·레이저 장비.",
  metadataBase: new URL(BASE_URL),
  robots: { index: true, follow: true },
  // 전역 OG/Twitter 폴백 — 자체 OG가 없는 페이지(인사이트 목록 등)도 OG 태그를 갖게 한다.
  // 네이버 Yeti가 OG를 읽어 노출/표시에 활용(구글 랭킹 영향 없음). 자체 openGraph를 둔
  // 페이지는 그 객체가 우선(Next는 segment 단위로 openGraph를 교체). 라이브 검증:
  // 자체 OG 없는 /insights도 og:title·og:description이 페이지 title/description으로 채워짐.
  openGraph: {
    type: "website",
    siteName: "OHI Tech",
    locale: "ko_KR",
    url: BASE_URL,
    images: [{ url: `${BASE_URL}/images/logo-large.png`, width: 1200, height: 630, alt: "OHI Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${BASE_URL}/images/logo-large.png`],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "ko";

  return (
    <html lang={locale}>
      <head>
        <meta name="naver-site-verification" content="b55fab228a6b5b4d5476aad21fdec2e780857822" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo-large.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css" />
        <link rel="alternate" type="application/rss+xml" title="OHI Tech 기술 인사이트" href={`${BASE_URL}/rss.xml`} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
