"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";

/* ─────────────────────────────────────────────
   RONGXIN PRODUCT IMAGES (local, extracted from
   manufacturer catalog — transparent cutouts)
───────────────────────────────────────────── */
const PRODUCT_IMG: Record<string, string> = {
  ac:    "/images/products/ev/rongxin-ac-charger.png",
  dc:    "/images/products/ev/rongxin-dc-charger.png",
  split: "/images/products/ev/rongxin-split-power.png",
};

/* Per-solution support spec tags (honest product specs,
   not third-party customer logos). Locale-scoped. */
const SOLUTION_TAGS: Record<Locale, Record<string, string[]>> = {
  ko: {
    commercial:  ["DC 120kW", "CCS2", "OCPP 2.0.1", "다이나믹 전력분배"],
    residential: ["AC 7~22kW", "Type1", "IP55", "한글 UI"],
    parking:     ["IP55", "원격 모니터링", "OTA 펌웨어"],
    gasstation:  ["DC 200kW DUAL", "액냉", "15인치 터치"],
    fleet:       ["Split 480kW+", "순차/분배 충전", "CMS 연동"],
    hospitality: ["AC 22kW", "RFID·APP·POS", "7인치 터치"],
  },
  en: {
    commercial:  ["DC 120kW", "CCS2", "OCPP 2.0.1", "Dynamic distribution"],
    residential: ["AC 7~22kW", "Type1", "IP55", "Korean UI"],
    parking:     ["IP55", "Remote monitoring", "OTA firmware"],
    gasstation:  ["DC 200kW DUAL", "Liquid cooling", "15-inch touch"],
    fleet:       ["Split 480kW+", "Sequential/dynamic", "CMS integration"],
    hospitality: ["AC 22kW", "RFID·APP·POS", "7-inch touch"],
  },
  zh: {
    commercial:  ["DC 120kW", "CCS2", "OCPP 2.0.1", "动态分配"],
    residential: ["AC 7~22kW", "Type1", "IP55", "韩文UI"],
    parking:     ["IP55", "远程监控", "OTA固件"],
    gasstation:  ["DC 200kW DUAL", "液冷", "15英寸触屏"],
    fleet:       ["Split 480kW+", "顺序/动态充电", "CMS对接"],
    hospitality: ["AC 22kW", "RFID·APP·POS", "7英寸触屏"],
  },
};

/* ─────────────────────────────────────────────
   STATIC CONTENT
───────────────────────────────────────────── */

const LANG = {
  ko: {
    hero: {
      eyebrow: "RongXin New Energy 한국 공급 파트너 · SKD 부품 공급 + 국내 조립",
      headline: "Empowering\nThe Future.",
      sub: "DC 급속 20~600kW · Split Power 2,560kW+ · SKD 국산 조립 · 정부 보조금 규격 대응",
      cta1: "제품 상담 문의",
      cta2: "도입 사례 보기",
      stats: [
        { value: "20~600kW", label: "DC 급속 출력 범위" },
        { value: "2,560kW+", label: "Split Power 최대" },
        { value: "CE 인증", label: "유럽 안전 인증 보유" },
        { value: "OCPP 2.0.1", label: "충전 프로토콜 대응" },
      ],
    },
    productNav: "제품 카테고리",
    products: [
      {
        id: "ac",
        name: "AC 완속 충전기 7·11·22kW",
        nameEn: "RongXin AC Charger Series",
        color: "bg-[var(--primary)]",
        tagline: "벽부형 · 7인치 터치 · OCPP 2.0.1 대응",
        desc: "주거·상업 환경용 AC 완속 충전기. 7/11/22kW 출력, 7인치 터치스크린, APP·RFID 인증, IP55 방수방진, 벽부형 설치를 지원합니다. OCPP 1.6(2.0.1 업그레이드)과 한국 CMS 연동·한글 UI를 제공합니다.",
        lineup: [
          { model: "AC 7kW", spec: "단상 220V · 32A · Type1(J1772) · 주거·직원 주차" },
          { model: "AC 11kW", spec: "단상 220V · 50A · 범용 완속 충전" },
          { model: "AC 22kW", spec: "3상 · 고출력 완속 · 상업 시설용" },
        ],
        apps: ["주거 단지", "오피스 주차장", "상업 시설", "직원 전용 충전"],
      },
      {
        id: "dc",
        name: "DC 급속충전기 20~600kW",
        nameEn: "RongXin DC Fast Charger",
        color: "bg-[var(--primary)]",
        tagline: "지능형 액냉 · 최대 600A · 멀티 표준 커넥터",
        desc: "20kW부터 600kW까지 폭넓은 출력 라인업의 DC 급속충전기. 지능형 액체냉각으로 고출력 연속 운전이 가능하며 효율 ≥95%(피크 96%)를 확보합니다. CCS1/CCS2/GB-T/NACS 멀티 커넥터, 스탠드형, IP54/55 보호등급을 지원합니다.",
        lineup: [
          { model: "DC 100kW DUAL", spec: "듀얼 CCS · 채널당 50kW · 15인치 터치" },
          { model: "DC 200kW DUAL", spec: "역률 0.99 · 채널당 100kW · 액냉" },
          { model: "DC 20~600kW", spec: "20/40/60/120/240/360/480/600kW 구성" },
        ],
        apps: ["공공 충전소", "고속도로 휴게소", "상업 주차장", "플릿 충전 거점"],
      },
      {
        id: "split",
        name: "Split Power 분산형 480~2,560kW+",
        nameEn: "RongXin Split Power Charging System",
        color: "bg-[var(--primary)]",
        tagline: "다이나믹 전력분배 · 모듈 확장 · 메가 충전",
        desc: "전력 캐비닛과 다수 디스펜서를 분리한 분산형(Split) 초고출력 충전 시스템. 480kW부터 2,560kW+까지 확장 가능하며, 다이나믹 전력 분배로 차량별 최적 출력을 자동 할당합니다. 버스·트럭·택시 플릿과 메가 충전 파크에 최적입니다.",
        lineup: [
          { model: "480~960kW", spec: "중형 분산 플랫폼 · 모듈형 확장" },
          { model: "1,280~1,920kW", spec: "대형 충전 허브 · 다이나믹 분배" },
          { model: "2,560kW+", spec: "메가 충전 파크 · 초고출력 운영" },
        ],
        apps: ["버스 차고지", "물류·택시 플릿", "메가 충전 파크", "상업 EV 허브"],
      },
    ],
    solutionsTitle: "산업별 충전 솔루션",
    solutionsSub: "RongXin EV 충전 라인업이 적용되는 주요 산업 분야",
    solutionsCta: "이 솔루션 문의",
    solutionsCustomerLabel: "지원 규격",
    solutions: [
      {
        id: "commercial",
        name: "상업용 빌딩",
        color: "bg-[var(--primary)]",
        challenge: "다수 차량 동시 충전, 공간 제약, 수익성 확보",
        highlight: "DC 급속 + 다이나믹 전력분배 · 스마트 관제",
        models: ["DC 120kW", "DC 200kW", "AC 22kW"],
        metrics: [
          { value: "600kW", label: "최대 충전 출력" },
          { value: "멀티포트", label: "동시 충전 지원" },
          { value: "OCPP", label: "스마트 관제" },
        ],
        points: [
          "DC 급속과 다이나믹 전력분배로 다수 차량을 계약 전력 안에서 효율 충전 — 운영비 절감",
          "OCPP 1.6/2.0.1 대응으로 기존 CSMS와 연동 — 통합 관제 및 원격 모니터링",
          "한국 CMS 연동·한글 UI로 국내 운영 환경에 즉시 대응",
        ],
      },
      {
        id: "residential",
        name: "주거 시설",
        color: "bg-[var(--primary)]",
        challenge: "아파트·빌라 충전 인프라, 과금 시스템, 관리 편의성",
        highlight: "AC 완속 · 스마트 과금 · 간편 벽부형 설치",
        models: ["AC 7kW", "AC 11kW", "AC 22kW"],
        metrics: [
          { value: "7~22kW", label: "AC 완속 출력" },
          { value: "RFID·APP", label: "과금 연동" },
          { value: "IP55", label: "방수방진" },
        ],
        points: [
          "7~22kW AC 완속 충전기로 안전하고 효율적인 야간 충전 — 전기요금 절감",
          "RFID·APP 기반 과금 연동으로 세대별 정확한 사용량 정산 — 관리 효율화",
          "벽부형 간편 설치로 공사 비용 최소화 — 기존 전기 인프라 활용",
        ],
      },
      {
        id: "parking",
        name: "야외 주차장",
        color: "bg-[var(--primary)]",
        challenge: "날씨 내구성, 안정 운영, 고가용성",
        highlight: "IP55 방수방진 · 24/7 원격 관제 · OTA 펌웨어",
        models: ["DC 60kW", "DC 120kW", "AC 22kW"],
        metrics: [
          { value: "IP55", label: "방수방진 등급" },
          { value: "24/7", label: "원격 모니터링" },
          { value: "OTA", label: "펌웨어 업데이트" },
        ],
        points: [
          "IP55 방수방진 등급으로 혹독한 야외 환경에서도 안정적 운영 — 유지보수 비용 절감",
          "원격 모니터링과 지능형 장애 감지로 24시간 상태 관리 — 가동률 극대화",
          "OTA 펌웨어 업데이트로 현장 방문 없이 기능 개선·보안 패치 적용",
        ],
      },
      {
        id: "gasstation",
        name: "주유소 · 에너지 스테이션",
        color: "bg-[var(--primary)]",
        challenge: "기존 부지 활용, 빠른 충전 회전율, 추가 수익",
        highlight: "DC 초고속 · 액냉 연속운전 · 빠른 회전",
        models: ["DC 200kW", "DC 360kW", "Split 480kW"],
        metrics: [
          { value: "200kW+", label: "급속 충전" },
          { value: "액냉", label: "연속 운전" },
          { value: "복합", label: "에너지 스테이션" },
        ],
        points: [
          "200kW+ DC 급속과 지능형 액냉으로 연속 고출력 운전 — 주유소 수준의 빠른 회전율",
          "15인치 터치·신용카드·QR 결제로 일반 이용자 친화적 운영",
          "기존 주유 설비와 병행 운영으로 점진적 전환 — 초기 투자 리스크 최소화",
        ],
      },
      {
        id: "fleet",
        name: "상업용 플릿",
        color: "bg-[var(--primary)]",
        challenge: "대규모 차량 동시 충전, 스케줄 관리, TCO 최적화",
        highlight: "Split Power 분산형 · 다이나믹 분배 · CMS 연동",
        models: ["Split 480kW", "Split 960kW", "DC 200kW"],
        metrics: [
          { value: "2,560kW+", label: "Split 최대" },
          { value: "분배", label: "다이나믹 충전" },
          { value: "TCO", label: "운영비 절감" },
        ],
        points: [
          "Split Power 분산형이 차량별 최적 출력을 분배 — 계약 전력 초과 없이 다수 차량 충전",
          "CMS 연동으로 차량별 충전 스케줄·이력·비용 관리 — 플릿 운영 TCO 절감",
          "버스·트럭·택시 등 대형 상용차 플릿에 최적화된 메가 충전 구성",
        ],
      },
      {
        id: "hospitality",
        name: "쇼핑몰 · 호스피탈리티",
        color: "bg-[var(--primary)]",
        challenge: "고객 체류 시간 충전, 프리미엄 이미지, 결제 편의",
        highlight: "세련된 디자인 · 7인치 터치 · 다양한 결제",
        models: ["DC 120kW", "AC 22kW", "DC 60kW"],
        metrics: [
          { value: "7인치", label: "터치 스크린" },
          { value: "RFID·POS", label: "결제 연동" },
          { value: "앱", label: "원격 제어" },
        ],
        points: [
          "세련된 디자인의 AC·DC 라인업으로 쇼핑몰·호텔 공간과 조화 — 브랜드 가치 제고",
          "RFID·APP·POS 등 다양한 결제 방식으로 고객 편의성 극대화",
          "체류 시간에 맞춘 출력 구성(완속~급속)으로 충전 경험 최적화 — 재방문율 향상",
        ],
      },
    ],
    aboutTitle: "RongXin New Energy 소개",
    aboutDesc:
      "Zhengzhou Rongxin New Energy Technology(容新新能源)는 2019년 설립된 EV 충전 솔루션 제조 기업으로, R&D·설계·생산·스마트 에너지 솔루션을 통합 운영합니다. 약 10,000㎡ 규모의 R&D·생산 시설과 다수의 특허, OEM/ODM 역량을 보유하고 있으며, AC 완속부터 DC 급속·Split Power 초고출력·E-bike 충전까지 폭넓은 라인업을 공급합니다. OHI Tech는 RongXin의 부품(SKD) 공급과 한국 현지 조립을 통해 국내 시장에 EV 충전 인프라를 제공합니다.",
    aboutMission: "공급 방식",
    missionText: "완제품 수입이 아닌 SKD(부품) 공급 + 한국 현지 조립 방식으로, 국산화 요건과 정부 보조금 충전기 기준에 대응합니다. 제조사는 부품 공급과 함께 조립 매뉴얼·배선도·원격 기술지원·시운전(commissioning)을 제공합니다.",
    aboutVision: "규격 대응",
    visionText: "기후에너지환경부 규격(효율 ≥95%, 역률 0.99, ISO 15118·DIN 70121, OCPP 1.6 이상)에 맞춰 설계·검증하며, KC 안전확인·고효율기자재 인증을 현지 조립과 함께 추진합니다.",
    customerTitle: "핵심 역량",
    certTitle: "인증 및 표준",
    certs: [
      { name: "CE", desc: "유럽 안전 인증 보유" },
      { name: "IEC 61851", desc: "EV 충전 인터페이스 표준" },
      { name: "ISO 15118", desc: "Plug & Charge·V2G 통신" },
      { name: "DIN 70121", desc: "DC 충전 통신 프로토콜" },
      { name: "OCPP 1.6J / 2.0.1", desc: "서버 통신 프로토콜" },
      { name: "KC 안전확인", desc: "국내 인증 — 취득 진행" },
      { name: "고효율기자재", desc: "국내 인증 — 신청 진행" },
      { name: "RoHS / FCC", desc: "신청 가능" },
    ],
    whyTitle: "OHI Tech × RongXin 파트너십",
    whys: [
      { title: "SKD 공급 + 국내 조립", desc: "부품(SKD) 공급과 한국 현지 조립으로 국산화 요건을 충족 — 정부 보조금 충전기 기준에 대응합니다." },
      { title: "정부 규격 대응", desc: "기후에너지환경부 규격(효율·역률·ISO 15118·OCPP)에 맞춘 설계와 검증으로 국내 인증을 추진합니다." },
      { title: "제조사 기술 지도", desc: "조립 매뉴얼·배선도·원격 기술지원·시운전·공장 교육까지 제조사가 직접 지원합니다." },
      { title: "가격·납기 경쟁력", desc: "완제품 수입 대비 SKD + 현지 조립으로 원가·납기·A/S 대응력을 확보합니다." },
    ],
    ctaTitle: "EV 충전 인프라 도입을 고려 중이신가요?",
    ctaDesc: "제품 상담, 사이트 분석, 설치 견적까지 OHI Tech 전문팀이 빠르게 응대합니다.",
    ctaBtn1: "지금 문의하기",
    ctaBtn2: "도입 사례 보기",
  },
  en: {
    hero: {
      eyebrow: "RongXin New Energy Korea Supply Partner · SKD Supply + Local Assembly",
      headline: "Empowering\nThe Future.",
      sub: "DC Fast 20~600kW · Split Power 2,560kW+ · Local SKD Assembly · Government Spec Compliant",
      cta1: "Request Consultation",
      cta2: "View Case Studies",
      stats: [
        { value: "20~600kW", label: "DC Fast Power Range" },
        { value: "2,560kW+", label: "Split Power Max" },
        { value: "CE Certified", label: "European Safety Cert" },
        { value: "OCPP 2.0.1", label: "Charging Protocol" },
      ],
    },
    productNav: "Product Categories",
    products: [
      {
        id: "ac",
        name: "AC Charger 7·11·22kW",
        nameEn: "RongXin AC Charger Series",
        color: "bg-[var(--primary)]",
        tagline: "Wall-mounted · 7-inch Touch · OCPP 2.0.1 Ready",
        desc: "AC charger for residential and commercial environments. 7/11/22kW output, 7-inch touchscreen, APP and RFID authentication, IP55 weatherproofing, and wall-mounted installation. Supports OCPP 1.6 (upgradeable to 2.0.1) with Korean CMS integration and Korean UI.",
        lineup: [
          { model: "AC 7kW", spec: "1-phase 220V · 32A · Type1(J1772) · Residential" },
          { model: "AC 11kW", spec: "1-phase 220V · 50A · General-purpose AC" },
          { model: "AC 22kW", spec: "3-phase · High-power AC · Commercial" },
        ],
        apps: ["Residential Complexes", "Office Parking", "Commercial Facilities", "Employee Charging"],
      },
      {
        id: "dc",
        name: "DC Fast Charger 20~600kW",
        nameEn: "RongXin DC Fast Charger",
        color: "bg-[var(--primary)]",
        tagline: "Intelligent Liquid Cooling · Up to 600A · Multi-standard",
        desc: "DC fast charger spanning 20kW to 600kW. Intelligent liquid cooling enables continuous high-power operation at ≥95% efficiency (peak 96%). Supports CCS1/CCS2/GB-T/NACS multi-connectors, floor-standing design, IP54/55 protection.",
        lineup: [
          { model: "DC 100kW DUAL", spec: "Dual CCS · 50kW/channel · 15-inch touch" },
          { model: "DC 200kW DUAL", spec: "PF 0.99 · 100kW/channel · liquid-cooled" },
          { model: "DC 20~600kW", spec: "20/40/60/120/240/360/480/600kW config" },
        ],
        apps: ["Public Charging Stations", "Highway Rest Areas", "Commercial Parking", "Fleet Hubs"],
      },
      {
        id: "split",
        name: "Split Power 480~2,560kW+",
        nameEn: "RongXin Split Power Charging System",
        color: "bg-[var(--primary)]",
        tagline: "Dynamic Power Distribution · Modular · Mega Charging",
        desc: "Split-architecture ultra-high-power system separating the power cabinet from multiple dispensers. Scalable from 480kW to 2,560kW+, with dynamic power distribution automatically allocating optimal output per vehicle. Ideal for bus, truck, and taxi fleets and mega charging parks.",
        lineup: [
          { model: "480~960kW", spec: "Mid-size split platform · modular" },
          { model: "1,280~1,920kW", spec: "Large charging hub · dynamic allocation" },
          { model: "2,560kW+", spec: "Mega charging park · ultra-high power" },
        ],
        apps: ["Bus Depots", "Logistics & Taxi Fleets", "Mega Charging Parks", "Commercial EV Hubs"],
      },
    ],
    solutionsTitle: "Industry Charging Solutions",
    solutionsSub: "RongXin EV charging lineup across key industry verticals",
    solutionsCta: "Inquire About This Solution",
    solutionsCustomerLabel: "Supported Specs",
    solutions: [
      {
        id: "commercial",
        name: "Commercial Buildings",
        color: "bg-[var(--primary)]",
        challenge: "Multi-vehicle simultaneous charging, space constraints, ROI",
        highlight: "DC fast + dynamic distribution · Smart management",
        models: ["DC 120kW", "DC 200kW", "AC 22kW"],
        metrics: [
          { value: "600kW", label: "Max Output" },
          { value: "Multi-port", label: "Simultaneous" },
          { value: "OCPP", label: "Smart Management" },
        ],
        points: [
          "DC fast charging with dynamic distribution charges multiple vehicles within contracted power — lower operating costs",
          "OCPP 1.6/2.0.1 support integrates with existing CSMS — unified management and remote monitoring",
          "Korean CMS integration and Korean UI for immediate domestic operation",
        ],
      },
      {
        id: "residential",
        name: "Residential",
        color: "bg-[var(--primary)]",
        challenge: "Apartment EV charging infrastructure, billing, management ease",
        highlight: "AC charging · Smart billing · Simple wall installation",
        models: ["AC 7kW", "AC 11kW", "AC 22kW"],
        metrics: [
          { value: "7~22kW", label: "AC Output" },
          { value: "RFID·APP", label: "Billing" },
          { value: "IP55", label: "Weatherproof" },
        ],
        points: [
          "7~22kW AC chargers for safe and efficient overnight charging — reduced electricity costs",
          "RFID and APP-based billing for accurate per-unit usage settlement — streamlined management",
          "Simple wall-mounted installation minimizes construction costs — leverages existing infrastructure",
        ],
      },
      {
        id: "parking",
        name: "Outdoor Parking",
        color: "bg-[var(--primary)]",
        challenge: "Weather durability, stable operation, high availability",
        highlight: "IP55 weatherproof · 24/7 remote monitoring · OTA firmware",
        models: ["DC 60kW", "DC 120kW", "AC 22kW"],
        metrics: [
          { value: "IP55", label: "Ingress Protection" },
          { value: "24/7", label: "Remote Monitoring" },
          { value: "OTA", label: "Firmware Update" },
        ],
        points: [
          "IP55 protection ensures stable operation in harsh outdoor conditions — reduced maintenance costs",
          "Remote monitoring with intelligent fault detection for 24/7 status management — maximize uptime",
          "OTA firmware updates apply feature and security patches without site visits",
        ],
      },
      {
        id: "gasstation",
        name: "Gas Stations",
        color: "bg-[var(--primary)]",
        challenge: "Utilize existing sites, fast turnover, additional revenue",
        highlight: "DC ultra-fast · liquid-cooled continuous · quick turnover",
        models: ["DC 200kW", "DC 360kW", "Split 480kW"],
        metrics: [
          { value: "200kW+", label: "Fast Charging" },
          { value: "Liquid Cool", label: "Continuous" },
          { value: "Hybrid", label: "Energy Station" },
        ],
        points: [
          "200kW+ DC fast charging with intelligent liquid cooling for continuous high-power operation — gas-station-level turnover",
          "15-inch touch, credit card, and QR payment for user-friendly operation",
          "Parallel operation alongside existing fuel infrastructure for gradual transition — minimized investment risk",
        ],
      },
      {
        id: "fleet",
        name: "Commercial Fleets",
        color: "bg-[var(--primary)]",
        challenge: "Large-scale simultaneous charging, schedule management, TCO",
        highlight: "Split Power · dynamic distribution · CMS integration",
        models: ["Split 480kW", "Split 960kW", "DC 200kW"],
        metrics: [
          { value: "2,560kW+", label: "Split Max" },
          { value: "Distribute", label: "Dynamic Charging" },
          { value: "TCO", label: "Cost Reduction" },
        ],
        points: [
          "Split Power distributes optimal output per vehicle — charge many vehicles without exceeding contracted capacity",
          "CMS integration tracks per-vehicle schedules, history, and costs — reduce fleet operating TCO",
          "Mega-charging configurations optimized for bus, truck, and taxi fleets",
        ],
      },
      {
        id: "hospitality",
        name: "Shopping Centers & Hospitality",
        color: "bg-[var(--primary)]",
        challenge: "Customer dwell-time charging, premium image, payment convenience",
        highlight: "Elegant design · 7-inch touch · diverse payment",
        models: ["DC 120kW", "AC 22kW", "DC 60kW"],
        metrics: [
          { value: "7-inch", label: "Touch Screen" },
          { value: "RFID·POS", label: "Payment" },
          { value: "App", label: "Remote Control" },
        ],
        points: [
          "Elegant AC and DC lineup complements shopping malls and hotels — enhances brand value",
          "Diverse payment options including RFID, APP, and POS maximize customer convenience",
          "Output mix matched to dwell time (AC to DC fast) optimizes the charging experience — increases return visits",
        ],
      },
    ],
    aboutTitle: "About RongXin New Energy",
    aboutDesc:
      "Zhengzhou Rongxin New Energy Technology (容新新能源), founded in 2019, is an EV charging solution manufacturer integrating R&D, design, production, and intelligent energy solutions. With roughly 10,000㎡ of R&D and production facilities, multiple patents, and OEM/ODM capability, it supplies a broad lineup spanning AC, DC fast, Split Power ultra-high-power, and e-bike charging. OHI Tech delivers EV charging infrastructure to the Korean market through RongXin's SKD (component) supply and local assembly in Korea.",
    aboutMission: "Supply Model",
    missionText: "Rather than importing finished units, we use SKD (component) supply plus local assembly in Korea to meet localization requirements and government subsidy charger standards. The manufacturer provides assembly manuals, wiring diagrams, remote technical support, and commissioning along with component supply.",
    aboutVision: "Spec Compliance",
    visionText: "Designed and verified to the Korean Ministry spec (efficiency ≥95%, power factor 0.99, ISO 15118 / DIN 70121, OCPP 1.6+), with KC safety and high-efficiency certifications pursued alongside local assembly.",
    customerTitle: "Core Capabilities",
    certTitle: "Certifications & Standards",
    certs: [
      { name: "CE", desc: "European Safety Certification" },
      { name: "IEC 61851", desc: "EV Charging Interface Standard" },
      { name: "ISO 15118", desc: "Plug & Charge / V2G Communication" },
      { name: "DIN 70121", desc: "DC Charging Communication" },
      { name: "OCPP 1.6J / 2.0.1", desc: "Server Communication Protocol" },
      { name: "KC Safety", desc: "Korean Cert — In Progress" },
      { name: "High-Efficiency", desc: "Korean Cert — In Progress" },
      { name: "RoHS / FCC", desc: "Application Available" },
    ],
    whyTitle: "Why OHI Tech × RongXin",
    whys: [
      { title: "SKD Supply + Local Assembly", desc: "Component (SKD) supply with local assembly in Korea meets localization requirements — compliant with government subsidy charger standards." },
      { title: "Government Spec Compliance", desc: "Designed and verified to the Korean Ministry spec (efficiency, power factor, ISO 15118, OCPP) to pursue domestic certification." },
      { title: "Manufacturer Technical Guidance", desc: "Assembly manuals, wiring diagrams, remote technical support, commissioning, and factory training provided directly by the manufacturer." },
      { title: "Price & Lead-time Advantage", desc: "SKD plus local assembly secures cost, lead-time, and after-sales responsiveness versus importing finished units." },
    ],
    ctaTitle: "Considering EV Charging Infrastructure?",
    ctaDesc: "From product consultation and site analysis to installation quotes — OHI Tech's expert team responds fast.",
    ctaBtn1: "Contact Us Now",
    ctaBtn2: "View Case Studies",
  },
  zh: {
    hero: {
      eyebrow: "RongXin 容新新能源 韩国供应伙伴 · SKD 部件供应 + 本地组装",
      headline: "Empowering\nThe Future.",
      sub: "DC快充 20~600kW · Split Power 2,560kW+ · SKD本地组装 · 符合政府规格",
      cta1: "产品咨询",
      cta2: "查看案例",
      stats: [
        { value: "20~600kW", label: "DC快充功率范围" },
        { value: "2,560kW+", label: "Split Power最大" },
        { value: "CE认证", label: "欧洲安全认证" },
        { value: "OCPP 2.0.1", label: "充电协议支持" },
      ],
    },
    productNav: "产品分类",
    products: [
      {
        id: "ac",
        name: "交流充电桩 7·11·22kW",
        nameEn: "RongXin AC Charger Series",
        color: "bg-[var(--primary)]",
        tagline: "壁挂 · 7英寸触屏 · 支持OCPP 2.0.1",
        desc: "适用于住宅和商业环境的交流充电桩。7/11/22kW功率，7英寸触摸屏，APP和RFID认证，IP55防水防尘，壁挂式安装。支持OCPP 1.6（可升级至2.0.1），并提供韩国CMS对接和韩文UI。",
        lineup: [
          { model: "AC 7kW", spec: "单相220V · 32A · Type1(J1772) · 住宅" },
          { model: "AC 11kW", spec: "单相220V · 50A · 通用交流充电" },
          { model: "AC 22kW", spec: "三相 · 高功率交流 · 商业用" },
        ],
        apps: ["住宅小区", "写字楼停车场", "商业设施", "员工专用充电"],
      },
      {
        id: "dc",
        name: "直流快充 20~600kW",
        nameEn: "RongXin DC Fast Charger",
        color: "bg-[var(--primary)]",
        tagline: "智能液冷 · 最大600A · 多标准接口",
        desc: "功率覆盖20kW至600kW的直流快速充电桩。智能液冷支持高功率连续运行，效率≥95%（峰值96%）。支持CCS1/CCS2/GB-T/NACS多接口、落地式设计、IP54/55防护等级。",
        lineup: [
          { model: "DC 100kW DUAL", spec: "双枪CCS · 每通道50kW · 15英寸触屏" },
          { model: "DC 200kW DUAL", spec: "功率因数0.99 · 每通道100kW · 液冷" },
          { model: "DC 20~600kW", spec: "20/40/60/120/240/360/480/600kW配置" },
        ],
        apps: ["公共充电站", "高速服务区", "商业停车场", "车队充电枢纽"],
      },
      {
        id: "split",
        name: "Split Power分体式 480~2,560kW+",
        nameEn: "RongXin Split Power Charging System",
        color: "bg-[var(--primary)]",
        tagline: "动态电力分配 · 模块扩展 · 兆瓦充电",
        desc: "将电源柜与多个充电终端分离的分体式（Split）超高功率充电系统。可从480kW扩展至2,560kW+，动态电力分配自动为每辆车分配最优功率。非常适合公交、卡车、出租车车队和兆瓦充电park。",
        lineup: [
          { model: "480~960kW", spec: "中型分体平台 · 模块化扩展" },
          { model: "1,280~1,920kW", spec: "大型充电枢纽 · 动态分配" },
          { model: "2,560kW+", spec: "兆瓦充电park · 超高功率运营" },
        ],
        apps: ["公交车场", "物流·出租车队", "兆瓦充电park", "商业EV枢纽"],
      },
    ],
    solutionsTitle: "行业充电解决方案",
    solutionsSub: "RongXin EV充电产品线覆盖的主要行业领域",
    solutionsCta: "咨询此方案",
    solutionsCustomerLabel: "支持规格",
    solutions: [
      {
        id: "commercial",
        name: "商业建筑",
        color: "bg-[var(--primary)]",
        challenge: "多车辆同时充电、空间限制、盈利性",
        highlight: "DC快充+动态电力分配 · 智能管理",
        models: ["DC 120kW", "DC 200kW", "AC 22kW"],
        metrics: [
          { value: "600kW", label: "最大输出" },
          { value: "多端口", label: "同时充电" },
          { value: "OCPP", label: "智能管理" },
        ],
        points: [
          "DC快充配合动态分配，在合同电力范围内高效为多车充电——降低运营成本",
          "支持OCPP 1.6/2.0.1，与现有CSMS集成——统一管理和远程监控",
          "韩国CMS对接和韩文UI，立即适应国内运营环境",
        ],
      },
      {
        id: "residential",
        name: "住宅设施",
        color: "bg-[var(--primary)]",
        challenge: "公寓EV充电基础设施、计费系统、管理便利性",
        highlight: "交流充电 · 智能计费 · 简便壁挂安装",
        models: ["AC 7kW", "AC 11kW", "AC 22kW"],
        metrics: [
          { value: "7~22kW", label: "交流输出" },
          { value: "RFID·APP", label: "计费集成" },
          { value: "IP55", label: "防水防尘" },
        ],
        points: [
          "7~22kW交流充电桩安全高效夜间充电——降低电费",
          "基于RFID和APP的计费集成，精确按户计量——简化管理",
          "壁挂式简便安装最大限度减少施工成本——充分利用现有基础设施",
        ],
      },
      {
        id: "parking",
        name: "户外停车场",
        color: "bg-[var(--primary)]",
        challenge: "耐候性、稳定运营、高可用性",
        highlight: "IP55防水防尘 · 24/7远程监控 · OTA固件",
        models: ["DC 60kW", "DC 120kW", "AC 22kW"],
        metrics: [
          { value: "IP55", label: "防护等级" },
          { value: "24/7", label: "远程监控" },
          { value: "OTA", label: "固件更新" },
        ],
        points: [
          "IP55防水防尘等级，恶劣户外环境下稳定运营——降低维护成本",
          "远程监控配合智能故障检测，24小时状态管理——最大化在线率",
          "OTA固件更新无需现场访问即可应用功能改进和安全补丁",
        ],
      },
      {
        id: "gasstation",
        name: "加油站·能源站",
        color: "bg-[var(--primary)]",
        challenge: "利用现有场地、快速周转、额外收益",
        highlight: "DC超快充 · 液冷连续运行 · 快速周转",
        models: ["DC 200kW", "DC 360kW", "Split 480kW"],
        metrics: [
          { value: "200kW+", label: "快速充电" },
          { value: "液冷", label: "连续运行" },
          { value: "复合", label: "能源站" },
        ],
        points: [
          "200kW+ DC快充配合智能液冷连续高功率运行——加油站级别周转率",
          "15英寸触屏、信用卡、二维码支付，方便普通用户使用",
          "与现有加油设施并行运营，逐步过渡——最大限度降低投资风险",
        ],
      },
      {
        id: "fleet",
        name: "商业车队",
        color: "bg-[var(--primary)]",
        challenge: "大规模同时充电、计划管理、TCO优化",
        highlight: "Split Power分体式 · 动态分配 · CMS集成",
        models: ["Split 480kW", "Split 960kW", "DC 200kW"],
        metrics: [
          { value: "2,560kW+", label: "Split最大" },
          { value: "分配", label: "动态充电" },
          { value: "TCO", label: "成本降低" },
        ],
        points: [
          "Split Power为每辆车分配最优功率——不超过合同容量为多车充电",
          "CMS集成跟踪每辆车的充电计划、记录和费用——降低车队运营TCO",
          "针对公交、卡车、出租车车队优化的兆瓦充电配置",
        ],
      },
      {
        id: "hospitality",
        name: "购物中心·酒店",
        color: "bg-[var(--primary)]",
        challenge: "客户停留时间充电、高端形象、支付便利",
        highlight: "精致设计 · 7英寸触屏 · 多样支付",
        models: ["DC 120kW", "AC 22kW", "DC 60kW"],
        metrics: [
          { value: "7英寸", label: "触摸屏" },
          { value: "RFID·POS", label: "支付集成" },
          { value: "App", label: "远程控制" },
        ],
        points: [
          "精致设计的AC和DC产品线与购物中心和酒店空间融合——提升品牌价值",
          "RFID、APP、POS等多样支付方式最大化客户便利性",
          "按停留时间匹配功率配置（慢充到快充）优化充电体验——提高回访率",
        ],
      },
    ],
    aboutTitle: "RongXin 容新新能源 介绍",
    aboutDesc:
      "郑州容新新能源科技（容新新能源）成立于2019年，是一家集研发、设计、生产和智能能源解决方案于一体的EV充电解决方案制造企业。拥有约10,000㎡的研发和生产设施、多项专利和OEM/ODM能力，供应从交流慢充到DC快充、Split Power超高功率及E-bike充电的广泛产品线。OHI Tech通过RongXin的部件（SKD）供应和韩国本地组装，为韩国市场提供EV充电基础设施。",
    aboutMission: "供应方式",
    missionText: "并非进口成品，而是采用SKD（部件）供应+韩国本地组装方式，满足国产化要求和政府补贴充电桩标准。制造商在提供部件的同时，还提供组装手册、接线图、远程技术支持和调试（commissioning）。",
    aboutVision: "规格对应",
    visionText: "按照韩国气候能源环境部规格（效率≥95%、功率因数0.99、ISO 15118·DIN 70121、OCPP 1.6以上）进行设计和验证，并结合本地组装推进KC安全认证和高效器材认证。",
    customerTitle: "核心能力",
    certTitle: "认证与标准",
    certs: [
      { name: "CE", desc: "欧洲安全认证" },
      { name: "IEC 61851", desc: "EV充电接口标准" },
      { name: "ISO 15118", desc: "即插即充·V2G通信" },
      { name: "DIN 70121", desc: "DC充电通信协议" },
      { name: "OCPP 1.6J / 2.0.1", desc: "服务器通信协议" },
      { name: "KC安全确认", desc: "国内认证 — 进行中" },
      { name: "高效器材", desc: "国内认证 — 申请中" },
      { name: "RoHS / FCC", desc: "可申请" },
    ],
    whyTitle: "为何选择 OHI Tech × RongXin",
    whys: [
      { title: "SKD供应+本地组装", desc: "部件（SKD）供应配合韩国本地组装满足国产化要求——符合政府补贴充电桩标准。" },
      { title: "政府规格对应", desc: "按照韩国气候能源环境部规格（效率、功率因数、ISO 15118、OCPP）设计和验证，推进国内认证。" },
      { title: "制造商技术指导", desc: "组装手册、接线图、远程技术支持、调试和工厂培训均由制造商直接提供。" },
      { title: "价格·交期竞争力", desc: "相比进口成品，SKD+本地组装确保成本、交期和售后响应能力。" },
    ],
    ctaTitle: "正在考虑EV充电基础设施？",
    ctaDesc: "从产品咨询、选址分析到安装报价——OHI Tech专业团队快速响应。",
    ctaBtn1: "立即联系",
    ctaBtn2: "查看案例",
  },
};

/* OHI Tech EV charging core capabilities (honest, per-locale) */
const CAPABILITIES: Record<Locale, string[]> = {
  ko: ["CCS1 / CCS2 / GB-T / NACS", "OCPP 1.6J / 2.0.1", "지능형 액체냉각", "SKD 국산 조립", "OTA 펌웨어", "한글 UI · 한국 CMS 연동", "RFID · APP · POS 결제", "원격 모니터링"],
  en: ["CCS1 / CCS2 / GB-T / NACS", "OCPP 1.6J / 2.0.1", "Intelligent Liquid Cooling", "SKD Local Assembly", "OTA Firmware", "Korean UI · Korean CMS", "RFID · APP · POS Payment", "Remote Monitoring"],
  zh: ["CCS1 / CCS2 / GB-T / NACS", "OCPP 1.6J / 2.0.1", "智能液冷", "SKD本地组装", "OTA固件", "韩文UI · 韩国CMS对接", "RFID · APP · POS支付", "远程监控"],
};

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
          <p className="text-[var(--accent)] text-xs font-semibold tracking-widest uppercase mb-4">{c.hero.eyebrow}</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight whitespace-pre-line">
            {c.hero.headline}
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-10 max-w-xl">{c.hero.sub}</p>
          <div className="flex flex-wrap gap-3 mb-14">
            <Link
              href={`/contact?lang=${locale}&type=inquiry&category=ev-charging`}
              className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
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
                <div className="text-2xl md:text-3xl font-black text-[var(--accent)]">{s.value}</div>
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
              ? "RongXin 전 제품군 — AC 완속부터 DC 급속·Split Power 초고출력까지"
              : locale === "en"
              ? "Full RongXin product range — AC charging to DC fast and Split Power ultra-high-power"
              : "RongXin全系列产品——交流慢充到DC快充和Split Power超高功率"}
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
                      <span className="inline-block bg-slate-900 text-white text-xs px-3 py-1 rounded-full">
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
                          <span className="text-xs font-bold text-slate-900 bg-white border border-slate-200 px-2 py-1 rounded-lg shrink-0 mt-0.5">
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
                      href={`/contact?lang=${locale}&type=quote&category=ev-charging&product=${currentProduct.id}`}
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
                    <span
                      className={`w-9 h-9 rounded-lg shrink-0 flex items-center justify-center text-xs font-black ${
                        activeSolution === sol.id ? "bg-[var(--accent)] text-white" : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {sol.name.slice(0, 1)}
                    </span>
                    <span className="leading-snug">{sol.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: solution detail */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                {/* Hero band (gradient — no third-party photos) */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-[var(--primary)]">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[var(--accent)] text-[11px] font-bold uppercase tracking-widest mb-1">{currentSolution.highlight}</p>
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

                  {/* Recommended models + support specs */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-5 border-t border-slate-100">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        {locale === "ko" ? "권장 모델" : locale === "en" ? "Recommended Models" : "推荐型号"}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {currentSolution.models.map((m) => (
                          <span key={m} className="text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full">
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
                        {SOLUTION_TAGS[locale][currentSolution.id]?.map((name) => (
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
          SECTION 4: ABOUT RONGXIN
      ══════════════════════════════════════ */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-3">
                Zhengzhou Rongxin New Energy Technology Co., Ltd.
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
                  {locale === "ko" ? "공급 체계" : locale === "en" ? "Supply Chain" : "供应体系"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    locale === "ko" ? "🇨🇳 정주 본사·제조" : locale === "en" ? "🇨🇳 Zhengzhou HQ/Mfg" : "🇨🇳 郑州总部·制造",
                    locale === "ko" ? "🇰🇷 한국 현지 조립" : locale === "en" ? "🇰🇷 Korea Assembly" : "🇰🇷 韩国本地组装",
                    locale === "ko" ? "🌏 글로벌 수출" : locale === "en" ? "🌏 Global Export" : "🌏 全球出口",
                    "OEM / ODM",
                  ].map((g) => (
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
                {CAPABILITIES[locale].map((name) => (
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
          SECTION 5: WHY OHI TECH × RONGXIN
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
