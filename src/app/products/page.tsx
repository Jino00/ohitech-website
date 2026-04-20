import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";
import { getDb } from "@/db/schema";
import ProductList from "./ProductList";

/* ── SEO helpers ── */

const LASER_META = {
  ko: {
    title: "워터젯 레이저 가공기 | Hortech 공식 대리점 — OHI Tech",
    description:
      "OHI Tech는 대만 Hortech의 한국 공식 대리점입니다. LML(Laser MicroJet) 워터젯 레이저 가공기(HT-WG-LC)로 SiC·사파이어·다이아몬드 기판을 열영향(HAZ) 없이 정밀 절단. TGV 웨이퍼 관통공정 국내 유일 서비스. FPCB 레이저 커팅, 후막 에칭, 산업용 마커 전 라인업 공급.",
    keywords: "워터젯 레이저, LML, Laser MicroJet, 레이저 가공기, SiC 레이저 절단, TGV, 웨이퍼 관통공정, FPCB 커팅, 레이저 에칭, Hortech, 레이저 마커, 사파이어 웨이퍼 커팅, 열영향 없는 레이저",
  },
  en: {
    title: "Waterjet Laser Machine (LML) | Authorized Hortech Distributor — OHI Tech",
    description:
      "OHI Tech is the official Korean distributor of Taiwan's Hortech. Specializing in LML (Laser MicroJet) waterjet laser machines (HT-WG-LC) for zero-HAZ cutting of SiC, diamond, and sapphire. Korea's only TGV wafer drilling service. Full lineup: FPCB laser cutting, thick-film etching, industrial markers. Track record with Garmin, TPK, Merck.",
    keywords: "waterjet laser, LML, Laser MicroJet, laser machine, SiC laser cutting, TGV, through glass via, wafer drilling, FPCB cutting, laser etching, Hortech, laser marker, sapphire wafer cutting, zero HAZ laser",
  },
  zh: {
    title: "水导激光加工机(LML) | Hortech授权经销商 — OHI Tech",
    description:
      "OHI Tech是台湾Hortech的韩国官方代理商。专注LML(Laser MicroJet)水导激光加工机(HT-WG-LC)，对SiC、金刚石、蓝宝石基板实现零热影响精密切割。韩国唯一TGV晶圆贯通工艺服务。全系列：FPCB激光切割、厚膜蚀刻、工业打标机。具有Garmin、TPK、Merck供货实绩。",
    keywords: "水导激光, LML, Laser MicroJet, 激光加工机, SiC激光切割, TGV, 晶圆贯通, FPCB激光切割, 激光蚀刻, Hortech, 激光打标, 蓝宝石晶圆切割, 零热影响激光",
  },
};

const THERMAL_META = {
  ko: {
    title: "열관리 솔루션 | T-Global 공식 대리점 — OHI Tech",
    description:
      "OHI Tech는 대만 T-Global Technology의 한국 공식 대리점입니다. TIM 패드(최대 17.8 W/m·K), 베이퍼 챔버, 히트파이프, AlSiC, 방열판, 열전 냉각칩 등 전 제품군 공급. 서버·AI·5G·EV·ESS 산업 특화 솔루션.",
    keywords: "TIM 패드, 열전도 패드, 베이퍼 챔버, 히트파이프, AlSiC, 방열판, 열전 냉각, T-Global, 열관리 소재, Gap Filler, Phase Change Material, 서버 방열, AI GPU 냉각",
  },
  en: {
    title: "Thermal Management Solutions | T-Global Authorized Distributor — OHI Tech",
    description:
      "OHI Tech is the official Korean distributor of T-Global Technology (Taiwan). Full product range: TIM pads (up to 25 W/m·K), vapor chambers, heat pipes, AlSiC spreaders, heat sinks, TEC chips. Solutions for Servers, AI, 5G, EV, and ESS industries.",
    keywords: "TIM pad, thermal interface material, vapor chamber, heat pipe, AlSiC, heat sink, thermoelectric cooling, T-Global, gap filler pad, phase change material, server thermal, AI GPU cooling",
  },
  zh: {
    title: "热管理解决方案 | T-Global官方代理商 — OHI Tech",
    description:
      "OHI Tech是台湾T-Global Technology的韩国官方代理商。全系列产品：TIM导热垫片（最高25W/m·K）、均热板、热管、AlSiC散热片、散热器、TEC芯片。面向服务器、AI、5G、EV、ESS行业的专属解决方案。",
    keywords: "TIM垫片, 导热界面材料, 均热板, 热管, AlSiC, 散热器, 热电冷却, T-Global, 导热垫片, 相变材料, 服务器散热, AI GPU冷却",
  },
};

const PRODUCTS_META = {
  ko: {
    title: "제품 & 솔루션 — OHI Tech",
    description: "OHI Tech 반도체 장비 부품, EV 충전 솔루션, 열관리 소재, 레이저 정밀 장비 전 제품 라인업.",
    keywords: "OHI Tech 제품, 반도체 부품, EV 충전, 열관리, 레이저 장비",
  },
  en: {
    title: "Products & Solutions — OHI Tech",
    description: "OHI Tech full lineup: semiconductor parts, EV charging solutions, thermal management, and laser precision equipment.",
    keywords: "OHI Tech products, semiconductor parts, EV charging, thermal management, laser equipment",
  },
  zh: {
    title: "产品与解决方案 — OHI Tech",
    description: "OHI Tech全系列产品：半导体零部件、电动车充电解决方案、热管理材料、激光精密设备。",
    keywords: "OHI Tech产品, 半导体零部件, 电动车充电, 热管理, 激光设备",
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
  const category = typeof params.category === "string" ? params.category : "";

  const isLaser = category === "laser-equipment";
  const isThermal = category === "thermal-management";
  const meta = isLaser ? LASER_META[locale] : isThermal ? THERMAL_META[locale] : PRODUCTS_META[locale];
  const baseUrl = "https://www.ohitech.co.kr";
  const canonicalPath = isLaser
    ? `/products?lang=${locale}&category=laser-equipment`
    : isThermal
    ? `/products?lang=${locale}&category=thermal-management`
    : `/products?lang=${locale}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}${canonicalPath}`,
      siteName: "OHI Tech",
      locale: locale === "ko" ? "ko_KR" : locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: isThermal
        ? [{ url: "https://www.tglobalcorp.com/upload/catalog_m_b/TIM__24F07SulHq.jpg", width: 800, height: 600, alt: "T-Global Thermal Management Products — OHI Tech" }]
        : isLaser
        ? [{ url: `${baseUrl}/images/categories/semiconductor.jpg`, width: 1200, height: 630, alt: "Waterjet Laser Machine (LML) — OHI Tech × Hortech" }]
        : [{ url: `${baseUrl}/images/logo-large.png`, width: 400, height: 400, alt: "OHI Tech" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: isThermal
        ? ["https://www.tglobalcorp.com/upload/catalog_m_b/TIM__24F07SulHq.jpg"]
        : isLaser
        ? [`${baseUrl}/images/categories/semiconductor.jpg`]
        : [`${baseUrl}/images/logo-large.png`],
    },
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: {
        ko: `${baseUrl}/products?lang=ko${isLaser ? "&category=laser-equipment" : isThermal ? "&category=thermal-management" : ""}`,
        en: `${baseUrl}/products?lang=en${isLaser ? "&category=laser-equipment" : isThermal ? "&category=thermal-management" : ""}`,
        zh: `${baseUrl}/products?lang=zh${isLaser ? "&category=laser-equipment" : isThermal ? "&category=thermal-management" : ""}`,
      },
    },
    robots: { index: true, follow: true },
  };
}

/* ── JSON-LD for laser category ── */

function LaserJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.ohitech.co.kr/#organization",
        name: "OHI Tech",
        url: "https://www.ohitech.co.kr",
        description: "Korean authorized distributor of Hortech laser precision equipment",
        areaServed: ["KR", "CN", "SG", "JP", "TW"],
      },
      {
        "@type": "Product",
        name: "Waterjet Laser Machine HT-WG-LC",
        description:
          "Water-guided laser CNC machine with zero thermal effect. Precision ±3 µm, 200 µm microvia drilling. Processes SiC, diamond, sapphire, and hard metals.",
        brand: { "@type": "Brand", name: "Hortech" },
        manufacturer: {
          "@type": "Organization",
          name: "Hortech Co., Ltd.",
          address: { "@type": "PostalAddress", addressCountry: "TW", addressLocality: "Hsinchu" },
        },
        category: "Laser Precision Equipment",
        offers: {
          "@type": "Offer",
          seller: { "@type": "Organization", name: "OHI Tech" },
          areaServed: "KR",
          url: "https://www.ohitech.co.kr/products?lang=en&category=laser-equipment",
        },
      },
      {
        "@type": "Product",
        name: "FPCB Laser Cutting Machine HT-LC-FPCB",
        description:
          "Cold laser cutting for flexible circuit boards (FPCB) with XY repeatability ±5 µm. Patented corner process for high-yield production.",
        brand: { "@type": "Brand", name: "Hortech" },
        manufacturer: { "@type": "Organization", name: "Hortech Co., Ltd." },
        category: "Laser Precision Equipment",
      },
      {
        "@type": "Product",
        name: "Thick Film Laser Etching Machine HT-LE-TF",
        description:
          "Air-bearing precision stage (±2 µm) for circuit patterning on conductive silver/copper paste thick films. Beam spot 6–20 µm.",
        brand: { "@type": "Brand", name: "Hortech" },
        manufacturer: { "@type": "Organization", name: "Hortech Co., Ltd." },
        category: "Laser Precision Equipment",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: "https://www.ohitech.co.kr" },
          { "@type": "ListItem", position: 2, name: "제품 & 솔루션", item: "https://www.ohitech.co.kr/products" },
          { "@type": "ListItem", position: 3, name: "레이저 정밀 장비", item: "https://www.ohitech.co.kr/products?lang=ko&category=laser-equipment" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "LML(Laser MicroJet) 워터젯 레이저란 무엇인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LML(Laser MicroJet)은 스위스 Synova社가 개발한 수냉 레이저 가공 기술입니다. 직경 25~100µm의 물 기둥이 레이저 빔을 전반사(TIR)로 가이딩하여 절단 영역을 냉각하면서 가공합니다. 열영향대(HAZ)가 사실상 제로(0)이며, Hortech가 곡선 가공 특허(US 8,422,521 B2)를 독자 보유하고 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "SiC·다이아몬드·사파이어 기판 레이저 가공이 가능한가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "네. OHI Tech가 공급하는 Hortech HT-WG-LC(LML 워터젯 레이저)는 SiC 파워 반도체, 다이아몬드 기판, 사파이어 웨이퍼를 열영향 없이 정밀 절단·드릴링합니다. 위치 정밀도 ±3µm, 빔 스팟 50~200µm, 3/4/5축 선택 가능합니다.",
            },
          },
          {
            "@type": "Question",
            name: "TGV(Through Glass Via) 웨이퍼 관통공정이란 무엇인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "TGV는 유리 또는 웨이퍼 기판에 레이저로 미세 관통홀을 형성하는 공정입니다. OHI Tech는 LML 워터젯 레이저를 활용한 TGV 관통공정을 국내 유일하게 제공합니다. 3D 패키징, 인터포저, MEMS 소자 등 첨단 반도체 패키징에 활용됩니다.",
            },
          },
          {
            "@type": "Question",
            name: "Hortech 레이저 장비의 한국 공식 대리점은 어디인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "OHI Tech가 대만 Hortech(창립 1995, 대만 증권거래소 7611)의 한국 공식 대리점입니다. 워터젯 레이저 가공기(HT-WG-LC), FPCB 레이저 커팅기, 후막 레이저 에칭기, 산업용 레이저 마커 전 라인업을 공급합니다.",
            },
          },
          {
            "@type": "Question",
            name: "What is the minimum order quantity for Hortech laser machines?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hortech laser equipment is sold as individual capital equipment units — there is no minimum order quantity. OHI Tech provides pre-sales consultation, application testing, installation, and after-sales support in Korea. Contact us for a quote.",
            },
          },
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

/* ── JSON-LD for thermal management category ── */

function ThermalJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.ohitech.co.kr/#organization",
        name: "OHI Tech",
        url: "https://www.ohitech.co.kr",
        description: "Korean authorized distributor of T-Global Technology thermal management solutions",
        areaServed: ["KR", "CN", "SG", "JP", "TW"],
      },
      {
        "@type": "Organization",
        "@id": "https://www.tglobalcorp.com/#organization",
        name: "T-Global Technology Co., Ltd.",
        url: "https://www.tglobalcorp.com",
        foundingDate: "1993",
        address: {
          "@type": "PostalAddress",
          addressCountry: "TW",
          addressLocality: "Taoyuan",
        },
        hasCredential: ["ISO 9001", "ISO 14001", "IECQ", "IATF 16949"],
        numberOfEmployees: { "@type": "QuantitativeValue", value: 500 },
      },
      {
        "@type": "Product",
        name: "Thermal Interface Material (TIM) — T-Global Gap Filler Pad",
        description:
          "High-performance thermal pads with 1.0~17.8 W/m·K conductivity. Shore 00-15~65 hardness for gap filling. Applied in servers, AI accelerators, 5G base stations, EV batteries.",
        brand: { "@type": "Brand", name: "T-Global" },
        manufacturer: { "@type": "Organization", name: "T-Global Technology Co., Ltd." },
        category: "Thermal Interface Materials",
        offers: {
          "@type": "Offer",
          seller: { "@type": "Organization", name: "OHI Tech" },
          areaServed: "KR",
          url: "https://www.ohitech.co.kr/products?lang=en&category=thermal-management",
        },
      },
      {
        "@type": "Product",
        name: "Vapor Chamber — T-Global Ultra-Thin",
        description:
          "Ultra-thin vapor chambers (0.4mm+) and flat/3D configurations for GPU/CPU high-density thermal management. 50~100x higher heat transfer vs aluminum.",
        brand: { "@type": "Brand", name: "T-Global" },
        manufacturer: { "@type": "Organization", name: "T-Global Technology Co., Ltd." },
        category: "Vapor Chambers",
        offers: {
          "@type": "Offer",
          seller: { "@type": "Organization", name: "OHI Tech" },
          areaServed: "KR",
        },
      },
      {
        "@type": "Product",
        name: "AlSiC Heat Spreader — CMC Composite",
        description:
          "Metal matrix composite heat spreaders with low CTE for semiconductor power modules, aerospace, and military. Vibration resistance tested. IATF 16949 compliant.",
        brand: { "@type": "Brand", name: "T-Global" },
        manufacturer: { "@type": "Organization", name: "T-Global Technology Co., Ltd." },
        category: "AlSiC Composite Materials",
        offers: {
          "@type": "Offer",
          seller: { "@type": "Organization", name: "OHI Tech" },
          areaServed: "KR",
        },
      },
      {
        "@type": "Product",
        name: "NMVC™ Non-Metal Vapor Chamber — Xerendipity",
        description:
          "Next-generation non-metal vapor chamber by Xerendipity (XR), built on T-Global Technology. Kxy ~2500 W/m·K, Kz ~1 W/m·K. Doubling thickness yields 1.5–1.8× higher Qmax. Benchmark: NMVC 48°C vs copper VC 50.4°C (15×15mm, 1W, 25°C, natural convection). 80% lighter than copper VC, zero RF interference with 5G/6G, Wi-Fi, GPS.",
        brand: { "@type": "Brand", name: "Xerendipity" },
        manufacturer: { "@type": "Organization", name: "T-Global Technology Co., Ltd." },
        category: "Non-Metal Vapor Chamber",
        additionalProperty: [
          { "@type": "PropertyValue", name: "Kxy", value: "~2500 W/m·K" },
          { "@type": "PropertyValue", name: "Kz", value: "~1 W/m·K" },
          { "@type": "PropertyValue", name: "Thickness", value: "0.15~0.35mm" },
        ],
        offers: {
          "@type": "Offer",
          seller: { "@type": "Organization", name: "OHI Tech" },
          areaServed: "KR",
          url: "https://www.ohitech.co.kr/products?lang=en&category=thermal-management",
        },
      },
      {
        "@type": "Product",
        name: "Vapor-Pad™ Hybrid Thermal Pad — Xerendipity",
        description:
          "Hybrid thermal pad combining Z-axis conduction with X-Y vapor chamber heat spreading. Kxy 800~1200 W/m·K, Kz 15~25 W/m·K. Peak temperature 44% lower than conventional thermal pads (40.8°C vs 73.6°C). SGS certified. Silicone-free option available.",
        brand: { "@type": "Brand", name: "Xerendipity" },
        manufacturer: { "@type": "Organization", name: "T-Global Technology Co., Ltd." },
        category: "Hybrid Thermal Interface Material",
        additionalProperty: [
          { "@type": "PropertyValue", name: "Kxy", value: "800~1200 W/m·K" },
          { "@type": "PropertyValue", name: "Kz", value: "15~25 W/m·K" },
        ],
        offers: {
          "@type": "Offer",
          seller: { "@type": "Organization", name: "OHI Tech" },
          areaServed: "KR",
          url: "https://www.ohitech.co.kr/products?lang=en&category=thermal-management",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: "https://www.ohitech.co.kr" },
          { "@type": "ListItem", position: 2, name: "제품 & 솔루션", item: "https://www.ohitech.co.kr/products" },
          { "@type": "ListItem", position: 3, name: "열관리 솔루션", item: "https://www.ohitech.co.kr/products?lang=ko&category=thermal-management" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What thermal management products does OHI Tech supply from T-Global?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "OHI Tech supplies the full T-Global product range including TIM pads (Gap Filler, Thermal Tape, Phase Change Materials), Vapor Chambers, Heat Pipes, AlSiC Heat Spreaders, Heat Sinks, Thermoelectric Cooling Chips (TEC/Peltier), Graphite/Graphene Sheets, and Thermal Simulation services.",
            },
          },
          {
            "@type": "Question",
            name: "T-Global TIM 패드의 열전도율은 얼마인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "T-Global TIM 패드의 열전도율은 제품 종류에 따라 1.0~17.8 W/m·K이며, 그래핀 강화 제품은 1800+ W/m·K에 달합니다. TG-A1250(6.0 W/m·K), TG-A1780(17.8 W/m·K), TG-A6200(비실리콘 제품) 등 다양한 옵션이 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "최소 주문 수량(MOQ)이 있나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "T-Global은 MOQ(최소 주문 수량) 없이 샘플부터 대량 주문까지 대응합니다. OHI Tech를 통해 소량 샘플 요청도 가능합니다. 최단 납기는 14일입니다.",
            },
          },
          {
            "@type": "Question",
            name: "What is NMVC™ and how does it compare to a copper vapor chamber?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "NMVC™ (Non-Metal Vapor Chamber) by Xerendipity, based on T-Global technology, achieves ~2500 W/m·K in-plane thermal conductivity (Kxy) with near-zero RF interference. Benchmark tests show NMVC at 48°C vs copper VC at 50.4°C under identical conditions (15×15mm, 1W heat source, 25°C ambient, natural convection), delivering ~80–90% of copper VC performance at 80% lighter weight. Best used with Vapor-Pad or TIM for optimal results.",
            },
          },
          {
            "@type": "Question",
            name: "Vapor-Pad™란 무엇인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Vapor-Pad™는 Xerendipity가 개발한 하이브리드 열전도 패드로, Z축 열전도(Kz 15~25 W/m·K)와 X-Y 평면 베이퍼챔버 열확산(Kxy 800~1200 W/m·K)을 결합한 신소재입니다. 동일 조건에서 일반 열전도 패드(73.6°C) 대비 40.8°C로 피크 온도를 44% 저감합니다. SGS 인증, 실리콘 프리 옵션 제공.",
            },
          },
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

/* ── Page ── */

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const locale = getLocale(params);
  const categorySlug = typeof params.category === "string" ? params.category : "";
  const subSlug = typeof params.sub === "string" ? params.sub : "";
  const isLaser = categorySlug === "laser-equipment";
  const isThermal = categorySlug === "thermal-management";
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

  const lineups = db.prepare(`
    SELECT * FROM product_lineups WHERE is_active = 1 ORDER BY sort_order
  `).all() as any[];

  const lineupsByProduct: Record<number, any[]> = {};
  for (const l of lineups) {
    if (!lineupsByProduct[l.product_id]) lineupsByProduct[l.product_id] = [];
    lineupsByProduct[l.product_id].push(l);
  }

  return (
    <>
      {isLaser && <LaserJsonLd />}
      {isThermal && <ThermalJsonLd />}
      <Header locale={locale} />
      <main className="pt-16 min-h-screen bg-[var(--bg-alt)]">
        <section className="hero-gradient py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white mb-2">{t(locale, "products.title")}</h1>
            <p className="text-gray-300">{t(locale, "products.subtitle")}</p>
          </div>
        </section>

        <ProductList
          locale={locale}
          categories={categories}
          products={products}
          lineupsByProduct={lineupsByProduct}
          initialCategory={categorySlug}
          initialSub={subSlug}
        />
      </main>
      <Footer locale={locale} />
    </>
  );
}
