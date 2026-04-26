export interface Article {
  slug: string;
  category: "semiconductor-parts" | "laser-equipment" | "ev-charging" | "thermal-management";
  relatedProductPath: string;
  publishedAt: Date;
  updatedAt: Date;
  title: { ko: string; en: string; zh: string };
  description: { ko: string; en: string; zh: string };
  keywords: { ko: string[]; en: string[]; zh: string[] };
  body: { ko: string; en: string; zh: string };
}

export const articles: Article[] = [
  {
    slug: "laser-equipment",
    category: "laser-equipment",
    relatedProductPath: "laser-equipment",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "산업용 레이저 장비 완벽 가이드 — CO₂·파이버·UV 레이저 선택법",
      en: "Complete Guide to Industrial Laser Equipment — CO₂, Fiber & UV Laser Selection",
      zh: "工业激光设备完全指南 — CO₂、光纤与UV激光选型",
    },
    description: {
      ko: "CO₂, 파이버, UV 레이저의 원리와 산업별 적용 사례, 반도체·디스플레이·자동차 부품 가공에 최적화된 레이저 장비 선택 기준을 상세히 설명합니다.",
      en: "Principles of CO₂, fiber, and UV lasers with industrial application cases. Detailed selection criteria for semiconductor, display, and automotive parts processing.",
      zh: "详解CO₂、光纤、UV激光的原理与行业应用案例，重点介绍半导体、显示器及汽车零部件加工中的激光设备选型标准。",
    },
    keywords: {
      ko: ["레이저 장비", "산업용 레이저", "CO2 레이저", "파이버 레이저", "UV 레이저", "레이저 마킹", "레이저 용접", "레이저 절단", "반도체 레이저", "레이저 가공"],
      en: ["laser equipment", "industrial laser", "CO2 laser", "fiber laser", "UV laser", "laser marking", "laser welding", "laser cutting", "semiconductor laser"],
      zh: ["激光设备", "工业激光", "CO2激光", "光纤激光", "UV激光", "激光打标", "激光焊接", "激光切割", "半导体激光"],
    },
    body: {
      ko: `## 산업용 레이저 장비란?

레이저(LASER)는 Light Amplification by Stimulated Emission of Radiation의 약자로, 단일 파장의 집중된 광에너지를 이용해 소재를 절단·마킹·용접·식각하는 장비입니다. 반도체, 디스플레이, 자동차, 항공우주 등 첨단 제조업 전반에서 핵심 가공 수단으로 자리잡고 있습니다.

## 레이저 종류별 특성 비교

### CO₂ 레이저 (파장: 10.6μm)
CO₂ 레이저는 가스 방전 방식으로 동작하며, 비금속(목재, 아크릴, 고무, 직물) 및 두꺼운 금속 판재 절단에 강점을 보입니다. 출력 범위는 10W~20kW로 광범위하며, 비용 대비 효율이 높아 일반 산업 현장에서 가장 널리 사용됩니다.

**주요 적용 분야:**
- PCB(인쇄회로기판) 비아홀 드릴링
- 아크릴·플라스틱 정밀 절단
- 식품·의료기기 표면 마킹
- 태양광 패널 스크라이빙

### 파이버 레이저 (파장: 1.06μm)
파이버 레이저는 이터븀(Yb) 도핑된 광섬유를 매질로 사용합니다. 빔 품질(M²≈1.0)이 뛰어나 금속 가공에 최적화되어 있으며, 전기-광 변환 효율이 30~40%로 CO₂ 대비 3~4배 높습니다. 유지보수 주기가 길고 운영 비용이 낮아 고생산성 라인에 적합합니다.

**주요 적용 분야:**
- 스테인리스·알루미늄·구리 정밀 절단 및 용접
- 반도체 패키지 마킹 (DPM, QR코드)
- 자동차 배터리 셀 탭 용접
- 의료 기기 스텐트 절단

### UV 레이저 (파장: 355nm)
자외선 대역의 짧은 파장을 이용해 소재에 열 영향 없이(cold ablation) 가공하는 방식입니다. 초정밀 미세 가공이 필요한 반도체·디스플레이 공정에 필수적입니다.

**주요 적용 분야:**
- FPCB(연성 인쇄회로기판) 커팅
- 웨이퍼 다이싱 및 스크라이빙
- OLED/LCD 패널 수리
- 유리·세라믹 미세 홀 가공

## 레이저 장비 선택 시 핵심 체크리스트

| 항목 | 확인 내용 |
|------|----------|
| **가공 소재** | 금속/비금속, 두께, 반사율 |
| **정밀도 요구** | 스폿 크기, 열영향부(HAZ) 허용치 |
| **처리량(Throughput)** | 시간당 가공 면적 또는 개수 |
| **레이저 출력** | 평균 출력(W) vs 피크 출력(kW) |
| **빔 품질(M²)** | 초정밀 가공은 M²≤1.3 권장 |
| **냉각 방식** | 공냉/수냉, 설치 환경 제약 |
| **서비스 지원** | 국내 유지보수, 부품 공급 체계 |

## 반도체·디스플레이 공정에서의 레이저

반도체 전공정(Front-End)에서는 웨이퍼 마킹(Wafer ID Marking), 레이저 어닐링(Laser Annealing), 트림(Laser Trim) 등에 사용됩니다. 후공정(Back-End)에서는 웨이퍼 다이싱, 패키지 마킹, 리드 트리밍이 주요 응용입니다.

디스플레이 공정에서는 OLED 증착 마스크 제조, G/F 패턴 커팅, 패널 수리(Laser Repair) 등에서 UV 및 그린 레이저가 핵심적으로 활용됩니다.

## OHI Tech의 레이저 장비 공급 역량

OHI Tech는 글로벌 레이저 장비 제조사와의 파트너십을 통해 CO₂, 파이버, UV 레이저 장비 전 라인업을 공급합니다. 국내외 반도체·디스플레이·자동차 부품 제조사에 최적화된 장비 선정부터 설치, 유지보수까지 원스톱으로 지원합니다.

레이저 장비 도입을 검토하신다면, 가공 소재와 정밀도 요구사항을 먼저 정리하신 후 문의주시기 바랍니다.`,
      en: `## What Is Industrial Laser Equipment?

LASER (Light Amplification by Stimulated Emission of Radiation) equipment uses focused, single-wavelength light energy to cut, mark, weld, or ablate materials. It has become an essential processing tool across advanced manufacturing in semiconductors, displays, automotive, and aerospace.

## Comparison by Laser Type

### CO₂ Laser (Wavelength: 10.6μm)
CO₂ lasers operate via gas discharge and excel at cutting non-metals (wood, acrylic, rubber, textiles) and thick metal sheets. Output ranges from 10W to 20kW, offering high cost-efficiency for general industrial use.

**Key applications:** PCB via-hole drilling, precision plastic cutting, food/medical device marking, solar panel scribing.

### Fiber Laser (Wavelength: 1.06μm)
Fiber lasers use ytterbium (Yb)-doped optical fiber as the gain medium. Superior beam quality (M²≈1.0) makes them ideal for metal processing. Electrical-to-optical conversion efficiency of 30–40% is 3–4x higher than CO₂, with lower maintenance costs.

**Key applications:** Stainless steel/aluminum/copper precision cutting and welding, semiconductor package marking (DPM, QR codes), EV battery cell tab welding, medical stent cutting.

### UV Laser (Wavelength: 355nm)
Short ultraviolet wavelengths enable cold ablation — processing without thermal damage. Essential for ultra-precision semiconductor and display fabrication.

**Key applications:** FPCB cutting, wafer dicing and scribing, OLED/LCD panel repair, glass and ceramic micro-hole drilling.

## Key Selection Checklist

| Factor | What to Verify |
|--------|---------------|
| **Material** | Metal/non-metal, thickness, reflectivity |
| **Precision** | Spot size, allowable HAZ |
| **Throughput** | Area or count per hour |
| **Output Power** | Average (W) vs peak (kW) |
| **Beam Quality (M²)** | M²≤1.3 for ultra-precision |
| **Cooling** | Air vs water-cooled, environment |
| **Service Support** | Local maintenance, parts supply |

## OHI Tech Laser Equipment Supply

OHI Tech supplies full lineups of CO₂, fiber, and UV laser equipment through partnerships with global laser manufacturers. We provide end-to-end support from equipment selection to installation and maintenance for semiconductor, display, and automotive component manufacturers.`,
      zh: `## 什么是工业激光设备？

激光（LASER）设备利用集中的单波长光能对材料进行切割、打标、焊接或消融加工，已成为半导体、显示器、汽车和航空航天等先进制造业的核心加工手段。

## 激光类型对比

### CO₂激光（波长：10.6μm）
CO₂激光通过气体放电工作，擅长切割非金属（木材、亚克力、橡胶、织物）和厚金属板材，输出功率范围10W~20kW，性价比高，在一般工业现场应用最为广泛。

**主要应用：** PCB导通孔钻孔、精密塑料切割、食品/医疗器械表面打标、太阳能电池板划线。

### 光纤激光（波长：1.06μm）
光纤激光以掺镱（Yb）光纤为增益介质，光束质量优异（M²≈1.0），专为金属加工设计。电光转换效率30~40%，比CO₂高3~4倍，维护周期长，运营成本低。

**主要应用：** 不锈钢/铝/铜精密切割焊接、半导体封装打标（DPM、二维码）、新能源电池极耳焊接、医疗支架切割。

### UV激光（波长：355nm）
紫外短波长实现冷消融加工（无热影响），是半导体和显示器超精密加工的必备设备。

**主要应用：** FPCB切割、晶圆划片、OLED/LCD面板修复、玻璃陶瓷微孔加工。

## OHI Tech激光设备供应能力

OHI Tech通过与全球激光设备制造商的合作，提供CO₂、光纤、UV激光设备全系列，为半导体、显示器及汽车零部件制造商提供从选型到安装维护的一站式服务。`,
    },
  },
  {
    slug: "esc",
    category: "semiconductor-parts",
    relatedProductPath: "semiconductor-parts/esc",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "반도체 정전척(ESC) 완벽 가이드 — 원리·종류·선택 기준",
      en: "Complete Guide to Electrostatic Chucks (ESC) — Principles, Types & Selection",
      zh: "静电吸盘（ESC）完全指南 — 原理、种类与选型",
    },
    description: {
      ko: "반도체 식각·증착 공정의 핵심 부품인 정전척(ESC)의 동작 원리, 존슨-라벡형 vs 쿨롱형 비교, 주요 제조사(Kiyo, Flex, Versys) 제품 특성과 재생 수리 기준을 설명합니다.",
      en: "Everything about Electrostatic Chucks (ESC) — the critical component in semiconductor etch and deposition. Johnsen-Rahbek vs Coulomb type comparison, key manufacturers (Kiyo, Flex, Versys), and refurbishment criteria.",
      zh: "详解半导体刻蚀、沉积工艺核心部件静电吸盘（ESC）的工作原理、约翰森-拉贝克型与库仑型对比、主要制造商产品特性及翻新修复标准。",
    },
    keywords: {
      ko: ["정전척", "ESC", "electrostatic chuck", "반도체 ESC", "Kiyo ESC", "Flex ESC", "Versys ESC", "ESC 수리", "Lam Research ESC", "AMAT ESC", "TEL ESC"],
      en: ["electrostatic chuck", "ESC", "semiconductor ESC", "Kiyo ESC", "Flex ESC", "Versys ESC", "ESC repair", "Lam Research ESC", "AMAT ESC"],
      zh: ["静电吸盘", "ESC", "半导体ESC", "Kiyo ESC", "Flex ESC", "Versys ESC", "ESC维修", "Lam ESC", "AMAT ESC"],
    },
    body: {
      ko: `## 정전척(ESC)이란?

정전척(Electrostatic Chuck, ESC)은 반도체 식각(Etch) 및 CVD/PVD 증착 공정에서 웨이퍼를 정전기력으로 고정하는 핵심 부품입니다. 기존 진공 흡착 방식을 대체하여 RF 플라즈마 환경에서도 안정적인 웨이퍼 고정과 정밀한 온도 제어를 가능하게 합니다.

## ESC 동작 원리: 존슨-라벡형 vs 쿨롱형

### 존슨-라벡(Johnsen-Rahbek)형
반도체 특성을 갖는 세라믹(주로 AlN 또는 Al₂O₃)의 유전체 누설 전류를 이용해 흡착력을 발생시킵니다. 낮은 전압(200~600V)으로도 강한 흡착력을 얻을 수 있어 300mm 웨이퍼 공정에 주로 사용됩니다.

**특징:**
- 흡착력: 높음 (30~80 Torr 수준)
- 탈착 속도: 다소 느림 (잔류 전하 존재)
- 적용 장비: Lam Research Kiyo, Flex, Versys

### 쿨롱(Coulomb)형
절연성 세라믹을 이용한 순수 정전기력 방식입니다. 높은 전압(1~2kV)이 필요하지만 탈착이 빠르고 잔류 전하가 적어 민감한 소자 공정에 유리합니다.

**특징:**
- 흡착력: 중간
- 탈착 속도: 빠름
- 적용 장비: AMAT, TEL 일부 기종

## 주요 장비별 ESC 규격

| 장비 | ESC 타입 | 직경 | 특이사항 |
|------|---------|------|---------|
| Lam Kiyo | J-R형 | 300mm | 고밀도 플라즈마, 가스홀 패턴 다양 |
| Lam Flex | J-R형 | 300mm | 낮은 압력 식각, RF 인가 방식 |
| Lam Versys | J-R형 | 300mm | 소형 피처 식각, 고선택비 |
| AMAT Centura | Coulomb형 | 200/300mm | 다층 전극 구조 |
| TEL Trias | J-R형 | 300mm | 고온 공정용 AlN 기반 |

## ESC 재생(Refurbishment) 기준

ESC는 플라즈마 환경에서 지속적으로 소모되므로 일정 주기마다 재생 또는 교체가 필요합니다.

**재생 가능 판정 기준:**
- 표면 거칠기(Ra): 0.8μm 이하
- 절연 저항: 10⁹Ω 이상 (500V DC)
- 흡착력 측정: 규격 대비 80% 이상
- 파티클 발생: 클래스 규격 이내
- 균열/칩핑: 없음

**교체 필요 기준:**
- 세라믹 표면 균열 또는 스폴링
- 가스홀 막힘 (20% 이상)
- 흡착력 50% 미만으로 저하

## OHI Tech ESC 공급 및 수리 서비스

OHI Tech는 Lam Research(Kiyo, Flex, Versys), AMAT, TEL 등 주요 장비용 ESC 신품 공급과 재생 수리 서비스를 제공합니다. 재생 ESC는 신품 대비 40~60% 비용으로 동일한 성능을 구현하며, 품질 보증서와 함께 공급됩니다.`,
      en: "",
      zh: "",
    },
  },
  {
    slug: "wafer-carrier",
    category: "semiconductor-parts",
    relatedProductPath: "semiconductor-parts/wafer-carrier",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "웨이퍼 캐리어 & FOUP 완벽 가이드 — 300mm 웨이퍼 이송 장비 선택법",
      en: "Complete Guide to Wafer Carriers & FOUPs — 300mm Wafer Transport Selection",
      zh: "晶圆载体与FOUP完全指南 — 300mm晶圆传输设备选型",
    },
    description: {
      ko: "FOUP, FOSB, SMIF Pod, PFA 카세트 등 웨이퍼 캐리어의 종류와 특성, 300mm 반도체 공정에 최적화된 선택 기준 및 CK Plastics 제품 라인업을 소개합니다.",
      en: "Types and characteristics of wafer carriers including FOUP, FOSB, SMIF Pod, and PFA cassettes. Selection criteria optimized for 300mm semiconductor processes and CK Plastics product lineup.",
      zh: "介绍FOUP、FOSB、SMIF Pod、PFA卡匣等晶圆载体的种类与特性，以及适用于300mm半导体工艺的选型标准和CK Plastics产品系列。",
    },
    keywords: {
      ko: ["웨이퍼 캐리어", "FOUP", "FOSB", "SMIF pod", "PFA 카세트", "300mm FOUP", "웨이퍼 카세트", "CK Plastics", "반도체 이송 장비"],
      en: ["wafer carrier", "FOUP", "FOSB", "SMIF pod", "PFA cassette", "300mm FOUP", "wafer cassette", "CK Plastics"],
      zh: ["晶圆载体", "FOUP", "FOSB", "SMIF Pod", "PFA卡匣", "300mm FOUP", "晶圆盒", "CK Plastics"],
    },
    body: {
      ko: `## 웨이퍼 캐리어란?

웨이퍼 캐리어는 반도체 제조 공정에서 웨이퍼를 오염 없이 안전하게 이송·보관하기 위한 용기입니다. 파티클·습기·정전기로부터 웨이퍼를 보호하며, SEMI 표준에 따라 설계됩니다.

## 주요 웨이퍼 캐리어 종류

### FOUP (Front Opening Unified Pod)
300mm 웨이퍼 전용 밀폐형 캐리어로, EFEM(Equipment Front End Module)을 통해 장비에 도킹됩니다. 최대 25장의 웨이퍼를 수납하며 내부 질소 퍼지 기능으로 산화 방지가 가능합니다.

**규격:** SEMI E47.1 준수 / 외형: 약 400×340×380mm / 재질: PC+ABS 복합재

### FOSB (Front Opening Shipping Box)
FOUP과 유사한 구조이나 장거리 운송용으로 설계된 캐리어입니다. 충격 흡수 패드와 강화된 잠금 구조를 갖추고 있으며 해외 팹 간 웨이퍼 이송에 사용됩니다.

### SMIF Pod (Standard Mechanical Interface)
200mm 웨이퍼 시대의 표준 캐리어입니다. 하단 도어 방식으로 장비와 인터페이스하며, 300mm 전환 이후에도 레거시 장비 라인에서 사용됩니다.

### PFA 카세트 (Open Cassette)
불소수지(PFA) 재질의 오픈 카세트로, 습식 세정(Wet Clean) 공정에서 주로 사용됩니다. 화학약품 내성이 뛰어나며 HF, H₂SO₄ 등 강산·강염기 환경에서도 안정적입니다.

## 소재별 특성 비교

| 소재 | 화학 내성 | 파티클 | 정전기 | 주요 용도 |
|------|---------|--------|--------|---------|
| PC (폴리카보네이트) | 중간 | 낮음 | 대전 가능 | 표준 FOUP |
| PEEK | 높음 | 낮음 | 낮음 | 고온 공정 |
| PFA | 매우 높음 | 낮음 | 낮음 | 습식 세정 |
| ESD PC | 중간 | 낮음 | 방전 처리 | 정전기 민감 공정 |

## 300mm FOUP 선택 시 체크포인트

1. **도어 타입**: 로봇 암 호환 여부 (Entegris, Shin-Etsu, CK Plastics 호환)
2. **퍼지 포트**: N₂ 퍼지 지원 여부 (산화 방지)
3. **보트 핀 간격**: 공정 장비와의 슬롯 간격 호환
4. **RFID 태그**: 웨이퍼 추적 시스템 연동
5. **세정 주기**: 수명 및 재사용 횟수

## OHI Tech 웨이퍼 캐리어 공급

OHI Tech는 CK Plastics(한국) 공식 파트너로서 FOUP, FOSB, 오픈 카세트 전 제품 라인을 공급합니다. 국내 주요 팹에 검증된 제품으로, 긴급 공급 및 소량 주문도 가능합니다.`,
      en: "",
      zh: "",
    },
  },
  {
    slug: "dry-vacuum-pump",
    category: "semiconductor-parts",
    relatedProductPath: "semiconductor-parts/dry-vacuum-pump",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "반도체 드라이 진공펌프 완벽 가이드 — 공정별 선택 기준과 유지보수",
      en: "Complete Guide to Dry Vacuum Pumps for Semiconductors — Selection & Maintenance",
      zh: "半导体干式真空泵完全指南 — 工艺选型与维护",
    },
    description: {
      ko: "반도체 식각·CVD·이온주입 공정에 사용되는 드라이 진공펌프의 종류(스크류, 클로우, 루츠), 공정별 선택 기준, 오일 오염 방지 및 유지보수 포인트를 설명합니다.",
      en: "Types of dry vacuum pumps (screw, claw, Roots) used in semiconductor etch, CVD, and ion implant processes. Process-specific selection criteria, oil-free operation, and maintenance guidance.",
      zh: "详解用于半导体刻蚀、CVD、离子注入工艺的干式真空泵种类（螺杆、爪式、罗茨），工艺选型标准、无油运行原理及维护要点。",
    },
    keywords: {
      ko: ["드라이 진공펌프", "반도체 진공펌프", "스크류 진공펌프", "클로우 진공펌프", "루츠 진공펌프", "식각 진공펌프", "CVD 진공펌프", "이온주입 진공펌프", "디스플레이 진공펌프"],
      en: ["dry vacuum pump", "semiconductor vacuum pump", "screw vacuum pump", "claw vacuum pump", "Roots pump", "etch vacuum pump", "CVD vacuum pump"],
      zh: ["干式真空泵", "半导体真空泵", "螺杆真空泵", "爪式真空泵", "罗茨泵", "刻蚀真空泵", "CVD真空泵"],
    },
    body: {
      ko: `## 드라이 진공펌프란?

드라이 진공펌프(Dry Vacuum Pump)는 오일 없이 작동하는 진공 펌프로, 반도체 공정에서 공정 가스와 부산물을 배기하는 핵심 장비입니다. 오일 역류로 인한 웨이퍼 오염이 없어 클린룸 환경에 최적화되어 있습니다.

## 드라이 진공펌프 종류

### 스크류(Screw)형
두 개의 나선형 스크류 로터가 맞물려 회전하면서 가스를 압축·배기합니다. 부식성 가스 내성이 높고 파티클 발생이 적어 CVD, ALD 공정에 주로 사용됩니다.

### 클로우(Claw)형
갈고리 모양의 두 로터가 비접촉으로 회전합니다. 고속 배기에 적합하며 구조가 단순해 유지보수가 용이합니다. 식각(Etch) 공정의 메인 펌프로 널리 쓰입니다.

### 루츠(Roots/Booster)형
두 개의 8자형 로터가 빠르게 회전하여 대용량 가스를 처리합니다. 단독 사용보다 스크류/클로우 펌프와 부스터로 조합하여 도달 진공도를 높입니다.

## 공정별 드라이 진공펌프 선택 가이드

| 공정 | 권장 타입 | 이유 |
|------|---------|------|
| 식각(Etch) | 클로우 + 루츠 | 고속 배기, 부식성 가스 대응 |
| CVD/PECVD | 스크류 | 파우더 처리, 고온 내성 |
| 이온주입(Implant) | 스크류 | 초고진공 근접, 청정 배기 |
| 스퍼터링(PVD) | 클로우 | 금속 증기 처리 |
| ALD | 스크류 | 펄스 가스 대응, 저진공 제어 |

## 주요 유지보수 포인트

**1. 가스 세정(Purge) 관리**
공정 부산물이 펌프 내부에 고착되는 것을 방지하기 위해 N₂ 퍼지를 주기적으로 실시합니다. 퍼지 유량 및 타이밍은 공정 레시피와 연동합니다.

**2. 온도 모니터링**
펌프 본체 온도가 70°C 이상 지속되면 내부 코팅 손상 및 시일 열화가 가속됩니다. 냉각수 유량과 온도를 주기적으로 점검합니다.

**3. 오버홀(Overhaul) 주기**
일반적으로 연간 1회 또는 20,000~30,000시간마다 오버홀을 실시합니다. 로터 코팅 상태, 베어링 마모, 시일 교체가 핵심 점검 항목입니다.

## OHI Tech 드라이 진공펌프 공급 및 재생

OHI Tech는 Edwards, Pfeiffer, Ebara 등 주요 브랜드의 드라이 진공펌프 신품 공급과 오버홀 서비스를 제공합니다. 공정별 최적 사양 선정부터 PM(예방 정비) 프로그램 운영까지 지원합니다.`,
      en: "",
      zh: "",
    },
  },
  {
    slug: "oring",
    category: "semiconductor-parts",
    relatedProductPath: "semiconductor-parts/oring",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "반도체 O-ring 소재 완벽 가이드 — 불소계 vs 불화탄소계 비교",
      en: "Complete Guide to Semiconductor O-Ring Materials — Fluoroelastomer vs Perfluoroelastomer",
      zh: "半导体O形圈材料完全指南 — 氟橡胶与全氟橡胶对比",
    },
    description: {
      ko: "반도체 공정용 O-ring 소재(Viton, Kalrez, Chemraz)의 화학 내성·내열성·플라즈마 내성 비교, 식각·CVD·이온주입 공정별 최적 소재 선택 기준을 설명합니다.",
      en: "Comparison of semiconductor O-ring materials (Viton, Kalrez, Chemraz) on chemical resistance, heat resistance, and plasma resistance. Selection criteria by etch, CVD, and ion implant process.",
      zh: "比较半导体工艺用O形圈材料（Viton、Kalrez、Chemraz）的化学耐性、耐热性与耐等离子体性，介绍刻蚀、CVD、离子注入各工艺的最优材料选型标准。",
    },
    keywords: {
      ko: ["O-ring", "반도체 오링", "Viton", "Kalrez", "Chemraz", "불소 오링", "퍼플루오로 오링", "플라즈마 내성 오링", "식각 오링", "CVD 오링"],
      en: ["O-ring", "semiconductor O-ring", "Viton", "Kalrez", "Chemraz", "fluoroelastomer", "perfluoroelastomer", "plasma resistant O-ring"],
      zh: ["O形圈", "半导体O形圈", "Viton", "Kalrez", "Chemraz", "氟橡胶", "全氟橡胶", "耐等离子体O形圈"],
    },
    body: {
      ko: `## 반도체 공정용 O-ring의 중요성

O-ring은 반도체 장비의 챔버, 게이트 밸브, 배기 라인 등에서 진공 씰링을 담당하는 핵심 소모품입니다. 부적절한 소재 선택은 파티클 발생, 가스 누설, 챔버 오염으로 이어져 수율 저하와 장비 다운타임을 초래합니다.

## 주요 소재별 특성 비교

### Viton® (FKM — 불화탄소 고무)
- **구성**: 비닐리덴 플루오라이드(VF₂) + 헥사플루오로프로필렌(HFP) 공중합체
- **내열성**: -20°C ~ 200°C
- **화학 내성**: 탄화수소, 산, 오일에 강함 / 강염기·케톤·에스테르에 약함
- **플라즈마 내성**: 중간
- **적용**: 저온 CVD, 스퍼터링, 일반 진공 씰링
- **가격**: ★☆☆ (저가)

### Kalrez® (FFKM — 퍼플루오로 탄성체, DuPont)
- **구성**: PTFE와 유사한 완전 불소화 주쇄
- **내열성**: -20°C ~ 327°C
- **화학 내성**: 거의 모든 화학약품에 내성
- **플라즈마 내성**: 매우 높음
- **적용**: 고온 플라즈마 식각, ALD, 고부식성 가스 공정
- **가격**: ★★★ (고가)

### Chemraz® (FFKM, Greene Tweed)
- Kalrez와 유사한 퍼플루오로 소재이나 그레이드별 특성이 상이
- 일부 그레이드는 고온·고압 환경에서 Kalrez 대비 우수한 압축 영구 변형률(Compression Set) 제공
- 가격은 Kalrez와 유사하거나 소폭 낮음

## 공정별 권장 O-ring 소재

| 공정 | 온도 | 가스 환경 | 권장 소재 |
|------|------|---------|---------|
| 플라즈마 식각 (CCP) | 80~150°C | Cl₂, HBr, CF₄ | Kalrez, Chemraz |
| 플라즈마 식각 (ICP) | 150~250°C | SF₆, NF₃ | Kalrez 6375 이상 |
| PECVD | 200~400°C | SiH₄, NH₃ | Kalrez 6221 |
| 이온주입 | 상온~100°C | BF₃, AsH₃ | Kalrez |
| 스퍼터링 (PVD) | 100~200°C | Ar, N₂ | Viton, Kalrez |
| ALD | 200~350°C | TMA, H₂O | Kalrez 6375 |

## O-ring 교체 주기 및 관리 팁

- **정기 교체**: PM 주기(보통 분기 1회)에 맞춰 예방 교체
- **보관 환경**: 직사광선·오존·열원 차단, 18~25°C 건냉암소
- **취급 주의**: 과도한 변형 금지 (25% 이하 압축률 권장)
- **치수 확인**: ID(내경), OD(외경), 단면 직경(CS) 3가지 필수 확인

## OHI Tech O-ring 공급

OHI Tech는 Viton, Kalrez, Chemraz 전 그레이드 O-ring을 공급합니다. 기존 사용 중인 O-ring의 소재 분석 및 대체 소재 추천 서비스도 제공하며, 긴급 공급 및 소량 주문에 대응합니다.`,
      en: "",
      zh: "",
    },
  },
  {
    slug: "thermal-management",
    category: "thermal-management",
    relatedProductPath: "thermal-management",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "첨단 열관리 솔루션 가이드 — AI 서버·전기차·반도체 방열 소재 선택법",
      en: "Advanced Thermal Management Solutions Guide — Heat Dissipation Materials for AI Servers, EVs & Semiconductors",
      zh: "先进热管理解决方案指南 — AI服务器、电动汽车与半导体散热材料选型",
    },
    description: {
      ko: "TIM(열계면소재), 베이퍼챔버, 히트파이프, 열전도 테이프의 특성과 AI 서버·EV 배터리·반도체 패키지별 최적 열관리 소재 선택 기준을 설명합니다.",
      en: "Characteristics of TIM (Thermal Interface Materials), vapor chambers, heat pipes, and thermal conductive tapes. Selection criteria for AI server, EV battery, and semiconductor package thermal management.",
      zh: "详解TIM（热界面材料）、均热板、热管、导热胶带的特性，以及AI服务器、电动汽车电池和半导体封装的最优热管理材料选型标准。",
    },
    keywords: {
      ko: ["열관리", "TIM", "열계면소재", "베이퍼챔버", "히트파이프", "열전도 패드", "AI 서버 방열", "EV 배터리 방열", "반도체 방열", "T-Global"],
      en: ["thermal management", "TIM", "thermal interface material", "vapor chamber", "heat pipe", "thermal pad", "AI server cooling", "EV battery thermal"],
      zh: ["热管理", "TIM", "热界面材料", "均热板", "热管", "导热垫", "AI服务器散热", "电动汽车电池散热", "半导体散热"],
    },
    body: {
      ko: `## 왜 열관리가 중요한가?

반도체 집적도 증가(2nm 공정), AI 서버 전력 밀도 상승(GPU당 700W+), EV 배터리 고속 충전(350kW 이상)으로 인해 효과적인 방열 설계는 시스템 성능과 수명을 결정하는 핵심 요소가 되었습니다. 접합부 온도(Tj)가 10°C 상승할 때마다 반도체 소자의 수명은 절반으로 줄어든다는 것이 업계 통설입니다.

## 열관리 소재별 특성

### TIM (Thermal Interface Material, 열계면소재)
방열 소자와 방열판(히트싱크) 사이의 미세 공기층을 채워 열저항을 낮추는 소재입니다.

| TIM 타입 | 열전도율 | 두께 | 주요 용도 |
|---------|---------|------|---------|
| 그리스(Grease) | 4~10 W/m·K | 0.1~0.3mm | CPU/GPU |
| 위상변화소재(PCM) | 3~6 W/m·K | 0.1~0.2mm | 소형 패키지 |
| 열전도 패드(Pad) | 3~15 W/m·K | 0.2~3mm | 전력 소자, EV |
| 열전도 테이프 | 1~3 W/m·K | 0.1~0.25mm | LED, 전원 모듈 |
| 인듐 포일(Foil) | 70~80 W/m·K | 0.1~0.5mm | 고출력 반도체 |

### 베이퍼챔버 (Vapor Chamber, 균열판)
액체 작동유체의 증발-응축 사이클로 열을 2D 평면으로 균일 분산합니다. 스마트폰, 고성능 게이밍 PC, AI 엣지 서버에 사용되며 히트파이프 대비 넓은 면적의 열을 처리합니다.

**T-Global NMVC™** (Non-Metal Vapor Chamber): 비금속 소재로 절연성을 확보하면서 베이퍼챔버 수준의 열전도율(Kxy≈2500 W/m·K)을 구현한 혁신 소재입니다.

### 히트파이프 (Heat Pipe)
밀봉된 관 내부의 작동 유체(물, 에탄올, 암모니아) 상변화를 이용해 일방향 열 수송합니다. 구조가 단순하고 신뢰성이 높아 노트북, 서버 쿨러에 광범위하게 사용됩니다.

## AI 서버 열관리 요구사항

NVIDIA H100/H200 GPU 단일 카드 TDP는 700W에 달합니다. 랙당 50kW+ 발열을 처리하기 위해 직접 액냉(Direct Liquid Cooling)과 고성능 TIM의 조합이 필수입니다.

**권장 솔루션:**
- TIM: 열전도율 10 W/m·K 이상 그리스 또는 인듐 포일
- 냉각판: 구리 마이크로채널 또는 베이퍼챔버
- 랙 수준: CDU(Coolant Distribution Unit) + 직접 액냉

## EV 배터리 열관리

리튬이온 배터리 최적 작동 온도는 20~40°C입니다. 350kW 급속 충전 시 셀 발열이 급격히 증가하므로 셀 간 TIM 패드와 냉각 플레이트 설계가 핵심입니다.

**주요 소재:** 압축성 열전도 패드 (2~6 W/m·K), 상변화소재(PCM), 열전도 에폭시

## OHI Tech 열관리 솔루션

OHI Tech는 T-Global(대만)의 한국 공식 파트너로서 TIM 패드, 베이퍼챔버, 히트파이프, NMVC™, Vapor-Pad™ 등 전 제품 라인을 공급합니다. AI 서버, EV 배터리, 반도체 패키지에 최적화된 소재 선정 컨설팅을 제공합니다.`,
      en: "",
      zh: "",
    },
  },
  {
    slug: "ev-charging",
    category: "ev-charging",
    relatedProductPath: "ev-charging",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "산업용 EV 충전 인프라 완벽 가이드 — 물류창고·공장·주차장 충전 솔루션",
      en: "Complete Guide to Industrial EV Charging Infrastructure — Warehouse, Factory & Parking Solutions",
      zh: "工业EV充电基础设施完全指南 — 物流仓库、工厂与停车场充电解决方案",
    },
    description: {
      ko: "물류창고, 공장, 상업용 주차장에 최적화된 산업용 EV 충전 인프라 구축 가이드. AC 완속 충전기부터 350kW DC 급속 충전기까지 B2B 사업장 도입 비용, 전기차 충전 사업 모델을 설명합니다.",
      en: "B2B industrial EV charging infrastructure guide for warehouses, factories, and commercial parking facilities. AC Level 2 to 350kW DC fast charging, installation costs, and business models.",
      zh: "面向物流仓库、工厂、商业停车场的产业用EV充电基础设施建设指南，涵盖AC慢充至350kW DC超快充、B2B场所导入成费及充电业务模型。",
    },
    keywords: {
      ko: ["EV 충전기", "산업용 충전기", "상업용 EV 충전", "DC 급속 충전기", "AC 완속 충전기", "충전소 구축", "B2B EV 충전", "물류창고 충전", "전기차 충전 사업"],
      en: ["EV charger", "industrial EV charging", "commercial EV charging", "DC fast charger", "AC Level 2", "charging station installation", "B2B EV charging"],
      zh: ["EV充电桩", "工业充电站", "商业EV充电", "DC快充", "AC慢充", "充电站建设", "B2B充电", "物流园区充电"],
    },
    body: {
      ko: `## 산업용 EV 충전 인프라란?

B2B 사업장(물류창고, 공장, 상업용 주차장)을 위한 EV 충전 인프라는 일반 주거용 충전과 달리 대용량 전력 공급, 다수 차량 동시 충전, 과금 관리 시스템이 핵심입니다.

## 충전기 타입별 비교

| 타입 | 출력 | 충전 시간(50kWh) | 적용 사례 |
|------|------|---------------|---------|
| AC 완속 (Level 1) | 3~7kW | 7~17시간 | 야간 주차, 직원 전용 |
| AC 완속 (Level 2) | 7~22kW | 2~7시간 | 사무용 건물, 쇼핑몰 |
| DC 급속 | 50~150kW | 20~60분 | 물류센터, 고속도로 휴게소 |
| DC 초급속 | 150~350kW | 10~20분 | 트럭 터미널, 플릿 운영 |

## 산업용 사업장 유형별 충전 전략

### 물류창고·배송센터
전기 트럭·포크리프트 운영 사업장에서 핵심 과제는 **교대 근무 간 배터리 완충**입니다. 150~350kW 급속 충전기를 설치해 4~6시간 교대 시간 내 완충을 목표로 합니다.

**권장 구성:**
- 대형 트럭(배터리 300kWh+): DC 350kW × 2~4기
- 소형 배송 차량: DC 50kW × 4~8기
- 전기 지게차: AC 22kW × 필요 수량

### 공장·제조업체
생산 라인 인근 주차장에 종업원 전기차 충전 인프라를 구축하면 복리후생 강화와 탄소 중립 목표 달성을 동시에 이룰 수 있습니다.

**권장 구성:**
- 주차 공간의 20~30%에 AC 7~22kW 충전기
- 임원·방문객 전용 DC 50kW 1~2기

### 상업용 주차장
주차 시간 중 충전 요금으로 추가 수익을 창출하는 비즈니스 모델입니다. 지역 전기차 보급률과 평균 주차 시간을 분석해 AC/DC 비율을 결정합니다.

## 산업용 EV 충전 인프라 구축 비용

| 항목 | 비용 범위 |
|------|---------|
| AC 7kW 충전기 (1기) | 100~300만원 |
| DC 50kW 충전기 (1기) | 1,500~3,000만원 |
| DC 150kW 이상 (1기) | 4,000~8,000만원 |
| 전기 공사 (계약전력 증설) | 500~5,000만원 (현장 조건에 따라 상이) |
| 과금 관리 시스템(OCPP) | 100~500만원/년 |

## 정부 보조금 및 인센티브

2026년 기준 환경부 전기차 충전 인프라 보조금은 완속 충전기 기당 최대 400만원, 급속 충전기 기당 최대 5,000만원까지 지원됩니다. 사업장 규모와 설치 조건에 따라 세부 기준이 다르므로 사전 확인이 필요합니다.

## OHI Tech EV 충전 솔루션

OHI Tech는 산업용·상업용 사업장을 위한 EV 충전기 공급부터 시공, OCPP 기반 통합 관리 시스템까지 원스톱으로 제공합니다. B2B 충전 인프라 구축 경험을 바탕으로 최적의 설치 계획과 투자 회수 분석을 지원합니다.`,
      en: "",
      zh: "",
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticleBody(article: Article, locale: string): string {
  const body = article.body[locale as keyof typeof article.body];
  return body || article.body.ko;
}
