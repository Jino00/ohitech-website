// Sub-Agent: AEO(AI 답변엔진 최적화) 체커들 — FAQ 스키마·llms.txt·답변 명확성·NAP.
import type { Check, FetchedPage, ParsedPage } from "../types";
import { findJsonLdType, hasJsonLdType } from "../types";
import { cpLen, mk } from "./util";

export interface PageResult {
  page: FetchedPage;
  parsed: ParsedPage;
}

/** 페이지 단위 AEO 체크 — 첫 문단 답변 명확성(AI 추출 적합성). */
export function aeoPageChecks(page: FetchedPage, p: ParsedPage): Check[] {
  const len = cpLen(p.firstParagraph);
  const status = len >= 60 ? "pass" : len === 0 ? "fail" : "warn";
  return [
    mk("AEO", "answer_clarity", "답변 명확성(첫 문단)", status, page.scope,
      len === 0 ? "본문에서 의미 있는 첫 문단을 추출하지 못했습니다(텍스트 콘텐츠 부족)." : `첫 문단 ${len}자.`,
      len >= 60 ? "결론 먼저 서술로 AI 추출에 적합합니다." : "각 페이지 첫 문단에 핵심 답변을 명확히 배치하면 AI 인용 가능성이 높아집니다."),
  ];
}

/** FAQPage 스키마 보급률(사이트 단위). */
export function checkFaqSchema(results: PageResult[]): Check {
  const withFaq = results.filter((r) => hasJsonLdType(r.parsed.jsonLd, "FAQPage"));
  const status = withFaq.length >= 3 ? "pass" : withFaq.length >= 1 ? "warn" : "fail";
  return mk("AEO", "faqpage_schema", "FAQ / FAQPage 스키마", status, "site",
    `점검 ${results.length}개 페이지 중 ${withFaq.length}개에 FAQPage 스키마 존재.`,
    status === "pass" ? "적정합니다." : "주요 제품/인사이트 페이지에 FAQ 섹션 + FAQPage 스키마를 추가하세요(AI 답변 인용에 유리).");
}

/** llms.txt 존재(사이트 단위). */
export function checkLlmsTxt(llms: FetchedPage): Check {
  const ok = llms.ok && llms.status === 200 && llms.bytes > 0;
  return mk("AEO", "llms_txt", "llms.txt", ok ? "pass" : "fail", "site",
    ok ? `llms.txt 존재 (${Math.round(llms.bytes / 1024)}KB).` : `llms.txt 응답 ${llms.status || "실패"}.`,
    ok ? "적정합니다." : "사이트 루트에 회사·제품 요약 llms.txt를 제공하세요.");
}

/** NAP(상호·주소·연락처) 명확성(사이트 단위). */
export function checkNap(results: PageResult[]): Check {
  // 모든 페이지의 JSON-LD에서 Organization 노드 탐색
  let org: Record<string, unknown> | undefined;
  for (const r of results) {
    org = findJsonLdType(r.parsed.jsonLd, "Organization");
    if (org) break;
  }
  if (!org) {
    return mk("AEO", "nap_clarity", "회사 정보(NAP) 명확성", "warn", "site",
      "Organization 스키마를 찾지 못해 NAP를 구조적으로 확인할 수 없습니다.",
      "Organization 스키마에 name·telephone·address·email을 명시하세요.");
  }
  const fields = ["telephone", "address", "email", "contactPoint"];
  const present = fields.filter((f) => org![f]);
  const status = present.length >= 3 ? "pass" : present.length >= 1 ? "warn" : "fail";
  return mk("AEO", "nap_clarity", "회사 정보(NAP) 명확성", status, "site",
    `Organization 스키마 보유 필드: ${present.length ? present.join(", ") : "없음"}.`,
    status === "pass" ? "적정합니다." : "Organization 스키마에 telephone·address·contactPoint를 추가해 연락처를 명확히 하세요.");
}
