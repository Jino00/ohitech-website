"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";

/* ─────────────────────────────────────────────
   IMAGES (Unsplash CDN — safe hotlinking)
───────────────────────────────────────────── */
const IMG = {
  hero: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80",
  // Solution scenarios
  solDirect:    "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=900&q=80",
  solMotor:     "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=900&q=80",
  solVfd:       "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80",
  solServo:     "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  solSurvey:    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=900&q=80",
  solSecurity:  "https://images.unsplash.com/photo-1508614999368-9260051292e5?auto=format&fit=crop&w=900&q=80",
  solMedical:   "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
  solInspect:   "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=900&q=80",
};

/* Product card icon backgrounds */
const PRODUCT_COLOR: Record<string, string> = {
  contactor:   "from-blue-600 to-blue-800",
  overload:    "from-orange-500 to-orange-700",
  breaker:     "from-slate-600 to-slate-800",
  drone:       "from-sky-500 to-indigo-700",
  uav:         "from-emerald-600 to-teal-700",
  esc:         "from-purple-600 to-fuchsia-700",
};

/* ─────────────────────────────────────────────
   STATIC CONTENT
───────────────────────────────────────────── */

const LANG = {
  ko: {
    hero: {
      eyebrow: "TECO Electric & Machinery 한국 공식 파트너 · OHI Tech 총판",
      headline: "Move to Lead\n開創新局",
      sub: "70년 헤리티지 · 글로벌 No.2 LV 배전 · 드론 파워트레인 토탈 솔루션",
      cta1: "제품 상담 문의",
      cta2: "도입 사례 보기",
      stats: [
        { value: "1956", label: "창립 (TWSE 1504)" },
        { value: "40+", label: "진출 국가" },
        { value: "25,000+", label: "글로벌 직원" },
        { value: "USD 2.2B+", label: "2026 매출" },
      ],
    },
    productNav: "제품 카테고리",
    products: [
      {
        id: "contactor",
        name: "AC 컨택터",
        nameEn: "AC Contactor (CN/CU/TMC Series)",
        tagline: "6A~800A · CSA·UL·CE·CCC 인증",
        desc: "큰 부하의 전원을 자동으로 ON/OFF하는 핵심 배전 부품. CN/CU/TMC 시리즈 6~800A 전 라인업. AC1~AC4 모든 부하 등급 대응. CSA·UL·CE·CCC·RoHS 국제 인증으로 글로벌 프로젝트 즉시 적용 가능.",
        lineup: [
          { model: "CN/CU 시리즈", spec: "IEC 표준 · 6A~630A · 3극/4극" },
          { model: "TMC-E 시리즈", spec: "9A~38A · 경공업 전용 · 슬림 디자인" },
          { model: "TMC-Z 시리즈", spec: "40A~800A · 대용량 컨택터" },
          { model: "RAM/RAN 릴레이", spec: "AC 1.2~6A · DC 0.27A~0.55A · 보조 릴레이" },
        ],
        apps: ["산업 자동화", "공장 자동화", "빌딩 전기", "발전소"],
      },
      {
        id: "overload",
        name: "과부하 계전기",
        nameEn: "Overload Relay (RHU/EOR)",
        tagline: "0.1~336A · 모터 과열 보호",
        desc: "과전류로 인한 모터 손상을 방지하는 보호 장치. 컨택터와 결합해 모터 회로의 안전을 보장합니다. 열동형(Bimetallic)과 전자식(Electronic) 두 가지 옵션으로 모든 부하 환경 대응.",
        lineup: [
          { model: "RHU/RHN 시리즈", spec: "열동형 · 0.1~336A · 결상 보호 내장" },
          { model: "EOR 시리즈", spec: "전자식 · 0.1~200A · 정밀 트립" },
        ],
        apps: ["모터 보호", "펌프 시스템", "컨베이어", "압축기"],
      },
      {
        id: "breaker",
        name: "회로 차단기",
        nameEn: "Circuit Breaker (TMS/BM/BR/TCB/ACB)",
        tagline: "최대 6300A · 모터보호~ACB 전 라인업",
        desc: "단락·과부하 등 위험 발생 시 회로를 즉시 차단하는 안전 장치. 소형 MCB부터 대용량 ACB까지 전 라인업 보유. Taiwan 배전 시장 No.2의 검증된 신뢰성.",
        lineup: [
          { model: "TMS-S 시리즈", spec: "모터 보호용 · 0.1~32A · IP20" },
          { model: "BM/BR 시리즈", spec: "MCB 미니어처 · 1~125A · CE/CCC" },
          { model: "TCB/TAX 시리즈", spec: "MCCB 몰드 케이스 · 16~800A" },
          { model: "TAW/BAW/TBW 시리즈", spec: "ACB · 최대 6300A · DC 스위치 4000A" },
          { model: "TDS/BOT/VBT 시리즈", spec: "ACB 변형 · 63~4000A" },
        ],
        apps: ["산업용 배전반", "고층 빌딩", "발전소 송전", "데이터센터"],
      },
      {
        id: "drone",
        name: "경량 드론 모터",
        nameEn: "Light Drone Motor Series",
        tagline: "10종 모델 · 330W~3802W · Made in Taiwan",
        desc: "상업용 드론에 최적화된 고성능 BLDC 모터 시리즈. 일본제 고품질 베어링, 200°C 내열 절연강판 사용. Halbach Array 외전형 설계로 토크 밀도 +25% 향상, 최고 91.8% 효율.",
        lineup: [
          { model: "2317 KV800", spec: "330W · 81.5g · 10\" 프로펠러" },
          { model: "3024 KV790", spec: "2300W · 145g · 8S" },
          { model: "3115 KV900", spec: "1600W · 126g · 6S" },
          { model: "3508 KV650", spec: "350W · 78.5g · 4S" },
          { model: "4535 KV620", spec: "3600W · 522g · 12S · 18\"" },
          { model: "6013 KV210", spec: "2700W · 385g · 22\"" },
          { model: "6023 KV220", spec: "3400W · 515g · 22\"" },
          { model: "10010 KV110", spec: "3802W · 810g · 36\" · 대형 드론용" },
        ],
        apps: ["측량·매핑", "보안 모니터링", "배송", "산업 검사"],
      },
      {
        id: "uav",
        name: "농업·중대형 UAV 파워트레인",
        nameEn: "Medium UAV Powertrain System",
        tagline: "최대 150kg 페이로드 · 76.5kg/rotor 추력",
        desc: "대만에서 월 1,400대 이상 양산 중인 중대형 UAV 전용 파워트레인. 5건의 특허 기술 (1건 발명특허). 슬롯 내 공냉, 20g 충격 내구성, 컨포멀 코팅으로 가혹 환경 대응. 농업 방제·물류·구조 임무에 검증된 솔루션.",
        lineup: [
          { model: "Drone 1", spec: "76.5kg/rotor · 12.9kW peak · 4.65kW rated · 63×24\" 프로펠러" },
          { model: "Drone 2", spec: "40kg/rotor · 8.6kW peak · 4kW rated · 54×20\" 프로펠러" },
          { model: "ESC (Drone 1)", spec: "300A peak · CAN+PWM · 0.67kg" },
          { model: "ESC (Drone 2)", spec: "150A peak · CAN+PWM · 0.42kg" },
        ],
        apps: ["농업 방제", "대형 화물 운송", "재난 구조", "산업 점검"],
      },
      {
        id: "esc",
        name: "ESC 전자 변속기",
        nameEn: "Electronic Speed Controller",
        tagline: "LC-ESC 시리즈 · 4-12S LiPo · PWM 제어",
        desc: "TECO 드론 모터와 완벽 매칭되는 전용 ESC. 95~98% 구동 효율, 체적 밀도 30% 향상. 경량 디자인으로 비행 시간 연장에 기여.",
        lineup: [
          { model: "LC-ESC-20A-6S", spec: "4-6S LiPo · 20A 정격 · 30A 피크 · 11g" },
          { model: "LC-ESC-40A-6S", spec: "4-6S LiPo · 40A 정격 · 70A 피크 · 13g" },
          { model: "LC-ESC-40A-12S", spec: "8-12S LiPo · 40A 정격 · 80A 피크 · 25g" },
        ],
        apps: ["경량 드론", "측량용 UAV", "촬영용 드론", "FPV 레이싱"],
      },
    ],
    solutionsTitle: "산업별 적용 솔루션",
    solutionsSub: "TECO Power Distribution & Drone 기술이 적용되는 주요 분야",
    solutionsCta: "이 솔루션 문의",
    solutionsCustomerLabel: "주요 적용 산업",
    solutions: [
      {
        id: "direct",
        name: "직접 모터 구동",
        challenge: "전통 모터의 단순 ON/OFF 제어, 비용 효율적인 기본 배전 구성",
        highlight: "Circuit Breaker → Contactor → Overload Relay → Motor",
        models: ["CU/CN", "RHU", "TCB"],
        metrics: [
          { value: "기본형", label: "구성" },
          { value: "최저", label: "초기 비용" },
          { value: "강건", label: "신뢰성" },
        ],
        points: [
          "회로 차단기 → 컨택터 → 과부하 계전기 → 모터의 표준 4단 구성으로 안전한 전력 공급",
          "단순 구조로 유지보수 용이 · 부품 호환성 높아 즉시 교체 가능",
          "TECO 단일 브랜드로 전 부품 매칭 — 인증·신뢰성·납기 한 번에 해결",
        ],
        industries: ["펌프", "팬", "컨베이어", "공작기계"],
      },
      {
        id: "motor",
        name: "모터 보호 차단기",
        challenge: "기동전류·과부하·결상 보호를 일체화한 컴팩트 구성",
        highlight: "Motor Protection CB + Contactor + Motor",
        models: ["TMS-S", "TMC-E", "CU"],
        metrics: [
          { value: "통합", label: "보호 기능" },
          { value: "컴팩트", label: "패널 공간" },
          { value: "0.1~32A", label: "범위" },
        ],
        points: [
          "TMS-S 시리즈 1대로 회로 차단 + 과부하 + 결상 보호를 일체화 — 패널 공간 30% 절감",
          "별도 과부하 계전기 불필요 · 배선 단순화로 설치 시간 단축",
          "0.1~32A 광범위 정격으로 소형~중형 모터 모두 대응",
        ],
        industries: ["소형 모터", "콤프레서", "BLDC 시스템", "펌프 패키지"],
      },
      {
        id: "vfd",
        name: "VFD (인버터) 스타터",
        challenge: "가변속 제어, 에너지 절감, 정밀 토크 제어가 필요한 환경",
        highlight: "Circuit Breaker → Contactor → VFD → Motor",
        models: ["TCB", "CU", "TECO VFD"],
        metrics: [
          { value: "가변속", label: "정밀 제어" },
          { value: "30%↓", label: "에너지 절감" },
          { value: "통합", label: "보호 내장" },
        ],
        points: [
          "VFD가 시동·정지·과부하 보호까지 통합 — 모터 수명 2배 이상 연장",
          "회생 제동 및 가변속 제어로 에너지 사용량 평균 30% 절감",
          "TECO 컨택터·차단기·VFD 풀라인업 매칭으로 시스템 통합 검증 완료",
        ],
        industries: ["HVAC", "압축기", "팬·블로어", "물류 컨베이어"],
      },
      {
        id: "servo",
        name: "서보 스타터",
        challenge: "정밀 위치 제어·고응답성이 필요한 자동화·로봇 환경",
        highlight: "Circuit Breaker → Contactor (Optional) → Servo Driver → Motor",
        models: ["TCB", "TMC-E", "Servo"],
        metrics: [
          { value: "마이크로", label: "정밀 제어" },
          { value: "고속", label: "응답성" },
          { value: "통합", label: "안전 보호" },
        ],
        points: [
          "서보 드라이버가 시동·정지·과부하 보호 포함 — 컨택터는 옵션으로만 추가",
          "마이크로 단위 위치 제어로 로봇·반도체 장비·정밀 자동화에 최적",
          "TECO 차단기와 매칭되는 서보 시스템 통합 솔루션",
        ],
        industries: ["산업용 로봇", "반도체 장비", "공작기계", "포장 자동화"],
      },
      {
        id: "drone-survey",
        name: "측량·매핑 드론",
        challenge: "장시간 비행, 정밀 GPS 데이터 수집, 광범위 면적 커버",
        highlight: "Light Drone Motor + ESC · 고효율 비행시간 연장",
        models: ["3508 KV650", "5308 KV280", "LC-ESC-20A-6S"],
        metrics: [
          { value: "11W/g", label: "추력 효율" },
          { value: "91.8%", label: "최고 효율" },
          { value: "200°C", label: "내열성" },
        ],
        points: [
          "Halbach Array 설계로 동급 최고 효율 달성 — 동일 배터리로 비행시간 +30%",
          "일본제 베어링·고급 절연강판으로 200°C 환경에서도 안정 작동",
          "측량·LiDAR·다분광 카메라 페이로드 안정적 운용",
        ],
        industries: ["국토 측량", "건설 현장 매핑", "농지 분석", "광물 탐사"],
      },
      {
        id: "drone-agri",
        name: "농업 방제·운송",
        challenge: "150kg 농약·물자 운송, 가혹한 농업 환경 내구성",
        highlight: "Medium UAV Powertrain · 150kg 페이로드 · 5 특허",
        models: ["UAV Drone 1", "UAV ESC 300A", "BLDC Motor 76.5kg"],
        metrics: [
          { value: "150kg", label: "최대 페이로드" },
          { value: "20g", label: "충격 내구성" },
          { value: "5건", label: "특허 기술" },
        ],
        points: [
          "월 1,400대+ 양산 검증된 농업 드론 모터 — 350+ UAV에 탑재 운영 중",
          "컨포멀 코팅·고급 염수 분무 내성으로 농약·해풍 환경 완벽 대응",
          "슬롯 내 공냉 + 안티 베어링 슬립 설계로 고온·고부하 장시간 운용",
        ],
        industries: ["농약 살포", "씨앗 파종", "긴급 물류", "재난 구조"],
      },
      {
        id: "drone-inspect",
        name: "산업 점검·보안",
        challenge: "정밀 호버링, 카메라·센서 안정적 운용, 야간·악천후 비행",
        highlight: "Light Motor + ESC · 정밀 비행 안정성",
        models: ["6013 KV210", "10010 KV110", "LC-ESC-40A-12S"],
        metrics: [
          { value: "±0.1m", label: "호버 정밀도" },
          { value: "98%", label: "ESC 효율" },
          { value: "확장형", label: "페이로드" },
        ],
        points: [
          "고출력 모터 + 95~98% 효율 ESC 조합으로 무거운 점검 장비 안정 운용",
          "발전소·송전탑·교량·풍력 블레이드 정밀 점검에 최적",
          "야간 보안·국경 감시·재난 모니터링용 장시간 비행 가능",
        ],
        industries: ["전력 인프라 점검", "교량·터널", "보안 감시", "재난 모니터링"],
      },
    ],
    aboutTitle: "TECO Electric & Machinery 소개",
    aboutDesc:
      "TECO는 1956년 대만에서 설립된 글로벌 전기·기계 종합 제조사입니다 (TWSE 1504). 70년 헤리티지를 기반으로 산업용 모터 시장 대만 1위, 글로벌 Top 5의 위상을 확보했으며, 2024년 인수합병을 통해 변압기 사업으로 확장 중입니다. Westinghouse, Motovario, TEMICO 등 100개 글로벌 계열사와 함께 33개 사업장, 10개 제조 공장, 3개 혁신 센터를 운영. 그린 에너지·전동화·지능화의 토탈 솔루션 파트너로서 전 세계 25,000명 이상의 직원이 USD 2.2B+의 매출을 만들어내고 있습니다.",
    aboutMission: "Mission",
    missionText: "글로벌 전동화·지능화·그린에너지 실현의 핵심 동력으로서, 모터·배전·드라이브·드론 모터 등 전 라인업으로 지속가능한 미래를 함께 만들어갑니다.",
    aboutVision: "Vision",
    visionText: "Move to Lead 開創新局 — 70년의 헤리티지를 바탕으로 차세대 전동화 시대를 선도하는 글로벌 토탈 솔루션 기업.",
    customerTitle: "주요 계열사 & 글로벌 파트너",
    certTitle: "인증 & 표준",
    certs: [
      { name: "ISO 9001", desc: "품질경영 시스템" },
      { name: "CSA", desc: "캐나다 안전 인증" },
      { name: "UL", desc: "미국 안전 인증" },
      { name: "CE", desc: "유럽 적합성 인증" },
      { name: "CCC", desc: "중국 강제 인증" },
      { name: "RoHS", desc: "유해물질 제한 지침" },
      { name: "IEC 60947", desc: "저전압 개폐장치 표준" },
      { name: "GB 14048", desc: "중국 저전압 표준" },
    ],
    whyTitle: "OHI Tech × TECO 파트너십",
    whys: [
      { title: "70년 글로벌 검증", desc: "1956년 창립 · 40개국 진출 · LV 배전 Taiwan No.2 · 산업 모터 글로벌 Top 5의 검증된 신뢰성." },
      { title: "토탈 라인업 공급", desc: "차단기·컨택터·계전기·드론 모터·ESC까지 단일 브랜드 통합 공급 — 호환성·납기·인증을 한 번에." },
      { title: "한국 총판 직공급", desc: "OHI Tech가 한국 총판으로 재고·기술지원·납기를 직접 관리. 빠른 견적과 안정적 공급." },
      { title: "맞춤형 통합 컨설팅", desc: "단순 부품 공급이 아닌 시스템 설계·매칭·테스트·납품까지 application-focused 솔루션 제공." },
    ],
    ctaTitle: "TECO 제품 도입을 고려 중이신가요?",
    ctaDesc: "배전 부품·드론 모터·ESC 사양 상담부터 견적까지 OHI Tech 전문팀이 빠르게 응대합니다.",
    ctaBtn1: "지금 문의하기",
    ctaBtn2: "도입 사례 보기",
  },
  en: {
    hero: {
      eyebrow: "TECO Electric & Machinery Korea Official Partner · OHI Tech Distributor",
      headline: "Move to Lead\n開創新局",
      sub: "70-year Heritage · Global No.2 LV Power Distribution · Drone Powertrain Total Solutions",
      cta1: "Request Consultation",
      cta2: "View Case Studies",
      stats: [
        { value: "1956", label: "Est. (TWSE 1504)" },
        { value: "40+", label: "Countries" },
        { value: "25,000+", label: "Global Employees" },
        { value: "USD 2.2B+", label: "Revenue 2026" },
      ],
    },
    productNav: "Product Categories",
    products: [
      {
        id: "contactor",
        name: "AC Contactor",
        nameEn: "AC Contactor (CN/CU/TMC Series)",
        tagline: "6A~800A · CSA·UL·CE·CCC Certified",
        desc: "Core power-distribution component that automatically turns large loads ON/OFF. Full lineup of CN/CU/TMC series from 6A to 800A. Supports AC1~AC4 load duties. Globally certified (CSA, UL, CE, CCC, RoHS) for instant deployment in international projects.",
        lineup: [
          { model: "CN/CU Series", spec: "IEC standard · 6A~630A · 3-pole/4-pole" },
          { model: "TMC-E Series", spec: "9A~38A · Light industrial · Slim design" },
          { model: "TMC-Z Series", spec: "40A~800A · High-capacity contactor" },
          { model: "RAM/RAN Relays", spec: "AC 1.2~6A · DC 0.27A~0.55A · Auxiliary relays" },
        ],
        apps: ["Industrial Automation", "Factory Automation", "Building Electrical", "Power Plants"],
      },
      {
        id: "overload",
        name: "Overload Relay",
        nameEn: "Overload Relay (RHU/EOR)",
        tagline: "0.1~336A · Motor Overheat Protection",
        desc: "Protective device preventing motor damage from overcurrent. Combined with contactors to ensure motor circuit safety. Available in thermal (bimetallic) and electronic types.",
        lineup: [
          { model: "RHU/RHN Series", spec: "Thermal · 0.1~336A · Phase-loss protection" },
          { model: "EOR Series", spec: "Electronic · 0.1~200A · Precision trip" },
        ],
        apps: ["Motor Protection", "Pump Systems", "Conveyors", "Compressors"],
      },
      {
        id: "breaker",
        name: "Circuit Breaker",
        nameEn: "Circuit Breaker (TMS/BM/BR/TCB/ACB)",
        tagline: "Up to 6300A · Motor Protection to ACB",
        desc: "Safety device that instantly cuts the circuit on short-circuit or overload. Full lineup from compact MCBs to high-capacity ACBs. Proven reliability of Taiwan's No.2 in power distribution.",
        lineup: [
          { model: "TMS-S Series", spec: "Motor protection · 0.1~32A · IP20" },
          { model: "BM/BR Series", spec: "MCB miniature · 1~125A · CE/CCC" },
          { model: "TCB/TAX Series", spec: "MCCB molded case · 16~800A" },
          { model: "TAW/BAW/TBW Series", spec: "ACB · Up to 6300A · 4000A DC switch" },
          { model: "TDS/BOT/VBT Series", spec: "ACB variants · 63~4000A" },
        ],
        apps: ["Industrial Switchboards", "High-rise Buildings", "Power Transmission", "Data Centers"],
      },
      {
        id: "drone",
        name: "Light Drone Motor",
        nameEn: "Light Drone Motor Series",
        tagline: "10 Models · 330W~3802W · Made in Taiwan",
        desc: "High-performance BLDC motor series optimized for commercial drones. Japanese-made bearings and 200°C heat-resistant electrical steel. Halbach Array external rotor design boosts torque density by 25% with peak efficiency of 91.8%.",
        lineup: [
          { model: "2317 KV800", spec: "330W · 81.5g · 10\" propeller" },
          { model: "3024 KV790", spec: "2300W · 145g · 8S" },
          { model: "3115 KV900", spec: "1600W · 126g · 6S" },
          { model: "3508 KV650", spec: "350W · 78.5g · 4S" },
          { model: "4535 KV620", spec: "3600W · 522g · 12S · 18\"" },
          { model: "6013 KV210", spec: "2700W · 385g · 22\"" },
          { model: "6023 KV220", spec: "3400W · 515g · 22\"" },
          { model: "10010 KV110", spec: "3802W · 810g · 36\" · Heavy drone" },
        ],
        apps: ["Survey & Mapping", "Security Monitoring", "Delivery", "Industrial Inspection"],
      },
      {
        id: "uav",
        name: "Medium UAV Powertrain",
        nameEn: "Medium UAV Powertrain System",
        tagline: "Up to 150kg Payload · 76.5kg/rotor Thrust",
        desc: "Mass-produced UAV powertrain with 1,400+ units shipped monthly in Taiwan. 5 patents (1 invention). In-slot air cooling, 20g shock resistance, and conformal coating for harsh-environment durability. Proven solution for agricultural spraying, logistics, and rescue missions.",
        lineup: [
          { model: "Drone 1", spec: "76.5kg/rotor · 12.9kW peak · 4.65kW rated · 63×24\"" },
          { model: "Drone 2", spec: "40kg/rotor · 8.6kW peak · 4kW rated · 54×20\"" },
          { model: "ESC (Drone 1)", spec: "300A peak · CAN+PWM · 0.67kg" },
          { model: "ESC (Drone 2)", spec: "150A peak · CAN+PWM · 0.42kg" },
        ],
        apps: ["Agricultural Spraying", "Heavy Payload Logistics", "Rescue Operations", "Industrial Inspection"],
      },
      {
        id: "esc",
        name: "ESC (Speed Controller)",
        nameEn: "Electronic Speed Controller",
        tagline: "LC-ESC Series · 4-12S LiPo · PWM Control",
        desc: "Dedicated ESC perfectly matched to TECO drone motors. 95~98% drive efficiency and 30% higher volumetric density. Lightweight design extends flight time.",
        lineup: [
          { model: "LC-ESC-20A-6S", spec: "4-6S LiPo · 20A rated · 30A peak · 11g" },
          { model: "LC-ESC-40A-6S", spec: "4-6S LiPo · 40A rated · 70A peak · 13g" },
          { model: "LC-ESC-40A-12S", spec: "8-12S LiPo · 40A rated · 80A peak · 25g" },
        ],
        apps: ["Light Drones", "Survey UAVs", "Aerial Photography", "FPV Racing"],
      },
    ],
    solutionsTitle: "Industry Application Solutions",
    solutionsSub: "Where TECO Power Distribution & Drone technology delivers value",
    solutionsCta: "Inquire About This Solution",
    solutionsCustomerLabel: "Key Industries",
    solutions: [
      {
        id: "direct",
        name: "Direct Motor Drive",
        challenge: "Simple ON/OFF control for traditional motors, cost-effective basic configuration",
        highlight: "Circuit Breaker → Contactor → Overload Relay → Motor",
        models: ["CU/CN", "RHU", "TCB"],
        metrics: [
          { value: "Basic", label: "Configuration" },
          { value: "Lowest", label: "Initial Cost" },
          { value: "Robust", label: "Reliability" },
        ],
        points: [
          "Standard 4-stage layout (CB → Contactor → Overload → Motor) ensures safe power supply",
          "Simple structure for easy maintenance · High parts compatibility for instant replacement",
          "Single-brand TECO matching for all components — certification, reliability, and lead time in one shot",
        ],
        industries: ["Pumps", "Fans", "Conveyors", "Machine Tools"],
      },
      {
        id: "motor",
        name: "Motor Protection CB",
        challenge: "Combined inrush, overload, and phase-loss protection in compact form",
        highlight: "Motor Protection CB + Contactor + Motor",
        models: ["TMS-S", "TMC-E", "CU"],
        metrics: [
          { value: "Integrated", label: "Protection" },
          { value: "Compact", label: "Panel Space" },
          { value: "0.1~32A", label: "Range" },
        ],
        points: [
          "TMS-S series integrates breaker + overload + phase-loss in one unit — saves 30% panel space",
          "No separate overload relay needed · Simplified wiring shortens installation time",
          "0.1~32A wide range covers small to medium motors",
        ],
        industries: ["Small Motors", "Compressors", "BLDC Systems", "Pump Packages"],
      },
      {
        id: "vfd",
        name: "VFD Starter",
        challenge: "Variable speed control, energy savings, precision torque",
        highlight: "Circuit Breaker → Contactor → VFD → Motor",
        models: ["TCB", "CU", "TECO VFD"],
        metrics: [
          { value: "Variable", label: "Speed Control" },
          { value: "30%↓", label: "Energy Savings" },
          { value: "Built-in", label: "Protection" },
        ],
        points: [
          "VFD integrates start/stop and overload protection — extends motor life by 2x+",
          "Regenerative braking and variable speed control reduce energy use by ~30% on average",
          "Pre-validated system integration with full TECO contactor/breaker/VFD lineup",
        ],
        industries: ["HVAC", "Compressors", "Fans & Blowers", "Logistics Conveyors"],
      },
      {
        id: "servo",
        name: "Servo Starter",
        challenge: "Precision position control and high responsiveness for automation/robotics",
        highlight: "Circuit Breaker → Contactor (Optional) → Servo Driver → Motor",
        models: ["TCB", "TMC-E", "Servo"],
        metrics: [
          { value: "Micro", label: "Precision" },
          { value: "High-speed", label: "Response" },
          { value: "Integrated", label: "Safety" },
        ],
        points: [
          "Servo driver includes start/stop and overload protection — contactor is optional",
          "Micro-level position control optimal for robots, semiconductor equipment, precision automation",
          "Integrated servo system solution matched with TECO breakers",
        ],
        industries: ["Industrial Robots", "Semiconductor Equipment", "Machine Tools", "Packaging"],
      },
      {
        id: "drone-survey",
        name: "Survey & Mapping Drones",
        challenge: "Long-duration flights, precision GPS data, wide-area coverage",
        highlight: "Light Drone Motor + ESC · Extended flight time",
        models: ["3508 KV650", "5308 KV280", "LC-ESC-20A-6S"],
        metrics: [
          { value: "11W/g", label: "Thrust Efficiency" },
          { value: "91.8%", label: "Peak Efficiency" },
          { value: "200°C", label: "Heat Resistance" },
        ],
        points: [
          "Halbach Array design delivers best-in-class efficiency — +30% flight time on the same battery",
          "Japanese bearings and premium electrical steel maintain stability up to 200°C",
          "Stable operation with survey, LiDAR, and multispectral camera payloads",
        ],
        industries: ["Land Surveying", "Construction Mapping", "Agricultural Analytics", "Mineral Exploration"],
      },
      {
        id: "drone-agri",
        name: "Agricultural Spraying",
        challenge: "150kg pesticide/payload transport, harsh agricultural environment",
        highlight: "Medium UAV Powertrain · 150kg payload · 5 patents",
        models: ["UAV Drone 1", "UAV ESC 300A", "BLDC Motor 76.5kg"],
        metrics: [
          { value: "150kg", label: "Max Payload" },
          { value: "20g", label: "Shock Resistance" },
          { value: "5", label: "Patents" },
        ],
        points: [
          "Field-validated agri-drone motor with 1,400+ units/month and 350+ UAVs in operation",
          "Conformal coating and high-grade salt-spray resistance for pesticide and coastal environments",
          "In-slot air cooling + anti-bearing-slip design for sustained high-temperature, high-load duty",
        ],
        industries: ["Pesticide Spraying", "Seed Sowing", "Emergency Logistics", "Disaster Relief"],
      },
      {
        id: "drone-inspect",
        name: "Industrial Inspection & Security",
        challenge: "Precision hovering, stable sensor operation, night/all-weather flight",
        highlight: "Light Motor + ESC · Precision flight stability",
        models: ["6013 KV210", "10010 KV110", "LC-ESC-40A-12S"],
        metrics: [
          { value: "±0.1m", label: "Hover Accuracy" },
          { value: "98%", label: "ESC Efficiency" },
          { value: "Scalable", label: "Payload" },
        ],
        points: [
          "High-output motors + 95~98% efficient ESC enable stable operation with heavy inspection gear",
          "Optimal for power plants, transmission towers, bridges, and wind blade inspection",
          "Extended flight time supports night security, border surveillance, and disaster monitoring",
        ],
        industries: ["Power Infrastructure", "Bridges & Tunnels", "Security Surveillance", "Disaster Monitoring"],
      },
    ],
    aboutTitle: "About TECO Electric & Machinery",
    aboutDesc:
      "TECO is a global electrical and mechanical manufacturer founded in Taiwan in 1956 (TWSE 1504). Backed by 70 years of heritage, TECO holds the No.1 position in industrial motors in Taiwan and is among the global Top 5; it expanded into transformers via 2024 M&A. Together with 100 affiliates including Westinghouse, Motovario, and TEMICO, TECO operates 33 business sites, 10 manufacturing plants, and 3 innovation centers worldwide. As a total solution partner for green energy, electrification, and intelligence, 25,000+ employees deliver USD 2.2B+ in annual revenue.",
    aboutMission: "Mission",
    missionText: "As the key driver of global electrification, intelligence, and green energy, we shape a sustainable future through a complete lineup of motors, power distribution, drives, and drone motors.",
    aboutVision: "Vision",
    visionText: "Move to Lead 開創新局 — Building on 70 years of heritage to lead the next generation of electrification as a global total-solution provider.",
    customerTitle: "Affiliates & Global Partners",
    certTitle: "Certifications & Standards",
    certs: [
      { name: "ISO 9001", desc: "Quality Management" },
      { name: "CSA", desc: "Canada Safety" },
      { name: "UL", desc: "US Safety Listing" },
      { name: "CE", desc: "EU Conformity" },
      { name: "CCC", desc: "China Compulsory" },
      { name: "RoHS", desc: "Hazardous Substance" },
      { name: "IEC 60947", desc: "LV Switchgear Standard" },
      { name: "GB 14048", desc: "China LV Standard" },
    ],
    whyTitle: "Why OHI Tech × TECO",
    whys: [
      { title: "70 Years of Global Validation", desc: "Founded 1956 · 40+ countries · No.2 LV power distribution in Taiwan · Top 5 in global industrial motors." },
      { title: "Total Lineup Supply", desc: "Breakers, contactors, relays, drone motors, and ESCs — single-brand integrated supply for compatibility, lead time, and certification." },
      { title: "Korea Distributor Direct", desc: "OHI Tech directly manages stock, technical support, and lead times as the Korean distributor — fast quotes and stable supply." },
      { title: "Customized Integration Consulting", desc: "Beyond simple parts supply — full system design, matching, testing, and delivery as an application-focused solution." },
    ],
    ctaTitle: "Considering TECO Products?",
    ctaDesc: "From spec consultation for power distribution, drone motors, and ESCs to quotations — OHI Tech's expert team responds quickly.",
    ctaBtn1: "Contact Us Now",
    ctaBtn2: "View Case Studies",
  },
  zh: {
    hero: {
      eyebrow: "TECO 东元电机韩国官方合作伙伴 · OHI Tech 总代理",
      headline: "Move to Lead\n開創新局",
      sub: "70年传承 · 全球第二低压配电 · 无人机动力总成整体解决方案",
      cta1: "产品咨询",
      cta2: "查看案例",
      stats: [
        { value: "1956", label: "创立 (TWSE 1504)" },
        { value: "40+", label: "进驻国家" },
        { value: "25,000+", label: "全球员工" },
        { value: "USD 2.2B+", label: "2026年营收" },
      ],
    },
    productNav: "产品分类",
    products: [
      {
        id: "contactor",
        name: "交流接触器",
        nameEn: "AC Contactor (CN/CU/TMC Series)",
        tagline: "6A~800A · CSA·UL·CE·CCC 认证",
        desc: "自动开关大功率负载的核心配电组件。CN/CU/TMC 系列 6~800A 全产品线。支持 AC1~AC4 各类负载等级。CSA·UL·CE·CCC·RoHS 国际认证可立即应用于全球项目。",
        lineup: [
          { model: "CN/CU 系列", spec: "IEC 标准 · 6A~630A · 3极/4极" },
          { model: "TMC-E 系列", spec: "9A~38A · 轻工业专用 · 紧凑设计" },
          { model: "TMC-Z 系列", spec: "40A~800A · 大容量接触器" },
          { model: "RAM/RAN 继电器", spec: "AC 1.2~6A · DC 0.27A~0.55A · 辅助继电器" },
        ],
        apps: ["工业自动化", "工厂自动化", "建筑电气", "发电厂"],
      },
      {
        id: "overload",
        name: "过载继电器",
        nameEn: "Overload Relay (RHU/EOR)",
        tagline: "0.1~336A · 电机过热保护",
        desc: "防止过流损坏电机的保护装置。与接触器组合保障电机回路安全。提供热式（双金属）和电子式两种选项。",
        lineup: [
          { model: "RHU/RHN 系列", spec: "热式 · 0.1~336A · 缺相保护" },
          { model: "EOR 系列", spec: "电子式 · 0.1~200A · 精密跳闸" },
        ],
        apps: ["电机保护", "泵系统", "传送带", "压缩机"],
      },
      {
        id: "breaker",
        name: "断路器",
        nameEn: "Circuit Breaker (TMS/BM/BR/TCB/ACB)",
        tagline: "最高 6300A · 电机保护~ACB 全系列",
        desc: "短路、过载等危险发生时立即切断回路的安全装置。从小型 MCB 到大容量 ACB 全系列。台湾配电市场第2的可靠品质。",
        lineup: [
          { model: "TMS-S 系列", spec: "电机保护 · 0.1~32A · IP20" },
          { model: "BM/BR 系列", spec: "MCB 微型 · 1~125A · CE/CCC" },
          { model: "TCB/TAX 系列", spec: "MCCB 塑壳 · 16~800A" },
          { model: "TAW/BAW/TBW 系列", spec: "ACB · 最高 6300A · DC 4000A" },
          { model: "TDS/BOT/VBT 系列", spec: "ACB 变型 · 63~4000A" },
        ],
        apps: ["工业配电柜", "高层建筑", "电力输送", "数据中心"],
      },
      {
        id: "drone",
        name: "轻型无人机电机",
        nameEn: "Light Drone Motor Series",
        tagline: "10种型号 · 330W~3802W · 台湾制造",
        desc: "为商用无人机优化的高性能 BLDC 电机系列。日本进口高品质轴承，200°C 耐热绝缘钢板。Halbach 阵列外转子设计，扭矩密度提升 25%，最高效率 91.8%。",
        lineup: [
          { model: "2317 KV800", spec: "330W · 81.5g · 10\" 螺旋桨" },
          { model: "3024 KV790", spec: "2300W · 145g · 8S" },
          { model: "3115 KV900", spec: "1600W · 126g · 6S" },
          { model: "3508 KV650", spec: "350W · 78.5g · 4S" },
          { model: "4535 KV620", spec: "3600W · 522g · 12S · 18\"" },
          { model: "6013 KV210", spec: "2700W · 385g · 22\"" },
          { model: "6023 KV220", spec: "3400W · 515g · 22\"" },
          { model: "10010 KV110", spec: "3802W · 810g · 36\" · 大型无人机" },
        ],
        apps: ["测绘", "安防监控", "配送", "工业巡检"],
      },
      {
        id: "uav",
        name: "中型 UAV 动力总成",
        nameEn: "Medium UAV Powertrain System",
        tagline: "最大 150kg 载荷 · 76.5kg/旋翼推力",
        desc: "台湾每月量产 1,400+ 台的中大型 UAV 专用动力总成。5项专利技术（1项发明专利）。槽内风冷、20g 抗冲击、整形涂层应对严苛环境。农业喷洒、物流、救援任务的成熟解决方案。",
        lineup: [
          { model: "Drone 1", spec: "76.5kg/旋翼 · 12.9kW 峰值 · 4.65kW 额定 · 63×24\"" },
          { model: "Drone 2", spec: "40kg/旋翼 · 8.6kW 峰值 · 4kW 额定 · 54×20\"" },
          { model: "ESC (Drone 1)", spec: "300A 峰值 · CAN+PWM · 0.67kg" },
          { model: "ESC (Drone 2)", spec: "150A 峰值 · CAN+PWM · 0.42kg" },
        ],
        apps: ["农业喷洒", "重载物流", "灾难救援", "工业巡检"],
      },
      {
        id: "esc",
        name: "ESC 电子调速器",
        nameEn: "Electronic Speed Controller",
        tagline: "LC-ESC 系列 · 4-12S LiPo · PWM 控制",
        desc: "与 TECO 无人机电机完美匹配的专用 ESC。95~98% 驱动效率，体积密度提升 30%。轻量化设计延长飞行时间。",
        lineup: [
          { model: "LC-ESC-20A-6S", spec: "4-6S LiPo · 20A 额定 · 30A 峰值 · 11g" },
          { model: "LC-ESC-40A-6S", spec: "4-6S LiPo · 40A 额定 · 70A 峰值 · 13g" },
          { model: "LC-ESC-40A-12S", spec: "8-12S LiPo · 40A 额定 · 80A 峰值 · 25g" },
        ],
        apps: ["轻型无人机", "测绘 UAV", "航拍无人机", "FPV 竞速"],
      },
    ],
    solutionsTitle: "行业应用解决方案",
    solutionsSub: "TECO 配电与无人机技术应用的主要领域",
    solutionsCta: "咨询此方案",
    solutionsCustomerLabel: "主要应用行业",
    solutions: [
      {
        id: "direct",
        name: "直接电机驱动",
        challenge: "传统电机的简单 ON/OFF 控制，性价比基础配置",
        highlight: "断路器 → 接触器 → 过载继电器 → 电机",
        models: ["CU/CN", "RHU", "TCB"],
        metrics: [
          { value: "基本型", label: "配置" },
          { value: "最低", label: "初始成本" },
          { value: "稳健", label: "可靠性" },
        ],
        points: [
          "断路器 → 接触器 → 过载继电器 → 电机的标准 4 段配置确保安全供电",
          "结构简单便于维护 · 部件兼容性强可即时更换",
          "TECO 单一品牌全部件匹配——认证、可靠性、交期一次解决",
        ],
        industries: ["泵", "风扇", "传送带", "机床"],
      },
      {
        id: "motor",
        name: "电机保护断路器",
        challenge: "启动电流、过载、缺相保护一体化的紧凑配置",
        highlight: "电机保护断路器 + 接触器 + 电机",
        models: ["TMS-S", "TMC-E", "CU"],
        metrics: [
          { value: "集成", label: "保护功能" },
          { value: "紧凑", label: "面板空间" },
          { value: "0.1~32A", label: "范围" },
        ],
        points: [
          "TMS-S 系列一台集成断路、过载、缺相保护——节省面板空间 30%",
          "无需另设过载继电器 · 简化布线缩短安装时间",
          "0.1~32A 宽范围覆盖中小型电机",
        ],
        industries: ["小型电机", "压缩机", "BLDC 系统", "泵组"],
      },
      {
        id: "vfd",
        name: "VFD（变频器）启动器",
        challenge: "需要变速控制、节能、精密扭矩控制的环境",
        highlight: "断路器 → 接触器 → VFD → 电机",
        models: ["TCB", "CU", "TECO VFD"],
        metrics: [
          { value: "变速", label: "精密控制" },
          { value: "30%↓", label: "节能" },
          { value: "集成", label: "保护内置" },
        ],
        points: [
          "VFD 集成启停和过载保护——电机寿命延长 2 倍以上",
          "再生制动与变速控制平均节能 30%",
          "TECO 接触器、断路器、VFD 全系列匹配的系统集成验证",
        ],
        industries: ["HVAC", "压缩机", "风机", "物流传送"],
      },
      {
        id: "servo",
        name: "伺服启动器",
        challenge: "需要精密位置控制与高响应的自动化与机器人环境",
        highlight: "断路器 → 接触器（可选）→ 伺服驱动器 → 电机",
        models: ["TCB", "TMC-E", "Servo"],
        metrics: [
          { value: "微米级", label: "精密控制" },
          { value: "高速", label: "响应" },
          { value: "集成", label: "安全保护" },
        ],
        points: [
          "伺服驱动器含启停与过载保护——接触器仅作可选",
          "微米级位置控制最适合机器人、半导体设备、精密自动化",
          "与 TECO 断路器匹配的伺服系统集成方案",
        ],
        industries: ["工业机器人", "半导体设备", "机床", "包装自动化"],
      },
      {
        id: "drone-survey",
        name: "测绘无人机",
        challenge: "长时间飞行、精密 GPS 数据采集、广域覆盖",
        highlight: "轻型无人机电机 + ESC · 高效率延长飞行时间",
        models: ["3508 KV650", "5308 KV280", "LC-ESC-20A-6S"],
        metrics: [
          { value: "11W/g", label: "推力效率" },
          { value: "91.8%", label: "最高效率" },
          { value: "200°C", label: "耐热性" },
        ],
        points: [
          "Halbach 阵列设计达成同级最高效率——同电池下飞行时间 +30%",
          "日本轴承、高品质绝缘钢板在 200°C 环境下稳定运转",
          "测绘、LiDAR、多光谱相机有效载荷的稳定运行",
        ],
        industries: ["国土测绘", "施工现场测绘", "农地分析", "矿产勘查"],
      },
      {
        id: "drone-agri",
        name: "农业喷洒与运输",
        challenge: "150kg 农药与物资运输，严苛农业环境耐久性",
        highlight: "中型 UAV 动力总成 · 150kg 载荷 · 5 项专利",
        models: ["UAV Drone 1", "UAV ESC 300A", "BLDC Motor 76.5kg"],
        metrics: [
          { value: "150kg", label: "最大载荷" },
          { value: "20g", label: "抗冲击" },
          { value: "5", label: "项专利" },
        ],
        points: [
          "月产 1,400+ 台量产验证的农业无人机电机——已在 350+ 架 UAV 上服役",
          "整形涂层与高级盐雾耐受性完美应对农药与海风环境",
          "槽内风冷与防轴承滑移设计支持高温、高负载长时间运行",
        ],
        industries: ["农药喷洒", "种子播撒", "紧急物流", "灾难救援"],
      },
      {
        id: "drone-inspect",
        name: "工业巡检与安防",
        challenge: "精密悬停、相机与传感器稳定运行、夜间与恶劣天气飞行",
        highlight: "轻型电机 + ESC · 精密飞行稳定性",
        models: ["6013 KV210", "10010 KV110", "LC-ESC-40A-12S"],
        metrics: [
          { value: "±0.1m", label: "悬停精度" },
          { value: "98%", label: "ESC 效率" },
          { value: "可扩展", label: "载荷" },
        ],
        points: [
          "高功率电机 + 95~98% 高效 ESC 组合稳定运行重型巡检设备",
          "最适合发电厂、输电塔、桥梁、风机叶片精密巡检",
          "夜间安防、边境监视、灾难监测等长时间飞行支持",
        ],
        industries: ["电力基础设施", "桥梁隧道", "安防监控", "灾难监测"],
      },
    ],
    aboutTitle: "TECO 东元电机简介",
    aboutDesc:
      "TECO 是 1956 年于台湾创立的全球电气机械综合制造商（TWSE 1504）。凭借 70 年的传承，TECO 在台湾工业电机市场排名第 1，全球前 5；2024 年通过并购扩展至变压器领域。与 Westinghouse、Motovario、TEMICO 等 100 家全球关联企业一同运营 33 个营业据点、10 个生产基地、3 个创新中心。作为绿色能源、电动化、智能化的整体解决方案合作伙伴，全球 25,000+ 名员工创造 USD 2.2B+ 营收。",
    aboutMission: "使命",
    missionText: "作为全球电动化、智能化、绿色能源的核心驱动力，以电机、配电、驱动、无人机电机的全系列共建可持续的未来。",
    aboutVision: "愿景",
    visionText: "Move to Lead 開創新局——以 70 年传承为基础，引领下一代电动化时代的全球整体解决方案企业。",
    customerTitle: "主要关联企业与全球合作伙伴",
    certTitle: "认证与标准",
    certs: [
      { name: "ISO 9001", desc: "质量管理体系" },
      { name: "CSA", desc: "加拿大安全认证" },
      { name: "UL", desc: "美国安全认证" },
      { name: "CE", desc: "欧盟符合性" },
      { name: "CCC", desc: "中国强制认证" },
      { name: "RoHS", desc: "有害物质限制" },
      { name: "IEC 60947", desc: "低压开关标准" },
      { name: "GB 14048", desc: "中国低压标准" },
    ],
    whyTitle: "OHI Tech × TECO 合作优势",
    whys: [
      { title: "70 年全球验证", desc: "1956 年创立 · 40 国进驻 · 台湾低压配电第 2 · 全球工业电机前 5 的成熟可靠。" },
      { title: "全产品线整体供应", desc: "断路器、接触器、继电器、无人机电机、ESC 单一品牌整体供应——兼容性、交期、认证一次到位。" },
      { title: "韩国总代直供", desc: "OHI Tech 作为韩国总代直接管理库存、技术支持、交期——快速报价与稳定供应。" },
      { title: "定制化整体咨询", desc: "不仅是部件供应，而是从系统设计、匹配、测试到交付的应用焦点解决方案。" },
    ],
    ctaTitle: "正在考虑引进 TECO 产品？",
    ctaDesc: "配电组件、无人机电机、ESC 规格咨询及报价——OHI Tech 专业团队迅速回应。",
    ctaBtn1: "立即联系",
    ctaBtn2: "查看案例",
  },
};

const PARTNERS = ["TECO Westinghouse", "Motovario", "TEMICO", "Wuxi Plant (China)", "Vietnam Plant", "Mexico S.A.", "Italy S.p.A.", "TEMICO India"];

const PRODUCT_THUMB: Record<string, { label: string; gradient: string }> = {
  contactor: { label: "AC", gradient: "from-blue-600 to-blue-800" },
  overload:  { label: "OL", gradient: "from-orange-500 to-orange-700" },
  breaker:   { label: "CB", gradient: "from-slate-600 to-slate-800" },
  drone:     { label: "DM", gradient: "from-sky-500 to-indigo-700" },
  uav:       { label: "UAV",gradient: "from-emerald-600 to-teal-700" },
  esc:       { label: "ESC",gradient: "from-purple-600 to-fuchsia-700" },
};

const SOLUTION_IMG: Record<string, string> = {
  direct:         IMG.solDirect,
  motor:          IMG.solMotor,
  vfd:            IMG.solVfd,
  servo:          IMG.solServo,
  "drone-survey": IMG.solSurvey,
  "drone-agri":   IMG.solMedical,
  "drone-inspect":IMG.solSecurity,
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function TecoSection({ locale }: { locale: Locale }) {
  const c = LANG[locale];
  const [activeProduct, setActiveProduct] = useState(c.products[0].id);
  const [activeSolution, setActiveSolution] = useState(c.solutions[0].id);

  const currentProduct = c.products.find((p) => p.id === activeProduct) ?? c.products[0];
  const currentSolution = c.solutions.find((s) => s.id === activeSolution) ?? c.solutions[0];

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8">

      {/* ══ SECTION 1: HERO ══ */}
      <section className="hero-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)",
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
              href={`/contact?lang=${locale}&type=inquiry&category=power-distribution`}
              className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=sample&category=power-distribution`}
              className="border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta2}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-10">
            {c.hero.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[var(--accent)]">{s.value}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: PRODUCT SHOWCASE ══ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
            {locale === "ko" ? "제품 포트폴리오" : locale === "en" ? "Product Portfolio" : "产品系列"}
          </h2>
          <p className="text-slate-500 text-sm mb-10">
            {locale === "ko"
              ? "TECO 전 제품군 — 배전 부품부터 드론 파워트레인까지"
              : locale === "en"
              ? "Full TECO range — from power distribution to drone powertrain"
              : "TECO 全系列产品——从配电组件到无人机动力总成"}
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Category nav */}
            <div className="lg:w-64 shrink-0">
              <div className="lg:sticky lg:top-24 space-y-1">
                {c.products.map((p) => {
                  const thumb = PRODUCT_THUMB[p.id];
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveProduct(p.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                        activeProduct === p.id
                          ? "bg-slate-900 text-white shadow-md"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span className={`w-9 h-9 rounded-lg shrink-0 bg-gradient-to-br ${thumb.gradient} text-white text-[10px] font-black flex items-center justify-center`}>
                        {thumb.label}
                      </span>
                      <span className="leading-snug">{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Product detail */}
            <div className="flex-1 min-w-0">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 overflow-hidden">
                {/* Product header */}
                <div className="relative bg-white border-b border-slate-200 p-8 overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[var(--accent)]" />
                  <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[var(--accent)] opacity-10 blur-2xl" />
                  <div className="flex items-start justify-between gap-4 pl-5">
                    <div className="flex-1">
                      <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">{currentProduct.nameEn}</p>
                      <h3 className="text-2xl font-black text-slate-900 mb-3">{currentProduct.name}</h3>
                      <span className="inline-block bg-slate-900 text-white text-xs font-mono px-3 py-1 rounded-full">
                        {currentProduct.tagline}
                      </span>
                    </div>
                    <span className={`w-28 h-28 rounded-2xl shrink-0 shadow-lg ring-1 ring-slate-200 bg-gradient-to-br ${PRODUCT_THUMB[currentProduct.id].gradient} text-white text-2xl font-black flex items-center justify-center`}>
                      {PRODUCT_THUMB[currentProduct.id].label}
                    </span>
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
                          <span className="font-mono text-xs font-bold text-slate-900 bg-white border border-slate-200 px-2 py-1 rounded-lg shrink-0 mt-0.5 whitespace-nowrap">
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
                          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shrink-0" />
                          {app}
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/contact?lang=${locale}&type=quote&category=power-distribution&product=${currentProduct.id}`}
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

      {/* ══ SECTION 3: SOLUTIONS ══ */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{c.solutionsTitle}</h2>
            <p className="text-slate-500 text-sm">{c.solutionsSub}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: solution list */}
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
                        {currentSolution.industries.map((name) => (
                          <span key={name} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/contact?lang=${locale}&type=inquiry&category=power-distribution&solution=${currentSolution.id}`}
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

      {/* ══ SECTION 4: ABOUT TECO ══ */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-3">
                TECO Electric & Machinery Co., Ltd. (TWSE 1504)
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{c.aboutTitle}</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{c.aboutDesc}</p>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-xs font-bold text-[var(--accent)] mb-1">{c.aboutMission}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{c.missionText}</p>
                </div>
                <div className="border-l-4 border-orange-400 pl-4">
                  <p className="text-xs font-bold text-orange-500 mb-1">{c.aboutVision}</p>
                  <p className="text-sm text-slate-600 leading-relaxed italic">{c.visionText}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
                  {locale === "ko" ? "글로벌 거점 (33 사업장 · 10 공장 · 3 R&D 센터)" : locale === "en" ? "Global Footprint (33 Sites · 10 Plants · 3 R&D Centers)" : "全球据点 (33 营业 · 10 工厂 · 3 创新中心)"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {["🇹🇼 Taiwan HQ", "🇨🇳 China (Wuxi)", "🇻🇳 Vietnam", "🇮🇹 Italy (Motovario)", "🇮🇳 India (TEMICO)", "🇲🇽 Mexico", "🇺🇸 USA (Westinghouse)", "🇸🇬 SEA HQ"].map((g) => (
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

      {/* ══ SECTION 5: WHY OHI TECH × TECO ══ */}
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

      {/* ══ SECTION 6: CTA ══ */}
      <section className="bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{c.ctaTitle}</h2>
          <p className="text-white/70 text-sm mb-8 max-w-lg mx-auto">{c.ctaDesc}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/contact?lang=${locale}&type=inquiry&category=power-distribution`}
              className="bg-white text-[var(--primary)] hover:bg-gray-50 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg"
            >
              {c.ctaBtn1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=sample&category=power-distribution`}
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
