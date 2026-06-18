import { NextRequest, NextResponse } from "next/server";
import {
  verifyAdminCredentials,
  createAdminSessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/adminAuth";

const SESSION_MAX_AGE = 60 * 60 * 8; // 8시간

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createAdminSessionToken(username);
    if (!token) {
      return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }

    const res = NextResponse.json({ success: true, username });
    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

// 로그아웃 — 세션 쿠키 제거
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return res;
}
