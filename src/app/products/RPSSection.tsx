"use client";

// RPS(Remote Plasma Source) 수리·오버홀 사업 섹션.
// MKS ASTRON / PARAGON / R*evolution 등 원격 플라즈마 소스의 수리·오버홀 서비스를 소개한다.

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/dictionaries";
import { FAQ_RPS } from "./rps-faq";

/* ─────────────────────────────────────────────
   SHARED MODEL DATA (언어 무관 — PN·툴은 공통)
───────────────────────────────────────────── */

interface RpsModel {
  id: string;
  family: string;      // MKS 브랜드 모델명
  alias: string;       // 별칭 (RPS 2L 등)
  process: "on-wafer" | "clean"; // 웨이퍼 유무
  abbr: string;
  image: string;       // 원본 제안서에서 추출한 실제 사진 (원본 해상도)
  pns: string[];       // 대응 파트넘버
  tools: string[];     // 주로 사용되는 장비 / 참조 PN
}

const MODELS: RpsModel[] = [
  {
    id: "revolution",
    family: "MKS R*evolution",
    alias: "REVOLUTION R1 / R3 / R5",
    process: "on-wafer",
    abbr: "REV",
    image: "/images/rps/rps-revolution.jpg",
    pns: [
      "AX7690PSK R1", "AX7690LAM R1",
      "AX7695PSK R3", "AX7695LAM R3", "AX7695TEL R3",
      "AX7696 R5", "and all similar PNs",
    ],
    tools: ["Etch", "Ashing", "PR Strip", "PR Strip (Asher) — Etch Dept."],
  },
  {
    id: "paragon",
    family: "MKS PARAGON",
    alias: "PARAGON",
    process: "clean",
    abbr: "PGN",
    image: "/images/rps/rps-paragon.jpg",
    pns: ["AX7700", "AX7710"],
    tools: ["Thin Film", "CVD", "Etch"],
  },
  {
    id: "astron-2l",
    family: "MKS ASTRON TM / 2L",
    alias: "MKS RPS 2L",
    process: "clean",
    abbr: "2L",
    image: "/images/rps/rps-astron-2l.jpg",
    pns: [
      "AX7651", "AX7651-2", "FI20620", "FI20620-1", "FI20620-01",
      "AX7657", "AX7657-2", "AX7658",
      "AX7670-21", "AX7670-60", "AX7670-80", "AX7670-85", "AX7671-85",
      "and all similar PNs",
    ],
    tools: [
      "Thin Film · CVD · Etch",
      "AMAT Producer SE 0920-00013",
      "ASM 0190-71842",
      "AMAT 0190-41326 (AX7657-85)",
    ],
  },
  {
    id: "astron-3l",
    family: "MKS ASTRON-I / 3L",
    alias: "MKS RPS 3L",
    process: "clean",
    abbr: "3L",
    image: "/images/rps/rps-astron-3l.jpg",
    pns: [
      "AX7670", "AX7670-21", "AX7670-60", "AX7645-01",
      "AX7670-02", "AX7670-06", "AX7670-12", "AX7670-16",
      "AX7670-19", "AX7670-20",
      "FI80132", "FI80133", "FI80620-1", "and all similar PNs",
    ],
    tools: [
      "Thin Film · CVD · Etch",
      "AMAT HDP 0190-26744",
      "0920-00092",
    ],
  },
  {
    id: "astron-6l",
    family: "MKS ASTRON-EX / 6L · 8L",
    alias: "MKS RPS 6L",
    process: "clean",
    abbr: "6L",
    image: "/images/rps/rps-astron-6l.jpg",
    pns: [
      "AX7658-20", "AX7685-01", "AX7685-20", "AX7685-30", "AX7685-33",
      "AX7685-85", "AX7685-91", "FI80131", "AX7645RHL-35", "AX7635-03",
      "AX7685", "FI80130", "FI80133", "and all similar PNs",
    ],
    tools: [
      "Thin Film · CVD · Etch",
      "AMAT PRODUCER",
      "LAM NOVELLUS HDP 0920-01124",
      "AMAT 0190-40602(W) · ASTRON e/ex",
      "ASTRONex 6&8L · 0190-51222",
    ],
  },
  {
    id: "astron-15l",
    family: "MKS ASTRON-HF / 15L · HF+ / 22L",
    alias: "MKS RPS 15L / 22L",
    process: "clean",
    abbr: "15L",
    image: "/images/rps/rps-astron-15l.jpg",
    pns: [
      "AX7645PS-01", "AX7645PS-02", "AX7645PS-10",
      "AX7645RH-01", "AX7645RH-02", "AX7645RH-06", "AX7645RH-10", "AX7645RH-20",
      "AX7640", "FI80146", "AX7635", "AX7635-03", "and all similar PNs",
    ],
    tools: [
      "Thin Film · CVD · Etch",
      "LAM NOVELLUS HDP",
      "15L Astron HFS · AX7645RH-06",
      "PN: 27-361666-00 (RH)",
    ],
  },
  {
    id: "rps-30l",
    family: "MKS RPS 30L",
    alias: "RPS 30L",
    process: "clean",
    abbr: "30L",
    image: "/images/rps/rps-30l.jpg",
    pns: ["AX7667-10", "AX7667-03", "AX7665-02", "AX7667-04W", "and all similar PNs"],
    tools: ["Thin Film · CVD · Etch"],
  },
];

/* ─────────────────────────────────────────────
   LOCALIZED CONTENT
───────────────────────────────────────────── */

const LANG = {
  ko: {
    hero: {
      eyebrow: "MKS 원격 플라즈마 소스(RPS) 수리·오버홀 전문 · OHI Tech",
      headline: "RPS 수리·오버홀,\n다시 새것처럼.",
      sub: "MKS ASTRON · PARAGON · R*evolution 전 모델의 원격 플라즈마 소스(Remote Plasma Source)를 진단·수리·오버홀합니다. 수리 후 COA(Certificate of Analysis) 서비스 리포트를 함께 제공합니다.",
      cta1: "수리 견적 문의",
      cta2: "대응 모델 확인",
      stats: [
        { value: "MKS 전 모델", label: "ASTRON · PARAGON · R*evolution" },
        { value: "100+ PN", label: "대응 파트넘버" },
        { value: "4대 Fail Mode", label: "근본 원인 진단" },
        { value: "COA 리포트", label: "수리 후 검사 성적서" },
      ],
    },
    // What is RPS
    whatTitle: "RPS(Remote Plasma Source)란?",
    whatBody:
      "RPS(원격 플라즈마 소스)는 별도로 격리된 챔버에서 플라즈마를 생성한 뒤, 가이드된 이송 구간(Transport Region)을 통해 공정 챔버로 전달하는 장치입니다. 반도체 공정에서 챔버 세정과 PR(포토레지스트) 제거에 핵심적으로 사용됩니다.",
    whyTitle: "RPS는 왜 사용되나요?",
    whyModes: [
      {
        tag: "Chamber Clean RPS",
        note: "웨이퍼 없이 (Without Wafer)",
        title: "챔버 세정",
        body:
          "반도체 공정에서 가스 증착은 웨이퍼뿐 아니라 챔버 내부 부품에도 원치 않는 증착을 남깁니다. 이 증착물이 쌓이면 챔버 오염으로 이어져 칩 결함의 원인이 됩니다. RPS로 주기적으로 플라즈마를 생성해 메인 챔버 내부를 세정하고, 잔류물을 제거해 공정 안정성을 유지합니다.",
        models: "ASTRON · PARAGON 계열",
      },
      {
        tag: "Process RPS",
        note: "웨이퍼 있음 (With Wafer)",
        title: "PR 제거 (Etch · Ashing · PR Strip)",
        body:
          "Etch·Ashing·PR Strip 공정에서 웨이퍼 상의 포토레지스트(PR)를 제거하기 위해 RPS를 사용합니다. On-Wafer 공정에 최적화된 R*evolution 계열이 대표적입니다.",
        models: "R*evolution (R1 / R3 / R5) 계열",
      },
    ],
    // Models section
    modelsTitle: "수리 대응 MKS 모델",
    modelsSub: "MKS ASTRON·PARAGON·R*evolution 전 모델의 파트넘버를 대응합니다. 보유하신 장비 PN으로 문의해 주세요.",
    processLabels: { "on-wafer": "On-Wafer (웨이퍼 있음)", clean: "Chamber Clean (웨이퍼 없음)" },
    pnHeader: "대응 파트넘버 (All PNs)",
    toolHeader: "주 사용 장비 / 참조 PN",
    modelCta: "이 모델 수리 문의",
    // Fail modes
    failTitle: "우리가 잡는 4대 Fail Mode",
    failSub: "OHI Tech는 증상만 보지 않고 근본 원인을 진단해 재발을 막습니다.",
    failModes: [
      {
        id: "ac-dc",
        name: "AC LINE · DC BUS Fail",
        cause:
          "AC 입력 / DC 버스 전압 이상은 대개 전력 소자 문제에서 발생합니다. Fuse BD·Power BD·Booster BD를 점검하고 불량 부품을 교체한 뒤 오버홀로 복구합니다.",
      },
      {
        id: "source-leak",
        name: "Source Leak",
        cause:
          "장기 운전 후 소스 리크가 발생할 수 있습니다. 경험상 O-ring 식각 + Reactor 식각 이후 소스 리크 확률이 높으므로, O-ring과 Reactor의 식각 여부를 우선 확인합니다.",
      },
      {
        id: "ignition",
        name: "Ignition Fault",
        cause:
          "각 섹션 보드(B/D) 불량이 주원인이 될 수 있으며, 그 외 다양한 원인이 존재합니다. Block 또는 Quartz와 Reactor가 주된 원인입니다.",
      },
      {
        id: "particle",
        name: "Particle Fail",
        cause: "Block 오염 또는 Quartz 오염이 원인입니다. 세정·교체로 파티클 발생을 억제합니다.",
      },
    ],
    // QA / COA
    qaTitle: "수리 후 COA 서비스 리포트 제공",
    qaSub: "모든 수리 완료 후 검사 성적서(Certificate of Analysis / Final Inspection & Service Report)를 함께 드립니다.",
    qaItems: [
      { name: "Leak Test", desc: "Water Leak Test · Vacuum Leak Test — 스펙 대비 리크율 검증" },
      { name: "Anodizing Coating", desc: "Block 아노다이징 코팅 두께 검사 (Thickness)" },
      { name: "Plasma Test", desc: "가스 유량별 RF Power 측정 (Ar · N₂ 등) — 스펙 대비 검증" },
      { name: "Aging Test", desc: "장시간 에이징으로 안정성 확인 후 출하" },
    ],
    qaReplacedTitle: "주요 교체 대상 부품",
    qaReplaced: ["Block & Baffle", "O-ring", "Ceramic Ring", "Reactor", "Ignition Sensor", "Electrode", "Sapphire Disc", "MOSFET", "Transistor", "Film Capacitor"],
    // Why OHI
    whyOhiTitle: "왜 OHI Tech인가",
    whys: [
      { title: "MKS 전 모델 커버리지", desc: "ASTRON 2L·3L·6L·8L·15L·22L·30L, PARAGON, R*evolution까지 전 라인업의 파트넘버를 대응합니다." },
      { title: "근본 원인 진단", desc: "4대 Fail Mode를 증상이 아닌 원인 단위로 진단 — O-ring·Reactor 식각까지 확인해 재발을 막습니다." },
      { title: "COA 성적서 제공", desc: "Leak·Coating·Plasma·Aging 검사를 거친 서비스 리포트를 수리 결과와 함께 제공합니다." },
      { title: "신품 대비 비용 절감", desc: "오버홀로 신품에 준하는 성능을 회복하면서 교체 대비 비용과 리드타임을 줄입니다." },
    ],
    // 계열 비교표 (AEO)
    familyTable: {
      title: "MKS RPS 계열 비교 — 어떤 모델이 내 공정에 맞나",
      sub: "ASTRON · PARAGON · R*evolution 계열을 공정 용도·웨이퍼 유무 기준으로 비교합니다.",
      headers: ["모델 계열", "공정 용도", "웨이퍼", "대표 파트넘버", "주 사용 장비"],
      rows: [
        { family: "MKS R*evolution", alias: "R1 / R3 / R5", use: "PR 제거 (Etch · Ashing · PR Strip)", wafer: "on-wafer", waferLabel: "On-Wafer", pn: "AX7690 · AX7695 · AX7696", tools: "Etch · Asher (Etch Dept.)" },
        { family: "MKS PARAGON", alias: "", use: "Chamber Clean", wafer: "clean", waferLabel: "웨이퍼 없음", pn: "AX7700 · AX7710", tools: "CVD · Thin Film · Etch" },
        { family: "MKS ASTRON 2L~30L", alias: "ASTRON-I / EX / HF · RPS 30L", use: "Chamber Clean", wafer: "clean", waferLabel: "웨이퍼 없음", pn: "AX765x · AX767x · AX764x", tools: "CVD · Thin Film · Etch (AMAT · LAM · ASM)" },
      ],
      note: "전 계열 100+ 파트넘버 대응. 보유 장비 PN으로 문의 주시면 정확한 대응 여부를 확인해 드립니다.",
    },
    // 오버홀 vs 신품 교체 비교표 (AEO)
    vsTable: {
      title: "RPS 오버홀 vs 신품 교체 — 무엇이 유리한가",
      sub: "OHI Tech 오버홀과 신품 교체를 비용·리드타임·성능·진단 관점에서 비교합니다.",
      colItem: "항목",
      colOhi: "RPS 오버홀 (OHI Tech)",
      colNew: "신품 교체",
      rows: [
        { item: "비용", ohi: "신품 교체 대비 비용 절감 (케이스별 상이 — 견적 시 안내)", knew: "신품가 100%" },
        { item: "리드타임", ohi: "진단·수리로 신규 발주 대비 리드타임 단축", knew: "신규 발주 · 제조사 납기 대기" },
        { item: "성능 회복", ohi: "오버홀로 신품에 준하는 성능 회복", knew: "신품 성능" },
        { item: "근본 원인 진단", ohi: "4대 Fail Mode 원인 진단 (O-ring · Reactor 식각까지)", knew: "해당 없음 (증상 장비 폐기)" },
        { item: "검사 성적서", ohi: "COA 제공 — Leak · Coating · Plasma · Aging", knew: "제조사 출하 스펙" },
        { item: "기존 장비", ohi: "재사용 (자산 활용)", knew: "폐기" },
      ],
    },
    ctaTitle: "RPS 수리·오버홀이 필요하신가요?",
    ctaDesc: "보유 장비의 모델·파트넘버·증상을 알려주시면 OHI Tech 전문팀이 빠르게 진단·견적을 드립니다.",
    ctaBtn1: "지금 수리 문의",
    ctaBtn2: "대응 모델 확인",
  },
  en: {
    hero: {
      eyebrow: "MKS Remote Plasma Source (RPS) Repair & Overhaul Specialist · OHI Tech",
      headline: "RPS Repair & Overhaul,\nLike New Again.",
      sub: "We diagnose, repair, and overhaul remote plasma sources across the full MKS ASTRON, PARAGON, and R*evolution lineup — delivered with a COA (Certificate of Analysis) service report.",
      cta1: "Request Repair Quote",
      cta2: "Check Supported Models",
      stats: [
        { value: "All MKS", label: "ASTRON · PARAGON · R*evolution" },
        { value: "100+ PNs", label: "Supported Part Numbers" },
        { value: "4 Fail Modes", label: "Root-Cause Diagnosis" },
        { value: "COA Report", label: "Post-Repair Inspection" },
      ],
    },
    whatTitle: "What is an RPS (Remote Plasma Source)?",
    whatBody:
      "A Remote Plasma Source (RPS) is a device that generates plasma in a separate, isolated chamber and delivers it to the process chamber through a guided transport region. In semiconductor processing it is essential for chamber cleaning and photoresist (PR) removal.",
    whyTitle: "Why is an RPS used?",
    whyModes: [
      {
        tag: "Chamber Clean RPS",
        note: "Without Wafer",
        title: "Chamber Cleaning",
        body:
          "In semiconductor processing, gas deposition not only forms layers on the wafer but also causes unwanted deposition on chamber components. As these deposits accumulate, they cause chamber contamination and become a source of chip defects. An RPS periodically generates plasma to clean the main chamber interior, removing residue and maintaining process stability.",
        models: "ASTRON · PARAGON family",
      },
      {
        tag: "Process RPS",
        note: "With Wafer",
        title: "PR Removal (Etch · Ashing · PR Strip)",
        body:
          "For Etch, Ashing, and PR Strip processes, an RPS is used to remove photoresist (PR) on the wafer. The R*evolution family is optimized for these on-wafer processes.",
        models: "R*evolution (R1 / R3 / R5) family",
      },
    ],
    modelsTitle: "Supported MKS Models",
    modelsSub: "We support part numbers across the full MKS ASTRON, PARAGON, and R*evolution lineup. Just send us your equipment PN.",
    processLabels: { "on-wafer": "On-Wafer (With Wafer)", clean: "Chamber Clean (Without Wafer)" },
    pnHeader: "Supported Part Numbers (All PNs)",
    toolHeader: "Commonly Used Tools / Ref. PN",
    modelCta: "Inquire About This Model",
    failTitle: "The 4 Fail Modes We Fix",
    failSub: "OHI Tech diagnoses the root cause — not just the symptom — to prevent recurrence.",
    failModes: [
      {
        id: "ac-dc",
        name: "AC LINE · DC BUS Fail",
        cause:
          "Faults from AC input / DC bus voltage are generally caused by power-device issues. We inspect the Fuse BD, Power BD, and Booster BD, replace failed parts, and perform an overhaul to recover.",
      },
      {
        id: "source-leak",
        name: "Source Leak",
        cause:
          "A leak can occur after long-term operation. From experience, source leaks are highly likely after O-ring etching + Reactor etching, so we first check whether the O-ring and Reactor have been etched.",
      },
      {
        id: "ignition",
        name: "Ignition Fault",
        cause:
          "A failure in any section board (B/D) can be a major cause, and there can be many others. The Block or Quartz and the Reactor are the primary sources.",
      },
      {
        id: "particle",
        name: "Particle Fail",
        cause: "Caused by a contaminated Block or contaminated Quartz. Cleaning and replacement suppress particle generation.",
      },
    ],
    qaTitle: "COA Service Report After Every Repair",
    qaSub: "Every completed repair comes with an inspection report (Certificate of Analysis / Final Inspection & Service Report).",
    qaItems: [
      { name: "Leak Test", desc: "Water Leak Test · Vacuum Leak Test — leak rate verified against spec" },
      { name: "Anodizing Coating", desc: "Block anodizing coating thickness inspection" },
      { name: "Plasma Test", desc: "RF Power measured under gas flow variations (Ar · N₂, etc.) vs spec" },
      { name: "Aging Test", desc: "Extended aging to confirm stability before shipment" },
    ],
    qaReplacedTitle: "Typical Replaced Parts",
    qaReplaced: ["Block & Baffle", "O-ring", "Ceramic Ring", "Reactor", "Ignition Sensor", "Electrode", "Sapphire Disc", "MOSFET", "Transistor", "Film Capacitor"],
    whyOhiTitle: "Why OHI Tech",
    whys: [
      { title: "Full MKS Coverage", desc: "We support part numbers across ASTRON 2L·3L·6L·8L·15L·22L·30L, PARAGON, and R*evolution." },
      { title: "Root-Cause Diagnosis", desc: "We diagnose the 4 fail modes by cause, not symptom — checking down to O-ring and Reactor etching to prevent recurrence." },
      { title: "COA Report Provided", desc: "A service report covering Leak, Coating, Plasma, and Aging tests is delivered with the repair." },
      { title: "Lower Cost vs New", desc: "Overhaul restores near-new performance while cutting cost and lead time versus replacement." },
    ],
    // Family comparison table (AEO)
    familyTable: {
      title: "MKS RPS Family Comparison — Which Model Fits Your Process",
      sub: "Comparing the ASTRON, PARAGON, and R*evolution families by process use and wafer presence.",
      headers: ["Model Family", "Process Use", "Wafer", "Representative PNs", "Common Tools"],
      rows: [
        { family: "MKS R*evolution", alias: "R1 / R3 / R5", use: "PR Removal (Etch · Ashing · PR Strip)", wafer: "on-wafer", waferLabel: "On-Wafer", pn: "AX7690 · AX7695 · AX7696", tools: "Etch · Asher (Etch Dept.)" },
        { family: "MKS PARAGON", alias: "", use: "Chamber Clean", wafer: "clean", waferLabel: "No Wafer", pn: "AX7700 · AX7710", tools: "CVD · Thin Film · Etch" },
        { family: "MKS ASTRON 2L–30L", alias: "ASTRON-I / EX / HF · RPS 30L", use: "Chamber Clean", wafer: "clean", waferLabel: "No Wafer", pn: "AX765x · AX767x · AX764x", tools: "CVD · Thin Film · Etch (AMAT · LAM · ASM)" },
      ],
      note: "100+ part numbers supported across all families. Send us your equipment PN to confirm exact coverage.",
    },
    // Overhaul vs new-unit comparison table (AEO)
    vsTable: {
      title: "RPS Overhaul vs. Buying New — Which Wins",
      sub: "Comparing an OHI Tech overhaul against a new-unit replacement on cost, lead time, performance, and diagnosis.",
      colItem: "Criteria",
      colOhi: "RPS Overhaul (OHI Tech)",
      colNew: "New Replacement",
      rows: [
        { item: "Cost", ohi: "Lower than buying new (varies by case — quoted per unit)", knew: "100% of new-unit price" },
        { item: "Lead Time", ohi: "Shorter than a new order via diagnosis & repair", knew: "New order · wait for OEM lead time" },
        { item: "Performance", ohi: "Near-new performance restored by overhaul", knew: "New-unit performance" },
        { item: "Root-Cause Diagnosis", ohi: "4 fail modes diagnosed by cause (down to O-ring · Reactor etching)", knew: "None (faulty unit scrapped)" },
        { item: "Inspection Report", ohi: "COA provided — Leak · Coating · Plasma · Aging", knew: "OEM shipment spec" },
        { item: "Existing Unit", ohi: "Reused (asset retained)", knew: "Scrapped" },
      ],
    },
    ctaTitle: "Need an RPS Repair or Overhaul?",
    ctaDesc: "Tell us your model, part number, and symptom — the OHI Tech team will diagnose and quote quickly.",
    ctaBtn1: "Request Repair Now",
    ctaBtn2: "Check Supported Models",
  },
  zh: {
    hero: {
      eyebrow: "MKS 远程等离子体源(RPS)维修与大修专家 · OHI Tech",
      headline: "RPS 维修与大修，\n焕然如新。",
      sub: "我们诊断、维修并大修 MKS ASTRON、PARAGON、R*evolution 全系列远程等离子体源(Remote Plasma Source)，并随附 COA(检验合格证)服务报告。",
      cta1: "维修报价咨询",
      cta2: "查看支持型号",
      stats: [
        { value: "MKS 全系列", label: "ASTRON · PARAGON · R*evolution" },
        { value: "100+ PN", label: "支持的部件号" },
        { value: "4 大故障模式", label: "根本原因诊断" },
        { value: "COA 报告", label: "维修后检验成绩书" },
      ],
    },
    whatTitle: "什么是 RPS(远程等离子体源)？",
    whatBody:
      "RPS(远程等离子体源)是在独立隔离的腔室中生成等离子体，再通过导向输送区(Transport Region)输送至工艺腔室的装置。在半导体工艺中，它是腔室清洁与光刻胶(PR)去除的核心设备。",
    whyTitle: "为什么使用 RPS？",
    whyModes: [
      {
        tag: "Chamber Clean RPS",
        note: "无晶圆 (Without Wafer)",
        title: "腔室清洁",
        body:
          "在半导体工艺中，气体沉积不仅在晶圆上成膜，也会在腔室内部部件上产生不需要的沉积。沉积物累积会导致腔室污染，成为芯片缺陷的来源。RPS 周期性生成等离子体清洁主腔室内部，去除残留物，维持工艺稳定性。",
        models: "ASTRON · PARAGON 系列",
      },
      {
        tag: "Process RPS",
        note: "有晶圆 (With Wafer)",
        title: "去除 PR (Etch · Ashing · PR Strip)",
        body:
          "在 Etch、Ashing、PR Strip 工艺中，使用 RPS 去除晶圆上的光刻胶(PR)。R*evolution 系列专为此类 On-Wafer 工艺优化。",
        models: "R*evolution (R1 / R3 / R5) 系列",
      },
    ],
    modelsTitle: "支持维修的 MKS 型号",
    modelsSub: "我们支持 MKS ASTRON、PARAGON、R*evolution 全系列的部件号。请提供您设备的 PN 咨询。",
    processLabels: { "on-wafer": "On-Wafer (有晶圆)", clean: "Chamber Clean (无晶圆)" },
    pnHeader: "支持的部件号 (All PNs)",
    toolHeader: "常用设备 / 参考 PN",
    modelCta: "咨询此型号维修",
    failTitle: "我们攻克的 4 大故障模式",
    failSub: "OHI Tech 不只看症状，而是诊断根本原因以防止复发。",
    failModes: [
      {
        id: "ac-dc",
        name: "AC LINE · DC BUS Fail",
        cause:
          "AC 输入 / DC 母线电压异常通常由功率器件问题引起。检查 Fuse BD·Power BD·Booster BD，更换故障部件后进行大修恢复。",
      },
      {
        id: "source-leak",
        name: "Source Leak",
        cause:
          "长期运行后可能发生源泄漏。根据经验，O-ring 蚀刻 + Reactor 蚀刻后源泄漏概率高，因此优先检查 O-ring 与 Reactor 是否蚀刻。",
      },
      {
        id: "ignition",
        name: "Ignition Fault",
        cause:
          "各区段电路板(B/D)故障可能是主因，此外还有多种原因。Block 或 Quartz 与 Reactor 是主要来源。",
      },
      {
        id: "particle",
        name: "Particle Fail",
        cause: "由 Block 污染或 Quartz 污染引起。通过清洁·更换抑制颗粒产生。",
      },
    ],
    qaTitle: "每次维修后提供 COA 服务报告",
    qaSub: "所有维修完成后均附检验报告(Certificate of Analysis / Final Inspection & Service Report)。",
    qaItems: [
      { name: "Leak Test", desc: "水检漏 · 真空检漏 — 泄漏率对照规格验证" },
      { name: "Anodizing Coating", desc: "Block 阳极氧化涂层厚度检查" },
      { name: "Plasma Test", desc: "不同气体流量下测量 RF Power (Ar · N₂ 等) 对照规格验证" },
      { name: "Aging Test", desc: "长时间老化确认稳定性后出货" },
    ],
    qaReplacedTitle: "主要更换部件",
    qaReplaced: ["Block & Baffle", "O-ring", "Ceramic Ring", "Reactor", "Ignition Sensor", "Electrode", "Sapphire Disc", "MOSFET", "Transistor", "Film Capacitor"],
    whyOhiTitle: "为什么选择 OHI Tech",
    whys: [
      { title: "MKS 全系列覆盖", desc: "支持 ASTRON 2L·3L·6L·8L·15L·22L·30L、PARAGON、R*evolution 全系列部件号。" },
      { title: "根本原因诊断", desc: "按原因而非症状诊断 4 大故障模式——检查至 O-ring 与 Reactor 蚀刻，防止复发。" },
      { title: "提供 COA 报告", desc: "随维修交付涵盖 Leak、Coating、Plasma、Aging 检测的服务报告。" },
      { title: "较新品更省成本", desc: "大修恢复接近新品的性能，同时相比更换降低成本与交期。" },
    ],
    // 系列对比表 (AEO)
    familyTable: {
      title: "MKS RPS 系列对比 — 哪个型号适合您的工艺",
      sub: "按工艺用途·有无晶圆对 ASTRON · PARAGON · R*evolution 系列进行对比。",
      headers: ["型号系列", "工艺用途", "晶圆", "代表部件号", "常用设备"],
      rows: [
        { family: "MKS R*evolution", alias: "R1 / R3 / R5", use: "去除 PR (Etch · Ashing · PR Strip)", wafer: "on-wafer", waferLabel: "On-Wafer", pn: "AX7690 · AX7695 · AX7696", tools: "Etch · Asher (Etch Dept.)" },
        { family: "MKS PARAGON", alias: "", use: "Chamber Clean", wafer: "clean", waferLabel: "无晶圆", pn: "AX7700 · AX7710", tools: "CVD · Thin Film · Etch" },
        { family: "MKS ASTRON 2L~30L", alias: "ASTRON-I / EX / HF · RPS 30L", use: "Chamber Clean", wafer: "clean", waferLabel: "无晶圆", pn: "AX765x · AX767x · AX764x", tools: "CVD · Thin Film · Etch (AMAT · LAM · ASM)" },
      ],
      note: "全系列支持 100+ 部件号。请提供设备 PN 以确认准确对应情况。",
    },
    // 大修 vs 更换新品对比表 (AEO)
    vsTable: {
      title: "RPS 大修 vs 更换新品 — 哪个更有利",
      sub: "从成本·交期·性能·诊断角度对比 OHI Tech 大修与更换新品。",
      colItem: "项目",
      colOhi: "RPS 大修 (OHI Tech)",
      colNew: "更换新品",
      rows: [
        { item: "成本", ohi: "低于购买新品（按情况而定 — 报价时说明）", knew: "新品价 100%" },
        { item: "交期", ohi: "通过诊断·维修，较新订单缩短交期", knew: "重新订购 · 等待原厂交期" },
        { item: "性能恢复", ohi: "大修恢复接近新品的性能", knew: "新品性能" },
        { item: "根本原因诊断", ohi: "按原因诊断 4 大故障模式（细至 O-ring · Reactor 蚀刻）", knew: "无（故障设备报废）" },
        { item: "检验报告", ohi: "提供 COA — Leak · Coating · Plasma · Aging", knew: "原厂出货规格" },
        { item: "原有设备", ohi: "再利用（保留资产）", knew: "报废" },
      ],
    },
    ctaTitle: "需要 RPS 维修或大修吗？",
    ctaDesc: "请告知您的型号、部件号与故障现象，OHI Tech 专业团队将快速诊断并报价。",
    ctaBtn1: "立即咨询维修",
    ctaBtn2: "查看支持型号",
  },
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function RPSSection({ locale }: { locale: Locale }) {
  const c = LANG[locale];
  const [activeModel, setActiveModel] = useState(MODELS[0].id);
  const current = MODELS.find((m) => m.id === activeModel) ?? MODELS[0];
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = FAQ_RPS[locale];
  const faqTitle = locale === "ko" ? "자주 묻는 질문" : locale === "zh" ? "常见问题" : "Frequently Asked Questions";
  const faqSub =
    locale === "ko"
      ? "RPS 수리·오버홀에 대해 가장 많이 묻는 질문을 정리했습니다."
      : locale === "zh"
      ? "关于RPS维修与大修最常见的问题整理。"
      : "The most common questions about RPS repair and overhaul.";

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8">

      {/* ══════════════════════ SECTION 1: HERO ══════════════════════ */}
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
          <p className="text-slate-300 text-base md:text-lg mb-10 max-w-2xl">{c.hero.sub}</p>
          <div className="flex flex-wrap gap-3 mb-14">
            <Link
              href={`/contact?lang=${locale}&type=inquiry&category=rps-repair`}
              className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta1}
            </Link>
            <a
              href="#rps-models"
              className="border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {c.hero.cta2}
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-10">
            {c.hero.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-xl md:text-2xl font-black text-[var(--accent)]">{s.value}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ SECTION 2: WHAT IS RPS / WHY ══════════════════════ */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          {/* What is RPS */}
          <div className="grid lg:grid-cols-5 gap-8 items-center mb-14">
            <div className="lg:col-span-3">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{c.whatTitle}</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">{c.whatBody}</p>
              <div className="flex flex-wrap items-center gap-2 mt-5 text-[11px] font-semibold text-slate-500">
                <span className="bg-slate-100 px-3 py-1.5 rounded-full">Remote Plasma Source</span>
                <span className="text-slate-300">→</span>
                <span className="bg-slate-100 px-3 py-1.5 rounded-full">Transport Region</span>
                <span className="text-slate-300">→</span>
                <span className="bg-slate-100 px-3 py-1.5 rounded-full">Gas Baffle</span>
                <span className="text-slate-300">→</span>
                <span className="bg-slate-900 text-white px-3 py-1.5 rounded-full">Process Chamber</span>
              </div>
            </div>
            <div className="lg:col-span-2">
              {/* 원본 제안서 실제 RPS 유닛 사진 */}
              <figure className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden p-4">
                <img
                  src="/images/rps/rps-overview.jpg"
                  alt="MKS 원격 플라즈마 소스(RPS) 유닛 — ASTRON·R*evolution 계열"
                  className="w-full h-auto object-contain mx-auto"
                  loading="lazy"
                />
                <figcaption className="text-center text-[11px] text-slate-400 mt-3">
                  {locale === "ko" ? "MKS RPS 유닛 예시 (ASTRON · R*evolution 계열)" : locale === "zh" ? "MKS RPS 装置示例（ASTRON · R*evolution 系列）" : "Example MKS RPS units (ASTRON · R*evolution family)"}
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Why RPS — two modes */}
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6">{c.whyTitle}</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {c.whyModes.map((m, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-full">
                    {m.tag}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">{m.note}</span>
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{m.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{m.body}</p>
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-500">{m.models}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ SECTION 3: SUPPORTED MODELS ══════════════════════ */}
      <section id="rps-models" className="bg-slate-50 border-t border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{c.modelsTitle}</h2>
          <p className="text-slate-500 text-sm mb-8 max-w-2xl">{c.modelsSub}</p>

          {/* Family comparison table (AEO — extractable overview) */}
          <div className="mb-12">
            <h3 className="text-lg md:text-xl font-black text-slate-900 mb-1">{c.familyTable.title}</h3>
            <p className="text-slate-500 text-xs mb-4 max-w-2xl">{c.familyTable.sub}</p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full min-w-[720px] border-collapse text-sm bg-white">
                <caption className="sr-only">{c.familyTable.title}</caption>
                <thead>
                  <tr className="bg-[var(--primary)] text-white text-left">
                    {c.familyTable.headers.map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-bold text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.familyTable.rows.map((r, i) => (
                    <tr key={i} className={i % 2 ? "bg-slate-50/50" : "bg-white"}>
                      <td className="px-4 py-3 border-t border-slate-100 align-top">
                        <span className="font-black text-slate-900">{r.family}</span>
                        {r.alias && <span className="block text-[11px] text-slate-400 mt-0.5">{r.alias}</span>}
                      </td>
                      <td className="px-4 py-3 border-t border-slate-100 align-top text-slate-700">{r.use}</td>
                      <td className="px-4 py-3 border-t border-slate-100 align-top">
                        <span className={`inline-block text-[10px] font-black px-2.5 py-1 rounded-full ${r.wafer === "on-wafer" ? "bg-[var(--accent)] text-white" : "bg-slate-900 text-white"}`}>{r.waferLabel}</span>
                      </td>
                      <td className="px-4 py-3 border-t border-slate-100 align-top font-mono text-[12px] text-slate-700">{r.pn}</td>
                      <td className="px-4 py-3 border-t border-slate-100 align-top text-slate-500 text-xs">{r.tools}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">* {c.familyTable.note}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: model nav */}
            <div className="lg:w-72 shrink-0">
              <div className="lg:sticky lg:top-24 space-y-1">
                {MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveModel(m.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                      activeModel === m.id ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div className="w-10 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center shrink-0">
                      <span className="text-white text-[9px] font-black">{m.abbr}</span>
                    </div>
                    <span className="leading-snug">{m.family}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: model detail */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                {/* header */}
                <div className="relative bg-white border-b border-slate-200 p-8 overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[var(--accent)]" />
                  <div className="flex items-start justify-between gap-4 pl-5">
                    <div className="flex-1">
                      <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">{current.alias}</p>
                      <h3 className="text-2xl font-black text-slate-900 mb-3">{current.family}</h3>
                      <span
                        className={`inline-block text-xs px-3 py-1 rounded-full ${
                          current.process === "on-wafer" ? "bg-[var(--accent)] text-white" : "bg-slate-900 text-white"
                        }`}
                      >
                        {c.processLabels[current.process]}
                      </span>
                    </div>
                    <div className="w-32 h-28 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-2">
                      {/* 원본 제안서에서 추출한 실제 사진 — 업스케일 없이 contain */}
                      <img
                        src={current.image}
                        alt={`${current.family} (${current.alias}) — RPS 수리·오버홀`}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-8">
                  {/* PN table */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{c.pnHeader}</h4>
                    <div className="flex flex-wrap gap-2">
                      {current.pns.map((pn) => {
                        const isNote = pn.toLowerCase().startsWith("and all");
                        return (
                          <span
                            key={pn}
                            className={`text-[11px] font-mono px-2.5 py-1.5 rounded-lg border ${
                              isNote
                                ? "bg-slate-50 text-slate-400 border-dashed border-slate-200 italic"
                                : "bg-slate-50 text-slate-800 border-slate-200"
                            }`}
                          >
                            {pn}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  {/* Tools */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{c.toolHeader}</h4>
                    <div className="space-y-2 mb-6">
                      {current.tools.map((tool) => (
                        <div key={tool} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{tool}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/contact?lang=${locale}&type=quote&category=rps-repair&product=${current.id}`}
                      className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                    >
                      {c.modelCta}
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ SECTION 4: FAIL MODES ══════════════════════ */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{c.failTitle}</h2>
            <p className="text-slate-500 text-sm">{c.failSub}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {c.failModes.map((f, i) => (
              <div key={f.id} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:border-[var(--accent)] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-black flex items-center justify-center shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-black text-slate-900">{f.name}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{f.cause}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ SECTION 5: COA / QA REPORT ══════════════════════ */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{c.qaTitle}</h2>
            <p className="text-slate-500 text-sm">{c.qaSub}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              {c.qaItems.map((q, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                      <span className="text-[var(--accent)] text-[10px] font-black">✓</span>
                    </span>
                    <h3 className="text-sm font-black text-slate-900">{q.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{q.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-700 mb-4">{c.qaReplacedTitle}</h3>
              <div className="flex flex-wrap gap-2">
                {c.qaReplaced.map((part) => (
                  <span key={part} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full font-medium">
                    {part}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ SECTION 6: WHY OHI TECH ══════════════════════ */}
      <section className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-10">{c.whyOhiTitle}</h2>
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

      {/* ══════════════════════ SECTION 6.5: OVERHAUL vs NEW (AEO comparison) ══════════════════════ */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{c.vsTable.title}</h2>
            <p className="text-slate-500 text-sm">{c.vsTable.sub}</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-sm bg-white">
              <caption className="sr-only">{c.vsTable.title}</caption>
              <thead>
                <tr className="text-left">
                  <th scope="col" className="bg-[var(--primary)] text-white px-4 py-3 font-bold text-xs w-[22%]">{c.vsTable.colItem}</th>
                  <th scope="col" className="bg-[var(--accent)] text-white px-4 py-3 font-bold text-xs w-[42%]">{c.vsTable.colOhi}</th>
                  <th scope="col" className="bg-[var(--primary)] text-white px-4 py-3 font-bold text-xs">{c.vsTable.colNew}</th>
                </tr>
              </thead>
              <tbody>
                {c.vsTable.rows.map((r, i) => (
                  <tr key={i} className={i % 2 ? "bg-slate-50/50" : "bg-white"}>
                    <th scope="row" className="px-4 py-3 border-t border-slate-100 font-bold text-slate-900 align-top whitespace-nowrap text-left">{r.item}</th>
                    <td className="px-4 py-3 border-t border-slate-100 text-slate-800 align-top font-medium">{r.ohi}</td>
                    <td className="px-4 py-3 border-t border-slate-100 text-slate-500 align-top">{r.knew}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════ SECTION 7: FAQ ══════════════════════ */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{faqTitle}</h2>
            <p className="text-slate-500 text-sm">{faqSub}</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm md:text-base font-bold text-slate-900">{f.q}</span>
                    <svg
                      className={`w-5 h-5 shrink-0 text-[var(--accent)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════ SECTION 8: CTA ══════════════════════ */}
      <section className="bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{c.ctaTitle}</h2>
          <p className="text-white/70 text-sm mb-8 max-w-lg mx-auto">{c.ctaDesc}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/contact?lang=${locale}&type=inquiry&category=rps-repair`}
              className="bg-white text-[var(--primary)] hover:bg-gray-50 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg"
            >
              {c.ctaBtn1}
            </Link>
            <a
              href="#rps-models"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors"
            >
              {c.ctaBtn2}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
