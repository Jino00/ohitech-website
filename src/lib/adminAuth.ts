// 관리자 자격증명 검증 공유 헬퍼 — /api/admin 로그인과 /api/seo-audit 보호가 동일 로직을 재사용한다.
import { getDb } from "@/db/schema";
import crypto from "crypto";

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
