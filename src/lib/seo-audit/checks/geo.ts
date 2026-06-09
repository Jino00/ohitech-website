// Sub-Agent: GEO(생성형 AI 최적화) 체커들 — 엔티티 sameAs·인용/권위 신호·정보 최신성.
import type { Check, FetchedPage } from "../types";
import { findJsonLdType } from "../types";
import { mk } from "./util";
import type { PageResult } from "./aeo";

/** Organization sameAs 권위 프로필 링크(엔티티 명확성). */
export function checkEntitySameAs(results: PageResult[]): Check {
  let org: Record<string, unknown> | undefined;
  for (const r of results) {
    org = findJsonLdType(r.parsed.jsonLd, "Organization");
    if (org) break;
  }
  if (!org) {
    return mk("GEO", "entity_sameas", "엔티티 명확성(Organization sameAs)", "fail", "site",
      "Organization 스키마가 없어 AI가 엔티티를 명확히 식별하기 어렵습니다.",
      "Organization 스키마를 추가하고 sameAs로 권위 프로필(LinkedIn·위키데이터·네이버 지식스니펫 등)을 연결하세요.");
  }
  const sameAs = org["sameAs"];
  const links = Array.isArray(sameAs) ? sameAs.filter((x) => typeof x === "string") : typeof sameAs === "string" ? [sameAs] : [];
  const status = links.length >= 2 ? "pass" : links.length === 1 ? "warn" : "fail";
  return mk("GEO", "entity_sameas", "엔티티 명확성(Organization sameAs)", status, "site",
    links.length ? `sameAs 링크 ${links.length}개.` : "Organization 스키마에 sameAs가 없습니다.",
    status === "pass" ? "적정합니다." : "sameAs에 권위 프로필(LinkedIn·위키데이터·공식 SNS·디렉터리)을 2개 이상 연결해 엔티티를 강화하세요.");
}

/** 외부 인용/권위 출처 신호(생성형 AI 귀속 적합성). */
export function checkCitations(results: PageResult[]): Check {
  const contentPages = results.filter((r) => /\/insights|\/about|\/products/.test(r.page.url) || r.page.scope === "/");
  const withExternal = contentPages.filter((r) => r.parsed.externalHosts.length > 0);
  const allHosts = new Set<string>();
  for (const r of contentPages) for (const h of r.parsed.externalHosts) allHosts.add(h);
  const status = withExternal.length >= Math.ceil(contentPages.length / 2) ? "pass" : withExternal.length >= 1 ? "warn" : "warn";
  return mk("GEO", "citations_authority", "인용·출처·권위 신호", status, "site",
    `콘텐츠 페이지 ${contentPages.length}개 중 ${withExternal.length}개가 외부 출처를 링크(고유 외부 도메인 ${allHosts.size}개).`,
    status === "pass" ? "적정합니다." : "주장에 권위 있는 외부 출처(파트너사 공식 페이지·인증기관·표준 문서)를 인용 링크로 추가하면 AI 귀속 신뢰도가 올라갑니다.");
}

/** 정보 최신성 신호 — sitemap lastmod + Article 날짜. */
export function checkFreshness(results: PageResult[], sitemap: FetchedPage, now: Date): Check {
  // sitemap lastmod 중 가장 최근 날짜
  const lastmods = [...sitemap.html.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)]
    .map((m) => Date.parse(m[1]))
    .filter((t) => !Number.isNaN(t));
  const newest = lastmods.length ? Math.max(...lastmods) : NaN;
  const daysSince = Number.isNaN(newest) ? Infinity : Math.floor((now.getTime() - newest) / 86_400_000);

  // 인사이트(Article) 페이지의 날짜 노출 여부
  const articlePages = results.filter((r) => /\/insights\//.test(r.page.url));
  const withDates = articlePages.filter((r) => {
    const a = findJsonLdType(r.parsed.jsonLd, "Article") || findJsonLdType(r.parsed.jsonLd, "BlogPosting");
    return a && (a["dateModified"] || a["datePublished"]);
  });

  let status: "pass" | "warn" | "fail";
  if (Number.isNaN(newest)) status = "warn";
  else if (daysSince <= 90) status = "pass";
  else if (daysSince <= 365) status = "warn";
  else status = "fail";

  const datePart = Number.isNaN(newest) ? "sitemap에 lastmod 없음" : `최신 lastmod ${daysSince}일 전`;
  const articlePart = articlePages.length ? ` Article 날짜 노출 ${withDates.length}/${articlePages.length}.` : "";
  return mk("GEO", "freshness", "정보 최신성", status, "site",
    `${datePart}.${articlePart}`,
    status === "pass" ? "최신성 신호가 양호합니다." : "콘텐츠를 정기 갱신하고 sitemap lastmod·Article dateModified를 최신으로 유지하세요(AI는 최신 출처를 선호).");
}
