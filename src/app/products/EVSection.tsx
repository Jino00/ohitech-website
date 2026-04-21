"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";

/* ─────────────────────────────────────────────
   ZEROVA IMAGE URLS
───────────────────────────────────────────── */
const BASE = "https://www.zerovatech.com/wp-content/uploads";
const IMG = {
  dx:          `${BASE}/DX_480_SN_EU_WB_G1_L1L5C1_BKT_CN_PN_SD_FP-e1776048972879-1015x1000.png`,
  dxSm:        `${BASE}/DX_480_SN_EU_WB_G1_L1L5C1_BKT_CN_PN_SD_FP-e1776048972879-304x300.png`,
  dq:          `${BASE}/480-2_amphenol4_hs-Front-no-payter.423559-e1768447512404-300x300.png`,
  dl:          `${BASE}/DL_5-phoenix-Front-IM30.4290-e1768447575509.png`,
  dlSm:        `${BASE}/DL_5-phoenix-Front-IM30.4290-e1768447575509-300x300.png`,
  dt:          `${BASE}/DS240_800x800_UL_1.png`,
  dtSm:        `${BASE}/DS240_800x800_UL_1-300x300.png`,
  ax:          `${BASE}/AX_%E6%AD%A3_800X800_%E5%B7%A5%E4%BD%9C%E5%8D%80%E5%9F%9F-1-300x300.png`,
  aw48:        `${BASE}/AW48.356-e1768456051181-300x300.png`,
  aw32:        `${BASE}/AW_%E6%AD%A3_800X800_%E5%B7%A5%E4%BD%9C%E5%8D%80%E5%9F%9F-1-300x300.png`,
  cable:       `${BASE}/800x800-15-300x300.png`,
  hero:        `${BASE}/Banner1104-1.png`,
  solCommercial: `${BASE}/Commercial-Building-1.webp`,
  solResidential:`${BASE}/Residential-1.webp`,
  solParking:  `${BASE}/Outdoor-Parking-1.webp`,
  solGas:      `${BASE}/DS-gas-station.png`,
  solFleet:    `${BASE}/DS-Industry-fleet.png`,
  solHospitality:`${BASE}/Shopping-Center_Hospitality.webp`,
};

const PRODUCT_IMG: Record<string, string> = {
  dx:   IMG.dxSm,
  dq:   IMG.dq,
  dl:   IMG.dlSm,
  dt:   IMG.dtSm,
  ds:   IMG.dq,
  dw:   IMG.dlSm,
  ax:   IMG.ax,
  aw:   IMG.aw48,
};

const SOLUTION_IMG: Record<string, string> = {
  commercial:  IMG.solCommercial,
  residential: IMG.solResidential,
  parking:     IMG.solParking,
  gasstation:  IMG.solGas,
  fleet:       IMG.solFleet,
  hospitality: IMG.solHospitality,
};

const SOLUTION_CUSTOMERS: Record<string, string[]> = {
  commercial:  ["Shell Recharge", "BYD", "Bosch", "Audi", "Porsche"],
  residential: ["e4you", "ChargeLab", "Noodoe EV", "plugit"],
  parking:     ["Shell Recharge", "plugit", "VDL", "TCC"],
  gasstation:  ["Shell Recharge", "TCC", "Zenobē", "EDRV"],
  fleet:       ["Zenobē", "VDL", "BYD", "EDRV", "TCC"],
  hospitality: ["Jaguar", "Audi", "Porsche", "Bosch"],
};

/* ─────────────────────────────────────────────
   STATIC CONTENT
───────────────────────────────────────────── */

const LANG = {
  ko: {
    hero: {
      eyebrow: "Zerova Technologies 글로벌 공식 파트너 · OHI Tech 한국 총판",
      headline: "Empowering\nThe Future.",
      sub: "DC·AC 급속충전 · EV 인프라 · 충전 솔루션 토탈 전문가",
      cta1: "제품 상담 문의",
      cta2: "도입 사례 보기",
      stats: [
        { value: "100,000+", label: "글로벌 설치 포트" },
        { value: "480kW", label: "최대 충전 출력" },
        { value: "3개 대륙", label: "글로벌 시장" },
        { value: "OCPP 1.6", label: "국제 표준 인증" },
      ],
    },
    productNav: "제품 카테고리",
    products: [
      {
        id: "dx",
        name: "DX 480/360kW 디스펜서 DC",
        nameEn: "DX Dispenser DC Charger (US/EMEA)",
        color: "from-emerald-600 to-emerald-800",
        tagline: "최대 480kW · 벽걸이 + 캐비닛 구성",
        desc: "미국·EMEA 시장 전용 고출력 디스펜서형 DC 급속충전기. 벽걸이 설치 및 DC 파워 캐비닛 연동으로 플릿·물류 허브에 최적. 순차 충전 기술로 충전 효율과 수익을 극대화.",
        lineup: [
          { model: "DX-480", spec: "480kW · CCS1/CHAdeMO · 미국·EMEA 시장" },
          { model: "DX-360", spec: "360kW · CCS1/CCS2 · 순차 충전 지원" },
        ],
        apps: ["플릿·물류 허브", "상업 주차장", "고속도로 휴게소", "딜러십"],
      },
      {
        id: "dq",
        name: "DQ 480kW 스탠드얼론 DC",
        nameEn: "DQ Standalone DC Fast Charger",
        color: "from-teal-600 to-teal-800",
        tagline: "듀얼 스크린 · 다이나믹 충전 · 최고 ROI",
        desc: "480kW 초고출력 스탠드얼론 DC 급속충전기. 듀얼 스크린 디지털 사이니지로 광고 수익 창출. 다이나믹 전력 관리와 지능형 로드 밸런싱으로 충전 효율 극대화.",
        lineup: [
          { model: "DQ-480", spec: "480kW · 듀얼 스크린 · 다이나믹 전력 관리" },
          { model: "DQ-480 Media", spec: "21.5인치 LCD · 디지털 사이니지 · 광고 수익" },
        ],
        apps: ["쇼핑몰 주차장", "고속도로 충전소", "호텔·리조트", "대형마트"],
      },
      {
        id: "dl",
        name: "DL 480/360kW 디스펜서 DC",
        nameEn: "DL Dispenser DC Charger (EMEA Only)",
        color: "from-cyan-600 to-cyan-800",
        tagline: "EMEA 전용 · 슬림 컴팩트 · 모듈형",
        desc: "EMEA 시장 전용 슬림 디스펜서형 DC 충전기. 고처리량 환경에 최적화된 모듈식 아키텍처. 버스 차고지·트럭 플릿·충전 네트워크 운영자에 이상적.",
        lineup: [
          { model: "DL-480", spec: "480kW · EMEA 전용 · CCS2 · 슬림 디자인" },
          { model: "DL-360", spec: "360kW · 모듈형 · 고처리량 환경 최적화" },
        ],
        apps: ["버스 차고지", "트럭 플릿", "충전 네트워크", "물류 센터"],
      },
      {
        id: "dt",
        name: "DT 240kW 스탠드얼론 DC",
        nameEn: "DT Standalone DC Charger",
        color: "from-green-600 to-green-800",
        tagline: "클래식 디자인 · 스타일리시 · 고효율",
        desc: "240kW 스탠드얼론 DC 급속충전기. 세련된 클래식 디자인과 첨단 기술의 결합. 다이나믹 전력 관리와 지능형 로드 밸런싱으로 효율과 수익성 동시 달성.",
        lineup: [
          { model: "DT-240", spec: "240kW · CCS1/CCS2 · 다이나믹 전력 관리" },
          { model: "DT-240 Plus", spec: "240kW · 지능형 로드 밸런싱 · 고효율" },
        ],
        apps: ["상업 주차장", "주유소", "쇼핑센터", "호텔"],
      },
      {
        id: "ds",
        name: "DS 180/60kW 스탠드얼론 DC",
        nameEn: "DS Standalone DC Charger",
        color: "from-lime-600 to-lime-800",
        tagline: "스케일러블 · 90~180kW 모듈형",
        desc: "90~180kW 확장 가능한 모듈형 스탠드얼론 DC 충전기. 소규모 주차장부터 대형 충전소까지 유연하게 대응. 60kW 소형 모델도 제공.",
        lineup: [
          { model: "DS-180", spec: "180kW (스케일러블 90~180kW) · 모듈형" },
          { model: "DS-60", spec: "60kW · 소형 스탠드얼론 · 경제적" },
        ],
        apps: ["중소형 주차장", "주유소", "기업 주차장", "공공 충전소"],
      },
      {
        id: "dw",
        name: "DW/DM 30kW DC 소형",
        nameEn: "DW Wall-Mounted / DM Moveable DC",
        color: "from-emerald-500 to-emerald-700",
        tagline: "벽걸이 · 이동형 · 소형 플릿 대응",
        desc: "30kW 벽걸이형(DW)과 30kW 이동식(DM) DC 충전기. 공간 제약 환경과 이동이 필요한 플릿에 최적화. 간편 설치와 휴대성으로 유연한 충전 인프라 구성.",
        lineup: [
          { model: "DW-30", spec: "30kW · 벽걸이형 · 공간 효율 최적화" },
          { model: "DM-30", spec: "30kW · 이동식·휴대형 · 플릿 전용" },
        ],
        apps: ["소형 주차장", "이동형 충전 서비스", "창고·물류", "기업 주차장"],
      },
      {
        id: "ax",
        name: "AX 32A/48A/80A AC 충전기",
        nameEn: "AX AC Charger",
        color: "from-sky-600 to-sky-800",
        tagline: "다양한 전류 옵션 · OCPP 1.6 완전 호환",
        desc: "32A·48A·80A 세 가지 전류 옵션의 AC 충전기. OCPP 1.6 완전 인증. 주거·상업 환경 모두 최적화. Energy Star·UL 인증 보유.",
        lineup: [
          { model: "AX-80A", spec: "80A · 19.2kW · 고전력 주거·상업용" },
          { model: "AX-48A", spec: "48A · 11.5kW · 범용 · OCPP 1.6" },
          { model: "AX-32A", spec: "32A · 7.7kW · 경제형 · UL 인증" },
        ],
        apps: ["주거 단지", "오피스 빌딩", "호텔", "리테일 주차장"],
      },
      {
        id: "aw",
        name: "AW 48A/32A AC 충전기",
        nameEn: "AW AC Charger (US Market)",
        color: "from-indigo-600 to-indigo-800",
        tagline: "미국 시장 전용 · Energy Star 인증 · 세련된 디자인",
        desc: "미국 시장 전용 고성능 AC 충전기. Energy Star 인증으로 에너지 효율 보장. 세련된 디자인과 UL 리스팅으로 고급 주거·상업 시장에 최적.",
        lineup: [
          { model: "AW-48A", spec: "48A · 11kW · 미국 전용 · Energy Star" },
          { model: "AW-32A", spec: "32A · 7.7kW · UL 인증 · 경제형" },
        ],
        apps: ["미국 주거용", "미국 상업용", "아파트 단지", "기업 주차장"],
      },
    ],
    solutionsTitle: "산업별 충전 솔루션",
    solutionsSub: "Zerova EV 충전 기술이 적용되는 주요 산업 분야",
    solutionsCta: "이 솔루션 문의",
    solutionsCustomerLabel: "글로벌 파트너",
    solutions: [
      {
        id: "commercial",
        name: "상업용 빌딩",
        color: "bg-slate-700",
        challenge: "다수 차량 동시 충전, 공간 제약, 수익성 확보",
        highlight: "최대 480kW 멀티포트 · 스마트 로드 밸런싱",
        models: ["DQ-480", "DT-240", "AX-48A"],
        metrics: [
          { value: "480kW", label: "최대 충전 출력" },
          { value: "멀티포트", label: "동시 충전 지원" },
          { value: "OCPP", label: "스마트 관제" },
        ],
        points: [
          "DQ 480kW 듀얼 스크린 충전기로 광고 수익 창출 — 충전 인프라가 비용이 아닌 수익원으로 전환",
          "스마트 로드 밸런싱으로 피크 전력 수요 관리 — 전력 계약 용량 최적화 및 운영비 절감",
          "OCPP 1.6 완전 호환으로 기존 CSMS와 즉시 연동 — 통합 관제 및 원격 모니터링",
        ],
      },
      {
        id: "residential",
        name: "주거 시설",
        color: "bg-emerald-800",
        challenge: "아파트·빌라 충전 인프라, 과금 시스템, 관리 편의성",
        highlight: "스마트 과금 · Energy Star 인증 · 간편 설치",
        models: ["AX-32A", "AW-48A", "AX-48A"],
        metrics: [
          { value: "Energy", label: "Star 인증" },
          { value: "OCPP", label: "과금 연동" },
          { value: "UL/CE", label: "안전 인증" },
        ],
        points: [
          "Energy Star·UL 인증 AC 충전기로 안전하고 효율적인 야간 충전 — 전기요금 절감",
          "OCPP 기반 스마트 과금 시스템 연동으로 세대별 정확한 사용량 정산 — 관리 효율화",
          "간단한 벽면 설치로 공사 비용 최소화 — 기존 전기 인프라 활용 가능",
        ],
      },
      {
        id: "parking",
        name: "야외 주차장",
        color: "bg-blue-800",
        challenge: "날씨 내구성, 반달리즘 방지, 고가용성 운영",
        highlight: "IP54+ 방수방진 · 24/7 고가용성 · 원격 관제",
        models: ["DX-480", "DS-180", "DT-240"],
        metrics: [
          { value: "IP54+", label: "방수방진 등급" },
          { value: "24/7", label: "무중단 운영" },
          { value: "원격", label: "모니터링" },
        ],
        points: [
          "IP54 이상 방수방진 등급으로 혹독한 야외 환경에서도 안정적 운영 — 유지보수 비용 절감",
          "원격 관제 시스템으로 24시간 상태 모니터링 및 장애 즉시 대응 — 가동률 극대화",
          "다이나믹 전력 배분으로 복수 충전기 동시 운영 최적화 — 주차 수익과 충전 수익 동시 확보",
        ],
      },
      {
        id: "gasstation",
        name: "주유소 · 에너지 스테이션",
        color: "bg-orange-800",
        challenge: "기존 주유소 공간 활용, 빠른 충전 회전율, 추가 수익",
        highlight: "초고속 충전 · 빠른 회전 · 광고 수익",
        models: ["DQ-480", "DS-180", "DT-240"],
        metrics: [
          { value: "15분", label: "급속 충전 목표" },
          { value: "광고", label: "수익 창출" },
          { value: "복합", label: "에너지 스테이션" },
        ],
        points: [
          "480kW 초고속 충전으로 15분 내 80% 충전 달성 — 주유소 수준의 빠른 회전율 실현",
          "디지털 사이니지 탑재 DQ 시리즈로 충전 대기 시간에 광고 수익 창출 — 새로운 수익 채널",
          "기존 주유 설비와 병행 운영으로 점진적 전환 — 초기 투자 리스크 최소화",
        ],
      },
      {
        id: "fleet",
        name: "상업용 플릿",
        color: "bg-slate-600",
        challenge: "대규모 차량 동시 충전, 스케줄 관리, TCO 최적화",
        highlight: "순차 충전 기술 · 스케줄 충전 · TCO 절감",
        models: ["DX-480", "DL-480", "DS-180"],
        metrics: [
          { value: "순차", label: "충전 기술" },
          { value: "스케줄", label: "충전 관제" },
          { value: "TCO", label: "절감 최적화" },
        ],
        points: [
          "DX·DL 순차 충전 기술로 피크 전력 분산 — 계약 전력 초과 없이 다수 차량 효율적 충전",
          "통합 CSMS 연동으로 차량별 충전 스케줄·이력·비용 완전 관리 — 플릿 운영 TCO 절감",
          "버스·트럭·배달 차량 등 다양한 상업용 차종에 최적화된 충전 솔루션 제공",
        ],
      },
      {
        id: "hospitality",
        name: "쇼핑몰 · 호스피탈리티",
        color: "bg-violet-800",
        challenge: "고객 체류 시간 충전, 프리미엄 이미지, 브랜드 경험",
        highlight: "프리미엄 디자인 · 미디어 디스플레이 · 고객 경험",
        models: ["DQ-480", "DT-240", "AX-48A"],
        metrics: [
          { value: "미디어", label: "디스플레이" },
          { value: "프리미엄", label: "디자인" },
          { value: "앱", label: "연동 과금" },
        ],
        points: [
          "세련된 디자인의 DQ·DT 시리즈로 쇼핑몰·호텔 공간과 완벽 조화 — 브랜드 가치 제고",
          "디지털 사이니지로 맞춤형 광고·프로모션 콘텐츠 표시 — 유통 파트너와 협업 가능",
          "앱 기반 간편 결제·예약 시스템 연동으로 고객 편의성 극대화 — 재방문율 향상",
        ],
      },
    ],
    aboutTitle: "Zerova Technologies 소개",
    aboutDesc:
      "Zerova Technologies는 EV 충전 장비의 글로벌 제조사로, 가정용 소형 AC 충전기부터 상업용 초고속 DC 충전소까지 폭넓은 충전 솔루션을 제공합니다. 1972년 설립된 Phihong Technology의 자회사로, 2010년부터 EV 충전 R&D를 시작해 2022년 독립 법인으로 출범했습니다. 현재 전 세계 100,000개 이상의 충전 포트를 설치·운영 중이며, 유럽·미국·아시아의 글로벌 자동차 제조사 및 에너지 기업에 서비스를 제공합니다.",
    aboutMission: "Our Mission",
    missionText: "친환경 충전 솔루션으로 일상의 에너지 절약을 실현하고, 전기의 거대한 잠재력을 활용해 자연과 조화를 이루며 지구 전체에 책임감 있고 효율적으로 전력을 공급합니다.",
    aboutVision: "Our Vision",
    visionText: "파트너가 믿고 의지할 수 있는 EV 충전 솔루션 전문 기업으로, 지속 가능한 미래를 향한 글로벌 전동화 전환을 이끌어 나갑니다.",
    customerTitle: "글로벌 주요 파트너",
    certTitle: "인증 및 표준",
    certs: [
      { name: "ISO 9001:2015", desc: "품질경영 시스템" },
      { name: "ISO 14001:2015", desc: "환경경영 시스템" },
      { name: "ISO 45001:2018", desc: "안전보건 경영 시스템" },
      { name: "IATF 16949:2022", desc: "자동차 품질경영 시스템" },
      { name: "OCPP 1.6 Full", desc: "충전 프로토콜 완전 인증" },
      { name: "Energy Star", desc: "미국 EPA 에너지 효율 인증" },
      { name: "UL Listed", desc: "미국 제품 안전 인증" },
      { name: "Eichrecht", desc: "독일 계량법 인증" },
    ],
    whyTitle: "OHI Tech × Zerova 파트너십",
    whys: [
      { title: "글로벌 검증된 제품", desc: "100,000+ 설치 포트, 3개 대륙 운영 실적. 세계 최고 수준 EV 충전 솔루션을 한국 시장에 공급." },
      { title: "원스톱 인프라 컨설팅", desc: "사이트 분석부터 설치, 운영, 유지보수까지 OHI Tech 전담팀이 완전 지원." },
      { title: "OCPP 기반 통합 관제", desc: "기존 CSMS와 즉시 연동. 실시간 원격 모니터링 및 스마트 충전 관리 제공." },
      { title: "맞춤형 비즈니스 모델", desc: "충전 수익화·광고 수익·보조금 활용까지 고객 상황에 최적화된 비즈니스 모델 설계 지원." },
    ],
    ctaTitle: "EV 충전 인프라 도입을 고려 중이신가요?",
    ctaDesc: "제품 상담, 사이트 분석, 설치 견적까지 OHI Tech 전문팀이 빠르게 응대합니다.",
    ctaBtn1: "지금 문의하기",
    ctaBtn2: "도입 사례 보기",
  },
  en: {
    hero: {
      eyebrow: "Zerova Technologies Global Official Partner · OHI Tech Korea Distributor",
      headline: "Empowering\nThe Future.",
      sub: "DC · AC Fast Charging · EV Infrastructure · Total Charging Solutions",
      cta1: "Request Consultation",
      cta2: "View Case Studies",
      stats: [
        { value: "100,000+", label: "Global Charging Ports" },
        { value: "480kW", label: "Max Charging Power" },
        { value: "3 Continents", label: "Global Presence" },
        { value: "OCPP 1.6", label: "International Standard" },
      ],
    },
    productNav: "Product Categories",
    products: [
      {
        id: "dx",
        name: "DX 480/360kW Dispenser DC",
        nameEn: "DX Dispenser DC Charger (US/EMEA)",
        color: "from-emerald-600 to-emerald-800",
        tagline: "Up to 480kW · Wall-mount + Cabinet",
        desc: "High-power dispenser DC fast charger for US and EMEA markets. Wall-mounted installation integrates with DC power cabinets for fleet and logistics hub solutions. Sequential charging technology maximizes efficiency and revenue.",
        lineup: [
          { model: "DX-480", spec: "480kW · CCS1/CHAdeMO · US/EMEA" },
          { model: "DX-360", spec: "360kW · CCS1/CCS2 · Sequential charging" },
        ],
        apps: ["Fleet & Logistics Hubs", "Commercial Parking", "Highway Rest Areas", "Dealerships"],
      },
      {
        id: "dq",
        name: "DQ 480kW Standalone DC",
        nameEn: "DQ Standalone DC Fast Charger",
        color: "from-teal-600 to-teal-800",
        tagline: "Dual Screen · Dynamic Charging · Max ROI",
        desc: "480kW ultra-high-power standalone DC fast charger. Generate advertising revenue with dual-screen digital signage. Dynamic power management and intelligent load balancing boost charging efficiency and revenue generation.",
        lineup: [
          { model: "DQ-480", spec: "480kW · Dual Screen · Dynamic power mgmt" },
          { model: "DQ-480 Media", spec: "21.5-inch LCD · Digital signage · Ad revenue" },
        ],
        apps: ["Mall Parking", "Highway Charging Stations", "Hotels & Resorts", "Hypermarkets"],
      },
      {
        id: "dl",
        name: "DL 480/360kW Dispenser DC",
        nameEn: "DL Dispenser DC Charger (EMEA Only)",
        color: "from-cyan-600 to-cyan-800",
        tagline: "EMEA Only · Slim Compact · Modular",
        desc: "Slim dispenser DC charger designed exclusively for the EMEA market. Modular architecture optimized for high-throughput environments. Ideal for bus depots, heavy-duty truck fleets, and EV charging network operators.",
        lineup: [
          { model: "DL-480", spec: "480kW · EMEA only · CCS2 · Slim design" },
          { model: "DL-360", spec: "360kW · Modular · High-throughput optimized" },
        ],
        apps: ["Bus Depots", "Truck Fleets", "Charging Networks", "Logistics Centers"],
      },
      {
        id: "dt",
        name: "DT 240kW Standalone DC",
        nameEn: "DT Standalone DC Charger",
        color: "from-green-600 to-green-800",
        tagline: "Classic Design · Stylish · High Efficiency",
        desc: "240kW standalone DC fast charger combining classic elegant design with cutting-edge technology. Dynamic power management and intelligent load balancing achieve both efficiency and profitability.",
        lineup: [
          { model: "DT-240", spec: "240kW · CCS1/CCS2 · Dynamic power management" },
          { model: "DT-240 Plus", spec: "240kW · Intelligent load balancing · High efficiency" },
        ],
        apps: ["Commercial Parking", "Gas Stations", "Shopping Centers", "Hotels"],
      },
      {
        id: "ds",
        name: "DS 180/60kW Standalone DC",
        nameEn: "DS Standalone DC Charger",
        color: "from-lime-600 to-lime-800",
        tagline: "Scalable · 90~180kW Modular",
        desc: "Scalable modular standalone DC charger from 90 to 180kW. Flexibly adapts from small parking lots to large charging stations. Also available in compact 60kW model.",
        lineup: [
          { model: "DS-180", spec: "180kW (scalable 90~180kW) · Modular" },
          { model: "DS-60", spec: "60kW · Compact standalone · Cost-effective" },
        ],
        apps: ["SME Parking", "Gas Stations", "Corporate Lots", "Public Charging"],
      },
      {
        id: "dw",
        name: "DW/DM 30kW Compact DC",
        nameEn: "DW Wall-Mounted / DM Moveable DC",
        color: "from-emerald-500 to-emerald-700",
        tagline: "Wall-mount · Portable · Small Fleet Ready",
        desc: "30kW wall-mounted (DW) and 30kW moveable/portable (DM) DC chargers. Optimized for space-constrained environments and mobile fleet operations. Flexible charging infrastructure with easy installation and portability.",
        lineup: [
          { model: "DW-30", spec: "30kW · Wall-mounted · Space-efficient" },
          { model: "DM-30", spec: "30kW · Moveable/portable · Fleet dedicated" },
        ],
        apps: ["Small Parking", "Mobile Charging Services", "Warehouses", "Corporate Lots"],
      },
      {
        id: "ax",
        name: "AX 32A/48A/80A AC Charger",
        nameEn: "AX AC Charger",
        color: "from-sky-600 to-sky-800",
        tagline: "Multiple Current Options · Full OCPP 1.6",
        desc: "AC charger with three current options: 32A, 48A, and 80A. Full OCPP 1.6 certification. Optimized for both residential and commercial environments. Energy Star and UL certified.",
        lineup: [
          { model: "AX-80A", spec: "80A · 19.2kW · High-power residential/commercial" },
          { model: "AX-48A", spec: "48A · 11.5kW · General purpose · OCPP 1.6" },
          { model: "AX-32A", spec: "32A · 7.7kW · Economy · UL listed" },
        ],
        apps: ["Residential Complexes", "Office Buildings", "Hotels", "Retail Parking"],
      },
      {
        id: "aw",
        name: "AW 48A/32A AC Charger",
        nameEn: "AW AC Charger (US Market)",
        color: "from-indigo-600 to-indigo-800",
        tagline: "US Market · Energy Star Certified · Elegant Design",
        desc: "High-performance AC charger designed for the US market. Energy Star certified for guaranteed energy efficiency. Elegant design with UL listing for premium residential and commercial applications.",
        lineup: [
          { model: "AW-48A", spec: "48A · 11kW · US market · Energy Star" },
          { model: "AW-32A", spec: "32A · 7.7kW · UL listed · Economy" },
        ],
        apps: ["US Residential", "US Commercial", "Apartment Complexes", "Corporate Parking"],
      },
    ],
    solutionsTitle: "Industry Charging Solutions",
    solutionsSub: "Zerova EV charging technology across key industry verticals",
    solutionsCta: "Inquire About This Solution",
    solutionsCustomerLabel: "Global Partners",
    solutions: [
      {
        id: "commercial",
        name: "Commercial Buildings",
        color: "bg-slate-700",
        challenge: "Multi-vehicle simultaneous charging, space constraints, ROI",
        highlight: "Up to 480kW multi-port · Smart load balancing",
        models: ["DQ-480", "DT-240", "AX-48A"],
        metrics: [
          { value: "480kW", label: "Max Output" },
          { value: "Multi-port", label: "Simultaneous" },
          { value: "OCPP", label: "Smart Management" },
        ],
        points: [
          "DQ 480kW dual-screen charger generates advertising revenue — turning charging infrastructure from cost to profit center",
          "Smart load balancing manages peak demand — optimize contracted power capacity and reduce operating costs",
          "Full OCPP 1.6 compliance enables immediate integration with existing CSMS — unified management and remote monitoring",
        ],
      },
      {
        id: "residential",
        name: "Residential",
        color: "bg-emerald-800",
        challenge: "Apartment EV charging infrastructure, billing, management ease",
        highlight: "Smart billing · Energy Star · Easy installation",
        models: ["AX-32A", "AW-48A", "AX-48A"],
        metrics: [
          { value: "Energy", label: "Star Certified" },
          { value: "OCPP", label: "Billing Integration" },
          { value: "UL/CE", label: "Safety Certified" },
        ],
        points: [
          "Energy Star and UL certified AC chargers for safe and efficient overnight charging — reduced electricity costs",
          "OCPP-based smart billing system integration for accurate per-unit usage billing — streamlined management",
          "Simple wall installation minimizes construction costs — leverages existing electrical infrastructure",
        ],
      },
      {
        id: "parking",
        name: "Outdoor Parking",
        color: "bg-blue-800",
        challenge: "Weather durability, vandalism resistance, high availability",
        highlight: "IP54+ weatherproof · 24/7 uptime · Remote monitoring",
        models: ["DX-480", "DS-180", "DT-240"],
        metrics: [
          { value: "IP54+", label: "Ingress Protection" },
          { value: "24/7", label: "Continuous Operation" },
          { value: "Remote", label: "Monitoring" },
        ],
        points: [
          "IP54+ ingress protection ensures stable operation in harsh outdoor conditions — reduced maintenance costs",
          "Remote monitoring system enables 24/7 status tracking and immediate fault response — maximize uptime",
          "Dynamic power distribution optimizes simultaneous multi-charger operation — capture both parking and charging revenue",
        ],
      },
      {
        id: "gasstation",
        name: "Gas Stations",
        color: "bg-orange-800",
        challenge: "Utilize existing gas station space, fast turnover, additional revenue",
        highlight: "Ultra-fast charging · Quick turnover · Media revenue",
        models: ["DQ-480", "DS-180", "DT-240"],
        metrics: [
          { value: "15 min", label: "Target: 80% SoC" },
          { value: "Media", label: "Revenue" },
          { value: "Hybrid", label: "Energy Station" },
        ],
        points: [
          "480kW ultra-fast charging targets 80% charge in 15 minutes — achieving gas station-level turnover rates",
          "DQ series digital signage generates advertising revenue during charging sessions — new revenue stream",
          "Parallel operation alongside existing fueling infrastructure allows gradual transition — minimizes initial investment risk",
        ],
      },
      {
        id: "fleet",
        name: "Commercial Fleets",
        color: "bg-slate-600",
        challenge: "Large-scale simultaneous charging, schedule management, TCO",
        highlight: "Sequential charging · Schedule management · TCO reduction",
        models: ["DX-480", "DL-480", "DS-180"],
        metrics: [
          { value: "Sequential", label: "Charging Tech" },
          { value: "Schedule", label: "Management" },
          { value: "TCO", label: "Reduction" },
        ],
        points: [
          "DX/DL sequential charging distributes peak power — charge multiple vehicles efficiently without exceeding contracted capacity",
          "Integrated CSMS tracks per-vehicle charging schedules, history, and costs — reduce fleet operating TCO",
          "Optimized charging solutions for buses, trucks, and delivery vehicles across all commercial vehicle types",
        ],
      },
      {
        id: "hospitality",
        name: "Shopping Centers & Hospitality",
        color: "bg-violet-800",
        challenge: "Customer dwell-time charging, premium image, brand experience",
        highlight: "Premium design · Media display · Customer experience",
        models: ["DQ-480", "DT-240", "AX-48A"],
        metrics: [
          { value: "Media", label: "Display" },
          { value: "Premium", label: "Design" },
          { value: "App", label: "Billing" },
        ],
        points: [
          "DQ/DT series elegant design perfectly complements shopping malls and hotels — enhances brand value",
          "Digital signage displays customized advertising and promotional content — enables retail partner collaboration",
          "App-based payment and reservation integration maximizes customer convenience — increases return visits",
        ],
      },
    ],
    aboutTitle: "About Zerova Technologies",
    aboutDesc:
      "Zerova Technologies is a global manufacturer of EV charging equipment, offering solutions from compact AC home chargers to ultra-fast DC commercial charging stations with media display functions and scalable hubs. Founded as an R&D division under Phihong Technology (est. 1972) in 2010, Zerova became a standalone company in 2022. Today, Zerova has installed more than 100,000 charging ports worldwide, serving global automakers and energy companies across Europe, America, and Asia.",
    aboutMission: "Our Mission",
    missionText: "To provide eco-friendly charging solutions that fulfill everyday energy-saving needs — harnessing the enormous potential of electricity, working in harmony with nature, and responsibly and effectively powering the entire planet.",
    aboutVision: "Our Vision",
    visionText: "To be the reliable partner in EV charging that customers can trust — leading the global electrification transition toward a sustainable future.",
    customerTitle: "Key Global Partners",
    certTitle: "Certifications & Standards",
    certs: [
      { name: "ISO 9001:2015", desc: "Quality Management System" },
      { name: "ISO 14001:2015", desc: "Environmental Management System" },
      { name: "ISO 45001:2018", desc: "Occupational Health & Safety" },
      { name: "IATF 16949:2022", desc: "Automotive Quality Management" },
      { name: "OCPP 1.6 Full", desc: "Full Protocol Certification" },
      { name: "Energy Star", desc: "US EPA Energy Efficiency" },
      { name: "UL Listed", desc: "US Product Safety Certification" },
      { name: "Eichrecht", desc: "German Metering Compliance" },
    ],
    whyTitle: "Why OHI Tech × Zerova",
    whys: [
      { title: "Globally Proven Products", desc: "100,000+ installed ports across 3 continents. Bringing world-class EV charging solutions to the Korean market." },
      { title: "One-stop Infrastructure Consulting", desc: "From site analysis to installation, operation, and maintenance — OHI Tech's dedicated team provides full support." },
      { title: "OCPP-based Smart Management", desc: "Immediate integration with existing CSMS. Real-time remote monitoring and smart charging management." },
      { title: "Tailored Business Models", desc: "We design optimal business models for your situation — from charging revenue and ad income to subsidy utilization." },
    ],
    ctaTitle: "Considering EV Charging Infrastructure?",
    ctaDesc: "From product consultation and site analysis to installation quotes — OHI Tech's expert team responds fast.",
    ctaBtn1: "Contact Us Now",
    ctaBtn2: "View Case Studies",
  },
  zh: {
    hero: {
      eyebrow: "Zerova Technologies 全球官方合作伙伴 · OHI Tech 韩国总代理",
      headline: "Empowering\nThe Future.",
      sub: "DC·AC快充 · EV基础设施 · 充电解决方案专家",
      cta1: "产品咨询",
      cta2: "查看案例",
      stats: [
        { value: "100,000+", label: "全球安装端口" },
        { value: "480kW", label: "最大充电功率" },
        { value: "3大洲", label: "全球市场" },
        { value: "OCPP 1.6", label: "国际标准认证" },
      ],
    },
    productNav: "产品分类",
    products: [
      {
        id: "dx",
        name: "DX 480/360kW 分体式DC",
        nameEn: "DX Dispenser DC Charger (US/EMEA)",
        color: "from-emerald-600 to-emerald-800",
        tagline: "最大480kW · 壁挂+电源柜",
        desc: "专为美国·EMEA市场设计的高功率分体式DC快速充电桩。壁挂安装与DC电源柜集成，专为车队和物流枢纽优化。顺序充电技术最大化效率和收益。",
        lineup: [
          { model: "DX-480", spec: "480kW · CCS1/CHAdeMO · 美国·EMEA市场" },
          { model: "DX-360", spec: "360kW · CCS1/CCS2 · 支持顺序充电" },
        ],
        apps: ["车队·物流枢纽", "商业停车场", "高速公路服务区", "经销商"],
      },
      {
        id: "dq",
        name: "DQ 480kW 一体式DC",
        nameEn: "DQ Standalone DC Fast Charger",
        color: "from-teal-600 to-teal-800",
        tagline: "双屏·动态充电·最高ROI",
        desc: "480kW超高功率一体式DC快速充电桩。双屏数字标牌创造广告收入。动态电源管理和智能负载均衡提升充电效率和收益。",
        lineup: [
          { model: "DQ-480", spec: "480kW · 双屏 · 动态电源管理" },
          { model: "DQ-480 Media", spec: "21.5英寸LCD · 数字标牌 · 广告收益" },
        ],
        apps: ["商场停车场", "高速充电站", "酒店·度假村", "大型超市"],
      },
      {
        id: "dl",
        name: "DL 480/360kW 分体式DC",
        nameEn: "DL Dispenser DC Charger (EMEA Only)",
        color: "from-cyan-600 to-cyan-800",
        tagline: "仅限EMEA · 纤薄紧凑 · 模块化",
        desc: "专为EMEA市场设计的纤薄分体式DC充电桩。针对高吞吐量环境优化的模块化架构。非常适合公交车场、重型卡车车队和充电网络运营商。",
        lineup: [
          { model: "DL-480", spec: "480kW · 仅限EMEA · CCS2 · 纤薄设计" },
          { model: "DL-360", spec: "360kW · 模块化 · 高吞吐量优化" },
        ],
        apps: ["公交车场", "卡车车队", "充电网络", "物流中心"],
      },
      {
        id: "dt",
        name: "DT 240kW 一体式DC",
        nameEn: "DT Standalone DC Charger",
        color: "from-green-600 to-green-800",
        tagline: "经典设计·时尚·高效",
        desc: "240kW一体式DC快速充电桩，将经典优雅设计与尖端技术相结合。动态电源管理和智能负载均衡同时实现效率和盈利性。",
        lineup: [
          { model: "DT-240", spec: "240kW · CCS1/CCS2 · 动态电源管理" },
          { model: "DT-240 Plus", spec: "240kW · 智能负载均衡 · 高效率" },
        ],
        apps: ["商业停车场", "加油站", "购物中心", "酒店"],
      },
      {
        id: "ds",
        name: "DS 180/60kW 一体式DC",
        nameEn: "DS Standalone DC Charger",
        color: "from-lime-600 to-lime-800",
        tagline: "可扩展 · 90~180kW模块化",
        desc: "90~180kW可扩展模块化一体式DC充电桩。灵活适应从小型停车场到大型充电站的需求。同时提供紧凑型60kW型号。",
        lineup: [
          { model: "DS-180", spec: "180kW（可扩展90~180kW）· 模块化" },
          { model: "DS-60", spec: "60kW · 紧凑型一体式 · 经济实惠" },
        ],
        apps: ["中小型停车场", "加油站", "企业停车场", "公共充电站"],
      },
      {
        id: "dw",
        name: "DW/DM 30kW 小型DC",
        nameEn: "DW Wall-Mounted / DM Moveable DC",
        color: "from-emerald-500 to-emerald-700",
        tagline: "壁挂·可移动·小型车队",
        desc: "30kW壁挂式(DW)和30kW可移动(DM)DC充电桩。专为空间受限环境和需要移动的车队优化。便于安装和携带，构建灵活充电基础设施。",
        lineup: [
          { model: "DW-30", spec: "30kW · 壁挂式 · 空间效率优化" },
          { model: "DM-30", spec: "30kW · 可移动·便携式 · 车队专用" },
        ],
        apps: ["小型停车场", "移动充电服务", "仓库·物流", "企业停车场"],
      },
      {
        id: "ax",
        name: "AX 32A/48A/80A 交流充电桩",
        nameEn: "AX AC Charger",
        color: "from-sky-600 to-sky-800",
        tagline: "多电流选项 · 完整OCPP 1.6认证",
        desc: "提供32A、48A、80A三种电流选项的交流充电桩。完整OCPP 1.6认证。适用于住宅和商业环境。获Energy Star和UL认证。",
        lineup: [
          { model: "AX-80A", spec: "80A · 19.2kW · 高功率住宅/商业" },
          { model: "AX-48A", spec: "48A · 11.5kW · 通用 · OCPP 1.6" },
          { model: "AX-32A", spec: "32A · 7.7kW · 经济型 · UL认证" },
        ],
        apps: ["住宅小区", "写字楼", "酒店", "零售停车场"],
      },
      {
        id: "aw",
        name: "AW 48A/32A 交流充电桩",
        nameEn: "AW AC Charger (US Market)",
        color: "from-indigo-600 to-indigo-800",
        tagline: "美国市场 · Energy Star认证 · 优雅设计",
        desc: "专为美国市场设计的高性能交流充电桩。Energy Star认证保证能效。优雅设计配合UL认证，专为高端住宅和商业市场打造。",
        lineup: [
          { model: "AW-48A", spec: "48A · 11kW · 美国专用 · Energy Star" },
          { model: "AW-32A", spec: "32A · 7.7kW · UL认证 · 经济型" },
        ],
        apps: ["美国住宅", "美国商业", "公寓小区", "企业停车场"],
      },
    ],
    solutionsTitle: "行业充电解决方案",
    solutionsSub: "Zerova EV充电技术覆盖的主要行业领域",
    solutionsCta: "咨询此方案",
    solutionsCustomerLabel: "全球合作伙伴",
    solutions: [
      {
        id: "commercial",
        name: "商业建筑",
        color: "bg-slate-700",
        challenge: "多车辆同时充电、空间限制、盈利性",
        highlight: "最大480kW多端口 · 智能负载均衡",
        models: ["DQ-480", "DT-240", "AX-48A"],
        metrics: [
          { value: "480kW", label: "最大输出" },
          { value: "多端口", label: "同时充电" },
          { value: "OCPP", label: "智能管理" },
        ],
        points: [
          "DQ 480kW双屏充电桩创造广告收入——充电基础设施从成本转变为利润中心",
          "智能负载均衡管理峰值需求——优化合同电力容量，降低运营成本",
          "完整OCPP 1.6兼容，立即与现有CSMS集成——统一管理和远程监控",
        ],
      },
      {
        id: "residential",
        name: "住宅设施",
        color: "bg-emerald-800",
        challenge: "公寓EV充电基础设施、计费系统、管理便利性",
        highlight: "智能计费 · Energy Star认证 · 简便安装",
        models: ["AX-32A", "AW-48A", "AX-48A"],
        metrics: [
          { value: "Energy", label: "Star认证" },
          { value: "OCPP", label: "计费集成" },
          { value: "UL/CE", label: "安全认证" },
        ],
        points: [
          "Energy Star和UL认证交流充电桩，安全高效夜间充电——降低电费",
          "基于OCPP的智能计费系统集成，精确按户计量——简化管理",
          "简便壁挂安装最大限度减少施工成本——充分利用现有电气基础设施",
        ],
      },
      {
        id: "parking",
        name: "户外停车场",
        color: "bg-blue-800",
        challenge: "耐候性、防破坏、高可用性运营",
        highlight: "IP54+防水防尘 · 24/7高可用性 · 远程监控",
        models: ["DX-480", "DS-180", "DT-240"],
        metrics: [
          { value: "IP54+", label: "防护等级" },
          { value: "24/7", label: "连续运营" },
          { value: "远程", label: "监控" },
        ],
        points: [
          "IP54以上防水防尘等级，恶劣户外环境下稳定运营——降低维护成本",
          "远程监控系统实现24小时状态追踪和即时故障响应——最大化在线率",
          "动态电力分配优化多充电桩同时运营——同时获得停车和充电收益",
        ],
      },
      {
        id: "gasstation",
        name: "加油站·能源站",
        color: "bg-orange-800",
        challenge: "利用现有加油站空间、快速周转、额外收益",
        highlight: "超快充电 · 快速周转 · 媒体收益",
        models: ["DQ-480", "DS-180", "DT-240"],
        metrics: [
          { value: "15分钟", label: "目标80%充电" },
          { value: "媒体", label: "收益创造" },
          { value: "复合", label: "能源站" },
        ],
        points: [
          "480kW超快充电目标15分钟达到80%——实现加油站级别的快速周转率",
          "DQ系列数字标牌在充电等待期间创造广告收入——新收益渠道",
          "与现有加油设施并行运营，逐步过渡——最大限度降低初期投资风险",
        ],
      },
      {
        id: "fleet",
        name: "商业车队",
        color: "bg-slate-600",
        challenge: "大规模同时充电、计划管理、TCO优化",
        highlight: "顺序充电技术 · 计划充电 · TCO降低",
        models: ["DX-480", "DL-480", "DS-180"],
        metrics: [
          { value: "顺序", label: "充电技术" },
          { value: "计划", label: "充电管控" },
          { value: "TCO", label: "优化降低" },
        ],
        points: [
          "DX/DL顺序充电技术分散峰值电力——不超过合同容量高效充多辆车",
          "集成CSMS跟踪每辆车的充电计划、记录和费用——降低车队运营TCO",
          "针对公共汽车、卡车和配送车辆的优化充电解决方案",
        ],
      },
      {
        id: "hospitality",
        name: "购物中心·酒店",
        color: "bg-violet-800",
        challenge: "客户停留时间充电、高端形象、品牌体验",
        highlight: "高端设计 · 媒体显示 · 客户体验",
        models: ["DQ-480", "DT-240", "AX-48A"],
        metrics: [
          { value: "媒体", label: "显示" },
          { value: "高端", label: "设计" },
          { value: "App", label: "计费集成" },
        ],
        points: [
          "DQ/DT系列优雅设计与购物中心和酒店空间完美融合——提升品牌价值",
          "数字标牌展示定制广告和促销内容——实现零售合作伙伴协作",
          "App支付和预约系统集成最大化客户便利性——提高回访率",
        ],
      },
    ],
    aboutTitle: "Zerova Technologies 公司介绍",
    aboutDesc:
      "Zerova Technologies是EV充电设备的全球制造商，提供从家用紧凑型交流充电桩到超快速直流商业充电站及带媒体显示功能的大屏充电桩等全系列充电解决方案。作为1972年成立的Phihong Technology的子公司，Zerova自2010年开始EV充电研发，并于2022年成为独立公司。目前已在全球安装超过100,000个充电端口，为欧洲、美国和亚洲的全球汽车制造商及能源公司提供服务。",
    aboutMission: "使命",
    missionText: "提供满足日常节能需求的环保充电解决方案——充分利用电力的巨大潜力，与自然和谐共处，负责任地高效为整个地球供电。",
    aboutVision: "愿景",
    visionText: "成为客户可以信赖的EV充电解决方案专业企业，引领全球电动化转型走向可持续未来。",
    customerTitle: "全球主要合作伙伴",
    certTitle: "认证与标准",
    certs: [
      { name: "ISO 9001:2015", desc: "质量管理体系" },
      { name: "ISO 14001:2015", desc: "环境管理体系" },
      { name: "ISO 45001:2018", desc: "职业健康安全管理" },
      { name: "IATF 16949:2022", desc: "汽车质量管理体系" },
      { name: "OCPP 1.6 Full", desc: "完整协议认证" },
      { name: "Energy Star", desc: "美国EPA能效认证" },
      { name: "UL Listed", desc: "美国产品安全认证" },
      { name: "Eichrecht", desc: "德国计量法合规" },
    ],
    whyTitle: "为何选择 OHI Tech × Zerova",
    whys: [
      { title: "全球验证产品", desc: "100,000+安装端口，覆盖3大洲。将世界级EV充电解决方案引入韩国市场。" },
      { title: "一站式基础设施咨询", desc: "从选址分析到安装、运营和维护——OHI Tech专属团队提供全程支持。" },
      { title: "基于OCPP的智能管理", desc: "即时与现有CSMS集成。实时远程监控和智能充电管理。" },
      { title: "定制商业模式", desc: "为您的具体情况设计最优商业模式——充电收益、广告收入到补贴利用。" },
    ],
    ctaTitle: "正在考虑EV充电基础设施？",
    ctaDesc: "从产品咨询、选址分析到安装报价——OHI Tech专业团队快速响应。",
    ctaBtn1: "立即联系",
    ctaBtn2: "查看案例",
  },
};

const PARTNERS = ["Shell Recharge", "BYD", "Bosch", "Audi", "Jaguar", "Porsche", "Zenobē", "VDL", "TCC", "Noodoe EV", "plugit", "ChargeLab", "e4you", "EDRV"];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function EVSection({ locale }: { locale: Locale }) {
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
            backgroundImage: "linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <p className="text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-4">{c.hero.eyebrow}</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight whitespace-pre-line">
            {c.hero.headline}
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-10 max-w-xl">{c.hero.sub}</p>
          <div className="flex flex-wrap gap-3 mb-14">
            <Link
              href={`/contact?lang=${locale}&type=inquiry&category=ev-charging`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=sample&category=ev-charging`}
              className="border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta2}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-10">
            {c.hero.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-emerald-400">{s.value}</div>
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
              ? "Zerova의 전 제품군 — DC 급속충전부터 AC 스마트 충전까지"
              : locale === "en"
              ? "Full Zerova product range — DC fast charging to AC smart charging"
              : "Zerova全系列产品——DC快充到AC智能充电"}
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
                      className="w-9 h-9 object-contain rounded-lg shrink-0 bg-white"
                    />
                    <span className="leading-snug">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product detail */}
            <div className="flex-1 min-w-0">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 overflow-hidden">
                {/* Product header */}
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
                      className="w-28 h-28 object-contain rounded-2xl shrink-0 shadow-lg ring-1 ring-slate-200 bg-white"
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
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                          {app}
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/contact?lang=${locale}&type=quote&category=ev-charging&product=${currentProduct.id}`}
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
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
                {/* Hero image */}
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
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-slate-100">
                    {currentSolution.metrics.map((m, i) => (
                      <div key={i} className="text-center bg-slate-50 rounded-xl py-3 px-2">
                        <div className="text-lg font-black text-[var(--accent)]">{m.value}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Key points */}
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

                  {/* Recommended models + partners */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-5 border-t border-slate-100">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        {locale === "ko" ? "권장 모델" : locale === "en" ? "Recommended Models" : "推荐型号"}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {currentSolution.models.map((m) => (
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

                  {/* CTA */}
                  <div className="mt-6">
                    <Link
                      href={`/contact?lang=${locale}&type=inquiry&category=ev-charging&solution=${currentSolution.id}`}
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
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
          SECTION 4: ABOUT ZEROVA
      ══════════════════════════════════════ */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-3">
                Zerova Technologies Co., Ltd.
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{c.aboutTitle}</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{c.aboutDesc}</p>
              <div className="space-y-4">
                <div className="border-l-4 border-emerald-500 pl-4">
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
                  {locale === "ko" ? "글로벌 거점" : locale === "en" ? "Global Offices" : "全球分支机构"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {["🇹🇼 Taiwan HQ", "🇺🇸 USA", "🇩🇪 EMEA", "🇯🇵 Japan", "🇻🇳 Vietnam", "🇰🇷 Korea"].map((g) => (
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
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-emerald-600 text-[10px] font-black">✓</span>
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
                {PARTNERS.map((name) => (
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
          SECTION 5: WHY OHI TECH × ZEROVA
      ══════════════════════════════════════ */}
      <section className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-10">{c.whyTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.whys.map((w, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-4">
                  <span className="text-emerald-400 font-black text-sm">0{i + 1}</span>
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
              href={`/contact?lang=${locale}&type=inquiry&category=ev-charging`}
              className="bg-white text-[var(--primary)] hover:bg-gray-50 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg"
            >
              {c.ctaBtn1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=sample&category=ev-charging`}
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
