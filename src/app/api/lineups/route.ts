import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/schema";

// GET: 라인업 목록 조회 (product_id 필터 가능)
export async function GET(request: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product_id");

  let lineups;
  if (productId) {
    lineups = db
      .prepare(
        `SELECT l.*, p.name_ko as product_name_ko, p.name_en as product_name_en, p.name_zh as product_name_zh
         FROM product_lineups l
         JOIN products p ON l.product_id = p.id
         WHERE l.product_id = ?
         ORDER BY l.sort_order`
      )
      .all(Number(productId));
  } else {
    lineups = db
      .prepare(
        `SELECT l.*, p.name_ko as product_name_ko, p.name_en as product_name_en, p.name_zh as product_name_zh
         FROM product_lineups l
         JOIN products p ON l.product_id = p.id
         ORDER BY l.product_id, l.sort_order`
      )
      .all();
  }

  return NextResponse.json(lineups);
}

// POST: 새 라인업 등록
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = getDb();

    const result = db
      .prepare(
        `INSERT INTO product_lineups (product_id, model_name, name_ko, name_en, name_zh, description_ko, description_en, description_zh, specifications, image_url, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        body.product_id,
        body.model_name || "",
        body.name_ko,
        body.name_en || "",
        body.name_zh || "",
        body.description_ko || "",
        body.description_en || "",
        body.description_zh || "",
        body.specifications || "{}",
        body.image_url || "",
        body.sort_order || 0
      );

    return NextResponse.json({ id: result.lastInsertRowid });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create lineup" },
      { status: 500 }
    );
  }
}

// PUT: 라인업 수정
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const db = getDb();

    db.prepare(
      `UPDATE product_lineups SET
        model_name = ?, name_ko = ?, name_en = ?, name_zh = ?,
        description_ko = ?, description_en = ?, description_zh = ?,
        specifications = ?, image_url = ?, is_active = ?, sort_order = ?,
        updated_at = datetime('now')
       WHERE id = ?`
    ).run(
      body.model_name || "",
      body.name_ko,
      body.name_en || "",
      body.name_zh || "",
      body.description_ko || "",
      body.description_en || "",
      body.description_zh || "",
      body.specifications || "{}",
      body.image_url || "",
      body.is_active ?? 1,
      body.sort_order || 0,
      body.id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update lineup" },
      { status: 500 }
    );
  }
}

// DELETE: 라인업 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const db = getDb();
    db.prepare("DELETE FROM product_lineups WHERE id = ?").run(Number(id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete lineup" },
      { status: 500 }
    );
  }
}
