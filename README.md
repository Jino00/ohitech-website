# OHI Tech Website

OHI Tech(글로벌 반도체 & 첨단산업 솔루션) 공식 웹사이트. Next.js(App Router) + Tailwind CSS v4 + better-sqlite3, PM2/nginx로 Oracle Cloud에 배포.

## 개발

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

환경변수는 `.env.example`를 복사해 `.env.local`에 채운다(커밋 금지).

---

## SEO / AEO / GEO 자가점검 API

사이트가 **스스로** 자기 SEO(전통 검색)·AEO(AI 답변엔진)·GEO(생성형 AI) 노출 품질을 점검해 구조화된 JSON으로 내보내는 보호된 엔드포인트. 외부 마케팅 에이전트가 매일 호출해 "무엇이 잘 되고 안 되는지"를 보고받는 용도이며, **응답 JSON 형식은 안정적으로 유지되는 계약(contract)**이다.

측정은 하드코딩이 아니라 **라이브 페이지의 실제 HTML을 fetch·파싱**해 수행한다(전 로케일 ko/en/zh).

### 엔드포인트

```
GET /api/seo-audit
```

### 인증 (필수 — 공개 금지)

`Authorization` 헤더 필요. 두 방식을 지원하며, 실패 시 `401`을 반환한다.

| 우선순위 | 방식 | 설명 |
|---|---|---|
| 1 | `Authorization: Bearer <SEO_AUDIT_TOKEN>` | `.env`의 `SEO_AUDIT_TOKEN`과 일치(자동화 에이전트용). 토큰 미설정 시 Bearer 비활성화. |
| 2 | `Authorization: Basic base64(user:pass)` | 기존 `admin_users` 계정 자격증명(기존 `/admin` 보호 방식 재사용). |

```bash
# 자동화 에이전트(권장)
curl -H "Authorization: Bearer $SEO_AUDIT_TOKEN" https://www.ohitech.co.kr/api/seo-audit

# 관리자 계정(폴백)
curl -u admin:<password> https://www.ohitech.co.kr/api/seo-audit
```

### 환경변수

| 변수 | 기본값 | 설명 |
|---|---|---|
| `SEO_AUDIT_TOKEN` | (없음) | Bearer 인증 토큰. `openssl rand -hex 32` 권장. 미설정 시 Basic Auth만 허용. |
| `SEO_AUDIT_BASE_URL` | `https://www.ohitech.co.kr` | 점검 대상 base URL. 로컬 검증 시 `http://localhost:3000`. |

### 응답 JSON 계약 (고정)

```jsonc
{
  "audited_at": "ISO8601",            // 점검 시각
  "site_url": "https://www.ohitech.co.kr",
  "summary": {                         // 카테고리별 status 집계
    "seo": { "pass": 0, "warn": 0, "fail": 0 },
    "aeo": { "pass": 0, "warn": 0, "fail": 0 },
    "geo": { "pass": 0, "warn": 0, "fail": 0 }
  },
  "checks": [
    {
      "category": "SEO | AEO | GEO",
      "id": "machine_readable_id",     // 안정적 식별자
      "title": "사람이 읽는 점검명",
      "status": "pass | warn | fail",
      "scope": "site | /about?lang=en",// 사이트 전체 또는 특정 페이지 경로
      "detail": "현재 무엇이 어떤 상태인지",
      "recommendation": "어떻게 고치면 되는지"
    }
  ]
}
```

### 점검 항목 (`id`)

스킬(`seo-audit`, `ai-seo`)의 검증된 체크리스트 기반.

- **SEO**: `title_length`, `meta_description`, `canonical`, `og_twitter`, `json_ld_valid`, `hreflang`, `heading_structure`, `image_alt`, `page_weight`, `page_unreachable`(페이지별) · `sitemap`, `robots_txt`, `internal_links`, `locale_url_strategy`(사이트)
- **AEO**: `answer_clarity`(페이지별) · `faqpage_schema`, `llms_txt`, `nap_clarity`(사이트)
- **GEO**: `entity_sameas`, `citations_authority`, `freshness`(사이트)

> 페이지별 항목은 전 로케일(ko/en/zh)에 대해 각각 평가되며 `scope`에 해당 경로가 기록된다.
> `page_weight`는 서버 측 TTFB·HTML 용량 기반 best-effort 신호이며 Lighthouse 풀스캔이 아니다.
> **페이지 fetch 실패 시** 해당 `scope`는 다른 페이지별 항목 대신 단일 `page_unreachable`(fail) 항목으로만 보고된다(존재하지 않는 신호를 추측 보고하지 않기 위함). 따라서 `checks` 배열의 길이는 페이지 도달 상태에 따라 달라질 수 있다.
> `site_url`은 **실제로 점검한** base URL을 반영한다(`SEO_AUDIT_BASE_URL` 오버라이드 시 그 값). 라이브 운영에서는 기본값과 동일하다.

### 예시 응답 (라이브 발췌)

```json
{
  "audited_at": "2026-06-09T02:02:53.319Z",
  "site_url": "https://www.ohitech.co.kr",
  "summary": {
    "seo": { "pass": 188, "warn": 49, "fail": 10 },
    "aeo": { "pass": 12, "warn": 18, "fail": 0 },
    "geo": { "pass": 1, "warn": 1, "fail": 1 }
  },
  "checks": [
    {
      "category": "SEO", "id": "title_length", "title": "Title 태그",
      "status": "pass", "scope": "/products/ev-charging?lang=en",
      "detail": "title 60자: \"EV Chargers | RongXin SKD Supply & Local Assembly — OHI Tech\".",
      "recommendation": "적정 길이입니다."
    },
    {
      "category": "GEO", "id": "entity_sameas", "title": "엔티티 명확성(Organization sameAs)",
      "status": "fail", "scope": "site",
      "detail": "Organization 스키마에 sameAs가 없습니다.",
      "recommendation": "sameAs에 권위 프로필(LinkedIn·위키데이터·공식 SNS·디렉터리)을 2개 이상 연결해 엔티티를 강화하세요."
    },
    {
      "category": "AEO", "id": "faqpage_schema", "title": "FAQ / FAQPage 스키마",
      "status": "pass", "scope": "site",
      "detail": "점검 27개 페이지 중 12개에 FAQPage 스키마 존재.",
      "recommendation": "적정합니다."
    }
  ]
}
```

### 코드 구조 (Agent–Harness–Sub-Agent)

```
src/app/api/seo-audit/route.ts     Agent    — 인증 게이트 → Harness 호출 → 계약 JSON
src/lib/seo-audit/runAudit.ts      Harness  — 대상 fetch(동시성 제한) → 체커 실행 → summary 집계
src/lib/seo-audit/fetchPage.ts     Sub-Agent — URL fetch(timeout+재시도)
src/lib/seo-audit/parse.ts         Sub-Agent — node-html-parser로 SEO 신호 추출
src/lib/seo-audit/checks/{seo,aeo,geo}.ts    — 단일 책임 체커 함수
src/lib/adminAuth.ts               공유      — admin_users 자격증명 검증(/admin 과 공유)
```
