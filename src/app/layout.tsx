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
