import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/adminAuth";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Simple token (in production, use JWT)
    const token = crypto.randomBytes(32).toString("hex");
    return NextResponse.json({ token, username });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
