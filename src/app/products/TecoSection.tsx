"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";

/* ─────────────────────────────────────────────
   SOLUTION VISUALS (gradient + inline SVG icon — no external deps)
───────────────────────────────────────────── */
type SolutionVisual = { gradient: string; icon: ReactNode };

const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 13.5 2.25 12 10.5h7.5L9.75 21.75 11.25 13.5H3.75Z" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 5-4 9-9 9s-9-4-9-9V5.25l9-3 9 3V12Z" />
  </svg>
);
const ICON_GAUGE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5a8.25 8.25 0 0 1 16.5 0M12 13.5l4.5-4.5M12 13.5h.008v.008H12V13.5Z" />
  </svg>
);
const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-3a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  </svg>
);
const ICON_MAP = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 6.75-4.5 1.5v10.5l4.5-1.5m0-10.5 6 1.5m-6-1.5v10.5m6-9 4.5-1.5v10.5l-4.5 1.5m0-10.5v10.5m0 0-6-1.5" />
  </svg>
);
const ICON_LEAF = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 0 1-9 9c-1.27 0-2.49-.26-3.6-.72l-3 .9 1.05-2.85A8.95 8.95 0 0 1 3 12a9 9 0 0 1 18 0Zm-9-5c-2.5 0-4.5 2-4.5 4.5 0 1.5.7 2.8 1.8 3.6L12 11l3.7 4.1c1.1-.8 1.8-2.1 1.8-3.6C17.5 9 15.5 7 13 7Z" />
  </svg>
);
const ICON_INSPECT = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);
const ICON_FAN = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c0-3.5 2.5-6.5 6-7-1 2.5-1 5.5 0 8-2.5-1-5.5-1-8 0 1-3.5-1-7-3-9 2 1.5 4 4.5 5 8Zm0 0c0 3.5-2.5 6.5-6 7 1-2.5 1-5.5 0-8 2.5 1 5.5 1 8 0-1 3.5 1 7 3 9-2-1.5-4-4.5-5-8Z" />
  </svg>
);
const ICON_CLEANROOM = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.71.71m13.96 13.96.71.71M3 12H2m22 0h-1M4.22 19.78l.71-.71M18.36 5.64l.71-.71M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7Z" />
  </svg>
);
const ICON_BUILDING = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
);

const SOLUTION_VISUAL: Record<string, SolutionVisual> = {
  direct:         { gradient: "from-blue-600 via-blue-700 to-indigo-800",     icon: ICON_BOLT },
  motor:          { gradient: "from-orange-500 via-orange-600 to-red-700",    icon: ICON_SHIELD },
  vfd:            { gradient: "from-emerald-500 via-teal-600 to-cyan-700",    icon: ICON_GAUGE },
  servo:          { gradient: "from-purple-600 via-fuchsia-700 to-pink-700",  icon: ICON_TARGET },
  "drone-survey": { gradient: "from-sky-500 via-blue-600 to-indigo-700",      icon: ICON_MAP },
  "drone-agri":   { gradient: "from-lime-500 via-green-600 to-emerald-700",   icon: ICON_LEAF },
  "drone-inspect":{ gradient: "from-slate-600 via-slate-700 to-slate-900",    icon: ICON_INSPECT },
  "fcu-app":      { gradient: "from-orange-500 via-rose-500 to-red-600",       icon: ICON_FAN },
  "ffu-app":      { gradient: "from-lime-500 via-emerald-600 to-teal-700",     icon: ICON_CLEANROOM },
  "ahu-app":      { gradient: "from-violet-600 via-purple-700 to-indigo-800",  icon: ICON_BUILDING },
};

/* ─────────────────────────────────────────────
   STATIC CONTENT
───────────────────────────────────────────── */

const LANG = {
  ko: {
    hero: {
      eyebrow: "TECO Electric & Machinery 한국 공식 파트너 · OHI Tech 총판",
      headline: "Move to Lead",
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
      {
        id: "ecm-ir",
        name: "EC 모터 (내전형)",
        nameEn: "EC Motor — Internal Rotor (D98 / D125)",
        tagline: "60W~750W · PMSM · FCU·AHU 전용",
        desc: "영구 자석 동기 모터(PMSM) 기반의 내전형 EC 모터. D98 시리즈(60~200W)는 소형 FCU·덕트형 팬 코일에, D125 시리즈(350~750W)는 대형 AHU·덕트형 공조 유닛에 최적화. SVPWM & 샤프트 전류 차단 설계로 저진동·저소음 실현. 부하·외부 전원 변동에 무관한 폐루프 제어로 안정적 속도 유지.",
        lineup: [
          { model: "D98 (단축)", spec: "60~200W · 1Ø 100~240Vac · 500~1550 RPM · 효율 >80% · FCU/FFU" },
          { model: "D125 (이중축)", spec: "350~750W · 1Ø 220~240Vac · 500~1350 RPM · 효율 >85% · 덕트형 AHU" },
          { model: "D160 (외부 드라이브)", spec: "600~1400W · 3Ø 220Vac · 출시 예정 26Y Q4" },
          { model: "D180 (일체형)", spec: "1800~2200W · 3Ø 380Vac · 출시 예정 27Y Q1" },
        ],
        apps: ["팬 코일 유닛(FCU)", "덕트형 공조", "소형 공조 유닛", "HVAC 에너지 절감"],
      },
      {
        id: "ecm-er",
        name: "EC 모터 (외전형)",
        nameEn: "EC Motor — External Rotor (OD102 / OD180)",
        tagline: "60W~3700W · 2×4~4×4 FFU · 팬월 시스템",
        desc: "외전형 구조로 원심 팬·축류 팬과 직결 구동하는 EC 모터. OD102(60~350W)는 2×4·4×4 FFU 및 배기 유닛에, OD180(3000~3700W)은 대형 팬월 시스템·냉각탑에 최적. 정격 부하 THD-A < 10%의 낮은 고조파, 역전류·과온·스톨 완전 보호.",
        lineup: [
          { model: "OD102", spec: "60~350W · 1Ø 200~277Vac · 500~1600 RPM · 2×4/4×4 FFU" },
          { model: "OD138", spec: "300~750W · 1Ø 200~277Vac · 팬월 시스템 · 출시 예정 26Y Q4" },
          { model: "OD150", spec: "1500~2200W · 3Ø 380Vac · 팬월 시스템 · 출시 예정 27Y Q2" },
          { model: "OD180", spec: "3000~3700W · 3Ø 380Vac · 600~1800 RPM · 팬월/냉각탑" },
        ],
        apps: ["팬 필터 유닛(FFU)", "클린룸 팬월", "배기 유닛", "냉각탑"],
      },
      {
        id: "ecm-drv",
        name: "EC 드라이버 보드",
        nameEn: "EC Driver Board",
        tagline: "1Ø 100~240Vac · 3-속도/아날로그/통신 제어",
        desc: "EC 모터 메이커용 독립형 드라이버 보드. 단상 100~240Vac 범용 입력, ±10% 전압 허용. 500~1300 RPM 모터 속도 제어, 9.8 kg·cm 토크 범위. 3-속도 / 아날로그 / 통신 제어 3가지 모드 지원. 과전류·과온·스톨 완전 보호 내장.",
        lineup: [
          { model: "Driver Board", spec: "1Ø 100~240Vac · 50/60Hz · 최대 전류 1.4A(100V)" },
          { model: "속도 제어", spec: "500~1300 RPM ±10 RPM · 토크 9.8 kg·cm (500~1200 RPM)" },
          { model: "제어 모드", spec: "3-속도 / 아날로그 / RS485 통신" },
        ],
        apps: ["EC 모터 메이커", "FCU 제조사", "FFU 제조사", "소형 공조 장비"],
      },
      {
        id: "ecm-int",
        name: "ECM 통합 모듈",
        nameEn: "ECM (Integrated Motor + Drive)",
        tagline: "1φ 100~240Vac · PMSM · 이중축 일체형",
        desc: "모터와 드라이브를 하나의 유닛으로 통합한 ECM 모듈. FCU/FFU/AHU 메이커의 시스템 설계 복잡도를 최소화. 폐루프 제어로 부하·전원 변동과 무관한 안정적인 속도 운용. Modbus·전류·전압·전력·운전 상태 모니터링·원격 제어 통신 내장.",
        lineup: [
          { model: "ECM (이중축)", spec: "1φ 100~240Vac · 500~1300 RPM ± 10 RPM" },
          { model: "토크 제어", spec: "9.8 kg·cm (500~1200 RPM)" },
          { model: "통신", spec: "Modbus · 아날로그 · PWM 속도 제어" },
        ],
        apps: ["FCU/FFU/AHU 시스템 통합", "범용 소형 공조", "에너지 절감 리트로핏", "OEM 모듈 공급"],
      },
      {
        id: "fcu",
        name: "팬 코일 유닛 (FCU)",
        nameEn: "Fan Coil Unit — FCU-#300 / FCU-#600",
        tagline: "300~600 CFM · CE 인증 · Modbus 통신",
        desc: "TECO ECM 일체형 팬 코일 유닛. 단상 100~240Vac 입력, 3-속도/아날로그 스텝리스/통신 제어 지원. FCU-#300(단축, 300CFM, 20~60W)은 소형 공조 유닛에, FCU-#600(이중축, 600CFM, 60~130W)은 중형 덕트 팬 코일에 최적. CE 인증, Modbus 전력·운전 모니터링 포함.",
        lineup: [
          { model: "FCU-#300 (단축)", spec: "D98 EC-PMSM · 20~60W · 300 CFM · IP54 · CE" },
          { model: "FCU-#600 (이중축)", spec: "D98 EC-PMSM · 60~130W · 600 CFM · IP54 · CE" },
          { model: "공통 사양", spec: "1Ø 100~240V · 500~1550 RPM · THD-A < 15% · PF > 95%" },
        ],
        apps: ["주거용 건물", "상업용 공간", "호텔·호스피탈리티", "소형 오피스"],
      },
      {
        id: "ffu",
        name: "팬 필터 유닛 (FFU)",
        nameEn: "Fan Filter Unit — FFU-4×2 / FFU-4×4",
        tagline: "350~1580 CFM · 클린룸 IP55 · RS485",
        desc: "클린룸·바이오파마·의료 환경에 최적화된 ECM FFU. FFU-4×2(내전형 Ø98, 170W, 350CFM)는 2×4 클린룸 타일에, FFU-4×4(외전형 Ø102, 350W, 1580CFM)는 4×4 광역 클린 존에 사용. IP55 등급, 5-속도/VR/RS485 통신 제어, 과온·과전압·스톨 보호 내장.",
        lineup: [
          { model: "FFU-4×2", spec: "내전형 Ø98 · 170W max · 350 CFM(950rpm/150Pa) · IP55" },
          { model: "FFU-4×4", spec: "외전형 Ø102 · 350W max · 1580 CFM(1350rpm/150Pa) · IP55" },
          { model: "공통 사양", spec: "1Ø 200~277V · THD-A < 15% · Modbus/RS485" },
        ],
        apps: ["클린룸", "바이오파마·의료", "반도체 제조", "로컬 클린 존"],
      },
      {
        id: "ahu",
        name: "공기 조화 유닛 (AHU)",
        nameEn: "Air Handling Unit — AHU-#800 / AHU-#1600",
        tagline: "800~1600 CFM · PWM/RS485 · 상업용",
        desc: "대용량 상업 건물·공공 인프라·의료 시설용 ECM AHU. AHU-#800(단축, 800CFM, 30~240W)은 중형 공조에, AHU-#1600(이중축, 1600CFM, 50~500W)은 대형 건물·병원에 최적. PWM 전력 제어 + RS485 통신, 효율 >80%, PF > 95%, THD-A < 15%.",
        lineup: [
          { model: "AHU-#800 (단축)", spec: "D98 EC-PMSM · 30~240W · 800 CFM · IP54 · 1.1A" },
          { model: "AHU-#1600 (이중축)", spec: "D125 EC-PMSM · 50~500W · 1600 CFM · IP54 · 2.5A" },
          { model: "공통 사양", spec: "1Ø 200~240V · 500~1350 RPM · Modbus/RS485" },
        ],
        apps: ["상업용 빌딩", "호텔·공공시설", "병원·헬스케어", "데이터센터 공조"],
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
      {
        id: "fcu-app",
        name: "팬 코일 유닛 (FCU)",
        challenge: "주거·상업·공공 건물의 HVAC 에너지 효율 향상, 기존 PSC 모터 대체",
        highlight: "EC Motor(D98) + Driver Board → FCU System",
        models: ["D98 EC-PMSM", "FCU-#300", "FCU-#600"],
        metrics: [
          { value: "70%↓", label: "소비 전력 절감" },
          { value: ">80%", label: "모터 효율" },
          { value: "PF>95%", label: "역률" },
        ],
        points: [
          "기존 PSC(유도) 모터 대비 소비 전력 최대 70% 절감 — SINKO GSRC 실증 사례",
          "스텝리스 아날로그 속도 제어로 체감 쾌적성 향상 및 소음 최소화",
          "Modbus/RS485 통신으로 BMS·BEMS와 통합 모니터링·원격 제어 가능",
        ],
        industries: ["주거용 건물", "호텔·호스피탈리티", "오피스 빌딩", "공공 인프라"],
      },
      {
        id: "ffu-app",
        name: "팬 필터 유닛 (FFU) · 클린룸",
        challenge: "반도체·바이오파마·의료 시설의 엄격한 청정도 유지 및 에너지 절감",
        highlight: "External Rotor ECM(OD102) + Centrifugal Fan → FFU System",
        models: ["OD102 External Rotor", "FFU-4×2", "FFU-4×4"],
        metrics: [
          { value: "IP55", label: "보호 등급" },
          { value: "ISO1~8", label: "클린룸 등급" },
          { value: "<10%", label: "THD-A (고조파)" },
        ],
        points: [
          "외전형 EC 모터 + 원심 팬 직결 구동으로 클린룸 소음·진동 최소화",
          "2×4 및 4×4 FFU 표준 타일 사이즈에 완벽 맞춤 — 반도체·바이오파마 즉시 적용",
          "THD-A < 10%의 낮은 고조파로 정밀 장비 EMI 간섭 최소화",
        ],
        industries: ["반도체 팹", "바이오파마·의료", "LCD/OLED 제조", "항공우주 MRO"],
      },
      {
        id: "ahu-app",
        name: "공기 조화 유닛 (AHU)",
        challenge: "대형 상업 건물·병원·데이터센터의 대용량 공조 에너지 최적화",
        highlight: "Internal Rotor ECM(D98/D125) + Blower → AHU System",
        models: ["D98 / D125 EC-PMSM", "AHU-#800", "AHU-#1600"],
        metrics: [
          { value: "800~1600", label: "CFM 범위" },
          { value: ">85%", label: "모터 효율(D125)" },
          { value: "RS485", label: "통신 프로토콜" },
        ],
        points: [
          "PWM 전력 제어 + RS485 통신으로 BAS/BEMS 통합 및 수요 응답(DR) 대응",
          "D125 이중축 모터로 AHU-#1600 대용량 공조 — 병원·호텔·데이터센터 최적",
          "Modbus 전력·운전 상태 실시간 모니터링으로 예지 보전(PM) 구현",
        ],
        industries: ["상업용 빌딩", "병원·헬스케어", "데이터센터", "공공 인프라"],
      },
    ],
    casesTitle: "도입 사례",
    casesSub: "TECO ECM이 적용된 글로벌 레퍼런스",
    ecmMarketTitle: "ECM 글로벌 시장 현황",
    ecmMarketSub: "2026년 USD 27.6B → 2032년 USD 41.9B (CAGR 7.2%)",
    ecmDownloadLabel: "ECM 카탈로그 PDF 다운로드",
    aboutTitle: "TECO Electric & Machinery 소개",
    aboutDesc:
      "TECO는 1956년 대만에서 설립된 글로벌 전기·기계 종합 제조사입니다 (TWSE 1504). 70년 헤리티지를 기반으로 산업용 모터 시장 대만 1위, 글로벌 Top 5의 위상을 확보했으며, 2024년 인수합병을 통해 변압기 사업으로 확장 중입니다. Westinghouse, Motovario, TEMICO 등 100개 글로벌 계열사와 함께 33개 사업장, 10개 제조 공장, 3개 혁신 센터를 운영. 그린 에너지·전동화·지능화의 토탈 솔루션 파트너로서 전 세계 25,000명 이상의 직원이 USD 2.2B+의 매출을 만들어내고 있습니다.",
    aboutMission: "Mission",
    missionText: "글로벌 전동화·지능화·그린에너지 실현의 핵심 동력으로서, 모터·배전·드라이브·드론 모터 등 전 라인업으로 지속가능한 미래를 함께 만들어갑니다.",
    aboutVision: "Vision",
    visionText: "Move to Lead — 70년의 헤리티지를 바탕으로 차세대 전동화 시대를 선도하는 글로벌 토탈 솔루션 기업.",
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
      headline: "Move to Lead",
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
      {
        id: "ecm-ir",
        name: "EC Motor (Internal Rotor)",
        nameEn: "EC Motor — Internal Rotor (D98 / D125)",
        tagline: "60W~750W · PMSM · FCU & AHU Optimized",
        desc: "Internal rotor EC motor based on permanent magnet synchronous motor (PMSM). D98 series (60~200W) for small FCUs and ducted fan coil units; D125 series (350~750W) for large AHUs and ducted air handling units. SVPWM & shaft current isolation for low vibration and noise. Closed-loop control maintains stable speed regardless of load or supply fluctuations.",
        lineup: [
          { model: "D98 (Single-Shaft)", spec: "60~200W · 1Ø 100~240Vac · 500~1550 RPM · Eff. >80% · FCU/FFU" },
          { model: "D125 (Dual-Shaft)", spec: "350~750W · 1Ø 220~240Vac · 500~1350 RPM · Eff. >85% · Ducted AHU" },
          { model: "D160 (External Drive)", spec: "600~1400W · 3Ø 220Vac · Launching 26Y Q4" },
          { model: "D180 (Integrated)", spec: "1800~2200W · 3Ø 380Vac · Launching 27Y Q1" },
        ],
        apps: ["Fan Coil Unit (FCU)", "Ducted Air Handling", "Small HVAC Units", "Energy Saving Retrofit"],
      },
      {
        id: "ecm-er",
        name: "EC Motor (External Rotor)",
        nameEn: "EC Motor — External Rotor (OD102 / OD180)",
        tagline: "60W~3700W · 2×4~4×4 FFU · Fan Wall Systems",
        desc: "External rotor EC motor designed for direct-drive centrifugal and axial fans. OD102 (60~350W) for 2×4 and 4×4 FFU and exhaust ventilation; OD180 (3000~3700W) for large fan wall systems and cooling towers. THD-A < 10%, full protection against overcurrent, over-temperature, and stall.",
        lineup: [
          { model: "OD102", spec: "60~350W · 1Ø 200~277Vac · 500~1600 RPM · 2×4/4×4 FFU" },
          { model: "OD138", spec: "300~750W · 1Ø 200~277Vac · Fan wall systems · Launching 26Y Q4" },
          { model: "OD150", spec: "1500~2200W · 3Ø 380Vac · Fan wall systems · Launching 27Y Q2" },
          { model: "OD180", spec: "3000~3700W · 3Ø 380Vac · 600~1800 RPM · Fan wall / Cooling towers" },
        ],
        apps: ["Fan Filter Unit (FFU)", "Cleanroom Fan Wall", "Exhaust Ventilation", "Cooling Towers"],
      },
      {
        id: "ecm-drv",
        name: "EC Driver Board",
        nameEn: "EC Driver Board",
        tagline: "1Ø 100~240Vac · 3-speed / Analog / Communication",
        desc: "Standalone driver board for EC motor makers. Universal single-phase 100~240Vac input, ±10% voltage tolerance. Motor speed control 500~1300 RPM, torque range 9.8 kg·cm. Supports 3-speed / analog / RS485 communication control modes. Built-in overcurrent, over-temperature, and stall protection.",
        lineup: [
          { model: "Driver Board", spec: "1Ø 100~240Vac · 50/60Hz · Max current 1.4A (at 100V)" },
          { model: "Speed Control", spec: "500~1300 RPM ±10 RPM · Torque 9.8 kg·cm (500~1200 RPM)" },
          { model: "Control Modes", spec: "3-speed / Analog / RS485 communication" },
        ],
        apps: ["EC Motor Makers", "FCU Manufacturers", "FFU Manufacturers", "Small HVAC OEM"],
      },
      {
        id: "ecm-int",
        name: "ECM Integrated Module",
        nameEn: "ECM (Integrated Motor + Drive)",
        tagline: "1φ 100~240Vac · PMSM · Dual-Shaft All-in-One",
        desc: "ECM module integrating motor and drive into a single unit, minimizing system design complexity for FCU/FFU/AHU makers. Closed-loop control delivers stable speed regardless of load or supply variations. Built-in Modbus, current, voltage, power, and operation status monitoring with remote control capability.",
        lineup: [
          { model: "ECM (Dual-Shaft)", spec: "1φ 100~240Vac · 500~1300 RPM ± 10 RPM" },
          { model: "Torque Control", spec: "9.8 kg·cm (500~1200 RPM)" },
          { model: "Communication", spec: "Modbus · Analog · PWM speed control" },
        ],
        apps: ["FCU/FFU/AHU Integration", "Universal Small HVAC", "Energy-Saving Retrofit", "OEM Module Supply"],
      },
      {
        id: "fcu",
        name: "Fan Coil Unit (FCU)",
        nameEn: "Fan Coil Unit — FCU-#300 / FCU-#600",
        tagline: "300~600 CFM · CE Certified · Modbus",
        desc: "TECO ECM-integrated fan coil unit. Single-phase 100~240Vac input with 3-speed / stepless analog / communication control. FCU-#300 (single-shaft, 300 CFM, 20~60W) for small HVAC; FCU-#600 (dual-shaft, 600 CFM, 60~130W) for medium ducted fan coil. CE certified with Modbus power and operation monitoring.",
        lineup: [
          { model: "FCU-#300 (Single-Shaft)", spec: "D98 EC-PMSM · 20~60W · 300 CFM · IP54 · CE" },
          { model: "FCU-#600 (Dual-Shaft)", spec: "D98 EC-PMSM · 60~130W · 600 CFM · IP54 · CE" },
          { model: "Common Spec", spec: "1Ø 100~240V · 500~1550 RPM · THD-A < 15% · PF > 95%" },
        ],
        apps: ["Residential Buildings", "Hotels & Hospitality", "Office Buildings", "Small HVAC"],
      },
      {
        id: "ffu",
        name: "Fan Filter Unit (FFU)",
        nameEn: "Fan Filter Unit — FFU-4×2 / FFU-4×4",
        tagline: "350~1580 CFM · Cleanroom IP55 · RS485",
        desc: "ECM FFU optimized for cleanrooms, biopharma, and medical environments. FFU-4×2 (internal rotor Ø98, 170W, 350 CFM) for 2×4 cleanroom tiles; FFU-4×4 (external rotor Ø102, 350W, 1580 CFM) for large clean zones. IP55, 5-speed/VR/RS485 control, full over-temperature/over-voltage/stall protection.",
        lineup: [
          { model: "FFU-4×2", spec: "Internal Ø98 · 170W max · 350 CFM (950rpm/150Pa) · IP55" },
          { model: "FFU-4×4", spec: "External Ø102 · 350W max · 1580 CFM (1350rpm/150Pa) · IP55" },
          { model: "Common Spec", spec: "1Ø 200~277V · THD-A < 15% · Modbus/RS485" },
        ],
        apps: ["Cleanrooms", "Biopharma & Medical", "Semiconductor Manufacturing", "Local Clean Zones"],
      },
      {
        id: "ahu",
        name: "Air Handling Unit (AHU)",
        nameEn: "Air Handling Unit — AHU-#800 / AHU-#1600",
        tagline: "800~1600 CFM · PWM/RS485 · Commercial",
        desc: "ECM AHU for large commercial buildings, public infrastructure, and healthcare facilities. AHU-#800 (single-shaft, 800 CFM, 30~240W) for mid-size HVAC; AHU-#1600 (dual-shaft, 1600 CFM, 50~500W) for large buildings and hospitals. PWM power control + RS485 communication, efficiency >80%, PF > 95%, THD-A < 15%.",
        lineup: [
          { model: "AHU-#800 (Single-Shaft)", spec: "D98 EC-PMSM · 30~240W · 800 CFM · IP54 · 1.1A" },
          { model: "AHU-#1600 (Dual-Shaft)", spec: "D125 EC-PMSM · 50~500W · 1600 CFM · IP54 · 2.5A" },
          { model: "Common Spec", spec: "1Ø 200~240V · 500~1350 RPM · Modbus/RS485" },
        ],
        apps: ["Commercial Buildings", "Hotels & Public Facilities", "Hospitals & Healthcare", "Data Center HVAC"],
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
      {
        id: "fcu-app",
        name: "Fan Coil Unit (FCU)",
        challenge: "Improve HVAC energy efficiency in residential, commercial, and public buildings; replace PSC motors",
        highlight: "EC Motor (D98) + Driver Board → FCU System",
        models: ["D98 EC-PMSM", "FCU-#300", "FCU-#600"],
        metrics: [
          { value: "70%↓", label: "Power Savings" },
          { value: ">80%", label: "Motor Efficiency" },
          { value: "PF>95%", label: "Power Factor" },
        ],
        points: [
          "Up to 70% power reduction vs. conventional PSC induction motors — proven by SINKO GSRC",
          "Stepless analog speed control for enhanced comfort and minimal noise",
          "Modbus/RS485 integration with BMS/BEMS for centralized monitoring and remote control",
        ],
        industries: ["Residential Buildings", "Hotels & Hospitality", "Office Buildings", "Public Infrastructure"],
      },
      {
        id: "ffu-app",
        name: "Fan Filter Unit (FFU) · Cleanroom",
        challenge: "Maintain strict cleanliness standards in semiconductor, biopharma, and medical facilities",
        highlight: "External Rotor ECM (OD102) + Centrifugal Fan → FFU System",
        models: ["OD102 External Rotor", "FFU-4×2", "FFU-4×4"],
        metrics: [
          { value: "IP55", label: "Protection Class" },
          { value: "ISO1~8", label: "Cleanroom Class" },
          { value: "<10%", label: "THD-A" },
        ],
        points: [
          "External rotor ECM direct-drive centrifugal fan minimizes cleanroom noise and vibration",
          "Fits standard 2×4 and 4×4 FFU tile sizes for instant deployment in semiconductor and biopharma fabs",
          "THD-A < 10% reduces EMI interference with precision equipment",
        ],
        industries: ["Semiconductor Fabs", "Biopharma & Medical", "LCD/OLED Manufacturing", "Aerospace MRO"],
      },
      {
        id: "ahu-app",
        name: "Air Handling Unit (AHU)",
        challenge: "Optimize energy for large-scale HVAC in commercial buildings, hospitals, and data centers",
        highlight: "Internal Rotor ECM (D98/D125) + Blower → AHU System",
        models: ["D98 / D125 EC-PMSM", "AHU-#800", "AHU-#1600"],
        metrics: [
          { value: "800~1600", label: "CFM Range" },
          { value: ">85%", label: "Motor Efficiency" },
          { value: "RS485", label: "Communication" },
        ],
        points: [
          "PWM power control + RS485 for BAS/BEMS integration and demand response",
          "D125 dual-shaft motor powers AHU-#1600 for large hospitals, hotels, and data centers",
          "Modbus real-time monitoring of power, current, voltage for predictive maintenance",
        ],
        industries: ["Commercial Buildings", "Hospitals & Healthcare", "Data Centers", "Public Infrastructure"],
      },
    ],
    casesTitle: "Success Cases",
    casesSub: "Global references where TECO ECM is deployed",
    ecmMarketTitle: "ECM Global Market Overview",
    ecmMarketSub: "USD 27.6B (2026) → USD 41.9B (2032) at CAGR 7.2%",
    ecmDownloadLabel: "Download ECM Catalog PDF",
    aboutTitle: "About TECO Electric & Machinery",
    aboutDesc:
      "TECO is a global electrical and mechanical manufacturer founded in Taiwan in 1956 (TWSE 1504). Backed by 70 years of heritage, TECO holds the No.1 position in industrial motors in Taiwan and is among the global Top 5; it expanded into transformers via 2024 M&A. Together with 100 affiliates including Westinghouse, Motovario, and TEMICO, TECO operates 33 business sites, 10 manufacturing plants, and 3 innovation centers worldwide. As a total solution partner for green energy, electrification, and intelligence, 25,000+ employees deliver USD 2.2B+ in annual revenue.",
    aboutMission: "Mission",
    missionText: "As the key driver of global electrification, intelligence, and green energy, we shape a sustainable future through a complete lineup of motors, power distribution, drives, and drone motors.",
    aboutVision: "Vision",
    visionText: "Move to Lead — Building on 70 years of heritage to lead the next generation of electrification as a global total-solution provider.",
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
      headline: "Move to Lead\n开创新局",
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
      {
        id: "ecm-ir",
        name: "EC 电机（内转子）",
        nameEn: "EC Motor — Internal Rotor (D98 / D125)",
        tagline: "60W~750W · PMSM · FCU & AHU 专用",
        desc: "基于永磁同步电机（PMSM）的内转子 EC 电机。D98 系列（60~200W）用于小型 FCU 及管道式风机盘管，D125 系列（350~750W）用于大型 AHU 及管道式空调机组。SVPWM 与轴电流隔离设计，实现低振动、低噪音。闭环控制，无论负载或电源波动均可保持稳定转速。",
        lineup: [
          { model: "D98（单轴）", spec: "60~200W · 1Ø 100~240Vac · 500~1550 RPM · 效率 >80% · FCU/FFU" },
          { model: "D125（双轴）", spec: "350~750W · 1Ø 220~240Vac · 500~1350 RPM · 效率 >85% · 管道 AHU" },
          { model: "D160（外置驱动）", spec: "600~1400W · 3Ø 220Vac · 预计 26Q4 上市" },
          { model: "D180（一体式）", spec: "1800~2200W · 3Ø 380Vac · 预计 27Q1 上市" },
        ],
        apps: ["风机盘管(FCU)", "管道式空调", "小型空调机组", "节能改造"],
      },
      {
        id: "ecm-er",
        name: "EC 电机（外转子）",
        nameEn: "EC Motor — External Rotor (OD102 / OD180)",
        tagline: "60W~3700W · 2×4~4×4 FFU · 风墙系统",
        desc: "外转子结构 EC 电机，可直驱离心风机和轴流风机。OD102（60~350W）用于 2×4 及 4×4 FFU 及排风单元；OD180（3000~3700W）用于大型风墙系统及冷却塔。THD-A < 10%，具备完整的过流、过温、堵转保护。",
        lineup: [
          { model: "OD102", spec: "60~350W · 1Ø 200~277Vac · 500~1600 RPM · 2×4/4×4 FFU" },
          { model: "OD138", spec: "300~750W · 1Ø 200~277Vac · 风墙系统 · 预计 26Q4 上市" },
          { model: "OD150", spec: "1500~2200W · 3Ø 380Vac · 风墙系统 · 预计 27Q2 上市" },
          { model: "OD180", spec: "3000~3700W · 3Ø 380Vac · 600~1800 RPM · 风墙/冷却塔" },
        ],
        apps: ["风扇过滤机组(FFU)", "洁净室风墙", "排风机组", "冷却塔"],
      },
      {
        id: "ecm-drv",
        name: "EC 驱动板",
        nameEn: "EC Driver Board",
        tagline: "1Ø 100~240Vac · 3档速/模拟/通信控制",
        desc: "面向 EC 电机制造商的独立驱动板。单相 100~240Vac 通用输入，±10% 电压容差。电机转速控制 500~1300 RPM，转矩范围 9.8 kg·cm。支持 3 档速度 / 模拟 / RS485 通信三种控制模式，内置过流、过温、堵转全保护。",
        lineup: [
          { model: "驱动板", spec: "1Ø 100~240Vac · 50/60Hz · 最大电流 1.4A（100V）" },
          { model: "转速控制", spec: "500~1300 RPM ±10 RPM · 转矩 9.8 kg·cm（500~1200 RPM）" },
          { model: "控制模式", spec: "3 档速度 / 模拟 / RS485 通信" },
        ],
        apps: ["EC 电机制造商", "FCU 制造商", "FFU 制造商", "小型空调 OEM"],
      },
      {
        id: "ecm-int",
        name: "ECM 一体化模块",
        nameEn: "ECM (Integrated Motor + Drive)",
        tagline: "1φ 100~240Vac · PMSM · 双轴一体化",
        desc: "将电机与驱动器集成于单一单元的 ECM 模块，最大程度降低 FCU/FFU/AHU 制造商的系统设计复杂度。闭环控制，无论负载或电源变动均可稳定运行。内置 Modbus、电流、电压、功率、运行状态监控及远程控制功能。",
        lineup: [
          { model: "ECM（双轴）", spec: "1φ 100~240Vac · 500~1300 RPM ± 10 RPM" },
          { model: "转矩控制", spec: "9.8 kg·cm（500~1200 RPM）" },
          { model: "通信", spec: "Modbus · 模拟 · PWM 调速" },
        ],
        apps: ["FCU/FFU/AHU 系统集成", "通用小型空调", "节能改造", "OEM 模块供应"],
      },
      {
        id: "fcu",
        name: "风机盘管机组 (FCU)",
        nameEn: "Fan Coil Unit — FCU-#300 / FCU-#600",
        tagline: "300~600 CFM · CE 认证 · Modbus 通信",
        desc: "TECO ECM 一体化风机盘管机组。单相 100~240Vac 输入，支持 3 档速度/无级模拟/通信控制。FCU-#300（单轴，300CFM，20~60W）适用于小型空调单元，FCU-#600（双轴，600CFM，60~130W）适用于中型管道风机盘管。CE 认证，含 Modbus 功率与运行监控。",
        lineup: [
          { model: "FCU-#300（单轴）", spec: "D98 EC-PMSM · 20~60W · 300 CFM · IP54 · CE" },
          { model: "FCU-#600（双轴）", spec: "D98 EC-PMSM · 60~130W · 600 CFM · IP54 · CE" },
          { model: "通用规格", spec: "1Ø 100~240V · 500~1550 RPM · THD-A < 15% · PF > 95%" },
        ],
        apps: ["住宅楼", "酒店·款待业", "办公楼", "小型空调"],
      },
      {
        id: "ffu",
        name: "风扇过滤机组 (FFU)",
        nameEn: "Fan Filter Unit — FFU-4×2 / FFU-4×4",
        tagline: "350~1580 CFM · 洁净室 IP55 · RS485",
        desc: "针对洁净室、生物制药及医疗环境优化的 ECM FFU。FFU-4×2（内转子 Ø98，170W，350CFM）用于 2×4 洁净室天花板；FFU-4×4（外转子 Ø102，350W，1580CFM）用于大面积洁净区。IP55，5 档速/VR/RS485 通信控制，内置过温、过压、堵转全保护。",
        lineup: [
          { model: "FFU-4×2", spec: "内转子 Ø98 · 170W max · 350 CFM（950rpm/150Pa）· IP55" },
          { model: "FFU-4×4", spec: "外转子 Ø102 · 350W max · 1580 CFM（1350rpm/150Pa）· IP55" },
          { model: "通用规格", spec: "1Ø 200~277V · THD-A < 15% · Modbus/RS485" },
        ],
        apps: ["洁净室", "生物制药·医疗", "半导体制造", "局部洁净区"],
      },
      {
        id: "ahu",
        name: "空气处理机组 (AHU)",
        nameEn: "Air Handling Unit — AHU-#800 / AHU-#1600",
        tagline: "800~1600 CFM · PWM/RS485 · 商业用",
        desc: "大型商业建筑、公共基础设施及医疗机构用 ECM AHU。AHU-#800（单轴，800CFM，30~240W）用于中型空调，AHU-#1600（双轴，1600CFM，50~500W）用于大型建筑与医院。PWM 功率控制 + RS485 通信，效率 >80%，PF > 95%，THD-A < 15%。",
        lineup: [
          { model: "AHU-#800（单轴）", spec: "D98 EC-PMSM · 30~240W · 800 CFM · IP54 · 1.1A" },
          { model: "AHU-#1600（双轴）", spec: "D125 EC-PMSM · 50~500W · 1600 CFM · IP54 · 2.5A" },
          { model: "通用规格", spec: "1Ø 200~240V · 500~1350 RPM · Modbus/RS485" },
        ],
        apps: ["商业楼宇", "酒店·公共设施", "医院·医疗", "数据中心空调"],
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
      {
        id: "fcu-app",
        name: "风机盘管机组 (FCU)",
        challenge: "提升住宅、商业及公共建筑 HVAC 能源效率，替换 PSC 感应电机",
        highlight: "EC 电机 (D98) + 驱动板 → FCU 系统",
        models: ["D98 EC-PMSM", "FCU-#300", "FCU-#600"],
        metrics: [
          { value: "70%↓", label: "节电率" },
          { value: ">80%", label: "电机效率" },
          { value: "PF>95%", label: "功率因数" },
        ],
        points: [
          "与传统 PSC 感应电机相比节电最高达 70%——SINKO GSRC 实证案例",
          "无级模拟调速提升体感舒适度并将噪音降至最低",
          "Modbus/RS485 通信与 BMS/BEMS 集成，实现集中监控与远程控制",
        ],
        industries: ["住宅楼", "酒店与款待业", "办公楼", "公共基础设施"],
      },
      {
        id: "ffu-app",
        name: "风扇过滤机组 (FFU) · 洁净室",
        challenge: "维持半导体、生物制药、医疗设施严格的洁净度，同时节能",
        highlight: "外转子 ECM (OD102) + 离心风机 → FFU 系统",
        models: ["OD102 外转子", "FFU-4×2", "FFU-4×4"],
        metrics: [
          { value: "IP55", label: "防护等级" },
          { value: "ISO1~8", label: "洁净室等级" },
          { value: "<10%", label: "THD-A" },
        ],
        points: [
          "外转子 EC 电机直驱离心风机，洁净室噪音与振动降至最低",
          "完美匹配 2×4 及 4×4 FFU 标准尺寸，即插即用于半导体及生物制药厂",
          "THD-A < 10%，将对精密设备的 EMI 干扰降至最低",
        ],
        industries: ["半导体晶圆厂", "生物制药·医疗", "LCD/OLED 制造", "航空航天 MRO"],
      },
      {
        id: "ahu-app",
        name: "空气处理机组 (AHU)",
        challenge: "大型商业建筑、医院、数据中心的大容量空调能耗优化",
        highlight: "内转子 ECM (D98/D125) + 鼓风机 → AHU 系统",
        models: ["D98 / D125 EC-PMSM", "AHU-#800", "AHU-#1600"],
        metrics: [
          { value: "800~1600", label: "CFM 范围" },
          { value: ">85%", label: "电机效率" },
          { value: "RS485", label: "通信协议" },
        ],
        points: [
          "PWM 功率控制 + RS485 实现 BAS/BEMS 集成与需求响应 (DR)",
          "D125 双轴电机驱动 AHU-#1600，适用于医院、酒店、数据中心大型空调",
          "Modbus 实时监控功率、运行状态，实现预测性维护 (PM)",
        ],
        industries: ["商业楼宇", "医院·医疗", "数据中心", "公共基础设施"],
      },
    ],
    casesTitle: "导入案例",
    casesSub: "采用 TECO ECM 的全球参考案例",
    ecmMarketTitle: "ECM 全球市场概况",
    ecmMarketSub: "2026 年 USD 27.6B → 2032 年 USD 41.9B（CAGR 7.2%）",
    ecmDownloadLabel: "下载 ECM 产品目录 PDF",
    aboutTitle: "TECO 东元电机简介",
    aboutDesc:
      "TECO 是 1956 年于台湾创立的全球电气机械综合制造商（TWSE 1504）。凭借 70 年的传承，TECO 在台湾工业电机市场排名第 1，全球前 5；2024 年通过并购扩展至变压器领域。与 Westinghouse、Motovario、TEMICO 等 100 家全球关联企业一同运营 33 个营业据点、10 个生产基地、3 个创新中心。作为绿色能源、电动化、智能化的整体解决方案合作伙伴，全球 25,000+ 名员工创造 USD 2.2B+ 营收。",
    aboutMission: "使命",
    missionText: "作为全球电动化、智能化、绿色能源的核心驱动力，以电机、配电、驱动、无人机电机的全系列共建可持续的未来。",
    aboutVision: "愿景",
    visionText: "Move to Lead 开创新局——以 70 年传承为基础，引领下一代电动化时代的全球整体解决方案企业。",
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

const ECM_CASES = [
  {
    client: "SINKO Industries",
    country: "JP",
    flag: "🇯🇵",
    product: "TECO ECM (D98 Internal Rotor)",
    models: ["GSRC Fan Coil Unit", "GTCRH Fan Coil Unit"],
    saving: "70%",
    savingLabel: { ko: "에너지 절감", en: "Energy Saved", zh: "节能率" },
    desc: {
      ko: "일본 공조 전문기업 SINKO Industries가 TECO ECM을 탑재한 에너지 절약형 FCU를 출시. 기존 AC 모터 대비 최대 70% 소비 전력 절감 달성 (Lo 운전 기준). BLAC PMSM 모터로 고효율 달성, 컨트롤러 일체화로 교체 편의성 극대화.",
      en: "Japan-based HVAC specialist SINKO Industries launched energy-saving FCUs powered by TECO ECM. Achieved up to 70% power reduction vs. conventional AC motors (Lo-speed operation). BLAC PMSM motor delivers high efficiency; integrated controller simplifies replacement.",
      zh: "日本空调专业企业 SINKO Industries 采用 TECO ECM 推出节能型 FCU。与传统交流电机相比（Lo 运行），用电量最高降低 70%。BLAC PMSM 电机实现高效率，控制器一体化简化更换作业。",
    },
    tags: { ko: ["팬 코일 유닛", "에너지 절약", "BLAC PMSM", "일본 레퍼런스"], en: ["Fan Coil Unit", "Energy Saving", "BLAC PMSM", "Japan Reference"], zh: ["风机盘管", "节能", "BLAC PMSM", "日本案例"] },
  },
];

const PRODUCT_THUMB: Record<string, { label: string; gradient: string }> = {
  contactor:  { label: "AC",  gradient: "from-blue-600 to-blue-800" },
  overload:   { label: "OL",  gradient: "from-orange-500 to-orange-700" },
  breaker:    { label: "CB",  gradient: "from-slate-600 to-slate-800" },
  drone:      { label: "DM",  gradient: "from-sky-500 to-indigo-700" },
  uav:        { label: "UAV", gradient: "from-emerald-600 to-teal-700" },
  esc:        { label: "ESC", gradient: "from-purple-600 to-fuchsia-700" },
  "ecm-ir":   { label: "ECM", gradient: "from-teal-500 to-cyan-700" },
  "ecm-er":   { label: "ECM", gradient: "from-cyan-500 to-blue-600" },
  "ecm-drv":  { label: "DRV", gradient: "from-indigo-500 to-violet-700" },
  "ecm-int":  { label: "ECM", gradient: "from-blue-500 to-teal-600" },
  fcu:        { label: "FCU", gradient: "from-orange-500 to-rose-600" },
  ffu:        { label: "FFU", gradient: "from-lime-600 to-emerald-700" },
  ahu:        { label: "AHU", gradient: "from-violet-600 to-purple-800" },
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
                {/* Power Distribution & Drone group label */}
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 pt-1 pb-0.5">
                  {locale === "ko" ? "배전 & 드론" : locale === "en" ? "Power Dist. & Drone" : "配电 & 无人机"}
                </p>
                {c.products.filter(p => ["contactor","overload","breaker","drone","uav","esc"].includes(p.id)).map((p) => {
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
                {/* ECM group label */}
                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest px-3 pt-3 pb-0.5">
                  {locale === "ko" ? "ECM · HVAC 솔루션" : locale === "en" ? "ECM · HVAC Solutions" : "ECM · 暖通空调解决方案"}
                </p>
                {c.products.filter(p => !["contactor","overload","breaker","drone","uav","esc"].includes(p.id)).map((p) => {
                  const thumb = PRODUCT_THUMB[p.id];
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveProduct(p.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                        activeProduct === p.id
                          ? "bg-teal-900 text-white shadow-md"
                          : "text-slate-600 hover:bg-teal-50"
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
                    <span className={`w-9 h-9 rounded-lg shrink-0 bg-gradient-to-br ${SOLUTION_VISUAL[sol.id].gradient} text-white p-2 flex items-center justify-center`}>
                      {SOLUTION_VISUAL[sol.id].icon}
                    </span>
                    <span className="leading-snug">{sol.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: solution detail */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${SOLUTION_VISUAL[currentSolution.id].gradient}`}>
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 text-white/30">
                    {SOLUTION_VISUAL[currentSolution.id].icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-black text-white mb-1 drop-shadow-lg">{currentSolution.name}</h3>
                    <p className="text-white/85 text-xs drop-shadow">{currentSolution.challenge}</p>
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

      {/* ══ SECTION 3.5: ECM MARKET + SUCCESS CASES ══ */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          {/* ECM Market Stats */}
          <div className="mb-12">
            <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-2">ECM Global Market</p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">{c.ecmMarketTitle}</h2>
            <p className="text-slate-500 text-sm mb-8">{c.ecmMarketSub}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "$27.6B", label: locale === "ko" ? "2026 시장 규모" : locale === "en" ? "2026 Market Size" : "2026 年市场规模" },
                { value: "7.2%", label: "CAGR 2025–2032" },
                { value: "40%", label: locale === "ko" ? "북미 점유율" : locale === "en" ? "North America Share" : "北美份额" },
                { value: "$41.9B", label: locale === "ko" ? "2032 전망" : locale === "en" ? "2032 Forecast" : "2032 年预测" },
              ].map((stat) => (
                <div key={stat.label} className="bg-teal-50 rounded-2xl p-5 text-center border border-teal-100">
                  <div className="text-2xl font-black text-teal-700 mb-1">{stat.value}</div>
                  <div className="text-xs text-teal-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Cases */}
          <div>
            <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-2">Case Study</p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">{c.casesTitle}</h2>
            <p className="text-slate-500 text-sm mb-8">{c.casesSub}</p>
            <div className="grid md:grid-cols-1 gap-6">
              {ECM_CASES.map((cs) => (
                <div key={cs.client} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="flex flex-col md:flex-row">
                    {/* Left: key metric */}
                    <div className="md:w-48 shrink-0 bg-gradient-to-br from-teal-600 to-cyan-700 p-8 flex flex-col items-center justify-center text-center">
                      <span className="text-5xl mb-3">{cs.flag}</span>
                      <div className="text-3xl font-black text-white mb-1">{cs.saving}</div>
                      <div className="text-teal-200 text-xs font-semibold">{cs.savingLabel[locale]}</div>
                      <div className="mt-4 text-white text-sm font-bold">{cs.client}</div>
                      <div className="text-teal-200 text-xs mt-0.5">{cs.country}</div>
                    </div>
                    {/* Right: detail */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cs.tags[locale].map((tag) => (
                          <span key={tag} className="text-xs bg-teal-50 border border-teal-200 text-teal-700 px-2.5 py-0.5 rounded-full font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed mb-5">{cs.desc[locale]}</p>
                      <div className="border-t border-slate-100 pt-4">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                          {locale === "ko" ? "적용 제품" : locale === "en" ? "Applied Products" : "应用产品"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cs.models.map((m) => (
                            <span key={m} className="font-mono text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
            <a
              href="/docs/TECO-ECM-Profile.pdf"
              download
              className="bg-teal-500 hover:bg-teal-400 text-white border border-teal-400/30 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
                <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
              {c.ecmDownloadLabel}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
