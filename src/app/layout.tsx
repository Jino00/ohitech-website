import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OHI Tech - 글로벌 반도체 & 첨단산업 솔루션",
  description:
    "OHI Tech는 한국의 반도체 장비 부품 및 첨단 산업 제품을 해외에 수출하고, 해외의 우수한 기술 제품을 국내에 공급하는 전문 무역 기업입니다. Semiconductor equipment parts, EV charging, thermal management, laser equipment trading.",
  keywords: [
    "OHI Tech", "반도체 부품", "semiconductor parts", "半导体零部件",
    "EV 충전기", "EV charger", "电动车充电",
    "열관리", "thermal management", "热管理",
    "레이저 장비", "laser equipment", "激光设备",
    "무역", "trading", "贸易",
  ],
  openGraph: {
    title: "OHI Tech - Global Semiconductor & Advanced Industry Solutions",
    description: "Your Technology Trading Partner Connecting Korea and the World",
    url: "https://www.ohitech.co.kr",
    siteName: "OHI Tech",
    locale: "ko_KR",
    alternateLocale: ["en_US", "zh_CN"],
    type: "website",
  },
  alternates: {
    canonical: "https://www.ohitech.co.kr",
    languages: {
      "ko": "https://www.ohitech.co.kr?lang=ko",
      "en": "https://www.ohitech.co.kr?lang=en",
      "zh": "https://www.ohitech.co.kr?lang=zh",
    },
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="b55fab228a6b5b4d5476aad21fdec2e780857822" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
