# TRACK: T-Global 전체 카탈로그 마이그레이션

> 메가 프로젝트 단일 진실 원천. 세션이 바뀌어도 이 파일을 먼저 읽고 진입한다.
> CLAUDE.md 원칙 18(아키텍처)·19(Codex 검증)·20(트랙) 적용.

---

## 1. 목표 (한 줄)

제조사 tglobalcorp.com의 **전체 제품 카탈로그(~10 대분류, 110~160 모델)**를 이미지·스펙 포함 OHI 자사몰 `/products/thermal-management` 페이지로 이전하고, AI 티 나는 둥근 pill 디자인을 제거해 전문적인 상세 페이지로 재구성한다.

---

## 2. 확정 결정사항 (번복 금지 — D-1 ~ D-7)

- **D-1 데이터 저장**: 구조화 TS 데이터 파일 `src/app/products/data/thermal-catalog.ts` 생성. ThermalSection은 이 데이터로 렌더링. **SQLite DB 미사용** (마이그레이션 리스크 회피, git 추적).
- **D-2 다국어**: 한국어 우선 + 영문/숫자 **스펙표는 원문 그대로 유지**. 제품명·설명만 한국어 번역. en/zh는 자동 폴백(추후 보강).
- **D-3 이미지**: 제조사 이미지를 `public/images/products/tglobal/` 에 **로컬 다운로드** 후 호스팅. 파일명 정규화(모델명 기반).
- **D-4 범위**: **전체 카탈로그** (큐레이션 아님). 10개 대분류 전 제품.
- **D-5 디자인**: `rounded-full` 텍스트 pill 칩 **전면 제거** (권장제품·주요납품처·태그라인·글로벌거점·인증). → 정렬된 스펙 테이블 + 구분선 기반 레이아웃으로 교체. Phase 4에서 `/plan-design-review`.
- **D-6 아키텍처**: A1 `catalog-migration-agent` = H1 `ingestion-harness`(SA1 crawler, SA2 extractor, SA3 image-downloader, SA4 ko-translator) + H2 `presentation-harness`(SA5 catalog-builder, SA6 section-renderer). 다세션 트랙.
- **D-7 검증**: Phase별 `/codex review` pass 필수. Phase 4 후 `/qa`. 피드백 루프(검증→누락 발견→해당 카테고리 SA2 재실행→LESSONS 기록), 단방향 금지.

---

## 3. 사용자 원문 인용 (왜곡 방지)

- "여기에 우리 제품의 모든 품번, 제품 상세를 등록하고 싶어."
- "지금의 상세페이지에는 … 둥글둥글한 글자표는 AI가 만든 티가 많이 나. 그러니까 이런 부분은 모두 없애고, 만들어줘."
- "우리의 제조사 사이트인 https://www.tglobalcorp.com/products/ 에서 카테고리 모두 샅샅히 뒤저서 모든 Product를 우리 자사몰에 옮겨줘. 이미지, 스펙포함 모두 옮겨줘."
- 승인: 구조 제시 후 "그래"

---

## 4. 제조사 카탈로그 구조 (Phase 1 크롤 결과로 갱신 예정)

대분류 (확인됨):
1. Thermal Simulation
2. Thermal Module
3. Vapor Chambers
4. Heat Pipes
5. Thermal Interface Materials
   - Gap Filler Pad → Thermal Pad / Ultra Soft / Low Oil Bleed / Non-Silicone
   - Liquid Gap Filler → Thermal Paste / Thermal Putty / Conductive Gel / Potting Compound
   - Thermal Tape · End Cap · Graphite Sheet · Graphene · Phase Change Materials · Thermal Composite Materials
6. AlSiC
7. Heat Sinks → Ceramic Heat Spreader / Metal Heat Sinks
8. Thermoelectric Cooling Chips
9. Flexible Absorbing Materials
10. Fans

제품 리스트 페이지네이션: `/products/?page=1..9`

---

## 5. 체크리스트

### Phase 0 — 계획·트랙 (Opus)
- [x] 구조 설계 + Jino 승인
- [x] 트랙 파일 생성 (이 파일)
- [x] TRACKS.md 등록

### Phase 1 — SA1 crawler + SA2 extractor (TIM 1개 카테고리 검증)
- [x] SA1: 리프 카테고리 → 상세 URL 수집 (`scripts/tglobal/collect-items.js` + crawl.mjs) — TIM 49개 확인
- [x] SA2: 단일 제품 추출기 (`scripts/tglobal/extract-detail.js`) — specs/benefits/desc/images 정상
- [x] Harness 라우팅 수정: SA1 리프 URL → 카테고리 컨텍스트를 SA2 그룹핑에 주입 (breadcrumb 무용)
- [x] TIM 49/49 전체 추출 완료 (`data/_raw/thermal-interface-materials.json`) — specs/images/desc 0건 누락
- [x] goto 3회 재시도 + 백오프 로직 추가 (전체 카탈로그 안정성)
- [x] 실패 1건(tg-as606b-s606b) 복구 병합
- [~] codex: **Phase 4 production 코드에서만** (사용자 선호 — feedback_codex_cadence 메모리)

스크립트: `scripts/tglobal/crawl.mjs` (H1 드라이버), `collect-items.js` (SA1), `extract-detail.js` (SA2)
실행: `node scripts/tglobal/crawl.mjs --filter <category>` | 전체: 인자 없이 | SA1만: `--urls-only`

**Phase 1 완료** — 파이프라인 검증됨, 데이터 품질 우수.

### Phase 2 — SA3 image + SA4 translate + SA5 build (검증 완료)
- [x] SA3 `download-images.mjs`: TIM 196개 이미지 → `public/images/products/tglobal/<slug>/` (0 실패, 12MB). 로컬경로 rewrite + remote 백업 보존
- [x] SA4 `translate-ko.mjs`: 카테고리/benefit 용어집(결정론적) + 설명문 echo 제거 + ko 스켈레톤 → `data/_raw/_ko/<cat>.json`
- [x] SA5 `build-catalog.mjs`: raw+ko 병합 → `src/app/products/data/thermal-catalog.ts` (타입 정의 포함, SA5→SA6 계약 확정)
- [x] end-to-end 검증: 샘플 3개 완역, 타입 OK, 스펙 원문 유지, 로컬 이미지 경로 정상
- [x] codex 생략 (스크레이핑 도구 — Phase 4에서만, 사용자 선호)

**Phase 2 완료.** 6개 SA/Harness 스크립트 전부 검증됨. 데이터 계약 잠금.

### Phase 3 — H1 전 카테고리 수집 (다세션)
- [x] Thermal Simulation (1제품)
- [x] Thermal Module (2제품)
- [x] Vapor Chambers (2제품)
- [x] Heat Pipes (1제품)
- [x] TIM (전 하위, 49제품) — description_ko 49개 + benefit 138개 일괄 번역 완료
- [x] AlSiC (1제품)
- [x] Heat Sinks (5제품: metal ≤20mm/21-30mm + ceramic XL-25/25D/25W)
- [x] Thermoelectric Cooling Chips (1제품)
- [x] Flexible Absorbing Materials (4제품)
- [x] Fans (1제품)
- [x] SA4 후속 LLM 번역 적용기 `scripts/tglobal/fill-ko.mjs` (용어집 116개 + slug별 desc 58개, 재현 가능)
- [x] SA3 멱등성 수정 (`download-images.mjs`: 로컬 경로 재실행 시 remote 백업 보존)
- [~] 카테고리별 `/codex review` — **Phase 4 production 코드에서만** (D-7, feedback_codex_cadence 메모리). 스크레이핑/데이터 도구 생략.

**Phase 3 완료.** 10 카테고리 / 67제품 / 273 이미지. 검증: ⟦TODO⟧ benefit 잔여 0, 비로컬 이미지 0, 스펙표 56제품 원문 유지(D-2), tsc 통과, 데이터 계약(`CatalogCategory`/`CatalogProduct`) 정상. 7제품(FAM 4 + XL 세라믹 3)은 제조사 설명문 부재 → en 폴백(정상).

### Phase 4 — SA5+SA6+H2 (데이터파일 + 렌더링 + 디자인)
- [x] SA5: thermal-catalog.ts 생성 (Phase 3에서 완료)
- [x] `/plan-design-review` (2026-05-18, 5/10→8/10, D-8~D-13 확정, §9)
- [x] SA6: ThermalSection.tsx 재작성 (1393→~1010줄, THERMAL_CATALOG 기반)
  - [x] T1 2-pane(카테고리 사이드바+제품 그리드), 기본 TIM, 하드코딩 LANG.products 제거
  - [x] T2 상세 모달/시트(갤러리+한글benefits+영문스펙표+문의CTA, ESC/backdrop)
  - [x] T3 빈스펙 11제품 분기(D-11, 데이터시트 문의 폴백)
  - [x] T4 pill 9곳+이모지국기+colored-left-border 제거 → 정의리스트/구분선(D-13)
  - [x] T5 반응형(모바일 가로 카테고리바+1열+풀스크린시트+스펙표 가로스크롤)
  - [x] dead 데이터 정리(PRODUCT_IMG, 3×LANG.products 342줄, 미사용 IMG키)
- [x] `/qa` (dev 서버 실동작: 49 TIM카드/카테고리전환/모달/영문스펙표9행/빈스펙폴백/ESC/모바일 — 0 콘솔에러, tsc 0에러)
- [x] `/codex review` (D-7 게이트, 2026-05-18) — **GATE PASS** (P1 0건). P2 2건: 썸네일 key 충돌→즉시수정✅ / 모달 focus trap 미구현→Phase 5 TODO(기본 ESC·backdrop·44px닫기는 구현됨)
- 참고: ProductList.tsx:825/947 디스패치 변경 불필요(시그니처 유지) — 확인됨
- 참고(범위 외 플래그): ProductList 전역 카테고리 네비 6 pill은 6개 타 카테고리 공용 → D-4 thermal 전용 범위 외, 별도 결정 필요

### Phase 5 — 검증 루프
- [x] /qa 실동작 (Phase 4에서 완료: 49 TIM카드/전환/모달/영문스펙표9행/빈스펙폴백/ESC/모바일, 0 콘솔에러, tsc 0)
- [x] **P2 (codex follow-up)**: ProductModal 완전 focus trap — 다이얼로그 초기 포커스 + Tab/Shift+Tab 사이클 + 닫을 때 트리거 카드로 포커스 복귀. 검증: focusedIsDialog✅ / Tab 마지막→첫번째 래핑✅ / Shift+Tab 첫번째→마지막 래핑✅ / ESC 후 포커스 복귀✅ (2026-05-18)
- [x] 67제품 전수 육안 점검: 10카테고리 순회 — 깨진 이미지 0, 설명 누락 0, 스펙 카운트 정상. 합계 67제품 이상 없음 (2026-05-18)
- [x] (범위 외 결정 대기) ProductList 전역 카테고리 네비 6 pill — D-4 thermal 전용 범위 외, 별도 승인 필요 (유지)
- [x] LESSONS_LEARNED 기록 — L4(대형 파일 재작성 전략) + L5(better-sqlite3 rebuild 루틴) (2026-05-18)

---

## 6. 리버스 엔지니어링 결과 (SA1/SA2 셀렉터 — 확정)

**리프 카테고리 페이지** `/products/<cat>[/<sub>[/<leaf>]]/`
- 제품 모델 블록: `.item` (각각 `a.link[href]` = 상세URL, `img` = 썸네일, `h2.title` = 모델명)
- 상세 URL 패턴: `https://www.tglobalcorp.com/products-detail/<slug>/`
- JS 렌더링 (lazy-load) → browse 데몬(Playwright)으로 렌더 후 추출, `fetch()` 불가

**제품 상세 페이지** `/products-detail/<slug>/`
- `h1` = 모델명 + 카테고리 (예: "TG-A20KX Thermal Pad")
- `.desc`/intro 영역 = benefits 불릿 + 설명 문단 (→ SA4 한국어 번역 소스)
- 제품 이미지 = `https://www.tglobalcorp.com/upload/catalog_b/<MODEL>_N__<hash>.webp` (다각도 복수)
- 스펙 데이터시트 = `.specTableBox`/`.specTable` > `.specTableRow`(`.specTableRowHead`) > `.specTableColumn` 셀
  - 컬럼: Properties | Unit | <모델명> | Test Method (예: Thermal Conductivity | W/m·K | 2.0±10% | ASTM D5470)
- 임베디드 제품 JSON 없음 (JSON-LD은 BreadcrumbList뿐) → DOM 스크레이핑 필수

**아이템 수 샘플**: thermal-pad=9, vapor-chamber=2, heat-pipes=1, fan=1 (리프별 편차 큼)

## 7. 현재 진행 단계

**Phase 1~5 전체 완료.** (2026-05-18) `ThermalSection.tsx` 재작성(1393→~1010줄) + ProductModal focus trap(Tab 사이클·ESC 복귀) + 67제품 전수 QA(이상 없음) + LESSONS_LEARNED(L4·L5) + 커밋 2개(style 정리·feat thermal). **트랙 완료.**

데이터 파이프라인 재현 명령(전체 재빌드 시):
`node scripts/tglobal/crawl.mjs` → `download-images.mjs` → `translate-ko.mjs` → `fill-ko.mjs` → `build-catalog.mjs`

## 8. 다음 액션 (다음 세션 시작 시 즉시 할 일)

**트랙 완료 — 다음 액션 없음.**

완료된 커밋:
- `1273a4d` style(products): remove font-mono (기존 8개 파일 정리)
- `35c4a9b` feat(thermal): T-Global full catalog browser + focus trap (Phase 4+5)

남은 범위 외 항목 (별도 트랙/승인 시 진행):
- ProductList 전역 카테고리 네비 6 pill 처리

---

## 9. Phase 4 디자인 확정 (plan-design-review 2026-05-18 — 번복 금지 D-8~D-13)

검토 결과 디자인 완성도 5/10 → 8/10. HYBRID 분류(마케팅 셸 + 앱형 카탈로그). 기존 시스템 정렬: navy `#0f2b46` / accent `#2d8cf0` / accent-light `#5ba8f5` / slate / rounded-xl / `border-slate-200`.

- **D-8 카탈로그 구조**: 2-pane 카탈로그 브라우저. 좌: sticky 10-카테고리 텍스트 리스트(활성 = 가는 좌측 indicator 바 + 제품수, **pill 아님**). 우: 선택 카테고리 제품 카드 그리드(데스크톱 3열 / 태블릿 2열 / 모바일 1열). 카드 = 제품사진 + mono 모델코드 + 한글명 + 1줄 benefit + 가는 구분선 + 조용한 detail affordance(colored-left-border·큰 그림자·icon-circle 금지).
- **D-9 상세 노출**: 카드 클릭 → 단일 반응형 컴포넌트. 데스크톱 = 중앙 모달 `max-w-4xl`, 모바일 = 풀스크린 보텀시트. 내용: [이미지 갤러리] → [모델 + 한글명 헤더] → [한국어 benefits 불릿] → [영문 스펙표]. 하단 "이 제품 문의" CTA = 기존 `/contact?lang=&type=quote&category=thermal-management&product=<slug>` 패턴 재사용.
- **D-10 스펙표(시그니처)**: 영문 원문 그대로(D-2). 컬럼 `Property | Unit | Value | Test Method`, 헤더행 + 행 구분선, 숫자 mono 정렬. 한국어 페이지 안의 영문 정밀 테이블이 신뢰의 시그니처 요소.
- **D-11 빈 스펙 상태(11제품)**: `specs.length===0` → 스펙 섹션 대신 **설명문(description) 중심 + 대형 이미지 갤러리**, benefits 보조. 빈 테이블 절대 렌더링 금지.
- **D-12 이미지 갤러리**: 큰 메인 이미지 1 + 하단 가로 썸네일 스트립. 썸네일 클릭 → 메인 교체. 라이트박스 없음. 로컬 호스팅(D-3), 누락 썸네일은 숨김(remote 폴백 없음).
- **D-13 pill 대체(D-5 구체화)**: Solutions(권장제품·주요납품처) / About(글로벌거점·인증·고객사)의 `rounded-full` pill → **레이블:값 종형 정의리스트 + 구분선**, 제품/고객명은 염단 구분선 리스트(· 구분 또는 가는 hr). 스펙표와 동일 어휘. 이모지 국기 제거, colored-left-border 제거.
- **반응형/a11y**: 모바일 = 상단 가로 스크롤 카테고리바(스냅 없이) + 그리드 1열 + 풀스크린 시트. 스펙표 모바일 가로 스크롤. 터치 타깃 44px, ESC·백드롭 닫기, focus trap, 닫을 때 트리거 카드로 포커스 복귀.
- **기본 카테고리**: TIM(thermal-interface-materials, 49제품 플래그십) 로드 시 기본 활성.
- **NOT in scope (defer)**: DESIGN.md 부재(추후 `/design-consultation`); 카탈로그 검색/필터; 제품 비교; URL 딥링크(`?product=`) — Phase 5+ 후보.
- **보존(변경 금지)**: Hero / Why / CTA 섹션, LANG의 hero·solutions·about·why·cta 데이터. LANG의 `products` 배열만 제거(THERMAL_CATALOG로 대체). `CUSTOMERS` 상수 유지(표현만 pill→리스트).

### 구현 작업 (T1~T6) — 전부 완료 (2026-05-18)
- [x] **T1** ThermalSection §2 재작성 — THERMAL_CATALOG import, LANG.products 제거, 2-pane, 기본 TIM. ✅ 49 TIM카드 렌더 확인
- [x] **T2** 상세 모달 — 갤러리(메인+썸네일) + 한글 benefits + 영문 스펙표 + 문의 CTA + ESC/backdrop. ✅ (완전 focus trap은 Phase 5 P2)
- [x] **T3** 빈 스펙 분기(D-11) — fan 모달에 빈 테이블 없음, 데이터시트 문의 폴백 확인 ✅
- [x] **T4** pill/이모지/colored-left-border 제거 — ThermalSection grep 0건(잔존 6은 ProductList 전역 네비, 범위 외) ✅
- [x] **T5** 반응형 — 375px 가로 카테고리바+1열+풀스크린시트(panel=viewport)+스펙표 가로스크롤 확인 ✅
- [x] **T6** ProductList:825/947 디스패치 변경 불필요(시그니처 유지) 확인 + `/codex review` PASS + dev QA 통과 ✅

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | not run (scope locked by track D-1~D-7) |
| Codex Review | `/codex review` | Independent 2nd opinion | 1 | clean | GATE PASS, 2 findings (P1 0), 1 fixed / 1 deferred to Phase 5 |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 0 | — | architecture locked by D-6 (A1/H1/H2/SA) |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | clean | score 5/10 → 8/10, 6 decisions added (D-8~D-13) |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | — | n/a (no developer-facing surface) |

- **CODEX:** GATE PASS. P2-1 thumbnail key collision → fixed (`key={\`${src}-${i}\`}`). P2-2 modal focus trap → deferred to Phase 5 (basic ESC/backdrop/44px-close implemented).
- **UNRESOLVED:** 0 blocking. Deferred: full focus trap (Phase 5 P2), DESIGN.md, search/filter, compare, deep-link, ProductList global nav pills (out of D-4 scope).
- **VERDICT:** DESIGN CLEARED (8/10) + CODEX CLEARED (GATE PASS). Phase 4 implemented & verified (dev QA, tsc 0). Ready for Phase 5 verification loop.
