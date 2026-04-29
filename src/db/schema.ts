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

  // Seed data if empty (fresh DB)
  const count = db.prepare("SELECT COUNT(*) as cnt FROM partners").get() as { cnt: number };
  if (count.cnt === 0) {
    seedData(db);
  } else {
    // Existing DB: run idempotent migrations to add new partners/categories/products
    ensureMigrations(db);
  }
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

  // Insert default admin user (password: admin123 — change in production!)
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256").update("admin123").digest("hex");
  db.prepare("INSERT OR IGNORE INTO admin_users (username, password_hash) VALUES (?, ?)").run("admin", hash);
}
