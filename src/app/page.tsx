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

  const categories = db.prepare("SELECT * FROM product_categories ORDER BY sort_order").all() as any[];

  return (
    <>
      <HomeJsonLd />
      <Header locale={locale} />

      <main>
      {/* Hero Section */}
      <section className="hero-gradient min-h-[88vh] flex items-end pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0 w-full">
          <div className="max-w-4xl animate-fade-in pb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-7">
              {t(locale, "hero.title")}
            </h1>
            <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-xl">
              {t(locale, "hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-delay">
              <Link
                href={`/products?lang=${locale}`}
                className="px-8 py-3.5 bg-white text-[var(--primary)] font-bold rounded-lg hover:bg-gray-100 transition text-base"
              >
                {t(locale, "hero.cta")}
              </Link>
              <Link
                href={`/contact?lang=${locale}`}
                className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/8 transition text-base"
              >
                {t(locale, "hero.contact")}
              </Link>
            </div>
          </div>
          {/* Single-line facts strip */}
          <div className="border-t border-white/10 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            {[
              locale === "ko" ? "창립 2023" : locale === "zh" ? "创立 2023" : "Est. 2023",
              locale === "ko" ? "5개국 수출 네트워크" : locale === "zh" ? "5国出口网络" : "5-Country Export Network",
              locale === "ko" ? "반도체 · EV · 열관리 · 레이저" : locale === "zh" ? "半导体 · EV · 热管理 · 激光" : "Semiconductor · EV · Thermal · Laser",
              "B2B",
            ].map((fact, i) => (
              <span key={i} className="text-sm text-white/45 tracking-wide">{fact}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Business Areas */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <p className="text-xs font-bold text-[var(--accent)] tracking-[0.15em] uppercase mb-3">01 — {locale === "ko" ? "취급 분야" : locale === "zh" ? "业务领域" : "What We Trade"}</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--primary)]">
                {t(locale, "products.title")}
              </h2>
            </div>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed">{t(locale, "products.subtitle")}</p>
          </div>

          {/* Icon map keyed by category slug */}
          {(() => {
            const categoryDesc: Record<string, Record<string, string>> = {
              "semiconductor-parts": {
                ko: "반도체 제조·검사 장비의 핵심 부품 및 소모품 조달",
                en: "Critical parts and consumables for semiconductor fab & inspection equipment",
                zh: "半导体制造检测设备核心零部件采购",
              },
              "ev-charging": {
                ko: "전기차 충전 인프라 구축을 위한 충전기 및 주변 솔루션",
                en: "EV charger hardware and infrastructure solutions for charging network buildout",
                zh: "电动车充电基础设施充电桩及周边解决方案",
              },
              "thermal-management": {
                ko: "전력·전자 장비의 발열 제어를 위한 열관리 부품 및 시스템",
                en: "Thermal control components and systems for power electronics and industrial equipment",
                zh: "电力电子设备散热控制零部件及热管理系统",
              },
              "laser-equipment": {
                ko: "반도체·정밀부품 가공을 위한 워터젯 레이저 정밀 가공 장비",
                en: "Waterjet laser precision machining equipment for semiconductor and precision parts",
                zh: "用于半导体精密零件加工的水刀激光精密加工设备",
              },
            };
            const categoryIcons: Record<string, React.ReactNode> = {
              "semiconductor-parts": (
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
                </svg>
              ),
              "ev-charging": (
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              ),
              "thermal-management": (
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                </svg>
              ),
              "laser-equipment": (
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
            const [featured, ...rest] = categories;
            const featuredIcon = categoryIcons[featured?.slug] ?? fallbackIcon;
            const featuredDesc = categoryDesc[featured?.slug]?.[locale] ?? null;
            return (
          <div className="grid lg:grid-cols-5 gap-4">
            {/* Featured first card */}
            {featured && (
              <Link
                href={`/products?lang=${locale}&category=${featured.slug}`}
                className="card-hover group lg:col-span-2 bg-[var(--primary)] rounded-xl p-8 flex flex-col justify-between min-h-[260px]"
              >
                <div>
                  <p className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase mb-6">01</p>
                  <h3 className="text-2xl font-black text-white mb-3 leading-tight">
                    {localizedField(featured, "name", locale)}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {featuredDesc || localizedField(featured, "description", locale)}
                  </p>
                </div>
                <span className="text-white/40 text-sm mt-6 group-hover:text-white transition">
                  {t(locale, "products.detail")} →
                </span>
              </Link>
            )}
            {/* Remaining 3 as vertical list */}
            <div className="lg:col-span-3 grid sm:grid-cols-1 gap-4">
              {rest.map((cat: any, idx: number) => {
                const desc = categoryDesc[cat.slug]?.[locale] ?? null;
                return (
                  <Link
                    key={cat.id}
                    href={`/products?lang=${locale}&category=${cat.slug}`}
                    className="card-hover group flex items-center gap-5 bg-[var(--bg-alt)] rounded-xl px-6 py-5 border border-gray-100 hover:border-[var(--accent)]/30"
                  >
                    <span className="text-xs font-black text-[var(--accent)] w-6 shrink-0 tabular-nums">0{idx + 2}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-[var(--primary)] group-hover:text-[var(--accent)] transition mb-1">
                        {localizedField(cat, "name", locale)}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {desc || localizedField(cat, "description", locale)}
                      </p>
                    </div>
                    <span className="text-gray-300 group-hover:text-[var(--accent)] transition shrink-0">→</span>
                  </Link>
                );
              })}
            </div>
          </div>
            );
          })()}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[var(--bg-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-[var(--accent)] tracking-[0.15em] uppercase mb-4">02 — {locale === "ko" ? "OHI Tech 소개" : locale === "zh" ? "关于我们" : "About Us"}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--primary)] mb-5">
              {t(locale, "about.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t(locale, "about.description")}
            </p>
            <div className="border-l-2 border-[var(--accent)] pl-5 mb-8 space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{t(locale, "about.mission")}</p>
                <p className="text-base font-bold text-[var(--primary)]">{t(locale, "about.mission.text")}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{t(locale, "about.markets")}</p>
                <p className="text-base font-bold text-[var(--primary)]">{t(locale, "about.markets.text")}</p>
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
        </div>
      </section>

      {/* CTA Section — dark strip, breaks white monotony */}
      <section className="py-20 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {locale === "ko" ? "견적이 필요하신가요?" : locale === "zh" ? "需要报价吗？" : "Need a quote?"}
              </h2>
              <p className="text-white/60 mt-3 max-w-lg leading-relaxed">
                {locale === "ko"
                  ? "반도체 장비, EV 충전, 열관리, 레이저 — 품목과 수량을 알려주시면 24시간 이내 답변드립니다."
                  : locale === "zh"
                  ? "半导体设备、EV充电、热管理、激光——告知品目和数量，24小时内回复。"
                  : "Semiconductor parts, EV charging, thermal management, laser — tell us what you need and we'll respond within 24 hours."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href={`/contact?lang=${locale}&type=quote`}
                className="px-7 py-3.5 bg-white text-[var(--primary)] font-bold rounded-lg hover:bg-gray-100 transition"
              >
                {t(locale, "nav.quote")}
              </Link>
              <Link
                href={`/contact?lang=${locale}`}
                className="px-7 py-3.5 border border-white/25 text-white font-semibold rounded-lg hover:bg-white/8 transition"
              >
                {t(locale, "hero.contact")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer locale={locale} />
    </>
  );
}
