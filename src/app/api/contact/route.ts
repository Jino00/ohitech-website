import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, company_name, contact_name, email, phone, country, subject, message, product_id } = body;

    if (!contact_name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = getDb();
    db.prepare(`
      INSERT INTO inquiries (type, company_name, contact_name, email, phone, country, product_id, subject, message)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(type || "general", company_name || "", contact_name, email, phone || "", country || "", product_id || null, subject, message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
