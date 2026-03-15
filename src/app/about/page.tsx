import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";

export default async function AboutPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = getLocale(params);

  const sections = {
    ko: {
      intro: "OHI Tech는 한국의 반도체 장비 부품 및 첨단 산업 제품을 해외에 수출하고, 해외의 우수한 기술 제품을 국내에 공급하는 전문 무역 기업입니다.",
      vision: "기술의 가교 역할을 통해 글로벌 산업 발전에 기여하며, 고객에게 최고 품질의 제품과 서비스를 제공하는 것을 목표로 합니다.",
      strengths: [
        { title: "글로벌 네트워크", desc: "한국, 대만, 중국, 싱가포르, 일본 등 아시아 주요 시장에 폭넓은 네트워크를 보유하고 있습니다." },
        { title: "기술 전문성", desc: "반도체 장비 부품, EV 충전, 열관리, 레이저 장비 등 첨단 기술 분야의 깊은 이해를 바탕으로 최적의 솔루션을 제안합니다." },
        { title: "신뢰 파트너십", desc: "DT ENG, Zerova, T-Global, Grandhitek, NEOTECH, Hortech 등 검증된 제조사들과의 파트너십을 통해 품질을 보장합니다." },
        { title: "맞춤형 서비스", desc: "고객의 요구사항에 맞춘 제품 소싱, 기술 지원, 물류 관리 등 원스톱 서비스를 제공합니다." },
      ],
    },
    en: {
      intro: "OHI Tech is a specialized trading company that exports Korean semiconductor equipment parts and advanced industrial products overseas, while supplying excellent foreign technology products to the Korean market.",
      vision: "We aim to contribute to global industrial development through technology bridging, providing customers with the highest quality products and services.",
      strengths: [
        { title: "Global Network", desc: "We maintain an extensive network across major Asian markets including Korea, Taiwan, China, Singapore, and Japan." },
        { title: "Technical Expertise", desc: "We propose optimal solutions based on deep understanding of semiconductor parts, EV charging, thermal management, and laser equipment." },
        { title: "Trusted Partnerships", desc: "We guarantee quality through partnerships with verified manufacturers including DT ENG, Zerova, T-Global, Grandhitek, NEOTECH, and Hortech." },
        { title: "Customized Service", desc: "We provide one-stop services including product sourcing, technical support, and logistics management tailored to customer requirements." },
      ],
    },
    zh: {
      intro: "OHI Tech是一家专业贸易公司，将韩国半导体设备零部件及先进工业产品出口海外，同时将海外优质技术产品引进韩国市场。",
      vision: "我们致力于通过技术桥梁为全球产业发展做贡献，为客户提供最高品质的产品和服务。",
      strengths: [
        { title: "全球网络", desc: "在韩国、台湾、中国、新加坡、日本等亚洲主要市场拥有广泛的网络。" },
        { title: "技术专业性", desc: "基于对半导体零部件、电动车充电、热管理、激光设备等先进技术领域的深入了解，提供最优解决方案。" },
        { title: "可信赖的合作伙伴", desc: "通过与DT ENG、Zerova、T-Global、Grandhitek、NEOTECH、Hortech等经过验证的制造商合作，保证品质。" },
        { title: "定制化服务", desc: "提供根据客户需求定制的产品采购、技术支持、物流管理等一站式服务。" },
      ],
    },
  };

  const s = sections[locale];

  return (
    <>
      <Header locale={locale} />
      <main className="pt-16 min-h-screen">
        <section className="hero-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white mb-2">{t(locale, "about.title")}</h1>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{s.intro}</p>
            <div className="bg-[var(--bg-alt)] rounded-xl p-8 mb-12">
              <h2 className="text-xl font-bold text-[var(--primary)] mb-3">
                {locale === "ko" ? "비전" : locale === "zh" ? "愿景" : "Vision"}
              </h2>
              <p className="text-gray-600 leading-relaxed">{s.vision}</p>
            </div>

            <h2 className="text-2xl font-bold text-[var(--primary)] mb-8">
              {locale === "ko" ? "핵심 경쟁력" : locale === "zh" ? "核心竞争力" : "Core Strengths"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {s.strengths.map((item, i) => (
                <div key={i} className="p-6 rounded-xl border border-gray-100 card-hover">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                    <span className="text-[var(--accent)] font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
