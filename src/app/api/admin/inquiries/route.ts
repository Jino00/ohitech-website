import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/schema";

export async function GET() {
  const db = getDb();
  const inquiries = db.prepare("SELECT * FROM inquiries ORDER BY created_at DESC").all();
  return NextResponse.json(inquiries);
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    const db = getDb();
    db.prepare("UPDATE inquiries SET status = ? WHERE id = ?").run(status, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
