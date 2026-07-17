import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/schema";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const db = getDb();
  const partners = db.prepare("SELECT * FROM partners WHERE is_active = 1 ORDER BY sort_order").all();
  return NextResponse.json(partners);
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const body = await request.json();
    const db = getDb();
    const result = db.prepare(`
      INSERT INTO partners (name_ko, name_en, name_zh, name_ja, country, website, description_ko, description_en, description_zh, description_ja, category, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      body.name_ko, body.name_en, body.name_zh || "", body.name_ja || "",
      body.country || "", body.website || "",
      body.description_ko || "", body.description_en || "", body.description_zh || "", body.description_ja || "",
      body.category || "", body.sort_order || 0
    );
    return NextResponse.json({ id: result.lastInsertRowid });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 });
  }
}
