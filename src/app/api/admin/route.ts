import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/schema";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const db = getDb();
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    const user = db.prepare("SELECT * FROM admin_users WHERE username = ? AND password_hash = ?").get(username, hash);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Simple token (in production, use JWT)
    const token = crypto.randomBytes(32).toString("hex");
    return NextResponse.json({ token, username });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
