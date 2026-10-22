판정: PASS (P1 = 0) — 완주함(미완주 아님) · 2026-10-22 16:34 KST

# 적대 리뷰 1R — feat/grandhitek-vacuum-pump (미커밋 작업 트리)

- 리뷰어: 서브에이전트 1기 (Opus 5.5), 읽기 전용. 소스 수정·커밋·배포 없음. 이 파일만 작성.
- 대상: `~/ohitech-website` 작업 트리, 브랜치 `feat/grandhitek-vacuum-pump`, base `c52a030`.
  변경: page.tsx, ProductList.tsx, [category]/page.tsx, _seo.tsx, sitemap.ts, ja-translations.ts, schema.ts, dictionaries.ts, runAudit.ts,
  새 파일 GrandhitekSection.tsx(2,015줄), grandhitek-faq.ts, public/images/categories/vacuum-pump.jpg, public/images/products/grandhitek/*(19개). next-env.d.ts 무시.
- 스크래치: `/private/tmp/claude-501/-Users-jino-Library-Mobile-Documents-com-apple-CloudDocs-1Personal-AI-Program-nosync---/d25f7114-9e09-4258-998c-499efbd99682/scratchpad/gh`
  (이하 `$S`)

## 1. 실행 명령 (계약 `실행:`)

```
cd ~/ohitech-website && npx tsc --noEmit -p .   → 출력 없음, exit=0 (16:2x KST 실측)
```

## 2. 재현 — ensureVacuumPumpCategory() 멱등성·운영 DB 안전성

방법: HEAD(c52a030)의 `src/db`를 `git archive`로 `$S/old`에, 작업 트리의 schema.ts·ja-translations.ts를 `$S/new`에 복사.
`$S/run/init.cjs <codeDir> <dbDir>` = jiti로 schema.ts를 불러 `getDb()` 1회(= PM2 재시작 1회와 동일 경로: initializeDb → ensureMigrations → backfillJa).

| 시나리오 | 준비 | 결과 |
|---|---|---|
| dbA (배포 전 운영 모사) | old 코드로 새 DB 생성 | 제품 23, Grandhitek country=Korea·category=semiconductor-parts, «Dry Vacuum Pump»(id7) cid1 active |
| A: 운영 모사 + 2회 부팅 | dbA + 문의 1건(product_id=7) + 라인업(product_id=7) + 제품 8건 추가(31건 → 29건 이상 조건) → new 코드 2회 | 1회/2회 덤프 `diff` **동일**(IDEMPOTENT). 카테고리 vacuum-pump sort 6 추가, 파트너 4: China·website·category=vacuum-pump·name_ja «Grand Hitek（通嘉科技）», 시리즈 7행 추가, id7 → cid6·is_active=0 (삭제 아님). 문의 FK 유지(`pragma foreign_key_check` 0건, `integrity_check` ok). 다른 파트너·제품 행 불변 |
| B: sort_order 6 선점 | dbA + 카테고리 `other` sort 6 → new 2회 | vacuum-pump sort 7(MAX+1), 중복 0, 카테고리 내 8행(시리즈 7 + 비활성 옛 1) |
| C: 새 DB(seedData 경로) 2회 | 빈 디렉터리 → new 2회 | 제품 29, vacuum-pump sort 6, 파트너 China·website 채움, 시리즈 7행, 2회째 no-op |
| D: 파트너 country가 이미 'Korea' 아님 | dbA + `update partners set country='China'` → new | 교정 스킵 — 설명·category·website·name_ja 옛값 유지 (설계대로 «관리자 수정값 보존», P2-2 참고) |

재현 명령(요지):
```
S=<위 스크래치>/gh
cd ~/ohitech-website && git archive HEAD src/db | tar -x -C $S/old
cp src/db/schema.ts src/db/ja-translations.ts $S/new/src/db/
node $S/run/init.cjs $S/old $S/dbA                  # 배포 전 DB
cp $S/dbA/data/ohitech.db $S/A/data/ && sqlite3 ... (문의·라인업·제품 추가)
node $S/run/init.cjs $S/new $S/A; dump > run1; node $S/run/init.cjs $S/new $S/A; dump > run2; diff run1 run2   → 동일
```

비활성화 영향 점검(코드 읽기 + 실측):
- 공개 화면·API는 전부 `p.is_active = 1` 필터(products/page.tsx:116, [category]/page.tsx:96, [sub]/page.tsx:107, api/products GET) → 옛 행은 공개 표면에서 사라짐. 옛 행은 숨김 서브(dry-vacuum-pump, HIDDEN_SUBS·noindex)에서만 쓰이던 것이라 공개 회귀 없음.
- 문의: inquiries.product_id FK는 행 삭제가 아니므로 유지. 관리자 문의 목록(`SELECT * FROM inquiries`)은 products 조인 없음 → 영향 없음.
- 관리자: 제품·파트너 UPDATE 경로가 앱에 없음(grep `UPDATE partners|products` 0건) → «관리자 수정값 덮어쓰기» 경로는 직접 DB 수정뿐. 라인업은 관리자 편집 대상 — P2-3.
- sitemap: vacuum-pump 1개 추가(dev 서버 sitemap.xml에서 `vacuum-pump` 12회 = 본 URL+hreflang). 기존 항목 불변.
- JSON-LD: /products/vacuum-pump에 `[Organization, Organization, ItemList, BreadcrumbList, FAQPage]` 파싱 성공, canonical `https://www.ohitech.co.kr/products/vacuum-pump`, noindex 없음.

## 3. 라이브(스크래치 dev 서버) 표면 관측

`$S/site` = 작업 트리 사본 + node_modules 클론 + 시나리오 A DB. `next dev -p 3917`.

| URL | HTTP | 관측 |
|---|---|---|
| /products/vacuum-pump | 200 | 탭: 전체·반도체 장비 부품·EV 충전·열관리·레이저·반도체 드라이 진공 펌프 (배전 탭 없음). 보이는 텍스트 14,937자, `id="dry-pumps"`·`id="faq"` 있음, «한국 공식 파트너» 보이는 텍스트 5회 |
| /products/vacuum-pump?lang=en/zh/ja | 200 ×3 | 각 언어 «official partner / 官方合作伙伴 / 公式パートナー» 존재 |
| /products | 200 | 같은 탭 6개, 배전 보이는 텍스트 0, href /products/power-distribution 0 |
| / (홈) | 200 | 카테고리 카드 링크: semiconductor-parts·ev-charging·thermal-management·laser-equipment·vacuum-pump (power-distribution 없음). `/products?category=vacuum-pump` → 307 → `/products/vacuum-pump` |
| /products/{semiconductor-parts, ev-charging, thermal-management, laser-equipment, power-distribution, semiconductor-parts/esc, semiconductor-parts/dry-vacuum-pump} | 200 ×7 | 다른 카테고리 회귀 없음(직접 URL 접근 유지) |

콘텐츠 요건: GrandhitekSection 외부 링크는 공식 홈페이지(`https://www.grandhitek.com.cn`)와 OHI Tech `/contact`뿐. 전화·이메일·주소 패턴 grep 0건(JSON-LD의 `addressLocality: Beijing`만 — 직통 연락처 아님). 고객사는 텍스트·마스킹 표기만, 로고 이미지 없음. 참조 이미지 19개 전부 public에 존재.

## 4. 변이 주입

| # | 변이 (스크래치 사본에만) | tsc | 저장소 내 다른 검증 | 결과 |
|---|---|---|---|---|
| M1 (마지막 표면 절단) | ProductList.tsx에서 vacuum-pump 두 분기(전폭 블록 + renderContent 분기)와 import 제거 | exit 0 | 없음(`npm test`는 «no test specified») | **생존**. /products/vacuum-pump는 여전히 200, JSON-LD FAQPage도 그대로 나감. 보이는 텍스트 14,937 → 1,491자, `id="dry-pumps"`·`id="faq"` 사라짐(일반 제품 카드로 폴백). 잡는 건 사람 눈/HTML 대조뿐 |
| M2 | ensureMigrations()에서 `ensureVacuumPumpCategory(db)` 호출 제거 | exit 0 | 없음 | **생존**. 배포 전 DB에 vacuum-pump 카테고리 0행, 파트너 country=Korea 그대로 → 홈 카드·탭 누락. /products/vacuum-pump는 정적 섹션이라 200 |
| M3 | 시리즈 루프의 `if (exists.get(p.en)) continue;` 제거 | — | 없음 | 2회 부팅 시 vacuum-pump 행 15(시리즈 중복 7). 본 리뷰의 «2회 부팅 diff» 재현 스크립트만 **사망**시킴 — 저장소엔 이 검사가 없음 |

결론: 이 변경을 지키는 자동 검증은 tsc뿐이고, 표면 절단(M1)·배선 누락(M2)·멱등성 파괴(M3)는 어느 것도 저장소 안에서 잡히지 않는다(P2-1).

## 5. P1 (배포 차단) — 0건

재현된 배포 차단 결함 없음.

## 6. P2 (처분: 채택/기각/이월)

- P2-1 회귀 방지 장치 부재: M1·M2·M3가 tsc를 통과. 최소안 = 배포 후 스모크 1줄(`curl -s https://www.ohitech.co.kr/products/vacuum-pump | grep -c 'id="dry-pumps"'` ≥1, 홈에서 `category=vacuum-pump` ≥1) 또는 2회 부팅 diff 스크립트를 scripts/에 둠.
- P2-2 파트너 교정 조건이 `country = 'Korea'` 하나뿐: 운영에서 country가 이미 다른 값이면(시나리오 D) 설명·category·website·JA가 옛 «한국 진공 기업» 문구로 남고 경고도 없음. 공개 화면엔 partners 설명이 안 나가서(관리자 화면만) 영향은 작음. 배포 직후 `sqlite3 data/ohitech.db "select country,category,website from partners where name_en='Grandhitek'"`로 1회 확인 권장.
- P2-3 옛 «Dry Vacuum Pump» 행에 달린 라인업(로컬 DB: id 15 GH-DP300, 16 GH-DP1200)이 같이 숨겨지고, 관리자 화면은 `/api/products`(활성만)로 제품을 불러와 이 라인업이 «선택된 제품 없음»으로 남음. 공개 노출 감소는 의도에 맞지만 관리자 정리 경로가 없음.
- P2-4 이미 색인·사이트맵에 올라 있는 인사이트 글 `insights/semiconductor-parts/dry-vacuum-pump`의 `relatedProductPath`가 여전히 noindex 처리된 옛 페이지 `semiconductor-parts/dry-vacuum-pump`(DryPumpSection: «한국 총판» 문구·고객사명 PARTNERS 목록)를 가리킴. 새 /products/vacuum-pump로 바꾸거나 옛 서브를 리다이렉트하는 것을 권장(이번 diff 범위 밖일 수 있음 → 이월 가능).
- P2-5 주석 불일치: schema.ts 독스트링 «4) 시리즈 4종», seedData 주석 «시리즈 4종»은 실제 7행. 동작 영향 없음.
- P2-6 (참고) src/app/about/page.tsx의 partnerList에 «Grandhitek, 한국»이 남아 있으나 렌더되지 않는 데이터(grep상 partnerList 사용처 없음) → 공개 영향 없음, 정리만 권장.

## 7. 미완주 여부

완주. tsc 실행, 마이그레이션 4시나리오 실측, dev 서버 HTTP 관측, 변이 3건 모두 수행. `next build`(standalone)는 돌리지 않음 — 빌드 산출물 검증은 범위 밖으로 남김.
