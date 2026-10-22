"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";
import { FAQ_GRANDHITEK } from "./grandhitek-faq";

/*
 * /products/vacuum-pump — Grand Hitek(北京通嘉宏瑞科技股份有限公司, 通嘉科技) 드라이 진공 펌프
 *   (반도체·디스플레이·태양광·2차전지·LED·산업용 진공 — 홈페이지 응용 분야 기준, 2026-10-22 Jino «반도체용만 있는 게 아니잖아»).
 *
 * 출처 두 가지만 쓴다. 자료에 없는 내용은 넣지 않는다.
 *  [홈페이지] www.grandhitek.com.cn · en.grandhitek.com.cn (2026-10-22 수집) — 라인업 모델·최대 배기속도,
 *             공정별 권장 제품, 통합 시스템·분자 펌프·서비스, 연혁·거점·자격. 두 자료가 어긋나면 이쪽(더 최근)을 쓴다.
 *  [회사소개서] Grand Hitek Company Introduction (2025.12) — 반도체 카탈로그·명명 규칙·타사 대응 모델,
 *             ETCH 추천표, 공정 난제 대응, 고객 실적, GMR 에너지 비교, 제품 인증, R&D.
 *  - 경쟁사 비교·점유율 수치에는 출처 문구를 붙인다. 고객사 마스킹(SXX·S**C 등)은 원문 그대로.
 *  - 고객사 로고(제3자 상표)는 쓰지 않는다. Grand Hitek 직통 연락처는 넣지 않는다(한국 창구 = OHI Tech).
 * 이미지: 홈페이지 제품 사진·로고 우선, 기술 도식은 회사소개서에서 추출(사용 허락: Jino 2026-10-22).
 */

const SLUG = "vacuum-pump";
const IMG = "/images/products/grandhitek";

type L4<T = string> = Record<Locale, T>;
type Img = { src: string; w: number; h: number };

/* ─────────────────────────────────────────────
   LANGUAGE-NEUTRAL DATA
───────────────────────────────────────────── */

type SeriesId = "glr" | "gmr" | "ghc" | "gs" | "ghr";
type Mech = "roots" | "claw";
type Grade = "clean" | "general" | "medium" | "harsh";

// [홈페이지] 제품 상세 사양표 — Model / Maximum Pumping Speed (m³/h)
const DRY_SERIES: { id: SeriesId; name: string; mech: Mech; grades: Grade[]; models: string[]; speed: string; best: string[] | null; img: Img }[] = [
  {
    id: "glr",
    name: "GLR",
    mech: "roots",
    grades: ["clean", "general"],
    models: ["GLR120", "GLR500", "GLR2000", "GLR3000", "GLR3500", "GLR5000"],
    speed: "110 – 4,500 m³/h",
    best: ["Load Lock", "Transfer", "PVD", "Coater"],
    img: { src: `${IMG}/glr.webp`, w: 640, h: 621 },
  },
  {
    id: "gmr",
    name: "GMR",
    mech: "roots",
    grades: ["clean", "general"],
    models: ["GMR200", "GMR600", "GMR1200", "GMR1800"],
    speed: "210 – 1,800 m³/h",
    best: ["IMP Source", "Strip/Ashing", "Oxide Etch", "Poly Etch", "Metal Etch", "HDP"],
    img: { src: `${IMG}/gmr.webp`, w: 545, h: 640 },
  },
  {
    id: "ghc",
    name: "GHC",
    mech: "claw",
    grades: ["clean", "general", "harsh"],
    models: ["GHC200", "GHC500", "GHC600", "GHC1200", "GHC1800", "GHC3000", "GHC5000", "GHC6000"],
    speed: "220 – 5,500 m³/h",
    best: ["ALD", "PECVD", "LPCVD", "SACVD", "MOCVD", "Metal Etch"],
    img: { src: `${IMG}/ghc.webp`, w: 575, h: 640 },
  },
  {
    id: "gs",
    name: "GS",
    mech: "claw",
    grades: ["clean", "general", "harsh"],
    models: ["GS1800", "GS1800H", "GS2000E", "GS2400E", "GS3000", "GS3600E", "GS4200S", "GS5000", "GS6000"],
    speed: "1,800 – 5,500 m³/h",
    best: null,
    img: { src: `${IMG}/gs.webp`, w: 567, h: 640 },
  },
  {
    id: "ghr",
    name: "GHR",
    mech: "roots",
    grades: ["medium", "harsh"],
    models: ["GHR600", "GHR700"],
    speed: "600 – 650 m³/h",
    best: ["MOCVD", "Si EPI", "SiC EPI", "HJT"],
    img: { src: `${IMG}/ghr.webp`, w: 604, h: 640 },
  },
];

// [홈페이지] 半导体 응용 페이지 «应用挑战及应用领域» 표 — 1 = ●
type Ch = 0 | 1;
const PROCESS_TABLE: { process: string; series: string; cond: Ch; corr: Ch; dust: Ch; heat: Ch; comb: Ch; h2: Ch; fab68?: boolean }[] = [
  { process: "Load Lock", series: "GLR", cond: 0, corr: 0, dust: 0, heat: 0, comb: 0, h2: 0 },
  { process: "Transfer", series: "GLR", cond: 0, corr: 0, dust: 0, heat: 0, comb: 0, h2: 0 },
  { process: "PVD", series: "GLR", cond: 0, corr: 0, dust: 0, heat: 0, comb: 0, h2: 0 },
  { process: "Coater", series: "GLR", cond: 1, corr: 0, dust: 0, heat: 0, comb: 0, h2: 0 },
  { process: "IMP Source", series: "GMR", cond: 1, corr: 0, dust: 0, heat: 0, comb: 0, h2: 0 },
  { process: "Strip/Ashing", series: "GMR", cond: 0, corr: 0, dust: 0, heat: 0, comb: 0, h2: 0 },
  { process: "Oxide Etch", series: "GMR", cond: 1, corr: 0, dust: 0, heat: 0, comb: 0, h2: 0 },
  { process: "Poly Etch", series: "GMR", cond: 0, corr: 1, dust: 0, heat: 0, comb: 0, h2: 0 },
  { process: "Metal Etch", series: "GMR", cond: 1, corr: 1, dust: 0, heat: 0, comb: 0, h2: 0, fab68: true },
  { process: "HDP", series: "GMR", cond: 0, corr: 1, dust: 0, heat: 0, comb: 0, h2: 0 },
  { process: "ALD", series: "GHC", cond: 1, corr: 1, dust: 1, heat: 1, comb: 1, h2: 0 },
  { process: "PECVD", series: "GHC", cond: 1, corr: 1, dust: 1, heat: 0, comb: 1, h2: 0 },
  { process: "LPCVD", series: "GHC", cond: 1, corr: 1, dust: 1, heat: 0, comb: 1, h2: 0 },
  { process: "SACVD", series: "GHC", cond: 1, corr: 0, dust: 1, heat: 1, comb: 1, h2: 0 },
  { process: "MOCVD", series: "GHC", cond: 1, corr: 0, dust: 0, heat: 1, comb: 1, h2: 0 },
  { process: "Metal Etch", series: "GHC", cond: 1, corr: 1, dust: 0, heat: 0, comb: 0, h2: 0 },
  { process: "MOCVD", series: "GHR", cond: 0, corr: 0, dust: 0, heat: 0, comb: 0, h2: 1 },
  { process: "Si EPI", series: "GHR", cond: 0, corr: 0, dust: 0, heat: 0, comb: 0, h2: 1 },
  { process: "SiC EPI", series: "GHR", cond: 0, corr: 0, dust: 0, heat: 0, comb: 0, h2: 1 },
  { process: "HJT", series: "GHR", cond: 0, corr: 0, dust: 0, heat: 0, comb: 0, h2: 1 },
];

const SYSTEMS: { id: string; name: string; zh: string; img: Img }[] = [
  { id: "mizar", name: "Mizar", zh: "开阳", img: { src: `${IMG}/system-mizar.webp`, w: 458, h: 560 } },
  { id: "megrez", name: "Megrez", zh: "天权", img: { src: `${IMG}/system-megrez.webp`, w: 266, h: 445 } },
  { id: "merak", name: "Merak", zh: "天璇", img: { src: `${IMG}/system-merak.webp`, w: 560, h: 557 } },
  { id: "alioth", name: "Alioth", zh: "玉衡", img: { src: `${IMG}/system-alioth.webp`, w: 465, h: 437 } },
  { id: "phecda", name: "Phecda", zh: "天玑", img: { src: `${IMG}/system-phecda.webp`, w: 313, h: 311 } },
];

// [홈페이지] 分子泵 — N₂ 抽速
const MOLECULAR: { id: string; models: string; speed: string; img: Img }[] = [
  { id: "gtp-m", models: "GTP-M2201 · GTP-M3400 · GTP-M4500", speed: "N₂ 1,850 – 4,300 L/s", img: { src: `${IMG}/gtp-m.webp`, w: 372, h: 480 } },
  { id: "gtp-g", models: "GTP-G300 · G800 · G1400 · G2400 · GTP-L4400", speed: "N₂ 300 – 4,200 L/s", img: { src: `${IMG}/gtp-g2400.webp`, w: 388, h: 480 } },
  { id: "gtp-h", models: "GTP-H80 · GTP-H80D", speed: "N₂ 90 L/s", img: { src: `${IMG}/gtp-h80.webp`, w: 373, h: 432 } },
];

const SERVICE_IMG: (Img | null)[] = [
  null,
  { src: `${IMG}/service-y2o3.webp`, w: 640, h: 480 },
  { src: `${IMG}/service-cleaning.webp`, w: 640, h: 480 },
  { src: `${IMG}/service-seal.webp`, w: 640, h: 480 },
];

// [회사소개서] p.15 반도체 카탈로그. 타사 대응 모델 표기(Edxx·Ebxx)는 원문 그대로.
// 원문 Medium 200 행의 «GM200»은 같은 자료의 ETCH 추천표·설치 실적·홈페이지 표기(GMR200)로 통일.
const CATALOG: { duty: string; series: string; mech: Mech; speed: string; model: string; ed: string; eb: string; set?: boolean }[] = [
  { duty: "Light", series: "GLR", mech: "roots", speed: "120", model: "GLR120", ed: "IXL120N", eb: "EVS-20(P/N)" },
  { duty: "Light", series: "GLR", mech: "roots", speed: "600", model: "GLR600", ed: "iXL600N", eb: "EVS-100(P/N)" },
  { duty: "Light", series: "GLR", mech: "roots", speed: "1,200", model: "GLR1200", ed: "IXL1000N", eb: "EVS-200(P/N)" },
  { duty: "Medium", series: "GMR", mech: "roots", speed: "200", model: "GMR200", ed: "IXM200", eb: "ESR20N" },
  { duty: "Medium", series: "GMR", mech: "roots", speed: "600", model: "GMR600 / GMR600N", ed: "IXM600 / iXM600 XD", eb: "EV-X100N" },
  { duty: "Medium", series: "GMR", mech: "roots", speed: "1,200", model: "GMR1200 / GMR1200N", ed: "IXM1200 / iXM1200 XD", eb: "EV-X200N" },
  { duty: "Medium", series: "GMR", mech: "roots", speed: "1,800", model: "GMR1800 / GMR1800N", ed: "IXM1800 / iXM1800 XD", eb: "EV-X300N" },
  { duty: "Harsh", series: "GHC", mech: "claw", speed: "200", model: "GHC200", ed: "IXH200", eb: "EV-M20N / EST25N" },
  { duty: "Harsh", series: "GHC", mech: "claw", speed: "500", model: "GHC500", ed: "iXH500H", eb: "—" },
  { duty: "Harsh", series: "GHC", mech: "claw", speed: "600", model: "GHC600T", ed: "IXH610", eb: "EV-M102N / EST100WN" },
  { duty: "Harsh", series: "GHC", mech: "claw", speed: "1,200", model: "GHC1200 / GHC1200T", ed: "iXH1220H / iXH1220HTX", eb: "EV-M202N / EST200WN" },
  { duty: "Harsh", series: "GHC", mech: "claw", speed: "1,800", model: "GHC1800L / GHC1800T", ed: "iXH1820 / iXH1820HTX", eb: "EV-M302N / EST300WN" },
  { duty: "Harsh", series: "GHC", mech: "claw", speed: "3,000", model: "GHC3000T / GHC3000L", ed: "iXH3050HTX / iXH3050H SC", eb: "EV-M502N / EST500WN" },
  { duty: "Harsh", series: "GHC", mech: "claw", speed: "4,500", model: "GHC5000T / GHC5000Z", ed: "IXH4550HT / iXH4550HTXS", eb: "EV-M802N / EST800WN" },
  { duty: "Harsh", series: "GHC", mech: "claw", speed: "6,000", model: "GHC6000T / GHC6000L / GHC6000Z", ed: "IXH6050HT / iXH6050H SC / iXH6050HTXS", eb: "—" },
  { duty: "Harsh", series: "GHC", mech: "claw", speed: "7,000", model: "GHC3000T + GMB6000", ed: "iXH3050H + pXH6000", eb: "—", set: true },
  { duty: "H₂", series: "GHR", mech: "roots", speed: "600", model: "GHR600", ed: "iXH645H", eb: "ESA100WN" },
];

// [회사소개서] p.7 Key Customers recognition — 고객명은 원문 표기
const KEY_CUSTOMERS = [
  { name: "SXX", process: "Logic", units: "400+", best: "23,000h+" },
  { name: "CXMT", process: "DRAM", units: "800+", best: "17,000h+" },
  { name: "HH Group", process: "Logic", units: "700+", best: "12,000h+" },
  { name: "YMTC", process: "3D NAND", units: "60+", best: "12,000h+" },
  { name: "HUAWEI", process: "Logic + Memory + MEMS", units: "800+", best: "9,000h+" },
  { name: "BYD", process: "3GS + MEMS", units: "500+", best: "11,000h+" },
];

// [회사소개서] p.21 Semi Installbase(China) — 마스킹 원문 그대로, qty는 원문에 있는 값만
const INSTALL_BASE: { customer: string | L4; qty?: string; rows: { module: string; models: string; hours: string; qty?: string }[] }[] = [
  { customer: "S**C", qty: "412", rows: [
    { module: "CVD", models: "GHC6000, GHC3000, GHC1800T", hours: "30,000+" },
    { module: "CVD", models: "GHC1800T", hours: "10,000+" },
    { module: "ETCH", models: "GHC1200", hours: "8,000+" },
    { module: "ETCH", models: "GMR1200", hours: "8,000+" },
  ] },
  { customer: "C**T", qty: "836", rows: [
    { module: "ETCH", models: "GMR1200", hours: "12,000+" },
    { module: "ETCH", models: "GMR1200", hours: "11,000+" },
    { module: "ETCH", models: "GMR1200", hours: "9,000+" },
    { module: "ETCH", models: "GHC3000T", hours: "9,000+" },
    { module: "CVD", models: "GHC1200T, GHC3000T", hours: "17,000+" },
  ] },
  { customer: "P*T", qty: "837", rows: [
    { module: "Diff", models: "GMR1200, GHC1800", hours: "5,000+" },
    { module: "CVD", models: "GMR1200, GHC1800, GLR120", hours: "7,000+" },
    { module: "PVD", models: "GMR1200, GHC1800, GMR600", hours: "9,000+" },
    { module: "ETCH", models: "GMR1200, GHC1800", hours: "8,000+" },
  ] },
  { customer: "H* group", qty: "703", rows: [
    { module: "ETCH", models: "GMR1200", hours: "12,000+" },
    { module: "ETCH", models: "GMR1200", hours: "8,000+" },
    { module: "CVD", models: "GHC3000T", hours: "8,000+" },
  ] },
  { customer: "BYD", qty: "564", rows: [
    { module: "CVD", models: "GMR600, GHC1800T", hours: "11,000+" },
    { module: "PVD", models: "GMR600, GHC1800T", hours: "9,000+" },
    { module: "ETCH", models: "GMR600, GMR1200, GHC1800T", hours: "10,000+" },
    { module: "IMP", models: "GMR1200", hours: "8,000+" },
    { module: "LL", models: "GLR120", hours: "10,000+" },
  ] },
  { customer: "Nau**", qty: "304", rows: [
    { module: "CVD", models: "GHC600, GHC1200, GHC1800", hours: "9,000+" },
    { module: "PVD", models: "GHC600, GHC1200, GHC1800", hours: "7,000+" },
    { module: "ETCH", models: "GHC600, GHC1800", hours: "8,000+" },
    { module: "IMP", models: "GMR600, GMR1200", hours: "6,000+" },
  ] },
  { customer: { ko: "8인치 팹", en: "8-inch fab", zh: "8英寸晶圆厂", ja: "8インチファブ" }, rows: [
    { module: "CVD", models: "GLR120, GHC1800T, GMR600, GHC1200T", hours: "9,000+", qty: "86" },
    { module: "Etch", models: "GLR120, GMR600, GHC1200", hours: "9,000+", qty: "42" },
    { module: "IMP", models: "GMR200, GMR1200", hours: "6,000+", qty: "18" },
  ] },
  { customer: "Y**C", qty: "62", rows: [
    { module: "WN ALD", models: "GHC5000T", hours: "6,000+" },
    { module: "PECVD", models: "GHC3000T, GHC1800T", hours: "8,000+" },
    { module: "PECVD", models: "GHC3000, GHC1800T", hours: "12,000+" },
    { module: "PECVD", models: "GMR1200", hours: "8,000+" },
  ] },
];

// [회사소개서] p.19 GMR 에너지 비교 — 시리즈명은 원문(GMR·iXM·SGM). [홈페이지] GMR 사양표 운전전력 0.8/1.0 kW와 일치.
const POWER_KW = [
  { cls: "600", gmr: 0.8, ixm: 1.1, sgm: 1.6 },
  { cls: "1200", gmr: 1.0, ixm: 1.3, sgm: 1.8 },
];
// 금액 표시 통화 — Jino 2026-10-22 19:08: 한국어는 원화, 영어는 US$, 일본어는 엔화로 환산(중국어는 RMB 원값).
// 환율: ECB 기준환율 2026-10-21 교차환산(EUR = 1.1234 USD = 177.36 JPY = 7.4999 CNY = 1489.15 KRW). 바꿀 땐 여기 한 곳만.
const CNY_TO: Partial<Record<Locale, { code: "KRW" | "USD" | "JPY"; rate: number }>> = {
  ko: { code: "KRW", rate: 198.556 },
  en: { code: "USD", rate: 0.149789 },
  ja: { code: "JPY", rate: 23.6483 },
};

/** RMB 금액을 로케일 통화로. bar = 막대 값, approx = «약 ○○» 요약, unit = 단가. zh는 RMB 그대로. */
function money(locale: Locale, rmb: number, kind: "bar" | "approx" | "unit"): string {
  const fx = CNY_TO[locale];
  if (!fx) return kind === "bar" ? rmb.toLocaleString("en-US") : `${rmb} RMB`;
  const v = rmb * fx.rate;
  if (fx.code === "KRW") return kind === "bar" ? `${(v / 1e8).toFixed(1)}억 원` : kind === "approx" ? `약 ${Math.round(v / 1e8)}억 원` : `약 ${Math.round(v)}원`;
  if (fx.code === "USD") return kind === "bar" ? `US$${(v / 1e6).toFixed(2)}M` : kind === "approx" ? `≈ US$${(v / 1e6).toFixed(1)} million` : `US$${v.toFixed(3)}`;
  return kind === "bar" ? `${(v / 1e8).toFixed(1)}億円` : kind === "approx" ? `約${(v / 1e8).toFixed(1)}億円` : `約${v.toFixed(1)}円`;
}

/** 문구 안의 {a:RMB}(요약 금액)·{u:RMB}(단가) 자리표시를 로케일 통화로 바꾼다. */
function fxText(locale: Locale, text: string): string {
  return text.replace(/\{(a|u):([\d.]+)\}/g, (_, k: string, n: string) => money(locale, Number(n), k === "a" ? "approx" : "unit"));
}

const COST_RMB = [
  { cls: "600", gmr: 52_122_000, ixm: 79_847_400, sgm: 104_244_000 },
  { cls: "1200", gmr: 75_336_000, ixm: 88_607_400, sgm: 147_168_000 },
];

const CERTS = {
  semi: ["SEMI S2-0724", "SEMI S6-0618", "SEMI S8-0218", "SEMI F47-0706"],
  naeu: ["ETL", "UL", "CE"],
  system: ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018"],
};

// [홈페이지] 应用领域 — 산업별 응용 페이지(lingyuList/…)와 홈 «适配工艺». 이미지: site/images/applications.
type ChKey = "cond" | "corr" | "dust" | "heat" | "comb" | "h2" | "pyro" | "freq" | "moist" | "solv";
type IndustryId = "semi" | "display" | "solar" | "battery" | "led";
const INDUSTRIES: { id: IndustryId; img: Img | null; anchor?: Anchor }[] = [
  { id: "semi", img: { src: `${IMG}/industry-semiconductor.webp`, w: 800, h: 400 }, anchor: "selection" },
  { id: "display", img: { src: `${IMG}/industry-display.webp`, w: 800, h: 400 } },
  { id: "solar", img: { src: `${IMG}/industry-solar.webp`, w: 800, h: 400 } },
  { id: "battery", img: { src: `${IMG}/industry-battery.webp`, w: 800, h: 400 } },
  { id: "led", img: null, anchor: "molecular" },
];

const STATOR_IMG: Img = { src: `${IMG}/stator-rotor.webp`, w: 233, h: 213 };
const PMSM_IMG: Img = { src: `${IMG}/pmsm-motor.webp`, w: 720, h: 514 };

const ANCHORS = ["industries", "dry-pumps", "selection", "systems", "molecular", "services", "references", "energy", "technology", "catalog", "certifications", "company", "faq"] as const;
type Anchor = (typeof ANCHORS)[number];

/* ─────────────────────────────────────────────
   LOCALIZED COPY
───────────────────────────────────────────── */

type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  badge: string;
  ctaInquiry: string;
  ctaQuote: string;
  nav: Record<Anchor, string>;
  stats: { value: string; label: string }[];

  indTitle: string;
  indSub: string;
  indLbl: { processes: string; recommended: string; more: string };
  ind: Record<IndustryId, { name: string; share?: string; processes: string[]; rows: { label: string; text: string }[]; note?: string }>;

  indFilter: { label: string; all: string; tabs: Record<IndustryId, string>; count: (n: number) => string; procLabel: (name: string) => string };
  /** 드라이 펌프 카드 산업 필터 — 키가 있는 시리즈만 그 산업에서 보인다. [홈페이지] 应用领域 표·홈 适配工艺 기준. */
  indSeries: Record<IndustryId, Partial<Record<SeriesId, string[]>>>;
  dryTitle: string;
  drySub: string;
  lbl: { mech: string; speed: string; models: string; grade: string; best: string; markets: string; options: string };
  mech: Record<Mech, string>;
  grade: Record<Grade, string>;
  seriesDesc: Record<SeriesId, string>;
  seriesMarkets: Record<SeriesId, string>;
  seriesOptions: Partial<Record<SeriesId, string>>;
  glrP: string;
  gsBest: string;

  recLbl: { process: string; application: string; series: string; note: string; dot: string };
  ch: Record<ChKey, string>;
  /** 비반도체 분야 «공정 → 권장 시리즈» 표. [홈페이지 중문] 应用领域 표·홈 适配工艺·리튬 공정도·분자펌프 페이지 기준. 빈 과제 열은 두지 않는다. */
  rec: Record<Exclude<IndustryId, "semi">, { application?: boolean; cols: ChKey[]; rows: { process: string; series: string; marks?: ChKey[]; note?: string }[] }>;
  selTitle: string;
  selSub: string;
  selCols: [string, string, string, string, string, string, string, string];
  selNote: string;
  etchTitle: string;
  etchCols: [string, string, string, string];
  etchRows: { process: string; issue: string; solution: string; model: string }[];

  sysTitle: string;
  sysSub: string;
  sysDesc: Record<string, string>;
  aliothFigures: string;

  molTitle: string;
  molSub: string;
  mol: Record<string, { title: string; desc: string }>;
  molPower: string;

  svcTitle: string;
  svcSub: string;
  svc: { title: string; desc: string }[];

  refTitle: string;
  refSub: string;
  refCols: [string, string, string, string];
  refMaskNote: string;
  ibTitle: string;
  ibSub: string;
  ibCols: [string, string, string, string];
  units: string;

  energyTitle: string;
  energySub: string;
  powerTitle: string;
  costTitle: string;
  cls: (n: string) => string;
  powerHighlights: string[];
  costHighlights: string[];
  conditions: string;
  energySource: string;

  techTitle: string;
  techSub: string;
  techItems: { title: string; desc: string; img?: Img }[];
  challengeTitle: string;
  challenges: { title: string; items: string[] }[];
  keyChallengesLabel: string;
  keyChallenges: string[];
  appTitle: string;
  appCols: [string, string, string];
  appRows: { challenge: string; process: string; solution: string }[];
  paramNotes: string[];
  conceptTitle: string;
  conceptLead: string;
  concepts: { title: string; desc: string }[];

  namingTitle: string;
  namingSlots: { label: string; values: string[] }[];
  namingExample: string;
  catalogTitle: string;
  catalogSub: string;
  catCols: [string, string, string, string, string, string, string];
  catNote: string;
  pumpSet: string;

  certTitle: string;
  certGroups: { semi: string; naeu: string; system: string };
  honorsTitle: string;
  honors: string[];

  companyTitle: string;
  companyLead: string;
  historyTitle: string;
  history: { year: string; items: string[] }[];
  basesTitle: string;
  basesSummary: string;
  basesCols: [string, string, string];
  bases: { loc: string; role: string; status: string; building: boolean }[];
  rdTitle: string;
  rdItems: { title: string; points: string[] }[];

  faqTitle: string;
  ctaTitle: string;
  ctaDesc: string;
};

const COPY: L4<Copy> = {
  ko: {
    eyebrow: "Grand Hitek · 通嘉科技 — 한국 총판 OHI Tech",
    title: "드라이 진공 펌프",
    lead:
      "Grand Hitek(通嘉科技, 北京通嘉宏瑞科技股份有限公司)은 2012년 중국 베이징에서 설립된 진공 장비 기업입니다. 드라이 진공 펌프와 시스템 통합 솔루션을 중심으로 R&D·생산·서비스를 일원화하고, 독자적인 PPACS® 제품 컨셉으로 드라이 펌프 전 라인업과 정밀 핵심 부품을 자체 개발합니다. 제품은 반도체·태양광·2차전지·디스플레이·LED·산업용 진공 등에 폭넓게 쓰이며, 진공 코팅·식각·이온주입 같은 웨이퍼급 고급 공정에도 대응합니다. OHI Tech는 Grand Hitek의 한국 총판으로서 공정 조건에 맞는 모델 선정과 견적을 지원합니다.",
    badge: "한국 총판",
    ctaInquiry: "제품 문의하기",
    ctaQuote: "견적 요청",
    nav: {
      industries: "적용 산업",
      "dry-pumps": "드라이 펌프",
      selection: "공정별 선정",
      systems: "통합 시스템",
      molecular: "분자 펌프",
      services: "서비스",
      references: "반도체 실적",
      energy: "에너지 절감",
      technology: "기술",
      catalog: "카탈로그",
      certifications: "인증·자격",
      company: "회사 소개",
      faq: "FAQ",
    },
    stats: [
      { value: "2012", label: "설립 · 중국 베이징" },
      { value: "600+", label: "임직원" },
      { value: "60,000㎡+", label: "총 공장 면적" },
      { value: "220+", label: "누적 등록 특허 (2015년~)" },
      { value: "30,000+", label: "누적 출하 대수 (2024, 반도체 2,000+)" },
      { value: "15%", label: "중국 본토 반도체 점유율 (2025)" },
    ],

    indTitle: "적용 산업",
    indSub: "Grand Hitek 드라이 진공 펌프는 반도체뿐 아니라 디스플레이·태양광·2차전지·LED·산업용 진공에도 쓰입니다.",
    indLbl: {"processes": "적용 공정", "recommended": "권장 시리즈", "more": "자세히"},
    ind: {
          "semi": {
                "name": "반도체",
                "share": "중국 본토 점유율 15% (2025)",
                "processes": [
                      "MOCVD",
                      "PECVD",
                      "LPCVD",
                      "SACVD",
                      "ALD",
                      "Etch",
                      "HDP",
                      "Coater",
                      "EPI"
                ],
                "rows": [
                      {
                            "label": "GLR",
                            "text": "Load Lock · Transfer · PVD · Coater"
                      },
                      {
                            "label": "GMR",
                            "text": "IMP Source · Strip/Ashing · Oxide/Poly Etch · Metal Etch(6·8인치 팹) · HDP"
                      },
                      {
                            "label": "GHC",
                            "text": "ALD · PECVD · LPCVD · SACVD · MOCVD · Metal Etch"
                      },
                      {
                            "label": "GHR",
                            "text": "MOCVD · Si EPI · SiC EPI · HJT (고유량 H₂)"
                      }
                ],
                "note": "공정별 과제(응축·부식·분진·열반응·가연성 가스)는 아래 «공정별 권장 시리즈» 표를 참고하세요."
          },
          "display": {
                "name": "디스플레이 (FPD)",
                "share": "중국 내 점유율 65%+ (2024)",
                "processes": [
                      "PVD",
                      "PECVD",
                      "Etch",
                      "LL/TC",
                      "증착(Evaporation)",
                      "Lami 합착",
                      "PHOTO"
                ],
                "rows": [
                      {
                            "label": "GHC",
                            "text": "PECVD SiN · SiON · SiO₂ · Metal Etch · Non-Metal Etch — 응축·부식·분진·가연성 가스"
                      },
                      {
                            "label": "GLR",
                            "text": "PVD · LL/TC · 증착 · Lami 합착 — 잦은 펌핑(Frequent pumping)"
                      },
                      {
                            "label": "GLR-P",
                            "text": "Coater PHOTO — 응축"
                      }
                ],
                "note": "디스플레이 Dry Etch 장비용 Y2O3 코팅·부품 정밀 세정·실링(6G·8.5G·10.5G)도 공급합니다."
          },
          "solar": {
                "name": "태양광 (PV)",
                "share": "태양광 셀 점유율 50%+ (2023)",
                "processes": [
                      "잉곳 성장(Crystal Pulling)",
                      "PECVD",
                      "LPCVD",
                      "ALD",
                      "라미네이션"
                ],
                "rows": [
                      {
                            "label": "GS-S",
                            "text": "잉곳 성장 — 분진"
                      },
                      {
                            "label": "GS",
                            "text": "셀 PECVD · LPCVD — 분진 / 셀 ALD — 열분해·분진"
                      },
                      {
                            "label": "GLR-P",
                            "text": "모듈 라미네이션 — 응축"
                      },
                      {
                            "label": "GHR",
                            "text": "HJT (고유량 H₂)"
                      }
                ],
                "note": "GS 시리즈는 클린·일반·가혹 공정에 쓰이며 신뢰성이 높고 운전 비용이 매우 낮습니다."
          },
          "battery": {
                "name": "2차전지 (리튬이온)",
                "processes": [
                      "슬러리 혼합",
                      "탈기",
                      "진공 건조",
                      "적층",
                      "조립",
                      "전해액 주입",
                      "EOL 검사"
                ],
                "rows": [
                      {
                            "label": "GLR",
                            "text": "GLR 전 라인업이 2차전지 생산 공정에 적용됩니다."
                      },
                      {
                            "label": "① 극판 제조",
                            "text": "교반* · 코팅 · 건조 · 압연 · 절단 · 진공 건조* — 분진·수분·용매 내성"
                      },
                      {
                            "label": "② 셀 조립",
                            "text": "페어링 · 적층 · 용접/패킹/조립* · 전해액 주입 — 분진·용매 내성"
                      },
                      {
                            "label": "③ 후공정",
                            "text": "화성 · 탈기* · 에이징 · EOL 검사* — 분진·수분·용매 내성"
                      }
                ],
                "note": "* 진공을 쓰는 공정"
          },
          "led": {
                "name": "LED · 기타 산업",
                "processes": [],
                "rows": [
                      {
                            "label": "GLR",
                            "text": "FPD·LED 등 다양한 시장에 사용"
                      },
                      {
                            "label": "GHR",
                            "text": "MOCVD 등 고유량 H₂ 공정 — 반도체·LED·태양광"
                      },
                      {
                            "label": "GTP 분자 펌프",
                            "text": "광학 코팅 · 진공로 · 진공 소결 · 환경 시뮬레이션 · 과학기기(질량분석·전자현미경·리크 검사) · ITO 유리 · LCD"
                      }
                ],
                "note": "제품은 산업용 진공 분야에도 쓰입니다."
          }
    },

    indFilter: {
      label: "산업별 보기",
      all: "전체",
      tabs: {"semi": "반도체", "display": "디스플레이", "solar": "태양광", "battery": "2차전지", "led": "LED·기타"},
      count: (n) => `${n}개 시리즈`,
      procLabel: (name) => `${name} 적용 공정`,
    },
    indSeries: {
          "semi": {
                "glr": [
                      "Load Lock",
                      "Transfer",
                      "PVD",
                      "Coater"
                ],
                "gmr": [
                      "IMP Source",
                      "Strip/Ashing",
                      "Oxide Etch",
                      "Poly Etch",
                      "Metal Etch (6·8인치 팹)",
                      "HDP"
                ],
                "ghc": [
                      "ALD",
                      "PECVD",
                      "LPCVD",
                      "SACVD",
                      "MOCVD",
                      "Metal Etch"
                ],
                "ghr": [
                      "MOCVD",
                      "Si EPI",
                      "SiC EPI",
                      "HJT (고유량 H₂)"
                ]
          },
          "display": {
                "glr": [
                      "PVD",
                      "LL/TC",
                      "증착(Evaporation)",
                      "Lami 합착",
                      "Coater PHOTO (GLR-P)"
                ],
                "ghc": [
                      "PECVD SiN",
                      "PECVD SiON",
                      "PECVD SiO₂",
                      "Metal Etch",
                      "Non-Metal Etch"
                ]
          },
          "solar": {
                "glr": [
                      "모듈 라미네이션 (GLR-P)"
                ],
                "gs": [
                      "잉곳 성장 (GS-S)",
                      "셀 PECVD",
                      "셀 LPCVD",
                      "셀 ALD"
                ],
                "ghr": [
                      "HJT (고유량 H₂)"
                ]
          },
          "battery": {
                "glr": [
                      "슬러리 혼합",
                      "탈기",
                      "진공 건조",
                      "적층",
                      "조립",
                      "전해액 주입",
                      "EOL 검사"
                ]
          },
          "led": {
                "glr": [
                      "FPD·LED 등 다양한 시장"
                ],
                "ghr": [
                      "고유량 H₂ 공정(MOCVD 등) — 반도체·LED·태양광"
                ]
          }
    },
    dryTitle: "드라이 진공 펌프",
    drySub: "아래 버튼으로 산업별로 쓰이는 시리즈와 적용 공정을 볼 수 있습니다.",
    lbl: { mech: "구조", speed: "최대 배기속도", models: "모델", grade: "적용 공정", best: "권장 공정 (반도체)", markets: "주요 산업", options: "사양 옵션" },
    mech: { roots: "다단 루츠 (Multistage Roots)", claw: "일체형 클로 (Integrated Claw)" },
    grade: { clean: "클린", general: "일반", medium: "중간", harsh: "가혹" },
    seriesDesc: {
      glr: "클린·일반 공정용 다단 루츠 드라이 펌프입니다. 신뢰성이 높고 운전 비용이 매우 낮습니다.",
      gmr: "클린·일반 공정용 다단 루츠 드라이 펌프로, 주로 반도체 식각(Etch)·이온주입(IMP) 공정 챔버에 쓰입니다. 저전력·내부식·작은 설치 면적이 특징입니다.",
      ghc: "클린·일반·가혹 공정 모두에 쓰는 신형 일체형 클로 드라이 펌프입니다. 분진 처리 능력이 매우 강해 가혹 공정의 우선 선택지이며, 운전 비용이 매우 낮습니다.",
      gs: "클린·일반·가혹 공정에 쓰는 신형 일체형 클로 드라이 펌프입니다. 신뢰성이 높고 운전 비용이 매우 낮습니다.",
      ghr: "고유량 수소(H₂) 적용을 위해 개발된 다단 루츠 드라이 펌프입니다. 중간·가혹 공정용으로 배기 능력이 강하고 신뢰성이 높습니다.",
    },
    seriesMarkets: {
      glr: "반도체 · 디스플레이 · LED · 2차전지 · 태양광",
      gmr: "반도체 (식각 · 이온주입)",
      ghc: "반도체 · 디스플레이",
      gs: "태양광 등",
      ghr: "반도체 · LED · 태양광",
    },
    seriesOptions: { gmr: "N: 니켈합금 (부식성 공정)", ghc: "T: 고온 · Z: 초고온 · L: 저온" },
    glrP: "GLR-P 시리즈: GLR3000P · GLR5000 (3,380 – 4,500 m³/h)",
    gsBest: "태양광(PV) 공정 등",

    recLbl: {"process": "공정", "application": "적용 분야", "series": "권장", "note": "비고", "dot": "● = 해당 공정의 주요 과제"},
    ch: {"cond": "응축", "corr": "부식", "dust": "분진", "heat": "열반응", "comb": "가연성 가스", "h2": "고유량 H₂", "pyro": "열분해", "freq": "잦은 펌핑", "moist": "수분", "solv": "용매"},
    rec: {
          "display": {
                "cols": [
                      "cond",
                      "corr",
                      "dust",
                      "comb",
                      "freq"
                ],
                "rows": [
                      {
                            "process": "PECVD SiN",
                            "series": "GHC",
                            "marks": [
                                  "cond",
                                  "corr",
                                  "comb"
                            ]
                      },
                      {
                            "process": "PECVD SiON",
                            "series": "GHC",
                            "marks": [
                                  "cond",
                                  "corr",
                                  "dust",
                                  "comb"
                            ]
                      },
                      {
                            "process": "PECVD SiO₂",
                            "series": "GHC",
                            "marks": [
                                  "corr",
                                  "dust",
                                  "comb"
                            ]
                      },
                      {
                            "process": "Metal Etch",
                            "series": "GHC",
                            "marks": [
                                  "cond",
                                  "corr"
                            ]
                      },
                      {
                            "process": "Non-Metal Etch",
                            "series": "GHC",
                            "marks": [
                                  "corr"
                            ]
                      },
                      {
                            "process": "PVD",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "LL/TC",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "증착(Evaporation)",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "Lami 합착",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "Coater PHOTO",
                            "series": "GLR-P",
                            "marks": [
                                  "cond"
                            ]
                      }
                ]
          },
          "solar": {
                "cols": [
                      "cond",
                      "pyro",
                      "dust",
                      "h2"
                ],
                "rows": [
                      {
                            "process": "잉곳 성장",
                            "series": "GS-S",
                            "marks": [
                                  "dust"
                            ]
                      },
                      {
                            "process": "셀 PECVD",
                            "series": "GS",
                            "marks": [
                                  "dust"
                            ]
                      },
                      {
                            "process": "셀 ALD",
                            "series": "GS",
                            "marks": [
                                  "pyro",
                                  "dust"
                            ]
                      },
                      {
                            "process": "셀 LPCVD",
                            "series": "GS",
                            "marks": [
                                  "dust"
                            ]
                      },
                      {
                            "process": "모듈 라미네이션",
                            "series": "GLR-P",
                            "marks": [
                                  "cond"
                            ]
                      },
                      {
                            "process": "HJT",
                            "series": "GHR",
                            "marks": [
                                  "h2"
                            ]
                      }
                ]
          },
          "battery": {
                "cols": [
                      "dust",
                      "moist",
                      "solv"
                ],
                "rows": [
                      {
                            "process": "슬러리 혼합*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "① 극판 제조"
                      },
                      {
                            "process": "진공 건조*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "① 극판 제조"
                      },
                      {
                            "process": "적층",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "solv"
                            ],
                            "note": "② 셀 조립"
                      },
                      {
                            "process": "조립*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "solv"
                            ],
                            "note": "② 셀 조립"
                      },
                      {
                            "process": "전해액 주입",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "solv"
                            ],
                            "note": "② 셀 조립"
                      },
                      {
                            "process": "탈기*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "③ 후공정"
                      },
                      {
                            "process": "EOL 검사*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "③ 후공정"
                      }
                ]
          },
          "led": {
                "application": true,
                "cols": [],
                "rows": [
                      {
                            "process": "LED",
                            "series": "GLR",
                            "note": "FPD·LED 등 다양한 시장"
                      },
                      {
                            "process": "MOCVD (고유량 H₂)",
                            "series": "GHR",
                            "note": "반도체·LED·태양광"
                      },
                      {
                            "process": "식각·금속 증착·실리콘 에피·PVD·CVD·SiC 결정 성장 장비",
                            "series": "GTP-M",
                            "note": "자기부상 분자 펌프"
                      },
                      {
                            "process": "태양광 제조·ITO 유리·LCD·환경 시뮬레이션",
                            "series": "GTP-G1400 · G2400",
                            "note": "그리스 윤활 분자 펌프, 임의 각도 설치"
                      },
                      {
                            "process": "범반도체 장비·광학 코팅·경질 코팅",
                            "series": "GTP-G800",
                            "note": "그리스 윤활 분자 펌프"
                      },
                      {
                            "process": "광학 코팅·진공로·진공 소결·환경 시뮬레이션",
                            "series": "GTP-L4400",
                            "note": "분진 함유 가스 배기 가능"
                      },
                      {
                            "process": "과학기기·리크 디텍터·질량분석·주사전자현미경",
                            "series": "GTP-G300",
                            "note": "저진동·저소음"
                      },
                      {
                            "process": "질량분석·미량 원소 분석·전자현미경",
                            "series": "GTP-H80",
                            "note": "계측기용 소형 분자 펌프"
                      },
                      {
                            "process": "리크 검사·환경 모니터링·과학 분석",
                            "series": "GTP-H80D",
                            "note": "다중 흡기구 분류형"
                      }
                ]
          }
    },
    selTitle: "공정별 권장 시리즈",
    selSub: "산업을 고르면 해당 분야의 공정별 권장 시리즈가 표시됩니다.",
    selCols: ["공정", "권장", "응축", "부식", "분진", "열반응", "가연성 가스", "고유량 H₂"],
    selNote: "GMR의 Metal Etch 권장은 6·8인치 팹용입니다.",
    etchTitle: "반도체 ETCH 계열 추천 모델",
    etchCols: ["공정", "부산물 · 과제", "대응", "추천 모델"],
    etchRows: [
      { process: "Oxide Etch", issue: "경·중 폴리머", solution: "저위험", model: "GMR600/1200" },
      { process: "Poly Etch", issue: "중·고 폴리머, 부식성 가스", solution: "온도 제어 + 니켈합금 소재", model: "GMR600/1200 (N)" },
      { process: "Metal Etch", issue: "AlCl₃ 응축", solution: "중온 운전 · 응축 방지", model: "GMR600/1200/1800" },
      { process: "HDP-CVD", issue: "부식", solution: "저온 운전 · 내부식", model: "GMR1200/1800 (N)" },
      { process: "Strip/Ashing", issue: "중 폴리머", solution: "중온 운전 · 응축 방지", model: "GMR1800" },
      { process: "IMP", issue: "중 폴리머", solution: "중온 운전 · 응축 방지", model: "GMR200" },
    ],

    sysTitle: "통합 진공 시스템",
    sysSub: "펌프·부스터·배기가스 처리 장치 등을 하나로 묶은 통합 시스템(一体机) 5종입니다.",
    sysDesc: {
      mizar: "기계식 부스터–기계식 부스터–드라이 펌프 구조의 적층형 통합 펌프 시스템. 클린·일반·가혹 공정에 쓰이며 신뢰성이 높고 운전 비용이 낮습니다.",
      megrez: "WN과 HARP·PE-TEOS 등 SiO₂ 분진이 많은 공정용 플라즈마 통합 시스템. 플라즈마 발생기와 진공 펌프를 하나로 묶어 드라이 펌프 수명을 안전하게 늘립니다.",
      merak: "진공 펌프·칠러 등을 모듈 단위로 넣고 빼는 2단(Dual-Deck) 다중 펌프 시스템. 반도체 Etch·PVD 등에서 훅업 비용과 Facility 연결점을 줄이고 설치 시간을 단축합니다.",
      alioth: "진공 펌프와 배기가스 처리(Abatement)를 통합한 다중 펌프 시스템. 공정 안전성과 운전 안정성을 높이고 TCO·훅업 비용·설치 면적·설치 시간을 줄입니다.",
      phecda: "Diffusion·EPI·MOCVD 등을 위한 단일 펌프 통합 시스템(드라이 펌프 + 배기가스 처리). 안전·신뢰성·안정 운전·예지 보전·작은 설치 면적이 특징입니다.",
    },
    aliothFigures: "훅업 비용 70%↓ · Facility 연결점 85%↓ · 설치 면적 20%↓ · 설치 시간 80%↓ · SEMI S2/S6/F47 인증",

    molTitle: "분자 펌프 (GTP 시리즈)",
    molSub: "표시된 배기속도는 N₂ 값입니다.",
    mol: {
      "gtp-m": { title: "자기부상 분자 펌프 GTP-M", desc: "비접촉·무마찰·무윤활·무보수 자기 베어링과 5자유도 능동 제어로 어느 방향으로든 설치할 수 있습니다. 식각기·금속 증착·실리콘 에피·PVD·CVD·SiC 결정 성장 장비에 쓰입니다." },
      "gtp-g": { title: "그리스 윤활 분자 펌프 GTP-G · L", desc: "장수명·에너지 절감형 분자 펌프(G 시리즈는 임의 각도 설치). 태양광·ITO 유리·LCD·광학/경질 코팅·진공로·과학기기 등에 쓰입니다." },
      "gtp-h": { title: "계측기용 분자 펌프 GTP-H80 · H80D", desc: "질량분석기 등 고급 계측기용 소형 고진공 펌프입니다. H80D는 흡기구가 여러 개인 분류형으로, 한 대로 2~3대 효과를 내며 리크 디텍터 등에 쓰입니다." },
    },
    molPower: "분자 펌프 전용 전원(IGBT 기반 CNC 전원)도 공급합니다.",

    svcTitle: "서비스 · 부품",
    svcSub: "국내 제공 범위는 문의 시 안내해 드립니다.",
    svc: [
      { title: "진공 펌프 유지보수 (O&M)", desc: "주요 브랜드 드라이 진공 펌프의 고장 진단, 오버홀·재제조, 예방 정비, 현장 서비스. 표준화된 공정과 품질 보증 기간, 예비 부품 창고로 정지 시간을 줄입니다." },
      { title: "Y2O3 코팅", desc: "반도체·디스플레이 Dry Etch 장비 부품의 표면 코팅. 내식각·내마모성으로 부품 수명을 늘리고 교체 비용을 줄입니다." },
      { title: "부품 정밀 세정", desc: "반도체 부품의 표면 파티클과 거칠기를 정밀 관리하고, 디스플레이 PVD 챔버 부품의 세정·운영 서비스를 제공합니다." },
      { title: "실링 (밀봉링)", desc: "6G·8.5G·10.5G Dry Etch 장비(APC 밸브·ICD·TEL·YAC)용 FFKM 실링과 진공 펌프용 VITON·FKM·FFKM 실링." },
    ],

    refTitle: "반도체 고객 레퍼런스",
    refSub: "중국 주요 반도체 고객사로부터 재주문을 받았으며, 현지 장비사(OEM)와 협업하고 있습니다.",
    refCols: ["고객사", "공정", "공급 대수", "최장 가동시간"],
    refMaskNote: "일부 고객사명은 마스킹(SXX, S**C 등)해 표기했습니다.",
    ibTitle: "중국 반도체 팹 설치 실적",
    ibSub: "고객사·모듈별 적용 모델과 현재까지 최장 가동시간입니다.",
    ibCols: ["모듈", "적용 모델", "최장 가동(h)", "대수"],
    units: "대",

    energyTitle: "GMR 시리즈 에너지 절감",
    energySub: "비교 대상 대비 소비전력 최대 50% 절감",
    powerTitle: "소비전력 (kW)",
    costTitle: "5년 유틸리티 비용 (원, 2026.10 환율 환산)",
    cls: (n) => `${n}급`,
    powerHighlights: ["GMR600 vs SGM600A: −50% (−0.8 kW)", "GMR1200 vs SGM1200A: −44% (−0.8 kW)"],
    costHighlights: ["GMR600 vs SGM600A: −50% ({a:52000000})", "GMR1200 vs SGM1200A: −49% ({a:70000000})"],
    conditions:
      "산출 조건: 12인치 웨이퍼 10만 장 생산능력 팹에서 600급·1200급 중부하(Medium) 펌프 각 1,000대를 5년간 운전, 전력+PCW+N₂ 비용 합산. 전력 {u:1}/kWh, N₂ {u:0.25}/m³, PCW {u:0.5}/m³.",
    energySource: "실제 절감 효과는 공정·운전 조건에 따라 다릅니다.",

    techTitle: "제품 특징",
    techSub: "일관성과 안정성을 위한 하드웨어 · 소프트웨어 설계",
    techItems: [
      { title: "일체형 스테이터-로터 설계", desc: "구조가 단순하고 조립이 쉬우며, 기계적 안정성이 매우 높고 온도 제어가 간단합니다.", img: STATOR_IMG },
      { title: "영구자석 동기모터 (PMSM)", desc: "기존 모터보다 에너지 효율이 높고 저탄소이며 토크가 큽니다. 유도전류가 발생하지 않습니다.", img: PMSM_IMG },
      { title: "표준 산업용 인버터", desc: "호환성이 넓고 운전 안정성이 높습니다." },
      { title: "넓은 온도 제어 범위", desc: "복잡한 공정 난제에 대응합니다." },
      { title: "지능형 제어 시스템", desc: "HMI(사용자 인터페이스) · CMS 시스템 · 실시간 파라미터" },
    ],
    challengeTitle: "반도체 드라이 펌프의 과제",
    challenges: [
      { title: "하드웨어 비용", items: ["CAPEX", "설치 면적(Footprint)", "훅업(Hookup)"] },
      { title: "운영 비용", items: ["비계획 정지", "웨이퍼 손실(Scrap)", "분진 역류", "운전 비용"] },
      { title: "안전사고 비용", items: ["설비 일부·전체 대피", "폭발 등 안전사고"] },
    ],
    keyChallengesLabel: "핵심 과제",
    keyChallenges: ["장비 안전성 · 신뢰성 극대화", "공정 적용 안정성", "높은 제품 일관성"],
    appTitle: "공정 난제별 대응 방안",
    appCols: ["난제", "대표 공정", "대응 방안"],
    appRows: [
      { challenge: "잔류 공정가스·부산물(기체) 응축", process: "Metal Etch; LPCVD Nitride; Coater", solution: "펌프 온도 상향 / 히팅 재킷 / N₂ 유량 증가" },
      { challenge: "부산물(고체) 퇴적", process: "PECVD Oxide; HARP; MOCVD", solution: "충분한 N₂ 퍼지 유지 / 파우더 트랩 / 플라즈마 트랩" },
      { challenge: "잔류 공정가스·부산물(기체) 열분해", process: "PEALD; WCVD", solution: "펌프 내부 가스 온도 하향 / 핫 트랩" },
      { challenge: "미반응 가스의 펌프 내부 화학반응", process: "WN; HARP", solution: "다이버트 펌프 추가 / 반응가스 1종 사전 제거 / 레시피 타이밍 조정 / 펌프 내부 가스 온도 하향" },
      { challenge: "부식성 가스와 펌프 본체 반응(FeF₃ 생성)", process: "HDP; Poly Etch", solution: "펌프 본체 온도 하향 / 니켈합금 / 내부식 코팅 / N₂ 유량 증가(부식성 가스 농도 저감)" },
    ],
    paramNotes: ["공정 난제에 따라 서로 다른 펌프 기계 설계가 필요합니다.", "펌프 온도 제어가 핵심 요소입니다.", "공정별로 질소(N₂) 퍼지 설정을 달리해야 합니다."],
    conceptTitle: "PPACS® 제품 컨셉",
    conceptLead: "더 나은 성능 · 더 낮은 에너지 · 더 작은 설치 면적 · 더 낮은 비용 · 더 안전한 운전",
    concepts: [
      { title: "Performance Enhanced", desc: "안정성 · 신뢰성 · 일관성" },
      { title: "Power Optimized", desc: "2030년까지 진공 시스템 에너지 소비 30~50% 절감" },
      { title: "Area Compacted", desc: "2030년까지 진공 시스템 설치 면적 30~50% 축소" },
      { title: "Cost Reduced", desc: "2030년까지 진공 시스템 총소유비용(TCO) 30~50% 절감" },
      { title: "Safety Assured", desc: "다단계 안전 시스템 보호, 진공 시스템 운전 중 안전사고 제로" },
    ],

    namingTitle: "모델명 읽는 법",
    namingSlots: [
      { label: "적용 공정", values: ["H: Harsh / H₂", "M: Medium", "L: Light"] },
      { label: "구조", values: ["C: 클로(Claw)", "R: 루츠(Roots)", "S: 스크류(Screw)"] },
      { label: "배기속도 등급", values: ["120 · 200 · 500 m³/h", "600 · 1,200 · 1,800 m³/h", "3,000 · 4,500 · 6,000 · 7,000 m³/h"] },
      { label: "온도 사양", values: ["T: 고온", "Z: 초고온", "L: 저온", "(없음): 표준"] },
      { label: "내식 사양", values: ["N: 니켈합금", "C: 코팅", "(없음): 구상흑연주철(SG Iron)"] },
    ],
    namingExample: "예) GHC1800T = Harsh 공정 · 클로 구조 · 1,800 m³/h급 · 고온 사양 · 구상흑연주철",
    catalogTitle: "반도체 공정용 모델 카탈로그",
    catalogSub: "속도 등급별 모델과 타사 대응 모델(참고)입니다.",
    catCols: ["적용", "시리즈", "구조", "속도 등급 (m³/h)", "Grand Hitek 모델", "Edxx 대응", "Ebxx 대응"],
    catNote: "7,000 m³/h는 GHC3000T와 부스터 GMB6000을 조합한 펌프 세트입니다.",
    pumpSet: "GHC (펌프 세트)",

    certTitle: "인증 · 자격",
    certGroups: { semi: "SEMI 인증", naeu: "북미 · EU 인증", system: "시스템 인증" },
    honorsTitle: "기업 자격 · 특허",
    honors: [
      "국가급 전정특신(专精特新) '작은 거인(小巨人)' 기업 — 유효 2024.07 ~ 2027.06",
      "고신기술기업(高新技术企业) — GR202311004449, 2023.11",
      "베이징시 전정특신 중소기업 — 2024ZJTX1752, 2024.10 ~ 2027.10",
      "베이징시 신기술·신제품 — XCP2023IC0015, 진공 펌프 GS1800-1800C, 2023.12",
      "발명 특허 ZL 2023 1 0292694.X · ZL 2023 1 0338837.6 등, 누적 등록 특허 220건 이상 (2015년~)",
    ],

    companyTitle: "회사 소개",
    companyLead: "北京通嘉宏瑞科技股份有限公司 (通嘉科技 / Grand Hitek) — 베이징 이좡 본사. 드라이 진공 펌프 장비·시스템 기술 서비스 공급사로, 반도체·태양광·디스플레이·LED 조명·2차전지 등 산업에 공급합니다.",
    historyTitle: "연혁",
    history: [
      { year: "2026", items: ["베이징·우한·항저우 3곳 부지 확보·증설", "일본·싱가포르 자회사 설립"] },
      { year: "2025", items: ["중국 본토 반도체 점유율 15%로 상승", "통합 시스템(一体机)·GHR 시리즈 출시", "반도체 전 공정 커버", "시리즈 B+ 투자 완료", "해외 시장 첫 진출"] },
      { year: "2024", items: ["GLR 시리즈 개발·검증", "누적 출하 30,000대+ (반도체 2,000대+)", "디스플레이 분야 중국 내 점유율 65% 초과"] },
      { year: "2023", items: ["GS·GMR 등 시리즈 잇따라 출시 (태양광·반도체 공정)", "태양광 셀 분야 점유율 50% 돌파", "베이징 이좡 기지 증설·가동, 월 2,000대 안정 생산"] },
      { year: "2022", items: ["GS 시리즈 개발·검증", "신규 펌프 생산능력 월 300대 달성"] },
      { year: "2021", items: ["시리즈 A 투자 완료", "반도체 시장 정식 진입"] },
      { year: "2020", items: ["소량 검증 통과"] },
      { year: "2019", items: ["GHC 시리즈 검증 통과·소량 출하", "화동 지역 부품 재생·진공 펌프 유지보수 사업 가속"] },
      { year: "2018", items: ["소프트웨어 저작권 다수 취득", "DP 제어 시스템 개발", "GHC 시리즈 고객사 데모"] },
      { year: "2017", items: ["GHC·MB 시리즈 개발", "디스플레이·반도체 가혹 공정 진입"] },
      { year: "2016", items: ["우시(无锡) 생산기지 설립", "화중 지역 진공 펌프 유지보수 사업 확대", "DP 고객사 공정 데모 시작"] },
      { year: "2015", items: ["핵심 부품 개발 성공, 자체 개발 시작"] },
      { year: "2012", items: ["회사 설립, 무역 사업과 브랜드 진공 펌프 유지보수 서비스 시작"] },
    ],
    basesTitle: "생산 · R&D · 서비스 거점",
    basesSummary: "중국 본토와 일본·싱가포르에 4대 생산기지·4대 R&D 기지·7대 운영·서비스 센터를 두고 있으며, 총 공장 면적은 60,000㎡ 이상입니다.",
    basesCols: ["지역", "역할", "상태"],
    bases: [
      { loc: "베이징 (본사, 이좡)", role: "경영 본부(신규 캠퍼스 건설 중) · R&D 본부 · 판매 플랫폼 · 신규 펌프·스크러버·칠러 생산 · 펌프 오버홀", status: "운영", building: false },
      { loc: "허베이 랑팡", role: "생산 · 부품 세정", status: "운영", building: false },
      { loc: "상하이 민항", role: "통합 장비(一体机) R&D·생산 · 브랜드 펌프 오버홀", status: "운영", building: false },
      { loc: "산시 시안", role: "분자 펌프 R&D · 오버홀", status: "운영", building: false },
      { loc: "일본", role: "기술센터 (2026 자회사 설립)", status: "운영", building: false },
      { loc: "싱가포르", role: "펌프 오버홀 · 판매 플랫폼, 싱가포르·말레이시아 대상 (2026 자회사 설립)", status: "운영", building: false },
      { loc: "저장 항저우", role: "신규 펌프 생산", status: "건설 중", building: true },
      { loc: "후베이 우한", role: "펌프 오버홀 · 생산", status: "건설 중", building: true },
      { loc: "쓰촨 청두", role: "펌프 오버홀", status: "건설 중", building: true },
    ],
    rdTitle: "R&D 역량",
    rdItems: [
      { title: "R&D 인력", points: ["R&D 인력 100명 이상 (전체 인력의 16%)", "박사 · 부교수급 4명", "깊은 산업 배경과 개발 경험"] },
      { title: "3대 R&D 거점", points: ["베이징 — 드라이 펌프", "상하이 — 통합 장비", "시안 — 분자 펌프"] },
      { title: "기술 플랫폼", points: ["진공 원리 기반 합리적 설계", "시험 기술 플랫폼", "시뮬레이션 플랫폼", "배기속도 시뮬레이션"] },
      { title: "IPD 통합 제품 개발", points: ["시장 수요 기반 혁신", "명확한 제품 로드맵", "안정적인 제품 성능 확보", "개발 주기 단축 · 출시 가속"] },
      { title: "4-in-1 R&D 체계", points: ["자체 독립 R&D", "대학 공동 연구", "정밀 디지털 지능형 가공", "전문 시험 · 분석"] },
    ],

    faqTitle: "자주 묻는 질문",
    ctaTitle: "Grand Hitek 진공 펌프 도입 문의",
    ctaDesc: "적용 공정, 필요 배기속도, 공정 가스 조건을 알려주시면 OHI Tech가 맞는 모델 선정과 견적을 도와드립니다.",
  },

  en: {
    eyebrow: "Grand Hitek · 通嘉科技 — Master Distributor for Korea: OHI Tech",
    title: "Dry Vacuum Pumps",
    lead:
      "Grand Hitek (通嘉科技, Beijing Grand Hitek Co., Ltd.) is a vacuum equipment company founded in 2012 in Beijing, China. Focused on dry vacuum pumps and system integration, it combines R&D, production and service, and develops its full dry pump range and precision core parts in-house under its PPACS® product concept. Its products are widely used in semiconductor, solar PV, lithium battery, advanced display, LED and industrial vacuum applications, including wafer-level processes such as vacuum coating, etching and ion implantation. As Grand Hitek's Master Distributor for Korea, OHI Tech helps you select the right model for your process and prepares quotations.",
    badge: "Master Distributor for Korea",
    ctaInquiry: "Inquire Now",
    ctaQuote: "Request a Quote",
    nav: {
      industries: "Industries",
      "dry-pumps": "Dry pumps",
      selection: "Selection",
      systems: "Integrated systems",
      molecular: "Molecular pumps",
      services: "Services",
      references: "References",
      energy: "Energy savings",
      technology: "Technology",
      catalog: "Catalog",
      certifications: "Certifications",
      company: "Company",
      faq: "FAQ",
    },
    stats: [
      { value: "2012", label: "Founded · Beijing, China" },
      { value: "600+", label: "Employees" },
      { value: "60,000㎡+", label: "Total factory area" },
      { value: "220+", label: "Authorized patents (since 2015)" },
      { value: "30,000+", label: "Units shipped (2024; 2,000+ for semiconductor)" },
      { value: "15%", label: "Semiconductor share, mainland China (2025)" },
    ],

    indTitle: "Industries & Applications",
    indSub: "Grand Hitek dry vacuum pumps serve not only semiconductor fabs but also display, solar PV, lithium battery, LED and industrial vacuum applications.",
    indLbl: {"processes": "Processes", "recommended": "Recommended series", "more": "More"},
    ind: {
          "semi": {
                "name": "Semiconductor",
                "share": "15% share in mainland China (2025)",
                "processes": [
                      "MOCVD",
                      "PECVD",
                      "LPCVD",
                      "SACVD",
                      "ALD",
                      "Etch",
                      "HDP",
                      "Coater",
                      "EPI"
                ],
                "rows": [
                      {
                            "label": "GLR",
                            "text": "Load lock · transfer · PVD · coater"
                      },
                      {
                            "label": "GMR",
                            "text": "IMP source · strip/ashing · oxide/poly etch · metal etch (6/8-inch fabs) · HDP"
                      },
                      {
                            "label": "GHC",
                            "text": "ALD · PECVD · LPCVD · SACVD · MOCVD · metal etch"
                      },
                      {
                            "label": "GHR",
                            "text": "MOCVD · Si EPI · SiC EPI · HJT (high-flow H₂)"
                      }
                ],
                "note": "See «Recommended Series by Process» below for process challenges (condensation, corrosion, dust, thermal reaction, combustible gas)."
          },
          "display": {
                "name": "Display (FPD)",
                "share": "65%+ domestic share in China (2024)",
                "processes": [
                      "PVD",
                      "PECVD",
                      "Etch",
                      "LL/TC",
                      "Evaporation",
                      "Lami bonding",
                      "PHOTO"
                ],
                "rows": [
                      {
                            "label": "GHC",
                            "text": "PECVD SiN · SiON · SiO₂ · metal etch · non-metal etch — condensation, corrosion, dust, combustible gas"
                      },
                      {
                            "label": "GLR",
                            "text": "PVD · LL/TC · evaporation · Lami bonding — frequent pumping"
                      },
                      {
                            "label": "GLR-P",
                            "text": "Coater PHOTO — condensation"
                      }
                ],
                "note": "Y2O3 coating, precision parts cleaning and seals for 6G/8.5G/10.5G display dry etch equipment are also available."
          },
          "solar": {
                "name": "Solar PV",
                "share": "50%+ share in PV cells (2023)",
                "processes": [
                      "Crystal pulling",
                      "PECVD",
                      "LPCVD",
                      "ALD",
                      "Lamination"
                ],
                "rows": [
                      {
                            "label": "GS-S",
                            "text": "Crystal pulling — dust"
                      },
                      {
                            "label": "GS",
                            "text": "Cell PECVD · LPCVD — dust / cell ALD — pyrolysis, dust"
                      },
                      {
                            "label": "GLR-P",
                            "text": "Module lamination — condensation"
                      },
                      {
                            "label": "GHR",
                            "text": "HJT (high-flow H₂)"
                      }
                ],
                "note": "The GS series serves clean, general and harsh processes with high reliability and extremely low operating cost."
          },
          "battery": {
                "name": "Lithium-ion Battery",
                "processes": [
                      "Slurry mixing",
                      "Degassing",
                      "Vacuum drying",
                      "Stacking",
                      "Assembly",
                      "Electrolyte filling",
                      "EOL testing"
                ],
                "rows": [
                      {
                            "label": "GLR",
                            "text": "The full GLR range suits lithium battery production processes."
                      },
                      {
                            "label": "① Electrodes",
                            "text": "Stirring* · coating · drying · rolling · cutting · vacuum drying* — resistant to dust, water vapor and solvents"
                      },
                      {
                            "label": "② Cell assembly",
                            "text": "Pairing · lamination · welding/packing/assembly* · electrolyte injection — resistant to dust and solvents"
                      },
                      {
                            "label": "③ Finishing",
                            "text": "Formation · degassing* · burn-in · EOL testing* — resistant to dust, water vapor and solvents"
                      }
                ],
                "note": "* Vacuum processes"
          },
          "led": {
                "name": "LED & Other Industries",
                "processes": [],
                "rows": [
                      {
                            "label": "GLR",
                            "text": "Used across FPD, LED and other markets"
                      },
                      {
                            "label": "GHR",
                            "text": "High-flow H₂ processes such as MOCVD — semiconductor, LED, solar PV"
                      },
                      {
                            "label": "GTP molecular",
                            "text": "Optical coating · vacuum furnaces · vacuum sintering · environmental simulation · scientific instruments (mass spectrometry, electron microscopes, leak detection) · ITO glass · LCD"
                      }
                ],
                "note": "Its products are also used in industrial vacuum applications."
          }
    },

    indFilter: {
      label: "View by industry",
      all: "All",
      tabs: {"semi": "Semiconductor", "display": "Display", "solar": "Solar PV", "battery": "Li-ion Battery", "led": "LED & Others"},
      count: (n) => `${n} series`,
      procLabel: (name) => `${name} processes`,
    },
    indSeries: {
          "semi": {
                "glr": [
                      "Load Lock",
                      "Transfer",
                      "PVD",
                      "Coater"
                ],
                "gmr": [
                      "IMP Source",
                      "Strip/Ashing",
                      "Oxide Etch",
                      "Poly Etch",
                      "Metal Etch (6/8-inch fabs)",
                      "HDP"
                ],
                "ghc": [
                      "ALD",
                      "PECVD",
                      "LPCVD",
                      "SACVD",
                      "MOCVD",
                      "Metal Etch"
                ],
                "ghr": [
                      "MOCVD",
                      "Si EPI",
                      "SiC EPI",
                      "HJT (high-flow H₂)"
                ]
          },
          "display": {
                "glr": [
                      "PVD",
                      "LL/TC",
                      "Evaporation",
                      "Lami bonding",
                      "Coater PHOTO (GLR-P)"
                ],
                "ghc": [
                      "PECVD SiN",
                      "PECVD SiON",
                      "PECVD SiO₂",
                      "Metal Etch",
                      "Non-Metal Etch"
                ]
          },
          "solar": {
                "glr": [
                      "Module lamination (GLR-P)"
                ],
                "gs": [
                      "Crystal pulling (GS-S)",
                      "Cell PECVD",
                      "Cell LPCVD",
                      "Cell ALD"
                ],
                "ghr": [
                      "HJT (high-flow H₂)"
                ]
          },
          "battery": {
                "glr": [
                      "Slurry mixing",
                      "Degassing",
                      "Vacuum drying",
                      "Stacking",
                      "Assembly",
                      "Electrolyte filling",
                      "EOL testing"
                ]
          },
          "led": {
                "glr": [
                      "FPD, LED and other markets"
                ],
                "ghr": [
                      "High-flow H₂ processes such as MOCVD — semiconductor, LED, solar PV"
                ]
          }
    },
    dryTitle: "Dry Vacuum Pumps",
    drySub: "Use the buttons below to see which series and processes apply to each industry.",
    lbl: { mech: "Mechanism", speed: "Max pumping speed", models: "Models", grade: "Process duty", best: "Recommended (semiconductor)", markets: "Industries", options: "Options" },
    mech: { roots: "Multistage Roots", claw: "Integrated Claw" },
    grade: { clean: "Clean", general: "General", medium: "Medium", harsh: "Harsh" },
    seriesDesc: {
      glr: "Multistage Roots dry pump for clean and general processes, with high reliability and extremely low operating cost.",
      gmr: "Multistage Roots dry pump for clean and general processes, mainly used in semiconductor etch and ion implantation chambers. Low energy consumption, corrosion resistance and a small footprint.",
      ghc: "New integrated claw dry pump for clean, general and harsh processes. Its strong dust handling makes it the first choice for harsh applications, at extremely low operating cost.",
      gs: "New integrated claw dry pump for clean, general and harsh processes, with high reliability and extremely low operating cost.",
      ghr: "Multistage Roots dry pump developed for high-flow hydrogen (H₂) applications in medium and harsh processes, with strong pumping capacity and high reliability.",
    },
    seriesMarkets: {
      glr: "Semiconductor · display · LED · lithium battery · solar PV",
      gmr: "Semiconductor (etch · ion implantation)",
      ghc: "Semiconductor · display",
      gs: "Solar PV and more",
      ghr: "Semiconductor · LED · solar PV",
    },
    seriesOptions: { gmr: "N: nickel alloy (corrosive processes)", ghc: "T: high temp · Z: ultra-high temp · L: low temp" },
    glrP: "GLR-P series: GLR3000P · GLR5000 (3,380 – 4,500 m³/h)",
    gsBest: "Solar PV processes and more",

    recLbl: {"process": "Process", "application": "Application", "series": "Series", "note": "Note", "dot": "● = key challenge of the process"},
    ch: {"cond": "Condensation", "corr": "Corrosion", "dust": "Dust", "heat": "Thermal reaction", "comb": "Combustible gas", "h2": "High-flow H₂", "pyro": "Pyrolysis", "freq": "Frequent pumping", "moist": "Water vapor", "solv": "Solvents"},
    rec: {
          "display": {
                "cols": [
                      "cond",
                      "corr",
                      "dust",
                      "comb",
                      "freq"
                ],
                "rows": [
                      {
                            "process": "PECVD SiN",
                            "series": "GHC",
                            "marks": [
                                  "cond",
                                  "corr",
                                  "comb"
                            ]
                      },
                      {
                            "process": "PECVD SiON",
                            "series": "GHC",
                            "marks": [
                                  "cond",
                                  "corr",
                                  "dust",
                                  "comb"
                            ]
                      },
                      {
                            "process": "PECVD SiO₂",
                            "series": "GHC",
                            "marks": [
                                  "corr",
                                  "dust",
                                  "comb"
                            ]
                      },
                      {
                            "process": "Metal Etch",
                            "series": "GHC",
                            "marks": [
                                  "cond",
                                  "corr"
                            ]
                      },
                      {
                            "process": "Non-Metal Etch",
                            "series": "GHC",
                            "marks": [
                                  "corr"
                            ]
                      },
                      {
                            "process": "PVD",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "LL/TC",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "Evaporation",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "Lami bonding",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "Coater PHOTO",
                            "series": "GLR-P",
                            "marks": [
                                  "cond"
                            ]
                      }
                ]
          },
          "solar": {
                "cols": [
                      "cond",
                      "pyro",
                      "dust",
                      "h2"
                ],
                "rows": [
                      {
                            "process": "Crystal pulling",
                            "series": "GS-S",
                            "marks": [
                                  "dust"
                            ]
                      },
                      {
                            "process": "Cell PECVD",
                            "series": "GS",
                            "marks": [
                                  "dust"
                            ]
                      },
                      {
                            "process": "Cell ALD",
                            "series": "GS",
                            "marks": [
                                  "pyro",
                                  "dust"
                            ]
                      },
                      {
                            "process": "Cell LPCVD",
                            "series": "GS",
                            "marks": [
                                  "dust"
                            ]
                      },
                      {
                            "process": "Module lamination",
                            "series": "GLR-P",
                            "marks": [
                                  "cond"
                            ]
                      },
                      {
                            "process": "HJT",
                            "series": "GHR",
                            "marks": [
                                  "h2"
                            ]
                      }
                ]
          },
          "battery": {
                "cols": [
                      "dust",
                      "moist",
                      "solv"
                ],
                "rows": [
                      {
                            "process": "Slurry mixing*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "① Electrodes"
                      },
                      {
                            "process": "Vacuum drying*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "① Electrodes"
                      },
                      {
                            "process": "Stacking",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "solv"
                            ],
                            "note": "② Cell assembly"
                      },
                      {
                            "process": "Assembly*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "solv"
                            ],
                            "note": "② Cell assembly"
                      },
                      {
                            "process": "Electrolyte filling",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "solv"
                            ],
                            "note": "② Cell assembly"
                      },
                      {
                            "process": "Degassing*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "③ Finishing"
                      },
                      {
                            "process": "EOL testing*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "③ Finishing"
                      }
                ]
          },
          "led": {
                "application": true,
                "cols": [],
                "rows": [
                      {
                            "process": "LED",
                            "series": "GLR",
                            "note": "FPD, LED and other markets"
                      },
                      {
                            "process": "MOCVD (high-flow H₂)",
                            "series": "GHR",
                            "note": "Semiconductor, LED, solar PV"
                      },
                      {
                            "process": "Etchers, metal deposition, Si epitaxy, PVD, CVD, SiC crystal growth",
                            "series": "GTP-M",
                            "note": "Magnetically levitated molecular pump"
                      },
                      {
                            "process": "Solar manufacturing, ITO glass, LCD, environmental simulation",
                            "series": "GTP-G1400 · G2400",
                            "note": "Grease-lubricated, any mounting angle"
                      },
                      {
                            "process": "Pan-semiconductor equipment, optical and hard coating",
                            "series": "GTP-G800",
                            "note": "Grease-lubricated molecular pump"
                      },
                      {
                            "process": "Optical coating, vacuum furnaces, vacuum sintering, environmental simulation",
                            "series": "GTP-L4400",
                            "note": "Handles dust-laden gas"
                      },
                      {
                            "process": "Scientific instruments, leak detectors, mass spectrometry, SEM",
                            "series": "GTP-G300",
                            "note": "Low vibration, low noise"
                      },
                      {
                            "process": "Mass spectrometry, trace element analysis, electron microscopes",
                            "series": "GTP-H80",
                            "note": "Compact instrument pump"
                      },
                      {
                            "process": "Leak detection, environmental monitoring, scientific analysis",
                            "series": "GTP-H80D",
                            "note": "Split-flow, multiple inlets"
                      }
                ]
          }
    },
    selTitle: "Recommended Series by Process",
    selSub: "Choose an industry to see the recommended series for each of its processes.",
    selCols: ["Process", "Series", "Condensation", "Corrosion", "Dust", "Thermal reaction", "Combustible gas", "High-flow H₂"],
    selNote: "GMR is recommended for metal etch in 6- and 8-inch fabs.",
    etchTitle: "Recommended Models for Semiconductor Etch-Type Processes",
    etchCols: ["Process", "By-products & challenges", "Solution", "Recommended"],
    etchRows: [
      { process: "Oxide Etch", issue: "Light & medium polymers", solution: "Low risk", model: "GMR600/1200" },
      { process: "Poly Etch", issue: "Medium & harsh polymers, corrosive gases", solution: "Temperature control + nickel-alloy material", model: "GMR600/1200 (N)" },
      { process: "Metal Etch", issue: "AlCl₃ condensation", solution: "Medium temperature, anti-condensation", model: "GMR600/1200/1800" },
      { process: "HDP-CVD", issue: "Corrosion", solution: "Low temperature, corrosion resistance", model: "GMR1200/1800 (N)" },
      { process: "Strip/Ashing", issue: "Medium polymers", solution: "Medium temperature, anti-condensation", model: "GMR1800" },
      { process: "IMP", issue: "Medium polymers", solution: "Medium temperature, anti-condensation", model: "GMR200" },
    ],

    sysTitle: "Integrated Vacuum Systems",
    sysSub: "Five integrated systems combining pumps, boosters, exhaust gas abatement and other equipment.",
    sysDesc: {
      mizar: "Integrated stacked pump system with a mechanical booster – mechanical booster – dry pump structure, for clean, general and harsh processes, with high reliability and low operating cost.",
      megrez: "Plasma integrated system for WN and heavy SiO₂ dust processes such as HARP and PE-TEOS. Combining the plasma generator and vacuum pump safely extends dry pump service life.",
      merak: "Dual-deck multi-pump module that flexibly integrates vacuum pumps, chillers and more, with modules added or removed on demand. For semiconductor etch, PVD and other processes, it cuts hookup costs and facility points and shortens installation.",
      alioth: "Multi-pump module integrating vacuum pumps and exhaust gas abatement to improve process safety and operating stability, reducing TCO, hookup costs, floor space and installation time.",
      phecda: "Single-pump integrated module (dry pump + exhaust gas abatement) for diffusion, EPI, MOCVD and other processes: safe, reliable, stable, with predictive maintenance and a smaller footprint.",
    },
    aliothFigures: "Hookup cost 70%↓ · facility points 85%↓ · footprint 20%↓ · installation time 80%↓ · SEMI S2/S6/F47 certified",

    molTitle: "Molecular Pumps (GTP Series)",
    molSub: "Pumping speeds shown are for N₂.",
    mol: {
      "gtp-m": { title: "Magnetically levitated molecular pump GTP-M", desc: "Contact-free, friction-free, lubrication-free and maintenance-free magnetic bearings with five-degree-of-freedom active control allow installation in any orientation. Used on etchers, metal deposition, silicon epitaxy, PVD, CVD and SiC crystal growth systems." },
      "gtp-g": { title: "Grease-lubricated molecular pumps GTP-G · L", desc: "Long-life, energy-saving molecular pumps (G series installable at any angle) for solar manufacturing, ITO glass, LCD panels, optical and hard coating, vacuum furnaces and scientific instruments." },
      "gtp-h": { title: "Instrument molecular pumps GTP-H80 · H80D", desc: "Compact high-vacuum pumps for mass spectrometers and other high-end instruments. The split-flow H80D has multiple inlets, doing the work of two to three pumps in leak detectors and similar applications." },
    },
    molPower: "Dedicated molecular pump power supplies (IGBT-based CNC) are also available.",

    svcTitle: "Services & Parts",
    svcSub: "Please ask us about availability in Korea.",
    svc: [
      { title: "Vacuum pump overhaul (O&M)", desc: "Fault diagnosis, overhaul and remanufacturing, preventive maintenance and on-site service for dry vacuum pumps of major brands, with standardized processes, a defined warranty period and a spare parts warehouse to shorten downtime." },
      { title: "Y2O3 coating", desc: "Surface coating for semiconductor and display dry etch equipment parts. Etch and wear resistance extend part life and reduce replacement costs." },
      { title: "Precision parts cleaning", desc: "Precise control of surface particles and roughness for semiconductor parts, plus cleaning and O&M services for display PVD chamber parts." },
      { title: "Seals", desc: "FFKM seals for 6G/8.5G/10.5G dry etch equipment (APC valves, ICD, TEL, YAC) and VITON/FKM/FFKM seals for vacuum pumps." },
    ],

    refTitle: "Semiconductor Customer References",
    refSub: "Repeat orders from major Chinese semiconductor customers, and collaboration with local equipment OEMs.",
    refCols: ["Customer", "Process", "Grand Hitek pumps", "Best running time"],
    refMaskNote: "Some customer names are masked (e.g., SXX, S**C).",
    ibTitle: "Semiconductor Install Base in China",
    ibSub: "Pump models by customer and module, with the longest running hours to date.",
    ibCols: ["Module", "Pump models", "Max running (h)", "Qty"],
    units: "units",

    energyTitle: "GMR Series Energy Savings",
    energySub: "Up to 50% lower power than the compared series",
    powerTitle: "Power consumption (kW)",
    costTitle: "5-year utility cost (US$, converted at Oct 2026 rates)",
    cls: (n) => `${n} class`,
    powerHighlights: ["GMR600 vs SGM600A: −50% (−0.8 kW)", "GMR1200 vs SGM1200A: −44% (−0.8 kW)"],
    costHighlights: ["GMR600 vs SGM600A: −50% ({a:52000000})", "GMR1200 vs SGM1200A: −49% ({a:70000000})"],
    conditions:
      "Assumptions: a 12-inch fab with 100,000-wafer capacity running 1,000 medium-duty pumps each of the 600 and 1200 class for five years; power + PCW + N₂ costs. Power {u:1}/kWh, N₂ {u:0.25}/m³, PCW {u:0.5}/m³.",
    energySource: "Actual savings vary with process and operating conditions.",

    techTitle: "Product Features",
    techSub: "Hardware and software designed for consistency and stability",
    techItems: [
      { title: "Integrated stator-rotor design", desc: "Simple structure and easy assembly, with extremely high mechanical stability and straightforward temperature control.", img: STATOR_IMG },
      { title: "Permanent magnet synchronous motor (PMSM)", desc: "More energy-efficient, lower-carbon and higher-torque than traditional motors, with no induced current.", img: PMSM_IMG },
      { title: "Standard industrial-grade inverter", desc: "Wide compatibility and high operational stability." },
      { title: "Broad temperature control range", desc: "Handles complex process challenges." },
      { title: "Intelligent control system", desc: "HMI (human-machine interface) · CMS system · real-time parameters" },
    ],
    challengeTitle: "Dry Pump Challenges in Semiconductor Fabs",
    challenges: [
      { title: "Hardware costs", items: ["CAPEX", "Footprint", "Hookup"] },
      { title: "Operational costs", items: ["Unplanned downtime", "Wafer scrap", "Dust backflow", "Running cost"] },
      { title: "Safety incident costs", items: ["Partial or full facility evacuation", "Safety incidents such as explosions"] },
    ],
    keyChallengesLabel: "Key challenges",
    keyChallenges: ["Ultimate equipment safety and reliability", "Process application stability", "High product consistency"],
    appTitle: "Solutions by Application Challenge",
    appCols: ["Challenge", "Typical processes", "Solutions"],
    appRows: [
      { challenge: "Condensation of residual process gases & by-products (gaseous)", process: "Metal Etch; LPCVD Nitride; Coater", solution: "Increase pump temperature / heating jacket / increase N₂ flow" },
      { challenge: "By-product (solid) deposition", process: "PECVD Oxide; HARP; MOCVD", solution: "Maintain sufficient N₂ purge / powder trap / plasma trap" },
      { challenge: "Pyrolysis of residual process gases & by-products (gaseous)", process: "PEALD; WCVD", solution: "Reduce internal pump gas temperature / hot trap" },
      { challenge: "Unreacted gases reacting inside the pump", process: "WN; HARP", solution: "Add a divert pump / pre-remove one reactant gas / adjust recipe timing / reduce internal pump gas temperature" },
      { challenge: "Corrosive gases reacting with the pump body to form FeF₃", process: "HDP; Poly Etch", solution: "Lower pump body temperature / Ni alloy / anti-corrosion coating / increase N₂ flow (reduce corrosive gas concentration)" },
    ],
    paramNotes: ["Different challenges require different dry pump mechanical designs.", "Pump temperature control is a core factor.", "Each application needs tailored nitrogen purge settings."],
    conceptTitle: "PPACS® Product Concept",
    conceptLead: "Better performance · lower energy consumption · smaller footprint · lower cost · safer operation",
    concepts: [
      { title: "Performance Enhanced", desc: "Stability · reliability · consistency" },
      { title: "Power Optimized", desc: "Cut vacuum system energy consumption by 30–50% by 2030" },
      { title: "Area Compacted", desc: "Cut vacuum system footprint by 30–50% by 2030" },
      { title: "Cost Reduced", desc: "Cut the total cost of ownership (TCO) of vacuum systems by 30–50% by 2030" },
      { title: "Safety Assured", desc: "Multi-level safety system protection, targeting zero safety incidents during vacuum system operation" },
    ],

    namingTitle: "How to Read Model Names",
    namingSlots: [
      { label: "Application", values: ["H: Harsh / H₂", "M: Medium", "L: Light"] },
      { label: "Mechanism", values: ["C: Claw", "R: Roots", "S: Screw"] },
      { label: "Pumping speed class", values: ["120 · 200 · 500 m³/h", "600 · 1,200 · 1,800 m³/h", "3,000 · 4,500 · 6,000 · 7,000 m³/h"] },
      { label: "Temperature version", values: ["T: High temperature", "Z: Ultra-high temperature", "L: Low temperature", "(blank): Standard"] },
      { label: "Anti-corrosion", values: ["N: Nickel alloy", "C: Coating", "(blank): SG iron"] },
    ],
    namingExample: "Example: GHC1800T = harsh duty · claw · 1,800 m³/h class · high-temperature version · SG iron",
    catalogTitle: "Semiconductor Model Catalog",
    catalogSub: "Models by speed class, with equivalent models from other makers (reference).",
    catCols: ["Duty", "Series", "Mechanism", "Speed class (m³/h)", "Grand Hitek model", "Edxx equivalent", "Ebxx equivalent"],
    catNote: "The 7,000 m³/h entry is a pump set combining the GHC3000T with a GMB6000 booster.",
    pumpSet: "GHC (pump set)",

    certTitle: "Certifications & Qualifications",
    certGroups: { semi: "SEMI", naeu: "North America & EU", system: "Management systems" },
    honorsTitle: "Corporate qualifications & patents",
    honors: [
      "National-level specialized and sophisticated 'Little Giant' enterprise — valid Jul 2024 – Jun 2027",
      "High-tech enterprise — GR202311004449, Nov 2023",
      "Beijing specialized and sophisticated SME — 2024ZJTX1752, Oct 2024 – Oct 2027",
      "Beijing new technology & new product — XCP2023IC0015, vacuum pump GS1800-1800C, Dec 2023",
      "Invention patents ZL 2023 1 0292694.X, ZL 2023 1 0338837.6 and more; 220+ authorized patents since 2015",
    ],

    companyTitle: "About Grand Hitek",
    companyLead: "Beijing Grand Hitek Co., Ltd. (通嘉科技) — headquartered in Beijing E-Town, a supplier of dry vacuum pump equipment and system technical services for semiconductor, solar PV, advanced display, LED lighting, lithium battery and other industries",
    historyTitle: "Milestones",
    history: [
      { year: "2026", items: ["Land secured to expand production in Beijing, Wuhan and Hangzhou", "Japanese and Singapore subsidiaries established"] },
      { year: "2025", items: ["Semiconductor share in mainland China rose to 15%", "Integrated machines and GHR series launched", "Full semiconductor process coverage", "Series B+ financing completed", "First overseas market entry"] },
      { year: "2024", items: ["GLR series developed and verified", "Cumulative shipments 30,000+ units (2,000+ for semiconductor)", "Domestic share in advanced displays exceeded 65%"] },
      { year: "2023", items: ["GS, GMR and other series launched for solar PV and semiconductor processes", "Share in PV cells exceeded 50%", "Beijing Yizhuang base expanded, stable output of 2,000 units/month"] },
      { year: "2022", items: ["GS series developed and verified", "New pump capacity reached 300 units/month"] },
      { year: "2021", items: ["Series A financing completed", "Officially entered the semiconductor market"] },
      { year: "2020", items: ["Small-batch verification passed"] },
      { year: "2019", items: ["GHC series verified and shipped in small batches", "Parts recycling and pump service business accelerated in East China"] },
      { year: "2018", items: ["Multiple software copyrights obtained", "DP control system developed", "GHC series client demos"] },
      { year: "2017", items: ["GHC and MB series developed", "Entered display and semiconductor harsh process applications"] },
      { year: "2016", items: ["Wuxi production base established", "Pump maintenance business expanded in Central China", "DP client process demos started"] },
      { year: "2015", items: ["Key components developed; independent development began"] },
      { year: "2012", items: ["Company founded; started trading and branded vacuum pump service"] },
    ],
    basesTitle: "Production, R&D and Service Network",
    basesSummary: "Four production bases, four R&D bases and seven O&M service centers across mainland China, Japan and Singapore, with more than 60,000㎡ of total factory area.",
    basesCols: ["Location", "Role", "Status"],
    bases: [
      { loc: "Beijing (HQ, E-Town)", role: "Management headquarters (new campus under construction) · R&D headquarters · sales platform · production of new pumps, scrubbers and chillers · pump overhaul", status: "Operating", building: false },
      { loc: "Langfang, Hebei", role: "Production · parts cleaning", status: "Operating", building: false },
      { loc: "Minhang, Shanghai", role: "All-in-one machine R&D and production · branded pump overhaul", status: "Operating", building: false },
      { loc: "Xi'an, Shaanxi", role: "Molecular pump R&D and overhaul", status: "Operating", building: false },
      { loc: "Japan", role: "Technology center (subsidiary established 2026)", status: "Operating", building: false },
      { loc: "Singapore", role: "Pump overhaul and sales platform covering Singapore and Malaysia (subsidiary established 2026)", status: "Operating", building: false },
      { loc: "Hangzhou, Zhejiang", role: "Production of new pumps", status: "Under construction", building: true },
      { loc: "Wuhan, Hubei", role: "Pump overhaul and production", status: "Under construction", building: true },
      { loc: "Chengdu, Sichuan", role: "Pump overhaul", status: "Under construction", building: true },
    ],
    rdTitle: "R&D Capabilities",
    rdItems: [
      { title: "R&D team", points: ["100+ R&D staff (16% of the workforce)", "4 doctors and associate professors", "Deep industry background and development experience"] },
      { title: "Three R&D bases", points: ["Beijing — dry pumps", "Shanghai — integrated machines", "Xi'an — molecular pumps"] },
      { title: "Technology platform", points: ["Rational design based on vacuum principles", "Testing technology platform", "Simulation platform", "Pumping speed simulation"] },
      { title: "IPD integrated product development", points: ["Innovation driven by market demand", "Clear product roadmap", "Stable product performance", "Shorter development cycles and faster launches"] },
      { title: "Four-in-one R&D chain", points: ["Independent in-house R&D", "Joint research with universities", "Precision digital intelligent processing", "Professional testing and analysis"] },
    ],

    faqTitle: "Frequently Asked Questions",
    ctaTitle: "Talk to Us About Grand Hitek Vacuum Pumps",
    ctaDesc: "Tell us your process, required pumping speed and gas conditions, and OHI Tech will help you select the right model and prepare a quotation.",
  },

  zh: {
    eyebrow: "通嘉科技 Grand Hitek — 韩国总代理 OHI Tech",
    title: "干式真空泵",
    lead:
      "通嘉科技（北京通嘉宏瑞科技股份有限公司，Grand Hitek）成立于2012年，深耕干式真空泵装备及系统集成方案，集研发、生产与服务于一体。公司依托独创的PPACS®产品理念自研全系列干式真空泵与精密核心配件，产品广泛应用于半导体、光伏、锂电、新型显示、LED、工业真空等领域，适配真空镀膜、刻蚀、离子注入等晶圆级高端制程。OHI Tech作为通嘉科技韩国总代理，为客户提供按工艺条件的选型与报价支持。",
    badge: "韩国总代理",
    ctaInquiry: "立即咨询",
    ctaQuote: "索取报价",
    nav: {
      industries: "应用领域",
      "dry-pumps": "干式真空泵",
      selection: "工艺选型",
      systems: "集成一体机",
      molecular: "分子泵",
      services: "服务",
      references: "客户业绩",
      energy: "节能",
      technology: "技术",
      catalog: "型号目录",
      certifications: "认证与资质",
      company: "公司介绍",
      faq: "常见问题",
    },
    stats: [
      { value: "2012", label: "成立 · 中国北京" },
      { value: "600+", label: "员工" },
      { value: "60,000㎡+", label: "总厂区面积" },
      { value: "220+", label: "累计授权专利（2015年起）" },
      { value: "30,000+", label: "累计出货台数（2024年，半导体2,000+）" },
      { value: "15%", label: "半导体大陆市占率（2025年）" },
    ],

    indTitle: "应用领域",
    indSub: "通嘉科技干式真空泵不仅用于半导体，也广泛应用于新型显示、光伏、锂电、LED及工业真空等领域。",
    indLbl: {"processes": "适配工艺", "recommended": "推荐系列", "more": "详情"},
    ind: {
          "semi": {
                "name": "半导体",
                "share": "大陆市占率15%（2025年）",
                "processes": [
                      "MOCVD",
                      "PECVD",
                      "LPCVD",
                      "SACVD",
                      "ALD",
                      "Etch",
                      "HDP",
                      "Coater",
                      "EPI"
                ],
                "rows": [
                      {
                            "label": "GLR",
                            "text": "loadlock · Transfer · PVD · Coater"
                      },
                      {
                            "label": "GMR",
                            "text": "IMP source · Strip/Ashing · Oxide/Poly Etch · Metal Etch（6寸与8寸FAB）· HDP"
                      },
                      {
                            "label": "GHC",
                            "text": "ALD · PECVD · LPCVD · SACVD · MOCVD · Metal Etch"
                      },
                      {
                            "label": "GHR",
                            "text": "MOCVD · Si EPI · SiC EPI · HJT（高流量H₂）"
                      }
                ],
                "note": "各工艺挑战（冷凝、腐蚀、粉尘、热反应、可燃气体）见下方“工艺推荐系列”表。"
          },
          "display": {
                "name": "新型显示（FPD）",
                "share": "国产市占率超65%（2024年）",
                "processes": [
                      "PVD",
                      "PECVD",
                      "Etch",
                      "LL/TC",
                      "蒸镀",
                      "Lami贴合",
                      "PHOTO"
                ],
                "rows": [
                      {
                            "label": "GHC",
                            "text": "PECVD SiN · SiON · SiO₂ · Metal Etch · Non-Metal Etch — 冷凝、腐蚀、粉尘、可燃气体"
                      },
                      {
                            "label": "GLR",
                            "text": "PVD · LL/TC · 蒸镀 · Lami贴合 — 频繁pumping"
                      },
                      {
                            "label": "GLR-P",
                            "text": "coater PHOTO — 冷凝"
                      }
                ],
                "note": "亦提供面板显示DRY ETCH设备用Y2O3涂层、零部件精密清洗及6G/8.5G/10.5G密封圈。"
          },
          "solar": {
                "name": "太阳能光伏",
                "share": "光伏电池片市占率突破50%（2023年）",
                "processes": [
                      "拉晶",
                      "PECVD",
                      "LPCVD",
                      "ALD",
                      "层压"
                ],
                "rows": [
                      {
                            "label": "GS-S",
                            "text": "拉晶 — 粉尘"
                      },
                      {
                            "label": "GS",
                            "text": "电池片 PECVD · LPCVD — 粉尘 / 电池片 ALD — 热解、粉尘"
                      },
                      {
                            "label": "GLR-P",
                            "text": "组件 层压 — 冷凝"
                      },
                      {
                            "label": "GHR",
                            "text": "HJT（高流量H₂）"
                      }
                ],
                "note": "GS系列可应用于清洁、一般及苛刻工艺，可靠性高，使用成本极低。"
          },
          "battery": {
                "name": "锂电",
                "processes": [
                      "匀浆",
                      "脱气",
                      "真空干燥",
                      "叠片",
                      "组装",
                      "注液",
                      "EOL检测"
                ],
                "rows": [
                      {
                            "label": "GLR",
                            "text": "GLR全系列产品适用于锂电生产工序。"
                      },
                      {
                            "label": "① 极片制造",
                            "text": "搅拌* · 涂布 · 干燥 · 辊压 · 分切 · 真空干燥* — 耐粉尘、水汽及溶剂"
                      },
                      {
                            "label": "② 电芯装配",
                            "text": "配对 · 叠片 · 焊接/封装/组装* · 注液 — 耐粉尘及溶剂"
                      },
                      {
                            "label": "③ 电芯后段",
                            "text": "化成 · 脱气* · 老化 · EOL检测* — 耐粉尘、水汽及溶剂"
                      }
                ],
                "note": "* 使用真空的工序"
          },
          "led": {
                "name": "LED及其他行业",
                "processes": [],
                "rows": [
                      {
                            "label": "GLR",
                            "text": "广泛应用于FPD/LED等行业"
                      },
                      {
                            "label": "GHR",
                            "text": "MOCVD等高流量H₂工艺 — 半导体、LED、光伏"
                      },
                      {
                            "label": "GTP分子泵",
                            "text": "光学镀膜 · 真空炉 · 真空烧结 · 环境模拟 · 科学仪器（质谱分析、电子显微镜、检漏）· ITO导电玻璃 · 液晶平板"
                      }
                ],
                "note": "产品亦应用于工业真空等领域。"
          }
    },

    indFilter: {
      label: "按行业查看",
      all: "全部",
      tabs: {"semi": "半导体", "display": "新型显示", "solar": "光伏", "battery": "锂电", "led": "LED及其他"},
      count: (n) => `${n}个系列`,
      procLabel: (name) => `${name}适配工艺`,
    },
    indSeries: {
          "semi": {
                "glr": [
                      "loadlock",
                      "Transfer",
                      "PVD",
                      "Coater"
                ],
                "gmr": [
                      "IMP source",
                      "Strip/Ashing",
                      "Oxide Etch",
                      "Poly Etch",
                      "Metal Etch（6寸与8寸FAB）",
                      "HDP"
                ],
                "ghc": [
                      "ALD",
                      "PECVD",
                      "LPCVD",
                      "SACVD",
                      "MOCVD",
                      "Metal Etch"
                ],
                "ghr": [
                      "MOCVD",
                      "Si EPI",
                      "SiC EPI",
                      "HJT（高流量H₂）"
                ]
          },
          "display": {
                "glr": [
                      "PVD",
                      "LL/TC",
                      "蒸镀",
                      "Lami贴合",
                      "coater PHOTO（GLR-P）"
                ],
                "ghc": [
                      "PECVD SiN",
                      "PECVD SiON",
                      "PECVD SiO₂",
                      "Metal Etch",
                      "Non-Metal Etch"
                ]
          },
          "solar": {
                "glr": [
                      "组件 层压（GLR-P）"
                ],
                "gs": [
                      "拉晶（GS-S）",
                      "电池片 PECVD",
                      "电池片 LPCVD",
                      "电池片 ALD"
                ],
                "ghr": [
                      "HJT（高流量H₂）"
                ]
          },
          "battery": {
                "glr": [
                      "匀浆",
                      "脱气",
                      "真空干燥",
                      "叠片",
                      "组装",
                      "注液",
                      "EOL检测"
                ]
          },
          "led": {
                "glr": [
                      "FPD/LED等行业"
                ],
                "ghr": [
                      "MOCVD等高流量H₂工艺 — 半导体、LED、光伏"
                ]
          }
    },
    dryTitle: "干式真空泵",
    drySub: "通过下方按钮查看各行业使用的系列与适配工艺。",
    lbl: { mech: "结构", speed: "最大抽速", models: "型号", grade: "适用工艺", best: "推荐工艺（半导体）", markets: "主要行业", options: "可选版本" },
    mech: { roots: "多级罗茨", claw: "新型一体爪式" },
    grade: { clean: "清洁", general: "一般", medium: "中等", harsh: "苛刻" },
    seriesDesc: {
      glr: "可应用于清洁工艺、一般工艺的多级罗茨干泵，可靠性高，使用成本极低。",
      gmr: "可应用于清洁工艺以及一般严苛工艺的多级罗茨干泵，主要适用于半导体刻蚀与离子注入工艺腔；低能耗、抗腐蚀、占地面积少。",
      ghc: "可应用于清洁工艺、一般工艺和苛刻工艺的新型一体爪式干泵，处理粉尘能力极强，是苛刻工艺应用的优选，使用成本极低。",
      gs: "可应用于清洁工艺、一般工艺和苛刻工艺的新型一体爪式干泵，可靠性高，使用成本极低。",
      ghr: "面向高流量H₂应用开发的多级罗茨干泵，适用于中等及严苛制程，抽气能力强、可靠性高。",
    },
    seriesMarkets: {
      glr: "半导体 · 面板显示 · LED · 锂电 · 光伏",
      gmr: "半导体（刻蚀 · 离子注入）",
      ghc: "半导体 · 面板显示",
      gs: "光伏等",
      ghr: "半导体 · LED · 光伏",
    },
    seriesOptions: { gmr: "N：镍合金（腐蚀性工艺）", ghc: "T：高温 · Z：超高温 · L：低温" },
    glrP: "GLR-P系列：GLR3000P · GLR5000（3,380 – 4,500 m³/h）",
    gsBest: "光伏工艺等",

    recLbl: {"process": "工艺", "application": "应用", "series": "推荐", "note": "备注", "dot": "● = 该工艺的主要挑战"},
    ch: {"cond": "冷凝", "corr": "腐蚀", "dust": "粉尘", "heat": "热反应", "comb": "可燃气体", "h2": "高流量H₂", "pyro": "热解", "freq": "频繁pumping", "moist": "水汽", "solv": "溶剂"},
    rec: {
          "display": {
                "cols": [
                      "cond",
                      "corr",
                      "dust",
                      "comb",
                      "freq"
                ],
                "rows": [
                      {
                            "process": "PECVD SiN",
                            "series": "GHC",
                            "marks": [
                                  "cond",
                                  "corr",
                                  "comb"
                            ]
                      },
                      {
                            "process": "PECVD SiON",
                            "series": "GHC",
                            "marks": [
                                  "cond",
                                  "corr",
                                  "dust",
                                  "comb"
                            ]
                      },
                      {
                            "process": "PECVD SiO₂",
                            "series": "GHC",
                            "marks": [
                                  "corr",
                                  "dust",
                                  "comb"
                            ]
                      },
                      {
                            "process": "Metal Etch",
                            "series": "GHC",
                            "marks": [
                                  "cond",
                                  "corr"
                            ]
                      },
                      {
                            "process": "Non-Metal Etch",
                            "series": "GHC",
                            "marks": [
                                  "corr"
                            ]
                      },
                      {
                            "process": "PVD",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "LL/TC",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "蒸镀",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "Lami贴合",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "coater PHOTO",
                            "series": "GLR-P",
                            "marks": [
                                  "cond"
                            ]
                      }
                ]
          },
          "solar": {
                "cols": [
                      "cond",
                      "pyro",
                      "dust",
                      "h2"
                ],
                "rows": [
                      {
                            "process": "拉晶",
                            "series": "GS-S",
                            "marks": [
                                  "dust"
                            ]
                      },
                      {
                            "process": "电池片 PECVD",
                            "series": "GS",
                            "marks": [
                                  "dust"
                            ]
                      },
                      {
                            "process": "电池片 ALD",
                            "series": "GS",
                            "marks": [
                                  "pyro",
                                  "dust"
                            ]
                      },
                      {
                            "process": "电池片 LPCVD",
                            "series": "GS",
                            "marks": [
                                  "dust"
                            ]
                      },
                      {
                            "process": "组件 层压",
                            "series": "GLR-P",
                            "marks": [
                                  "cond"
                            ]
                      },
                      {
                            "process": "HJT",
                            "series": "GHR",
                            "marks": [
                                  "h2"
                            ]
                      }
                ]
          },
          "battery": {
                "cols": [
                      "dust",
                      "moist",
                      "solv"
                ],
                "rows": [
                      {
                            "process": "匀浆*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "① 极片制造"
                      },
                      {
                            "process": "真空干燥*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "① 极片制造"
                      },
                      {
                            "process": "叠片",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "solv"
                            ],
                            "note": "② 电芯装配"
                      },
                      {
                            "process": "组装*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "solv"
                            ],
                            "note": "② 电芯装配"
                      },
                      {
                            "process": "注液",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "solv"
                            ],
                            "note": "② 电芯装配"
                      },
                      {
                            "process": "脱气*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "③ 电芯后段"
                      },
                      {
                            "process": "EOL检测*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "③ 电芯后段"
                      }
                ]
          },
          "led": {
                "application": true,
                "cols": [],
                "rows": [
                      {
                            "process": "LED",
                            "series": "GLR",
                            "note": "FPD/LED等行业"
                      },
                      {
                            "process": "MOCVD（高流量H₂）",
                            "series": "GHR",
                            "note": "半导体、LED、光伏"
                      },
                      {
                            "process": "刻蚀机、金属沉积、硅外延、PVD、CVD、SiC晶体生长系统",
                            "series": "GTP-M",
                            "note": "磁悬浮分子泵"
                      },
                      {
                            "process": "太阳能制造、ITO导电玻璃、液晶平板、环境模拟",
                            "series": "GTP-G1400 · G2400",
                            "note": "脂润滑，可任意角度安装"
                      },
                      {
                            "process": "泛半导体装备、光学镀膜、硬质涂层设备",
                            "series": "GTP-G800",
                            "note": "脂润滑分子泵"
                      },
                      {
                            "process": "光学镀膜、真空炉、真空烧结、环境模拟",
                            "series": "GTP-L4400",
                            "note": "可抽除含粉尘气体"
                      },
                      {
                            "process": "科学仪器、检漏仪、质谱分析、扫描电镜",
                            "series": "GTP-G300",
                            "note": "振动小、噪声小"
                      },
                      {
                            "process": "质谱分析、痕量元素分析、电子显微镜",
                            "series": "GTP-H80",
                            "note": "仪器用小型分子泵"
                      },
                      {
                            "process": "检漏、环境监测、科学分析",
                            "series": "GTP-H80D",
                            "note": "分流式（多进气口）"
                      }
                ]
          }
    },
    selTitle: "工艺推荐系列",
    selSub: "选择行业即可查看该领域各工艺的推荐系列。",
    selCols: ["工艺", "推荐", "冷凝", "腐蚀", "粉尘", "热反应", "可燃气体", "高流量H₂"],
    selNote: "GMR用于Metal Etch时针对6寸与8寸FAB。",
    etchTitle: "半导体刻蚀类工艺推荐型号",
    etchCols: ["工艺", "副产物与挑战", "解决方案", "推荐型号"],
    etchRows: [
      { process: "Oxide Etch", issue: "轻、中度聚合物", solution: "低风险", model: "GMR600/1200" },
      { process: "Poly Etch", issue: "中、重度聚合物，腐蚀性气体", solution: "温度控制 + 镍合金材质", model: "GMR600/1200 (N)" },
      { process: "Metal Etch", issue: "AlCl₃冷凝", solution: "中温防冷凝", model: "GMR600/1200/1800" },
      { process: "HDP-CVD", issue: "腐蚀", solution: "低温耐腐蚀", model: "GMR1200/1800 (N)" },
      { process: "Strip/Ashing", issue: "中度聚合物", solution: "中温防冷凝", model: "GMR1800" },
      { process: "IMP", issue: "中度聚合物", solution: "中温防冷凝", model: "GMR200" },
    ],

    sysTitle: "真空集成一体机",
    sysSub: "将真空泵、增压泵、尾气处理等设备集成为一体的5款一体机。",
    sysDesc: {
      mizar: "采用机械增压泵-机械增压泵-干泵结构的集成式叠泵系统，可应用于清洁、一般及苛刻工艺，可靠性高、使用成本低。",
      megrez: "针对WN及部分重SiO₂粉尘工艺（HARP、PE-TEOS等）开发的等离子集成一体机，将等离子发生器与真空泵集成，安全高效地延长干泵使用寿命。",
      merak: "模块化设计的双层多泵型集成模块，可灵活集成各类真空泵、冷水机等设备并按需增减模块；适用于半导体Etch、PVD等工艺，大幅降低Hookup成本与Facility点位需求，缩短安装时间。",
      alioth: "集成式多泵型模块（真空泵+尾气处理系统），专为提升工艺安全与设备运行稳定性设计，显著降低TCO、Hookup成本与Facility点位需求，节省占地并缩短安装时间。",
      phecda: "面向Diffusion、EPI、MOCVD等工艺的集成单泵型模块，包含干泵与尾气处理系统；安全可靠、运行稳定、可预测性维护、占地更小。",
    },
    aliothFigures: "Hookup费用 70%↓ · Facility连接点位 85%↓ · 占地尺寸 20%↓ · 安装时间 80%↓ · 取得SEMI S2/S6/F47认证",

    molTitle: "分子泵（GTP系列）",
    molSub: "所示抽速为N₂抽速。",
    mol: {
      "gtp-m": { title: "磁悬浮分子泵 GTP-M", desc: "磁轴承无接触、无摩擦、无需润滑及免维护，五自由度主动控制，可各方位安装。应用设备：刻蚀机、金属沉积系统、硅外延系统、PVD、CVD、SiC晶体生长系统等。" },
      "gtp-g": { title: "脂润滑分子泵 GTP-G · L", desc: "寿命长、节能（G系列可任意角度安装），适用于太阳能制造、ITO导电玻璃、液晶平板、光学镀膜与硬质涂层、真空炉、科学仪器等。" },
      "gtp-h": { title: "仪器分子泵 GTP-H80 · H80D", desc: "质谱仪等高端仪器用小型高真空分子泵。H80D为多进气口的分流式分子泵，一台即可起到以往2-3台泵的效果，适用于检漏等场景。" },
    },
    molPower: "亦提供分子泵系列适配电源（基于IGBT的数控电源）。",

    svcTitle: "服务与零部件",
    svcSub: "韩国提供范围请咨询。",
    svc: [
      { title: "真空泵运维", desc: "提供各类主流品牌干式真空泵的故障诊断、翻新与再制造、预防性维护保养及现场服务；标准化流程、明确质保期，并设立备件库以缩短停机时间。" },
      { title: "Y2O3涂层", desc: "用于半导体及面板显示DRY ETCH设备零部件表面涂层，耐刻蚀、耐磨损，延长备件寿命、降低更换成本。" },
      { title: "零部件精密清洗", desc: "精密控制半导体零部件表面颗粒与粗糙度，并提供面板显示PVD腔体零部件的清洗与运维服务。" },
      { title: "密封圈", desc: "适配6G/8.5G/10.5G干法刻蚀设备（APC阀门、ICD、TEL、YAC）的全氟醚密封圈，以及真空泵用VITON/高氟/全氟醚密封圈。" },
    ],

    refTitle: "半导体主要客户业绩",
    refSub: "已获中国主要半导体客户重复订单，并与本土设备厂商（OEM）合作。",
    refCols: ["客户", "工艺", "通嘉泵数量", "最长运行时间"],
    refMaskNote: "部分客户名称以隐去形式（如SXX、S**C）标注。",
    ibTitle: "中国半导体装机业绩",
    ibSub: "各客户、各模块的应用型号及截至目前的最长运行时间。",
    ibCols: ["模块", "应用型号", "最长运行（h）", "数量"],
    units: "台",

    energyTitle: "GMR系列节能",
    energySub: "较对比机型功耗最多降低50%",
    powerTitle: "功率（kW）",
    costTitle: "5年运行成本（RMB）",
    cls: (n) => `${n}级`,
    powerHighlights: ["GMR600 vs SGM600A：−50%（−0.8 kW）", "GMR1200 vs SGM1200A：−44%（−0.8 kW）"],
    costHighlights: ["GMR600 vs SGM600A：−50%（约0.52亿元）", "GMR1200 vs SGM1200A：−49%（约7,000万元）"],
    conditions:
      "测算条件：12英寸产能10万片晶圆厂，600级、1200级Medium泵各1,000台运行5年，含电力+PCW+N₂成本。电价1.0 RMB/kWh，N₂ 0.25 RMB/m³，PCW 0.5 RMB/m³。",
    energySource: "实际节能效果因工艺与运行条件而异。",

    techTitle: "产品特点",
    techSub: "面向一致性与稳定性的软硬件设计",
    techItems: [
      { title: "定转子一体化设计", desc: "结构简单、易于装配，机械稳定性极高，温度控制简便。", img: STATOR_IMG },
      { title: "永磁同步电机（PMSM）", desc: "较传统电机更节能、低碳、扭矩更高，无感应电流产生。", img: PMSM_IMG },
      { title: "标准工业级变频器", desc: "兼容性广，运行稳定性高。" },
      { title: "宽温控范围", desc: "可应对复杂的工艺挑战。" },
      { title: "智能控制系统", desc: "HMI人机界面 · CMS系统 · 实时参数" },
    ],
    challengeTitle: "半导体干泵应用挑战",
    challenges: [
      { title: "硬件成本", items: ["CAPEX", "占地面积", "安装接驳（Hookup）"] },
      { title: "运营成本", items: ["非计划停机", "晶圆报废", "粉尘回流", "运行成本"] },
      { title: "安全事故成本", items: ["局部或全厂疏散", "爆炸等安全事故"] },
    ],
    keyChallengesLabel: "关键挑战",
    keyChallenges: ["设备极致安全与可靠", "工艺应用稳定", "产品高度一致"],
    appTitle: "工艺挑战与解决方案",
    appCols: ["应用挑战", "典型工艺", "解决方案"],
    appRows: [
      { challenge: "残留工艺气体及副产物（气态）冷凝", process: "Metal Etch；LPCVD Nitride；COATER", solution: "提高泵温 / 加热套 / 增加N₂流量" },
      { challenge: "副产物（固态）沉积", process: "PECVD Oxide；HARP；MOCVD", solution: "保持充足N₂吹扫 / 粉尘捕集器 / 等离子捕集器" },
      { challenge: "残留工艺气体及副产物（气态）热解", process: "PEALD；WCVD", solution: "降低泵内气体温度 / 热捕集器" },
      { challenge: "未反应气体在泵内发生化学反应", process: "WN；HARP", solution: "增加分流泵 / 预先去除一种反应气体 / 调整工艺时序 / 降低泵内气体温度" },
      { challenge: "腐蚀性气体与泵体反应生成FeF₃", process: "HDP；Poly Etch", solution: "降低泵体温度 / 镍合金 / 防腐涂层 / 增加N₂流量（降低腐蚀性气体浓度）" },
    ],
    paramNotes: ["应对不同挑战需要不同的干泵机械设计。", "泵温控制是核心因素。", "不同应用需定制氮气吹扫设置。"],
    conceptTitle: "PPACS®产品理念",
    conceptLead: "性能更优 · 能耗更低 · 占地更小 · 成本更低 · 运营更安全",
    concepts: [
      { title: "Performance Enhanced 性能提升", desc: "稳定性 · 可靠性 · 一致性" },
      { title: "Power Optimized 功耗优化", desc: "至2030年真空系统能耗降低30~50%" },
      { title: "Area Compacted 占地紧凑", desc: "至2030年真空系统占地面积减少30~50%" },
      { title: "Cost Reduced 成本降低", desc: "至2030年真空系统总拥有成本（TCO）降低30~50%" },
      { title: "Safety Assured 安全保障", desc: "多级安全系统防护，确保真空系统运行零安全事故" },
    ],

    namingTitle: "型号命名规则",
    namingSlots: [
      { label: "应用工况", values: ["H：Harsh / H₂", "M：Medium", "L：Light"] },
      { label: "结构", values: ["C：爪式", "R：罗茨", "S：螺杆"] },
      { label: "抽速等级", values: ["120 · 200 · 500 m³/h", "600 · 1,200 · 1,800 m³/h", "3,000 · 4,500 · 6,000 · 7,000 m³/h"] },
      { label: "温控", values: ["T：高温", "Z：超高温", "L：低温", "（空白）：标准版"] },
      { label: "防腐", values: ["N：镍合金", "C：涂层", "（空白）：球墨铸铁"] },
    ],
    namingExample: "示例：GHC1800T = Harsh工况 · 爪式 · 1,800 m³/h级 · 高温版 · 球墨铸铁",
    catalogTitle: "半导体工艺型号目录",
    catalogSub: "按抽速等级列出的型号及其他厂商对应型号（参考）。",
    catCols: ["工况", "系列", "结构", "抽速等级（m³/h）", "通嘉型号", "Edxx对应型号", "Ebxx对应型号"],
    catNote: "7,000 m³/h为GHC3000T与增压泵GMB6000组成的泵组。",
    pumpSet: "GHC（泵组）",

    certTitle: "认证与资质",
    certGroups: { semi: "SEMI认证", naeu: "北美与欧盟认证", system: "体系认证" },
    honorsTitle: "企业资质与专利",
    honors: [
      "国家级专精特新“小巨人”企业 — 有效期 2024.07 – 2027.06",
      "高新技术企业 — GR202311004449，2023.11",
      "北京市“专精特新”中小企业 — 2024ZJTX1752，2024.10 – 2027.10",
      "北京市新技术新产品（服务）— XCP2023IC0015，真空泵 GS1800-1800C，2023.12",
      "发明专利 ZL 2023 1 0292694.X、ZL 2023 1 0338837.6 等；自2015年以来累计授权专利220项以上",
    ],

    companyTitle: "公司介绍",
    companyLead: "北京通嘉宏瑞科技股份有限公司（通嘉科技 / Grand Hitek）— 总部位于北京亦庄，干式真空泵装备及系统技术服务供应商，应用于半导体、光伏、新型显示及LED照明、锂电等行业",
    historyTitle: "发展历程",
    history: [
      { year: "2026", items: ["北京、武汉、杭州三地摘地扩产", "日本子公司、新加坡子公司成立"] },
      { year: "2025", items: ["半导体大陆市占率提升至15%", "集成一体机、GHR系列上市", "半导体实现全工艺覆盖", "完成B+轮融资", "海外市场破冰"] },
      { year: "2024", items: ["GLR系列研制成功&验证", "累计出货30,000+台，其中半导体行业2,000+台", "新型显示领域国产市占率超65%"] },
      { year: "2023", items: ["GS、GMR等多系列产品相继推出，覆盖光伏、半导体等多元工艺需求", "光伏电池片市占率突破50%", "北京亦庄基地扩建投产，稳定产量2,000台/月"] },
      { year: "2022", items: ["GS系列研制成功&验证", "新泵产能达成300台/月"] },
      { year: "2021", items: ["A轮融资完成", "半导体市场正式导入"] },
      { year: "2020", items: ["小批量验证通过"] },
      { year: "2019", items: ["GHC系列验证通过&小批量出货", "华东地区零件再生及真空泵维保业务提速"] },
      { year: "2018", items: ["获得多项软件著作权", "DP控制系统开发成功", "GHC系列客户端Demo"] },
      { year: "2017", items: ["GHC系列、MB系列研制成功", "切入新型显示及半导体严苛制程"] },
      { year: "2016", items: ["无锡生产基地建立", "华中地区真空泵维保业务迅速开展", "开始DP客户端工艺Demo"] },
      { year: "2015", items: ["关键部件研发成功，开启自主化探索"] },
      { year: "2012", items: ["公司成立，开始贸易业务及品牌真空泵运维服务"] },
    ],
    basesTitle: "生产 · 研发 · 服务网络",
    basesSummary: "在中国大陆及日本、新加坡布局四大生产基地、四大研发基地及七大运维服务中心，总厂区面积超60,000平方米。",
    basesCols: ["地区", "职能", "状态"],
    bases: [
      { loc: "北京（总部，亦庄）", role: "管理总部（新园区建设中） · 研发总部 · 销售平台 · 新泵、尾气处理器、冷水机生产 · 泵运维", status: "运营中", building: false },
      { loc: "河北廊坊", role: "生产 · 零部件清洗", status: "运营中", building: false },
      { loc: "上海闵行", role: "一体机研发与生产 · 品牌泵运维", status: "运营中", building: false },
      { loc: "陕西西安", role: "分子泵研发与运维", status: "运营中", building: false },
      { loc: "日本", role: "技术中心（2026年成立子公司）", status: "运营中", building: false },
      { loc: "新加坡", role: "泵运维与销售平台，辐射新加坡与马来西亚（2026年成立子公司）", status: "运营中", building: false },
      { loc: "浙江杭州", role: "新泵生产", status: "建设中", building: true },
      { loc: "湖北武汉", role: "泵运维与生产", status: "建设中", building: true },
      { loc: "四川成都", role: "泵运维", status: "建设中", building: true },
    ],
    rdTitle: "研发能力",
    rdItems: [
      { title: "研发团队", points: ["研发人员100人以上（占员工总数16%）", "博士及副教授4名", "深厚的行业背景与开发经验"] },
      { title: "三大研发基地", points: ["北京 — 干泵", "上海 — 一体机", "西安 — 分子泵"] },
      { title: "技术平台", points: ["基于真空原理的合理设计", "测试技术平台", "仿真平台", "抽速仿真"] },
      { title: "IPD集成产品开发", points: ["基于市场需求的创新", "清晰的产品路线图", "确保产品性能稳定", "缩短开发周期、加快上市节奏"] },
      { title: "四位一体全流程研发链", points: ["企业自主研发", "高校联合研究", "精密数字化智能加工", "专业测试与分析"] },
    ],

    faqTitle: "常见问题",
    ctaTitle: "咨询通嘉科技真空泵",
    ctaDesc: "请告知应用工艺、所需抽速及工艺气体条件，OHI Tech将协助您完成选型与报价。",
  },

  ja: {
    eyebrow: "Grand Hitek・通嘉科技 — 韓国総代理店 OHI Tech",
    title: "ドライ真空ポンプ",
    lead:
      "Grand Hitek（通嘉科技、北京通嘉宏瑞科技股份有限公司）は、2012年に中国・北京で設立された真空装置メーカーです。ドライ真空ポンプとシステム統合ソリューションを中心にR&D・生産・サービスを一体で手がけ、独自のPPACS®製品コンセプトのもと、ドライポンプ全ラインアップと精密コア部品を自社開発しています。製品は半導体・太陽光・リチウム電池・ディスプレイ・LED・産業用真空などで幅広く使われ、真空成膜・エッチング・イオン注入といったウェハーレベルのプロセスにも対応します。OHI TechはGrand Hitekの韓国総代理店として、プロセス条件に合ったモデル選定とお見積りをサポートします。",
    badge: "韓国総代理店",
    ctaInquiry: "お問い合わせ",
    ctaQuote: "お見積り依頼",
    nav: {
      industries: "対応産業",
      "dry-pumps": "ドライポンプ",
      selection: "プロセス別選定",
      systems: "統合システム",
      molecular: "分子ポンプ",
      services: "サービス",
      references: "導入実績",
      energy: "省エネ",
      technology: "技術",
      catalog: "カタログ",
      certifications: "認証・資格",
      company: "会社紹介",
      faq: "FAQ",
    },
    stats: [
      { value: "2012", label: "設立・中国 北京" },
      { value: "600+", label: "従業員" },
      { value: "60,000㎡+", label: "総工場面積" },
      { value: "220+", label: "累計登録特許（2015年〜）" },
      { value: "30,000+", label: "累計出荷台数（2024年、半導体2,000+）" },
      { value: "15%", label: "中国本土の半導体シェア（2025年）" },
    ],

    indTitle: "対応産業",
    indSub: "Grand Hitekのドライ真空ポンプは半導体だけでなく、ディスプレイ・太陽光・リチウムイオン電池・LED・産業用真空にも使われています。",
    indLbl: {"processes": "対応プロセス", "recommended": "推奨シリーズ", "more": "詳細"},
    ind: {
          "semi": {
                "name": "半導体",
                "share": "中国本土シェア15%（2025年）",
                "processes": [
                      "MOCVD",
                      "PECVD",
                      "LPCVD",
                      "SACVD",
                      "ALD",
                      "Etch",
                      "HDP",
                      "Coater",
                      "EPI"
                ],
                "rows": [
                      {
                            "label": "GLR",
                            "text": "Load Lock・Transfer・PVD・Coater"
                      },
                      {
                            "label": "GMR",
                            "text": "IMP Source・Strip/Ashing・Oxide/Poly Etch・Metal Etch（6・8インチファブ）・HDP"
                      },
                      {
                            "label": "GHC",
                            "text": "ALD・PECVD・LPCVD・SACVD・MOCVD・Metal Etch"
                      },
                      {
                            "label": "GHR",
                            "text": "MOCVD・Si EPI・SiC EPI・HJT（高流量H₂）"
                      }
                ],
                "note": "プロセスごとの課題（凝縮・腐食・粉塵・熱反応・可燃性ガス）は下の「プロセス別の推奨シリーズ」表をご覧ください。"
          },
          "display": {
                "name": "ディスプレイ（FPD）",
                "share": "中国国内シェア65%超（2024年）",
                "processes": [
                      "PVD",
                      "PECVD",
                      "Etch",
                      "LL/TC",
                      "蒸着",
                      "Lami貼合",
                      "PHOTO"
                ],
                "rows": [
                      {
                            "label": "GHC",
                            "text": "PECVD SiN・SiON・SiO₂・Metal Etch・Non-Metal Etch — 凝縮・腐食・粉塵・可燃性ガス"
                      },
                      {
                            "label": "GLR",
                            "text": "PVD・LL/TC・蒸着・Lami貼合 — 頻繁なポンピング"
                      },
                      {
                            "label": "GLR-P",
                            "text": "Coater PHOTO — 凝縮"
                      }
                ],
                "note": "ディスプレイ用ドライエッチング装置向けのY2O3コーティング・部品精密洗浄・シール（6G・8.5G・10.5G）も提供しています。"
          },
          "solar": {
                "name": "太陽光（PV）",
                "share": "太陽電池セルのシェア50%超（2023年）",
                "processes": [
                      "結晶引上げ",
                      "PECVD",
                      "LPCVD",
                      "ALD",
                      "ラミネーション"
                ],
                "rows": [
                      {
                            "label": "GS-S",
                            "text": "結晶引上げ — 粉塵"
                      },
                      {
                            "label": "GS",
                            "text": "セル PECVD・LPCVD — 粉塵／セル ALD — 熱分解・粉塵"
                      },
                      {
                            "label": "GLR-P",
                            "text": "モジュール ラミネーション — 凝縮"
                      },
                      {
                            "label": "GHR",
                            "text": "HJT（高流量H₂）"
                      }
                ],
                "note": "GSシリーズはクリーン・一般・過酷プロセスに対応し、信頼性が高く運転コストが非常に低いのが特長です。"
          },
          "battery": {
                "name": "リチウムイオン電池",
                "processes": [
                      "スラリー混練",
                      "脱気",
                      "真空乾燥",
                      "積層",
                      "組立",
                      "注液",
                      "EOL検査"
                ],
                "rows": [
                      {
                            "label": "GLR",
                            "text": "GLRの全ラインアップがリチウム電池の生産工程に適用できます。"
                      },
                      {
                            "label": "① 極板製造",
                            "text": "攪拌*・塗工・乾燥・圧延・切断・真空乾燥* — 粉塵・水蒸気・溶剤への耐性"
                      },
                      {
                            "label": "② セル組立",
                            "text": "ペアリング・積層・溶接/封止/組立*・注液 — 粉塵・溶剤への耐性"
                      },
                      {
                            "label": "③ 後工程",
                            "text": "化成・脱気*・エージング・EOL検査* — 粉塵・水蒸気・溶剤への耐性"
                      }
                ],
                "note": "* 真空を使う工程"
          },
          "led": {
                "name": "LED・その他の産業",
                "processes": [],
                "rows": [
                      {
                            "label": "GLR",
                            "text": "FPD・LEDなど幅広い市場で使用"
                      },
                      {
                            "label": "GHR",
                            "text": "MOCVDなど高流量H₂プロセス — 半導体・LED・太陽光"
                      },
                      {
                            "label": "GTP分子ポンプ",
                            "text": "光学コーティング・真空炉・真空焼結・環境シミュレーション・科学機器（質量分析・電子顕微鏡・リーク検査）・ITOガラス・液晶パネル"
                      }
                ],
                "note": "製品は産業用真空分野にも使われています。"
          }
    },

    indFilter: {
      label: "産業別に見る",
      all: "すべて",
      tabs: {"semi": "半導体", "display": "ディスプレイ", "solar": "太陽光", "battery": "リチウム電池", "led": "LED・その他"},
      count: (n) => `${n}シリーズ`,
      procLabel: (name) => `${name}の対応プロセス`,
    },
    indSeries: {
          "semi": {
                "glr": [
                      "Load Lock",
                      "Transfer",
                      "PVD",
                      "Coater"
                ],
                "gmr": [
                      "IMP Source",
                      "Strip/Ashing",
                      "Oxide Etch",
                      "Poly Etch",
                      "Metal Etch（6・8インチファブ）",
                      "HDP"
                ],
                "ghc": [
                      "ALD",
                      "PECVD",
                      "LPCVD",
                      "SACVD",
                      "MOCVD",
                      "Metal Etch"
                ],
                "ghr": [
                      "MOCVD",
                      "Si EPI",
                      "SiC EPI",
                      "HJT（高流量H₂）"
                ]
          },
          "display": {
                "glr": [
                      "PVD",
                      "LL/TC",
                      "蒸着",
                      "Lami貼合",
                      "Coater PHOTO（GLR-P）"
                ],
                "ghc": [
                      "PECVD SiN",
                      "PECVD SiON",
                      "PECVD SiO₂",
                      "Metal Etch",
                      "Non-Metal Etch"
                ]
          },
          "solar": {
                "glr": [
                      "モジュール ラミネーション（GLR-P）"
                ],
                "gs": [
                      "結晶引上げ（GS-S）",
                      "セル PECVD",
                      "セル LPCVD",
                      "セル ALD"
                ],
                "ghr": [
                      "HJT（高流量H₂）"
                ]
          },
          "battery": {
                "glr": [
                      "スラリー混練",
                      "脱気",
                      "真空乾燥",
                      "積層",
                      "組立",
                      "注液",
                      "EOL検査"
                ]
          },
          "led": {
                "glr": [
                      "FPD・LEDなど幅広い市場"
                ],
                "ghr": [
                      "MOCVDなど高流量H₂プロセス — 半導体・LED・太陽光"
                ]
          }
    },
    dryTitle: "ドライ真空ポンプ",
    drySub: "下のボタンで、産業ごとに使われるシリーズと対応プロセスを確認できます。",
    lbl: { mech: "構造", speed: "最大排気速度", models: "モデル", grade: "対応プロセス", best: "推奨プロセス（半導体）", markets: "主な産業", options: "仕様オプション" },
    mech: { roots: "多段ルーツ", claw: "一体型クロー" },
    grade: { clean: "クリーン", general: "一般", medium: "中程度", harsh: "過酷" },
    seriesDesc: {
      glr: "クリーン・一般プロセス向けの多段ルーツ式ドライポンプです。信頼性が高く、運転コストが非常に低いのが特長です。",
      gmr: "クリーン・一般プロセス向けの多段ルーツ式ドライポンプで、主に半導体のエッチング・イオン注入チャンバーで使われます。低消費電力・耐食性・省スペースが特長です。",
      ghc: "クリーン・一般・過酷プロセスのすべてに使える新型一体型クロー式ドライポンプです。粉塵処理能力が非常に高く過酷プロセスの第一選択で、運転コストも非常に低く抑えられます。",
      gs: "クリーン・一般・過酷プロセス向けの新型一体型クロー式ドライポンプです。信頼性が高く、運転コストが非常に低いのが特長です。",
      ghr: "高流量水素（H₂）用途向けに開発された多段ルーツ式ドライポンプです。中程度・過酷プロセスに対応し、排気能力が高く信頼性に優れます。",
    },
    seriesMarkets: {
      glr: "半導体・ディスプレイ・LED・リチウム電池・太陽光",
      gmr: "半導体（エッチング・イオン注入）",
      ghc: "半導体・ディスプレイ",
      gs: "太陽光など",
      ghr: "半導体・LED・太陽光",
    },
    seriesOptions: { gmr: "N：ニッケル合金（腐食性プロセス）", ghc: "T：高温・Z：超高温・L：低温" },
    glrP: "GLR-Pシリーズ：GLR3000P・GLR5000（3,380〜4,500 m³/h）",
    gsBest: "太陽光プロセスなど",

    recLbl: {"process": "プロセス", "application": "用途", "series": "推奨", "note": "備考", "dot": "● = そのプロセスの主な課題"},
    ch: {"cond": "凝縮", "corr": "腐食", "dust": "粉塵", "heat": "熱反応", "comb": "可燃性ガス", "h2": "高流量H₂", "pyro": "熱分解", "freq": "頻繁なポンピング", "moist": "水蒸気", "solv": "溶剤"},
    rec: {
          "display": {
                "cols": [
                      "cond",
                      "corr",
                      "dust",
                      "comb",
                      "freq"
                ],
                "rows": [
                      {
                            "process": "PECVD SiN",
                            "series": "GHC",
                            "marks": [
                                  "cond",
                                  "corr",
                                  "comb"
                            ]
                      },
                      {
                            "process": "PECVD SiON",
                            "series": "GHC",
                            "marks": [
                                  "cond",
                                  "corr",
                                  "dust",
                                  "comb"
                            ]
                      },
                      {
                            "process": "PECVD SiO₂",
                            "series": "GHC",
                            "marks": [
                                  "corr",
                                  "dust",
                                  "comb"
                            ]
                      },
                      {
                            "process": "Metal Etch",
                            "series": "GHC",
                            "marks": [
                                  "cond",
                                  "corr"
                            ]
                      },
                      {
                            "process": "Non-Metal Etch",
                            "series": "GHC",
                            "marks": [
                                  "corr"
                            ]
                      },
                      {
                            "process": "PVD",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "LL/TC",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "蒸着",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "Lami貼合",
                            "series": "GLR",
                            "marks": [
                                  "freq"
                            ]
                      },
                      {
                            "process": "Coater PHOTO",
                            "series": "GLR-P",
                            "marks": [
                                  "cond"
                            ]
                      }
                ]
          },
          "solar": {
                "cols": [
                      "cond",
                      "pyro",
                      "dust",
                      "h2"
                ],
                "rows": [
                      {
                            "process": "結晶引上げ",
                            "series": "GS-S",
                            "marks": [
                                  "dust"
                            ]
                      },
                      {
                            "process": "セル PECVD",
                            "series": "GS",
                            "marks": [
                                  "dust"
                            ]
                      },
                      {
                            "process": "セル ALD",
                            "series": "GS",
                            "marks": [
                                  "pyro",
                                  "dust"
                            ]
                      },
                      {
                            "process": "セル LPCVD",
                            "series": "GS",
                            "marks": [
                                  "dust"
                            ]
                      },
                      {
                            "process": "モジュール ラミネーション",
                            "series": "GLR-P",
                            "marks": [
                                  "cond"
                            ]
                      },
                      {
                            "process": "HJT",
                            "series": "GHR",
                            "marks": [
                                  "h2"
                            ]
                      }
                ]
          },
          "battery": {
                "cols": [
                      "dust",
                      "moist",
                      "solv"
                ],
                "rows": [
                      {
                            "process": "スラリー混練*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "① 極板製造"
                      },
                      {
                            "process": "真空乾燥*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "① 極板製造"
                      },
                      {
                            "process": "積層",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "solv"
                            ],
                            "note": "② セル組立"
                      },
                      {
                            "process": "組立*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "solv"
                            ],
                            "note": "② セル組立"
                      },
                      {
                            "process": "注液",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "solv"
                            ],
                            "note": "② セル組立"
                      },
                      {
                            "process": "脱気*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "③ 後工程"
                      },
                      {
                            "process": "EOL検査*",
                            "series": "GLR",
                            "marks": [
                                  "dust",
                                  "moist",
                                  "solv"
                            ],
                            "note": "③ 後工程"
                      }
                ]
          },
          "led": {
                "application": true,
                "cols": [],
                "rows": [
                      {
                            "process": "LED",
                            "series": "GLR",
                            "note": "FPD・LEDなど幅広い市場"
                      },
                      {
                            "process": "MOCVD（高流量H₂）",
                            "series": "GHR",
                            "note": "半導体・LED・太陽光"
                      },
                      {
                            "process": "エッチング装置・金属成膜・シリコンエピ・PVD・CVD・SiC結晶成長装置",
                            "series": "GTP-M",
                            "note": "磁気浮上分子ポンプ"
                      },
                      {
                            "process": "太陽光製造・ITOガラス・液晶パネル・環境シミュレーション",
                            "series": "GTP-G1400 · G2400",
                            "note": "グリース潤滑、任意角度で設置可"
                      },
                      {
                            "process": "汎半導体装置・光学コーティング・硬質コーティング",
                            "series": "GTP-G800",
                            "note": "グリース潤滑分子ポンプ"
                      },
                      {
                            "process": "光学コーティング・真空炉・真空焼結・環境シミュレーション",
                            "series": "GTP-L4400",
                            "note": "粉塵を含むガスを排気可能"
                      },
                      {
                            "process": "科学機器・リークディテクター・質量分析・走査電子顕微鏡",
                            "series": "GTP-G300",
                            "note": "低振動・低騒音"
                      },
                      {
                            "process": "質量分析・微量元素分析・電子顕微鏡",
                            "series": "GTP-H80",
                            "note": "計測機器用小型ポンプ"
                      },
                      {
                            "process": "リーク検査・環境モニタリング・科学分析",
                            "series": "GTP-H80D",
                            "note": "スプリットフロー（複数吸気口）"
                      }
                ]
          }
    },
    selTitle: "プロセス別の推奨シリーズ",
    selSub: "産業を選ぶと、その分野のプロセス別推奨シリーズが表示されます。",
    selCols: ["プロセス", "推奨", "凝縮", "腐食", "粉塵", "熱反応", "可燃性ガス", "高流量H₂"],
    selNote: "Metal EtchへのGMR推奨は6・8インチファブ向けです。",
    etchTitle: "半導体エッチング系プロセスの推奨モデル",
    etchCols: ["プロセス", "副生成物・課題", "対策", "推奨モデル"],
    etchRows: [
      { process: "Oxide Etch", issue: "軽・中程度のポリマー", solution: "低リスク", model: "GMR600/1200" },
      { process: "Poly Etch", issue: "中・重度のポリマー、腐食性ガス", solution: "温度制御＋ニッケル合金材", model: "GMR600/1200 (N)" },
      { process: "Metal Etch", issue: "AlCl₃の凝縮", solution: "中温運転・凝縮防止", model: "GMR600/1200/1800" },
      { process: "HDP-CVD", issue: "腐食", solution: "低温運転・耐食", model: "GMR1200/1800 (N)" },
      { process: "Strip/Ashing", issue: "中程度のポリマー", solution: "中温運転・凝縮防止", model: "GMR1800" },
      { process: "IMP", issue: "中程度のポリマー", solution: "中温運転・凝縮防止", model: "GMR200" },
    ],

    sysTitle: "真空統合システム",
    sysSub: "ポンプ・ブースター・排ガス処理装置などを一体化した統合システム（一体機）5種です。",
    sysDesc: {
      mizar: "メカニカルブースター–メカニカルブースター–ドライポンプ構成の積層型統合ポンプシステム。クリーン・一般・過酷プロセスに使え、信頼性が高く運転コストが低いのが特長です。",
      megrez: "WNやHARP・PE-TEOSなどSiO₂粉塵の多いプロセス向けのプラズマ統合システム。プラズマ発生器と真空ポンプを一体化し、ドライポンプの寿命を安全に延ばします。",
      merak: "真空ポンプやチラーなどをモジュール単位で増減できる2段（デュアルデッキ）マルチポンプシステム。半導体のEtch・PVDなどでフックアップコストとFacility接続点を減らし、設置時間を短縮します。",
      alioth: "真空ポンプと排ガス処理（アベートメント）を一体化したマルチポンプシステム。プロセス安全性と運転安定性を高め、TCO・フックアップコスト・設置面積・設置時間を削減します。",
      phecda: "Diffusion・EPI・MOCVDなど向けのシングルポンプ統合システム（ドライポンプ＋排ガス処理）。安全・高信頼・安定運転・予知保全・省スペースが特長です。",
    },
    aliothFigures: "フックアップ費用70%↓・Facility接続点85%↓・設置面積20%↓・設置時間80%↓・SEMI S2/S6/F47認証取得",

    molTitle: "分子ポンプ（GTPシリーズ）",
    molSub: "表示の排気速度はN₂の値です。",
    mol: {
      "gtp-m": { title: "磁気浮上分子ポンプ GTP-M", desc: "非接触・無摩擦・無潤滑・メンテナンスフリーの磁気軸受と5自由度アクティブ制御により、あらゆる向きに設置できます。エッチング装置、金属成膜、シリコンエピ、PVD、CVD、SiC結晶成長装置などに使われます。" },
      "gtp-g": { title: "グリース潤滑分子ポンプ GTP-G・L", desc: "長寿命・省エネ型の分子ポンプ（Gシリーズは任意角度で設置可能）。太陽光、ITOガラス、液晶パネル、光学・硬質コーティング、真空炉、科学機器などに使われます。" },
      "gtp-h": { title: "計測機器用分子ポンプ GTP-H80・H80D", desc: "質量分析計など高級計測機器向けの小型高真空ポンプです。H80Dは複数の吸気口を持つスプリットフロー型で、1台で従来の2〜3台分の役割を果たし、リークディテクターなどに使われます。" },
    },
    molPower: "分子ポンプ専用電源（IGBTベースのCNC電源）も供給しています。",

    svcTitle: "サービス・部品",
    svcSub: "韓国での提供範囲はお問い合わせください。",
    svc: [
      { title: "真空ポンプのメンテナンス（O&M）", desc: "主要ブランドのドライ真空ポンプの故障診断、オーバーホール・再製造、予防保全、現地サービス。標準化された工程と明確な保証期間、予備部品倉庫でダウンタイムを短縮します。" },
      { title: "Y2O3コーティング", desc: "半導体・ディスプレイのドライエッチング装置部品向け表面コーティング。耐エッチング性・耐摩耗性により部品寿命を延ばし、交換コストを抑えます。" },
      { title: "部品の精密洗浄", desc: "半導体部品の表面パーティクルと粗さを精密に管理し、ディスプレイPVDチャンバー部品の洗浄・運用サービスも提供します。" },
      { title: "シール（Oリング）", desc: "6G・8.5G・10.5Gドライエッチング装置（APCバルブ・ICD・TEL・YAC）向けFFKMシールと、真空ポンプ向けVITON・FKM・FFKMシール。" },
    ],

    refTitle: "半導体の主要顧客実績",
    refSub: "中国の主要半導体顧客からリピート受注を獲得し、現地装置メーカー（OEM）とも協業しています。",
    refCols: ["顧客", "プロセス", "納入台数", "最長稼働時間"],
    refMaskNote: "一部の顧客名は伏字（SXX、S**Cなど）で表記しています。",
    ibTitle: "中国半導体ファブ導入実績",
    ibSub: "顧客・モジュール別の採用モデルと、現在までの最長稼働時間です。",
    ibCols: ["モジュール", "採用モデル", "最長稼働（h）", "台数"],
    units: "台",

    energyTitle: "GMRシリーズの省エネ",
    energySub: "比較対象より消費電力最大50%削減",
    powerTitle: "消費電力（kW）",
    costTitle: "5年間のユーティリティコスト（円、2026年10月レート換算）",
    cls: (n) => `${n}クラス`,
    powerHighlights: ["GMR600 vs SGM600A：−50%（−0.8 kW）", "GMR1200 vs SGM1200A：−44%（−0.8 kW）"],
    costHighlights: ["GMR600 vs SGM600A：−50%（{a:52000000}）", "GMR1200 vs SGM1200A：−49%（{a:70000000}）"],
    conditions:
      "試算条件：12インチ・生産能力10万枚のファブで、600クラス・1200クラスのMediumポンプ各1,000台を5年間運転、電力＋PCW＋N₂コストの合計。電力{u:1}/kWh、N₂ {u:0.25}/m³、PCW {u:0.5}/m³。",
    energySource: "実際の削減効果はプロセス・運転条件により異なります。",

    techTitle: "製品特長",
    techSub: "一貫性と安定性のためのハードウェア・ソフトウェア設計",
    techItems: [
      { title: "ステーター・ローター一体設計", desc: "構造がシンプルで組立が容易、機械的安定性が非常に高く、温度制御も簡単です。", img: STATOR_IMG },
      { title: "永久磁石同期モーター（PMSM）", desc: "従来のモーターより高効率・低炭素・高トルクで、誘導電流が発生しません。", img: PMSM_IMG },
      { title: "標準産業用インバーター", desc: "幅広い互換性と高い運転安定性。" },
      { title: "広い温度制御範囲", desc: "複雑なプロセス課題に対応します。" },
      { title: "インテリジェント制御システム", desc: "HMI（ヒューマンマシンインターフェース）・CMSシステム・リアルタイムパラメーター" },
    ],
    challengeTitle: "半導体向けドライポンプの課題",
    challenges: [
      { title: "ハードウェアコスト", items: ["CAPEX", "設置面積", "フックアップ"] },
      { title: "運用コスト", items: ["計画外停止", "ウェハースクラップ", "粉塵の逆流", "ランニングコスト"] },
      { title: "安全事故コスト", items: ["施設の一部または全体の避難", "爆発などの安全事故"] },
    ],
    keyChallengesLabel: "主要課題",
    keyChallenges: ["装置の安全性・信頼性の追求", "プロセス適用の安定性", "高い製品一貫性"],
    appTitle: "プロセス課題別の対策",
    appCols: ["課題", "代表プロセス", "対策"],
    appRows: [
      { challenge: "残留プロセスガス・副生成物（気体）の凝縮", process: "Metal Etch; LPCVD Nitride; Coater", solution: "ポンプ温度を上げる／ヒーティングジャケット／N₂流量を増やす" },
      { challenge: "副生成物（固体）の堆積", process: "PECVD Oxide; HARP; MOCVD", solution: "十分なN₂パージを維持／パウダートラップ／プラズマトラップ" },
      { challenge: "残留プロセスガス・副生成物（気体）の熱分解", process: "PEALD; WCVD", solution: "ポンプ内部のガス温度を下げる／ホットトラップ" },
      { challenge: "未反応ガスのポンプ内部での化学反応", process: "WN; HARP", solution: "ダイバートポンプの追加／反応ガス1種の事前除去／レシピタイミングの調整／ポンプ内部のガス温度を下げる" },
      { challenge: "腐食性ガスとポンプ本体の反応（FeF₃生成）", process: "HDP; Poly Etch", solution: "ポンプ本体温度を下げる／ニッケル合金／防食コーティング／N₂流量を増やす（腐食性ガス濃度の低減）" },
    ],
    paramNotes: ["課題に応じて異なるドライポンプの機械設計が必要です。", "ポンプの温度制御が中核要素です。", "用途ごとに窒素パージ設定を最適化する必要があります。"],
    conceptTitle: "PPACS®製品コンセプト",
    conceptLead: "より高い性能・より低い消費エネルギー・より小さい設置面積・より低いコスト・より安全な運用",
    concepts: [
      { title: "Performance Enhanced", desc: "安定性・信頼性・一貫性" },
      { title: "Power Optimized", desc: "2030年までに真空システムのエネルギー消費を30〜50%削減" },
      { title: "Area Compacted", desc: "2030年までに真空システムの設置面積を30〜50%削減" },
      { title: "Cost Reduced", desc: "2030年までに真空システムの総所有コスト（TCO）を30〜50%削減" },
      { title: "Safety Assured", desc: "多段階の安全システム保護、真空システム運転中の安全事故ゼロ" },
    ],

    namingTitle: "型番の読み方",
    namingSlots: [
      { label: "用途", values: ["H：Harsh / H₂", "M：Medium", "L：Light"] },
      { label: "構造", values: ["C：クロー", "R：ルーツ", "S：スクリュー"] },
      { label: "排気速度クラス", values: ["120 · 200 · 500 m³/h", "600 · 1,200 · 1,800 m³/h", "3,000 · 4,500 · 6,000 · 7,000 m³/h"] },
      { label: "温度仕様", values: ["T：高温", "Z：超高温", "L：低温", "（なし）：標準"] },
      { label: "耐食仕様", values: ["N：ニッケル合金", "C：コーティング", "（なし）：球状黒鉛鋳鉄（SG Iron）"] },
    ],
    namingExample: "例：GHC1800T = Harsh用途・クロー構造・1,800 m³/hクラス・高温仕様・球状黒鉛鋳鉄",
    catalogTitle: "半導体プロセス向けモデルカタログ",
    catalogSub: "排気速度クラス別のモデルと他社相当モデル（参考）です。",
    catCols: ["用途", "シリーズ", "構造", "速度クラス（m³/h）", "Grand Hitekモデル", "Edxx相当", "Ebxx相当"],
    catNote: "7,000 m³/hはGHC3000TとブースターGMB6000を組み合わせたポンプセットです。",
    pumpSet: "GHC（ポンプセット）",

    certTitle: "認証・資格",
    certGroups: { semi: "SEMI認証", naeu: "北米・EU認証", system: "マネジメントシステム認証" },
    honorsTitle: "企業資格・特許",
    honors: [
      "国家級「専精特新『小巨人』」企業 — 有効期間 2024年7月〜2027年6月",
      "ハイテク企業（高新技術企業）— GR202311004449、2023年11月",
      "北京市「専精特新」中小企業 — 2024ZJTX1752、2024年10月〜2027年10月",
      "北京市新技術・新製品 — XCP2023IC0015、真空ポンプ GS1800-1800C、2023年12月",
      "発明特許 ZL 2023 1 0292694.X・ZL 2023 1 0338837.6 など、累計登録特許220件以上（2015年〜）",
    ],

    companyTitle: "会社紹介",
    companyLead: "北京通嘉宏瑞科技股份有限公司（通嘉科技 / Grand Hitek）— 北京・亦庄本社。ドライ真空ポンプ装置およびシステム技術サービスのサプライヤーとして、半導体・太陽光・ディスプレイ・LED照明・リチウム電池などの産業に供給しています。",
    historyTitle: "沿革",
    history: [
      { year: "2026", items: ["北京・武漢・杭州の3拠点で用地を確保し増産", "日本子会社・シンガポール子会社を設立"] },
      { year: "2025", items: ["中国本土の半導体シェアが15%に上昇", "統合システム（一体機）・GHRシリーズを発売", "半導体の全プロセスをカバー", "シリーズB+資金調達を完了", "海外市場に初進出"] },
      { year: "2024", items: ["GLRシリーズの開発・検証に成功", "累計出荷30,000台以上（うち半導体2,000台以上）", "新型ディスプレイ分野の国内シェアが65%を超過"] },
      { year: "2023", items: ["GS・GMRなど複数シリーズを相次いで発売（太陽光・半導体プロセス）", "太陽電池セル分野のシェアが50%を突破", "北京・亦庄拠点を拡張稼働、月産2,000台を安定生産"] },
      { year: "2022", items: ["GSシリーズの開発・検証に成功", "新品ポンプの生産能力が月300台に到達"] },
      { year: "2021", items: ["シリーズA資金調達を完了", "半導体市場に正式参入"] },
      { year: "2020", items: ["小ロット検証に合格"] },
      { year: "2019", items: ["GHCシリーズの検証に合格・小ロット出荷", "華東地域で部品再生・真空ポンプ保守事業が加速"] },
      { year: "2018", items: ["複数のソフトウェア著作権を取得", "DP制御システムの開発に成功", "GHCシリーズの顧客デモ"] },
      { year: "2017", items: ["GHC・MBシリーズの開発に成功", "新型ディスプレイ・半導体の過酷プロセスに参入"] },
      { year: "2016", items: ["無錫生産拠点を設立", "華中地域で真空ポンプ保守事業を拡大", "DPの顧客プロセスデモを開始"] },
      { year: "2015", items: ["主要部品の開発に成功し、自社開発を開始"] },
      { year: "2012", items: ["会社設立、貿易事業とブランド真空ポンプの保守サービスを開始"] },
    ],
    basesTitle: "生産・R&D・サービス拠点",
    basesSummary: "中国本土と日本・シンガポールに4大生産拠点・4大R&D拠点・7大運用サービスセンターを展開し、総工場面積は60,000㎡を超えます。",
    basesCols: ["地域", "役割", "状況"],
    bases: [
      { loc: "北京（本社・亦庄）", role: "経営本部（新キャンパス建設中）・R&D本部・販売プラットフォーム・新品ポンプ／スクラバー／チラーの生産・ポンプのオーバーホール", status: "稼働中", building: false },
      { loc: "河北・廊坊", role: "生産・部品洗浄", status: "稼働中", building: false },
      { loc: "上海・閔行", role: "統合装置（一体機）のR&D・生産・ブランドポンプのオーバーホール", status: "稼働中", building: false },
      { loc: "陝西・西安", role: "分子ポンプのR&D・オーバーホール", status: "稼働中", building: false },
      { loc: "日本", role: "技術センター（2026年 子会社設立）", status: "稼働中", building: false },
      { loc: "シンガポール", role: "ポンプのオーバーホール・販売プラットフォーム、シンガポール・マレーシア向け（2026年 子会社設立）", status: "稼働中", building: false },
      { loc: "浙江・杭州", role: "新品ポンプの生産", status: "建設中", building: true },
      { loc: "湖北・武漢", role: "ポンプのオーバーホール・生産", status: "建設中", building: true },
      { loc: "四川・成都", role: "ポンプのオーバーホール", status: "建設中", building: true },
    ],
    rdTitle: "R&D体制",
    rdItems: [
      { title: "R&Dチーム", points: ["R&D人員100名以上（全従業員の16%）", "博士・准教授クラス4名", "深い業界知見と開発経験"] },
      { title: "3大R&D拠点", points: ["北京 — ドライポンプ", "上海 — 統合装置", "西安 — 分子ポンプ"] },
      { title: "技術プラットフォーム", points: ["真空原理に基づく合理的設計", "試験技術プラットフォーム", "シミュレーションプラットフォーム", "排気速度シミュレーション"] },
      { title: "IPD統合製品開発", points: ["市場ニーズに基づくイノベーション", "明確な製品ロードマップ", "安定した製品性能の確保", "開発期間の短縮・製品投入の加速"] },
      { title: "4-in-1 一貫R&D体制", points: ["自社独自のR&D", "大学との共同研究", "精密デジタル・インテリジェント加工", "専門的な試験・分析"] },
    ],

    faqTitle: "よくある質問",
    ctaTitle: "Grand Hitek真空ポンプのお問い合わせ",
    ctaDesc: "適用プロセス、必要な排気速度、プロセスガス条件をお知らせいただければ、OHI Techが最適なモデル選定とお見積りをサポートします。",
  },
};

/* ─────────────────────────────────────────────
   SMALL PIECES
───────────────────────────────────────────── */

function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{title}</h2>
      {sub && <p className="text-sm text-slate-500 leading-relaxed max-w-3xl">{sub}</p>}
    </div>
  );
}

function Dot({ on }: { on: Ch }) {
  // 빈 칸에 sr-only(position:absolute)를 두면 가로 스크롤 박스 밖으로 새어 모바일 페이지 폭을 넓힌다 — 아무것도 그리지 않는다.
  return on ? <span className="text-[var(--accent)]">●</span> : null;
}

function Bar({ value, max, highlight, label, display, wide }: { value: number; max: number; highlight: boolean; label: string; display: string; wide?: boolean }) {
  const pct = Math.max(4, Math.round((value / max) * 100));
  return (
    <div className="flex items-center gap-2">
      <span className={`w-10 shrink-0 text-xs font-semibold ${highlight ? "text-[var(--accent)]" : "text-slate-500"}`}>{label}</span>
      <div className="flex-1 min-w-0 h-5 bg-slate-100 rounded">
        <div className={`h-5 rounded ${highlight ? "bg-[var(--accent)]" : "bg-slate-300"}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`${wide ? "w-24 text-[11px]" : "w-10 text-xs"} shrink-0 text-right tabular-nums ${highlight ? "font-semibold text-[var(--accent)]" : "text-slate-600"}`}>{display}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function GrandhitekSection({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const faqs = FAQ_GRANDHITEK[locale];
  const inquiryHref = `/contact?lang=${locale}&type=inquiry&category=${SLUG}`;
  const quoteHref = `/contact?lang=${locale}&type=quote&category=${SLUG}`;
  // 드라이 펌프 산업 필터 — SSR·첫 렌더는 항상 «전체»(하이드레이션 일치), 마운트 뒤 ?industry= 를 읽는다.
  const [industry, setIndustry] = useState<IndustryId | "all">("all");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("industry");
    if (q && INDUSTRIES.some((i) => i.id === q)) setIndustry(q as IndustryId);
  }, []);
  const selectIndustry = (id: IndustryId | "all") => {
    setIndustry(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("industry");
    else url.searchParams.set("industry", id);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };
  const visibleSeries = industry === "all" ? DRY_SERIES : DRY_SERIES.filter((s) => c.indSeries[industry][s.id]);
  const activeInd = industry === "all" ? null : INDUSTRIES.find((i) => i.id === industry) ?? null;

  const industryButtons = (
    <div role="group" aria-label={c.indFilter.label} className="flex flex-wrap items-center gap-2 mb-3">
      {(["all", ...INDUSTRIES.map((i) => i.id)] as (IndustryId | "all")[]).map((id) => {
        const on = industry === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={on}
            onClick={() => selectIndustry(id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              on ? "bg-[var(--accent)] text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {id === "all" ? c.indFilter.all : c.indFilter.tabs[id]}
          </button>
        );
      })}
    </div>
  );

  const powerMax = Math.max(...POWER_KW.map((r) => r.sgm));
  const costMax = Math.max(...COST_RMB.map((r) => r.sgm));

  return (
    <div className="overflow-x-hidden">
      {/* ══ HEADER ══ */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 min-w-0">
              <Image src={`${IMG}/logo.webp`} alt="Grand Hitek 通嘉科技" width={434} height={158} className="h-12 w-auto mb-5" />
              <p className="text-[var(--accent)] text-xs font-semibold tracking-widest uppercase mb-3">{c.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{c.title}</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">{c.lead}</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 border border-green-200 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  {c.badge}
                </span>
                <Link href={inquiryHref} className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white px-5 py-2.5 text-sm font-semibold transition-colors">
                  {c.ctaInquiry}
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2">
              <Image
                src="/images/categories/vacuum-pump.jpg"
                alt={`Grand Hitek GLR · GMR · GHC · GS — ${c.title}`}
                width={1200}
                height={630}
                priority
                className="w-full h-auto rounded-xl border border-slate-100"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-px bg-slate-200 border border-slate-200">
            {c.stats.map((s) => (
              <div key={s.value} className="bg-white p-4 min-w-0">
                <dt className="text-xl md:text-2xl font-black text-[var(--primary)] tabular-nums">{s.value}</dt>
                <dd className="text-xs text-slate-500 mt-1 leading-snug">{s.label}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label={c.title} className="mt-8 flex flex-wrap gap-2">
            {ANCHORS.map((a) => (
              <a key={a} href={`#${a}`} className="text-xs px-3 py-1.5 border border-slate-200 text-slate-600 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                {c.nav[a]}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ══ INDUSTRIES ══ */}
      <section id="industries" className="scroll-mt-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.indTitle} sub={c.indSub} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INDUSTRIES.map((ind, idx) => {
              const d = c.ind[ind.id];
              return (
                <article key={ind.id} className={`border border-slate-200 rounded-xl overflow-hidden flex flex-col min-w-0 ${idx === INDUSTRIES.length - 1 && INDUSTRIES.length % 2 === 1 ? "md:col-span-2" : ""}`}>
                  {ind.img ? (
                    <div className="relative h-36">
                      <Image src={ind.img.src} alt={d.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                        <h3 className="text-xl font-black text-white drop-shadow">{d.name}</h3>
                        {d.share && <span className="text-[11px] font-bold bg-white/90 text-[var(--primary)] px-2 py-0.5 text-right">{d.share}</span>}
                      </div>
                    </div>
                  ) : (
                    <div className="h-20 bg-[var(--primary)] flex items-end px-4 pb-3">
                      <h3 className="text-xl font-black text-white">{d.name}</h3>
                    </div>
                  )}
                  <div className="p-5 flex flex-col gap-3 flex-1 min-w-0">
                    {d.processes.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-slate-500 mb-1.5">{c.indLbl.processes}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {d.processes.map((x) => (
                            <span key={x} className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700">{x}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 mb-1.5">{c.indLbl.recommended}</p>
                      <dl className="space-y-1.5 text-xs">
                        {d.rows.map((r) => (
                          <div key={r.label + r.text} className="flex gap-3">
                            <dt className="w-24 shrink-0 font-bold text-[var(--primary)]">{r.label}</dt>
                            <dd className="text-slate-600 leading-relaxed min-w-0">{r.text}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    {d.note && <p className="text-[11px] text-slate-500 leading-relaxed mt-auto pt-2 border-t border-slate-100">{d.note}</p>}
                    {ind.anchor && (
                      <a href={`#${ind.anchor}`} className="text-xs font-semibold text-[var(--accent)] hover:underline">
                        {c.nav[ind.anchor]} ↓
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ DRY PUMPS ══ */}
      <section id="dry-pumps" className="scroll-mt-20 bg-[var(--bg-alt)] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.dryTitle} sub={c.drySub} />
          {industryButtons}
          <p className="text-xs text-slate-500 mb-6" aria-live="polite">
            <span data-series-count={visibleSeries.length}>{c.indFilter.count(visibleSeries.length)}</span>
            {activeInd && c.ind[activeInd.id].share && <span> · {c.ind[activeInd.id].share}</span>}
            {activeInd && (
              <>
                {" · "}
                <a href="#selection" className="font-semibold text-[var(--accent)] hover:underline">{c.selTitle} ↓</a>
              </>
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {visibleSeries.map((s) => (
              <article key={s.id} id={`series-${s.id}`} className="scroll-mt-20 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col min-w-0">
                <div className="h-48 bg-white flex items-center justify-center p-4 border-b border-slate-100">
                  <Image
                    src={s.img.src}
                    alt={`Grand Hitek ${s.name} series dry vacuum pump`}
                    width={s.img.w}
                    height={s.img.h}
                    className="max-h-full w-auto object-contain"
                    sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw"
                  />
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-2xl font-black text-slate-900">{s.name}</h3>
                    <span className="text-xs font-bold text-[var(--accent)] tabular-nums text-right">{s.speed}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.seriesDesc[s.id]}</p>
                  <dl className="text-xs space-y-2 mt-1">
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-slate-400">{c.lbl.mech}</dt>
                      <dd className="text-slate-800 font-medium min-w-0">{c.mech[s.mech]}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-slate-400">{c.lbl.grade}</dt>
                      <dd className="text-slate-800 min-w-0">
                        {s.grades.map((g) => c.grade[g]).join(" · ")}
                        {s.id === "ghr" && " · H₂"}
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-slate-400">{c.lbl.models}</dt>
                      <dd className="text-slate-800 min-w-0 break-words">{s.models.join(" · ")}</dd>
                    </div>
                    {s.id === "glr" && (
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-slate-400">GLR-P</dt>
                        <dd className="text-slate-800 min-w-0 break-words">{c.glrP}</dd>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-slate-400">{c.lbl.markets}</dt>
                      <dd className="text-slate-800 min-w-0">{c.seriesMarkets[s.id]}</dd>
                    </div>
                    {c.seriesOptions[s.id] && (
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-slate-400">{c.lbl.options}</dt>
                        <dd className="text-slate-800 min-w-0">{c.seriesOptions[s.id]}</dd>
                      </div>
                    )}
                  </dl>
                  <div className="mt-auto pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-500 mb-1.5">
                      {industry === "all" ? c.lbl.best : c.indFilter.procLabel(c.indFilter.tabs[industry])}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(industry === "all" ? s.best ?? [c.gsBest] : c.indSeries[industry][s.id] ?? []).map((p) => (
                        <span key={p} className="text-[11px] px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--primary)] font-medium">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS SELECTION ══ */}
      <section id="selection" className="scroll-mt-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.selTitle} sub={c.selSub} />
          {industryButtons}
          {(industry === "all" ? INDUSTRIES.map((i) => i.id) : [industry]).map((id) => (
            <div key={id} className="mt-6" data-rec-industry={id}>
              {industry === "all" && <h3 className="text-base font-black text-slate-900 mb-3 pl-3 border-l-4 border-[var(--accent)]">{c.ind[id].name}</h3>}
              {id === "semi" ? (
                <>
                  <div className="relative overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full min-w-[720px] text-sm" data-rec-rows={PROCESS_TABLE.length}>
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                          {c.selCols.map((h, i) => (
                            <th key={h} scope="col" className={`font-semibold py-3 px-3 ${i < 2 ? "text-left" : "text-center"} whitespace-nowrap`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {PROCESS_TABLE.map((r, i) => {
                          const groupStart = i > 0 && PROCESS_TABLE[i - 1].series !== r.series;
                          return (
                            <tr key={`${r.series}-${r.process}`} className={`border-b border-slate-100 last:border-0 ${groupStart ? "border-t-2 border-t-slate-200" : ""}`}>
                              <th scope="row" className="text-left font-medium text-slate-800 py-2.5 px-3 whitespace-nowrap">
                                {r.process}
                                {r.fab68 && <span className="ml-1 text-[10px] text-slate-400">(6·8&quot;)</span>}
                              </th>
                              <td className="py-2.5 px-3 font-bold text-[var(--primary)]">{r.series}</td>
                              <td className="py-2.5 px-3 text-center"><Dot on={r.cond} /></td>
                              <td className="py-2.5 px-3 text-center"><Dot on={r.corr} /></td>
                              <td className="py-2.5 px-3 text-center"><Dot on={r.dust} /></td>
                              <td className="py-2.5 px-3 text-center"><Dot on={r.heat} /></td>
                              <td className="py-2.5 px-3 text-center"><Dot on={r.comb} /></td>
                              <td className="py-2.5 px-3 text-center"><Dot on={r.h2} /></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">{c.recLbl.dot} · {c.selNote}</p>
                  <h3 className="text-lg font-black text-slate-900 mt-12 mb-4">{c.etchTitle}</h3>
                  <div className="relative overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full min-w-[640px] text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                          {c.etchCols.map((h) => (
                            <th key={h} scope="col" className="text-left font-semibold py-3 px-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {c.etchRows.map((r) => (
                          <tr key={r.process} className="border-b border-slate-100 last:border-0">
                            <th scope="row" className="text-left font-medium text-slate-800 py-3 px-4 whitespace-nowrap">{r.process}</th>
                            <td className="py-3 px-4 text-slate-600">{r.issue}</td>
                            <td className="py-3 px-4 text-slate-600">{r.solution}</td>
                            <td className="py-3 px-4 font-semibold text-[var(--primary)] whitespace-nowrap">{r.model}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full min-w-[560px] text-sm" data-rec-rows={c.rec[id].rows.length}>
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                          <th scope="col" className="text-left font-semibold py-3 px-3 whitespace-nowrap">{c.rec[id].application ? c.recLbl.application : c.recLbl.process}</th>
                          <th scope="col" className="text-left font-semibold py-3 px-3 whitespace-nowrap">{c.recLbl.series}</th>
                          {c.rec[id].cols.map((k) => (
                            <th key={k} scope="col" className="text-center font-semibold py-3 px-3 whitespace-nowrap">{c.ch[k]}</th>
                          ))}
                          {c.rec[id].rows.some((r) => r.note) && <th scope="col" className="text-left font-semibold py-3 px-3 whitespace-nowrap">{c.recLbl.note}</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {c.rec[id].rows.map((r, i, rows) => (
                          <tr key={r.process + r.series} className={`border-b border-slate-100 last:border-0 ${i > 0 && rows[i - 1].series !== r.series ? "border-t-2 border-t-slate-200" : ""}`}>
                            <th scope="row" className="text-left font-medium text-slate-800 py-2.5 px-3">{r.process}</th>
                            <td className="py-2.5 px-3 font-bold text-[var(--primary)] whitespace-nowrap">{r.series}</td>
                            {c.rec[id].cols.map((k) => (
                              <td key={k} className="py-2.5 px-3 text-center"><Dot on={r.marks?.includes(k) ? 1 : 0} /></td>
                            ))}
                            {c.rec[id].rows.some((x) => x.note) && <td className="py-2.5 px-3 text-slate-600">{r.note}</td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {c.rec[id].cols.length > 0 && <p className="text-xs text-slate-500 mt-3">{c.recLbl.dot}</p>}
                  {c.ind[id].note && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{c.ind[id].note}</p>}
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ INTEGRATED SYSTEMS ══ */}
      <section id="systems" className="scroll-mt-20 bg-[var(--bg-alt)] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.sysTitle} sub={c.sysSub} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SYSTEMS.map((sys) => (
              <article key={sys.id} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col min-w-0">
                <div className="h-40 flex items-center justify-center mb-4">
                  <Image
                    src={sys.img.src}
                    alt={`Grand Hitek ${sys.name} integrated vacuum system`}
                    width={sys.img.w}
                    height={sys.img.h}
                    className="max-h-full w-auto object-contain"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
                  />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  {sys.name} <span className="text-sm font-semibold text-slate-400">{sys.zh}</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">{c.sysDesc[sys.id]}</p>
                {sys.id === "alioth" && <p className="text-[11px] text-[var(--primary)] font-semibold mt-3 leading-relaxed">{c.aliothFigures}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MOLECULAR PUMPS ══ */}
      <section id="molecular" className="scroll-mt-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.molTitle} sub={c.molSub} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOLECULAR.map((m) => (
              <article key={m.id} className="border border-slate-200 rounded-xl p-5 flex flex-col min-w-0">
                <div className="h-36 flex items-center justify-center mb-4">
                  <Image src={m.img.src} alt={c.mol[m.id].title} width={m.img.w} height={m.img.h} className="max-h-full w-auto object-contain" sizes="(max-width: 768px) 60vw, 20vw" />
                </div>
                <h3 className="text-base font-black text-slate-900">{c.mol[m.id].title}</h3>
                <p className="text-xs font-bold text-[var(--accent)] mt-1 tabular-nums">{m.speed}</p>
                <p className="text-[11px] text-slate-500 mt-1 break-words">{m.models}</p>
                <p className="text-xs text-slate-600 leading-relaxed mt-3">{c.mol[m.id].desc}</p>
              </article>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">{c.molPower}</p>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section id="services" className="scroll-mt-20 bg-[var(--bg-alt)] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.svcTitle} sub={c.svcSub} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.svc.map((sv, i) => {
              const img = SERVICE_IMG[i];
              return (
                <article key={sv.title} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col min-w-0">
                  {img ? (
                    <Image src={img.src} alt={sv.title} width={img.w} height={img.h} className="w-full h-36 object-cover" sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw" />
                  ) : (
                    <div className="h-36 bg-[var(--primary)] flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-14 h-14 text-white/70" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                      </svg>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-sm font-black text-slate-900 mb-2">{sv.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{sv.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ REFERENCES ══ */}
      <section id="references" className="scroll-mt-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.refTitle} sub={c.refSub} />
          <div className="relative overflow-x-auto border border-slate-200 rounded-xl bg-white">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  {c.refCols.map((h, i) => (
                    <th key={h} scope="col" className={`font-semibold py-3 px-4 ${i >= 2 ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {KEY_CUSTOMERS.map((r) => (
                  <tr key={r.name} className="border-b border-slate-100 last:border-0">
                    <th scope="row" className="text-left font-bold text-slate-900 py-3 px-4 whitespace-nowrap">{r.name}</th>
                    <td className="py-3 px-4 text-slate-600">{r.process}</td>
                    <td className="py-3 px-4 text-right font-semibold text-[var(--primary)] tabular-nums">{r.units}</td>
                    <td className="py-3 px-4 text-right font-semibold text-[var(--primary)] tabular-nums">{r.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">{c.refMaskNote}</p>

          <h3 className="text-lg font-black text-slate-900 mt-12 mb-1">{c.ibTitle}</h3>
          <p className="text-sm text-slate-500 mb-5">{c.ibSub}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {INSTALL_BASE.map((ib) => {
              const name = typeof ib.customer === "string" ? ib.customer : ib.customer[locale];
              const hasRowQty = ib.rows.some((r) => r.qty);
              return (
                <div key={name} className="bg-[var(--bg-alt)] border border-slate-200 rounded-xl p-4 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-3">
                    <p className="font-black text-slate-900">{name}</p>
                    {ib.qty && <p className="text-sm font-bold text-[var(--accent)] tabular-nums whitespace-nowrap">{ib.qty} {c.units}</p>}
                  </div>
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-200">
                        <th scope="col" className="text-left font-medium pb-1.5 pr-2">{c.ibCols[0]}</th>
                        <th scope="col" className="text-left font-medium pb-1.5 pr-2">{c.ibCols[1]}</th>
                        <th scope="col" className="text-right font-medium pb-1.5">{c.ibCols[2]}</th>
                        {hasRowQty && <th scope="col" className="text-right font-medium pb-1.5 pl-2">{c.ibCols[3]}</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {ib.rows.map((r, i) => (
                        <tr key={i} className="border-b border-slate-100 last:border-0 align-top">
                          <td className="py-1.5 pr-2 font-semibold text-slate-700 whitespace-nowrap">{r.module}</td>
                          <td className="py-1.5 pr-2 text-slate-600 break-words">{r.models}</td>
                          <td className="py-1.5 text-right tabular-nums text-slate-800 whitespace-nowrap">{r.hours}</td>
                          {hasRowQty && <td className="py-1.5 pl-2 text-right tabular-nums text-slate-800">{r.qty}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══ ENERGY ══ */}
      <section id="energy" className="scroll-mt-20 bg-[var(--bg-alt)] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.energyTitle} sub={c.energySub} />
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 mb-4">{c.powerTitle}</h3>
              <div className="space-y-5">
                {POWER_KW.map((r) => (
                  <div key={r.cls}>
                    <p className="text-xs font-semibold text-slate-500 mb-2">{c.cls(r.cls)}</p>
                    <div className="space-y-1.5">
                      <Bar value={r.gmr} max={powerMax} highlight label="GMR" display={r.gmr.toFixed(1)} />
                      <Bar value={r.ixm} max={powerMax} highlight={false} label="iXM" display={r.ixm.toFixed(1)} />
                      <Bar value={r.sgm} max={powerMax} highlight={false} label="SGM" display={r.sgm.toFixed(1)} />
                    </div>
                  </div>
                ))}
              </div>
              <ul className="mt-5 space-y-1 text-sm font-semibold text-[var(--primary)]">
                {c.powerHighlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 mb-4">{c.costTitle}</h3>
              <div className="space-y-5">
                {COST_RMB.map((r) => (
                  <div key={r.cls}>
                    <p className="text-xs font-semibold text-slate-500 mb-2">{c.cls(r.cls)}</p>
                    <div className="space-y-1.5">
                      <Bar value={r.gmr} max={costMax} highlight label="GMR" display={money(locale, r.gmr, "bar")} wide />
                      <Bar value={r.ixm} max={costMax} highlight={false} label="iXM" display={money(locale, r.ixm, "bar")} wide />
                      <Bar value={r.sgm} max={costMax} highlight={false} label="SGM" display={money(locale, r.sgm, "bar")} wide />
                    </div>
                  </div>
                ))}
              </div>
              <ul className="mt-5 space-y-1 text-sm font-semibold text-[var(--primary)]">
                {c.costHighlights.map((h) => <li key={h}>{fxText(locale, h)}</li>)}
              </ul>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4 leading-relaxed">{fxText(locale, c.conditions)}</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{c.energySource}</p>
        </div>
      </section>

      {/* ══ TECHNOLOGY ══ */}
      <section id="technology" className="scroll-mt-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.techTitle} sub={c.techSub} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.techItems.map((it) => (
              <div key={it.title} className="border border-slate-200 rounded-xl p-5 flex gap-4 min-w-0">
                {it.img && (
                  <div className="w-24 h-20 shrink-0 flex items-center justify-center">
                    <Image src={it.img.src} alt={it.title} width={it.img.w} height={it.img.h} className="max-h-full w-auto object-contain" sizes="96px" />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{it.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-black text-slate-900 mt-12 mb-4">{c.challengeTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.challenges.map((ch) => (
              <div key={ch.title} className="bg-[var(--bg-alt)] border border-slate-200 rounded-xl p-5">
                <p className="text-sm font-bold text-slate-900 mb-2">{ch.title}</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  {ch.items.map((x) => <li key={x}>— {x}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1">{c.keyChallengesLabel}</span>
            {c.keyChallenges.map((x) => (
              <span key={x} className="text-xs px-3 py-1 bg-[var(--primary)] text-white">{x}</span>
            ))}
          </div>

          <h3 className="text-lg font-black text-slate-900 mt-12 mb-4">{c.appTitle}</h3>
          <div className="relative overflow-x-auto border border-slate-200 rounded-xl bg-white">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  {c.appCols.map((h) => (
                    <th key={h} scope="col" className="text-left font-semibold py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.appRows.map((r) => (
                  <tr key={r.challenge} className="border-b border-slate-100 last:border-0 align-top">
                    <th scope="row" className="text-left font-medium text-slate-800 py-3 px-4 w-1/3">{r.challenge}</th>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{r.process}</td>
                    <td className="py-3 px-4 text-slate-600">{r.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-4 grid md:grid-cols-3 gap-3">
            {c.paramNotes.map((n) => (
              <li key={n} className="text-xs text-slate-700 bg-[var(--bg-alt)] border-l-2 border-[var(--accent)] px-3 py-2">{n}</li>
            ))}
          </ul>

          <h3 className="text-lg font-black text-slate-900 mt-12 mb-1">{c.conceptTitle}</h3>
          <p className="text-sm text-slate-500 mb-4">{c.conceptLead}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {c.concepts.map((cp) => (
              <div key={cp.title} className="border border-slate-200 rounded-xl p-4 min-w-0">
                <p className="text-sm font-black text-[var(--primary)] mb-1">{cp.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{cp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NAMING & CATALOG ══ */}
      <section id="catalog" className="scroll-mt-20 bg-[var(--bg-alt)] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.namingTitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <div className="bg-[var(--primary)] text-white rounded-xl flex items-center justify-center py-6 lg:py-0">
              <span className="text-5xl font-black">G</span>
            </div>
            {c.namingSlots.map((slot, i) => (
              <div key={slot.label} className="bg-white border border-slate-200 rounded-xl p-4 min-w-0">
                <p className="text-[11px] font-bold text-[var(--accent)] mb-1">{i + 1}</p>
                <p className="text-sm font-bold text-slate-900 mb-2">{slot.label}</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  {slot.values.map((v) => <li key={v}>{v}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-700 mt-4 font-medium">{c.namingExample}</p>

          <div className="mt-14">
            <SectionHead title={c.catalogTitle} sub={c.catalogSub} />
            <div className="relative overflow-x-auto border border-slate-200 rounded-xl bg-white">
              <table className="w-full min-w-[860px] text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    {c.catCols.map((h) => (
                      <th key={h} scope="col" className="text-left font-semibold py-3 px-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CATALOG.map((r) => (
                    <tr key={r.model} className="border-b border-slate-100 last:border-0">
                      <td className="py-2.5 px-3 text-xs text-slate-500">{r.duty}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800 whitespace-nowrap">{r.set ? c.pumpSet : r.series}</td>
                      <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">{c.mech[r.mech]}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-slate-800">{r.speed}</td>
                      <th scope="row" className="text-left py-2.5 px-3 font-bold text-[var(--primary)]">{r.model}</th>
                      <td className="py-2.5 px-3 text-xs text-slate-500">{r.ed}</td>
                      <td className="py-2.5 px-3 text-xs text-slate-500">{r.eb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">{c.catNote}</p>
          </div>
        </div>
      </section>

      {/* ══ CERTIFICATIONS & QUALIFICATIONS ══ */}
      <section id="certifications" className="scroll-mt-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.certTitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["semi", "naeu", "system"] as const).map((g) => (
              <div key={g} className="border border-slate-200 rounded-xl p-5">
                <p className="text-sm font-bold text-slate-900 mb-3">{c.certGroups[g]}</p>
                <div className="flex flex-wrap gap-2">
                  {CERTS[g].map((x) => (
                    <span key={x} className="text-xs font-semibold px-2.5 py-1 border border-slate-200 text-slate-700">{x}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-black text-slate-900 mt-10 mb-4">{c.honorsTitle}</h3>
          <ul className="grid md:grid-cols-2 gap-3">
            {c.honors.map((h) => (
              <li key={h} className="text-xs text-slate-700 bg-[var(--bg-alt)] border-l-2 border-[var(--accent)] px-3 py-2.5 leading-relaxed">{h}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ COMPANY ══ */}
      <section id="company" className="scroll-mt-20 bg-[var(--bg-alt)] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.companyTitle} sub={c.companyLead} />

          <h3 className="text-lg font-black text-slate-900 mb-4">{c.historyTitle}</h3>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {c.history.map((h) => (
              <li key={h.year} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-4 min-w-0">
                <span className="w-12 shrink-0 text-lg font-black text-[var(--accent)] tabular-nums">{h.year}</span>
                <ul className="text-xs text-slate-600 space-y-1 leading-relaxed min-w-0">
                  {h.items.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </li>
            ))}
          </ol>

          <h3 className="text-lg font-black text-slate-900 mt-12 mb-2">{c.basesTitle}</h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">{c.basesSummary}</p>
          <div className="relative overflow-x-auto border border-slate-200 rounded-xl bg-white">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  {c.basesCols.map((h) => (
                    <th key={h} scope="col" className="text-left font-semibold py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.bases.map((b) => (
                  <tr key={b.loc} className="border-b border-slate-100 last:border-0 align-top">
                    <th scope="row" className="text-left font-semibold text-slate-800 py-3 px-4 whitespace-nowrap">{b.loc}</th>
                    <td className="py-3 px-4 text-slate-600">{b.role}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 border ${b.building ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-green-50 text-green-700 border-green-200"}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-black text-slate-900 mt-12 mb-4">{c.rdTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {c.rdItems.map((rd) => (
              <div key={rd.title} className="bg-white border border-slate-200 rounded-xl p-4 min-w-0">
                <p className="text-sm font-bold text-slate-900 mb-2">{rd.title}</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  {rd.points.map((p) => <li key={p}>— {p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" className="scroll-mt-20 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHead title={c.faqTitle} />
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-[var(--bg-alt)] border border-slate-200 rounded-xl">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 p-5">
                  <span className="text-sm font-bold text-slate-900">{f.q}</span>
                  <span className="text-slate-400 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{c.ctaTitle}</h2>
          <p className="text-white/70 text-sm mb-8 max-w-xl mx-auto">{c.ctaDesc}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href={inquiryHref} className="bg-white text-[var(--primary)] hover:bg-gray-50 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg">
              {c.ctaInquiry}
            </Link>
            <Link href={quoteHref} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors">
              {c.ctaQuote}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
