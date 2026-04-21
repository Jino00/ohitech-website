"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";

/* ─────────────────────────────────────────────
   EQUIPMENT COLORS (for interactive product section)
───────────────────────────────────────────── */
const EQUIP_COLOR: Record<string, string> = {
  lam:    "bg-[var(--primary)]",
  amat:   "bg-[var(--primary)]",
  tel:    "bg-[var(--primary)]",
  axcelis:"bg-[var(--primary)]",
};

const EQUIP_ABBR: Record<string, string> = {
  lam:    "LAM",
  amat:   "AMAT",
  tel:    "TEL",
  axcelis:"AXC",
};

/* ─────────────────────────────────────────────
   STATIC CONTENT
───────────────────────────────────────────── */

const LANG = {
  ko: {
    hero: {
      eyebrow: "DT ENG 공식 공급 파트너 · OHI Tech 국내 파트너",
      headline: "반도체 공정을\n지탱하는 척.",
      sub: "정전척(ESC) 전문 제조·수리 — Etch·CVD·Implant 공정 Lam·AMAT·TEL·Axcelis 장비 대응",
      cta1: "수리·도입 문의",
      cta2: "기술 자료 요청",
      stats: [
        { value: "9년차", label: "전문 업력" },
        { value: "312억+", label: "연 매출 (원)" },
        { value: "20단계", label: "표준 작업 프로세스" },
        { value: "4대 OEM", label: "Lam·AMAT·TEL·Axcelis" },
      ],
    },
    services: {
      title: "DT ENG 3대 핵심 서비스",
      items: [
        { key: "01", label: "ESC 제조", desc: "Coating Type · Plate Type 정전척 신규 제조. 고객 사양 맞춤 설계 지원." },
        { key: "02", label: "ESC 수리", desc: "20단계 표준 작업프로세스 기반 체계적 리페어. 품질 검증 완료 후 출고." },
        { key: "03", label: "특수 코팅", desc: "히터 본딩 · 플레이트 본딩 · 용사 코팅(Thermal Spray). 내화학·내마모 표면 처리." },
      ],
    },
    productNav: "장비별 호환 ESC",
    products: [
      {
        id: "lam",
        name: "Lam Research",
        nameEn: "Lam Research — Kiyo · Flex · Versys",
        color: "bg-[var(--primary)]",
        tagline: "Kiyo · Flex · 2300 Versys · TCP · Coronus",
        escType: "Coating Type / Plate Type",
        desc: "Lam Research Etch 장비(Kiyo, Flex, 2300 Versys) 및 CVD 장비 전용 ESC. 고정밀 표면 처리와 히터 본딩 기술로 장비 성능 최적화 유지.",
        processes: ["Dielectric Etch", "Conductor Etch", "Bevel Etch", "PECVD"],
        models: [
          { model: "Kiyo ESC", spec: "Lam Kiyo 호환 · Coating Type · Etch 전용" },
          { model: "Flex ESC", spec: "Lam Flex 호환 · Plate Type · Conductor Etch" },
          { model: "Versys ESC", spec: "2300 Versys 호환 · Coating Type" },
        ],
      },
      {
        id: "amat",
        name: "Applied Materials",
        nameEn: "Applied Materials (AMAT) — Centura · Vantage · Endura",
        color: "bg-[var(--primary)]",
        tagline: "Centura · Vantage · Endura · Producer",
        escType: "Plate Type / Coating Type",
        desc: "Applied Materials(AMAT) Centura Etch, HDP-CVD, Vantage Implant 장비 호환 ESC. 다양한 공정 조건에 맞춘 최적화 설계.",
        processes: ["Metal Etch", "HDP-CVD", "Ion Implant", "PVD"],
        models: [
          { model: "Centura Etch ESC", spec: "AMAT Centura Etch 호환 · Plate Type" },
          { model: "Vantage ESC", spec: "AMAT Vantage Implant 호환 · 고전압 설계" },
          { model: "HDP-CVD ESC", spec: "HDP-CVD 고온 공정 대응 · 내열 설계" },
        ],
      },
      {
        id: "tel",
        name: "TEL (Tokyo Electron)",
        nameEn: "Tokyo Electron (TEL) — Tactras · Trias · Vigus",
        color: "bg-[var(--primary)]",
        tagline: "Tactras · Trias · Vigus · Certas",
        escType: "Plate Type",
        desc: "TEL(도쿄일렉트론) Tactras Etch 및 Trias CVD 장비 전용 ESC. Plate Type 중심으로, 일본 장비 규격에 최적화된 정밀 제조.",
        processes: ["Oxide Etch", "Poly Etch", "CVD", "ALD"],
        models: [
          { model: "Tactras ESC", spec: "TEL Tactras 호환 · Plate Type · Oxide/Poly Etch" },
          { model: "Trias ESC", spec: "TEL Trias CVD 호환 · 고온 안정성" },
          { model: "Vigus ESC", spec: "TEL Vigus 호환 · ALD 공정 대응" },
        ],
      },
      {
        id: "axcelis",
        name: "Axcelis Technologies",
        nameEn: "Axcelis Technologies — Purion · Optima",
        color: "bg-[var(--primary)]",
        tagline: "Purion H · Purion M · Optima XE",
        escType: "Plate Type",
        desc: "Axcelis Ion Implant 장비(Purion, Optima) 전용 ESC. 이온 주입 공정의 고전압·고온 환경에서 웨이퍼를 안정적으로 고정.",
        processes: ["Ion Implant (H-dose)", "Ion Implant (M-dose)", "High Energy Implant"],
        models: [
          { model: "Purion H ESC", spec: "Axcelis Purion H 호환 · 고전압 설계" },
          { model: "Purion M ESC", spec: "Axcelis Purion M 호환 · 중이온 최적화" },
          { model: "Optima XE ESC", spec: "Optima XE 호환 · 고에너지 이온 대응" },
        ],
      },
    ],
    structureTitle: "ESC 구조 및 원리",
    structureSub: "ESC(Electro-Static Chuck)의 7개 핵심 구성 요소와 작동 원리",
    structureComponents: [
      { no: "01", name: "Body", desc: "ESC의 기본 구조를 이루는 중심 부분. 전체 장치를 안정적으로 지지." },
      { no: "02", name: "히터 본딩층", desc: "히터를 바디에 결합시키는 층. 히터의 안정적 부착 보장." },
      { no: "03", name: "히터 (Heater)", desc: "전자장을 생성해 ESC 표면을 가열. 웨이퍼 온도 조절 담당." },
      { no: "04", name: "AL 플레이트", desc: "알루미늄 소재로 안정적이고 효율적인 열 전도성 제공." },
      { no: "05", name: "본딩 (Bonding)", desc: "표면의 다양한 층을 결합하는 과정. 결합 안정성 확보." },
      { no: "06", name: "DC 전극", desc: "전압 인가 시 전하를 발생시키는 부분. 웨이퍼 정전기 고정의 핵심." },
      { no: "07", name: "Plate", desc: "웨이퍼가 안착되는 ESC 표면. 특수 표면 처리 및 정밀 구조." },
    ],
    repairTitle: "20단계 표준 리페어 프로세스",
    repairSub: "DT ENG의 체계적 작업 표준서 기반 — Plate Type · Coating Type 이중 경로 운영",
    repairSteps: [
      { step: "0단계", name: "제품 입고", desc: "입고 제품 확인 및 접수" },
      { step: "1단계", name: "손상 분석 및 평가", desc: "손상 정도 분석 · Plate Type 결정 · 공정계획 수립" },
      { step: "2단계", name: "디본딩 / 코팅 박리", desc: "[Plate] 플레이트 본딩 해제\n[Coating] 기존 코팅 박리" },
      { step: "3단계", name: "본딩 / 용사 코팅", desc: "[Plate] 플레이트 재본딩\n[Coating] 신규 용사 코팅 적용" },
      { step: "4단계", name: "제품 가공", desc: "적정 공정 조건 구성" },
      { step: "5단계", name: "패턴 형성", desc: "정전척 기능적 패턴 형성" },
      { step: "6단계", name: "제품 세정", desc: "불순물 및 이물질 완전 제거" },
      { step: "7단계", name: "검증 및 평가", desc: "품질 검증 및 표준 부합 확인" },
      { step: "8단계", name: "포장 및 출고", desc: "완성 제품 포장 출고" },
    ],
    aboutTitle: "㈜동탄이엔지 (DT ENG) 소개",
    aboutDesc:
      "㈜동탄이엔지(DT ENG INC.)는 2016년 설립된 정전척(ESC) 전문 제조·수리 기업입니다. 경기도 화성시 동탄산업단지에 위치하며, 반도체 장비용 ESC 20단계 표준 프로세스를 기반으로 Coating Type·Plate Type 정전척을 제조·수리합니다. 창립 9년차, 연 매출 312억원 규모로 성장한 국내 ESC 전문 기업입니다.",
    aboutMission: "우리의 사명",
    missionText:
      "고도의 정밀성·품질의 신뢰성·공정의 체계성을 바탕으로 반도체 산업의 핵심 부품 경쟁력을 강화하고, 고객의 장비 성능과 수율을 극대화합니다.",
    aboutVision: "우리의 비전",
    visionText:
      "국내를 넘어 글로벌 반도체 장비 제조사와의 파트너십을 확장하여 세계적인 ESC 전문 기업으로 도약합니다.",
    whyTitle: "OHI Tech × DT ENG 파트너십",
    whys: [
      { title: "국내 공식 공급 파트너", desc: "DT ENG 한국 공식 공급 파트너. 제조사 직접 소싱, 최단 납기, 기술 지원 완비." },
      { title: "현장 기술 지원", desc: "ESC 사양 선정부터 설치, 수리 의뢰, 교체 주기 관리까지 OHI Tech 엔지니어가 전담." },
      { title: "4대 OEM 장비 대응", desc: "Lam·AMAT·TEL·Axcelis 국내 주요 반도체 팹 4대 장비 제조사 장비에 최적화된 ESC 수급 체계." },
      { title: "빠른 수리 회전", desc: "긴급 수리 의뢰 우선 처리. 최소 다운타임으로 장비 가동률 유지." },
    ],
    ctaTitle: "ESC 수리·도입을 검토 중이신가요?",
    ctaDesc: "공정 사양 분석, ESC 사양 선정, 수리 의뢰까지 OHI Tech 전문팀이 빠르게 응대합니다.",
    ctaBtn1: "지금 문의하기",
    ctaBtn2: "수리 의뢰하기",
  },
  en: {
    hero: {
      eyebrow: "DT ENG Official Supply Partner · OHI Tech Korea Distribution",
      headline: "The Chuck That\nHolds Semiconductors.",
      sub: "ESC Manufacturing & Repair — Etch·CVD·Implant Compatible with Lam·AMAT·TEL·Axcelis",
      cta1: "Request Repair / Quote",
      cta2: "Request Technical Data",
      stats: [
        { value: "9 Years", label: "Industry Expertise" },
        { value: "₩31.2B+", label: "Annual Revenue" },
        { value: "20-Step", label: "Standard Process" },
        { value: "4 OEMs", label: "Lam·AMAT·TEL·Axcelis" },
      ],
    },
    services: {
      title: "DT ENG 3 Core Services",
      items: [
        { key: "01", label: "ESC Manufacturing", desc: "New Coating & Plate Type ESC manufacturing. Custom spec design support." },
        { key: "02", label: "ESC Repair", desc: "Systematic repair based on 20-step standard process. Quality verified before delivery." },
        { key: "03", label: "Special Coating", desc: "Heater bonding · Plate bonding · Thermal Spray Coatings. Chemical & wear-resistant surface treatment." },
      ],
    },
    productNav: "Compatible ESC by Equipment",
    products: [
      {
        id: "lam",
        name: "Lam Research",
        nameEn: "Lam Research — Kiyo · Flex · Versys",
        color: "bg-[var(--primary)]",
        tagline: "Kiyo · Flex · 2300 Versys · TCP · Coronus",
        escType: "Coating Type / Plate Type",
        desc: "ESC for Lam Research Etch (Kiyo, Flex, 2300 Versys) and CVD equipment. High-precision surface treatment and heater bonding to maintain optimal equipment performance.",
        processes: ["Dielectric Etch", "Conductor Etch", "Bevel Etch", "PECVD"],
        models: [
          { model: "Kiyo ESC", spec: "Lam Kiyo compatible · Coating Type · Etch" },
          { model: "Flex ESC", spec: "Lam Flex compatible · Plate Type · Conductor Etch" },
          { model: "Versys ESC", spec: "2300 Versys compatible · Coating Type" },
        ],
      },
      {
        id: "amat",
        name: "Applied Materials",
        nameEn: "Applied Materials (AMAT) — Centura · Vantage · Endura",
        color: "bg-[var(--primary)]",
        tagline: "Centura · Vantage · Endura · Producer",
        escType: "Plate Type / Coating Type",
        desc: "ESC compatible with Applied Materials Centura Etch, HDP-CVD, and Vantage Implant equipment. Optimized design for various process conditions.",
        processes: ["Metal Etch", "HDP-CVD", "Ion Implant", "PVD"],
        models: [
          { model: "Centura Etch ESC", spec: "AMAT Centura Etch compatible · Plate Type" },
          { model: "Vantage ESC", spec: "AMAT Vantage Implant compatible · High-voltage design" },
          { model: "HDP-CVD ESC", spec: "HDP-CVD high-temp process · Heat-resistant design" },
        ],
      },
      {
        id: "tel",
        name: "TEL (Tokyo Electron)",
        nameEn: "Tokyo Electron (TEL) — Tactras · Trias · Vigus",
        color: "bg-[var(--primary)]",
        tagline: "Tactras · Trias · Vigus · Certas",
        escType: "Plate Type",
        desc: "ESC for TEL Tactras Etch and Trias CVD equipment. Plate Type focused, with precision manufacturing optimized for Japanese equipment specs.",
        processes: ["Oxide Etch", "Poly Etch", "CVD", "ALD"],
        models: [
          { model: "Tactras ESC", spec: "TEL Tactras compatible · Plate Type · Oxide/Poly Etch" },
          { model: "Trias ESC", spec: "TEL Trias CVD compatible · High-temp stability" },
          { model: "Vigus ESC", spec: "TEL Vigus compatible · ALD process" },
        ],
      },
      {
        id: "axcelis",
        name: "Axcelis Technologies",
        nameEn: "Axcelis Technologies — Purion · Optima",
        color: "bg-[var(--primary)]",
        tagline: "Purion H · Purion M · Optima XE",
        escType: "Plate Type",
        desc: "ESC for Axcelis Ion Implant equipment (Purion, Optima). Secure wafer fixation in the high-voltage, high-temperature environment of ion implantation.",
        processes: ["Ion Implant (H-dose)", "Ion Implant (M-dose)", "High Energy Implant"],
        models: [
          { model: "Purion H ESC", spec: "Axcelis Purion H compatible · High-voltage design" },
          { model: "Purion M ESC", spec: "Axcelis Purion M compatible · Medium-ion optimized" },
          { model: "Optima XE ESC", spec: "Optima XE compatible · High-energy ion" },
        ],
      },
    ],
    structureTitle: "ESC Structure & Principles",
    structureSub: "7 Key Components of ESC (Electro-Static Chuck) and Operating Principles",
    structureComponents: [
      { no: "01", name: "Body", desc: "The central structure of the ESC. Provides stability to the entire device." },
      { no: "02", name: "Heater Bonding Layer", desc: "Bonds the heater to the body, ensuring stable heater attachment." },
      { no: "03", name: "Heater", desc: "Generates electromagnetic field to heat ESC surface. Controls wafer temperature." },
      { no: "04", name: "AL Plate", desc: "Aluminum component providing stable and efficient heat conductivity." },
      { no: "05", name: "Bonding", desc: "Process of combining various layers on the surface. Ensures bond stability." },
      { no: "06", name: "DC Electrode", desc: "Generates charges when voltage is applied. Key to electrostatic wafer fixation." },
      { no: "07", name: "Plate", desc: "ESC surface where wafer is fixed. Special surface treatment and precision structure." },
    ],
    repairTitle: "20-Step Standard Repair Process",
    repairSub: "Based on DT ENG's systematic standard operating procedure — Dual path for Plate Type & Coating Type",
    repairSteps: [
      { step: "Step 0", name: "Product Reception", desc: "Confirmation of incoming products" },
      { step: "Step 1", name: "Damage Analysis", desc: "Damage level analysis · Plate Type determination · Process planning" },
      { step: "Step 2", name: "De-bonding / Stripping", desc: "[Plate] Release bonding\n[Coating] Strip existing coating" },
      { step: "Step 3", name: "Bonding / Coating", desc: "[Plate] Plate re-bonding\n[Coating] Apply new thermal spray" },
      { step: "Step 4", name: "Processing", desc: "Establish optimal process conditions" },
      { step: "Step 5", name: "Pattern Formation", desc: "Form ESC functional patterns" },
      { step: "Step 6", name: "Cleaning", desc: "Remove impurities and foreign substances" },
      { step: "Step 7", name: "Verification", desc: "Quality verification and standards compliance" },
      { step: "Step 8", name: "Packaging", desc: "Finished product packaging and delivery" },
    ],
    aboutTitle: "DT ENG Inc. (㈜동탄이엔지)",
    aboutDesc:
      "DT ENG Inc. is a specialized ESC (Electrostatic Chuck) manufacturer and repair company established in 2016 in Hwaseong, Gyeonggi-do, Korea. Based on a 20-step standard process, we manufacture and repair Coating Type and Plate Type ESCs for semiconductor equipment. Now in our 9th year with annual revenue exceeding KRW 31.2 billion.",
    aboutMission: "Our Mission",
    missionText:
      "To strengthen the competitiveness of core semiconductor components with precision, quality reliability, and systematic processes — maximizing customer equipment performance and yield.",
    aboutVision: "Our Vision",
    visionText:
      "Expanding beyond Korea to global semiconductor OEM partnerships, becoming a world-class ESC specialist company.",
    whyTitle: "OHI Tech × DT ENG Partnership",
    whys: [
      { title: "Official Supply Partner", desc: "OHI Tech is DT ENG's official Korea supply partner. Direct sourcing, shortest lead times, full technical support." },
      { title: "On-Site Technical Support", desc: "OHI Tech engineers handle ESC spec selection, installation, repair coordination, and replacement cycle management." },
      { title: "4 Major OEMs Covered", desc: "ESC supply chain optimized for Lam, AMAT, TEL, and Axcelis — the 4 major OEM platforms used in Korean fabs." },
      { title: "Fast Repair Turnaround", desc: "Priority processing for urgent repair requests. Minimum downtime to maintain equipment uptime." },
    ],
    ctaTitle: "Considering ESC Repair or New Supply?",
    ctaDesc: "OHI Tech experts respond quickly — from process spec analysis and ESC selection to repair requests.",
    ctaBtn1: "Contact Us Now",
    ctaBtn2: "Submit Repair Request",
  },
  zh: {
    hero: {
      eyebrow: "DT ENG官方供应合作伙伴 · OHI Tech韩国总代理",
      headline: "支撑半导体工艺的\n静电卡盘。",
      sub: "静电卡盘（ESC）专业制造与维修——兼容Etch·CVD·Implant工艺及Lam·AMAT·TEL·Axcelis设备",
      cta1: "维修/采购咨询",
      cta2: "申请技术资料",
      stats: [
        { value: "9年", label: "专业经验" },
        { value: "312亿+", label: "年营收（韩元）" },
        { value: "20步", label: "标准作业流程" },
        { value: "4大OEM", label: "Lam·AMAT·TEL·Axcelis" },
      ],
    },
    services: {
      title: "DT ENG三大核心服务",
      items: [
        { key: "01", label: "ESC制造", desc: "Coating Type · Plate Type新品制造。支持客户定制规格设计。" },
        { key: "02", label: "ESC维修", desc: "基于20步标准作业规程的系统化维修。质量验证完成后出货。" },
        { key: "03", label: "特殊涂层", desc: "加热器粘接 · 板材粘接 · 热喷涂（Thermal Spray）。耐化学·耐磨损表面处理。" },
      ],
    },
    productNav: "按设备型号查看兼容ESC",
    products: [
      {
        id: "lam",
        name: "Lam Research",
        nameEn: "Lam Research — Kiyo · Flex · Versys",
        color: "bg-[var(--primary)]",
        tagline: "Kiyo · Flex · 2300 Versys · TCP · Coronus",
        escType: "Coating Type / Plate Type",
        desc: "适用于Lam Research蚀刻设备（Kiyo、Flex、2300 Versys）及CVD设备的ESC。高精度表面处理与加热器粘接技术，保持设备最佳性能。",
        processes: ["介质蚀刻", "导体蚀刻", "斜边蚀刻", "PECVD"],
        models: [
          { model: "Kiyo ESC", spec: "兼容Lam Kiyo · Coating Type · 蚀刻专用" },
          { model: "Flex ESC", spec: "兼容Lam Flex · Plate Type · 导体蚀刻" },
          { model: "Versys ESC", spec: "兼容2300 Versys · Coating Type" },
        ],
      },
      {
        id: "amat",
        name: "应用材料公司",
        nameEn: "Applied Materials (AMAT) — Centura · Vantage · Endura",
        color: "bg-[var(--primary)]",
        tagline: "Centura · Vantage · Endura · Producer",
        escType: "Plate Type / Coating Type",
        desc: "兼容AMAT Centura蚀刻、HDP-CVD及Vantage离子注入设备的ESC。针对各种工艺条件优化设计。",
        processes: ["金属蚀刻", "HDP-CVD", "离子注入", "PVD"],
        models: [
          { model: "Centura蚀刻ESC", spec: "兼容AMAT Centura蚀刻 · Plate Type" },
          { model: "Vantage ESC", spec: "兼容AMAT Vantage离子注入 · 高压设计" },
          { model: "HDP-CVD ESC", spec: "适用HDP-CVD高温工艺 · 耐热设计" },
        ],
      },
      {
        id: "tel",
        name: "东京电子（TEL）",
        nameEn: "Tokyo Electron (TEL) — Tactras · Trias · Vigus",
        color: "bg-[var(--primary)]",
        tagline: "Tactras · Trias · Vigus · Certas",
        escType: "Plate Type",
        desc: "适用于TEL Tactras蚀刻及Trias CVD设备的ESC。以Plate Type为主，针对日本设备规格优化精密制造。",
        processes: ["氧化层蚀刻", "多晶硅蚀刻", "CVD", "ALD"],
        models: [
          { model: "Tactras ESC", spec: "兼容TEL Tactras · Plate Type · 氧化层/多晶硅蚀刻" },
          { model: "Trias ESC", spec: "兼容TEL Trias CVD · 高温稳定性" },
          { model: "Vigus ESC", spec: "兼容TEL Vigus · ALD工艺" },
        ],
      },
      {
        id: "axcelis",
        name: "Axcelis Technologies",
        nameEn: "Axcelis Technologies — Purion · Optima",
        color: "bg-[var(--primary)]",
        tagline: "Purion H · Purion M · Optima XE",
        escType: "Plate Type",
        desc: "适用于Axcelis离子注入设备（Purion、Optima）的专用ESC。在高压高温离子注入工艺环境中稳定固定晶圆。",
        processes: ["离子注入（高剂量）", "离子注入（中剂量）", "高能离子注入"],
        models: [
          { model: "Purion H ESC", spec: "兼容Axcelis Purion H · 高压设计" },
          { model: "Purion M ESC", spec: "兼容Axcelis Purion M · 中离子优化" },
          { model: "Optima XE ESC", spec: "兼容Optima XE · 高能离子" },
        ],
      },
    ],
    structureTitle: "ESC结构与原理",
    structureSub: "静电卡盘（ESC）的7大核心组成部件及工作原理",
    structureComponents: [
      { no: "01", name: "主体（Body）", desc: "ESC的基本结构中心部分，为整个装置提供稳定支撑。" },
      { no: "02", name: "加热器粘接层", desc: "将加热器与主体相连，确保加热器稳定附着。" },
      { no: "03", name: "加热器（Heater）", desc: "产生电磁场加热ESC表面，稳定晶圆固定并调节温度。" },
      { no: "04", name: "铝板（AL Plate）", desc: "铝制部件，提供稳定高效的导热性，优化ESC性能。" },
      { no: "05", name: "粘接（Bonding）", desc: "将表面各层结合的工艺，确保结合稳定性。" },
      { no: "06", name: "DC电极", desc: "施加电压时在表面产生电荷，是静电固定晶圆的关键。" },
      { no: "07", name: "基板（Plate）", desc: "晶圆安置的ESC表面，具有特殊表面处理和精密结构。" },
    ],
    repairTitle: "20步标准维修流程",
    repairSub: "基于DT ENG系统化作业标准——Plate Type · Coating Type双路径运营",
    repairSteps: [
      { step: "第0步", name: "产品入库", desc: "确认入库产品" },
      { step: "第1步", name: "损伤分析评估", desc: "分析损伤程度 · 确定Plate Type · 制定工艺计划" },
      { step: "第2步", name: "脱粘/剥涂", desc: "[Plate]释放粘接\n[Coating]剥除旧涂层" },
      { step: "第3步", name: "粘接/热喷涂", desc: "[Plate]重新粘接\n[Coating]施加新热喷涂层" },
      { step: "第4步", name: "产品加工", desc: "建立最优工艺条件的精密加工" },
      { step: "第5步", name: "图案形成", desc: "形成静电卡盘的功能性图案" },
      { step: "第6步", name: "产品清洗", desc: "彻底去除杂质和异物" },
      { step: "第7步", name: "检验评估", desc: "质量验证及标准合规性检查" },
      { step: "第8步", name: "包装出货", desc: "成品包装出货" },
    ],
    aboutTitle: "㈜东炭工程（DT ENG）简介",
    aboutDesc:
      "㈜东炭工程（DT ENG INC.）成立于2016年，是韩国庆畿道华城市东炭产业园区的静电卡盘（ESC）专业制造与维修企业。基于20步标准工艺，制造与维修用于半导体设备的Coating Type和Plate Type静电卡盘。公司成立9年，年营收逾312亿韩元。",
    aboutMission: "我们的使命",
    missionText:
      "以高度精密性、品质可靠性和工艺系统性为基础，强化半导体产业核心部件竞争力，最大化客户设备性能与良率。",
    aboutVision: "我们的愿景",
    visionText:
      "超越韩国市场，拓展与全球半导体设备制造商的合作，成为世界级ESC专业企业。",
    whyTitle: "OHI Tech × DT ENG 合作关系",
    whys: [
      { title: "官方供应合作伙伴", desc: "OHI Tech为DT ENG韩国官方供应合作伙伴。直接采购，最短交期，完整技术支持。" },
      { title: "现场技术支持", desc: "OHI Tech工程师全程负责ESC规格选定、安装、维修委托及更换周期管理。" },
      { title: "覆盖4大主流OEM设备", desc: "针对韩国主要晶圆厂Lam、AMAT、TEL、Axcelis四大主流设备，构建最优ESC供应体系。" },
      { title: "快速维修周转", desc: "紧急维修请求优先处理，最小化停机时间，维持设备稼动率。" },
    ],
    ctaTitle: "正在考虑ESC维修或新品采购？",
    ctaDesc: "OHI Tech专业团队快速响应——从工艺规格分析、ESC选型到维修委托一站式服务。",
    ctaBtn1: "立即联系",
    ctaBtn2: "提交维修申请",
  },
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function ESCSection({ locale }: { locale: Locale }) {
  const c = LANG[locale];
  const [activeProduct, setActiveProduct] = useState(c.products[0].id);

  const currentProduct = c.products.find((p) => p.id === activeProduct) ?? c.products[0];

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8">

      {/* ══════════════════════════════════════
          SECTION 1: HERO
      ══════════════════════════════════════ */}
      <section className="hero-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(217,119,6,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <p className="text-[var(--accent)] text-xs font-semibold tracking-widest uppercase mb-4">
            {c.hero.eyebrow}
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight whitespace-pre-line">
            {c.hero.headline}
          </h2>
          <p className="text-stone-300 text-base md:text-lg mb-10 max-w-xl">{c.hero.sub}</p>
          <div className="flex flex-wrap gap-3 mb-14">
            <Link
              href={`/contact?lang=${locale}&type=inquiry&category=esc`}
              className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=datasheet&category=esc`}
              className="border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta2}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-10 mb-14">
            {c.hero.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[var(--accent)]">{s.value}</div>
                <div className="text-stone-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* 3 Core Services */}
          <div className="border-t border-white/10 pt-10">
            <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-5">
              {c.services.title}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {c.services.items.map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center mb-3">
                    <span className="text-[var(--accent)] font-black text-sm">{item.key}</span>
                  </div>
                  <p className="text-[var(--accent)] text-[11px] font-bold mb-1">{item.label}</p>
                  <p className="text-stone-400 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2: COMPATIBLE ESC BY EQUIPMENT
      ══════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
            {locale === "ko"
              ? "장비별 호환 ESC"
              : locale === "en"
              ? "Compatible ESC by Equipment"
              : "按设备型号的ESC兼容性"}
          </h2>
          <p className="text-slate-500 text-sm mb-10">
            {locale === "ko"
              ? "고객사 장비에 최적화된 Coating Type / Plate Type ESC — 제조 및 수리 전문"
              : locale === "en"
              ? "Coating & Plate Type ESC optimized for your equipment — manufacturing and repair specialists"
              : "针对客户设备优化的Coating Type / Plate Type ESC——制造与维修专家"}
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Equipment nav */}
            <div className="lg:w-64 shrink-0">
              <div className="lg:sticky lg:top-24 space-y-1">
                {c.products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProduct(p.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                      activeProduct === p.id
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center shrink-0`}
                    >
                      <span className="text-white text-[9px] font-black">{EQUIP_ABBR[p.id]}</span>
                    </div>
                    <span className="leading-snug">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product detail */}
            <div className="flex-1 min-w-0">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 overflow-hidden">
                {/* Header */}
                <div className="relative bg-white border-b border-slate-200 p-8 overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 bottom-0 w-1.5 bg-[var(--primary)]`}
                  />
                  <div
                    className={`absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[var(--primary)] opacity-10 blur-2xl`}
                  />
                  <div className="flex items-start justify-between gap-4 pl-5">
                    <div className="flex-1">
                      <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">
                        {currentProduct.nameEn}
                      </p>
                      <h3 className="text-2xl font-black text-slate-900 mb-3">{currentProduct.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block bg-slate-900 text-white text-xs font-mono px-3 py-1 rounded-full">
                          {currentProduct.tagline}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                          {currentProduct.escType}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-28 h-28 rounded-2xl bg-[var(--primary)] flex items-center justify-center shrink-0 shadow-lg`}
                    >
                      <span className="text-white text-2xl font-black opacity-80">
                        {EQUIP_ABBR[currentProduct.id]}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm mt-5 leading-relaxed pl-5">{currentProduct.desc}</p>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      {locale === "ko" ? "ESC 모델 라인업" : locale === "en" ? "ESC Model Lineup" : "ESC型号系列"}
                    </h4>
                    <div className="space-y-3">
                      {currentProduct.models.map((item) => (
                        <div key={item.model} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                          <span className="font-mono text-xs font-bold text-slate-900 bg-white border border-slate-200 px-2 py-1 rounded-lg shrink-0 mt-0.5">
                            {item.model}
                          </span>
                          <span className="text-xs text-slate-600 leading-relaxed">{item.spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      {locale === "ko" ? "주요 적용 공정" : locale === "en" ? "Key Processes" : "主要应用工艺"}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {currentProduct.processes.map((proc) => (
                        <div key={proc} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shrink-0" />
                          {proc}
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/contact?lang=${locale}&type=quote&category=esc&equipment=${currentProduct.id}`}
                      className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                    >
                      {locale === "ko"
                        ? "이 장비용 ESC 문의"
                        : locale === "en"
                        ? "Inquire ESC for This OEM"
                        : "咨询此设备ESC"}
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3: ESC STRUCTURE
      ══════════════════════════════════════ */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{c.structureTitle}</h2>
            <p className="text-slate-500 text-sm">{c.structureSub}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* ESC structure image from DT ENG */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://dteng.kr/img/what_is_esc.png"
                    alt="ESC Cross-section Structure — DT ENG"
                    className="w-full max-w-sm object-contain"
                  />
                </div>
                <p className="text-center text-xs text-slate-400 mt-3">
                  {locale === "ko"
                    ? "ESC 단면 구조도 — ㈜동탄이엔지 (DT ENG)"
                    : locale === "en"
                    ? "ESC Cross-section — DT ENG Inc."
                    : "ESC截面结构图 — ㈜东炭工程（DT ENG）"}
                </p>
              </div>
            </div>

            {/* 7 components */}
            <div className="space-y-2">
              {c.structureComponents.map((comp, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-[var(--accent)]/30 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center shrink-0">
                    <span className="text-[var(--accent)] font-black text-xs">{comp.no}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-0.5">{comp.name}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{comp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ESC Types */}
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                  <span className="text-[var(--accent)] font-black text-sm">C</span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Type 01</p>
                  <h3 className="text-sm font-black text-slate-900">Coating Type ESC</h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === "ko"
                  ? "표면에 특수 코팅을 적용하는 형태. 강력한 고정력과 내화학적 안정성 제공. 표면 처리 공정(Etch)에 주로 적용. 용사 코팅(Thermal Spray)으로 재코팅 수리 가능."
                  : locale === "en"
                  ? "Special coating applied to surface. Provides strong adhesion and chemical stability. Primarily for surface treatment (Etch) processes. Repairable via thermal spray recoating."
                  : "表面施加特殊涂层。提供强力固定和耐化学稳定性。主要用于表面处理（蚀刻）工艺。可通过热喷涂重涂修复。"}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                  <span className="text-stone-700 font-black text-sm">P</span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Type 02</p>
                  <h3 className="text-sm font-black text-slate-900">Plate Type ESC</h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === "ko"
                  ? "플레이트 형태로 제작. 특정 반도체 산업에서 광범위 사용. CVD·Implant 공정에 적합. 플레이트 디본딩 후 재본딩으로 수리 가능."
                  : locale === "en"
                  ? "Manufactured in plate form. Widely used in specific semiconductor industries. Suitable for CVD and Implant processes. Repairable via plate de-bonding and re-bonding."
                  : "以板材形式制造。广泛用于特定半导体行业。适用于CVD和离子注入工艺。可通过板材脱粘重粘修复。"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4: REPAIR PROCESS
      ══════════════════════════════════════ */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{c.repairTitle}</h2>
            <p className="text-slate-500 text-sm">{c.repairSub}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
            {c.repairSteps.map((step, i) => (
              <div
                key={i}
                className={`relative p-4 rounded-xl border ${
                  i >= 2 && i <= 3
                    ? "border-[var(--accent)]/20 bg-[var(--accent)]/5"
                    : "border-slate-100 bg-slate-50"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center mb-3">
                  <span className="text-[var(--accent)] font-black text-[10px]">{i}</span>
                </div>
                <p
                  className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    i >= 2 && i <= 3 ? "text-[var(--accent)]" : "text-slate-400"
                  }`}
                >
                  {step.step}
                </p>
                <p className="text-xs font-bold text-slate-900 mb-1">{step.name}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed whitespace-pre-line">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Process image */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              {locale === "ko"
                ? "표준 작업 흐름도 — ㈜동탄이엔지 (DT ENG)"
                : locale === "en"
                ? "Standard Process Flow — DT ENG Inc."
                : "标准作业流程图 — DT ENG"}
            </p>
            <div className="flex items-center justify-center overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://dteng.kr/img/business-process-kor.png"
                alt="DT ENG Standard Repair Process Flow"
                className="w-full max-w-3xl object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5: ABOUT DT ENG + PARTNERSHIP
      ══════════════════════════════════════ */}
      <section className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-3">
                ㈜동탄이엔지 · DT ENG INC. · 경기도 화성시
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">{c.aboutTitle}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{c.aboutDesc}</p>
              <div className="space-y-4">
                <div className="border-l-4 border-[var(--accent)] pl-4">
                  <p className="text-xs font-bold text-[var(--accent)] mb-1">{c.aboutMission}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{c.missionText}</p>
                </div>
                <div className="border-l-4 border-slate-600 pl-4">
                  <p className="text-xs font-bold text-slate-500 mb-1">{c.aboutVision}</p>
                  <p className="text-sm text-slate-500 leading-relaxed italic">{c.visionText}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">
                  {locale === "ko" ? "회사 정보" : locale === "en" ? "Company Info" : "公司信息"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    locale === "ko" ? "설립 2016년" : locale === "en" ? "Founded 2016" : "成立2016年",
                    locale === "ko" ? "경기 화성시" : locale === "en" ? "Hwaseong, Gyeonggi" : "庆畿道华城市",
                    locale === "ko" ? "반도체 장비 부품" : locale === "en" ? "Semiconductor Components" : "半导体设备部件",
                    locale === "ko" ? "9년 업력" : locale === "en" ? "9 Years Expertise" : "9年经验",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/5 border border-white/10 text-slate-400 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-4">{c.whyTitle}</h3>
              <div className="space-y-3">
                {c.whys.map((w, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center shrink-0">
                      <span className="text-[var(--accent)] font-black text-sm">0{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{w.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 6: CTA
      ══════════════════════════════════════ */}
      <section className="bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{c.ctaTitle}</h2>
          <p className="text-white/70 text-sm mb-8 max-w-lg mx-auto">{c.ctaDesc}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/contact?lang=${locale}&type=inquiry&category=esc`}
              className="bg-white text-[var(--primary)] hover:bg-gray-50 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg"
            >
              {c.ctaBtn1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=repair&category=esc`}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors"
            >
              {c.ctaBtn2}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
