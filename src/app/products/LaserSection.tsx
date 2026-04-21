"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";

/* ─────────────────────────────────────────────
   PRODUCT COLOR MAP (gradient placeholders)
───────────────────────────────────────────── */
const PRODUCT_COLOR: Record<string, string> = {
  waterjet: "bg-[var(--primary)]",
  fpcb:     "bg-[var(--primary)]",
  etching:  "bg-[var(--primary)]",
  industrial:"bg-[var(--primary)]",
  desktop:  "bg-[var(--primary)]",
  encoder:  "bg-[var(--primary)]",
};

const PRODUCT_ABBR: Record<string, string> = {
  waterjet: "LML",
  fpcb:     "FPCB",
  etching:  "LET",
  industrial:"IND",
  desktop:  "DT",
  encoder:  "ENC",
};

const SOLUTION_COLOR: Record<string, string> = {
  semiconductor: "bg-[var(--primary)]",
  fpcb:          "bg-[var(--primary)]",
  display:       "bg-[var(--primary)]",
  packaging:     "bg-[var(--primary)]",
  optics:        "bg-[var(--primary)]",
};

/* ─────────────────────────────────────────────
   STATIC CONTENT
───────────────────────────────────────────── */

const LANG = {
  ko: {
    hero: {
      eyebrow: "레이저 정밀 장비 전문 · OHI Tech 공식 공급",
      headline: "Zero Heat.\nMaximum Precision.",
      sub: "워터젯 레이저 · 미세가공 · 반도체 관통 공정 토탈 솔루션",
      cta1: "기술 상담 문의",
      cta2: "데모 신청",
      stats: [
        { value: "1995", label: "제조사 설립" },
        { value: "30+", label: "레이저 광전자 R&D(년)" },
        { value: "±2 µm", label: "최고 위치결정 정밀도" },
        { value: "0", label: "열영향대 (LML 공법)" },
      ],
    },
    productNav: "제품 분류",
    products: [
      {
        id: "waterjet",
        name: "워터젯 레이저 가공기",
        nameEn: "Waterjet Laser Machine (LML)",
        color: "bg-[var(--primary)]",
        tagline: "열영향 ZERO · 웨이퍼 관통공정",
        desc: "독자 특허 기반의 워터젯 레이저 가공기. 물 기둥이 레이저를 전반사로 가이딩하여 열영향대(HAZ) 없이 SiC·다이아몬드·사파이어 등 3세대 반도체 소재를 정밀 절단·드릴링합니다.",
        lineup: [
          { model: "HT-WG-LC", spec: "ns 그린레이저 515–532nm · 25/50/100W · 10–50kHz" },
          { model: "빔 스팟", spec: "50–200 µm" },
          { model: "XY 정밀도", spec: "±3 µm (옵션 ±2 µm)" },
          { model: "구동축", spec: "3 / 4 / 5축 선택" },
          { model: "장비 크기", spec: "2,000 × 2,000 × 2,500 mm · 7,000 kg" },
        ],
        apps: ["SiC 파워 반도체", "다이아몬드 기판", "사파이어 웨이퍼", "웨이퍼 관통공정(TGV)"],
        tag: "flagship",
      },
      {
        id: "fpcb",
        name: "FPCB 레이저 커팅기",
        nameEn: "Laser Cutting Machine for FPCB",
        color: "bg-[var(--primary)]",
        tagline: "냉간 절단 · 특허 코너 공정",
        desc: "웨어러블·소프트 기기용 연성회로기판(FPCB) 고수율 냉간 절단. 특허 코너 공정으로 곡선·불규칙 형상도 정밀하게 처리합니다.",
        lineup: [
          { model: "HT-LC-FPCB", spec: "XY 반복 정밀도 ±5 µm · Z축 ±2 µm" },
          { model: "구동 방식", spec: "XY 리니어 모터" },
          { model: "가공 대상", spec: "PI 연성 기판 · PET · Hard-Flex" },
          { model: "레이저 파장", spec: "IR 1064 / 532 / 355 nm UV" },
        ],
        apps: ["스마트워치 FPCB", "이어버드 기판", "의료 웨어러블", "소프트 로보틱스"],
        tag: "popular",
      },
      {
        id: "etching",
        name: "후막 레이저 에칭기",
        nameEn: "Laser Etching Machine for Thick Films",
        color: "bg-[var(--primary)]",
        tagline: "±2 µm 에어베어링 · 10ps 초단펄스",
        desc: "전도성 페이스트·구리 도금 후막 회로 패터닝. 에어 베어링 초정밀 스테이지와 10ps 초단펄스 레이저로 수 µm 격리선 구현.",
        lineup: [
          { model: "HT-LE-TF", spec: "XY 반복 정밀도 ±2 µm (에어 베어링)" },
          { model: "유효 스트로크", spec: "650 × 850 mm" },
          { model: "빔 스팟", spec: "6–20 µm" },
          { model: "레이저", spec: "10ps 초단펄스 · 다파장 옵션" },
        ],
        apps: ["반도체 후막 회로", "터치 패널 ITO", "MLO 전극", "디스플레이 전극"],
        tag: "",
      },
      {
        id: "industrial",
        name: "산업용 레이저 마커",
        nameEn: "Laser Engraving Machine for Industries",
        color: "bg-[var(--primary)]",
        tagline: "AOI 비전 포지셔닝 · 다파장",
        desc: "생산라인 일련번호 추적·품질관리용 산업용 마킹 장비. 다파장 옵션으로 PCB·금속·수지 등 다양한 소재에 대응합니다.",
        lineup: [
          { model: "HT-LE-IND", spec: "IR 1064 / 그린 532 / UV 355 nm" },
          { model: "빔 스팟", spec: "10–50 µm" },
          { model: "작업 스트로크", spec: "500 × 500 mm" },
          { model: "위치결정", spec: "AOI 비전 포지셔닝" },
        ],
        apps: ["PCB 트레이서빌리티", "전자부품 마킹", "물류·이커머스", "의료기기 ID"],
        tag: "",
      },
      {
        id: "desktop",
        name: "데스크탑 레이저 마커",
        nameEn: "Desktop Fiber Laser Engraving Module",
        color: "bg-[var(--primary)]",
        tagline: "소형 · 이동 편의 · 커스텀 설계",
        desc: "소형 공방·스튜디오·교육 기관용 컴팩트 레이저 마킹 모듈. 이동 편의성과 설계 자유도를 최적화한 엔트리급 장비.",
        lineup: [
          { model: "HT-LE-DT", spec: "IR 1064 nm · 30W / 50W" },
          { model: "빔 스팟", spec: "30–50 µm" },
          { model: "작업 범위", spec: "20×20 ~ 160×160 mm 옵션" },
          { model: "Z축 조정", spec: "200 mm" },
        ],
        apps: ["교육·R&D", "공방·스튜디오", "소량 맞춤 제조", "프로토타입"],
        tag: "",
      },
      {
        id: "encoder",
        name: "광학 엔코더 스케일",
        nameEn: "Optical Encoder Scales",
        color: "bg-[var(--primary)]",
        tagline: "서브미크론 정밀도 · 대량 맞춤 생산",
        desc: "원형 운동·직선 운동 위치 제어용 디스크·드럼·리니어 스케일. 정밀 레이저 가공 기술이 집약된 서브미크론 정밀 측정 소자.",
        lineup: [
          { model: "HT-ENC Disc", spec: "회전 위치 제어 · 디스크 타입" },
          { model: "HT-ENC Drum", spec: "고속 회전 · 드럼 타입" },
          { model: "HT-ENC Linear", spec: "직선 운동 · 리니어 스케일" },
          { model: "생산 규모", spec: "수천~수백만 개/년 맞춤 대응" },
        ],
        apps: ["공작기계", "자동차 모터", "로봇 암", "의료 정밀기기"],
        tag: "",
      },
    ],
    lmlTitle: "Laser MicroJet(LML) 기술",
    lmlSub: "물이 레이저를 인도하는 혁신 — HAZ 제로, 무결점 정밀 가공",
    lmlPrinciple: {
      title: "작동 원리",
      steps: [
        { no: "01", title: "고압 수류 생성", desc: "50–800 bar 압력으로 Ø20–100 µm 노즐을 통해 미세 물 기둥을 형성합니다." },
        { no: "02", title: "전반사 레이저 가이딩", desc: "532 nm 펄스 레이저가 물-공기 경계면의 전반사(TIR) 현상으로 물 기둥 내부에서 완전히 가이딩됩니다." },
        { no: "03", title: "냉각 + 가공 동시 수행", desc: "물이 레이저를 안내하는 동시에 가공면을 실시간 냉각하여 열영향대(HAZ)가 원천 차단됩니다." },
        { no: "04", title: "무결점 절단", desc: "병렬 절단면, 버(burr) 없음, 입자 잔류 없음. 작업 거리 5–50 mm, 가공물 두께 0.01–30 mm 대응." },
      ],
    },
    lmlAdvantages: [
      { title: "HAZ 제로", desc: "물 냉각으로 열영향대가 완전히 사라져 SiC·다이아몬드 등 열에 민감한 소재도 손상 없이 가공." },
      { title: "병렬 절단면", desc: "기존 레이저 대비 직각에 가까운 절단면 실현. 고종횡비(>20µm 키프 폭) 가공 가능." },
      { title: "버 없음", desc: "물 속에서 절단이 완료되어 금속 버, 파편, 잔류 입자 없이 청결한 가공면 확보." },
      { title: "곡선 가공 특허", desc: "고유 특허(US 8,422,521 B2)로 등속 에너지 펄스와 모션을 동기화. 불규칙 곡선도 정밀 절단." },
    ],
    lmlVsConventional: {
      title: "기존 레이저 vs Laser MicroJet",
      headers: ["항목", "기존 레이저", "Laser MicroJet (LML)"],
      rows: [
        ["열영향대(HAZ)", "발생", "없음"],
        ["절단면 각도", "테이퍼 발생", "직각 (병렬벽)"],
        ["버(Burr)", "있음", "없음"],
        ["잔류 입자", "있음", "없음 (수냉 제거)"],
        ["가공 거리", "짧음", "5–50 mm"],
        ["곡선 가공", "어려움", "특허 공정 지원"],
      ],
    },
    tgvTitle: "웨이퍼 관통공정 — OHI Tech 전용 서비스",
    tgvDesc: "OHI Tech는 HT-WG-LC 장비를 활용하여 고객사와 함께 웨이퍼 관통홀 드릴링 서비스를 실제로 진행하고 있습니다. 다른 곳에서 구현하기 어려운 고精도 관통공정을 국내에서 직접 수행합니다.",
    tgvPoints: [
      { title: "TGV (Through-Glass Via)", desc: "광학 유리 IC 웨이퍼의 유리 관통비아(TGV) 드릴링. 열영향 없이 수직 관통공 실현." },
      { title: "WBD (Wafer Based Drilling)", desc: "Si·SiC·GaN·사파이어 웨이퍼 관통공 가공. 고종횡비, 소직경, 병렬벽 요구조건 충족." },
      { title: "3세대 반도체 특수 가공", desc: "SiC·GaN 전력소자 웨이퍼 미세 드릴링 및 절단. 기존 다이아몬드 블레이드 대비 칩 손상 제로." },
      { title: "공정 협업", desc: "OHI Tech 엔지니어가 고객사 공정 요구사항을 직접 분석하고, 장비 제조사와 협력하여 최적 공정 조건을 도출합니다." },
    ],
    solutionsTitle: "산업별 솔루션",
    solutionsSub: "반도체부터 웨어러블까지 — 레이저 정밀 기술의 실제 적용 분야",
    solutions: [
      {
        id: "semiconductor",
        name: "반도체 · 전력소자",
        color: "bg-[var(--primary)]",
        challenge: "SiC·GaN 전력소자의 초정밀 절단·드릴링",
        highlight: "HAZ 제로 · 칩 손상 없음 · 수율 극대화",
        products: ["HT-WG-LC (LML)", "HT-LE-TF"],
        metrics: [
          { value: "HAZ 0", label: "열영향대" },
          { value: "±2 µm", label: "위치결정 정밀도" },
          { value: "3세대", label: "반도체 소재 대응" },
        ],
        points: [
          "SiC·GaN·사파이어·다이아몬드 등 3세대 반도체 소재를 HAZ 없이 절단 — 열균열, 마이크로크랙 방지",
          "웨이퍼 관통공정(TGV/WBD): 광학 유리 IC · 파워 디바이스 수직 관통홀 드릴링",
          "기존 다이아몬드 다이싱 블레이드 대비 칩 손상 제로 — 파손율 감소로 수율 극대화",
        ],
      },
      {
        id: "fpcb",
        name: "FPCB · 웨어러블",
        color: "bg-[var(--primary)]",
        challenge: "초박형 연성회로기판 고수율 냉간 절단",
        highlight: "±5 µm 반복정밀도 · 특허 코너공정",
        products: ["HT-LC-FPCB"],
        metrics: [
          { value: "±5 µm", label: "XY 반복정밀도" },
          { value: "냉간", label: "절단 방식" },
          { value: "특허", label: "코너공정" },
        ],
        points: [
          "PI·PET·Hard-Flex 연성기판 냉간 절단 — 열변형·수축 없는 고수율 양산",
          "특허 코너 공정: 곡선·불규칙 형상 정밀 절단 가능 — 웨어러블 디자인 자유도 확대",
          "Garmin 스마트워치, 이어버드, 의료 웨어러블 적용 실적 보유",
        ],
      },
      {
        id: "display",
        name: "디스플레이 · 터치패널",
        color: "bg-[var(--primary)]",
        challenge: "유리 기판 ITO 에칭·절단 및 내로우 보더 회로",
        highlight: "듀얼 스테이지 · 초고속 라인 스크라이빙",
        products: ["HT-LE-TF", "HT-WG-LC"],
        metrics: [
          { value: "6 µm", label: "최소 격리선 폭" },
          { value: "듀얼", label: "스테이지 옵션" },
          { value: "0.42 mm", label: "최박형 유리 대응" },
        ],
        points: [
          "세계 최대 터치패널 제조사 TPK에 초고속 멀티 스테이지 레이저 에칭 장비 공급 (2009/2011)",
          "0.42 mm 초박형 DITO 유리 ITO 패터닝 — Garmin용 커스텀 장비 개발·납품 (2015)",
          "내로우 보더 회로 고속 스크라이빙 — 세계 1위 터치패널 생산 라인 안정 가동",
        ],
      },
      {
        id: "packaging",
        name: "첨단패키징 · TGV",
        color: "bg-[var(--primary)]",
        challenge: "광학 유리 IC · 팬아웃 패키지 관통홀",
        highlight: "TGV 드릴링 · OHI Tech 협업 공정",
        products: ["HT-WG-LC (LML)"],
        metrics: [
          { value: "TGV", label: "유리 관통비아" },
          { value: "수직벽", label: "관통공 단면" },
          { value: "HAZ 0", label: "열손상" },
        ],
        points: [
          "광학 유리 IC 웨이퍼 TGV 드릴링 — 자체 개발 레이저 장비로 실증 완료",
          "OHI Tech가 고객사와 직접 웨이퍼 관통공정 진행 — 국내 유일 서비스",
          "Fan-Out Wafer Level Package(FOWLP), 3D IC 적층 패키지용 관통홀 가공 대응",
        ],
      },
      {
        id: "optics",
        name: "광학 · 정밀기기",
        color: "bg-[var(--primary)]",
        challenge: "서브미크론 엔코더 스케일 및 광학 소자 가공",
        highlight: "서브미크론 정밀도 · 대량 맞춤 생산",
        products: ["HT-ENC", "HT-WG-LC"],
        metrics: [
          { value: "sub-µm", label: "엔코더 정밀도" },
          { value: "수백만", label: "연간 생산 규모" },
          { value: "3종", label: "스케일 타입" },
        ],
        points: [
          "공작기계·자동차 모터·로봇 암용 디스크/드럼/리니어 엔코더 스케일 대량 맞춤 생산",
          "정밀 레이저 가공 기술이 집약된 서브미크론 정밀 측정 소자 — 수천~수백만 개/년",
          "광학 소자·렌즈 홀더 정밀 드릴링 및 패터닝 — 광학 장비 OEM 대응",
        ],
      },
    ],
    aboutTitle: "제조사 소개",
    aboutDesc:
      "1995년 대만 신죽과학단지에서 설립된 레이저 광전자-정밀기계 분야 30년 전문 기업입니다. 대만 증권거래소 상장사로, 레이저 미세가공·엔코더 스케일·산업용 레이저 마킹 3대 사업군을 운영합니다.",
    aboutMission: "핵심 역량",
    missionText: "레이저 광학·정밀기계·모션 제어를 수직 통합하여 고객 맞춤형 레이저 가공 솔루션을 개발합니다. 설계부터 양산까지 원스톱 지원.",
    aboutVision: "보유 특허",
    visionText: "US 8,422,521 B2 / US 8,710,401 B2 — 등속 에너지 펄스와 모션 동기화 기술. 세계 유일의 곡선·불규칙 형상 워터젯 레이저 절단 특허.",
    certTitle: "인증 및 실적",
    certs: [
      { name: "ISO 9001", desc: "품질경영시스템" },
      { name: "대만 증권거래소 상장", desc: "30년 레이저 정밀 가공 전문" },
      { name: "미국 특허", desc: "US 8,422,521 B2" },
      { name: "미국 특허", desc: "US 8,710,401 B2" },
      { name: "TPK 공급 이력", desc: "터치패널 세계 1위 공급" },
      { name: "Garmin 공급", desc: "0.42mm DITO 유리 패터닝" },
      { name: "Merck 공급", desc: "유리 패널 레이저 커팅" },
      { name: "ITRI 납품", desc: "6kW 3D 레이저 클래딩" },
    ],
    whyTitle: "Why OHI Tech",
    whys: [
      { title: "국내 유일 웨이퍼 관통공정", desc: "OHI Tech는 HT-WG-LC 장비로 고객사와 웨이퍼 관통홀 드릴링을 직접 수행합니다." },
      { title: "한국 공식 총판", desc: "공식 한국 대리점. 장비 도입부터 공정 최적화, A/S까지 원스톱 지원." },
      { title: "LML 기술 컨설팅", desc: "워터젯 레이저 가공 적합성 평가, 샘플 테스트, 공정 조건 최적화 제공." },
      { title: "맞춤 장비 구성", desc: "3/4/5축, 레이저 출력, 노즐 사이즈 등 고객 공정에 맞춘 커스텀 구성 지원." },
    ],
    ctaTitle: "레이저 정밀 가공 · 웨이퍼 관통공정 문의",
    ctaDesc: "적용 소재·공정 사양을 알려주시면 최적 장비와 공정 조건을 안내해 드립니다.",
    ctaBtn1: "기술 상담 문의",
    ctaBtn2: "데모 신청",
  },

  en: {
    hero: {
      eyebrow: "Laser Precision Equipment Specialist · OHI Tech Official Supply",
      headline: "Zero Heat.\nMaximum Precision.",
      sub: "Water-Guided Laser · Micro-Machining · Wafer Through-Process Total Solution",
      cta1: "Technical Consultation",
      cta2: "Request Demo",
      stats: [
        { value: "1995", label: "Manufacturer Founded" },
        { value: "30+", label: "Laser Opto-Mechatronics R&D (yrs)" },
        { value: "±2 µm", label: "Top Positioning Accuracy" },
        { value: "0", label: "Heat-Affected Zone (LML)" },
      ],
    },
    productNav: "Product Category",
    products: [
      {
        id: "waterjet",
        name: "Waterjet Laser Machine",
        nameEn: "Waterjet Laser Machine (LML)",
        color: "bg-[var(--primary)]",
        tagline: "HAZ Zero · Wafer Through-Process",
        desc: "Proprietary-patented Waterjet laser machine guides the laser beam via total internal reflection inside a water column — enabling HAZ-free cutting and drilling of 3rd-gen semiconductor materials (SiC, diamond, sapphire).",
        lineup: [
          { model: "HT-WG-LC", spec: "ns Green Laser 515–532nm · 25/50/100W · 10–50kHz" },
          { model: "Beam Spot", spec: "50–200 µm" },
          { model: "XY Precision", spec: "±3 µm (opt. ±2 µm)" },
          { model: "Axis Options", spec: "3 / 4 / 5 Axis" },
          { model: "Machine Size", spec: "2,000 × 2,000 × 2,500 mm · 7,000 kg" },
        ],
        apps: ["SiC Power Devices", "Diamond Substrates", "Sapphire Wafers", "Wafer Through-Process (TGV)"],
        tag: "flagship",
      },
      {
        id: "fpcb",
        name: "FPCB Laser Cutting Machine",
        nameEn: "Laser Cutting Machine for FPCB",
        color: "bg-[var(--primary)]",
        tagline: "Cold Cutting · Patented Corner Process",
        desc: "High-yield cold laser cutting of flexible circuit boards (FPCB) for wearables and soft devices. Patented corner process enables precise cutting of curved and irregular shapes.",
        lineup: [
          { model: "HT-LC-FPCB", spec: "XY Repeat ±5 µm · Z-axis ±2 µm" },
          { model: "Drive Type", spec: "XY Linear Motor" },
          { model: "Materials", spec: "PI flex · PET · Hard-Flex" },
          { model: "Laser Options", spec: "IR 1064 / 532 / 355 nm UV" },
        ],
        apps: ["Smartwatch FPCB", "Earbuds PCB", "Medical Wearables", "Soft Robotics"],
        tag: "popular",
      },
      {
        id: "etching",
        name: "Thick Film Laser Etching Machine",
        nameEn: "Laser Etching Machine for Thick Films",
        color: "bg-[var(--primary)]",
        tagline: "±2 µm Air Bearing · 10ps Ultrashort Pulse",
        desc: "Circuit patterning on conductive paste and copper-plated thick films. Air-bearing ultra-precision stage with 10ps ultrashort laser achieves isolation lines down to several µm.",
        lineup: [
          { model: "HT-LE-TF", spec: "XY Repeat ±2 µm (air bearing)" },
          { model: "Stroke", spec: "650 × 850 mm" },
          { model: "Beam Spot", spec: "6–20 µm" },
          { model: "Laser", spec: "10ps Ultrashort · Multi-wavelength" },
        ],
        apps: ["Thick Film Circuits", "Touch Panel ITO", "MLO Electrodes", "Display Electrodes"],
        tag: "",
      },
      {
        id: "industrial",
        name: "Industrial Laser Marker",
        nameEn: "Laser Engraving Machine for Industries",
        color: "bg-[var(--primary)]",
        tagline: "AOI Vision Positioning · Multi-Wavelength",
        desc: "Industrial marking system for serial number tracking and quality control on production lines. Multi-wavelength options cover PCB, metal, resin and more.",
        lineup: [
          { model: "HT-LE-IND", spec: "IR 1064 / Green 532 / UV 355 nm" },
          { model: "Beam Spot", spec: "10–50 µm" },
          { model: "Stroke", spec: "500 × 500 mm" },
          { model: "Positioning", spec: "AOI Vision System" },
        ],
        apps: ["PCB Traceability", "Electronic Components", "Logistics / E-commerce", "Medical Device ID"],
        tag: "",
      },
      {
        id: "desktop",
        name: "Desktop Laser Marker",
        nameEn: "Desktop Fiber Laser Engraving Module",
        color: "bg-[var(--primary)]",
        tagline: "Compact · Portable · Custom Design",
        desc: "Compact laser marking module for studios, workshops, and educational institutions. Optimized for portability and design flexibility.",
        lineup: [
          { model: "HT-LE-DT", spec: "IR 1064 nm · 30W / 50W" },
          { model: "Beam Spot", spec: "30–50 µm" },
          { model: "Work Area", spec: "20×20 ~ 160×160 mm options" },
          { model: "Z-axis", spec: "200 mm" },
        ],
        apps: ["Education / R&D", "Studios / Workshops", "Low-volume Custom", "Prototyping"],
        tag: "",
      },
      {
        id: "encoder",
        name: "Optical Encoder Scales",
        nameEn: "Optical Encoder Scales",
        color: "bg-[var(--primary)]",
        tagline: "Sub-micron Accuracy · High-volume Custom",
        desc: "Disc, drum, and linear scales for rotary and linear motion position control. Sub-micron precision metrology components powered by proprietary laser machining expertise.",
        lineup: [
          { model: "HT-ENC Disc", spec: "Rotary position control · Disc type" },
          { model: "HT-ENC Drum", spec: "High-speed rotation · Drum type" },
          { model: "HT-ENC Linear", spec: "Linear motion · Linear scale" },
          { model: "Volume", spec: "Thousands to millions/year custom" },
        ],
        apps: ["Machine Tools", "Automotive Motors", "Robot Arms", "Medical Precision"],
        tag: "",
      },
    ],
    lmlTitle: "Laser MicroJet (LML) Technology",
    lmlSub: "Water guides the laser — HAZ zero, flawless precision machining",
    lmlPrinciple: {
      title: "How It Works",
      steps: [
        { no: "01", title: "High-Pressure Water Jet", desc: "A micro water column is formed at 50–800 bar pressure through a nozzle of Ø20–100 µm diameter." },
        { no: "02", title: "Total Internal Reflection Laser Guiding", desc: "The 532 nm pulsed laser is fully guided inside the water column via total internal reflection (TIR) at the water-air boundary." },
        { no: "03", title: "Simultaneous Cooling & Machining", desc: "Water guides the laser while cooling the workpiece surface in real time — HAZ is completely eliminated at the source." },
        { no: "04", title: "Flawless Cut", desc: "Parallel kerf walls, zero burr, zero particle deposition. Working distance 5–50 mm, workpiece thickness 0.01–30 mm." },
      ],
    },
    lmlAdvantages: [
      { title: "Zero HAZ", desc: "Water cooling eliminates heat-affected zones entirely — thermally sensitive materials like SiC and diamond processed without damage." },
      { title: "Parallel Kerf Walls", desc: "Near-perpendicular cut faces vs. conventional laser. High aspect ratio (>20 µm kerf width) achievable." },
      { title: "Zero Burr", desc: "Cutting is completed underwater — no metal burrs, fragments, or residual particles, ensuring clean cut surfaces." },
      { title: "Curved Cutting Patent", desc: "Unique patent (US 8,422,521 B2) synchronizes equal-energy pulses with motion — irregular curves cut precisely." },
    ],
    lmlVsConventional: {
      title: "Conventional Laser vs. Laser MicroJet",
      headers: ["Parameter", "Conventional Laser", "Laser MicroJet (LML)"],
      rows: [
        ["Heat-Affected Zone (HAZ)", "Present", "None"],
        ["Kerf Angle", "Tapered", "Perpendicular (parallel walls)"],
        ["Burr", "Present", "None"],
        ["Residual Particles", "Present", "None (water-removed)"],
        ["Working Distance", "Short", "5–50 mm"],
        ["Curved Cutting", "Difficult", "Patent-supported"],
      ],
    },
    tgvTitle: "Wafer Through-Process — OHI Tech Dedicated Service",
    tgvDesc: "OHI Tech operates wafer through-hole drilling with customers using the HT-WG-LC machine. This high-precision through-process, difficult to find elsewhere, is performed directly in Korea.",
    tgvPoints: [
      { title: "TGV (Through-Glass Via)", desc: "Through-glass via drilling for optical glass IC wafers. Vertical through-holes achieved with zero thermal damage." },
      { title: "WBD (Wafer Based Drilling)", desc: "Through-hole machining of Si, SiC, GaN, and sapphire wafers. Meets high aspect ratio, small-diameter, parallel-wall requirements." },
      { title: "3rd-Gen Semiconductor Micro-Machining", desc: "SiC/GaN power device wafer micro-drilling and dicing. Zero chip damage vs. conventional diamond blades." },
      { title: "Process Collaboration", desc: "OHI Tech engineers directly analyze customer process requirements and collaborate with the manufacturer to derive optimal process conditions." },
    ],
    solutionsTitle: "Industry Solutions",
    solutionsSub: "From semiconductors to wearables — real applications of laser precision technology",
    solutions: [
      {
        id: "semiconductor",
        name: "Semiconductor · Power Devices",
        color: "bg-[var(--primary)]",
        challenge: "Ultra-precise cutting and drilling of SiC/GaN power devices",
        highlight: "Zero HAZ · No chip damage · Maximum yield",
        products: ["HT-WG-LC (LML)", "HT-LE-TF"],
        metrics: [
          { value: "HAZ 0", label: "Heat-Affected Zone" },
          { value: "±2 µm", label: "Positioning Accuracy" },
          { value: "3rd-Gen", label: "Semiconductor Materials" },
        ],
        points: [
          "HAZ-free cutting of SiC, GaN, sapphire, diamond — thermal cracks and micro-cracks prevented",
          "Wafer through-process (TGV/WBD): vertical through-hole drilling for optical glass IC and power devices",
          "Zero chip damage vs. diamond dicing blades — reduced breakage rate maximizes yield",
        ],
      },
      {
        id: "fpcb",
        name: "FPCB / Wearable",
        color: "bg-[var(--primary)]",
        challenge: "High-yield cold cutting of ultra-thin flexible circuit boards",
        highlight: "±5 µm Repeat Accuracy · Patented Corner Process",
        products: ["HT-LC-FPCB"],
        metrics: [
          { value: "±5 µm", label: "XY Repeat Accuracy" },
          { value: "Cold", label: "Cutting Method" },
          { value: "Patent", label: "Corner Process" },
        ],
        points: [
          "Cold cutting of PI/PET/Hard-Flex flex substrates — high-yield mass production without thermal deformation",
          "Patented corner process: precise cutting of curved/irregular shapes — expands wearable design freedom",
          "Proven results: Garmin smartwatch, earbuds, medical wearable applications",
        ],
      },
      {
        id: "display",
        name: "Display / Touch Panel",
        color: "bg-[var(--primary)]",
        challenge: "Glass substrate ITO etching/cutting and narrow border circuits",
        highlight: "Dual Stage · Ultrafast Line Scribing",
        products: ["HT-LE-TF", "HT-WG-LC"],
        metrics: [
          { value: "6 µm", label: "Min. Isolation Line" },
          { value: "Dual", label: "Stage Option" },
          { value: "0.42 mm", label: "Thinnest Glass" },
        ],
        points: [
          "Supplied ultrafast multi-stage laser etching center to TPK, world's largest touch panel maker (2009/2011)",
          "0.42 mm ultra-thin DITO glass ITO patterning — custom equipment developed and delivered for Garmin (2015)",
          "High-speed narrow-border circuit scribing — stable operation of world's #1 touch panel production line",
        ],
      },
      {
        id: "packaging",
        name: "Advanced Packaging / TGV",
        color: "bg-[var(--primary)]",
        challenge: "Optical glass IC and fan-out package through-holes",
        highlight: "TGV Drilling · OHI Tech Collaborative Process",
        products: ["HT-WG-LC (LML)"],
        metrics: [
          { value: "TGV", label: "Through-Glass Via" },
          { value: "Vertical", label: "Via Wall Profile" },
          { value: "HAZ 0", label: "Thermal Damage" },
        ],
        points: [
          "Optical glass IC wafer TGV drilling — demonstrated with proprietary laser equipment",
          "OHI Tech directly performs wafer through-process with customers — unique service in Korea",
          "Fan-Out Wafer Level Package (FOWLP) and 3D IC stacking — through-hole machining support",
        ],
      },
      {
        id: "optics",
        name: "Optics / Precision",
        color: "bg-[var(--primary)]",
        challenge: "Sub-micron encoder scales and optical element machining",
        highlight: "Sub-micron Accuracy · High-volume Custom Production",
        products: ["HT-ENC", "HT-WG-LC"],
        metrics: [
          { value: "sub-µm", label: "Encoder Accuracy" },
          { value: "Millions", label: "Annual Capacity" },
          { value: "3 Types", label: "Scale Variants" },
        ],
        points: [
          "Disc/drum/linear encoder scale mass custom production for machine tools, automotive motors, robot arms",
          "Sub-micron precision metrology components powered by proprietary laser tech — thousands to millions per year",
          "Precision drilling and patterning of optical elements and lens holders — optical equipment OEM support",
        ],
      },
    ],
    aboutTitle: "About the Manufacturer",
    aboutDesc:
      "Founded in 1995 in Hsinchu Science Park, Taiwan, our manufacturing partner is a 30-year specialist in laser opto-mechatronics. Listed on the Taiwan Stock Exchange, it operates across three business divisions — laser micro-machining, optical encoder scales, and industrial laser marking — serving global customers from semiconductors to automotive.",
    aboutMission: "Core Competency",
    missionText: "Vertically integrating laser optics, precision mechanics, and motion control to develop customer-tailored laser machining solutions. Full support from design to mass production.",
    aboutVision: "Patents",
    visionText: "US 8,422,521 B2 / US 8,710,401 B2 — Equal-energy pulse and motion synchronization technology. World's only patent for water-guided laser cutting of curved and irregular shapes.",
    certTitle: "Certifications & Track Record",
    certs: [
      { name: "ISO 9001", desc: "Quality Management System" },
      { name: "Taiwan Stock Listed", desc: "30-yr Laser Precision Specialist" },
      { name: "US Patent", desc: "US 8,422,521 B2" },
      { name: "US Patent", desc: "US 8,710,401 B2" },
      { name: "TPK Track Record", desc: "World's #1 Touch Panel Supplier" },
      { name: "Garmin Supply", desc: "0.42mm DITO Glass Patterning" },
      { name: "Merck Supply", desc: "Glass Panel Laser Cutting" },
      { name: "ITRI Delivery", desc: "6kW 3D Laser Cladding Printer" },
    ],
    whyTitle: "Why OHI Tech",
    whys: [
      { title: "Korea's Only Wafer Through-Process", desc: "OHI Tech directly performs wafer through-hole drilling with customers using the HT-WG-LC machine." },
      { title: "Official Korea Distributor", desc: "Official sole distributor in Korea. One-stop support from equipment procurement to process optimization and after-sales." },
      { title: "LML Technology Consulting", desc: "Water-guided laser process fitness evaluation, sample testing, and process condition optimization." },
      { title: "Custom Equipment Config", desc: "3/4/5 axis, laser output, nozzle size — custom configurations tailored to your process requirements." },
    ],
    ctaTitle: "Laser Precision Machining & Wafer Through-Process Inquiry",
    ctaDesc: "Share your material and process specifications — we'll recommend the optimal equipment and process conditions.",
    ctaBtn1: "Technical Consultation",
    ctaBtn2: "Request Demo",
  },

  zh: {
    hero: {
      eyebrow: "激光精密设备专家 · OHI Tech官方供应",
      headline: "Zero Heat.\nMaximum Precision.",
      sub: "水导激光 · 微细加工 · 晶圆贯通工艺全解决方案",
      cta1: "技术咨询",
      cta2: "申请演示",
      stats: [
        { value: "1995", label: "制造商创立年份" },
        { value: "30+", label: "激光光电R&D年限" },
        { value: "±2 µm", label: "最高定位精度" },
        { value: "0", label: "热影响区 (LML工艺)" },
      ],
    },
    productNav: "产品分类",
    products: [
      {
        id: "waterjet",
        name: "水导激光加工机",
        nameEn: "Waterjet Laser Machine (LML)",
        color: "bg-[var(--primary)]",
        tagline: "HAZ零 · 晶圆贯通工艺",
        desc: "独有专利的水导激光加工机。激光束在水柱内通过全内反射传导，实现对SiC、金刚石、蓝宝石等第三代半导体材料的无热影响区精密切割与钻孔。",
        lineup: [
          { model: "HT-WG-LC", spec: "ns绿激光515–532nm · 25/50/100W · 10–50kHz" },
          { model: "光斑尺寸", spec: "50–200 µm" },
          { model: "XY精度", spec: "±3 µm（选配±2 µm）" },
          { model: "轴数选项", spec: "3/4/5轴" },
          { model: "设备尺寸", spec: "2,000×2,000×2,500 mm · 7,000 kg" },
        ],
        apps: ["SiC功率器件", "金刚石基板", "蓝宝石晶圆", "晶圆贯通工艺(TGV)"],
        tag: "flagship",
      },
      {
        id: "fpcb",
        name: "FPCB激光切割机",
        nameEn: "Laser Cutting Machine for FPCB",
        color: "bg-[var(--primary)]",
        tagline: "冷切割 · 专利转角工艺",
        desc: "用于可穿戴及柔性器件的柔性电路板（FPCB）高良率冷切割。专利转角工艺实现曲线及不规则形状的精密切割。",
        lineup: [
          { model: "HT-LC-FPCB", spec: "XY重复精度±5 µm · Z轴±2 µm" },
          { model: "驱动方式", spec: "XY线性电机" },
          { model: "加工对象", spec: "PI柔性基板·PET·软硬结合板" },
          { model: "激光波长", spec: "IR 1064/532/355 nm UV" },
        ],
        apps: ["智能手表FPCB", "耳机基板", "医疗可穿戴", "软体机器人"],
        tag: "popular",
      },
      {
        id: "etching",
        name: "厚膜激光蚀刻机",
        nameEn: "Laser Etching Machine for Thick Films",
        color: "bg-[var(--primary)]",
        tagline: "±2 µm气浮 · 10ps超短脉冲",
        desc: "导电银浆及镀铜厚膜电路图案化。气浮超精密工作台与10ps超短脉冲激光实现数µm隔离线。",
        lineup: [
          { model: "HT-LE-TF", spec: "XY重复精度±2 µm（气浮）" },
          { model: "有效行程", spec: "650×850 mm" },
          { model: "光斑尺寸", spec: "6–20 µm" },
          { model: "激光", spec: "10ps超短脉冲·多波长选项" },
        ],
        apps: ["厚膜电路", "触控面板ITO", "MLO电极", "显示器电极"],
        tag: "",
      },
      {
        id: "industrial",
        name: "工业激光打标机",
        nameEn: "Laser Engraving Machine for Industries",
        color: "bg-[var(--primary)]",
        tagline: "AOI视觉定位 · 多波长",
        desc: "用于生产线序列号追踪与质量管理的工业打标设备。多波长选项适用于PCB、金属、树脂等各类材料。",
        lineup: [
          { model: "HT-LE-IND", spec: "IR 1064/绿光532/UV 355 nm" },
          { model: "光斑尺寸", spec: "10–50 µm" },
          { model: "行程", spec: "500×500 mm" },
          { model: "定位方式", spec: "AOI视觉定位" },
        ],
        apps: ["PCB溯源", "电子元件打标", "物流/电商", "医疗设备ID"],
        tag: "",
      },
      {
        id: "desktop",
        name: "桌面激光打标机",
        nameEn: "Desktop Fiber Laser Engraving Module",
        color: "bg-[var(--primary)]",
        tagline: "小型 · 便携 · 定制设计",
        desc: "适用于小型工作室、教育机构的紧凑型激光打标模块。便携性与设计自由度最优化。",
        lineup: [
          { model: "HT-LE-DT", spec: "IR 1064 nm · 30W/50W" },
          { model: "光斑尺寸", spec: "30–50 µm" },
          { model: "工作范围", spec: "20×20~160×160 mm选配" },
          { model: "Z轴", spec: "200 mm" },
        ],
        apps: ["教育/R&D", "工作室", "小批量定制", "原型制作"],
        tag: "",
      },
      {
        id: "encoder",
        name: "光学编码器标尺",
        nameEn: "Optical Encoder Scales",
        color: "bg-[var(--primary)]",
        tagline: "亚微米精度 · 大批量定制",
        desc: "用于旋转与直线运动位置控制的圆盘/鼓形/直线标尺。集精密激光加工技术精华的亚微米精密测量元件。",
        lineup: [
          { model: "HT-ENC圆盘型", spec: "旋转位置控制·圆盘型" },
          { model: "HT-ENC鼓形", spec: "高速旋转·鼓形" },
          { model: "HT-ENC直线型", spec: "直线运动·直线标尺" },
          { model: "生产规模", spec: "数千~数百万个/年定制" },
        ],
        apps: ["机床", "汽车电机", "机器人臂", "医疗精密仪器"],
        tag: "",
      },
    ],
    lmlTitle: "Laser MicroJet（LML）技术",
    lmlSub: "水导激光革新——HAZ零，无瑕精密加工",
    lmlPrinciple: {
      title: "工作原理",
      steps: [
        { no: "01", title: "高压水柱生成", desc: "以50–800 bar压力通过Ø20–100 µm喷嘴形成微细水柱。" },
        { no: "02", title: "全内反射激光导引", desc: "532 nm脉冲激光在水-空气界面通过全内反射（TIR）现象在水柱内部完全导引传播。" },
        { no: "03", title: "同步冷却与加工", desc: "水在导引激光的同时实时冷却加工面，从根本上消除热影响区（HAZ）。" },
        { no: "04", title: "无瑕切割", desc: "平行切割面、无毛刺、无残留颗粒。工作距离5–50 mm，工件厚度0.01–30 mm。" },
      ],
    },
    lmlAdvantages: [
      { title: "HAZ零", desc: "水冷完全消除热影响区——SiC、金刚石等热敏感材料无损加工。" },
      { title: "平行切割面", desc: "相比传统激光实现近垂直切割面，可加工高深宽比（>20µm切缝宽度）结构。" },
      { title: "无毛刺", desc: "切割在水中完成——无金属毛刺、碎片、残留颗粒，切割面洁净。" },
      { title: "曲线切割专利", desc: "独有专利（US 8,422,521 B2）将等能脉冲与运动同步——不规则曲线精密切割。" },
    ],
    lmlVsConventional: {
      title: "传统激光 vs Laser MicroJet",
      headers: ["参数", "传统激光", "Laser MicroJet（LML）"],
      rows: [
        ["热影响区（HAZ）", "存在", "无"],
        ["切缝角度", "锥形", "垂直（平行壁）"],
        ["毛刺", "存在", "无"],
        ["残留颗粒", "存在", "无（水冷去除）"],
        ["工作距离", "短", "5–50 mm"],
        ["曲线切割", "困难", "专利工艺支持"],
      ],
    },
    tgvTitle: "晶圆贯通工艺——OHI Tech专属服务",
    tgvDesc: "OHI Tech利用HT-WG-LC设备与客户共同实施晶圆贯通孔钻孔服务，在韩国直接提供其他地方难以实现的高精度贯通工艺。",
    tgvPoints: [
      { title: "TGV（Through-Glass Via）", desc: "光学玻璃IC晶圆的玻璃贯通孔（TGV）钻孔。实现零热损伤的垂直贯通孔。" },
      { title: "WBD（晶圆贯通钻孔）", desc: "Si·SiC·GaN·蓝宝石晶圆贯通孔加工，满足高深宽比、小直径、平行壁要求。" },
      { title: "第三代半导体特殊加工", desc: "SiC·GaN功率器件晶圆微细钻孔及切割。与传统金刚石刀片相比，芯片损伤为零。" },
      { title: "工艺协作", desc: "OHI Tech工程师直接分析客户工艺需求，与制造商协作推导最优工艺条件。" },
    ],
    solutionsTitle: "行业解决方案",
    solutionsSub: "从半导体到可穿戴——激光精密技术的实际应用领域",
    solutions: [
      {
        id: "semiconductor",
        name: "半导体 · 功率器件",
        color: "bg-[var(--primary)]",
        challenge: "SiC/GaN功率器件超精密切割与钻孔",
        highlight: "HAZ零 · 无芯片损伤 · 良率最大化",
        products: ["HT-WG-LC (LML)", "HT-LE-TF"],
        metrics: [
          { value: "HAZ 0", label: "热影响区" },
          { value: "±2 µm", label: "定位精度" },
          { value: "第三代", label: "半导体材料适用" },
        ],
        points: [
          "SiC·GaN·蓝宝石·金刚石等第三代半导体HAZ零切割——防止热裂纹和微裂纹",
          "晶圆贯通工艺（TGV/WBD）：光学玻璃IC及功率器件垂直贯通孔钻孔",
          "与传统金刚石切割刀片相比，芯片损伤为零——降低破损率，良率最大化",
        ],
      },
      {
        id: "fpcb",
        name: "FPCB / 可穿戴",
        color: "bg-[var(--primary)]",
        challenge: "超薄柔性电路板高良率冷切割",
        highlight: "±5 µm重复精度 · 专利转角工艺",
        products: ["HT-LC-FPCB"],
        metrics: [
          { value: "±5 µm", label: "XY重复精度" },
          { value: "冷切割", label: "切割方式" },
          { value: "专利", label: "转角工艺" },
        ],
        points: [
          "PI·PET·软硬结合板冷切割——无热变形高良率量产",
          "专利转角工艺：曲线及不规则形状精密切割——扩大可穿戴设计自由度",
          "Garmin智能手表、耳机、医疗可穿戴应用实绩",
        ],
      },
      {
        id: "display",
        name: "显示器 / 触控面板",
        color: "bg-[var(--primary)]",
        challenge: "玻璃基板ITO蚀刻/切割及窄边框电路",
        highlight: "双工作台 · 超高速线条划刻",
        products: ["HT-LE-TF", "HT-WG-LC"],
        metrics: [
          { value: "6 µm", label: "最小隔离线宽" },
          { value: "双台", label: "工作台选项" },
          { value: "0.42 mm", label: "最薄玻璃适用" },
        ],
        points: [
          "向全球最大触控面板制造商TPK供应超高速多工作台激光蚀刻加工中心（2009/2011）",
          "0.42 mm超薄DITO玻璃ITO图案化——为Garmin定制开发并交付设备（2015）",
          "窄边框电路高速划刻——全球第一触控面板生产线稳定运营",
        ],
      },
      {
        id: "packaging",
        name: "先进封装 / TGV",
        color: "bg-[var(--primary)]",
        challenge: "光学玻璃IC及扇出封装贯通孔",
        highlight: "TGV钻孔 · OHI Tech协作工艺",
        products: ["HT-WG-LC (LML)"],
        metrics: [
          { value: "TGV", label: "玻璃贯通孔" },
          { value: "垂直壁", label: "贯通孔截面" },
          { value: "HAZ 0", label: "热损伤" },
        ],
        points: [
          "光学玻璃IC晶圆TGV钻孔——自研激光设备完成实证",
          "OHI Tech与客户直接实施晶圆贯通工艺——韩国唯一服务",
          "扇出晶圆级封装（FOWLP）及3D IC叠层封装贯通孔加工支持",
        ],
      },
      {
        id: "optics",
        name: "光学 / 精密仪器",
        color: "bg-[var(--primary)]",
        challenge: "亚微米编码器标尺及光学元件加工",
        highlight: "亚微米精度 · 大批量定制生产",
        products: ["HT-ENC", "HT-WG-LC"],
        metrics: [
          { value: "sub-µm", label: "编码器精度" },
          { value: "数百万", label: "年产能" },
          { value: "3种", label: "标尺类型" },
        ],
        points: [
          "面向机床·汽车电机·机器人臂的圆盘/鼓形/直线编码器标尺大批量定制生产",
          "集精密激光加工技术精华的亚微米精密测量元件——数千~数百万个/年",
          "光学元件·镜头支架精密钻孔及图案化——光学设备OEM支持",
        ],
      },
    ],
    aboutTitle: "制造商介绍",
    aboutDesc:
      "OHI Tech的合作制造商1995年创立于台湾新竹科学工业园，是激光光电-精密机械领域30年专业企业，台湾证券交易所上市公司。运营激光微细加工、光学编码器标尺、工业激光打标三大业务群，服务全球半导体至汽车行业客户。",
    aboutMission: "核心竞争力",
    missionText: "纵向整合激光光学、精密机械、运动控制，开发客户定制化激光加工解决方案。从设计到量产提供一站式支持。",
    aboutVision: "持有专利",
    visionText: "US 8,422,521 B2 / US 8,710,401 B2——等能脉冲与运动同步技术。全球唯一的水导激光曲线及不规则形状切割专利。",
    certTitle: "认证与业绩",
    certs: [
      { name: "ISO 9001", desc: "质量管理体系" },
      { name: "台湾证券交易所上市", desc: "30年激光精密加工专家" },
      { name: "美国专利", desc: "US 8,422,521 B2" },
      { name: "美国专利", desc: "US 8,710,401 B2" },
      { name: "TPK供应实绩", desc: "全球第一触控面板供应商" },
      { name: "Garmin供应", desc: "0.42mm DITO玻璃图案化" },
      { name: "Merck供应", desc: "玻璃面板激光切割" },
      { name: "ITRI交付", desc: "6kW 3D激光熔覆打印机" },
    ],
    whyTitle: "为何选择 OHI Tech",
    whys: [
      { title: "韩国唯一晶圆贯通工艺", desc: "OHI Tech利用HT-WG-LC设备与客户直接实施晶圆贯通孔钻孔。" },
      { title: "韩国官方总代理", desc: "官方韩国独家代理。设备采购到工艺优化、售后一站式支持。" },
      { title: "LML技术咨询", desc: "水导激光加工适用性评估、样品测试、工艺条件优化。" },
      { title: "定制设备配置", desc: "3/4/5轴、激光功率、喷嘴尺寸等根据客户工艺定制配置。" },
    ],
    ctaTitle: "激光精密加工 · 晶圆贯通工艺咨询",
    ctaDesc: "请提供加工材料与工艺规格，我们将推荐最优设备及工艺条件。",
    ctaBtn1: "技术咨询",
    ctaBtn2: "申请演示",
  },
} as const;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function LaserSection({ locale }: { locale: Locale }) {
  const c = LANG[locale];
  const [activeProduct, setActiveProduct] = useState<string>(c.products[0].id);
  const [activeSolution, setActiveSolution] = useState<string>(c.solutions[0].id);

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
            backgroundImage: "linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Decorative water-drop shapes */}
        <div className="absolute top-16 right-16 w-72 h-72 bg-[var(--primary)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-8 left-8 w-48 h-48 bg-[var(--primary)]/10 rounded-full blur-2xl" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <p className="text-[var(--accent)] text-xs font-semibold tracking-widest uppercase mb-4">{c.hero.eyebrow}</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight whitespace-pre-line">
            {c.hero.headline}
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-10 max-w-xl">{c.hero.sub}</p>
          <div className="flex flex-wrap gap-3 mb-14">
            <Link
              href={`/contact?lang=${locale}&type=inquiry&category=laser-machining`}
              className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=demo&category=laser-machining`}
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
          SECTION 2: PRODUCT PORTFOLIO
      ══════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
            {locale === "ko" ? "제품 포트폴리오" : locale === "en" ? "Product Portfolio" : "产品系列"}
          </h2>
          <p className="text-slate-500 text-sm mb-10">
            {locale === "ko"
              ? "전 제품 라인업 — 워터젯 레이저 가공기부터 광학 엔코더까지"
              : locale === "en"
              ? "Full product lineup — from water-guided laser to optical encoders"
              : "全系列产品——从水导激光到光学编码器"}
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
                    {/* Gradient placeholder thumbnail */}
                    <div className={`w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center shrink-0`}>
                      <span className="text-white/80 text-[9px] font-bold">{PRODUCT_ABBR[p.id]}</span>
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-block bg-slate-900 text-white text-xs font-mono px-3 py-1 rounded-full">
                          {currentProduct.tagline}
                        </span>
                        {(currentProduct.tag as string) === "flagship" && (
                          <span className="text-xs px-2.5 py-1 bg-[var(--accent)] text-white rounded-full font-semibold">Flagship</span>
                        )}
                        {(currentProduct.tag as string) === "popular" && (
                          <span className="text-xs px-2.5 py-1 bg-[var(--accent)] text-white rounded-full font-semibold">Popular</span>
                        )}
                      </div>
                    </div>
                    <div className={`w-28 h-28 rounded-2xl bg-[var(--primary)] flex flex-col items-center justify-center shrink-0 shadow-lg`}>
                      <span className="text-white/30 font-black text-3xl">{PRODUCT_ABBR[currentProduct.id]}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm mt-5 leading-relaxed pl-5">{currentProduct.desc}</p>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      {locale === "ko" ? "사양 / 모델" : locale === "en" ? "Specs / Model" : "规格 / 型号"}
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
                          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shrink-0" />
                          {app}
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/contact?lang=${locale}&type=quote&category=laser-machining&product=${currentProduct.id}`}
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
          SECTION 3: LML TECHNOLOGY DEEP DIVE
      ══════════════════════════════════════ */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{c.lmlTitle}</h2>
            <p className="text-slate-500 text-sm">{c.lmlSub}</p>
          </div>

          {/* Principle steps */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">{c.lmlPrinciple.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {c.lmlPrinciple.steps.map((step) => (
                <div key={step.no} className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-hidden">
                  <div className="text-5xl font-black text-white/70 absolute -top-2 -right-1 select-none">{step.no}</div>
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center mb-4">
                      <span className="text-white text-xs font-bold">{step.no}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-2">{step.title}</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advantages */}
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {c.lmlAdvantages.map((adv, i) => (
                <div key={i} className="bg-[var(--primary)] rounded-2xl p-6 text-white">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-3">
                    <span className="text-white text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h4 className="font-bold text-white mb-2 text-sm">{adv.title}</h4>
                  <p className="text-white/70 text-xs leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison table */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">{c.lmlVsConventional.title}</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    {c.lmlVsConventional.headers.map((h, i) => (
                      <th key={i} className="px-5 py-3.5 text-left text-xs font-semibold tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.lmlVsConventional.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-5 py-3 text-slate-700 font-medium text-xs">{row[0]}</td>
                      <td className="px-5 py-3 text-red-500 text-xs">{row[1]}</td>
                      <td className="px-5 py-3 text-[var(--accent)] font-semibold text-xs">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TGV / Wafer Through-Process */}
          <div className="mt-12 bg-[var(--primary)] rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/30 flex items-center justify-center">
                <span className="text-white/80 font-black text-sm">TGV</span>
              </div>
              <h3 className="text-xl font-black text-white">{c.tgvTitle}</h3>
            </div>
            <p className="text-white/70 text-sm mb-8 max-w-2xl leading-relaxed">{c.tgvDesc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {c.tgvPoints.map((pt, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-5">
                  <div className="text-[var(--accent)] font-black text-2xl mb-2">{String(i + 1).padStart(2, "0")}</div>
                  <h4 className="text-white font-bold text-sm mb-2">{pt.title}</h4>
                  <p className="text-white/70 text-xs leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4: INDUSTRY SOLUTIONS
      ══════════════════════════════════════ */}
      <section className="bg-white border-t border-slate-200">
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
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center shrink-0`}>
                      <span className="text-white/70 text-[9px] font-bold">{sol.id.substring(0,3).toUpperCase()}</span>
                    </div>
                    <span className="leading-snug">{sol.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: solution detail */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                {/* Header */}
                <div className={`relative h-40 bg-[var(--primary)] overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 50%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-black text-white mb-1">{currentSolution.name}</h3>
                    <p className="text-white/70 text-xs">{currentSolution.challenge}</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Highlight */}
                  <div className="inline-flex items-center gap-2 bg-[var(--accent)]/5 text-[var(--accent)] text-xs font-semibold px-4 py-2 rounded-full border border-[var(--accent)]/20 mb-6">
                    <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
                    {currentSolution.highlight}
                  </div>

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
                      <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recommended products */}
                  <div className="flex flex-wrap gap-2">
                    {currentSolution.products.map((prod) => (
                      <span key={prod} className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200 font-mono">
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5: ABOUT HORTECH + PARTNERSHIP
      ══════════════════════════════════════ */}
      <section className="bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* About Manufacturer */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] flex items-center justify-center">
                  <span className="text-white font-bold text-sm tracking-tight">HT</span>
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">{c.aboutTitle}</h2>
                  <p className="text-[var(--accent)] text-xs">
                    {locale === "ko" ? "1995 · 대만 신죽 · 증시 상장 7611" : locale === "en" ? "Est. 1995 · Hsinchu, Taiwan · Listed 7611" : "1995年 · 台湾新竹 · 上市7611"}
                  </p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">{c.aboutDesc}</p>

              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="bg-slate-800 rounded-xl p-4">
                  <h4 className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-2">{c.aboutMission}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{c.missionText}</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-4">
                  <h4 className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-2">{c.aboutVision}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{c.visionText}</p>
                </div>
              </div>

              {/* Certs */}
              <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">{c.certTitle}</h4>
              <div className="grid grid-cols-2 gap-2">
                {c.certs.map((cert, i) => (
                  <div key={i} className="bg-slate-800 rounded-xl px-4 py-3">
                    <div className="text-white text-xs font-bold">{cert.name}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5 leading-snug">{cert.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* OHI Tech Partnership */}
            <div>
              <h2 className="text-xl font-black text-white mb-2">{c.whyTitle}</h2>
              <p className="text-slate-400 text-sm mb-8">
                {locale === "ko"
                  ? "OHI Tech는 공식 한국 총판으로, 장비 도입부터 공정 개발, 유지보수까지 원스톱 지원합니다."
                  : locale === "en"
                  ? "OHI Tech is the official Korean distributor — one-stop support from equipment to process development and maintenance."
                  : "OHI Tech是官方韩国总代理，提供从设备采购到工艺开发和维护的一站式支持。"}
              </p>

              <div className="space-y-4 mb-10">
                {c.whys.map((why, i) => (
                  <div key={i} className="flex items-start gap-4 bg-slate-800 rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/30 flex items-center justify-center shrink-0">
                      <span className="text-[var(--accent)] font-black text-sm">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{why.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{why.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Partnership badge */}
              <div className="bg-[var(--primary)]/10 rounded-2xl p-5 border border-[var(--primary)]/20">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">OHI</div>
                    <div className="text-slate-400 text-[10px]">Tech</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-[var(--accent)] text-lg font-black">→</div>
                    <div className="text-slate-500 text-[10px]">Official Distributor</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">LML</div>
                    <div className="text-slate-400 text-[10px]">Laser Equipment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 6: CTA
      ══════════════════════════════════════ */}
      <section className="bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{c.ctaTitle}</h2>
          <p className="text-white/70 text-sm mb-8 max-w-lg mx-auto leading-relaxed">{c.ctaDesc}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/contact?lang=${locale}&type=inquiry&category=laser-machining`}
              className="bg-white text-[var(--primary)] font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition text-sm"
            >
              {c.ctaBtn1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=demo&category=laser-machining`}
              className="border border-white/50 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition text-sm"
            >
              {c.ctaBtn2}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
