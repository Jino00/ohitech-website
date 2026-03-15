"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";
import { t } from "@/i18n/dictionaries";
import { localizedField } from "@/lib/locale";

interface Props {
  locale: Locale;
  categories: any[];
  products: any[];
  initialCategory: string;
}

export default function ProductList({ locale, categories, products, initialCategory }: Props) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || "");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p: any) => {
      const matchCategory = !activeCategory || p.category_slug === activeCategory;
      const name = localizedField(p, "name", locale).toLowerCase();
      const desc = localizedField(p, "description", locale).toLowerCase();
      const partner = localizedField(p, "partner_name", locale).toLowerCase();
      const q = search.toLowerCase();
      const matchSearch = !q || name.includes(q) || desc.includes(q) || partner.includes(q);
      return matchCategory && matchSearch;
    });
  }, [products, activeCategory, search, locale]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              !activeCategory ? "bg-[var(--accent)] text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {t(locale, "products.all")}
          </button>
          {categories.map((cat: any) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat.slug
                  ? "bg-[var(--accent)] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {localizedField(cat, "name", locale)}
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t(locale, "products.search")}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">{t(locale, "products.noResults")}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product: any) => (
            <div
              key={product.id}
              className="card-hover bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              {/* Product Image Area */}
              <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-5xl opacity-30">
                  {product.category_slug === "semiconductor-parts" ? "⚡" :
                   product.category_slug === "ev-charging" ? "🔌" :
                   product.category_slug === "thermal-management" ? "🌡️" : "🔬"}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-[var(--bg-alt)] text-[var(--accent)] rounded-full font-medium">
                    {localizedField(product, "cat_name", locale)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {localizedField(product, "partner_name", locale)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
                  {localizedField(product, "name", locale)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {localizedField(product, "description", locale)}
                </p>
                <Link
                  href={`/contact?lang=${locale}&type=quote&product=${product.id}`}
                  className="inline-block mt-4 text-sm text-[var(--accent)] font-medium hover:underline"
                >
                  {t(locale, "nav.quote")} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
