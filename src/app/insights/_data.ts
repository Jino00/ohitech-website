export interface Article {
  slug: string;
  category: "semiconductor-parts" | "ev-charging" | "thermal-management";
  relatedProductPath: string;
  publishedAt: Date;
  updatedAt: Date;
  title: { ko: string; en: string; zh: string; ja: string };
  description: { ko: string; en: string; zh: string; ja: string };
  keywords: { ko: string[]; en: string[]; zh: string[]; ja: string[] };
  body: { ko: string; en: string; zh: string; ja: string };
}

export const articles: Article[] = [
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
      ja: "静電チャック（ESC）Johnsen-Rahbek型 vs Coulomb型比較 — 再生基準とコスト削減の実例",
    },
    description: {
      ko: "Lam Research Kiyo·Flex·Versys용 ESC의 동작 원리, 두 방식의 실질적 차이, OHI Tech가 직접 검증한 재생 수리 기준과 판정 기준을 설명합니다.",
      en: "Operating principles of ESCs for Lam Research Kiyo, Flex, and Versys — practical differences between JR and Coulomb types, and OHI Tech's directly verified refurbishment criteria.",
      zh: "Lam Research Kiyo·Flex·Versys用静电吸盘工作原理、两种方式实质差异，以及OHI Tech直接验证的翻新修复判定标准。",
      ja: "Lam Research Kiyo・Flex・Versys用ESCの動作原理、両方式の実質的な違い、そしてOHI Techが直接検証した再生修理の判定基準を解説します。",
    },
    keywords: {
      ko: ["정전척", "ESC", "일렉트로스태틱 척", "전기척", "웨이퍼 홀더", "척 플레이트", "정전기 척", "electrostatic chuck", "반도체 ESC", "Kiyo ESC", "Flex ESC", "Versys ESC", "ESC 수리", "ESC 수리 업체", "정전척 수리 업체", "ESC 재생", "정전척 재생", "ESC 재제조", "Lam Research ESC", "AMAT ESC", "TEL ESC", "Axcelis ESC", "쿨롱 타입", "존슨라벡 타입"],
      en: ["electrostatic chuck", "ESC", "semiconductor ESC", "Kiyo ESC", "Flex ESC", "Versys ESC", "ESC repair", "ESC refurbishment", "ESC manufacturing", "Lam Research ESC", "AMAT ESC", "TEL ESC", "Axcelis ESC", "chuck plate", "wafer holder"],
      zh: ["静电卡盘", "ESC", "半导体ESC", "Kiyo ESC", "Flex ESC", "Versys ESC", "ESC维修", "ESC再生", "静电卡盘修复", "Lam ESC", "AMAT ESC", "TEL ESC", "Axcelis ESC"],
      ja: ["静電チャック", "ESC", "半導体ESC", "チャックプレート", "ウェハーホルダー", "Kiyo ESC", "Flex ESC", "Versys ESC", "ESC修理", "ESC再生", "Lam Research ESC", "AMAT ESC", "TEL ESC", "Axcelis ESC", "Johnsen-Rahbek型", "Coulomb型"],
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
      zh: `每次PM周期到来，新品ESC高昂的更换费用是否让您倍感压力？面对翻新品，您是否又担心其吸附力与绝缘性能能否放心用于量产线？

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
      ja: `**OHI Techの基準に合格した再生ESCは、新品と同等の吸着力・絶縁抵抗・パーティクルスペックを満たします。** セラミックのひび割れやガスホールの詰まりが20%以上でなければ、再生によってコストを大幅に削減できます。OHI TechはLam Research Kiyo・Flex・Versys装置用ESCを数百件供給・再生し、再生判定基準を直接検証しました。

## 結論: 再生ESCは新品と性能差がありません

OHI Techの基準に合格した再生ESCは、新品と比べて吸着力・絶縁抵抗・パーティクルのいずれも同等のスペックを満たします。新品より大幅に低いコストで交換の負担を軽減できます。

ただし、セラミック表面のひび割れやガスホールの詰まりが20%以上の場合は再生ができず、新品への交換が必要です。

## Johnsen-Rahbek型 vs Coulomb型 ひと目で比較

![OHI Tech ESC（静電チャック）製品詳細 — 半導体工程 Plasma Etching、CVD、Ion Implantation適用](/images/insights/esc-product-detail.png)

| 項目 | Johnsen-Rahbek（J-R）型 | Coulomb型 |
|------|----------------------|----------|
| **吸着原理** | 誘電体漏れ電流を利用 | 純粋な静電気力 |
| **印加電圧** | 200〜600V | 1〜2kV |
| **吸着力** | 高い（30〜80 Torr） | 中程度 |
| **脱着速度** | やや遅い（残留電荷） | 速い |
| **主な適用** | Lam Kiyo、Flex、Versys | AMAT、TEL一部 |
| **セラミック素材** | AlN、Al₂O₃（半導体特性） | Al₂O₃（絶縁体） |

Lam Research装置を使用しているファブでは、ほとんどがJ-R型です。300mm高密度プラズマ工程において吸着力が強く、低電圧駆動が可能な点がその理由です。

## 装置別ESC規格まとめ

| 装置 | タイプ | 直径 | 主な特徴 |
|------|------|------|---------|
| Lam Kiyo | J-R | 300mm | 高密度プラズマ、多様なガスホールパターン |
| Lam Flex | J-R | 300mm | 低圧エッチング、RF印加方式 |
| Lam Versys | J-R | 300mm | 微細フィーチャーエッチング、高選択比 |
| AMAT Centura | Coulomb | 200/300mm | 多層電極構造 |
| TEL Trias | J-R | 300mm | 高温工程用AlNベース |

## OHI Tech ESC再生可否判定基準

OHI Techが実際に再生の可否を判断する際に適用する基準です。

**再生可能条件（5項目すべてを満たす場合）:**
- 表面粗さ(Ra): 0.8μm以下
- 絶縁抵抗: 10⁹Ω以上（500V DC印加）
- 吸着力: 新品規格の80%以上
- パーティクル発生量: クラス規格以内
- 表面のひび割れ・チッピング: なし

**新品交換が必要な条件:**
- セラミック表面のひび割れまたはスポーリングを確認
- ガスホールの詰まり20%以上
- 吸着力が新品の50%未満に低下

## 再生ESC導入の効果

OHI Techの再生基準に合格したESCは、吸着力・絶縁抵抗・パーティクル基準を新品と同等に満たします。新品と比べて大幅なコスト削減が可能で、具体的な納品事例はお問い合わせ時にご共有いたします。

## よくある質問（FAQ）

**Q1. 再生ESCの保証期間はどのくらいですか。**
保証期間は製品の状態や再生範囲によって異なるため、お問い合わせ時にご案内いたします。再生後は吸着力・絶縁抵抗・パーティクルの性能測定データを含む結果報告書を提供します。

**Q2. ESCの再生にはどのくらいの期間がかかりますか。**
所要期間は製品の状態や再生範囲によって異なります。受領後の状態診断結果をもとにスケジュールをご案内いたします。

**Q3. Kiyo、Flex、Versys以外の装置用ESCも供給可能ですか。**
AMAT、TELなど他の装置用ESCも供給可能です。装置モデル名とESCパート番号をお知らせいただければ、新品供給または再生可否をご確認いたします。

ESCの再生可否確認や新品の見積もりが必要でしたら、パート番号と現在の状態の写真をお送りください。OHI Techエンジニアリングチームが迅速に確認いたします。jino.kim@ohitech.co.kr`,
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
      ja: "FOUP vs オープンカセット選定基準 — 300mmウェハー搬送中のパーティクル・汚染を防ぐ方法",
    },
    description: {
      ko: "FOUP, FOSB, SMIF Pod, PFA 카세트의 실질적 차이와 공정별 선택 기준, OHI Tech가 CK Plastics 파트너로서 공급한 사례를 설명합니다.",
      en: "Practical differences between FOUP, FOSB, SMIF Pod, and PFA cassettes — process-specific selection criteria and OHI Tech supply cases as an official CK Plastics partner.",
      zh: "FOUP、FOSB、SMIF Pod、PFA卡匣的实质差异、各工艺选型标准，以及OHI Tech作为CK Plastics官方合作伙伴的供货案例。",
      ja: "FOUP、FOSB、SMIF Pod、PFAカセットの実質的な違いと工程別の選定基準、そしてOHI TechがCK Plasticsパートナーとして供給した事例を解説します。",
    },
    keywords: {
      ko: ["웨이퍼 캐리어", "FOUP", "FOSB", "SMIF pod", "PFA 카세트", "300mm FOUP", "웨이퍼 카세트", "CK Plastics", "반도체 이송 장비", "웨이퍼 보관함", "웨이퍼 박스", "웨이퍼 케이스", "웨이퍼 트레이", "웨이퍼 이송 박스", "웨이퍼 수납함", "반도체 웨이퍼 용기", "OHT 캐리어", "AGV 캐리어", "300mm 웨이퍼 캐리어", "Front Opening Unified Pod"],
      en: ["wafer carrier", "FOUP", "FOSB", "SMIF pod", "PFA cassette", "300mm FOUP", "wafer cassette", "CK Plastics", "wafer storage box", "wafer transport container", "OHT carrier", "AGV carrier"],
      zh: ["晶圆载体", "FOUP", "FOSB", "SMIF Pod", "PFA卡匣", "300mm FOUP", "晶圆盒", "CK Plastics", "晶圆存储盒", "晶圆运输容器", "OHT载具"],
      ja: ["ウェハーキャリア", "FOUP", "FOSB", "SMIF Pod", "PFAカセット", "300mm FOUP", "ウェハーカセット", "CK Plastics", "ウェハー保管ケース", "ウェハー搬送容器", "OHTキャリア", "AGVキャリア"],
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

## CK Plastics FOUP — OHI Tech 공급 현황

OHI Tech는 CK Plastics 한국 공식 파트너입니다. FOUP, FOSB, 오픈 카세트 전 라인을 공급하며, 국내 주요 300mm 팹에서 검증된 제품입니다.

긴급 공급, 소량 주문 모두 대응 가능합니다. 현재 사용 중인 캐리어 모델명을 알려주시면 호환 가능 제품을 바로 안내해드립니다.

## 참고 자료

- [SEMI 국제 반도체 표준 — E47.1 (300mm FOUP)](https://www.semi.org)

## 자주 묻는 질문 (FAQ)

**Q1. FOUP과 FOSB의 차이가 무엇인가요?**
FOUP은 팹 내 장비 간 이송(AMHS, OHT)용 밀폐 캐리어이고, FOSB는 팹 간 장거리 운송을 위해 충격 흡수 패드와 강화된 잠금 구조를 추가한 버전입니다. 외관은 비슷하지만 FOSB가 더 견고합니다.

**Q2. 200mm 레거시 장비를 아직 사용 중인데 어떤 캐리어가 맞나요?**
200mm 라인은 SMIF Pod(표준) 또는 오픈 카세트(습식 공정)를 사용합니다. 장비 종류와 공정 조건을 알려주시면 적합한 제품을 안내해드립니다.

**Q3. FOUP 세정 주기와 방법은 어떻게 되나요?**
일반적으로 500~1,000사이클마다 IPA 또는 DI water 세정을 권장합니다. 세정 후 파티클 카운트 검사를 거쳐 재사용 여부를 결정합니다. OHI Tech에서 세정 절차 가이드를 제공합니다.

웨이퍼 캐리어 선택이나 긴급 공급이 필요하시면 현재 사용 중인 장비 환경을 알려주세요. jino.kim@ohitech.co.kr

---

## 웨이퍼 캐리어 전체 제품 라인업

FOUP·FOSB·SMIF Pod·PFA 카세트·Metal 카세트·PEEK 카세트까지 전 사이즈(2"~12") 라인업과 공정별 선택 가이드를 제품 페이지에서 확인하세요.

→ [OHI Tech 웨이퍼 캐리어 제품 페이지 바로가기](/products/semiconductor-parts/wafer-carrier)`,
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

## References

- [SEMI International Standards — E47.1 (300mm FOUP)](https://www.semi.org)

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

## 参考资料

- [SEMI 国际半导体标准 — E47.1（300mm FOUP）](https://www.semi.org)

## 常见问题 (FAQ)

**Q1. FOUP和FOSB有什么区别？**
FOUP用于晶圆厂内设备间传输（AMHS、OHT），FOSB在此基础上增加了减震垫和加固锁扣，专为厂间长途运输设计。外观相似，但FOSB结构更坚固。

**Q2. 我们还在使用200mm旧设备，该用哪种载体？**
200mm产线用SMIF Pod（标准）或开放式卡匣（湿法工艺）。告知设备类型和工艺条件，我们会推荐合适产品。

**Q3. FOUP的清洗周期和方法是什么？**
一般每500~1000次循环用IPA或DI水清洗，清洗后经颗粒计数检测确定是否可复用。OHI Tech提供清洗程序指导。联系邮箱：jino.kim@ohitech.co.kr`,
      ja: `**ドライ工程（エッチング・成膜）にはFOUP、湿式洗浄（HF・硫酸）にはPFAカセット、ファブ間の長距離輸送にはFOSB**が基本の選定基準です。工程環境と素材を適合させないと、パーティクル汚染や素材の劣化が発生します。OHI TechはCK Plasticsの公式パートナーとして韓国国内の主要300mmファブにウェハーキャリアを供給しており、工程別の選定ミスを直接確認してきました。

## 結論: 工程環境によってキャリア素材が変わります

**ドライ工程（エッチング・成膜）であればFOUP**、湿式洗浄（Wet Clean）であればPFAカセット、長距離輸送であればFOSBが基本です。

化学薬品環境で一般的なPC素材のFOUPを使用すると、素材の劣化とパーティクル汚染が発生します。工程環境と素材は必ず適合させる必要があります。

## ウェハーキャリア種類別比較

![OHI Tech半導体素材部品 — Quartz、Silicon、SiC、Sapphire素材のウェハーキャリア供給](/images/insights/semiconductor-parts-detail.png)

| 種類 | 密閉性 | 主な用途 | 材質 | 対応装置 |
|------|---------|--------|------|---------|
| FOUP | 密閉 | 300mmドライ工程 | PC+ABS | EFEM、AMHS |
| FOSB | 密閉 | ファブ間長距離輸送 | PC+ABS | 外部輸送 |
| SMIF Pod | 密閉 | 200mmレガシーライン | PC | SMIF EFEM |
| PFAカセット | オープン | 湿式洗浄、HF工程 | PFA | 湿式洗浄装置 |

## 素材別特性 — 化学耐性が鍵です

| 素材 | 化学耐性 | 耐熱性 | 静電気 | 主な用途 |
|------|---------|-------|-------|---------|
| PC（ポリカーボネート） | 中程度 | 120°C | 帯電しやすい | 標準FOUP |
| PEEK | 高い | 260°C | 低い | 高温工程 |
| PFA（フッ素樹脂） | 非常に高い | 260°C | 低い | HF・硫酸環境 |
| ESD PC | 中程度 | 120°C | 放電処理 | 静電気敏感工程 |

湿式洗浄工程で一般的なPCカセットを使用していたところ、HFによる素材の溶出でウェハー汚染が発生した事例があり、PFAカセットへ切り替えた後にパーティクル不良が大幅に改善された事例を確認しています。具体的な納品事例はお問い合わせ時にご共有いたします。

## FOUP選定時に必ず確認すべき5項目

1. **ドアタイプ**: ロボットアーム対応可否（Entegris、Shin-Etsu、CK Plastics規格）
2. **N₂パージポート**: 酸化防止が必要な工程では必須
3. **スロットピッチ**: 工程装置のボートピン間隔との互換性を確認
4. **RFIDタグ**: ウェハー追跡（MES）連携の有無
5. **洗浄耐久性**: 再使用回数と洗浄方法

## CK Plastics FOUP — OHI Techの供給実績

OHI TechはCK Plasticsの韓国公式パートナーです。FOUP、FOSB、オープンカセットの全ラインナップを供給しており、韓国国内の主要300mmファブで検証済みの製品です。

緊急供給、少量注文にも対応可能です。現在お使いのキャリアのモデル名をお知らせいただければ、対応可能な製品をすぐにご案内いたします。

## 参考資料

- [SEMI国際半導体標準 — E47.1（300mm FOUP）](https://www.semi.org)

## よくある質問（FAQ）

**Q1. FOUPとFOSBの違いは何ですか。**
FOUPはファブ内の装置間搬送（AMHS、OHT）用の密閉キャリアで、FOSBはファブ間の長距離輸送のために緩衝パッドと強化されたロック構造を追加したバージョンです。外観は似ていますが、FOSBの方がより頑丈です。

**Q2. 200mmのレガシー装置をまだ使用していますが、どのキャリアが適していますか。**
200mmラインではSMIF Pod（標準）またはオープンカセット（湿式工程）を使用します。装置の種類と工程条件をお知らせいただければ、適した製品をご案内いたします。

**Q3. FOUPの洗浄周期と方法はどのようになりますか。**
一般的には500〜1,000サイクルごとにIPAまたはDI water洗浄を推奨します。洗浄後はパーティクルカウント検査を経て再使用の可否を判断します。OHI Techでは洗浄手順ガイドを提供しています。

ウェハーキャリアの選定や緊急供給が必要な場合は、現在お使いの装置環境をお知らせください。jino.kim@ohitech.co.kr

---

## ウェハーキャリア 全製品ラインナップ

FOUP・FOSB・SMIF Pod・PFAカセット・Metalカセット・PEEKカセットまで、全サイズ（2"〜12"）のラインナップと工程別選定ガイドを製品ページでご確認ください。

→ [OHI Techウェハーキャリア製品ページはこちら](/products/semiconductor-parts/wafer-carrier)`,
    },
  },
  {
    slug: "dry-vacuum-pump",
    category: "semiconductor-parts",
    relatedProductPath: "vacuum-pump",
    publishedAt: new Date("2026-04-26"),
    updatedAt: new Date("2026-04-26"),
    title: {
      ko: "반도체 드라이 진공펌프 수명 2배 늘리는 유지보수 체크리스트 — 공정별 선택 기준 포함",
      en: "Double Your Dry Vacuum Pump Service Life — Maintenance Checklist and Process Selection Guide",
      zh: "半导体干式真空泵寿命延长2倍的维护清单 — 含各工艺选型标准",
      ja: "半導体ドライ真空ポンプの寿命を2倍に延ばす保守チェックリスト — 工程別選定基準つき",
    },
    description: {
      ko: "Edwards, Pfeiffer, Ebara 드라이 진공펌프 공급 경험을 바탕으로, 스크류·클로우·루츠 타입 비교, 공정별 최적 선택, 수명을 2배로 늘리는 유지보수 포인트를 설명합니다.",
      en: "Based on OHI Tech's supply experience with Edwards, Pfeiffer, and Ebara dry vacuum pumps — screw vs claw vs Roots type comparison, process-specific selection, and maintenance tips to double service life.",
      zh: "基于OHI Tech供应Edwards、Pfeiffer、Ebara干式真空泵的经验，介绍螺杆·爪式·罗茨泵对比、各工艺最优选型及延长寿命2倍的维护要点。",
      ja: "Edwards、Pfeiffer、Ebaraのドライ真空ポンプ供給経験に基づき、スクリュー式・クロー式・ルーツ式の比較、工程別の最適選定、寿命を2倍に延ばす保守のポイントを解説します。",
    },
    keywords: {
      ko: ["드라이 진공펌프", "건식 진공펌프", "반도체 진공펌프", "스크류 진공펌프", "클로우 진공펌프", "루츠 진공펌프", "식각 진공펌프", "CVD 진공펌프", "이온주입 진공펌프", "임플란트 진공펌프", "디스플레이 진공펌프", "오일프리 진공펌프", "무오일 진공펌프", "오일리스 진공펌프", "드라이 펌프", "드라이 베큠 펌프", "반도체 펌프"],
      en: ["dry vacuum pump", "oil-free vacuum pump", "semiconductor vacuum pump", "screw vacuum pump", "claw vacuum pump", "Roots pump", "etch vacuum pump", "CVD vacuum pump", "ion implant pump", "cleanroom vacuum pump", "dry pump"],
      zh: ["干式真空泵", "无油真空泵", "半导体真空泵", "螺杆真空泵", "爪式真空泵", "罗茨泵", "刻蚀真空泵", "CVD真空泵", "离子注入真空泵", "洁净室真空泵"],
      ja: ["ドライ真空ポンプ", "乾式真空ポンプ", "半導体真空ポンプ", "スクリュー真空ポンプ", "クロー真空ポンプ", "ルーツポンプ", "エッチング真空ポンプ", "CVD真空ポンプ", "イオン注入真空ポンプ", "クリーンルーム真空ポンプ", "オイルフリー真空ポンプ", "ドライポンプ", "半導体ポンプ"],
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
      ja: `**N₂パージ不足は、ドライ真空ポンプの寿命を縮める原因の第1位です。** 工程副産物の固着を防ぐパージ流量とタイミングの管理だけで、オーバーホール周期を大きく延ばすことができます。OHI TechはEdwards、Pfeiffer、Ebaraのドライ真空ポンプの供給・オーバーホールサービスを行い、寿命短縮の原因パターンを直接確認してきました。

## 結論：寿命短縮の原因第1位はN₂パージ不足です

工程副産物がポンプ内部に固着することが、最も多い早期故障の原因です。N₂パージの流量とタイミングを工程レシピと連動させるだけで、オーバーホール周期を大きく延ばせます。

## スクリュー式・クロー式・ルーツ式 — タイプ別比較

![OHI Tech 半導体材料部品供給力 — ドライ真空ポンプ関連消耗品およびチャンバーパーツラインナップ](/images/insights/semiconductor-parts-detail.png)

| 項目 | スクリュー式 | クロー式 | ルーツ（ブースター）式 |
|------|--------|--------|-------------|
| **構造** | 螺旋ロータの噛み合い | フック型非接触 | 8の字型高速回転 |
| **腐食性ガス耐性** | 高い | 中程度 | 低い |
| **パウダー処理** | 優れる | 普通 | 不向き |
| **高速排気** | 中程度 | 優れる | 最優秀（ブースター用） |
| **単独使用** | 可能 | 可能 | 不可（組み合わせ必須） |
| **主な用途** | CVD、ALD | エッチング | ブースター組み合わせ |

## 工程別の最適なドライ真空ポンプ選定

| 工程 | 推奨構成 | 理由 |
|------|---------|------|
| エッチング(Etch) | クロー式＋ルーツブースター | 高速排気、腐食性ガス（Cl₂、HBr）対応 |
| CVD/PECVD | スクリュー式 | パウダー・高温副産物の処理 |
| イオン注入(Implant) | スクリュー式 | クリーンな排気、超高真空に近接 |
| スパッタリング(PVD) | クロー式 | 金属蒸気の処理 |
| ALD | スクリュー式 | パルスガス対応、精密圧力制御 |

## 寿命を2倍に延ばす保守チェックリスト

**毎日確認：**
- ポンプ本体温度（目標：60°C以下を維持）
- 冷却水の流量・温度（異常時は即対応）
- N₂パージ流量の正常性

**毎月確認：**
- 排気ラインの詰まり（差圧測定）
- オイルミストフィルターの飽和度（真空度低下の原因）
- 振動・騒音の変化（軸受摩耗の早期検知）

**オーバーホール判断基準（いずれか早く到達した時点）：**
- 稼働時間20,000〜30,000時間
- 到達真空度が10%以上低下
- 排気騒音が基準値より5dB以上上昇

## OHI Tech供給経験

OHI TechはEdwards、Pfeiffer、Ebaraのドライ真空ポンプの供給・オーバーホールを通じて、N₂パージのタイミング設定ミスが早期故障の主な原因であることを繰り返し確認してきました。具体的な納入事例はお問い合わせ時にご案内します。

## よくある質問（FAQ）

**Q1. ドライポンプのオーバーホールと新品交換、どちらが有利ですか？**
オーバーホール費用は新品の30〜50%程度です。ロータコーティングと軸受の状態が良好であれば、オーバーホールが経済的です。OHI Techは受領後直ちに状態診断を行い、オーバーホール可否をご案内します。

**Q2. エッチング工程でポンプが頻繁に詰まるのはなぜですか？**
HBr、Cl₂などの腐食性ガス副産物が冷却される際、ポンプ内部で塩化物として固着する現象です。ポンプの加熱温度維持（80〜100°C）とパージ強化で予防できます。

**Q3. Edwards以外のブランドも供給・オーバーホールが可能ですか？**
Pfeiffer、Ebaraなど主要ブランドはいずれも新品供給とオーバーホールに対応可能です。現在使用中のポンプ型式をお知らせいただければ、対応可否を直ちに確認いたします。

ドライ真空ポンプのオーバーホールや新品交換をご検討中でしたら、現在の稼働時間と症状をお知らせください。最適な方法をご案内いたします。jino.kim@ohitech.co.kr`,
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
      ja: "Kalrez vs Viton Oリング選定ミスを減らす基準 — 半導体工程別材質比較",
    },
    description: {
      ko: "Viton, Kalrez, Chemraz O-ring의 화학 내성·내열성·플라즈마 내성 비교와, OHI Tech가 확인한 공정별 소재 선택 실수 사례 및 교체 주기 기준을 설명합니다.",
      en: "Viton, Kalrez, Chemraz O-ring comparison on chemical resistance, heat resistance, and plasma resistance — plus process-specific material selection mistakes OHI Tech has seen and replacement interval criteria.",
      zh: "Viton、Kalrez、Chemraz O形圈化学耐性、耐热性、耐等离子体性对比，以及OHI Tech确认的各工艺选材失误案例和更换周期标准。",
      ja: "Viton、Kalrez、Chemraz Oリングの化学耐性・耐熱性・耐プラズマ性の比較と、OHI Techが確認した工程別の材質選定ミス事例、交換周期の基準を解説します。",
    },
    keywords: {
      ko: ["O-ring", "오링", "O-링", "반도체 오링", "반도체 씰링", "씰링재", "반도체 패킹", "씰 링", "가스켓", "Viton", "Kalrez", "Chemraz", "불소 오링", "FKM 오링", "FFKM 오링", "퍼플루오로엘라스토머", "퍼플루오로 오링", "플라즈마 내성 오링", "식각 오링", "CVD 오링", "고온 오링", "진공 씰링", "반도체 씰링 부품", "Kalrez 대체"],
      en: ["O-ring", "semiconductor O-ring", "Viton", "Kalrez", "Chemraz", "fluoroelastomer", "FKM O-ring", "FFKM O-ring", "perfluoroelastomer", "plasma resistant O-ring", "vacuum sealing", "semiconductor seal", "semiconductor gasket"],
      zh: ["O形圈", "半导体O形圈", "Viton", "Kalrez", "Chemraz", "氟橡胶", "FKM密封圈", "FFKM密封圈", "全氟橡胶", "耐等离子体O形圈", "真空密封", "半导体密封件"],
      ja: ["Oリング", "半導体Oリング", "半導体シール", "シール材", "半導体パッキン", "ガスケット", "Viton", "Kalrez", "Chemraz", "フッ素ゴム", "FKM Oリング", "FFKM Oリング", "パーフルオロエラストマー", "耐プラズマOリング", "エッチングOリング", "CVD Oリング", "耐熱Oリング", "真空シール", "半導体シール部品", "Kalrez代替品"],
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
      ja: `**200°C以上のプラズマ工程でVitonのOリングを使用すると、早期劣化によりガス漏れが発生します。この環境ではKalrez 6375以上のグレードが必須です。** OHI TechはViton、Kalrez、Chemraz Oリングを供給しており、工程別の材質選定ミス事例を直接確認してきました。

## 結論：高温プラズマ工程でのViton使用は危険です

Vitonは200°Cの限界を超えると急激に劣化します。ICPエッチング、ALD（200〜350°C）工程でVitonを使用すると、Oリングが早期に破損しガス漏れが発生します。

この環境ではKalrez 6375以上のグレードが必須です。価格差は大きいものの、装置ダウンタイム1回分のコストと比べればKalrezの方がはるかに経済的です。

## Viton vs Kalrez vs Chemraz 材質比較

![OHI Tech 半導体材料部品 — Quartz、SiC、Sapphire材質ラインナップと供給力](/images/insights/semiconductor-parts-detail.png)

| 項目 | Viton (FKM) | Kalrez (FFKM) | Chemraz (FFKM) |
|------|------------|--------------|----------------|
| **耐熱性** | -20〜200°C | -20〜327°C | -20〜316°C |
| **化学耐性** | 炭化水素・酸・オイル | ほぼ全ての薬品 | ほぼ全ての薬品 |
| **耐プラズマ性** | 中程度 | 非常に高い | 非常に高い |
| **圧縮永久ひずみ** | 中程度 | 低い | 一部グレードはKalrezより低い |
| **価格** | 低い | 非常に高い | 高い（Kalrezよりやや低い） |
| **主な用途** | PVD、低温CVD | ICP、ALD、高腐食性 | 高温・高圧シール |

## 工程別Oリング材質選定基準

| 工程 | 温度 | 主なガス | 推奨材質 |
|------|------|---------|---------|
| プラズマエッチング(CCP) | 80〜150°C | Cl₂, HBr, CF₄ | Kalrez, Chemraz |
| プラズマエッチング(ICP) | 150〜250°C | SF₆, NF₃ | Kalrez 6375+ |
| PECVD | 200〜400°C | SiH₄, NH₃ | Kalrez 6221 |
| イオン注入(Implant) | 常温〜100°C | BF₃, AsH₃ | Kalrez |
| スパッタリング(PVD) | 100〜200°C | Ar, N₂ | VitonまたはKalrez |
| ALD | 200〜350°C | TMA, H₂O | Kalrez 6375+ |

## 最も多い3つのOリング選定ミス

**ミス1：ICPエッチングチャンバーでVitonを使用**
250°C以上の環境ではVitonが劣化し、破片がチャンバーを汚染します。Kalrez 6375以上に交換する必要があります。

**ミス2：寸法を内径(ID)だけ確認**
Oリングの寸法はID（内径）、OD（外径）、CS（断面径）の3つすべてを確認する必要があります。CSが合わないとシール力が低下します。

**ミス3：予防交換周期を無視するケース**
PM周期でOリングを交換しないと、劣化したOリングからパーティクルが発生します。外観上問題がなくても予防交換が原則です。

## Oリング管理のポイント

- **保管**：18〜25°Cの冷暗所、直射日光・オゾン・熱源を遮断
- **圧縮率**：設置時25%以下を推奨（過度な圧縮＝寿命短縮）
- **PM交換周期**：四半期に1回の予防交換が基本（高温工程は2ヶ月毎）
- **寸法3種の確認必須**：ID × OD × CS

## よくある質問（FAQ）

**Q1. KalrezとChemraz、どちらを選べばよいですか？**
ほとんどの半導体工程ではKalrezが標準です。高温・高圧の特殊環境で圧縮永久ひずみ率が重要な場合は、条件に合ったChemrazグレードが有利になることがあります。工程条件をお知らせいただければ最適なグレードをご提案します。

**Q2. 現在使用中のOリングの材質はどう確認しますか？**
表面の刻印やパーツ番号で確認できます。刻印がない場合はサンプルをお送りいただければ、OHI Techが材質分析の上で代替材質をご提案します。

**Q3. 緊急の少量発注も可能ですか？**
1個単位の少量発注、緊急供給ともに対応可能です。寸法（ID × OD × CS）と材質グレードをお知らせいただければ、在庫状況を直ちに確認いたします。

Oリングの材質選定や緊急供給が必要な場合は、工程環境と寸法をお知らせください。jino.kim@ohitech.co.kr`,
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
      ja: "Vapor-Pad・NMVC放熱材料比較（2026）— ピーク温度44%低減・5G干渉ゼロのベーパーチャンバー",
    },
    description: {
      ko: "Xerendipity Vapor-Pad™는 기존 패드 대비 피크온도를 44% 저감합니다(73.6°C→40.8°C). NMVC™는 5G/Wi-Fi RF 간섭 없이 구리 대비 80% 경량. OHI Tech가 두 제품을 한국에 공급합니다.",
      en: "Xerendipity Vapor-Pad™ reduces peak temperature by 44% vs standard pads (73.6°C→40.8°C). NMVC™ is 80% lighter than copper with zero RF interference for 5G/Wi-Fi. OHI Tech supplies both products in Korea.",
      zh: "Xerendipity Vapor-Pad™比传统热垫峰值温度降低44%（73.6°C→40.8°C）。NMVC™比铜轻80%，无5G/Wi-Fi RF干扰。OHI Tech在韩国供应两款产品。",
      ja: "Xerendipity Vapor-Pad™は従来パッド比でピーク温度を44%低減します（73.6°C→40.8°C）。NMVC™は5G/Wi-Fi RF干渉なしで銅比80%軽量です。OHI Techが両製品を韓国に供給しています。",
    },
    keywords: {
      ko: ["Vapor-Pad", "NMVC", "방열패드", "방열 패드", "방열시트", "방열 시트", "열전도 패드", "TIM 패드", "써멀 패드", "써멀 인터페이스 소재", "열계면재", "갭 패드", "갭필러", "써멀그리스", "방열그리스", "방열 소재", "베이퍼챔버", "균열판", "히트 스프레더", "히트파이프", "열관리", "TIM", "AI 서버 방열", "GPU 방열", "데이터센터 냉각", "5G 방열", "EV 파워모듈 냉각", "ESS 방열", "웨어러블 방열", "Xerendipity", "T-Global"],
      en: ["Vapor-Pad", "NMVC", "thermal pad", "TIM pad", "thermal interface material", "gap pad", "gap filler", "thermal grease", "heat dissipation", "vapor chamber", "heat pipe", "heat spreader", "thermal management", "TIM", "AI server cooling", "GPU cooling", "data center cooling", "5G thermal", "EV module cooling", "wearable thermal", "Xerendipity"],
      zh: ["Vapor-Pad", "NMVC", "导热垫", "TIM导热垫片", "热界面材料", "导热硅脂", "散热材料", "均热板", "热管", "热扩散器", "热管理", "TIM", "AI服务器散热", "GPU散热", "数据中心冷却", "5G散热", "EV功率模块散热", "可穿戴散热", "Xerendipity"],
      ja: ["Vapor-Pad", "NMVC", "放熱パッド", "放熱シート", "熱伝導パッド", "TIMパッド", "サーマルパッド", "熱界面材料", "ギャップパッド", "ギャップフィラー", "サーマルグリス", "放熱材料", "ベーパーチャンバー", "ヒートスプレッダー", "ヒートパイプ", "熱管理", "TIM", "AIサーバー放熱", "GPU放熱", "データセンター冷却", "5G放熱", "EVパワーモジュール冷却", "ESS放熱", "ウェアラブル放熱", "Xerendipity"],
    },
    body: {
      ko: `방열 패드 하나를 Vapor-Pad™로 교체했을 뿐인데, 동일 보드의 피크 온도가 73.6°C에서 40.8°C로 약 44% 떨어졌습니다.

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

## 참고 자료

- [T-Global Technology 공식 홈페이지 — 제품 스펙 원문](https://www.tglobalcorp.com)

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

## References

- [T-Global Technology Official Site — Product Specifications](https://www.tglobalcorp.com)

## FAQ

**Q1. What is the difference between Vapor-Pad™ and a standard silicone pad?**
Vapor-Pad™ is silicone-free and adds XY-direction heat spreading, reducing peak temperature by 44%. Standard silicone pads only conduct heat in one direction (Z-axis), which concentrates hotspots.

**Q2. Can NMVC™ be placed directly next to a 5G antenna without signal degradation?**
Yes. NMVC™ is electrically non-conductive — it does not attenuate 5G, Wi-Fi, or GPS signals. Copper vapor chambers placed near antennas reduce receive sensitivity; NMVC™ does not have this limitation.

**Q3. Are both products available from domestic inventory in Korea?**
OHI Tech supplies Vapor-Pad™ and NMVC™ as the Korean partner for Xerendipity. Share your application requirements (power density, device structure, temperature conditions) and we will recommend the right thickness and spec with a sample. Contact: jino.kim@ohitech.co.kr

**Q4. NMVC™ Qmax is under 10W — can it be used in AI server GPUs?**
Not as a standalone solution. Current NMVC™ Qmax is under 10W, which is insufficient for GPU-class loads (hundreds of watts). For GPU applications, Vapor-Pad™ is the correct choice. NMVC™ is optimized for smartphones, wearables, and small IoT devices.`,
      zh: `仅仅更换了一块散热垫，在相同的测试条件下，同一块板卡的峰值温度就从73.6°C降至40.8°C，降幅高达44%，散热效果显著提升。

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

## 参考资料

- [T-Global Technology 官方网站 — 产品规格原文](https://www.tglobalcorp.com)

## 常见问题(FAQ)

**Q1. Vapor-Pad™和普通硅胶垫有什么区别？**
Vapor-Pad™无硅，增加XY方向热扩散功能，峰值温度降低44%。普通硅胶垫只能Z轴单向导热，容易形成热点集中。

**Q2. NMVC™紧贴5G天线安装会有信号干扰吗？**
NMVC™无电导性，不衰减5G、Wi-Fi或GPS信号。铜均热板安装在天线附近会降低接收灵敏度，NMVC™没有此限制。

**Q3. 两款产品在韩国都有现货供应吗？**
OHI Tech作为Xerendipity韩国合作伙伴，供应Vapor-Pad™和NMVC™。请告知应用需求（功率密度、设备结构、温度条件），我们将推荐合适规格并提供样品。联系邮箱：jino.kim@ohitech.co.kr`,
      ja: `放熱パッドを一つVapor-Pad™に交換しただけで、同一基板のピーク温度が73.6°Cから40.8°Cへ、約44%低下しました。

OHI TechはXerendipity（T-Global子会社）の韓国パートナーとしてVapor-Pad™とNMVC™を供給しており、実際の現場で温度データを直接確認してきました。本稿では両製品の構造と性能差、用途別の選定基準を共有します。

## Vapor-Pad™はなぜ一般的な熱伝導パッドより44%低い温度を記録したのか

Vapor-Pad™は垂直熱伝導（Z軸）と水平熱拡散（XY軸）を同時に処理するハイブリッド構造のパッドです。

一般的なパッドはZ軸の一方向にしか熱を逃がせません。Vapor-Pad™はZ-ConductとXY-Spreadの2つの経路を同時に使い、ホットスポットを面全体に分散させます。

![Vapor-Pad™ Multi-Axis Heat Flow — Z-Conduct + XY-Spread同時熱拡散構造](/images/insights/vapor-pad-multiaxis.png)

**Vapor-Pad™主要スペック：**
- 面内熱伝導率Kxy：800〜1,200 W/m·K
- 垂直熱伝導率Kz：15〜25 W/m·K
- 厚さ：0.25〜5.0mm
- 動作温度：-30〜+105°C
- シリコンフリー（Silicone-free）、SGS認証

## Vapor-Pad™ベンチマーク — 同一条件下でピーク温度44%低減

![Surface Temperature Benchmark — Traditional Pad 73.6°C vs Vapor-Pad™ 40.8°C](/images/insights/vapor-pad-benchmark.png)

50×50mmサンプル、10×10mmヒーター、20分間の条件で測定した結果です。一般的なパッドはホットスポットが中心に集中する一方、Vapor-Pad™は熱が均等に分散していることが熱画像で確認できます。

## Vapor-Pad™ vs 一般熱伝導パッド比較

| 項目 | 一般熱伝導パッド | Vapor-Pad™ |
|------|--------------|-----------|
| 垂直熱伝導率(Kz) | 3〜15 W/m·K | 15〜25 W/m·K |
| 面内熱伝導率(Kxy) | 3〜5 W/m·K | 800〜1,200 W/m·K |
| 熱拡散方向 | Z軸単方向 | Z軸＋XY軸同時 |
| ピーク温度（ベンチマーク） | 73.6°C | 40.8°C |
| シリコン含有 | あり | なし（Silicone-free） |
| 厚さ範囲 | 0.3〜3mm | 0.25〜5.0mm |
| 認証 | — | SGS Certified |

## NMVC™が5G・ウェアラブル機器に適している理由

NMVC™（Non-Metal Vapor Chamber）は金属を使用しないためRF信号干渉がなく、従来の銅ベーパーチャンバー比で80%軽量です。

![NMVC™ — Zero RF Interference, 80% Lighter Than Copper, Design Freedom](/images/insights/nmvc-intro.png)

従来の銅ベーパーチャンバーは5G・Wi-Fi・GPS信号を遮断し、重いためアンテナ近傍への配置が困難です。NMVC™は非金属素材で電気伝導性がないため、アンテナのすぐ隣にも配置でき、厚さ0.15〜0.35mmの超薄型フレキシブル構造で複雑な3D設計にも適用できます。

**NMVC™ CPU性能ベンチマーク：** 3,822（NMVC）vs 2,600（従来VC）— サーマルスロットリングの低減により持続性能47%向上

## NMVC™ vs 従来ベーパーチャンバー比較

| 項目 | 従来の銅ベーパーチャンバー | NMVC™ |
|------|-----------------|------|
| 素材 | 銅 | 非金属 |
| 重量 | 基準 | 80%軽量 |
| 厚さ | 0.3〜0.5mm | 0.15〜0.35mm |
| 柔軟性 | なし | あり |
| RF干渉 | あり | なし |
| 5G/Wi-Fi近傍配置 | 制限あり | 可能 |
| CPU持続性能 | 2,600 | 3,822 |
| RoHS | — | 準拠 |

## 用途別の材料選定基準

AIサーバー・高出力パワー素子にはVapor-Pad™、5G機器・ウェアラブルにはNMVC™を選定します。

1. GPU・CPUパッケージ、AIサーバー冷却プレート → Vapor-Pad™（Kxy 800〜1,200 W/m·K）
2. 5Gスマートフォン、ウェアラブル、衛星通信モジュール → NMVC™（RF干渉なし、超薄型）
3. EVバッテリーセル間の熱管理 → Vapor-Pad™ 0.5〜2mm（圧縮性・絶縁性を同時確保）
4. IoTセンサー・複雑曲面機器 → NMVC™（フレキシブル構造、3D密着）

## 参考資料

- [T-Global Technology 公式サイト — 製品スペック原文](https://www.tglobalcorp.com)

## よくある質問（FAQ）

**Q1. Vapor-Pad™と一般的なシリコンパッドの違いは何ですか？**
Vapor-Pad™はシリコンを使用せず（Silicone-free）、XY方向の熱拡散機能を追加してピーク温度を44%低減します。一般的なシリコンパッドはZ軸の一方向熱伝導のみのため、ホットスポットが集中しやすくなります。

**Q2. NMVC™を5Gアンテナのすぐ隣に取り付けても信号干渉はありませんか？**
NMVC™は非金属素材で電気伝導性がないため、5G・Wi-Fi・GPS信号を遮断しません。従来の銅ベーパーチャンバーをアンテナ近傍に配置すると受信感度が低下しますが、NMVC™にはその制約がありません。

**Q3. 両製品とも韓国国内在庫からの供給は可能ですか？**
OHI TechはXerendipity（T-Global子会社）の韓国パートナーとしてVapor-Pad™とNMVC™を供給しています。適用環境（電力密度、機器構造、温度条件）をお知らせいただければ、適切な厚さと規格をご提案し、サンプルを提供いたします。

**Q4. NMVC™のQmaxは10W未満ですが、AIサーバーGPUには使えませんか？**
現在NMVC™のQmax上限は10W未満のため、AIサーバーGPU（数百W級）への単独適用は困難です。GPUにはVapor-Pad™を推奨します。NMVC™はスマートフォン・ウェアラブル・小型IoT機器に最適化された製品です。

放熱材料の選定に関するお問い合わせやサンプルテストが必要な場合は、OHI Techまでご連絡ください。jino.kim@ohitech.co.kr`,
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
      ja: "物流倉庫・工場のEV充電インフラ構築 — AC・DC選定と補助金活用ガイド",
    },
    description: {
      ko: "OHI Tech가 물류창고·공장·상업용 주차장에 EV 충전 인프라를 구축하며 확인한 AC·DC 충전기 선택 기준, 실제 도입 비용, 2026년 환경부 보조금 활용법을 공유합니다.",
      en: "Based on OHI Tech's industrial EV charging projects, we share AC vs DC charger selection criteria, real installation costs, and 2026 government subsidy strategies for warehouses, factories, and commercial facilities.",
      zh: "基于OHI Tech工业EV充电项目经验，分享AC/DC充电桩选型标准、实际导入成本及2026年政府补贴申请要点。",
      ja: "OHI Techが物流倉庫・工場・商業用駐車場にEV充電インフラを構築する中で確認したAC・DC充電器の選定基準、実際の導入コスト、2026年の補助金活用法を紹介します。",
    },
    keywords: {
      ko: ["EV 충전기", "전기차 충전기", "전기차 급속충전기", "DC 급속 충전기", "AC 완속 충전기", "초급속 충전기", "대용량 충전기", "산업용 충전기", "상업용 EV 충전", "전기버스 충전기", "전기트럭 충전기", "플릿 충전기", "물류창고 충전기", "공장 충전기", "충전소 구축", "전기차 충전기 납품", "전기차 충전기 공급", "B2B EV 충전", "물류창고 충전", "전기차 충전 보조금", "OCPP 충전 관리", "RongXin", "SKD 충전기", "충전기 국산화", "200kW 충전기", "300kW 충전기"],
      en: ["EV charger", "electric vehicle charger", "DC fast charger", "AC Level 2 charger", "charging station installation", "fleet charger", "industrial EV charging", "commercial EV charging", "B2B EV charging", "EV subsidy Korea", "logistics EV charging", "RongXin", "SKD EV charger", "high power EV charger"],
      zh: ["EV充电桩", "电动车充电桩", "直流快速充电桩", "交流充电桩", "工业充电站", "商业EV充电", "DC快充", "AC慢充", "充电站建设", "车队充电", "B2B充电", "物流园区充电", "OCPP充电管理", "RongXin", "SKD充电桩"],
      ja: ["EV充電器", "電気自動車充電器", "EV急速充電器", "DC急速充電器", "AC普通充電器", "超急速充電器", "大容量充電器", "産業用充電器", "商業用EV充電", "電気バス充電器", "電気トラック充電器", "フリート充電器", "物流倉庫充電器", "工場充電器", "充電ステーション構築", "EV充電器納入", "EV充電器供給", "B2B EV充電", "物流倉庫充電", "EV充電補助金", "OCPP充電管理", "RongXin", "SKD充電器", "充電器現地生産", "200kW充電器", "300kW充電器"],
    },
    body: {
      ko: `**교대 근무가 있는 물류창고는 DC 급속 충전기(50kW+)가 필수이고, 장시간 주차가 가능한 공장·오피스는 AC 완속으로 충분합니다.** 충전 방식을 잘못 선택하면 교대 시간 내 충전 완료가 불가능하거나 설치 비용이 불필요하게 높아집니다. OHI Tech가 산업용·상업용 사업장에 EV 충전 인프라를 직접 구축하며 확인한 선택 기준, 실제 비용, 2026년 보조금 활용법을 공유합니다.

---

## AC vs DC 충전기 — 사업장 유형별 정답이 다릅니다

**교대 근무가 있는 물류창고는 DC 급속 충전기가 필수이고, 종일 주차가 가능한 공장이나 오피스는 AC 완속으로도 충분합니다.**

충전기 출력이 높을수록 공사비와 장비비가 급격히 상승합니다. 용도에 맞지 않는 충전기를 선택하면 예산 낭비가 발생합니다.

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

## 참고 자료

- [환경부 무공해차 통합누리집 — 전기차 충전 인프라·보조금 안내](https://ev.or.kr)
- [Open Charge Alliance — OCPP 공식 표준](https://openchargealliance.org)

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

## References

- [Korea Ministry of Environment EV Portal — Charging Infrastructure & Subsidies](https://ev.or.kr)
- [Open Charge Alliance — Official OCPP Standard](https://openchargealliance.org)

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

## 参考资料

- [韩国环境部电动车门户 — 充电基础设施与补贴指南](https://ev.or.kr)
- [Open Charge Alliance — OCPP 官方标准](https://openchargealliance.org)

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
      ja: `**交代勤務がある物流倉庫にはDC急速充電器（50kW以上）が必須で、長時間駐車が可能な工場・オフィスはAC普通充電で十分です。** 充電方式の選定を誤ると、交代時間内に充電が完了しなかったり、設置コストが不必要に高くなったりします。OHI Techが産業用・商業用施設にEV充電インフラを直接構築する中で確認した選定基準、実際のコスト、2026年の補助金活用法を紹介します。

---

## AC vs DC充電器 — 施設タイプによって正解が異なります

**交代勤務がある物流倉庫にはDC急速充電器が必須で、終日駐車が可能な工場やオフィスはAC普通充電でも十分です。**

充電器の出力が高いほど、工事費と設備費が急激に上昇します。用途に合わない充電器を選ぶと、予算の無駄が発生します。

## 充電器タイプ別比較 — 早見表

![OHI Tech EV充電器ラインナップ — AC Level 2・DC Fast・DC High Power・DZ Modular Series、LG電子正規納入](/images/insights/ev-charger-lineup.png)

| タイプ | 出力 | 50kWh充電時間 | 主な適用例 |
|------|------|--------------|-------------|
| AC普通充電（7kW） | 7kW | 約7時間 | オフィス駐車場、従業員専用 |
| AC普通充電（22kW） | 22kW | 約2.5時間 | 工場・商業施設の複合利用 |
| DC急速充電（50kW） | 50kW | 約60分 | 小型配送車両、物流ハブ |
| DC急速充電（150kW） | 150kW | 約20分 | 電気バス、大型配送トラック |
| DC超急速充電（350kW） | 350kW | 約9分 | 大型電気トラック、フリートターミナル |

バッテリー容量100kWh以上の電気トラックは、DC 150kW以上の充電器がなければ交代勤務サイクル（4〜6時間）内での満充電が困難です。

---

## 施設タイプ別推奨構成

### 物流倉庫・配送センター
**最大の課題は交代勤務の間にバッテリーを満充電にすること**です。充電時間が運用サイクル内に収まらなければ、車両稼働率が低下します。

推奨構成例：
- 大型電気トラック（300kWh以上）：DC 350kW × 2〜4基
- 小型配送車両（60〜100kWh）：DC 50〜150kW × 4〜8基
- 電動フォークリフト：AC 22kW × 必要数

### 工場・製造業
従業員駐車場を基準に駐車時間が8時間以上であれば、AC 22kWでもほとんどの場合満充電が可能です。駐車スペースの**20〜30%にAC充電器**を配置することを推奨します。

役員・来客用にDC 50kWを1〜2基追加すれば、柔軟に対応できます。

### 商業用駐車場
駐車時間中の充電料金で追加収益を生み出すモデルです。平均駐車時間が2時間未満であればDC急速充電、3時間以上であればAC普通充電が投資回収に有利です。

---

## 実際の構築コスト — 設備費と工事費

| 項目 | 費用範囲 |
|------|---------|
| AC 7kW充電器（1基、設置込み） | 100万〜300万ウォン |
| AC 22kW充電器（1基、設置込み） | 300万〜700万ウォン |
| DC 50kW充電器（1基、設置込み） | 2,000万〜4,000万ウォン |
| DC 150kW以上（1基、設置込み） | 5,000万〜1億ウォン以上 |
| 契約電力増設工事 | 500万〜5,000万ウォン（現場条件により変動） |
| OCPP課金管理システム | 100万〜500万ウォン／年 |

OHI Techの経験では、**最も見落とされがちなコストは契約電力増設工事費**です。DC急速充電器を複数同時に運用すると電気基本料金が急増する可能性があるため、ESS（エネルギー貯蔵システム）との連携方式も併せて検討することをお勧めします。

---

## 2026年 補助金活用法

補助金の支給額と条件は年度・自治体ごとに異なり、毎年初めに韓国環境部・自治体の公告を通じて確定します。必ず韓国環境部の無公害車統合ポータル（ev.or.kr）または管轄自治体の公告をご自身で確認してください。

主な支援項目：
- **AC普通充電器**：1基あたり定額支援
- **DC急速充電器**：1基あたり定額支援（ACより高水準）
- **事業所設置追加インセンティブ**：老朽建物や脆弱地域への設置時に加算支援の可能性あり

補助金は**先着順で締め切られる**ケースがほとんどのため、上半期の初め（1〜2月）の申請が有利です。OHI Techは補助金申請書類の準備から許認可代行まで支援します。

---

## 参考資料

- [韓国環境部 無公害車統合ポータル — EV充電インフラ・補助金案内](https://ev.or.kr)
- [Open Charge Alliance — OCPP公式規格](https://openchargealliance.org)

## よくある質問（FAQ）

**Q1. AC普通充電とDC急速充電、どちらが経済的ですか？**
A. 初期投資の観点ではAC普通充電が圧倒的に安価です。しかし車両が交代勤務の間に満充電される必要がある場合は、DC急速充電が不可欠です。駐車可能時間が6時間以上であればAC 22kW、それ以下であればDC急速充電を推奨します。

**Q2. 建物の契約電力は必ず増設する必要がありますか？**
A. DC 50kW以上の充電器を複数運用する場合、多くのケースで契約電力の増設が必要です。ただし、ESS（エネルギー貯蔵システム）を連携させればピーク電力を抑制でき、契約電力の増設なしで運用できる場合もあります。現場条件により異なるため、OHI Techに事前診断をご依頼ください。

**Q3. OCPP充電管理システムは必ず必要ですか？**
A. 充電器が10基以上、または外部利用者に課金する必要がある場合、OCPPベースの管理システムは必須です。社内従業員専用で10基未満であれば、単純なON/OFF制御のみでも運用可能です。

**Q4. 補助金の申請はどのように始めればよいですか？**
A. 韓国環境部の無公害車統合ポータル（ev.or.kr）で年度別の支援公告を確認し、OHI Techに設置相談をご依頼いただければ、書類準備から申請まで代行いたします。

---

EV充電インフラの導入に関するお問い合わせや現場診断が必要な場合は、OHI Techまでご連絡ください。実際の事業所条件を確認した上で、最適な充電器構成と補助金活用プランをご案内いたします。

お問い合わせ：jino.kim@ohitech.co.kr`,
    },
  },
  {
    slug: "ev-charger-skd-localization",
    category: "ev-charging",
    relatedProductPath: "ev-charging",
    publishedAt: new Date("2026-06-08"),
    updatedAt: new Date("2026-06-08"),
    title: {
      ko: "전기차 충전기 SKD 공급이란? 보조금 받는 국산 조립 조건 정리",
      en: "What Is SKD Supply for EV Chargers? Korea Localization & Subsidy Conditions",
      zh: "电动车充电桩SKD供应是什么？补贴所需的国产组装条件整理",
      ja: "電気自動車充電器のSKD供給とは？補助金対象となる国内組立条件まとめ",
    },
    description: {
      ko: "정부 보조금 대상 전기차 충전기는 국산화 요건이 핵심입니다. OHI Tech가 RongXin 충전기를 SKD(부품) 공급 + 한국 현지 조립으로 공급하며 확인한 보조금·KC 인증·정부 규격 충족 방법을 정리합니다.",
      en: "For EV chargers eligible for government subsidies, localization is the key requirement. Based on OHI Tech's experience supplying RongXin chargers via SKD (component) supply plus local assembly in Korea, here is how SKD meets subsidy, KC certification, and government-spec requirements.",
      zh: "符合政府补贴的电动车充电桩，国产化要求是核心。基于OHI Tech以SKD（部件）供应+韩国本地组装方式供应RongXin充电桩的经验，整理SKD如何满足补贴、KC认证及政府规格要求。",
      ja: "政府補助金の対象となる電気自動車充電器では、国産化要件が鍵となります。OHI TechがRongXin製充電器をSKD（部品）供給+韓国現地組立で供給する中で確認した、補助金・KC認証・政府規格への対応方法を整理します。",
    },
    keywords: {
      ko: ["전기차 충전기 SKD", "SKD 충전기", "충전기 국산화", "국산 조립 충전기", "현지 조립 충전기", "전기차 충전기 보조금", "환경부 충전기 보조금", "기후에너지환경부 충전기", "KC 인증 충전기", "충전기 국산화 요건", "DC 급속충전기", "AC 완속충전기", "OCPP 충전기", "ISO 15118", "전기차 충전기 납품", "전기차 충전기 공급", "RongXin", "용신 충전기", "충전기 SKD 조립", "보조금 충전기 조건"],
      en: ["EV charger SKD", "SKD EV charger", "EV charger localization", "local assembly EV charger", "EV charger subsidy Korea", "KC certification EV charger", "Korea government EV charger spec", "DC fast charger", "AC charger", "OCPP charger", "ISO 15118", "RongXin", "EV charger supply Korea"],
      zh: ["电动车充电桩SKD", "SKD充电桩", "充电桩国产化", "本地组装充电桩", "电动车充电桩补贴", "KC认证充电桩", "韩国政府充电桩规格", "直流快速充电桩", "交流充电桩", "OCPP充电桩", "ISO 15118", "RongXin", "容新充电桩", "韩国充电桩供应"],
      ja: ["EV充電器 SKD", "SKD充電器", "充電器国産化", "国産組立充電器", "現地組立充電器", "EV充電器補助金", "環境省充電器補助金", "気候エネルギー環境部 充電器", "KC認証充電器", "充電器国産化要件", "DC急速充電器", "AC普通充電器", "OCPP充電器", "ISO 15118", "EV充電器納入", "EV充電器供給", "RongXin", "容新充電器", "充電器SKD組立", "補助金充電器条件"],
    },
    body: {
      ko: `**전기차 충전기를 완제품으로 수입하면 정부 보조금 충전기의 국산화 요건을 충족하기 어렵습니다. 부품(SKD)을 공급받아 한국에서 직접 조립하면 국산화 요건과 정부 규격에 대응하도록 설계하고 KC 인증 취득을 추진할 수 있습니다.** OHI Tech가 RongXin 충전기를 SKD + 현지 조립으로 공급하며 확인한 조건을 정리합니다.

## 결론부터: SKD 공급이 보조금 충전기의 답인 이유

**완제품 수입 대신 부품(SKD)을 들여와 국내에서 조립하는 방식은 국산화 인정과 정부 보조금 충전기 기준에 대응하도록 설계됐습니다. 최종 적격 여부는 KC 인증 취득과 보조금 사업별 기준에 따라 확정됩니다.**

해외 완제품을 그대로 들여오면 보조금 대상에서 불리하고, KC 인증과 A/S도 해외에 의존하게 됩니다. SKD 방식은 이 구조를 바꿉니다.

## SKD가 뭔가요? — 완제품 수입과의 차이

SKD(Semi Knock Down)는 충전기를 **부품 단위로 공급받아 한국에서 조립**하는 방식입니다.

완제품을 그대로 사 오는 것이 아니라, 외함·파워모듈·컨트롤러 등을 들여와 현지에서 조립·검증하므로 국산화 인정과 인증 취득에 유리합니다.

| 항목 | 완제품 수입 | SKD + 현지 조립 |
|------|------------|----------------|
| **국산화 인정** | 어려움 | 가능 |
| **보조금 충전기 기준** | 제한적 | 대응 설계(인증 진행 중) |
| **KC 안전확인** | 수입자 부담·지연 | 현지 조립으로 취득 추진 |
| **A/S·납기** | 해외 의존 | 국내 대응 |
| **부품 교체·커스터마이즈** | 제한 | 인증 요건 따라 조정 |
| **원가 구조** | 높음 | 상대적으로 낮음 |

![RongXin DC 급속충전기 — CCS1/CCS2/GB-T/NACS 멀티 표준, 지능형 액냉 | OHI Tech](/images/products/ev/rongxin-dc-charger.png)

## 어떤 부품이 SKD로 공급되나요?

급속(DC)·완속(AC) 모두 SKD 단위 공급이 가능하며, 한국 현지 조립 요건에 맞춰 구성을 조정합니다.

주요 공급 부품은 다음과 같습니다.

- 외함(Enclosure), 파워모듈, 메인 컨트롤러 보드
- 전력량계, 충전 케이블·커넥터, 디스플레이
- RFID 모듈, PLC 모듈, 배선 하네스, 냉각팬
- 콘택터, 누전보호(RCD), 비상정지 스위치, 필터, 배선용 차단기(MCCB)

## 정부 규격은 어떻게 충족하나요?

기후에너지환경부 공식 지침 기준에 맞춰 설계·검증합니다. 핵심 항목별 대응 현황은 다음과 같습니다.

| 정부 규격 요구 | 대응 현황 |
|---------------|----------|
| EV–충전기 통신 (DIN 70121 / ISO 15118) | 지원 |
| 서버 통신 OCPP 1.6 이상 | OCPP 1.6J 지원 (2.0.1 업그레이드 가능) |
| 효율·역률 (효율 ≥95%, 역률 0.95↑) | 효율 ≥95%(피크 96%), 역률 0.99↑(200kW) |
| 원격 F/W 업데이트 | OTA 업데이트 지원 |
| 결제 (카드·RFID·QR·앱) | 지원 + 한국 CMS 연동·한글 UI |

## 인증은 어디까지 준비됐나요?

**CE는 보유**하고 있으며, KC 안전확인·고효율기자재·OCPP 인증은 현지 조립과 함께 신청·취득을 추진합니다.

핵심 부품은 인증 요건에 따라 조정·교체가 가능하므로, 국내 인증 시험 통과에 맞춰 구성을 맞출 수 있습니다.

## 제조사는 어떤 지원을 하나요?

부품 공급에서 끝나지 않습니다. 조립 매뉴얼·배선도 제공은 물론, 원격 기술지원·온라인 교육·시운전(commissioning)까지 지원합니다.

필요 시 제조사 공장 방문 기술 교육도 가능해, 현지 조립 품질을 안정적으로 확보할 수 있습니다.

## 참고 자료

- [환경부 무공해차 통합누리집 — 충전기 보조금 사업 안내](https://ev.or.kr)
- [국가기술표준원 — KC 인증 제도 안내](https://www.kats.go.kr)

## 자주 묻는 질문 (FAQ)

**Q1. SKD로 조립하면 정말 국산으로 인정되나요?**
부품을 들여와 국내에서 실질적인 조립·검증 공정을 거치면 국산화 요건 충족에 유리합니다. 보조금 사업별 세부 기준은 사양서를 기준으로 사전 검토해 드립니다.

**Q2. KC 인증이 아직 없는데 도입해도 되나요?**
CE는 보유하고 있고, KC 안전확인·고효율기자재 인증은 현지 조립과 함께 취득을 추진합니다. 핵심 부품은 인증 요건에 맞춰 조정 가능하므로 국내 시험 통과를 전제로 진행합니다.

**Q3. 어떤 출력대까지 SKD로 공급되나요?**
AC 완속 7~22kW, DC 급속 20~600kW, Split Power 480~2,560kW+까지 공급 가능합니다. 사업장 용도와 충전 시나리오에 맞춰 구성을 제안해 드립니다.

전기차 충전기 보조금·국산화 조건이나 SKD 조립 도입을 검토 중이시라면, 사업장 조건과 목표 출력을 알려주세요. OHI Tech가 사양 검토부터 조립·인증 추진까지 안내해 드립니다. jino.kim@ohitech.co.kr

→ [RongXin EV 충전기 전 라인업 보기](/products/ev-charging)`,
      en: `Importing EV chargers as finished units makes it hard to meet the localization requirement for government-subsidized chargers. Supplying components (SKD) and assembling them in Korea is designed to support localization and government-spec requirements while KC certification is pursued. Here is what OHI Tech confirmed while supplying RongXin chargers via SKD plus local assembly.

## Quick Answer: Why SKD Supply Is the Path to Subsidy-Eligible Chargers

**Bringing in components (SKD) and assembling locally — rather than importing finished units — is designed to support localization and government subsidy charger standards. Final eligibility depends on KC certification and each subsidy program's criteria.**

Importing finished units is disadvantaged for subsidies and leaves KC certification and after-sales dependent on overseas suppliers. SKD changes that structure.

## What Is SKD? How It Differs from Importing Finished Units

SKD (Semi Knock Down) means receiving the charger **as components and assembling it in Korea**.

Instead of buying a finished unit, the enclosure, power module, controller, and other parts are imported and assembled and verified locally — which helps with localization recognition and certification.

| Item | Finished-unit Import | SKD + Local Assembly |
|------|---------------------|----------------------|
| **Localization recognition** | Difficult | Possible |
| **Subsidy charger standard** | Limited | Designed to support (cert in progress) |
| **KC safety certification** | Importer burden / delay | Pursued via local assembly |
| **After-sales / lead time** | Overseas-dependent | Domestic response |
| **Part swap / customization** | Limited | Adjustable per cert needs |
| **Cost structure** | Higher | Relatively lower |

![RongXin DC fast charger — CCS1/CCS2/GB-T/NACS multi-standard, intelligent liquid cooling | OHI Tech](/images/products/ev/rongxin-dc-charger.png)

## Which Components Are Supplied as SKD?

Both DC fast and AC chargers can be supplied as SKD, with the configuration adjusted to Korean local-assembly requirements.

Key supplied components include:

- Enclosure, power module, main controller board
- Energy meter, charging cable and connector, display
- RFID module, PLC module, wiring harness, cooling fan
- Contactor, residual current device (RCD), emergency-stop switch, filter, molded-case circuit breaker (MCCB)

## How Are Government Specs Met?

The design is verified against the Korean Ministry's official guideline. Compliance by key item:

| Government Requirement | Status |
|------------------------|--------|
| EV–charger comms (DIN 70121 / ISO 15118) | Supported |
| Server comms OCPP 1.6+ | OCPP 1.6J (upgradeable to 2.0.1) |
| Efficiency / power factor (≥95% / ≥0.95) | Efficiency ≥95% (peak 96%), PF ≥0.99 (200kW) |
| Remote firmware update | OTA supported |
| Payment (card / RFID / QR / app) | Supported + Korean CMS, Korean UI |

## How Far Along Is Certification?

**CE is held.** KC safety, high-efficiency, and OCPP certifications are pursued together with local assembly.

Core components can be adjusted or swapped per certification requirements, so the configuration can be matched to pass domestic testing.

## What Support Does the Manufacturer Provide?

It does not stop at component supply. Assembly manuals and wiring diagrams are provided, along with remote technical support, online training, and commissioning.

Factory-based technical training is also available, securing stable local-assembly quality.

## References

- [Korea Ministry of Environment EV Portal — Charger Subsidy Programs](https://ev.or.kr)
- [KATS (Korean Agency for Technology and Standards) — KC Certification](https://www.kats.go.kr)

## FAQ

**Q1. Does SKD assembly really count as localization?**
Importing components and performing substantial local assembly and verification helps meet localization requirements. We review detailed per-program subsidy criteria against the spec sheet in advance.

**Q2. Can we adopt it before KC certification is complete?**
CE is held, and KC safety and high-efficiency certifications are pursued alongside local assembly. Core components are adjustable per cert requirements, so we proceed on the basis of passing domestic testing.

**Q3. Which power ranges are available as SKD?**
AC 7~22kW, DC fast 20~600kW, and Split Power 480~2,560kW+ are available. We propose a configuration matched to your site and charging scenario.

If you are reviewing EV charger subsidy / localization conditions or SKD assembly adoption, tell us your site conditions and target output. OHI Tech guides you from spec review through assembly and certification. jino.kim@ohitech.co.kr

→ [See the full RongXin EV charger lineup](/products/ev-charging)`,
      zh: `将电动车充电桩作为成品进口，很难满足政府补贴充电桩的国产化要求。以部件（SKD）供应并在韩国本地组装，旨在对应国产化和政府规格要求，并推进KC认证取得。以下整理OHI Tech以SKD+本地组装方式供应RongXin充电桩时确认的条件。

## 先说结论：为何SKD供应是补贴充电桩的答案

**以部件（SKD）进口并在国内组装，而非进口成品，旨在对应国产化和政府补贴充电桩标准。最终资格取决于KC认证取得及各补贴项目的标准。**

直接进口成品在补贴方面处于劣势，KC认证和售后也依赖海外。SKD方式改变了这一结构。

## SKD是什么？与进口成品的区别

SKD（Semi Knock Down）是指**以部件形式供应充电桩并在韩国组装**。

并非购买成品，而是进口外壳、电源模块、控制器等部件并在本地组装和验证，因而有利于国产化认定和认证取得。

| 项目 | 进口成品 | SKD + 本地组装 |
|------|---------|----------------|
| **国产化认定** | 困难 | 可行 |
| **补贴充电桩标准** | 受限 | 对应设计（认证进行中） |
| **KC安全确认** | 进口方负担·延迟 | 通过本地组装推进取得 |
| **售后·交期** | 依赖海外 | 国内响应 |
| **部件更换·定制** | 受限 | 按认证要求调整 |
| **成本结构** | 较高 | 相对较低 |

![RongXin直流快充——CCS1/CCS2/GB-T/NACS多标准，智能液冷 | OHI Tech](/images/products/ev/rongxin-dc-charger.png)

## 哪些部件以SKD供应？

直流快充和交流充电桩均可SKD供应，并按韩国本地组装要求调整配置。

主要供应部件包括：

- 外壳、电源模块、主控制器板
- 电能表、充电电缆与连接器、显示屏
- RFID模块、PLC模块、线束、冷却风扇
- 接触器、漏电保护（RCD）、急停开关、滤波器、塑壳断路器（MCCB）

## 如何满足政府规格？

按照韩国气候能源环境部官方指南进行设计和验证。各关键项目对应情况如下：

| 政府规格要求 | 对应情况 |
|-------------|----------|
| EV–充电桩通信（DIN 70121 / ISO 15118） | 支持 |
| 服务器通信 OCPP 1.6以上 | 支持OCPP 1.6J（可升级至2.0.1） |
| 效率·功率因数（效率≥95%、功率因数≥0.95） | 效率≥95%（峰值96%），功率因数≥0.99（200kW） |
| 远程固件更新 | 支持OTA |
| 支付（卡·RFID·二维码·App） | 支持 + 韩国CMS对接·韩文UI |

## 认证准备到什么程度？

**已持有CE。** KC安全确认、高效器材、OCPP认证正结合本地组装推进申请和取得。

核心部件可按认证要求调整或更换，因此可按通过国内测试为前提进行配置。

## 制造商提供哪些支持？

不止于部件供应。提供组装手册、接线图，以及远程技术支持、在线培训和调试（commissioning）。

必要时还可进行制造商工厂技术培训，稳定确保本地组装质量。

## 参考资料

- [韩国环境部电动车门户 — 充电桩补贴项目指南](https://ev.or.kr)
- [韩国国家技术标准院（KATS）— KC 认证制度](https://www.kats.go.kr)

## 常见问题（FAQ）

**Q1. SKD组装真的被认定为国产吗？**
进口部件并在国内进行实质性组装和验证，有利于满足国产化要求。各补贴项目的详细标准，我们将以规格书为准事先审核。

**Q2. KC认证尚未完成可以导入吗？**
已持有CE，KC安全确认和高效器材认证正结合本地组装推进取得。核心部件可按认证要求调整，因此以通过国内测试为前提进行。

**Q3. 哪些功率段可SKD供应？**
交流7~22kW、直流快充20~600kW、Split Power 480~2,560kW+均可供应。我们将按场地用途和充电场景提出配置方案。

如您正在审查电动车充电桩补贴·国产化条件或SKD组装导入，请告知场地条件和目标功率。OHI Tech将从规格审核到组装和认证推进为您提供指导。jino.kim@ohitech.co.kr

→ [查看RongXin EV充电桩全系列](/products/ev-charging)`,
      ja: `**電気自動車充電器を完成品として輸入すると、政府補助金充電器の国産化要件を満たすことは困難です。部品（SKD）の供給を受け韓国国内で直接組立を行えば、国産化要件および政府規格に対応する設計とし、KC認証の取得を進めることができます。** OHI TechがRongXin製充電器をSKD+現地組立で供給する中で確認した条件を整理します。

## 結論から: SKD供給が補助金充電器の答えである理由

**完成品輸入の代わりに部品（SKD）を導入し国内で組み立てる方式は、国産化認定と政府補助金充電器基準に対応するよう設計されています。最終的な適格性はKC認証の取得と各補助金事業の基準によって確定します。**

海外の完成品をそのまま輸入すると補助金対象として不利になり、KC認証やアフターサービスも海外に依存することになります。SKD方式はこの構造を変えます。

## SKDとは何ですか？ — 完成品輸入との違い

SKD（Semi Knock Down）とは、充電器を**部品単位で供給を受け、韓国国内で組み立てる**方式です。

完成品をそのまま購入するのではなく、筐体・パワーモジュール・コントローラーなどを輸入し、現地で組立・検証を行うため、国産化認定や認証取得に有利です。

| 項目 | 完成品輸入 | SKD + 現地組立 |
|------|------------|----------------|
| **国産化認定** | 困難 | 可能 |
| **補助金充電器基準** | 限定的 | 対応設計（認証取得中） |
| **KC安全確認** | 輸入者負担・遅延 | 現地組立で取得推進 |
| **アフターサービス・納期** | 海外依存 | 国内対応 |
| **部品交換・カスタマイズ** | 制限あり | 認証要件に応じて調整 |
| **コスト構造** | 高い | 相対的に低い |

![RongXin DC急速充電器 — CCS1/CCS2/GB-T/NACSマルチ規格、インテリジェント液冷 | OHI Tech](/images/products/ev/rongxin-dc-charger.png)

## どの部品がSKDで供給されますか？

急速（DC）・普通（AC）いずれもSKD単位での供給が可能で、韓国現地組立の要件に合わせて構成を調整します。

主な供給部品は次のとおりです。

- 筐体（Enclosure）、パワーモジュール、メインコントローラー基板
- 電力量計、充電ケーブル・コネクター、ディスプレイ
- RFIDモジュール、PLCモジュール、配線ハーネス、冷却ファン
- コンタクター、漏電保護（RCD）、非常停止スイッチ、フィルター、配線用遮断機（MCCB）

## 政府規格にはどのように対応していますか？

気候エネルギー環境部の公式指針基準に合わせて設計・検証を行っています。主要項目別の対応状況は次のとおりです。

| 政府規格要求 | 対応状況 |
|---------------|----------|
| EV–充電器通信（DIN 70121 / ISO 15118） | 対応 |
| サーバー通信 OCPP 1.6以上 | OCPP 1.6J対応（2.0.1へアップグレード可能） |
| 効率・力率（効率≥95%、力率0.95以上） | 効率≥95%（ピーク96%）、力率0.99以上（200kW） |
| 遠隔ファームウェア更新 | OTAアップデート対応 |
| 決済（カード・RFID・QR・アプリ） | 対応 + 韓国CMS連携・韓国語UI |

## 認証はどこまで準備できていますか？

**CEは保有**しており、KC安全確認・高効率機資材・OCPP認証は現地組立と併せて申請・取得を進めています。

主要部品は認証要件に応じて調整・交換が可能なため、国内認証試験の合格に合わせて構成を最適化できます。

## メーカーはどのような支援を提供していますか？

部品供給だけにとどまりません。組立マニュアル・配線図の提供はもちろん、遠隔技術支援・オンライン教育・試運転（コミッショニング）まで支援します。

必要に応じてメーカー工場での訪問技術研修も可能で、現地組立の品質を安定して確保できます。

## 参考資料

- [韓国環境部 無公害車統合ポータル — 充電器補助金事業案内](https://ev.or.kr)
- [国家技術標準院（KATS） — KC認証制度案内](https://www.kats.go.kr)

## よくある質問（FAQ）

**Q1. SKDで組み立てれば、本当に国産と認められますか？**
部品を輸入し、国内で実質的な組立・検証工程を経ることで、国産化要件の充足に有利になります。補助金事業ごとの詳細基準は、仕様書をもとに事前に確認いたします。

**Q2. KC認証がまだない状態でも導入できますか？**
CEは保有しており、KC安全確認・高効率機資材認証は現地組立と併せて取得を進めています。主要部品は認証要件に合わせて調整可能なため、国内試験の合格を前提に進めます。

**Q3. どの出力帯までSKDで供給可能ですか？**
AC普通充電7〜22kW、DC急速充電20〜600kW、Split Power 480〜2,560kW+まで供給可能です。事業所の用途と充電シナリオに合わせて構成をご提案いたします。

電気自動車充電器の補助金・国産化条件やSKD組立の導入をご検討中でしたら、事業所の条件と目標出力をお知らせください。OHI Techが仕様検討から組立・認証の推進までご案内いたします。jino.kim@ohitech.co.kr

→ [RongXin EV充電器の全ラインアップを見る](/products/ev-charging)`,
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
