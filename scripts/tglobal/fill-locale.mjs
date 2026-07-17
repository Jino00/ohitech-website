// Locale-layer applier for the T-Global catalog (ko / ja / zh).
//
// The i18n/<loc>.json tables are the SINGLE committed source of every translation;
// the data/_raw/_<loc>/ layers this script writes are pure derived artifacts
// (gitignored, safe to delete). This replaced translate-ko.mjs + fill-ko.mjs,
// which kept ko partly in an inline table and partly only in the gitignored
// layer — 12 Korean descriptions existed nowhere in version control.
//
// Reads   data/_raw/<cat>.json           (crawled source of truth: slugs + English)
//       + scripts/tglobal/i18n/<loc>.json  (translations: names / descriptions / benefits)
// Writes  data/_raw/_<loc>/<cat>.json    (locale layer consumed by build-catalog.mjs)
//
// Idempotent and re-runnable after a re-crawl. An unmapped benefit keeps its
// English text and is reported, never silently dropped.
//
// Usage: node scripts/tglobal/fill-locale.mjs <ko|ja|zh>

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const RAW = join(ROOT, "data", "_raw");

const loc = process.argv[2];
if (!["ko", "ja", "zh"].includes(loc)) {
  console.error("Usage: node scripts/tglobal/fill-locale.mjs <ko|ja|zh>");
  process.exit(1);
}

// Strip the leading "title + benefits" echo from the crawled description blob.
// Ported verbatim from the retired translate-ko.mjs — build-catalog.mjs reads the
// result as descriptionEn, so the cleaning must stay byte-identical.
const cleanDesc = (p) => {
  let d = (p.description || "").replace(/\r/g, "").trim();
  const echo = [p.title, ...(p.benefits || [])];
  for (const line of echo) {
    const t = line.trim();
    if (t && d.startsWith(t)) d = d.slice(t.length).trim();
  }
  return d.replace(/\n{2,}/g, "\n").trim();
};

const tablePath = join(HERE, "i18n", `${loc}.json`);
if (!existsSync(tablePath)) {
  console.error(`[fill-${loc}] missing translation table: ${tablePath}`);
  process.exit(1);
}
if (!existsSync(RAW)) {
  console.error(`[fill-${loc}] missing ${RAW} — this dir is gitignored; restore the crawl output first.`);
  process.exit(1);
}

const { names = {}, descriptions = {}, benefits = {} } = JSON.parse(readFileSync(tablePath, "utf8"));
const OUT = join(RAW, `_${loc}`);
mkdirSync(OUT, { recursive: true });

let nName = 0, nDesc = 0, nBen = 0;
const missName = [], missDesc = [], missBen = new Set();

for (const base of readdirSync(RAW).filter((f) => f.endsWith(".json") && f !== "urls.json")) {
  const raw = JSON.parse(readFileSync(join(RAW, base), "utf8"));
  const out = {};
  for (const p of raw) {
    const slug = p.slug;
    const en = (p.benefits || []).map((b) => b.replace(/^⟦TODO⟧\s*/, "").trim());
    // Keyed by the English source, never a positional array: a re-crawl that adds or
    // reorders benefits must not shift translations onto the wrong bullet. An entry
    // that is absent here resolves to English at build time, never to a stale neighbour.
    const mapped = {};
    for (const b of en) {
      if (benefits[b]) { mapped[b] = benefits[b]; nBen++; }
      else if (b) missBen.add(b);
    }
    const enClean = cleanDesc(p);
    if (names[slug]) nName++; else missName.push(`${base}:${slug}`);
    if (descriptions[slug]) nDesc++;
    // Only a real description counts as missing — for 7 products the crawled blob
    // is nothing but a title+benefits echo, which cleans to "" (no prose exists).
    else if (enClean) missDesc.push(`${base}:${slug}`);

    out[slug] = {
      [`name_${loc}`]: names[slug] || "",
      [`description_${loc}`]: descriptions[slug] || "",
      [`benefits_${loc}`]: mapped,
      // ko layer carries the cleaned English too: build-catalog reads it as descriptionEn.
      ...(loc === "ko" ? { description_en_clean: enClean } : {}),
    };
  }
  writeFileSync(join(OUT, base), JSON.stringify(out, null, 2) + "\n");
}

console.log(`[fill-${loc}] names=${nName} descriptions=${nDesc} benefits=${nBen} -> data/_raw/_${loc}/`);
if (missName.length) console.log(`[fill-${loc}] ! name missing (${missName.length}): ${missName.slice(0, 5).join(", ")}${missName.length > 5 ? " …" : ""}`);
if (missDesc.length) console.log(`[fill-${loc}] ! description missing (${missDesc.length}): ${missDesc.slice(0, 5).join(", ")}${missDesc.length > 5 ? " …" : ""}`);
if (missBen.size) {
  console.log(`[fill-${loc}] ! benefit unmapped (${missBen.size}) — kept English:`);
  for (const b of [...missBen].slice(0, 5)) console.log(`    ${b}`);
}
