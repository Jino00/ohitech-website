"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";

/* ─────────────────────────────────────────────
   CK PLASTICS IMAGE URLS
───────────────────────────────────────────── */
const BASE = "https://www.ckplas.com/ch_img";
const IMG = {
  foup12:  `${BASE}/foup_25s_1.jpg`,
  foup12t: `${BASE}/h300s1tfoup_2.jpg`,
  foup13:  `${BASE}/foup_13s_h_1.jpg`,
  foup8:   `${BASE}/foup_8_1.jpg`,
  smif6:   `${BASE}/wsmif_pod_6_1.jpg`,
  smif8:   `${BASE}/wsmif_pod_8_1.jpg`,
  fosb:    `${BASE}/fosb_25.jpg`,
  opener:  `${BASE}/foup_opene_4.jpg`,
  hybox:   `${BASE}/hybox_1.jpg`,
};

const PRODUCT_IMG: Record<string, string> = {
  "foup-12":         IMG.foup12,
  "foup-8-smif":     IMG.foup8,
  "fosb-acc":        IMG.fosb,
  "cassette-teflon": IMG.foup12t,
  "cassette-pp":     IMG.smif8,
  "cassette-metal":  IMG.smif6,
  "shipping":        IMG.hybox,
  "ic-reticle":      IMG.opener,
};

const SOLUTION_IMG: Record<string, string> = {
  logic:     IMG.foup12,
  memory:    IMG.foup13,
  display:   IMG.smif8,
  solar:     IMG.hybox,
  packaging: IMG.fosb,
};

const SOLUTION_CUSTOMERS: Record<string, string[]> = {
  logic:     ["TSMC", "Samsung Foundry", "Intel Foundry", "GlobalFoundries", "SMIC"],
  memory:    ["SK Hynix", "Micron", "Samsung", "YMTC", "Kioxia"],
  display:   ["LG Display", "Samsung Display", "AUO", "Innolux", "BOE"],
  solar:     ["LONGi", "Jinko Solar", "Canadian Solar", "REC", "First Solar"],
  packaging: ["ASE", "Amkor", "JCET", "SPIL", "UTAC"],
};

/* ─────────────────────────────────────────────
   STATIC CONTENT
───────────────────────────────────────────── */

const LANG = {
  ko: {
    hero: {
      eyebrow: "CK Plastics (中勤實業) 대만 공식 파트너 · OHI Tech 한국 총판",
      headline: "Protect Every Wafer,\nEvery Step.",
      sub: "반도체 · 디스플레이 · 태양광 · 첨단 패키징 웨이퍼 캐리어 토탈 솔루션",
      cta1: "제품 상담 문의",
      cta2: "샘플 신청",
      stats: [
        { value: "1992", label: "설립 연도" },
        { value: "300mm", label: "EUV 공정 대응" },
        { value: "SEMICON", label: "국제 전시 참가" },
        { value: "Full Lineup", label: "2\"~12\" 전 사이즈" },
      ],
    },
    productNav: "제품 카테고리",
    products: [
      {
        id: "foup-12",
        name: "12인치 FOUP",
        nameEn: "300mm Wafer FOUP",
        color: "from-violet-600 to-violet-800",
        tagline: "SEMI E47.1 · 25-slot / 13-slot / 6-slot",
        desc: "300mm 웨이퍼 자동 반송용 표준 FOUP. 25-slot 표준형·일체형·투명형, 13-slot 박막 웨이퍼·Back Support 탑재형, 6-slot 초박막 전용형까지 전 라인업 보유. OHT 자동화 시스템 완전 호환.",
        lineup: [
          { model: "25-slot Standard", spec: "표준 FOUP · OHT/AGV 자동화 완전 호환" },
          { model: "25-slot Transparent", spec: "투명 전면부 · 웨이퍼 육안 확인 가능" },
          { model: "13-slot Thin Wafer", spec: "박막 웨이퍼 전용 · Back Support 내장" },
          { model: "6-slot Thin Wafer", spec: "초박막 웨이퍼 전용 · 손상 방지 구조" },
        ],
        apps: ["300mm Logic Fab", "DRAM / NAND", "AI 웨이퍼", "파운드리"],
      },
      {
        id: "foup-8-smif",
        name: "8인치 FOUP / SMIF Pod",
        nameEn: "200mm FOUP & SMIF Pod",
        color: "from-purple-600 to-purple-800",
        tagline: "200mm 공정 완전 대응 · 자동·수동 핸들링",
        desc: "200mm 반도체 공정용 FOUP 및 6\"·8\" SMIF Pod. 자동화 라인 및 수동 핸들링 모두 지원. FOUP 어댑터로 기존 장비 호환성 확보.",
        lineup: [
          { model: "8\" FOUP Standard", spec: "200mm · 자동화 라인 완전 호환" },
          { model: "8\" SMIF Pod", spec: "200mm · 밀봉 이송 · 오염 방지" },
          { model: "6\" SMIF Pod", spec: "150mm · 클린룸 내 안전 이송" },
          { model: "FOUP Adapter", spec: "6\"→8\" 변환 어댑터" },
        ],
        apps: ["200mm Fab", "Power Device", "MEMS", "Analog IC"],
      },
      {
        id: "fosb-acc",
        name: "FOSB · FOUP 액세서리",
        nameEn: "FOSB & FOUP Accessories",
        color: "from-indigo-600 to-indigo-800",
        tagline: "300mm 출하·보관 · FOUP 호환 인터페이스",
        desc: "Front-Opening Shipping Box(FOSB)로 300mm 웨이퍼 안전 출하 및 보관. FOUP Opener·Door Key·어댑터 등 운용 주변기기 전 라인업.",
        lineup: [
          { model: "12\" 25-slot FOSB", spec: "출하·보관용 · FOUP 호환 도어" },
          { model: "Smart Foldable Pallet Box", spec: "접이식 · 재활용 가능 · ESG 대응" },
          { model: "FOUP Opener", spec: "자동/수동 도어 오픈 장치" },
          { model: "FOUP Door Key / Adapter", spec: "도어 키 · 6\"→8\" 변환 어댑터" },
        ],
        apps: ["웨이퍼 출하", "반송 물류", "파운드리", "OSAT"],
      },
      {
        id: "cassette-teflon",
        name: "Teflon / PFA 카세트",
        nameEn: "Teflon / PFA Cassette",
        color: "from-cyan-600 to-cyan-800",
        tagline: "2\"~12\" 전 사이즈 · 내화학성 · 고온 공정",
        desc: "2\"~12\" 전 사이즈 Teflon 카세트. 습식 에칭·화학적 세정 공정의 필수 소재. Low Profile 저높이형, Teflon Wafer Tray, PFA Handle 등 액세서리 포함.",
        lineup: [
          { model: "Teflon Cassette (전 사이즈)", spec: "2\"~12\" · 내화학 · 다슬롯 옵션" },
          { model: "Low Profile (6\"/8\")", spec: "저높이 설계 · 공간 제약 장비용" },
          { model: "Teflon Wafer Tray", spec: "단매 보관·이송용 트레이" },
          { model: "PFA Handle / Lock Bar / Tank", spec: "액세서리 전 라인업" },
        ],
        apps: ["Wet Etch", "화학 세정", "HF 처리", "고온 공정"],
      },
      {
        id: "cassette-pp",
        name: "PP / PEI / PC ESD 카세트",
        nameEn: "PP / PEI / PC ESD Cassette",
        color: "from-slate-600 to-slate-800",
        tagline: "경량 · ESD 대응 · 2\"~8\"",
        desc: "2\"~8\" 범용 PP 카세트부터 8\" PEI/PC ESD 카세트까지. ESD 방지 소재로 정밀 반도체 공정의 정전기 파손 원천 차단. 커스텀 사이즈 제작 가능.",
        lineup: [
          { model: "PP Cassette (2\"~8\")", spec: "범용 · 경량 · 경제적" },
          { model: "8\" PEI ESD (25-slot)", spec: "ESD 대응 · 고강도 PEI 소재" },
          { model: "8\" PC ESD Slim / Back Support", spec: "슬림형·백서포트 ESD" },
          { model: "커스텀 (175mm / 6\"→8\" 변환)", spec: "비표준 사이즈 · OEM 제작" },
        ],
        apps: ["Assembly", "Inspection", "Test", "ESD 민감 공정"],
      },
      {
        id: "cassette-metal",
        name: "Metal / PEEK 카세트",
        nameEn: "Metal / PEEK Cassette",
        color: "from-gray-600 to-gray-800",
        tagline: "고강도 · 초고온 · PEEK 내화학",
        desc: "스테인리스 금속 카세트(2\"~12\")와 PEEK 카세트(3\"~8\"). 확산로·이온주입기 등 초고온 공정 필수. 웨이퍼 다이싱용 Metal Frame·Wafer Ring 포함.",
        lineup: [
          { model: "Metal Cassette (2\"~12\")", spec: "스테인리스 · 12/25/50 슬롯" },
          { model: "PEEK Cassette (3\"~8\")", spec: "초고온 · 고화학 저항 · 고순도" },
          { model: "Metal Frame (SUS)", spec: "다이싱 공정용 웨이퍼 프레임" },
          { model: "Wafer Ring", spec: "테이핑·다이싱 공정용 · 커스텀 제작" },
        ],
        apps: ["확산로", "이온주입", "다이싱", "고순도 공정"],
      },
      {
        id: "shipping",
        name: "Shipping & Storage 솔루션",
        nameEn: "Shipping & Storage Solutions",
        color: "from-teal-600 to-teal-800",
        tagline: "2\"~12\" · ESD · 친환경 물류",
        desc: "웨이퍼 단매·다매 보관·출하 박스 전 라인업. 표준형·ESD형·박막 전용형 Shipping Box, Single Tray, Storage Box, Coin Box. 접이식 재활용 Pallet로 ESG 대응.",
        lineup: [
          { model: "Shipping Box (2\"~8\")", spec: "표준·ESD·박막 전용형 포함" },
          { model: "Single Tray (2\"~12\")", spec: "단매 이송·보관용" },
          { model: "Storage Box / Wafer Stack Box", spec: "다매 보관 · 8\"/12\" 대응" },
          { model: "Smart Foldable Pallet / Recyclable", spec: "접이식·재활용 · ESG 친환경" },
        ],
        apps: ["웨이퍼 출하", "재고 보관", "물류 센터", "ESG 대응"],
      },
      {
        id: "ic-reticle",
        name: "IC · Reticle · Panel 캐리어",
        nameEn: "IC · Reticle · Panel Carrier",
        color: "from-rose-600 to-rose-800",
        tagline: "포토마스크 · FoPLP · 디스플레이 특화",
        desc: "IC/LED 트레이, 포토마스크(레티클) 전용 보관·이송 솔루션, 디스플레이용 각형 유리 카세트, FoPLP FOUP 등 특수 공정 캐리어 전 라인업.",
        lineup: [
          { model: "IC / LED Tray", spec: "IC·LED·패키지 소자용 트레이" },
          { model: "Mask SMIF Pod / RSP 150", spec: "포토마스크 전용 보관·이송" },
          { model: "Panel FOUP / FoPLP FOUP", spec: "패널·첨단 패키징용 FOUP" },
          { model: "Square Glass Cassette", spec: "디스플레이 각형 유리용 카세트" },
        ],
        apps: ["포토마스크", "FoPLP / Chiplet", "디스플레이", "태양광"],
      },
    ],
    solutionsTitle: "산업별 솔루션",
    solutionsSub: "CK Plastics 웨이퍼 캐리어가 적용되는 핵심 반도체·첨단 산업 분야",
    solutionsCta: "이 솔루션 문의",
    solutionsCustomerLabel: "주요 납품처",
    solutions: [
      {
        id: "logic",
        name: "로직 반도체 / 파운드리",
        color: "bg-slate-700",
        challenge: "300mm EUV 공정, SEMI E47.1 FOUP 규격, 입자 오염 제로",
        highlight: "SEMI E47.1 완전 준수 · OHT 자동화 완전 호환",
        materials: ["12\" 25-slot FOUP", "FOSB", "FOUP Opener"],
        metrics: [
          { value: "SEMI E47.1", label: "FOUP 국제 규격" },
          { value: "300mm", label: "EUV 공정 대응" },
          { value: "OHT", label: "자동화 호환" },
        ],
        points: [
          "TSMC·Samsung Foundry·Intel 파운드리에 납품 중인 12인치 FOUP — SEMI E47.1 완전 준수, OHT/AGV 자동화 시스템 완전 호환",
          "25-slot 표준형부터 6-slot 박막 전용까지 전 라인업 — 공정 설계 단계에서 최적 모델 선정 지원",
          "FOSB로 완성된 300mm 웨이퍼 출하·보관 체계 — Fab 간 이송부터 고객사 납품까지 원스톱 캐리어 솔루션",
        ],
      },
      {
        id: "memory",
        name: "메모리 반도체 (DRAM / NAND)",
        color: "bg-indigo-800",
        challenge: "3D NAND 다층 구조 박막 웨이퍼, 슬라이딩·파손 리스크 증가",
        highlight: "Back Support 슬라이딩 방지 · 6-slot 박막 전용",
        materials: ["13-slot FOUP (Back Support)", "6-slot Thin FOUP", "Metal Cassette"],
        metrics: [
          { value: "Back Support", label: "슬라이딩 방지" },
          { value: "6-slot", label: "박막 웨이퍼 전용" },
          { value: "3D NAND", label: "다층 구조 대응" },
        ],
        points: [
          "3D NAND 박막 웨이퍼의 슬라이딩·휨 문제를 Back Support 내장 FOUP으로 원천 차단 — SK Hynix·Micron·Kioxia 납품",
          "6-slot 초박막 전용 FOUP으로 200단 이상 3D NAND 최첨단 박막 웨이퍼 안전 이송",
          "금속 카세트로 확산·이온주입 공정 고온 환경 완전 대응 — 메모리 소자 수율 향상",
        ],
      },
      {
        id: "display",
        name: "디스플레이 / 패널",
        color: "bg-purple-800",
        challenge: "각형 유리 기판 대형화, 패널 공정 전용 캐리어 수요",
        highlight: "Square Glass Cassette · Panel FOUP · FoPLP 대응",
        materials: ["Square Glass Cassette", "Panel FOUP", "FoPLP FOUP"],
        metrics: [
          { value: "G8+", label: "대형 유리 기판 대응" },
          { value: "Panel FOUP", label: "패널 전용 캐리어" },
          { value: "FoPLP", label: "첨단 패키징 대응" },
        ],
        points: [
          "G6~G8 이상 각형 유리 기판 전용 Square Glass Cassette — LG Display·Samsung Display·AUO 납품 이력",
          "Panel FOUP으로 대형 기판의 클린룸 내 자동화 이송 실현 — 디스플레이 공정 수율 향상",
          "FoPLP(Fan-Out Panel Level Packaging) 전용 FOUP 선행 개발 — 첨단 패키징 로드맵 대응",
        ],
      },
      {
        id: "solar",
        name: "태양광 (Solar)",
        color: "bg-amber-800",
        challenge: "박막 태양광 웨이퍼 대량 처리, 경제성·ESG 동시 달성",
        highlight: "Solar Cassette · 친환경 Recyclable Pallet",
        materials: ["Solar Cassette", "Clean Cassette", "Recyclable Pallet"],
        metrics: [
          { value: "박막 대응", label: "Solar 전용 카세트" },
          { value: "ESG", label: "재활용 물류 솔루션" },
          { value: "대량 처리", label: "배치 공정 최적화" },
        ],
        points: [
          "태양광 웨이퍼 전용 Solar Cassette로 박막·대형 셀 배치 공정 최적화 — LONGi·Jinko Solar 납품",
          "Clean Cassette로 고순도 클린룸 태양광 공정 오염 방지 — 셀 효율 향상",
          "접이식 Recyclable Pallet으로 ESG 환경 규제 대응 및 물류 비용 절감 — 탄소 발자국 최소화",
        ],
      },
      {
        id: "packaging",
        name: "첨단 패키징 (Advanced Packaging)",
        color: "bg-teal-700",
        challenge: "FoPLP·Chiplet·OSAT 공정 전용 캐리어, 대형 패널 자동화",
        highlight: "FoPLP FOUP · IC Tray · Reticle Handling 전문",
        materials: ["FoPLP FOUP", "IC / LED Tray", "Mask SMIF Pod"],
        metrics: [
          { value: "FoPLP", label: "패널급 패키징 대응" },
          { value: "Chiplet", label: "이종 집적 캐리어" },
          { value: "Reticle", label: "포토마스크 전용" },
        ],
        points: [
          "FoPLP 전용 대형 패널 FOUP — 차세대 첨단 패키징의 자동화 이송 체계 선행 지원",
          "IC·LED·패키지 소자 이송용 Frame Cassette·Tray 전 라인업 — OSAT(ASE·Amkor·JCET) 납품",
          "RSP 150·Mask SMIF Pod으로 포토마스크(레티클) 오염 제로 보관·이송 — 노광 공정 수율 보장",
        ],
      },
    ],
    aboutTitle: "CK Plastics 소개",
    aboutDesc:
      "CK Plastics(中勤實業)는 1992년 설립 이래 30년 이상 반도체 웨이퍼 캐리어 전문 제조기업으로 성장해왔습니다. 대만 타오위안 본사를 거점으로 SEMICON Taiwan·Japan·China에 공식 참가하며 글로벌 반도체 기업에 FOUP·카세트·출하·보관 솔루션 전 라인업을 공급합니다.",
    aboutMission: "Mission",
    missionText: "반도체 산업의 웨이퍼 캐리어 혁신을 선도하여, 고객의 공정 수율과 자동화 효율을 극대화하는 최적의 솔루션을 제공합니다.",
    aboutVision: "Vision",
    visionText: "세계 반도체·디스플레이·첨단 패키징 산업에서 가장 신뢰받는 웨이퍼 캐리어 파트너가 되어, 지속 가능한 첨단 제조 환경을 함께 구축합니다.",
    customerTitle: "주요 납품처",
    certTitle: "인증 및 규격 준수",
    certs: [
      { name: "ISO 9001", desc: "품질경영 시스템" },
      { name: "SEMI E47.1", desc: "FOUP 국제 규격" },
      { name: "SEMI M1", desc: "웨이퍼 표준 규격" },
      { name: "SEMI E1", desc: "캐리어 인터페이스 규격" },
      { name: "RoHS 준수", desc: "유해물질 규제 대응" },
      { name: "SEMICON Taiwan", desc: "공식 전시 참가 업체" },
      { name: "SEMICON Japan", desc: "공식 전시 참가 업체" },
      { name: "SEMICON China", desc: "공식 전시 참가 업체" },
    ],
    whyTitle: "OHI Tech가 CK Plastics 파트너인 이유",
    whys: [
      { title: "2\"~12\" 전 사이즈 대응", desc: "소형 2인치부터 최첨단 12인치 EUV 대응 FOUP까지 전 사이즈 라인업을 단일 창구에서 공급합니다." },
      { title: "SEMI 규격 완전 준수", desc: "SEMI E47.1·M1·E1 등 국제 규격을 완전 준수한 제품만 공급. 규격 적합성 검토를 OHI Tech가 지원합니다." },
      { title: "커스텀·OEM 제작", desc: "비표준 사이즈, 특수 슬롯 구성, 고객사 전용 모델 OEM 생산 가능. 최소 주문 수량 협의 가능." },
      { title: "빠른 대응 · 기술 지원", desc: "제품 선정부터 납기까지 OHI Tech 전담팀이 기술 지원. 국내 재고 보유로 긴급 대응 가능." },
    ],
    ctaTitle: "웨이퍼 캐리어 제품이 필요하신가요?",
    ctaDesc: "사이즈·소재·수량·규격을 알려주시면 최적 모델과 납기를 안내해 드립니다.",
    ctaBtn1: "지금 문의하기",
    ctaBtn2: "샘플 신청",
  },
  en: {
    hero: {
      eyebrow: "CK Plastics (Chung King Enterprise) Taiwan Official Partner · OHI Tech Korea Distributor",
      headline: "Protect Every Wafer,\nEvery Step.",
      sub: "Total wafer carrier solutions for semiconductors, displays, solar, and advanced packaging",
      cta1: "Request Consultation",
      cta2: "Request Sample",
      stats: [
        { value: "1992", label: "Founded" },
        { value: "300mm", label: "EUV Process Ready" },
        { value: "SEMICON", label: "Official Exhibitor" },
        { value: "Full Lineup", label: "2\" to 12\" Coverage" },
      ],
    },
    productNav: "Product Categories",
    products: [
      {
        id: "foup-12",
        name: "12\" FOUP",
        nameEn: "300mm Wafer FOUP",
        color: "from-violet-600 to-violet-800",
        tagline: "SEMI E47.1 · 25-slot / 13-slot / 6-slot",
        desc: "Standard FOUP for automated 300mm wafer transport. Full lineup: 25-slot standard, integrated, and transparent models; 13-slot thin-wafer and Back Support; 6-slot ultra-thin. Fully compatible with OHT automation systems.",
        lineup: [
          { model: "25-slot Standard", spec: "Standard FOUP · Full OHT/AGV compatibility" },
          { model: "25-slot Transparent", spec: "Clear front panel · Visual wafer inspection" },
          { model: "13-slot Thin Wafer", spec: "Thin wafer dedicated · Integrated Back Support" },
          { model: "6-slot Thin Wafer", spec: "Ultra-thin wafer · Damage-prevention design" },
        ],
        apps: ["300mm Logic Fab", "DRAM / NAND", "AI Wafers", "Foundry"],
      },
      {
        id: "foup-8-smif",
        name: "8\" FOUP / SMIF Pod",
        nameEn: "200mm FOUP & SMIF Pod",
        color: "from-purple-600 to-purple-800",
        tagline: "200mm process ready · Automated & manual handling",
        desc: "FOUP and SMIF Pod for 200mm semiconductor processes. Supports both automated lines and manual handling. FOUP adapter for legacy equipment compatibility.",
        lineup: [
          { model: "8\" FOUP Standard", spec: "200mm · Full automation compatibility" },
          { model: "8\" SMIF Pod", spec: "200mm · Sealed transport · Contamination-free" },
          { model: "6\" SMIF Pod", spec: "150mm · Cleanroom safe transport" },
          { model: "FOUP Adapter", spec: "6\"→8\" conversion adapter" },
        ],
        apps: ["200mm Fab", "Power Devices", "MEMS", "Analog IC"],
      },
      {
        id: "fosb-acc",
        name: "FOSB · FOUP Accessories",
        nameEn: "FOSB & FOUP Accessories",
        color: "from-indigo-600 to-indigo-800",
        tagline: "300mm shipment · FOUP-compatible interface",
        desc: "Front-Opening Shipping Box (FOSB) for safe 300mm wafer shipment and storage. Full lineup of FOUP Opener, Door Key, and adapters for operational efficiency.",
        lineup: [
          { model: "12\" 25-slot FOSB", spec: "Shipment/storage · FOUP-compatible door" },
          { model: "Smart Foldable Pallet Box", spec: "Foldable · Recyclable · ESG-compliant" },
          { model: "FOUP Opener", spec: "Auto/manual door opening device" },
          { model: "FOUP Door Key / Adapter", spec: "Door key · 6\"→8\" conversion adapter" },
        ],
        apps: ["Wafer Shipping", "Wafer Logistics", "Foundry", "OSAT"],
      },
      {
        id: "cassette-teflon",
        name: "Teflon / PFA Cassette",
        nameEn: "Teflon / PFA Cassette",
        color: "from-cyan-600 to-cyan-800",
        tagline: "2\"~12\" full range · Chemical resistant · High temp",
        desc: "Teflon cassettes covering 2\" to 12\". Essential for wet etching and chemical cleaning. Includes Low Profile design, Teflon Wafer Tray, PFA Handle, Lock Bar, and Tank accessories.",
        lineup: [
          { model: "Teflon Cassette (All Sizes)", spec: "2\"~12\" · Chemical resistant · Multi-slot" },
          { model: "Low Profile (6\"/8\")", spec: "Compact design · Space-constrained equipment" },
          { model: "Teflon Wafer Tray", spec: "Single-wafer storage and transport" },
          { model: "PFA Handle / Lock Bar / Tank", spec: "Full accessory lineup" },
        ],
        apps: ["Wet Etch", "Chemical Cleaning", "HF Processing", "High Temp"],
      },
      {
        id: "cassette-pp",
        name: "PP / PEI / PC ESD Cassette",
        nameEn: "PP / PEI / PC ESD Cassette",
        color: "from-slate-600 to-slate-800",
        tagline: "Lightweight · ESD-safe · 2\"~8\"",
        desc: "General-purpose PP cassettes (2\"~8\") to 8\" PEI/PC ESD cassettes. ESD-safe materials eliminate static damage in precision semiconductor processes. Custom sizes available.",
        lineup: [
          { model: "PP Cassette (2\"~8\")", spec: "General purpose · Lightweight · Cost-effective" },
          { model: "8\" PEI ESD (25-slot)", spec: "ESD-safe · High-strength PEI material" },
          { model: "8\" PC ESD Slim / Back Support", spec: "Slim profile · Back support ESD" },
          { model: "Custom (175mm / 6\"→8\")", spec: "Non-standard sizes · OEM production" },
        ],
        apps: ["Assembly", "Inspection", "Test", "ESD-sensitive Process"],
      },
      {
        id: "cassette-metal",
        name: "Metal / PEEK Cassette",
        nameEn: "Metal / PEEK Cassette",
        color: "from-gray-600 to-gray-800",
        tagline: "High strength · Ultra-high temp · PEEK chemical resistance",
        desc: "Stainless steel cassettes (2\"~12\") and PEEK cassettes (3\"~8\") for diffusion furnaces, ion implantation, and ultra-high temperature processes. Includes Metal Frame and Wafer Ring for dicing.",
        lineup: [
          { model: "Metal Cassette (2\"~12\")", spec: "Stainless steel · 12/25/50 slots" },
          { model: "PEEK Cassette (3\"~8\")", spec: "Ultra-high temp · High chemical resistance" },
          { model: "Metal Frame (SUS)", spec: "Wafer frame for dicing processes" },
          { model: "Wafer Ring", spec: "Dicing/taping process · Custom fabrication" },
        ],
        apps: ["Diffusion Furnace", "Ion Implantation", "Dicing", "High-purity Process"],
      },
      {
        id: "shipping",
        name: "Shipping & Storage Solutions",
        nameEn: "Shipping & Storage Solutions",
        color: "from-teal-600 to-teal-800",
        tagline: "2\"~12\" · ESD · Eco-friendly logistics",
        desc: "Full lineup of wafer shipping and storage solutions. Standard, ESD, and thin-wafer Shipping Boxes, Single Trays, Storage Boxes, and Coin Boxes. Foldable recyclable pallets for ESG compliance.",
        lineup: [
          { model: "Shipping Box (2\"~8\")", spec: "Standard · ESD · Thin-wafer variants" },
          { model: "Single Tray (2\"~12\")", spec: "Single-wafer transport and storage" },
          { model: "Storage Box / Wafer Stack Box", spec: "Multi-wafer storage · 8\"/12\" support" },
          { model: "Smart Foldable / Recyclable Pallet", spec: "Eco-friendly · ESG compliant" },
        ],
        apps: ["Wafer Shipping", "Inventory Storage", "Logistics Center", "ESG Compliance"],
      },
      {
        id: "ic-reticle",
        name: "IC · Reticle · Panel Carrier",
        nameEn: "IC · Reticle · Panel Carrier",
        color: "from-rose-600 to-rose-800",
        tagline: "Photomask · FoPLP · Display specialized",
        desc: "Full range of specialized carriers: IC/LED trays, photomask (reticle) storage and transport, display square glass cassettes, FoPLP FOUPs for advanced packaging.",
        lineup: [
          { model: "IC / LED Tray", spec: "For IC, LED, and packaged components" },
          { model: "Mask SMIF Pod / RSP 150", spec: "Photomask-dedicated storage/transport" },
          { model: "Panel FOUP / FoPLP FOUP", spec: "Panel and advanced packaging FOUP" },
          { model: "Square Glass Cassette", spec: "Display glass substrate cassette" },
        ],
        apps: ["Photomask", "FoPLP / Chiplet", "Display", "Solar"],
      },
    ],
    solutionsTitle: "Industry Solutions",
    solutionsSub: "CK Plastics wafer carriers across semiconductor and advanced industries",
    solutionsCta: "Inquire About This",
    solutionsCustomerLabel: "Key Customers",
    solutions: [
      {
        id: "logic",
        name: "Logic Semiconductor / Foundry",
        color: "bg-slate-700",
        challenge: "300mm EUV process, SEMI E47.1 FOUP compliance, zero particle contamination",
        highlight: "Full SEMI E47.1 compliance · OHT automation ready",
        materials: ["12\" 25-slot FOUP", "FOSB", "FOUP Opener"],
        metrics: [
          { value: "SEMI E47.1", label: "International FOUP Standard" },
          { value: "300mm", label: "EUV Process Ready" },
          { value: "OHT", label: "Automation Compatible" },
        ],
        points: [
          "12\" FOUPs supplied to TSMC, Samsung Foundry, and Intel — fully SEMI E47.1 compliant with OHT/AGV automation system support",
          "Complete lineup from 25-slot standard to 6-slot ultra-thin — OHI Tech assists in selecting the optimal model at design stage",
          "End-to-end 300mm wafer shipping with FOSB — one-stop carrier solution from fab to customer delivery",
        ],
      },
      {
        id: "memory",
        name: "Memory Semiconductor (DRAM / NAND)",
        color: "bg-indigo-800",
        challenge: "3D NAND multi-layer thin wafers, elevated sliding and breakage risk",
        highlight: "Back Support prevents sliding · 6-slot ultra-thin dedicated",
        materials: ["13-slot FOUP (Back Support)", "6-slot Thin FOUP", "Metal Cassette"],
        metrics: [
          { value: "Back Support", label: "Anti-sliding" },
          { value: "6-slot", label: "Ultra-thin Dedicated" },
          { value: "3D NAND", label: "Multi-layer Ready" },
        ],
        points: [
          "Back Support-integrated FOUP eliminates thin wafer sliding and warping in 3D NAND — supplied to SK Hynix, Micron, Kioxia",
          "6-slot ultra-thin FOUP safely transports 200+ layer 3D NAND wafers at the cutting edge",
          "Metal cassettes handle diffusion and ion implantation high-temperature environments — memory device yield improvement",
        ],
      },
      {
        id: "display",
        name: "Display & Panel",
        color: "bg-purple-800",
        challenge: "Larger glass substrates, panel-dedicated carrier requirements",
        highlight: "Square Glass Cassette · Panel FOUP · FoPLP ready",
        materials: ["Square Glass Cassette", "Panel FOUP", "FoPLP FOUP"],
        metrics: [
          { value: "G8+", label: "Large Glass Support" },
          { value: "Panel FOUP", label: "Panel-dedicated Carrier" },
          { value: "FoPLP", label: "Advanced Packaging Ready" },
        ],
        points: [
          "Square Glass Cassettes for G6~G8+ glass substrates — supplied to LG Display, Samsung Display, AUO",
          "Panel FOUP enables automated cleanroom transport of large substrates — improves display process yield",
          "FoPLP-dedicated large panel FOUP in pre-development — aligned with advanced packaging roadmaps",
        ],
      },
      {
        id: "solar",
        name: "Solar Energy",
        color: "bg-amber-800",
        challenge: "Thin solar wafer high-volume handling, cost efficiency and ESG compliance",
        highlight: "Solar Cassette · Recyclable Pallet eco-logistics",
        materials: ["Solar Cassette", "Clean Cassette", "Recyclable Pallet"],
        metrics: [
          { value: "Thin-film", label: "Solar Cassette Ready" },
          { value: "ESG", label: "Recyclable Logistics" },
          { value: "High Volume", label: "Batch Process Optimized" },
        ],
        points: [
          "Solar-dedicated cassettes optimize thin and large-format cell batch processes — supplied to LONGi, Jinko Solar",
          "Clean Cassettes prevent contamination in high-purity cleanroom solar processes — improves cell efficiency",
          "Foldable Recyclable Pallets meet ESG environmental regulations and reduce logistics costs — carbon footprint minimized",
        ],
      },
      {
        id: "packaging",
        name: "Advanced Packaging (FoPLP / Chiplet)",
        color: "bg-teal-700",
        challenge: "FoPLP / Chiplet / OSAT process-specific carriers, large panel automation",
        highlight: "FoPLP FOUP · IC Tray · Reticle Handling expertise",
        materials: ["FoPLP FOUP", "IC / LED Tray", "Mask SMIF Pod"],
        metrics: [
          { value: "FoPLP", label: "Panel-level Packaging" },
          { value: "Chiplet", label: "Heterogeneous Integration" },
          { value: "Reticle", label: "Photomask Handling" },
        ],
        points: [
          "FoPLP-dedicated large panel FOUPs enable automated transport for next-generation advanced packaging — future-ready design",
          "Frame Cassette and Tray lineup for IC, LED, and packaged component transport — supplied to ASE, Amkor, JCET",
          "RSP 150 and Mask SMIF Pod ensure zero-contamination photomask storage and transport — lithography yield guaranteed",
        ],
      },
    ],
    aboutTitle: "About CK Plastics",
    aboutDesc:
      "CK Plastics (Chung King Enterprise) has grown since 1992 into a specialist manufacturer of semiconductor wafer carriers over three decades. Headquartered in Taoyuan, Taiwan, CK Plastics is an official exhibitor at SEMICON Taiwan, Japan, and China, supplying the full lineup of FOUP, cassette, and shipping solutions to global semiconductor companies.",
    aboutMission: "Mission",
    missionText: "Lead wafer carrier innovation in the semiconductor industry by providing optimal solutions that maximize process yield and automation efficiency for our customers.",
    aboutVision: "Vision",
    visionText: "Become the world's most trusted wafer carrier partner in semiconductors, displays, and advanced packaging — building a sustainable advanced manufacturing environment together.",
    customerTitle: "Key Customers",
    certTitle: "Certifications & Standards",
    certs: [
      { name: "ISO 9001", desc: "Quality Management System" },
      { name: "SEMI E47.1", desc: "International FOUP Standard" },
      { name: "SEMI M1", desc: "Wafer Standard" },
      { name: "SEMI E1", desc: "Carrier Interface Standard" },
      { name: "RoHS Compliant", desc: "Hazardous Substance Compliance" },
      { name: "SEMICON Taiwan", desc: "Official Exhibitor" },
      { name: "SEMICON Japan", desc: "Official Exhibitor" },
      { name: "SEMICON China", desc: "Official Exhibitor" },
    ],
    whyTitle: "Why OHI Tech × CK Plastics",
    whys: [
      { title: "2\" to 12\" Full Coverage", desc: "From compact 2\" to cutting-edge 12\" EUV-ready FOUPs — every size available through a single point of contact." },
      { title: "Full SEMI Standards Compliance", desc: "Only SEMI E47.1, M1, and E1-compliant products supplied. OHI Tech supports full standards suitability review." },
      { title: "Custom & OEM Production", desc: "Non-standard sizes, special slot configurations, customer-exclusive OEM production available. MOQ negotiable." },
      { title: "Fast Response & Technical Support", desc: "Dedicated OHI Tech team from product selection to delivery. Domestic inventory for urgent turnaround." },
    ],
    ctaTitle: "Need a Wafer Carrier Solution?",
    ctaDesc: "Share your wafer size, material, quantity, and standard requirements — we'll recommend the best model and lead time.",
    ctaBtn1: "Contact Us Now",
    ctaBtn2: "Request Sample",
  },
  zh: {
    hero: {
      eyebrow: "CK Plastics（中勤實業）台湾官方合作伙伴 · OHI Tech 韩国总代理",
      headline: "Protect Every Wafer,\nEvery Step.",
      sub: "半导体 · 显示器 · 太阳能 · 先进封装晶圆载体全套解决方案",
      cta1: "产品咨询",
      cta2: "申请样品",
      stats: [
        { value: "1992", label: "创立年份" },
        { value: "300mm", label: "EUV工艺适配" },
        { value: "SEMICON", label: "官方展商" },
        { value: "Full Lineup", label: "2\"~12\"全系列" },
      ],
    },
    productNav: "产品分类",
    products: [
      {
        id: "foup-12",
        name: "12英寸 FOUP",
        nameEn: "300mm Wafer FOUP",
        color: "from-violet-600 to-violet-800",
        tagline: "SEMI E47.1 · 25槽 / 13槽 / 6槽",
        desc: "300mm晶圆自动搬运标准FOUP。涵盖25槽标准型、一体型、透明型；13槽薄晶圆·Back Support型；6槽超薄专用型全系列，完全兼容OHT自动化系统。",
        lineup: [
          { model: "25槽标准型", spec: "标准FOUP · 完全兼容OHT/AGV自动化" },
          { model: "25槽透明型", spec: "透明前盖 · 可目视确认晶圆状态" },
          { model: "13槽薄晶圆型", spec: "薄晶圆专用 · 内置Back Support" },
          { model: "6槽超薄型", spec: "超薄晶圆专用 · 防损伤结构设计" },
        ],
        apps: ["300mm逻辑晶圆厂", "DRAM/NAND", "AI晶圆", "晶圆代工"],
      },
      {
        id: "foup-8-smif",
        name: "8英寸 FOUP / SMIF Pod",
        nameEn: "200mm FOUP & SMIF Pod",
        color: "from-purple-600 to-purple-800",
        tagline: "200mm工艺全覆盖 · 自动/手动搬运",
        desc: "适用于200mm半导体工艺的FOUP和6\"/8\" SMIF Pod，支持自动化生产线和手动操作，FOUP适配器确保与现有设备兼容。",
        lineup: [
          { model: "8\" FOUP标准型", spec: "200mm · 完全兼容自动化生产线" },
          { model: "8\" SMIF Pod", spec: "200mm · 密封搬运 · 防污染" },
          { model: "6\" SMIF Pod", spec: "150mm · 洁净室安全搬运" },
          { model: "FOUP适配器", spec: "6\"→8\"转换适配器" },
        ],
        apps: ["200mm晶圆厂", "功率器件", "MEMS", "模拟IC"],
      },
      {
        id: "fosb-acc",
        name: "FOSB · FOUP配件",
        nameEn: "FOSB & FOUP Accessories",
        color: "from-indigo-600 to-indigo-800",
        tagline: "300mm出货·储存 · FOUP兼容接口",
        desc: "前开式出货盒（FOSB）实现300mm晶圆安全出货与储存，配套FOUP开启器、门键、适配器等全系列运营周边设备。",
        lineup: [
          { model: "12\" 25槽 FOSB", spec: "出货/储存用 · FOUP兼容门锁" },
          { model: "智能折叠托盘箱", spec: "可折叠 · 可回收 · ESG合规" },
          { model: "FOUP开启器", spec: "自动/手动开门装置" },
          { model: "FOUP门键/适配器", spec: "门键 · 6\"→8\"转换适配器" },
        ],
        apps: ["晶圆出货", "搬运物流", "晶圆代工", "OSAT"],
      },
      {
        id: "cassette-teflon",
        name: "Teflon / PFA卡匣",
        nameEn: "Teflon / PFA Cassette",
        color: "from-cyan-600 to-cyan-800",
        tagline: "2\"~12\"全尺寸 · 耐化学 · 高温工艺",
        desc: "覆盖2\"至12\"全尺寸的Teflon卡匣，是湿法刻蚀和化学清洗工艺的必备材料。含低矮型、Teflon晶圆托盘、PFA手柄、锁定棒及槽体等配件。",
        lineup: [
          { model: "Teflon卡匣（全尺寸）", spec: "2\"~12\" · 耐化学 · 多槽位选项" },
          { model: "低矮型（6\"/8\"）", spec: "紧凑设计 · 适用于空间受限设备" },
          { model: "Teflon晶圆托盘", spec: "单片储存与搬运托盘" },
          { model: "PFA手柄/锁定棒/槽体", spec: "全系列配件" },
        ],
        apps: ["湿法刻蚀", "化学清洗", "HF处理", "高温工艺"],
      },
      {
        id: "cassette-pp",
        name: "PP / PEI / PC ESD卡匣",
        nameEn: "PP / PEI / PC ESD Cassette",
        color: "from-slate-600 to-slate-800",
        tagline: "轻量 · ESD防静电 · 2\"~8\"",
        desc: "从2\"至8\"通用PP卡匣到8\" PEI/PC ESD卡匣全系列，ESD防静电材质彻底消除精密半导体工艺中的静电损伤，可定制非标准尺寸。",
        lineup: [
          { model: "PP卡匣（2\"~8\"）", spec: "通用型 · 轻量 · 经济实惠" },
          { model: "8\" PEI ESD（25槽）", spec: "ESD防静电 · 高强度PEI材质" },
          { model: "8\" PC ESD Slim/Back Support", spec: "薄型/背支撑ESD卡匣" },
          { model: "定制型（175mm/6\"→8\"转换）", spec: "非标准尺寸 · OEM生产" },
        ],
        apps: ["封装", "检测", "测试", "ESD敏感工艺"],
      },
      {
        id: "cassette-metal",
        name: "Metal / PEEK卡匣",
        nameEn: "Metal / PEEK Cassette",
        color: "from-gray-600 to-gray-800",
        tagline: "高强度 · 超高温 · PEEK耐化学",
        desc: "不锈钢卡匣（2\"~12\"）和PEEK卡匣（3\"~8\"），适用于扩散炉、离子注入等超高温工艺。含切割工艺用金属框架和晶圆环。",
        lineup: [
          { model: "金属卡匣（2\"~12\"）", spec: "不锈钢 · 12/25/50槽" },
          { model: "PEEK卡匣（3\"~8\"）", spec: "超高温 · 强耐化学 · 高纯度" },
          { model: "金属框架（SUS）", spec: "切割工艺用晶圆框架" },
          { model: "晶圆环", spec: "贴膜/切割工艺用 · 可定制" },
        ],
        apps: ["扩散炉", "离子注入", "切割", "高纯度工艺"],
      },
      {
        id: "shipping",
        name: "出货与储存解决方案",
        nameEn: "Shipping & Storage Solutions",
        color: "from-teal-600 to-teal-800",
        tagline: "2\"~12\" · ESD · 环保物流",
        desc: "晶圆出货与储存全系列解决方案，含标准型、ESD型、薄晶圆专用出货盒、单片托盘、储存盒及Coin盒，折叠可回收托盘满足ESG环保要求。",
        lineup: [
          { model: "出货盒（2\"~8\"）", spec: "标准型·ESD型·薄晶圆专用型" },
          { model: "单片托盘（2\"~12\"）", spec: "单片晶圆搬运储存" },
          { model: "储存盒/晶圆叠放盒", spec: "多片储存 · 支持8\"/12\"" },
          { model: "智能折叠/可回收托盘", spec: "环保ESG合规物流" },
        ],
        apps: ["晶圆出货", "库存储存", "物流中心", "ESG合规"],
      },
      {
        id: "ic-reticle",
        name: "IC · 光罩 · 面板载体",
        nameEn: "IC · Reticle · Panel Carrier",
        color: "from-rose-600 to-rose-800",
        tagline: "光掩模 · FoPLP · 显示器专用",
        desc: "全系列特种载体：IC/LED托盘、光罩（掩模版）专用储存搬运解决方案、显示器方形玻璃卡匣、FoPLP FOUP等先进封装专用载体。",
        lineup: [
          { model: "IC / LED托盘", spec: "IC、LED及封装元件用托盘" },
          { model: "Mask SMIF Pod / RSP 150", spec: "光罩专用储存与搬运" },
          { model: "Panel FOUP / FoPLP FOUP", spec: "面板及先进封装专用FOUP" },
          { model: "方形玻璃卡匣", spec: "显示器玻璃基板卡匣" },
        ],
        apps: ["光掩模", "FoPLP/Chiplet", "显示器", "太阳能"],
      },
    ],
    solutionsTitle: "行业解决方案",
    solutionsSub: "CK Plastics晶圆载体覆盖的核心半导体及先进产业领域",
    solutionsCta: "咨询此方案",
    solutionsCustomerLabel: "主要客户",
    solutions: [
      {
        id: "logic",
        name: "逻辑半导体 / 晶圆代工",
        color: "bg-slate-700",
        challenge: "300mm EUV工艺，SEMI E47.1 FOUP规范，零颗粒污染",
        highlight: "完全符合SEMI E47.1 · OHT自动化兼容",
        materials: ["12\" 25槽FOUP", "FOSB", "FOUP开启器"],
        metrics: [
          { value: "SEMI E47.1", label: "FOUP国际规范" },
          { value: "300mm", label: "EUV工艺适配" },
          { value: "OHT", label: "自动化兼容" },
        ],
        points: [
          "12英寸FOUP供货台积电、三星代工、Intel——完全符合SEMI E47.1，全面兼容OHT/AGV自动化系统",
          "25槽标准型至6槽超薄专用型全系列——OHI Tech协助在设计阶段选定最优型号",
          "FOSB构建300mm晶圆出货储存体系——从晶圆厂到客户的一站式载体解决方案",
        ],
      },
      {
        id: "memory",
        name: "存储芯片（DRAM / NAND）",
        color: "bg-indigo-800",
        challenge: "3D NAND多层结构薄晶圆，滑动及破片风险增加",
        highlight: "Back Support防滑 · 6槽超薄专用",
        materials: ["13槽FOUP（Back Support）", "6槽薄晶圆FOUP", "金属卡匣"],
        metrics: [
          { value: "Back Support", label: "防滑动设计" },
          { value: "6槽", label: "超薄晶圆专用" },
          { value: "3D NAND", label: "多层结构适配" },
        ],
        points: [
          "内置Back Support的FOUP从根本上防止3D NAND薄晶圆滑动翘曲——供货SK海力士、美光、铠侠",
          "6槽超薄晶圆FOUP安全搬运200层以上3D NAND最先进薄晶圆",
          "金属卡匣应对扩散及离子注入高温环境——提升存储器件良率",
        ],
      },
      {
        id: "display",
        name: "显示器 / 面板",
        color: "bg-purple-800",
        challenge: "玻璃基板大型化，面板专用载体需求增加",
        highlight: "方形玻璃卡匣 · Panel FOUP · FoPLP适配",
        materials: ["方形玻璃卡匣", "Panel FOUP", "FoPLP FOUP"],
        metrics: [
          { value: "G8+", label: "大型玻璃基板" },
          { value: "Panel FOUP", label: "面板专用载体" },
          { value: "FoPLP", label: "先进封装适配" },
        ],
        points: [
          "G6~G8以上方形玻璃基板专用卡匣——供货LG Display、三星Display、友达光电",
          "Panel FOUP实现大型基板洁净室自动化搬运——提升显示器工艺良率",
          "FoPLP专用大型面板FOUP先行开发——对应先进封装技术路线图",
        ],
      },
      {
        id: "solar",
        name: "太阳能",
        color: "bg-amber-800",
        challenge: "薄型太阳能晶圆大批量处理，兼顾经济性与ESG合规",
        highlight: "太阳能卡匣 · 可回收托盘环保物流",
        materials: ["太阳能卡匣", "洁净卡匣", "可回收托盘"],
        metrics: [
          { value: "薄膜适配", label: "太阳能专用卡匣" },
          { value: "ESG", label: "可回收物流解决方案" },
          { value: "大批量", label: "批次工艺优化" },
        ],
        points: [
          "太阳能专用卡匣优化薄型及大尺寸电池批次工艺——供货隆基绿能、晶科能源",
          "洁净卡匣防止高纯度洁净室太阳能工艺污染——提升电池效率",
          "折叠可回收托盘满足ESG环保法规，降低物流成本——最小化碳足迹",
        ],
      },
      {
        id: "packaging",
        name: "先进封装（FoPLP / Chiplet）",
        color: "bg-teal-700",
        challenge: "FoPLP/Chiplet/OSAT工艺专用载体，大型面板自动化搬运",
        highlight: "FoPLP FOUP · IC托盘 · 光罩搬运专业",
        materials: ["FoPLP FOUP", "IC / LED托盘", "Mask SMIF Pod"],
        metrics: [
          { value: "FoPLP", label: "面板级封装" },
          { value: "Chiplet", label: "异构集成" },
          { value: "光罩", label: "掩模版专用搬运" },
        ],
        points: [
          "FoPLP专用大型面板FOUP支持下一代先进封装自动化搬运——面向未来的设计",
          "IC、LED及封装元件搬运用框架卡匣和托盘全系列——供货日月光、安靠、长电科技",
          "RSP 150和Mask SMIF Pod确保光罩零污染储存与搬运——保障光刻工艺良率",
        ],
      },
    ],
    aboutTitle: "CK Plastics公司介绍",
    aboutDesc:
      "CK Plastics（中勤實業）自1992年创立以来，30余年间成长为半导体晶圆载体专业制造企业。以台湾桃园总部为核心，官方参展SEMICON台湾、日本及中国，向全球半导体企业供应FOUP、卡匣、出货储存解决方案全系列产品。",
    aboutMission: "使命",
    missionText: "引领半导体行业晶圆载体创新，为客户提供最大化工艺良率和自动化效率的最优解决方案。",
    aboutVision: "愿景",
    visionText: "成为全球半导体、显示器及先进封装行业最受信赖的晶圆载体合作伙伴，共同构建可持续的先进制造环境。",
    customerTitle: "主要客户",
    certTitle: "认证与标准合规",
    certs: [
      { name: "ISO 9001", desc: "质量管理体系" },
      { name: "SEMI E47.1", desc: "FOUP国际标准" },
      { name: "SEMI M1", desc: "晶圆标准" },
      { name: "SEMI E1", desc: "载体接口标准" },
      { name: "RoHS合规", desc: "有害物质合规" },
      { name: "SEMICON台湾", desc: "官方展商" },
      { name: "SEMICON日本", desc: "官方展商" },
      { name: "SEMICON中国", desc: "官方展商" },
    ],
    whyTitle: "为何选择 OHI Tech × CK Plastics",
    whys: [
      { title: "2\"~12\"全尺寸覆盖", desc: "从2英寸小尺寸到最先进的12英寸EUV适配FOUP，通过单一渠道提供全系列产品。" },
      { title: "完全符合SEMI标准", desc: "仅供应符合SEMI E47.1、M1、E1等国际标准的产品，OHI Tech提供标准符合性审查支持。" },
      { title: "定制·OEM生产", desc: "非标准尺寸、特殊槽位配置、客户专属OEM生产均可实现，起订量可协商。" },
      { title: "快速响应·技术支持", desc: "从产品选型到交货，OHI Tech专属团队全程技术支持，国内备货实现紧急响应。" },
    ],
    ctaTitle: "需要晶圆载体解决方案？",
    ctaDesc: "请告知晶圆尺寸、材质、数量及规格要求，我们将推荐最优型号并提供交货期。",
    ctaBtn1: "立即联系",
    ctaBtn2: "申请样品",
  },
};

const CUSTOMERS = [
  "TSMC", "Samsung", "SK Hynix", "Micron", "Intel",
  "LG Display", "AUO", "Infineon", "STMicroelectronics",
  "LONGi", "Jinko Solar", "ASE", "Amkor", "JCET", "Kioxia", "BOE",
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function WaferSection({ locale }: { locale: Locale }) {
  const c = LANG[locale];
  const [activeProduct, setActiveProduct] = useState(c.products[0].id);
  const [activeSolution, setActiveSolution] = useState(c.solutions[0].id);

  const currentProduct = c.products.find((p) => p.id === activeProduct) ?? c.products[0];
  const currentSolution = c.solutions.find((s) => s.id === activeSolution) ?? c.solutions[0];

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8">

      {/* ══════════════════════════════════════
          SECTION 1: HERO
      ══════════════════════════════════════ */}
      <section className="hero-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <p className="text-violet-400 text-xs font-semibold tracking-widest uppercase mb-4">{c.hero.eyebrow}</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight whitespace-pre-line">
            {c.hero.headline}
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-10 max-w-xl">{c.hero.sub}</p>
          <div className="flex flex-wrap gap-3 mb-14">
            <Link
              href={`/contact?lang=${locale}&type=inquiry&category=wafer-carrier`}
              className="bg-violet-500 hover:bg-violet-600 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=sample&category=wafer-carrier`}
              className="border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta2}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-10">
            {c.hero.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-violet-400">{s.value}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2: PRODUCT SHOWCASE
      ══════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
            {locale === "ko" ? "제품 포트폴리오" : locale === "en" ? "Product Portfolio" : "产品系列"}
          </h2>
          <p className="text-slate-500 text-sm mb-10">
            {locale === "ko"
              ? "CK Plastics 전 제품군 — FOUP부터 특수 캐리어까지"
              : locale === "en"
              ? "Full CK Plastics range — from FOUP to specialized carriers"
              : "CK Plastics全系列产品——从FOUP到特种载体"}
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Category nav */}
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
                    <img
                      src={PRODUCT_IMG[p.id]}
                      alt={p.name}
                      className="w-9 h-9 object-cover rounded-lg shrink-0"
                    />
                    <span className="leading-snug">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product detail */}
            <div className="flex-1 min-w-0">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="relative bg-white border-b border-slate-200 p-8 overflow-hidden">
                  <div className={`absolute top-0 left-0 bottom-0 w-1.5 bg-[var(--accent)]`} />
                  <div className={`absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[var(--accent)] opacity-10 blur-2xl`} />
                  <div className="flex items-start justify-between gap-4 pl-5">
                    <div className="flex-1">
                      <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">{currentProduct.nameEn}</p>
                      <h3 className="text-2xl font-black text-slate-900 mb-3">{currentProduct.name}</h3>
                      <span className="inline-block bg-slate-900 text-white text-xs font-mono px-3 py-1 rounded-full">
                        {currentProduct.tagline}
                      </span>
                    </div>
                    <img
                      src={PRODUCT_IMG[currentProduct.id]}
                      alt={currentProduct.name}
                      className="w-28 h-28 object-cover rounded-2xl shrink-0 shadow-lg ring-1 ring-slate-200"
                    />
                  </div>
                  <p className="text-slate-700 text-sm mt-5 leading-relaxed pl-5">{currentProduct.desc}</p>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      {locale === "ko" ? "모델 라인업" : locale === "en" ? "Model Lineup" : "产品型号"}
                    </h4>
                    <div className="space-y-3">
                      {currentProduct.lineup.map((item) => (
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
                      {locale === "ko" ? "주요 적용 분야" : locale === "en" ? "Key Applications" : "主要应用领域"}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {currentProduct.apps.map((app) => (
                        <div key={app} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 bg-violet-400 rounded-full shrink-0" />
                          {app}
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/contact?lang=${locale}&type=quote&category=wafer-carrier&product=${currentProduct.id}`}
                      className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                    >
                      {locale === "ko" ? "이 제품 문의" : locale === "en" ? "Inquire About This" : "咨询此产品"}
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
          SECTION 3: SOLUTIONS BY INDUSTRY
      ══════════════════════════════════════ */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{c.solutionsTitle}</h2>
            <p className="text-slate-500 text-sm">{c.solutionsSub}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: industry list */}
            <div className="lg:w-56 shrink-0">
              <div className="lg:sticky lg:top-24 space-y-1">
                {c.solutions.map((sol) => (
                  <button
                    key={sol.id}
                    onClick={() => setActiveSolution(sol.id)}
                    className={`w-full text-left rounded-xl overflow-hidden transition-all flex items-center gap-3 px-3 py-2.5 text-sm font-medium ${
                      activeSolution === sol.id
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-600 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <img
                      src={SOLUTION_IMG[sol.id]}
                      alt={sol.name}
                      className="w-9 h-9 object-cover rounded-lg shrink-0"
                    />
                    <span className="leading-snug">{sol.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: solution detail */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={SOLUTION_IMG[currentSolution.id]}
                    alt={currentSolution.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-black text-white mb-1">{currentSolution.name}</h3>
                    <p className="text-white/70 text-xs">{currentSolution.challenge}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-slate-100">
                    {currentSolution.metrics.map((m, i) => (
                      <div key={i} className="text-center bg-slate-50 rounded-xl py-3 px-2">
                        <div className="text-lg font-black text-[var(--accent)]">{m.value}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    {currentSolution.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-sm text-slate-700 leading-relaxed">{pt}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-5 border-t border-slate-100">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        {locale === "ko" ? "권장 제품" : locale === "en" ? "Recommended Products" : "推荐产品"}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {currentSolution.materials.map((m) => (
                          <span key={m} className="text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full font-mono">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        {c.solutionsCustomerLabel}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {SOLUTION_CUSTOMERS[currentSolution.id]?.map((name) => (
                          <span key={name} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/contact?lang=${locale}&type=inquiry&category=wafer-carrier&solution=${currentSolution.id}`}
                      className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                    >
                      {c.solutionsCta} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4: ABOUT CK PLASTICS
      ══════════════════════════════════════ */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-3">
                CK Plastics (Chung King Enterprise Co., Ltd.)
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{c.aboutTitle}</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{c.aboutDesc}</p>
              <div className="space-y-4">
                <div className="border-l-4 border-violet-500 pl-4">
                  <p className="text-xs font-bold text-[var(--accent)] mb-1">{c.aboutMission}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{c.missionText}</p>
                </div>
                <div className="border-l-4 border-slate-300 pl-4">
                  <p className="text-xs font-bold text-slate-500 mb-1">{c.aboutVision}</p>
                  <p className="text-sm text-slate-600 leading-relaxed italic">{c.visionText}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
                  {locale === "ko" ? "글로벌 전시 참가" : locale === "en" ? "International Exhibitions" : "国际展会参展"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {["🇹🇼 Taiwan HQ", "SEMICON Taiwan", "SEMICON Japan", "SEMICON China"].map((g) => (
                    <span key={g} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full">{g}</span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-4">{c.certTitle}</h3>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {c.certs.map((cert) => (
                  <div key={cert.name} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-violet-600 text-[10px] font-black">✓</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{cert.name}</p>
                      <p className="text-[11px] text-slate-500">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="text-sm font-bold text-slate-700 mb-3">{c.customerTitle}</h3>
              <div className="flex flex-wrap gap-2">
                {CUSTOMERS.map((name) => (
                  <span key={name} className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full font-medium shadow-sm">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5: WHY OHI TECH × CK PLASTICS
      ══════════════════════════════════════ */}
      <section className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-10">{c.whyTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.whys.map((w, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mb-4">
                  <span className="text-violet-400 font-black text-sm">0{i + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{w.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{w.desc}</p>
              </div>
            ))}
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
              href={`/contact?lang=${locale}&type=inquiry&category=wafer-carrier`}
              className="bg-white text-[var(--primary)] hover:bg-gray-50 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg"
            >
              {c.ctaBtn1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=sample&category=wafer-carrier`}
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
