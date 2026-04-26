import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";
import { getDb } from "@/db/schema";
import ProductList from "./ProductList";
import {
  PRODUCTS_META,
  getMetaForCategory,
  getOgImages,
  getTwitterImages,
  LaserJsonLd,
  ThermalJsonLd,
  SemiconductorJsonLd,
  EvJsonLd,
} from "./_seo";

const BASE_URL = "https://www.ohitech.co.kr";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  const locale = getLocale(params);
  // generateMetadata runs before the page component — no redirect here, just use /products meta
  const meta = PRODUCTS_META[locale];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/products`,
      siteName: "OHI Tech",
      locale: locale === "ko" ? "ko_KR" : locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: getOgImages("", meta.title),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: getTwitterImages(""),
    },
    alternates: {
      canonical: `${BASE_URL}/products`,
      languages: {
        ko: `${BASE_URL}/products?lang=ko`,
        en: `${BASE_URL}/products?lang=en`,
        zh: `${BASE_URL}/products?lang=zh`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const locale = getLocale(params);
  const categorySlug = typeof params.category === "string" ? params.category : "";
  const subSlug = typeof params.sub === "string" ? params.sub : "";

  // Redirect legacy ?category=X URLs to path-based URLs
  if (categorySlug) {
    const langParam = `?lang=${locale}`;
    if (subSlug) {
      redirect(`/products/${categorySlug}/${subSlug}${langParam}`);
    } else {
      redirect(`/products/${categorySlug}${langParam}`);
    }
  }

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
          initialCategory=""
          initialSub=""
        />
      </main>
      <Footer locale={locale} />
    </>
  );
}
