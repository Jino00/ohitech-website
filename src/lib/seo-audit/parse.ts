// Sub-Agent: node-html-parser로 페이지 HTML에서 SEO/AEO/GEO 신호를 추출한다(단일 책임).
import { parse, type HTMLElement } from "node-html-parser";
import type { FetchedPage, ParsedPage } from "./types";

/** FetchedPage의 html을 구조화된 ParsedPage 신호로 변환. */
export function parsePage(page: FetchedPage): ParsedPage {
  const root = parse(page.html, {
    lowerCaseTagName: true,
    comment: false,
    blockTextElements: { script: true, style: true, noscript: true },
  });

  const title = textOrNull(root.querySelector("title")?.text);
  const metaDescription = attrOrNull(root.querySelector('meta[name="description"]'), "content");
  const canonical = attrOrNull(root.querySelector('link[rel="canonical"]'), "href");
  const robotsMeta = attrOrNull(root.querySelector('meta[name="robots"]'), "content");

  // OpenGraph / Twitter 카드
  const og: Record<string, string> = {};
  for (const el of root.querySelectorAll('meta[property^="og:"]')) {
    const key = el.getAttribute("property");
    const val = el.getAttribute("content");
    if (key && val) og[key] = val;
  }
  const twitter: Record<string, string> = {};
  for (const el of root.querySelectorAll('meta[name^="twitter:"]')) {
    const key = el.getAttribute("name");
    const val = el.getAttribute("content");
    if (key && val) twitter[key] = val;
  }

  // hreflang
  const hreflang: { hreflang: string; href: string }[] = [];
  for (const el of root.querySelectorAll('link[rel="alternate"][hreflang]')) {
    const hl = el.getAttribute("hreflang");
    const href = el.getAttribute("href");
    if (hl && href) hreflang.push({ hreflang: hl, href });
  }

  // JSON-LD (@graph 평탄화)
  const jsonLd: Record<string, unknown>[] = [];
  let jsonLdErrors = 0;
  const ldScripts = root.querySelectorAll('script[type="application/ld+json"]');
  for (const script of ldScripts) {
    try {
      const data = JSON.parse(script.text);
      collectLdNodes(data, jsonLd);
    } catch {
      jsonLdErrors++;
    }
  }

  // 헤딩 구조
  const headings: { level: number; text: string }[] = [];
  const h1: string[] = [];
  for (let level = 1; level <= 6; level++) {
    for (const el of root.querySelectorAll(`h${level}`)) {
      const text = collapse(el.text);
      headings.push({ level, text });
      if (level === 1) h1.push(text);
    }
  }

  // 이미지 alt
  const images: { src: string; alt: string | null }[] = [];
  for (const el of root.querySelectorAll("img")) {
    images.push({
      src: el.getAttribute("src") || "",
      alt: el.hasAttribute("alt") ? el.getAttribute("alt") ?? "" : null,
    });
  }

  // 내부/외부 링크
  const { internalLinks, externalHosts } = collectLinks(root, page.url);

  // 첫 문단(AEO 명확성 신호)
  const firstParagraph = firstMeaningfulParagraph(root);

  return {
    title,
    metaDescription,
    canonical,
    robotsMeta,
    og,
    twitter,
    hreflang,
    jsonLd,
    jsonLdScripts: ldScripts.length,
    jsonLdErrors,
    h1,
    headings,
    images,
    internalLinks,
    externalHosts,
    firstParagraph,
  };
}

/** JSON-LD 노드를 재귀적으로 평탄화(@graph, 배열 처리). */
function collectLdNodes(data: unknown, out: Record<string, unknown>[]): void {
  if (Array.isArray(data)) {
    for (const item of data) collectLdNodes(item, out);
    return;
  }
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (Array.isArray(obj["@graph"])) {
      collectLdNodes(obj["@graph"], out);
      // @graph 컨테이너 자체도 보존(@context 등)
      const { ...rest } = obj;
      delete (rest as Record<string, unknown>)["@graph"];
      if (Object.keys(rest).length > 1) out.push(rest);
      return;
    }
    out.push(obj);
  }
}

function collectLinks(
  root: HTMLElement,
  pageUrl: string
): { internalLinks: string[]; externalHosts: string[] } {
  let origin = "";
  try {
    origin = new URL(pageUrl).origin;
  } catch {
    origin = "";
  }
  const internal = new Set<string>();
  const external = new Set<string>();
  for (const el of root.querySelectorAll("a[href]")) {
    const href = (el.getAttribute("href") || "").trim();
    if (!href) continue;
    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      continue;
    }
    try {
      const resolved = new URL(href, pageUrl);
      if (resolved.protocol !== "http:" && resolved.protocol !== "https:") continue;
      if (resolved.origin === origin) {
        internal.add(resolved.pathname + resolved.search);
      } else {
        external.add(resolved.hostname);
      }
    } catch {
      // 상대경로 파싱 실패는 무시
    }
  }
  return { internalLinks: [...internal], externalHosts: [...external] };
}

function firstMeaningfulParagraph(root: HTMLElement): string {
  for (const p of root.querySelectorAll("p")) {
    const text = collapse(p.text);
    if (text.length >= 40) return text;
  }
  // <p>가 없으면 본문 첫 텍스트 블록
  const body = root.querySelector("main") || root.querySelector("body");
  return collapse(body?.text || "").slice(0, 300);
}

function textOrNull(s: string | undefined): string | null {
  const v = collapse(s || "");
  return v.length ? v : null;
}

function attrOrNull(el: HTMLElement | null | undefined, attr: string): string | null {
  if (!el) return null;
  const v = el.getAttribute(attr);
  return v && v.trim().length ? v.trim() : null;
}

function collapse(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}
