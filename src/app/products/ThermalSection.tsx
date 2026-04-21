"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";

/* ─────────────────────────────────────────────
   T-GLOBAL IMAGE URLS
───────────────────────────────────────────── */
const BASE = "https://www.tglobalcorp.com/upload";
const IMG = {
  tim:        `${BASE}/catalog_m_b/TIM__24F07SulHq.jpg`,
  vc:         `${BASE}/catalog_m_b/VC__24F076d6ZP.jpg`,
  heatpipe:   `${BASE}/catalog_m_b/heatpipe__24F07xtQfs.jpg`,
  alsic:      `${BASE}/catalog_m_b/AlSiC__26D01lPkGT.png`,
  heatsink:   `${BASE}/catalog_m_b/heatsink%20(1)%20(1)__24F07bclpA.png`,
  tec:        `${BASE}/catalog_m_b/TEC__24F072dU4a.jpg`,
  sim:        `${BASE}/catalog_m_b/Thermal_Simulation__24F078zqy4.jpg`,
  m2:         `${BASE}/catalog_m_b/M.2__25B13sgboS.jpg`,
  solServer:  `${BASE}/news_solutions_b/ALL_news_solutions_24F07_2PlzAL89To.jpg`,
  solEss:     `${BASE}/news_solutions_b/ALL_news_solutions_24F07_lBdLjEM9us.jpg`,
  solAuto:    `${BASE}/news_solutions_b/ALL_news_solutions_24F07_NLVmSPIH2Z.jpg`,
  solNetcom:  `${BASE}/news_solutions_b/ALL_news_solutions_24F07_Kq2igezHO2.jpg`,
  solMilitary:`${BASE}/news_solutions_b/ALL_news_solutions_24F07_UnNwoYjb8q.jpg`,
  sol5g:      `${BASE}/news_solutions_b/ALL_news_solutions_24F07_tlhDN0tr2M.jpg`,
  solRobot:   `${BASE}/news_solutions_b/ALL_news_solutions_24F07_qY1728Mfnk.jpg`,
  solAi:      `${BASE}/news_solutions_b/ALL_news_solutions_24F07_1E6YEkmjwf.jpg`,
  hero1:      `${BASE}/catalog_m_list_pic/enL_catalog_m_25A22_BvH4ZzCkF6.jpg`,
  hero2:      `${BASE}/catalog_m_list_pic/Rendered%20image__26A23RpzfN.webp`,
};

const PRODUCT_IMG: Record<string, string> = {
  "tim":            IMG.tim,
  "tim-adv":        IMG.tim,
  "tape-graphite":  IMG.heatsink,
  "vapor-heatpipe": IMG.vc,
  "heatsink-alsic": IMG.alsic,
  "tec-sim":        IMG.tec,
  "nmvc":           IMG.vc,
  "vapor-pad":      IMG.tim,
};

const SOLUTION_IMG: Record<string, string> = {
  "server":   IMG.solServer,
  "ai":       IMG.solAi,
  "5g":       IMG.sol5g,
  "ev":       IMG.solAuto,
  "ess":      IMG.solEss,
  "netcom":   IMG.solNetcom,
  "military": IMG.solMilitary,
  "robotics": IMG.solRobot,
};

const SOLUTION_CUSTOMERS: Record<string, string[]> = {
  server:   ["HPE", "Dell", "Supermicro", "Gigabyte", "Inspur"],
  ai:       ["Foxconn", "Quanta", "Wiwynn", "Asus", "NVIDIA ODM"],
  "5g":     ["Ericsson", "Nokia", "Samsung Networks", "ZTE", "Huawei"],
  ev:       ["Tesla", "BYD", "Bosch", "Continental", "Magna"],
  ess:      ["LG Energy Solution", "CATL", "Samsung SDI", "BYD", "Panasonic"],
  netcom:   ["Cisco", "Juniper", "Aruba", "Huawei", "ZTE"],
  military: ["Lockheed Martin", "Raytheon", "BAE Systems", "Thales", "L3Harris"],
  robotics: ["ABB", "FANUC", "Yaskawa", "Hyundai Robotics", "Doosan"],
};

/* ─────────────────────────────────────────────
   STATIC CONTENT
───────────────────────────────────────────── */

const LANG = {
  ko: {
    hero: {
      eyebrow: "T-Global Technology 대만 공식 파트너 · OHI Tech 한국 총판",
      headline: "More Innovation,\nLess Heat.",
      sub: "열전도 · 방열 · 방열 엔지니어링 토탈 솔루션 전문가",
      cta1: "제품 상담 문의",
      cta2: "샘플 신청",
      stats: [
        { value: "7,500+", label: "글로벌 고객사" },
        { value: "30+", label: "R&D 경력(년)" },
        { value: "14일", label: "최단 납기" },
        { value: "No MOQ", label: "최소 주문 없음" },
      ],
    },
    productNav: "제품 카테고리",
    products: [
      {
        id: "tim",
        name: "열전도 패드 (TIM)",
        nameEn: "Thermal Interface Materials",
        color: "from-blue-600 to-blue-800",
        tagline: "1.0 ~ 17.8 W/m·K",
        desc: "Gap Filler Pad, 그래핀 시트, Phase Change Material, Thermal Tape 등. 반도체·GPU·배터리팩의 열저항을 최소화하는 핵심 소재.",
        lineup: [
          { model: "TG-A1250", spec: "6.0 W/m·K · 실리콘 타입 · 다양한 두께" },
          { model: "TG-A1780", spec: "17.8 W/m·K · 울트라 하이 컨덕티비티" },
          { model: "TG-A6200", spec: "비실리콘 · 오일 블리드 없음 · 자동차용" },
          { model: "TG-A320", spec: "범용 · 경제적 · 소비가전용" },
        ],
        apps: ["서버 CPU/GPU", "EV 배터리팩", "5G 모듈", "소비가전"],
      },
      {
        id: "tim-adv",
        name: "페이스트 · 겔 · PCM",
        nameEn: "Paste / Gel / Phase Change",
        color: "from-indigo-600 to-indigo-800",
        tagline: "복잡한 갭 충진 · 초박형 본드라인",
        desc: "열전도 페이스트, 겔, 퍼티, Phase Change Material. 복잡한 형상과 초박형 접합면에 최적화.",
        lineup: [
          { model: "TG-PP10", spec: "고성능 써멀 페이스트 · 10 W/m·K" },
          { model: "TG-ASD50AB", spec: "써멀 겔 · 5.0 W/m·K · 틱소트로픽" },
          { model: "TG-ASD35AB", spec: "써멀 겔 · 3.5 W/m·K · 범용" },
          { model: "TG-PCM095", spec: "Phase Change · 52°C 상전이점" },
        ],
        apps: ["CPU 히트스프레더", "파워 모듈", "LED 조명", "의료기기"],
      },
      {
        id: "tape-graphite",
        name: "테이프 · 흑연 시트",
        nameEn: "Thermal Tape & Graphite",
        color: "from-slate-600 to-slate-800",
        tagline: "경량 · 고열확산 · 슬림 디자인",
        desc: "양면 열전도 테이프와 고열전도 흑연·그래핀 시트. 스마트폰·태블릿 등 슬림 전자기기 방열에 필수.",
        lineup: [
          { model: "TG-TT Series", spec: "양면 테이프 · 다양한 접착력 옵션" },
          { model: "TG-GS Series", spec: "흑연 시트 · 면방향 700~1500 W/m·K" },
          { model: "TG-GN Series", spec: "그래핀 시트 · 면방향 1800+ W/m·K" },
        ],
        apps: ["스마트폰", "태블릿", "웨어러블", "AR/VR 기기"],
      },
      {
        id: "vapor-heatpipe",
        name: "베이퍼챔버 · 히트파이프",
        nameEn: "Vapor Chamber & Heat Pipe",
        color: "from-cyan-600 to-cyan-800",
        tagline: "알루미늄 대비 50~100배 열전달",
        desc: "초박형 베이퍼챔버(0.4mm+)와 맞춤형 히트파이프(Ø3~12mm). GPU·CPU 고집적 발열 처리의 핵심.",
        lineup: [
          { model: "VC Series", spec: "초박형 베이퍼챔버 · 0.4mm+ · 2D/3D" },
          { model: "OB-VC Series", spec: "OB 베이퍼챔버 · 노트북·서버용" },
          { model: "HP Series", spec: "소결 히트파이프 · Ø3~12mm" },
        ],
        apps: ["AI GPU 서버", "고성능 노트북", "5G 기지국", "자동차 전장"],
      },
      {
        id: "heatsink-alsic",
        name: "방열판 · AlSiC",
        nameEn: "Heat Sink & AlSiC",
        color: "from-gray-600 to-gray-800",
        tagline: "커스텀 설계 · 저열팽창계수",
        desc: "압출·단조·다이캐스팅 방열판과 AlSiC 복합 소재 히트스프레더. 반도체 파워모듈·군사·항공우주용.",
        lineup: [
          { model: "M.2 Fan Module", spec: "M.2 SSD 전용 써멀 모듈 · 28W 대응" },
          { model: "CMC-AlSiC", spec: "AlSiC 히트스프레더 · 저CTE · 진동내성" },
          { model: "Ceramic HS", spec: "세라믹 히트싱크 · 전기절연 · 고방열" },
        ],
        apps: ["SSD 스토리지", "파워 반도체", "항공우주", "방산 전자"],
      },
      {
        id: "tec-sim",
        name: "TEC / 열 시뮬레이션",
        nameEn: "TEC & Thermal Simulation",
        color: "from-orange-600 to-orange-800",
        tagline: "능동 냉각 · CFD 기반 열해석",
        desc: "열전 냉각 칩(Peltier)으로 능동 정밀 온도 제어. CFD 기반 열유동 해석 서비스로 설계 단계 열 문제 사전 예측.",
        lineup: [
          { model: "TEC Series", spec: "열전 모듈 · 1단~다단 · 소형~대형" },
          { model: "Thermal Sim", spec: "CFD 해석 서비스 · 이론~실물 검증" },
        ],
        apps: ["광통신 레이저", "의료 진단기기", "자동차 센서", "정밀측정기"],
      },
      {
        id: "nmvc",
        name: "NMVC™ 비금속 베이퍼챔버",
        nameEn: "Non-Metal Vapor Chamber · Xerendipity",
        color: "from-violet-600 to-violet-900",
        tagline: "Kxy ~2500 W/m·K · 제로 RF 간섭 · VC 대비 80~90% 성능",
        desc: "T-Global 기술 기반 Xerendipity(XR)의 차세대 비금속 베이퍼챔버. Kxy ~2500 W/m·K, Kz ~1 W/m·K. 두께 2배 시 Qmax 1.5~1.8배 증가. 벤치마크: NMVC 48°C vs 구리 VC 50.4°C (15×15mm, 1W, 25°C, 자연대류). Vapor-Pad 또는 TIM과 병행 사용 시 최적 성능 발휘. 구리 VC 대비 80% 경량, 5G/6G·Wi-Fi·GPS 간섭 제로.",
        lineup: [
          { model: "NMVC™ Standard", spec: "두께 0.15~0.35mm · Kxy ~2500 W/m·K · Kz ~1 W/m·K · 두께 2배→Qmax 1.5~1.8배" },
          { model: "NMVC™ Custom", spec: "3D 컨투어 · 불규칙 폼팩터 대응 · Vapor-Pad/TIM 병행 구성 가능" },
        ],
        apps: ["5G/6G 스마트폰", "AR/VR 헤드셋", "CPE 장비", "안테나 집약 시스템"],
      },
      {
        id: "vapor-pad",
        name: "Vapor-Pad™",
        nameEn: "Hybrid Thermal Pad · Xerendipity",
        color: "from-sky-500 to-sky-800",
        tagline: "Kxy 800~1200 W/m·K · 피크 온도 44%↓",
        desc: "Z축 전도 + X-Y 베이퍼챔버 열확산을 결합한 하이브리드 혁신 소재. 동일 조건에서 기존 열전도 패드(73.6°C) 대비 40.8°C로 피크 온도 44% 저감. 스마트폰·핸드헬드 기기의 차세대 TIM 표준. SGS 인증, 환경 스트레스 테스트 통과.",
        lineup: [
          { model: "Vapor-Pad™ 1mm", spec: "Kxy 800~1200 W/m·K · Kz 15~25 W/m·K · -30~+105°C" },
          { model: "Vapor-Pad™ Slim", spec: "두께 0.25mm · 스마트폰·핸드헬드 전용 · 실리콘 프리" },
        ],
        apps: ["5G 스마트폰", "핸드헬드 기기", "태블릿", "소비가전 SoC"],
      },
    ],
    solutionsTitle: "산업별 솔루션",
    solutionsSub: "T-Global 열관리 기술이 적용되는 주요 산업 분야",
    solutionsCta: "이 솔루션 문의",
    solutionsCustomerLabel: "주요 납품처",
    solutions: [
      {
        id: "server",
        name: "서버 / 데이터센터",
        color: "bg-slate-700",
        challenge: "1U·2U 고밀도 서버, AI 연산 집중, PUE 개선 요구",
        highlight: "CPU 정션 온도 15°C↓ · 팬 RPM 20% 절감",
        materials: ["TG-A1780", "VC Series", "HP Series"],
        metrics: [
          { value: "15°C↓", label: "CPU 정션 온도" },
          { value: "20%", label: "팬 RPM 절감" },
          { value: "PUE 0.1", label: "에너지 효율 개선" },
        ],
        points: [
          "AI 서버 H100/A100급 400W+ TDP를 TG-A1780(17.8W/m·K)으로 완벽 대응 — 업계 최고 수준 열전도율",
          "1U 랙 서버 초박형 설계에 최적화된 0.5mm 이하 갭 필러 패드 전용 라인업 보유",
          "HPE·Dell·Supermicro 등 글로벌 TOP 서버 브랜드 납품 이력 — 검증된 신뢰성",
        ],
      },
      {
        id: "ai",
        name: "AI / 딥러닝 GPU",
        color: "bg-indigo-800",
        challenge: "H100/A100급 400W+ 발열, 랙 단위 열밀도 급증",
        highlight: "GPU 코어 온도 ≤75°C · 스로틀링 없는 지속 연산",
        materials: ["TG-GN Series", "VC Series", "TEC Series"],
        metrics: [
          { value: "≤75°C", label: "GPU 코어 온도" },
          { value: "400W+", label: "TDP 대응" },
          { value: "3x+", label: "풀로드 지속 시간" },
        ],
        points: [
          "그래핀 시트 + 베이퍼챔버 조합으로 GPU 핫스팟 열을 넓게 분산 — 스로틀링 원천 차단",
          "랙 열밀도 급증에 대응하는 다층 방열 솔루션 구성 컨설팅 — 설계 단계부터 OHI Tech 지원",
          "AI 서버 OEM/ODM 파트너와 공동 검증된 TIM 라인업 직접 공급 — 빠른 NPI 지원",
        ],
      },
      {
        id: "5g",
        name: "5G / 통신 인프라",
        color: "bg-blue-800",
        challenge: "소형 기지국 고밀도 발열, 광섬유 모듈 신뢰성",
        highlight: "안테나 모듈 온도 ±3°C 이내 · 기지국 수명 20%+ 연장",
        materials: ["TG-A1250", "VC Series", "TG-GS Series"],
        metrics: [
          { value: "±3°C", label: "안테나 모듈 온도" },
          { value: "20%+", label: "기지국 수명 연장" },
          { value: "IP67", label: "옥외 환경 대응" },
        ],
        points: [
          "Small Cell 고밀도 발열을 박형 TIM 패드로 처리 — 팬리스 기지국 설계 지원",
          "광섬유 레이저 다이오드 정밀 온도 제어를 위한 TEC 모듈 — 파장 안정성 확보",
          "실외 설치 환경에서도 오일 블리드 없는 비실리콘 TIM — 장기 신뢰성 및 유지보수 비용 절감",
        ],
      },
      {
        id: "ev",
        name: "전기차 / 자동차",
        color: "bg-green-800",
        challenge: "배터리팩 200W/cm² 방열, ADAS 전장 신뢰성",
        highlight: "배터리 셀 온도 균일화 · IATF 16949 인증",
        materials: ["TG-A6200", "TG-PCM095", "CMC-AlSiC"],
        metrics: [
          { value: "≤3°C", label: "셀 간 온도편차" },
          { value: "15%+", label: "배터리 수명 향상" },
          { value: "IATF", label: "16949 인증" },
        ],
        points: [
          "자동차 규격 IATF 16949 인증 비실리콘 TIM(TG-A6200) — 오일 블리드 제로, 고신뢰성",
          "Phase Change Material로 배터리팩 셀 간 온도 균일화 — 열폭주 위험 최소화",
          "ADAS ECU·인버터·OBC·차량용 카메라 등 전장 전 라인 방열 솔루션 커버",
        ],
      },
      {
        id: "ess",
        name: "에너지 저장 (ESS)",
        color: "bg-amber-800",
        challenge: "충방전 사이클 열폭주 방지, 장기 신뢰성 확보",
        highlight: "셀 간 온도편차 ≤3°C · 사이클 수명 20%+ 향상",
        materials: ["TG-ASD50AB", "TG-PCM095", "TG-TT Series"],
        metrics: [
          { value: "≤3°C", label: "셀 간 온도편차" },
          { value: "20%+", label: "사이클 수명 향상" },
          { value: "MW급", label: "산업용 ESS 대응" },
        ],
        points: [
          "Phase Change Material로 급격한 충방전 시 과도 열 흡수 — 열폭주 사고 선제 방지",
          "써멀 겔(TG-ASD50AB)로 배터리 셀 간 열을 고르게 분산 — 수명과 안전성 동시 확보",
          "가정용 소형 ESS부터 MW급 산업용 ESS까지 전 규모 대응 — 맞춤 설계 컨설팅 제공",
        ],
      },
      {
        id: "netcom",
        name: "네트워크 / 통신장비",
        color: "bg-purple-800",
        challenge: "라우터·스위치 전력밀도 증가, 소형화 트렌드",
        highlight: "전송 성능 100% 유지 · 팬리스 설계 가능",
        materials: ["TG-A1250", "TG-ASD35AB", "HP Series"],
        metrics: [
          { value: "100%", label: "전송 성능 유지" },
          { value: "400G+", label: "고속 트랜시버 대응" },
          { value: "팬리스", label: "무소음 설계 지원" },
        ],
        points: [
          "라우터·스위치 칩셋 발열을 저열저항 TIM으로 처리 — 전송 품질 및 비트 에러율 유지",
          "히트파이프로 집중 발열을 케이스로 분산 — 팬리스 무소음 장비 설계 실현",
          "100G/400G 고속 광트랜시버 모듈 전용 방열 솔루션 — 파장 드리프트 없는 안정 전송",
        ],
      },
      {
        id: "military",
        name: "방산 / 군사",
        color: "bg-red-800",
        challenge: "극한 환경 신뢰성, 진동·충격 내구성",
        highlight: "MIL-STD-810 검증 · -55~+125°C 동작",
        materials: ["CMC-AlSiC", "TEC Series", "TG-A6200"],
        metrics: [
          { value: "MIL-STD", label: "810 환경 검증" },
          { value: "±125°C", label: "동작 온도 범위" },
          { value: "저CTE", label: "AlSiC 복합소재" },
        ],
        points: [
          "AlSiC 복합 소재 저CTE 설계 — 수천 회 반복 열충격에도 변형 없는 장기 신뢰성",
          "TEC 펠티어 모듈로 레이더·광학·통신 장비 정밀 온도 제어 — ±0.1°C 수준 안정화",
          "방산 수출 규격 대응 및 장기 재고 확보·단종 방지 서비스 — 10년+ 라이프사이클 지원",
        ],
      },
      {
        id: "robotics",
        name: "로보틱스 / 스마트 제조",
        color: "bg-teal-700",
        challenge: "관절 모터·드라이버 연속 발열, 24h 운용",
        highlight: "드라이버 수명 2배+ · 유지보수 주기 연장",
        materials: ["TEC Series", "TG-A1250", "HP Series"],
        metrics: [
          { value: "2x+", label: "드라이버 수명" },
          { value: "24/7", label: "연속 운용 대응" },
          { value: "소형화", label: "인클로저 방열 설계" },
        ],
        points: [
          "관절 서보 드라이버 고온 발열을 TEC + TIM 조합으로 정밀 처리 — 과열 보호 없는 풀퍼포먼스",
          "협동로봇·산업로봇 소형 인클로저 내 최적 방열 레이아웃 컨설팅 — 설계 초기 단계 지원",
          "공장 24시간 연속 운용 환경에서 검증된 내구성 — 계획되지 않은 다운타임 최소화",
        ],
      },
    ],
    aboutTitle: "T-Global Technology 소개",
    aboutDesc:
      "T-Global Technology는 1993년 설립 이래 30년 이상 열관리 전문 기업으로 성장해왔습니다. 대만 타오위안 본사를 중심으로 미국·영국·일본·프랑스·베트남·싱가포르·한국 등 전 세계에 거점을 운영하며, 전 세계 7,500개 이상의 직접 고객사에 최적의 열관리 솔루션을 공급합니다.",
    aboutMission: "Our Mission",
    missionText: "다양한 수요를 충족하는 종합 열관리 제품과 서비스를 제공하여, 현재와 미래 기술 모두에서 최적의 방열 성능을 보장합니다.",
    aboutVision: "Our Vision",
    visionText: "세계에서 가장 앞선 열기술 기업이 되어, 신뢰할 수 있는 파트너로서 환경 영향을 최소화하며 지속 가능한 성장을 추구합니다.",
    customerTitle: "글로벌 주요 납품처",
    certTitle: "인증 및 수상",
    certs: [
      { name: "ISO 9001", desc: "품질경영 시스템" },
      { name: "ISO 14001", desc: "환경경영 시스템" },
      { name: "IECQ", desc: "전자부품 품질인증" },
      { name: "IATF 16949", desc: "자동차 품질 시스템" },
      { name: "RoHS / REACH", desc: "유해물질 규제 준수" },
      { name: "국제 혁신상", desc: "2024 International Innovation Award" },
      { name: "위산상", desc: "국가 브랜드 최우수 제품" },
      { name: "D&B D-U-N-S®", desc: "국제 신용 인증 기업" },
    ],
    whyTitle: "OHI Tech가 T-Global 파트너인 이유",
    whys: [
      { title: "전담 기술 컨설팅", desc: "열 설계 단계부터 OHI Tech 엔지니어와 T-Global 기술팀이 함께 대응합니다." },
      { title: "최단 14일 납기", desc: "긴급 프로젝트에도 14일 이내 납기. 소량·샘플 우선 대응 가능." },
      { title: "MOQ 없음 · 맞춤 제작", desc: "최소 주문 수량 없음. 고객 규격에 맞는 커스텀 제품 제공." },
      { title: "CFD 열 시뮬레이션", desc: "설계 단계에서 열 문제를 사전 예측하는 시뮬레이션 서비스 제공." },
    ],
    ctaTitle: "열관리 솔루션이 필요하신가요?",
    ctaDesc: "제품 샘플, 기술 컨설팅, 가격 문의까지 OHI Tech 전문팀이 빠르게 응대합니다.",
    ctaBtn1: "지금 문의하기",
    ctaBtn2: "샘플 신청",
  },
  en: {
    hero: {
      eyebrow: "T-Global Technology Taiwan Official Partner · OHI Tech Korea Distributor",
      headline: "More Innovation,\nLess Heat.",
      sub: "Professional Thermal Conduction · Heat Transfer · Heat Dissipation · Engineering Solutions",
      cta1: "Request Consultation",
      cta2: "Request Sample",
      stats: [
        { value: "7,500+", label: "Global Customers" },
        { value: "30+", label: "Years of R&D" },
        { value: "14 Days", label: "Fastest Delivery" },
        { value: "No MOQ", label: "No Minimum Order" },
      ],
    },
    productNav: "Product Categories",
    products: [
      {
        id: "tim",
        name: "Thermal Pads (TIM)",
        nameEn: "Thermal Interface Materials",
        color: "from-blue-600 to-blue-800",
        tagline: "1.0 ~ 17.8 W/m·K",
        desc: "Gap Filler Pad, Graphene Sheet, Phase Change Material, Thermal Tape. Minimizes thermal resistance in semiconductors, GPUs, and battery packs.",
        lineup: [
          { model: "TG-A1250", spec: "6.0 W/m·K · Silicone · Multiple thickness" },
          { model: "TG-A1780", spec: "17.8 W/m·K · Ultra-high conductivity" },
          { model: "TG-A6200", spec: "Non-silicone · No oil bleed · Automotive" },
          { model: "TG-A320", spec: "General purpose · Cost-effective · Consumer" },
        ],
        apps: ["Server CPU/GPU", "EV Battery Pack", "5G Module", "Consumer Electronics"],
      },
      {
        id: "tim-adv",
        name: "Paste · Gel · PCM",
        nameEn: "Paste / Gel / Phase Change",
        color: "from-indigo-600 to-indigo-800",
        tagline: "Complex gap filling · Ultra-thin bondlines",
        desc: "Thermal paste, gel, putty, phase change materials. Optimized for complex geometries and ultra-thin bondline interfaces.",
        lineup: [
          { model: "TG-PP10", spec: "High-performance paste · 10 W/m·K" },
          { model: "TG-ASD50AB", spec: "Thermal gel · 5.0 W/m·K · Thixotropic" },
          { model: "TG-ASD35AB", spec: "Thermal gel · 3.5 W/m·K · General purpose" },
          { model: "TG-PCM095", spec: "Phase change · 52°C transition point" },
        ],
        apps: ["CPU Heat Spreader", "Power Module", "LED Lighting", "Medical Devices"],
      },
      {
        id: "tape-graphite",
        name: "Tape · Graphite Sheet",
        nameEn: "Thermal Tape & Graphite",
        color: "from-slate-600 to-slate-800",
        tagline: "Lightweight · High thermal spreading · Slim design",
        desc: "Double-sided thermal tape and high-conductivity graphite/graphene sheets. Essential for slim electronics like smartphones and tablets.",
        lineup: [
          { model: "TG-TT Series", spec: "Double-sided tape · Various adhesion options" },
          { model: "TG-GS Series", spec: "Graphite sheet · In-plane 700~1500 W/m·K" },
          { model: "TG-GN Series", spec: "Graphene sheet · In-plane 1800+ W/m·K" },
        ],
        apps: ["Smartphones", "Tablets", "Wearables", "AR/VR Devices"],
      },
      {
        id: "vapor-heatpipe",
        name: "Vapor Chamber · Heat Pipe",
        nameEn: "Vapor Chamber & Heat Pipe",
        color: "from-cyan-600 to-cyan-800",
        tagline: "50~100x heat transfer vs. aluminum",
        desc: "Ultra-thin vapor chambers (0.4mm+) and custom heat pipes (Ø3~12mm). The go-to solution for GPU/CPU high-density thermal management.",
        lineup: [
          { model: "VC Series", spec: "Ultra-thin VC · 0.4mm+ · 2D/3D" },
          { model: "OB-VC Series", spec: "OB Vapor Chamber · Laptop/server" },
          { model: "HP Series", spec: "Sintered heat pipe · Ø3~12mm" },
        ],
        apps: ["AI GPU Servers", "High-performance Laptops", "5G Base Stations", "Automotive"],
      },
      {
        id: "heatsink-alsic",
        name: "Heat Sink · AlSiC",
        nameEn: "Heat Sink & AlSiC",
        color: "from-gray-600 to-gray-800",
        tagline: "Custom design · Low CTE composite",
        desc: "Extruded, forged, and die-cast heat sinks plus AlSiC composite heat spreaders for power semiconductor modules, military, and aerospace.",
        lineup: [
          { model: "M.2 Fan Module", spec: "M.2 SSD thermal module · 28W capable" },
          { model: "CMC-AlSiC", spec: "AlSiC heat spreader · Low CTE · Vibration-tested" },
          { model: "Ceramic HS", spec: "Ceramic heat sink · Electrical isolation" },
        ],
        apps: ["SSD Storage", "Power Semiconductors", "Aerospace", "Defense Electronics"],
      },
      {
        id: "tec-sim",
        name: "TEC / Thermal Simulation",
        nameEn: "TEC & Thermal Simulation",
        color: "from-orange-600 to-orange-800",
        tagline: "Active cooling · CFD-based thermal analysis",
        desc: "Thermoelectric cooling chips (Peltier) for precise active temperature control. CFD thermal flow analysis service to predict and solve issues at design stage.",
        lineup: [
          { model: "TEC Series", spec: "Thermoelectric module · Single/multi-stage" },
          { model: "Thermal Sim", spec: "CFD analysis service · Theory to prototype" },
        ],
        apps: ["Optical Lasers", "Medical Diagnostics", "Automotive Sensors", "Precision Instruments"],
      },
      {
        id: "nmvc",
        name: "NMVC™ Non-Metal Vapor Chamber",
        nameEn: "Non-Metal Vapor Chamber · Xerendipity",
        color: "from-violet-600 to-violet-900",
        tagline: "Kxy ~2500 W/m·K · Zero RF Interference · 80~90% of VC Performance",
        desc: "Next-generation non-metal vapor chamber by Xerendipity (XR), built on T-Global Technology. Kxy ~2500 W/m·K, Kz ~1 W/m·K. Doubling thickness yields 1.5–1.8× higher Qmax. Benchmark: NMVC 48°C vs copper VC 50.4°C (15×15mm, 1W, 25°C, natural convection). Best paired with Vapor-Pad or TIM. 80% lighter than copper VC, zero RF interference with 5G/6G, Wi-Fi, and GPS.",
        lineup: [
          { model: "NMVC™ Standard", spec: "Thickness 0.15~0.35mm · Kxy ~2500 W/m·K · Kz ~1 W/m·K · 2× thickness → Qmax 1.5–1.8×" },
          { model: "NMVC™ Custom", spec: "3D contour · Complex form factors · Vapor-Pad/TIM stacking supported" },
        ],
        apps: ["5G/6G Smartphones", "AR/VR Headsets", "CPE Devices", "Antenna-rich Systems"],
      },
      {
        id: "vapor-pad",
        name: "Vapor-Pad™",
        nameEn: "Hybrid Thermal Pad · Xerendipity",
        color: "from-sky-500 to-sky-800",
        tagline: "Kxy 800~1200 W/m·K · Peak Temp ↓44%",
        desc: "Hybrid innovation combining Z-axis conduction with X-Y vapor-chamber heat spreading. Reduces peak temperature by 44% vs. conventional thermal pads (40.8°C vs. 73.6°C under identical conditions). SGS certified, environmental stress tested. The next TIM standard for smartphones and handheld devices.",
        lineup: [
          { model: "Vapor-Pad™ 1mm", spec: "Kxy 800~1200 W/m·K · Kz 15~25 W/m·K · -30~+105°C" },
          { model: "Vapor-Pad™ Slim", spec: "0.25mm thickness · Smartphone/handheld · Silicone-free" },
        ],
        apps: ["5G Smartphones", "Handheld Devices", "Tablets", "Consumer SoC"],
      },
    ],
    solutionsTitle: "Industry Solutions",
    solutionsSub: "T-Global thermal management technology across key industries",
    solutionsCta: "Inquire About This",
    solutionsCustomerLabel: "Key Customers",
    solutions: [
      {
        id: "server",
        name: "Servers / Data Centers",
        color: "bg-slate-700",
        challenge: "High-density 1U/2U servers, AI workloads, PUE improvement",
        highlight: "CPU junction temp ↓15°C · Fan RPM reduced 20%",
        materials: ["TG-A1780", "VC Series", "HP Series"],
        metrics: [
          { value: "15°C↓", label: "CPU Junction Temp" },
          { value: "20%", label: "Fan RPM Savings" },
          { value: "PUE 0.1", label: "Energy Efficiency" },
        ],
        points: [
          "TG-A1780 (17.8 W/m·K) handles H100/A100-class 400W+ TDP in AI servers — industry-leading conductivity",
          "Sub-0.5mm gap filler pads optimized for 1U rack server slim-profile designs",
          "Verified supply track record with HPE, Dell, Supermicro, and other top-tier server brands",
        ],
      },
      {
        id: "ai",
        name: "AI / Deep Learning GPU",
        color: "bg-indigo-800",
        challenge: "H100/A100-class 400W+ heat, surging rack thermal density",
        highlight: "GPU core temp ≤75°C · Sustained compute, no throttling",
        materials: ["TG-GN Series", "VC Series", "TEC Series"],
        metrics: [
          { value: "≤75°C", label: "GPU Core Temp" },
          { value: "400W+", label: "TDP Handled" },
          { value: "3x+", label: "Full-load Duration" },
        ],
        points: [
          "Graphene sheet + vapor chamber combination spreads GPU hotspot heat broadly — throttling eliminated",
          "Multi-layer thermal stack consulting for surging rack density — OHI Tech support from design stage",
          "AI server OEM/ODM co-validated TIM lineup with fast NPI turnaround",
        ],
      },
      {
        id: "5g",
        name: "5G / Telecom Infrastructure",
        color: "bg-blue-800",
        challenge: "Small cell high-density heat, fiber module reliability",
        highlight: "Antenna module temp ±3°C · Base station life +20%",
        materials: ["TG-A1250", "VC Series", "TG-GS Series"],
        metrics: [
          { value: "±3°C", label: "Antenna Module Temp" },
          { value: "20%+", label: "Base Station Life" },
          { value: "IP67", label: "Outdoor Ready" },
        ],
        points: [
          "Small cell high-density heat managed with thin TIM pads — enables fanless base station design",
          "TEC modules for fiber laser diode precision temperature control — wavelength stability assured",
          "No oil-bleed non-silicone TIM for outdoor installations — long-term reliability, lower OPEX",
        ],
      },
      {
        id: "ev",
        name: "EV / Automotive",
        color: "bg-green-800",
        challenge: "Battery pack 200W/cm² dissipation, ADAS reliability",
        highlight: "Uniform battery cell temp · IATF 16949 certified",
        materials: ["TG-A6200", "TG-PCM095", "CMC-AlSiC"],
        metrics: [
          { value: "≤3°C", label: "Cell Temp Variance" },
          { value: "15%+", label: "Battery Life Gain" },
          { value: "IATF", label: "16949 Certified" },
        ],
        points: [
          "IATF 16949-certified non-silicone TIM (TG-A6200) — zero oil bleed, automotive-grade reliability",
          "PCM for battery pack cell-to-cell temperature uniformity — thermal runaway risk minimized",
          "Full coverage: ADAS ECU, inverters, OBC, automotive cameras — all managed by T-Global materials",
        ],
      },
      {
        id: "ess",
        name: "Energy Storage Systems",
        color: "bg-amber-800",
        challenge: "Thermal runaway prevention, long-term reliability",
        highlight: "Cell temp variance ≤3°C · Cycle life improved 20%+",
        materials: ["TG-ASD50AB", "TG-PCM095", "TG-TT Series"],
        metrics: [
          { value: "≤3°C", label: "Cell Temp Variance" },
          { value: "20%+", label: "Cycle Life Gain" },
          { value: "MW-class", label: "ESS Scale Support" },
        ],
        points: [
          "Phase change material absorbs surge heat during rapid charge/discharge — thermal runaway proactively prevented",
          "Thermal gel (TG-ASD50AB) distributes heat evenly across cells — simultaneous life and safety improvement",
          "Supports residential small ESS to MW-class industrial ESS — custom design consulting available",
        ],
      },
      {
        id: "netcom",
        name: "Network / Telecom Equipment",
        color: "bg-purple-800",
        challenge: "Router/switch power density increase, miniaturization trend",
        highlight: "100% transmission performance · Fanless design possible",
        materials: ["TG-A1250", "TG-ASD35AB", "HP Series"],
        metrics: [
          { value: "100%", label: "Transmission Maintained" },
          { value: "400G+", label: "Transceiver Support" },
          { value: "Fanless", label: "Silent Design" },
        ],
        points: [
          "Low thermal resistance TIM handles chipset heat in routers and switches — transmission quality and BER maintained",
          "Heat pipes spread concentrated heat to chassis — enables fanless, silent equipment design",
          "Dedicated thermal solutions for 100G/400G optical transceiver modules — no wavelength drift under load",
        ],
      },
      {
        id: "military",
        name: "Defense / Military",
        color: "bg-red-800",
        challenge: "Extreme environment reliability, vibration/shock durability",
        highlight: "MIL-STD-810 verified · -55~+125°C operation",
        materials: ["CMC-AlSiC", "TEC Series", "TG-A6200"],
        metrics: [
          { value: "MIL-STD", label: "810 Verified" },
          { value: "±125°C", label: "Operating Range" },
          { value: "Low CTE", label: "AlSiC Composite" },
        ],
        points: [
          "AlSiC composite low-CTE design — no deformation through thousands of thermal shock cycles",
          "TEC Peltier modules for radar, optics, and communications equipment ±0.1°C precision control",
          "Defense export regulation compliance and long-term stock/EOL protection — 10+ year lifecycle support",
        ],
      },
      {
        id: "robotics",
        name: "Robotics / Smart Manufacturing",
        color: "bg-teal-700",
        challenge: "Joint motor/driver heat, 24/7 continuous operation",
        highlight: "Driver life 2x+ · Extended maintenance intervals",
        materials: ["TEC Series", "TG-A1250", "HP Series"],
        metrics: [
          { value: "2x+", label: "Driver Lifespan" },
          { value: "24/7", label: "Continuous Operation" },
          { value: "Compact", label: "Enclosure Design" },
        ],
        points: [
          "TEC + TIM combination precisely handles servo driver heat — full performance without over-temperature protection triggers",
          "Optimal thermal layout consulting for collaborative and industrial robot compact enclosures — early-stage design support",
          "Proven durability in 24/7 factory environments — unplanned downtime minimized, OEE maximized",
        ],
      },
    ],
    aboutTitle: "About T-Global Technology",
    aboutDesc:
      "Founded in 1993, T-Global Technology has grown over 30 years into a leading thermal management specialist. With headquarters in Taoyuan, Taiwan and offices in the USA, UK, Japan, France, Vietnam, Singapore, and Korea, T-Global serves 7,500+ direct customers worldwide with optimal thermal management solutions.",
    aboutMission: "Our Mission",
    missionText: "Deliver comprehensive thermal management products and services to meet diverse needs, ensuring optimal heat dissipation performance for both current products and emerging technologies.",
    aboutVision: "Our Vision",
    visionText: "To become the world's most advanced thermal technology company — a reliable partner minimizing environmental impact while pursuing sustainable growth.",
    customerTitle: "Key Global Customers",
    certTitle: "Certifications & Awards",
    certs: [
      { name: "ISO 9001", desc: "Quality Management System" },
      { name: "ISO 14001", desc: "Environmental Management" },
      { name: "IECQ", desc: "Electronic Component Quality" },
      { name: "IATF 16949", desc: "Automotive Quality System" },
      { name: "RoHS / REACH", desc: "Hazardous Substance Compliance" },
      { name: "Innovation Award", desc: "2024 International Innovation Award" },
      { name: "Yushan Award", desc: "National Brand Best Product" },
      { name: "D&B D-U-N-S®", desc: "International Credit Certified" },
    ],
    whyTitle: "Why OHI Tech × T-Global",
    whys: [
      { title: "Dedicated Technical Consulting", desc: "OHI Tech engineers and T-Global's technical team collaborate from the thermal design stage." },
      { title: "14-Day Fastest Delivery", desc: "14-day delivery even for urgent projects. Small quantities and samples prioritized." },
      { title: "No MOQ · Custom Production", desc: "No minimum order quantity. Custom products built to your specifications." },
      { title: "CFD Thermal Simulation", desc: "Identify thermal issues at the design stage with our CFD-based analysis service." },
    ],
    ctaTitle: "Need a Thermal Management Solution?",
    ctaDesc: "From product samples to technical consulting and pricing — OHI Tech's expert team responds fast.",
    ctaBtn1: "Contact Us Now",
    ctaBtn2: "Request Sample",
  },
  zh: {
    hero: {
      eyebrow: "T-Global Technology 台湾官方合作伙伴 · OHI Tech 韩国总代理",
      headline: "More Innovation,\nLess Heat.",
      sub: "专业热传导 · 热传递 · 散热 · 热工程解决方案",
      cta1: "产品咨询",
      cta2: "申请样品",
      stats: [
        { value: "7,500+", label: "全球客户" },
        { value: "30+", label: "研发年限" },
        { value: "14天", label: "最短交期" },
        { value: "无MOQ", label: "无最小起订量" },
      ],
    },
    productNav: "产品分类",
    products: [
      {
        id: "tim",
        name: "导热垫片 (TIM)",
        nameEn: "Thermal Interface Materials",
        color: "from-blue-600 to-blue-800",
        tagline: "1.0 ~ 17.8 W/m·K",
        desc: "导热垫片、石墨烯片、相变材料、导热胶带等。最大限度降低半导体、GPU、电池组的热阻。",
        lineup: [
          { model: "TG-A1250", spec: "6.0 W/m·K · 硅基 · 多种厚度" },
          { model: "TG-A1780", spec: "17.8 W/m·K · 超高导热率" },
          { model: "TG-A6200", spec: "非硅基 · 无油渗 · 车规级" },
          { model: "TG-A320", spec: "通用型 · 经济实惠 · 消费电子" },
        ],
        apps: ["服务器CPU/GPU", "EV电池组", "5G模块", "消费电子"],
      },
      {
        id: "tim-adv",
        name: "导热膏 · 凝胶 · PCM",
        nameEn: "Paste / Gel / Phase Change",
        color: "from-indigo-600 to-indigo-800",
        tagline: "复杂填隙 · 超薄键合线",
        desc: "导热膏、凝胶、腻子、相变材料。专为复杂形状和超薄接合面优化。",
        lineup: [
          { model: "TG-PP10", spec: "高性能导热膏 · 10 W/m·K" },
          { model: "TG-ASD50AB", spec: "导热凝胶 · 5.0 W/m·K · 触变性" },
          { model: "TG-ASD35AB", spec: "导热凝胶 · 3.5 W/m·K · 通用" },
          { model: "TG-PCM095", spec: "相变材料 · 52°C相变点" },
        ],
        apps: ["CPU散热片", "功率模块", "LED照明", "医疗设备"],
      },
      {
        id: "tape-graphite",
        name: "导热胶带 · 石墨片",
        nameEn: "Thermal Tape & Graphite",
        color: "from-slate-600 to-slate-800",
        tagline: "轻量 · 高热扩散 · 超薄设计",
        desc: "双面导热胶带和高导热石墨/石墨烯片。智能手机、平板等超薄电子设备散热必备。",
        lineup: [
          { model: "TG-TT Series", spec: "双面胶带 · 多种粘合力选项" },
          { model: "TG-GS Series", spec: "石墨片 · 面向700~1500 W/m·K" },
          { model: "TG-GN Series", spec: "石墨烯片 · 面向1800+ W/m·K" },
        ],
        apps: ["智能手机", "平板电脑", "可穿戴设备", "AR/VR设备"],
      },
      {
        id: "vapor-heatpipe",
        name: "均热板 · 热管",
        nameEn: "Vapor Chamber & Heat Pipe",
        color: "from-cyan-600 to-cyan-800",
        tagline: "比铝导热50~100倍",
        desc: "超薄均热板(0.4mm+)和定制热管(Ø3~12mm)。GPU/CPU高密度热管理核心解决方案。",
        lineup: [
          { model: "VC Series", spec: "超薄均热板 · 0.4mm+ · 2D/3D" },
          { model: "OB-VC Series", spec: "OB均热板 · 笔记本/服务器用" },
          { model: "HP Series", spec: "烧结热管 · Ø3~12mm" },
        ],
        apps: ["AI GPU服务器", "高性能笔记本", "5G基站", "汽车电子"],
      },
      {
        id: "heatsink-alsic",
        name: "散热器 · AlSiC",
        nameEn: "Heat Sink & AlSiC",
        color: "from-gray-600 to-gray-800",
        tagline: "定制设计 · 低热膨胀系数",
        desc: "挤压、锻造、压铸散热器及AlSiC复合材料散热基板。适用于功率半导体模块、军事、航空航天。",
        lineup: [
          { model: "M.2 Fan Module", spec: "M.2 SSD专用散热模块 · 28W" },
          { model: "CMC-AlSiC", spec: "AlSiC散热片 · 低CTE · 振动测试通过" },
          { model: "Ceramic HS", spec: "陶瓷散热片 · 电气绝缘 · 高散热" },
        ],
        apps: ["SSD存储", "功率半导体", "航空航天", "国防电子"],
      },
      {
        id: "tec-sim",
        name: "TEC / 热仿真服务",
        nameEn: "TEC & Thermal Simulation",
        color: "from-orange-600 to-orange-800",
        tagline: "主动冷却 · CFD热流体分析",
        desc: "热电冷却芯片(Peltier)实现精密主动温控。CFD热流体分析服务，在设计阶段预测并解决热问题。",
        lineup: [
          { model: "TEC Series", spec: "热电模块 · 单级~多级 · 小型~大型" },
          { model: "Thermal Sim", spec: "CFD分析服务 · 理论到实物验证" },
        ],
        apps: ["光通信激光器", "医疗诊断设备", "汽车传感器", "精密测量仪器"],
      },
      {
        id: "nmvc",
        name: "NMVC™ 非金属均热板",
        nameEn: "Non-Metal Vapor Chamber · Xerendipity",
        color: "from-violet-600 to-violet-900",
        tagline: "Kxy ~2500 W/m·K · 零RF干扰 · VC性能的80~90%",
        desc: "基于T-Global技术的Xerendipity(XR)下一代非金属均热板。Kxy ~2500 W/m·K，Kz ~1 W/m·K。厚度翻倍时Qmax提升1.5~1.8倍。基准测试：NMVC 48°C vs 铜制VC 50.4°C（15×15mm，1W，25°C，自然对流）。建议搭配Vapor-Pad或TIM使用以发挥最优性能。与铜制VC相比减重80%，对5G/6G、Wi-Fi、GPS零信号干扰。",
        lineup: [
          { model: "NMVC™ Standard", spec: "厚度0.15~0.35mm · Kxy ~2500 W/m·K · Kz ~1 W/m·K · 厚度2倍→Qmax 1.5~1.8倍" },
          { model: "NMVC™ Custom", spec: "3D轮廓 · 不规则外形适配 · 支持Vapor-Pad/TIM叠层配置" },
        ],
        apps: ["5G/6G智能手机", "AR/VR头显", "CPE设备", "天线密集系统"],
      },
      {
        id: "vapor-pad",
        name: "Vapor-Pad™",
        nameEn: "Hybrid Thermal Pad · Xerendipity",
        color: "from-sky-500 to-sky-800",
        tagline: "Kxy 800~1200 W/m·K · 峰值温度↓44%",
        desc: "结合Z轴传导与X-Y均热板热扩散的混合创新材料。相同条件下峰值温度比传统导热垫降低44%（40.8°C vs 73.6°C）。SGS认证，通过环境应力测试。智能手机和手持设备的下一代TIM标准。",
        lineup: [
          { model: "Vapor-Pad™ 1mm", spec: "Kxy 800~1200 W/m·K · Kz 15~25 W/m·K · -30~+105°C" },
          { model: "Vapor-Pad™ Slim", spec: "厚度0.25mm · 智能手机/手持设备专用 · 无硅" },
        ],
        apps: ["5G智能手机", "手持设备", "平板电脑", "消费类SoC"],
      },
    ],
    solutionsTitle: "行业解决方案",
    solutionsSub: "T-Global热管理技术覆盖的主要行业领域",
    solutionsCta: "咨询此方案",
    solutionsCustomerLabel: "主要客户",
    solutions: [
      {
        id: "server",
        name: "服务器 / 数据中心",
        color: "bg-slate-700",
        challenge: "1U/2U高密度服务器、AI运算集中、PUE改善需求",
        highlight: "CPU结温↓15°C · 风扇转速降低20%",
        materials: ["TG-A1780", "VC Series", "HP Series"],
        metrics: [
          { value: "15°C↓", label: "CPU结温" },
          { value: "20%", label: "风扇转速节省" },
          { value: "PUE 0.1", label: "能效提升" },
        ],
        points: [
          "TG-A1780(17.8W/m·K)完美应对AI服务器H100/A100级400W+ TDP——行业最高导热率",
          "针对1U机架服务器超薄设计优化的0.5mm以下间隙填充垫专属产品线",
          "HPE、Dell、Supermicro等全球顶级服务器品牌供货记录——经过验证的可靠性",
        ],
      },
      {
        id: "ai",
        name: "AI / 深度学习GPU",
        color: "bg-indigo-800",
        challenge: "H100/A100级400W+发热，机架热密度急增",
        highlight: "GPU核心温度≤75°C · 无降频持续计算",
        materials: ["TG-GN Series", "VC Series", "TEC Series"],
        metrics: [
          { value: "≤75°C", label: "GPU核心温度" },
          { value: "400W+", label: "TDP应对" },
          { value: "3x+", label: "满载持续时间" },
        ],
        points: [
          "石墨烯片+均热板组合广泛分散GPU热点热量——从根本上消除降频",
          "针对机架热密度急增的多层散热方案咨询——OHI Tech从设计阶段提供支持",
          "与AI服务器OEM/ODM伙伴共同验证的TIM产品线——快速NPI交货",
        ],
      },
      {
        id: "5g",
        name: "5G / 通信基础设施",
        color: "bg-blue-800",
        challenge: "小型基站高密度发热，光纤模块可靠性",
        highlight: "天线模块温度±3°C · 基站寿命延长20%+",
        materials: ["TG-A1250", "VC Series", "TG-GS Series"],
        metrics: [
          { value: "±3°C", label: "天线模块温度" },
          { value: "20%+", label: "基站寿命延长" },
          { value: "IP67", label: "户外环境适用" },
        ],
        points: [
          "薄型TIM垫片处理小型基站高密度发热——支持无风扇基站设计",
          "光纤激光二极管精密温控TEC模块——波长稳定性保障",
          "户外安装环境无油渗非硅基TIM——长期可靠性，降低运维成本",
        ],
      },
      {
        id: "ev",
        name: "电动汽车 / 汽车",
        color: "bg-green-800",
        challenge: "电池组200W/cm²散热，ADAS可靠性",
        highlight: "电池单体温度均匀 · IATF 16949认证",
        materials: ["TG-A6200", "TG-PCM095", "CMC-AlSiC"],
        metrics: [
          { value: "≤3°C", label: "单体温差" },
          { value: "15%+", label: "电池寿命提升" },
          { value: "IATF", label: "16949认证" },
        ],
        points: [
          "IATF 16949认证非硅基TIM(TG-A6200)——零油渗，车规级可靠性",
          "相变材料实现电池组单体间温度均匀化——热失控风险最小化",
          "全面覆盖：ADAS ECU、逆变器、OBC、车载摄像头等所有电子部件",
        ],
      },
      {
        id: "ess",
        name: "储能系统 (ESS)",
        color: "bg-amber-800",
        challenge: "防止热失控，长期可靠性",
        highlight: "单体温差≤3°C · 循环寿命提升20%+",
        materials: ["TG-ASD50AB", "TG-PCM095", "TG-TT Series"],
        metrics: [
          { value: "≤3°C", label: "单体温差" },
          { value: "20%+", label: "循环寿命提升" },
          { value: "MW级", label: "工业ESS支持" },
        ],
        points: [
          "相变材料吸收快速充放电时的过渡热量——主动防止热失控事故",
          "导热凝胶(TG-ASD50AB)均匀分散电池单体间热量——同时确保寿命和安全性",
          "支持家用小型ESS到MW级工业ESS全规模——提供定制设计咨询",
        ],
      },
      {
        id: "netcom",
        name: "网络 / 通信设备",
        color: "bg-purple-800",
        challenge: "路由器/交换机功率密度增加，小型化趋势",
        highlight: "传输性能100%维持 · 可实现无风扇设计",
        materials: ["TG-A1250", "TG-ASD35AB", "HP Series"],
        metrics: [
          { value: "100%", label: "传输性能维持" },
          { value: "400G+", label: "高速收发器支持" },
          { value: "无风扇", label: "静音设计支持" },
        ],
        points: [
          "低热阻TIM处理路由器/交换机芯片组发热——传输质量和误码率维持",
          "热管将集中发热分散至机箱——实现无风扇静音设备设计",
          "100G/400G高速光收发器模块专属散热方案——负载下无波长漂移",
        ],
      },
      {
        id: "military",
        name: "国防 / 军事",
        color: "bg-red-800",
        challenge: "极端环境可靠性，振动/冲击耐久性",
        highlight: "MIL-STD-810验证 · -55~+125°C工作",
        materials: ["CMC-AlSiC", "TEC Series", "TG-A6200"],
        metrics: [
          { value: "MIL-STD", label: "810环境验证" },
          { value: "±125°C", label: "工作温度范围" },
          { value: "低CTE", label: "AlSiC复合材料" },
        ],
        points: [
          "AlSiC复合材料低CTE设计——数千次热冲击循环后无变形，长期可靠性",
          "TEC珀尔帖模块用于雷达、光学、通信设备±0.1°C精密温控",
          "符合国防出口法规，提供长期库存/断供保护——10年以上生命周期支持",
        ],
      },
      {
        id: "robotics",
        name: "机器人 / 智能制造",
        color: "bg-teal-700",
        challenge: "关节电机/驱动器持续发热，24小时运行",
        highlight: "驱动器寿命2倍+ · 维护周期延长",
        materials: ["TEC Series", "TG-A1250", "HP Series"],
        metrics: [
          { value: "2x+", label: "驱动器寿命" },
          { value: "24/7", label: "连续运行支持" },
          { value: "小型化", label: "机箱散热设计" },
        ],
        points: [
          "TEC+TIM组合精密处理伺服驱动器高温发热——无过温保护触发的全性能运行",
          "协作机器人/工业机器人小型机箱最优散热布局咨询——早期设计阶段支持",
          "工厂24小时连续运行环境验证耐久性——非计划停机最小化",
        ],
      },
    ],
    aboutTitle: "T-Global Technology 公司介绍",
    aboutDesc:
      "T-Global Technology成立于1993年，30余年来已发展成为热管理领域的领先企业。以台湾桃园总部为核心，在美国、英国、日本、法国、越南、新加坡、韩国等地设有分支机构，为全球7,500余家直接客户提供最优热管理解决方案。",
    aboutMission: "使命",
    missionText: "提供满足多样化需求的综合热管理产品与服务，确保现有产品和新兴技术都能获得最优散热性能。",
    aboutVision: "愿景",
    visionText: "成为全球最先进的热技术企业，作为值得信赖的合作伙伴，在追求可持续发展的同时最大限度地减少对环境的影响。",
    customerTitle: "全球主要客户",
    certTitle: "认证与获奖",
    certs: [
      { name: "ISO 9001", desc: "质量管理体系" },
      { name: "ISO 14001", desc: "环境管理体系" },
      { name: "IECQ", desc: "电子元件质量认证" },
      { name: "IATF 16949", desc: "汽车质量体系" },
      { name: "RoHS / REACH", desc: "有害物质合规" },
      { name: "创新奖", desc: "2024国际创新奖" },
      { name: "玉山奖", desc: "国家品牌最佳产品" },
      { name: "D&B D-U-N-S®", desc: "国际信用认证企业" },
    ],
    whyTitle: "为何选择 OHI Tech × T-Global",
    whys: [
      { title: "专属技术咨询", desc: "从热设计阶段起，OHI Tech工程师与T-Global技术团队联合应对。" },
      { title: "最短14天交期", desc: "即使紧急项目也可14天内交货。支持小批量和样品优先。" },
      { title: "无MOQ · 定制生产", desc: "无最小起订量。根据客户规格提供定制产品。" },
      { title: "CFD热仿真服务", desc: "基于CFD的热流体分析，在设计阶段提前识别热问题。" },
    ],
    ctaTitle: "需要热管理解决方案？",
    ctaDesc: "从产品样品到技术咨询和报价，OHI Tech专业团队快速响应。",
    ctaBtn1: "立即联系",
    ctaBtn2: "申请样品",
  },
};

const CUSTOMERS = ["Tesla", "HP", "Sony", "Siemens", "Sharp", "Panasonic", "Cisco", "Bosch", "LG", "Asus", "Foxconn", "Gigabyte", "Jabil", "Magna", "NEC", "Delta"];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function ThermalSection({ locale }: { locale: Locale }) {
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
            backgroundImage: "linear-gradient(rgba(255,165,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,165,0,0.3) 1px, transparent 1px)",
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
              href={`/contact?lang=${locale}&type=inquiry&category=thermal-management`}
              className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=sample&category=thermal-management`}
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
              ? "T-Global의 전 제품군 — TIM부터 시스템 솔루션까지"
              : locale === "en"
              ? "Full T-Global product range — from TIM to system-level solutions"
              : "T-Global全系列产品——从TIM到系统级解决方案"}
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
                          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shrink-0" />
                          {app}
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/contact?lang=${locale}&type=quote&category=thermal-management&product=${currentProduct.id}`}
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
          (sidebar + detail panel)
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

                  {/* Recommended products + customers */}
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

                  {/* CTA */}
                  <div className="mt-6">
                    <Link
                      href={`/contact?lang=${locale}&type=inquiry&category=thermal-management&solution=${currentSolution.id}`}
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
          SECTION 4: ABOUT T-GLOBAL
      ══════════════════════════════════════ */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-3">
                T-Global Technology Co., Ltd.
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{c.aboutTitle}</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{c.aboutDesc}</p>
              <div className="space-y-4">
                <div className="border-l-4 border-orange-500 pl-4">
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
                  {["🇹🇼 Taiwan HQ", "🇺🇸 USA", "🇬🇧 UK", "🇯🇵 Japan", "🇫🇷 France", "🇻🇳 Vietnam", "🇸🇬 Singapore", "🇰🇷 Korea"].map((g) => (
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
          SECTION 5: WHY OHI TECH × T-GLOBAL
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
              href={`/contact?lang=${locale}&type=inquiry&category=thermal-management`}
              className="bg-white text-[var(--primary)] hover:bg-gray-50 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg"
            >
              {c.ctaBtn1}
            </Link>
            <Link
              href={`/contact?lang=${locale}&type=sample&category=thermal-management`}
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
