// Sub-Agent: URL 1개를 timeout+1회 재시도로 fetch하고 raw 응답·타이밍 신호를 반환한다(단일 책임).
// SSRF 방지: 리다이렉트를 수동 처리해 최초 대상과 동일 호스트로만 따라간다(메타데이터·내부망 차단).
import type { FetchedPage } from "./types";

const TIMEOUT_MS = 8000;
const RETRIES = 1;
const MAX_REDIRECTS = 3;
const MAX_BYTES = 5 * 1024 * 1024; // 응답 본문 상한 5MB(자원 고갈 방지)
const UA = "OHITech-SEO-Audit/1.0 (+https://www.ohitech.co.kr)";

interface FetchPageInput {
  url: string;
  scope: string;
  locale: "ko" | "en" | "zh" | "ja";
}

/** 응답 본문을 스트리밍으로 읽되 maxBytes 초과 시 즉시 중단(메모리 고갈 방지). */
async function readCapped(res: Response, maxBytes: number): Promise<string> {
  if (!res.body) return res.text();
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        total += value.length;
        if (total > maxBytes) {
          await reader.cancel();
          break;
        }
        chunks.push(value);
      }
    }
  } finally {
    reader.releaseLock?.();
  }
  return Buffer.concat(chunks.map((c) => Buffer.from(c))).toString("utf8");
}

/** http/https + 허용 호스트만 통과시키는 SSRF 가드. */
function isAllowed(target: URL, allowedHost: string): boolean {
  if (target.protocol !== "http:" && target.protocol !== "https:") return false;
  return target.host === allowedHost;
}

/**
 * redirect:"manual"로 직접 따라가며 매 홉마다 동일 호스트인지 검증한다.
 * 타 호스트로의 리다이렉트는 차단(SSRF). 반환: 최종 Response 또는 차단 사유 throw.
 */
async function safeFetch(
  initialUrl: string,
  method: "GET" | "HEAD",
  allowedHost: string,
  signal: AbortSignal
): Promise<Response> {
  let current = new URL(initialUrl);
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    if (!isAllowed(current, allowedHost)) {
      throw new Error(`blocked: disallowed host ${current.host}`);
    }
    const res = await fetch(current.toString(), {
      method,
      signal,
      redirect: "manual",
      headers:
        method === "GET"
          ? { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,text/plain,application/xml" }
          : { "User-Agent": UA },
      cache: "no-store",
    });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) return res; // 위치 없는 3xx는 그대로 반환
      current = new URL(loc, current); // 동일 호스트 검증은 루프 상단에서 재수행
      continue;
    }
    return res;
  }
  throw new Error("blocked: too many redirects");
}

/** 본문까지 GET. 실패 시 1회 재시도하고, 최종 실패는 ok:false로 보고(throw 안 함). */
export async function fetchPage({ url, scope, locale }: FetchPageInput): Promise<FetchedPage> {
  let lastError = "";
  const allowedHost = new URL(url).host;

  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const startedAt = Date.now();
    try {
      const res = await safeFetch(url, "GET", allowedHost, controller.signal);
      const ttfbMs = Date.now() - startedAt;

      // content-length가 과대하면 본문을 읽지 않고 즉시 차단(빠른 경로).
      const declared = Number(res.headers.get("content-length") || "0");
      let html = "";
      if (declared && declared > MAX_BYTES) {
        lastError = `body too large (${declared} bytes)`;
        res.body?.cancel().catch(() => {});
      } else {
        // 스트리밍 누적: content-length 미선언/과소 신고에도 MAX_BYTES에서 강제 중단.
        html = await readCapped(res, MAX_BYTES);
      }
      const totalMs = Date.now() - startedAt;
      clearTimeout(timer);

      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => {
        headers[k.toLowerCase()] = v;
      });

      return {
        url,
        scope,
        locale,
        status: res.status,
        ok: res.ok && html.length > 0,
        html,
        headers,
        bytes: Buffer.byteLength(html, "utf8"),
        ttfbMs,
        totalMs,
        error: lastError || undefined,
      };
    } catch (err) {
      clearTimeout(timer);
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  return {
    url,
    scope,
    locale,
    status: 0,
    ok: false,
    html: "",
    headers: {},
    bytes: 0,
    ttfbMs: 0,
    totalMs: 0,
    error: lastError,
  };
}

/** HEAD 요청으로 URL 도달 가능 여부만 확인(끊긴 링크 검사용, best-effort, 동일 호스트만). */
export async function headStatus(url: string): Promise<number> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const allowedHost = new URL(url).host;
    const res = await safeFetch(url, "HEAD", allowedHost, controller.signal);
    clearTimeout(timer);
    return res.status;
  } catch {
    clearTimeout(timer);
    return 0;
  }
}
