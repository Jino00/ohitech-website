// Harness: 대상 페이지를 fetch·파싱하고 SEO/AEO/GEO 체커를 실행해 AuditReport로 집계한다.
// Sub-Agent들의 출력을 모으는 허브 — 체커끼리 직접 호출하지 않는다(원칙 18).
import type { AuditContext, AuditReport, Check, FetchedPage, ParsedPage } from "./types";
import { fetchPage } from "./fetchPage";
import { parsePage } from "./parse";
import {
  checkInternalLinks,
  checkLocaleStrategy,
  checkRobots,
  checkSitemap,
  seoPageChecks,
} from "./checks/seo";
import {
  aeoPageChecks,
  checkFaqSchema,
  checkLlmsTxt,
  checkNap,
  type PageResult,
} from "./checks/aeo";
import { checkCitations, checkEntitySameAs, checkFreshness } from "./checks/geo";

type Locale = "ko" | "en" | "zh";

/** 전 로케일 점검 대상 경로(라이브 사이트의 실제 페이지). power-distribution은 계약 전 비노출이라 제외. */
const PAGES = [
  "/",
  "/about",
  "/products",
  "/products/semiconductor-parts",
  "/products/laser-equipment",
  "/products/ev-charging",
  "/products/thermal-management",
  "/insights",
  "/insights/semiconductor-parts/esc",
  "/insights/ev-charging/ev-charger-skd-localization",
  "/insights/thermal-management/thermal-management",
  "/contact",
];

const LOCALES: Locale[] = ["ko", "en", "zh"];
const CONCURRENCY = 6;

const DEFAULT_BASE_URL = "https://www.ohitech.co.kr";

/** 환경변수 기반 컨텍스트 생성. site_url은 실제로 점검한 base를 정직하게 반영한다. */
export function getAuditContext(): AuditContext {
  const baseUrl = (process.env.SEO_AUDIT_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
  return { baseUrl, siteUrl: baseUrl };
}

interface Target {
  url: string;
  scope: string;
  locale: Locale;
}

function buildTargets(baseUrl: string): Target[] {
  const targets: Target[] = [];
  for (const path of PAGES) {
    for (const locale of LOCALES) {
      const query = locale === "ko" ? "" : `?lang=${locale}`;
      targets.push({
        url: `${baseUrl}${path}${query}`,
        scope: `${path}${query}`,
        locale,
      });
    }
  }
  return targets;
}

/** 동시성 제한 map. */
async function mapPool<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

/** 메인 진입점 — 점검 실행 후 계약 JSON 반환. */
export async function runAudit(): Promise<AuditReport> {
  const ctx = getAuditContext();
  const now = new Date();
  const targets = buildTargets(ctx.baseUrl);

  // 1) 페이지 fetch (동시성 제한)
  const fetched = await mapPool(targets, CONCURRENCY, (t) =>
    fetchPage({ url: t.url, scope: t.scope, locale: t.locale })
  );

  // 2) 사이트 리소스 fetch
  const [sitemap, robots, llms] = await Promise.all([
    fetchPage({ url: `${ctx.baseUrl}/sitemap.xml`, scope: "site", locale: "ko" }),
    fetchPage({ url: `${ctx.baseUrl}/robots.txt`, scope: "site", locale: "ko" }),
    fetchPage({ url: `${ctx.baseUrl}/llms.txt`, scope: "site", locale: "ko" }),
  ]);

  // 3) 파싱 + 페이지 체크
  const checks: Check[] = [];
  const results: PageResult[] = [];
  for (const page of fetched) {
    if (!page.ok || !page.html) {
      checks.push({
        category: "SEO",
        id: "page_unreachable",
        title: "페이지 접근 가능성",
        status: "fail",
        scope: page.scope,
        detail: `페이지 fetch 실패 (status ${page.status}${page.error ? `, ${page.error}` : ""}).`,
        recommendation: "해당 URL이 200으로 응답하는지, 라이브 배포 상태인지 확인하세요.",
      });
      continue;
    }
    const parsed: ParsedPage = parsePage(page);
    results.push({ page, parsed });
    checks.push(...seoPageChecks(page, parsed));
    checks.push(...aeoPageChecks(page, parsed));
  }

  // 4) 사이트 단위 체크
  checks.push(checkSitemap(sitemap));
  checks.push(checkRobots(robots));
  checks.push(checkLocaleStrategy(ctx));
  checks.push(await checkInternalLinks(results.map((r) => r.parsed), ctx));
  checks.push(checkFaqSchema(results));
  checks.push(checkLlmsTxt(llms));
  checks.push(checkNap(results));
  checks.push(checkEntitySameAs(results));
  checks.push(checkCitations(results));
  checks.push(checkFreshness(results, sitemap, now));

  // 5) summary 집계
  const summary = {
    seo: { pass: 0, warn: 0, fail: 0 },
    aeo: { pass: 0, warn: 0, fail: 0 },
    geo: { pass: 0, warn: 0, fail: 0 },
  };
  for (const c of checks) {
    const key = c.category.toLowerCase() as "seo" | "aeo" | "geo";
    summary[key][c.status]++;
  }

  return {
    audited_at: now.toISOString(),
    site_url: ctx.siteUrl,
    summary,
    checks,
  };
}
