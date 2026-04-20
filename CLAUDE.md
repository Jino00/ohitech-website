# OHI Tech Website

Next.js website for OHI Tech (글로벌 반도체 & 첨단산업 솔루션).

## Tech Stack

- Next.js with Turbopack, `output: "standalone"`
- Tailwind CSS v4 with `@tailwindcss/postcss`
- Multi-language support (ko, en, zh) via i18n dictionaries
- PM2 process manager, nginx reverse proxy
- Oracle Cloud server at 168.107.19.222

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
