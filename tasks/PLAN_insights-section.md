# Plan: OHI Tech Insights Section
<!-- /autoplan restore point: /Users/jino/.gstack/projects/Jino00-ohitech-website/main-autoplan-restore-20260426-105722.md -->

## Goal
Build a self-hosted blog/insights section at `/insights` on ohitech.co.kr.
Showcase technical articles per product to drive SEO and inform visitors.

## Context
- Naver blog benchmark: ESC:683건, WAFER:210건, PUMP:256건, THERMAL:485건, LASER:9건(PRIORITY), EV:4564건, ORING:279건
- LASER is #1 priority due to near-zero competition
- EV article: target niche B2B angle (industrial charging), not general consumer content
- No CMS — static TypeScript data (same as products pattern)
- Next.js SSR + Tailwind CSS v4, multi-language (ko/en/zh)

## URL Structure
- `/insights` — listing page (card grid)
- `/insights/[slug]` — individual article page
- `/rss.xml` — RSS feed route handler for Naver RSS registration

## Data Schema (`_data.ts`)
```typescript
interface Article {
  slug: string;
  category: "semiconductor-parts" | "laser-equipment" | "ev-charging" | "thermal-management";
  relatedProductPath: string; // e.g., "semiconductor-parts/esc" — full path, both segments
  publishedAt: Date;          // Date object, NOT string (for RSS validity)
  title: { ko: string; en: string; zh: string };
  description: { ko: string; en: string; zh: string };
  keywords: { ko: string[]; en: string[]; zh: string[] };
  body: { ko: string; en: string; zh: string }; // fallback: ko when en/zh is ""
}
```

## Article Slugs (7 total, LASER first)
1. `laser-equipment` — 레이저 장비 완벽 가이드 (PRIORITY: only 9 Naver posts)
2. `esc` — 반도체 정전척(ESC) 완벽 가이드
3. `wafer-carrier` — 웨이퍼 캐리어 & FOUP 선택 가이드
4. `dry-vacuum-pump` — 반도체 드라이 진공펌프 완벽 가이드
5. `oring` — 반도체 O-ring 소재 선택 가이드
6. `thermal-management` — 첨단 열관리 솔루션 가이드
7. `ev-charging` — EV 충전 인프라 가이드 (B2B industrial focus, not consumer)

## Components to Build

### 1. `src/app/insights/_data.ts`
- All 7 articles as static TypeScript data
- `publishedAt: new Date("2026-04-26")`
- `body.en` / `body.zh` fallback to `body.ko` when empty

### 2. `src/app/insights/_seo.tsx`
- `getMetaForSlug(slug, locale)` — returns title/description/keywords
- `InsightsJsonLd` component (Article schema)
- `getInsightsOgImages()`, `getInsightsTwitterImages()`

### 3. `src/app/insights/page.tsx` — Listing page
- SSR, `generateMetadata()`
- Hero: `hero-gradient`, h1 = "기술 인사이트 / Technical Insights / 技术洞察"
- Card grid (2-col on desktop, 1-col mobile)
- Card: title, 100-char excerpt, category chip (color-coded), locale date, "자세히 보기" link
- Category chip colors: semiconductor-parts=blue, thermal=orange, laser=violet, ev=green, oring=gray

### 4. `src/app/insights/[slug]/page.tsx` — Article detail
- SSR, `generateMetadata()`, `generateStaticParams()` (returns all 7 slugs)
- `notFound()` for unknown slugs
- `canonical = ${BASE_URL}/insights/${slug}` (no ?lang=)
- hreflang alternates with ?lang=ko/en/zh
- Layout: hero-gradient header → max-w-3xl prose body → product CTA block
- Breadcrumb: "인사이트 / Insights / 洞察 > [Article Title]"
- Above-fold: h1 title, category chip, date, reading-time estimate
- Bottom: "관련 제품 보기" CTA → `/products/${relatedProductPath}`
- locale fallback: use `body.ko` when `body[locale]` is empty string

### 5. `src/app/rss.xml/route.ts` — RSS feed
- `Content-Type: application/rss+xml; charset=utf-8`
- `<description>` wrapped in `<![CDATA[...]]>`
- `pubDate` from `publishedAt.toUTCString()` (RFC 822 format)
- Verify nginx does not intercept `.xml` before Next.js (deployment note)

### 6. Header + i18n updates
- `src/components/Header.tsx` — add `{ href: "/insights", label: t(locale, "nav.insights") }` to navItems
- `src/i18n/dictionaries.ts` — add `"nav.insights": "인사이트" / "Insights" / "洞察"` for all 3 locales

### 7. `src/app/sitemap.ts` — Add insight entries
- `/insights` entry (priority 0.8, weekly)
- 7 article entries (priority 0.7, monthly)
- `lastModified: article.publishedAt` per article (not `new Date()` — prevents cache invalidation)

## SEO per article
- `generateMetadata()`: title / description / keywords / canonical (clean URL) / hreflang
- JSON-LD: Article schema, `author: { name: "OHI Tech" }`, `publisher`
- `robots: { index: true, follow: true }`

## NOT in scope (deferred)
- OG images per article (Next.js `@vercel/og`)
- Naver Blog cross-posting / backlink strategy
- Email newsletter capture
- Pagination
- `/insights/[category]` filtering
- Admin CMS UI

## Phase Breakdown
1. **Phase 1**: `_data.ts` structure (schema + 7 stubs) + `_seo.tsx` helpers
2. **Phase 2**: `insights/page.tsx` (listing) + `insights/[slug]/page.tsx` (article)
3. **Phase 3**: Header nav + i18n keys + sitemap update
4. **Phase 4**: `rss.xml/route.ts`
5. **Phase 5**: Article content — LASER ko/en first, then others

## Deployment Checklist
- `npm run build` — check no TS errors
- Verify nginx does NOT have `location ~ \.xml$ { ... }` intercepting before Next.js
- `npm rebuild better-sqlite3` + copy static files (existing deploy procedure)
- Submit `/rss.xml` to Naver Search Advisor

## Success Criteria
- `/insights` shows 7 article cards, ko/en/zh switching works
- `/insights/laser-equipment` has full Korean article, clean canonical
- `/rss.xml` returns valid RSS 2.0 (validate at validator.w3.org/feed/)
- `/insights/invalid-slug` returns 404 (not 500)
- `npm run build` passes clean
- Header shows "인사이트" (ko) / "Insights" (en) / "洞察" (zh)

<!-- AUTONOMOUS DECISION LOG -->
## Decision Audit Trail

| # | Phase | Decision | Classification | Principle | Rationale |
|---|-------|----------|-----------|-----------|----------|
| 1 | CEO | Static TS data over CMS | Mechanical | P5 | 7 articles; explicit over clever |
| 2 | CEO | EV article: B2B industrial angle | Mechanical | P5 | 4564건 competition — need niche |
| 3 | CEO | Add `updatedAt` field | Mechanical | P1 | Content staleness risk in B2B |
| 4 | CEO | Naver cross-post → TODOS.md | Mechanical | P3 | Not in scope v1 |
| 5 | Design | `relatedProductPath` replaces `relatedProductSlug` | Mechanical | P5 | Needs both category+sub |
| 6 | Design | Add article CTA block ("관련 제품 보기") | Mechanical | P1 | User journey break |
| 7 | Design | Add breadcrumb on article page | Mechanical | P1 | No wayfinding otherwise |
| 8 | Design | Card: 100-char excerpt, locale date, chip colors | Mechanical | P5 | Implementer would invent randomly |
| 9 | Design | Locale fallback ko when en/zh empty | Mechanical | P5 | Prevents blank body |
| 10 | Eng | `generateStaticParams` on [slug]/page.tsx | Mechanical | P1 | standalone output needs it |
| 11 | Eng | `notFound()` for unknown slugs | Mechanical | P1 | 500 vs 404 correctness |
| 12 | Eng | RSS `application/rss+xml` Content-Type | Mechanical | P1 | Naver validator requires it |
| 13 | Eng | RSS CDATA wrapping | Mechanical | P1 | Naver RSS spec |
| 14 | Eng | `publishedAt: Date` type not string | Mechanical | P5 | RFC 822 needs valid Date |
| 15 | Eng | sitemap uses `publishedAt` not `new Date()` | Mechanical | P5 | Prevent CDN cache defeat |
| 16 | Eng | nginx .xml check in deploy notes | Mechanical | P1 | Potential routing conflict |
