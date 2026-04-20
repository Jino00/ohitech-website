import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";
import ContactForm from "./ContactForm";

const CONTACT_META = {
  ko: {
    title: "문의하기 — OHI Tech | 반도체·EV·레이저 장비 견적 요청",
    description: "OHI Tech에 제품 문의 및 견적을 요청하세요. 반도체 부품, EV 충전기, 열관리 소재, 레이저 정밀 장비 관련 문의를 빠르게 처리합니다.",
    keywords: "OHI Tech 문의, 반도체 부품 견적, EV 충전기 문의, 레이저 장비 견적, 열관리 소재 문의, 기술 무역 문의",
  },
  en: {
    title: "Contact OHI Tech | Request a Quote for Semiconductor, EV & Laser Equipment",
    description: "Contact OHI Tech for product inquiries and quotes. We handle requests for semiconductor parts, EV chargers, thermal management materials, and laser precision equipment quickly.",
    keywords: "OHI Tech contact, semiconductor parts quote, EV charger inquiry, laser equipment quote, thermal management inquiry, technology trading contact",
  },
  zh: {
    title: "联系 OHI Tech | 半导体·电动车·激光设备询价",
    description: "联系OHI Tech获取产品咨询和报价。我们快速处理半导体零部件、电动车充电器、热管理材料和激光精密设备的询价。",
    keywords: "OHI Tech联系, 半导体零部件报价, 电动车充电器咨询, 激光设备报价, 热管理材料咨询, 技术贸易联系",
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
  const meta = CONTACT_META[locale];
  const baseUrl = "https://www.ohitech.co.kr";
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/contact?lang=${locale}`,
      siteName: "OHI Tech",
      locale: locale === "ko" ? "ko_KR" : locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [{ url: `${baseUrl}/images/logo-large.png`, width: 400, height: 400, alt: "OHI Tech" }],
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `${baseUrl}/contact?lang=${locale}`,
      languages: {
        ko: `${baseUrl}/contact?lang=ko`,
        en: `${baseUrl}/contact?lang=en`,
        zh: `${baseUrl}/contact?lang=zh`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = getLocale(params);
  const inquiryType = typeof params.type === "string" ? params.type : "general";

  return (
    <>
      <Header locale={locale} />
      <main className="pt-16 min-h-screen bg-[var(--bg-alt)]">
        <section className="hero-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white mb-2">{t(locale, "contact.title")}</h1>
            <p className="text-gray-300">{t(locale, "contact.subtitle")}</p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ContactForm locale={locale} initialType={inquiryType} />
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
