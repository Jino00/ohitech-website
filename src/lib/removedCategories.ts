/**
 * 사이트에서 삭제한 제품 카테고리(Jino 2026-10-22 20:53 «hortech 관련 레이저 정밀가공장비는 삭제해줘»,
 * 20:55 «TECO는 삭제했잖아»). 공개 표면(메뉴·홈 카드·카테고리 페이지·사이트맵·JSON-LD·seo-audit)에서 제외하고
 * /products/<slug>(하위 포함)는 next.config.ts에서 /products로 리다이렉트한다.
 * DB 행(product_categories·products·partners)은 문의 기록 FK 보존을 위해 그대로 둔다 — 화면에서만 뺀다.
 */
export const REMOVED_PRODUCT_CATEGORIES: readonly string[] = ["laser-equipment", "power-distribution"];

export function isRemovedCategory(slug: string | null | undefined): boolean {
  return !!slug && REMOVED_PRODUCT_CATEGORIES.includes(slug);
}

/** SQL `NOT IN (...)` 안에 넣을 고정 리터럴 목록(상수만 — 사용자 입력 아님). */
export const REMOVED_CATEGORIES_SQL = REMOVED_PRODUCT_CATEGORIES.map((s) => `'${s}'`).join(", ");
