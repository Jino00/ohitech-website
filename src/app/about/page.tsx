import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";

const ABOUT_META = {
  ko: {
    title: "회사 소개 — OHI Tech | 글로벌 반도체·레이저·EV 무역 기업",
    description: "OHI Tech는 2023년 설립된 글로벌 기술 무역 기업입니다. 반도체 부품(ESC·드라이펌프), EV 충전기, 열관리 소재, 레이저 정밀 장비를 한국·대만·중국·싱가포르·일본 네트워크로 공급합니다.",
    keywords: "OHI Tech 소개, 글로벌 기술 무역, 반도체 부품 무역, EV 충전기 수입, 레이저 장비 대리점, 열관리 소재, 한국 무역 기업",
  },
  en: {
    title: "About OHI Tech | Global Semiconductor & Laser Equipment Trading",
    description: "OHI Tech (est. 2023) is a Korean global technology trading company supplying semiconductor parts (ESC, dry pump), EV chargers, thermal management materials, and laser precision equipment across Korea, Taiwan, China, Singapore, and Japan.",
    keywords: "OHI Tech about, global technology trading, semiconductor parts trading, EV charger import, laser equipment distributor, thermal management, Korea trading company",
  },
  zh: {
    title: "关于 OHI Tech | 全球半导体与激光设备贸易公司",
    description: "OHI Tech（成立于2023年）是韩国全球技术贸易公司，通过韩国、台湾、中国、新加坡、日本网络供应半导体零部件（ESC、干式泵）、电动车充电器、热管理材料和激光精密设备。",
    keywords: "OHI Tech介绍, 全球技术贸易, 半导体零部件贸易, 电动车充电器进口, 激光设备经销商, 热管理材料, 韩国贸易公司",
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
  const meta = ABOUT_META[locale];
  const baseUrl = "https://www.ohitech.co.kr";
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/about?lang=${locale}`,
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
      canonical: `${baseUrl}/about?lang=${locale}`,
      languages: {
        ko: `${baseUrl}/about?lang=ko`,
        en: `${baseUrl}/about?lang=en`,
        zh: `${baseUrl}/about?lang=zh`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function AboutPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = getLocale(params);

  const content = {
    ko: {
      heroTag: "ABOUT OHI TECH",
      heroTitle: "기술로 세계를 연결하는\n글로벌 무역 파트너",
      heroDesc: "2023년 설립 이래, OHI Tech는 한국의 첨단 기술을 세계로, 세계의 우수한 기술을 한국으로 연결하는 가교 역할을 수행하고 있습니다.",
      overviewTitle: "회사 개요",
      overviewText: "OHI Tech는 반도체 장비 부품, EV 충전 솔루션, 열관리 시스템, 레이저 정밀 장비 등 첨단 산업 제품을 전문으로 취급하는 글로벌 기술 무역 기업입니다. 한국의 우수한 제조사들과 아시아 전역의 바이어를 연결하며, 동시에 해외의 검증된 기술 제품을 국내 시장에 공급하고 있습니다.",
      founded: "설립",
      foundedVal: "2023년 9월",
      hq: "본사",
      hqVal: "대한민국",
      business: "사업 영역",
      businessVal: "4개 핵심 분야",
      partners: "파트너사",
      partnersVal: "6개 글로벌 기업",
      networkTitle: "글로벌 네트워크",
      networkDesc: "아시아 주요 기술 허브를 연결하는 무역 네트워크를 구축하고 있습니다.",
      countries: [
        { name: "대한민국", role: "본사 · 제조 파트너", flag: "KR" },
        { name: "대만", role: "핵심 기술 파트너", flag: "TW" },
        { name: "중국", role: "수출 시장", flag: "CN" },
        { name: "싱가포르", role: "동남아 허브", flag: "SG" },
        { name: "일본", role: "기술 협력", flag: "JP" },
      ],
      areasTitle: "사업 영역",
      areasDesc: "반도체에서 친환경 에너지까지, 미래 산업의 핵심 분야를 다룹니다.",
      areas: [
        { icon: "01", title: "반도체 장비 부품", desc: "ESC, O-Ring, Valve, 건식진공펌프 등 반도체 제조 공정에 필수적인 고품질 부품을 공급합니다.", tags: ["ESC", "Dry Pump", "O-Ring"] },
        { icon: "02", title: "EV 충전 솔루션", desc: "7kW AC부터 480kW DC 급속 충전기까지, 글로벌 표준을 충족하는 전기차 충전 인프라를 제공합니다.", tags: ["DC 급속", "AC 완속", "OCPP"] },
        { icon: "03", title: "열관리 솔루션", desc: "TIM 패드, 히트파이프, 액체 냉각 시스템 등 전자기기의 열 문제를 해결하는 토탈 솔루션을 제공합니다.", tags: ["TIM", "Heat Pipe", "Liquid Cooling"] },
        { icon: "04", title: "레이저 정밀 장비", desc: "웨이퍼 레이저 커팅, 레이저 마커, 3D 메탈 프린터 등 마이크론 수준의 정밀 가공 장비를 공급합니다.", tags: ["Wafer Cutting", "Laser Marker", "3D Printer"] },
      ],
      partnersTitle: "신뢰할 수 있는 파트너",
      partnersDesc: "검증된 글로벌 제조사들과의 파트너십을 통해 최고 품질을 보장합니다.",
      partnerList: [
        { name: "DT ENG", country: "한국", specialty: "정전척(ESC) 전문 제조" },
        { name: "Zerova", country: "대만", specialty: "EV 충전기 솔루션" },
        { name: "T-Global", country: "대만", specialty: "열관리 소재 전문" },
        { name: "Grandhitek", country: "한국", specialty: "반도체 진공 시스템" },
        { name: "NEOTECH", country: "한국", specialty: "반도체 실링 소재" },
        { name: "Hortech", country: "대만", specialty: "레이저 정밀 가공 장비" },
      ],
      strengthsTitle: "왜 OHI Tech인가",
      strengths: [
        { num: "01", title: "기술 전문성", desc: "반도체, EV 충전, 열관리, 레이저 장비 등 첨단 기술 분야에 대한 깊은 이해를 바탕으로 고객에게 최적의 솔루션을 제안합니다." },
        { num: "02", title: "양방향 무역", desc: "한국 → 세계, 세계 → 한국. 수출과 수입을 아우르는 양방향 무역 역량으로 고객의 글로벌 비즈니스를 지원합니다." },
        { num: "03", title: "원스톱 서비스", desc: "제품 소싱부터 기술 지원, 물류 관리까지 무역의 전 과정을 원스톱으로 지원합니다." },
        { num: "04", title: "검증된 파트너십", desc: "한국과 대만의 검증된 제조사들과의 공식 파트너십을 통해 품질과 가격 경쟁력을 동시에 확보합니다." },
      ],
      ctaTitle: "글로벌 기술 무역의 새로운 파트너",
      ctaDesc: "OHI Tech와 함께 비즈니스를 성장시키세요.",
      ctaBtn1: "견적 요청",
      ctaBtn2: "문의하기",
    },
    en: {
      heroTag: "ABOUT OHI TECH",
      heroTitle: "Connecting the World\nThrough Technology",
      heroDesc: "Since 2023, OHI Tech has been bridging Korea's advanced technology to the world, and bringing the world's best technology to Korea.",
      overviewTitle: "Company Overview",
      overviewText: "OHI Tech is a global technology trading company specializing in semiconductor equipment parts, EV charging solutions, thermal management systems, and laser precision equipment. We connect Korea's leading manufacturers with buyers across Asia, while also supplying verified technology products from overseas to the Korean market.",
      founded: "Founded",
      foundedVal: "September 2023",
      hq: "Headquarters",
      hqVal: "South Korea",
      business: "Business Areas",
      businessVal: "4 Core Sectors",
      partners: "Partners",
      partnersVal: "6 Global Companies",
      networkTitle: "Global Network",
      networkDesc: "We've built a trade network connecting major technology hubs across Asia.",
      countries: [
        { name: "South Korea", role: "HQ · Manufacturing Partners", flag: "KR" },
        { name: "Taiwan", role: "Key Technology Partners", flag: "TW" },
        { name: "China", role: "Export Market", flag: "CN" },
        { name: "Singapore", role: "Southeast Asia Hub", flag: "SG" },
        { name: "Japan", role: "Technology Cooperation", flag: "JP" },
      ],
      areasTitle: "Business Areas",
      areasDesc: "From semiconductors to green energy, we cover the core sectors of tomorrow's industry.",
      areas: [
        { icon: "01", title: "Semiconductor Parts", desc: "Supplying essential high-quality components for semiconductor manufacturing processes including ESC, O-Rings, Valves, and Dry Vacuum Pumps.", tags: ["ESC", "Dry Pump", "O-Ring"] },
        { icon: "02", title: "EV Charging", desc: "From 7kW AC to 480kW DC fast chargers, we provide EV charging infrastructure that meets global standards.", tags: ["DC Fast", "AC Charger", "OCPP"] },
        { icon: "03", title: "Thermal Management", desc: "Total solutions for electronics thermal challenges including TIM pads, heat pipes, and liquid cooling systems.", tags: ["TIM", "Heat Pipe", "Liquid Cooling"] },
        { icon: "04", title: "Laser Equipment", desc: "Micron-level precision processing equipment including wafer laser cutting machines, laser markers, and 3D metal printers.", tags: ["Wafer Cutting", "Laser Marker", "3D Printer"] },
      ],
      partnersTitle: "Trusted Partners",
      partnersDesc: "We guarantee top quality through partnerships with verified global manufacturers.",
      partnerList: [
        { name: "DT ENG", country: "Korea", specialty: "Electrostatic Chuck (ESC)" },
        { name: "Zerova", country: "Taiwan", specialty: "EV Charger Solutions" },
        { name: "T-Global", country: "Taiwan", specialty: "Thermal Interface Materials" },
        { name: "Grandhitek", country: "Korea", specialty: "Semiconductor Vacuum Systems" },
        { name: "NEOTECH", country: "Korea", specialty: "Semiconductor Sealing Materials" },
        { name: "Hortech", country: "Taiwan", specialty: "Laser Precision Equipment" },
      ],
      strengthsTitle: "Why OHI Tech",
      strengths: [
        { num: "01", title: "Technical Expertise", desc: "We propose optimal solutions based on deep understanding of semiconductor, EV charging, thermal management, and laser equipment technologies." },
        { num: "02", title: "Bi-directional Trade", desc: "Korea → World, World → Korea. We support your global business with comprehensive import and export capabilities." },
        { num: "03", title: "One-Stop Service", desc: "From product sourcing to technical support and logistics management, we handle the entire trade process." },
        { num: "04", title: "Verified Partnerships", desc: "Official partnerships with verified manufacturers in Korea and Taiwan ensure both quality and competitive pricing." },
      ],
      ctaTitle: "Your New Partner in Global Tech Trade",
      ctaDesc: "Grow your business with OHI Tech.",
      ctaBtn1: "Request Quote",
      ctaBtn2: "Contact Us",
    },
    zh: {
      heroTag: "关于 OHI TECH",
      heroTitle: "以科技连接世界的\n全球贸易伙伴",
      heroDesc: "自2023年成立以来，OHI Tech一直致力于将韩国先进技术推向世界，同时将全球优质技术引入韩国。",
      overviewTitle: "公司概况",
      overviewText: "OHI Tech是一家专注于半导体设备零部件、电动车充电解决方案、热管理系统和激光精密设备的全球技术贸易公司。我们将韩国领先制造商与亚洲各地的买家连接起来，同时向韩国市场供应经过验证的海外技术产品。",
      founded: "成立",
      foundedVal: "2023年9月",
      hq: "总部",
      hqVal: "韩国",
      business: "业务领域",
      businessVal: "4大核心领域",
      partners: "合作伙伴",
      partnersVal: "6家全球企业",
      networkTitle: "全球网络",
      networkDesc: "我们构建了连接亚洲主要技术中心的贸易网络。",
      countries: [
        { name: "韩国", role: "总部 · 制造合作伙伴", flag: "KR" },
        { name: "台湾", role: "核心技术合作伙伴", flag: "TW" },
        { name: "中国", role: "出口市场", flag: "CN" },
        { name: "新加坡", role: "东南亚枢纽", flag: "SG" },
        { name: "日本", role: "技术合作", flag: "JP" },
      ],
      areasTitle: "业务领域",
      areasDesc: "从半导体到绿色能源，我们涵盖未来产业的核心领域。",
      areas: [
        { icon: "01", title: "半导体设备零部件", desc: "供应ESC、O-Ring、阀门、干式真空泵等半导体制造工艺必需的高品质零部件。", tags: ["ESC", "Dry Pump", "O-Ring"] },
        { icon: "02", title: "电动车充电解决方案", desc: "从7kW交流到480kW直流快充，提供符合全球标准的电动车充电基础设施。", tags: ["DC快充", "AC慢充", "OCPP"] },
        { icon: "03", title: "热管理解决方案", desc: "提供TIM垫片、热管、液冷系统等电子设备散热全套解决方案。", tags: ["TIM", "Heat Pipe", "液冷"] },
        { icon: "04", title: "激光精密设备", desc: "供应晶圆激光切割机、激光标记机、3D金属打印机等微米级精密加工设备。", tags: ["晶圆切割", "激光标记", "3D打印"] },
      ],
      partnersTitle: "值得信赖的合作伙伴",
      partnersDesc: "通过与经过验证的全球制造商的合作关系保证最高品质。",
      partnerList: [
        { name: "DT ENG", country: "韩国", specialty: "静电卡盘(ESC)专业制造" },
        { name: "Zerova", country: "台湾", specialty: "电动车充电器解决方案" },
        { name: "T-Global", country: "台湾", specialty: "热界面材料专家" },
        { name: "Grandhitek", country: "韩国", specialty: "半导体真空系统" },
        { name: "NEOTECH", country: "韩国", specialty: "半导体密封材料" },
        { name: "Hortech", country: "台湾", specialty: "激光精密加工设备" },
      ],
      strengthsTitle: "为什么选择OHI Tech",
      strengths: [
        { num: "01", title: "技术专业性", desc: "基于对半导体、电动车充电、热管理、激光设备等先进技术领域的深入理解，为客户提供最优解决方案。" },
        { num: "02", title: "双向贸易", desc: "韩国→世界，世界→韩国。以全面的进出口能力支持您的全球业务。" },
        { num: "03", title: "一站式服务", desc: "从产品采购到技术支持、物流管理，全程处理贸易流程。" },
        { num: "04", title: "验证的合作伙伴关系", desc: "与韩国和台湾经过验证的制造商建立的正式合作关系，确保品质和价格竞争力。" },
      ],
      ctaTitle: "全球技术贸易的新伙伴",
      ctaDesc: "与OHI Tech一起发展您的业务。",
      ctaBtn1: "询价",
      ctaBtn2: "联系我们",
    },
  };

  const c = content[locale];

  return (
    <>
      <Header locale={locale} />
      <main className="pt-16 min-h-screen">

        {/* Hero Section */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f2b46 0%, #122d4a 40%, #1a4a7a 70%, #2d8cf0 100%)" }}>
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
          {/* Floating accent circles */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#2d8cf0] rounded-full opacity-10 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#5ba8f5] rounded-full opacity-5 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[#5ba8f5] text-xs font-bold tracking-[0.2em] mb-6 border border-white/10">
                {c.heroTag}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 whitespace-pre-line">
                {c.heroTitle}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                {c.heroDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview + Key Facts */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              {/* Text */}
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-bold text-[var(--primary)] mb-2">{c.overviewTitle}</h2>
                <div className="w-16 h-1 bg-[var(--accent)] mb-6" />
                <p className="text-gray-700 text-lg leading-relaxed">{c.overviewText}</p>
              </div>
              {/* Key Facts */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                {[
                  { label: c.founded, value: c.foundedVal, icon: "01" },
                  { label: c.hq, value: c.hqVal, icon: "02" },
                  { label: c.business, value: c.businessVal, icon: "03" },
                  { label: c.partners, value: c.partnersVal, icon: "04" },
                ].map((item, i) => (
                  <div key={i} className="bg-[var(--bg-alt)] rounded-xl p-5 border border-gray-100">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-[var(--primary)]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Global Network */}
        <section className="py-16 bg-[var(--bg-alt)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <h2 className="text-3xl font-bold text-[var(--primary)] mb-3">{c.networkTitle}</h2>
              <div className="w-16 h-1 bg-[var(--accent)] mb-4" />
              <p className="text-gray-600 max-w-xl">{c.networkDesc}</p>
            </div>

            {/* Network visualization */}
            <div className="relative bg-white rounded-2xl p-8 lg:p-12 border border-gray-100 shadow-sm">
              {/* Center hub */}
              <div className="flex flex-col items-center mb-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg mb-3">
                  <span className="text-white font-bold text-lg">OHI</span>
                </div>
                <span className="text-xs font-semibold text-[var(--primary)] tracking-wider">TECH HUB</span>
              </div>

              {/* Connection lines visual */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {c.countries.map((country, i) => (
                  <div key={i} className="group text-center">
                    <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center mb-3 group-hover:border-[var(--accent)] group-hover:shadow-md transition-all duration-300">
                      <span className="text-3xl">{country.flag}</span>
                      {/* Connector dot */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="text-sm font-bold text-[var(--primary)] mb-0.5">{country.name}</h4>
                    <p className="text-xs text-gray-500">{country.role}</p>
                  </div>
                ))}
              </div>

              {/* Trade flow arrows */}
              <div className="mt-10 flex justify-center gap-8">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] rounded-full">
                  <span className="text-sm text-white font-semibold">Korea</span>
                  <span className="text-white/60">→</span>
                  <span className="text-sm text-white font-semibold">World</span>
                </div>
                <div className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] rounded-full">
                  <span className="text-sm text-white font-semibold">World</span>
                  <span className="text-white/60">→</span>
                  <span className="text-sm text-white font-semibold">Korea</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Areas */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <h2 className="text-3xl font-bold text-[var(--primary)] mb-3">{c.areasTitle}</h2>
              <div className="w-16 h-1 bg-[var(--accent)] mb-4" />
              <p className="text-gray-600 max-w-xl">{c.areasDesc}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {c.areas.map((area, i) => (
                <div key={i} className="card-hover group relative rounded-2xl border border-gray-100 p-8 overflow-hidden">
                  {/* Background accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-[var(--bg-alt)] group-hover:bg-white/20 flex items-center justify-center text-2xl shrink-0 transition-colors duration-500">
                        {area.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[var(--primary)] group-hover:text-white mb-2 transition-colors duration-500">
                          {area.title}
                        </h3>
                        <p className="text-sm text-gray-600 group-hover:text-white/80 leading-relaxed transition-colors duration-500">
                          {area.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 ml-[4.5rem]">
                      {area.tags.map((tag, j) => (
                        <span key={j} className="px-3 py-1 text-xs font-medium bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-white/20 group-hover:text-white rounded-full transition-colors duration-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why OHI Tech */}
        <section className="py-20 bg-[var(--bg-alt)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <h2 className="text-3xl font-bold text-[var(--primary)] mb-3">{c.strengthsTitle}</h2>
              <div className="w-16 h-1 bg-[var(--accent)] mb-4" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {c.strengths.map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{item.num}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--primary)] mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{c.ctaTitle}</h2>
            <p className="text-gray-300 text-lg mb-10">{c.ctaDesc}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/contact?lang=${locale}&type=quote`}
                className="px-8 py-3.5 bg-white text-[var(--primary)] font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg"
              >
                {c.ctaBtn1}
              </Link>
              <Link
                href={`/contact?lang=${locale}`}
                className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition"
              >
                {c.ctaBtn2}
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer locale={locale} />
    </>
  );
}
