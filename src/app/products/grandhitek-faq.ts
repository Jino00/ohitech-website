// Grand Hitek(通嘉科技) 드라이 진공 펌프(/products/vacuum-pump) FAQ.
// 화면(GrandhitekSection)과 JSON-LD(_seo.tsx VacuumPumpJsonLd)가 같은 원본을 쓴다 — 구글은 FAQ 스키마가
// 화면에 보이는 내용과 같아야 인정한다.
// 출처: Grand Hitek 공식 홈페이지(www/en.grandhitek.com.cn, 2026-10-22 수집)·회사소개서(2025.12). 자료에 없는 내용은 넣지 않는다.

export type GrandhitekFaq = { q: string; a: string };
export type GrandhitekLocale = "ko" | "en" | "zh" | "ja";

export const FAQ_GRANDHITEK: Record<GrandhitekLocale, GrandhitekFaq[]> = {
  ko: [
    {
      q: "Grand Hitek(通嘉科技) 드라이 진공 펌프는 한국에서 어디서 구매하나요?",
      a: "OHI Tech는 Grand Hitek(北京通嘉宏瑞科技股份有限公司)의 한국 총판입니다. 드라이 펌프·통합 진공 시스템·분자 펌프의 모델 선정과 견적 문의를 OHI Tech에서 받습니다.",
    },
    {
      q: "드라이 펌프 시리즈는 어떻게 다른가요?",
      a: "GLR(GLR-P 포함)은 클린·일반 공정용 다단 루츠(110~4,500 m³/h), GMR은 식각·이온주입 공정 챔버용 다단 루츠(210~1,800 m³/h), GHC는 분진에 강한 가혹 공정용 일체형 클로(220~5,500 m³/h), GS는 태양광 등에 쓰이는 신형 일체형 클로(1,800~5,500 m³/h), GHR은 고유량 수소(H₂) 공정용 다단 루츠(600~650 m³/h)입니다. 괄호 안 수치는 최대 배기속도입니다.",
    },
    {
      q: "반도체 외에 어떤 산업에 쓰이나요?",
      a: "디스플레이(PECVD·Etch는 GHC, PVD·LL/TC·증착·Lami 합착은 GLR, Coater PHOTO는 GLR-P), 태양광(잉곳 성장은 GS-S, 셀 PECVD·LPCVD·ALD는 GS, 모듈 라미네이션은 GLR-P), 2차전지(진공 건조·탈기·조립·EOL 검사 등에 GLR 전 라인업), LED·산업용 진공에 쓰입니다. 디스플레이 분야 중국 내 점유율은 65%(2024), 태양광 셀 분야 점유율은 50%(2023)를 넘었습니다.",
    },
    {
      q: "반도체 공정별로 어떤 시리즈를 선택해야 하나요?",
      a: "Load Lock·Transfer·PVD·Coater는 GLR, IMP Source·Strip/Ashing·Oxide/Poly Etch·HDP는 GMR, ALD·PECVD·LPCVD·SACVD·MOCVD·Metal Etch는 GHC, 고유량 H₂를 쓰는 MOCVD·Si EPI·SiC EPI·HJT는 GHR을 권장합니다. Metal Etch는 6·8인치 팹에서 GMR도 권장됩니다.",
    },
    {
      q: "모델명(예: GHC1800T)은 어떻게 읽나요?",
      a: "명명 규칙상 G 다음 글자가 적용 공정(H: Harsh/H₂, M: Medium, L: Light), 그다음 글자가 구조(C: 클로, R: 루츠, S: 스크류), 숫자가 배기속도 등급(m³/h)입니다. 끝 글자는 온도 사양(T: 고온, Z: 초고온, L: 저온, 없음: 표준)과 내식 사양(N: 니켈합금, C: 코팅, 없음: 구상흑연주철)입니다. GHC1800T는 Harsh 공정용 클로 펌프, 1,800 m³/h급, 고온 사양입니다.",
    },
    {
      q: "어떤 인증과 자격을 보유하고 있나요?",
      a: "제품은 SEMI S2-0724·S6-0618·S8-0218·F47-0706, ETL·UL·CE, ISO 9001:2015·ISO 14001:2015·ISO 45001:2018 인증을 보유하고 있습니다. 회사는 국가급 전정특신 '작은 거인(小巨人)' 기업, 고신기술기업으로 지정됐으며 2015년 이후 누적 등록 특허는 220건 이상입니다.",
    },
    {
      q: "GMR 시리즈의 에너지 절감 효과는 어느 정도인가요?",
      a: "소비전력은 GMR600 0.8 kW, GMR1200 1.0 kW로, 비교 대상 SGM600A·SGM1200A보다 각각 50%·44%(0.8 kW) 낮습니다. 600급·1200급 펌프 각 1,000대를 5년간 운전한다는 가정에서 전력·PCW·N₂ 비용은 각각 약 50%·49% 낮게 산출됐습니다. 실제 절감 효과는 공정·운전 조건에 따라 다릅니다.",
    },
    {
      q: "실제 반도체 팹 적용 실적이 있나요?",
      a: "중국 주요 반도체 고객사로부터 재주문을 받았습니다. 예를 들어 CXMT(DRAM)에 800대 이상, HH Group(Logic)에 700대 이상, BYD에 500대 이상이 공급됐고, 고객사별 최장 가동시간은 9,000~23,000시간 이상입니다. 2024년 누적 출하는 30,000대를 넘었고(반도체 2,000대 이상), 2025년 중국 본토 반도체 점유율은 15%입니다.",
    },
    {
      q: "드라이 펌프 외에 어떤 제품과 서비스가 있나요?",
      a: "통합 진공 시스템 5종(Mizar·Megrez·Merak·Alioth·Phecda), GTP 분자 펌프(자기부상 GTP-M, 그리스 윤활 GTP-G·L, 계측기용 GTP-H), 그리고 진공 펌프 유지보수, Y2O3 코팅, 부품 정밀 세정, 실링 제품을 공급합니다.",
    },
  ],
  en: [
    {
      q: "Where can I buy Grand Hitek (通嘉科技) dry vacuum pumps in Korea?",
      a: "OHI Tech is Grand Hitek's Master Distributor for Korea (Beijing Grand Hitek Co., Ltd.). OHI Tech handles model selection and quotation requests for its dry pumps, integrated vacuum systems and molecular pumps.",
    },
    {
      q: "How do the dry pump series differ?",
      a: "GLR (including GLR-P) is a multistage Roots pump for clean and general processes (110–4,500 m³/h); GMR a multistage Roots pump for etch and ion implantation chambers (210–1,800 m³/h); GHC an integrated claw pump with strong dust handling for harsh processes (220–5,500 m³/h); GS a new integrated claw pump used in solar PV and other markets (1,800–5,500 m³/h); and GHR a multistage Roots pump for high-flow hydrogen (H₂) processes (600–650 m³/h). Figures in parentheses are maximum pumping speeds.",
    },
    {
      q: "Which industries besides semiconductor use these pumps?",
      a: "They serve display (GHC for PECVD and etch, GLR for PVD, LL/TC, evaporation and Lami bonding, GLR-P for coater PHOTO), solar PV (GS-S for crystal pulling, GS for cell PECVD/LPCVD/ALD, GLR-P for module lamination), lithium batteries (the full GLR range for vacuum drying, degassing, assembly, EOL testing and more), LED and industrial vacuum. Grand Hitek's domestic share exceeds 65% in advanced displays (2024) and 50% in PV cells (2023).",
    },
    {
      q: "Which series should I choose for each semiconductor process?",
      a: "GLR is recommended for load lock, transfer, PVD and coater; GMR for IMP source, strip/ashing, oxide/poly etch and HDP; GHC for ALD, PECVD, LPCVD, SACVD, MOCVD and metal etch; and GHR for high-flow H₂ processes such as MOCVD, Si EPI, SiC EPI and HJT. GMR is also recommended for metal etch in 6- and 8-inch fabs.",
    },
    {
      q: "How do I read a model name such as GHC1800T?",
      a: "Under the naming rule, the first letter after G is the application (H: Harsh/H₂, M: Medium, L: Light), the second is the mechanism (C: Claw, R: Roots, S: Screw), and the number is the pumping speed class in m³/h. Trailing letters give the temperature version (T: high, Z: ultra-high, L: low, none: standard) and anti-corrosion material (N: nickel alloy, C: coating, none: SG iron). GHC1800T is a harsh-duty claw pump, 1,800 m³/h class, high-temperature version.",
    },
    {
      q: "What certifications and qualifications does Grand Hitek hold?",
      a: "The pumps hold SEMI S2-0724, S6-0618, S8-0218 and F47-0706; ETL, UL and CE; and ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018. The company is a national-level specialized and sophisticated 'Little Giant' enterprise and a certified high-tech enterprise, with 220+ authorized patents since 2015.",
    },
    {
      q: "How much energy does the GMR series save?",
      a: "GMR600 draws 0.8 kW and GMR1200 1.0 kW — 50% and 44% (0.8 kW) less than the compared SGM600A and SGM1200A. Assuming 1,000 pumps each of the 600 and 1200 class running for five years, power, PCW and N₂ costs come out about 50% and 49% lower. Actual savings vary with process and operating conditions.",
    },
    {
      q: "Are the pumps proven in production fabs?",
      a: "Grand Hitek has won repeat orders from major Chinese semiconductor customers — for example 800+ units at CXMT (DRAM), 700+ at HH Group (logic) and 500+ at BYD — with best running times of 9,000 to 23,000+ hours depending on the customer. Cumulative shipments passed 30,000 units in 2024 (2,000+ for semiconductor), and its semiconductor market share in mainland China reached 15% in 2025.",
    },
    {
      q: "What products and services are offered beyond dry pumps?",
      a: "Five integrated vacuum systems (Mizar, Megrez, Merak, Alioth, Phecda), GTP molecular pumps (magnetically levitated GTP-M, grease-lubricated GTP-G/L and instrument GTP-H), plus vacuum pump overhaul, Y2O3 coating, precision parts cleaning and seals.",
    },
  ],
  zh: [
    {
      q: "在韩国从哪里购买通嘉科技干式真空泵？",
      a: "OHI Tech是通嘉科技（北京通嘉宏瑞科技股份有限公司）的韩国总代理，负责干泵、真空集成一体机及分子泵的选型与报价咨询。",
    },
    {
      q: "各干泵系列有何区别？",
      a: "GLR（含GLR-P）为清洁与一般工艺用多级罗茨泵（110~4,500 m³/h）；GMR为刻蚀与离子注入工艺腔用多级罗茨泵（210~1,800 m³/h）；GHC为处理粉尘能力极强、适合苛刻工艺的新型一体爪式泵（220~5,500 m³/h）；GS为广泛用于光伏等领域的新型一体爪式泵（1,800~5,500 m³/h）；GHR为面向高流量H₂工艺的多级罗茨泵（600~650 m³/h）。括号内为最大抽速。",
    },
    {
      q: "除半导体外还应用于哪些行业？",
      a: "应用于新型显示（PECVD、Etch推荐GHC，PVD、LL/TC、蒸镀、Lami贴合推荐GLR，coater PHOTO推荐GLR-P）、太阳能光伏（拉晶推荐GS-S，电池片PECVD/LPCVD/ALD推荐GS，组件层压推荐GLR-P）、锂电（GLR全系列适用于真空干燥、脱气、组装、EOL检测等工序）以及LED、工业真空等领域。新型显示领域国产市占率超65%（2024年），光伏电池片市占率突破50%（2023年）。",
    },
    {
      q: "半导体各工艺应如何选型？",
      a: "loadlock、Transfer、PVD、Coater推荐GLR；IMP source、Strip/Ashing、Oxide/Poly Etch、HDP推荐GMR；ALD、PECVD、LPCVD、SACVD、MOCVD、Metal Etch推荐GHC；MOCVD、Si EPI、SiC EPI、HJT等高流量H₂工艺推荐GHR。6寸与8寸FAB的Metal Etch亦推荐GMR。",
    },
    {
      q: "型号（如GHC1800T）如何解读？",
      a: "按命名规则，G之后第一个字母代表应用工况（H：Harsh/H₂，M：Medium，L：Light），第二个字母代表结构（C：爪式，R：罗茨，S：螺杆），数字为抽速等级（m³/h）。末尾字母代表温控版本（T：高温，Z：超高温，L：低温，空白：标准）与防腐材质（N：镍合金，C：涂层，空白：球墨铸铁）。GHC1800T即Harsh工艺用爪式泵、1,800 m³/h级、高温版。",
    },
    {
      q: "具备哪些认证与资质？",
      a: "产品具备SEMI S2-0724、S6-0618、S8-0218、F47-0706，ETL、UL、CE，以及ISO 9001:2015、ISO 14001:2015、ISO 45001:2018认证。公司为国家级专精特新“小巨人”企业、高新技术企业，自2015年以来累计取得授权专利220项以上。",
    },
    {
      q: "GMR系列节能效果如何？",
      a: "GMR600功率0.8 kW、GMR1200功率1.0 kW，较对比机型SGM600A、SGM1200A分别低50%、44%（0.8 kW）。按600级、1200级各1,000台运行5年测算，电力、PCW与N₂成本分别降低约50%、49%。实际节能效果因工艺与运行条件而异。",
    },
    {
      q: "是否有晶圆厂量产应用实绩？",
      a: "已获中国主要半导体客户重复订单，例如CXMT（DRAM）800台以上、HH Group（Logic）700台以上、BYD 500台以上，各客户最长运行时间为9,000~23,000小时以上。2024年累计出货突破30,000台（半导体2,000台以上），2025年半导体大陆市占率提升至15%。",
    },
    {
      q: "除干泵外还有哪些产品与服务？",
      a: "5款真空集成一体机（Mizar开阳、Megrez天权、Merak天璇、Alioth玉衡、Phecda天玑），GTP分子泵（磁悬浮GTP-M、脂润滑GTP-G/L、仪器用GTP-H），以及真空泵运维、Y2O3涂层、零部件精密清洗与密封圈产品。",
    },
  ],
  ja: [
    {
      q: "Grand Hitek（通嘉科技）のドライ真空ポンプは韓国でどこから購入できますか？",
      a: "OHI TechがGrand Hitek（北京通嘉宏瑞科技股份有限公司）の韓国総代理店です。ドライポンプ・真空統合システム・分子ポンプのモデル選定とお見積りのご相談をOHI Techで承ります。",
    },
    {
      q: "ドライポンプの各シリーズの違いは何ですか？",
      a: "GLR（GLR-Pを含む）はクリーン・一般プロセス向け多段ルーツ（110〜4,500 m³/h）、GMRはエッチング・イオン注入チャンバー向け多段ルーツ（210〜1,800 m³/h）、GHCは粉塵処理能力に優れた過酷プロセス向け一体型クロー（220〜5,500 m³/h）、GSは太陽光などで使われる新型一体型クロー（1,800〜5,500 m³/h）、GHRは高流量水素（H₂）プロセス向け多段ルーツ（600〜650 m³/h）です。括弧内は最大排気速度です。",
    },
    {
      q: "半導体以外にどのような産業で使われていますか？",
      a: "ディスプレイ（PECVD・EtchにはGHC、PVD・LL/TC・蒸着・Lami貼合にはGLR、Coater PHOTOにはGLR-P）、太陽光（結晶引上げにはGS-S、セルのPECVD・LPCVD・ALDにはGS、モジュールのラミネーションにはGLR-P）、リチウム電池（真空乾燥・脱気・組立・EOL検査などにGLR全ラインアップ）、LED・産業用真空で使われています。新型ディスプレイ分野の中国国内シェアは65%超（2024年）、太陽電池セル分野のシェアは50%超（2023年）です。",
    },
    {
      q: "半導体プロセスごとにどのシリーズを選べばよいですか？",
      a: "Load Lock・Transfer・PVD・CoaterにはGLR、IMP Source・Strip/Ashing・Oxide/Poly Etch・HDPにはGMR、ALD・PECVD・LPCVD・SACVD・MOCVD・Metal EtchにはGHC、高流量H₂を使うMOCVD・Si EPI・SiC EPI・HJTにはGHRが推奨されています。6・8インチファブのMetal EtchにはGMRも推奨されています。",
    },
    {
      q: "型番（例：GHC1800T）はどう読みますか？",
      a: "命名規則では、Gの次の文字が用途（H：Harsh/H₂、M：Medium、L：Light）、その次が構造（C：クロー、R：ルーツ、S：スクリュー）、数字が排気速度クラス（m³/h）です。末尾の文字は温度仕様（T：高温、Z：超高温、L：低温、なし：標準）と耐食仕様（N：ニッケル合金、C：コーティング、なし：球状黒鉛鋳鉄）を表します。GHC1800TはHarsh用クローポンプ、1,800 m³/hクラス、高温仕様です。",
    },
    {
      q: "どのような認証・資格を取得していますか？",
      a: "製品はSEMI S2-0724・S6-0618・S8-0218・F47-0706、ETL・UL・CE、ISO 9001:2015・ISO 14001:2015・ISO 45001:2018を取得しています。会社は国家級「専精特新『小巨人』」企業、ハイテク企業に認定されており、2015年以降の累計登録特許は220件以上です。",
    },
    {
      q: "GMRシリーズの省エネ効果はどの程度ですか？",
      a: "消費電力はGMR600が0.8 kW、GMR1200が1.0 kWで、比較対象のSGM600A・SGM1200Aよりそれぞれ50%・44%（0.8 kW）低くなっています。600クラス・1200クラス各1,000台を5年間運転する前提で、電力・PCW・N₂コストはそれぞれ約50%・49%低く試算されています。実際の削減効果はプロセス・運転条件により異なります。",
    },
    {
      q: "実際の半導体ファブでの採用実績はありますか？",
      a: "中国の主要半導体顧客からリピート受注を獲得しています。例としてCXMT（DRAM）に800台以上、HH Group（Logic）に700台以上、BYDに500台以上が納入され、顧客ごとの最長稼働時間は9,000〜23,000時間以上です。2024年に累計出荷30,000台（うち半導体2,000台以上）を突破し、2025年の中国本土半導体シェアは15%です。",
    },
    {
      q: "ドライポンプ以外にどのような製品・サービスがありますか？",
      a: "真空統合システム5種（Mizar・Megrez・Merak・Alioth・Phecda）、GTP分子ポンプ（磁気浮上GTP-M、グリース潤滑GTP-G/L、計測機器用GTP-H）、さらに真空ポンプのメンテナンス、Y2O3コーティング、部品の精密洗浄、シール製品を提供しています。",
    },
  ],
};
