// SA4 ko-translator. Reads data/_raw/<cat>.json and emits data/_raw/_ko/<cat>.json
// keyed by slug: { name_ko, benefits_ko[], description_en_clean, description_ko }.
// Specs are NOT translated (D-2: English/numeric kept verbatim).
//
// Deterministic parts (glossary): category noun in name, common benefit phrases.
// description_ko is left "" for the model to fill per-category (LLM step).
//
// Usage: node scripts/tglobal/translate-ko.mjs [catFile.json ...]

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const RAW = join(ROOT, "data", "_raw");
const KO = join(RAW, "_ko");
mkdirSync(KO, { recursive: true });

// Category-noun glossary (longest match first).
const CAT = [
  ["Non-Silicone Thermal Pad", "비실리콘 열전도 패드"],
  ["Ultra Soft Thermal Pad", "초연질 열전도 패드"],
  ["Low Oil Bleed Thermal Pad", "저오일블리드 열전도 패드"],
  ["Fiberglass Reinforced Thermal Pad", "유리섬유 강화 열전도 패드"],
  ["Non-Silicone Thermal Putty", "비실리콘 서멀 퍼티"],
  ["Phase Change Materials", "상변화 물질(PCM)"],
  ["Phase Change Material", "상변화 물질(PCM)"],
  ["Thermally Conductive Gel", "열전도 겔"],
  ["Thermal Composite Material", "열전도 복합 소재"],
  ["Thermal Conductive Gel", "열전도 겔"],
  ["Ceramic Heat Spreader", "세라믹 히트 스프레더"],
  ["Liquid Gap Filler", "액상 갭 필러"],
  ["Gap Filler Pad", "갭 필러 패드"],
  ["Potting Compound", "포팅 컴파운드"],
  ["Thermal Simulation", "열 시뮬레이션"],
  ["Thermoelectric Cooling Chips", "열전 냉각 칩(TEC)"],
  ["Flexible Absorbing Materials", "플렉시블 흡수 소재"],
  ["Thermal Module", "써멀 모듈"],
  ["Vapor Chamber", "베이퍼 챔버"],
  ["Graphite Sheet", "흑연 시트"],
  ["Thermal Paste", "서멀 페이스트(열전도 그리스)"],
  ["Thermal Putty", "서멀 퍼티"],
  ["Thermal Pad", "열전도 패드"],
  ["Thermal Tape", "열전도 테이프"],
  ["Heat Pipe", "히트파이프"],
  ["Heat Sink", "방열판(히트싱크)"],
  ["End Cap", "엔드 캡"],
  ["Graphene", "그래핀"],
  ["AlSiC", "AlSiC 복합소재"],
  ["Fan", "팬"],
];

const BENEFIT = new Map([
  ["great thermal conductivity", "우수한 열전도율"],
  ["good thermal conductivity", "양호한 열전도율"],
  ["low thermal impedance", "낮은 열저항"],
  ["low thermal contact resistance", "낮은 열접촉 저항"],
  ["difficult to be deformed", "변형이 어려운 우수한 형상 유지력"],
  ["easy to assemble", "조립 용이"],
  ["electrically isolating", "전기 절연성"],
  ["fully filled the gaps of contact surface", "접촉면 간극 완전 충진"],
  ["good flow rate over phase change temperature", "상전이 온도 이상에서 우수한 유동성"],
  ["decrease the weight of the product", "제품 경량화"],
  ["thermal conduction and buffer effect", "열전도 및 완충 효과"],
  ["fiberglass on one side", "한쪽 면 유리섬유 처리"],
]);

const transName = (title) => {
  for (const [en, ko] of CAT) if (title.includes(en)) return title.replace(en, ko);
  return title; // model number only or unknown noun: keep as-is
};

const transBenefit = (b) => BENEFIT.get(b.trim().toLowerCase()) || null; // null = needs LLM

// Strip the leading "title + benefits" echo from the description blob.
const cleanDesc = (p) => {
  let d = (p.description || "").replace(/\r/g, "").trim();
  const echo = [p.title, ...(p.benefits || [])];
  for (const line of echo) {
    const t = line.trim();
    if (t && d.startsWith(t)) d = d.slice(t.length).trim();
  }
  return d.replace(/\n{2,}/g, "\n").trim();
};

const files = process.argv.slice(2).length
  ? process.argv.slice(2).map((f) => (f.includes("/") ? f : join(RAW, f)))
  : readdirSync(RAW).filter((f) => f.endsWith(".json") && f !== "urls.json").map((f) => join(RAW, f));

for (const file of files) {
  const base = file.split("/").pop();
  const products = JSON.parse(readFileSync(file, "utf8"));
  const koPath = join(KO, base);
  const prev = existsSync(koPath) ? JSON.parse(readFileSync(koPath, "utf8")) : {};
  const out = {};
  let needLLM = 0;
  for (const p of products) {
    const benefits_ko = (p.benefits || []).map((b) => transBenefit(b) || `⟦TODO⟧ ${b}`);
    const desc_en = cleanDesc(p);
    const keep = prev[p.slug] || {};
    if (benefits_ko.some((b) => b.startsWith("⟦TODO⟧"))) needLLM++;
    out[p.slug] = {
      name_ko: transName(p.title),
      benefits_ko,
      description_en_clean: desc_en,
      description_ko: keep.description_ko || "", // filled by model per category
    };
  }
  writeFileSync(koPath, JSON.stringify(out, null, 2));
  console.log(`[SA4] ${base} -> _ko/${base} (${products.length} products, ${needLLM} need LLM benefit fill)`);
}
