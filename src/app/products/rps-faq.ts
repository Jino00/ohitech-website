// RPS(Remote Plasma Source) 수리·오버홀 FAQ 단일 원천.
// 화면 표시(RPSSection.tsx)와 FAQPage JSON-LD(_seo.tsx) 양쪽에서 이 데이터를 공유한다.

export type RpsFaq = { q: string; a: string };
export type RpsLocale = "ko" | "en" | "zh";

export const FAQ_RPS: Record<RpsLocale, RpsFaq[]> = {
  ko: [
    {
      q: "어떤 MKS RPS 모델을 수리·오버홀할 수 있나요?",
      a: "OHI Tech는 MKS 원격 플라즈마 소스(RPS) 전 모델을 수리·오버홀합니다. ASTRON TM/2L, ASTRON-I/3L, ASTRON-EX/6L·8L, ASTRON-HF/15L·22L, RPS 30L, PARAGON(AX7700·AX7710), R*evolution R1/R3/R5(AX7690·AX7695·AX7696 등)을 포함하며, AX7651·AX7657·AX7658·AX7670·AX7685·AX7645·AX7667 계열의 파트넘버에 대응합니다. 보유하신 장비 PN으로 문의해 주세요.",
    },
    {
      q: "RPS(Remote Plasma Source)는 어떤 공정에 사용되나요?",
      a: "RPS는 격리된 챔버에서 플라즈마를 생성해 공정 챔버로 전달하는 장치로, 두 가지 용도로 쓰입니다. 첫째는 웨이퍼 없이 진행하는 챔버 세정(Chamber Clean)으로 ASTRON·PARAGON 계열이 담당하고, 둘째는 웨이퍼 상의 포토레지스트(PR)를 제거하는 On-Wafer 공정(Etch·Ashing·PR Strip)으로 R*evolution 계열이 대표적입니다.",
    },
    {
      q: "RPS 수리 시 어떤 고장(Fail Mode)을 잡을 수 있나요?",
      a: "AC LINE·DC BUS Fail(전력 소자·Fuse/Power/Booster BD 점검), Source Leak(O-ring·Reactor 식각 확인), Ignition Fault(섹션 보드·Block·Quartz·Reactor), Particle Fail(Block·Quartz 오염) 등 4대 Fail Mode를 대응합니다. OHI Tech는 증상만 보지 않고 근본 원인을 진단해 재발을 막습니다.",
    },
    {
      q: "수리 후 검사 성적서(COA)를 제공하나요?",
      a: "네. 모든 수리 완료 후 COA(Certificate of Analysis / Final Inspection & Service Report)를 함께 제공합니다. Leak Test(Water·Vacuum), Block 아노다이징 코팅 두께, 가스 유량별 RF Power를 측정하는 Plasma Test, 장시간 Aging Test 결과가 스펙 대비 검증되어 리포트에 포함됩니다.",
    },
    {
      q: "RPS 수리 기간(리드타임)은 얼마나 걸리나요?",
      a: "리드타임은 모델, 고장 유형, 교체 부품 수급 상황에 따라 달라집니다. 진단 후 정확한 일정을 안내하며 긴급 건은 우선 대응합니다. 보유 장비의 모델·파트넘버·증상을 알려주시면 견적과 함께 예상 납기를 안내해 드립니다.",
    },
    {
      q: "신품 교체 대신 오버홀하면 어떤 이점이 있나요?",
      a: "오버홀은 마모·오염된 부품(Block·O-ring·Reactor·Ceramic Ring 등)을 교체·재생하고 Plasma·Aging 검사로 성능을 검증해 신품에 준하는 상태로 회복합니다. 신규 장비 구매 대비 비용과 리드타임을 크게 줄일 수 있어, 검증된 성능을 더 경제적으로 확보할 수 있습니다.",
    },
  ],
  en: [
    {
      q: "Which MKS RPS models can you repair and overhaul?",
      a: "OHI Tech repairs and overhauls the full MKS remote plasma source (RPS) lineup: ASTRON TM/2L, ASTRON-I/3L, ASTRON-EX/6L·8L, ASTRON-HF/15L·22L, RPS 30L, PARAGON (AX7700·AX7710), and R*evolution R1/R3/R5 (AX7690·AX7695·AX7696, etc.). We support part numbers across the AX7651·AX7657·AX7658·AX7670·AX7685·AX7645·AX7667 series. Just send us your equipment PN.",
    },
    {
      q: "What is a Remote Plasma Source (RPS) used for?",
      a: "An RPS generates plasma in an isolated chamber and delivers it to the process chamber. It serves two purposes: chamber cleaning without a wafer (handled by the ASTRON and PARAGON families), and on-wafer photoresist (PR) removal for Etch, Ashing, and PR Strip processes (the R*evolution family being the representative).",
    },
    {
      q: "Which fail modes can you fix during an RPS repair?",
      a: "We handle the four main fail modes: AC LINE/DC BUS Fail (power devices, Fuse/Power/Booster BD inspection), Source Leak (O-ring and Reactor etching check), Ignition Fault (section boards, Block, Quartz, Reactor), and Particle Fail (Block/Quartz contamination). OHI Tech diagnoses the root cause — not just the symptom — to prevent recurrence.",
    },
    {
      q: "Do you provide an inspection report (COA) after repair?",
      a: "Yes. Every completed repair comes with a COA (Certificate of Analysis / Final Inspection & Service Report). It includes Leak Test (Water/Vacuum), Block anodizing coating thickness, a Plasma Test measuring RF power under gas-flow variations, and an extended Aging Test — all verified against spec.",
    },
    {
      q: "How long does an RPS repair take (lead time)?",
      a: "Lead time depends on the model, fail mode, and availability of replacement parts. We provide an exact schedule after diagnosis and prioritize urgent cases. Send us your model, part number, and symptom, and we'll provide an estimated turnaround along with the quote.",
    },
    {
      q: "What are the benefits of overhaul versus buying new?",
      a: "An overhaul replaces and reconditions worn or contaminated parts (Block, O-ring, Reactor, Ceramic Ring, etc.) and verifies performance with Plasma and Aging tests, restoring the unit to near-new condition. This significantly reduces cost and lead time compared to purchasing new equipment — proven performance, more economically.",
    },
  ],
  zh: [
    {
      q: "可以维修和大修哪些MKS RPS型号？",
      a: "OHI Tech维修与大修MKS远程等离子体源(RPS)全系列：ASTRON TM/2L、ASTRON-I/3L、ASTRON-EX/6L·8L、ASTRON-HF/15L·22L、RPS 30L、PARAGON(AX7700·AX7710)以及R*evolution R1/R3/R5(AX7690·AX7695·AX7696等)。支持AX7651·AX7657·AX7658·AX7670·AX7685·AX7645·AX7667系列部件号。请提供您设备的PN咨询。",
    },
    {
      q: "远程等离子体源(RPS)用于哪些工艺？",
      a: "RPS在隔离腔室中生成等离子体并输送至工艺腔室，有两种用途：无晶圆的腔室清洁(由ASTRON和PARAGON系列负责)，以及用于Etch、Ashing、PR Strip工艺的晶圆上光刻胶(PR)去除(以R*evolution系列为代表)。",
    },
    {
      q: "RPS维修可以解决哪些故障模式？",
      a: "我们处理4大故障模式：AC LINE/DC BUS Fail(功率器件、Fuse/Power/Booster BD检查)、Source Leak(O-ring与Reactor蚀刻检查)、Ignition Fault(区段电路板、Block、Quartz、Reactor)、Particle Fail(Block/Quartz污染)。OHI Tech不只看症状，而是诊断根本原因以防止复发。",
    },
    {
      q: "维修后是否提供检验成绩书(COA)？",
      a: "是的。所有维修完成后均提供COA(Certificate of Analysis / Final Inspection & Service Report)，包含Leak Test(水检漏/真空检漏)、Block阳极氧化涂层厚度、不同气体流量下测量RF功率的Plasma Test，以及长时间Aging Test——全部对照规格验证。",
    },
    {
      q: "RPS维修需要多长时间(交期)？",
      a: "交期取决于型号、故障类型及更换部件的供应情况。诊断后我们会提供准确的时间安排，紧急情况优先处理。请告知您的型号、部件号与故障现象，我们将连同报价一并提供预计交期。",
    },
    {
      q: "大修相比购买新品有什么优势？",
      a: "大修更换并翻新磨损或污染的部件(Block、O-ring、Reactor、Ceramic Ring等)，并通过Plasma和Aging测试验证性能，将设备恢复至接近新品的状态。相比购买新设备可大幅降低成本与交期——以更经济的方式获得经过验证的性能。",
    },
  ],
};
