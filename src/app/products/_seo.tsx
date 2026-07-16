const BASE_URL = "https://www.ohitech.co.kr";

// Offer(판매자 마크업)는 의도적으로 내보내지 않는다.
// OHI Tech는 온라인 판매가 아닌 견적 기반 B2B라, price를 선언할 수 없다.
// 과거 `price:"0" + InStock`은 실제와 불일치했고, 구글 "판매자 목록"이
// 배송·반품 정책을 요구해 영원히 해소 불가능한 경고를 만들었다.
// Offer를 생략하면 제품 스니펫·판매자 목록 대상에서 제외되어 경고가 사라지고,
// Product 엔티티(name·description·manufacturer)는 그대로 남아 AEO에는 영향이 없다.

/* ── Category META ── */

export const LASER_META = {
  ko: {
    title: "워터젯 레이저 가공기 | Hortech 공식 대리점 — OHI Tech",
    description:
      "OHI Tech는 대만 Hortech의 한국 공식 대리점입니다. LML(Laser MicroJet) 워터젯 레이저 가공기(HT-WG-LC)로 SiC·사파이어·다이아몬드 기판을 열영향(HAZ) 없이 정밀 절단. TGV 웨이퍼 관통공정 국내 유일 서비스. FPCB 레이저 커팅, 후막 에칭, 산업용 마커 전 라인업 공급.",
    keywords: "워터젯레이저, 워터젯 레이저, 수도 레이저, 수파 레이저, 레이저 마이크로젯, LML 레이저, 하이드로 레이저, 레이저 가공기, 레이저 절단기, 레이저 커팅 머신, 레이저 마킹기, 레이저 마커기, 웨이퍼 가공, 웨이퍼, 웨이퍼 홀가공, 홀가공, 웨이퍼 관통, 웨이퍼 레이저 커팅, SiC 웨이퍼 가공, 사파이어 절단, 다이아몬드 커팅, 반도체 레이저 가공, FPCB 레이저 커팅, FPCB 절단기, 후막 에칭, TGV 웨이퍼, TGV 드릴링, 유리 관통전극, 유리 비아, Through Glass Via, 레이저 다이싱, 웨이퍼 다이싱, 레이저머신, 레이저 머신, fs laser, 펨토초 레이저, 시노바, synova, waterjet laser, laser machine, wafer processing, 반도체 정밀 가공, 무열영향 레이저, 열영향부 없는 레이저, HAZ zero",
  },
  en: {
    title: "Waterjet Laser (LML) | Hortech Korea Distributor — OHI Tech",
    description:
      "Korean distributor of Hortech waterjet laser (LML) machines: zero-HAZ cutting of SiC, diamond, sapphire. Korea's only TGV wafer drilling service.",
    keywords: "waterjet laser, wafer processing, wafer, wafer hole drilling, through wafer, laser machine, fs laser, synova",
  },
  zh: {
    title: "水导激光加工机(LML) | Hortech授权经销商 — OHI Tech",
    description:
      "OHI Tech是台湾Hortech的韩国官方代理商。专注LML(Laser MicroJet)水导激光加工机(HT-WG-LC)，对SiC、金刚石、蓝宝石基板实现零热影响精密切割。韩国唯一TGV晶圆贯通工艺服务。全系列：FPCB激光切割、厚膜蚀刻、工业打标机。具有Garmin、TPK、Merck供货实绩。",
    keywords: "水导激光, 晶圆加工, 晶圆, 晶圆孔加工, 晶圆贯通, 激光机, 飞秒激光, synova",
  },
  ja: {
    title: "ウォータージェットレーザー加工機(LML) | Hortech韓国正規代理店 — OHI Tech",
    description:
      "OHI Techは台湾Hortechの韓国正規代理店です。LML(Laser MicroJet)ウォータージェットレーザー加工機(HT-WG-LC)により、SiC・サファイア・ダイヤモンド基板を熱影響（HAZ）なく精密切断。TGVウェハー貫通工程は韓国唯一のサービスです。FPCBレーザーカッティング、厚膜エッチング、産業用マーカーまで全ラインアップを供給。",
    keywords: "ウォータージェットレーザー, レーザー加工機, レーザー切断機, レーザーマーカー, ウェハー加工, ウェハー穴加工, ウェハー貫通, SiCウェハー加工, サファイア切断, ダイヤモンドカット, 半導体レーザー加工, FPCBレーザーカット, 厚膜エッチング, TGVウェハー, TGVドリリング, ガラス貫通電極, レーザーダイシング, フェムト秒レーザー, waterjet laser",
  },
};

export const THERMAL_META = {
  ko: {
    title: "열관리 솔루션 | T-Global 공식 대리점 — OHI Tech",
    description:
      "OHI Tech는 대만 T-Global Technology의 한국 공식 대리점입니다. TIM 패드(최대 17.8 W/m·K), 베이퍼 챔버, 히트파이프, AlSiC, 방열판, 열전 냉각칩 등 전 제품군 공급. 서버·AI·5G·EV·ESS 산업 특화 솔루션.",
    keywords: "방열패드, 방열 패드, 방열시트, 방열 소재, 열전도 시트, 방열 솔루션, TIM 패드, 써멀 패드, 써멀 인터페이스 소재, 열계면재, 열경계재, 써멀그리스, 방열그리스, 써멀 컴파운드, 써멀 젤, 방열 젤, 방열 폼, 갭 패드, 써멀 테이프, 방열 테이프, 그라파이트, 방열 흑연시트, TEC, TEC 모듈, 펠티에 소자, 펠티에 쿨러, 펠티에 모듈, 서모일렉트릭 쿨러, 전자냉각소자, 베이퍼챔버, VaperChamber, Vaper Chamber, 균열판, 균온판, 히트 스프레더, 열 확산기, 오하이테크, OhiTech, 열관리, 히트싱크, heatsink, heat sink, 방열기, 방열판, 베이퍼 챔버, 히트파이프, heat pipe, gap filler, 갭필러, Graphene, 그래핀, AlSiC, AlSiC 기판, 금속 기지 복합재, AI서버 방열, 데이터센터 냉각, 반도체 방열, 서버 방열, GPU 방열, AI 가속기 냉각, 5G 기지국 방열, EV 파워모듈 냉각, ESS 방열",
  },
  en: {
    title: "Thermal Management | T-Global Korea Distributor — OHI Tech",
    description:
      "Official Korean distributor of T-Global thermal materials: TIM pads up to 25 W/m·K, vapor chambers, heat pipes, and TEC chips for AI servers, 5G, EV, ESS.",
    keywords: "heat dissipation sheet, graphite, TEC, vapor chamber, VaperChamber, OhiTech, thermal management, heatsink, heat sink, thermal grease, gap filler, Graphene, AlSiC",
  },
  zh: {
    title: "热管理解决方案 | T-Global官方代理商 — OHI Tech",
    description:
      "OHI Tech是台湾T-Global Technology的韩国官方代理商。全系列产品：TIM导热垫片（最高25W/m·K）、均热板、热管、AlSiC散热片、散热器、TEC芯片。面向服务器、AI、5G、EV、ESS行业的专属解决方案。",
    keywords: "导热片, 石墨, TEC, 均热板, VaperChamber, OhiTech, 热管理, 散热器, 导热硅脂, 导热垫片, 石墨烯, AlSiC",
  },
  ja: {
    title: "熱管理ソリューション | T-Global韓国正規代理店 — OHI Tech",
    description:
      "OHI Techは台湾T-Global Technologyの韓国正規代理店です。TIMパッド（最大25W/m·K）、ベーパーチャンバー、ヒートパイプ、AlSiC、放熱板、熱電冷却チップなど全製品群を供給。サーバー・AI・5G・EV・ESS向け専用ソリューション。",
    keywords: "放熱パッド, 放熱シート, 熱伝導シート, TIMパッド, サーマルパッド, 熱界面材料, サーマルグリス, ギャップフィラー, グラファイト, TEC, ペルチェモジュール, ベーパーチャンバー, ヒートパイプ, ヒートシンク, AlSiC, グラフェン, AIサーバー放熱, データセンター冷却, 半導体放熱, GPU放熱, 5G基地局放熱, EVパワーモジュール冷却, ESS放熱",
  },
};

export const SEMICONDUCTOR_META = {
  ko: {
    title: "반도체 장비 부품 | ESC·웨이퍼 캐리어·RPS 수리 — OHI Tech",
    description:
      "OHI Tech는 반도체 장비 핵심 부품 전문 공급사입니다. 정전척(ESC) 제조·수리(Lam·AMAT·TEL·Axcelis 호환), CK Plastics 웨이퍼 캐리어(FOUP·카세트 2\"~12\"), Grand Hitek 드라이 진공 펌프 공급. B2B 반도체 부품 전문.",
    keywords: "정전척, ESC, 일렉트로스태틱 척, 전기척, 웨이퍼 홀더, 척 플레이트, 정전기 척, 정전척 수리, ESC 수리 업체, ESC 제조, ESC 재생, ESC 재제조, 쿨롱 타입 ESC, 존슨라벡 ESC, 단극형 ESC, 양극형 ESC, 반도체 소모품, 웨이퍼 캐리어, FOUP, 웨이퍼 보관함, 웨이퍼 박스, 웨이퍼 케이스, 웨이퍼 트레이, 웨이퍼 이송 박스, 300mm 웨이퍼 캐리어, 웨이퍼 카세트, 웨이퍼 수납함, 드라이 진공 펌프, 드라이 펌프, 건식 진공펌프, 오일프리 진공펌프, 무오일 진공펌프, 오일리스 펌프, 스크류 드라이 펌프, 클로우 드라이 펌프, 반도체 Etch 진공펌프, CVD 진공펌프, 임플란트 진공펌프, 반도체 부품, 반도체 장비 부품, 반도체 MRO, 반도체 소모품 공급, 반도체 교체 부품, CK Plastics, Grand Hitek, Lam ESC, AMAT ESC, TEL ESC, Axcelis ESC",
  },
  en: {
    title: "Semiconductor Parts — ESC, FOUP, RPS Repair | OHI Tech",
    description:
      "Critical semiconductor equipment parts: ESC manufacturing and repair (Lam, AMAT, TEL compatible), CK Plastics wafer carriers (FOUP), dry vacuum pumps.",
    keywords: "electrostatic chuck, ESC repair, wafer carrier, FOUP, dry vacuum pump, semiconductor parts, CK Plastics, Grand Hitek, Lam ESC, AMAT ESC, TEL ESC, Axcelis ESC, wafer cassette, semiconductor equipment parts",
  },
  zh: {
    title: "半导体设备零部件 | 静电卡盘·晶圆载体·RPS维修 — OHI Tech",
    description:
      "OHI Tech专业供应半导体设备核心零部件。静电卡盘（ESC）制造与维修（兼容Lam·AMAT·TEL·Axcelis），CK Plastics晶圆载体（FOUP及卡匣2\"~12\"），Grand Hitek干式真空泵。B2B半导体零部件专家。",
    keywords: "静电卡盘, ESC维修, 晶圆载体, FOUP, 干式真空泵, 半导体零部件, CK Plastics, Grand Hitek, Lam ESC, AMAT ESC, TEL ESC, Axcelis ESC, 晶圆卡匣, 半导体设备零部件",
  },
  ja: {
    title: "半導体装置部品 | 静電チャック・ウェハーキャリア・RPS修理 — OHI Tech",
    description:
      "OHI Techは半導体装置の中核部品を専門に供給しています。静電チャック（ESC）の製造・修理（Lam・AMAT・TEL・Axcelis対応）、CK Plasticsウェハーキャリア（FOUP・カセット2〜12インチ）、Grand Hitekドライ真空ポンプを供給。B2B半導体部品の専門商社です。",
    keywords: "静電チャック, ESC, ESC修理, ウェハーキャリア, FOUP, ウェハーカセット, ドライ真空ポンプ, 半導体部品, 半導体装置部品, CK Plastics, Grand Hitek, Lam ESC, AMAT ESC, TEL ESC, Axcelis ESC",
  },
};

export const EV_META = {
  ko: {
    title: "EV 충전기 | RongXin SKD 공급·국산 조립 — OHI Tech",
    description:
      "OHI Tech는 RongXin New Energy의 한국 공급 파트너로, EV 충전기를 SKD(부품) 공급 + 한국 현지 조립 방식으로 제공합니다. AC 완속 7~22kW, DC 급속 20~600kW, Split Power 480~2,560kW+. 기후에너지환경부 정부규격 대응, CE 인증, OCPP 1.6/2.0.1. 플릿·물류·충전소 인프라 구축 전문.",
    keywords: "전기차 충전기, 급속 충전기, 전기차 급속충전기, 초급속 충전기, 대용량 충전기, 완속 충전기, EV 충전기, DC 급속충전기, AC 충전기, 전기차 충전소, 전기차 충전소 구축, 전기차 충전기 납품, 전기차 충전기 설치, 전기차 충전기 공급, 상업용 충전기, 전기버스 충전기, 전기트럭 충전기, 화물차 충전기, 플릿 충전기, 차량 관리 충전, 배차 충전, 충전 인프라 구축, 충전 스테이션, 물류창고 충전기, 공장 충전기, 주차장 충전기, 200kW 충전기, 300kW 충전기, 480kW 충전기, 600kW 충전기, Split Power 충전기, 2560kW 충전기, 분산형 충전기, 액냉 충전기, SKD 충전기, 충전기 국산화, 국산 조립 충전기, 현지 조립 충전기, KC 인증 충전기, OCPP, OCPP 1.6, OCPP 2.0.1, RongXin, 용신 충전기, 플릿 충전, EV 인프라, 전기차 충전 보조금, 환경부 충전기 보조금, 기후에너지환경부 충전기",
  },
  en: {
    title: "EV Chargers | RongXin SKD Supply & Local Assembly — OHI Tech",
    description:
      "Korea supply partner for RongXin EV chargers — SKD component supply with local assembly. AC 7~22kW, DC fast 20~600kW, CE certified, OCPP 1.6/2.0.1.",
    keywords: "EV charger, DC fast charger, RongXin, electric vehicle charging, OCPP, OCPP 2.0.1, 600kW charger, Split Power charger, 2560kW charger, liquid-cooled charger, SKD charger, local assembly EV charger, fleet charging, EV infrastructure, AC charger, EV charging station, Korea EV charger supplier",
  },
  zh: {
    title: "电动车充电桩 | RongXin SKD供应·本地组装 — OHI Tech",
    description:
      "OHI Tech是RongXin容新新能源的韩国供应伙伴，以SKD（部件）供应+韩国本地组装方式提供EV充电桩。交流7~22kW、直流快充20~600kW、Split Power 480~2,560kW+。对应韩国政府充电桩规格（KC认证进行中），CE认证，OCPP 1.6/2.0.1。专注车队、物流及充电站基础设施建设。",
    keywords: "电动车充电桩, 直流快速充电, RongXin, 容新新能源, 新能源汽车充电, OCPP, OCPP 2.0.1, 600kW充电桩, Split Power充电桩, 2560kW充电桩, 液冷充电桩, SKD充电桩, 本地组装充电桩, 车队充电, EV基础设施, 交流充电桩, 充电站建设, 韩国充电桩供应商",
  },
  ja: {
    title: "EV充電器 | RongXin SKD供給・韓国現地組立 — OHI Tech",
    description:
      "OHI TechはRongXin New Energyの韓国供給パートナーとして、EV充電器をSKD（部品）供給＋韓国現地組立方式で提供します。AC普通充電7〜22kW、DC急速充電20〜600kW、Split Power 480〜2,560kW+。韓国政府規格対応、CE認証、OCPP 1.6/2.0.1。フリート・物流・充電インフラ構築を専門支援します。",
    keywords: "EV充電器, 急速充電器, DC急速充電器, 普通充電器, 電気自動車充電器, 充電インフラ, 充電ステーション, 商用充電器, フリート充電, RongXin, OCPP, OCPP 2.0.1, SKD充電器, 現地組立充電器, 液冷充電器, EVインフラ",
  },
};

export const TECO_META = {
  ko: {
    title: "TECO 배전·드론·ECM 모터 | 한국 공식 파트너 — OHI Tech",
    description:
      "OHI Tech는 대만 TECO Electric & Machinery(TWSE 1504, 1956년 설립)의 한국 공식 파트너입니다. AC 컨택터(6~800A), 과부하 계전기(0.1~336A), 회로 차단기(MCB·MCCB·ACB 최대 6300A), 경량/중대형 드론 모터(330W~3802W), UAV 파워트레인(150kg 페이로드), ESC, EC 모터(내전형·외전형·드라이버·통합 모듈), FCU·FFU·AHU HVAC 솔루션 전 라인업 공급. CSA·UL·CE·CCC 인증.",
    keywords: "TECO, 동원전기, TECO 한국 공식 파트너, 전자접촉기, 전자개폐기, 마그네트, 마그네틱 스위치, 마그네트 스위치, AC 컨택터, 컨택터, 전자 스위치, 전자 릴레이, 자기 개폐기, MC 스위치, 전자 접촉기, TECO CN, TECO CU, TECO TMC, 배전 기기, 배전반 부품, 분전반 부품, 배전 설비, 저압 배전, 모터 제어반, MCC, 배선용 차단기, 기중 차단기, NFB, 노퓨즈차단기, 노 퓨즈 브레이커, 성형케이스차단기, 회로 차단기, MCCB, ACB, MCB, 소형 차단기, 에어 서킷 브레이커, 간선 차단기, 열동형 계전기, 서멀 릴레이, 전자식 과전류계전기, 과부하 계전기, OCR, 과전류계전기, 전동기 보호계전기, 모터 스타터, 직입 기동기, DOL 스타터, 스타델타 스타터, 인버터 스타터, 모터 보호, 배전 부품, 드론 모터, 드론 파워트레인, 무인기 모터, UAV 파워트레인, UAV, 무인항공기, ESC 드론, 전자 변속기, BLDC 모터, 농업용 드론, 방제 드론, 측량 드론, 물류 드론, 산업용 드론, 산업용 인버터, 주파수 변환기, 중전압 인버터, 저전압 인버터, VFD, 가변 주파수 드라이브, VVVF, 인버터 드라이브, AC 드라이브, 중전압 드라이브, 서보 드라이버, 서보 드라이브, 서보 앰프, 서보 모터 드라이버, 모션 컨트롤, AC 서보, 스테핑 모터, 스텝 모터, 스테퍼 모터, 스텝 드라이버, 프로그래머블 로직 컨트롤러, PLC, ECM 모터, EC 모터, EC Motor, 전자 정류 모터, BLAC PMSM, 무브러시 모터, 브러시리스 모터, TECO ECM, 외륜구동형 EC 모터, 가변 속도 제어, 팬 코일 유닛, FCU, FFU, AHU, 팬 필터 유닛, 공기 조화 유닛, HVAC 모터, 공조 모터, 클린룸 팬 모터, 크린룸 FFU, 에너지 절감 모터, 인버터 모터, 내전형 EC 모터, 외전형 EC 모터",
  },
  en: {
    title: "TECO Distribution, Drone & EC Motors | Korea Official Partner — OHI Tech",
    description:
      "OHI Tech is the Korean official partner of TECO Electric & Machinery (TWSE 1504, est. 1956). Full lineup: AC contactors (6~800A), overload relays (0.1~336A), circuit breakers (MCB/MCCB/ACB up to 6300A), light & medium drone motors (330W~3802W), UAV powertrain (150kg payload), ESCs, EC motors (internal/external rotor, driver board, integrated module), and HVAC solutions (FCU/FFU/AHU systems). CSA, UL, CE, CCC certified.",
    keywords: "TECO, AC contactor, circuit breaker, MCCB, ACB, overload relay, drone motor, UAV powertrain, ESC, electronic speed controller, BLDC motor, agricultural drone, survey drone, power distribution, motor protection, TECO Korea distributor, EC motor, ECM motor, TECO ECM, EC driver board, ECM module, fan coil unit, FCU, FFU, AHU, air handling unit, fan filter unit, HVAC motor, BLAC PMSM, energy saving motor, internal rotor EC motor, external rotor EC motor",
  },
  zh: {
    title: "TECO 配电、无人机与EC电机 | 韩国官方合作伙伴 — OHI Tech",
    description:
      "OHI Tech 是台湾 TECO 东元电机（TWSE 1504, 1956年成立）的韩国官方合作伙伴。AC 接触器（6~800A）、过载继电器（0.1~336A）、断路器（MCB/MCCB/ACB 最高 6300A）、轻型与中型无人机电机（330W~3802W）、UAV 动力总成（150kg 载荷）、ESC、EC 电机（内转子·外转子·驱动板·集成模块）及 FCU·FFU·AHU HVAC 解决方案全系列供应。CSA·UL·CE·CCC 认证。",
    keywords: "TECO, 东元电机, AC 接触器, 断路器, MCCB, ACB, 过载继电器, 无人机电机, UAV 动力总成, ESC, 电子调速器, BLDC 电机, 农业无人机, 测绘无人机, 配电组件, 电机保护, TECO 韩国代理, EC电机, ECM电机, TECO ECM, EC驱动板, ECM集成模块, 风机盘管, FCU, FFU, AHU, 空气处理单元, 风扇过滤单元, HVAC电机, BLAC PMSM, 节能电机, 内转子EC电机, 外转子EC电机",
  },
  ja: {
    title: "TECO 配電・ドローン・ECMモーター | 韓国正規パートナー — OHI Tech",
    description:
      "OHI Techは台湾TECO Electric & Machinery（TWSE 1504、1956年設立）の韓国正規パートナーです。ACコンタクタ（6〜800A）、過負荷リレー（0.1〜336A）、回路遮断器（MCB・MCCB・ACB 最大6300A）、軽量・中型ドローンモーター（330W〜3802W）、UAVパワートレイン（150kgペイロード）、ESC、ECモーター（内転子・外転子・ドライバー・統合モジュール）、FCU・FFU・AHU HVACソリューションまで全ラインアップを供給。CSA・UL・CE・CCC認証取得。",
    keywords: "TECO, 電磁接触器, ACコンタクタ, 回路遮断器, MCCB, ACB, 過負荷リレー, ドローンモーター, UAVパワートレイン, ESC, 電子スピードコントローラー, BLDCモーター, 農業用ドローン, 測量ドローン, 配電機器, モーター保護, TECO韓国代理店, ECモーター, ECMモーター, TECO ECM, ECドライバーボード, ECM統合モジュール, ファンコイルユニット, FCU, FFU, AHU, 空気調和機, ファンフィルターユニット, HVACモーター, BLAC PMSM, 省エネモーター, 内転子ECモーター, 外転子ECモーター",
  },
};

export const PRODUCTS_META = {
  ko: {
    title: "제품 & 솔루션 — OHI Tech",
    description: "OHI Tech 반도체 장비 부품, EV 충전 솔루션, 열관리 소재, 레이저 정밀 장비 전 제품 라인업.",
    keywords: "OHI Tech 제품, 반도체 부품, EV 충전, 열관리, 레이저 장비",
  },
  en: {
    title: "Products & Solutions — OHI Tech",
    description: "OHI Tech full lineup: semiconductor equipment parts, EV charging solutions, thermal management materials, and laser precision equipment for B2B buyers.",
    keywords: "OHI Tech products, semiconductor parts, EV charging, thermal management, laser equipment",
  },
  zh: {
    title: "产品与解决方案 — OHI Tech",
    description: "OHI Tech全系列产品：半导体零部件、电动车充电解决方案、热管理材料、激光精密设备。",
    keywords: "OHI Tech产品, 半导体零部件, 电动车充电, 热管理, 激光设备",
  },
  ja: {
    title: "製品・ソリューション — OHI Tech",
    description: "OHI Techの半導体装置部品、EV充電ソリューション、熱管理材料、レーザー精密加工装置の全製品ラインアップ。",
    keywords: "OHI Tech製品, 半導体部品, EV充電, 熱管理, レーザー装置",
  },
};

/* ── Sub-page META ── */

export const ESC_META = {
  ko: {
    title: "정전척 (ESC) 제조·수리 | Lam·AMAT·TEL·Axcelis 호환 — OHI Tech",
    description:
      "OHI Tech는 정전척(ESC) 전문 공급사입니다. Lam Research(Kiyo·Flex·Versys), AMAT(Centura·Vantage), TEL(Tactras·Trias), Axcelis(Purion·Optima) 호환 ESC 제조·수리. 20단계 표준 공정, 반도체 팹 납품 실적.",
    keywords: "ESC, 정전척, 일렉트로스태틱 척, 전기척, 전기 척, 웨이퍼 홀더, 척 플레이트, 정전기 척, 정전 척, ESC 수리, ESC 수리 업체, 정전척 수리, 정전척 수리 업체, ESC 제조, 정전척 제조, ESC 재생, 정전척 재생, ESC 재제조, 쿨롱 타입, 존슨라벡 타입, 단극형 ESC, 양극형 ESC, Kiyo ESC, Flex ESC, Versys ESC, Lam ESC, AMAT ESC, TEL ESC, Axcelis ESC, electrostatic chuck, ESC repair, ESC manufacturing, 반도체 ESC",
  },
  en: {
    title: "Electrostatic Chuck (ESC) Manufacturing & Repair | Lam·AMAT·TEL·Axcelis — OHI Tech",
    description:
      "OHI Tech specializes in Electrostatic Chuck (ESC) supply for semiconductor fabs. Compatible with Lam Research (Kiyo, Flex, Versys), AMAT (Centura, Vantage), TEL (Tactras, Trias), Axcelis (Purion, Optima). 20-step standard repair process.",
    keywords: "electrostatic chuck, ESC, ESC repair, Lam ESC, AMAT ESC, TEL ESC, Axcelis ESC, Kiyo ESC, Flex ESC, Versys ESC, ESC manufacturing, semiconductor chuck repair",
  },
  zh: {
    title: "静电卡盘(ESC)制造与维修 | 兼容Lam·AMAT·TEL·Axcelis — OHI Tech",
    description:
      "OHI Tech专业供应半导体静电卡盘(ESC)。兼容Lam Research(Kiyo·Flex·Versys)、AMAT(Centura·Vantage)、TEL(Tactras·Trias)、Axcelis(Purion·Optima)。20步标准维修工艺，半导体晶圆厂供货实绩。",
    keywords: "静电卡盘, ESC, ESC维修, Lam ESC, AMAT ESC, TEL ESC, Axcelis ESC, Kiyo ESC, Flex ESC, Versys ESC, 静电卡盘制造",
  },
  ja: {
    title: "静電チャック（ESC）製造・修理 | Lam・AMAT・TEL・Axcelis対応 — OHI Tech",
    description:
      "OHI Techは静電チャック（ESC）専門の供給会社です。Lam Research（Kiyo・Flex・Versys）、AMAT（Centura・Vantage）、TEL（Tactras・Trias）、Axcelis（Purion・Optima）対応のESC製造・修理。20ステップの標準工程、半導体ファブへの納入実績。",
    keywords: "静電チャック, ESC, ESC修理, Lam ESC, AMAT ESC, TEL ESC, Axcelis ESC, Kiyo ESC, Flex ESC, Versys ESC, 静電チャック製造, 半導体ESC",
  },
};

export const WAFER_META = {
  ko: {
    title: "웨이퍼 캐리어 · FOUP | CK Plastics 공식 대리점 — OHI Tech",
    description:
      "OHI Tech는 CK Plastics(中勤實業) 한국 공급 파트너입니다. 300mm FOUP(SEMI E47.1·OHT/AGV 호환), 웨이퍼 카세트 2\"~12\" 전 라인업. Teflon·PFA·PP·PEEK·Metal 소재. ISO 9001, SEMI 인증.",
    keywords: "웨이퍼, wafer, FOUP, 품, FOSB, 포스브, 포스비, SMIF pod, SMIF, 스미프, 스미프팟, 스미프 팟, PFA 카세트, Teflon, 웨이퍼 이동, wafer 이동, 웨이퍼 캐리어, wafer carrier, 웨이퍼 carrier, 웨이퍼 카세트, 웨이퍼 보관함, 웨이퍼 보관 용기, 웨이퍼 박스, 웨이퍼 케이스, 웨이퍼 트레이, 웨이퍼 이송 박스, 웨이퍼 수납함, 반도체 웨이퍼 용기, 웨이퍼 보관함 구매, 300mm 웨이퍼 캐리어, 8인치 웨이퍼 캐리어, 12인치 웨이퍼 캐리어, OHT 캐리어, AGV 캐리어, Front Opening Unified Pod, CK Plastics, 300mm FOUP, 웨이퍼 이송, 반도체 캐리어",
  },
  en: {
    title: "Wafer Carrier & FOUP | CK Plastics Authorized Supplier — OHI Tech",
    description:
      "OHI Tech is the Korean supply partner for CK Plastics (Chung King Enterprise). 300mm FOUP (SEMI E47.1, OHT/AGV compatible), wafer cassettes 2\"~12\". Materials: Teflon, PFA, PP, PEEK, Metal. ISO 9001 & SEMI certified.",
    keywords: "wafer, FOUP, FOSB, SMIF pod, SMIF, PFA cassette, Teflon, wafer carrier, wafer transfer, wafer cassette, CK Plastics, 300mm FOUP, semiconductor carrier",
  },
  zh: {
    title: "晶圆载体·FOUP | CK Plastics供应商 — OHI Tech",
    description:
      "OHI Tech是CK Plastics(中勤實業)韩国供应伙伴。300mm FOUP（符合SEMI E47.1·OHT/AGV兼容），晶圆卡匣2\"~12\"全系列。Teflon·PFA·PP·PEEK·金属材质。ISO 9001及SEMI认证。",
    keywords: "FOUP, 晶圆载体, 晶圆卡匣, CK Plastics, 300mm FOUP, 晶圆搬运, 半导体载体, SMIF Pod, FOSB, Teflon, PFA卡匣",
  },
  ja: {
    title: "ウェハーキャリア・FOUP | CK Plastics韓国正規代理店 — OHI Tech",
    description:
      "OHI TechはCK Plastics（中勤實業）の韓国供給パートナーです。300mm FOUP（SEMI E47.1準拠・OHT/AGV対応）、ウェハーカセット2〜12インチの全ラインアップ。Teflon・PFA・PP・PEEK・金属素材。ISO 9001、SEMI認証取得。",
    keywords: "ウェハーキャリア, FOUP, ウェハーカセット, ウェハー収納容器, SMIF Pod, FOSB, PFAカセット, Teflon, CK Plastics, 300mm FOUP, 半導体キャリア, ウェハー搬送",
  },
};

export const PUMP_META = {
  ko: {
    title: "드라이 진공 펌프 | Grand Hitek 한국 공급 — OHI Tech",
    description:
      "OHI Tech는 대만 Grand Hitek(通嘉科技) 드라이 진공 펌프 한국 공급사입니다. 반도체 Etch·CVD·Implant 공정 적용. 오일프리, 클린룸 환경 최적화 설계.",
    keywords: "진공펌프, 드라이 진공펌프, 건식 진공펌프, 반도체 진공펌프, 디스플레이 진공펌프, 태양광 진공펌프, pump, 드라이 진공 펌프, 드라이 펌프, 오일프리 진공펌프, 무오일 진공펌프, 오일리스 진공펌프, 오일리스 펌프, 스크류 드라이 펌프, 스크류 진공펌프, 클로우 드라이 펌프, 클로우 진공펌프, 다단 루츠 펌프, 루츠 펌프, 드라이 스크롤 펌프, 반도체 Etch 진공펌프, CVD 진공펌프, 임플란트 진공펌프, 이온 주입 진공펌프, 반도체 펌프 공급, Grand Hitek, 통가과기, dry vacuum pump, oil-free pump, 클린룸 펌프",
  },
  en: {
    title: "Dry Vacuum Pump | Grand Hitek Korea Supplier — OHI Tech",
    description:
      "OHI Tech is the Korean supplier of Grand Hitek (通嘉科技, Taiwan) dry vacuum pumps. Designed for semiconductor Etch, CVD, and Implant processes. Oil-free, cleanroom-optimized.",
    keywords: "dry vacuum pump, dry pump, Grand Hitek, semiconductor vacuum pump, oil-free pump, cleanroom pump, Etch pump, CVD pump",
  },
  zh: {
    title: "干式真空泵 | 通嘉科技韩国供应商 — OHI Tech",
    description:
      "OHI Tech是台湾通嘉科技(Grand Hitek)干式真空泵韩国供应商。适用于半导体Etch、CVD、Implant工艺。无油设计，洁净室环境优化。",
    keywords: "干式真空泵, 干泵, 通嘉科技, Grand Hitek, 半导体真空泵, 无油泵, 洁净室泵, Etch泵, CVD泵, Implant泵",
  },
  ja: {
    title: "ドライ真空ポンプ | Grand Hitek韓国供給 — OHI Tech",
    description:
      "OHI Techは台湾Grand Hitek（通嘉科技）のドライ真空ポンプ韓国供給会社です。半導体Etch・CVD・Implant工程に適用。オイルフリー、クリーンルーム環境に最適化した設計。",
    keywords: "真空ポンプ, ドライ真空ポンプ, ドライポンプ, 半導体真空ポンプ, オイルフリー真空ポンプ, スクリュードライポンプ, クローポンプ, ルーツポンプ, Etch真空ポンプ, CVD真空ポンプ, イオン注入真空ポンプ, Grand Hitek, クリーンルームポンプ",
  },
};

export const ORING_META = {
  ko: {
    title: "반도체 O-Ring | NEOTECH NEOPURE® — OHI Tech",
    description:
      "OHI Tech는 NEOTECH NEOPURE® 고순도 O-Ring·PAD·Valve 공급사입니다. 반도체 및 디스플레이 공정 적용. 내화학성·내열성 우수, 파티클 최소화. 플라즈마 공정 대응.",
    keywords: "O-Ring, 오링, O-링, 반도체 O링, 반도체 오링, 반도체 씰링, 씰링재, 반도체 패킹, 씰 링, 봉합재, 가스켓, 반도체 가스켓, 고순도 오링, FFKM 오링, FKM 오링, Viton 오링, Kalrez 대체, 퍼플루오로엘라스토머 오링, 불소 오링, 내화학성 오링, 플라즈마 내성 오링, 식각 오링, CVD 오링, 고온 오링, 진공 씰링, NEOTECH, NEOPURE, semiconductor O-ring, 디스플레이 오링",
  },
  en: {
    title: "Semiconductor O-Ring | NEOTECH NEOPURE® — OHI Tech",
    description:
      "OHI Tech supplies NEOTECH NEOPURE® high-purity O-Ring, PAD, and Valve for semiconductor and display processes. Excellent chemical and heat resistance, minimal particle generation. Plasma process compatible.",
    keywords: "O-Ring, semiconductor O-ring, NEOTECH, NEOPURE, high purity O-ring, semiconductor seal, plasma O-ring, display O-ring",
  },
  zh: {
    title: "半导体O-Ring | NEOTECH NEOPURE® — OHI Tech",
    description:
      "OHI Tech供应NEOTECH NEOPURE®高纯度O-Ring、PAD、Valve，适用于半导体及显示器工艺。优异耐化学性、耐热性，粒子生成最小化。等离子工艺兼容。",
    keywords: "O-Ring, 半导体O型圈, NEOTECH, NEOPURE, 高纯度O圈, 半导体密封件, 等离子O圈",
  },
  ja: {
    title: "半導体O-Ring | NEOTECH NEOPURE® — OHI Tech",
    description:
      "OHI TechはNEOTECH NEOPURE®高純度O-Ring・PAD・Valveの供給会社です。半導体及びディスプレイ工程に適用。優れた耐薬品性・耐熱性、パーティクル最小化。プラズマ工程にも対応。",
    keywords: "O-Ring, オーリング, 半導体O-Ring, 半導体シーリング, シール材, ガスケット, 高純度オーリング, FFKMオーリング, 耐薬品性オーリング, プラズマ耐性オーリング, NEOTECH, NEOPURE, ディスプレイオーリング",
  },
};

export const RPS_META = {
  ko: {
    title: "RPS 수리·오버홀 | MKS ASTRON·PARAGON 원격 플라즈마 소스 — OHI Tech",
    description:
      "OHI Tech는 MKS ASTRON·PARAGON·R*evolution 원격 플라즈마 소스(RPS) 수리·오버홀 전문입니다. AC/DC Fail·Source Leak·Ignition·Particle 4대 Fail Mode 근본 원인 진단, 수리 후 COA 성적서 제공. ASTRON 2L·3L·6L·8L·15L·22L·30L 전 모델 대응.",
    keywords: "RPS 수리, RPS 오버홀, 원격 플라즈마 소스, remote plasma source, MKS ASTRON 수리, MKS PARAGON 수리, MKS RPS 수리, ASTRON 2L, ASTRON 3L, ASTRON 6L, ASTRON 8L, ASTRON 15L, ASTRON 22L, RPS 30L, R*evolution 수리, REVOLUTION 수리, AX7690, AX7695, AX7696, AX7700, AX7710, AX7651, AX7657, AX7658, AX7670, AX7685, AX7645, AX7667, 플라즈마 소스 수리, 챔버 클린, PR strip, PR 제거, 애싱, 반도체 장비 수리, 반도체 오버홀, source leak, ignition fault, particle fail, COA, certificate of analysis, MKS RPS 2L, MKS RPS 3L, MKS RPS 6L, ASTRON e/ex, ASTRONex, AMAT, LAM, Novellus HDP",
  },
  en: {
    title: "RPS Repair & Overhaul | MKS ASTRON·PARAGON Remote Plasma Source — OHI Tech",
    description:
      "OHI Tech specializes in the repair & overhaul of MKS ASTRON, PARAGON, and R*evolution remote plasma sources (RPS). Root-cause diagnosis of 4 fail modes (AC/DC, Source Leak, Ignition, Particle), COA service report after every repair. Full ASTRON 2L·3L·6L·8L·15L·22L·30L coverage.",
    keywords: "RPS repair, RPS overhaul, remote plasma source repair, MKS ASTRON repair, MKS PARAGON repair, MKS RPS repair, ASTRON 2L, ASTRON 3L, ASTRON 6L, ASTRON 8L, ASTRON 15L, ASTRON 22L, RPS 30L, R*evolution, REVOLUTION, plasma source repair, chamber clean, PR strip, ashing, semiconductor equipment repair, source leak, ignition fault, particle fail, COA, certificate of analysis, AMAT, LAM, Novellus HDP",
  },
  zh: {
    title: "RPS 维修与大修 | MKS ASTRON·PARAGON 远程等离子体源 — OHI Tech",
    description:
      "OHI Tech 专业维修与大修 MKS ASTRON、PARAGON、R*evolution 远程等离子体源(RPS)。4大故障模式(AC/DC、Source Leak、Ignition、Particle)根本原因诊断，每次维修后提供COA成绩书。全面覆盖 ASTRON 2L·3L·6L·8L·15L·22L·30L。",
    keywords: "RPS维修, RPS大修, 远程等离子体源, MKS ASTRON维修, MKS PARAGON维修, MKS RPS维修, ASTRON 2L, ASTRON 3L, ASTRON 6L, ASTRON 8L, ASTRON 15L, ASTRON 22L, RPS 30L, R*evolution, 等离子体源维修, 腔室清洁, PR strip, 灰化, 半导体设备维修, source leak, ignition fault, particle fail, COA, AMAT, LAM, Novellus HDP",
  },
  ja: {
    title: "RPS修理・オーバーホール | MKS ASTRON・PARAGON 遠隔プラズマソース — OHI Tech",
    description:
      "OHI TechはMKS ASTRON・PARAGON・R*evolution 遠隔プラズマソース(RPS)の修理・オーバーホールを専門としています。AC/DC Fail・Source Leak・Ignition・Particleの4大Fail Modeの根本原因診断、修理後にCOA成績書を提供。ASTRON 2L・3L・6L・8L・15L・22L・30Lの全モデルに対応。",
    keywords: "RPS修理, RPSオーバーホール, 遠隔プラズマソース, MKS ASTRON修理, MKS PARAGON修理, MKS RPS修理, ASTRON 2L, ASTRON 3L, ASTRON 6L, ASTRON 8L, ASTRON 15L, ASTRON 22L, RPS 30L, R*evolution修理, プラズマソース修理, チャンバークリーン, PR strip, アッシング, 半導体装置修理, source leak, ignition fault, particle fail, COA, AMAT, LAM, Novellus HDP",
  },
};

/* ── Helpers ── */

type Locale = "ko" | "en" | "zh" | "ja";

export function getMetaForCategory(category: string, locale: Locale) {
  switch (category) {
    case "laser-equipment":    return LASER_META[locale];
    case "thermal-management": return THERMAL_META[locale];
    case "semiconductor-parts": return SEMICONDUCTOR_META[locale];
    case "ev-charging":        return EV_META[locale];
    case "power-distribution": return TECO_META[locale];
    default:                   return PRODUCTS_META[locale];
  }
}

export function getMetaForSub(sub: string, locale: Locale) {
  switch (sub) {
    case "esc":             return ESC_META[locale];
    case "wafer-carrier":   return WAFER_META[locale];
    case "dry-vacuum-pump": return PUMP_META[locale];
    case "oring":           return ORING_META[locale];
    case "rps-repair":      return RPS_META[locale];
    default:                return null;
  }
}

export function getOgImages(category: string, altText: string) {
  if (category === "thermal-management") {
    return [{ url: "https://www.tglobalcorp.com/upload/catalog_m_b/TIM__24F07SulHq.jpg", width: 800, height: 600, alt: altText }];
  }
  if (category === "laser-equipment" || category === "semiconductor-parts") {
    return [{ url: `${BASE_URL}/images/categories/semiconductor.jpg`, width: 1200, height: 630, alt: altText }];
  }
  return [{ url: `${BASE_URL}/images/logo-large.png`, width: 400, height: 400, alt: altText }];
}

export function getTwitterImages(category: string) {
  if (category === "thermal-management") {
    return ["https://www.tglobalcorp.com/upload/catalog_m_b/TIM__24F07SulHq.jpg"];
  }
  if (category === "laser-equipment" || category === "semiconductor-parts") {
    return [`${BASE_URL}/images/categories/semiconductor.jpg`];
  }
  return [`${BASE_URL}/images/logo-large.png`];
}

/* ── Localized BreadcrumbList + FAQPage builders ── */

const BREADCRUMB_ROOT: Record<Locale, { home: string; products: string }> = {
  ko: { home: "홈", products: "제품 & 솔루션" },
  en: { home: "Home", products: "Products & Solutions" },
  zh: { home: "首页", products: "产品与解决方案" },
  ja: { home: "ホーム", products: "製品・ソリューション" },
};

const CATEGORY_CRUMB = {
  "laser-equipment":     { ko: "레이저 정밀 장비", en: "Laser Precision Equipment", zh: "激光精密设备", ja: "レーザー精密加工装置" },
  "thermal-management":  { ko: "열관리 솔루션", en: "Thermal Management Solutions", zh: "热管理解决方案", ja: "熱管理ソリューション" },
  "semiconductor-parts": { ko: "반도체 장비 부품", en: "Semiconductor Equipment Parts", zh: "半导体设备零部件", ja: "半導体装置部品" },
  "ev-charging":         { ko: "EV 충전 솔루션", en: "EV Charging Solutions", zh: "电动车充电解决方案", ja: "EV充電ソリューション" },
  "power-distribution":  { ko: "배전 & 드론 솔루션", en: "Power Distribution & Drone", zh: "配电与无人机解决方案", ja: "配電・ドローンソリューション" },
} as const;

function buildBreadcrumb(locale: Locale, category: keyof typeof CATEGORY_CRUMB) {
  const root = BREADCRUMB_ROOT[locale];
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: root.home, item: BASE_URL },
      { "@type": "ListItem", position: 2, name: root.products, item: `${BASE_URL}/products` },
      { "@type": "ListItem", position: 3, name: CATEGORY_CRUMB[category][locale], item: `${BASE_URL}/products/${category}` },
    ],
  };
}

type Faq = { q: string; a: string };

function faqPage(items: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

const FAQ_LASER: Record<Locale, Faq[]> = {
  ko: [
    { q: "LML(Laser MicroJet) 워터젯 레이저란 무엇인가요?", a: "LML(Laser MicroJet)은 스위스 Synova社가 개발한 수냉 레이저 가공 기술입니다. 직경 25~100µm의 물 기둥이 레이저 빔을 전반사(TIR)로 가이딩하여 절단 영역을 냉각하면서 가공합니다. 열영향대(HAZ)가 사실상 제로(0)이며, Hortech가 곡선 가공 특허(US 8,422,521 B2)를 독자 보유하고 있습니다." },
    { q: "SiC·다이아몬드·사파이어 기판 레이저 가공이 가능한가요?", a: "네. OHI Tech가 공급하는 Hortech HT-WG-LC(LML 워터젯 레이저)는 SiC 파워 반도체, 다이아몬드 기판, 사파이어 웨이퍼를 열영향 없이 정밀 절단·드릴링합니다. 위치 정밀도 ±3µm, 빔 스팟 50~200µm, 3/4/5축 선택 가능합니다." },
    { q: "TGV(Through Glass Via) 웨이퍼 관통공정이란 무엇인가요?", a: "TGV는 유리 또는 웨이퍼 기판에 레이저로 미세 관통홀을 형성하는 공정입니다. OHI Tech는 LML 워터젯 레이저를 활용한 TGV 관통공정을 국내 유일하게 제공합니다. 3D 패키징, 인터포저, MEMS 소자 등 첨단 반도체 패키징에 활용됩니다." },
    { q: "Hortech 레이저 장비의 한국 공식 대리점은 어디인가요?", a: "OHI Tech가 대만 Hortech(창립 1995, 대만 증권거래소 7611)의 한국 공식 대리점입니다. 워터젯 레이저 가공기(HT-WG-LC), FPCB 레이저 커팅기, 후막 레이저 에칭기, 산업용 레이저 마커 전 라인업을 공급합니다." },
    { q: "Hortech 레이저 장비의 최소 주문 수량(MOQ)은 어떻게 되나요?", a: "Hortech 레이저 장비는 개별 설비(자본재) 단위로 판매되며 최소 주문 수량(MOQ)이 없습니다. OHI Tech가 한국 내에서 사전 상담, 애플리케이션 테스트, 설치, 사후 지원을 제공합니다. 견적은 문의해 주세요." },
  ],
  en: [
    { q: "What is LML (Laser MicroJet) waterjet laser?", a: "LML (Laser MicroJet) is a water-jet-guided laser process developed by Synova (Switzerland). A 25–100µm water column guides the laser beam by total internal reflection (TIR), cooling the cut zone during processing. The heat-affected zone (HAZ) is virtually zero, and Hortech holds an exclusive patent (US 8,422,521 B2) for curved-path machining." },
    { q: "Can it process SiC, diamond, and sapphire substrates?", a: "Yes. The Hortech HT-WG-LC (LML waterjet laser) supplied by OHI Tech precisely cuts and drills SiC power semiconductors, diamond substrates, and sapphire wafers with zero heat damage. Positioning accuracy ±3µm, beam spot 50–200µm, with 3/4/5-axis options." },
    { q: "What is the TGV (Through Glass Via) wafer drilling process?", a: "TGV forms fine through-holes in glass or wafer substrates with a laser. OHI Tech is the only provider in Korea offering TGV drilling using the LML waterjet laser. It is used in 3D packaging, interposers, and MEMS devices for advanced semiconductor packaging." },
    { q: "Who is the official Korean distributor of Hortech laser equipment?", a: "OHI Tech is the official Korean distributor of Hortech (founded 1995, Taiwan Stock Exchange 7611). We supply the full lineup: waterjet laser machines (HT-WG-LC), FPCB laser cutters, thick-film laser etchers, and industrial laser markers." },
    { q: "What is the minimum order quantity for Hortech laser machines?", a: "Hortech laser equipment is sold as individual capital equipment units — there is no minimum order quantity. OHI Tech provides pre-sales consultation, application testing, installation, and after-sales support in Korea. Contact us for a quote." },
  ],
  zh: [
    { q: "什么是LML（Laser MicroJet）水导激光？", a: "LML（Laser MicroJet）是瑞士Synova公司开发的水导激光加工技术。直径25~100µm的水柱通过全反射（TIR）引导激光束，在加工时冷却切割区域。热影响区（HAZ）几乎为零，Hortech独家拥有曲线加工专利（US 8,422,521 B2）。" },
    { q: "能否加工SiC、金刚石、蓝宝石基板？", a: "可以。OHI Tech供应的Hortech HT-WG-LC（LML水导激光）可对SiC功率半导体、金刚石基板、蓝宝石晶圆进行无热损伤精密切割与钻孔。定位精度±3µm，光斑50~200µm，可选3/4/5轴。" },
    { q: "什么是TGV（玻璃通孔）晶圆贯通工艺？", a: "TGV是用激光在玻璃或晶圆基板上形成微细通孔的工艺。OHI Tech是韩国唯一提供基于LML水导激光的TGV贯通工艺的企业。广泛应用于3D封装、转接板、MEMS器件等先进半导体封装。" },
    { q: "Hortech激光设备的韩国官方代理商是谁？", a: "OHI Tech是台湾Hortech（成立于1995年，台湾证券交易所7611）的韩国官方代理商。供应全系列：水导激光加工机（HT-WG-LC）、FPCB激光切割机、厚膜激光蚀刻机、工业激光打标机。" },
    { q: "Hortech激光设备的最小起订量（MOQ）是多少？", a: "Hortech激光设备按单台设备（资本品）销售，无最小起订量。OHI Tech在韩国提供售前咨询、应用测试、安装及售后支持。报价请联系我们。" },
  ],
  ja: [
    { q: "LML（Laser MicroJet）ウォータージェットレーザーとは何ですか？", a: "LML（Laser MicroJet）はスイスのSynova社が開発した水冷レーザー加工技術です。直径25〜100µmの水柱がレーザービームを全反射（TIR）で導き、切断部を冷却しながら加工します。熱影響部（HAZ）は実質ゼロで、Hortechは曲線加工特許（US 8,422,521 B2）を独自に保有しています。" },
    { q: "SiC・ダイヤモンド・サファイア基板のレーザー加工は可能ですか？", a: "はい。OHI Techが供給するHortech HT-WG-LC（LMLウォータージェットレーザー）は、SiCパワー半導体、ダイヤモンド基板、サファイアウェハーを熱影響なく精密に切断・穴あけします。位置精度±3µm、ビームスポット50〜200µm、3/4/5軸から選択可能です。" },
    { q: "TGV（Through Glass Via）ウェハー貫通工程とは何ですか？", a: "TGVはガラスまたはウェハー基板にレーザーで微細な貫通穴を形成する工程です。OHI TechはLMLウォータージェットレーザーを活用したTGV貫通工程を韓国で唯一提供しています。3Dパッケージング、インターポーザー、MEMSデバイスなど先端半導体パッケージングに活用されます。" },
    { q: "Hortechレーザー装置の韓国正規代理店はどこですか？", a: "OHI Techが台湾Hortech（創業1995年、台湾証券取引所7611）の韓国正規代理店です。ウォータージェットレーザー加工機（HT-WG-LC）、FPCBレーザーカッティング機、厚膜レーザーエッチング機、産業用レーザーマーカーまで全ラインアップを供給します。" },
    { q: "Hortechレーザー装置の最小発注数量（MOQ）はどのくらいですか？", a: "Hortechレーザー装置は個別設備（資本財）単位で販売され、最小発注数量（MOQ）はありません。OHI Techが韓国国内で事前相談、アプリケーションテスト、設置、アフターサポートを提供します。お見積もりはお問い合わせください。" },
  ],
};

const FAQ_THERMAL: Record<Locale, Faq[]> = {
  ko: [
    { q: "OHI Tech가 T-Global에서 공급하는 열관리 제품은 무엇인가요?", a: "OHI Tech는 T-Global 전 제품군을 공급합니다 — TIM 패드(갭 필러, 써멀 테이프, 상변화 물질), 베이퍼 챔버, 히트파이프, AlSiC 히트 스프레더, 방열판, 열전 냉각칩(TEC/펠티에), 그라파이트/그래핀 시트, 열 시뮬레이션 서비스." },
    { q: "T-Global TIM 패드의 열전도율은 얼마인가요?", a: "T-Global TIM 패드의 열전도율은 제품 종류에 따라 1.0~17.8 W/m·K이며, 그래핀 강화 제품은 1800+ W/m·K에 달합니다. TG-A1250(6.0 W/m·K), TG-A1780(17.8 W/m·K), TG-A6200(비실리콘 제품) 등 다양한 옵션이 있습니다." },
    { q: "최소 주문 수량(MOQ)이 있나요?", a: "T-Global은 MOQ(최소 주문 수량) 없이 샘플부터 대량 주문까지 대응합니다. OHI Tech를 통해 소량 샘플 요청도 가능합니다. 최단 납기는 14일입니다." },
    { q: "NMVC™란 무엇이고 구리 베이퍼 챔버와 어떻게 비교되나요?", a: "NMVC™(Non-Metal Vapor Chamber)는 T-Global 기술 기반으로 Xerendipity가 개발한 비금속 베이퍼 챔버로, 면 방향 열전도율(Kxy) 약 2500 W/m·K를 RF 간섭 거의 없이 구현합니다. 동일 조건(15×15mm, 1W 발열, 25°C, 자연대류)에서 NMVC 48°C 대 구리 VC 50.4°C로, 구리 VC의 약 80~90% 성능을 80% 가벼운 무게로 제공합니다. Vapor-Pad나 TIM과 함께 쓰면 최적입니다." },
    { q: "Vapor-Pad™란 무엇인가요?", a: "Vapor-Pad™는 Xerendipity가 개발한 하이브리드 열전도 패드로, Z축 열전도(Kz 15~25 W/m·K)와 X-Y 평면 베이퍼챔버 열확산(Kxy 800~1200 W/m·K)을 결합한 신소재입니다. 동일 조건에서 일반 열전도 패드(73.6°C) 대비 40.8°C로 피크 온도를 44% 저감합니다. SGS 인증, 실리콘 프리 옵션 제공." },
  ],
  en: [
    { q: "What thermal management products does OHI Tech supply from T-Global?", a: "OHI Tech supplies the full T-Global product range including TIM pads (Gap Filler, Thermal Tape, Phase Change Materials), Vapor Chambers, Heat Pipes, AlSiC Heat Spreaders, Heat Sinks, Thermoelectric Cooling Chips (TEC/Peltier), Graphite/Graphene Sheets, and Thermal Simulation services." },
    { q: "What is the thermal conductivity of T-Global TIM pads?", a: "T-Global TIM pads range from 1.0 to 17.8 W/m·K depending on the product, and graphene-reinforced products reach 1800+ W/m·K. Options include TG-A1250 (6.0 W/m·K), TG-A1780 (17.8 W/m·K), and TG-A6200 (silicone-free)." },
    { q: "Is there a minimum order quantity (MOQ)?", a: "T-Global serves everything from samples to high-volume orders with no MOQ. Small sample requests are available through OHI Tech. The shortest lead time is 14 days." },
    { q: "What is NMVC™ and how does it compare to a copper vapor chamber?", a: "NMVC™ (Non-Metal Vapor Chamber) by Xerendipity, based on T-Global technology, achieves ~2500 W/m·K in-plane thermal conductivity (Kxy) with near-zero RF interference. Benchmark tests show NMVC at 48°C vs copper VC at 50.4°C under identical conditions (15×15mm, 1W heat source, 25°C ambient, natural convection), delivering ~80–90% of copper VC performance at 80% lighter weight. Best used with Vapor-Pad or TIM for optimal results." },
    { q: "What is Vapor-Pad™?", a: "Vapor-Pad™ is a hybrid thermal pad developed by Xerendipity that combines Z-axis conduction (Kz 15–25 W/m·K) with X-Y in-plane vapor-chamber spreading (Kxy 800–1200 W/m·K). Under identical conditions it lowers peak temperature by 44% (40.8°C vs 73.6°C for a conventional pad). SGS certified, silicone-free option available." },
  ],
  zh: [
    { q: "OHI Tech从T-Global供应哪些热管理产品？", a: "OHI Tech供应T-Global全系列产品——TIM导热垫片（间隙填充、导热胶带、相变材料）、均热板、热管、AlSiC散热片、散热器、热电制冷芯片（TEC/帕尔贴）、石墨/石墨烯片，以及热仿真服务。" },
    { q: "T-Global TIM导热垫片的导热率是多少？", a: "T-Global TIM垫片的导热率根据产品在1.0~17.8 W/m·K之间，石墨烯强化产品可达1800+ W/m·K。可选TG-A1250（6.0 W/m·K）、TG-A1780（17.8 W/m·K）、TG-A6200（无硅）等。" },
    { q: "是否有最小起订量（MOQ）？", a: "T-Global无MOQ，从样品到大批量订单均可对应。通过OHI Tech可申请小批量样品。最短交期为14天。" },
    { q: "什么是NMVC™？与铜均热板相比如何？", a: "NMVC™（非金属均热板）由Xerendipity基于T-Global技术开发，面内导热率（Kxy）约2500 W/m·K，几乎无RF干扰。相同条件下（15×15mm、1W热源、25°C、自然对流）NMVC为48°C，铜均热板为50.4°C，以80%更轻的重量实现铜均热板约80~90%的性能。与Vapor-Pad或TIM搭配使用效果最佳。" },
    { q: "什么是Vapor-Pad™？", a: "Vapor-Pad™是Xerendipity开发的混合导热垫片，结合Z轴热传导（Kz 15~25 W/m·K）与X-Y平面均热板热扩散（Kxy 800~1200 W/m·K）。相同条件下相比传统导热垫片（73.6°C）将峰值温度降低44%（40.8°C）。SGS认证，提供无硅选项。" },
  ],
  ja: [
    { q: "OHI TechがT-Globalから供給する熱管理製品は何ですか？", a: "OHI TechはT-Globalの全製品群を供給しています — TIMパッド（ギャップフィラー、サーマルテープ、相変化材料）、ベーパーチャンバー、ヒートパイプ、AlSiCヒートスプレッダー、放熱板、熱電冷却チップ（TEC/ペルチェ）、グラファイト/グラフェンシート、熱シミュレーションサービス。" },
    { q: "T-Global TIMパッドの熱伝導率はどのくらいですか？", a: "T-Global TIMパッドの熱伝導率は製品種類により1.0〜17.8 W/m・Kで、グラフェン強化製品は1800+ W/m・Kに達します。TG-A1250（6.0 W/m・K）、TG-A1780（17.8 W/m・K）、TG-A6200（シリコンフリー製品）など多様なオプションがあります。" },
    { q: "最小発注数量（MOQ）はありますか？", a: "T-GlobalはMOQ（最小発注数量）なしでサンプルから大量注文まで対応します。OHI Techを通じて少量サンプルのご依頼も可能です。最短納期は14日です。" },
    { q: "NMVC™とは何で、銅製ベーパーチャンバーとどう比較されますか？", a: "NMVC™（Non-Metal Vapor Chamber）はT-Global技術をベースにXerendipityが開発した非金属ベーパーチャンバーで、面内熱伝導率（Kxy）約2500 W/m・KをRF干渉ほぼゼロで実現します。同一条件（15×15mm、1W発熱、25°C、自然対流）でNMVC 48°C対銅VC 50.4°Cで、銅VCの約80〜90%の性能を80%軽い重量で提供します。Vapor-PadやTIMと併用すると最適です。" },
    { q: "Vapor-Pad™とは何ですか？", a: "Vapor-Pad™はXerendipityが開発したハイブリッド熱伝導パッドで、Z軸熱伝導（Kz 15〜25 W/m・K）とX-Y平面ベーパーチャンバー熱拡散（Kxy 800〜1200 W/m・K）を組み合わせた新素材です。同一条件下で一般熱伝導パッド（73.6°C）に比べ40.8°Cとピーク温度を44%低減します。SGS認証、シリコンフリーオプションあり。" },
  ],
};

const FAQ_SEMI: Record<Locale, Faq[]> = {
  ko: [
    { q: "정전척(ESC) 수리를 맡길 수 있나요?", a: "네. OHI Tech는 ESC 전문 제조사의 한국 공식 공급 파트너입니다. Lam Research(Kiyo·Flex·Versys), Applied Materials(Centura·Vantage), TEL(Tactras·Trias), Axcelis(Purion·Optima) 장비용 ESC 수리 및 신규 제조를 20단계 표준 프로세스로 제공합니다." },
    { q: "FOUP은 어떤 사이즈까지 공급 가능한가요?", a: "OHI Tech는 CK Plastics(中勤實業)를 통해 2인치~12인치 전 사이즈 웨이퍼 캐리어를 공급합니다. 300mm(12\") FOUP은 SEMI E47.1 완전 준수, OHT/AGV 자동화 시스템 호환. 25-slot 표준·13-slot 박막·6-slot 초박막 전 라인업 보유." },
    { q: "Lam Research 장비와 호환되는 ESC 타입은 무엇인가요?", a: "OHI Tech는 Lam Research Kiyo(유전체 식각), Flex(도체 식각), 2300 Versys, TCP, Coronus 장비와 호환되는 정전척(ESC)을 공급합니다. 코팅 타입과 플레이트 타입 모두 제공합니다. ESC 수리·신규 공급은 OHI Tech로 문의해 주세요." },
    { q: "웨이퍼 카세트 커스텀 제작이 가능한가요?", a: "네. CK Plastics는 비표준 사이즈, 특수 슬롯 구성, OEM 생산이 가능합니다. 175mm 등 비표준 사이즈, 6\"→8\" 변환 어댑터 등 커스텀 제작 가능. OHI Tech를 통해 사양 협의 후 최소 주문 수량(MOQ)을 안내해 드립니다." },
  ],
  en: [
    { q: "Can OHI Tech repair electrostatic chucks (ESC)?", a: "Yes. OHI Tech is the Korean supply partner of an ESC specialist manufacturer. We provide ESC repair and new manufacturing for Lam Research (Kiyo/Flex/Versys), Applied Materials (Centura/Vantage), TEL (Tactras/Trias), and Axcelis (Purion/Optima) equipment via a 20-step standard process." },
    { q: "What FOUP sizes can you supply?", a: "Through CK Plastics (Chung King Enterprise), OHI Tech supplies wafer carriers in all sizes from 2\" to 12\". The 300mm (12\") FOUP is fully SEMI E47.1 compliant and OHT/AGV automation compatible. 25-slot standard, 13-slot thin, and 6-slot ultra-thin lineups are available." },
    { q: "What ESC types are compatible with Lam Research equipment?", a: "OHI Tech supplies Electrostatic Chucks (ESC) compatible with Lam Research Kiyo (Dielectric Etch), Flex (Conductor Etch), 2300 Versys, TCP, and Coronus equipment. Both Coating Type and Plate Type are available. Contact OHI Tech for ESC repair or new supply requests." },
    { q: "Can wafer cassettes be custom-made?", a: "Yes. CK Plastics supports non-standard sizes, special slot configurations, and OEM production — including non-standard sizes such as 175mm and 6\"→8\" conversion adapters. OHI Tech will review specifications and advise on the minimum order quantity (MOQ)." },
  ],
  zh: [
    { q: "可以委托维修静电卡盘（ESC）吗？", a: "可以。OHI Tech是ESC专业制造商的韩国官方供应伙伴。通过20步标准流程为Lam Research（Kiyo·Flex·Versys）、Applied Materials（Centura·Vantage）、TEL（Tactras·Trias）、Axcelis（Purion·Optima）设备提供ESC维修及新品制造。" },
    { q: "FOUP可供应到什么尺寸？", a: "OHI Tech通过CK Plastics（中勤實業）供应2英寸~12英寸全尺寸晶圆载体。300mm（12\"）FOUP完全符合SEMI E47.1，兼容OHT/AGV自动化系统。备有25槽标准、13槽薄型、6槽超薄全系列。" },
    { q: "哪些ESC类型与Lam Research设备兼容？", a: "OHI Tech供应兼容Lam Research Kiyo（介质刻蚀）、Flex（导体刻蚀）、2300 Versys、TCP、Coronus设备的静电卡盘（ESC）。提供涂层型与平板型。ESC维修或新品供应请联系OHI Tech。" },
    { q: "晶圆卡匣可以定制吗？", a: "可以。CK Plastics支持非标准尺寸、特殊槽位配置及OEM生产，包括175mm等非标尺寸、6\"→8\"转换适配器等。OHI Tech将协商规格后告知最小起订量（MOQ）。" },
  ],
  ja: [
    { q: "静電チャック（ESC）の修理を依頼できますか？", a: "はい。OHI TechはESC専門製造会社の韓国正規供給パートナーです。Lam Research（Kiyo・Flex・Versys）、Applied Materials（Centura・Vantage）、TEL（Tactras・Trias）、Axcelis（Purion・Optima）装置向けESC修理及び新規製造を20ステップの標準プロセスで提供します。" },
    { q: "FOUPはどのサイズまで供給可能ですか？", a: "OHI TechはCK Plastics（中勤實業）を通じて2インチ〜12インチの全サイズのウェハーキャリアを供給します。300mm（12インチ）FOUPはSEMI E47.1完全準拠、OHT/AGV自動化システム対応。25スロット標準・13スロット薄型・6スロット超薄型まで全ラインアップを保有しています。" },
    { q: "Lam Research装置と互換性のあるESCタイプは何ですか？", a: "OHI TechはLam Research Kiyo（誘電体エッチング）、Flex（導体エッチング）、2300 Versys、TCP、Coronus装置と互換性のある静電チャック（ESC）を供給します。コーティングタイプ、プレートタイプの両方に対応。ESC修理・新規供給はOHI Techまでお問い合わせください。" },
    { q: "ウェハーカセットのカスタム製作は可能ですか？", a: "はい。CK Plasticsは非標準サイズ、特殊スロット構成、OEM生産に対応可能です。175mmなど非標準サイズ、6インチ→8インチ変換アダプターなどカスタム製作が可能です。OHI Techを通じて仕様協議の上、最小発注数量（MOQ）をご案内します。" },
  ],
};

const FAQ_EV: Record<Locale, Faq[]> = {
  ko: [
    { q: "RongXin EV 충전기의 한국 공급처는 어디인가요?", a: "OHI Tech가 RongXin New Energy의 한국 공급 파트너입니다. AC 완속 7~22kW, DC 급속 20~600kW, Split Power 480~2,560kW+를 SKD(부품) 공급 + 한국 현지 조립 방식으로 제공합니다. 플릿·물류·상업용 충전소 인프라 구축을 지원합니다." },
    { q: "RongXin 충전기의 최대 출력은 얼마인가요?", a: "RongXin DC 급속 충전기는 20kW부터 600kW까지, Split Power 시스템은 480kW부터 2,560kW+까지 대형 충전 파크용으로 확장됩니다. AC 충전기는 7/11/22kW를 제공합니다. OHI Tech가 SKD 공급 + 한국 현지 조립으로 공급하며, 사이트 평가와 제품 선정을 지원합니다." },
    { q: "플릿(Fleet) 충전소 구축에 적합한 모델은 무엇인가요?", a: "플릿·물류용으로는 Split Power 분산형(480~2,560kW+)과 DC 급속(200kW DUAL 이상)이 적합합니다. 다이나믹 전력 분배로 차량별 최적 출력을 할당해 계약 전력 초과 없이 다수 차량을 충전하며, CMS 연동으로 원격 관제가 가능합니다. OHI Tech에서 사이트 분석부터 설치·운영까지 지원합니다." },
  ],
  en: [
    { q: "Who is the Korean supplier of RongXin EV chargers?", a: "OHI Tech is the Korea supply partner for RongXin New Energy. We deliver AC chargers (7–22kW), DC fast chargers (20–600kW), and Split Power (480–2,560kW+) via SKD (component) supply plus local assembly in Korea, supporting fleet, logistics, and commercial charging-station infrastructure." },
    { q: "What is the maximum output power of RongXin chargers?", a: "RongXin DC fast chargers span 20kW to 600kW, and the Split Power system scales from 480kW to 2,560kW+ for mega charging parks. AC chargers offer 7/11/22kW. OHI Tech supplies these via SKD and local assembly in Korea — contact us for site assessment and product selection." },
    { q: "Which models suit fleet charging stations?", a: "For fleet and logistics use, the Split Power distributed system (480–2,560kW+) and DC fast chargers (200kW DUAL and above) are ideal. Dynamic power distribution allocates optimal output per vehicle to charge many vehicles without exceeding contracted power, with CMS integration for remote management. OHI Tech supports everything from site analysis to installation and operation." },
  ],
  zh: [
    { q: "RongXin电动车充电桩的韩国供应商是谁？", a: "OHI Tech是RongXin容新新能源的韩国供应伙伴。以SKD（部件）供应+韩国本地组装方式提供交流充电桩（7~22kW）、直流快充（20~600kW）、Split Power（480~2,560kW+），支持车队、物流及商业充电站基础设施建设。" },
    { q: "RongXin充电桩的最大输出功率是多少？", a: "RongXin直流快充覆盖20kW至600kW，Split Power系统可从480kW扩展至2,560kW+用于大型充电园区。交流充电桩提供7/11/22kW。OHI Tech以SKD供应+韩国本地组装方式供货，并支持选址评估与产品选型。" },
    { q: "哪些型号适合车队充电站建设？", a: "车队及物流用途推荐Split Power分布式（480~2,560kW+）与直流快充（200kW DUAL及以上）。动态功率分配为各车辆分配最优输出，在不超过合同电力的前提下为多台车辆充电，并通过CMS联动实现远程管理。OHI Tech提供从选址分析到安装运营的全程支持。" },
  ],
  ja: [
    { q: "RongXin EV充電器の韓国供給元はどこですか？", a: "OHI TechがRongXin New Energyの韓国供給パートナーです。AC普通充電7〜22kW、DC急速充電20〜600kW、Split Power 480〜2,560kW+をSKD（部品）供給＋韓国現地組立方式で提供します。フリート・物流・商用充電インフラの構築を支援します。" },
    { q: "RongXin充電器の最大出力はどのくらいですか？", a: "RongXin DC急速充電器は20kWから600kWまで、Split Powerシステムは480kWから2,560kW+まで大型充電パーク向けに拡張可能です。AC充電器は7/11/22kWを提供します。OHI TechがSKD供給＋韓国現地組立で供給し、サイト評価と製品選定を支援します。" },
    { q: "フリート（Fleet）充電インフラに適したモデルは何ですか？", a: "フリート・物流用途にはSplit Power分散型（480〜2,560kW+）とDC急速充電（200kW DUAL以上）が適しています。ダイナミック電力配分により車両ごとに最適な出力を割り当て、契約電力を超えずに多数の車両を充電でき、CMS連携により遠隔管理が可能です。OHI Techがサイト分析から設置・運用まで支援します。" },
  ],
};

const FAQ_TECO: Record<Locale, Faq[]> = {
  ko: [
    { q: "TECO 배전 부품의 한국 공급처는 어디인가요?", a: "OHI Tech가 대만 TECO Electric & Machinery(TWSE 1504, 1956년 설립)의 한국 공식 파트너입니다. AC 컨택터(CN/CU/TMC), 과부하 계전기(RHU/EOR), 회로 차단기(TMS/MCB/MCCB/ACB) 전 라인업과 드론 모터·UAV 파워트레인·ESC를 통합 공급합니다." },
    { q: "TECO 회로 차단기의 정격 범위는 어떻게 되나요?", a: "TECO 차단기는 모터 보호용 TMS-S 0.1~32A부터 미니어처 MCB(BM/BR 1~125A), 몰드 케이스 MCCB(TCB/TAX 16~800A), 그리고 공기 차단기 ACB(TAW/BAW/TBW 최대 6300A, DC 스위치 4000A)까지 풀 라인업을 제공합니다. CSA·UL·CE·CCC·RoHS 글로벌 인증 보유." },
    { q: "TECO 드론 모터의 출력 범위는 어떻게 되나요?", a: "TECO 경량 드론 모터는 330W(2317 KV800)부터 3802W(10010 KV110)까지 10개 모델을 제공합니다. 중형 UAV용 농업 파워트레인은 최대 150kg 페이로드, 76.5kg/rotor 추력, 12.9kW 피크 출력을 지원합니다. Halbach Array 설계와 일본산 베어링으로 최대 91.8% 효율을 달성합니다." },
    { q: "농업용 대형 드론에 적합한 TECO 모터는 무엇인가요?", a: "최대 150kg 페이로드까지 대응하는 Medium UAV Powertrain System(Drone 1)을 권장합니다. 76.5kg/rotor 추력, 12.9kW 피크 출력, CAN+PWM 제어를 지원하며, 5건의 특허(슬롯 내 공냉, 20g 충격 내구, 컨포멀 코팅, 염수 분무 내성, 안티 베어링 슬립)로 농업 환경에 검증됐습니다. 월 1,400대 이상 양산, 350대 이상 UAV에 탑재 운영 중입니다." },
    { q: "VFD(인버터)와 TECO 컨택터/차단기를 함께 사용할 수 있나요?", a: "네. TECO는 회로 차단기(TCB) → 컨택터(CU/CN) → VFD → 모터의 표준 구성을 권장하며, 단일 브랜드 통합 공급으로 호환성·인증·납기를 한 번에 해결합니다. 회생 제동과 가변속 제어로 평균 30% 에너지 절감 효과가 있습니다." },
    { q: "TECO EC 모터(ECM)란 무엇이고, 기존 AC 모터와 어떻게 다른가요?", a: "TECO EC 모터(ECM)는 BLAC PMSM(브러시리스 AC 영구자석 동기 모터) 방식으로, 기존 PSC(영구 분상 커패시터) 유도 모터 대비 최대 70% 소비 전력을 절감합니다. 스텝리스(무단) 속도 제어, Modbus/RS485 통신, 드라이버 일체형 구조로 공조(HVAC) 장비의 에너지 효율과 제어 편의성을 동시에 향상시킵니다. OHI Tech는 내전형(FCU·AHU용)·외전형(FFU·클린룸용)·드라이버 보드·통합 모듈 전 라인업을 공급합니다." },
    { q: "TECO ECM은 어떤 HVAC 용도를 지원하나요?", a: "TECO EC 모터는 세 가지 주요 HVAC 용도를 커버합니다 — 주거·상업용 FCU(팬 코일 유닛)는 내전형 D98/D125, 반도체 팹·클린룸용 FFU(팬 필터 유닛)는 외전형 OD102, 대형 상업 건물·병원·데이터센터용 AHU(공기 조화 유닛). OHI Tech는 완성 시스템 모듈(모터+블로워)과 OEM 통합용 개별 EC 모터 부품을 함께 공급합니다." },
  ],
  en: [
    { q: "Who is the Korean supplier of TECO power distribution components?", a: "OHI Tech is the official Korean partner of TECO Electric & Machinery (TWSE 1504, est. 1956). We supply the full lineup of AC contactors (CN/CU/TMC), overload relays (RHU/EOR), and circuit breakers (TMS/MCB/MCCB/ACB), together with drone motors, UAV powertrains, and ESCs." },
    { q: "What is the rated range of TECO circuit breakers?", a: "TECO breakers span from motor-protection TMS-S (0.1–32A) to miniature MCB (BM/BR 1–125A), molded-case MCCB (TCB/TAX 16–800A), and air circuit breakers ACB (TAW/BAW/TBW up to 6300A, 4000A DC switch). Certified to CSA, UL, CE, CCC, and RoHS." },
    { q: "What drone motor power range does TECO offer?", a: "TECO offers light drone motors from 330W (2317 KV800) to 3802W (10010 KV110) across 10 models. For medium UAVs, the agricultural powertrain supports up to 150kg payload with 76.5kg/rotor thrust and 12.9kW peak power. Halbach Array design and Japanese bearings achieve up to 91.8% efficiency." },
    { q: "Which TECO motor suits large agricultural drones?", a: "We recommend the Medium UAV Powertrain System (Drone 1), supporting up to 150kg payload with 76.5kg/rotor thrust, 12.9kW peak power, and CAN+PWM control. Five patents (in-slot air cooling, 20g shock durability, conformal coating, salt-spray resistance, anti-bearing-slip) make it proven for agricultural environments. Over 1,400 motors are produced monthly, fitted on 350+ UAVs in operation." },
    { q: "Can TECO contactors/breakers be used together with a VFD (inverter)?", a: "Yes. TECO recommends the standard configuration of circuit breaker (TCB) → contactor (CU/CN) → VFD → motor. Single-brand integrated supply resolves compatibility, certification, and lead time at once. Regenerative braking and variable-speed control deliver about 30% average energy savings." },
    { q: "What is a TECO EC motor (ECM), and how does it differ from a conventional AC motor?", a: "A TECO EC motor (ECM) uses BLAC PMSM (brushless AC permanent-magnet synchronous) technology, cutting power consumption by up to 70% versus a conventional PSC induction motor. Stepless speed control, Modbus/RS485 communication, and an integrated driver improve both energy efficiency and control convenience for HVAC equipment. OHI Tech supplies the full lineup: internal rotor (FCU/AHU), external rotor (FFU/cleanroom), driver boards, and integrated modules." },
    { q: "What HVAC applications does TECO ECM support?", a: "TECO EC motors cover three primary HVAC applications: FCU (Fan Coil Unit) for residential and commercial buildings using internal rotor D98/D125 models; FFU (Fan Filter Unit) for semiconductor fabs and cleanrooms using external rotor OD102; and AHU (Air Handling Unit) for large commercial buildings, hospitals, and data centers. OHI Tech supplies complete system modules (motor + blower assembly) and individual EC motor components for OEM integration." },
  ],
  zh: [
    { q: "TECO配电组件的韩国供应商是谁？", a: "OHI Tech是台湾TECO东元电机（TWSE 1504，1956年成立）的韩国官方合作伙伴。整合供应AC接触器（CN/CU/TMC）、过载继电器（RHU/EOR）、断路器（TMS/MCB/MCCB/ACB）全系列，以及无人机电机、UAV动力总成、ESC。" },
    { q: "TECO断路器的额定范围是多少？", a: "TECO断路器涵盖电机保护用TMS-S（0.1~32A）、微型MCB（BM/BR 1~125A）、塑壳MCCB（TCB/TAX 16~800A），以及空气断路器ACB（TAW/BAW/TBW最高6300A，DC开关4000A）。具备CSA·UL·CE·CCC·RoHS全球认证。" },
    { q: "TECO无人机电机的功率范围是多少？", a: "TECO轻型无人机电机提供从330W（2317 KV800）到3802W（10010 KV110）共10款。中型UAV农业动力总成支持最高150kg载荷、76.5kg/旋翼推力、12.9kW峰值功率。Halbach阵列设计与日本进口轴承实现最高91.8%效率。" },
    { q: "哪款TECO电机适合大型农业无人机？", a: "推荐支持最高150kg载荷的Medium UAV动力总成（Drone 1）。提供76.5kg/旋翼推力、12.9kW峰值功率、CAN+PWM控制，凭借5项专利（槽内风冷、20g抗冲击、保形涂层、耐盐雾、防轴承滑移）在农业环境中得到验证。月产1,400台以上，已搭载于350台以上UAV运行。" },
    { q: "TECO接触器/断路器可以与VFD（变频器）配合使用吗？", a: "可以。TECO推荐断路器（TCB）→接触器（CU/CN）→VFD→电机的标准配置。单一品牌整合供应一次性解决兼容性、认证与交期。再生制动与变速控制平均节能约30%。" },
    { q: "什么是TECO EC电机（ECM）？与传统AC电机有何不同？", a: "TECO EC电机（ECM）采用BLAC PMSM（无刷交流永磁同步电机）方式，相比传统PSC（永久分相电容）感应电机最多节省70%耗电。无级调速、Modbus/RS485通信、驱动一体化结构，同时提升HVAC设备的能效与控制便利性。OHI Tech供应内转子（FCU·AHU用）、外转子（FFU·洁净室用）、驱动板、集成模块全系列。" },
    { q: "TECO ECM支持哪些HVAC应用？", a: "TECO EC电机覆盖三大HVAC应用——住宅及商用FCU（风机盘管）使用内转子D98/D125；半导体厂及洁净室FFU（风扇过滤单元）使用外转子OD102；大型商用建筑、医院、数据中心AHU（空气处理单元）。OHI Tech供应完整系统模块（电机+风机）及供OEM集成的单体EC电机部件。" },
  ],
  ja: [
    { q: "TECO配電部品の韓国供給元はどこですか？", a: "OHI Techが台湾TECO Electric & Machinery（TWSE 1504、1956年設立）の韓国正規パートナーです。ACコンタクタ（CN/CU/TMC）、過負荷リレー（RHU/EOR）、回路遮断器（TMS/MCB/MCCB/ACB）の全ラインアップと、ドローンモーター・UAVパワートレイン・ESCを統合供給します。" },
    { q: "TECO回路遮断器の定格範囲はどのくらいですか？", a: "TECO遮断器はモーター保護用TMS-S 0.1〜32Aから、ミニチュアMCB（BM/BR 1〜125A）、モールドケースMCCB（TCB/TAX 16〜800A）、そして空気遮断器ACB（TAW/BAW/TBW 最大6300A、DCスイッチ4000A）まで全ラインアップを提供します。CSA・UL・CE・CCC・RoHSのグローバル認証を取得しています。" },
    { q: "TECOドローンモーターの出力範囲はどのくらいですか？", a: "TECO軽量ドローンモーターは330W（2317 KV800）から3802W（10010 KV110）まで10モデルを提供します。中型UAV向け農業用パワートレインは最大150kgペイロード、76.5kg/ローター推力、12.9kWピーク出力に対応します。Halbach Array設計と日本製ベアリングにより最大91.8%の効率を達成します。" },
    { q: "大型農業用ドローンに適したTECOモーターは何ですか？", a: "最大150kgペイロードに対応するMedium UAV Powertrain System（Drone 1）を推奨します。76.5kg/ローター推力、12.9kWピーク出力、CAN+PWM制御に対応し、5件の特許（スロット内空冷、20g衝撃耐久、コンフォーマルコーティング、塩水噴霧耐性、アンチベアリングスリップ）で農業環境において実証済みです。月産1,400台以上、350台以上のUAVに搭載され運用されています。" },
    { q: "VFD（インバーター）とTECOコンタクタ・遮断器を併用できますか？", a: "はい。TECOは回路遮断器（TCB）→コンタクタ（CU/CN）→VFD→モーターの標準構成を推奨しており、単一ブランドの統合供給により互換性・認証・納期を一度に解決します。回生ブレーキと可変速制御により平均30%の省エネ効果があります。" },
    { q: "TECO ECモーター（ECM）とは何で、従来のACモーターとどう違いますか？", a: "TECO ECモーター（ECM）はBLAC PMSM（ブラシレスAC永久磁石同期モーター）方式で、従来のPSC（永久分相コンデンサ）誘導モーターに比べ最大70%の消費電力を削減します。ステップレス（無段階）速度制御、Modbus/RS485通信、ドライバー一体型構造により、空調（HVAC）機器のエネルギー効率と制御の利便性を同時に向上させます。OHI Techは内転子（FCU・AHU用）・外転子（FFU・クリーンルーム用）・ドライバーボード・統合モジュールまで全ラインアップを供給します。" },
    { q: "TECO ECMはどのようなHVAC用途に対応していますか？", a: "TECO ECモーターは3つの主要HVAC用途をカバーします — 住宅・商業用FCU（ファンコイルユニット）は内転子D98/D125、半導体ファブ・クリーンルーム用FFU（ファンフィルターユニット）は外転子OD102、大型商業ビル・病院・データセンター用AHU（空気調和機）。OHI Techは完成システムモジュール（モーター+ブロワー）とOEM統合用の個別ECモーター部品の両方を供給します。" },
  ],
};

/* ── JSON-LD components ── */

export function LaserJsonLd({ locale }: { locale: Locale }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "OHI Tech",
        url: BASE_URL,
        description: "Korean authorized distributor of Hortech laser precision equipment",
        areaServed: ["KR", "CN", "SG", "JP", "TW"],
      },
      {
        "@type": "Product",
        name: "Waterjet Laser Machine HT-WG-LC",
        url: `${BASE_URL}/products/laser-equipment`,
        description:
          "Water-guided laser CNC machine with zero thermal effect. Precision ±3 µm, 200 µm microvia drilling. Processes SiC, diamond, sapphire, and hard metals.",
        brand: { "@type": "Brand", name: "Hortech" },
        manufacturer: {
          "@type": "Organization",
          name: "Hortech Co., Ltd.",
          address: { "@type": "PostalAddress", addressCountry: "TW", addressLocality: "Hsinchu" },
        },
        category: "Laser Precision Equipment",
        image: `${BASE_URL}/images/categories/laser.jpg`,
      },
      {
        "@type": "Product",
        name: "FPCB Laser Cutting Machine HT-LC-FPCB",
        url: `${BASE_URL}/products/laser-equipment`,
        description:
          "Cold laser cutting for flexible circuit boards (FPCB) with XY repeatability ±5 µm. Patented corner process for high-yield production.",
        brand: { "@type": "Brand", name: "Hortech" },
        manufacturer: { "@type": "Organization", name: "Hortech Co., Ltd." },
        category: "Laser Precision Equipment",
        image: `${BASE_URL}/images/categories/laser.jpg`,
      },
      {
        "@type": "Product",
        name: "Thick Film Laser Etching Machine HT-LE-TF",
        url: `${BASE_URL}/products/laser-equipment`,
        description:
          "Air-bearing precision stage (±2 µm) for circuit patterning on conductive silver/copper paste thick films. Beam spot 6–20 µm.",
        brand: { "@type": "Brand", name: "Hortech" },
        manufacturer: { "@type": "Organization", name: "Hortech Co., Ltd." },
        category: "Laser Precision Equipment",
        image: `${BASE_URL}/images/categories/laser.jpg`,
      },
      buildBreadcrumb(locale, "laser-equipment"),
      faqPage(FAQ_LASER[locale]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ThermalJsonLd({ locale }: { locale: Locale }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "OHI Tech",
        url: BASE_URL,
        description: "Korean authorized distributor of T-Global Technology thermal management solutions",
        areaServed: ["KR", "CN", "SG", "JP", "TW"],
      },
      {
        "@type": "Organization",
        "@id": "https://www.tglobalcorp.com/#organization",
        name: "T-Global Technology Co., Ltd.",
        url: "https://www.tglobalcorp.com",
        foundingDate: "1993",
        address: { "@type": "PostalAddress", addressCountry: "TW", addressLocality: "Taoyuan" },
        hasCredential: ["ISO 9001", "ISO 14001", "IECQ", "IATF 16949"],
        numberOfEmployees: { "@type": "QuantitativeValue", value: 500 },
      },
      {
        "@type": "Product",
        name: "Thermal Interface Material (TIM) — T-Global Gap Filler Pad",
        url: `${BASE_URL}/products/thermal-management`,
        description:
          "High-performance thermal pads with 1.0~17.8 W/m·K conductivity. Shore 00-15~65 hardness for gap filling. Applied in servers, AI accelerators, 5G base stations, EV batteries.",
        brand: { "@type": "Brand", name: "T-Global" },
        manufacturer: { "@type": "Organization", name: "T-Global Technology Co., Ltd." },
        category: "Thermal Interface Materials",
        image: `${BASE_URL}/images/categories/thermal.jpg`,
      },
      {
        "@type": "Product",
        name: "Vapor Chamber — T-Global Ultra-Thin",
        url: `${BASE_URL}/products/thermal-management`,
        description:
          "Ultra-thin vapor chambers (0.4mm+) and flat/3D configurations for GPU/CPU high-density thermal management. 50~100x higher heat transfer vs aluminum.",
        brand: { "@type": "Brand", name: "T-Global" },
        manufacturer: { "@type": "Organization", name: "T-Global Technology Co., Ltd." },
        category: "Vapor Chambers",
        image: `${BASE_URL}/images/categories/thermal.jpg`,
      },
      {
        "@type": "Product",
        name: "AlSiC Heat Spreader — CMC Composite",
        url: `${BASE_URL}/products/thermal-management`,
        description:
          "Metal matrix composite heat spreaders with low CTE for semiconductor power modules, aerospace, and military. Vibration resistance tested. IATF 16949 compliant.",
        brand: { "@type": "Brand", name: "T-Global" },
        manufacturer: { "@type": "Organization", name: "T-Global Technology Co., Ltd." },
        category: "AlSiC Composite Materials",
        image: `${BASE_URL}/images/categories/thermal.jpg`,
      },
      {
        "@type": "Product",
        name: "NMVC™ Non-Metal Vapor Chamber — Xerendipity",
        url: `${BASE_URL}/products/thermal-management`,
        description:
          "Next-generation non-metal vapor chamber by Xerendipity (XR), built on T-Global Technology. Kxy ~2500 W/m·K, Kz ~1 W/m·K. Doubling thickness yields 1.5–1.8× higher Qmax. Benchmark: NMVC 48°C vs copper VC 50.4°C (15×15mm, 1W, 25°C, natural convection). 80% lighter than copper VC, zero RF interference with 5G/6G, Wi-Fi, GPS.",
        brand: { "@type": "Brand", name: "Xerendipity" },
        manufacturer: { "@type": "Organization", name: "T-Global Technology Co., Ltd." },
        category: "Non-Metal Vapor Chamber",
        image: `${BASE_URL}/images/categories/thermal.jpg`,
        additionalProperty: [
          { "@type": "PropertyValue", name: "Kxy", value: "~2500 W/m·K" },
          { "@type": "PropertyValue", name: "Kz", value: "~1 W/m·K" },
          { "@type": "PropertyValue", name: "Thickness", value: "0.15~0.35mm" },
        ],
      },
      {
        "@type": "Product",
        name: "Vapor-Pad™ Hybrid Thermal Pad — Xerendipity",
        url: `${BASE_URL}/products/thermal-management`,
        description:
          "Hybrid thermal pad combining Z-axis conduction with X-Y vapor chamber heat spreading. Kxy 800~1200 W/m·K, Kz 15~25 W/m·K. Peak temperature 44% lower than conventional thermal pads (40.8°C vs 73.6°C). SGS certified. Silicone-free option available.",
        brand: { "@type": "Brand", name: "Xerendipity" },
        manufacturer: { "@type": "Organization", name: "T-Global Technology Co., Ltd." },
        category: "Hybrid Thermal Interface Material",
        image: `${BASE_URL}/images/categories/thermal.jpg`,
        additionalProperty: [
          { "@type": "PropertyValue", name: "Kxy", value: "800~1200 W/m·K" },
          { "@type": "PropertyValue", name: "Kz", value: "15~25 W/m·K" },
        ],
      },
      buildBreadcrumb(locale, "thermal-management"),
      faqPage(FAQ_THERMAL[locale]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SemiconductorJsonLd({ locale, faq }: { locale: Locale; faq?: Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "OHI Tech",
        url: BASE_URL,
        description: "Korean distributor of semiconductor equipment parts: ESC, wafer carriers, dry vacuum pumps",
        areaServed: ["KR", "CN", "SG", "JP", "TW"],
      },
      {
        "@type": "Product",
        name: "Electrostatic Chuck (ESC)",
        url: `${BASE_URL}/products/semiconductor-parts/esc`,
        description:
          "Semiconductor equipment ESC manufacturing and repair for Lam Research (Kiyo, Flex, Versys), Applied Materials (Centura, Vantage), TEL (Tactras, Trias), and Axcelis (Purion, Optima). Coating Type and Plate Type. 20-step standard repair process. Est. 2016.",
        manufacturer: {
          "@type": "Organization",
          name: "ESC Specialist Manufacturer",
          address: { "@type": "PostalAddress", addressCountry: "KR", addressLocality: "Hwaseong, Gyeonggi" },
          foundingDate: "2016",
        },
        category: "Semiconductor Equipment Parts",
        image: `${BASE_URL}/images/categories/semiconductor.jpg`,
      },
      {
        "@type": "Product",
        name: "Wafer Carrier (FOUP / Cassette) — CK Plastics",
        url: `${BASE_URL}/products/semiconductor-parts/wafer-carrier`,
        description:
          "Full lineup of 2\" to 12\" wafer carriers: FOUP (SEMI E47.1 compliant, OHT/AGV compatible), SMIF Pod, FOSB, Teflon/PFA/PP/Metal/PEEK cassettes, and IC/Reticle/Panel carriers. ISO 9001, SEMI E47.1, RoHS certified. SEMICON Taiwan/Japan/China official exhibitor. Est. 1992.",
        brand: { "@type": "Brand", name: "CK Plastics" },
        manufacturer: {
          "@type": "Organization",
          name: "CK Plastics (Chung King Enterprise Co., Ltd.)",
          address: { "@type": "PostalAddress", addressCountry: "TW", addressLocality: "Taoyuan" },
          foundingDate: "1992",
          hasCredential: ["ISO 9001", "SEMI E47.1", "SEMI M1", "SEMI E1", "RoHS"],
        },
        category: "Wafer Carriers",
        image: `${BASE_URL}/images/categories/semiconductor.jpg`,
      },
      // 노출 보류(2026-07): dry-vacuum-pump — 메뉴·사이트맵 미노출 + noindex 방침에 맞춰
      // Product JSON-LD에서도 제거. 구조화 데이터로만 구글에 노출되던 불일치를 해소한다.
      {
        "@type": "Service",
        serviceType: "Remote Plasma Source (RPS) Repair & Overhaul",
        name: "RPS Repair & Overhaul — MKS ASTRON / PARAGON / R*evolution",
        url: `${BASE_URL}/products/semiconductor-parts/rps-repair`,
        description:
          "Repair and overhaul of MKS remote plasma sources (RPS): ASTRON TM/2L, ASTRON-I/3L, ASTRON-EX/6L·8L, ASTRON-HF/15L·22L, RPS 30L, PARAGON (AX7700/AX7710), and R*evolution (R1/R3/R5). Root-cause diagnosis of AC LINE/DC BUS fail, Source Leak, Ignition Fault, and Particle Fail. A Certificate of Analysis (COA) service report with Leak, Anodizing Coating, Plasma, and Aging tests is provided after every repair.",
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: ["KR", "CN", "SG", "JP", "TW"],
        category: "Semiconductor Equipment Repair",
        image: `${BASE_URL}/images/categories/semiconductor.jpg`,
      },
      buildBreadcrumb(locale, "semiconductor-parts"),
      faqPage(faq ?? FAQ_SEMI[locale]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function EvJsonLd({ locale }: { locale: Locale }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "OHI Tech",
        url: BASE_URL,
        description: "Korea supply partner of RongXin New Energy EV chargers — SKD component supply and local assembly in Korea",
        areaServed: ["KR", "CN", "SG", "JP", "TW"],
      },
      {
        "@type": "Organization",
        "@id": "https://www.rongxiniot.com/#organization",
        name: "Zhengzhou Rongxin New Energy Technology Co., Ltd.",
        url: "https://www.rongxiniot.com",
        description: "EV charging manufacturer founded in 2019. ~10,000㎡ R&D and production, OEM/ODM, AC to DC fast and Split Power ultra-high-power charging.",
        hasCredential: ["CE", "IEC 61851", "ISO 15118", "DIN 70121", "OCPP 1.6J", "OCPP 2.0.1"],
      },
      {
        "@type": "Product",
        name: "RongXin DC Fast Charger — 20~600kW",
        url: `${BASE_URL}/products/ev-charging`,
        description:
          "DC fast charger spanning 20kW to 600kW with intelligent liquid cooling for continuous high-power operation at ≥95% efficiency. Multi-standard CCS1/CCS2/GB-T/NACS connectors. Supplied via SKD and assembled locally in Korea.",
        brand: { "@type": "Brand", name: "RongXin" },
        manufacturer: { "@type": "Organization", name: "Zhengzhou Rongxin New Energy Technology Co., Ltd." },
        category: "EV DC Fast Charger",
        image: `${BASE_URL}/images/products/ev/rongxin-dc-charger.png`,
        additionalProperty: [
          { "@type": "PropertyValue", name: "Power Range", value: "20~600kW" },
          { "@type": "PropertyValue", name: "Protocol", value: "OCPP 1.6J / 2.0.1" },
          { "@type": "PropertyValue", name: "Cooling", value: "Intelligent Liquid Cooling" },
        ],
      },
      {
        "@type": "Product",
        name: "RongXin Split Power Charging System — 480~2,560kW+",
        url: `${BASE_URL}/products/ev-charging`,
        description:
          "Split-architecture ultra-high-power system separating the power cabinet from multiple dispensers. Scalable from 480kW to 2,560kW+ with dynamic power distribution. Ideal for bus, truck, and taxi fleets and mega charging parks.",
        brand: { "@type": "Brand", name: "RongXin" },
        manufacturer: { "@type": "Organization", name: "Zhengzhou Rongxin New Energy Technology Co., Ltd." },
        category: "EV DC Fast Charger",
        image: `${BASE_URL}/images/products/ev/rongxin-split-power.png`,
      },
      {
        "@type": "Product",
        name: "RongXin AC Charger — 7 / 11 / 22kW",
        url: `${BASE_URL}/products/ev-charging`,
        description:
          "AC charger with 7kW, 11kW, and 22kW options. 7-inch touchscreen, APP and RFID authentication, IP55 weatherproofing, wall-mounted. OCPP 1.6 (upgradeable to 2.0.1), Korean CMS integration and Korean UI.",
        brand: { "@type": "Brand", name: "RongXin" },
        manufacturer: { "@type": "Organization", name: "Zhengzhou Rongxin New Energy Technology Co., Ltd." },
        category: "EV AC Charger",
        image: `${BASE_URL}/images/products/ev/rongxin-ac-charger.png`,
        additionalProperty: [
          { "@type": "PropertyValue", name: "Power", value: "7 / 11 / 22kW" },
          { "@type": "PropertyValue", name: "Protocol", value: "OCPP 1.6J / 2.0.1" },
          { "@type": "PropertyValue", name: "Protection", value: "IP55" },
        ],
      },
      buildBreadcrumb(locale, "ev-charging"),
      faqPage(FAQ_EV[locale]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TecoJsonLd({ locale }: { locale: Locale }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "OHI Tech",
        url: BASE_URL,
        description: "Korean official partner of TECO Electric & Machinery — power distribution, drone powertrain, and EC motor / HVAC solutions",
        areaServed: ["KR", "CN", "SG", "JP", "TW"],
      },
      {
        "@type": "Organization",
        "@id": "https://www.teco.com.tw/#organization",
        name: "TECO Electric & Machinery Co., Ltd.",
        url: "https://www.teco.com.tw",
        foundingDate: "1956",
        address: { "@type": "PostalAddress", addressCountry: "TW" },
        hasCredential: ["ISO 9001", "CSA", "UL", "CE", "CCC", "RoHS", "IEC 60947", "GB 14048"],
        numberOfEmployees: { "@type": "QuantitativeValue", value: 25000 },
      },
      {
        "@type": "Product",
        name: "TECO AC Contactor (CN/CU/TMC Series)",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "AC contactor for industrial automation. CN/CU series 6A~630A IEC standard, TMC-E light industrial 9A~38A, TMC-Z high-capacity 40A~800A. Supports AC1~AC4 load duty. CSA, UL, CE, CCC, RoHS certified.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "AC Contactor",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO Circuit Breaker (TMS / MCB / MCCB / ACB)",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Full-range circuit breakers from motor protection (TMS-S 0.1~32A) to ACB (TAW/BAW/TBW up to 6300A, 4000A DC switch). MCB BM/BR 1~125A, MCCB TCB/TAX/TAX-MJ 16~800A, TDS 63~800A, BOT 16~800A, VBT 630~4000A. Taiwan No.2 in low-voltage power distribution.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "Circuit Breaker",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO Overload Relay (RHU/RHN/EOR)",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Motor overload protection relays. Thermal RHU/RHN bimetallic 0.1~336A with phase-loss protection, and electronic EOR series 0.1~200A with precision trip characteristics.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "Overload Relay",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO Light Drone Motor Series",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "BLDC motors for commercial drones. 10 models from 2317 KV800 (330W) to 10010 KV110 (3802W). Halbach Array external rotor design with +25% torque density and up to 91.8% peak efficiency. Japanese-made bearings and 200°C heat-resistant electrical steel. Made in Taiwan.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "Drone Motor",
        image: `${BASE_URL}/images/logo-large.png`,
        additionalProperty: [
          { "@type": "PropertyValue", name: "Peak Efficiency", value: "91.8%" },
          { "@type": "PropertyValue", name: "Torque Density Boost", value: "+25%" },
          { "@type": "PropertyValue", name: "Heat Resistance", value: "200°C" },
        ],
      },
      {
        "@type": "Product",
        name: "TECO Medium UAV Powertrain (Agricultural)",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Mass-produced UAV powertrain for agricultural drones with up to 150kg payload. Drone 1: 76.5kg/rotor thrust, 12.9kW peak. Drone 2: 40kg/rotor thrust, 8.6kW peak. 5 patents (1 invention) including in-slot air cooling, 20g shock resistance, conformal coating, salt-spray resistance. 1,400+ motors shipped monthly with 350+ UAVs in operation.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "UAV Powertrain",
        image: `${BASE_URL}/images/logo-large.png`,
        additionalProperty: [
          { "@type": "PropertyValue", name: "Max Payload", value: "150kg" },
          { "@type": "PropertyValue", name: "Max Thrust", value: "76.5 kg/rotor" },
          { "@type": "PropertyValue", name: "Patents", value: "5" },
        ],
      },
      {
        "@type": "Product",
        name: "TECO LC-ESC Electronic Speed Controller",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Dedicated ESC for TECO drone motors. LC-ESC-20A-6S (4-6S LiPo, 20A rated), LC-ESC-40A-6S (40A rated), LC-ESC-40A-12S (8-12S LiPo, 40A rated). 95~98% drive efficiency with 30% higher volumetric density.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "Drone ESC",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO EC Motor — Internal Rotor (D98 / D125 BLAC PMSM)",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "High-efficiency brushless AC permanent magnet synchronous motor (BLAC PMSM) for HVAC applications. D98 (up to 150W) and D125 (up to 250W) models. Efficiency up to IE5 class. Integrated driver board, Modbus/RS485 communication, stepless speed control 10~100%. Up to 70% energy saving vs conventional PSC induction motors.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "EC Motor",
        image: `${BASE_URL}/images/logo-large.png`,
        additionalProperty: [
          { "@type": "PropertyValue", name: "Efficiency Class", value: "IE5" },
          { "@type": "PropertyValue", name: "Energy Saving", value: "Up to 70%" },
          { "@type": "PropertyValue", name: "Communication", value: "Modbus/RS485" },
        ],
      },
      {
        "@type": "Product",
        name: "TECO EC Motor — External Rotor (OD102 BLAC PMSM)",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "External rotor EC motor for fan filter units (FFU) and cleanroom applications. OD102 model. IP55 protection, THD-A < 10%, direct-drive centrifugal fan for minimal vibration and noise. ISO cleanroom class 1~8 compatible.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "EC Motor",
        image: `${BASE_URL}/images/logo-large.png`,
        additionalProperty: [
          { "@type": "PropertyValue", name: "Protection", value: "IP55" },
          { "@type": "PropertyValue", name: "THD-A", value: "< 10%" },
        ],
      },
      {
        "@type": "Product",
        name: "TECO EC Driver Board",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Dedicated driver board for TECO EC motors. Supports 0~10V analog, PWM, and Modbus/RS485 digital control. Integrated protection: over-current, over-temperature, phase-loss. Designed for OEM integration in FCU, AHU, and ventilation equipment.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "EC Motor Driver",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO ECM Integrated Module",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "All-in-one EC motor integrated module combining BLAC PMSM motor and driver in a single compact unit. Plug-and-play replacement for conventional AC motor assemblies. Reduces wiring complexity and simplifies OEM integration.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "EC Motor Module",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO FCU System Module (Fan Coil Unit)",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "EC motor-driven fan coil unit system for residential and commercial HVAC. TECO ECM (D98/D125) + centrifugal blower. Proven in SINKO Industries GSRC/GTCRH series — up to 70% power reduction vs PSC motors. Supports BMS/BEMS integration via Modbus.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "HVAC FCU System",
        image: `${BASE_URL}/images/logo-large.png`,
        additionalProperty: [
          { "@type": "PropertyValue", name: "Energy Saving", value: "Up to 70%" },
          { "@type": "PropertyValue", name: "Reference", value: "SINKO Industries Japan" },
        ],
      },
      {
        "@type": "Product",
        name: "TECO FFU System Module (Fan Filter Unit)",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "External rotor ECM + centrifugal fan for cleanroom fan filter units. Fits standard 2×4 and 4×4 FFU tile sizes. IP55, THD-A < 10%, ISO cleanroom class 1~8. Ideal for semiconductor fabs, biopharma, and LCD/OLED manufacturing.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "Cleanroom FFU System",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO AHU System Module (Air Handling Unit)",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Internal rotor ECM (D98/D125) + blower for large-scale air handling units. Optimized for commercial buildings, hospitals, and data centers. Supports variable air volume (VAV) control and BMS integration.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "HVAC AHU System",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO MV Inverter MV510 Series",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Medium-voltage inverter from 210kVA to 12,950kVA with Cell Bypass technology for uninterrupted operation. Optimized for large pumps, fans, compressors, and mine conveyors. Energy savings up to 40%, power factor above 0.95.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "Medium Voltage Inverter",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO LV Inverter A510s / E510s / E710 / F510 / L510s",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Low-voltage inverter series from 0.2kW to 600kW with IP20~IP66 protection. A510s (general-purpose VFD), E510s (compact, built-in EMC filter), E710 (EtherCAT/CANopen), F510 (pump/fan dedicated), L510s (single-phase compact).",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "Low Voltage Inverter / VFD",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO PMDD Permanent Magnet Direct Drive",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "IE5 ultra-premium efficiency permanent magnet direct drive system. Eliminates gearbox for zero transmission loss and reduced maintenance. Energy savings up to 40% for conveyors, pumps, mixers, and presses.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "Permanent Magnet Direct Drive",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO AC Servo JSDG3-E Series",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Latest-generation AC servo driver with EtherCAT/CANopen and 23-bit absolute encoder. Cutting precision ±0.02mm, up to 15kW. Ideal for semiconductor equipment, industrial robots, and CNC machines.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "AC Servo Driver",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO AC Servo JSDG2S Series",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Field-proven previous-generation AC servo driver with CANopen communication. Wide compatibility for maintaining and expanding existing automation systems. Full 0.1kW to 15kW lineup.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "AC Servo Driver",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO DC Servo AGV Dedicated",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "400W DC servo driver designed for AGV (Automated Guided Vehicles) and AMR (Autonomous Mobile Robots). High-response low-speed torque, compact form factor for logistics automation and warehouse robotics.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "DC Servo Driver",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO Stepping Motor 2-phase / 5-phase",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Precision positioning stepping motors in 2-phase and 5-phase configurations, NEMA 14~42 frame sizes. Open-loop control, low-speed high-torque for indexing tables, XY stages, and small CNC axes.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "Stepping Motor",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO PLC Programmable Logic Controller",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Industrial PLC with 200kHz high-speed counting, Modbus/EtherNet communication. Compact design, IEC 61131-3 programming standard. Integrates seamlessly with TECO servo, inverters, and HMI.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "PLC",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      {
        "@type": "Product",
        name: "TECO HMI Human-Machine Interface",
        url: `${BASE_URL}/products/power-distribution`,
        description:
          "Industrial HMI terminal with 4GB SD card and touchscreen (4.3\", 7\", 10\" sizes). Modbus/EtherNet connectivity for TECO PLC/inverter/servo integration. IP65 front panel protection.",
        brand: { "@type": "Brand", name: "TECO" },
        manufacturer: { "@type": "Organization", name: "TECO Electric & Machinery Co., Ltd." },
        category: "HMI",
        image: `${BASE_URL}/images/logo-large.png`,
      },
      buildBreadcrumb(locale, "power-distribution"),
      faqPage(FAQ_TECO[locale]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
