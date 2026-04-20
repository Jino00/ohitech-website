import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale, localizedField } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";
import { getDb } from "@/db/schema";
import Link from "next/link";

const PARTNERS_META = {
  ko: {
    title: "파트너사 — OHI Tech | DT ENG·Zerova·T-Global·Hortech 공식 대리점",
    description: "OHI Tech의 글로벌 파트너사를 소개합니다. DT ENG(ESC), Zerova(EV 충전기), T-Global(열관리), Grandhitek(드라이펌프), NEOTECH(O-Ring), Hortech(레이저 장비) 공식 대리점.",
    keywords: "OHI Tech 파트너, DT ENG 대리점, Zerova 한국 대리점, T-Global 대리점, Hortech 대리점, Grandhitek, NEOTECH, 반도체 부품 공급사",
  },
  en: {
    title: "Partners — OHI Tech | Official Distributor of DT ENG, Zerova, T-Global & Hortech",
    description: "Meet OHI Tech's global partners. Official Korean distributor of DT ENG (ESC), Zerova (EV chargers), T-Global (thermal management), Grandhitek (dry pump), NEOTECH (O-Ring), Hortech (laser equipment).",
    keywords: "OHI Tech partners, DT ENG distributor, Zerova Korea distributor, T-Global distributor, Hortech distributor, Grandhitek, NEOTECH, semiconductor parts supplier",
  },
  zh: {
    title: "合作伙伴 — OHI Tech | DT ENG·Zerova·T-Global·Hortech授权经销商",
    description: "介绍OHI Tech的全球合作伙伴。DT ENG（ESC）、Zerova（电动车充电器）、T-Global（热管理）、Grandhitek（干式泵）、NEOTECH（O-Ring）、Hortech（激光设备）韩国官方代理商。",
    keywords: "OHI Tech合作伙伴, DT ENG代理商, Zerova韩国代理商, T-Global代理商, Hortech代理商, Grandhitek, NEOTECH, 半导体零部件供应商",
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  const locale = (typeof params.lang === "string" && ["ko", "en", "zh"].includes(params.lang)
    ? params.lang
    : "ko") as "ko" | "en" | "zh";
  const meta = PARTNERS_META[locale];
  const baseUrl = "https://www.ohitech.co.kr";
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/partners?lang=${locale}`,
      siteName: "OHI Tech",
      locale: locale === "ko" ? "ko_KR" : locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [{ url: `${baseUrl}/images/logo-large.png`, width: 400, height: 400, alt: "OHI Tech" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/images/logo-large.png`],
    },
    alternates: {
      canonical: `${baseUrl}/partners?lang=${locale}`,
      languages: {
        ko: `${baseUrl}/partners?lang=ko`,
        en: `${baseUrl}/partners?lang=en`,
        zh: `${baseUrl}/partners?lang=zh`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function PartnersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = getLocale(params);
  const db = getDb();

  const partners = db.prepare("SELECT * FROM partners WHERE is_active = 1 ORDER BY sort_order").all() as any[];

  const countryFlags: Record<string, string> = {
    Korea: "KR",
    Taiwan: "TW",
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
                      <span className="text-sm text-gray-600">
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
