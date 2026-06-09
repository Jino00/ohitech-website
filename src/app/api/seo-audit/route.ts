// Agent: GET /api/seo-audit — 관리자 인증 게이트 후 사이트 SEO/AEO/GEO 자가점검 결과를 계약 JSON으로 반환.
import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedRequest } from "@/lib/adminAuth";
import { runAudit } from "@/lib/seo-audit/runAudit";

// 매 호출 시 라이브 페이지를 새로 fetch해야 하므로 캐시 비활성화.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// 다수 페이지 fetch + HEAD 검사를 위한 여유 시간.
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  // 인증: Bearer(SEO_AUDIT_TOKEN) 우선, 없으면 Basic(admin_users) 폴백.
  if (!isAuthorizedRequest(request.headers.get("authorization"))) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "WWW-Authenticate": 'Basic realm="seo-audit", Bearer' } }
    );
  }

  try {
    const report = await runAudit();
    return NextResponse.json(report, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Audit failed";
    return NextResponse.json({ error: "Audit failed", detail: message }, { status: 500 });
  }
}
