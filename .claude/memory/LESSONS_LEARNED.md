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
