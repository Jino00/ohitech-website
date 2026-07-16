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
- [x] P1. 타입·배선 인프라 (Locale 타입, locale.ts, middleware, sitemap, seo-audit, rps-faq) — 커밋 488e735
- [x] P2. 사전 ja **46키**(52 아님, 실측 정정) + Header 언어 스위처(日本語, 스위처 2곳)
- [ ] P3. 페이지 UI 인라인 리터럴 ja — insights 완료, products 섹션 진행 중
- [ ] P3b. **삼항 폴스루 스윕 (48곳 + t3 12곳)** — D-8 참조. tsc가 못 잡음, 전용 탐지기 필요
- [x] P4a. DB 스키마 `_ja` 컬럼 + `ensureJaColumns()` + `backfillJaTranslations()`
- [x] P4b. API(products/partners/lineups) + admin UI `_ja` 배선
- [ ] P4c. `src/db/ja-translations.ts` (백필 번역 데이터)
- [ ] P5. 인사이트 **11개** 아티클(13 아님, 실측 정정) ja 번역 — 4개 에이전트 병렬 진행 중
- [ ] P6. SEO (hreflang, buildAlternates, JSON-LD, sitemap)
- [ ] P7. 검증 (tsc + build + `?lang=ja` 브라우저 QA)
- [ ] P8. codex review (production 코드 → 1회)

## 실측 정정 (계획 대비)
- 사전 키: 52 → **46** (zh 블록 실측)
- 인사이트 아티클: 13 → **11** (`grep -c "slug:"`가 아티클 아닌 slug 참조 2건을 오카운트했음)

## 진행 중 발견 (D-6으로 승격)

### D-6. `Article` 타입 확장이 P5의 컴파일러 하니스
`_data.ts`의 `Article` 인터페이스 4필드(title/description/keywords/body)에 ja 추가 →
**tsc 에러 44건 = 11 아티클 × 4 필드**로 정확히 열거됨. 누락 시 빌드가 실패하므로 빠뜨릴 수 없다.

### D-7. `_data.ts` 동시 편집은 Edit 전용 + 구역 분리로 처리
180KB 단일 파일에 11개 아티클이 들어있어 에이전트 4명이 동시 작업.
**Write 금지(전체 덮어쓰기 → 타 작업 파괴), Edit만 허용**(지정 문자열만 치환 → 구역 격리).
롤백 지점: 커밋 488e735.

### D-8. 삼항 폴스루 = tsc가 못 잡는 버그 유형 (⚠️ 핵심 발견)
`locale === "ko" ? A : locale === "en" ? B : C` 형태에서 **C는 중국어**다.
`Locale`에 ja를 추가해도 이 식은 타입 에러가 안 난다 → **ja 사용자에게 중국어가 노출된다.**
tsc가 통과시키므로 D-2의 컴파일러 하니스로는 절대 못 잡는다.

실측: **48곳 / 8개 파일** (TecoSection 16, WaferSection 8, ESCSection 7, DryPumpSection 7,
LaserSection 5, ThermalSection 3, products/[category]/page.tsx 1, [sub]/page.tsx 1)
\+ `ThermalSection.tsx`의 `t3(locale, ko, en, zh)` 헬퍼 → 12개 호출부가 전부 ja→zh 폴스루.

**대응 1 — 전용 탐지기** (tsc를 대체하는 기계적 검증):
```bash
grep -rn 'locale === "en" ?' src --include='*.tsx' --include='*.ts' \
  | grep -v 'locale === "ja"' | grep -v 'src/lib/locale.ts'
```
→ 0줄이 완료 기준. (`src/lib/locale.ts`는 buildAlternates라 정상, 제외)

**대응 2 — `t3` 헬퍼는 ja를 필수 인자로**
`ja?` optional로 하면 안 된다. **필수로 해야 tsc가 12개 호출부를 에러로 열거**해준다.
optional은 조용한 누락을 허용하므로 D-2 하니스 철학에 반한다.

**예외 — 건드리지 말 것**: `ThermalSection.tsx`의 `catLabel()`은
`locale === "ko" ? cat.nameKo : cat.nameEn`으로 ja가 **영어**로 떨어진다.
D-1에 따라 thermal-catalog는 ko/en만 있으므로 **의도된 폴백**이다.

### D-9. ja 본문의 `[画像: ...]` 플레이스홀더는 제거한다
ko 본문에 편집용 플레이스홀더 `[이미지: ...]`가 5곳 있다(라인 79·393·669·952·1825).
`renderMarkdown()`은 `![alt](src)`와 `[text](url)`만 처리 → **괄호 없는 `[이미지: ...]`는 어떤 규칙에도
안 걸려 화면에 그대로 텍스트로 출력된다.** en/zh는 번역 시 전부 제거했다(선례).
→ D-1(zh 패리티)에 따라 **ja도 제거**. 에이전트별로 처리가 갈렸으므로(4곳 유입) 일괄 정리 필요.
실제 이미지 `![alt](/images/...)`는 **유지**한다(진짜 콘텐츠).

**별건 발견(이 트랙 범위 밖)**: ko 페이지는 지금도 이 플레이스홀더 5곳이 라이브에 노출 중이다.
이번 작업으로 생긴 게 아닌 기존 버그. 별도 처리 필요.

## 현재 진행 단계
P3·P4c·P5 병렬 진행 중 (에이전트 11개 중 6개 완료)
P3b(삼항 폴스루 스윕) 신규 추가 — Wafer/ESC/Thermal 3개 파일 착수, 나머지 5개 파일은 해당 에이전트 종료 후

## 다음 액션
1. 잔여 에이전트 완료 대기 → `tsc --noEmit` 0건 확인
2. zh 대비 ja 커버리지 grep 교차 검증 (tsc가 못 잡는 구간)
3. P6 SEO → P7 브라우저 QA(`?lang=ja`) → P8 codex review
