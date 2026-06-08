import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, buildAlternates } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";
import { getDb } from "@/db/schema";
import ProductList from "../../ProductList";
import {
  getMetaForSub,
  getMetaForCategory,
  getOgImages,
  getTwitterImages,
  SemiconductorJsonLd,
} from "../../_seo";

const BASE_URL = "https://www.ohitech.co.kr";

const SUB_H1: Record<string, { ko: string; en: string; zh: string }> = {
  "esc":             { ko: "정전척 (ESC)",       en: "Electrostatic Chuck (ESC)",           zh: "静电卡盘 (ESC)" },
  "wafer-carrier":   { ko: "웨이퍼 캐리어 · FOUP", en: "Wafer Carrier & FOUP",               zh: "晶圆载体 · FOUP" },
  "dry-vacuum-pump": { ko: "드라이 진공 펌프",    en: "Dry Vacuum Pump",                     zh: "干式真空泵" },
  "oring":           { ko: "반도체 O-Ring",       en: "Semiconductor O-Ring",                zh: "半导体O-Ring" },
};

// Only semiconductor-parts has sub pages
const VALID_SUBS: Record<string, string[]> = {
  "semiconductor-parts": ["esc", "wafer-carrier", "dry-vacuum-pump", "oring"],
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; sub: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { category, sub } = await params;
  const validSubs = VALID_SUBS[category];
  if (!validSubs || !validSubs.includes(sub)) return {};

  const sp = await searchParams;
  const locale = getLocale(sp);
  const subMeta = getMetaForSub(sub, locale);
  const meta = subMeta ?? getMetaForCategory(category, locale);
  const canonicalPath = `/products/${category}/${sub}`;

  return {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}${canonicalPath}`,
      siteName: "OHI Tech",
      locale: locale === "ko" ? "ko_KR" : locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: getOgImages(category, meta.title),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: getTwitterImages(category),
    },
    alternates: buildAlternates(`${BASE_URL}${canonicalPath}`),
    robots: { index: true, follow: true },
  };
}

export default async function SubPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; sub: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { category, sub } = await params;
  const validSubs = VALID_SUBS[category];

  if (!validSubs || !validSubs.includes(sub)) {
    redirect(`/products/${category}`);
  }

  const sp = await searchParams;
  const locale = getLocale(sp);
  const db = getDb();

  const categories = db.prepare("SELECT * FROM product_categories ORDER BY sort_order").all() as any[];
  const products = db.prepare(`
    SELECT p.*, c.slug as category_slug, c.name_ko as cat_name_ko, c.name_en as cat_name_en, c.name_zh as cat_name_zh,
           pr.name_ko as partner_name_ko, pr.name_en as partner_name_en, pr.name_zh as partner_name_zh
    FROM products p
    JOIN product_categories c ON p.category_id = c.id
    JOIN partners pr ON p.partner_id = pr.id
    WHERE p.is_active = 1
    ORDER BY p.sort_order
  `).all() as any[];

  const lineups = db.prepare(`
    SELECT * FROM product_lineups WHERE is_active = 1 ORDER BY sort_order
  `).all() as any[];

  const lineupsByProduct: Record<number, any[]> = {};
  for (const l of lineups) {
    if (!lineupsByProduct[l.product_id]) lineupsByProduct[l.product_id] = [];
    lineupsByProduct[l.product_id].push(l);
  }

  return (
    <>
      <SemiconductorJsonLd />
      <Header locale={locale} />
      <main className="pt-16 min-h-screen bg-[var(--bg-alt)]">
        <section className="hero-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">{(locale === "zh" ? SUB_H1[sub]?.zh : locale === "en" ? SUB_H1[sub]?.en : SUB_H1[sub]?.ko) ?? t(locale, "products.title")}</h1>
            <p className="text-white/60 text-lg">{t(locale, "products.subtitle")}</p>
          </div>
        </section>
        <ProductList
          locale={locale}
          categories={categories}
          products={products}
          lineupsByProduct={lineupsByProduct}
          initialCategory={category}
          initialSub={sub}
        />
      </main>
      <Footer locale={locale} />
    </>
  );
}
