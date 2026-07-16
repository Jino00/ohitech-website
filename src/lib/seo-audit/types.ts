// SEO/AEO/GEO 자가 점검 공용 타입 — /api/seo-audit 응답 계약과 내부 데이터 모델 정의.

export type Category = "SEO" | "AEO" | "GEO";
export type Status = "pass" | "warn" | "fail";

/** 외부 마케팅 에이전트가 소비하는 단일 점검 결과(계약 고정). */
export interface Check {
  category: Category;
  id: string;
  title: string;
  status: Status;
  /** "site" 또는 점검한 페이지 경로(예: "/about?lang=en"). */
  scope: string;
  detail: string;
  recommendation: string;
}

export interface CategorySummary {
  pass: number;
  warn: number;
  fail: number;
}

/** GET /api/seo-audit 최종 응답(계약 고정 — README 문서화). */
export interface AuditReport {
  audited_at: string;
  site_url: string;
  summary: {
    seo: CategorySummary;
    aeo: CategorySummary;
    geo: CategorySummary;
  };
  checks: Check[];
}

/** fetchPage 결과 — 한 URL의 raw 응답 + 타이밍 신호. */
export interface FetchedPage {
  /** 점검 대상 절대 URL. */
  url: string;
  /** site_url 기준 상대 경로+쿼리(scope 표기에 사용). */
  scope: string;
  locale: "ko" | "en" | "zh" | "ja";
  status: number;
  ok: boolean;
  html: string;
  headers: Record<string, string>;
  bytes: number;
  /** 응답 헤더 수신까지 걸린 시간(ms) — TTFB 근사. */
  ttfbMs: number;
  /** 본문까지 완전 수신 시간(ms). */
  totalMs: number;
  error?: string;
}

/** parse 결과 — HTML에서 추출한 SEO/AEO/GEO 신호. */
export interface ParsedPage {
  title: string | null;
  metaDescription: string | null;
  canonical: string | null;
  robotsMeta: string | null;
  og: Record<string, string>;
  twitter: Record<string, string>;
  hreflang: { hreflang: string; href: string }[];
  /** 파싱 성공한 JSON-LD 노드들(@graph 평탄화 포함). */
  jsonLd: Record<string, unknown>[];
  jsonLdScripts: number;
  jsonLdErrors: number;
  h1: string[];
  headings: { level: number; text: string }[];
  images: { src: string; alt: string | null }[];
  /** 같은 출처(내부) 링크의 경로 목록. */
  internalLinks: string[];
  /** 외부 출처(다른 origin) 링크 호스트 목록 — GEO 인용/권위 신호. */
  externalHosts: string[];
  firstParagraph: string;
}

/** 체커에 전달되는 사이트 컨텍스트. */
export interface AuditContext {
  /** 점검 대상 base URL(예: https://www.ohitech.co.kr). */
  baseUrl: string;
  /** 응답에 표기할 site_url. */
  siteUrl: string;
}

/** 사이트 단위 리소스(1회 fetch). */
export interface SiteResources {
  sitemap: FetchedPage;
  robots: FetchedPage;
  llms: FetchedPage;
}

/** 특정 @type을 가진 JSON-LD 노드가 있는지 검사. */
export function hasJsonLdType(nodes: Record<string, unknown>[], type: string): boolean {
  return nodes.some((n) => {
    const t = n["@type"];
    if (typeof t === "string") return t === type;
    if (Array.isArray(t)) return t.includes(type);
    return false;
  });
}

/** @type이 type인 첫 JSON-LD 노드 반환. */
export function findJsonLdType(
  nodes: Record<string, unknown>[],
  type: string
): Record<string, unknown> | undefined {
  return nodes.find((n) => {
    const t = n["@type"];
    if (typeof t === "string") return t === type;
    if (Array.isArray(t)) return t.includes(type);
    return false;
  });
}
