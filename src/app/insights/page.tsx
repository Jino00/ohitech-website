import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, lp } from "@/lib/locale";
import { articles, getArticleBody } from "./_data";
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

const CATEGORY_CHIP: Record<string, { label: { ko: string; en: string; zh: string }; color: string }> = {
  "semiconductor-parts": { label: { ko: "반도체 부품", en: "Semiconductor", zh: "半导体" }, color: "bg-blue-100 text-blue-700" },
  "thermal-management":  { label: { ko: "열관리", en: "Thermal", zh: "热管理" }, color: "bg-orange-100 text-orange-700" },
  "laser-equipment":     { label: { ko: "레이저", en: "Laser", zh: "激光" }, color: "bg-violet-100 text-violet-700" },
  "ev-charging":         { label: { ko: "EV 충전", en: "EV Charging", zh: "EV充电" }, color: "bg-green-100 text-green-700" },
};

function formatDate(date: Date, locale: string): string {
  if (locale === "ko") return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  if (locale === "zh") return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const PAGE_TITLE = { ko: "기술 인사이트", en: "Technical Insights", zh: "技术洞察" };
const PAGE_SUBTITLE = {
  ko: "반도체·레이저·EV·열관리 분야의 전문 기술 가이드",
  en: "Expert technical guides on semiconductor, laser, EV & thermal management",
  zh: "半导体、激光、EV与热管理领域的专业技术指南",
};
const READ_MORE = { ko: "자세히 보기 →", en: "Read more →", zh: "阅读更多 →" };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => {
              const title = article.title[locale] || article.title.ko;
              const bodyText = getArticleBody(article, locale).replace(/##|###|\*\*|`/g, "").trim();
              const excerpt = bodyText.slice(0, 100) + (bodyText.length > 100 ? "…" : "");
              const chip = CATEGORY_CHIP[article.category];
              return (
                <Link
                  key={article.slug}
                  href={`/insights/${article.slug}${lp(locale)}`}
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
                    <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 mt-auto">
                      {READ_MORE[locale]}
                    </span>
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
