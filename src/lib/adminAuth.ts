// 관리자 자격증명 검증 공유 헬퍼 — /api/admin 로그인과 /api/seo-audit 보호가 동일 로직을 재사용한다.
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/schema";
import crypto from "crypto";

/** 세션 쿠키 이름 — 로그인 시 발급, 보호된 API에서 검증한다. */
export const SESSION_COOKIE_NAME = "admin_session";

/**
 * admin_users 테이블에 대해 username/password를 SHA256 해시로 검증한다.
 * 기존 POST /api/admin 과 동일한 방식(새 인증을 만들지 않음).
 */
export function verifyAdminCredentials(username: string, password: string): boolean {
  if (!username || !password) return false;
  try {
    const db = getDb();
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    const user = db
      .prepare("SELECT 1 FROM admin_users WHERE username = ? AND password_hash = ?")
      .get(username, hash);
    return Boolean(user);
  } catch {
    return false;
  }
}

/**
 * 요청의 Authorization 헤더로 관리자 권한을 검사한다.
 * 1) Bearer <SEO_AUDIT_TOKEN> (.env에 설정된 경우에만 허용)
 * 2) Basic base64(username:password) → admin_users 검증 (폴백)
 */
export function isAuthorizedRequest(authHeader: string | null): boolean {
  if (!authHeader) return false;

  const bearer = authHeader.match(/^Bearer\s+(.+)$/i);
  if (bearer) {
    const token = process.env.SEO_AUDIT_TOKEN;
    // 토큰이 .env에 설정된 경우에만 Bearer 인증 허용(미설정 시 우회 불가).
    if (token && timingSafeEqual(bearer[1].trim(), token)) return true;
    return false;
  }

  const basic = authHeader.match(/^Basic\s+(.+)$/i);
  if (basic) {
    let decoded = "";
    try {
      decoded = Buffer.from(basic[1].trim(), "base64").toString("utf8");
    } catch {
      return false;
    }
    const idx = decoded.indexOf(":");
    if (idx < 0) return false;
    const username = decoded.slice(0, idx);
    const password = decoded.slice(idx + 1);
    return verifyAdminCredentials(username, password);
  }

  return false;
}

/** 길이/내용 노출을 줄이는 상수시간 문자열 비교. */
function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/** admin_users에서 username의 password_hash를 읽는다(세션 서명 키로 사용). */
function getPasswordHash(username: string): string | null {
  try {
    const db = getDb();
    const row = db
      .prepare("SELECT password_hash FROM admin_users WHERE username = ?")
      .get(username) as { password_hash: string } | undefined;
    return row?.password_hash ?? null;
  } catch {
    return null;
  }
}

/**
 * 로그인 성공 시 발급할 세션 토큰을 만든다.
 * 토큰 = base64url(username).HMAC_SHA256(key=password_hash, msg=username)
 * 비밀번호가 바뀌면 password_hash가 바뀌어 기존 토큰이 자동 무효화된다.
 */
export function createAdminSessionToken(username: string): string | null {
  const hash = getPasswordHash(username);
  if (!hash) return null;
  const sig = crypto.createHmac("sha256", hash).update(username).digest("hex");
  const u = Buffer.from(username, "utf8").toString("base64url");
  return `${u}.${sig}`;
}

/** 세션 토큰의 서명을 password_hash로 재검증한다. */
export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const u = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let username = "";
  try {
    username = Buffer.from(u, "base64url").toString("utf8");
  } catch {
    return false;
  }
  const hash = getPasswordHash(username);
  if (!hash) return false;
  const expected = crypto.createHmac("sha256", hash).update(username).digest("hex");
  return timingSafeEqual(sig, expected);
}

/**
 * 관리자 요청 인증: 세션 쿠키(브라우저) 또는 Authorization 헤더(외부 도구) 둘 다 허용.
 */
export function isAuthenticatedAdmin(request: NextRequest): boolean {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (verifyAdminSessionToken(cookie)) return true;
  if (isAuthorizedRequest(request.headers.get("authorization"))) return true;
  return false;
}

/**
 * 보호된 라우트 가드. 미인증이면 401 응답을 반환하고, 인증되면 null을 반환한다.
 * 사용: `const denied = requireAdmin(request); if (denied) return denied;`
 */
export function requireAdmin(request: NextRequest): NextResponse | null {
  if (isAuthenticatedAdmin(request)) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
