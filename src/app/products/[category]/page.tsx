import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, buildAlternates } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";
import { getDb } from "@/db/schema";
import ProductList from "../ProductList";
import {
  getMetaForCategory,
  getOgImages,
  getTwitterImages,
  LaserJsonLd,
  ThermalJsonLd,
  SemiconductorJsonLd,
  EvJsonLd,
  TecoJsonLd,
} from "../_seo";

const BASE_URL = "https://www.ohitech.co.kr";
const VALID_CATEGORIES = ["semiconductor-parts", "ev-charging", "thermal-management", "laser-equipment", "power-distribution"];

const CATEGORY_H1: Record<string, { ko: string; en: string; zh: string }> = {
  "semiconductor-parts":  { ko: "반도체 장비 부품",      en: "Semiconductor Equipment Parts",       zh: "半导体设备零部件" },
  "ev-charging":          { ko: "EV 충전 솔루션",        en: "EV Charging Solutions",                zh: "电动车充电解决方案" },
  "thermal-management":   { ko: "열관리 솔루션",          en: "Thermal Management Solutions",         zh: "热管理解决方案" },
  "laser-equipment":      { ko: "레이저 정밀 장비",       en: "Laser Precision Equipment",            zh: "激光精密设备" },
  "power-distribution":   { ko: "배전·드론·HVAC 솔루션", en: "Power Distribution · Drone · HVAC",    zh: "配电·无人机·HVAC解决方案" },
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) return {};

  const sp = await searchParams;
  const locale = getLocale(sp);
  const meta = getMetaForCategory(category, locale);
  const canonicalPath = `/products/${category}`;

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
    // noindex 카테고리는 hreflang/canonical alternates를 방출하지 않는다
    // (noindex ↔ alternates는 모순 신호 — Codex review P2)
    alternates: category === "power-distribution"
      ? undefined
      : buildAlternates(`${BASE_URL}${canonicalPath}`, locale),
    robots: category === "power-distribution"
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category) || category === "power-distribution") {
    redirect("/products");
  }

  const sp = await searchParams;
  const locale = getLocale(sp);
  const db = getDb();

  const categories = db.prepare("SELECT * FROM product_categories WHERE slug != 'power-distribution' ORDER BY sort_order").all() as any[];
  const products = db.prepare(`
    SELECT p.*, c.slug as category_slug, c.name_ko as cat_name_ko, c.name_en as cat_name_en, c.name_zh as cat_name_zh,
           pr.name_ko as partner_name_ko, pr.name_en as partner_name_en, pr.name_zh as partner_name_zh
    FROM products p
    JOIN product_categories c ON p.category_id = c.id
    JOIN partners pr ON p.partner_id = pr.id
    WHERE p.is_active = 1 AND c.slug != 'power-distribution'
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

  const isLaser = category === "laser-equipment";
  const isThermal = category === "thermal-management";
  const isSemiconductor = category === "semiconductor-parts";
  const isEV = category === "ev-charging";
  const isTeco = category === "power-distribution";

  const catEntry = CATEGORY_H1[category];
  const h1Text = catEntry
    ? (locale === "zh" ? catEntry.zh : locale === "en" ? catEntry.en : catEntry.ko)
    : t(locale, "products.title");

  return (
    <>
      {isLaser && <LaserJsonLd />}
      {isThermal && <ThermalJsonLd />}
      {isSemiconductor && <SemiconductorJsonLd />}
      {isEV && <EvJsonLd />}
      {isTeco && <TecoJsonLd />}
      <Header locale={locale} />
      <main className="pt-16 min-h-screen bg-[var(--bg-alt)]">
        <section className="hero-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-3">{h1Text}</h1>
            <p className="text-white/60 text-lg">{t(locale, "products.subtitle")}</p>
          </div>
        </section>
        <ProductList
          locale={locale}
          categories={categories}
          products={products}
          lineupsByProduct={lineupsByProduct}
          initialCategory={category}
          initialSub=""
        />
      </main>
      <Footer locale={locale} />
    </>
  );
}
