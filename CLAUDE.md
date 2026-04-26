# OHI Tech Website

Next.js website for OHI Tech (글로벌 반도체 & 첨단산업 솔루션).

## Tech Stack

- Next.js with Turbopack, `output: "standalone"`
- Tailwind CSS v4 with `@tailwindcss/postcss`
- Multi-language support (ko, en, zh) via i18n dictionaries
- PM2 process manager, nginx reverse proxy
- Oracle Cloud server at 168.107.19.222

## Insights 블로그 콘텐츠 작성 규칙

`src/app/insights/_data.ts`의 아티클 body를 작성하거나 수정할 때는
반드시 `.claude/insights-content-guide.md`를 먼저 읽고 모든 규칙을 따를 것.

**트리거 조건** (아래 중 하나라도 해당하면 가이드 적용):
- `_data.ts`의 `body` 필드 작성/수정 시
- "아티클", "인사이트", "블로그", "콘텐츠 작성" 언급 시
- en/zh 번역 body 작성 시

**핵심 원칙 요약** (가이드 전문은 `.claude/insights-content-guide.md` 참조):
1. 경험 기반 — OHI Tech 직접 공급·납품·테스트 경험 중심
2. 결론 먼저 — 첫 문단에 핵심 답변 배치 (GEO 최적화)
3. 문단 3문장 이내 — 모바일 체류 시간 확보 (네이버 SEO)
4. 비교표 필수 — AI 브리핑 인용 가능성 극대화
5. FAQ 섹션 필수 — 글 마지막에 Q 3개 이상
6. ~합니다체 + 도입부 고민→해결책 구조
7. 발행 전 `.claude/insights-content-guide.md` 섹션 6 체크리스트 통과 필수

## gstack

gstack is installed at `.claude/skills/gstack/`.

### Available Skills

/office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review, /design-consultation, /design-shotgun, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse, /connect-chrome, /qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /retro, /investigate, /document-release, /codex, /cso, /autoplan, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade

### Rules

- **Always use `/browse` for all web browsing.** Never use `mcp__Claude_in_Chrome__*` tools directly.

### Workflow Automation

1. **New project / "새 프로그램", "처음부터", "새 프로젝트":**
   → /autoplan → /plan-eng-review + /plan-design-review (병렬) → 사용자 승인 → 코딩

2. **New feature / "기능 추가", "새 기능", "만들어줘":**
   → /autoplan → /plan-eng-review → 사용자 승인 → 코딩
   (예외: "색", "글자", "수정", "바꿔" 같은 단순 수정은 바로 코딩)

3. **After editing .js / .ts / .py files:**
   → /review 자동 실행

4. **After editing .jsx / .tsx / .css files:**
   → /qa 자동 실행
