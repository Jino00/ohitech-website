// schema.ts의 backfillJaTranslations()가 참조하는 ja(일본어) 번역 원본. 키는 partners/products의 name_en, categories의 slug와 정확히 일치해야 한다.

export const JA_PARTNERS: Record<string, { name: string; description: string }> = {
  "DT ENG Inc.": {
    name: "DT ENG",
    description:
      "半導体装置向け静電チャック（ESC）の専門メーカーです。Etch、CVD、PVDなど様々なプロセス装置に対応する高品質なESCを製造しています。",
  },
  "Zhengzhou Rongxin New Energy": {
    name: "Zhengzhou Rongxin New Energy",
    description:
      "2019年設立のAC/DC・Split Power対応EV充電ソリューションメーカーです。AC 7〜22kW、DC急速20〜600kW、Split Power 480〜2,560kW+を供給しており、OHI TechがSKD（部品）供給＋韓国現地組立で国内に提供しています。",
  },
  "T-Global Technology": {
    name: "T-Global Technology",
    description:
      "熱管理ソリューション専門企業です。TIM（熱伝導インターフェース素材）、ヒートパイプ、液冷システムなどを提供しています。",
  },
  Grandhitek: {
    name: "Grandhitek",
    description:
      "半導体真空システム専門企業です。ドライポンプ、ターボポンプなど半導体プロセス用真空装置を製造しています。",
  },
  NEOTECH: {
    name: "NEOTECH",
    description:
      "半導体用O-Ring、PAD、Valveの専門メーカーです。NEOPURE®ブランドで半導体シーリングおよび素材ソリューションを提供しています。",
  },
  Hortech: {
    name: "Hortech",
    description:
      "ミクロン級レーザー精密加工装置の専門企業です。ウェハー切断機、レーザーマーカー、3D金属プリンターなどを製造するほか、エンコーダースケールやガラスウェハー加工サービスも提供しています。",
  },
  "TECO Electric & Machinery": {
    name: "TECO",
    description:
      "1956年設立、世界40カ国以上で事業を展開しています。台湾の低圧配電市場でNo.2、産業用モーターでNo.1を誇ります。70年の歴史を持つ電動化・グリーンエネルギー・インテリジェント化のトータルソリューションです。",
  },
};

export const JA_CATEGORIES: Record<string, string> = {
  "semiconductor-parts": "半導体装置部品",
  "ev-charging": "EV充電ソリューション",
  "thermal-management": "熱管理ソリューション",
  "laser-equipment": "レーザー精密加工装置",
  "power-distribution": "配電・ドローンソリューション",
};

export const JA_PRODUCTS: Record<string, { name: string; description: string }> = {
  "Electrostatic Chuck (ESC) - For Etch": {
    name: "静電チャック（ESC）- Etch用",
    description:
      "Etchプロセス装置向けに最適化された静電チャックです。均一な温度分布と強力なチャッキング力を実現します。",
  },
  "Electrostatic Chuck (ESC) - For CVD": {
    name: "静電チャック（ESC）- CVD用",
    description:
      "CVDプロセス装置向けに最適化された静電チャックです。高温環境でも安定した性能を発揮します。",
  },
  "DC Fast Charger (60kW~480kW)": {
    name: "DC急速充電器（60kW〜480kW）",
    description:
      "CCS1/CCS2/CHAdeMO規格に対応しています。モジュール設計で拡張可能であり、OCPP 1.6J/2.0にも対応しています。",
  },
  "AC Charger (7kW~22kW)": {
    name: "AC充電器（7kW〜22kW）",
    description: "住宅・商業施設向けAC充電器です。CE、UL、KCなど各種認証を取得しています。",
  },
  "Thermal Interface Material (TIM)": {
    name: "熱伝導パッド（TIM）",
    description:
      "多様な厚みと熱伝導率を持つTIM製品です。電子機器の放熱に最適化されています。",
  },
  "Heat Pipe Solutions": {
    name: "ヒートパイプソリューション",
    description:
      "用途に合わせたヒートパイプの設計・製造を行います。高性能サーバーや通信機器などに採用されています。",
  },
  "Dry Vacuum Pump": {
    name: "ドライ真空ポンプ",
    description:
      "半導体プロセス向けの高性能ドライポンプです。オイルフリー方式でクリーンルーム環境に適しています。",
  },
  "Semiconductor O-Ring (NEOPURE®)": {
    name: "半導体用O-Ring（NEOPURE®）",
    description:
      "半導体装置向け高純度O-Ringです。優れた耐薬品性・耐熱性を備え、パーティクルの発生を最小限に抑えます。",
  },
  "Wafer Laser Cutting Machine": {
    name: "ウェハーレーザー切断機",
    description:
      "ミクロン級の精度を誇るウェハーレーザー切断装置です。半導体・ディスプレイ産業に採用されています。",
  },
  "Encoder Scale Manufacturing": {
    name: "エンコーダースケール製造",
    description:
      "ドラム式・ディスク式・リニア式エンコーダースケールを精密に製造します。ロボットやCNC装置などに採用されています。",
  },
  "AC Contactor (CN/CU/TMC Series)": {
    name: "ACコンタクタ（CN/CU/TMCシリーズ）",
    description:
      "6〜800Aの全ラインナップを揃えています。CSA・UL・CE・CCC・RoHS認証を取得済みで、AC1〜AC4負荷に対応します。",
  },
  "Overload Relay (RHU/EOR)": {
    name: "過負荷継電器（RHU/EOR）",
    description: "熱動式0.1〜336A、電子式0.1〜200Aに対応。モーター保護用です。",
  },
  "Circuit Breaker (TMS/MCB/MCCB/ACB)": {
    name: "回路遮断器（TMS/MCB/MCCB/ACB）",
    description:
      "モーター保護用0.1〜32A、MCB 1〜125A、MCCB 16〜800A、ACBは最大6300Aまで対応します。",
  },
  "Light Drone Motor Series": {
    name: "軽量ドローンモーター（Light Drone Motor）",
    description:
      "2317〜10010シリーズ、330W〜3802W。日本製ベアリングを採用し、Halbach Array設計を採用しています。",
  },
  "Medium UAV Powertrain (Agricultural)": {
    name: "農業・中大型UAVパワートレイン",
    description:
      "最大150kgのペイロードに対応。76.5kg/ローターの推力、12.9kWのピーク出力を実現し、CAN/PWM制御に対応します。",
  },
  "ESC (Electronic Speed Controller)": {
    name: "ESC電子スピードコントローラー",
    description: "LC-ESCシリーズ。4-12S LiPo対応、20A/40A定格で、駆動効率は95〜98%です。",
  },
  "EC Motor Internal Rotor (D98/D125)": {
    name: "ECモーター内転型（D98/D125）",
    description: "60〜750W・PMSM・1Ø 100〜240Vac・FCU/AHU専用",
  },
  "EC Motor External Rotor (OD102/OD180)": {
    name: "ECモーター外転型（OD102/OD180）",
    description: "60〜3700W・1Ø〜3Ø・2×4/4×4 FFU・ファンウォールシステム",
  },
  "EC Driver Board": {
    name: "ECドライバーボード",
    description: "1Ø 100〜240Vac・500〜1300 RPM・3速/アナログ/RS485",
  },
  "ECM Integrated Module (Motor+Drive)": {
    name: "ECM統合モジュール（モーター＋ドライブ）",
    description: "1φ 100〜240Vac・PMSM二軸・Modbus通信",
  },
  "Fan Coil Unit FCU-#300/#600": {
    name: "ファンコイルユニット FCU-#300/#600",
    description: "300〜600 CFM・D98 EC-PMSM・IP54・CE認証取得",
  },
  "Fan Filter Unit FFU-4×2/4×4": {
    name: "ファンフィルターユニット FFU-4×2/4×4",
    description: "350〜1580 CFM・IP55・クリーンルーム専用・RS485",
  },
  "Air Handling Unit AHU-#800/#1600": {
    name: "エアハンドリングユニット AHU-#800/#1600",
    description: "800〜1600 CFM・D98/D125 EC-PMSM・IP54・RS485",
  },

  // ── 이하 10건: seed가 아니라 ensureMigrations로 운영 DB에 추가된 행(열관리 5종·레이저 5종).
  //    name_en이 seed와 달라 초기 백필에서 누락 → ja만 영어로 노출되던 갭 보완 (2026-07-17).
  "Thermal Pads": {
    name: "熱伝導パッド（Thermal Pad）",
    description:
      "1.0〜17.8 W/mKの幅広い熱伝導率を持つシリコン／非シリコン熱伝導パッド。サーバー、5G、AI、自動車、エネルギー貯蔵装置など多様な産業分野に適用。Shore 00-15〜65の硬度で様々なギャップフィリング要求に対応します。",
  },
  "Advanced TIM (Paste / Gel / PCM)": {
    name: "特殊熱伝導材料（Paste / Gel / PCM）",
    description:
      "熱伝導グリース、熱伝導ジェル、相変化材料（PCM）、熱伝導パテなどの高性能熱伝導材料。多様な粘度と熱伝導率により、複雑な形状のギャップフィリングや極薄ボンドラインに最適です。",
  },
  "Thermal Tape & Graphite Sheet": {
    name: "熱伝導テープ＆グラファイトシート",
    description:
      "両面接着の熱伝導テープと高熱伝導グラファイト／グラフェンシート。軽量で優れた熱拡散性能により、スマートフォン、タブレット、ディスプレイなどの薄型電子機器に最適です。",
  },
  "Heat Pipe & Vapor Chamber": {
    name: "ヒートパイプ＆ベーパーチャンバー",
    description:
      "カスタム対応のヒートパイプ（Ø3〜12mm）と超薄型ベーパーチャンバー（0.4mm〜）。純アルミニウム比50〜100倍の熱伝達係数。サーバー、自動車、5G、医療機器など高性能冷却ソリューションを提供します。",
  },
  "Thermal Module & Heat Sink": {
    name: "放熱モジュール＆ヒートシンク",
    description:
      "M.2 SSD放熱モジュール、AlSiCヒートスプレッダー、セラミックヒートシンク、熱電冷却チップ（TEC）などの特殊放熱ソリューション。熱シミュレーション解析サービスとあわせて、カスタムトータルソリューションを提供します。",
  },
  "DUV Precision Laser System": {
    name: "DUV超精密レーザーシステム",
    description:
      "フェムト秒／ピコ秒DUV（深紫外線）レーザーシステム。ミクロン単位の加工精度で、半導体ウェハー、薄膜、ポリカーボネート、複合素材などの微細エッチング、切断、穴あけを実現。熱影響を最小化するコールド加工方式です。",
  },
  "Wafer Laser Processing System": {
    name: "ウェハーレーザー加工システム",
    description:
      "シリコンウェハーのダイシング、グルービング、プラズマ垂直切断など、半導体ウェハー加工専用のレーザーシステム。低応力・低熱影響により、高密度シリコンウェハーを品質劣化なく加工します。",
  },
  "Special Laser Systems (3D Printing / Waterjet)": {
    name: "特殊レーザーシステム（3Dプリンティング／ウォータージェット）",
    description:
      "3Dレーザープリンティング装置とCNCウォータージェットレーザー切断／穴あけ機。金属積層造形から水冷式高精度レーザー切断まで、特殊加工ニーズに対応する先端レーザー装置です。",
  },
  "Optical Scales for Encoders": {
    name: "光学スケール（Optical Scale）",
    description:
      "レーザーマイクロエッチング技術で製造する精密光学スケール。ドラムスケール、ディスクスケール、リニアスケールなど、エンコーダー／アクチュエーター用スケールを多様な形態で生産。ロボット、CNC、精密モーション制御装置に適用されます。",
  },
  "Laser Processing Services (OEM/ODM)": {
    name: "レーザー加工サービス（OEM/ODM）",
    description:
      "マイクロエッチング、切断、穴あけ、彫刻など精密レーザー加工の受託サービス。半導体パッケージング、FPCB、光学部品、バイオセンサー、光通信部品など、多様な分野向けのカスタム加工ソリューションを提供します。",
  },
};
