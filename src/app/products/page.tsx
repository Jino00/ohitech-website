import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, localizedField } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";
import { getDb } from "@/db/schema";
import ProductList from "./ProductList";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = getLocale(params);
  const categorySlug = typeof params.category === "string" ? params.category : "";
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

  return (
    <>
      <Header locale={locale} />
      <main className="pt-16 min-h-screen bg-[var(--bg-alt)]">
        {/* Page Header */}
        <section className="hero-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white mb-2">{t(locale, "products.title")}</h1>
            <p className="text-gray-300">{t(locale, "products.subtitle")}</p>
          </div>
        </section>

        <ProductList
          locale={locale}
          categories={categories}
          products={products}
          initialCategory={categorySlug}
        />
      </main>
      <Footer locale={locale} />
    </>
  );
}
