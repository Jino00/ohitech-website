// H1 ingestion driver: SA1 (collect leaf -> detail URLs) + SA2 (extract).
// Drives the gstack `browse` daemon (renders JS). Writes data/_raw/<cat>.json.
//
// Usage:
//   node scripts/tglobal/crawl.mjs --filter thermal-interface-materials   # Phase 1 validate
//   node scripts/tglobal/crawl.mjs                                        # full catalog
//   node scripts/tglobal/crawl.mjs --urls-only                            # SA1 only

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const B = existsSync(join(ROOT, ".claude/skills/gstack/browse/dist/browse"))
  ? join(ROOT, ".claude/skills/gstack/browse/dist/browse")
  : join(process.env.HOME, ".claude/skills/gstack/browse/dist/browse");
const RAW = join(ROOT, "data", "_raw");
mkdirSync(RAW, { recursive: true });

const args = process.argv.slice(2);
const filter = args.includes("--filter") ? args[args.indexOf("--filter") + 1] : null;
const urlsOnly = args.includes("--urls-only");

const sh = (a) => execFileSync(B, a, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const unwrap = (s) =>
  s.replace(/^---[\s\S]*?UNTRUSTED[\s\S]*?---\n?/i, "").replace(/\n?---\s*END[\s\S]*$/i, "").trim();

async function evalPage(file) {
  const out = sh(["eval", join(ROOT, "scripts", "tglobal", file)]);
  return JSON.parse(unwrap(out));
}

async function goto(url) {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      sh(["goto", url]);
      await sleep(1800); // lazy-load settle
      return;
    } catch (e) {
      lastErr = e;
      await sleep(1500 * attempt); // backoff before retry
    }
  }
  throw lastErr;
}

// ── SA1: discover leaf category URLs from the products nav ──
async function leafCategories() {
  await goto("https://www.tglobalcorp.com/products/");
  const out = sh(["js",
    `JSON.stringify([...new Set([...document.querySelectorAll('a')].map(a=>a.href).filter(h=>/tglobalcorp\\.com\\/products\\/[a-z]/.test(h)&&!/\\?page=|#/.test(h)))])`,
  ]);
  const all = JSON.parse(unwrap(out)).map((u) => u.replace(/\/$/, "") + "/");
  // leaf = deepest paths; keep all category paths, dedupe parents covered by children
  return [...new Set(all)].filter((u) => !/\/products\/$/.test(u));
}

async function main() {
  let cats = await leafCategories();
  if (filter) cats = cats.filter((u) => u.includes(filter));
  console.log(`[SA1] ${cats.length} category URLs` + (filter ? ` (filter=${filter})` : ""));

  // SA1: leaf -> detail URLs. Harness records the category context (the leaf
  // path the product was found under) and routes it into SA2 grouping, since
  // detail-page breadcrumbs only contain Home/PRODUCTS/title.
  const catOf = (leafUrl) => {
    const m = leafUrl.match(/\/products\/([^?#]+?)\/?$/);
    return m ? m[1].split("/") : ["uncategorized"];
  };
  const ctx = new Map(); // detailUrl -> { top, path }
  for (const c of cats) {
    try {
      await goto(c);
      const links = await evalPage("collect-items.js");
      const segs = catOf(c);
      for (const l of links) {
        const prev = ctx.get(l);
        // prefer the most specific (deepest) leaf for a product seen twice
        if (!prev || segs.length > prev.path.length)
          ctx.set(l, { top: segs[0], path: segs });
      }
      console.log(`  ${c} -> ${links.length}`);
    } catch (e) {
      console.log(`  ! ${c} FAILED: ${e.message.slice(0, 120)}`);
    }
  }
  const details = [...ctx.keys()];
  writeFileSync(
    join(RAW, "urls.json"),
    JSON.stringify(
      details.map((u) => ({ url: u, category: ctx.get(u).top, path: ctx.get(u).path })),
      null,
      2
    )
  );
  console.log(`[SA1] total ${details.length} detail URLs -> data/_raw/urls.json`);
  if (urlsOnly) return;

  // SA2: extract each detail page, group by SA1-provided top category
  const byCat = {};
  let i = 0;
  for (const d of details) {
    i++;
    try {
      await goto(d);
      const p = await evalPage("extract-detail.js");
      const c = ctx.get(d);
      p.category = c.top;
      p.categoryPath = c.path;
      const key = c.top.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      (byCat[key] ||= []).push(p);
      console.log(`[SA2] ${i}/${details.length} ${p.title} (${p.specs.length} specs, ${p.images.length} imgs)`);
    } catch (e) {
      console.log(`[SA2] ${i}/${details.length} ! ${d} FAILED: ${e.message.slice(0, 120)}`);
    }
  }
  for (const [k, list] of Object.entries(byCat)) {
    writeFileSync(join(RAW, `${k}.json`), JSON.stringify(list, null, 2));
    console.log(`[SA2] data/_raw/${k}.json (${list.length})`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
