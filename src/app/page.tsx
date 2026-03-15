import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, localizedField } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";
import { getDb } from "@/db/schema";

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = getLocale(params);
  const db = getDb();

  const partners = db.prepare("SELECT * FROM partners WHERE is_active = 1 ORDER BY sort_order").all() as any[];
  const categories = db.prepare("SELECT * FROM product_categories ORDER BY sort_order").all() as any[];

  return (
    <>
      <Header locale={locale} />

      {/* Hero Section */}
      <section className="hero-gradient min-h-[90vh] flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl animate-fade-in">
            <p className="text-[var(--accent-light)] text-sm font-semibold tracking-wider uppercase mb-4">
              Global Technology Trading Partner
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t(locale, "hero.title")}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t(locale, "hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-delay">
              <Link
                href={`/products?lang=${locale}`}
                className="px-8 py-3 bg-white text-[var(--primary)] font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg"
              >
                {t(locale, "hero.cta")}
              </Link>
              <Link
                href={`/contact?lang=${locale}`}
                className="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition"
              >
                {t(locale, "hero.contact")}
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-delay">
            {[
              { num: "6+", label: locale === "ko" ? "글로벌 파트너" : locale === "zh" ? "全球合作伙伴" : "Global Partners" },
              { num: "4", label: locale === "ko" ? "사업 분야" : locale === "zh" ? "业务领域" : "Business Areas" },
              { num: "4+", label: locale === "ko" ? "수출 국가" : locale === "zh" ? "出口国家" : "Export Countries" },
              { num: "10+", label: locale === "ko" ? "취급 제품" : locale === "zh" ? "产品种类" : "Product Lines" },
            ].map((s) => (
              <div key={s.num} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{s.num}</div>
                <div className="text-sm text-gray-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Areas (Samsung C&T style) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[var(--primary)] mb-3">
              {t(locale, "products.title")}
            </h2>
            <div className="section-divider mb-4"></div>
            <p className="text-gray-500">{t(locale, "products.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat: any, i: number) => {
              const icons = ["⚡", "🔌", "🌡️", "🔬"];
              return (
                <Link
                  key={cat.id}
                  href={`/products?lang=${locale}&category=${cat.slug}`}
                  className="card-hover group bg-[var(--bg-alt)] rounded-xl p-8 text-center border border-gray-100"
                >
                  <div className="text-4xl mb-4">{icons[i] || "📦"}</div>
                  <h3 className="text-lg font-semibold text-[var(--primary)] mb-2 group-hover:text-[var(--accent)] transition">
                    {localizedField(cat, "name", locale)}
                  </h3>
                  <div className="text-[var(--accent)] text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 transition">
                    {t(locale, "products.detail")} →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[var(--bg-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">
                {t(locale, "about.title")}
              </h2>
              <div className="w-16 h-1 bg-[var(--accent)] mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t(locale, "about.description")}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[var(--primary)] mb-1">{t(locale, "about.mission")}</h4>
                  <p className="text-sm text-gray-500">{t(locale, "about.mission.text")}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--primary)] mb-1">{t(locale, "about.markets")}</h4>
                  <p className="text-sm text-gray-500">{t(locale, "about.markets.text")}</p>
                </div>
              </div>
              <Link
                href={`/about?lang=${locale}`}
                className="inline-block mt-8 px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-light)] transition"
              >
                {t(locale, "products.detail")}
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-2xl flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl mb-4">🌏</div>
                  <p className="text-lg font-semibold">Korea → World</p>
                  <p className="text-sm text-gray-200 mt-1">World → Korea</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[var(--primary)] mb-3">
              {t(locale, "partners.title")}
            </h2>
            <div className="section-divider mb-4"></div>
            <p className="text-gray-500">{t(locale, "partners.subtitle")}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner: any) => (
              <Link
                key={partner.id}
                href={`/partners?lang=${locale}#partner-${partner.id}`}
                className="card-hover flex flex-col items-center p-6 rounded-xl border border-gray-100 bg-white"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--bg-alt)] flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-[var(--primary)]">
                    {localizedField(partner, "name", locale).charAt(0)}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-center text-[var(--primary)]">
                  {localizedField(partner, "name", locale)}
                </h4>
                <span className="text-xs text-gray-400 mt-1">{partner.country}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {locale === "ko" ? "제품 문의 및 견적 요청" : locale === "zh" ? "产品咨询与报价请求" : "Product Inquiry & Quote Request"}
          </h2>
          <p className="text-gray-300 mb-8">
            {locale === "ko"
              ? "필요한 제품이나 솔루션에 대해 문의해 주세요. 전문 담당자가 신속하게 답변 드리겠습니다."
              : locale === "zh"
              ? "请咨询您需要的产品或解决方案，专业负责人将迅速回复。"
              : "Contact us about the products or solutions you need. Our specialists will respond promptly."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/contact?lang=${locale}&type=quote`}
              className="px-8 py-3 bg-white text-[var(--primary)] font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              {t(locale, "nav.quote")}
            </Link>
            <Link
              href={`/contact?lang=${locale}`}
              className="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition"
            >
              {t(locale, "hero.contact")}
            </Link>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
