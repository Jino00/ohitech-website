# Track: EV 공급사 전환 Zerova → RongXin

> 활성 트랙. 세션 시작 시 이 파일을 먼저 읽을 것 (원칙 20·21).
> 생성: 2026-06-08

## 1. 목표 (한 줄)
사이트 전체의 EV 충전기 브랜드/내러티브를 **Zerova(대만 완제품 총판) → RongXin(중국 容新新能源, SKD 부품공급 + 한국 현지조립)** 으로 교체한다.

## 2. 배경 / 왜
- Zerova의 **support 이슈**로 공급사를 RongXin으로 전환 (Jino 결정, 2026-06-08).
- 비즈니스 모델 자체가 바뀜: **"한국 공식 대리점(총판)" → "SKD 공급 + 한국 현지 조립 + 기술지도"**.
- 정부(기후에너지환경부) 규격 대응 + KC 인증 국산 조립이 새 핵심 셀링포인트.

## 3. 확정 결정사항 (D-N)
- **D-1**: 전환 범위 = **사이트 전체 교체** (EV 제품페이지 + SEO + 인사이트 모두). Jino 선택 "사이트 전체 교체 (권장)" (2026-06-08).
- **D-2**: 공급 모델 내러티브 = **SKD(부품) 공급 + 한국 현지 조립 + 기술지도** (총판 아님). 출처: `260527_EV충전기_SKD_기술검토_회신정리.docx`.
- **D-3**: RongXin 회사 정보 = Zhengzhou Rongxin New Energy Technology Co., Ltd / 容新新能源 / 2019 설립 / 10,000㎡ R&D·생산 / OEM·ODM / CE 보유 / 다수 특허. 웹 rongxiniot.com.

> Jino 원문 인용 (2026-06-08): "우리가 EV충전기 관련해서는 Zerova의 support 이슈로 인해서 ... RongXin 이 회사로 바꿔야 해", 전환 범위 = "사이트 전체 교체 (권장)".

## 4. RongXin 제품 라인업 (확보 스펙)
출처: 제품 카탈로그 PDF + 제품 개요 이미지 + SKD 기술검토 docx.

| 카테고리 | 출력 | 핵심 사양 |
|----------|------|----------|
| AC 충전기 | 7 / 11 / 22kW | AC 220–230V, 32/48/63A, 7인치 터치, APP·RFID, IP55, 벽부형, OCPP 1.6(2.0.1 업글) |
| DC 급속 | 20–600kW (20/30/40/60/80/120/160/200/240/300/350/400/450/500/550/600) | DC 380–400V 3P+N+PE, ~600A, 지능형 액냉, 스탠드형, IP54/55 |
| Split Power(분산형) | 480/640/720/960/1280/1920/2560kW+ | 다이나믹 전력분배, 모듈형 확장, 버스·물류·택시 플릿·메가충전파크 |
| 공통 커넥터 | CCS1 / CCS2 / GB-T / NACS | DC. AC는 Type1/Type2 |
| 스마트 | OCPP 1.6→2.0.1, OTA, RFID, POS, 실시간 모니터링, 다이나믹 로드밸런싱, 클라우드 관리 |
| 통신 | Ethernet / WiFi / 4G LTE / Bluetooth |
| 인증 | CE 보유. KC안전확인·고효율기자재·OCPP·FCC/RoHS/UL = 미보유, 신청 가능 |

**SKD 기술검토 실측(한국 정부규격 대응):**
- DC: 100kW DUAL (380V 160A 105kW 입력 / 1000VDC 100A, 채널당 50kW), 200kW DUAL (역률 0.99), 15인치 터치, IP44
- AC: 7kW SINGLE (220V 32A), 11kW SINGLE (220V 50A), 1.7인치, IP44, Type1/J1772
- 통신·결제: 신용카드·RFID·QR·앱, LTE/이더넷/WiFi, 한국 CMS 연동·한글 UI
- 효율 ≥95%(피크 96%), 역률 0.99↑(200kW), ISO 15118·DIN 70121·OTA 지원

## 5. 작업 범위 (영향 파일)
| 파일 | 내용 | Phase |
|------|------|-------|
| `src/app/products/EVSection.tsx` | 제품 8종·솔루션·About·파트너십·인증, 이미지(zerova CDN 핫링크), ko/en/zh | P1 |
| `src/app/products/_seo.tsx` | EV title/keywords "Zerova 공식 대리점" ko/en/zh | P2 |
| `src/app/insights/_data.ts` | ev-charging 아티클 keywords(Zerova), 신규 RongXin 인사이트 아티클 | P3 |
| `public/images/products/ev/` (신규) | RongXin 제품 이미지 (PDF 추출 / 배너) — zerova CDN 대체 | P0 |

## 6. 미해결 질문
- ~~Q1: LG전자 공식 납품~~ → **해결(D-4)**: LG는 별개 실제 관계, 유지. RongXin과 무관하게 보존.
- ~~Q2: 이미지 조달~~ → **해결(D-5)**: PDF 카탈로그에서 추출해 시작. 추후 고해상도 교체 가능.
- **Q3**: 제품 모델 표기 — RongXin은 Zerova처럼 구분된 모델 시리즈(DX/DQ 등)가 아니라 출력 등급 라인업. **기본방침: 카테고리/출력 등급으로 구성**(AC 7/11/22kW, DC 출력별, Split Power). Jino 이견 시 조정.

## 추가 결정사항
- **D-4**: `ev-charger-lineup.png`의 "LG전자 공식 납품" = OHI의 실제 LG EV충전기 납품 관계. **유지**. 즉 OHI는 LG·RongXin 복수 EV 브랜드 취급. Zerova만 RongXin으로 교체.
- **D-5**: RongXin 제품 이미지 = 카탈로그 PDF 추출본으로 시작. 소스: `260526_RONG XIN...High-End EV Charging Solutions.pdf` + 제품개요 배너 `b3176ca108fec21b1c2ebe637b324219.png`.

## 7. 체크리스트
- [x] P0: 이미지 준비 — PDF에서 투명 제품샷 3종 추출 완료 (`public/images/products/ev/rongxin-{ac-charger,dc-charger,split-power}.png`). 마케팅 배너는 RongXin 연락처 박혀있어 제외, 컷아웃만 사용.
- [x] P1: EVSection.tsx 전환 완료 — 제품 3카테고리(AC/DC/Split), About(RongXin 2019/정주/OEM-ODM), 파트너십(SKD 국산조립), 인증(CE보유·KC진행), ko/en/zh, 로컬 이미지. 가짜 글로벌 파트너 로고(Shell·BYD 등) 제거→핵심역량 칩. 솔루션 히어로 사진→그래디언트.
- [x] P1b: 추가 발견 파일 전환 — `_seo.tsx`(EvJsonLd 구조화데이터 전체), `about/page.tsx`(파트너 3언어+description), `db/schema.ts`(시드 정의 + 멱등 UPDATE 마이그레이션), `llms.txt`(7곳)
- [x] P2: _seo.tsx EV_META 전환 완료 (ko/en/zh — Zerova 대리점→RongXin SKD·국산조립)
- [x] P3a: 기존 ev-charging 아티클 keyword Zerova→RongXin/SKD 정리 (ko/en/zh)
- [ ] P3b: 신규 RongXin 인사이트 아티클 작성 (SKD 국산조립/정부규격/보조금 각도) — 미착수
- [ ] P4: build → rsync 배포 → PM2 재시작 → 라이브 curl 검증
- [x] 로컬 빌드 통과 + 로컬 라이브 검증(Zerova 0, RongXin 정상, 이미지 200, DB 마이그레이션 적용)
- [ ] codex review (production 코드 변경 1회)

## 8. 현재 진행 단계
P0~P3a 완료 + 로컬 빌드/검증 통과 + codex review PASS(P1 0건). Zerova 사이트 전역 0건. 배포(P4) Jino 승인 대기. 신규 아티클(P3b)은 다음 증분.

### codex review 결과 (2026-06-08)
- GATE: **PASS** (P1 0건), P2 5건
- 수정: P2-1 llms.txt 공급범위 수치, P2-2 SOLUTION_TAGS 로케일 분리, P2-4 EN/zh "compliant" 과장 완화(KC 진행중 명시)
- 기각/연기: P2-3 EvJsonLd 로케일 무관(기존 동작, 브랜드 전환 범위 밖 — **연기**, 별도 작업), P2-5 DB 마이그레이션 중복안전(partners.website/logo는 시드가 ''로만 입력→Zerova URL 없음 확인, RongXin 행 삽입 경로 없어 중복 불가 → 현행 name_en 매칭 유지)

## 9. 다음 액션
1. **Jino 배포 승인** → rsync + PM2 재시작 + 라이브 curl 검증 (원칙 22)
2. 배포 후 **PM2 restart 필수** (DB 마이그레이션이 getDb 초기화에서 Zerova→RongXin 자동 교정)
3. (다음 증분) 신규 RongXin 인사이트 아티클 작성 (P3b)

## 11. 연기된 개선 (별도 작업)
- EvJsonLd(_seo.tsx)를 locale 인자 받게 리팩터 — 현재 전 언어 한국어 breadcrumb/FAQ. 기존부터 그랬고 브랜드 전환과 무관. TecoJsonLd도 동일 패턴이라 함께 처리 권장.

## 10. DB 마이그레이션 주의 (중요)
- `db/schema.ts` `ensureMigrations()`에 멱등 UPDATE 추가: `name_en='Zerova Technologies'` 행을 RongXin으로 갱신. 첫 실행 후 no-op.
- **프로덕션 DB는 PM2 재시작 시 getDb 초기화에서 자동 교정됨** (rsync는 data/ 미포함, 서버 DB 보존). 배포 후 PM2 restart 필수 — 안 하면 라이브 파트너명이 여전히 Zerova.
