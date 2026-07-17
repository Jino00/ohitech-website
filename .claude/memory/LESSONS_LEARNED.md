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

---

## 9. JSON-LD FAQ는 인증 미완료 상태를 단정하면 안 됨 (locale 리팩터 중 발견) — 2026-06-08

### 🐛 이슈
제품 JSON-LD(`_seo.tsx`)를 locale별 breadcrumb/FAQ로 리팩터하던 중, codex review가 EV FAQ "SKD/국산조립이 보조금 충전기 기준에 대응되나요? → 네"가 KC 인증 '진행 중'인 상태 대비 과장이라 지적. 이 문구는 이전 세션(`eca832e`)에서 이미 통과한 기존 라이브 카피였음.

### ✅ 해결
Jino 판단으로 해당 FAQ 항목을 완화가 아니라 **삭제** (ko/en/zh 3개 언어 모두). EV FAQ 4→3. 단, 동일 취지 문구가 **방문자 페이지 본문(`EVSection.tsx`)과 인사이트 아티클(`_data.ts`)에도 존재** — 그쪽은 codex diff에 안 잡혀 별도 플래그.
후속(2026-06-08): 플래그된 두 파일의 본문 클레임을 ko/en/zh 일관되게 조건부로 완화 — "충족/네/meets/满足/compliant/符合" → "대응하도록 설계(KC 인증 진행 중)/designed to support/旨在对应". 표 셀("대응"→"대응 설계(인증 진행 중)"), hero sub, missionText, whys, 아티클 intro·결론·비교표 전부 수정. `npm run build` pass + dev 서버 라이브 fetch로 두 페이지 렌더 확인(old claim 0건).

### 📌 교훈
- 인증/규격 "충족" 클레임은 인증 완료 전까지 JSON-LD/FAQ에 단정형("네/Yes")으로 쓰지 말 것. "대응하도록 설계" 수준 조건부만 허용하거나 아예 빼기.
- **codex review는 diff만 본다** — 같은 클레임이 diff 밖 파일(visible 페이지/아티클)에 있으면 못 잡음. 콘텐츠 정합성은 소스 전역 grep으로 따로 확인.
- 안전 grep이 meta keywords/description의 검색어("보조금")까지 매칭해 false-positive 낼 수 있음 → 어느 파일·어느 컨텍스트인지 끝까지 확인(원칙 22).

## 10. 자가 점검 API의 프로덕션 env 주입 + SSRF — /api/seo-audit 구축 — 2026-06-09

### 🐛 이슈
1. 새 보호 API에 `SEO_AUDIT_TOKEN`(.env) 필요 — 그런데 프로덕션엔 `.env` 파일이 전혀 없었음. 어디에 토큰을 넣어야 런타임에 읽히는지 불명.
2. Codex review가 [P1] SSRF 지적: 사이트가 자기 페이지를 fetch하는 audit에서 `redirect:"follow"`면 동일출처 open-redirect로 내부망/메타데이터(169.254.169.254) 도달 가능.

### ✅ 해결
1. `server.js`가 `process.chdir(__dirname)`로 standalone 디렉터리로 이동 + `NODE_ENV='production'` 하드코딩. `.next/standalone/`에 `.env`를 두면 `rsync --delete`에 지워짐 → **PM2 env 주입이 정답**: `SEO_AUDIT_TOKEN='..' pm2 restart ohitech --update-env && pm2 save` (재배포·재부팅에도 잔존). [[project-deploy-path]]에 기록.
2. `fetchPage.ts`를 `redirect:"manual"` + 매 홉 동일 호스트 검증으로 재작성, 5MB 스트리밍 본문 상한 추가. Codex 재리뷰 PASS.

### 📌 교훈
- 이 프로젝트 프로덕션은 `.env` 파일 없이 PM2 프로세스 env로만 비밀값 주입. 새 env 의존 기능 배포 시 `--update-env`+`pm2 save` 필수.
- 서버가 **자기/외부 URL을 fetch하는 엔드포인트는 기본적으로 SSRF 면 검토** — redirect는 manual로 동일 호스트만 따라가고, 본문 크기 상한을 둔다.
- 인증·파싱 같은 production 코드는 codex 1회 교차리뷰로 사각지대(SSRF) 확인 후 배포(원칙 19). 격리 통과 ≠ 합격, 프로덕션 curl로 401/200 라이브 증거 확보(원칙 22).

## 11. SEO 전수 점검 — hrefLang 대소문자 grep 함정 + buildAlternates locale 누락 패턴 — 2026-06-10

### 🐛 이슈
1. 라이브 페이지 head를 정규식으로 검사할 때 `hreflang` 소문자 패턴으로 grep → Next.js(React)가 JSX 속성을 `hrefLang`(대문자 L) 그대로 렌더링해서 매칭 실패. "hreflang 없음"으로 오판할 뻔함.
2. `buildAlternates(url, locale = "ko")`의 locale 기본값 때문에, 호출부에서 인자를 빠뜨리면 컴파일 에러 없이 조용히 ko canonical이 나감 — `about/page.tsx:56`만 누락되어 영/중 /about이 교차 로케일 canonical 상태로 라이브에 배포돼 있었음.
3. 비-www `https://ohitech.co.kr`이 www로 리다이렉트 없이 200 서빙 중인 것도 이번 점검에서 발견 (nginx에 비-www 443 server 블록의 301 부재).

### ✅ 해결
- HTML 속성 검사 정규식은 항상 `re.I`(case-insensitive)로. React 렌더 HTML은 camelCase 속성이 그대로 나올 수 있음.
- 점검 리포트(docs/reports/seo-audit-2026-06-10.html)에 HIGH 2건(비-www 리다이렉트, about locale 인자)으로 기록. 사용자 승인 후 같은 세션에서 수정 완료: nginx apex→www 301 블록 추가(백업 /home/ubuntu/ohitech-nginx.bak.20260610), about locale 인자 + robots Google-Extended 커밋(ea07ffc) 및 배포. codex review PASS, 라이브 재검증 + self-audit 재실행으로 canonical warn 2→0 확인.

### 📌 교훈
- **기본값 있는 locale/lang 파라미터는 누락해도 조용히 틀린다** — buildAlternates처럼 로케일 의존 함수는 호출부 전수 grep으로 인자 누락 점검 (`grep -n "buildAlternates(" | grep -v ", locale"` 패턴).
- 라이브 HTML 검사 시 대소문자 구분 없이 매칭, 그리고 한 페이지에서 통과해도 **로케일 변형(?lang=)마다 따로 확인** — 이번 canonical 버그는 ko에선 안 보이고 en/zh에서만 드러남.

## 12. SEO MEDIUM 배치 — 정규식 마크다운 링크 렌더링의 XSS 하드닝 + self-audit 샘플링 한계 — 2026-06-10

### 🐛 이슈
1. renderMarkdown에 외부 링크 치환을 추가했더니 codex가 [P1] href 속성 탈출 XSS 지적. body가 1차 콘텐츠(_data.ts)라 실제 공격 경로는 없지만, 정규식 기반 HTML 생성에 `$1`/`$2` 직접 보간은 구조적으로 취약.
2. 아티클 본문에 외부 인용을 추가해도 self-audit의 citations_authority는 warn 유지 — 점검 PAGES가 목록 경로 9개만 샘플링하고 아티클 URL은 안 봐서, 아티클 레벨 개선이 지표에 안 잡힘.

### ✅ 해결
1. URL 문자셋을 `[^)\s"'<>]+`로 제한(속성 탈출 원천 차단) + 링크 텍스트 `& < >` 이스케이프. codex 재리뷰 PASS.
2. 인용은 라이브 앵커 렌더링으로 직접 검증(지표 대신 실물 증거). 향후 runAudit.ts PAGES에 대표 아티클 1~2개를 추가하면 지표가 실제를 반영함.

### 📌 교훈
- **정규식 마크다운 렌더러에 새 인라인 치환을 추가할 때는 신뢰 모델과 무관하게 속성 보간을 하드닝**한다 (문자셋 제한 + 텍스트 이스케이프, 2줄 비용).
- **자가 점검 지표가 안 움직이면 지표의 샘플 범위부터 의심** — 개선이 틀린 게 아니라 지표가 그 페이지를 안 볼 수 있다(원칙 22: 실물 증거 우선).
- _data.ts 같은 대형 파일 다중 삽입은 라인번호 역순 처리 + 삽입 지점 패턴 assert로 안전하게.

## 13. citations_authority가 아티클 인용을 집계하도록 PAGES 확장 — grep 범위가 아티클 경계 넘은 오판 — 2026-06-10

### 🐛 이슈
1. runAudit.ts PAGES가 목록 경로 9개만 점검 → 아티클의 외부 인용·Article 스키마 개선이 citations_authority/freshness에 안 잡힘 (item 12에서 예고된 후속).
2. 진단 중 `awk 'NR>=242 && NR<=620'`로 esc 본문을 grep했는데 그 범위가 다음 아티클(wafer-carrier, 459~)까지 넘어가서, 라인 528의 "참고 자료/semi.org"를 esc 소유로 오판. "esc 인용이 미배포라 라이브에 없다"는 잘못된 결론에 도달.

### ✅ 해결
1. PAGES에 대표 아티클 3개 추가(esc, ev-charger-skd-localization, thermal-management). build→rsync(better-sqlite3/build 제외)→`pm2 restart ohitech`(--update-env 금지: 빈 쉘 env가 SEO_AUDIT_TOKEN 덮어씀)→프로덕션 /api/seo-audit Bearer 호출로 라이브 확인.
2. 오판은 `getArticleBody(esc,'ko')`를 실제 실행해 정정 — esc 본문엔 외부 링크가 원래 없음(라이브 0개가 정상). 외부 인용은 ev-charger(2)·thermal(1)이 보유.

### 📌 라이브 증거 (원칙 22)
- HTTP 200 / 1.47s / 87KB — 36 타겟 fetch가 maxDuration 60초의 ~2.5%. 아티클 추가에도 시간 여유 충분.
- citations_authority: "31개 중 6개, 고유 도메인 3개" — 6개 = ev-charger·thermal ×3로케일, 도메인 = ev.or.kr·kats.go.kr·tglobalcorp.com. 추가 전엔 0개였음.
- freshness: "Article 날짜 노출 9/9" PASS.

### 📌 교훈
- **파일 내 객체 경계를 무시한 라인범위 grep은 인접 항목을 오귀속한다** — `_data.ts`처럼 배열에 큰 객체가 줄줄이 있으면, 라인범위가 아닌 **소유 객체로 검증**한다(여기선 `getArticleBody()` 직접 실행이 정답). 추정 대신 실행으로 확인(원칙 22).
- **지표 샘플 범위를 넓힌 뒤엔 "어느 페이지가 카운트됐는지"까지 라이브로 대조** — 숫자(6/3)만 보지 말고 그 6개가 의도한 아티클인지 scope로 확인해야 진짜 반영 증명.

## 14. SEO LOW 과제 일괄(HSTS·telephone·answer_clarity) + 병렬 세션 충돌 감지 — 2026-06-10

### 🐛 이슈 / 발견
1. **answer_clarity 지표 = 각 페이지 첫 `<p>`(≥40자) 길이**. 히어로 서브타이틀이 <40자면 parser가 건너뛰고 본문 첫 문단을 잡아, 짧은 태그라인은 점검에 안 보임. **CJK는 60자 임계가 빡빡** — 영문은 통과(120자)인데 한/중은 22~59자라 전부 미달.
2. **sitemap "en/zh 미등록"은 오판** — `alt()`가 이미 모든 항목에 ko/en/zh/x-default를 `xhtml:link` hreflang alternate로 방출(라이브 sitemap.xml에 60개 확인). `?lang=` 전략에선 별도 `<url>` loc 추가가 중복 안티패턴.
3. **Organization telephone에 넣을 실제 번호가 코드/사이트 어디에도 없었음** — ContactForm의 phone은 입력 필드일 뿐. 추정 금지라 사용자에게 직접 받음(070-8800-8738).
4. **병렬 세션 충돌**: 핸드오프 경고대로, 칩에서 생성된 "아티클 샘플 추가" 세션이 같은 워킹트리에서 동작. 내가 runAudit.ts 변경을 f8b6e51로 커밋(10:35)한 **직후(10:38) 그 세션이 LESSONS 항목 13을 미커밋으로 기록**. 코드는 충돌 없이 1회만 반영됐으나, 같은 작업을 양쪽이 한 셈.

### ✅ 해결
- HSTS: `next.config.ts` `headers()`에 `max-age=63072000; includeSubDomains`(preload 제외 — 제출형 비가역 회피). telephone+email을 홈·about Organization contactPoint에.
- 서브타이틀 11개를 제네릭→구체(실제 카테고리 명시)로 교체, 기사 도입부 3개를 가이드(결과·고민 먼저)로 보강. **모든 문자열 길이를 node `collapse(s).length`로 사전 검증** 후 적용. 모바일 wrap 시각 QA(ko 3줄·zh 4줄, 오버플로 없음).
- 결과: answer_clarity warn 20→3→**0**, AEO warn 21→1. 전부 프로덕션 /api/seo-audit 라이브 실측.
- 항목 13(병렬 세션 미커밋)은 보존, 내 학습은 항목 14로 분리 기록.

### 📌 교훈
- **길이 임계(60자) 충족은 추정 말고 실제 collapse-length로 사전 검증** — 특히 CJK는 영문 감각으로 세면 한참 모자란다(원칙 22).
- **"미등록/누락"으로 보이는 SEO 항목은 라이브 산출물부터 grep** — sitemap hreflang은 이미 있었고, "추가"했다면 중복 안티패턴을 만들 뻔했다.
- **JSON-LD의 실데이터(전화/주소)는 추정 금지** — 소스·사이트에 없으면 사용자에게 받는다.
- **같은 워킹트리 병렬 세션은 mtime+blame으로 탐지** — `git status`의 미커밋 변경이 내가 안 만든 것이면, mtime을 내 커밋 시각과 대조하고 그 세션 작업을 보존한 채 사용자에게 알린다(원칙 20).
- `--update-env`가 SEO_AUDIT_TOKEN을 지운다는 항목 13 경고는 내 경우엔 발현 안 됨(배포 후 Bearer 200/무인증 401로 확인) — 서버/pm2 저장 env가 유지된 듯. 단, 경고는 유효하니 토큰 의존 재시작 후엔 매번 라이브로 인증 확인할 것.

## 15. GSC 제품 스니펫 오류 — Product 타입 자체가 두더지 잡기의 근원 — 2026-07-17

### 🐛 이슈
2026-07-17 15:24 KST GSC 알림: "'offers', 'review' 또는 'aggregateRating'을(를) 지정해야 합니다" (심각한 문제).
직전(같은 날) Product JSON-LD에서 Offer(price:"0")를 제거한 것이 직접 원인이었다.
당시 코드 주석에 "Offer를 생략하면 제품 스니펫 대상에서 제외되어 경고가 사라진다"고 적혀 있었으나
**그 가정이 틀렸다.** 구글 공식 문서는 정반대다 — Product로 선언된 이상 셋 중 하나는 필수다.

### ✅ 해결
Product 35개 → ItemList/ListItem 전환, 제조사는 Organization 노드로 승격.
두 타입 모두 리치리절트 게이트가 없어 경고 자체가 발생하지 않는다.
이미 사내에 검증된 선례가 있었다 — products/page.tsx의 CollectionPage+ItemList는 경고가 없었다.

### 📌 교훈
- **견적 기반 B2B에 schema.org Product를 쓰면 영구 경고를 피할 수 없다.** Offer 넣으면 price 필수(허위
  기재) + 판매자 목록이 배송·반품 정책 요구, 빼면 제품 스니펫 오류. 어느 쪽도 출구가 아니다.
  가격·리뷰·평점이 없는 페이지는 애초에 제품 스니펫 자격이 없으므로 Product를 포기해도 잃는 게 없다.
- **"이렇게 하면 경고가 사라진다"는 추정을 코드 주석에 사실처럼 적지 말 것.** 공식 문서로 확인하고,
  확인 안 됐으면 "미확인 가정"이라고 명시한다. 이번엔 그 주석이 다음 세션(나)을 오도할 뻔했다.
- **구조화 데이터 수정은 반드시 라이브에서 파싱해 확인**(원칙 22). dev 통과 ≠ 라이브 통과.
  배포 후 curl + JSON 파싱으로 Product 0건을 실증했다.
- **pm2 에러 로그는 타임스탬프부터 확인.** 이번에도 "Failed to find Server Action" 에러가 보였으나
  로그 파일 mtime이 3일 전(07-14)이라 이번 배포와 무관한 stale 기록이었다. 재시작 시각과 대조할 것.
- **로컬 .next/standalone/data/가 존재하면 rsync --exclude="/data" 없이는 운영 DB를 덮어쓴다.**
  이번에도 로컬에 data/가 있었고 운영은 29건이었다. 배포 전 백업 + 배포 후 건수 재확인으로 검증.
