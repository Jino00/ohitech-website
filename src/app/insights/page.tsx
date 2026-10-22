import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, lp } from "@/lib/locale";
import { articles } from "./_data";
import { buildInsightsMetadata, ItemListJsonLd } from "./_seo";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const locale = getLocale(sp);
  return buildInsightsMetadata(locale);
}

const CATEGORIES: {
  slug: string;
  label: { ko: string; en: string; zh: string; ja: string };
  desc: { ko: string; en: string; zh: string; ja: string };
  color: string;
  accent: string;
}[] = [
  {
    slug: "semiconductor-parts",
    label: { ko: "반도체 부품", en: "Semiconductor Parts", zh: "半导体零部件", ja: "半導体部品" },
    desc: {
      ko: "ESC, 웨이퍼 캐리어, 드라이 펌프, O-링 등 반도체 공정 핵심 부품 기술 가이드",
      en: "Technical guides for ESC, wafer carrier, dry pump, O-ring and other semiconductor process components",
      zh: "ESC、晶圆载体、干泵、O形圈等半导体工艺核心零部件技术指南",
      ja: "ESC、ウェハーキャリア、ドライポンプ、Oリングなど半導体プロセスの中核部品に関する技術ガイド",
    },
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-600",
  },
  {
    slug: "thermal-management",
    label: { ko: "열관리", en: "Thermal Management", zh: "热管理", ja: "熱管理" },
    desc: {
      ko: "반도체 장비 발열 제어를 위한 냉각 솔루션 선택 가이드",
      en: "Cooling solution selection guide for thermal control in semiconductor equipment",
      zh: "半导体设备散热控制的冷却解决方案选型指南",
      ja: "半導体装置の発熱制御に向けた冷却ソリューション選定ガイド",
    },
    color: "bg-orange-50 border-orange-200",
    accent: "text-orange-600",
  },
  {
    slug: "ev-charging",
    label: { ko: "EV 충전", en: "EV Charging", zh: "EV充电", ja: "EV充電" },
    desc: {
      ko: "전기차 충전 인프라 구축을 위한 충전기 선택 및 설치 기준",
      en: "EV charger selection and installation criteria for charging infrastructure",
      zh: "电动汽车充电基础设施建设的充电桩选型与安装标准",
      ja: "EV充電インフラ構築に向けた充電器の選定・設置基準",
    },
    color: "bg-green-50 border-green-200",
    accent: "text-green-600",
  },
];

const PAGE_TITLE = { ko: "기술 인사이트", en: "Technical Insights", zh: "技术洞察", ja: "技術インサイト" };
const PAGE_SUBTITLE = {
  ko: "반도체 부품, EV 충전, 열관리 분야의 현장 실무 경험을 담은 전문 기술 가이드를 제공합니다",
  en: "Expert technical guides on semiconductor, EV & thermal management",
  zh: "提供半导体零部件、电动车充电与热管理领域的实战经验专业技术指南，助力工程师与采购人员高效完成技术决策与产品选型",
  ja: "半導体部品、EV充電、熱管理分野における現場実務の経験を活かした専門技術ガイドを提供します",
};
const ARTICLES_COUNT = { ko: "편", en: "articles", zh: "篇", ja: "件" };
const VIEW_ALL = { ko: "전체 보기 →", en: "View all →", zh: "查看全部 →", ja: "すべて見る →" };

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const locale = getLocale(sp);

  return (
    <>
      <ItemListJsonLd locale={locale} />
      <Header locale={locale} />
      <main className="pt-16 min-h-screen bg-[var(--bg-alt)]">
        <section className="hero-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
              {PAGE_TITLE[locale]}
            </h1>
            <p className="text-white/60 text-lg">{PAGE_SUBTITLE[locale]}</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CATEGORIES.map((cat) => {
              const count = articles.filter((a) => a.category === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/insights/${cat.slug}${lp(locale)}`}
                  className={`group block rounded-xl border ${cat.color} p-7 hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h2 className={`text-lg font-bold ${cat.accent}`}>
                          {cat.label[locale]}
                        </h2>
                        <span className="text-xs text-gray-400 shrink-0">
                          {count} {ARTICLES_COUNT[locale]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {cat.desc[locale]}
                      </p>
                      <span className={`text-sm font-semibold ${cat.accent} group-hover:underline`}>
                        {VIEW_ALL[locale]}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
