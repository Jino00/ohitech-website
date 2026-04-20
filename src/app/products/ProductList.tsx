"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";
import LaserSection from "./LaserSection";
import ThermalSection from "./ThermalSection";
import WaferSection from "./WaferSection";
import EVSection from "./EVSection";
import DryPumpSection from "./DryPumpSection";
import ESCSection from "./ESCSection";
import { t } from "@/i18n/dictionaries";
import Image from "next/image";
import { localizedField } from "@/lib/locale";

interface Props {
  locale: Locale;
  categories: any[];
  products: any[];
  lineupsByProduct: Record<number, any[]>;
  initialCategory: string;
  initialSub?: string;
}

/* ───── Constants ───── */

const SERVICE_LEVEL_LABELS: Record<string, Record<string, string>> = {
  ko: { L0: "신규제조", L1: "표면처리", L2: "본딩", L3: "플레이트교체", "L3-1": "부분교체", L4: "히터교체" },
  en: { L0: "New Mfg", L1: "Surface", L2: "Re-Bond", L3: "Plate", "L3-1": "Partial", L4: "L3+Heater" },
  zh: { L0: "新制造", L1: "表面处理", L2: "再粘合", L3: "板更换", "L3-1": "部分更换", L4: "加热器" },
};

const MANUFACTURER_ORDER = ["Lam Research", "AMAT", "TEL", "Axcelis"];
const MANUFACTURER_LABELS: Record<string, Record<string, string>> = {
  "Lam Research": { ko: "Lam Research", en: "Lam Research", zh: "Lam Research" },
  "AMAT": { ko: "AMAT (Applied Materials)", en: "AMAT (Applied Materials)", zh: "AMAT (Applied Materials)" },
  "TEL": { ko: "TEL (Tokyo Electron)", en: "TEL (Tokyo Electron)", zh: "TEL (Tokyo Electron)" },
  "Axcelis": { ko: "Axcelis", en: "Axcelis", zh: "Axcelis" },
};

// Sub-categories for semiconductor parts (identified by partner name)
interface SubCategory {
  id: string;
  icon: string;
  names: Record<string, string>;
  descriptions: Record<string, string>;
  partnerMatch: string; // match against partner_name_en
  color: string;
  applications: Record<string, string[]>;
  specLine: string;
}

// Main category visual config
const CATEGORY_CONFIG: Record<string, { icon: string; color: string; image: string }> = {
  "semiconductor-parts": { icon: "SC", color: "from-slate-600 to-slate-700", image: "/images/categories/semiconductor.jpg" },
  "ev-charging": { icon: "EV", color: "from-blue-600 to-blue-700", image: "/images/categories/ev-charging.jpg" },
  "thermal-management": { icon: "TH", color: "from-slate-600 to-slate-700", image: "/images/categories/thermal.jpg" },
  "laser-equipment": { icon: "LS", color: "from-blue-600 to-blue-700", image: "/images/categories/laser.jpg" },
};

const SEMI_SUBCATEGORIES: SubCategory[] = [
  {
    id: "esc",
    icon: "ESC",
    names: { ko: "정전척 (ESC)", en: "Electrostatic Chuck (ESC)", zh: "静电卡盘 (ESC)" },
    descriptions: {
      ko: "Etch, CVD, Implant 공정 장비용 정전척 제조 및 수리. Lam, AMAT, TEL, Axcelis 장비 대응.",
      en: "ESC manufacturing & repair for Etch, CVD, Implant equipment. Lam, AMAT, TEL, Axcelis compatible.",
      zh: "用于Etch、CVD、Implant工艺的静电卡盘制造与维修。兼容Lam、AMAT、TEL、Axcelis设备。",
    },
    partnerMatch: "DT ENG",
    color: "from-blue-700 to-indigo-800",
    applications: {
      ko: ["Etch 공정", "CVD 공정", "Ion Implant"],
      en: ["Etch Process", "CVD Process", "Ion Implant"],
      zh: ["Etch工艺", "CVD工艺", "Ion注入"],
    },
    specLine: "Lam · AMAT · TEL · Axcelis",
  },
  {
    id: "oring",
    icon: "O-Ring",
    names: {
      ko: "반도체 / 디스플레이용 O-Ring",
      en: "Semiconductor / Display O-Ring",
      zh: "半导体 / 显示器用 O-Ring",
    },
    descriptions: {
      ko: "NEOPURE® 고순도 O-Ring, PAD, Valve. 반도체 및 디스플레이 공정 적용. 내화학성·내열성 우수, 파티클 최소화.",
      en: "NEOPURE® high-purity O-Ring, PAD, Valve for semiconductor & display processes. Excellent chemical/heat resistance.",
      zh: "NEOPURE® 高纯度O-Ring、PAD、Valve，适用于半导体及显示器工艺。优异的耐化学性、耐热性。",
    },
    partnerMatch: "NEOTECH",
    color: "from-emerald-700 to-teal-800",
    applications: {
      ko: ["반도체 공정", "디스플레이 공정", "NEOPURE®"],
      en: ["Semiconductor", "Display Panel", "NEOPURE®"],
      zh: ["半导体工艺", "显示器工艺", "NEOPURE®"],
    },
    specLine: "High Purity · Chemical Resistant · Low Particle",
  },
  {
    id: "dry-vacuum-pump",
    icon: "VP",
    names: { ko: "드라이 진공 펌프", en: "Dry Vacuum Pump", zh: "干式真空泵" },
    descriptions: {
      ko: "반도체 공정용 고성능 드라이 펌프. 오일프리 방식, 클린룸 환경 최적화.",
      en: "High-performance dry pump for semiconductor processes. Oil-free, cleanroom optimized.",
      zh: "半导体工艺用高性能干式泵。无油方式，洁净室环境优化。",
    },
    partnerMatch: "Grandhitek",
    color: "from-slate-600 to-slate-800",
    applications: {
      ko: ["CVD / Etch", "클린룸", "오일프리"],
      en: ["CVD / Etch", "Cleanroom", "Oil-Free"],
      zh: ["CVD/Etch", "洁净室", "无油"],
    },
    specLine: "Oil-Free · Cleanroom Class · High Reliability",
  },
  {
    id: "wafer-carrier",
    icon: "WC",
    names: {
      ko: "반도체 웨이퍼 캐리어",
      en: "Semiconductor Wafer Carrier",
      zh: "半导体晶圆载体",
    },
    descriptions: {
      ko: "반도체 공정용 웨이퍼 캐리어. 오염 없는 이송·보관, 정밀 클린룸 환경 대응.",
      en: "Wafer carriers for semiconductor processes. Contamination-free transfer and storage for cleanroom environments.",
      zh: "半导体工艺用晶圆载体。无污染搬运与储存，精密洁净室环境对应。",
    },
    partnerMatch: "WAFER-CARRIER",
    color: "from-violet-700 to-purple-800",
    applications: {
      ko: ["웨이퍼 이송", "클린룸 보관", "오염 방지"],
      en: ["Wafer Transfer", "Cleanroom Storage", "Contamination-Free"],
      zh: ["晶圆搬运", "洁净室储存", "防污染"],
    },
    specLine: "Cleanroom Compatible · Anti-Static · Precision",
  },
];

/* ───── Helpers ───── */

function parseSpecs(specs: string) {
  try {
    const obj = JSON.parse(specs);
    if (typeof obj === "object" && obj !== null && Object.keys(obj).length > 0) return obj;
    return null;
  } catch {
    return null;
  }
}

function isEscProduct(specs: any) {
  return specs && specs.service_levels && specs.equipment;
}

function getManufacturer(specs: any): string {
  if (!specs) return "";
  return specs.manufacturer || "";
}

/* ───── Component ───── */

export default function ProductList({ locale, categories, products, lineupsByProduct, initialCategory, initialSub }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState(initialCategory || "");
  const [activeSub, setActiveSub] = useState<string | null>(initialSub || null);
  const [search, setSearch] = useState("");
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  const navigate = useCallback((category: string, sub: string | null) => {
    const params = new URLSearchParams();
    params.set("lang", locale);
    if (category) params.set("category", category);
    if (sub) params.set("sub", sub);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setActiveCategory(category);
    setActiveSub(sub);
    setExpandedProduct(null);
  }, [locale, pathname, router]);

  // Filter by top-level category + search (including lineup part numbers)
  const filtered = useMemo(() => {
    return products.filter((p: any) => {
      const matchCategory = !activeCategory || p.category_slug === activeCategory;
      const q = search.toLowerCase().trim();
      if (!q) return matchCategory;

      // Search in product name, description, partner
      const name = localizedField(p, "name", locale).toLowerCase();
      const desc = localizedField(p, "description", locale).toLowerCase();
      const partner = localizedField(p, "partner_name", locale).toLowerCase();
      if (name.includes(q) || desc.includes(q) || partner.includes(q)) return matchCategory;

      // Search in lineup model_name and part numbers (specs.part_number)
      // This allows searching by partial part number segments like "315" from "839-800327-315"
      const lineups = lineupsByProduct[p.id] || [];
      for (const lineup of lineups) {
        const modelName = (lineup.model_name || "").toLowerCase();
        if (modelName.includes(q)) return matchCategory;

        const lineName = localizedField(lineup, "name", locale).toLowerCase();
        if (lineName.includes(q)) return matchCategory;

        const specs = parseSpecs(lineup.specifications);
        if (specs) {
          // Search full part_number string
          const partNumber = (specs.part_number || "").toLowerCase();
          if (partNumber.includes(q)) return matchCategory;

          // Also match individual segments split by dash/comma
          // e.g. "839-800327-315" → ["839", "800327", "315"]
          const segments = partNumber.split(/[-,\s]+/);
          if (segments.some((seg: string) => seg.includes(q))) return matchCategory;

          // Search equipment name
          const equipment = (specs.equipment || "").toLowerCase();
          if (equipment.includes(q)) return matchCategory;
        }
      }

      return false;
    });
  }, [products, activeCategory, search, locale, lineupsByProduct]);

  // For semiconductor-parts, group by sub-category
  const isSemiCategory = activeCategory === "semiconductor-parts";

  // Get products matching a sub-category
  const getSubProducts = (sub: SubCategory) => {
    return filtered.filter((p: any) => {
      const partnerEn = (p.partner_name_en || "").toLowerCase();
      return partnerEn.includes(sub.partnerMatch.toLowerCase());
    });
  };

  // Products for the active sub-category
  const subFiltered = useMemo(() => {
    if (!isSemiCategory || !activeSub) return [];
    const sub = SEMI_SUBCATEGORIES.find((s) => s.id === activeSub);
    if (!sub) return [];
    return getSubProducts(sub);
  }, [filtered, isSemiCategory, activeSub]);

  // For non-semiconductor or "all" view, separate ESC from others
  const { escProducts, otherProducts } = useMemo(() => {
    const source = isSemiCategory && activeSub ? subFiltered : filtered;
    const esc: any[] = [];
    const other: any[] = [];
    for (const p of source) {
      const lineups = lineupsByProduct[p.id] || [];
      const firstSpecs = lineups.length > 0 ? parseSpecs(lineups[0].specifications) : null;
      if (isEscProduct(firstSpecs)) {
        esc.push(p);
      } else {
        other.push(p);
      }
    }
    return { escProducts: esc, otherProducts: other };
  }, [isSemiCategory, activeSub, subFiltered, filtered, lineupsByProduct]);

  // Group ESC products by manufacturer
  const escByManufacturer = useMemo(() => {
    const groups: Record<string, any[]> = {};
    for (const p of escProducts) {
      const lineups = lineupsByProduct[p.id] || [];
      const firstSpecs = lineups.length > 0 ? parseSpecs(lineups[0].specifications) : null;
      const mfr = getManufacturer(firstSpecs);
      if (!groups[mfr]) groups[mfr] = [];
      groups[mfr].push(p);
    }
    return groups;
  }, [escProducts, lineupsByProduct]);

  /* ───── Render helpers ───── */

  const renderServiceCell = (v: string) => {
    const cls = v === "O" ? "text-emerald-600 font-bold" :
      v === "X" ? "text-gray-300" :
      v === "UD" ? "text-amber-500" : "text-gray-300";
    const icon = v === "O" ? "●" : v === "X" ? "—" : v === "UD" ? "◐" : "—";
    return <td className={`py-2.5 px-1 text-center text-xs ${cls}`}>{icon}</td>;
  };

  // Sub-category selection cards for semiconductor parts
  const renderSubCategoryCards = () => {
    return (
      <div className="mb-8">
        {/* Breadcrumb when sub is selected */}
        {activeSub && (
          <div className="flex items-center gap-2 mb-6 text-sm">
            <button
              onClick={() => navigate(activeCategory, null)}
              className="text-[var(--accent)] hover:underline font-medium"
            >
              {locale === "ko" ? "반도체 장비 부품" : locale === "zh" ? "半导体设备零部件" : "Semiconductor Equipment Parts"}
            </button>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[var(--primary)] font-semibold">
              {(SEMI_SUBCATEGORIES.find((s) => s.id === activeSub)?.names || {})[locale] || activeSub}
            </span>
          </div>
        )}

        {/* Sub-category cards - shown when no sub is selected */}
        {!activeSub && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {SEMI_SUBCATEGORIES.map((sub) => {
              const subProducts = getSubProducts(sub);
              const totalLineups = subProducts.reduce((sum, p) => sum + (lineupsByProduct[p.id] || []).length, 0);
              const apps = sub.applications[locale] || sub.applications.en;

              return (
                <button
                  key={sub.id}
                  onClick={() => navigate(activeCategory, sub.id)}
                  className="group text-left bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[var(--accent)] hover:shadow-2xl transition-all duration-300"
                >
                  {/* Card header — dark gradient with SVG icon */}
                  <div className={`h-44 bg-gradient-to-br ${sub.color} flex flex-col items-center justify-center relative overflow-hidden`}>
                    {/* subtle grid pattern overlay */}
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                    />
                    {/* category code — top left */}
                    <div className="absolute top-3 left-3 text-[10px] font-mono font-bold text-white/50 tracking-widest uppercase">
                      {sub.icon}
                    </div>
                    {/* product count — top right */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {subProducts.length} {locale === "ko" ? "제품" : "products"}
                      {totalLineups > 0 && ` · ${totalLineups} ${locale === "ko" ? "라인업" : "lineups"}`}
                    </div>
                    {/* spec line — bottom */}
                    <div className="absolute bottom-3 left-0 right-0 text-center text-[9px] font-mono text-white/40 tracking-wider px-4 truncate">
                      {sub.specLine}
                    </div>
                    {/* hover glow overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300" />
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col gap-3">
                    <div>
                      <h3 className="text-base font-bold text-[var(--primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                        {sub.names[locale] || sub.names.en}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {sub.descriptions[locale] || sub.descriptions.en}
                    </p>
                    {/* Application tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {apps.map((app) => (
                        <span key={app} className="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-500 border border-gray-200 rounded-full font-medium">
                          {app}
                        </span>
                      ))}
                    </div>
                    {/* CTA */}
                    <div className="flex items-center gap-1 text-xs text-[var(--accent)] font-semibold mt-1 group-hover:translate-x-0.5 transition-transform">
                      {locale === "ko" ? "자세히 보기" : locale === "zh" ? "查看详情" : "View Details"}
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderEscSection = () => {
    if (escProducts.length === 0) return null;

    return (
      <div className="mb-12">
        {/* ESC Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">
            {locale === "ko" ? "정전척 (ESC) 제품" : locale === "zh" ? "静电卡盘(ESC)产品" : "Electrostatic Chuck (ESC) Products"}
          </h2>
          <p className="text-sm text-gray-600">
            {locale === "ko" ? "반도체 장비용 ESC 전문 제조 및 수리" : locale === "zh" ? "半导体设备用ESC专业制造与维修" : "Professional ESC manufacturing & repair for semiconductor equipment"}
          </p>
        </div>

        {/* Service Level Legend */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="text-xs font-semibold text-gray-600 mb-2">
            {locale === "ko" ? "서비스 레벨 안내" : "Service Level Guide"}
          </div>
          <div className="flex flex-wrap gap-3 text-[11px]">
            {["L0", "L1", "L2", "L3", "L3-1", "L4"].map((level) => (
              <span key={level} className="flex items-center gap-1 text-gray-600">
                <span className="font-semibold text-[var(--primary)]">{level}</span>
                <span className="text-gray-400">:</span>
                <span>{(SERVICE_LEVEL_LABELS[locale] || SERVICE_LEVEL_LABELS.en)[level]}</span>
              </span>
            ))}
            <span className="text-gray-600 ml-2">
              <span className="text-emerald-600">●</span> {locale === "ko" ? "가능" : "Available"}
              {" | "}<span className="text-gray-400">—</span> {locale === "ko" ? "불가" : "N/A"}
              {" | "}<span className="text-amber-500">◐</span> {locale === "ko" ? "개발중" : "In Dev"}
            </span>
          </div>
        </div>

        {/* Manufacturer Groups */}
        {MANUFACTURER_ORDER.map((mfr) => {
          const mfrProducts = escByManufacturer[mfr];
          if (!mfrProducts || mfrProducts.length === 0) return null;

          return (
            <div key={mfr} className="mb-8">
              <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-[var(--accent)]">
                <div className="w-1 h-8 bg-[var(--accent)] rounded-full"></div>
                <h3 className="text-lg font-bold text-[var(--primary)]">
                  {(MANUFACTURER_LABELS[mfr] || {})[locale] || mfr}
                </h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {mfrProducts.length} {locale === "ko" ? "제품" : "products"}
                </span>
              </div>

              <div className="space-y-4">
                {mfrProducts.map((product: any) => {
                  const productLineups = lineupsByProduct[product.id] || [];
                  const isExpanded = expandedProduct === product.id;

                  return (
                    <div
                      key={product.id}
                      className={`bg-white rounded-xl border overflow-hidden transition-all ${
                        isExpanded ? "border-[var(--accent)] shadow-lg" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/50 transition"
                        onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-semibold text-[var(--primary)]">
                            {localizedField(product, "name", locale)}
                          </h4>
                          <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                            {localizedField(product, "description", locale)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 ml-4 shrink-0">
                          <Link
                            href={`/contact?lang=${locale}&type=quote&product=${product.id}`}
                            className="text-xs text-[var(--accent)] font-medium hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t(locale, "nav.quote")} →
                          </Link>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <span className="text-xs bg-[var(--accent)] text-white rounded-full w-5 h-5 flex items-center justify-center">
                              {productLineups.length}
                            </span>
                            <svg className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {isExpanded && productLineups.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50/30">
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                  <th className="text-left py-2.5 px-3 font-semibold text-gray-600 w-20">
                                    {locale === "ko" ? "이미지" : "Image"}
                                  </th>
                                  <th className="text-left py-2.5 px-3 font-semibold text-gray-600">
                                    {locale === "ko" ? "장비" : "Equipment"}
                                  </th>
                                  <th className="text-left py-2.5 px-3 font-semibold text-gray-600">Part Number</th>
                                  <th className="text-center py-2.5 px-1 font-semibold text-gray-600 w-8">L0</th>
                                  <th className="text-center py-2.5 px-1 font-semibold text-gray-600 w-8">L1</th>
                                  <th className="text-center py-2.5 px-1 font-semibold text-gray-600 w-8">L2</th>
                                  <th className="text-center py-2.5 px-1 font-semibold text-gray-600 w-8">L3</th>
                                  <th className="text-center py-2.5 px-1 font-semibold text-gray-600 w-8">L3-1</th>
                                  <th className="text-center py-2.5 px-1 font-semibold text-gray-600 w-8">L4</th>
                                  <th className="text-left py-2.5 px-3 font-semibold text-gray-600 hidden xl:table-cell">
                                    {locale === "ko" ? "비고" : "Remark"}
                                  </th>
                                  <th className="py-2.5 px-2 w-16"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {productLineups.map((lineup: any) => {
                                  const specs = parseSpecs(lineup.specifications);
                                  if (!specs) return null;
                                  const sl = specs.service_levels || {};
                                  const hasImage = lineup.image_url && lineup.image_url.length > 0;

                                  return (
                                    <tr key={lineup.id} className="border-b border-gray-100 hover:bg-white transition group">
                                      <td className="py-2 px-3">
                                        {hasImage ? (
                                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
                                            <img
                                              src={lineup.image_url}
                                              alt={specs.equipment || lineup.model_name}
                                              className="w-full h-full object-cover"
                                              loading="lazy"
                                            />
                                          </div>
                                        ) : (
                                          <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold">
                                            SC
                                          </div>
                                        )}
                                      </td>
                                      <td className="py-2.5 px-3 font-medium text-[var(--primary)] whitespace-nowrap">
                                        {specs.equipment}
                                      </td>
                                      <td className="py-2.5 px-3 font-mono text-gray-700 text-[10px]">
                                        <div className="max-w-[160px]">
                                          {(specs.part_number || lineup.model_name).split(",").map((pn: string, i: number) => (
                                            <div key={i} className="truncate">{pn.trim()}</div>
                                          ))}
                                        </div>
                                      </td>
                                      {["L0", "L1", "L2", "L3", "L3-1", "L4"].map((level) =>
                                        renderServiceCell(sl[level] || "N/A")
                                      )}
                                      <td className="py-2.5 px-3 text-gray-600 text-[10px] max-w-[200px] hidden xl:table-cell">
                                        <span className="line-clamp-2">{specs.remark || ""}</span>
                                      </td>
                                      <td className="py-2.5 px-2 text-right">
                                        <Link
                                          href={`/contact?lang=${locale}&type=quote&product=${product.id}&lineup=${lineup.id}`}
                                          className="text-[10px] text-[var(--accent)] hover:underline whitespace-nowrap opacity-70 group-hover:opacity-100 transition"
                                        >
                                          {t(locale, "nav.quote")}
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderProductCards = (productList: any[]) => {
    if (productList.length === 0) return null;

    // Key specs to highlight (show first in badges)
    const KEY_SPECS = ["max_power", "power", "connectors", "connector", "efficiency", "ip_rating", "certifications", "protocol"];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productList.map((product: any) => {
          const productLineups = lineupsByProduct[product.id] || [];
          const hasLineups = productLineups.length > 0;
          const isExpanded = expandedProduct === product.id;
          const hasImage = product.image_url && product.image_url.length > 0;

          return (
            <div
              key={product.id}
              className={`card-hover bg-white rounded-xl border overflow-hidden transition-all ${
                isExpanded ? "border-[var(--accent)] shadow-lg md:col-span-2" : "border-gray-100"
              }`}
            >
              {/* Product header with image */}
              <div className={isExpanded ? "lg:flex" : ""}>
                <div className={isExpanded ? "lg:w-2/5" : ""}>
                  <div className="h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                    {hasImage ? (
                      <img src={product.image_url} alt={localizedField(product, "name", locale)} className="max-h-full max-w-full object-contain" loading="lazy" />
                    ) : (
                      <div className="text-sm font-bold text-gray-300 tracking-widest">
                        {product.category_slug === "semiconductor-parts" ? "SC" :
                         product.category_slug === "ev-charging" ? "EV" :
                         product.category_slug === "thermal-management" ? "TH" : "LS"}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-[var(--bg-alt)] text-[var(--accent)] rounded-full font-medium">
                        {localizedField(product, "cat_name", locale)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
                      {localizedField(product, "name", locale)}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {localizedField(product, "description", locale)}
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <Link
                        href={`/contact?lang=${locale}&type=quote&product=${product.id}`}
                        className="text-sm text-[var(--accent)] font-medium hover:underline"
                      >
                        {t(locale, "nav.quote")} →
                      </Link>
                      {hasLineups && (
                        <button
                          onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                          className="text-sm text-gray-700 hover:text-[var(--accent)] font-medium transition flex items-center gap-1"
                        >
                          {locale === "ko" ? "라인업 보기" : "View Lineup"}
                          <span className="text-xs bg-[var(--accent)] text-white rounded-full w-5 h-5 flex items-center justify-center">
                            {productLineups.length}
                          </span>
                          <svg className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded lineup section */}
                {isExpanded && hasLineups && (
                  <div className="lg:w-3/5 border-t lg:border-t-0 lg:border-l border-gray-100 bg-gray-50/30">
                    <div className="p-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">
                        {locale === "ko" ? "상품 라인업" : "Product Lineup"} ({productLineups.length})
                      </h4>
                      <div className="space-y-4">
                        {productLineups.map((lineup: any) => {
                          const specs = parseSpecs(lineup.specifications);
                          const lineupImage = lineup.image_url && lineup.image_url.length > 0;
                          return (
                            <div key={lineup.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-[var(--accent)] hover:shadow-sm transition">
                              <div className="flex gap-4 p-4">
                                {/* Lineup image */}
                                {lineupImage && (
                                  <div className="w-24 h-24 shrink-0 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-2">
                                    <img src={lineup.image_url} alt={lineup.model_name} className="max-w-full max-h-full object-contain" loading="lazy" />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h5 className="text-sm font-semibold text-[var(--primary)]">
                                      {localizedField(lineup, "name", locale)}
                                    </h5>
                                    {lineup.model_name && (
                                      <span className="text-[10px] font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{lineup.model_name}</span>
                                    )}
                                  </div>
                                  {localizedField(lineup, "description", locale) && (
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{localizedField(lineup, "description", locale)}</p>
                                  )}
                                  {specs && !isEscProduct(specs) && (
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                      {Object.entries(specs)
                                        .sort(([a], [b]) => {
                                          const ai = KEY_SPECS.indexOf(a);
                                          const bi = KEY_SPECS.indexOf(b);
                                          return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
                                        })
                                        .slice(0, 6)
                                        .map(([key, value]) => (
                                          <span key={key} className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                                            {key.replace(/_/g, " ")}: {String(value)}
                                          </span>
                                        ))}
                                    </div>
                                  )}
                                  <Link href={`/contact?lang=${locale}&type=quote&product=${product.id}&lineup=${lineup.id}`} className="inline-block mt-2 text-xs text-[var(--accent)] font-medium hover:underline">
                                    {t(locale, "nav.quote")} →
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  /* ───── Main category cards (landing view) ───── */

  const renderMainCategoryCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat: any) => {
          const catProducts = products.filter((p: any) => p.category_slug === cat.slug);
          const totalLineups = catProducts.reduce((sum: number, p: any) => sum + (lineupsByProduct[p.id] || []).length, 0);
          const config = CATEGORY_CONFIG[cat.slug] || { icon: "—", color: "from-gray-500 to-gray-600" };
          // Partner names hidden per business requirement

          return (
            <button
              key={cat.slug}
              onClick={() => navigate(cat.slug, null)}
              className="group text-left bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[var(--accent)] hover:shadow-xl transition-all duration-300"
            >
              <div className="h-52 bg-slate-700 relative overflow-hidden">
                {config.image && (
                  <Image
                    src={config.image}
                    alt={localizedField(cat, "name", locale)}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
                <div className="absolute bottom-4 left-5 text-white">
                  <h3 className="text-xl font-bold drop-shadow-lg">
                    {localizedField(cat, "name", locale)}
                  </h3>
                </div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {catProducts.length} {locale === "ko" ? "제품" : "products"}
                  {totalLineups > 0 && ` · ${totalLineups} ${locale === "ko" ? "라인업" : "lineups"}`}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-sm text-[var(--accent)] font-medium group-hover:translate-x-1 transition-transform">
                  {locale === "ko" ? "자세히 보기" : locale === "zh" ? "查看详情" : "View Details"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  /* ───── Determine what to render ───── */

  const renderContent = () => {
    // Search mode — show all matching products regardless of category
    if (search) {
      if (filtered.length === 0) {
        return <div className="text-center py-20 text-gray-500">{t(locale, "products.noResults")}</div>;
      }
      return (
        <>
          {escProducts.length > 0 && renderEscSection()}
          {otherProducts.length > 0 && renderProductCards(otherProducts)}
        </>
      );
    }

    // Default landing — no category selected: show main category cards
    if (!activeCategory) {
      return renderMainCategoryCards();
    }

    // Semiconductor parts category — show sub-category navigation
    if (isSemiCategory) {
      // Count products to check if category has any
      const semiProducts = products.filter((p: any) => p.category_slug === "semiconductor-parts");
      if (semiProducts.length === 0) {
        return <div className="text-center py-20 text-gray-500">{t(locale, "products.noResults")}</div>;
      }

      if (!activeSub) {
        return renderSubCategoryCards();
      }
      return (
        <>
          {renderSubCategoryCards()}
          {activeSub === "esc" ? (
            <ESCSection locale={locale} />
          ) : activeSub === "wafer-carrier" ? (
            <WaferSection locale={locale} />
          ) : activeSub === "dry-vacuum-pump" ? (
            <DryPumpSection locale={locale} />
          ) : (
            renderProductCards(otherProducts)
          )}
        </>
      );
    }

    // Thermal management — dedicated section
    if (activeCategory === "thermal-management") {
      return <ThermalSection locale={locale} />;
    }

    // Laser equipment — dedicated section
    if (activeCategory === "laser-equipment") {
      return <LaserSection locale={locale} />;
    }

    // EV charging — dedicated section
    if (activeCategory === "ev-charging") {
      return <EVSection locale={locale} />;
    }

    // Other specific category selected — show products directly
    if (filtered.length === 0) {
      return <div className="text-center py-20 text-gray-500">{t(locale, "products.noResults")}</div>;
    }
    return (
      <>
        {escProducts.length > 0 && renderEscSection()}
        {otherProducts.length > 0 && renderProductCards(otherProducts)}
      </>
    );
  };

  /* ── EV charging: render as full-width page ── */
  if (activeCategory === "ev-charging" && !search) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { navigate("", null); setSearch(""); }}
              className="px-4 py-2 rounded-full text-sm font-medium transition bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            >
              {t(locale, "products.all")}
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat.slug}
                onClick={() => { navigate(cat.slug, null); setSearch(""); }}
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
        </div>
        <EVSection locale={locale} />
      </>
    );
  }

  /* ── Thermal management: render as full-width page ── */
  if (activeCategory === "thermal-management" && !search) {
    return (
      <>
        {/* Compact filter bar — stays visible so user can switch categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { navigate("", null); setSearch(""); }}
              className="px-4 py-2 rounded-full text-sm font-medium transition bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            >
              {t(locale, "products.all")}
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat.slug}
                onClick={() => { navigate(cat.slug, null); setSearch(""); }}
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
        </div>
        <ThermalSection locale={locale} />
      </>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { navigate("", null); setSearch(""); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              !activeCategory && !search ? "bg-[var(--accent)] text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {t(locale, "products.all")}
          </button>
          {categories.map((cat: any) => (
            <button
              key={cat.slug}
              onClick={() => { navigate(cat.slug, null); setSearch(""); }}
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

      {/* Content */}
      {renderContent()}
    </div>
  );
}
