import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, lp } from "@/lib/locale";
import { articles, getArticleBody } from "../_data";
import { buildCategoryMetadata, CategoryCollectionJsonLd } from "../_seo";

const CATEGORY_SLUGS = ["semiconductor-parts", "thermal-management", "ev-charging"] as const;
type CategorySlug = (typeof CATEGORY_SLUGS)[number];

const CATEGORY_META: Record<CategorySlug, {
  label: { ko: string; en: string; zh: string; ja: string };
  desc: { ko: string; en: string; zh: string; ja: string };
  color: string;
  accent: string;
}> = {
  "semiconductor-parts": {
    label: { ko: "반도체 부품", en: "Semiconductor Parts", zh: "半导体零部件", ja: "半導体部品" },
    desc: {
      ko: "ESC, 웨이퍼 캐리어, 드라이 펌프, O-링 등 반도체 공정 핵심 부품 기술 가이드",
      en: "Technical guides for ESC, wafer carrier, dry pump, O-ring and other semiconductor process components",
      zh: "ESC、晶圆载体、干泵、O形圈等半导体工艺核心零部件技术指南",
      ja: "静電チャック（ESC）、ウェハーキャリア、ドライポンプ、Oリングなど半導体プロセスの主要部品技術ガイド",
    },
    color: "bg-blue-100 text-blue-700",
    accent: "text-blue-600",
  },
  "thermal-management": {
    label: { ko: "열관리", en: "Thermal Management", zh: "热管理", ja: "熱管理" },
    desc: {
      ko: "반도체 장비 발열 제어를 위한 냉각 솔루션 선택 가이드",
      en: "Cooling solution selection guide for thermal control in semiconductor equipment",
      zh: "半导体设备散热控制的冷却解决方案选型指南",
      ja: "半導体装置の発熱制御に向けた冷却ソリューション選定ガイド",
    },
    color: "bg-orange-100 text-orange-700",
    accent: "text-orange-600",
  },
  "ev-charging": {
    label: { ko: "EV 충전", en: "EV Charging", zh: "EV充电", ja: "EV充電" },
    desc: {
      ko: "전기차 충전 인프라 구축을 위한 충전기 선택 및 설치 기준",
      en: "EV charger selection and installation criteria for charging infrastructure",
      zh: "电동汽车充电基础设施建设的充电桩选型与安装标준",
      ja: "EV充電インフラ構築のための充電器選定・設置基準",
    },
    color: "bg-green-100 text-green-700",
    accent: "text-green-600",
  },
};

// All chips (used in both category page and article page)
const CATEGORY_CHIP: Record<string, { label: { ko: string; en: string; zh: string; ja: string }; color: string }> = {
  "semiconductor-parts": { label: { ko: "반도체 부품", en: "Semiconductor", zh: "半导体", ja: "半導体" }, color: "bg-blue-100 text-blue-700" },
  "thermal-management":  { label: { ko: "열관리", en: "Thermal", zh: "热管理", ja: "熱管理" }, color: "bg-orange-100 text-orange-700" },
  "ev-charging":         { label: { ko: "EV 충전", en: "EV Charging", zh: "EV充电", ja: "EV充電" }, color: "bg-green-100 text-green-700" },
};

const INSIGHTS_LABEL = { ko: "인사이트", en: "Insights", zh: "洞察", ja: "インサイト" };
const READ_MORE = { ko: "자세히 보기 →", en: "Read more →", zh: "阅读更多 →", ja: "詳しく見る →" };
const BACK_TO_INSIGHTS = { ko: "← 인사이트 목록", en: "← All Insights", zh: "← 全部洞察", ja: "← インサイト一覧" };

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { category } = await params;
  const sp = await searchParams;
  const locale = getLocale(sp);

  if (!CATEGORY_SLUGS.includes(category as CategorySlug)) return {};
  const meta = CATEGORY_META[category as CategorySlug];
  return buildCategoryMetadata(category, meta, locale);
}

function formatDate(date: Date, locale: string): string {
  if (locale === "ko") return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  if (locale === "zh" || locale === "ja") return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}


// ─── Category listing page ────────────────────────────────────────────────────
function CategoryListing({
  categorySlug,
  locale,
}: {
  categorySlug: CategorySlug;
  locale: "ko" | "en" | "zh" | "ja";
}) {
  const meta = CATEGORY_META[categorySlug];
  const categoryArticles = articles.filter((a) => a.category === categorySlug);

  return (
    <>
      <CategoryCollectionJsonLd
        categorySlug={categorySlug}
        name={meta.label[locale]}
        description={meta.desc[locale]}
        locale={locale}
      />
      <Header locale={locale} />
      <main className="pt-16 min-h-screen bg-[var(--bg-alt)]">
        <section className="hero-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-white/50 mb-4">
              <Link href={`/insights${lp(locale)}`} className="hover:text-white/80 transition-colors">
                {INSIGHTS_LABEL[locale]}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/70">{meta.label[locale]}</span>
            </nav>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${meta.color} mb-4 inline-block`}>
              {meta.label[locale]}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
              {meta.label[locale]}
            </h1>
            <p className="text-white/60 text-base">{meta.desc[locale]}</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => {
              const title = article.title[locale] || article.title.ko;
              const bodyText = getArticleBody(article, locale).replace(/##|###|\*\*|`/g, "").trim();
              const excerpt = bodyText.slice(0, 100) + (bodyText.length > 100 ? "…" : "");
              const chip = CATEGORY_CHIP[article.category];
              return (
                <Link
                  key={article.slug}
                  href={`/insights/${article.category}/${article.slug}${lp(locale)}`}
                  className="group block bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden"
                >
                  <div className="p-6 flex flex-col gap-3 h-full">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${chip.color}`}>
                        {chip.label[locale] || chip.label.ko}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(article.publishedAt, locale)}</span>
                    </div>
                    <h2 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{excerpt}</p>
                    <span className={`text-sm font-semibold ${meta.accent} group-hover:underline mt-auto`}>
                      {READ_MORE[locale]}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/insights${lp(locale)}`}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              {BACK_TO_INSIGHTS[locale]}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { category } = await params;
  const sp = await searchParams;
  const locale = getLocale(sp) as "ko" | "en" | "zh" | "ja";

  if (!CATEGORY_SLUGS.includes(category as CategorySlug)) notFound();
  return <CategoryListing categorySlug={category as CategorySlug} locale={locale} />;
}
