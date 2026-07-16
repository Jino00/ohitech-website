// Sub-Agent: SEO(전통 검색엔진) 체커들 — 페이지/사이트 단위 단일 책임 함수 모음.
import type { AuditContext, Check, FetchedPage, ParsedPage } from "../types";
import { headStatus } from "../fetchPage";
import { cpLen, mk } from "./util";

/** 경로+쿼리만 비교(트레일링 슬래시 무시). */
function samePath(a: string, b: string): boolean {
  const norm = (u: string) => {
    try {
      const url = new URL(u);
      const p = url.pathname.replace(/\/$/, "") || "/";
      return p + url.search;
    } catch {
      return u.replace(/\/$/, "");
    }
  };
  return norm(a) === norm(b);
}

/** 페이지 단위 SEO 체크 모음. */
export function seoPageChecks(page: FetchedPage, p: ParsedPage): Check[] {
  const s = page.scope;
  const checks: Check[] = [];

  // title 길이 (50~60자 권장)
  if (!p.title) {
    checks.push(mk("SEO", "title_length", "Title 태그", "fail", s, "title 태그가 없습니다.", "50~60자의 고유한 title을 추가하세요."));
  } else {
    const len = cpLen(p.title);
    const status = len >= 50 && len <= 60 ? "pass" : "warn";
    const why = len < 50 ? "다소 짧습니다(키워드 추가 여지)." : len > 60 ? "60자를 초과해 SERP에서 잘릴 수 있습니다." : "적정 길이입니다.";
    checks.push(
      mk("SEO", "title_length", "Title 태그", status, s, `title ${len}자: "${p.title}".`,
        status === "pass" ? "적정 길이입니다." : `${why} 50~60자를 권장합니다.`)
    );
  }

  // meta description (150~160자 권장)
  if (!p.metaDescription) {
    checks.push(mk("SEO", "meta_description", "Meta Description", "fail", s, "meta description이 없습니다.", "150~160자의 고유 description을 추가하세요."));
  } else {
    const len = cpLen(p.metaDescription);
    const status = len >= 150 && len <= 160 ? "pass" : "warn";
    const why = len < 150 ? "다소 짧습니다(공간 낭비)." : len > 160 ? "160자를 초과해 SERP에서 잘릴 수 있습니다." : "적정 길이입니다.";
    checks.push(mk("SEO", "meta_description", "Meta Description", status, s, `description ${len}자.`, status === "pass" ? "적정합니다." : `${why} 150~160자를 권장합니다.`));
  }

  // canonical (자기참조)
  if (!p.canonical) {
    checks.push(mk("SEO", "canonical", "Canonical URL", "fail", s, "canonical 링크가 없습니다.", "각 페이지에 자기참조 canonical을 추가하세요."));
  } else {
    const self = samePath(p.canonical, page.url);
    checks.push(
      mk("SEO", "canonical", "Canonical URL", self ? "pass" : "warn", s, `canonical: ${p.canonical}`,
        self ? "자기참조 canonical로 적정합니다." : "canonical이 현재 페이지와 다른 URL을 가리킵니다. 의도한 것인지 확인하세요.")
    );
  }

  // OpenGraph / Twitter
  {
    const ogOk = Boolean(p.og["og:title"] && p.og["og:description"] && p.og["og:image"]);
    const twOk = Boolean(p.twitter["twitter:card"]);
    const status = ogOk && twOk ? "pass" : ogOk || twOk ? "warn" : "fail";
    const missing: string[] = [];
    if (!p.og["og:title"]) missing.push("og:title");
    if (!p.og["og:description"]) missing.push("og:description");
    if (!p.og["og:image"]) missing.push("og:image");
    if (!p.twitter["twitter:card"]) missing.push("twitter:card");
    checks.push(
      mk("SEO", "og_twitter", "OpenGraph / Twitter 카드", status, s,
        missing.length ? `누락: ${missing.join(", ")}.` : "OG·Twitter 핵심 태그 모두 존재.",
        missing.length ? "소셜 공유 미리보기를 위해 누락 태그를 추가하세요." : "적정합니다.")
    );
  }

  // JSON-LD 구조화 데이터
  if (p.jsonLdErrors > 0) {
    checks.push(mk("SEO", "json_ld_valid", "구조화 데이터(JSON-LD)", "fail", s, `JSON-LD 스크립트 ${p.jsonLdScripts}개 중 ${p.jsonLdErrors}개 파싱 실패.`, "잘못된 JSON-LD 문법을 수정하세요."));
  } else if (p.jsonLdScripts === 0) {
    checks.push(mk("SEO", "json_ld_valid", "구조화 데이터(JSON-LD)", "warn", s, "JSON-LD가 없습니다.", "Organization/Product/FAQPage 등 적절한 스키마를 추가하세요."));
  } else {
    const types = [...new Set(p.jsonLd.map((n) => n["@type"]).flat().filter(Boolean))].join(", ");
    checks.push(mk("SEO", "json_ld_valid", "구조화 데이터(JSON-LD)", "pass", s, `유효한 JSON-LD ${p.jsonLdScripts}개 (타입: ${types || "n/a"}).`, "적정합니다."));
  }

  // hreflang
  {
    const codes = new Set(p.hreflang.map((h) => h.hreflang.toLowerCase()));
    const want = ["ko", "en", "zh", "ja", "x-default"];
    const missing = want.filter((w) => !codes.has(w));
    const invalid = [...codes].filter((c) => !/^([a-z]{2}(-[a-z]{2})?|x-default)$/.test(c));
    let status: "pass" | "warn" | "fail";
    let detail: string;
    let rec: string;
    if (p.hreflang.length === 0) {
      status = "fail";
      detail = "hreflang 링크가 없습니다.";
      rec = "ko/en/zh/ja + x-default 상호 참조 hreflang을 추가하세요.";
    } else if (missing.length > 0 || invalid.length > 0) {
      status = "warn";
      detail = `${[...codes].join(", ")} 존재.${missing.length ? ` 누락: ${missing.join(", ")}.` : ""}${invalid.length ? ` 비표준 코드: ${invalid.join(", ")}.` : ""}`;
      rec = "ko/en/zh/ja + x-default를 모두 포함하고 표준 코드를 사용하세요.";
    } else {
      status = "pass";
      detail = `ko/en/zh/ja/x-default 모두 존재.`;
      rec = "적정합니다.";
    }
    checks.push(mk("SEO", "hreflang", "hreflang 다국어 태그", status, s, detail, rec));
  }

  // 헤딩 구조 (h1 1개)
  {
    const n = p.h1.length;
    const status = n === 1 ? "pass" : n === 0 ? "fail" : "warn";
    checks.push(
      mk("SEO", "heading_structure", "헤딩 구조(H1)", status, s, `H1 ${n}개.`,
        n === 1 ? "적정합니다." : n === 0 ? "페이지당 H1 1개를 추가하세요." : "H1은 페이지당 1개만 사용하세요.")
    );
  }

  // 이미지 alt
  {
    const imgs = p.images.filter((i) => i.src);
    const missing = imgs.filter((i) => i.alt === null).length;
    let status: "pass" | "warn" | "fail";
    if (imgs.length === 0 || missing === 0) status = "pass";
    else if (missing / imgs.length > 0.5) status = "fail";
    else status = "warn";
    checks.push(
      mk("SEO", "image_alt", "이미지 alt 텍스트", status, s,
        imgs.length === 0 ? "이미지 없음." : `이미지 ${imgs.length}개 중 alt 누락 ${missing}개.`,
        missing === 0 ? "적정합니다." : "모든 콘텐츠 이미지에 설명형 alt를 추가하세요(장식 이미지는 alt=\"\").")
    );
  }

  // 페이지 무게 / 속도 신호 (best-effort, Lighthouse 미사용)
  {
    const kb = Math.round(page.bytes / 1024);
    const fast = page.ttfbMs <= 1000 && kb <= 300;
    const ok = page.ttfbMs <= 2500 && kb <= 1024;
    const status = fast ? "pass" : ok ? "warn" : "warn";
    checks.push(
      mk("SEO", "page_weight", "페이지 무게·응답속도(best-effort)", status, s,
        `HTML ${kb}KB, TTFB ~${page.ttfbMs}ms (서버 측정값, Lighthouse 아님).`,
        fast ? "양호합니다." : "HTML 용량/응답시간이 큽니다. 이미지·번들 최적화를 검토하세요(정밀 측정은 Lighthouse 권장).")
    );
  }

  return checks;
}

/** sitemap.xml 검사(사이트 단위). */
export function checkSitemap(sitemap: FetchedPage): Check {
  if (!sitemap.ok || sitemap.status !== 200) {
    return mk("SEO", "sitemap", "sitemap.xml", "fail", "site", `sitemap.xml 응답 ${sitemap.status || "실패"}.`, "sitemap.xml이 200으로 응답하도록 하세요.");
  }
  const xml = sitemap.html;
  const hasUrlset = xml.includes("<urlset");
  const hasHreflang = xml.includes("hreflang");
  const hasAllLocales = xml.includes('hreflang="ko"') && xml.includes('hreflang="en"') && xml.includes('hreflang="zh"') && xml.includes('hreflang="ja"');
  const hasXdefault = xml.includes('hreflang="x-default"');
  const urlCount = (xml.match(/<loc>/g) || []).length;
  if (!hasUrlset) {
    return mk("SEO", "sitemap", "sitemap.xml", "fail", "site", "<urlset>이 없는 잘못된 sitemap.", "유효한 XML sitemap을 생성하세요.");
  }
  const status = hasHreflang && hasAllLocales && hasXdefault ? "pass" : "warn";
  return mk("SEO", "sitemap", "sitemap.xml", status, "site",
    `URL ${urlCount}개, hreflang ${hasHreflang ? "포함" : "없음"}, 3로케일 ${hasAllLocales ? "포함" : "불완전"}, x-default ${hasXdefault ? "있음" : "없음"}.`,
    status === "pass" ? "적정합니다." : "각 URL에 ko/en/zh/ja + x-default 대체 링크를 포함하세요.");
}

/** robots.txt 검사(사이트 단위). */
export function checkRobots(robots: FetchedPage): Check {
  if (!robots.ok || robots.status !== 200) {
    return mk("SEO", "robots_txt", "robots.txt", "fail", "site", `robots.txt 응답 ${robots.status || "실패"}.`, "robots.txt를 제공하세요.");
  }
  const txt = robots.html;
  const hasSitemap = /sitemap:/i.test(txt);
  const aiBots = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];
  const blockedAi = aiBots.filter((b) => {
    const re = new RegExp(`User-agent:\\s*${b}[\\s\\S]*?Disallow:\\s*/\\s*(\\n|$)`, "i");
    return re.test(txt);
  });
  const status = hasSitemap && blockedAi.length === 0 ? "pass" : "warn";
  return mk("SEO", "robots_txt", "robots.txt", status, "site",
    `Sitemap 지시문 ${hasSitemap ? "있음" : "없음"}, AI봇 차단 ${blockedAi.length ? blockedAi.join(",") : "없음"}.`,
    status === "pass" ? "적정합니다." : !hasSitemap ? "Sitemap: 지시문을 추가하세요." : "AI 인용을 위해 AI 크롤러 차단을 해제하세요.");
}

/** 로케일 URL 전략 검사 — ?lang= 파라미터 방식은 비권장(정직 보고). */
export function checkLocaleStrategy(ctx: AuditContext): Check {
  return mk("SEO", "locale_url_strategy", "로케일 URL 전략", "warn", "site",
    "로케일을 ?lang= 쿼리 파라미터로 구분합니다(en/zh/ja).",
    "검색엔진은 ?lang= 파라미터보다 서브디렉터리(/en/, /zh/, /ja/)를 권장합니다. 장기적으로 경로 기반 구조 전환을 검토하세요(canonical·hreflang은 현재 self-referential로 구성되어 있어 즉각적 위험은 낮음).");
}

/** 내부 링크 끊김 검사(사이트 단위, best-effort 샘플 HEAD). */
export async function checkInternalLinks(parsedPages: ParsedPage[], ctx: AuditContext): Promise<Check> {
  const paths = new Set<string>();
  for (const p of parsedPages) for (const l of p.internalLinks) paths.add(l);
  const sample = [...paths].slice(0, 30);
  const broken: string[] = [];
  await Promise.all(
    sample.map(async (path) => {
      const status = await headStatus(ctx.baseUrl + path);
      if (status === 0 || status >= 400) broken.push(`${path} (${status || "no-response"})`);
    })
  );
  const status = broken.length === 0 ? "pass" : broken.length <= 2 ? "warn" : "fail";
  return mk("SEO", "internal_links", "내부 링크 끊김", status, "site",
    `샘플 ${sample.length}개 검사, 끊긴 링크 ${broken.length}개${broken.length ? ": " + broken.slice(0, 5).join("; ") : ""}.`,
    broken.length === 0 ? "적정합니다." : "끊긴 내부 링크를 수정하거나 제거하세요.");
}
