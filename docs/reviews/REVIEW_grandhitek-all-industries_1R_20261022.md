# 적대 리뷰 1R — Grand Hitek 전 산업 확장 (feat/grandhitek-all-industries, 미커밋 diff)

판정: **PASS** (P1 = 0) · 미완주 없음(COMPLETE) · 2026-10-22 KST 리뷰
리뷰어: Opus 5.5 서브에이전트(구현과 다른 기) · 소스 수정·커밋·배포 없음
⚠️미호출(/review): 대상이 미커밋 작업 트리라 base 대비 브랜치 diff를 보는 /review 대신 `git diff` 수동 검토 + 아래 실측으로 대체.

## 대상
- 기준 main = 6912775 (PR #11, 운영 배포본). diff 9파일(next-env.d.ts 무시) + 미추적 webp 4장.
- 의도: ①카테고리 이름 «반도체» 한정 제거(slug vacuum-pump 유지) ②적용 산업 섹션 ③/products 탭 «전체» 다음 맨 앞(sort_order 0).

## 실측 1 — schema.ts UPDATE: 운영 상태 재현 + 2회 부팅
방법: main(6912775)·작업 트리의 `src/db/schema.ts`·`ja-translations.ts`를 스크래치로 복사해 `tsc --module commonjs`로 컴파일, `boot.js`가 cwd를 바꿔 `getDb()` 호출(부팅 1회 = 프로세스 1개).
스크래치: `/private/tmp/claude-501/-Users-jino-Library-Mobile-Documents-com-apple-CloudDocs-1Personal-AI-Program-nosync---/d25f7114-9e09-4258-998c-499efbd99682/scratchpad/rev/`

| 시나리오 | 시작 상태 | 새 코드 부팅 1 | 부팅 2 |
|---|---|---|---|
| A 운영 재현(로컬 DB 사본을 PR#11 상태로 되돌림: semi:1 ev:2 thermal:3 laser:4 power:5 vacuum-pump:6 옛 이름 4개 언어, 제품 36) | vacuum-pump:6 [반도체 드라이 진공 펌프\|Semiconductor Dry Vacuum Pumps\|半导体干式真空泵\|半導体ドライ真空ポンプ] | vacuum-pump:0 [드라이 진공 펌프\|Dry Vacuum Pumps\|干式真空泵\|ドライ真空ポンプ], 나머지 1~5 그대로, 제품 36 | 동일(무변화) |
| B main으로 새 DB 시드 → 새 코드 | vacuum-pump:6 옛 이름, 제품 29 | vacuum-pump:0 새 이름 | 동일 |
| C 새 코드로 새 DB 시드 | — | vacuum-pump:0 새 이름 | 동일 |

관리자 수정 보존:
| 시나리오 | 조작 | 부팅 후 |
|---|---|---|
| D1 | 이전 후 name_ko='진공 펌프(관리자)' | 보존 (sort 0) |
| D2 | 이전 후 sort_order=3 | 보존 (3) |
| D5 | 배포 전 상태에서 name_ko만 관리자 값, 나머지 옛 이름 | name_ko 보존, en/zh/ja만 교정, sort 0 |
| D3 | 이전 후 sort_order=9(맨 뒤·최댓값) | **0으로 되돌아감** → P2-1 |

- 실행 순서 확인: ensureJaColumns → ensureMigrations → ensureVacuumPumpCategory(1b 이름 UPDATE, name_ja 포함) → backfillJaTranslations(빈 칸만). 운영의 name_ja가 이미 옛 값이어도 1b가 교정함(시나리오 A에서 ja 교정 관측).
- 정확히 1회: 이름 UPDATE는 WHERE에 옛 값 OR 조건, sort UPDATE는 `sort_order > 1 AND = MAX` 조건 → 2회차 둘 다 no-op(A·B 부팅 2 관측).

## 실측 2 — 사용자 표면 (next dev :3917, 작업 트리 + 로컬 DB(이미 vacuum-pump:0))
- 홈 `/`: 취급 분야 카드 순서 `01 드라이 진공 펌프`(featured, 새 설명문) → 02 반도체 장비 부품 → 03 EV → 04 열관리 → 05 레이저. «배전» 문자열 홈 전체에 없음. featured 깨짐 없음(categoryIcons·categoryDesc 둘 다 vacuum-pump 키 있음).
- `/products`: 탭 `전체 → 드라이 진공 펌프 → 반도체 장비 부품 → EV 충전 솔루션 → 열관리 솔루션 → 레이저 정밀 가공 장비`. 배전 탭·카드 없음(HIDDEN_NAV_CATEGORIES 유지). «반도체 드라이» 문자열 없음. en: `All → Dry Vacuum Pumps → Semiconductor Equipment Parts → …`.
- `/products/vacuum-pump` ko/en/zh/ja: 200, title «드라이 진공 펌프 | …» / «Dry Vacuum Pumps | …» / «干式真空泵 | …» / «ドライ真空ポンプ | …». `id="industries"` 섹션 렌더, 점유율(65%+ 등)·2차전지 주석 표시, FAQ «반도체 외에 어떤 산업…» 화면+JSON-LD 모두 존재. 남은 «반도체 드라이 펌프의 과제»는 기술 섹션의 반도체 전용 소제목으로 의도와 충돌 없음.
- industry-{semiconductor,display,solar,battery}.webp 4장 dev에서 200 image/webp.
- `npx tsc --noEmit -p .` → exit 0 (incremental).

## 변이 주입 (사용자 표면 끊기)
- M1: schema.ts의 sort UPDATE 문(1b 두 번째 db.prepare) 삭제 → 스크래치 컴파일 OK(tsc 통과) → 운영 재현 DB 부팅 결과 `vacuum-pump:6`(이름만 교정, 탭 맨 뒤 유지).
- 잡히는 곳: **tsc·테스트(저장소에 테스트·CI 없음) 어느 것도 못 잡음.** 새 DB 시드 경로(C)는 시드값이 0이라 이 변이에서도 맨 앞으로 보여 역시 못 잡음. 잡는 것은 «운영 상태 DB 재현 부팅» 또는 배포 후 라이브 `/products` 탭 순서 관측뿐 → P2-2.

## P1
없음.

## P2 (처분 제안)
- P2-1: sort UPDATE가 «vacuum-pump가 최댓값이고 >1»이면 매 부팅 0으로 되돌림 — 관리자가 일부러 맨 뒤로 옮기면 덮음(D3 재현). 카테고리 편집 API/관리 화면이 없어(`src/app/api`에 product_categories 쓰기 없음) 직접 SQL로만 발생 → 기각 또는 이월 가능. 완전 1회성이 필요하면 «sort_order = 6»(PR #11 값)으로 조건을 좁히면 됨.
- P2-2: 탭 순서 회귀를 막는 자동 검증 없음(M1 생존). 배포 후 라이브 `/products` 탭 첫 칸이 «드라이 진공 펌프»인지 1회 관측을 합격 증거로 남길 것.
- P2-3: 새 webp 4장이 미추적(`??`) — 경로 지정 커밋 시 빠뜨리면 운영에서 적용 산업 이미지 404. 커밋 경로에 `public/images/products/grandhitek/industry-*.webp` 포함 필요.
- 기록만(스코프 밖): 홈 부제 «반도체 장비 부품, EV 충전, 열관리, 레이저 정밀 장비까지…»와 히어로 띠 «반도체 · EV · 열관리 · 레이저»에 진공 펌프가 없음 — PR #11부터 있던 문구, 이번 diff 밖 → 소관: ohitech-website 홈 카피.

## 부수 효과
- 리뷰 중 `next dev`가 `next-env.d.ts`를 다시 써서 그 파일의 M 표시가 사라짐(무시 대상, 내용은 Next 자동 생성). 서버(:3917)는 종료 확인.

## 재현 명령
```
S=<위 스크래치>/rev
node $S/boot.js $S/new $S/A     # 운영 재현 DB 부팅(반복 실행 = 멱등 확인)
cd ~/ohitech-website && npx tsc --noEmit -p .
```
