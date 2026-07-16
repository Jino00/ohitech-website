// Locale-layer applier for the T-Global catalog (ja / zh).
//
// Materializes the translation step as version-controlled data, same role as
// fill-ko.mjs — but the tables live in scripts/tglobal/i18n/<locale>.json instead
// of inline JS. Both are committed (scripts/ is not gitignored, data/ is), so the
// translations survive a regeneration either way; the JSON split just keeps the
// applier readable and lets copy edits skip the code file.
//
// Reads   data/_raw/<cat>.json          (crawled source of truth: slugs + English)
//       + scripts/tglobal/i18n/<loc>.json  (translations: names / descriptions / benefits)
// Writes  data/_raw/_<loc>/<cat>.json   (locale layer consumed by build-catalog.mjs)
//
// Idempotent and re-runnable after a re-crawl. An unmapped benefit keeps its
// English text and is reported, never silently dropped.
//
// Usage: node scripts/tglobal/fill-locale.mjs ja
//        node scripts/tglobal/fill-locale.mjs zh

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const RAW = join(ROOT, "data", "_raw");

const loc = process.argv[2];
if (!["ja", "zh"].includes(loc)) {
  console.error("Usage: node scripts/tglobal/fill-locale.mjs <ja|zh>");
  process.exit(1);
}

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
    if (names[slug]) nName++; else missName.push(`${base}:${slug}`);
    if (descriptions[slug]) nDesc++;
    else if ((p.description || "").trim()) missDesc.push(`${base}:${slug}`);

    out[slug] = {
      [`name_${loc}`]: names[slug] || "",
      [`description_${loc}`]: descriptions[slug] || "",
      [`benefits_${loc}`]: mapped,
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
