# 트랙: 일본어(ja) 로케일 추가

## 목표
en·zh와 동등한 수준의 일본어판을 사이트 전역에 추가한다. (zh 패리티 = 완료 기준)

## 사용자 원문 인용
> "우리 홈페이지에 영어, 중국어처럼 일본어판을 하나 추가해줘. 그리고 계획, 설계같은 복잡한 업무는 opus가 하고, 단순한 업무는 sonnet이 하도록 해서 끝까지 너가 자동으로 신선도를 유지하도록 handoff하면서 끝까지 너가 다 진행해줘. 중간에 옵션선택해야 하는거 있으면 너가 너의 추천옵션으로 자동진행해줘."
> (2026-07-16)

전제 확인: 이전 세션에 "일본어 번역" 결정 기록은 **존재하지 않았음**. 메모리/트랙/트랜스크립트 전수 검색 0건.
현재 브랜치명(`claude/homepage-japanese-translation-8453a4`)은 이번 요청으로 `ce0f20c`에서 생성된 것. 과거 작업 흔적 아님.
→ 본 트랙이 이 작업의 최초 기록이다.

## 확정 결정사항

### D-1. zh 패리티가 완료 기준
zh가 가진 것은 ja도 갖고, zh가 없는 것은 ja도 안 만든다.
근거: 사용자가 "영어, 중국어처럼"이라고 범위를 지정.
→ `thermal-catalog.ts`(67제품, 236KB)는 ko/en만 있고 zh 번역이 없음(auto-generated).
   따라서 **ja 번역 대상 아님**. `localizedField()`가 en으로 폴백한다.

### D-2. Locale 타입 확장을 최우선 작업으로 (self-verification 하니스)
`src/i18n/dictionaries.ts`의 `Locale` 타입에 `"ja"`를 먼저 추가한다.
근거: `dictionaries: Record<Locale, ...>`, `localeLabels: Record<Locale, string>` 등이
타입에 묶여 있어, 타입을 넓히면 **tsc가 누락 지점을 전부 컴파일 에러로 열거**한다.
→ 사람이 grep으로 찾는 대신 컴파일러가 체크리스트를 생성. 누락 원천 차단.
→ `tsc --noEmit` 통과 = 배선 누락 0건의 기계적 증거. (원칙 14)
주의: `{ko,en,zh}` 인라인 객체 리터럴(~270개)은 Locale 타입에 안 묶인 것도 있음.
      tsc가 못 잡는 구간은 grep 교차 검증 병행.

### D-3. URL 설계 — `?lang=ja` (기존 방식 답습)
근거: 현행이 `?lang=` 쿼리 파라미터 방식(`src/lib/locale.ts`의 `lp()`/`lq()`).
경로 방식(`/ja/...`)으로 바꾸는 건 en·zh URL 전체를 깨뜨리는 별개의 대공사.
→ 이번 트랙 범위 밖. 기존 방식 그대로 ja만 추가.

### D-4. 번역 품질 — B2B 기술 문체(です・ます체)
반도체·EV충전·열관리·레이저 도메인. 기술 용어는 일본 업계 표기 관행 우선.
(예: 半導体, 静電チャック(ESC), ドライポンプ, 熱伝導, レーザー)
회사명·모델명·브랜드(OHI Tech, TECO, T-Global, RongXin, NEOPURE®)는 원문 유지.

### D-5. DB 스키마는 `_ja` 컬럼 추가 (zh 선례 답습)
`src/db/schema.ts`가 `name_zh TEXT NOT NULL DEFAULT ''` 패턴.
→ `name_ja`, `description_ja`를 동일 패턴(DEFAULT '')으로 추가. 기존 행 마이그레이션 안전.
→ API(`/api/products`, `/api/partners`, `/api/lineups`), admin UI 동반 수정.

## 영향 범위 (실측)
- `zh` 참조 파일: 21개 (`grep -rl "'zh'\|\"zh\""`)
- `zh:` 인라인 리터럴: ~270개 / 27개 파일
- `_zh` 필드: 91개 / 8개 파일
- 인사이트 아티클: 13개 (`_data.ts`, 2857줄 / 180KB) — title·description·keywords·body 전부 ja 필요
- 사전 키: 52개

## 체크리스트
- [ ] P1. 타입·배선 인프라 (Locale 타입, locale.ts, middleware, sitemap, seo-audit, rps-faq)
- [ ] P2. 사전 ja 52키 + Header 언어 스위처
- [ ] P3. 페이지 UI 인라인 리터럴 ja (products/insights/about/contact 등)
- [ ] P4. DB 스키마 `_ja` + API + admin
- [ ] P5. 인사이트 13개 아티클 ja 번역
- [ ] P6. SEO (hreflang, buildAlternates, JSON-LD, sitemap)
- [ ] P7. 검증 (tsc + build + `?lang=ja` 브라우저 QA)
- [ ] P8. codex review (production 코드 → 1회)

## 현재 진행 단계
P1 착수 직전 (설계 완료, 트랙 기록 완료)

## 다음 액션
P1 구현 — Locale 타입에 "ja" 추가 후 `tsc --noEmit`으로 누락 지점 전수 열거
