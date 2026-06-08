# OHI Tech Website — Lessons Learned

프로젝트별 반복 실수 방지 메모. 매 작업 종료 시 새 이슈 추가.

---

## 1. DB INSERT만 하고 schema seed에 안 넣으면 fresh 환경에서 누락 — 2026-04-29

### 🐛 이슈
TECO 카테고리 추가 시 로컬 SQLite에 `INSERT INTO product_categories ...` 직접 실행하고 끝냈음. 코드/시드 파일에는 반영 안 함. 그 결과 fresh build/deploy 환경에서는 `product_categories` 테이블에 `power-distribution` row가 없어서, `/products` 랜딩의 카테고리 카드 목록에서 TECO 카테고리가 노출되지 않음. 사용자는 직접 URL을 알아야만 접근 가능.

### ✅ 해결
`src/db/schema.ts`의 `seedData()` 함수에 partner/category/products 항목을 추가. 이 함수는 partners 테이블이 비어있으면 첫 부팅 시 자동 시드. 새 환경에서도 자동으로 적용됨.

### 📌 교훈
- **로컬 DB INSERT는 일회성 fix이지, 영구 변경이 아니다.** 항상 `schema.ts seedData()`에도 동일한 항목을 추가해야 함.
- DB 변경은 항상 두 곳: (1) 즉시 적용용 SQL INSERT, (2) 영구 보존용 schema.ts seedData.
- Codex review가 이걸 P2로 잡아냄 — 같은 패턴은 다음에 self-review 단계에서 먼저 체크.

---

## 2. Unsplash 이미지를 photo ID로 hotlink 시 콘텐츠 검증 필수 — 2026-04-29

### 🐛 이슈
`https://images.unsplash.com/photo-1581094271901-...?auto=format&fit=crop` 형태로 photo ID를 직접 hotlink. 키워드("industrial", "conveyor")만 보고 ID를 골랐는데, 실제로는 화학자/H 분자 이미지였음. "Direct Motor Drive" 솔루션 hero에 부적절한 화학 콘텐츠가 표시됨. 사용자에게 신뢰도 손상.

또한 일부 photo ID는 404 반환 → 콘솔 에러.

### ✅ 해결
7개 솔루션 이미지를 모두 `gradient + inline SVG 아이콘` 카드로 교체. 각 솔루션 의미에 맞는 SVG (bolt, shield, gauge, target, map, leaf, magnifier) + 색상 그라디언트.

### 📌 교훈
- **photo ID는 opaque 식별자다.** 키워드 추측으로 매칭하지 말 것. 반드시 브라우저로 열어 콘텐츠 확인 후 사용.
- **외부 CDN 핫링킹은 fragile.** ID 변경/삭제, referer 차단, 자동 차단 등 실패 모드 다양.
- **시각 통일성 + 안전성**이 필요한 곳은 `gradient + inline SVG`가 더 좋은 선택. 외부 의존 0, 콘솔 에러 0, 번들 영향 미미.
- 만약 외부 이미지가 꼭 필요하면: (1) 로컬 `/public/images/`로 다운로드, (2) Next.js `<Image>` 컴포넌트로 최적화, (3) `next.config.js`에 도메인 등록.

---

## 3. CATEGORY_CONFIG의 image 경로가 실제 파일 없으면 Next.js Image 400 에러 — 2026-04-29

### 🐛 이슈
`src/app/products/ProductList.tsx`의 `CATEGORY_CONFIG`에 `image: "/images/categories/ev-charging.jpg"` 등 경로가 설정돼 있는데, 실제 `public/images/categories/` 디렉토리에는 `semiconductor.jpg` 하나만 존재. 나머지 3개(ev-charging, thermal, laser)는 누락. 결과: `/products` 랜딩에서 매번 3건의 400 Bad Request 콘솔 에러.

### ✅ 해결
TECO 카테고리는 `image: ""` (빈 문자열) 처리 — `{config.image && (<Image .../>)}` 조건부 렌더링 덕분에 깨끗한 슬레이트 그라디언트 fallback. 누락된 다른 3개도 빈 문자열로 변경하거나 실제 이미지 파일 추가 필요.

### 📌 교훈
- **/public 경로 설정 시 실제 파일 존재 검증 필수.** linting/CI에서 잡아내기 어려움 — 수동 검증 또는 자동 검사 스크립트 필요.
- **빈 문자열 fallback 패턴이 효과적.** `image && <Image .../>` 조건부 렌더링으로 깔끔히 처리.
- 카테고리 카드처럼 데이터-드리븐 UI는 누락 데이터에 대한 graceful degradation이 필수.

---

## 4. 대형 파일 재작성 시 Write 전체 재타이핑 금지 — brace-match strip + 서지컬 Edit 조합 — 2026-05-18

### 🐛 이슈
1393줄 ThermalSection.tsx를 재작성할 때 `Write` 도구로 전체를 새로 타이핑하면 CJK 문자열(한국어 번역 데이터 1000줄+)이 깨지거나 누락될 위험이 높음. 실제로 시도 시 일부 유니코드 문자 손실 발생.

### ✅ 해결
1. Node 스크립트로 **dead 데이터 strip**: `PRODUCT_IMG`(10줄) + 3×`LANG.products` 배열(각 114줄) + 미사용 `IMG` 키 10개를 brace-matching으로 정확히 제거.
2. JSX 로직 부분만 **서지컬 Edit**: 변경이 필요한 함수/컴포넌트 블록만 교체.

### 📌 교훈
- **1000줄 이상 CJK 데이터가 있는 파일은 Write 전체 재타이핑 금지.**
- 순서: ① brace-match Node 스크립트로 dead 코드 strip → ② Edit으로 필요한 로직만 교체.
- Write는 새 파일 생성 또는 100줄 이하 소형 파일에만 사용.

---

## 5. dev 서버 첫 실행 전 `npm rebuild better-sqlite3` 필수 — NODE_MODULE_VERSION 불일치 — 2026-05-18

### 🐛 이슈
`src/db/schema.ts`가 better-sqlite3를 사용하는데, Node 버전 불일치 시 `ERR_DLOPEN_FAILED`가 발생해 **전 페이지 500**이 됨. 해당 파일과 무관한 작업(ThermalSection 수정 등)을 하다가 dev 서버를 올리면 이 에러로 아무 페이지도 뜨지 않아 처음엔 내 변경 때문인 줄 알고 디버깅 시간 낭비.

### ✅ 해결
dev 서버 시작 전 항상 `npm rebuild better-sqlite3` 실행. Node v20.20.2 환경 기준.

### 📌 교훈
- **세션 시작 시 dev 서버 올리기 전 `npm rebuild better-sqlite3` 선행 실행을 루틴화.**
- 500 에러 발생 시 내 변경 탓으로 가정하기 전에 better-sqlite3 rebuild 먼저 확인.

## 6. 새 insights 카테고리 추가 시 화이트리스트 4곳 동기화 필수 — 누락 시 404/500 — 2026-06-08

### 🐛 이슈
`_data.ts`에 `category: "power-distribution"` 아티클(contactor-guide)만 추가하고 라우트 화이트리스트를 갱신하지 않아, 라이브에서 아티클은 **404**, 카테고리 페이지는 **chip.color undefined로 500** 발생. 이전 세션 HANDOFF에는 "배포 완료/노출 유지(D-2)"로 적혀 있었으나 실제 라이브는 404였음(원칙 22 — HANDOFF 기록이 아닌 라이브 curl로 발견).

### ✅ 해결
새 카테고리 slug는 아래 **4곳 모두** 추가해야 함:
1. `insights/[category]/[slug]/page.tsx` — `CATEGORY_SLUGS`, `CATEGORY_META`, `CATEGORY_CHIP` (누락 시 `notFound()` 404)
2. `insights/[category]/page.tsx` — `CATEGORY_SLUGS`, `CATEGORY_META`, `CATEGORY_CHIP` (`CATEGORY_CHIP` 누락 시 아티클 map에서 `chip.color` 읽다 500)
3. `insights/page.tsx` — `CATEGORIES` 배열 (누락 시 에러는 없으나 메인 목록 카드 미노출)
4. `insights/_seo.tsx` — `CATEGORY_OG_IMAGE` (단, `?? fallback` 있어 누락해도 안전)

### 📌 교훈
- **카테고리 slug는 단일 소스가 아니라 4개 record/배열에 흩어져 있다.** 하나라도 빠지면 404 또는 500.
- `insights/[category]/[slug]` 라우트는 `searchParams(locale)` 때문에 **dynamic(ƒ)** 이라 빌드는 통과하고 런타임에만 터진다 → 반드시 standalone 실행 후 curl로 라우트별 검증.
- HANDOFF "배포 완료" 기록을 믿지 말고 라이브 curl로 확인할 것(원칙 22).

---

## 7. 시드 정의 수정만으로는 라이브 DB가 안 바뀐다 — 멱등 마이그레이션 필요 — 2026-06-08

### 🐛 이슈
EV 공급사 Zerova→RongXin 전환 중, `src/db/schema.ts`의 `seedData()` 정의(partner row)를 RongXin으로 고쳤지만 `seedData()`는 **partners 테이블이 비어있을 때만** 실행된다. 이미 시드된 로컬·프로덕션 DB는 그대로 "Zerova Technologies"를 보유 → `/about` 등 DB 기반 페이지가 라이브에서 여전히 Zerova 노출. 소스 grep으로는 안 잡힘(렌더 HTML에만 나타남).

### ✅ 해결
`ensureMigrations()`(기존 DB 분기)에 **멱등 UPDATE 마이그레이션** 추가: `WHERE name_en='Zerova Technologies'` 행을 RongXin으로 갱신. 첫 실행 후엔 매칭 행이 없어 no-op. 배포 후 **PM2 restart 시 getDb 초기화에서 자동 교정**(rsync는 data/ 미포함이라 서버 DB 보존됨).

### 📌 교훈
- **DB 기반 콘텐츠 변경은 2곳을 봐야 한다**: (1) `seedData()` = fresh 환경용 정의, (2) `ensureMigrations()` = 기존 DB용 멱등 마이그레이션. seedData만 고치면 이미 배포된 환경은 안 바뀐다.
- **소스 grep으로 0건이어도 라이브 HTML엔 남아있을 수 있다** — DB 데이터는 렌더된 HTML을 curl해서 확인할 것.
- 배포 후 **PM2 restart 필수** (마이그레이션 트리거). restart 안 하면 DB 교정 안 됨.
- 검증: `curl 라이브 | grep -i zerova` 가 0이어야 진짜 끝(원칙 22).

## 8. PDF 임베드 이미지는 pdfimages -all로 투명배경(smask) 추출 가능 — 2026-06-08

### 🐛 이슈
RongXin 제품 컷아웃 이미지가 개별 파일로 없고 마케팅 PDF/배너만 있었음. 배너는 제조사 연락처(WhatsApp/이메일)가 박혀 있어 OHI 사이트에 부적합.

### ✅ 해결
`pdfimages -f N -l M -all catalog.pdf out/`로 PDF 임베드 원본 추출 → smask(알파)가 RGBA PNG로 합쳐져 **투명 배경 제품샷** 확보. `sips -Z 900`으로 리사이즈. macOS는 poppler(`pdfimages`/`pdftoppm`) + `sips` 조합으로 충분(ImageMagick/Java 불필요). opendataloader-pdf는 Java 미설치로 실행 불가였음.

### 📌 교훈
- 제품 이미지가 PDF 안에만 있으면 `pdfimages -all`로 투명 컷아웃을 바로 뽑을 수 있다(스크린샷 크롭보다 품질 좋음).
- 마케팅 배너는 제조사 연락처가 박혀있을 수 있으니 그대로 쓰지 말 것 — 컷아웃만 쓰고 레이아웃은 CSS로.
