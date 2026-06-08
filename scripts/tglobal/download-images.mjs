// SA3 image-downloader. Reads data/_raw/<cat>.json, downloads every product
// image to public/images/products/tglobal/<slug>/, rewrites the product's
// `images` to local /images/... paths, and writes the JSON back in place.
//
// Usage: node scripts/tglobal/download-images.mjs [catFile.json ...]
//        (no args = every data/_raw/*.json except urls.json)

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const RAW = join(ROOT, "data", "_raw");
const OUT = join(ROOT, "public", "images", "products", "tglobal");
mkdirSync(OUT, { recursive: true });

const files = process.argv.slice(2).length
  ? process.argv.slice(2).map((f) => (f.includes("/") ? f : join(RAW, f)))
  : readdirSync(RAW).filter((f) => f.endsWith(".json") && f !== "urls.json").map((f) => join(RAW, f));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function dl(url, dest) {
  for (let a = 1; a <= 3; a++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 100) throw new Error("too small");
      writeFileSync(dest, buf);
      return buf.length;
    } catch (e) {
      if (a === 3) throw e;
      await sleep(800 * a);
    }
  }
}

let okFiles = 0,
  failFiles = 0;

for (const file of files) {
  const products = JSON.parse(readFileSync(file, "utf8"));
  for (const p of products) {
    const slug = p.slug || (p.title || "x").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    // Idempotent: a re-run sees already-rewritten local paths. Keep them and
    // preserve the original remote backup instead of re-parsing as a URL.
    if (p.images.every((s) => s.startsWith("/images/"))) {
      okFiles += p.images.length;
      continue;
    }
    const remote = p.images;
    const dir = join(OUT, slug);
    mkdirSync(dir, { recursive: true });
    const local = [];
    let idx = 0;
    for (const src of remote) {
      idx++;
      let ext = extname(new URL(src).pathname).toLowerCase() || ".webp";
      if (!/\.(webp|jpg|jpeg|png|gif)$/.test(ext)) ext = ".webp";
      const name = `${slug}-${idx}${ext}`;
      const dest = join(dir, name);
      const rel = `/images/products/tglobal/${slug}/${name}`;
      try {
        if (!existsSync(dest)) await dl(src, dest);
        local.push(rel);
        okFiles++;
      } catch (e) {
        console.log(`  ! ${slug} img${idx} ${src} -> ${e.message}`);
        failFiles++;
      }
    }
    p.imagesRemote = remote;
    p.images = local;
  }
  writeFileSync(file, JSON.stringify(products, null, 2));
  console.log(`[SA3] ${file.split("/").pop()} (${products.length} products)`);
}
console.log(`[SA3] images ok=${okFiles} fail=${failFiles} -> public/images/products/tglobal/`);
