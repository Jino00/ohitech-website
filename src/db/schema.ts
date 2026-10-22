import Database from "better-sqlite3";
import path from "path";
import { JA_PARTNERS, JA_CATEGORIES, JA_PRODUCTS } from "./ja-translations";

const DB_PATH = path.join(process.cwd(), "data", "ohitech.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const fs = require("fs");
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initializeDb(db);
  }
  return db;
}

function initializeDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_ko TEXT NOT NULL,
      name_en TEXT NOT NULL,
      name_zh TEXT NOT NULL DEFAULT '',
      name_ja TEXT NOT NULL DEFAULT '',
      country TEXT NOT NULL DEFAULT '',
      website TEXT DEFAULT '',
      logo_url TEXT DEFAULT '',
      description_ko TEXT DEFAULT '',
      description_en TEXT DEFAULT '',
      description_zh TEXT DEFAULT '',
      description_ja TEXT DEFAULT '',
      category TEXT NOT NULL DEFAULT '',
      is_active INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS product_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_ko TEXT NOT NULL,
      name_en TEXT NOT NULL,
      name_zh TEXT NOT NULL DEFAULT '',
      name_ja TEXT NOT NULL DEFAULT '',
      slug TEXT NOT NULL UNIQUE,
      parent_id INTEGER DEFAULT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (parent_id) REFERENCES product_categories(id)
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      partner_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL,
      name_ko TEXT NOT NULL,
      name_en TEXT NOT NULL,
      name_zh TEXT NOT NULL DEFAULT '',
      name_ja TEXT NOT NULL DEFAULT '',
      description_ko TEXT DEFAULT '',
      description_en TEXT DEFAULT '',
      description_zh TEXT DEFAULT '',
      description_ja TEXT DEFAULT '',
      specifications TEXT DEFAULT '{}',
      image_url TEXT DEFAULT '',
      datasheet_url TEXT DEFAULT '',
      is_active INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (partner_id) REFERENCES partners(id),
      FOREIGN KEY (category_id) REFERENCES product_categories(id)
    );

    CREATE TABLE IF NOT EXISTS product_lineups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      model_name TEXT NOT NULL DEFAULT '',
      name_ko TEXT NOT NULL,
      name_en TEXT NOT NULL DEFAULT '',
      name_zh TEXT NOT NULL DEFAULT '',
      name_ja TEXT NOT NULL DEFAULT '',
      description_ko TEXT DEFAULT '',
      description_en TEXT DEFAULT '',
      description_zh TEXT DEFAULT '',
      description_ja TEXT DEFAULT '',
      specifications TEXT DEFAULT '{}',
      image_url TEXT DEFAULT '',
      is_active INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL DEFAULT 'general',
      company_name TEXT DEFAULT '',
      contact_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      country TEXT DEFAULT '',
      product_id INTEGER DEFAULT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Existing DBs predate the _ja columns — CREATE TABLE IF NOT EXISTS won't add them.
  // Must run before any seed/migration/backfill touches _ja.
  ensureJaColumns(db);

  // Seed data if empty (fresh DB)
  const count = db.prepare("SELECT COUNT(*) as cnt FROM partners").get() as { cnt: number };
  if (count.cnt === 0) {
    seedData(db);
  } else {
    // Existing DB: run idempotent migrations to add new partners/categories/products
    ensureMigrations(db);
  }

  // Fills _ja for both fresh and existing rows. Sole source of ja translations —
  // seedData/ensureMigrations deliberately don't carry them, so there's one place to edit.
  backfillJaTranslations(db);
}

/** ALTER TABLE ADD COLUMN, skipped if the column already exists (SQLite has no IF NOT EXISTS). */
function ensureColumn(db: Database.Database, table: string, column: string, ddl: string) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  if (!cols.some((c) => c.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${ddl}`);
  }
}

/** 2026-07-16: ja locale. Idempotent — safe on every boot. */
function ensureJaColumns(db: Database.Database) {
  ensureColumn(db, "partners", "name_ja", "TEXT NOT NULL DEFAULT ''");
  ensureColumn(db, "partners", "description_ja", "TEXT DEFAULT ''");
  ensureColumn(db, "product_categories", "name_ja", "TEXT NOT NULL DEFAULT ''");
  ensureColumn(db, "products", "name_ja", "TEXT NOT NULL DEFAULT ''");
  ensureColumn(db, "products", "description_ja", "TEXT DEFAULT ''");
  ensureColumn(db, "product_lineups", "name_ja", "TEXT NOT NULL DEFAULT ''");
  ensureColumn(db, "product_lineups", "description_ja", "TEXT DEFAULT ''");
}

/**
 * ── 2026-10-22: Grand Hitek 드라이 진공 펌프 — 최상위 카테고리 `vacuum-pump` ──
 * 출처: Grand Hitek 공식 홈페이지·회사소개서(2025.12). seedData(새 DB)와 ensureMigrations(운영 DB)가 이 값을 같이 쓴다.
 * ja 번역은 ja-translations.ts(backfillJaTranslations)가 단일 원본이다.
 * 이름: 반도체 한정 제거(Jino 10-22 16:52 «반도체용만 있는게 아니잖아» — 디스플레이·태양광·2차전지·LED에도 쓰임).
 * 순서: 카테고리 탭·홈 카드 맨 앞(Jino 10-22 16:55) — sort_order를 기존 최솟값(1)보다 작은 0으로.
 */
const VACUUM_PUMP_SLUG = "vacuum-pump";
const VACUUM_PUMP_CATEGORY = {
  ko: "드라이 진공 펌프",
  en: "Dry Vacuum Pumps",
  zh: "干式真空泵",
  ja: "ドライ真空ポンプ", // ja-translations.ts JA_CATEGORIES와 같은 값 — 이름 교정 UPDATE에서만 쓴다
  slug: VACUUM_PUMP_SLUG,
  sort: 0,
};
/** PR #11(2026-10-22) 배포 때 들어간 옛 이름 — 이 값일 때만 새 이름으로 바꾼다(관리자 수정값은 덮지 않음). */
const VACUUM_PUMP_OLD_NAMES = {
  ko: "반도체 드라이 진공 펌프",
  en: "Semiconductor Dry Vacuum Pumps",
  zh: "半导体干式真空泵",
  ja: "半導体ドライ真空ポンプ",
};

const GRANDHITEK_PARTNER = {
  name_ko: "그랜드하이텍",
  name_en: "Grandhitek", // ensureMigrations·JA_PARTNERS·ProductList(partnerMatch)의 고정 키 — 바꾸지 말 것
  name_zh: "通嘉科技",
  country: "China",
  website: "https://www.grandhitek.com.cn",
  desc_ko:
    "2012년 중국 베이징에서 설립된 반도체 진공 장비 기업(北京通嘉宏瑞科技股份有限公司, 브랜드 通嘉科技 / Grand Hitek). 드라이 진공 펌프(GLR·GMR·GHC·GS·GHR)와 통합 진공 시스템, GTP 분자 펌프, 진공 펌프 유지보수·정밀 재생 코팅을 공급합니다. OHI Tech는 Grand Hitek의 한국 공식 파트너입니다.",
  desc_en:
    "Semiconductor vacuum equipment company founded in 2012 in Beijing, China (Beijing Grand Hitek Co., Ltd., brand 通嘉科技). Supplies GLR, GMR, GHC, GS and GHR dry vacuum pumps, integrated vacuum systems, GTP molecular pumps, and pump overhaul and precision regenerative coating services. OHI Tech is Grand Hitek's official partner in Korea.",
  desc_zh:
    "2012年成立于中国北京的半导体真空装备企业（北京通嘉宏瑞科技股份有限公司，品牌：通嘉科技）。提供GLR、GMR、GHC、GS、GHR系列干式真空泵、真空集成一体机、GTP分子泵，以及真空泵运维与精密再生涂层服务。OHI Tech为通嘉科技韩国官方合作伙伴。",
  category: VACUUM_PUMP_SLUG,
  sort: 4,
};

/** 옛 단일 제품(seedData pid 4). 시리즈 행으로 대체 — 문의 FK 보존을 위해 삭제하지 않고 옮겨서 비활성화한다. */
const LEGACY_DRY_PUMP_NAME_EN = "Dry Vacuum Pump";

/**
 * 모델·최대 배기속도는 Grand Hitek 공식 홈페이지 사양표(2026-10-22 수집), 사양 옵션(N/T/Z/L)은 회사소개서(2025.12).
 * name_en이 멱등 키다(ensureVacuumPumpCategory·JA_PRODUCTS) — 배포 후에는 바꾸지 말 것.
 */
const GRANDHITEK_SERIES = [
  {
    ko: "GLR · GLR-P 시리즈 드라이 펌프 (다단 루츠)",
    en: "GLR / GLR-P Series Dry Pump (Multistage Roots)",
    zh: "GLR · GLR-P系列多级罗茨干泵",
    dko: "클린·일반 공정용 다단 루츠 드라이 펌프. 최대 배기속도 110~4,500 m³/h. 반도체 Load Lock·Transfer·PVD·Coater 권장, 디스플레이·LED·2차전지·태양광에도 사용.",
    den: "Multistage Roots dry pump for clean and general processes, 110–4,500 m³/h max. Recommended for semiconductor load lock, transfer, PVD and coater; also used in display, LED, lithium battery and solar PV.",
    dzh: "清洁与一般工艺用多级罗茨干泵，最大抽速110~4,500 m³/h。半导体推荐用于loadlock、Transfer、PVD、Coater，亦广泛用于面板显示、LED、锂电与光伏。",
    specs: {
      mechanism: "Multistage Roots",
      process_duty: "Clean, General",
      pumping_speed: "110–4,500 m³/h (max)",
      models: "GLR120, GLR500, GLR2000, GLR3000, GLR3500, GLR5000; GLR-P: GLR3000P, GLR5000",
      recommended_processes: "Load Lock, Transfer, PVD, Coater",
    },
    image: "/images/products/grandhitek/glr.webp",
    sort: 1,
  },
  {
    ko: "GMR 시리즈 드라이 펌프 (다단 루츠)",
    en: "GMR Series Dry Pump (Multistage Roots)",
    zh: "GMR系列多级罗茨干泵",
    dko: "반도체 식각·이온주입 공정 챔버용 다단 루츠 드라이 펌프. 최대 배기속도 210~1,800 m³/h, 저전력·내부식·작은 설치 면적. 니켈합금(N) 사양.",
    den: "Multistage Roots dry pump mainly for semiconductor etch and ion implantation chambers, 210–1,800 m³/h max. Low power, corrosion resistant, small footprint; nickel-alloy (N) version available.",
    dzh: "主要用于半导体刻蚀与离子注入工艺腔的多级罗茨干泵，最大抽速210~1,800 m³/h；低能耗、抗腐蚀、占地小，可选镍合金（N）版本。",
    specs: {
      mechanism: "Multistage Roots",
      process_duty: "Clean, General",
      pumping_speed: "210–1,800 m³/h (max)",
      models: "GMR200, GMR600, GMR1200, GMR1800",
      recommended_processes: "IMP Source, Strip/Ashing, Oxide Etch, Poly Etch, Metal Etch (6/8-inch fab), HDP",
      options: "N: nickel alloy",
    },
    image: "/images/products/grandhitek/gmr.webp",
    sort: 2,
  },
  {
    ko: "GHC 시리즈 드라이 펌프 (일체형 클로)",
    en: "GHC Series Dry Pump (Integrated Claw)",
    zh: "GHC系列新型一体爪式干泵",
    dko: "분진 처리 능력이 강한 가혹 공정용 일체형 클로 드라이 펌프. 최대 배기속도 220~5,500 m³/h. ALD·PECVD·LPCVD·SACVD·MOCVD·Metal Etch 권장. 고온(T)·초고온(Z)·저온(L) 사양.",
    den: "Integrated claw dry pump with strong dust handling for harsh processes, 220–5,500 m³/h max. Recommended for ALD, PECVD, LPCVD, SACVD, MOCVD and metal etch; high-, ultra-high- and low-temperature versions.",
    dzh: "处理粉尘能力极强、适合苛刻工艺的新型一体爪式干泵，最大抽速220~5,500 m³/h。推荐用于ALD、PECVD、LPCVD、SACVD、MOCVD、Metal Etch；提供高温（T）、超高温（Z）、低温（L）版本。",
    specs: {
      mechanism: "Integrated Claw",
      process_duty: "Clean, General, Harsh",
      pumping_speed: "220–5,500 m³/h (max)",
      models: "GHC200, GHC500, GHC600, GHC1200, GHC1800, GHC3000, GHC5000, GHC6000",
      recommended_processes: "ALD, PECVD, LPCVD, SACVD, MOCVD, Metal Etch",
      options: "T: high temp, Z: ultra-high temp, L: low temp",
    },
    image: "/images/products/grandhitek/ghc.webp",
    sort: 3,
  },
  {
    ko: "GS 시리즈 드라이 펌프 (신형 일체형 클로)",
    en: "GS Series Dry Pump (Integrated Claw)",
    zh: "GS系列新型一体爪式干泵",
    dko: "클린·일반·가혹 공정용 신형 일체형 클로 드라이 펌프. 최대 배기속도 1,800~5,500 m³/h, 태양광(PV) 등에 폭넓게 사용.",
    den: "New integrated claw dry pump for clean, general and harsh processes, 1,800–5,500 m³/h max, widely used in solar PV and other markets.",
    dzh: "可应用于清洁、一般及苛刻工艺的新型一体爪式干泵，最大抽速1,800~5,500 m³/h，广泛应用于光伏等领域。",
    specs: {
      mechanism: "Integrated Claw",
      process_duty: "Clean, General, Harsh",
      pumping_speed: "1,800–5,500 m³/h (max)",
      models: "GS1800, GS1800H, GS2000E, GS2400E, GS3000, GS3600E, GS4200S, GS5000, GS6000",
      main_market: "Solar PV",
    },
    image: "/images/products/grandhitek/gs.webp",
    sort: 4,
  },
  {
    ko: "GHR 시리즈 드라이 펌프 (고유량 H₂ · 다단 루츠)",
    en: "GHR Series Dry Pump (High-flow H2, Multistage Roots)",
    zh: "GHR系列多级罗茨干泵（高流量H₂）",
    dko: "고유량 수소(H₂) 공정용 다단 루츠 드라이 펌프. 최대 배기속도 600~650 m³/h. MOCVD·Si EPI·SiC EPI·HJT 권장.",
    den: "Multistage Roots dry pump for high-flow hydrogen (H₂) processes, 600–650 m³/h max. Recommended for MOCVD, Si EPI, SiC EPI and HJT.",
    dzh: "面向高流量H₂工艺的多级罗茨干泵，最大抽速600~650 m³/h。推荐用于MOCVD、Si EPI、SiC EPI、HJT。",
    specs: {
      mechanism: "Multistage Roots",
      process_duty: "Medium, Harsh (high-flow H2)",
      pumping_speed: "600–650 m³/h (max)",
      models: "GHR600, GHR700",
      recommended_processes: "MOCVD, Si EPI, SiC EPI, HJT",
    },
    image: "/images/products/grandhitek/ghr.webp",
    sort: 5,
  },
  {
    ko: "통합 진공 시스템 (Mizar · Megrez · Merak · Alioth · Phecda)",
    en: "Integrated Vacuum Systems (Mizar, Megrez, Merak, Alioth, Phecda)",
    zh: "真空集成一体机（开阳·天权·天璇·玉衡·天玑）",
    dko: "드라이 펌프·부스터·칠러·배기가스 처리·플라즈마 장치를 묶은 통합 시스템 5종. 훅업 비용·Facility 연결점·설치 면적·설치 시간 절감.",
    den: "Five integrated systems combining dry pumps, boosters, chillers, exhaust gas abatement or plasma units, reducing hookup costs, facility points, footprint and installation time.",
    dzh: "集成干泵、增压泵、冷水机、尾气处理或等离子装置的5款一体机，降低Hookup成本与Facility点位需求，节省占地并缩短安装时间。",
    specs: {
      models: "Mizar, Megrez, Merak, Alioth, Phecda",
      type: "Integrated vacuum system",
    },
    image: "/images/products/grandhitek/system-merak.webp",
    sort: 6,
  },
  {
    ko: "분자 펌프 (GTP 시리즈)",
    en: "Molecular Pumps (GTP Series)",
    zh: "分子泵（GTP系列）",
    dko: "자기부상 GTP-M(N₂ 1,850~4,300 L/s), 그리스 윤활 GTP-G·L(N₂ 300~4,200 L/s), 계측기용 GTP-H80·H80D(N₂ 90 L/s)와 전용 전원.",
    den: "Magnetically levitated GTP-M (N₂ 1,850–4,300 L/s), grease-lubricated GTP-G/L (N₂ 300–4,200 L/s), instrument GTP-H80/H80D (N₂ 90 L/s) and dedicated power supplies.",
    dzh: "磁悬浮GTP-M（N₂ 1,850~4,300 L/s）、脂润滑GTP-G·L（N₂ 300~4,200 L/s）、仪器用GTP-H80·H80D（N₂ 90 L/s）及适配电源。",
    specs: {
      models: "GTP-M2201, GTP-M3400, GTP-M4500, GTP-G300, GTP-G800, GTP-G1400, GTP-G2400, GTP-L4400, GTP-H80, GTP-H80D",
      pumping_speed: "N2 90–4,300 L/s",
    },
    image: "/images/products/grandhitek/gtp-m.webp",
    sort: 7,
  },
];

/**
 * vacuum-pump 카테고리·Grandhitek 파트너·시리즈 제품을 맞춘다. 멱등 — 매 부팅 실행해도 안전.
 *  1) 카테고리: slug 없을 때만 INSERT (sort = min(0, 기존 최솟값−1))
 *     1b) 옛 이름(«반도체 …»)인 칸만 새 이름으로, sort_order가 PR #11이 넣은 맨 뒤 값(>1이면서 최댓값)일 때만 0으로 — 둘 다 1회성.
 *  2) 파트너: 없으면 INSERT, 옛 오류값(country='Korea')일 때만 1회 교정 — 이후 관리자 수정은 덮지 않는다.
 *     교정 시 name_ja/description_ja를 비워 backfillJaTranslations가 새 JA_PARTNERS 문구로 다시 채우게 한다.
 *  3) 옛 «Dry Vacuum Pump»: 다른 카테고리에 있을 때만 새 카테고리로 옮기고 비활성 — 이후 관리자 재활성은 존중.
 *  4) 시리즈 4종: name_en 기준 없을 때만 INSERT.
 * 테이블 구조는 바꾸지 않는다(행 INSERT/UPDATE만).
 */
function ensureVacuumPumpCategory(db: Database.Database) {
  const run = db.transaction(() => {
    // 1) category
    let cat = db.prepare("SELECT id FROM product_categories WHERE slug = ?").get(VACUUM_PUMP_SLUG) as { id: number } | undefined;
    if (!cat) {
      const min = (db.prepare("SELECT MIN(sort_order) AS m FROM product_categories").get() as { m: number | null }).m;
      const sort = Math.min(VACUUM_PUMP_CATEGORY.sort, (min ?? 1) - 1);
      db.prepare(
        "INSERT INTO product_categories (name_ko, name_en, name_zh, slug, sort_order) VALUES (?, ?, ?, ?, ?)"
      ).run(VACUUM_PUMP_CATEGORY.ko, VACUUM_PUMP_CATEGORY.en, VACUUM_PUMP_CATEGORY.zh, VACUUM_PUMP_SLUG, sort);
      cat = db.prepare("SELECT id FROM product_categories WHERE slug = ?").get(VACUUM_PUMP_SLUG) as { id: number };
    }

    // 1b) 이름 교정(칸별로 옛 값일 때만) + 맨 앞으로(PR #11이 넣은 맨 뒤 위치일 때만)
    const o = VACUUM_PUMP_OLD_NAMES, n = VACUUM_PUMP_CATEGORY;
    db.prepare(`
      UPDATE product_categories SET
        name_ko = CASE WHEN name_ko = ? THEN ? ELSE name_ko END,
        name_en = CASE WHEN name_en = ? THEN ? ELSE name_en END,
        name_zh = CASE WHEN name_zh = ? THEN ? ELSE name_zh END,
        name_ja = CASE WHEN name_ja = ? THEN ? ELSE name_ja END
      WHERE slug = ? AND (name_ko = ? OR name_en = ? OR name_zh = ? OR name_ja = ?)
    `).run(o.ko, n.ko, o.en, n.en, o.zh, n.zh, o.ja, n.ja, VACUUM_PUMP_SLUG, o.ko, o.en, o.zh, o.ja);
    db.prepare(`
      UPDATE product_categories SET sort_order = ?
      WHERE slug = ? AND sort_order > 1 AND sort_order = (SELECT MAX(sort_order) FROM product_categories)
    `).run(VACUUM_PUMP_CATEGORY.sort, VACUUM_PUMP_SLUG);

    // 2) partner
    const gp = GRANDHITEK_PARTNER;
    let partner = db.prepare("SELECT id FROM partners WHERE name_en = ?").get(gp.name_en) as { id: number } | undefined;
    if (!partner) {
      db.prepare(`
        INSERT INTO partners (name_ko, name_en, name_zh, country, website, description_ko, description_en, description_zh, category, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(gp.name_ko, gp.name_en, gp.name_zh, gp.country, gp.website, gp.desc_ko, gp.desc_en, gp.desc_zh, gp.category, gp.sort);
      partner = db.prepare("SELECT id FROM partners WHERE name_en = ?").get(gp.name_en) as { id: number };
    } else {
      db.prepare(`
        UPDATE partners SET
          name_ko = ?, name_zh = ?, country = ?, website = ?,
          description_ko = ?, description_en = ?, description_zh = ?, category = ?,
          name_ja = '', description_ja = '', updated_at = datetime('now')
        WHERE id = ? AND country = 'Korea'
      `).run(gp.name_ko, gp.name_zh, gp.country, gp.website, gp.desc_ko, gp.desc_en, gp.desc_zh, gp.category, partner.id);
    }

    // 3) legacy single product → new category, inactive
    db.prepare(`
      UPDATE products SET category_id = ?, is_active = 0, updated_at = datetime('now')
      WHERE partner_id = ? AND name_en = ? AND category_id != ?
    `).run(cat.id, partner.id, LEGACY_DRY_PUMP_NAME_EN, cat.id);

    // 4) series products
    const exists = db.prepare("SELECT 1 FROM products WHERE name_en = ?");
    const insert = db.prepare(`
      INSERT INTO products (partner_id, category_id, name_ko, name_en, name_zh, description_ko, description_en, description_zh, specifications, image_url, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const p of GRANDHITEK_SERIES) {
      if (exists.get(p.en)) continue;
      insert.run(partner.id, cat.id, p.ko, p.en, p.zh, p.dko, p.den, p.dzh, JSON.stringify(p.specs), p.image, p.sort);
    }
  });
  run();
}

/**
 * Idempotent migrations for already-seeded production DBs.
 * Adds new categories/partners/products that were introduced after initial seed.
 * Safe to run multiple times — only inserts what's missing.
 *
 * When adding a new product line, append a block here so existing deploys pick it up
 * automatically on next restart (without wiping the DB).
 */
function ensureMigrations(db: Database.Database) {
  // ── 2026-04-29: TECO power-distribution category ──
  const tecoCategorySlug = "power-distribution";
  const existingCategory = db.prepare("SELECT id FROM product_categories WHERE slug = ?").get(tecoCategorySlug) as { id: number } | undefined;

  if (!existingCategory) {
    // Insert category
    db.prepare(`
      INSERT INTO product_categories (name_ko, name_en, name_zh, slug, sort_order)
      VALUES (?, ?, ?, ?, ?)
    `).run("배전 & 드론 솔루션", "Power Distribution & Drone", "配电与无人机解决方案", tecoCategorySlug, 5);
    const newCategoryId = (db.prepare("SELECT id FROM product_categories WHERE slug = ?").get(tecoCategorySlug) as { id: number }).id;

    // Insert partner (only if missing)
    let tecoPartner = db.prepare("SELECT id FROM partners WHERE name_en = ?").get("TECO Electric & Machinery") as { id: number } | undefined;
    if (!tecoPartner) {
      db.prepare(`
        INSERT INTO partners (name_ko, name_en, name_zh, country, description_ko, description_en, description_zh, category, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        "TECO",
        "TECO Electric & Machinery",
        "TECO 東元電機",
        "Taiwan",
        "1956년 설립, 글로벌 40개국 진출. 대만 LV 배전 시장 No.2, 산업용 모터 No.1. 70년 헤리티지의 전동화·그린에너지·지능화 토탈 솔루션.",
        "Founded 1956, operating in 40+ countries. Taiwan No.2 in low-voltage power distribution, No.1 in industrial motors. 70-year heritage in electrification, green energy, and intelligence.",
        "1956年成立，业务遍及40多个国家。台湾低压配电市场第2，工业电机第1。拥有70年历史的电气化、绿色能源与智能化整体解决方案。",
        "power-distribution",
        7,
      );
      tecoPartner = db.prepare("SELECT id FROM partners WHERE name_en = ?").get("TECO Electric & Machinery") as { id: number };
    }

    // Insert 6 placeholder products
    const insertProduct = db.prepare(`
      INSERT INTO products (partner_id, category_id, name_ko, name_en, name_zh, description_ko, description_en, description_zh, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const tecoProducts = [
      { ko: "AC 컨택터 (CN/CU/TMC 시리즈)", en: "AC Contactor (CN/CU/TMC Series)", zh: "交流接触器 (CN/CU/TMC 系列)", dko: "6~800A 전 라인업. CSA·UL·CE·CCC·RoHS 인증. AC1~AC4 부하 대응.", den: "6~800A full lineup. CSA, UL, CE, CCC, RoHS certified. AC1~AC4 load duty.", dzh: "6~800A 全系列。CSA·UL·CE·CCC·RoHS 认证。支持 AC1~AC4 负载。", sort: 1 },
      { ko: "과부하 계전기 (RHU/EOR)", en: "Overload Relay (RHU/EOR)", zh: "过载继电器 (RHU/EOR)", dko: "열동형 0.1~336A, 전자식 0.1~200A. 모터 보호용.", den: "Thermal 0.1~336A, Electronic 0.1~200A. Motor protection.", dzh: "热式 0.1~336A，电子式 0.1~200A。电机保护。", sort: 2 },
      { ko: "회로 차단기 (TMS/MCB/MCCB/ACB)", en: "Circuit Breaker (TMS/MCB/MCCB/ACB)", zh: "断路器 (TMS/MCB/MCCB/ACB)", dko: "모터보호 0.1~32A, MCB 1~125A, MCCB 16~800A, ACB 최대 6300A.", den: "MPCB 0.1~32A, MCB 1~125A, MCCB 16~800A, ACB up to 6300A.", dzh: "MPCB 0.1~32A，MCB 1~125A，MCCB 16~800A，ACB 最高 6300A。", sort: 3 },
      { ko: "경량 드론 모터 (Light Drone Motor)", en: "Light Drone Motor Series", zh: "轻型无人机电机系列", dko: "2317~10010 시리즈, 330W~3802W. 일제 베어링, Halbach Array 설계.", den: "2317~10010 series, 330W~3802W. Japanese bearings, Halbach Array design.", dzh: "2317~10010 系列，330W~3802W。日本进口轴承，Halbach 阵列设计。", sort: 4 },
      { ko: "농업·중대형 UAV 파워트레인", en: "Medium UAV Powertrain (Agricultural)", zh: "中型 UAV 动力系统 (农业用)", dko: "최대 150kg 페이로드. 76.5kg/rotor 추력, 12.9kW 피크. CAN/PWM 제어.", den: "Up to 150kg payload. 76.5kg/rotor thrust, 12.9kW peak. CAN/PWM control.", dzh: "最大 150kg 载荷。76.5kg/旋翼推力，12.9kW 峰值。CAN/PWM 控制。", sort: 5 },
      { ko: "ESC 전자 변속기", en: "ESC (Electronic Speed Controller)", zh: "ESC 电子调速器", dko: "LC-ESC 시리즈. 4-12S LiPo, 20A/40A 정격. 95~98% 구동효율.", den: "LC-ESC series. 4-12S LiPo, 20A/40A rated. 95~98% drive efficiency.", dzh: "LC-ESC 系列。4-12S LiPo，20A/40A 额定。驱动效率 95~98%。", sort: 6 },
    ];
    const insertMany = db.transaction(() => {
      for (const p of tecoProducts) {
        insertProduct.run(tecoPartner.id, newCategoryId, p.ko, p.en, p.zh, p.dko, p.den, p.dzh, p.sort);
      }
    });
    insertMany();
  }

  // ── 2026-04-29: TECO ECM products (idempotent — skip if already 13+ products for this category) ──
  const tecoCategory = db.prepare("SELECT id FROM product_categories WHERE slug = ?").get("power-distribution") as { id: number } | undefined;
  if (tecoCategory) {
    const tecoPartnerRow = db.prepare("SELECT id FROM partners WHERE name_en = ?").get("TECO Electric & Machinery") as { id: number } | undefined;
    if (tecoPartnerRow) {
      const existing = db.prepare("SELECT COUNT(*) as cnt FROM products WHERE category_id = ?").get(tecoCategory.id) as { cnt: number };
      if (existing.cnt < 13) {
        const insertEcm = db.prepare(`
          INSERT INTO products (partner_id, category_id, name_ko, name_en, name_zh, description_ko, description_en, description_zh, sort_order)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const ecmProducts = [
          { ko: "EC 모터 내전형 (D98/D125)", en: "EC Motor Internal Rotor (D98/D125)", zh: "EC 内转子电机 (D98/D125)", dko: "60~750W · PMSM · 1Ø 100~240Vac · FCU/AHU 전용", den: "60~750W · PMSM · 1Ø 100~240Vac · FCU/AHU optimized", dzh: "60~750W · PMSM · 1Ø 100~240Vac · FCU/AHU 专用", sort: 7 },
          { ko: "EC 모터 외전형 (OD102/OD180)", en: "EC Motor External Rotor (OD102/OD180)", zh: "EC 外转子电机 (OD102/OD180)", dko: "60~3700W · 1Ø~3Ø · 2×4/4×4 FFU · 팬월 시스템", den: "60~3700W · 1Ø~3Ø · 2×4/4×4 FFU · Fan wall systems", dzh: "60~3700W · 1Ø~3Ø · 2×4/4×4 FFU · 风墙系统", sort: 8 },
          { ko: "EC 드라이버 보드", en: "EC Driver Board", zh: "EC 驱动板", dko: "1Ø 100~240Vac · 500~1300 RPM · 3-속도/아날로그/RS485", den: "1Ø 100~240Vac · 500~1300 RPM · 3-speed/Analog/RS485", dzh: "1Ø 100~240Vac · 500~1300 RPM · 3档/模拟/RS485", sort: 9 },
          { ko: "ECM 통합 모듈 (모터+드라이브)", en: "ECM Integrated Module (Motor+Drive)", zh: "ECM 一体化模块 (电机+驱动)", dko: "1φ 100~240Vac · PMSM 이중축 · Modbus 통신", den: "1φ 100~240Vac · PMSM dual-shaft · Modbus communication", dzh: "1φ 100~240Vac · PMSM 双轴 · Modbus 通信", sort: 10 },
          { ko: "팬 코일 유닛 FCU-#300/#600", en: "Fan Coil Unit FCU-#300/#600", zh: "风机盘管机组 FCU-#300/#600", dko: "300~600 CFM · D98 EC-PMSM · IP54 · CE 인증", den: "300~600 CFM · D98 EC-PMSM · IP54 · CE certified", dzh: "300~600 CFM · D98 EC-PMSM · IP54 · CE 认证", sort: 11 },
          { ko: "팬 필터 유닛 FFU-4×2/4×4", en: "Fan Filter Unit FFU-4×2/4×4", zh: "风扇过滤机组 FFU-4×2/4×4", dko: "350~1580 CFM · IP55 · 클린룸 전용 · RS485", den: "350~1580 CFM · IP55 · Cleanroom · RS485", dzh: "350~1580 CFM · IP55 · 洁净室专用 · RS485", sort: 12 },
          { ko: "공기 조화 유닛 AHU-#800/#1600", en: "Air Handling Unit AHU-#800/#1600", zh: "空气处理机组 AHU-#800/#1600", dko: "800~1600 CFM · D98/D125 EC-PMSM · IP54 · RS485", den: "800~1600 CFM · D98/D125 EC-PMSM · IP54 · RS485", dzh: "800~1600 CFM · D98/D125 EC-PMSM · IP54 · RS485", sort: 13 },
        ];
        const insertEcmMany = db.transaction(() => {
          for (const p of ecmProducts) {
            insertEcm.run(tecoPartnerRow.id, tecoCategory.id, p.ko, p.en, p.zh, p.dko, p.den, p.dzh, p.sort);
          }
        });
        insertEcmMany();
      }
    }
  }
  // ── End: TECO ECM migration ──

  // ── 2026-06-08: EV charger supplier switch Zerova → RongXin ──
  // Idempotent: after first run no row matches the old name, so this is a no-op.
  const zerovaRow = db.prepare("SELECT id FROM partners WHERE name_en = ?").get("Zerova Technologies") as { id: number } | undefined;
  if (zerovaRow) {
    db.prepare(`
      UPDATE partners SET
        name_ko = ?, name_en = ?, name_zh = ?, country = ?,
        description_ko = ?, description_en = ?, description_zh = ?
      WHERE id = ?
    `).run(
      "롱신 뉴에너지 (容新新能源)",
      "Zhengzhou Rongxin New Energy",
      "郑州容新新能源",
      "China",
      "2019년 설립된 AC/DC·Split Power 전기차 충전 솔루션 제조사. AC 7~22kW, DC 급속 20~600kW, Split Power 480~2,560kW+를 공급하며, OHI Tech가 SKD(부품) 공급 + 한국 현지 조립으로 국내에 제공합니다.",
      "EV charging manufacturer (est. 2019) offering AC 7~22kW, DC fast 20~600kW, and Split Power 480~2,560kW+. Supplied to Korea by OHI Tech via SKD component supply and local assembly.",
      "2019年成立的AC/DC·Split Power电动车充电解决方案制造商。提供AC 7~22kW、DC快充20~600kW、Split Power 480~2,560kW+，由OHI Tech以SKD部件供应+韩国本地组装方式在韩国提供。",
      zerovaRow.id,
    );
  }
  // ── End: EV supplier switch migration ──

  // ── 2026-10-22: Grandhitek vacuum-pump category (멱등) ──
  ensureVacuumPumpCategory(db);
}

/**
 * ja translations for seeded rows, keyed by the same stable identifier ensureMigrations uses
 * (partners/products → name_en, categories → slug).
 *
 * Only writes where the _ja cell is still empty, so admin edits are never clobbered and
 * re-running is a no-op. product_lineups is intentionally absent: lineups are admin-authored,
 * not seeded — they get the columns and are translated through the admin UI.
 */
function backfillJaTranslations(db: Database.Database) {
  const run = db.transaction(() => {
    const updPartner = db.prepare(
      "UPDATE partners SET name_ja = ?, description_ja = ? WHERE name_en = ? AND (name_ja = '' OR name_ja IS NULL)"
    );
    for (const [nameEn, v] of Object.entries(JA_PARTNERS)) {
      updPartner.run(v.name, v.description, nameEn);
    }

    const updCategory = db.prepare(
      "UPDATE product_categories SET name_ja = ? WHERE slug = ? AND (name_ja = '' OR name_ja IS NULL)"
    );
    for (const [slug, name] of Object.entries(JA_CATEGORIES)) {
      updCategory.run(name, slug);
    }

    const updProduct = db.prepare(
      "UPDATE products SET name_ja = ?, description_ja = ? WHERE name_en = ? AND (name_ja = '' OR name_ja IS NULL)"
    );
    for (const [nameEn, v] of Object.entries(JA_PRODUCTS)) {
      updProduct.run(v.name, v.description, nameEn);
    }
  });
  run();
}

function seedData(db: Database.Database) {
  // Insert partners
  const insertPartner = db.prepare(`
    INSERT INTO partners (name_ko, name_en, name_zh, country, description_ko, description_en, description_zh, category, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const partners = [
    {
      name_ko: "DT ENG",
      name_en: "DT ENG Inc.",
      name_zh: "DT ENG",
      country: "Korea",
      desc_ko: "반도체 장비용 정전척(ESC) 전문 제조업체. Etch, CVD, PVD 등 다양한 공정 장비에 적용되는 고품질 ESC를 생산합니다.",
      desc_en: "Professional ESC (Electrostatic Chuck) manufacturer for semiconductor equipment. Produces high-quality ESCs for Etch, CVD, PVD and various process equipment.",
      desc_zh: "半导体设备用静电卡盘(ESC)专业制造商。为Etch、CVD、PVD等各种工艺设备生产高品质ESC。",
      category: "semiconductor-parts",
      sort: 1,
    },
    {
      name_ko: "롱신 뉴에너지 (容新新能源)",
      name_en: "Zhengzhou Rongxin New Energy",
      name_zh: "郑州容新新能源",
      country: "China",
      desc_ko: "2019년 설립된 AC/DC·Split Power 전기차 충전 솔루션 제조사. AC 7~22kW, DC 급속 20~600kW, Split Power 480~2,560kW+를 공급하며, OHI Tech가 SKD(부품) 공급 + 한국 현지 조립으로 국내에 제공합니다.",
      desc_en: "EV charging manufacturer (est. 2019) offering AC 7~22kW, DC fast 20~600kW, and Split Power 480~2,560kW+. Supplied to Korea by OHI Tech via SKD component supply and local assembly.",
      desc_zh: "2019年成立的AC/DC·Split Power电动车充电解决方案制造商。提供AC 7~22kW、DC快充20~600kW、Split Power 480~2,560kW+，由OHI Tech以SKD部件供应+韩国本地组装方式在韩国提供。",
      category: "ev-charging",
      sort: 2,
    },
    {
      name_ko: "T-Global Technology",
      name_en: "T-Global Technology",
      name_zh: "T-Global科技",
      country: "Taiwan",
      desc_ko: "열관리 솔루션 전문 기업. TIM(열전도 인터페이스 소재), 히트파이프, 액체 냉각 시스템 등을 제공합니다.",
      desc_en: "Thermal management solutions provider specializing in TIM (Thermal Interface Materials), heat pipes, and liquid cooling systems.",
      desc_zh: "热管理解决方案专业企业，提供TIM（导热界面材料）、热管、液冷系统等产品。",
      category: "thermal-management",
      sort: 3,
    },
    {
      // 2026-10-22: 중국 베이징 소재 — 값은 GRANDHITEK_PARTNER 공유(website는 ensureVacuumPumpCategory가 채운다)
      name_ko: GRANDHITEK_PARTNER.name_ko,
      name_en: GRANDHITEK_PARTNER.name_en,
      name_zh: GRANDHITEK_PARTNER.name_zh,
      country: GRANDHITEK_PARTNER.country,
      desc_ko: GRANDHITEK_PARTNER.desc_ko,
      desc_en: GRANDHITEK_PARTNER.desc_en,
      desc_zh: GRANDHITEK_PARTNER.desc_zh,
      category: GRANDHITEK_PARTNER.category,
      sort: GRANDHITEK_PARTNER.sort,
    },
    {
      name_ko: "네오텍",
      name_en: "NEOTECH",
      name_zh: "NEOTECH",
      country: "Korea",
      desc_ko: "반도체용 O-Ring, PAD, Valve 전문 제조업체. NEOPURE® 브랜드로 반도체 씰링 및 소재 솔루션을 제공합니다.",
      desc_en: "Manufacturer of semiconductor O-Rings, PADs, and Valves. Provides sealing and material solutions under the NEOPURE® brand.",
      desc_zh: "半导体用O-Ring、PAD、Valve专业制造商。以NEOPURE®品牌提供半导体密封及材料解决方案。",
      category: "semiconductor-parts",
      sort: 5,
    },
    {
      name_ko: "호텍",
      name_en: "Hortech",
      name_zh: "京碼股份有限公司",
      country: "Taiwan",
      desc_ko: "마이크론급 레이저 정밀 가공 장비 전문 기업. 웨이퍼 절단기, 레이저 마커, 3D 금속 프린터 등을 제조하며 엔코더 스케일, 글라스 웨이퍼 가공 서비스도 제공합니다.",
      desc_en: "Micron-level laser precision machining equipment manufacturer. Produces wafer cutting machines, laser markers, 3D metal printers, and provides encoder scale and glass wafer processing services.",
      desc_zh: "微米级激光精密加工设备专业企业。生产晶圆切割机、激光打标机、3D金属打印机，并提供编码器标尺、玻璃晶圆加工服务。",
      category: "laser-equipment",
      sort: 6,
    },
    {
      name_ko: "TECO",
      name_en: "TECO Electric & Machinery",
      name_zh: "TECO 東元電機",
      country: "Taiwan",
      desc_ko: "1956년 설립, 글로벌 40개국 진출. 대만 LV 배전 시장 No.2, 산업용 모터 No.1. 70년 헤리티지의 전동화·그린에너지·지능화 토탈 솔루션.",
      desc_en: "Founded 1956, operating in 40+ countries. Taiwan No.2 in low-voltage power distribution, No.1 in industrial motors. 70-year heritage in electrification, green energy, and intelligence.",
      desc_zh: "1956年成立，业务遍及40多个国家。台湾低压配电市场第2，工业电机第1。拥有70年历史的电气化、绿色能源与智能化整体解决方案。",
      category: "power-distribution",
      sort: 7,
    },
  ];

  const insertMany = db.transaction(() => {
    for (const p of partners) {
      insertPartner.run(p.name_ko, p.name_en, p.name_zh, p.country, p.desc_ko, p.desc_en, p.desc_zh, p.category, p.sort);
    }
  });
  insertMany();

  // Insert categories
  const insertCategory = db.prepare(`
    INSERT INTO product_categories (name_ko, name_en, name_zh, slug, sort_order)
    VALUES (?, ?, ?, ?, ?)
  `);

  const categories = [
    { ko: "반도체 장비 부품", en: "Semiconductor Equipment Parts", zh: "半导体设备零部件", slug: "semiconductor-parts", sort: 1 },
    { ko: "EV 충전 솔루션", en: "EV Charging Solutions", zh: "电动车充电解决方案", slug: "ev-charging", sort: 2 },
    { ko: "열관리 솔루션", en: "Thermal Management", zh: "热管理解决方案", slug: "thermal-management", sort: 3 },
    { ko: "레이저 정밀 가공 장비", en: "Laser Precision Equipment", zh: "激光精密加工设备", slug: "laser-equipment", sort: 4 },
    { ko: "배전 & 드론 솔루션", en: "Power Distribution & Drone", zh: "配电与无人机解决方案", slug: "power-distribution", sort: 5 },
    { ko: VACUUM_PUMP_CATEGORY.ko, en: VACUUM_PUMP_CATEGORY.en, zh: VACUUM_PUMP_CATEGORY.zh, slug: VACUUM_PUMP_CATEGORY.slug, sort: VACUUM_PUMP_CATEGORY.sort },
  ];

  const insertCategories = db.transaction(() => {
    for (const c of categories) {
      insertCategory.run(c.ko, c.en, c.zh, c.slug, c.sort);
    }
  });
  insertCategories();

  // Insert sample products
  const insertProduct = db.prepare(`
    INSERT INTO products (partner_id, category_id, name_ko, name_en, name_zh, description_ko, description_en, description_zh, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const products = [
    { pid: 1, cid: 1, ko: "정전척 (ESC) - Etch용", en: "Electrostatic Chuck (ESC) - For Etch", zh: "静电卡盘(ESC) - 蚀刻用", dko: "Etch 공정 장비에 최적화된 정전척. 균일한 온도 분포와 강력한 척킹력을 제공합니다.", den: "Electrostatic chuck optimized for etch process equipment. Provides uniform temperature distribution and strong chucking force.", dzh: "针对蚀刻工艺设备优化的静电卡盘。提供均匀的温度分布和强力夹持力。", sort: 1 },
    { pid: 1, cid: 1, ko: "정전척 (ESC) - CVD용", en: "Electrostatic Chuck (ESC) - For CVD", zh: "静电卡盘(ESC) - CVD用", dko: "CVD 공정 장비에 최적화된 정전척. 고온 환경에서 안정적인 성능을 보장합니다.", den: "Electrostatic chuck optimized for CVD process equipment. Ensures stable performance in high-temperature environments.", dzh: "针对CVD工艺设备优化的静电卡盘。在高温环境中确保稳定性能。", sort: 2 },
    { pid: 2, cid: 2, ko: "DC 급속 충전기 (60kW~480kW)", en: "DC Fast Charger (60kW~480kW)", zh: "直流快速充电桩 (60kW~480kW)", dko: "CCS1/CCS2/CHAdeMO 규격 지원. 모듈형 설계로 확장 가능하며 OCPP 1.6J/2.0 호환.", den: "Supports CCS1/CCS2/CHAdeMO standards. Modular scalable design with OCPP 1.6J/2.0 compatibility.", dzh: "支持CCS1/CCS2/CHAdeMO标准。模块化可扩展设计，兼容OCPP 1.6J/2.0。", sort: 1 },
    { pid: 2, cid: 2, ko: "AC 완속 충전기 (7kW~22kW)", en: "AC Charger (7kW~22kW)", zh: "交流慢充充电桩 (7kW~22kW)", dko: "주거/상업 시설용 AC 충전기. 다양한 인증(CE, UL, KC 등) 획득.", den: "AC charger for residential/commercial use. Multiple certifications (CE, UL, KC, etc.).", dzh: "住宅/商业设施用交流充电桩。已获得多项认证（CE、UL、KC等）。", sort: 2 },
    { pid: 3, cid: 3, ko: "열전도 패드 (TIM)", en: "Thermal Interface Material (TIM)", zh: "导热垫片 (TIM)", dko: "다양한 두께와 열전도율의 TIM 제품. 전자기기 방열에 최적화.", den: "TIM products with various thicknesses and thermal conductivity. Optimized for electronics heat dissipation.", dzh: "多种厚度和导热率的TIM产品。针对电子设备散热优化。", sort: 1 },
    { pid: 3, cid: 3, ko: "히트파이프 솔루션", en: "Heat Pipe Solutions", zh: "热管解决方案", dko: "맞춤형 히트파이프 설계 및 제조. 고성능 서버, 통신장비 등에 적용.", den: "Custom heat pipe design and manufacturing. Applied to high-performance servers, telecom equipment, etc.", dzh: "定制热管设计与制造。应用于高性能服务器、通信设备等。", sort: 2 },
    // pid 4(Grandhitek) 단일 «Dry Vacuum Pump» 행은 2026-10-22 시리즈 4종(ensureVacuumPumpCategory)으로 대체.
    { pid: 5, cid: 1, ko: "반도체용 O-Ring (NEOPURE®)", en: "Semiconductor O-Ring (NEOPURE®)", zh: "半导体用O-Ring (NEOPURE®)", dko: "반도체 장비용 고순도 O-Ring. 내화학성, 내열성이 우수하며 파티클 발생을 최소화.", den: "High-purity O-Ring for semiconductor equipment. Excellent chemical and heat resistance with minimized particle generation.", dzh: "半导体设备用高纯度O-Ring。耐化学性、耐热性优异，粒子产生最小化。", sort: 1 },
    { pid: 6, cid: 4, ko: "웨이퍼 레이저 절단기", en: "Wafer Laser Cutting Machine", zh: "晶圆激光切割机", dko: "마이크론급 정밀도의 웨이퍼 레이저 절단 장비. 반도체/디스플레이 산업에 적용.", den: "Micron-level precision wafer laser cutting equipment. Applied to semiconductor/display industries.", dzh: "微米级精度晶圆激光切割设备。应用于半导体/显示器产业。", sort: 1 },
    { pid: 6, cid: 4, ko: "엔코더 스케일 제조", en: "Encoder Scale Manufacturing", zh: "编码器标尺制造", dko: "드럼/디스크/리니어 엔코더 스케일 정밀 제조. 로봇, CNC 장비 등에 적용.", den: "Precision manufacturing of drum/disk/linear encoder scales. Applied to robotics, CNC equipment, etc.", dzh: "鼓型/盘型/线性编码器标尺精密制造。应用于机器人、CNC设备等。", sort: 2 },
    { pid: 7, cid: 5, ko: "AC 컨택터 (CN/CU/TMC 시리즈)", en: "AC Contactor (CN/CU/TMC Series)", zh: "交流接触器 (CN/CU/TMC 系列)", dko: "6~800A 전 라인업. CSA·UL·CE·CCC·RoHS 인증. AC1~AC4 부하 대응.", den: "6~800A full lineup. CSA, UL, CE, CCC, RoHS certified. AC1~AC4 load duty.", dzh: "6~800A 全系列。CSA·UL·CE·CCC·RoHS 认证。支持 AC1~AC4 负载。", sort: 1 },
    { pid: 7, cid: 5, ko: "과부하 계전기 (RHU/EOR)", en: "Overload Relay (RHU/EOR)", zh: "过载继电器 (RHU/EOR)", dko: "열동형 0.1~336A, 전자식 0.1~200A. 모터 보호용.", den: "Thermal 0.1~336A, Electronic 0.1~200A. Motor protection.", dzh: "热式 0.1~336A，电子式 0.1~200A。电机保护。", sort: 2 },
    { pid: 7, cid: 5, ko: "회로 차단기 (TMS/MCB/MCCB/ACB)", en: "Circuit Breaker (TMS/MCB/MCCB/ACB)", zh: "断路器 (TMS/MCB/MCCB/ACB)", dko: "모터보호 0.1~32A, MCB 1~125A, MCCB 16~800A, ACB 최대 6300A.", den: "MPCB 0.1~32A, MCB 1~125A, MCCB 16~800A, ACB up to 6300A.", dzh: "MPCB 0.1~32A，MCB 1~125A，MCCB 16~800A，ACB 最高 6300A。", sort: 3 },
    { pid: 7, cid: 5, ko: "경량 드론 모터 (Light Drone Motor)", en: "Light Drone Motor Series", zh: "轻型无人机电机系列", dko: "2317~10010 시리즈, 330W~3802W. 일제 베어링, Halbach Array 설계.", den: "2317~10010 series, 330W~3802W. Japanese bearings, Halbach Array design.", dzh: "2317~10010 系列，330W~3802W。日本进口轴承，Halbach 阵列设计。", sort: 4 },
    { pid: 7, cid: 5, ko: "농업·중대형 UAV 파워트레인", en: "Medium UAV Powertrain (Agricultural)", zh: "中型 UAV 动力系统 (农业用)", dko: "최대 150kg 페이로드. 76.5kg/rotor 추력, 12.9kW 피크. CAN/PWM 제어.", den: "Up to 150kg payload. 76.5kg/rotor thrust, 12.9kW peak. CAN/PWM control.", dzh: "最大 150kg 载荷。76.5kg/旋翼推力，12.9kW 峰值。CAN/PWM 控制。", sort: 5 },
    { pid: 7, cid: 5, ko: "ESC 전자 변속기", en: "ESC (Electronic Speed Controller)", zh: "ESC 电子调速器", dko: "LC-ESC 시리즈. 4-12S LiPo, 20A/40A 정격. 95~98% 구동효율.", den: "LC-ESC series. 4-12S LiPo, 20A/40A rated. 95~98% drive efficiency.", dzh: "LC-ESC 系列。4-12S LiPo，20A/40A 额定。驱动效率 95~98%。", sort: 6 },
    { pid: 7, cid: 5, ko: "EC 모터 내전형 (D98/D125)", en: "EC Motor Internal Rotor (D98/D125)", zh: "EC 内转子电机 (D98/D125)", dko: "60~750W · PMSM · 1Ø 100~240Vac · FCU/AHU 전용", den: "60~750W · PMSM · 1Ø 100~240Vac · FCU/AHU optimized", dzh: "60~750W · PMSM · 1Ø 100~240Vac · FCU/AHU 专用", sort: 7 },
    { pid: 7, cid: 5, ko: "EC 모터 외전형 (OD102/OD180)", en: "EC Motor External Rotor (OD102/OD180)", zh: "EC 外转子电机 (OD102/OD180)", dko: "60~3700W · 1Ø~3Ø · 2×4/4×4 FFU · 팬월 시스템", den: "60~3700W · 1Ø~3Ø · 2×4/4×4 FFU · Fan wall systems", dzh: "60~3700W · 1Ø~3Ø · 2×4/4×4 FFU · 风墙系统", sort: 8 },
    { pid: 7, cid: 5, ko: "EC 드라이버 보드", en: "EC Driver Board", zh: "EC 驱动板", dko: "1Ø 100~240Vac · 500~1300 RPM · 3-속도/아날로그/RS485", den: "1Ø 100~240Vac · 500~1300 RPM · 3-speed/Analog/RS485", dzh: "1Ø 100~240Vac · 500~1300 RPM · 3档/模拟/RS485", sort: 9 },
    { pid: 7, cid: 5, ko: "ECM 통합 모듈 (모터+드라이브)", en: "ECM Integrated Module (Motor+Drive)", zh: "ECM 一体化模块 (电机+驱动)", dko: "1φ 100~240Vac · PMSM 이중축 · Modbus 통신", den: "1φ 100~240Vac · PMSM dual-shaft · Modbus communication", dzh: "1φ 100~240Vac · PMSM 双轴 · Modbus 通信", sort: 10 },
    { pid: 7, cid: 5, ko: "팬 코일 유닛 FCU-#300/#600", en: "Fan Coil Unit FCU-#300/#600", zh: "风机盘管机组 FCU-#300/#600", dko: "300~600 CFM · D98 EC-PMSM · IP54 · CE 인증", den: "300~600 CFM · D98 EC-PMSM · IP54 · CE certified", dzh: "300~600 CFM · D98 EC-PMSM · IP54 · CE 认证", sort: 11 },
    { pid: 7, cid: 5, ko: "팬 필터 유닛 FFU-4×2/4×4", en: "Fan Filter Unit FFU-4×2/4×4", zh: "风扇过滤机组 FFU-4×2/4×4", dko: "350~1580 CFM · IP55 · 클린룸 전용 · RS485", den: "350~1580 CFM · IP55 · Cleanroom · RS485", dzh: "350~1580 CFM · IP55 · 洁净室专用 · RS485", sort: 12 },
    { pid: 7, cid: 5, ko: "공기 조화 유닛 AHU-#800/#1600", en: "Air Handling Unit AHU-#800/#1600", zh: "空气处理机组 AHU-#800/#1600", dko: "800~1600 CFM · D98/D125 EC-PMSM · IP54 · RS485", den: "800~1600 CFM · D98/D125 EC-PMSM · IP54 · RS485", dzh: "800~1600 CFM · D98/D125 EC-PMSM · IP54 · RS485", sort: 13 },
  ];

  const insertProducts = db.transaction(() => {
    for (const p of products) {
      insertProduct.run(p.pid, p.cid, p.ko, p.en, p.zh, p.dko, p.den, p.dzh, p.sort);
    }
  });
  insertProducts();

  // Grandhitek 시리즈 4종·website — 운영 DB와 같은 함수로 채운다(카테고리·파트너는 위에서 이미 들어가 no-op).
  ensureVacuumPumpCategory(db);
  db.prepare("UPDATE partners SET website = ? WHERE name_en = ? AND (website = '' OR website IS NULL)").run(
    GRANDHITEK_PARTNER.website,
    GRANDHITEK_PARTNER.name_en,
  );

  // Insert default admin user (password: admin123 — change in production!)
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256").update("admin123").digest("hex");
  db.prepare("INSERT OR IGNORE INTO admin_users (username, password_hash) VALUES (?, ?)").run("admin", hash);
}
