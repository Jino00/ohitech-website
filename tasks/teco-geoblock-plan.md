# TECO 지오블록 계획서 (A안)

> ⛔ **종료/보류 (2026-06-20). 구현 안 함.**
> **결정**: 지오블록 하지 않음. TECO 콘텐츠는 현 상태(전세계 노출·정상 색인) 유지.
> **이유 1**: 한국 구글 검색을 살리려면 Googlebot 예외 통과가 필요한데 이는 **클로킹**(구글 스팸정책 위반)으로, Jino가 위험 감수 불가 결정.
> **이유 2**: 클로킹을 피하려면 B안(Googlebot 차단)이어야 하나, nginx 14일 로그 실측상 **구글이 검색 유입의 78.9%(네이버 13.3%의 약 6배)** — 주 검색 채널을 버리는 선택이라 부적합.
> **재론 시**: 위 두 제약(클로킹 vs 구글 79% 의존)이 핵심. 새 사실(예: 구글 유입 급감, Cloudflare 도입)이 없으면 결론 동일.
> 아래는 종료 시점의 검토 기록(참고용).

---

> 작성일 2026-06-20. 외부 기억장치 (원칙 21 Layer 1).

## 목표 (확정 스펙)

한국 IP는 TECO 내용을 보고 구글 검색에도 노출되되, 외국 IP는 TECO 내용을 **열람 못 함(404)**.
- 탐지: 앱 내 MaxMind GeoLite2 (DNS·메일 무변경)
- noindex **미적용** → 한국 구글 검색 유지
- 검색봇(Googlebot·Bing·Naver Yeti)은 차단 **예외 통과** → 한국 색인 유지 (필수)
- 감수: 외국 구글 검색결과 제목 노출 / VPN 우회

## 사용자 원문 (왜곡 방지)

- "한국사람은 우리 TECO 홈페이지의 내용을 보고, 외국사람은 우리 사이트의 TECO 내용을 못봄"
- "외국에서 TECO를 검색해도 우리 사이트는 검색이 안되게. VPN은 어쩔 수 없음"
- "외국에서 검색했을때 보이기는 하지만 직접 들어가지는 못한다는거지?" → 예 (제목 노출 OK, 클릭 시 404)
- "한국 구글 검색을 버릴 수는 없잖아" → noindex 안 검 (A안)
- "그래, 지금 방향으로 가자"

## 차단 대상 (TECO 표면)

1. `/products/power-distribution` — 제품 라우트 `products/[category]/page.tsx`
2. `/insights/hvac-solution/teco-ecm-motor` — 인사이트 라우트 `insights/[category]/[slug]/page.tsx`
3. 인사이트 목록(`/insights`, `/insights/hvac-solution`)에서 위 글 카드 — 외국 IP에는 숨김

이미 처리됨: `/products` 메뉴(쿼리에서 제외), sitemap(power-distribution 주석 처리). teco-ecm-motor 글은 sitemap에 있음 → **유지**(한국 검색 노출 목적).

## 아키텍처 (Agent/Harness/SA)

MaxMind는 fs를 쓰므로 **Edge 미들웨어 불가** → Node 런타임인 **서버 컴포넌트에서 게이트**.

```
geo-gate (Harness, src/lib/geo.ts — Node util)
 ├─ SA: client-ip       → headers() x-forwarded-for / x-real-ip 에서 실제 IP
 ├─ SA: bot-verifier    → UA + Googlebot/Bingbot 역DNS 검증, Naver Yeti UA
 ├─ SA: geo-resolver    → IP→국가 (GeoLite2-Country.mmdb, lazy reader 캐시)
 └─ export isTecoAllowed() → (국가===KR || 검증된봇) ? true : false
        ↓ 각 TECO 라우트 서버컴포넌트가 호출
 products/[category]/page.tsx   → TECO category & !allowed → notFound()
 insights/[category]/[slug]/page.tsx → teco slug & !allowed → notFound()
 insights 목록 → !allowed 면 TECO 글 필터
```

## 작업 체크리스트

- [ ] ⏳ MaxMind 무료 계정 + 라이선스 키 발급 (Jino) → GeoLite2-Country.mmdb 확보
- [ ] ⏳ nginx `X-Forwarded-For`/`X-Real-IP` 전달 여부 서버 확인 (없으면 추가) ← 최우선 검증
- [ ] ⏳ `maxmind` npm 의존성 추가
- [ ] ⏳ `src/lib/geo.ts` 작성 (client-ip / bot-verifier / geo-resolver / isTecoAllowed)
- [ ] ⏳ `products/[category]/page.tsx` 게이트 추가 (notFound)
- [ ] ⏳ `insights/[category]/[slug]/page.tsx` 게이트 추가 (notFound)
- [ ] ⏳ 인사이트 목록에서 TECO 글 조건부 필터
- [ ] ⏳ 서버에 mmdb 배치 + `GEOIP_DB_PATH` env (PM2) + 월 1회 갱신(geoipupdate cron)
- [ ] ⏳ 검증: KR/비-KR/Googlebot 3경로 라이브 확인 (원칙 22)

## 미결 결정 (Jino 확인 필요)

- **IP 미확인 시 fail-open vs fail-closed**: 추천 fail-open(허용) — nginx 오설정 시 한국 사용자·봇 차단 방지. 단 nginx XFF 확인이 선결되면 거의 무의미.
- **봇 검증 수준**: Googlebot 역DNS 검증(권장, 스푸핑 방지) vs UA 문자열만(간단·취약).

## 리스크

- nginx가 실제 IP 미전달 시 전원 127.0.0.1 → 게이트 무력화. **선결 검증 필수.**
- 라우트가 dynamic 렌더 강제됨(headers 읽음) → 정적 캐시 사라짐. 트래픽 적어 영향 미미.
- mmdb 미갱신 시 정확도 하락 → cron 자동화.

---

## 🔍 ENG REVIEW + CODEX 결과 (2026-06-20, 미완 — 결정 대기)

### ⛔ 미해결 핵심 결정 (Jino 대기 중)
**A안 vs B안** — 한국 구글 검색을 위해 Googlebot을 예외 통과시킬지 여부.
- **A안**: Googlebot 통과 → 한국 구글+네이버 둘 다 색인. **단 클로킹(구글 스팸정책 위반) 위험** — 보호하려던 한국 SEO를 역으로 위협. 외국 구글 제목 노출 잔존.
- **B안 (Claude·Codex 둘 다 권장)**: Googlebot도 차단 → 클로킹 0, 외국 구글에 제목조차 안 뜸(누설 닫힘), 더 단순. **네이버(한국 IP 크롤러)는 통과 → 네이버 검색 유지.** 잃는 건 한국 구글 검색 하나.
- Jino 미결정 (dismiss). 다음 세션에서 이 결정부터.

### ✅ A/B와 무관하게 확정된 하드닝 (Claude·Codex 합의)
1. **XFF 스푸핑 차단**: 클라이언트 `X-Forwarded-For` 신뢰 금지. nginx가 세팅한 `x-real-ip`만 사용(nginx는 append 아닌 overwrite). PM2 포트 외부 비공개(방화벽) 필수.
2. **fail-OPEN → fail-CLOSED 로 변경** (Claude 권장 철회, Codex 지적 수용): 국가 불명/ mmdb 실패 시 TECO 라우트는 모두 404(전세계). 서버 시작 시 mmdb 헬스체크 + 실패 시 시끄러운 로그/알림. 사이트 전체가 아닌 **TECO 라우트에만** fail-closed.
3. **정적→동적 전환 수용**: insights `[slug]` 라우트는 `generateStaticParams` 정적 생성 중 → `headers()` 읽으면 dynamic 됨. 저트래픽·인메모리 데이터라 영향 미미. `generateMetadata`도 누설 점검.
4. **TECO 표면 전수 점검**: 카드 숨김만으론 부족. 관련글 추천, JSON-LD, OpenGraph, 내부 링크, 검색 데이터, API 라우트까지 teco-ecm-motor / power-distribution 노출 점검.
5. **테스트 부트스트랩**: 테스트 프레임워크 없음 → vitest 추가 + `geo.ts` 단위 테스트(KR 허용 / 외국 차단 / 봇 / IP 불명 fail-closed / XFF 스푸핑 무시).
6. **검증 시나리오 확장** (원칙 22): KR/비-KR/봇 외에 — 스푸핑 XFF, mmdb 없음, 사설 IP, PM2 포트 직접 접근, 가짜 Googlebot UA, (A안 시) 검증된 Googlebot 외국 IP, 메타데이터·목록·API 노출.

### Codex 원문 핵심
"Do not implement as written. Googlebot allowlist = cloaking risk against the Korean SEO it protects. XFF under-specified. fail-open makes the control silently optional. Redesign the decision first." → B안 채택으로 클로킹 이슈 해소됨.
