import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, lp } from "@/lib/locale";
import { articles } from "./_data";
import { buildInsightsMetadata } from "./_seo";

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
  label: { ko: string; en: string; zh: string };
  desc: { ko: string; en: string; zh: string };
  color: string;
  accent: string;
  icon: string;
}[] = [
  {
    slug: "semiconductor-parts",
    label: { ko: "반도체 부품", en: "Semiconductor Parts", zh: "半导体零部件" },
    desc: {
      ko: "ESC, 웨이퍼 캐리어, 드라이 펌프, O-링 등 반도체 공정 핵심 부품 기술 가이드",
      en: "Technical guides for ESC, wafer carrier, dry pump, O-ring and other semiconductor process components",
      zh: "ESC、晶圆载体、干泵、O形圈等半导体工艺核心零部件技术指南",
    },
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-600",
    icon: "💎",
  },
  {
    slug: "laser-equipment",
    label: { ko: "레이저 장비", en: "Laser Equipment", zh: "激光设备" },
    desc: {
      ko: "CO₂·파이버·UV·워터젯 레이저 특성과 공정별 최적 선택 기준",
      en: "CO₂, fiber, UV, and waterjet laser characteristics and selection criteria by process",
      zh: "CO₂、光纤、UV、水射流激光特性及各工艺最优选型标准",
    },
    color: "bg-violet-50 border-violet-200",
    accent: "text-violet-600",
    icon: "⚡",
  },
  {
    slug: "thermal-management",
    label: { ko: "열관리", en: "Thermal Management", zh: "热管理" },
    desc: {
      ko: "반도체 장비 발열 제어를 위한 냉각 솔루션 선택 가이드",
      en: "Cooling solution selection guide for thermal control in semiconductor equipment",
      zh: "半导体设备散热控制的冷却解决方案选型指南",
    },
    color: "bg-orange-50 border-orange-200",
    accent: "text-orange-600",
    icon: "🌡️",
  },
  {
    slug: "ev-charging",
    label: { ko: "EV 충전", en: "EV Charging", zh: "EV充电" },
    desc: {
      ko: "전기차 충전 인프라 구축을 위한 충전기 선택 및 설치 기준",
      en: "EV charger selection and installation criteria for charging infrastructure",
      zh: "电动汽车充电基础设施建设的充电桩选型与安装标准",
    },
    color: "bg-green-50 border-green-200",
    accent: "text-green-600",
    icon: "🔋",
  },
];

const PAGE_TITLE = { ko: "기술 인사이트", en: "Technical Insights", zh: "技术洞察" };
const PAGE_SUBTITLE = {
  ko: "반도체·레이저·EV·열관리 분야의 전문 기술 가이드",
  en: "Expert technical guides on semiconductor, laser, EV & thermal management",
  zh: "半导体、激光、EV与热管理领域的专业技术指南",
};
const ARTICLES_COUNT = { ko: "편", en: "articles", zh: "篇" };
const VIEW_ALL = { ko: "전체 보기 →", en: "View all →", zh: "查看全部 →" };

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const locale = getLocale(sp);

  return (
    <>
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
                    <span className="text-3xl">{cat.icon}</span>
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
