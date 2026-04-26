import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, lp } from "@/lib/locale";
import { articles, getArticleBody } from "../_data";
import { buildArticleMetadata, ArticleJsonLd } from "../_seo";

const CATEGORY_SLUGS = ["semiconductor-parts", "laser-equipment", "thermal-management", "ev-charging"] as const;
type CategorySlug = (typeof CATEGORY_SLUGS)[number];

const CATEGORY_META: Record<CategorySlug, {
  label: { ko: string; en: string; zh: string };
  desc: { ko: string; en: string; zh: string };
  color: string;
  accent: string;
}> = {
  "semiconductor-parts": {
    label: { ko: "반도체 부품", en: "Semiconductor Parts", zh: "半导体零部件" },
    desc: {
      ko: "ESC, 웨이퍼 캐리어, 드라이 펌프, O-링 등 반도체 공정 핵심 부품 기술 가이드",
      en: "Technical guides for ESC, wafer carrier, dry pump, O-ring and other semiconductor process components",
      zh: "ESC、晶圆载体、干泵、O形圈等半导体工艺核心零部件技术指南",
    },
    color: "bg-blue-100 text-blue-700",
    accent: "text-blue-600",
  },
  "laser-equipment": {
    label: { ko: "레이저 장비", en: "Laser Equipment", zh: "激光设备" },
    desc: {
      ko: "CO₂·파이버·UV·워터젯 레이저 특성과 공정별 최적 선택 기준",
      en: "CO₂, fiber, UV, and waterjet laser characteristics and selection criteria by process",
      zh: "CO₂、光纤、UV、水射流激光特性及各工艺最优选型标准",
    },
    color: "bg-violet-100 text-violet-700",
    accent: "text-violet-600",
  },
  "thermal-management": {
    label: { ko: "열관리", en: "Thermal Management", zh: "热管理" },
    desc: {
      ko: "반도체 장비 발열 제어를 위한 냉각 솔루션 선택 가이드",
      en: "Cooling solution selection guide for thermal control in semiconductor equipment",
      zh: "半导体设备散热控制的冷却解决方案选型指南",
    },
    color: "bg-orange-100 text-orange-700",
    accent: "text-orange-600",
  },
  "ev-charging": {
    label: { ko: "EV 충전", en: "EV Charging", zh: "EV充电" },
    desc: {
      ko: "전기차 충전 인프라 구축을 위한 충전기 선택 및 설치 기준",
      en: "EV charger selection and installation criteria for charging infrastructure",
      zh: "电动汽车充电基础设施建设的充电桩选型与安装标准",
    },
    color: "bg-green-100 text-green-700",
    accent: "text-green-600",
  },
};

// All chips (used in both category page and article page)
const CATEGORY_CHIP: Record<string, { label: { ko: string; en: string; zh: string }; color: string }> = {
  "semiconductor-parts": { label: { ko: "반도체 부품", en: "Semiconductor", zh: "半导体" }, color: "bg-blue-100 text-blue-700" },
  "thermal-management":  { label: { ko: "열관리", en: "Thermal", zh: "热管理" }, color: "bg-orange-100 text-orange-700" },
  "laser-equipment":     { label: { ko: "레이저", en: "Laser", zh: "激光" }, color: "bg-violet-100 text-violet-700" },
  "ev-charging":         { label: { ko: "EV 충전", en: "EV Charging", zh: "EV充电" }, color: "bg-green-100 text-green-700" },
};

const INSIGHTS_LABEL = { ko: "인사이트", en: "Insights", zh: "洞察" };
const READ_MORE = { ko: "자세히 보기 →", en: "Read more →", zh: "阅读更多 →" };
const RELATED_PRODUCT = { ko: "관련 제품 보기", en: "View Related Products", zh: "查看相关产品" };
const CONTACT_CTA = { ko: "제품 문의하기", en: "Contact Us", zh: "联系我们" };
const BACK_TO_CATEGORY = { ko: "← 카테고리로", en: "← Back to category", zh: "← 返回分类" };
const BACK_TO_INSIGHTS = { ko: "← 인사이트 목록", en: "← All Insights", zh: "← 全部洞察" };
const READ_MIN = { ko: "분 읽기", en: "min read", zh: "分钟阅读" };

export async function generateStaticParams() {
  const categoryParams = CATEGORY_SLUGS.map((s) => ({ slug: s }));
  const articleParams = articles.map((a) => ({ slug: a.slug }));
  return [...categoryParams, ...articleParams];
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sp = await searchParams;
  const locale = getLocale(sp);

  if (CATEGORY_SLUGS.includes(slug as CategorySlug)) {
    const meta = CATEGORY_META[slug as CategorySlug];
    return {
      title: meta.label[locale],
      description: meta.desc[locale],
    };
  }

  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return buildArticleMetadata(slug, locale);
}

function formatDate(date: Date, locale: string): string {
  if (locale === "ko") return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  if (locale === "zh") return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 250));
}

function renderTable(tableText: string): string {
  const lines = tableText.trim().split('\n').filter(l => l.trim() && !/^\|[\s\-:|]+\|$/.test(l.trim()));
  if (lines.length === 0) return '';
  const rows = lines.map((line) =>
    line.replace(/^\||\|$/g, '').split('|').map(c => c.trim())
  );
  const [header, ...body] = rows;
  const thead = `<thead><tr>${header.map(c => `<th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide bg-gray-50">${c}</th>`).join('')}</tr></thead>`;
  const tbody = body.map(row => `<tr class="border-t border-gray-100">${row.map(c => `<td class="px-4 py-2 text-sm text-gray-700">${c}</td>`).join('')}</tr>`).join('');
  return `<div class="overflow-x-auto my-6"><table class="w-full border border-gray-200 rounded-lg text-sm">${thead}<tbody>${tbody}</tbody></table></div>`;
}

function renderMarkdown(text: string): string {
  const tableRegex = /(\|.+\|\n(?:\|[\s\-:|]+\|\n)(?:\|.+\|\n?)*)/gm;
  text = text.replace(tableRegex, (match) => renderTable(match));

  return text
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-gray-800 mt-6 mb-2">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) =>
      `<figure class="my-6"><img src="${src}" alt="${alt}" class="w-full rounded-lg border border-gray-200 shadow-sm" loading="lazy" />${alt ? `<figcaption class="text-center text-xs text-gray-400 mt-2">${alt}</figcaption>` : ''}</figure>`)
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-gray-700">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul class="my-3 space-y-1">${match}</ul>`)
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200" />')
    .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed my-3">')
    .replace(/^(?!<[hufl])/gm, '')
    .trim();
}

// ─── Category listing page ────────────────────────────────────────────────────
function CategoryPage({
  categorySlug,
  locale,
}: {
  categorySlug: CategorySlug;
  locale: "ko" | "en" | "zh";
}) {
  const meta = CATEGORY_META[categorySlug];
  const categoryArticles = articles.filter((a) => a.category === categorySlug);

  return (
    <>
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
export default async function SlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const locale = getLocale(sp) as "ko" | "en" | "zh";

  // Category page
  if (CATEGORY_SLUGS.includes(slug as CategorySlug)) {
    return <CategoryPage categorySlug={slug as CategorySlug} locale={locale} />;
  }

  // Article detail page
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const title = article.title[locale] || article.title.ko;
  const body = getArticleBody(article, locale);
  const chip = CATEGORY_CHIP[article.category];
  const categoryMeta = CATEGORY_META[article.category as CategorySlug];
  const readingTime = estimateReadingTime(body);

  return (
    <>
      <ArticleJsonLd slug={slug} locale={locale} />
      <Header locale={locale} />
      <main className="pt-16 min-h-screen bg-[var(--bg-alt)]">
        {/* Hero */}
        <section className="hero-gradient py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-white/50 mb-4 flex items-center gap-1 flex-wrap">
              <Link href={`/insights${lp(locale)}`} className="hover:text-white/80 transition-colors">
                {INSIGHTS_LABEL[locale]}
              </Link>
              <span className="mx-1">/</span>
              <Link
                href={`/insights/${article.category}${lp(locale)}`}
                className="hover:text-white/80 transition-colors"
              >
                {categoryMeta?.label[locale] ?? article.category}
              </Link>
              <span className="mx-1">/</span>
              <span className="text-white/70 line-clamp-1">{title}</span>
            </nav>
            {/* Category chip */}
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${chip.color} mb-4 inline-block`}>
              {chip.label[locale] || chip.label.ko}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3 leading-tight">
              {title}
            </h1>
            <p className="text-white/50 text-sm">
              {formatDate(article.publishedAt, locale)} · {readingTime} {READ_MIN[locale]}
            </p>
          </div>
        </section>

        {/* Article body */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div
              className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: `<p class="text-gray-700 leading-relaxed my-3">${renderMarkdown(body)}</p>`,
              }}
            />
          </article>

          {/* Related product CTA */}
          <div className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900 mb-1">{RELATED_PRODUCT[locale]}</p>
              <p className="text-sm text-gray-500">{article.description[locale] || article.description.ko}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href={`/products/${article.relatedProductPath}${lp(locale)}`}
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                {RELATED_PRODUCT[locale]}
              </Link>
              <Link
                href={`/contact${lp(locale)}`}
                className="px-5 py-2.5 border border-blue-600 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                {CONTACT_CTA[locale]}
              </Link>
            </div>
          </div>

          {/* Back navigation */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <Link
              href={`/insights/${article.category}${lp(locale)}`}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              {BACK_TO_CATEGORY[locale]}
            </Link>
            <span className="text-gray-300">|</span>
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
