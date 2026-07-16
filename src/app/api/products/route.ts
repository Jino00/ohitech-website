import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/schema";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let products;
  if (category) {
    products = db.prepare(`
      SELECT p.*, c.slug as category_slug, c.name_ko as cat_name_ko, c.name_en as cat_name_en, c.name_zh as cat_name_zh, c.name_ja as cat_name_ja,
             pr.name_ko as partner_name_ko, pr.name_en as partner_name_en, pr.name_zh as partner_name_zh, pr.name_ja as partner_name_ja
      FROM products p
      JOIN product_categories c ON p.category_id = c.id
      JOIN partners pr ON p.partner_id = pr.id
      WHERE p.is_active = 1 AND c.slug = ?
      ORDER BY p.sort_order
    `).all(category);
  } else {
    products = db.prepare(`
      SELECT p.*, c.slug as category_slug, c.name_ko as cat_name_ko, c.name_en as cat_name_en, c.name_zh as cat_name_zh, c.name_ja as cat_name_ja,
             pr.name_ko as partner_name_ko, pr.name_en as partner_name_en, pr.name_zh as partner_name_zh, pr.name_ja as partner_name_ja
      FROM products p
      JOIN product_categories c ON p.category_id = c.id
      JOIN partners pr ON p.partner_id = pr.id
      WHERE p.is_active = 1
      ORDER BY p.sort_order
    `).all();
  }

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const body = await request.json();
    const db = getDb();
    const result = db.prepare(`
      INSERT INTO products (partner_id, category_id, name_ko, name_en, name_zh, name_ja, description_ko, description_en, description_zh, description_ja, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      body.partner_id, body.category_id,
      body.name_ko, body.name_en, body.name_zh || "", body.name_ja || "",
      body.description_ko || "", body.description_en || "", body.description_zh || "", body.description_ja || "",
      body.sort_order || 0
    );
    return NextResponse.json({ id: result.lastInsertRowid });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
