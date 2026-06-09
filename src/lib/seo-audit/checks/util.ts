// 체커 공용 유틸 — 코드포인트 길이 계산과 Check 객체 생성 헬퍼.
import type { Category, Check, Status } from "../types";

/** 코드포인트 기준 길이(한글 1자 = 1). */
export function cpLen(s: string): number {
  return Array.from(s).length;
}

/** Check 객체 생성 헬퍼. */
export function mk(
  category: Category,
  id: string,
  title: string,
  status: Status,
  scope: string,
  detail: string,
  recommendation: string
): Check {
  return { category, id, title, status, scope, detail, recommendation };
}
