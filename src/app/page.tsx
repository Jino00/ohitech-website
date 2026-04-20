import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, localizedField } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";
import { getDb } from "@/db/schema";

function HomeJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.ohitech.co.kr/#organization",
        name: "OHI Tech",
        url: "https://www.ohitech.co.kr",
        logo: "https://www.ohitech.co.kr/images/logo-large.png",
        description: "Global technology trading company specializing in semiconductor parts, EV charging, thermal management, and laser precision equipment.",
        foundingDate: "2023",
        address: { "@type": "PostalAddress", addressCountry: "KR" },
        areaServed: ["KR", "TW", "CN", "SG", "JP"],
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          url: "https://www.ohitech.co.kr/contact",
          availableLanguage: ["Korean", "English", "Chinese"],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.ohitech.co.kr/#website",
        url: "https://www.ohitech.co.kr",
        name: "OHI Tech",
        publisher: { "@id": "https://www.ohitech.co.kr/#organization" },
        inLanguage: ["ko", "en", "zh"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: "https://www.ohitech.co.kr" },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = getLocale(params);
  const db = getDb();

  const partners = db.prepare("SELECT * FROM partners WHERE is_active = 1 ORDER BY sort_order").all() as any[];
  const categories = db.prepare("SELECT * FROM product_categories ORDER BY sort_order").all() as any[];

  return (
    <>
      <HomeJsonLd />
      <Header locale={locale} />

      <main>
      {/* Hero Section */}
      <section className="hero-gradient min-h-[90vh] flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl animate-fade-in">
            <p className="text-white/90 text-sm font-semibold tracking-wider uppercase mb-4">
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
                className="px-10 py-4 bg-white text-[var(--primary)] font-bold rounded-lg hover:bg-gray-100 transition shadow-lg text-lg"
              >
                {t(locale, "hero.cta")}
              </Link>
              <Link
                href={`/contact?lang=${locale}`}
                className="px-10 py-4 border-2 border-white/50 text-white font-bold rounded-lg hover:bg-white/10 transition text-lg"
              >
                {t(locale, "hero.contact")}
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Business Areas */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-[var(--primary)] mb-3">
              {t(locale, "products.title")}
            </h2>
            <div className="w-16 h-1 bg-[var(--accent)] mb-4"></div>
            <p className="text-gray-600 max-w-2xl">{t(locale, "products.subtitle")}</p>
          </div>

          {/* Icon map keyed by category slug */}
          {(() => {
            const categoryIcons: Record<string, React.ReactNode> = {
              semiconductor: (
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
                </svg>
              ),
              "ev-charging": (
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              ),
              thermal: (
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                </svg>
              ),
              laser: (
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              ),
            };
            const fallbackIcon = (
              <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
            );
            return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat: any) => {
              const icon = categoryIcons[cat.slug] ?? fallbackIcon;
              return (
                <Link
                  key={cat.id}
                  href={`/products?lang=${locale}&category=${cat.slug}`}
                  className="card-hover group bg-[var(--bg-alt)] rounded-xl p-8 border border-gray-100 hover:border-[var(--accent)]/30"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/5 flex items-center justify-center mb-4">
                    {icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--primary)] mb-2 group-hover:text-[var(--accent)] transition">
                    {localizedField(cat, "name", locale)}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {localizedField(cat, "description", locale) || t(locale, "products.subtitle")}
                  </p>
                  <div className="text-[var(--accent)] text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                    {t(locale, "products.detail")} →
                  </div>
                </Link>
              );
            })}
          </div>
            );
          })()}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[var(--bg-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold tracking-wider rounded-full mb-4">
                SINCE 2023
              </span>
              <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">
                {t(locale, "about.title")}
              </h2>
              <div className="w-16 h-1 bg-[var(--accent)] mb-6"></div>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t(locale, "about.description")}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t(locale, "about.mission")}</p>
                  <p className="text-sm font-semibold text-[var(--primary)]">{t(locale, "about.mission.text")}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t(locale, "about.markets")}</p>
                  <p className="text-sm font-semibold text-[var(--primary)]">{t(locale, "about.markets.text")}</p>
                </div>
              </div>
              <Link
                href={`/about?lang=${locale}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-light)] transition font-medium"
              >
                {t(locale, "products.detail")}
                <span>→</span>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-2xl overflow-hidden relative">
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.06]" style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }} />
                <div className="relative flex flex-col items-center justify-center h-full text-white p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <span className="text-xl font-bold">KR</span>
                    <div className="flex flex-col items-center">
                      <span className="text-lg">→</span>
                      <span className="text-lg">←</span>
                    </div>
                    <span className="text-xl font-bold">World</span>
                  </div>
                  <p className="text-xl font-bold mb-2">Korea ↔ World</p>
                  <p className="text-sm text-gray-200 text-center max-w-xs">
                    {locale === "ko" ? "양방향 기술 무역으로 글로벌 산업 발전에 기여합니다" : locale === "zh" ? "通过双向技术贸易为全球产业发展做贡献" : "Contributing to global industry through bi-directional tech trade"}
                  </p>
                  <div className="flex gap-3 mt-6">
                    {["TW", "CN", "SG", "JP"].map((code, i) => (
                      <span key={i} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold backdrop-blur-sm">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
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
              className="px-8 py-4 bg-white text-[var(--primary)] font-bold rounded-lg hover:bg-gray-100 transition text-lg"
            >
              {t(locale, "nav.quote")}
            </Link>
            <Link
              href={`/contact?lang=${locale}`}
              className="px-8 py-4 border-2 border-white/50 text-white font-bold rounded-lg hover:bg-white/10 transition text-lg"
            >
              {t(locale, "hero.contact")}
            </Link>
          </div>
        </div>
      </section>

      </main>
      <Footer locale={locale} />
    </>
  );
}
