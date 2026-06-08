// LLM-fill applier (Phase 3): materializes the human/LLM translation step as
// version-controlled data. Reads data/_raw/_ko/<cat>.json, replaces every
// "⟦TODO⟧ <en>" benefit via BENEFIT glossary and fills empty description_ko
// via DESC (keyed by slug). Idempotent + re-runnable after SA4 regenerates.
// Specs untouched (D-2: English/numeric verbatim).
//
// Usage: node scripts/tglobal/fill-ko.mjs

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const KO = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "data", "_raw", "_ko");

// ── Benefit glossary: English phrase (⟦TODO⟧ stripped, trimmed) -> Korean ──
const BENEFIT = {
  "High thermal conductivity": "높은 열전도율",
  "Great reliability": "우수한 신뢰성",
  "Cost effective with great performance": "뛰어난 성능 대비 우수한 가격 경쟁력",
  "Customization services for different industries": "산업별 맞춤 제작 서비스 제공",
  "Ultra thin and extremely flexible, can be freely arrangrd in space.":
    "초박형·고유연성으로 공간에 자유롭게 배치 가능",
  "High Surface resistance (106-109ohms)": "높은 표면 저항(10^6–10^9 Ω)",
  "Easy and fast to process": "가공이 쉽고 빠름",
  "Can be cut any shape easily": "원하는 형상으로 손쉽게 재단 가능",
  "High stability": "높은 안정성",
  "Passive component": "수동형 부품(무전원 동작)",
  "Best for limited space": "협소한 공간에 최적",
  "High thermal conduction/ Low thermal expansion coefficient":
    "높은 열전도성 / 낮은 열팽창계수",
  "Reliable insulation performance": "안정적인 절연 성능",
  "High reliability": "높은 신뢰성",
  "Non-toxic/ High temperature resistance": "무독성 / 고온 내열성",
  "A:B=1:1": "배합비 A:B = 1:1",
  "Cured by room temperature or heating": "상온 또는 가열 경화 가능",
  "Low bleed": "낮은 오일 블리드",
  "High compressibility": "높은 압축성",
  "Self-adhesive": "자기 점착성",
  "Silicone free thermal gel": "실리콘 프리 열전도 겔",
  "Silicone-type spacer with great long term reliability":
    "장기 신뢰성이 우수한 실리콘 스페이서",
  "Lower thermal resistance than thermal pads": "써멀 패드 대비 낮은 열저항",
  "Physical property between liquid and solid state": "액체와 고체 사이의 물성",
  "Can be applied with dispenser": "디스펜서 도포 가능",
  "Good adhesion (Acrylic PSA)": "우수한 접착력(아크릴 PSA)",
  "Ultra high thermal conductivity": "초고열전도율",
  "Low mass decreases space": "경량 설계로 공간 절감",
  "EMI reduction": "EMI(전자파 간섭) 저감",
  "Very good thermal conductivity": "매우 우수한 열전도율",
  "Non-conductive adhessive backing(UL Recognized) available":
    "비전도성 점착 백킹(UL 인증) 적용 가능",
  "Effective in preventing resonance and suppressing coupling":
    "공진 방지 및 커플링 억제에 효과적",
  "Non-conductive adhessive backing(UL Recognized) available.":
    "비전도성 점착 백킹(UL 인증) 적용 가능",
  "Effective in preventing resonance and suppressing coupling.":
    "공진 방지 및 커플링 억제에 효과적",
  "Good thermal dissipation ability": "우수한 방열 성능",
  "Customized design": "맞춤 설계 가능",
  "Pistol friendly & easy assembly": "디스펜싱건 사용이 용이하고 조립이 간편",
  "Good electrical insulation": "우수한 전기 절연성",
  "Lower contact thermal impedance than thermal pads":
    "써멀 패드 대비 낮은 접촉 열저항",
  "Physical property in between liquid and solid state":
    "액체와 고체 사이의 물성",
  "Gap fillers for uneven or irregular surfaces of heat sources and heat sink":
    "발열원과 방열판의 불균일·불규칙 표면용 갭 필러",
  "Applicable for dispenser": "디스펜서 도포 가능",
  "Good adhesion(Acrylic PSA)": "우수한 접착력(아크릴 PSA)",
  "Low thermal resistance": "낮은 열저항",
  "Ultra thin; Low mass": "초박형·경량",
  "Available for unventilated design": "밀폐형(무환기) 설계에 적용 가능",
  "No dusting issue": "분진 발생 없음",
  "With the good flow ability over phase change temperature,surface irregularities can be well filled.":
    "상변화 온도 이상에서 우수한 유동성으로 표면 요철을 효과적으로 충진",
  "High compressibility and compliancy": "높은 압축성과 밀착성",
  "Natural tack": "자연 점착성",
  "Ultra soft and great elongation": "초연질·우수한 신율",
  "Very low thermal impedance": "매우 낮은 열저항",
  "Electrical insulation": "전기 절연",
  "Elimination of different gap between heat source and the heatsink":
    "발열원과 방열판 사이의 단차·간극 제거",
  "Temperature Reduction": "온도 저감",
  "Maintaining Performance": "성능 유지",
  "Prolonged Lifespan": "수명 연장",
  "Easy Installation": "간편한 설치",
  "Improved Cooling Efficiency": "냉각 효율 향상",
  "Excellent mechanical stability under high-temperature processing":
    "고온 공정에서 우수한 기계적 안정성",
  "No warpage after thermal cycling and soldering tests":
    "열 사이클 및 솔더링 시험 후 휨(warpage) 없음",
  "Low coefficient of thermal expansion (CTE), suitable for matching semiconductor materials":
    "낮은 열팽창계수(CTE)로 반도체 소재와의 정합에 적합",
  "High thermal conductivity for rapid and efficient heat dissipation":
    "높은 열전도율로 빠르고 효율적인 방열",
  "Significantly lighter than copper": "구리 대비 현저히 가벼움",
  "Ultra-thin form factor, with thickness down to 1 mm":
    "최소 1 mm까지 가능한 초박형 폼팩터",
  "Pass vibration resistance tests": "내진동 시험 통과",
  "Longer thermal cycling lifespan than copper(Reference: Infineon AN2019‑05 report)":
    "구리 대비 긴 열 사이클 수명(참고: Infineon AN2019‑05 보고서)",
  "Ideal replacement for Copper (Cu) or Molybdenum-Copper (Mo‑Cu) in power modules":
    "파워 모듈에서 구리(Cu)·몰리브덴구리(Mo‑Cu)의 이상적 대체재",
  "Heat flow density change function": "열유속 밀도 변환 기능",
  "Fast temperature uniformity": "빠른 온도 균일화",
  "Great electrical insulation": "우수한 전기 절연성",
  "High reliability and stability": "높은 신뢰성과 안정성",
  "One side is non-sticky and easy to assemble":
    "한쪽 면 비점착으로 조립이 용이",
  "Ultra soft and good compressibility": "초연질·우수한 압축성",
  "Good insulation": "우수한 절연성",
  "Silicone oil free": "실리콘 오일 프리",
  "No overflow": "오버플로우 없음",
  "Low thermal impedance/thermal resistance": "낮은 열저항",
  "Non-silicone base, no Environmental pollution":
    "비실리콘 베이스, 환경 오염 없음",
  "Good leveling & no overflow": "우수한 레벨링·오버플로우 없음",
  "Effectively fill up uneven surfaces": "불균일 표면을 효과적으로 충진",
  "Low thermal resistance/low thermal resistance": "낮은 열저항",
  "Organic silicon base material has no environmental pollution":
    "유기 실리콘 베이스 소재로 환경 오염 없음",
  "Elimination of different heat source gap & heat sink":
    "발열원과 방열판 사이의 단차·간극 제거",
  Features: "주요 특징",
  "Ultra high thermal conductivity,electrical conductivity and EMI shielding effect":
    "초고열전도율·전기전도성 및 EMI 차폐 효과",
  "Flexible, and bendable": "유연하고 굽힘 가능",
  "Ultra thin; Low mass; Environmental": "초박형·경량·친환경",
  "Insulation strength": "절연 내력",
  "Low thermal resistance 0.402 (K in2/W) @ 50psi":
    "낮은 열저항 0.402 (K·in²/W) @ 50psi",
  "Non deforming": "변형 없음",
  "Electeical insulation": "전기 절연",
  "Double side non-tacky": "양면 비점착",
  "Non-Silicone and oil-bleed": "비실리콘·오일 블리드 없음",
  "Non siloxane and oil-bleed": "실록산 프리·오일 블리드 없음",
  "Shapeable and compressible": "성형 가능·압축성 우수",
  "No fluidity": "유동 없음(형상 유지)",
  "Best for north bridge IC": "노스브리지 IC에 최적",
  "Protect based material with high hardness for support":
    "높은 경도로 부품을 견고하게 지지·보호",
  "Room temperature or heating curing": "상온 또는 가열 경화",
  "Epoxy based material with high hardness for support":
    "높은 경도의 에폭시 베이스 소재로 견고한 지지",
  "Protect components from any effect after cure":
    "경화 후 부품을 외부 영향으로부터 보호",
  "Applicable with dispenser": "디스펜서 도포 가능",
  "Free thermal simulation": "무상 열 시뮬레이션 제공",
  "Thermal Consulting": "열 설계 컨설팅",
  "Optimized design": "최적화 설계",
  "Customized prototype": "맞춤 시제품 제작",
  "Small bulk, light weight": "소형·경량",
  "Vibration-free, noise-free": "무진동·무소음",
  "High reliability, high strength for rugged environments":
    "가혹 환경에 견디는 높은 신뢰성·강도",
  "Precise temperature control": "정밀 온도 제어",
  "RoHs and Reach compliant": "RoHS 및 REACH 규격 준수",
  "Bespoke designs available": "맞춤 설계 가능",
  "Two-dimensional surface propagation": "2차원 면 방향 열 확산",
  "Two-dimensional heat transfer": "2차원 열전달",
  "10 times more efficient than a heat pipe": "히트파이프 대비 10배 높은 효율",
};

// ── Description: slug -> Korean (~합니다체, model numbers/units verbatim) ──
const DESC = {
  "cmc-alsic-heat-spreader":
    "세라믹 매트릭스 복합소재(CMC)가 열전도율을 높여 전자 부품에서 효율적인 방열을 구현합니다. 초박형 구조와 낮은 열팽창계수로 파워 모듈에서 구리·몰리브덴구리를 대체하기에 이상적입니다.",
  fan:
    "냉각팬은 전기기계·전자제품 등 다양한 산업 제품의 열관리에 사용되는 핵심 부품입니다. 공기 흐름을 형성해 장비 온도를 낮추고, 발열로 인한 성능 저하 없이 산업용 전기·전자 기기가 높은 효율을 유지하도록 돕습니다.",
  "heat-pipe":
    "히트파이프 설계는 적용처의 발열량, 열 성능 요구사항, 물리적 제약을 평가하는 데서 시작합니다. 산출된 열 요구량을 바탕으로 증발부·응축부 길이, 벤딩 수, 소재를 결정하고, CAD 기반 3D 모델링으로 윅 구조의 모세관 작용과 상변화 효율을 시뮬레이션합니다. 플래트닝·벤딩·관 두께도 성능 지표에 맞춰 보정합니다. 예를 들어 45° 벤딩마다 열용량이 약 2.5% 감소하며, 더 납작한 형상은 접촉 면적을 넓혀 열 수용 능력을 높입니다. 정밀화된 모델은 양산 전 시제품으로 열 수송 효율을 검증합니다.",
  "metal-heat-sink-20mm":
    "히트싱크는 기구 하우징과 방열이라는 두 가지 역할을 동시에 수행합니다. 스탬핑·압출·다이캐스팅·단조 등으로 제작되며, 주방열 부품이자 기구 부품으로 사용할 수 있습니다. 양극산화·연마·전해 착색·샌드블라스팅·아연/주석/니켈 도금·도장 등 다양한 표면 처리가 가능합니다. 고객별 요구에 맞춘 다양한 방열 모듈 설계를 지원합니다.",
  "metal-heat-sinks-21-30mm":
    "히트싱크는 기구 하우징과 방열이라는 두 가지 역할을 동시에 수행합니다. 스탬핑·압출·다이캐스팅·단조 등으로 제작되며, 주방열 부품이자 기구 부품으로 사용할 수 있습니다. 양극산화·연마·전해 착색·샌드블라스팅·아연/주석/니켈 도금·도장 등 다양한 표면 처리가 가능합니다. 고객별 요구에 맞춘 다양한 방열 모듈 설계를 지원합니다.",
  "tg-asd35ab":
    "본 열전도 겔은 25°C 이하의 원포장 미개봉 상태로 보관 시, 로트 번호 기준 제조일로부터 12개월의 사용 기한을 가집니다.",
  "tg-ad75":
    "초연질 써멀 패드로 높은 열전도율과 우수한 압축성을 갖춰 열저항을 효과적으로 낮추고 방열 성능을 향상시킵니다.",
  "tg-ad66":
    "초연질 질감으로 전자 부품과 방열판 사이의 간극을 효과적으로 메워 빈틈 없는 밀착을 구현합니다.",
  "tg-ad30":
    "초연질 질감으로 전자 부품과 방열판 사이의 간극을 효과적으로 메워 빈틈 없는 밀착을 구현합니다.",
  "tg-a5000l":
    "실리콘 오일의 분리를 효과적으로 억제해 오버플로우 우려를 줄이고, 소재의 안정성과 내구성을 높입니다.",
  "tg-a3200l":
    "낮은 오일 블리드와 우수한 전기 절연성을 갖춰 폭넓은 일반 전자 장비에 적합하며, 소재의 안정성과 내구성을 높입니다.",
  "tg-a1800l":
    "특수 배합 소재를 사용해 오버플로우 발생 시 실리콘 오일의 확산을 효과적으로 억제합니다.",
  "tg-a20kx":
    "특수 공정으로 실리콘을 베이스로 열전도 분말과 난연제를 혼합해 열계면 소재를 구현하여 발열원과 방열판 사이의 열저항을 효과적으로 낮춥니다. TG-A20KX는 T-Global이 2020년 개발한 신제품으로, 2.0 W/m·K 열전도율의 열전도 실리콘 필름입니다. 변형이 잘 일어나지 않고 구조 안정성과 열전도성이 우수하며 양면 자기 점착성을 갖춰, 발열원 표면과 방열판 접촉면 사이의 열저항을 효과적으로 줄입니다.",
  "tg-a20kf":
    "특수 공정으로 실리콘을 베이스로 열전도 분말과 난연제를 혼합해 열계면 소재를 구현하여 발열원과 방열판 사이의 열저항을 효과적으로 낮춥니다. TG-A20KF는 1.8 W/m·K 열전도율의 유리섬유 강화 열전도 실리콘 소재로, 자기 점착성과 유리섬유 특성을 갖춰 내천공성이 높고 변형이 잘 일어나지 않습니다. -40 ~ +180°C에서 정상 동작하며, 방열이 필요한 기기 및 고전압 장비에 우수한 열전도·절연 성능을 제공합니다.",
  "tg-a2200":
    "특수 공정으로 실리콘을 베이스로 열전도 분말과 난연제를 혼합해 열계면 소재를 구현하여 발열원과 방열판 사이의 열저항을 효과적으로 낮춥니다.",
  "tg-n909":
    "TG-N909는 T-Global이 출시한 9 W/m·K 열전도율의 비실리콘 열전도 페이스트입니다. 실록산이 없어 실리콘 수지 증발이나 실리콘 오일 석출이 발생하지 않으며, 낮은 열저항으로 고출력 칩에서 발생하는 열을 효과적으로 흡수해 전자 부품의 효율과 수명을 향상시킵니다.",
  "tg-as808-tg-s808":
    "TG-AS808은 T-Global의 다년간 소재 연구개발 경험이 축적된 8 W/m·K 열전도율의 써멀 페이스트로, 2019년 출시 당시 업계 최고 수준의 열전도 페이스트입니다. 우수한 레벨링으로 금속 접촉면의 요철을 효과적으로 메워 열효율을 높이며, 주로 고출력 웨이퍼에 사용됩니다.",
  "tg-as606c-s606c":
    "S606C는 5.3 W/m·K 열전도율의 써멀 페이스트입니다. 써멀 컴파운드로도 불리며 주로 컴퓨터 IC 웨이퍼 등에서 방열판의 방열을 보조합니다. 얇게 도포할 수 있어 열계면 소재의 두께를 최소화하고 열저항을 최대한 낮춥니다.",
  "tg-n8000":
    "실리콘 오일을 첨가하지 않은 고열전도 소재로 전자 부품과 방열판 사이의 간극을 메웁니다. 안정적인 열전도성을 유지하고 손실·건조에 강하며 전자 부품을 오염시키지 않습니다. 고온 내열성과 친환경성을 갖춰 고온 환경에서 부품의 최적 성능을 보장하고 과열 손상을 방지합니다.",
  "tg-n4000-putty":
    "액체와 고체의 중간 물성을 가진 열전도 퍼티로, 두 면 사이의 작고 불균일한 간극을 효과적으로 메웁니다. 매우 낮은 열저항으로 열전도 효율을 크게 높이며, 저분자 실록산을 함유하지 않아 전기 접점 불량을 유발하지 않습니다. 민감한 전자 부품을 포함한 광학 제품·기구에 특히 적합하며, 장기간 우수한 열전도 특성을 안정적으로 유지합니다.",
  "tg-a7000-putty":
    "TG-A7000은 7.0 W/m·K의 초고열전도율을 갖춘 써멀 퍼티로, 제품의 방열 성능을 최적화하면서도 매우 낮은 열저항을 제공합니다. 페이스트형 점착 소재라 제품 설계 시 크기·공차 제약을 크게 고려할 필요가 없어 최적 효과에 맞춰 유연하게 설계할 수 있습니다.",
  "tg-t1000t":
    "높은 열전도율·점착성과 낮은 열저항을 갖춘 제품입니다. 높은 점착력으로 전자 부품을 고정할 수 있어 써멀 그리스의 우수한 대체재이며, 발열원과 방열판 사이의 불균일한 표면을 메워 열을 방열판으로 전달하고 제품 온도를 낮춥니다.",
  "tg-t1000":
    "높은 열전도율·점착성과 낮은 열저항을 갖춘 제품입니다. 높은 점착력으로 전자 부품을 고정할 수 있어 써멀 그리스의 우수한 대체재이며, 발열원과 방열판 사이의 불균일한 표면을 메워 열을 방열판으로 전달하고 제품 온도를 낮춥니다.",
  li98cn:
    "높은 열전도율·점착성과 낮은 열저항을 갖춰 써멀 그리스의 우수한 대체재로, 발열원과 방열판 사이의 불균일한 표면을 메워 방열합니다. Li98CN은 2.1 W/m·K 열전도율의 열전도 테이프로, 우수한 그립과 높은 신뢰성·접착력을 갖춰 쉽게 떨어질 우려가 없습니다. 가공이 쉽고 고객 요구에 맞춰 맞춤 제작이 가능하며 가성비가 매우 뛰어납니다.",
  li98c:
    "높은 열전도율·점착성과 낮은 열저항을 갖춰 써멀 그리스의 우수한 대체재로, 발열원과 방열판 사이의 불균일한 표면을 메워 방열합니다. Li98C는 1 W/m·K 열전도율의 열전도 테이프로, 우수한 그립과 높은 신뢰성·접착력을 갖춰 쉽게 떨어질 우려가 없습니다. 가공이 쉽고 고객 요구에 맞춰 맞춤 제작이 가능하며 가성비가 매우 뛰어납니다.",
  li98t:
    "높은 열전도율·점착성과 낮은 열저항을 갖춰 써멀 그리스의 우수한 대체재로, 발열원과 방열판 사이의 불균일한 표면을 메워 방열합니다. Li98T는 1.3 W/m·K 열전도율의 열전도 테이프로, 우수한 그립과 높은 신뢰성·접착력을 갖춰 쉽게 떨어질 우려가 없습니다. 가공이 쉽고 고객 요구에 맞춰 맞춤 제작이 가능하며 가성비가 매우 뛰어납니다.",
  cp22:
    "CP 22/23/33은 2 W/m·K 열전도율과 완충 절연 특성을 갖춘 엔드 캡으로, TO-220·TO-247 트랜지스터에 사용하기 적합합니다. 취급이 쉽고 생산 라인 조립이 편리하며, 트랜지스터와 알루미늄 방열판용 열계면 소재로 사용됩니다. 크기는 맞춤 제작이 가능합니다.",
  cp23:
    "CP 22/23/33은 2 W/m·K 열전도율과 완충 절연 특성을 갖춘 엔드 캡으로, TO-220·TO-247 트랜지스터에 사용하기 적합합니다. 취급이 쉽고 생산 라인 조립이 편리하며, 트랜지스터와 알루미늄 방열판용 열계면 소재로 사용됩니다. 크기는 맞춤 제작이 가능합니다.",
  cp33:
    "CP 22/23/33은 2 W/m·K 열전도율과 완충 절연 특성을 갖춘 엔드 캡으로, TO-220·TO-247 트랜지스터에 사용하기 적합합니다. 취급이 쉽고 생산 라인 조립이 편리하며, 트랜지스터와 알루미늄 방열판용 열계면 소재로 사용됩니다. 크기는 맞춤 제작이 가능합니다.",
  t62:
    "T62 흑연 시트는 최대 400 W/m·K의 열전도율을 경량·박형 구조에서 구현합니다. 구리 대비 2배의 열확산 성능을 제공하면서 무게는 1/5에 불과하며, 합성 흑연 시트의 1/3 가격으로 가성비가 뛰어납니다. 가공·재단이 쉽고 양면 테이프·절연재와 함께 양산이 용이하며, 탄소 함량 98 wt% 이상으로 EU 환경 기준을 충족하는 친환경 열관리 솔루션입니다.",
  "t62-1":
    "T62 흑연 시트는 최대 400 W/m·K의 열전도율을 경량 구조에서 구현하며 무게는 구리의 1/5에 불과합니다. 구리 대비 2배의 열확산 성능을 제공하고 전자파 간섭을 저감합니다. 합성 흑연 시트의 1/3 가격으로 가성비가 뛰어나고 양산 가공이 용이하며, 탄소 함량 98 wt% 이상으로 EU 환경 기준을 준수합니다.",
  "t62-2":
    "T62는 최대 400 W/m·K의 열전도율을 갖춘 흑연 시트로, 초고열전도율·간편 시공·박형 경량·전자파 간섭 저감 특성을 가집니다. 열확산계수가 2 cm²/s 이상으로 구리의 2배에 달하며 무게는 구리의 약 1/5입니다. 합성 흑연 시트의 1/3 가격으로 비용 이점이 크고, 간단한 가공과 양면 테이프·절연재 부착으로 다양한 형상 재단 및 양산이 가능합니다. 탄소 함량 98 wt% 이상으로 EU 환경 보호 지침을 준수합니다.",
  t68:
    "T68 합성 초열전도 흑연 시트는 탁월한 열전도율로 알려진 고배향 열분해 흑연 시트입니다. 표면 전체로 열을 빠르게 확산시켜 발열원의 온도를 효과적으로 낮추며, 초박형·유연 설계로 방열뿐 아니라 우수한 EMI 차폐 성능도 제공합니다. 고온 핫프레스 공정으로 제조되어 다른 흑연 시트보다 다소 두껍지만, XY축 열전도율이 최대 1500 W/m·K에 달하는 뛰어난 면내 열전달 성능으로 전자 부품을 빠르고 균일하게 냉각합니다.",
  "tg-p10050":
    "TG-P10050은 그래핀 소재로, 수평(XY축) 열전도율이 1500~1800 W/m·K, 수직(Z축) 열전도율도 12 W/m·K에 달합니다. 구리 호일 위에 얇은 그래핀 층을 코팅한 구조로 총 두께는 50 µm에 불과합니다. 우수한 수평 전도성을 가지며 박리·분말 탈락 문제가 없어 발열원의 열을 외부로 빠르게 확산시켜 탁월한 방열 효과를 제공하며, 유연성과 굽힘성도 갖췄습니다.",
  "tg-p10090":
    "TG-P10090은 그래핀으로, 현재 알려진 나노소재 중 가장 얇고 단단한 소재입니다. 구리·은보다 낮은 세계 최소 수준의 비저항과 매우 빠른 전자 이동도를 가져, 더 얇고 빠른 차세대 전도성 전자 부품·트랜지스터 개발에 활용될 것으로 기대됩니다. 본질적으로 투명한 우수 전도체이므로 투명 터치스크린·라이트 패널·태양전지 제조에도 적합합니다.",
  "tg-v838":
    "T-Global의 상변화 소재 TG-V838은 높은 열전도율과 50°C의 정밀한 상전이를 통해 우수한 열전달을 제공합니다. 미세 표면 간극을 메워 열저항을 낮추고 열관리 성능을 향상시키며, 다양한 두께로 제공되어 프로세서·차량용 전장·신재생에너지 시스템에 이상적입니다.",
  "tg-v833":
    "TG-V833 열전도 상변화 소재는 상온에서 고체 상태라 조립이 편리합니다. 기기가 작동 온도에 도달하면 액상으로 녹아 우수한 유동성으로 부품 표면의 불균일한 간극을 충분히 메워 열저항을 낮추고 열전도성을 높이며, 칩셋·프로세서·반도체 등에 주로 사용됩니다.",
  ti900:
    "Ti900은 폴리이미드를 기재로 한 열전도 복합소재 절연체로, 절연성·난연성·인장 강도가 특징입니다. 높은 전기 절연이 요구되는 전자 제품에 자주 사용됩니다. 높은 전기 절연성, 낮은 열저항, 간편한 시공성을 제공합니다.",
  "tg-a3500":
    "특수 공정으로 실리콘을 베이스로 열전도 분말과 난연제를 혼합해 열계면 소재를 구현하여 발열원과 방열판 사이의 열저항을 효과적으로 낮춥니다.",
  "tg-a38kx":
    "특수 공정으로 실리콘을 베이스로 열전도 분말과 난연제를 혼합해 열계면 소재를 구현하여 발열원과 방열판 사이의 열저항을 효과적으로 낮춥니다. TG-A38KX는 열전도성이 우수하고 변형이 잘 일어나지 않아 조립이 쉬우며, 보호·충격 흡수·난연성과 우수한 밀착성을 제공합니다.",
  "tg-a38kf":
    "특수 공정으로 실리콘을 베이스로 열전도 분말과 난연제를 혼합해 열계면 소재를 구현하여 발열원과 방열판 사이의 열저항을 효과적으로 낮춥니다. TG-A38KF는 3.3 W/m·K 열전도율의 유리섬유 강화 연질 갭 필러 실리콘 필름으로, 저압에서도 우수한 열 성능을 보입니다. 한쪽 면이 자기 점착성이며 유리섬유 특성으로 절연 내력이 높고 전단·인열에 강해 변형이 잘 일어나지 않으면서 우수한 열전도성을 유지합니다.",
  "tg-a3500f":
    "특수 공정으로 실리콘을 베이스로 열전도 분말과 난연제를 혼합해 열계면 소재를 구현하여 발열원과 방열판 사이의 열저항을 효과적으로 낮춥니다.",
  "tg-alc":
    "특수 공정으로 실리콘을 베이스로 열전도 분말과 난연제를 혼합해 열계면 소재를 구현하여 발열원과 방열판 사이의 열저항을 효과적으로 낮춥니다.",
  "tg-a4500":
    "특수 공정으로 실리콘을 베이스로 열전도 분말과 난연제를 혼합해 열계면 소재를 구현하여 발열원과 방열판 사이의 열저항을 효과적으로 낮춥니다.",
  "tg-apc93-pc93":
    "TG-APC93 비실리콘 써멀 패드는 발열원과 방열판 사이의 불균일한 간극을 메워 전자 제품의 발열을 제거하고 냉각·방열 효과를 구현합니다. 높은 열전도율과 상당한 점착성, 낮은 열저항을 갖춰 비실리콘 써멀 페이스트를 효과적으로 대체하고 기계적 고정 기능을 제공합니다.",
  "tg-apc94-pc94":
    "PC94는 실리콘 성분을 함유하지 않은 비실리콘 써멀 패드입니다. 실리콘 수지 휘발이나 실리콘 오일 석출이 없어 회로 불량 가능성을 줄이며, 실리콘 오일이 제품 성능에 해로울 수 있는 경우에 권장됩니다. 비실리콘 소재로 발열 전자 부품의 효율과 수명을 향상시킵니다.",
  "tg6060-putty":
    "TG6060은 6.3 W/m·K 열전도율의 써멀 퍼티로 실리콘 시멘트를 함유합니다. 진흙 같은 질감으로 열저항이 비교적 낮아 발열원이 불균일한 제품에 적합하며, 소량으로 발열원 표면 간극을 메워 우수한 열전도성을 구현합니다. 써멀 페이스트 대비 시공이 편리하고 오버플로우·경화가 없으며, 낮은 열저항·유연성·강한 가소성·친환경성이 특징입니다.",
  "tg4040-putty":
    "TG4040은 3.2 W/m·K의 우수한 열전도율을 갖춘 고체-액체 중간 물성의 갭 필러 써멀 퍼티로, 낮은 열저항과 우수한 장기 신뢰성을 제공합니다. 소량만으로 불균일한 간극을 메울 수 있어 생산 단계의 가공 유연성을 높이고, 박형이며 오버플로우·경화가 없어 고강도 기계적 접합이 필요 없는 부품에 매우 적합하며 우수한 열전도성을 제공합니다.",
  "tg-nsp25":
    "TG-NSP25는 2.6 W/m·K 열전도율의 실리콘 프리 열전도 페이스트로, 충분한 압축성과 낮은 열저항이 특징입니다. 소량으로 발열원 표면 간극을 메워 우수한 열전도성을 구현하며, 써멀 페이스트 대비 시공이 편리하고 오버플로우·경화가 없습니다.",
  "tg-a09ab-tg-s09ab":
    "TG-A09AB / TG-S09AB는 T-Global이 새로 개발한 열전도 실런트 제품입니다. 동종 실리콘 열전도 실런트 대비 열전도율이 2.8 W/m·K에 달하며, 상온 경화는 18시간, 가열 경화는 30분이면 완료됩니다. 경화 후 전자 부품을 보호하고 방습 기능을 제공합니다.",
  "tg-a96ab-a96ab":
    "TG-A96AB / A96AB 포팅 컴파운드는 전자 부품을 습기 및 기타 유해 환경 요인으로부터 보호하는 열전도 에폭시 기반 포팅 컴파운드입니다. 열전도율은 2.6 W/m·K이며 상온에서 10~12시간이면 경화되고, 가열 시 경화 시간이 30분으로 단축됩니다. 쇼어 A 68의 경도로 부품을 견고하게 지지합니다.",
  "tg-as606b-s606b":
    "S606B는 1.9 W/m·K 열전도율의 써멀 페이스트입니다. 유동성이 우수해 접촉 계면 자체의 매우 낮은 열저항까지 메울 수 있습니다. 가성비가 뛰어난 열전도 소재로, 높은 열전도율이 필요하지 않고 비용을 고려해야 하는 저예산 환경에 적극 권장됩니다.",
  "m2-fan-ssd-thermal-module":
    "M.2 Fan SSD 써멀 모듈은 정밀 히트싱크와 능동 냉각팬을 결합해 온도를 효과적으로 낮추고 써멀 스로틀링을 방지하며 SSD 수명을 연장합니다. 경량으로 설치가 쉽고 호환성이 넓어 안정적인 성능과 세련된 시스템 업그레이드를 동시에 제공합니다.",
  "m2-ssd-thermal-module":
    "M.2 SSD 써멀 모듈은 SSD의 최적 성능과 수명 유지를 위한 필수 부품입니다. 작동 온도를 효과적으로 낮춰 과열과 써멀 스로틀링 위험을 방지하고, 효율적인 방열로 내부 부품 마모를 줄여 수명을 연장합니다. 대부분 경량이며 다양한 SSD 모델과 호환되어 설치가 간편하고, 세련된 디자인으로 PC의 외관까지 향상시킵니다.",
  "thermal-simulation-analysis-service":
    "전자 제품 개발 주기가 빨라지고 고밀도 부품 설계가 복잡해짐에 따라, T-Global Technology는 방열 부품뿐 아니라 종합 열공학 솔루션 컨설팅을 제공합니다. 최고 수준의 열 시뮬레이션 소프트웨어와 전문 열 엔지니어 팀을 갖추고 예비 열 시뮬레이션 기획과 열 설계 컨설팅을 지원합니다. CAD 파일(SolidWorks, Pro/ENGINEER, STEP, IGES 등)만 제공하면 전문팀이 상세 열 시뮬레이션 분석을 수행해 직접 모델링하는 시간을 절감해 드립니다. 복잡한 설계에서도 정밀한 모델 디테일을 보존해 고품질 열 분석 보고서를 제공하며, 제공된 설계 파일은 기밀 유지 협약으로 안전하게 보호됩니다. T-Global의 열 기술 전문성과 첨단 솔루션을 활용해 제품 개발 프로세스를 간소화하고 최적의 열관리를 달성할 수 있습니다.",
  "thermoelectric-cooling-chip":
    "열전 냉각기(TEC) 모듈은 펠티에 효과를 이용해 정밀한 온도 조절을 구현하는 효율적인 능동 냉각 솔루션입니다. 전류를 인가하면 한쪽 면에서 열을 흡수하고 반대쪽 면으로 방출하여 정밀 온도 제어가 필요한 응용에 이상적입니다. 온도에 민감한 전자기기·의료기기·실험 장비에 안정적인 솔루션을 제공하며, 정확한 온도 유지로 기존 냉각 방식 없이 최적의 냉각 성능을 달성합니다.",
  "vapor-chamber":
    "기능과 작동 원리는 히트파이프와 동일하며, 판형 챔버에 봉입된 작동 유체가 증발·응축을 반복하는 순환 방식으로 동작합니다. 국부 발열원의 열을 넓은 판 면적으로 빠르게 전달하는 고성능 열전도 장치입니다.",
  "ob-vapor-chamber":
    "기능과 작동 원리는 히트파이프와 동일하며, 판형 챔버에 봉입된 작동 유체가 증발·응축을 반복하는 순환 방식으로 동작합니다. 국부 발열원의 열을 넓은 판 면적으로 빠르게 전달하는 고성능 열전도 장치입니다.",
};

let benFilled = 0,
  benMiss = 0,
  descFilled = 0,
  descMiss = [];
for (const f of readdirSync(KO).filter((x) => x.endsWith(".json"))) {
  const path = join(KO, f);
  const o = JSON.parse(readFileSync(path, "utf8"));
  for (const slug of Object.keys(o)) {
    const e = o[slug];
    if (Array.isArray(e.benefits_ko)) {
      e.benefits_ko = e.benefits_ko.map((b) => {
        if (!b.includes("⟦TODO⟧")) return b;
        const en = b.replace("⟦TODO⟧", "").trim();
        if (BENEFIT[en]) {
          benFilled++;
          return BENEFIT[en];
        }
        benMiss++;
        console.log(`  ! benefit unmapped [${slug}]: ${en}`);
        return b;
      });
    }
    if (!e.description_ko && DESC[slug]) {
      e.description_ko = DESC[slug];
      descFilled++;
    } else if (!e.description_ko && e.description_en_clean) {
      descMiss.push(`${f}:${slug}`);
    }
  }
  writeFileSync(path, JSON.stringify(o, null, 2));
}
console.log(
  `[fill-ko] benefits filled=${benFilled} unmapped=${benMiss} | descriptions filled=${descFilled}`
);
if (descMiss.length) console.log(`[fill-ko] desc still empty (has en): ${descMiss.join(", ")}`);
