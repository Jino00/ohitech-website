import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, localizedField } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";
import { getDb } from "@/db/schema";
import Link from "next/link";

export default async function PartnersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = getLocale(params);
  const db = getDb();

  const partners = db.prepare("SELECT * FROM partners WHERE is_active = 1 ORDER BY sort_order").all() as any[];

  const countryFlags: Record<string, string> = {
    Korea: "🇰🇷",
    Taiwan: "🇹🇼",
  };

  return (
    <>
      <Header locale={locale} />
      <main className="pt-16 min-h-screen">
        {/* Page Header */}
        <section className="hero-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white mb-2">{t(locale, "partners.title")}</h1>
            <p className="text-gray-300">{t(locale, "partners.subtitle")}</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            {partners.map((partner: any) => (
              <div
                key={partner.id}
                id={`partner-${partner.id}`}
                className="bg-white rounded-xl border border-gray-100 p-8 card-hover"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Logo area */}
                  <div className="w-24 h-24 shrink-0 rounded-xl bg-[var(--bg-alt)] flex items-center justify-center">
                    <span className="text-3xl font-bold text-[var(--primary)]">
                      {localizedField(partner, "name", locale).charAt(0)}
                    </span>
                  </div>
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-[var(--primary)]">
                        {localizedField(partner, "name", locale)}
                      </h2>
                      <span className="text-sm text-gray-400">
                        {countryFlags[partner.country] || ""} {partner.country}
                      </span>
                    </div>
                    <span className="inline-block text-xs px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full font-medium mb-3">
                      {t(locale, `cat.${partner.category}`)}
                    </span>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {localizedField(partner, "description", locale)}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/products?lang=${locale}&category=${partner.category}`}
                        className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded-lg hover:bg-[var(--primary-light)] transition"
                      >
                        {t(locale, "partners.viewProducts")}
                      </Link>
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition"
                        >
                          Website →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
