import Database from "better-sqlite3";
import path from "path";

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
      country TEXT NOT NULL DEFAULT '',
      website TEXT DEFAULT '',
      logo_url TEXT DEFAULT '',
      description_ko TEXT DEFAULT '',
      description_en TEXT DEFAULT '',
      description_zh TEXT DEFAULT '',
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
      description_ko TEXT DEFAULT '',
      description_en TEXT DEFAULT '',
      description_zh TEXT DEFAULT '',
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
      description_ko TEXT DEFAULT '',
      description_en TEXT DEFAULT '',
      description_zh TEXT DEFAULT '',
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

  // Seed data if empty
  const count = db.prepare("SELECT COUNT(*) as cnt FROM partners").get() as { cnt: number };
  if (count.cnt === 0) {
    seedData(db);
  }
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
      name_ko: "제로바 테크놀로지스",
      name_en: "Zerova Technologies",
      name_zh: "起而行绿能",
      country: "Taiwan",
      desc_ko: "AC/DC 전기차 충전 솔루션 전문 기업. 7kW~480kW까지 다양한 충전기를 제공하며, 전 세계 50개국 이상에 수출합니다.",
      desc_en: "EV charging solutions provider offering AC/DC chargers from 7kW to 480kW, exported to over 50 countries worldwide.",
      desc_zh: "提供7kW至480kW的AC/DC电动车充电解决方案，出口至全球50多个国家。",
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
      name_ko: "그랜드하이텍",
      name_en: "Grandhitek",
      name_zh: "Grandhitek",
      country: "Korea",
      desc_ko: "반도체 진공 시스템 전문 기업. 드라이 펌프, 터보 펌프 등 반도체 공정용 진공 장비를 제조합니다.",
      desc_en: "Semiconductor vacuum systems specialist manufacturing dry pumps, turbo pumps and vacuum equipment for semiconductor processes.",
      desc_zh: "半导体真空系统专业企业，制造干泵、涡轮泵等半导体工艺用真空设备。",
      category: "semiconductor-parts",
      sort: 4,
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
    { pid: 4, cid: 1, ko: "드라이 진공 펌프", en: "Dry Vacuum Pump", zh: "干式真空泵", dko: "반도체 공정용 고성능 드라이 펌프. 오일프리 방식으로 클린룸 환경에 적합.", den: "High-performance dry pump for semiconductor processes. Oil-free design suitable for cleanroom environments.", dzh: "半导体工艺用高性能干式泵。无油设计适合洁净室环境。", sort: 1 },
    { pid: 5, cid: 1, ko: "반도체용 O-Ring (NEOPURE®)", en: "Semiconductor O-Ring (NEOPURE®)", zh: "半导体用O-Ring (NEOPURE®)", dko: "반도체 장비용 고순도 O-Ring. 내화학성, 내열성이 우수하며 파티클 발생을 최소화.", den: "High-purity O-Ring for semiconductor equipment. Excellent chemical and heat resistance with minimized particle generation.", dzh: "半导体设备用高纯度O-Ring。耐化学性、耐热性优异，粒子产生最小化。", sort: 1 },
    { pid: 6, cid: 4, ko: "웨이퍼 레이저 절단기", en: "Wafer Laser Cutting Machine", zh: "晶圆激光切割机", dko: "마이크론급 정밀도의 웨이퍼 레이저 절단 장비. 반도체/디스플레이 산업에 적용.", den: "Micron-level precision wafer laser cutting equipment. Applied to semiconductor/display industries.", dzh: "微米级精度晶圆激光切割设备。应用于半导体/显示器产业。", sort: 1 },
    { pid: 6, cid: 4, ko: "엔코더 스케일 제조", en: "Encoder Scale Manufacturing", zh: "编码器标尺制造", dko: "드럼/디스크/리니어 엔코더 스케일 정밀 제조. 로봇, CNC 장비 등에 적용.", den: "Precision manufacturing of drum/disk/linear encoder scales. Applied to robotics, CNC equipment, etc.", dzh: "鼓型/盘型/线性编码器标尺精密制造。应用于机器人、CNC设备等。", sort: 2 },
  ];

  const insertProducts = db.transaction(() => {
    for (const p of products) {
      insertProduct.run(p.pid, p.cid, p.ko, p.en, p.zh, p.dko, p.den, p.dzh, p.sort);
    }
  });
  insertProducts();

  // Insert default admin user (password: admin123 — change in production!)
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256").update("admin123").digest("hex");
  db.prepare("INSERT OR IGNORE INTO admin_users (username, password_hash) VALUES (?, ?)").run("admin", hash);
}
