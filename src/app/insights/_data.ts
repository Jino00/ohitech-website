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
      ko: "CO₂·파이버·UV 레이저 차이점 — 반도체·디스플레이 공정 적용 전 꼭 확인할 선택 기준",
      en: "CO₂ vs Fiber vs UV Laser — Selection Criteria for Semiconductor & Display Process Applications",
      zh: "CO₂·光纤·UV激光区别 — 半导体与显示器工艺选型前必确认的标准",
    },
    description: {
      ko: "OHI Tech 10년 레이저 장비 공급 경험을 바탕으로, CO₂·파이버·UV 레이저의 실질적 차이와 반도체·디스플레이·자동차 공정별 최적 선택 기준을 공유합니다.",
      en: "Based on OHI Tech's 10+ years supplying laser equipment, the practical differences between CO₂, fiber, and UV lasers — and which to choose for semiconductor, display, and automotive applications.",
      zh: "基于OHI Tech十余年激光设备供应经验，分享CO₂、光纤、UV激光的实质差异及半导体、显示器、汽车工艺的最优选型标准。",
    },
    keywords: {
      ko: ["레이저 장비", "산업용 레이저", "CO2 레이저", "파이버 레이저", "UV 레이저", "레이저 마킹", "레이저 용접", "레이저 절단", "반도체 레이저", "레이저 가공"],
      en: ["laser equipment", "industrial laser", "CO2 laser", "fiber laser", "UV laser", "laser marking", "laser welding", "laser cutting", "semiconductor laser"],
      zh: ["激光设备", "工业激光", "CO2激光", "光纤激光", "UV激光", "激光打标", "激光焊接", "激光切割", "半导体激光"],
    },
    body: {
      ko: `**금속 절단·용접은 파이버 레이저, 비금속(플라스틱·아크릴)은 CO₂ 레이저, 열영향 없는 반도체·디스플레이 공정에는 UV 레이저**가 정답입니다. OHI Tech가 10년간 수백 건의 레이저 장비 공급에서 확인한 공정별 선택 기준을 공유합니다.

## 결론부터: 어떤 레이저를 선택해야 하나요?

**금속 절단·용접이 주 목적이라면 파이버 레이저**, 비금속(플라스틱·아크릴) 절단이라면 CO₂ 레이저, 열 영향 없는 초정밀 가공이라면 UV 레이저가 정답입니다.

단, 반도체·디스플레이 공정처럼 열영향부(HAZ) 허용치가 수 μm 이하인 경우에는 UV 또는 워터젯 레이저를 검토해야 합니다.

## CO₂·파이버·UV 레이저 한눈에 비교

![ns 그린 레이저(워터젯)와 펨토초(fs) 레이저 방식 비교 — Hortech | OHI Tech 기술 자료](/images/insights/laser-ns-vs-fs.png)

| 항목 | CO₂ (10.6μm) | 파이버 (1.06μm) | UV (355nm) |
|------|-------------|----------------|-----------|
| **주요 소재** | 비금속, 두꺼운 금속 | 금속 전반 | 반도체, 세라믹, 유리 |
| **열영향부(HAZ)** | 큼 | 중간 | 거의 없음 |
| **빔 품질(M²)** | 1.2~2.0 | ≈1.0 | ≈1.0 |
| **전기효율** | 10~15% | 30~40% | 5~10% |
| **장비 단가** | 낮음 | 중간 | 높음 |
| **유지보수 주기** | 짧음 | 길음 | 중간 |
| **반도체 적용** | 제한적 | PCB 마킹 가능 | 핵심 공정 |

## CO₂ 레이저 — 비금속 가공의 강자

CO₂ 레이저는 출력 범위 10W~20kW로 가장 광범위하게 쓰입니다. OHI Tech 납품 이력 기준으로 PCB 비아홀 드릴링, 태양광 패널 스크라이빙에서 가성비가 가장 높은 선택입니다.

단, 금속 반사율이 높아 알루미늄·구리 가공 시 출력 손실이 크고, HAZ가 넓어 반도체 웨이퍼 직접 가공에는 부적합합니다.

## 파이버 레이저 — 금속 가공 생산성의 기준

빔 품질 M²≈1.0, 전기효율 30~40%로 금속 절단·용접 라인의 표준이 되었습니다. CO₂ 대비 전기효율이 2~3배 높고 유지보수 주기가 길어 연속 생산 라인에서 장기 비용 효율이 좋습니다.

스테인리스·알루미늄·구리 정밀 절단, 반도체 패키지 DPM 마킹에 최적입니다.

## UV 레이저 — 열 영향 없는 초정밀 가공

파장 355nm의 짧은 자외선이 소재를 광화학적으로 분해(cold ablation)합니다. 열로 녹이는 방식이 아니어서 HAZ가 사실상 없습니다.

FPCB 커팅, OLED 패널 수리, 유리·세라믹 미세 홀 가공에서 탄화 불량을 줄일 수 있어 반도체·디스플레이 공정에서 적극 활용됩니다.

[이미지: CO₂_파이버_UV_레이저_절단면_비교]

## 반도체·디스플레이 공정별 레이저 선택 가이드

| 공정 | 권장 레이저 | 이유 |
|------|-----------|------|
| 웨이퍼 다이싱 | UV 또는 워터젯 | HAZ 최소화 |
| FPCB 커팅 | UV | 탄화 없는 절단면 |
| 패키지 DPM 마킹 | 파이버 | 고속·고정밀 |
| OLED 패널 수리 | UV | 열 영향 없음 |
| 태양광 스크라이빙 | CO₂ | 비용 효율 |
| 배터리 탭 용접 | 파이버 | 용접 품질 |

## 장비 도입 전 반드시 확인할 7가지

1. **가공 소재**: 금속/비금속 구분, 두께, 반사율
2. **HAZ 허용치**: μm 단위 스펙이 있다면 UV 필수 검토
3. **처리량**: 시간당 가공 면적 또는 개수 목표
4. **빔 품질(M²)**: 초정밀 공정은 M²≤1.1 권장
5. **냉각 방식**: 공냉(간단) vs 수냉(고출력용)
6. **설치 환경**: 진동·온습도 조건, 배선 용량
7. **국내 서비스**: 부품 재고, A/S 응답 시간

## 자주 묻는 질문 (FAQ)

**Q1. CO₂와 파이버 레이저 중 어떤 게 더 경제적인가요?**
금속 가공이라면 파이버가 전기효율 3배 이상 높고 유지비가 낮아 장기적으로 유리합니다. 비금속 가공만 한다면 CO₂가 초기 비용이 저렴합니다.

**Q2. UV 레이저는 왜 비싼가요?**
자외선 생성을 위한 주파수 변환 크리스탈(BBO, LBO) 소모 비용과 광학계 정밀도 유지 비용이 높습니다. 그러나 불량률 감소 효과로 반도체·디스플레이 공정에서는 ROI가 빠릅니다.

**Q3. 레이저 장비 선택 후 공정 적합성을 어떻게 검증하나요?**
OHI Tech는 장비 도입 전 실제 소재로 시험 가공(Feasibility Test)을 진행합니다. 소재 사양을 알려주시면 가공 가능 여부와 품질을 사전 확인해드립니다.

레이저 장비 도입을 검토 중이시라면 가공 소재와 공정 조건을 알려주세요. OHI Tech 엔지니어링팀이 최적 장비를 안내해드립니다. jino.kim@ohitech.co.kr`,
      en: `Not sure which laser fits your process — CO₂, fiber, or UV? Here is the practical answer based on OHI Tech's 10+ years supplying laser systems to semiconductor, display, and automotive manufacturers.

## Quick Answer: Which Laser Do You Need?

**For metal cutting and welding: fiber laser. For non-metal (acrylic, plastic): CO₂ laser. For zero-HAZ ultra-precision: UV laser.**

If your process requires HAZ below a few micrometers — as in semiconductor wafer processing — UV or waterjet laser is mandatory.

## CO₂ vs Fiber vs UV: Side-by-Side Comparison

| Parameter | CO₂ (10.6μm) | Fiber (1.06μm) | UV (355nm) |
|-----------|-------------|----------------|-----------|
| **Primary materials** | Non-metals, thick metal | All metals | Semiconductors, ceramics, glass |
| **Heat affected zone** | Large | Medium | Near zero |
| **Beam quality (M²)** | 1.2–2.0 | ≈1.0 | ≈1.0 |
| **Electrical efficiency** | 10–15% | 30–40% | 5–10% |
| **Equipment cost** | Low | Medium | High |
| **Maintenance interval** | Short | Long | Medium |
| **Semiconductor use** | Limited | PCB marking | Core process |

## CO₂ Laser — Best for Non-Metal Processing

Output range 10W–20kW covers the widest application range. In OHI Tech's supply history, CO₂ delivers the best cost-performance for PCB via-hole drilling and solar panel scribing.

Limitations: high reflection loss on aluminum and copper; HAZ too large for direct semiconductor wafer processing.

## Fiber Laser — The Standard for Metal Processing Productivity

Beam quality M²≈1.0 and 30–40% electrical efficiency have made fiber laser the default for metal cutting and welding lines. In an EV battery cell tab welding line where OHI Tech supplied fiber lasers, power consumption dropped 65% and maintenance costs fell 40% vs CO₂.

Best for: stainless, aluminum, copper precision cutting; semiconductor package DPM marking.

## UV Laser — Precision Without Heat Damage

At 355nm, UV photons break molecular bonds photochemically (cold ablation) rather than melting material — virtually zero HAZ. Applied in FPCB cutting, OLED panel repair, and glass/ceramic micro-drilling, UV lasers significantly reduce carbonization defects compared to CO₂ systems.

Essential for: OLED panel repair, glass and ceramic micro-hole drilling, wafer scribing.

## Process-Specific Laser Selection

| Process | Recommended Laser | Reason |
|---------|-------------------|--------|
| Wafer dicing | UV or waterjet | Minimize HAZ |
| FPCB cutting | UV | Clean kerf, no carbonization |
| Package DPM marking | Fiber | High speed and precision |
| OLED panel repair | UV | No thermal damage |
| Solar scribing | CO₂ | Cost efficiency |
| Battery tab welding | Fiber | Weld quality |

## 7 Things to Confirm Before Purchase

1. **Material**: metal vs non-metal, thickness, reflectivity
2. **HAZ tolerance**: if spec is in μm range, UV is required
3. **Throughput target**: area or count per hour
4. **Beam quality (M²)**: M²≤1.1 for ultra-precision
5. **Cooling**: air-cooled (simple) vs water-cooled (high power)
6. **Installation**: vibration, temperature/humidity, electrical capacity
7. **Local service**: parts stock, response time

## FAQ

**Q1. CO₂ or fiber — which is more economical?**
For metal processing, fiber's 3x higher electrical efficiency and lower maintenance make it more cost-effective long-term. For non-metal only, CO₂ has lower upfront cost.

**Q2. Why is UV laser expensive?**
Frequency-conversion crystals (BBO, LBO) have ongoing consumable costs, and maintaining optical precision adds to the price. However, in semiconductor and display applications, defect reduction delivers fast ROI.

**Q3. How do I verify process suitability before committing?**
OHI Tech runs pre-purchase feasibility tests on your actual material. Send us your material specs and we will confirm processability and quality before any purchase decision. Contact: jino.kim@ohitech.co.kr`,
      zh: `对于应该选择CO₂、光纤还是UV激光，感到困惑吗？以下是OHI Tech十余年向半导体、显示器及汽车零部件制造商供应激光设备的实战经验总结。

## 直接给出答案：该选哪种激光？

**金属切割焊接首选光纤激光，非金属（亚克力、塑料）切割首选CO₂激光，零热影响超精密加工首选UV激光。**

若工艺要求HAZ在数μm以内（如半导体晶圆加工），必须考虑UV激光或水导激光。

## CO₂·光纤·UV激光横向对比

| 项目 | CO₂ (10.6μm) | 光纤 (1.06μm) | UV (355nm) |
|------|-------------|--------------|-----------|
| **主要材料** | 非金属、厚金属 | 各类金属 | 半导体、陶瓷、玻璃 |
| **热影响区(HAZ)** | 大 | 中 | 几乎无 |
| **光束质量(M²)** | 1.2~2.0 | ≈1.0 | ≈1.0 |
| **电光效率** | 10~15% | 30~40% | 5~10% |
| **设备价格** | 低 | 中 | 高 |
| **维护周期** | 短 | 长 | 中 |
| **半导体应用** | 有限 | PCB打标可用 | 核心工艺 |

## CO₂激光 — 非金属加工的首选

输出功率10W~20kW，应用范围最广。OHI Tech供货记录显示，PCB导通孔钻孔和太阳能电池板划线性价比最高。

局限：铝和铜反射损耗大；HAZ较宽，不适合直接加工半导体晶圆。

## 光纤激光 — 金属加工效率标杆

光束质量M²≈1.0，电光效率30~40%，已成为金属切割焊接产线的标准配置。OHI Tech为新能源电池极耳焊接线供应光纤激光后，电耗降低65%，维护成本降低40%。

最适用于：不锈钢/铝/铜精密切割、半导体封装DPM打标。

## UV激光 — 无热损伤精密加工

355nm紫外光子通过光化学方式分解材料（冷消融），HAZ几乎为零。UV激光在FPCB切割、OLED面板修复及玻璃/陶瓷微孔加工中，可显著减少相比CO₂系统的碳化不良。

必备场景：OLED面板修复、玻璃陶瓷微孔加工、晶圆划片。

## 各工艺激光选型建议

| 工艺 | 推荐激光 | 原因 |
|------|---------|------|
| 晶圆划片 | UV或水导激光 | 最小化HAZ |
| FPCB切割 | UV | 无碳化切割面 |
| 封装DPM打标 | 光纤 | 高速高精度 |
| OLED面板修复 | UV | 无热影响 |
| 太阳能划线 | CO₂ | 成本效益 |
| 电池极耳焊接 | 光纤 | 焊接品质 |

## 常见问题 (FAQ)

**Q1. CO₂和光纤激光哪个更经济？**
金属加工场景下，光纤激光电效率高3倍以上，长期维护成本更低，综合更划算。纯非金属加工，CO₂初始投资更低。

**Q2. UV激光为什么贵？**
频率转换晶体（BBO、LBO）持续消耗及光学精度维护成本较高。但在半导体和显示器工艺中，不良率大幅降低带来的ROI回收速度很快。

**Q3. 如何在购买前验证工艺适配性？**
OHI Tech提供购前实材料试加工服务，告知材料规格，我们将在承诺购买前确认加工可行性和品质。联系邮箱：jino.kim@ohitech.co.kr`,
    },
  },
  {
    slug: "esc",
    category: "semiconductor-parts",
    relatedProductPath: "semiconductor-parts/esc",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "정전척(ESC) Johnsen-Rahbek vs Coulomb 비교 — 재생 기준과 비용 절감 실사례",
      en: "ESC Johnsen-Rahbek vs Coulomb Type — Refurbishment Criteria & Real Cost Reduction Cases",
      zh: "静电吸盘ESC约翰森-拉贝克vs库仑型对比 — 翻新标准与实际降本案例",
    },
    description: {
      ko: "Lam Research Kiyo·Flex·Versys용 ESC의 동작 원리, 두 방식의 실질적 차이, OHI Tech가 직접 검증한 재생 수리 기준과 판정 기준을 설명합니다.",
      en: "Operating principles of ESCs for Lam Research Kiyo, Flex, and Versys — practical differences between JR and Coulomb types, and OHI Tech's directly verified refurbishment criteria.",
      zh: "Lam Research Kiyo·Flex·Versys用静电吸盘工作原理、两种方式实质差异，以及OHI Tech直接验证的翻新修复判定标准。",
    },
    keywords: {
      ko: ["정전척", "ESC", "electrostatic chuck", "반도체 ESC", "Kiyo ESC", "Flex ESC", "Versys ESC", "ESC 수리", "Lam Research ESC", "AMAT ESC", "TEL ESC"],
      en: ["electrostatic chuck", "ESC", "semiconductor ESC", "Kiyo ESC", "Flex ESC", "Versys ESC", "ESC repair", "Lam Research ESC", "AMAT ESC"],
      zh: ["静电吸盘", "ESC", "半导体ESC", "Kiyo ESC", "Flex ESC", "Versys ESC", "ESC维修", "Lam ESC", "AMAT ESC"],
    },
    body: {
      ko: `**OHI Tech 기준을 통과한 재생 ESC는 신품과 동일한 흡착력·절연 저항·파티클 스펙을 만족합니다.** 세라믹 균열이나 가스홀 막힘 20% 이상이 아니라면 재생으로 비용을 크게 줄일 수 있습니다. OHI Tech는 Lam Research Kiyo·Flex·Versys 장비용 ESC를 수백 건 공급·재생하며 재생 판정 기준을 직접 검증했습니다.

## 결론: 재생 ESC, 신품과 성능 차이 없습니다

OHI Tech 기준을 통과한 재생 ESC는 신품 대비 흡착력·절연 저항·파티클 모두 동일 스펙을 만족합니다. 신품보다 상당히 낮은 비용으로 교체 부담을 줄일 수 있습니다.

단, 세라믹 표면 균열이나 가스홀 막힘 20% 이상인 경우에는 재생이 불가능하고 신품 교체가 필요합니다.

## Johnsen-Rahbek형 vs Coulomb형 한눈에 비교

![OHI Tech ESC(정전척) 제품 상세 — 반도체 공정 Plasma Etching, CVD, Ion Implantation 적용](/images/insights/esc-product-detail.png)

| 항목 | Johnsen-Rahbek (J-R)형 | Coulomb형 |
|------|----------------------|----------|
| **흡착 원리** | 유전체 누설전류 활용 | 순수 정전기력 |
| **인가 전압** | 200~600V | 1~2kV |
| **흡착력** | 높음 (30~80 Torr) | 중간 |
| **탈착 속도** | 다소 느림 (잔류 전하) | 빠름 |
| **주요 적용** | Lam Kiyo, Flex, Versys | AMAT, TEL 일부 |
| **세라믹 소재** | AlN, Al₂O₃ (반도체 특성) | Al₂O₃ (절연체) |

Lam Research 장비 사용 팹이라면 대부분 J-R형입니다. 300mm 고밀도 플라즈마 공정에서 흡착력이 더 강하고 저전압 구동이 가능한 장점 때문입니다.

## 장비별 ESC 규격 요약

| 장비 | 타입 | 직경 | 주요 특징 |
|------|------|------|---------|
| Lam Kiyo | J-R | 300mm | 고밀도 플라즈마, 다양한 가스홀 패턴 |
| Lam Flex | J-R | 300mm | 저압 식각, RF 인가 방식 |
| Lam Versys | J-R | 300mm | 소형 피처 식각, 고선택비 |
| AMAT Centura | Coulomb | 200/300mm | 다층 전극 구조 |
| TEL Trias | J-R | 300mm | 고온 공정용 AlN 기반 |

## OHI Tech ESC 재생 가능 판정 기준

OHI Tech가 실제 재생 여부를 결정할 때 적용하는 기준입니다.

**재생 가능 조건 (5가지 모두 충족 시):**
- 표면 거칠기(Ra): 0.8μm 이하
- 절연 저항: 10⁹Ω 이상 (500V DC 인가)
- 흡착력: 신품 규격 대비 80% 이상
- 파티클 발생량: 클래스 규격 이내
- 표면 균열·칩핑: 없음

**신품 교체 필요 조건:**
- 세라믹 표면 균열 또는 스폴링 확인
- 가스홀 막힘 20% 이상
- 흡착력 신품 대비 50% 미만 저하

[이미지: ESC_재생전후_비교_사진]

## 재생 ESC 도입 효과

OHI Tech 재생 기준을 통과한 ESC는 흡착력·절연 저항·파티클 기준을 신품과 동일하게 충족합니다. 신품 대비 상당한 비용 절감이 가능하며, 구체적인 납품 사례는 문의 시 공유드립니다.

## 자주 묻는 질문 (FAQ)

**Q1. 재생 ESC의 보증 기간은 얼마나 되나요?**
보증 기간은 제품 상태 및 재생 범위에 따라 달라지므로 문의 시 안내드립니다. 재생 후 성능 측정 데이터(흡착력, 절연 저항, 파티클)와 함께 결과 보고서를 제공합니다.

**Q2. ESC 재생까지 소요 기간은 얼마나 걸리나요?**
소요 기간은 제품 상태 및 재생 범위에 따라 달라집니다. 수령 후 상태 진단 결과를 바탕으로 일정을 안내드립니다.

**Q3. Kiyo, Flex, Versys 이외 장비용 ESC도 공급 가능한가요?**
AMAT, TEL, 기타 장비용 ESC도 공급 가능합니다. 장비 모델명과 ESC 파트 번호를 알려주시면 신품 공급 또는 재생 가능 여부를 확인해드립니다.

ESC 재생 가능 여부 확인이나 신품 견적이 필요하시면 파트 번호와 현재 상태 사진을 보내주세요. OHI Tech 엔지니어링팀이 빠르게 검토해드립니다. jino.kim@ohitech.co.kr`,
      en: `Tired of full replacement costs every PM cycle? Not sure if refurbished ESCs are safe to run?

OHI Tech has supplied and refurbished hundreds of ESCs for Lam Research Kiyo, Flex, and Versys tools. We have directly verified which condition still qualifies for refurbishment and when new parts are truly required. Here are those criteria.

## Bottom Line: Refurbished ESCs Match New-Part Performance

OHI Tech-certified refurbished ESCs meet the same clamping force, insulation resistance, and particle specs as new parts — at a significantly lower cost than new.

Exception: ceramic surface cracks or gas hole blockage above 20% cannot be refurbished and require new-part replacement.

## Johnsen-Rahbek vs Coulomb Type: Side-by-Side

| Parameter | Johnsen-Rahbek (J-R) | Coulomb |
|-----------|---------------------|---------|
| **Clamping mechanism** | Dielectric leakage current | Pure electrostatic force |
| **Applied voltage** | 200–600V | 1–2kV |
| **Clamping force** | High (30–80 Torr) | Medium |
| **Dechuck speed** | Slightly slow (residual charge) | Fast |
| **Primary tools** | Lam Kiyo, Flex, Versys | AMAT, TEL (select models) |
| **Ceramic material** | AlN, Al₂O₃ (semiconducting) | Al₂O₃ (insulating) |

Fabs running Lam Research tools almost always use J-R type — stronger clamping at lower voltage for 300mm high-density plasma processes.

## ESC Specs by Tool

| Tool | Type | Diameter | Key Features |
|------|------|----------|-------------|
| Lam Kiyo | J-R | 300mm | High-density plasma, varied gas hole patterns |
| Lam Flex | J-R | 300mm | Low-pressure etch, RF applied |
| Lam Versys | J-R | 300mm | Small feature etch, high selectivity |
| AMAT Centura | Coulomb | 200/300mm | Multi-layer electrode |
| TEL Trias | J-R | 300mm | High-temp process, AlN base |

## OHI Tech Refurbishment Qualification Criteria

These are the exact criteria OHI Tech applies when deciding whether an ESC can be refurbished.

**Refurbishable — all 5 must pass:**
- Surface roughness (Ra): ≤0.8μm
- Insulation resistance: ≥10⁹Ω at 500V DC
- Clamping force: ≥80% of new-part spec
- Particle generation: within class spec
- Surface cracks / chipping: none

**Replace with new part if:**
- Ceramic surface crack or spalling confirmed
- Gas hole blockage ≥20%
- Clamping force <50% of new-part spec

## Refurbishment Results

OHI Tech-qualified refurbished ESCs meet the same clamping force, insulation resistance, and particle specifications as new parts. Specific supply case details are available upon request.

## FAQ

**Q1. What warranty comes with refurbished ESCs?**
Warranty coverage depends on the part condition and refurbishment scope — details are provided upon inquiry. All refurbished ESCs come with a performance data report covering measured clamping force, insulation resistance, and particle count.

**Q2. How long does refurbishment take?**
Turnaround time depends on the part condition and refurbishment scope. We assess the unit on receipt and provide a timeline estimate based on the diagnosis result.

**Q3. Can you supply ESCs for tools other than Kiyo, Flex, and Versys?**
Yes — AMAT, TEL, and other tool ESCs are available. Send us the tool model and ESC part number and we will confirm availability for new supply or refurbishment. Contact: jino.kim@ohitech.co.kr`,
      zh: `每次PM周期到来，新品ESC的费用让您感到压力？还是对翻新品能否放心使用存有疑虑？

OHI Tech已为Lam Research Kiyo·Flex·Versys设备供应和翻新了数百件ESC，直接验证了哪种状态还可翻新、何时必须换新品的判断标准。本文分享这些标准。

## 结论：翻新ESC性能不输新品

经OHI Tech标准认证的翻新ESC，吸附力、绝缘电阻、颗粒指标均与新品一致，费用较新品有显著节省。

例外情况：陶瓷表面出现裂纹或气孔堵塞超过20%时无法翻新，必须更换新品。

## 约翰森-拉贝克型vs库仑型对比

| 项目 | 约翰森-拉贝克(J-R)型 | 库仑型 |
|------|-------------------|------|
| **吸附原理** | 介电泄漏电流 | 纯静电力 |
| **施加电压** | 200~600V | 1~2kV |
| **吸附力** | 高（30~80 Torr） | 中等 |
| **脱附速度** | 略慢（残余电荷） | 快 |
| **主要设备** | Lam Kiyo、Flex、Versys | AMAT、TEL部分机型 |
| **陶瓷材料** | AlN、Al₂O₃（半导体特性） | Al₂O₃（绝缘体） |

使用Lam Research设备的晶圆厂基本都是J-R型，原因是300mm高密度等离子体工艺中吸附力更强、工作电压更低。

## 各设备ESC规格

| 设备 | 类型 | 直径 | 主要特征 |
|------|------|------|---------|
| Lam Kiyo | J-R | 300mm | 高密度等离子体，多种气孔图案 |
| Lam Flex | J-R | 300mm | 低压刻蚀，RF施加方式 |
| Lam Versys | J-R | 300mm | 小特征尺寸刻蚀，高选择比 |
| AMAT Centura | 库仑 | 200/300mm | 多层电极结构 |
| TEL Trias | J-R | 300mm | 高温工艺用AlN基板 |

## OHI Tech翻新可行性判定标准

以下是OHI Tech实际用于判断能否翻新的标准。

**可翻新条件（5项全部满足）：**
- 表面粗糙度(Ra)：≤0.8μm
- 绝缘电阻：500V DC下≥10⁹Ω
- 吸附力：新品规格的80%以上
- 颗粒发生量：等级规格以内
- 表面裂纹/崩缺：无

**需换新品的情况：**
- 陶瓷表面确认有裂纹或剥落
- 气孔堵塞≥20%
- 吸附力低于新品规格50%

## 翻新效果

经OHI Tech标准认证的翻新ESC，吸附力、绝缘电阻、颗粒指标均符合新品同等规格，且费用较新品有显著节省。具体供货案例详情可询问后提供。

## 常见问题 (FAQ)

**Q1. 翻新ESC的质保期多长？**
质保期因产品状态和翻新范围而异，询问时详细告知。翻新后提供包含吸附力、绝缘电阻、颗粒数测量数据的性能报告。

**Q2. 翻新需要多长时间？**
交货时间取决于产品状态和翻新范围，收到后进行状态诊断，根据诊断结果告知具体工期。

**Q3. 除Kiyo、Flex、Versys以外的设备ESC也能供应吗？**
可以，AMAT、TEL等其他设备ESC均可供应。告知设备型号和ESC料号，我们将确认新品供应或翻新可行性。联系邮箱：jino.kim@ohitech.co.kr`,
    },
  },
  {
    slug: "wafer-carrier",
    category: "semiconductor-parts",
    relatedProductPath: "semiconductor-parts/wafer-carrier",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "FOUP vs 오픈 카세트 선택 기준 — 300mm 웨이퍼 이송 중 파티클·오염 막는 방법",
      en: "FOUP vs Open Cassette Selection — How to Prevent Particles and Contamination in 300mm Wafer Transport",
      zh: "FOUP与开放式卡匣选型 — 300mm晶圆传输中防止颗粒与污染的方法",
    },
    description: {
      ko: "FOUP, FOSB, SMIF Pod, PFA 카세트의 실질적 차이와 공정별 선택 기준, OHI Tech가 CK Plastics 파트너로서 공급한 사례를 설명합니다.",
      en: "Practical differences between FOUP, FOSB, SMIF Pod, and PFA cassettes — process-specific selection criteria and OHI Tech supply cases as an official CK Plastics partner.",
      zh: "FOUP、FOSB、SMIF Pod、PFA卡匣的实质差异、各工艺选型标准，以及OHI Tech作为CK Plastics官方合作伙伴的供货案例。",
    },
    keywords: {
      ko: ["웨이퍼 캐리어", "FOUP", "FOSB", "SMIF pod", "PFA 카세트", "300mm FOUP", "웨이퍼 카세트", "CK Plastics", "반도체 이송 장비"],
      en: ["wafer carrier", "FOUP", "FOSB", "SMIF pod", "PFA cassette", "300mm FOUP", "wafer cassette", "CK Plastics"],
      zh: ["晶圆载体", "FOUP", "FOSB", "SMIF Pod", "PFA卡匣", "300mm FOUP", "晶圆盒", "CK Plastics"],
    },
    body: {
      ko: `**드라이 공정(식각·증착)은 FOUP, 습식 세정(HF·황산)은 PFA 카세트, 팹 간 장거리 운송은 FOSB**가 기본 선택 기준입니다. 공정 환경과 소재를 맞추지 않으면 파티클 오염과 소재 열화가 발생합니다. OHI Tech는 CK Plastics 공식 파트너로서 국내 주요 300mm 팹에 웨이퍼 캐리어를 공급하며 공정별 선택 실수를 직접 확인했습니다.

## 결론: 공정 환경에 따라 캐리어 소재가 달라집니다

**드라이 공정(식각·증착)이라면 FOUP**, 습식 세정(Wet Clean)이라면 PFA 카세트, 장거리 운송이라면 FOSB가 기본입니다.

화학약품 환경에서 일반 PC 재질 FOUP을 사용하면 소재 열화와 파티클 오염이 발생합니다. 공정 환경과 소재를 반드시 맞춰야 합니다.

## 웨이퍼 캐리어 종류별 비교

![OHI Tech 반도체 소재 부품 — Quartz, Silicon, SiC, Sapphire 소재 웨이퍼 캐리어 공급](/images/insights/semiconductor-parts-detail.png)

| 종류 | 밀폐 여부 | 주 용도 | 재질 | 호환 장비 |
|------|---------|--------|------|---------|
| FOUP | 밀폐 | 300mm 드라이 공정 | PC+ABS | EFEM, AMHS |
| FOSB | 밀폐 | 팹 간 장거리 운송 | PC+ABS | 외부 운송 |
| SMIF Pod | 밀폐 | 200mm 레거시 라인 | PC | SMIF EFEM |
| PFA 카세트 | 오픈 | 습식 세정, HF 공정 | PFA | 습식 세정 장비 |

## 소재별 특성 — 화학 내성이 핵심입니다

| 소재 | 화학 내성 | 내열성 | 정전기 | 주요 적용 |
|------|---------|-------|-------|---------|
| PC (폴리카보네이트) | 중간 | 120°C | 대전 가능 | 표준 FOUP |
| PEEK | 높음 | 260°C | 낮음 | 고온 공정 |
| PFA (불소수지) | 매우 높음 | 260°C | 낮음 | HF·황산 환경 |
| ESD PC | 중간 | 120°C | 방전 처리 | 정전기 민감 공정 |

습식 세정 공정에서 일반 PC 카세트를 사용하다 HF에 의한 소재 용출로 웨이퍼 오염이 발생한 사례가 있으며, PFA 카세트로 전환 후 파티클 불량이 크게 개선된 사례를 확인했습니다. 구체적인 납품 사례는 문의 시 공유드립니다.

## FOUP 선택 시 반드시 확인할 5가지

1. **도어 타입**: 로봇 암 호환 여부 (Entegris, Shin-Etsu, CK Plastics 규격)
2. **N₂ 퍼지 포트**: 산화 방지가 필요한 공정이라면 필수
3. **슬롯 간격**: 공정 장비 보트 핀 간격과 호환 확인
4. **RFID 태그**: 웨이퍼 추적(MES) 연동 여부
5. **세정 내구성**: 재사용 횟수와 세정 방법

[이미지: FOUP_PFA카세트_FOSB_비교_사진]

## CK Plastics FOUP — OHI Tech 공급 현황

OHI Tech는 CK Plastics 한국 공식 파트너입니다. FOUP, FOSB, 오픈 카세트 전 라인을 공급하며, 국내 주요 300mm 팹에서 검증된 제품입니다.

긴급 공급, 소량 주문 모두 대응 가능합니다. 현재 사용 중인 캐리어 모델명을 알려주시면 호환 가능 제품을 바로 안내해드립니다.

## 자주 묻는 질문 (FAQ)

**Q1. FOUP과 FOSB의 차이가 무엇인가요?**
FOUP은 팹 내 장비 간 이송(AMHS, OHT)용 밀폐 캐리어이고, FOSB는 팹 간 장거리 운송을 위해 충격 흡수 패드와 강화된 잠금 구조를 추가한 버전입니다. 외관은 비슷하지만 FOSB가 더 견고합니다.

**Q2. 200mm 레거시 장비를 아직 사용 중인데 어떤 캐리어가 맞나요?**
200mm 라인은 SMIF Pod(표준) 또는 오픈 카세트(습식 공정)를 사용합니다. 장비 종류와 공정 조건을 알려주시면 적합한 제품을 안내해드립니다.

**Q3. FOUP 세정 주기와 방법은 어떻게 되나요?**
일반적으로 500~1,000사이클마다 IPA 또는 DI water 세정을 권장합니다. 세정 후 파티클 카운트 검사를 거쳐 재사용 여부를 결정합니다. OHI Tech에서 세정 절차 가이드를 제공합니다.

웨이퍼 캐리어 선택이나 긴급 공급이 필요하시면 현재 사용 중인 장비 환경을 알려주세요. jino.kim@ohitech.co.kr`,
      en: `Particle issues during transport, or unsure which carrier fits which process? FOUP, SMIF Pod, PFA cassette — the names are familiar but choosing the right one for each process is where mistakes happen.

OHI Tech is an official CK Plastics partner supplying wafer carriers to major 300mm fabs in Korea. We have seen firsthand what selection mistakes lead to. Here are the criteria.

## Bottom Line: Match the Carrier Material to Process Chemistry

**Dry processes (etch, deposition): FOUP. Wet clean (HF, H₂SO₄): PFA cassette. Inter-fab long-distance shipping: FOSB.**

Using standard PC-material FOUP in a wet chemical environment causes material degradation and particle contamination. Process environment and carrier material must match.

## Wafer Carrier Type Comparison

| Type | Sealed | Primary Use | Material | Compatible Equipment |
|------|--------|-------------|----------|---------------------|
| FOUP | Yes | 300mm dry processes | PC+ABS | EFEM, AMHS |
| FOSB | Yes | Inter-fab shipping | PC+ABS | External transport |
| SMIF Pod | Yes | 200mm legacy lines | PC | SMIF EFEM |
| PFA Cassette | Open | Wet clean, HF processes | PFA | Wet bench equipment |

## Material Properties — Chemical Resistance Is Key

| Material | Chemical Resistance | Heat Resistance | Static | Primary Use |
|----------|--------------------|-----------------|----|-------------|
| PC (Polycarbonate) | Medium | 120°C | Can charge | Standard FOUP |
| PEEK | High | 260°C | Low | High-temp processes |
| PFA (Fluororesin) | Very high | 260°C | Low | HF, sulfuric acid |
| ESD PC | Medium | 120°C | Dissipative | Static-sensitive processes |

We have seen cases where standard PC cassettes used in wet clean processes caused wafer contamination from HF-induced material leaching, and switching to PFA cassettes significantly reduced particle defects. Specific supply case details are available upon request.

## 5 Things to Confirm When Selecting a FOUP

1. **Door type**: robot arm compatibility (Entegris, Shin-Etsu, CK Plastics spec)
2. **N₂ purge port**: required if oxidation-sensitive process
3. **Slot pitch**: must match process tool boat pin spacing
4. **RFID tag**: MES wafer tracking integration
5. **Cleaning durability**: reuse cycles and cleaning method

## CK Plastics FOUP — OHI Tech Supply

OHI Tech is the official Korean partner for CK Plastics, supplying the full lineup of FOUP, FOSB, and open cassettes — validated at major 300mm fabs in Korea. Rush orders and small quantities available.

## FAQ

**Q1. What is the difference between FOUP and FOSB?**
FOUP is for in-fab transport (AMHS, OHT). FOSB adds shock-absorbing pads and a reinforced locking mechanism for long-distance inter-fab shipping. Looks similar but FOSB is structurally more robust.

**Q2. We still run 200mm legacy equipment. What carrier do we need?**
200mm lines use SMIF Pod (standard) or open cassettes (wet processes). Share your equipment type and process conditions and we will recommend the right product.

**Q3. What is the recommended FOUP cleaning interval and method?**
Generally every 500–1,000 cycles using IPA or DI water. Particle count testing after cleaning determines reuse eligibility. OHI Tech provides a cleaning procedure guide. Contact: jino.kim@ohitech.co.kr`,
      zh: `运输途中颗粒问题频发，或不知道该为哪道工序选哪种载体？FOUP、SMIF Pod、PFA卡匣——名字都熟悉，但在具体工序中如何选对，往往是容易出错的地方。

OHI Tech是CK Plastics官方合作伙伴，向韩国多家300mm晶圆厂供应晶圆载体。我们亲历了诸多选型失误的案例，本文整理相关标准。

## 结论：载体材料必须与工艺化学环境匹配

**干法工艺（刻蚀、沉积）用FOUP，湿法清洗（HF、硫酸）用PFA卡匣，晶圆厂间长途运输用FOSB。**

在湿法化学品环境中使用普通PC材质FOUP会导致材料劣化和颗粒污染，工艺环境与载体材料必须匹配。

## 晶圆载体类型对比

| 类型 | 密封性 | 主要用途 | 材料 | 兼容设备 |
|------|-------|--------|------|---------|
| FOUP | 密封 | 300mm干法工艺 | PC+ABS | EFEM、AMHS |
| FOSB | 密封 | 晶圆厂间运输 | PC+ABS | 外部运输 |
| SMIF Pod | 密封 | 200mm传统产线 | PC | SMIF EFEM |
| PFA卡匣 | 开放 | 湿法清洗、HF工艺 | PFA | 湿法台设备 |

## 材料特性 — 化学耐性是关键

| 材料 | 化学耐性 | 耐热性 | 静电 | 主要用途 |
|------|---------|-------|------|---------|
| PC（聚碳酸酯） | 中等 | 120°C | 可带电 | 标准FOUP |
| PEEK | 高 | 260°C | 低 | 高温工艺 |
| PFA（氟树脂） | 极高 | 260°C | 低 | HF·硫酸环境 |
| ESD PC | 中等 | 120°C | 静电消散 | 静电敏感工艺 |

我们在供货实践中发现，湿法清洗工艺使用普通PC卡匣因HF材料溶出导致晶圆污染的案例，改用PFA卡匣后颗粒不良显著改善。具体供货案例详情可询问后提供。

## 选择FOUP时必确认的5项

1. **门型**：机械臂兼容性（Entegris、Shin-Etsu、CK Plastics规格）
2. **N₂吹扫口**：防氧化工艺必须
3. **插槽间距**：须与工艺设备舟针间距兼容
4. **RFID标签**：MES晶圆追踪系统集成
5. **清洗耐久性**：复用次数及清洗方式

## 常见问题 (FAQ)

**Q1. FOUP和FOSB有什么区别？**
FOUP用于晶圆厂内设备间传输（AMHS、OHT），FOSB在此基础上增加了减震垫和加固锁扣，专为厂间长途运输设计。外观相似，但FOSB结构更坚固。

**Q2. 我们还在使用200mm旧设备，该用哪种载体？**
200mm产线用SMIF Pod（标准）或开放式卡匣（湿法工艺）。告知设备类型和工艺条件，我们会推荐合适产品。

**Q3. FOUP的清洗周期和方法是什么？**
一般每500~1000次循环用IPA或DI水清洗，清洗后经颗粒计数检测确定是否可复用。OHI Tech提供清洗程序指导。联系邮箱：jino.kim@ohitech.co.kr`,
    },
  },
  {
    slug: "dry-vacuum-pump",
    category: "semiconductor-parts",
    relatedProductPath: "semiconductor-parts/dry-vacuum-pump",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "반도체 드라이 진공펌프 수명 2배 늘리는 유지보수 체크리스트 — 공정별 선택 기준 포함",
      en: "Double Your Dry Vacuum Pump Service Life — Maintenance Checklist and Process Selection Guide",
      zh: "半导体干式真空泵寿命延长2倍的维护清单 — 含各工艺选型标准",
    },
    description: {
      ko: "Edwards, Pfeiffer, Ebara 드라이 진공펌프 공급 경험을 바탕으로, 스크류·클로우·루츠 타입 비교, 공정별 최적 선택, 수명을 2배로 늘리는 유지보수 포인트를 설명합니다.",
      en: "Based on OHI Tech's supply experience with Edwards, Pfeiffer, and Ebara dry vacuum pumps — screw vs claw vs Roots type comparison, process-specific selection, and maintenance tips to double service life.",
      zh: "基于OHI Tech供应Edwards、Pfeiffer、Ebara干式真空泵的经验，介绍螺杆·爪式·罗茨泵对比、各工艺最优选型及延长寿命2倍的维护要点。",
    },
    keywords: {
      ko: ["드라이 진공펌프", "반도체 진공펌프", "스크류 진공펌프", "클로우 진공펌프", "루츠 진공펌프", "식각 진공펌프", "CVD 진공펌프", "이온주입 진공펌프", "디스플레이 진공펌프"],
      en: ["dry vacuum pump", "semiconductor vacuum pump", "screw vacuum pump", "claw vacuum pump", "Roots pump", "etch vacuum pump", "CVD vacuum pump"],
      zh: ["干式真空泵", "半导体真空泵", "螺杆真空泵", "爪式真空泵", "罗茨泵", "刻蚀真空泵", "CVD真空泵"],
    },
    body: {
      ko: `**드라이 진공펌프 수명을 단축시키는 원인 1위는 N₂ 퍼지 부족입니다.** 공정 부산물 고착을 막는 퍼지 유량과 타이밍 관리만으로 오버홀 주기를 크게 연장할 수 있습니다. OHI Tech는 Edwards, Pfeiffer, Ebara 드라이 진공펌프 공급·오버홀 서비스를 운영하며 수명 단축 원인 패턴을 직접 파악했습니다.

## 결론: 수명을 줄이는 원인 1위는 N₂ 퍼지 부족입니다

공정 부산물이 펌프 내부에 고착되는 것이 가장 흔한 조기 고장 원인입니다. N₂ 퍼지 유량과 타이밍을 공정 레시피와 연동하는 것만으로 오버홀 주기를 크게 연장할 수 있습니다.

## 스크류·클로우·루츠 — 타입별 비교

![OHI Tech 반도체 소재 부품 공급 역량 — 드라이 진공펌프 관련 소모품 및 챔버 파츠 라인업](/images/insights/semiconductor-parts-detail.png)

| 항목 | 스크류형 | 클로우형 | 루츠(부스터)형 |
|------|--------|--------|-------------|
| **구조** | 나선형 로터 맞물림 | 갈고리형 비접촉 | 8자형 고속 회전 |
| **부식성 가스 내성** | 높음 | 중간 | 낮음 |
| **파우더 처리** | 우수 | 보통 | 부적합 |
| **고속 배기** | 중간 | 우수 | 최우수 (부스터용) |
| **단독 사용** | 가능 | 가능 | 불가 (조합 필수) |
| **주요 용도** | CVD, ALD | Etch | 부스터 조합 |

## 공정별 최적 드라이 진공펌프 선택

| 공정 | 권장 구성 | 이유 |
|------|---------|------|
| 식각(Etch) | 클로우 + 루츠 부스터 | 고속 배기, 부식성 가스(Cl₂, HBr) 대응 |
| CVD/PECVD | 스크류 | 파우더·고온 부산물 처리 |
| 이온주입(Implant) | 스크류 | 청정 배기, 초고진공 근접 |
| 스퍼터링(PVD) | 클로우 | 금속 증기 처리 |
| ALD | 스크류 | 펄스 가스 대응, 정밀 압력 제어 |

## 수명 2배 늘리는 유지보수 체크리스트

**매일 확인:**
- 펌프 본체 온도 (목표: 60°C 이하 유지)
- 냉각수 유량 및 온도 (이상 시 즉시 조치)
- N₂ 퍼지 유량 정상 여부

**매월 확인:**
- 배기 라인 막힘 여부 (차압 측정)
- 오일 미스트 필터 포화도 (진공도 저하 원인)
- 진동·소음 변화 (베어링 마모 조기 감지)

**오버홀 기준 (아래 중 먼저 도달하는 시점):**
- 가동 시간 20,000~30,000시간
- 도달 진공도 10% 이상 저하
- 배기 소음 기준치 5dB 이상 상승

[이미지: 드라이진공펌프_오버홀_전후_비교]

## OHI Tech 공급 경험

OHI Tech는 Edwards, Pfeiffer, Ebara 드라이 진공펌프 공급·오버홀을 통해 N₂ 퍼지 타이밍 설정 오류가 조기 고장의 주요 원인임을 반복적으로 확인했습니다. 구체적인 납품 사례는 문의 시 공유드립니다.

## 자주 묻는 질문 (FAQ)

**Q1. 드라이 펌프 오버홀과 신품 교체 중 어느 게 유리한가요?**
오버홀 비용은 신품의 30~50% 수준입니다. 로터 코팅과 베어링 상태가 양호하다면 오버홀이 경제적입니다. OHI Tech는 수령 즉시 상태 진단 후 오버홀 가능 여부를 알려드립니다.

**Q2. Etch 공정에서 펌프가 자주 막히는 이유는 무엇인가요?**
HBr, Cl₂ 등 부식성 가스 부산물이 냉각되면서 펌프 내부에 염화물로 고착되는 현상입니다. 펌프 히팅 온도 유지(80~100°C)와 퍼지 강화로 예방할 수 있습니다.

**Q3. Edwards 외 브랜드도 공급 및 오버홀이 가능한가요?**
Pfeiffer, Ebara 등 주요 브랜드 모두 신품 공급과 오버홀이 가능합니다. 현재 사용 중인 펌프 모델명을 알려주시면 대응 가능 여부를 바로 확인해드립니다.

드라이 진공펌프 오버홀이나 신품 교체를 검토 중이시라면 현재 가동 시간과 증상을 알려주세요. 최적 방법을 안내해드립니다. jino.kim@ohitech.co.kr`,
      en: `An unexpected pump failure stops the entire line. Missed preventive maintenance on dry vacuum pumps is one of the most expensive — and preventable — sources of unplanned downtime in semiconductor fabs.

OHI Tech supplies and overhauls dry vacuum pumps from Edwards, Pfeiffer, and Ebara. We have identified the recurring failure patterns that shorten service life. Here is the checklist.

## Bottom Line: N₂ Purge Deficiency Is the #1 Life-Shortener

Process byproducts solidifying inside the pump is the most common cause of early failure. Synchronizing N₂ purge flow and timing with the process recipe alone can significantly extend overhaul intervals.

## Screw vs Claw vs Roots — Type Comparison

| Parameter | Screw | Claw | Roots (Booster) |
|-----------|-------|------|----------------|
| **Structure** | Interlocking helical rotors | Non-contact hook rotors | Figure-8 high-speed rotors |
| **Corrosive gas resistance** | High | Medium | Low |
| **Powder handling** | Excellent | Fair | Not suitable |
| **High-speed pumping** | Medium | Excellent | Best (booster use) |
| **Standalone use** | Yes | Yes | No (must combine) |
| **Primary application** | CVD, ALD | Etch | Booster combination |

## Process-Specific Selection

| Process | Recommended Config | Reason |
|---------|-------------------|--------|
| Etch | Claw + Roots booster | High-speed pumping, Cl₂/HBr resistance |
| CVD/PECVD | Screw | Powder and high-temp byproduct handling |
| Ion implant | Screw | Clean exhaust, near-ultra-high vacuum |
| Sputtering (PVD) | Claw | Metal vapor handling |
| ALD | Screw | Pulse gas response, precise pressure control |

## Maintenance Checklist to Double Service Life

**Daily:**
- Pump body temperature (target: below 60°C)
- Cooling water flow and temperature (act immediately on anomaly)
- N₂ purge flow rate confirmation

**Monthly:**
- Exhaust line blockage (differential pressure measurement)
- Oil mist filter saturation (common cause of vacuum loss)
- Vibration and noise change (early bearing wear detection)

**Overhaul trigger (whichever comes first):**
- 20,000–30,000 operating hours
- Ultimate vacuum degrades by 10%+
- Exhaust noise increases 5dB+ above baseline

## OHI Tech Supply Experience

Through our supply and overhaul work with Edwards, Pfeiffer, and Ebara dry vacuum pumps, we have repeatedly confirmed that N₂ purge timing misconfiguration is a leading cause of premature failure. Specific supply case details are available upon request.

## FAQ

**Q1. Is overhaul or new replacement more cost-effective?**
Overhaul costs 30–50% of new pump price. If rotor coating and bearings are in good condition, overhaul is the better choice. OHI Tech evaluates condition on receipt and reports feasibility immediately.

**Q2. Why does the pump frequently clog in Etch processes?**
HBr and Cl₂ byproducts solidify as chloride deposits when they cool inside the pump. Prevention: maintain pump heating at 80–100°C and increase purge intensity.

**Q3. Do you support brands other than Edwards?**
Yes — Pfeiffer, Ebara, and other major brands are supported for both new supply and overhaul. Share the pump model and we will confirm availability. Contact: jino.kim@ohitech.co.kr`,
      zh: `泵突然宕机，整条产线停工。干式真空泵的预防维护一旦疏漏，非计划停机带来的损失极大。

OHI Tech供应并大修Edwards、Pfeiffer、Ebara干式真空泵，掌握了导致寿命缩短的反复故障模式。以下是维护清单。

## 结论：寿命缩短的首要原因是N₂吹扫不足

工艺副产物在泵内固化是最常见的早期故障原因。仅将N₂吹扫流量和时序与工艺配方同步，就能显著延长大修周期。

## 螺杆·爪式·罗茨泵对比

| 项目 | 螺杆型 | 爪式型 | 罗茨泵（增压） |
|------|-------|------|------------|
| **结构** | 螺旋转子啮合 | 爪形非接触旋转 | 8字形高速旋转 |
| **腐蚀性气体耐性** | 高 | 中 | 低 |
| **粉末处理** | 优秀 | 一般 | 不适合 |
| **高速抽气** | 中 | 优秀 | 最佳（增压用） |
| **独立使用** | 可 | 可 | 不可（需组合） |
| **主要用途** | CVD、ALD | 刻蚀 | 增压组合 |

## 各工艺最优干式真空泵选型

| 工艺 | 推荐配置 | 原因 |
|------|---------|------|
| 刻蚀(Etch) | 爪式+罗茨增压 | 高速抽气，耐Cl₂/HBr腐蚀 |
| CVD/PECVD | 螺杆型 | 粉末和高温副产物处理 |
| 离子注入 | 螺杆型 | 洁净排气，接近超高真空 |
| 溅射(PVD) | 爪式型 | 金属蒸气处理 |
| ALD | 螺杆型 | 脉冲气体响应，精密压力控制 |

## 延长寿命2倍的维护清单

**每日确认：**
- 泵体温度（目标：60°C以下）
- 冷却水流量及温度（异常立即处理）
- N₂吹扫流量正常与否

**每月确认：**
- 排气管线堵塞（差压测量）
- 油雾过滤器饱和度（真空度下降常见原因）
- 振动·噪音变化（轴承磨损早期检测）

**大修触发条件（先达到者为准）：**
- 运行时间20,000~30,000小时
- 极限真空度下降10%以上
- 排气噪音较基准上升5dB以上

## OHI Tech供货经验

通过Edwards、Pfeiffer、Ebara干式真空泵的供应与大修实践，我们反复确认N₂吹扫时序设置错误是早期故障的主要原因之一。具体供货案例详情可询问后提供。

## 常见问题 (FAQ)

**Q1. 大修和买新泵哪个更划算？**
大修费用约为新泵的30~50%。若转子涂层和轴承状态良好，大修更经济。OHI Tech收到泵后即进行状态诊断，立即告知大修可行性。

**Q2. 刻蚀工艺中泵为何频繁堵塞？**
HBr、Cl₂等腐蚀性气体副产物冷却后以氯化物形式固化在泵内。预防措施：维持泵体加热温度80~100°C，并加强吹扫。

**Q3. 除Edwards外的品牌也能供应和大修吗？**
可以，Pfeiffer、Ebara等主要品牌均可提供新品供应和大修服务。告知泵型号，我们将确认可行性。联系邮箱：jino.kim@ohitech.co.kr`,
    },
  },
  {
    slug: "oring",
    category: "semiconductor-parts",
    relatedProductPath: "semiconductor-parts/oring",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "Kalrez vs Viton O-ring 선택 실수 줄이는 기준 — 반도체 공정별 소재 비교",
      en: "Kalrez vs Viton O-Ring — How to Stop Making Wrong Material Choices by Semiconductor Process",
      zh: "Kalrez vs Viton O形圈 — 按半导体工艺减少选材失误的标准",
    },
    description: {
      ko: "Viton, Kalrez, Chemraz O-ring의 화학 내성·내열성·플라즈마 내성 비교와, OHI Tech가 확인한 공정별 소재 선택 실수 사례 및 교체 주기 기준을 설명합니다.",
      en: "Viton, Kalrez, Chemraz O-ring comparison on chemical resistance, heat resistance, and plasma resistance — plus process-specific material selection mistakes OHI Tech has seen and replacement interval criteria.",
      zh: "Viton、Kalrez、Chemraz O形圈化学耐性、耐热性、耐等离子体性对比，以及OHI Tech确认的各工艺选材失误案例和更换周期标准。",
    },
    keywords: {
      ko: ["O-ring", "반도체 오링", "Viton", "Kalrez", "Chemraz", "불소 오링", "퍼플루오로 오링", "플라즈마 내성 오링", "식각 오링", "CVD 오링"],
      en: ["O-ring", "semiconductor O-ring", "Viton", "Kalrez", "Chemraz", "fluoroelastomer", "perfluoroelastomer", "plasma resistant O-ring"],
      zh: ["O形圈", "半导体O形圈", "Viton", "Kalrez", "Chemraz", "氟橡胶", "全氟橡胶", "耐等离子体O形圈"],
    },
    body: {
      ko: `**200°C+ 플라즈마 공정에서 Viton O-ring을 사용하면 조기 열화로 가스 누설이 발생합니다. 이 환경에서는 Kalrez 6375 이상 그레이드가 필수입니다.** OHI Tech는 Viton, Kalrez, Chemraz O-ring을 공급하며 공정별 소재 선택 실수 사례를 직접 확인했습니다.

## 결론: 고온 플라즈마 공정에서 Viton 사용은 위험합니다

Viton은 200°C 한계를 넘으면 급격히 열화됩니다. ICP 식각, ALD(200~350°C) 공정에서 Viton을 쓰면 O-ring 조기 파손으로 가스 누설이 발생합니다.

이 환경에서는 Kalrez 6375 이상 그레이드가 필수입니다. 가격 차이가 크지만 장비 다운타임 1회 비용과 비교하면 Kalrez가 훨씬 경제적입니다.

## Viton vs Kalrez vs Chemraz 소재 비교

![OHI Tech 반도체 소재 부품 — Quartz, SiC, Sapphire 소재 라인업과 공급 역량](/images/insights/semiconductor-parts-detail.png)

| 항목 | Viton (FKM) | Kalrez (FFKM) | Chemraz (FFKM) |
|------|------------|--------------|----------------|
| **내열성** | -20~200°C | -20~327°C | -20~316°C |
| **화학 내성** | 탄화수소·산·오일 | 거의 모든 약품 | 거의 모든 약품 |
| **플라즈마 내성** | 중간 | 매우 높음 | 매우 높음 |
| **압축 영구변형** | 중간 | 낮음 | 일부 그레이드 Kalrez보다 낮음 |
| **가격** | 낮음 | 매우 높음 | 높음 (Kalrez보다 소폭 낮음) |
| **주요 용도** | PVD, 저온 CVD | ICP, ALD, 고부식성 | 고온·고압 밀봉 |

## 공정별 O-ring 소재 선택 기준

| 공정 | 온도 | 주요 가스 | 권장 소재 |
|------|------|---------|---------|
| 플라즈마 식각(CCP) | 80~150°C | Cl₂, HBr, CF₄ | Kalrez, Chemraz |
| 플라즈마 식각(ICP) | 150~250°C | SF₆, NF₃ | Kalrez 6375+ |
| PECVD | 200~400°C | SiH₄, NH₃ | Kalrez 6221 |
| 이온주입(Implant) | 상온~100°C | BF₃, AsH₃ | Kalrez |
| 스퍼터링(PVD) | 100~200°C | Ar, N₂ | Viton 또는 Kalrez |
| ALD | 200~350°C | TMA, H₂O | Kalrez 6375+ |

## 가장 흔한 O-ring 선택 실수 3가지

**실수 1: ICP Etch 챔버에 Viton 사용**
250°C 이상 환경에서 Viton이 열화되어 파편이 챔버를 오염시킵니다. Kalrez 6375 이상으로 교체해야 합니다.

**실수 2: 치수를 내경(ID)만 확인**
O-ring 치수는 ID(내경), OD(외경), CS(단면 직경) 3가지를 모두 확인해야 합니다. CS가 맞지 않으면 씰링력이 저하됩니다.

**실수 3: 예방 교체 주기를 무시하는 경우**
PM 주기에 O-ring을 교체하지 않으면 열화된 O-ring에서 파티클이 발생합니다. 외관상 멀쩡해도 예방 교체가 원칙입니다.

## O-ring 관리 팁

- **보관**: 18~25°C 건냉암소, 직사광선·오존·열원 차단
- **압축률**: 설치 시 25% 이하 권장 (과도한 압축 = 수명 단축)
- **PM 교체 주기**: 분기 1회 예방 교체 기본 (고온 공정은 2개월)
- **치수 3종 필수 확인**: ID × OD × CS

## 자주 묻는 질문 (FAQ)

**Q1. Kalrez와 Chemraz 중 어느 쪽을 선택해야 하나요?**
대부분의 반도체 공정에서는 Kalrez가 표준입니다. 고온·고압 특수 환경에서 압축 영구변형률이 중요한 경우, 해당 조건에 맞는 Chemraz 그레이드가 유리할 수 있습니다. 공정 조건을 알려주시면 최적 그레이드를 추천해드립니다.

**Q2. 현재 사용 중인 O-ring 소재를 어떻게 확인하나요?**
표면 각인이나 파트 번호로 확인 가능합니다. 각인이 없다면 샘플을 보내주시면 OHI Tech가 소재 분석 후 대체 소재를 추천해드립니다.

**Q3. 긴급 소량 주문도 가능한가요?**
1개 단위 소량 주문과 긴급 공급 모두 가능합니다. 치수(ID × OD × CS)와 소재 그레이드를 알려주시면 재고 여부를 즉시 확인해드립니다.

O-ring 소재 선택이나 긴급 공급이 필요하시면 공정 환경과 치수를 알려주세요. jino.kim@ohitech.co.kr`,
      en: `One wrong O-ring material choice leads to gas leaks, particle contamination, and equipment downtime. Material selection mistakes happen more often than expected.

OHI Tech supplies Viton, Kalrez, and Chemraz O-rings across semiconductor fabs and has directly observed what goes wrong and when. Here are the criteria.

## Bottom Line: Viton in High-Temperature Plasma Processes Is Dangerous

Viton degrades rapidly above its 200°C limit. Using Viton in ICP etch or ALD (200–350°C) processes causes premature O-ring failure and gas leakage.

These environments require Kalrez 6375 grade or higher. The price difference is significant, but compared to one equipment downtime event, Kalrez is far more economical.

## Viton vs Kalrez vs Chemraz Comparison

| Parameter | Viton (FKM) | Kalrez (FFKM) | Chemraz (FFKM) |
|-----------|------------|--------------|----------------|
| **Heat resistance** | -20~200°C | -20~327°C | -20~316°C |
| **Chemical resistance** | Hydrocarbons, acids, oils | Nearly all chemicals | Nearly all chemicals |
| **Plasma resistance** | Medium | Very high | Very high |
| **Compression set** | Medium | Low | Lower than Kalrez in select grades |
| **Price** | Low | Very high | High (slightly below Kalrez) |
| **Primary use** | PVD, low-temp CVD | ICP, ALD, corrosive gases | High-temp, high-pressure sealing |

## O-Ring Material Selection by Process

| Process | Temperature | Key Gases | Recommended Material |
|---------|-------------|-----------|---------------------|
| Plasma etch (CCP) | 80–150°C | Cl₂, HBr, CF₄ | Kalrez, Chemraz |
| Plasma etch (ICP) | 150–250°C | SF₆, NF₃ | Kalrez 6375+ |
| PECVD | 200–400°C | SiH₄, NH₃ | Kalrez 6221 |
| Ion implant | RT–100°C | BF₃, AsH₃ | Kalrez |
| Sputtering (PVD) | 100–200°C | Ar, N₂ | Viton or Kalrez |
| ALD | 200–350°C | TMA, H₂O | Kalrez 6375+ |

## The 3 Most Common O-Ring Selection Mistakes

**Mistake 1: Viton in ICP etch chambers**
Above 250°C, Viton degrades and fragments contaminate the chamber. Replace with Kalrez 6375+.

**Mistake 2: Checking only inner diameter (ID)**
O-ring dimensions require all three: ID (inner diameter), OD (outer diameter), CS (cross-section diameter). Wrong CS means insufficient sealing force.

**Mistake 3: Skipping preventive replacement**
Skipping O-ring replacement at PM intervals allows degraded O-rings to generate particles. Even if they look intact, preventive replacement is the rule.

## O-Ring Management Tips

- **Storage**: 18–25°C cool dark place, away from UV, ozone, and heat sources
- **Compression**: keep below 25% (over-compression = shortened life)
- **PM replacement**: quarterly as standard (every 2 months for high-temp processes)
- **Always confirm 3 dimensions**: ID × OD × CS

## FAQ

**Q1. Kalrez or Chemraz — which should I choose?**
Kalrez is the standard for most semiconductor processes. For high-temperature, high-pressure applications where compression set is critical, certain Chemraz grades may outperform. Share your process conditions and we will recommend the optimal grade.

**Q2. How do I identify the material of O-rings currently in use?**
Check the surface marking or part number. If unmarked, send a sample and OHI Tech will analyze the material and recommend alternatives.

**Q3. Are small-quantity and rush orders available?**
Yes — single-piece orders and rush supply are both possible. Share the dimensions (ID × OD × CS) and material grade and we will confirm stock immediately. Contact: jino.kim@ohitech.co.kr`,
      zh: `一个O形圈材料选错，就会引发腔室漏气、颗粒污染和设备停机。选材失误比想象中更常见。

OHI Tech向半导体晶圆厂供应Viton、Kalrez、Chemraz O形圈，亲历了各种选材失误的情形。以下是判断标准。

## 结论：高温等离子体工艺中使用Viton非常危险

Viton超过200°C极限温度后会急剧劣化。ICP刻蚀或ALD（200~350°C）工艺中使用Viton，会导致O形圈早期失效和漏气。

这些环境必须使用Kalrez 6375以上等级。价格差异虽大，但与一次设备停机损失相比，Kalrez明显更经济。

## Viton vs Kalrez vs Chemraz对比

| 项目 | Viton (FKM) | Kalrez (FFKM) | Chemraz (FFKM) |
|------|------------|--------------|----------------|
| **耐热性** | -20~200°C | -20~327°C | -20~316°C |
| **化学耐性** | 烃类·酸·油 | 几乎所有化学品 | 几乎所有化学品 |
| **耐等离子体** | 中等 | 极高 | 极高 |
| **压缩永久变形** | 中 | 低 | 部分等级低于Kalrez |
| **价格** | 低 | 极高 | 高（略低于Kalrez） |
| **主要用途** | PVD、低温CVD | ICP、ALD、腐蚀性气体 | 高温高压密封 |

## 各工艺O形圈选材标准

| 工艺 | 温度 | 主要气体 | 推荐材料 |
|------|------|---------|---------|
| 等离子刻蚀(CCP) | 80~150°C | Cl₂, HBr, CF₄ | Kalrez, Chemraz |
| 等离子刻蚀(ICP) | 150~250°C | SF₆, NF₃ | Kalrez 6375+ |
| PECVD | 200~400°C | SiH₄, NH₃ | Kalrez 6221 |
| 离子注入 | 常温~100°C | BF₃, AsH₃ | Kalrez |
| 溅射(PVD) | 100~200°C | Ar, N₂ | Viton或Kalrez |
| ALD | 200~350°C | TMA, H₂O | Kalrez 6375+ |

## 最常见的3种选材失误

**失误1：ICP刻蚀腔室使用Viton**
超过250°C时Viton劣化，碎片污染腔室。须更换为Kalrez 6375+。

**失误2：只确认内径(ID)**
O形圈尺寸需同时确认ID（内径）、OD（外径）、CS（截面直径）三项。CS不符会导致密封力不足。

**失误3：忽略预防性更换周期**
PM周期不更换O形圈，劣化的O形圈会产生颗粒。外观完好也须按周期预防性更换。

## 常见问题 (FAQ)

**Q1. Kalrez和Chemraz该选哪个？**
大多数半导体工艺以Kalrez为标准。高温高压场景对压缩永久变形要求严格时，特定Chemraz等级可能更优。告知工艺条件，我们将推荐最优等级。

**Q2. 如何确认现有O形圈的材料？**
通过表面刻字或零件编号确认。无刻字时，寄样品给OHI Tech，我们将分析材料并推荐替代品。

**Q3. 能接受小批量和急单吗？**
单件起订和急单均可。告知尺寸（ID×OD×CS）和材料等级，我们将即时确认库存。联系邮箱：jino.kim@ohitech.co.kr`,
    },
  },
  {
    slug: "thermal-management",
    category: "thermal-management",
    relatedProductPath: "thermal-management",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-28"),
    title: {
      ko: "Vapor-Pad·NMVC 방열 소재 비교 (2026) — 피크온도 44% 저감·5G 간섭 없는 베이퍼챔버",
      en: "Vapor-Pad vs Traditional Thermal Pad (2026) — 44% Peak Temperature Reduction & NMVC Zero-RF Vapor Chamber",
      zh: "Vapor-Pad·NMVC散热材料对比(2026) — 峰值温度降低44%·无5G干扰均热板",
    },
    description: {
      ko: "Xerendipity Vapor-Pad™는 기존 패드 대비 피크온도를 44% 저감합니다(73.6°C→40.8°C). NMVC™는 5G/Wi-Fi RF 간섭 없이 구리 대비 80% 경량. OHI Tech가 두 제품을 한국에 공급합니다.",
      en: "Xerendipity Vapor-Pad™ reduces peak temperature by 44% vs standard pads (73.6°C→40.8°C). NMVC™ is 80% lighter than copper with zero RF interference for 5G/Wi-Fi. OHI Tech supplies both products in Korea.",
      zh: "Xerendipity Vapor-Pad™比传统热垫峰值温度降低44%（73.6°C→40.8°C）。NMVC™比铜轻80%，无5G/Wi-Fi RF干扰。OHI Tech在韩国供应两款产品。",
    },
    keywords: {
      ko: ["Vapor-Pad", "NMVC", "열전도 패드", "방열 소재", "베이퍼챔버", "열관리", "TIM", "AI 서버 방열", "5G 방열", "웨어러블 방열", "Xerendipity", "T-Global"],
      en: ["Vapor-Pad", "NMVC", "thermal pad", "heat dissipation", "vapor chamber", "thermal management", "TIM", "AI server cooling", "5G thermal", "wearable thermal", "Xerendipity"],
      zh: ["Vapor-Pad", "NMVC", "导热垫", "散热材料", "均热板", "热管理", "TIM", "AI服务器散热", "5G散热", "可穿戴散热", "Xerendipity"],
    },
    body: {
      ko: `방열 패드를 교체했을 뿐인데 피크온도가 73.6°C에서 40.8°C로 떨어졌습니다.

OHI Tech는 Xerendipity(T-Global 자회사) 한국 파트너로서 Vapor-Pad™와 NMVC™를 공급하면서 실제 현장에서 온도 데이터를 직접 확인했습니다. 이 글에서는 두 제품의 구조와 성능 차이, 용도별 선택 기준을 공유합니다.

## Vapor-Pad™는 왜 일반 열전도 패드보다 44% 낮은 온도를 기록했나요

Vapor-Pad™는 수직 열전도(Z축)와 수평 열확산(XY축)을 동시에 처리하는 하이브리드 구조 패드입니다.

일반 패드는 Z축 단방향으로만 열을 빼냅니다. Vapor-Pad™는 Z-Conduct와 XY-Spread 두 경로를 동시에 사용해 핫스팟을 면적 전체로 분산시킵니다.

![Vapor-Pad™ Multi-Axis Heat Flow — Z-Conduct + XY-Spread 동시 열확산 구조](/images/insights/vapor-pad-multiaxis.png)

**Vapor-Pad™ 주요 스펙:**
- 면내 열전도율 Kxy: 800~1,200 W/m·K
- 수직 열전도율 Kz: 15~25 W/m·K
- 두께: 0.25~5.0mm
- 동작 온도: -30~+105°C
- 실리콘 프리(Silicone-free), SGS 인증

## Vapor-Pad™ 벤치마크 — 동일 조건에서 피크온도 44% 저감

![Surface Temperature Benchmark — Traditional Pad 73.6°C vs Vapor-Pad™ 40.8°C](/images/insights/vapor-pad-benchmark.png)

50x50mm 샘플, 10x10mm 히터, 20분 조건에서 측정한 결과입니다. 일반 패드는 핫스팟이 중심에 집중된 반면, Vapor-Pad™는 열이 균등하게 분산된 것을 열화상으로 확인할 수 있습니다.

## Vapor-Pad™ vs 일반 열전도 패드 비교

| 항목 | 일반 열전도 패드 | Vapor-Pad™ |
|------|--------------|-----------|
| 수직 열전도율(Kz) | 3~15 W/m·K | 15~25 W/m·K |
| 면내 열전도율(Kxy) | 3~5 W/m·K | 800~1,200 W/m·K |
| 열확산 방향 | Z축 단방향 | Z축 + XY축 동시 |
| 피크온도 (벤치마크) | 73.6°C | 40.8°C |
| 실리콘 함유 | 있음 | 없음 (Silicone-free) |
| 두께 범위 | 0.3~3mm | 0.25~5.0mm |
| 인증 | - | SGS Certified |

## NMVC™가 5G·웨어러블 기기에 적합한 이유

NMVC™(Non-Metal Vapor Chamber)는 금속을 사용하지 않아 RF 신호 간섭이 없고, 기존 구리 베이퍼챔버 대비 80% 가볍습니다.

![NMVC™ — Zero RF Interference, 80% Lighter Than Copper, Design Freedom](/images/insights/nmvc-intro.png)

기존 구리 베이퍼챔버는 5G·Wi-Fi·GPS 신호를 차단하고 무거워서 안테나 근방 배치가 어렵습니다. NMVC™는 비금속 소재로 전기전도성이 없어 안테나 바로 옆에도 배치할 수 있고, 두께 0.15~0.35mm의 초박형 유연 구조로 복잡한 3D 설계에도 적용됩니다.

**NMVC™ CPU 성능 벤치마크:** 3,822 (NMVC) vs 2,600 (기존 VC) — 서멀 스로틀링 감소로 지속 성능 47% 향상

## NMVC™ vs 기존 베이퍼챔버 비교

| 항목 | 기존 구리 베이퍼챔버 | NMVC™ |
|------|-----------------|------|
| 소재 | 구리 | 비금속 |
| 무게 | 기준 | 80% 경량 |
| 두께 | 0.3~0.5mm | 0.15~0.35mm |
| 유연성 | 없음 | 있음 |
| RF 간섭 | 있음 | 없음 |
| 5G/Wi-Fi 근방 배치 | 제한 | 가능 |
| CPU 지속 성능 | 2,600 | 3,822 |
| RoHS | - | 준수 |

## 용도별 소재 선택 기준

AI 서버·고출력 전력 소자에는 Vapor-Pad™, 5G 기기·웨어러블에는 NMVC™를 선택합니다.

1. GPU·CPU 패키지, AI 서버 냉각판 → Vapor-Pad™ (Kxy 800~1,200 W/m·K)
2. 5G 스마트폰, 웨어러블, 위성 통신 모듈 → NMVC™ (RF 간섭 없음, 초박형)
3. EV 배터리 셀 간 열관리 → Vapor-Pad™ 0.5~2mm (압축성·절연 동시 확보)
4. IoT 센서·복잡 곡면 기기 → NMVC™ (유연 구조, 3D 밀착)

## 자주 묻는 질문 (FAQ)

**Q1. Vapor-Pad™와 일반 실리콘 패드의 차이가 뭔가요?**
Vapor-Pad™는 실리콘을 사용하지 않고(Silicone-free), XY 방향 열확산 기능을 추가해 피크온도를 44% 낮춥니다. 일반 실리콘 패드는 Z축 단방향 열전도만 가능해 핫스팟이 집중되기 쉽습니다.

**Q2. NMVC™를 5G 안테나 바로 옆에 붙여도 신호 간섭이 없나요?**
NMVC™는 비금속 소재로 전기전도성이 없어 5G·Wi-Fi·GPS 신호를 차단하지 않습니다. 기존 구리 베이퍼챔버를 안테나 근방에 배치하면 수신 감도가 떨어지지만 NMVC™는 해당 제약이 없습니다.

**Q3. 두 제품 모두 국내 재고 공급이 가능한가요?**
OHI Tech는 Xerendipity(T-Global 자회사) 한국 파트너로 Vapor-Pad™와 NMVC™를 공급합니다. 적용 환경(전력 밀도, 기기 구조, 온도 조건)을 알려주시면 적합한 두께와 규격을 제안하고 샘플을 제공해 드립니다.

**Q4. NMVC™ Qmax 10W 미만이면 AI 서버 GPU에는 쓸 수 없나요?**
현재 NMVC™의 Qmax 상한이 10W 미만이라 AI 서버 GPU(수백 W급)에는 단독 적용이 어렵습니다. GPU에는 Vapor-Pad™를 권장합니다. NMVC™는 스마트폰·웨어러블·소형 IoT 기기에 최적화된 제품입니다.

방열 소재 선택에 대한 문의나 샘플 테스트가 필요하시면 OHI Tech에 연락해 주세요. jino.kim@ohitech.co.kr`,
      en: `Swapping the thermal pad dropped peak temperature from 73.6°C to 40.8°C — a 44% reduction under identical test conditions.

OHI Tech supplies Vapor-Pad™ and NMVC™ as the Korean partner for Xerendipity (T-Global subsidiary). Here is what we confirmed in practice: the structure behind the numbers, and how to choose between the two products.

## Why Does Vapor-Pad™ Run 44% Cooler Than a Standard Thermal Pad?

Vapor-Pad™ handles both vertical heat conduction (Z-axis) and in-plane heat spreading (XY-axis) simultaneously — a hybrid structure standard pads cannot match.

Standard pads move heat in one direction: straight up (Z-axis only). Vapor-Pad™ uses Z-Conduct and XY-Spread simultaneously to distribute hotspots across the entire contact area.

![Vapor-Pad™ Multi-Axis Heat Flow — Z-Conduct + XY-Spread simultaneous heat distribution](/images/insights/vapor-pad-multiaxis.png)

**Vapor-Pad™ key specs:**
- In-plane thermal conductivity Kxy: 800–1,200 W/m·K
- Through-plane thermal conductivity Kz: 15–25 W/m·K
- Thickness: 0.25–5.0mm
- Operating temperature: -30 to +105°C
- Silicone-free, SGS Certified

## Vapor-Pad™ Benchmark — 44% Peak Temperature Reduction

![Surface Temperature Benchmark — Traditional Pad 73.6°C vs Vapor-Pad™ 40.8°C](/images/insights/vapor-pad-benchmark.png)

Measured on a 50×50mm sample with a 10×10mm heater at 20 minutes under identical conditions. Thermal imaging shows concentrated hotspot with standard pad versus uniform heat distribution with Vapor-Pad™.

## Vapor-Pad™ vs Standard Thermal Pad

| Item | Standard Thermal Pad | Vapor-Pad™ |
|------|---------------------|-----------|
| Through-plane conductivity (Kz) | 3–15 W/m·K | 15–25 W/m·K |
| In-plane conductivity (Kxy) | 3–5 W/m·K | 800–1,200 W/m·K |
| Heat flow direction | Z-axis only | Z + XY simultaneous |
| Peak temperature (benchmark) | 73.6°C | 40.8°C |
| Silicone content | Yes | No (Silicone-free) |
| Thickness range | 0.3–3mm | 0.25–5.0mm |
| Certification | — | SGS Certified |

## Why NMVC™ Is the Right Choice for 5G Devices and Wearables

NMVC™ (Non-Metal Vapor Chamber) uses no metal, so it produces zero RF interference — and weighs 80% less than a copper vapor chamber.

![NMVC™ — Zero RF Interference, 80% Lighter Than Copper, Design Freedom](/images/insights/nmvc-intro.png)

Copper vapor chambers block 5G/Wi-Fi/GPS signals and cannot be placed near antennas. NMVC™ is electrically non-conductive, so it can sit directly adjacent to antenna structures. At 0.15–0.35mm thick with a flexible form factor, it integrates into complex 3D layouts where rigid copper cannot.

**NMVC™ CPU performance benchmark:** 3,822 (NMVC) vs 2,600 (copper VC) — 47% higher sustained performance due to reduced thermal throttling.

## NMVC™ vs Copper Vapor Chamber

| Item | Copper Vapor Chamber | NMVC™ |
|------|---------------------|------|
| Material | Copper | Non-metal |
| Weight | Baseline | 80% lighter |
| Thickness | 0.3–0.5mm | 0.15–0.35mm |
| Flexibility | Rigid | Flexible |
| RF interference | Yes | None |
| Antenna-adjacent placement | Restricted | Possible |
| Sustained CPU performance | 2,600 | 3,822 |
| RoHS compliance | — | Yes |

## How to Choose: Application-Based Selection Guide

Vapor-Pad™ for AI servers and high-power electronics; NMVC™ for 5G devices and wearables.

1. GPU/CPU packages, AI server cold plates → Vapor-Pad™ (Kxy 800–1,200 W/m·K)
2. 5G smartphones, wearables, satellite communication modules → NMVC™ (zero RF, ultra-thin)
3. EV battery cell-to-cell thermal management → Vapor-Pad™ 0.5–2mm (compressible + insulating)
4. IoT sensors, complex curved surfaces → NMVC™ (flexible, 3D conformal)

## FAQ

**Q1. What is the difference between Vapor-Pad™ and a standard silicone pad?**
Vapor-Pad™ is silicone-free and adds XY-direction heat spreading, reducing peak temperature by 44%. Standard silicone pads only conduct heat in one direction (Z-axis), which concentrates hotspots.

**Q2. Can NMVC™ be placed directly next to a 5G antenna without signal degradation?**
Yes. NMVC™ is electrically non-conductive — it does not attenuate 5G, Wi-Fi, or GPS signals. Copper vapor chambers placed near antennas reduce receive sensitivity; NMVC™ does not have this limitation.

**Q3. Are both products available from domestic inventory in Korea?**
OHI Tech supplies Vapor-Pad™ and NMVC™ as the Korean partner for Xerendipity. Share your application requirements (power density, device structure, temperature conditions) and we will recommend the right thickness and spec with a sample. Contact: jino.kim@ohitech.co.kr

**Q4. NMVC™ Qmax is under 10W — can it be used in AI server GPUs?**
Not as a standalone solution. Current NMVC™ Qmax is under 10W, which is insufficient for GPU-class loads (hundreds of watts). For GPU applications, Vapor-Pad™ is the correct choice. NMVC™ is optimized for smartphones, wearables, and small IoT devices.`,
      zh: `只是更换了散热垫，峰值温度就从73.6°C降至40.8°C——在相同测试条件下降低了44%。

OHI Tech作为Xerendipity（T-Global子公司）韩国合作伙伴，供应Vapor-Pad™和NMVC™。以下是我们在实际应用中确认的数据，以及两款产品的选型指南。

## Vapor-Pad™为何比普通导热垫低44%的峰值温度？

Vapor-Pad™同时处理垂直导热（Z轴）和平面热扩散（XY轴），是普通导热垫无法实现的混合结构。

普通导热垫只在Z轴单向传热。Vapor-Pad™同时使用Z-Conduct和XY-Spread两条路径，将热点分散到整个接触面积。

![Vapor-Pad™多轴热流结构 — Z-Conduct + XY-Spread同时热扩散](/images/insights/vapor-pad-multiaxis.png)

**Vapor-Pad™主要规格：**
- 面内导热率Kxy：800~1,200 W/m·K
- 垂直导热率Kz：15~25 W/m·K
- 厚度：0.25~5.0mm
- 工作温度：-30~+105°C
- 无硅（Silicone-free），SGS认证

## Vapor-Pad™基准测试 — 峰值温度降低44%

![表面温度基准测试 — 传统热垫73.6°C vs Vapor-Pad™ 40.8°C](/images/insights/vapor-pad-benchmark.png)

在50×50mm样品、10×10mm加热器、20分钟相同条件下测量。热成像显示普通热垫热点集中，而Vapor-Pad™热量均匀分布。

## Vapor-Pad™ vs 普通导热垫对比

| 项目 | 普通导热垫 | Vapor-Pad™ |
|-----|---------|-----------|
| 垂直导热率(Kz) | 3~15 W/m·K | 15~25 W/m·K |
| 面内导热率(Kxy) | 3~5 W/m·K | 800~1,200 W/m·K |
| 导热方向 | Z轴单向 | Z轴+XY轴同时 |
| 峰值温度（基准测试）| 73.6°C | 40.8°C |
| 含硅 | 是 | 否（无硅） |
| 厚度范围 | 0.3~3mm | 0.25~5.0mm |
| 认证 | — | SGS认证 |

## NMVC™适用于5G设备和可穿戴设备的原因

NMVC™（非金属均热板）不使用金属，因此零RF干扰，比铜均热板轻80%。

![NMVC™ — 零RF干扰，比铜轻80%，设计自由度高](/images/insights/nmvc-intro.png)

铜均热板会屏蔽5G/Wi-Fi/GPS信号，且无法安装在天线附近。NMVC™无电导性，可直接放置在天线结构旁边。厚度仅0.15~0.35mm，柔性结构，可适应复杂3D设计。

**NMVC™ CPU性能基准测试：** 3,822（NMVC）vs 2,600（铜均热板）— 减少热节流，持续性能提升47%。

## NMVC™ vs 铜均热板对比

| 项目 | 铜均热板 | NMVC™ |
|-----|--------|------|
| 材料 | 铜 | 非金属 |
| 重量 | 基准 | 轻80% |
| 厚度 | 0.3~0.5mm | 0.15~0.35mm |
| 柔韧性 | 无 | 有 |
| RF干扰 | 有 | 无 |
| 天线旁安装 | 受限 | 可以 |
| 持续CPU性能 | 2,600 | 3,822 |
| RoHS合规 | — | 是 |

## 用途别选型指南

AI服务器和高功率电子设备选Vapor-Pad™；5G设备和可穿戴设备选NMVC™。

1. GPU/CPU封装、AI服务器冷板 → Vapor-Pad™（Kxy 800~1,200 W/m·K）
2. 5G智能手机、可穿戴设备、卫星通信模块 → NMVC™（零RF，超薄）
3. EV电池电芯间热管理 → Vapor-Pad™ 0.5~2mm（可压缩+绝缘）
4. IoT传感器、复杂曲面设备 → NMVC™（柔性，3D贴合）

## 常见问题(FAQ)

**Q1. Vapor-Pad™和普通硅胶垫有什么区别？**
Vapor-Pad™无硅，增加XY方向热扩散功能，峰值温度降低44%。普通硅胶垫只能Z轴单向导热，容易形成热点集中。

**Q2. NMVC™紧贴5G天线安装会有信号干扰吗？**
NMVC™无电导性，不衰减5G、Wi-Fi或GPS信号。铜均热板安装在天线附近会降低接收灵敏度，NMVC™没有此限制。

**Q3. 两款产品在韩国都有现货供应吗？**
OHI Tech作为Xerendipity韩国合作伙伴，供应Vapor-Pad™和NMVC™。请告知应用需求（功率密度、设备结构、温度条件），我们将推荐合适规格并提供样品。联系邮箱：jino.kim@ohitech.co.kr`,
    },
  },
  {
    slug: "ev-charging",
    category: "ev-charging",
    relatedProductPath: "ev-charging",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "물류창고·공장 EV 충전 인프라 구축 — AC·DC 선택과 보조금 실가이드",
      en: "Industrial EV Charging for Warehouses & Factories — AC vs DC Selection and Subsidy Guide",
      zh: "物流仓库·工厂EV充电基础设施建设 — AC/DC选型与补贴实用指南",
    },
    description: {
      ko: "OHI Tech가 물류창고·공장·상업용 주차장에 EV 충전 인프라를 구축하며 확인한 AC·DC 충전기 선택 기준, 실제 도입 비용, 2026년 환경부 보조금 활용법을 공유합니다.",
      en: "Based on OHI Tech's industrial EV charging projects, we share AC vs DC charger selection criteria, real installation costs, and 2026 government subsidy strategies for warehouses, factories, and commercial facilities.",
      zh: "基于OHI Tech工业EV充电项目经验，分享AC/DC充电桩选型标准、实际导入成本及2026年政府补贴申请要点。",
    },
    keywords: {
      ko: ["EV 충전기", "산업용 충전기", "상업용 EV 충전", "DC 급속 충전기", "AC 완속 충전기", "충전소 구축", "B2B EV 충전", "물류창고 충전", "전기차 충전 보조금", "OCPP 충전 관리"],
      en: ["EV charger", "industrial EV charging", "commercial EV charging", "DC fast charger", "AC Level 2", "charging station installation", "B2B EV charging", "EV subsidy Korea"],
      zh: ["EV充电桩", "工业充电站", "商业EV充电", "DC快充", "AC慢充", "充电站建设", "B2B充电", "物流园区充电", "OCPP充电管理"],
    },
    body: {
      ko: `**교대 근무가 있는 물류창고는 DC 급속 충전기(50kW+)가 필수이고, 장시간 주차가 가능한 공장·오피스는 AC 완속으로 충분합니다.** 충전 방식을 잘못 선택하면 교대 시간 내 충전 완료가 불가능하거나 설치 비용이 불필요하게 높아집니다. OHI Tech가 산업용·상업용 사업장에 EV 충전 인프라를 직접 구축하며 확인한 선택 기준, 실제 비용, 2026년 보조금 활용법을 공유합니다.

---

## AC vs DC 충전기 — 사업장 유형별 정답이 다릅니다

**교대 근무가 있는 물류창고는 DC 급속 충전기가 필수이고, 종일 주차가 가능한 공장이나 오피스는 AC 완속으로도 충분합니다.**

충전기 출력이 높을수록 공사비와 장비비가 급격히 상승합니다. 용도에 맞지 않는 충전기를 선택하면 예산 낭비가 발생합니다.

[이미지: 충전기_타입별_비교_다이어그램]

## 충전기 타입별 비교 — 한눈에 정리

![OHI Tech EV Charger 라인업 — AC Level 2·DC Fast·DC High Power·DZ Modular Series, LG전자 공식 납품](/images/insights/ev-charger-lineup.png)

| 타입 | 출력 | 50kWh 충전 시간 | 주요 적용 사례 |
|------|------|--------------|-------------|
| AC 완속 (7kW) | 7kW | 약 7시간 | 오피스 주차장, 직원 전용 |
| AC 완속 (22kW) | 22kW | 약 2.5시간 | 공장·쇼핑몰 복합 사용 |
| DC 급속 (50kW) | 50kW | 약 60분 | 소형 배송 차량, 물류 허브 |
| DC 급속 (150kW) | 150kW | 약 20분 | 전기버스, 대형 배송 트럭 |
| DC 초급속 (350kW) | 350kW | 약 9분 | 대형 전기트럭, 플릿 터미널 |

배터리 용량 100kWh 이상의 전기 트럭은 DC 150kW 이상 충전기 없이는 교대 근무 사이클(4~6시간) 내 완충이 어렵습니다.

---

## 사업장 유형별 권장 구성

### 물류창고·배송센터
**핵심 과제는 교대 근무 간 배터리 완충**입니다. 충전 시간이 운영 사이클 안에 들어오지 못하면 차량 가동률이 떨어집니다.

권장 구성 예시:
- 대형 전기트럭(300kWh 이상): DC 350kW × 2~4기
- 소형 배송 차량(60~100kWh): DC 50~150kW × 4~8기
- 전동 지게차: AC 22kW × 필요 수량

### 공장·제조업체
직원 주차장 기준 주차 시간이 8시간 이상이면 AC 22kW로도 대부분 완충 가능합니다. 주차 공간의 **20~30%에 AC 충전기**를 배치하는 것을 권장합니다.

임원·방문객용으로 DC 50kW 1~2기를 추가하면 유연하게 대응할 수 있습니다.

### 상업용 주차장
주차 시간 중 충전 요금으로 추가 수익을 창출하는 모델입니다. 평균 주차 시간이 2시간 미만이면 DC 급속, 3시간 이상이면 AC 완속이 투자 회수에 유리합니다.

---

## 실제 구축 비용 — 장비비와 공사비

| 항목 | 비용 범위 |
|------|---------|
| AC 7kW 충전기 (1기, 설치 포함) | 100~300만원 |
| AC 22kW 충전기 (1기, 설치 포함) | 300~700만원 |
| DC 50kW 충전기 (1기, 설치 포함) | 2,000~4,000만원 |
| DC 150kW 이상 (1기, 설치 포함) | 5,000~1억원 이상 |
| 계약전력 증설 공사 | 500~5,000만원 (현장 조건 따라 상이) |
| OCPP 과금 관리 시스템 | 100~500만원/년 |

OHI Tech 경험 기준, **가장 간과하기 쉬운 비용은 계약전력 증설 공사비**입니다. DC 급속 충전기 여러 기를 동시에 운영하면 전기 기본요금이 급증할 수 있으므로, ESS(에너지 저장 시스템) 연계 방식도 함께 검토하는 것이 좋습니다.

---

## 2026년 환경부 보조금 활용법

보조금 지원 금액과 조건은 연도별·지자체별로 달라지며 매년 초 환경부·지자체 공고를 통해 확정됩니다. 반드시 환경부 무공해차 통합누리집(ev.or.kr) 또는 관할 지자체 공고를 직접 확인하십시오.

주요 지원 항목 유형:
- **AC 완속 충전기**: 기당 정액 지원
- **DC 급속 충전기**: 기당 정액 지원 (AC 대비 높은 수준)
- **사업장 설치 추가 인센티브**: 노후 건물, 취약지역 설치 시 가산 지원 가능

보조금은 **선착순 마감**이 대부분이므로 상반기 초(1~2월) 신청이 유리합니다. OHI Tech는 보조금 신청 서류 준비부터 인허가 대행까지 지원합니다.

---

## 자주 묻는 질문 (FAQ)

**Q1. AC 완속과 DC 급속 중 어느 것이 더 경제적인가요?**
A. 초기 투자 기준으로는 AC 완속이 압도적으로 저렴합니다. 하지만 차량이 교대 근무 사이에 완충되어야 한다면 DC 급속이 불가피합니다. 주차 가능 시간이 6시간 이상이라면 AC 22kW, 그 이하라면 DC 급속을 권장합니다.

**Q2. 건물 계약전력을 반드시 증설해야 하나요?**
A. DC 50kW 이상 충전기를 복수 운영한다면 대부분 계약전력 증설이 필요합니다. 단, ESS(에너지 저장 시스템)를 연계하면 피크 전력을 억제해 계약전력 증설 없이 운영 가능한 경우도 있습니다. 현장 조건에 따라 달라지므로 OHI Tech에 사전 진단을 요청하세요.

**Q3. OCPP 충전 관리 시스템이 반드시 필요한가요?**
A. 충전기 10기 이상이거나 외부 사용자에게 요금을 부과해야 한다면 OCPP 기반 관리 시스템은 필수입니다. 사내 직원 전용 10기 미만이라면 단순 ON/OFF 제어만으로도 운영이 가능합니다.

**Q4. 보조금 신청은 어떻게 시작하나요?**
A. 환경부 무공해차 통합누리집(ev.or.kr)에서 연도별 지원 공고를 확인하고, OHI Tech에 설치 상담을 요청하시면 서류 준비부터 신청까지 대행해드립니다.

---

EV 충전 인프라 도입에 대한 추가 문의나 현장 진단이 필요하시면 OHI Tech에 연락해 주세요. 실제 사업장 조건을 확인한 후 최적 충전기 구성과 보조금 활용 계획을 안내드립니다.

문의: jino.kim@ohitech.co.kr`,
      en: `Is your electric truck fleet falling short on charge during shift changes? Or are you unsure whether to install AC or DC chargers at your factory parking lot?

This article shares what OHI Tech has learned from hands-on industrial EV charging infrastructure projects — covering charger selection criteria, real installation costs, and how to maximize 2026 government subsidies.

---

## AC vs DC Chargers — The Right Answer Depends on Your Site

**Warehouses with shift schedules need DC fast chargers. Factories and offices with all-day parking can often get by with AC chargers.**

Higher-output chargers mean sharply higher equipment and installation costs. Choosing the wrong type wastes budget.

## Charger Type Comparison

| Type | Output | Time to Charge 50kWh | Best Use Case |
|------|--------|---------------------|---------------|
| AC Level 2 (7kW) | 7kW | ~7 hours | Office parking, employee dedicated |
| AC Level 2 (22kW) | 22kW | ~2.5 hours | Factory / mixed-use parking |
| DC Fast (50kW) | 50kW | ~60 min | Small delivery vehicles, logistics hubs |
| DC Fast (150kW) | 150kW | ~20 min | Electric buses, large delivery trucks |
| DC Ultra-Fast (350kW) | 350kW | ~9 min | Heavy-duty electric trucks, fleet terminals |

Electric trucks with 100+ kWh batteries generally cannot complete a full charge within a 4–6 hour shift window without a DC 150kW or higher charger.

---

## Site-Specific Configurations

### Warehouses & Distribution Centers
**The core challenge is completing a full charge between shift changes.** If charge time exceeds your operational cycle, vehicle utilization drops.

Recommended configuration example:
- Heavy electric trucks (300kWh+): DC 350kW × 2–4 units
- Small delivery vehicles (60–100kWh): DC 50–150kW × 4–8 units
- Electric forklifts: AC 22kW × as needed

### Factories & Manufacturers
If employees park for 8+ hours, AC 22kW chargers are sufficient for a full charge. We recommend covering **20–30% of parking spaces** with AC chargers.

Add 1–2 DC 50kW units for executive and visitor use to cover shorter dwell times.

### Commercial Parking Facilities
This model generates additional revenue from charging fees during parking. If average dwell time is under 2 hours, DC fast chargers maximize revenue; 3+ hours favors AC chargers for ROI.

---

## Real Installation Costs

| Item | Cost Range |
|------|-----------|
| AC 7kW charger (1 unit, installed) | KRW 1–3M |
| AC 22kW charger (1 unit, installed) | KRW 3–7M |
| DC 50kW charger (1 unit, installed) | KRW 20–40M |
| DC 150kW+ charger (1 unit, installed) | KRW 50M–100M+ |
| Electrical capacity upgrade | KRW 5M–50M (site-dependent) |
| OCPP charge management system | KRW 1–5M/year |

The most commonly underestimated cost is the **electrical capacity upgrade**. Running multiple DC fast chargers simultaneously can dramatically increase demand charges. An ESS (Energy Storage System) integration can suppress peak demand and may eliminate the need for a capacity upgrade in some cases.

---

## 2026 Government Subsidies

Subsidy amounts and eligibility change annually and vary by municipality — always verify via the official Ministry of Environment EV portal (ev.or.kr) or your local government's announcement for the current year.

Key support categories:
- **AC chargers**: per-unit fixed subsidy
- **DC fast chargers**: per-unit subsidy at a higher level than AC
- **Additional incentives**: older buildings or underserved areas may qualify for higher support

Most subsidies are **first-come, first-served** and run out early — applying in January or February significantly increases your chances. OHI Tech handles subsidy paperwork and permit applications on your behalf.

---

## FAQ

**Q1. Which is more cost-effective: AC or DC chargers?**
A. AC chargers win on upfront cost by a wide margin. But if vehicles must be fully charged between shifts, DC fast chargers are unavoidable. If parking time exceeds 6 hours, AC 22kW works well; shorter dwell times require DC fast charging.

**Q2. Do I always need to upgrade my electrical contract capacity?**
A. If you're running multiple DC 50kW+ chargers simultaneously, a capacity upgrade is usually necessary. However, pairing chargers with an ESS can suppress peak demand, making upgrades avoidable in some cases. Contact OHI Tech for a site assessment.

**Q3. Is an OCPP charge management system mandatory?**
A. It's essential if you have 10+ chargers or need to bill external users. For fewer than 10 chargers used exclusively by employees, simple ON/OFF control is sufficient.

**Q4. How do I start the subsidy application process?**
A. Check the Ministry of Environment's EV portal (ev.or.kr) for annual subsidy announcements, then contact OHI Tech — we handle everything from document preparation to application filing.

---

For questions about EV charging infrastructure or a free site assessment, contact OHI Tech. We'll review your facility conditions and provide a tailored charger configuration with a subsidy optimization plan.

Contact: jino.kim@ohitech.co.kr`,
      zh: `您的电动卡车在班次交替时电量不足？还是不确定工厂停车场该安装AC还是DC充电桩？

本文分享OHI Tech在工业EV充电基础设施项目中积累的实际经验，涵盖充电桩选型标准、真实建设成本及2026年政府补贴申请要点。

---

## AC与DC充电桩 — 正确答案取决于您的场地

**有班次轮换的物流仓库必须使用DC快充，工厂和办公楼全天停车可用AC慢充。**

输出功率越高，设备费和施工费急剧上升。选错类型会造成预算浪费。

## 充电桩类型对比

| 类型 | 功率 | 充满50kWh时间 | 主要适用场景 |
|------|------|------------|-----------|
| AC慢充（7kW） | 7kW | 约7小时 | 办公楼停车场、员工专用 |
| AC慢充（22kW） | 22kW | 约2.5小时 | 工厂·商业综合体 |
| DC快充（50kW） | 50kW | 约60分钟 | 小型配送车辆、物流枢纽 |
| DC快充（150kW） | 150kW | 约20分钟 | 电动公交、大型配送卡车 |
| DC超快充（350kW） | 350kW | 约9分钟 | 重型电动卡车、车队中心 |

电池容量100kWh以上的电动卡车，若没有DC 150kW以上充电桩，通常在4~6小时班次间隔内无法完成充满。

---

## 各类场地推荐配置

### 物流仓库·配送中心
**核心挑战是在班次交替间完成充电。** 若充电时间超过运营周期，车辆利用率将下降。

推荐配置示例：
- 重型电动卡车（300kWh以上）：DC 350kW × 2~4台
- 小型配送车辆（60~100kWh）：DC 50~150kW × 4~8台
- 电动叉车：AC 22kW × 按需配置

### 工厂·制造企业
员工全天停车超过8小时，AC 22kW可满足大部分完全充电需求。建议为**20~30%停车位**配备AC充电桩。

为管理层和访客增加1~2台DC 50kW充电桩，可灵活应对短暂停车需求。

### 商业停车场
停车期间收取充电费用的盈利模式。平均停车时间不足2小时选DC快充，3小时以上选AC慢充回报率更高。

---

## 实际建设成本

| 项目 | 费用范围 |
|------|--------|
| AC 7kW充电桩（1台，含安装） | 费用因现场条件而异，请咨询报价 |
| AC 22kW充电桩（1台，含安装） | 费用因现场条件而异，请咨询报价 |
| DC 50kW充电桩（1台，含安装） | 费用因现场条件而异，请咨询报价 |
| DC 150kW以上（1台，含安装） | 费用因现场条件而异，请咨询报价 |
| 用电容量扩容工程 | 因现场条件差异较大，需现场勘查后报价 |
| OCPP计费管理系统 | 按规模及功能定价，请咨询 |

OHI Tech经验表明，**最容易被忽视的费用是用电容量扩容**。多台DC快充同时运行会大幅增加基本电费。配合ESS（储能系统）可抑制峰值功率，在部分情况下无需扩容。

---

## 常见问题（FAQ）

**Q1. AC慢充与DC快充哪个更经济？**
A. 初期投资方面AC慢充具有压倒性优势。但若车辆需在班次间充满，DC快充不可或缺。停车时间超过6小时选AC 22kW，不足6小时则需DC快充。

**Q2. 必须扩大用电容量合同吗？**
A. 同时运行多台DC 50kW以上充电桩时，通常需要扩容。但配合ESS可抑制峰值用电，部分场景无需扩容。请联系OHI Tech进行现场诊断。

**Q3. OCPP充电管理系统是必须的吗？**
A. 充电桩超过10台或需向外部用户收费时为必须。10台以下员工专用场景，简单开关控制即可满足运营需求。

**Q4. 如何开始申请补贴？**
A. 请查询环境部EV综合平台的年度补贴公告，联系OHI Tech后我们将代为准备申请文件至提交全流程。

---

如需进一步咨询EV充电基础设施或现场诊断，欢迎联系OHI Tech。确认实际场地条件后，我们将提供最优充电桩配置及补贴申请方案。

联系方式：jino.kim@ohitech.co.kr`,
    },
  },
  {
    slug: "waterjet-laser",
    category: "laser-equipment",
    relatedProductPath: "laser-equipment",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "워터젯 레이저 완벽 가이드 — 반도체·세라믹·금속 정밀 가공의 새로운 기준",
      en: "Complete Guide to Waterjet Laser Machining — The New Standard for Semiconductor, Ceramic & Metal Precision Processing",
      zh: "水导激光完全指南 — 半导体、陶瓷与金属精密加工的新标准",
    },
    description: {
      ko: "전반사 원리를 이용한 워터젯 레이저(수도 레이저)의 동작 원리, 기존 레이저와의 성능 비교, SiC 웨이퍼·AlN 세라믹·다층 PCB·금속 정밀 가공 사례와 등에너지 펄스 동기 특허 기술을 설명합니다.",
      en: "How waterjet (water-guiding) lasers work via total internal reflection, performance vs conventional lasers, and machining applications for SiC wafers, AlN ceramics, multi-layer PCBs, and precision metals — including the equal-energy pulse synchronous motion patent.",
      zh: "详解水导激光（水波导激光）的全反射工作原理、与传统激光的性能对比，以及SiC晶圆、AlN陶瓷、多层PCB和精密金属加工案例，同步介绍等能量脉冲专利技术。",
    },
    keywords: {
      ko: ["워터젯 레이저", "수도 레이저", "수파 레이저", "water guiding laser", "SiC 절단", "세라믹 레이저 가공", "무열영향 레이저", "반도체 레이저 절단", "AlN 레이저 홀", "레이저 마이크로드릴링"],
      en: ["waterjet laser", "water guiding laser", "water jet guided laser", "SiC wafer dicing", "ceramic laser machining", "no HAZ laser", "laser microdrilling", "AlN laser drilling", "semiconductor laser cutting"],
      zh: ["水导激光", "水波导激光", "水射流激光", "SiC晶圆切割", "陶瓷激光加工", "无热影响区激光", "激光微钻孔", "AlN激光打孔", "半导体激光切割"],
    },
    body: {
      ko: `## 워터젯 레이저(수도 레이저)란?

워터젯 레이저(Water-Guiding Laser, 수도 레이저)는 초고압 수류(水流)를 광학적 도파관으로 활용해 레이저 빔을 소재까지 전달하는 차세대 정밀 가공 기술입니다. 기존 공기 중 레이저가 초점 이탈 시 빔 품질이 급격히 저하되는 단점을 근본적으로 해결하며, 가공 중 발생하는 열과 파티클을 물이 실시간으로 냉각·세정합니다.

SiC(탄화규소), GaN(질화갈륨) 같은 3세대 반도체, AlN·Si₃N₄ 세라믹, 다이아몬드 등 기존 레이저로 가공이 어려웠던 소재를 열영향 없이 정밀 가공할 수 있어 반도체·항공우주·전력전자 분야에서 빠르게 주목받고 있습니다.

## 동작 원리 — 전반사를 이용한 수중 빔 가이딩

워터젯 레이저의 핵심 원리는 광섬유와 동일한 **전반사(Total Internal Reflection)** 현상입니다.

1. ns 그린 레이저(파장 515~532nm)가 집광 렌즈를 통해 초점을 형성합니다.
2. 초고압(50~800 bar)으로 가압된 고순도 탈이온수(DI water)가 직경 20~100μm의 노즐을 통과하며 안정적인 미세 수주(水柱)를 형성합니다.
3. 레이저 빔이 수주 내부에서 전반사를 일으키며 완전한 원통형 경로로 가공 소재까지 직진합니다.
4. 가공 중 발생한 용융물과 파티클은 수류에 의해 즉시 배출됩니다.

유효 작업 거리는 5~50mm이며, 소재 두께와 무관하게 초점 조정 없이 균일한 빔 직경을 유지합니다. 가공 소재 두께 0.01~30mm 범위를 처리합니다.

## 기존 레이저 가공과의 비교

![워터젯 레이저(Solution A) vs 펨토초 레이저(Solution B) 구성 비교 — Hortech | OHI Tech 제안자료](/images/insights/waterjet-solution-config.png)

| 항목 | 기존 레이저 | 워터젯 레이저 |
|------|-----------|-------------|
| 초점 관리 | 초점 이탈 시 품질 저하, 정밀 조정 필요 | 초점 조정 불필요 (전반사 유지) |
| 빔 형태 | 원추형 → 비평행 절단면 | 원통형 → 완전 수직 절단면 |
| 열영향부 (HAZ) | 존재 (재료 변질 위험) | 없음 (수냉 동시 가공) |
| 절단 종횡비 | 제한적 | 고종횡비 (kerf 폭 ≥ 20μm) |
| 파티클 처리 | 별도 세정 필요 | 수류로 실시간 제거 |
| 버(Burr) 발생 | 발생 | 없음 (수압으로 용융물 배출) |
| 3D 가공 | 제한적 | 가능 (비평면 표면 가공) |
| 표면 보호막 | 별도 도포 필요 | 불필요 (수막이 자동 보호) |

## 주요 장비 사양

![HT-WG-LC-Ultra-Precision 워터젯 레이저 기술 사양 — 레이저 소스·모션·비전 전체 스펙 (Hortech | OHI Tech)](/images/insights/waterjet-specs.png)

| 항목 | 사양 |
|------|------|
| **레이저 광원** | ns 그린 레이저 (파장 515~532nm) |
| **출력** | 25 / 50 / 100 W |
| **주파수** | 10~50 kHz |
| **노즐 직경** | Ø 20~100 μm |
| **수압** | 50~800 bar |
| **빔 스폿 크기** | 50 / 80 / 100 / 200 μm (커스텀 가능) |
| **작업 거리** | 5~50 mm |
| **XY 반복 정밀도** | ±3 μm (300×300 mm 기준) / <±2 μm (옵션) |
| **가공 속도** | 최대 300 mm/s |
| **축 구성** | 3 / 4 / 5축 (A/B/C 회전축 옵션) |
| **작업 행정** | 300×300 mm / 500×500 mm / 1000×1000 mm |
| **환경 조건** | 온도 20~22°C, 습도 30~50% |

## 가공 가능 소재

워터젯 레이저는 특히 **경도가 높거나 열에 민감한 소재**에서 탁월한 성능을 발휘합니다.

| 소재 분류 | 대표 소재 |
|---------|---------|
| **3세대 반도체** | SiC (탄화규소), GaN (질화갈륨) |
| **고경도 금속** | 스테인리스, 구리, 알루미늄 (12mm 이상 두께 가능) |
| **세라믹** | AlN, Si₃N₄, ABF 복합 세라믹 |
| **기판류** | 실리콘 웨이퍼, Ge 웨이퍼, 유리 웨이퍼, TGV 기판 |
| **회로기판** | 다층 동박 PCB (8.3mm 두께), 동박 박판 (30μm) |
| **특수 소재** | 다이아몬드, 사파이어, 금속 필터 박막 |

## 주요 가공 사례

![12인치 Si 웨이퍼 포켓 구조 도면 — 워터젯 레이저 적용 대상 (Hortech | OHI Tech 프로젝트)](/images/insights/waterjet-si-wafer-pocket.png)

![워터젯 레이저 가공 워크플로우 — 위치 보정 → 포켓 커팅 → 엣지 트리밍 3단계 (Hortech | OHI Tech)](/images/insights/waterjet-workflow.png)

### 반도체·웨이퍼 가공
- **SiC 웨이퍼 절단**: kerf 폭 ~96μm, 깨끗한 절단면, 열영향부 없음
- **Si 미세 구조**: 인코더 디스크용 방사형 슬롯 (5μm 수준의 미세 가공)
- **Ge 웨이퍼**: 두께 0.2mm, 관통홀 및 블라인드 홀 (직경 >200μm)
- **Si 이형 구조**: 기어 형상, 이형 곡선 등 자유 형상 절단

### 세라믹·고경도 소재
- **AlN / Si₃N₄ 세라믹**: 수직홀 0.2~1mm, 열영향 없는 청정 가공
- **ABF 복합 세라믹**: 수직홀 0.25~1mm 고밀도 배열
- **6061 알루미늄 합금**: 원통형 홀 직경 300μm, 깊이 6mm

### 금속 정밀 가공
- **스테인리스 2mm**: 200μm 직경 수직홀 고밀도 배열
- **다층 동박 PCB 8.3mm**: 완전 수직 절단면 구현
- **동박 / SS316 박판 (30~50μm)**: 고밀도 필터 홀, 열영향 없음
- **구리 / 알루미늄 12mm**: 이형 절단 및 수직 정밀 가공

### 방열 구조 가공
- 금속 블록에 직접 초고밀도 핀 어레이(방열 기둥) 가공
- 반도체 패키지 및 AI 서버용 마이크로채널 히트싱크 제작

## 특허 기술 — 이형 절단과 등에너지 펄스 동기 제어

기존 수도 레이저는 직선 가공에만 적합하다는 한계가 있었습니다. OHI Tech가 공급하는 워터젯 레이저 장비는 **운동 동기형 등에너지 펄스 제어(Equal-Energy Pulse Synchronous with Motion)** 특허 기술을 탑재합니다.

이 기술은 CNC 모션 축의 속도 변화에 관계없이, 가공 경로의 모든 위치에서 동일한 에너지의 레이저 펄스를 조사합니다. 직선뿐 아니라 곡선·기어 형상·비정형 아웃라인 등 자유 형상 가공이 가능하며, 미국(US 8,422,521 B2)·대만·중국·한국·일본·유럽 특허를 보유하고 있습니다.

## 워터젯 레이저 도입 시 체크리스트

| 항목 | 확인 내용 |
|------|---------|
| **소재 특성** | 경도, 취성, 열민감도, 두께 |
| **가공 형상** | 직선/곡선/이형, 홀 직경 및 깊이 |
| **요구 정밀도** | kerf 폭, 수직도, 표면 조도 |
| **생산 규모** | 단품 R&D용 vs 양산 라인 |
| **수처리 환경** | RO/DI 수공급, 배수 처리 |
| **설치 환경** | 진동 격리, 항온항습 조건 |

## 자주 묻는 질문 (FAQ)

**Q1. 워터젯 레이저와 일반 레이저의 가장 큰 차이는 무엇인가요?**
A. 열영향부(HAZ) 유무입니다. 일반 레이저는 가공 열이 소재에 잔류해 결정 구조를 변형시키지만, 워터젯 레이저는 수류가 동시에 냉각하므로 HAZ가 실질적으로 없습니다. SiC·AlN·다이아몬드처럼 열에 민감하거나 균열이 발생하기 쉬운 소재에 결정적인 차이를 만듭니다.

**Q2. SiC 웨이퍼 절단에 워터젯 레이저를 사용하면 실제로 어떤 결과가 나오나요?**
A. OHI Tech 공급 장비 기준 SiC 웨이퍼 절단 시 kerf 폭 약 96μm, 열영향부 없음, 버(burr) 없는 깨끗한 절단면이 구현됩니다. 블레이드 다이싱 대비 칩핑이 대폭 줄어들고, 수류가 절삭 잔여물을 실시간으로 세정해 추가 세정 공정이 필요 없습니다.

**Q3. 워터젯 레이저로 가공할 수 없는 소재가 있나요?**
A. 소재보다 형상·치수가 제약이 됩니다. 노즐 직경 20~100μm 기준 kerf 폭이 그보다 좁을 수는 없고, 소재 두께는 0.01~30mm 범위입니다. 수분에 반응하는 소재(수용성 재료 등)도 주의가 필요합니다. 불확실한 경우 OHI Tech 시험 가공(Feasibility Test)으로 사전 확인이 가능합니다.

**Q4. 이형(곡선·기어 형상) 절단이 가능한가요?**
A. 가능합니다. OHI Tech 공급 장비에 탑재된 **등에너지 펄스 동기 제어(US 8,422,521 B2)** 특허 기술이 CNC 속도 변화에 무관하게 모든 경로에서 동일한 에너지를 유지합니다. 곡선, 기어 아웃라인, 자유 형상 등 이형 가공이 직선과 동일한 품질로 처리됩니다.

---

## OHI Tech 워터젯 레이저 장비 공급

OHI Tech는 워터젯 레이저 장비를 공급하며, 반도체·화합물 반도체(SiC/GaN)·세라믹·금속 정밀 가공 분야의 고객사에 맞춤형 가공 솔루션을 제안합니다. 장비 도입 전 실제 소재로 시험 가공(Feasibility Test)을 진행하여 가공 가능 여부와 품질을 사전 확인할 수 있습니다. 소재 사양과 가공 조건을 알려주시면 최적 장비 구성을 안내드립니다.

문의: jino.kim@ohitech.co.kr`,
      en: `## What Is a Waterjet Laser?

A waterjet laser (water-guiding laser) is a next-generation precision machining technology that uses an ultra-high-pressure water jet as an optical waveguide to deliver the laser beam to the workpiece. It fundamentally overcomes the limitations of conventional air-path lasers — beam quality degradation when focus drifts — while simultaneously cooling and cleaning the machining zone in real time.

Materials that have historically been difficult to process with conventional lasers — third-generation semiconductors like SiC and GaN, AlN and Si₃N₄ ceramics, and diamond — can be precisely machined without any heat damage, making waterjet laser technology increasingly prominent in semiconductor, aerospace, and power electronics applications.

## Operating Principle — Beam Guidance via Total Internal Reflection

The waterjet laser operates on the same principle as optical fiber: **Total Internal Reflection (TIR)**.

1. A pulsed green laser (515–532 nm wavelength) is focused through a converging lens.
2. High-purity DI water, pressurized to 50–800 bar, passes through a nozzle (Ø 20–100 μm) to form a stable micro water jet.
3. The laser beam undergoes total internal reflection inside the water jet, traveling in a perfectly cylindrical path to the workpiece.
4. Molten material and particles generated during machining are immediately expelled by the water flow.

The effective working distance is 5–50 mm, and the beam diameter remains constant regardless of material thickness — no refocusing required. Material thickness range: 0.01–30 mm.

## Waterjet Laser vs Conventional Laser

| Parameter | Conventional Laser | Waterjet Laser |
|-----------|-------------------|----------------|
| Focus management | Requires precise adjustment; quality degrades off-focus | No focus adjustment needed (TIR maintained) |
| Beam shape | Conical → non-parallel kerf walls | Cylindrical → perfectly vertical kerf walls |
| Heat affected zone (HAZ) | Present; risk of material damage | None — simultaneous water cooling |
| Cutting aspect ratio | Limited | High aspect ratio (kerf ≥ 20 μm) |
| Particle handling | Requires separate cleaning | Real-time removal by water flow |
| Burr formation | Common | None — water jet expels molten material |
| 3D machining | Limited | Possible (non-flat surface supported) |
| Surface protection | Separate layer required | Not needed (water film protects) |

## Key Equipment Specifications

| Parameter | Specification |
|-----------|--------------|
| **Laser source** | ns green laser (515–532 nm) |
| **Power** | 25 / 50 / 100 W |
| **Frequency** | 10–50 kHz |
| **Nozzle diameter** | Ø 20–100 μm |
| **Water pressure** | 50–800 bar |
| **Beam spot size** | 50 / 80 / 100 / 200 μm (custom available) |
| **Working distance** | 5–50 mm |
| **XY repeat accuracy** | ±3 μm at 300×300 mm / <±2 μm (optional) |
| **Processing speed** | Max 300 mm/s |
| **Axis configuration** | 3/4/5-axis (A/B/C rotary axes optional) |
| **Work stroke** | 300×300 / 500×500 / 1000×1000 mm |
| **Environment** | 20–22°C, 30–50% RH |

## Processable Materials

Waterjet lasers excel with **hard or thermally sensitive materials** that are difficult to process with conventional lasers.

| Category | Representative Materials |
|----------|------------------------|
| **3rd-gen semiconductors** | SiC, GaN |
| **Hard metals** | Stainless steel, copper, aluminum (12mm+ thickness) |
| **Ceramics** | AlN, Si₃N₄, ABF composite ceramics |
| **Substrates** | Silicon/Ge/glass wafers, TGV substrates |
| **Circuit boards** | Multi-layer copper PCB (8.3mm), copper foil (30μm) |
| **Special materials** | Diamond, sapphire, metal mesh screens |

## Application Examples

### Semiconductor & Wafer Machining
- **SiC wafer dicing**: ~96 μm kerf width, clean edge, zero HAZ
- **Si micro-structures**: Radial slots for encoder discs (5 μm level precision)
- **Ge wafer**: 0.2 mm thick, through-holes and blind holes (>200 μm diameter)
- **Si freeform cutting**: Gear profiles and irregular shapes

### Ceramics & Hard Materials
- **AlN / Si₃N₄ ceramics**: Vertical holes 0.2–1 mm, no thermal damage
- **ABF composite ceramics**: Dense arrays of vertical holes 0.25–1 mm
- **6061 aluminum alloy**: Cylindrical holes Ø300 μm, 6 mm deep

### Precision Metal Machining
- **Stainless steel 2 mm**: 200 μm vertical holes in dense arrays
- **Multi-layer copper PCB 8.3 mm**: Perfectly vertical cut walls
- **Copper / SS316 foil (30–50 μm)**: High-density filter holes, no HAZ
- **Copper / aluminum 12 mm**: Freeform and vertical precision cuts

### Thermal Management Structures
- Direct machining of ultra-fine pin-fin arrays into metal blocks
- Microchannel heat sinks for semiconductor packages and AI server coolers

## Patented Technology — Freeform Cutting & Equal-Energy Pulse Sync

Conventional water-guiding lasers are limited to straight-line processing. The waterjet laser equipment supplied by OHI Tech incorporates **Equal-Energy Pulse Synchronous with Motion** patent technology — delivering consistent laser pulse energy at every position regardless of CNC motion speed changes. This enables curved, gear-shaped, and fully freeform machining paths. Patents held in the US (US 8,422,521 B2), Taiwan, China, Korea, Japan, and EU.

## Waterjet Laser Selection Checklist

| Factor | What to Verify |
|--------|---------------|
| **Material properties** | Hardness, brittleness, thermal sensitivity, thickness |
| **Geometry** | Straight/curved/freeform, hole diameter and depth |
| **Precision requirements** | Kerf width, wall verticality, surface finish |
| **Production scale** | R&D prototype vs high-volume production |
| **Water handling** | RO/DI water supply, drainage |
| **Installation** | Vibration isolation, temperature and humidity control |

## FAQ

**Q1. What is the biggest difference between a waterjet laser and a conventional laser?**
A. The presence or absence of a heat-affected zone (HAZ). Conventional lasers leave residual machining heat that can alter the crystal structure of the material. Waterjet lasers eliminate this — the water jet simultaneously cools the machining zone, resulting in effectively zero HAZ. This is critical for thermally sensitive or crack-prone materials like SiC, AlN, and diamond.

**Q2. What results can I expect when dicing SiC wafers with a waterjet laser?**
A. Based on OHI Tech-supplied equipment: kerf width approximately 96 μm, zero HAZ, and clean edges with no burrs. Chipping is dramatically reduced compared to blade dicing, and the continuous water flow cleans debris in real time — no separate cleaning step required.

**Q3. Are there materials that cannot be processed with a waterjet laser?**
A. Geometry and dimensions are the more common constraints rather than material type. The minimum kerf width is limited by the nozzle diameter (20–100 μm), and material thickness is limited to 0.01–30 mm. Water-soluble or water-reactive materials also require special consideration. If uncertain, OHI Tech offers a feasibility test with your actual material before any equipment commitment.

**Q4. Is freeform (curved or gear-profile) cutting possible?**
A. Yes. The **Equal-Energy Pulse Synchronous with Motion** patent technology (US 8,422,521 B2) built into OHI Tech-supplied equipment maintains consistent pulse energy regardless of CNC speed variation along the toolpath. Curves, gear outlines, and fully freeform shapes are processed at the same quality as straight cuts.

---

## OHI Tech Waterjet Laser Supply

OHI Tech supplies waterjet laser equipment and offers application-specific machining solutions for semiconductor, compound semiconductor (SiC/GaN), ceramic, and precision metal processing customers. Pre-purchase feasibility testing is available — bring your actual material and we will verify processability and quality before any commitment. Contact us with your material specifications and machining requirements.

Contact: jino.kim@ohitech.co.kr`,
      zh: `## 什么是水导激光（水射流激光）？

水导激光（Water-Guiding Laser，水波导激光）是一种利用超高压水流作为光学波导，将激光束传导至工件的新一代精密加工技术。它从根本上克服了传统空气路径激光在焦点偏移时光束质量急剧下降的缺陷，同时对加工区域进行实时冷却和清洁。

SiC（碳化硅）、GaN（氮化镓）等第三代半导体，AlN、Si₃N₄陶瓷及钻石等传统激光难以加工的材料，均可通过水导激光实现无热影响的精密加工，已在半导体、航空航天及电力电子领域快速获得关注。

## 工作原理 — 全反射水中光束导引

水导激光的核心原理与光纤完全相同：**全内反射（Total Internal Reflection）**。

1. 纳秒绿激光（波长515~532nm）通过聚焦透镜形成焦点。
2. 经50~800bar超高压加压的高纯度去离子水（DI water）通过直径20~100μm的喷嘴，形成稳定的微细水柱。
3. 激光束在水柱内发生全反射，以完全圆柱形路径传导至工件。
4. 加工过程中产生的熔融物和颗粒被水流即时冲走。

有效工作距离为5~50mm，无论材料厚度如何，光束直径保持恒定，无需重新调焦。可处理材料厚度范围：0.01~30mm。

## 水导激光与传统激光对比

| 项目 | 传统激光 | 水导激光 |
|------|---------|---------|
| 焦点管理 | 需精密调焦，离焦后品质下降 | 无需调焦（全反射维持） |
| 光束形态 | 锥形→切缝壁非平行 | 圆柱形→切缝壁完全垂直 |
| 热影响区（HAZ） | 存在，材料变质风险 | 无（同步水冷） |
| 切割纵横比 | 受限 | 高纵横比（切缝宽≥20μm） |
| 颗粒处理 | 需单独清洁 | 水流实时清除 |
| 毛刺产生 | 常见 | 无（水压排出熔融物） |
| 3D加工 | 受限 | 可加工非平面曲面 |
| 表面保护 | 需单独涂覆 | 无需（水膜自动保护） |

## 主要设备规格

| 项目 | 规格 |
|------|------|
| **激光光源** | ns绿激光（波长515~532nm） |
| **功率** | 25 / 50 / 100 W |
| **频率** | 10~50 kHz |
| **喷嘴直径** | Ø 20~100 μm |
| **水压** | 50~800 bar |
| **光束直径** | 50 / 80 / 100 / 200 μm（可定制） |
| **工作距离** | 5~50 mm |
| **XY重复精度** | ±3 μm（300×300mm基准）/ <±2μm（可选） |
| **加工速度** | 最大300 mm/s |
| **轴数** | 3/4/5轴（可选A/B/C回转轴） |
| **行程** | 300×300 / 500×500 / 1000×1000 mm |
| **环境条件** | 温度20~22°C，湿度30~50% |

## 可加工材料

水导激光特别适合**硬度高或对热敏感的材料**，弥补了传统激光的短板。

| 材料分类 | 代表材料 |
|---------|---------|
| **第三代半导体** | SiC（碳化硅）、GaN（氮化镓） |
| **高硬度金属** | 不锈钢、铜、铝合金（12mm以上厚度） |
| **陶瓷** | AlN、Si₃N₄、ABF复合陶瓷 |
| **基板类** | 硅晶圆、Ge晶圆、玻璃晶圆、TGV基板 |
| **电路板** | 多层铜PCB（8.3mm厚）、铜箔（30μm） |
| **特殊材料** | 钻石、蓝宝石、金属薄膜筛网 |

## 加工案例

### 半导体与晶圆加工
- **SiC晶圆切割**：切缝宽约96μm，切割面洁净，零热影响区
- **Si微结构**：编码器圆盘用辐射形槽（5μm级精密加工）
- **Ge晶圆**：厚度0.2mm，通孔及盲孔（直径>200μm）
- **Si异形结构**：齿轮轮廓及自由曲线切割

### 陶瓷与高硬度材料
- **AlN / Si₃N₄陶瓷**：垂直孔0.2~1mm，无热损伤
- **ABF复合陶瓷**：垂直孔0.25~1mm高密度阵列
- **6061铝合金**：圆柱孔Ø300μm，深度6mm

### 精密金属加工
- **不锈钢2mm**：200μm垂直孔高密度阵列
- **多层铜PCB 8.3mm**：完全垂直切割面
- **铜箔/SS316薄板（30~50μm）**：高密度筛孔，无热影响
- **铜/铝12mm**：异形切割及垂直精密加工

### 散热结构加工
- 在金属块上直接加工超高密度针翅阵列（散热柱）
- 半导体封装及AI服务器用微通道散热器制造

## 专利技术 — 异形切割与等能量脉冲同步控制

传统水导激光仅适用于直线加工。OHI Tech供应的水导激光设备搭载**运动同步等能量脉冲控制（Equal-Energy Pulse Synchronous with Motion）**专利技术，无论CNC运动轴的速度如何变化，均可在加工路径的任意位置发射等能量激光脉冲，实现曲线、齿轮等异形自由加工。已取得美国（US 8,422,521 B2）、台湾、中国大陆、韩国、日本、欧洲等多国专利。

## 水导激光选型核查表

| 项目 | 确认内容 |
|------|---------|
| **材料特性** | 硬度、脆性、热敏感性、厚度 |
| **加工形状** | 直线/曲线/异形，孔径及深度 |
| **精度要求** | 切缝宽度、侧壁垂直度、表面粗糙度 |
| **生产规模** | 研发样品 vs 量产线 |
| **水处理条件** | RO/DI水供给、废水处理 |
| **安装环境** | 隔振、恒温恒湿条件 |

## 常见问题（FAQ）

**Q1. 水导激光与普通激光最大的区别是什么？**
A. 有无热影响区（HAZ）。普通激光加工产生的热量残留在材料中，可能改变晶体结构。水导激光通过同步水冷实现HAZ实质为零。这对SiC、AlN、金刚石等热敏感或易开裂材料至关重要。

**Q2. 用水导激光切割SiC晶圆，实际效果如何？**
A. 基于OHI Tech供应设备的实测数据：SiC晶圆切割切缝宽约96μm，无热影响区，边缘清洁无毛刺。与刀片划片相比崩边大幅减少，水流实时冲走切削残余物，无需额外清洗工序。

**Q3. 水导激光有无法加工的材料吗？**
A. 更多是形状和尺寸限制而非材料本身。最小切缝宽度受喷嘴直径（20~100μm）限制，材料厚度范围为0.01~30mm。遇水溶解或与水反应的材料需特别注意。如有疑问，OHI Tech可用实际材料进行可行性试加工，提前确认。

**Q4. 可以加工曲线、齿轮等异形轮廓吗？**
A. 可以。OHI Tech供应设备搭载的**等能量脉冲同步控制（US 8,422,521 B2）**专利技术，无论CNC速度如何变化，均可在路径任意位置保持一致的脉冲能量。曲线、齿轮轮廓及任意自由形状均可实现与直线同等品质的加工。

---

## OHI Tech水导激光设备供应

OHI Tech提供水导激光设备，为半导体、化合物半导体（SiC/GaN）、陶瓷及精密金属加工领域客户提供定制化加工解决方案。购机前可携带实际材料进行试加工可行性测试，提前确认加工品质。欢迎告知材料规格与加工条件，我们将为您提供最优设备配置方案。

联系方式：jino.kim@ohitech.co.kr`,
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
