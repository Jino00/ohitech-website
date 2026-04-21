"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";

/* ─────────────────────────────────────────────
   GRANDHITEK PRODUCT COLOR / ABBR (no public CDN)
───────────────────────────────────────────── */
const PRODUCT_COLOR: Record<string, string> = {
  glr:     "bg-[var(--primary)]",
  gmr:     "bg-[var(--primary)]",
  ghc:     "bg-[var(--primary)]",
  ghr:     "bg-[var(--primary)]",
  turbo:   "bg-[var(--primary)]",
  scrubber:"bg-[var(--primary)]",
  megrez:  "bg-[var(--primary)]",
  merak:   "bg-[var(--primary)]",
};

const PRODUCT_ABBR: Record<string, string> = {
  glr:     "GLR",
  gmr:     "GMR",
  ghc:     "GHC",
  ghr:     "GHR",
  turbo:   "TMP",
  scrubber:"SCR",
  megrez:  "MGZ",
  merak:   "MRK",
};

const SOLUTION_BG: Record<string, string> = {
  semi:     "bg-[var(--primary)]",
  fpd:      "bg-[var(--primary)]",
  solar:    "bg-[var(--primary)]",
  battery:  "bg-[var(--primary)]",
  led:      "bg-[var(--primary)]",
  hydrogen: "bg-[var(--primary)]",
};

const SOLUTION_CUSTOMERS: Record<string, string[]> = {
  semi:     ["SMIC", "CXMT", "HH Group", "YMTC", "Huawei", "BYD"],
  fpd:      ["BOE", "LG Display", "TCL", "Tianma"],
  solar:    ["Longi", "JA Solar", "Jinko Solar", "Tongwei"],
  battery:  ["CATL", "BYD", "CALB", "SVOLT"],
  led:      ["Sanan Optoelectronics", "Ennostar", "HC SemiTek"],
  hydrogen: ["Sinopec", "CNOOC", "Hyundai", "Toyota"],
};

const PARTNERS = ["SMIC", "CXMT", "YMTC", "BOE", "LG Display", "CATL", "BYD", "Longi", "JA Solar", "Huawei", "Samsung", "SK Hynix"];

/* ─────────────────────────────────────────────
   STATIC CONTENT
───────────────────────────────────────────── */

const LANG = {
  ko: {
    hero: {
      eyebrow: "通嘉科技 / Grand Hitek 공식 파트너 · OHI Tech 한국 총판",
      headline: "세계를 지탱하는\n진공 기술.",
      sub: "드라이 진공 펌프 · 스크러버 · 통합 시스템 — 반도체·디스플레이·배터리 공정의 핵심",
      cta1: "제품 상담 문의",
      cta2: "기술 자료 요청",
      stats: [
        { value: "30,000+", label: "누적 출하 대수" },
        { value: "2,000대/월", label: "월 생산 능력" },
        { value: "100+ 명", label: "R&D 인력" },
        { value: "12,000h+", label: "최대 연속 운전" },
      ],
    },
    ppacs: {
      title: "PPACS — Grand Hitek 5대 차별화",
      items: [
        { key: "P", label: "Performance better", desc: "경쟁사 대비 최고 성능 — 동급 최강 배기 속도와 극한진공 달성" },
        { key: "P", label: "Power lower", desc: "에너지 50% 절감 — GMR 시리즈 0.8kW vs 경쟁사 1.6kW" },
        { key: "A", label: "Area smaller", desc: "소형화 — 기존 드라이 펌프 대비 설치 면적 30%↓" },
        { key: "C", label: "Cost lower", desc: "비용 절감 — TCO 최적화, 유지보수 비용 최소화" },
        { key: "S", label: "Safety better", desc: "안전성 강화 — SEMI S2·ETL·CE 등 국제 안전 인증 완비" },
      ],
    },
    productNav: "제품 카테고리",
    products: [
      {
        id: "glr",
        name: "GLR 시리즈",
        nameEn: "GLR Series — Roots Light-Duty",
        color: "bg-[var(--primary)]",
        tagline: "120 / 600 / 1,200 m³/h · 저소음",
        desc: "경부하 환경에 최적화된 Roots 드라이 진공 펌프. 저소음·저진동 설계로 클린룸 내 설치에 적합. CVD·PVD·ALD 등 표준 반도체 공정에 광범위하게 적용.",
        lineup: [
          { model: "GLR-120", spec: "120 m³/h · 경부하 · 저소음 클린룸용" },
          { model: "GLR-600", spec: "600 m³/h · 중형 공정 대응" },
          { model: "GLR-1200", spec: "1,200 m³/h · 대용량 챔버 대응" },
        ],
        apps: ["CVD / ALD", "PVD / IMP", "LPCVD", "Strip / Ashing"],
      },
      {
        id: "gmr",
        name: "GMR 시리즈",
        nameEn: "GMR Series — Roots Mid-Duty",
        color: "bg-[var(--primary)]",
        tagline: "200~1,800 m³/h · 에너지 50% 절감",
        desc: "중부하 공정 전용 Roots 드라이 진공 펌프. 경쟁사 1.6kW 대비 0.8kW 소비전력으로 에너지 50% 절감. 반도체 Logic·DRAM·NAND Flash 양산 라인의 핵심 펌프.",
        lineup: [
          { model: "GMR-200", spec: "200 m³/h · 0.8kW · 에너지 절감 최적화" },
          { model: "GMR-600", spec: "600 m³/h · 중형 ~ 대형 챔버" },
          { model: "GMR-1200", spec: "1,200 m³/h · 대용량 공정" },
          { model: "GMR-1800", spec: "1,800 m³/h · 최대 용량 · 양산 전용" },
        ],
        apps: ["ETCH / CVD", "DRAM / NAND", "Logic 반도체", "FPD / TFT"],
      },
      {
        id: "ghc",
        name: "GHC 시리즈",
        nameEn: "GHC Series — Claw Pump (Harsh)",
        color: "bg-[var(--primary)]",
        tagline: "200~6,000 m³/h · 부식성·활성 가스",
        desc: "혹독한 환경용 Claw 타입 드라이 진공 펌프. 부식성 가스·활성 가스·파우더 함유 공정에 최적. 내화학성 코팅과 자체 세정 기능으로 유지보수 주기 대폭 연장.",
        lineup: [
          { model: "GHC-200", spec: "200 m³/h · 내부식 코팅 · 소형" },
          { model: "GHC-1200", spec: "1,200 m³/h · 중형 · 자체 세정" },
          { model: "GHC-6000", spec: "6,000 m³/h · 최대 용량 · 극한 환경" },
        ],
        apps: ["ETCH (부식성)", "CVD / HDP", "태양광 Diffusion", "화합물 반도체"],
      },
      {
        id: "ghr",
        name: "GHR 시리즈",
        nameEn: "GHR Series — Hydrogen FCEV",
        color: "bg-[var(--primary)]",
        tagline: "600 m³/h · H₂ 전용 · FCEV 적용",
        desc: "수소 가스 전용 Roots 드라이 진공 펌프. 수소연료전지차(FCEV) 수소 스테이션 및 수소 생산 설비에 적용. 수소 안전 규격 완전 준수, 방폭 설계.",
        lineup: [
          { model: "GHR-600", spec: "600 m³/h · H₂ 전용 · 방폭 설계" },
        ],
        apps: ["FCEV 수소 스테이션", "수소 생산 설비", "수소 저장·이송", "전해조 (Electrolyzer)"],
      },
      {
        id: "turbo",
        name: "터보 분자 펌프",
        nameEn: "Turbo Molecular Pump",
        color: "bg-[var(--primary)]",
        tagline: "고진공 · UHV 대응",
        desc: "초고진공(UHV) 환경 구현을 위한 터보 분자 펌프. 이온 주입·전자빔·표면분석 장비 등 극한 진공이 요구되는 공정에 적용.",
        lineup: [
          { model: "TMP Series", spec: "고진공 · UHV 대응 · 다양한 배기 속도" },
        ],
        apps: ["이온 주입 (Ion Implant)", "전자빔 장비", "표면 분석", "SIMS / Auger"],
      },
      {
        id: "scrubber",
        name: "스크러버",
        nameEn: "Exhaust Gas Scrubber",
        color: "bg-[var(--primary)]",
        tagline: "배기가스 무해화 처리",
        desc: "반도체·디스플레이·태양광 공정에서 발생하는 유해 배기가스를 안전하게 처리하는 스크러버 시스템. 연소형·습식형·플라즈마형 선택 가능.",
        lineup: [
          { model: "Burn Scrubber", spec: "연소 방식 · SiH₄·NF₃·WF₆ 처리" },
          { model: "Wet Scrubber", spec: "습식 방식 · 수용성 가스 처리" },
          { model: "Plasma Scrubber", spec: "플라즈마 방식 · 고효율 분해" },
        ],
        apps: ["CVD 배기 처리", "ETCH 배기 처리", "PVD 배기 처리", "환경 안전 규제 대응"],
      },
      {
        id: "megrez",
        name: "Megrez 통합 시스템",
        nameEn: "Megrez Integrated System",
        color: "bg-[var(--primary)]",
        tagline: "드라이 펌프 + 스크러버 통합",
        desc: "드라이 진공 펌프와 스크러버를 하나의 플랫폼에 통합한 Megrez 시스템. 배관 연결 최소화, 설치 공간 절감, 단일 인터페이스로 운영. 반도체·디스플레이 신규 팹 최적.",
        lineup: [
          { model: "Megrez-M", spec: "중형 통합 · 드라이 펌프 + 스크러버" },
          { model: "Megrez-L", spec: "대형 통합 · 고용량 공정 대응" },
        ],
        apps: ["신규 반도체 팹", "FPD 제조라인", "태양광 공장", "일체형 솔루션"],
      },
      {
        id: "merak",
        name: "Merak 통합 시스템",
        nameEn: "Merak Compact Integrated System",
        color: "bg-[var(--primary)]",
        tagline: "소형 통합 솔루션 · 공간 절약",
        desc: "소형 공정 환경을 위한 컴팩트 통합 드라이 진공 펌프 + 스크러버 시스템. Megrez 대비 소형화, 연구소·R&D 라인·소규모 양산 팹에 최적.",
        lineup: [
          { model: "Merak-S", spec: "소형 통합 · R&D / 파일럿 라인 전용" },
        ],
        apps: ["R&D 연구소", "파일럿 라인", "소규모 양산", "대학·연구기관"],
      },
    ],
    solutionsTitle: "산업별 진공 솔루션",
    solutionsSub: "Grand Hitek 드라이 진공 기술이 적용되는 주요 산업 분야",
    solutionsCta: "이 솔루션 문의",
    solutionsCustomerLabel: "주요 고객사",
    solutions: [
      {
        id: "semi",
        name: "반도체 (Logic / DRAM / NAND)",
        color: "bg-[var(--primary)]",
        challenge: "고진공 유지, 부식성 가스 처리, 에너지 비용 절감",
        highlight: "에너지 50% 절감 · SEMI S2 인증 · 12,000h+ 연속 운전",
        models: ["GMR-1200", "GHC-1200", "Megrez-L"],
        metrics: [
          { value: "50%", label: "에너지 절감" },
          { value: "SEMI S2", label: "안전 인증" },
          { value: "12,000h+", label: "연속 운전" },
        ],
        points: [
          "GMR 시리즈 에너지 절감 설계(0.8kW vs 경쟁사 1.6kW)로 팹 전체 전력비 대폭 절감 — 반도체 제조 원가 경쟁력 강화",
          "SEMI S2·S6·S8 국제 안전 인증 완비 — 주요 글로벌 팹의 장비 도입 자격 요건 충족",
          "12,000시간 이상 연속 운전 실적으로 계획되지 않은 다운타임 최소화 — 웨이퍼 수율 보호",
        ],
      },
      {
        id: "fpd",
        name: "FPD / 디스플레이",
        color: "bg-[var(--primary)]",
        challenge: "대면적 챔버 고용량 배기, 공정 가스 안전 처리",
        highlight: "대용량 6,000 m³/h · 통합 스크러버 · 공간 절약",
        models: ["GHC-6000", "GMR-1800", "Megrez-L"],
        metrics: [
          { value: "6,000", label: "m³/h 최대 용량" },
          { value: "대면적", label: "챔버 대응" },
          { value: "통합", label: "스크러버" },
        ],
        points: [
          "GHC-6000 최대 6,000 m³/h 배기 용량으로 8.5세대 이상 대형 FPD 챔버 완전 대응",
          "Megrez 통합 시스템으로 드라이 펌프 + 스크러버 일체화 — 배관 공사 절감, 풋프린트 30%↓",
          "BOE·LG Display 등 글로벌 패널 메이커 납품 이력 — 대형 FPD 팹 검증 완료",
        ],
      },
      {
        id: "solar",
        name: "태양광 (Solar PV)",
        color: "bg-[var(--primary)]",
        challenge: "고온 공정 내구성, 대량 설치, 유지보수 비용 절감",
        highlight: "고온 내구 · 저유지보수 · 대량 납품 실적",
        models: ["GLR-1200", "GHC-1200", "Scrubber"],
        metrics: [
          { value: "고온", label: "내구 설계" },
          { value: "저유지", label: "보수 비용" },
          { value: "대량", label: "납품 실적" },
        ],
        points: [
          "PECVD·열산화 공정의 고온·고부하 환경에서도 12,000시간 연속 운전 보장 — 솔라 팹 가동률 극대화",
          "Longi·JA Solar 등 세계 최대 태양광 기업 납품 이력 — 양산 검증된 신뢰성",
          "저유지보수 설계와 자체 세정 기능으로 운영 TCO 절감 — 모듈 원가 경쟁력 강화",
        ],
      },
      {
        id: "battery",
        name: "리튬 배터리",
        color: "bg-[var(--primary)]",
        challenge: "리튬·NMP 증기 처리, 방폭 요구, 청정 공정 유지",
        highlight: "방폭 설계 · 리튬 증기 대응 · NMP 회수",
        models: ["GMR-600", "GHC-600", "Scrubber"],
        metrics: [
          { value: "방폭", label: "안전 설계" },
          { value: "NMP", label: "증기 대응" },
          { value: "CATL", label: "납품 실적" },
        ],
        points: [
          "리튬 이온 배터리 전극 공정(NMP 증발·진공 건조)에서 발생하는 유해 증기 완전 대응",
          "CATL·BYD 등 글로벌 배터리 제조사 납품 실적 — 배터리 팹 양산 검증 완료",
          "방폭 설계 및 리크 방지 구조로 배터리 공장 안전 규제 완전 준수",
        ],
      },
      {
        id: "led",
        name: "LED / 화합물 반도체",
        color: "bg-[var(--primary)]",
        challenge: "고온 MOCVD 공정, GaN·SiC 활성 가스 처리",
        highlight: "MOCVD 전용 · 활성 가스 대응 · 고온 내구",
        models: ["GHC-1200", "GLR-600", "Burn Scrubber"],
        metrics: [
          { value: "MOCVD", label: "공정 전용" },
          { value: "GaN/SiC", label: "화합물 반도체" },
          { value: "고온", label: "내구 설계" },
        ],
        points: [
          "GaN·SiC MOCVD 공정의 고온·활성 가스 환경에서 안정적 진공 유지",
          "NH₃·TMG·TMA 등 MOCVD 공정 가스를 연소 스크러버로 완전 무해화",
          "LED 조명·파워 반도체·마이크로 LED 등 화합물 반도체 전 공정 커버",
        ],
      },
      {
        id: "hydrogen",
        name: "수소 / FCEV",
        color: "bg-[var(--primary)]",
        challenge: "수소 안전 규제, 방폭 설계, 고순도 수소 공정",
        highlight: "H₂ 전용 GHR · 방폭 인증 · FCEV 적용",
        models: ["GHR-600", "GHC-200", "Merak-S"],
        metrics: [
          { value: "방폭", label: "H₂ 전용 설계" },
          { value: "FCEV", label: "수소차 적용" },
          { value: "고순도", label: "수소 공정" },
        ],
        points: [
          "GHR 시리즈 수소 전용 드라이 펌프 — 수소 취성·폭발 위험 완전 대응한 방폭 설계",
          "FCEV 수소 스테이션·수전해(Electrolyzer)·수소 저장 설비에 직접 적용",
          "수소 경제 성장에 발맞춘 선제적 제품 라인업 — 공급망 리스크 없는 안정적 공급",
        ],
      },
    ],
    aboutTitle: "通嘉科技 / Grand Hitek 소개",
    aboutDesc:
      "通嘉科技(Grand Hitek, 북경통가굉서기술유한공사)는 2012년 설립된 중국 최고 수준의 드라이 진공 펌프 전문 기업입니다. 베이징 본사를 중심으로 상하이·시안 R&D 기지를 운영하며, 100명 이상의 R&D 인력(박사 4명 포함)이 반도체·FPD·태양광·배터리 공정용 드라이 진공 솔루션을 연구·개발합니다. 누적 출하 30,000대, 월 생산 2,000대의 생산 능력을 보유하며, SMIC·BOE·CATL 등 세계 최고 수준의 제조사에 공급합니다.",
    aboutMission: "Our Mission",
    missionText: "성능·에너지·소형화·비용·안전(PPACS) 5대 차별화를 통해 글로벌 반도체·첨단산업의 진공 공정 혁신을 이끌며, 고객의 제조 경쟁력을 극대화합니다.",
    aboutVision: "Our Vision",
    visionText: "세계 최고의 드라이 진공 솔루션 기업으로 성장하여, 반도체·에너지·수소 산업의 핵심 인프라 파트너가 되겠습니다.",
    customerTitle: "글로벌 주요 고객사",
    certTitle: "인증 현황",
    certs: [
      { name: "SEMI S2-0724", desc: "반도체 장비 안전 기준" },
      { name: "SEMI S6-0618", desc: "배기가스 관리 기준" },
      { name: "SEMI S8-0218", desc: "인간공학 기준" },
      { name: "SEMI F47-0706", desc: "전압 강하 내성" },
      { name: "ETL Listed", desc: "북미 전기 안전 인증" },
      { name: "CE Marking", desc: "유럽 안전·환경 기준" },
      { name: "ISO 9001", desc: "품질경영 시스템" },
      { name: "ISO 14001", desc: "환경경영 시스템" },
    ],
    whyTitle: "OHI Tech × Grand Hitek 파트너십",
    whys: [
      { title: "국내 유일 공식 파트너", desc: "Grand Hitek 한국 공식 총판. 직접 소싱, 최단 납기, 기술 지원 완비." },
      { title: "전담 기술 엔지니어링", desc: "공정 분석부터 펌프 사양 선정, 설치, 유지보수까지 OHI Tech 엔지니어가 전담 지원." },
      { title: "반도체 공정 전문성", desc: "ETCH·CVD·PVD·ALD 전 공정에 걸친 진공 솔루션 경험 보유. 공정별 최적 모델 추천." },
      { title: "빠른 부품 조달", desc: "주요 소모품·부품 현지 재고 보유. 다운타임 최소화를 위한 긴급 대응 체계 운영." },
    ],
    ctaTitle: "드라이 진공 펌프 도입을 검토 중이신가요?",
    ctaDesc: "공정 사양 분석, 모델 선정, 견적까지 OHI Tech 전문팀이 빠르게 응대합니다.",
    ctaBtn1: "지금 문의하기",
    ctaBtn2: "기술 자료 요청",
  },
  en: {
    hero: {
      eyebrow: "Grand Hitek Official Partner · OHI Tech Korea Distributor",
      headline: "Vacuum Power\nBehind the World.",
      sub: "Dry Vacuum Pumps · Scrubbers · Integrated Systems — The Core of Semiconductor, Display & Battery Processes",
      cta1: "Request Consultation",
      cta2: "Request Technical Data",
      stats: [
        { value: "30,000+", label: "Units Shipped" },
        { value: "2,000/mo", label: "Monthly Capacity" },
        { value: "100+ R&D", label: "Engineers (4 PhDs)" },
        { value: "12,000h+", label: "Continuous Operation" },
      ],
    },
    ppacs: {
      title: "PPACS — Grand Hitek's 5 Differentiators",
      items: [
        { key: "P", label: "Performance better", desc: "Best-in-class performance — highest pumping speed and ultimate vacuum in its class" },
        { key: "P", label: "Power lower", desc: "50% energy savings — GMR 0.8kW vs competitors 1.6kW" },
        { key: "A", label: "Area smaller", desc: "30% smaller footprint vs conventional dry pumps" },
        { key: "C", label: "Cost lower", desc: "TCO optimized — lower acquisition, energy, and maintenance costs" },
        { key: "S", label: "Safety better", desc: "Full SEMI S2·ETL·CE safety certification suite" },
      ],
    },
    productNav: "Product Categories",
    products: [
      {
        id: "glr",
        name: "GLR Series",
        nameEn: "GLR Series — Roots Light-Duty",
        color: "bg-[var(--primary)]",
        tagline: "120 / 600 / 1,200 m³/h · Low Noise",
        desc: "Roots dry vacuum pump optimized for light-duty processes. Low-noise, low-vibration design suitable for cleanroom installation. Widely applied in standard semiconductor processes including CVD, PVD, and ALD.",
        lineup: [
          { model: "GLR-120", spec: "120 m³/h · Light-duty · Low-noise cleanroom" },
          { model: "GLR-600", spec: "600 m³/h · Mid-size process" },
          { model: "GLR-1200", spec: "1,200 m³/h · Large chamber" },
        ],
        apps: ["CVD / ALD", "PVD / IMP", "LPCVD", "Strip / Ashing"],
      },
      {
        id: "gmr",
        name: "GMR Series",
        nameEn: "GMR Series — Roots Mid-Duty",
        color: "bg-[var(--primary)]",
        tagline: "200~1,800 m³/h · 50% Energy Savings",
        desc: "Roots dry vacuum pump for mid-duty processes. Consumes only 0.8kW vs competitor 1.6kW — 50% energy savings. The pump of choice for Logic, DRAM, and NAND Flash mass production lines.",
        lineup: [
          { model: "GMR-200", spec: "200 m³/h · 0.8kW · Energy-optimized" },
          { model: "GMR-600", spec: "600 m³/h · Mid to large chamber" },
          { model: "GMR-1200", spec: "1,200 m³/h · Large-volume process" },
          { model: "GMR-1800", spec: "1,800 m³/h · Max capacity · Mass production" },
        ],
        apps: ["ETCH / CVD", "DRAM / NAND", "Logic Semiconductor", "FPD / TFT"],
      },
      {
        id: "ghc",
        name: "GHC Series",
        nameEn: "GHC Series — Claw Pump (Harsh)",
        color: "bg-[var(--primary)]",
        tagline: "200~6,000 m³/h · Corrosive & Active Gas",
        desc: "Claw-type dry vacuum pump for harsh environments. Optimized for corrosive gas, reactive gas, and powder-laden processes. Chemical-resistant coating and self-cleaning mechanism dramatically extend maintenance intervals.",
        lineup: [
          { model: "GHC-200", spec: "200 m³/h · Corrosion-resistant · Compact" },
          { model: "GHC-1200", spec: "1,200 m³/h · Mid-size · Self-cleaning" },
          { model: "GHC-6000", spec: "6,000 m³/h · Max capacity · Extreme environments" },
        ],
        apps: ["ETCH (Corrosive)", "CVD / HDP", "Solar Diffusion", "Compound Semiconductor"],
      },
      {
        id: "ghr",
        name: "GHR Series",
        nameEn: "GHR Series — Hydrogen FCEV",
        color: "bg-[var(--primary)]",
        tagline: "600 m³/h · H₂ Dedicated · FCEV",
        desc: "Roots dry vacuum pump designed exclusively for hydrogen gas. Applied in FCEV hydrogen stations and hydrogen production facilities. Fully compliant with hydrogen safety standards, explosion-proof design.",
        lineup: [
          { model: "GHR-600", spec: "600 m³/h · H₂ dedicated · Explosion-proof" },
        ],
        apps: ["FCEV Hydrogen Stations", "H₂ Production", "H₂ Storage & Transport", "Electrolyzer"],
      },
      {
        id: "turbo",
        name: "Turbo Molecular Pump",
        nameEn: "Turbo Molecular Pump",
        color: "bg-[var(--primary)]",
        tagline: "High Vacuum · UHV Compatible",
        desc: "Turbomolecular pump for ultra-high vacuum (UHV) environments. Applied in ion implantation, electron beam, and surface analysis equipment requiring extreme vacuum.",
        lineup: [
          { model: "TMP Series", spec: "High vacuum · UHV compatible · Multiple speeds" },
        ],
        apps: ["Ion Implantation", "Electron Beam Tools", "Surface Analysis", "SIMS / Auger"],
      },
      {
        id: "scrubber",
        name: "Exhaust Gas Scrubber",
        nameEn: "Exhaust Gas Scrubber",
        color: "bg-[var(--primary)]",
        tagline: "Hazardous Exhaust Treatment",
        desc: "Scrubber system for safe treatment of hazardous exhaust gases from semiconductor, display, and solar processes. Available in burn, wet, and plasma configurations.",
        lineup: [
          { model: "Burn Scrubber", spec: "Combustion · SiH₄·NF₃·WF₆ treatment" },
          { model: "Wet Scrubber", spec: "Wet process · Water-soluble gas treatment" },
          { model: "Plasma Scrubber", spec: "Plasma · High-efficiency decomposition" },
        ],
        apps: ["CVD Exhaust", "ETCH Exhaust", "PVD Exhaust", "Environmental Compliance"],
      },
      {
        id: "megrez",
        name: "Megrez Integrated System",
        nameEn: "Megrez Integrated System",
        color: "bg-[var(--primary)]",
        tagline: "Dry Pump + Scrubber Integrated",
        desc: "Megrez combines a dry vacuum pump and scrubber into a single platform. Minimizes piping, reduces footprint, and simplifies operation with a unified interface. Ideal for new semiconductor and display fabs.",
        lineup: [
          { model: "Megrez-M", spec: "Mid-size integrated · Dry pump + Scrubber" },
          { model: "Megrez-L", spec: "Large integrated · High-volume processes" },
        ],
        apps: ["New Semiconductor Fabs", "FPD Lines", "Solar Factories", "Integrated Solution"],
      },
      {
        id: "merak",
        name: "Merak Compact System",
        nameEn: "Merak Compact Integrated System",
        color: "bg-[var(--primary)]",
        tagline: "Compact Integrated · Space Efficient",
        desc: "Compact integrated dry vacuum pump + scrubber system for smaller process environments. Smaller than Megrez, optimized for R&D labs, pilot lines, and small-scale fabs.",
        lineup: [
          { model: "Merak-S", spec: "Compact integrated · R&D / pilot line" },
        ],
        apps: ["R&D Labs", "Pilot Lines", "Small-scale Fabs", "Universities & Institutes"],
      },
    ],
    solutionsTitle: "Industry Vacuum Solutions",
    solutionsSub: "Grand Hitek dry vacuum technology across key industry verticals",
    solutionsCta: "Inquire About This Solution",
    solutionsCustomerLabel: "Key Customers",
    solutions: [
      {
        id: "semi",
        name: "Semiconductor (Logic / DRAM / NAND)",
        color: "bg-[var(--primary)]",
        challenge: "Maintaining high vacuum, handling corrosive gases, reducing energy costs",
        highlight: "50% energy savings · SEMI S2 certified · 12,000h+ operation",
        models: ["GMR-1200", "GHC-1200", "Megrez-L"],
        metrics: [
          { value: "50%", label: "Energy Savings" },
          { value: "SEMI S2", label: "Safety Certified" },
          { value: "12,000h+", label: "Continuous Run" },
        ],
        points: [
          "GMR series energy-saving design (0.8kW vs competitor 1.6kW) dramatically reduces fab-wide power costs — strengthens semiconductor manufacturing cost competitiveness",
          "Full SEMI S2·S6·S8 international safety certification — meets global fab equipment qualification requirements",
          "12,000+ hours continuous operation track record minimizes unplanned downtime — protects wafer yield",
        ],
      },
      {
        id: "fpd",
        name: "FPD / Display",
        color: "bg-[var(--primary)]",
        challenge: "High-volume pumping for large-area chambers, safe process gas handling",
        highlight: "Up to 6,000 m³/h · Integrated scrubber · Space efficient",
        models: ["GHC-6000", "GMR-1800", "Megrez-L"],
        metrics: [
          { value: "6,000", label: "m³/h Max Flow" },
          { value: "Large-area", label: "Chamber Support" },
          { value: "Integrated", label: "Scrubber" },
        ],
        points: [
          "GHC-6000 max 6,000 m³/h pumping capacity fully supports Gen 8.5+ large-area FPD chambers",
          "Megrez integrated system combines dry pump + scrubber — reduces piping, shrinks footprint 30%",
          "Proven at BOE, LG Display, and other global panel makers — validated for large-scale FPD production",
        ],
      },
      {
        id: "solar",
        name: "Solar PV",
        color: "bg-[var(--primary)]",
        challenge: "High-temperature process durability, mass deployment, maintenance cost reduction",
        highlight: "High-temp durability · Low maintenance · Mass deployment proven",
        models: ["GLR-1200", "GHC-1200", "Scrubber"],
        metrics: [
          { value: "High-temp", label: "Durable Design" },
          { value: "Low", label: "Maintenance Cost" },
          { value: "Mass", label: "Deployment" },
        ],
        points: [
          "Guaranteed 12,000+ hours continuous operation in high-temperature, high-load PECVD and thermal oxidation processes — maximizes solar fab uptime",
          "Proven at Longi, JA Solar — the world's largest solar manufacturers — mass production validated reliability",
          "Self-cleaning design and low-maintenance architecture reduce operating TCO — strengthens module cost competitiveness",
        ],
      },
      {
        id: "battery",
        name: "Lithium Battery",
        color: "bg-[var(--primary)]",
        challenge: "Handling lithium and NMP vapors, explosion-proof requirements, clean process",
        highlight: "Explosion-proof · Lithium vapor handling · NMP recovery",
        models: ["GMR-600", "GHC-600", "Scrubber"],
        metrics: [
          { value: "Ex-proof", label: "Safety Design" },
          { value: "NMP", label: "Vapor Handling" },
          { value: "CATL", label: "Reference" },
        ],
        points: [
          "Full coverage of hazardous vapors in lithium-ion battery electrode processes (NMP evaporation, vacuum drying)",
          "Supply history with CATL, BYD, and global battery manufacturers — validated for battery fab mass production",
          "Explosion-proof design and leak-prevention structure for full battery factory safety regulation compliance",
        ],
      },
      {
        id: "led",
        name: "LED / Compound Semiconductor",
        color: "bg-[var(--primary)]",
        challenge: "High-temperature MOCVD processes, GaN/SiC reactive gas handling",
        highlight: "MOCVD dedicated · Reactive gas handling · High-temp durable",
        models: ["GHC-1200", "GLR-600", "Burn Scrubber"],
        metrics: [
          { value: "MOCVD", label: "Process Ready" },
          { value: "GaN/SiC", label: "Compound Semi" },
          { value: "High-temp", label: "Durable" },
        ],
        points: [
          "Stable vacuum maintenance in the high-temperature, reactive gas environment of GaN and SiC MOCVD processes",
          "Complete neutralization of MOCVD process gases (NH₃, TMG, TMA) via burn scrubber",
          "Full coverage across LED lighting, power semiconductors, and micro-LED compound semiconductor processes",
        ],
      },
      {
        id: "hydrogen",
        name: "Hydrogen / FCEV",
        color: "bg-[var(--primary)]",
        challenge: "Hydrogen safety regulations, explosion-proof design, high-purity hydrogen processes",
        highlight: "H₂-dedicated GHR · Ex-proof certified · FCEV applied",
        models: ["GHR-600", "GHC-200", "Merak-S"],
        metrics: [
          { value: "Ex-proof", label: "H₂ Design" },
          { value: "FCEV", label: "Application" },
          { value: "High-purity", label: "H₂ Process" },
        ],
        points: [
          "GHR series hydrogen-dedicated dry pump — explosion-proof design fully addressing hydrogen embrittlement and explosion risk",
          "Direct application in FCEV hydrogen stations, electrolyzers, and hydrogen storage facilities",
          "Proactive product lineup aligned with hydrogen economy growth — stable supply with no supply chain risk",
        ],
      },
    ],
    aboutTitle: "About Grand Hitek",
    aboutDesc:
      "Grand Hitek (通嘉科技, Beijing Tongjia Hongrui Technology Co., Ltd.) was founded in 2012 and has grown into one of China's leading dry vacuum pump specialists. Headquartered in Beijing with R&D bases in Shanghai and Xi'an, Grand Hitek employs 100+ R&D engineers (including 4 PhDs) researching and developing dry vacuum solutions for semiconductor, FPD, solar, and battery processes. With 30,000+ units shipped and 2,000 units/month capacity, Grand Hitek supplies the world's most demanding manufacturers including SMIC, BOE, and CATL.",
    aboutMission: "Our Mission",
    missionText: "To drive vacuum process innovation in global semiconductor and advanced industries through our five PPACS differentiators — Performance, Power, Area, Cost, and Safety — maximizing our customers' manufacturing competitiveness.",
    aboutVision: "Our Vision",
    visionText: "To become the world's leading dry vacuum solution company, serving as the essential infrastructure partner for the semiconductor, energy, and hydrogen industries.",
    customerTitle: "Key Global Customers",
    certTitle: "Certifications",
    certs: [
      { name: "SEMI S2-0724", desc: "Semiconductor Equipment Safety" },
      { name: "SEMI S6-0618", desc: "Exhaust Management Standard" },
      { name: "SEMI S8-0218", desc: "Ergonomics Standard" },
      { name: "SEMI F47-0706", desc: "Voltage Sag Immunity" },
      { name: "ETL Listed", desc: "North American Electrical Safety" },
      { name: "CE Marking", desc: "European Safety & Environment" },
      { name: "ISO 9001", desc: "Quality Management System" },
      { name: "ISO 14001", desc: "Environmental Management System" },
    ],
    whyTitle: "OHI Tech × Grand Hitek Partnership",
    whys: [
      { title: "Korea's Exclusive Partner", desc: "Official Grand Hitek distributor in Korea. Direct sourcing, shortest lead times, full technical support." },
      { title: "Dedicated Process Engineering", desc: "OHI Tech engineers provide full support from process analysis and pump selection through installation and maintenance." },
      { title: "Semiconductor Process Expertise", desc: "Vacuum solution experience across all processes: ETCH, CVD, PVD, ALD. Process-specific model recommendations." },
      { title: "Fast Parts Procurement", desc: "Local inventory of key consumables and parts. Emergency response system to minimize downtime." },
    ],
    ctaTitle: "Evaluating Dry Vacuum Pump Solutions?",
    ctaDesc: "Our OHI Tech team responds quickly — from process spec analysis and model selection to quotation.",
    ctaBtn1: "Contact Us Now",
    ctaBtn2: "Request Technical Data",
  },
  zh: {
    hero: {
      eyebrow: "通嘉科技 官方合作伙伴 · OHI Tech 韩国总代理",
      headline: "支撑世界的\n真空技术。",
      sub: "干式真空泵 · 尾气处理 · 集成系统 — 半导体·显示·电池工艺的核心",
      cta1: "产品咨询",
      cta2: "技术资料申请",
      stats: [
        { value: "30,000+", label: "累计出货台数" },
        { value: "2,000台/月", label: "月产能" },
        { value: "100+ 名", label: "研发人员" },
        { value: "12,000h+", label: "最长连续运行" },
      ],
    },
    ppacs: {
      title: "PPACS — 通嘉科技五大差异化优势",
      items: [
        { key: "P", label: "Performance better", desc: "性能卓越 — 同级最强抽速与极限真空" },
        { key: "P", label: "Power lower", desc: "节能50% — GMR系列0.8kW vs 竞品1.6kW" },
        { key: "A", label: "Area smaller", desc: "占地减少30% — 小型化设计" },
        { key: "C", label: "Cost lower", desc: "TCO最优 — 降低采购、能源及维护成本" },
        { key: "S", label: "Safety better", desc: "SEMI S2·ETL·CE等国际安全认证齐全" },
      ],
    },
    productNav: "产品分类",
    products: [
      {
        id: "glr",
        name: "GLR系列",
        nameEn: "GLR Series — Roots Light-Duty",
        color: "bg-[var(--primary)]",
        tagline: "120 / 600 / 1,200 m³/h · 低噪音",
        desc: "针对轻载工艺优化的罗茨干式真空泵。低噪音、低振动设计，适合洁净室安装。广泛应用于CVD、PVD、ALD等标准半导体工艺。",
        lineup: [
          { model: "GLR-120", spec: "120 m³/h · 轻载 · 低噪音洁净室" },
          { model: "GLR-600", spec: "600 m³/h · 中型工艺" },
          { model: "GLR-1200", spec: "1,200 m³/h · 大型腔体" },
        ],
        apps: ["CVD / ALD", "PVD / IMP", "LPCVD", "去胶 / 灰化"],
      },
      {
        id: "gmr",
        name: "GMR系列",
        nameEn: "GMR Series — Roots Mid-Duty",
        color: "bg-[var(--primary)]",
        tagline: "200~1,800 m³/h · 节能50%",
        desc: "中载工艺专用罗茨干式真空泵。功耗仅0.8kW，比竞品1.6kW节能50%。Logic、DRAM、NAND Flash量产线的首选泵。",
        lineup: [
          { model: "GMR-200", spec: "200 m³/h · 0.8kW · 节能优化" },
          { model: "GMR-600", spec: "600 m³/h · 中大型腔体" },
          { model: "GMR-1200", spec: "1,200 m³/h · 大容量工艺" },
          { model: "GMR-1800", spec: "1,800 m³/h · 最大容量 · 量产专用" },
        ],
        apps: ["ETCH / CVD", "DRAM / NAND", "逻辑芯片", "FPD / TFT"],
      },
      {
        id: "ghc",
        name: "GHC系列",
        nameEn: "GHC Series — Claw Pump (Harsh)",
        color: "bg-[var(--primary)]",
        tagline: "200~6,000 m³/h · 腐蚀性/活性气体",
        desc: "适用于恶劣环境的爪式干式真空泵。针对腐蚀性气体、活性气体及含粉尘工艺优化。耐化学涂层与自清洁功能大幅延长维护周期。",
        lineup: [
          { model: "GHC-200", spec: "200 m³/h · 耐腐蚀涂层 · 小型" },
          { model: "GHC-1200", spec: "1,200 m³/h · 中型 · 自清洁" },
          { model: "GHC-6000", spec: "6,000 m³/h · 最大容量 · 极端环境" },
        ],
        apps: ["ETCH（腐蚀性）", "CVD / HDP", "光伏扩散", "化合物半导体"],
      },
      {
        id: "ghr",
        name: "GHR系列",
        nameEn: "GHR Series — Hydrogen FCEV",
        color: "bg-[var(--primary)]",
        tagline: "600 m³/h · 氢气专用 · FCEV应用",
        desc: "专为氢气设计的罗茨干式真空泵。应用于FCEV加氢站及制氢设备。完全符合氢气安全规范，防爆设计。",
        lineup: [
          { model: "GHR-600", spec: "600 m³/h · 氢气专用 · 防爆设计" },
        ],
        apps: ["FCEV加氢站", "制氢设备", "储氢/输氢", "电解槽"],
      },
      {
        id: "turbo",
        name: "涡轮分子泵",
        nameEn: "Turbo Molecular Pump",
        color: "bg-[var(--primary)]",
        tagline: "高真空 · UHV兼容",
        desc: "用于超高真空（UHV）环境的涡轮分子泵。应用于离子注入、电子束及表面分析等极高真空工艺。",
        lineup: [
          { model: "TMP系列", spec: "高真空 · UHV兼容 · 多种抽速规格" },
        ],
        apps: ["离子注入", "电子束设备", "表面分析", "SIMS / 俄歇"],
      },
      {
        id: "scrubber",
        name: "尾气处理装置",
        nameEn: "Exhaust Gas Scrubber",
        color: "bg-[var(--primary)]",
        tagline: "有害尾气无害化处理",
        desc: "安全处理半导体、显示及光伏工艺有害尾气的洗涤系统。可选燃烧式、湿式或等离子体式。",
        lineup: [
          { model: "燃烧式洗涤器", spec: "燃烧方式 · SiH₄·NF₃·WF₆处理" },
          { model: "湿式洗涤器", spec: "湿式 · 水溶性气体处理" },
          { model: "等离子洗涤器", spec: "等离子体方式 · 高效分解" },
        ],
        apps: ["CVD尾气处理", "ETCH尾气处理", "PVD尾气处理", "环保合规"],
      },
      {
        id: "megrez",
        name: "Megrez集成系统",
        nameEn: "Megrez Integrated System",
        color: "bg-[var(--primary)]",
        tagline: "干泵+尾气处理一体化",
        desc: "将干式真空泵与洗涤器集成于单一平台的Megrez系统。最小化管路连接，节省安装空间，统一界面运营。适合新建半导体及显示面板厂。",
        lineup: [
          { model: "Megrez-M", spec: "中型集成 · 干泵+洗涤器" },
          { model: "Megrez-L", spec: "大型集成 · 大容量工艺" },
        ],
        apps: ["新建半导体厂", "FPD生产线", "光伏工厂", "一体化解决方案"],
      },
      {
        id: "merak",
        name: "Merak紧凑型系统",
        nameEn: "Merak Compact Integrated System",
        color: "bg-[var(--primary)]",
        tagline: "紧凑集成 · 节省空间",
        desc: "面向小型工艺环境的紧凑型干式真空泵+洗涤器集成系统。比Megrez更小巧，适合研发实验室、中试线及小规模量产厂。",
        lineup: [
          { model: "Merak-S", spec: "紧凑集成 · 研发/中试线专用" },
        ],
        apps: ["研发实验室", "中试线", "小规模量产", "高校/科研机构"],
      },
    ],
    solutionsTitle: "行业真空解决方案",
    solutionsSub: "通嘉科技干式真空技术覆盖的主要行业领域",
    solutionsCta: "咨询此方案",
    solutionsCustomerLabel: "主要客户",
    solutions: [
      {
        id: "semi",
        name: "半导体（逻辑/DRAM/NAND）",
        color: "bg-[var(--primary)]",
        challenge: "维持高真空、处理腐蚀性气体、降低能耗",
        highlight: "节能50% · SEMI S2认证 · 12,000h+连续运行",
        models: ["GMR-1200", "GHC-1200", "Megrez-L"],
        metrics: [
          { value: "50%", label: "节能" },
          { value: "SEMI S2", label: "安全认证" },
          { value: "12,000h+", label: "连续运行" },
        ],
        points: [
          "GMR系列节能设计（0.8kW vs竞品1.6kW）大幅降低晶圆厂电力成本",
          "SEMI S2·S6·S8国际安全认证齐全，满足全球主要晶圆厂设备准入要求",
          "12,000小时以上连续运行记录，非计划停机最小化，保护晶圆良率",
        ],
      },
      {
        id: "fpd",
        name: "FPD / 显示面板",
        color: "bg-[var(--primary)]",
        challenge: "大面积腔体高容量抽气、工艺气体安全处理",
        highlight: "最大6,000 m³/h · 集成洗涤器 · 节省空间",
        models: ["GHC-6000", "GMR-1800", "Megrez-L"],
        metrics: [
          { value: "6,000", label: "m³/h最大流量" },
          { value: "大面积", label: "腔体支持" },
          { value: "集成", label: "洗涤器" },
        ],
        points: [
          "GHC-6000最大6,000 m³/h抽速，完全支持8.5代以上大型FPD腔体",
          "Megrez集成系统将干泵+洗涤器一体化，减少管路，占地减少30%",
          "已供货BOE、LG Display等全球主要面板厂，大规模FPD量产验证完成",
        ],
      },
      {
        id: "solar",
        name: "光伏（Solar PV）",
        color: "bg-[var(--primary)]",
        challenge: "高温工艺耐久性、大批量部署、降低维护成本",
        highlight: "高温耐久 · 低维护成本 · 大批量供货",
        models: ["GLR-1200", "GHC-1200", "Scrubber"],
        metrics: [
          { value: "高温", label: "耐久设计" },
          { value: "低维护", label: "成本" },
          { value: "大批量", label: "供货" },
        ],
        points: [
          "PECVD及热氧化高温高负荷环境下保证12,000小时连续运行，最大化光伏厂稼动率",
          "隆基、晶澳等全球最大光伏企业供货记录，量产验证可靠性",
          "自清洁设计与低维护架构降低运营TCO，增强组件成本竞争力",
        ],
      },
      {
        id: "battery",
        name: "锂电池",
        color: "bg-[var(--primary)]",
        challenge: "锂/NMP蒸气处理、防爆要求、洁净工艺",
        highlight: "防爆设计 · 锂蒸气处理 · NMP回收",
        models: ["GMR-600", "GHC-600", "Scrubber"],
        metrics: [
          { value: "防爆", label: "安全设计" },
          { value: "NMP", label: "蒸气处理" },
          { value: "宁德时代", label: "供货记录" },
        ],
        points: [
          "全面覆盖锂离子电池电极工艺（NMP蒸发、真空干燥）产生的有害蒸气",
          "宁德时代、比亚迪等全球电池厂供货记录，电池厂量产验证完成",
          "防爆设计及防泄漏结构，完全符合电池工厂安全法规",
        ],
      },
      {
        id: "led",
        name: "LED / 化合物半导体",
        color: "bg-[var(--primary)]",
        challenge: "高温MOCVD工艺、GaN/SiC活性气体处理",
        highlight: "MOCVD专用 · 活性气体处理 · 高温耐久",
        models: ["GHC-1200", "GLR-600", "Burn Scrubber"],
        metrics: [
          { value: "MOCVD", label: "工艺就绪" },
          { value: "GaN/SiC", label: "化合物半导体" },
          { value: "高温", label: "耐久" },
        ],
        points: [
          "在GaN、SiC MOCVD工艺的高温活性气体环境下稳定维持真空",
          "通过燃烧式洗涤器完全无害化处理NH₃、TMG、TMA等MOCVD工艺气体",
          "全面覆盖LED照明、功率半导体及Micro LED化合物半导体全工艺",
        ],
      },
      {
        id: "hydrogen",
        name: "氢能 / FCEV",
        color: "bg-[var(--primary)]",
        challenge: "氢气安全法规、防爆设计、高纯氢工艺",
        highlight: "GHR氢气专用 · 防爆认证 · FCEV应用",
        models: ["GHR-600", "GHC-200", "Merak-S"],
        metrics: [
          { value: "防爆", label: "氢气专用设计" },
          { value: "FCEV", label: "应用" },
          { value: "高纯氢", label: "工艺" },
        ],
        points: [
          "GHR系列氢气专用干泵，防爆设计全面应对氢脆与爆炸风险",
          "直接应用于FCEV加氢站、电解槽及储氢设施",
          "顺应氢经济发展的前瞻性产品布局，供应链稳定无风险",
        ],
      },
    ],
    aboutTitle: "通嘉科技 / Grand Hitek 简介",
    aboutDesc:
      "通嘉科技（Grand Hitek，北京通嘉宏瑞科技有限公司）成立于2012年，是中国领先的干式真空泵专业企业。总部位于北京，在上海和西安设有研发基地，拥有100余名研发人员（含4名博士）。累计出货超30,000台，月产能2,000台，为中芯国际、京东方、宁德时代等全球顶级制造商提供半导体、显示、光伏及电池工艺干式真空解决方案。",
    aboutMission: "我们的使命",
    missionText: "通过PPACS五大差异化优势（性能、能耗、面积、成本、安全），引领全球半导体及先进制造业真空工艺创新，最大化客户制造竞争力。",
    aboutVision: "我们的愿景",
    visionText: "成为全球领先的干式真空解决方案企业，成为半导体、能源及氢能产业不可或缺的基础设施合作伙伴。",
    customerTitle: "全球主要客户",
    certTitle: "认证资质",
    certs: [
      { name: "SEMI S2-0724", desc: "半导体设备安全标准" },
      { name: "SEMI S6-0618", desc: "废气管理标准" },
      { name: "SEMI S8-0218", desc: "人机工程标准" },
      { name: "SEMI F47-0706", desc: "电压骤降抗扰性" },
      { name: "ETL认证", desc: "北美电气安全认证" },
      { name: "CE认证", desc: "欧洲安全与环保标准" },
      { name: "ISO 9001", desc: "质量管理体系" },
      { name: "ISO 14001", desc: "环境管理体系" },
    ],
    whyTitle: "OHI Tech × 通嘉科技 合作关系",
    whys: [
      { title: "韩国独家代理", desc: "通嘉科技韩国官方总代理。直接采购，最短交期，完整技术支持。" },
      { title: "专属工艺工程支持", desc: "OHI Tech工程师全程负责工艺分析、型号选定、安装及维护。" },
      { title: "半导体工艺专业能力", desc: "覆盖ETCH、CVD、PVD、ALD全工艺真空解决方案经验，提供工艺专属型号推荐。" },
      { title: "快速备件采购", desc: "主要易耗件及备件本地库存，紧急响应体系最小化停机时间。" },
    ],
    ctaTitle: "正在评估干式真空泵解决方案？",
    ctaDesc: "OHI Tech专业团队快速响应——从工艺规格分析、型号选型到报价一站式服务。",
    ctaBtn1: "立即联系",
    ctaBtn2: "申请技术资料",
  },
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function DryPumpSection({ locale }: { locale: Locale }) {
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
            backgroundImage: "linear-gradient(rgba(37,99,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <p className="text-[var(--accent)] text-xs font-semibold tracking-widest uppercase mb-4">{c.hero.eyebrow}</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight whitespace-pre-line">
            {c.hero.headline}
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-10 max-w-xl">{c.hero.sub}</p>
          <div className="flex flex-wrap gap-3 mb-14">
            <Link
              href={`/contact?lang=${locale}&type=inquiry&category=dry-vacuum-pump`}
              className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=datasheet&category=dry-vacuum-pump`}
              className="border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta2}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-10 mb-14">
            {c.hero.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[var(--accent)]">{s.value}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* PPACS */}
          <div className="border-t border-white/10 pt-10">
            <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-5">{c.ppacs.title}</p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {c.ppacs.items.map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex items-center justify-center mb-3">
                    <span className="text-[var(--accent)]/80 font-black text-sm">{item.key}</span>
                  </div>
                  <p className="text-[var(--accent)]/80 text-[11px] font-bold mb-1">{item.label}</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
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
              ? "Grand Hitek 전 제품군 — Roots·Claw·Turbo 드라이 펌프부터 스크러버·통합 시스템까지"
              : locale === "en"
              ? "Full Grand Hitek product range — Roots, Claw & Turbo dry pumps to scrubbers & integrated systems"
              : "通嘉科技全系列产品——罗茨·爪式·涡轮干泵到洗涤器及集成系统"}
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
                    <div className={`w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center shrink-0`}>
                      <span className="text-white text-[9px] font-black">{PRODUCT_ABBR[p.id]}</span>
                    </div>
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
                    <div className={`w-28 h-28 rounded-2xl bg-[var(--primary)] flex items-center justify-center shrink-0 shadow-lg`}>
                      <span className="text-white text-2xl font-black opacity-80">{PRODUCT_ABBR[currentProduct.id]}</span>
                    </div>
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
                      {locale === "ko" ? "주요 적용 공정" : locale === "en" ? "Key Applications" : "主要应用工艺"}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {currentProduct.apps.map((app) => (
                        <div key={app} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shrink-0" />
                          {app}
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/contact?lang=${locale}&type=quote&category=dry-vacuum-pump&product=${currentProduct.id}`}
                      className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
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
                    <div className={`w-9 h-9 rounded-lg bg-[var(--primary)] shrink-0`} />
                    <span className="leading-snug">{sol.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: solution detail */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                {/* Gradient header instead of photo */}
                <div className={`relative h-52 bg-[var(--primary)] overflow-hidden`}>
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[var(--accent)]/80 text-[10px] font-bold uppercase tracking-widest mb-1">
                      {locale === "ko" ? "적용 공정" : locale === "en" ? "Process" : "适用工艺"}: ETCH · CVD · PVD · ALD
                    </p>
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

                  {/* Recommended models + customers */}
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
                      href={`/contact?lang=${locale}&type=inquiry&category=dry-vacuum-pump&solution=${currentSolution.id}`}
                      className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
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
          SECTION 4: ABOUT GRAND HITEK
      ══════════════════════════════════════ */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-3">
                通嘉科技 · Grand Hitek · 北京通嘉宏瑞科技有限公司
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{c.aboutTitle}</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{c.aboutDesc}</p>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
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
                  {locale === "ko" ? "R&D 거점" : locale === "en" ? "R&D Locations" : "研发基地"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {["🇨🇳 Beijing HQ", "🇨🇳 Shanghai R&D", "🇨🇳 Xi'an R&D", "🇰🇷 Korea (OHI Tech)"].map((g) => (
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
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[var(--accent)] text-[10px] font-black">✓</span>
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
          SECTION 5: WHY OHI TECH × GRAND HITEK
      ══════════════════════════════════════ */}
      <section className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-10">{c.whyTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.whys.map((w, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center mb-4">
                  <span className="text-[var(--accent)] font-black text-sm">0{i + 1}</span>
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
              href={`/contact?lang=${locale}&type=inquiry&category=dry-vacuum-pump`}
              className="bg-white text-[var(--primary)] hover:bg-gray-50 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg"
            >
              {c.ctaBtn1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=datasheet&category=dry-vacuum-pump`}
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
