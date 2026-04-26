import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale";
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
} from "../_seo";

const BASE_URL = "https://www.ohitech.co.kr";
const VALID_CATEGORIES = ["semiconductor-parts", "ev-charging", "thermal-management", "laser-equipment"];

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
    title: meta.title,
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
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        ko: `${BASE_URL}${canonicalPath}?lang=ko`,
        en: `${BASE_URL}${canonicalPath}?lang=en`,
        zh: `${BASE_URL}${canonicalPath}?lang=zh`,
      },
    },
    robots: { index: true, follow: true },
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

  if (!VALID_CATEGORIES.includes(category)) {
    redirect("/products");
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

  const isLaser = category === "laser-equipment";
  const isThermal = category === "thermal-management";
  const isSemiconductor = category === "semiconductor-parts";
  const isEV = category === "ev-charging";

  return (
    <>
      {isLaser && <LaserJsonLd />}
      {isThermal && <ThermalJsonLd />}
      {isSemiconductor && <SemiconductorJsonLd />}
      {isEV && <EvJsonLd />}
      <Header locale={locale} />
      <main className="pt-16 min-h-screen bg-[var(--bg-alt)]">
        <section className="hero-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">{t(locale, "products.title")}</h1>
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
