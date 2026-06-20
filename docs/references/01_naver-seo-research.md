# 네이버 검색 노출 — 딥리서치 결과 (2026-06-20)

> deep-research 하니스: 6각도, 24소스, 91주장 추출 → 25검증 → **18확인 / 7폐기**.
> ⚠️ 소스 대부분 2차/블로그 → 알고리즘 가중치는 미검증. 학술 1차 소스는 제한적.

## 구조적 진단 (확인됨)
- 네이버는 **외부 웹사이트를 구조적으로 덜 노출** — 검색·소비가 네이버 자산(블로그·카페) 안에서 끝나고 외부 referral 비중 낮음. (ascentkorea, theegg)
- 랭킹 = **C-Rank(출처 신뢰·주제 권위) + D.I.A.(개별 문서 경험·체류) + SmartBlock(의도별 노출)**. 키워드→의도 기반 이동. (twinword, i-boss, ascentkorea)
- AI Briefing 인용은 **블로그 UGC 우세**. 한국 ChatGPT 사용률 54.5%, 네이버 1위지만 하락세. (seonews, opensurvey)

## 확인된 핵심 주장 (3-0/2-1 ✓)
1. 최종 랭킹 = C-Rank + D.I.A. 결합
2. C-Rank = 출처(블로그/사이트)의 신뢰·주제 권위 평가, 누적 기반
3. D.I.A. = 개별 문서의 사용자 선호/경험 평가 (engagement)
4. 키워드 매칭 → 의도(intent) 기반으로 전환
5. 네이버, 웹문서 검색을 통합검색으로 병합 → 외부사이트 전용 노출 축소
6. **네이버 서치어드바이저 IndexNow 지원** → 봇 능동 수집 유발 ⭐
7. 외부사이트로의 네이버 referral 비중 낮음
8. AI Briefing 인용 = 블로그 UGC 우세
9. 네이버 2026초 여전히 1위(하락세), 한국 ChatGPT 54.5%
10. AirSearch = AI 기반, SmartBlock 노출은 명확한 의도 토픽에 의존

## 폐기된 통설 (믿지 말 것)
- "네이버는 엔터/쇼핑/게임 위주, B2B 수요 적다" → **0-3 폐기** (B2B 투자 근거 충분)
- "AI Briefing은 질의 구조로 노출 결정" / "6,000~8,000자·소제목 2~7개 우대" → **0-3 폐기**
- "2020년 웹사이트 검색영역 폐지" → **0-3 폐기**(불확실)

## 실행 우선순위 (B2B 사이트)
- **Tier 1 (사이트 기술, 즉시)**: ①IndexNow 연동 ②RSS+서치어드바이저 제출 ③서치어드바이저 전체 점검 ④온사이트 D.I.A./Yeti 신호(OG·구조화데이터·모바일·속도)
- **Tier 2 (네이버 생태계, 지속)**: ⑤단일 주제 네이버 블로그(C-Rank 권위) ⑥제품별 의도 타겟 글(SmartBlock) ⑦플레이스/지식iN/카페는 **ROI 데이터 미확보 — 블로그 우선**

## 주요 출처
- twinword.co.kr/blog/naver-seo-d-i-a/ · i-boss.co.kr/ab-6141-66453 · ascentkorea.com/naver-airsearch-smartblock/
- ppcle.com/blog/web-dev/naver-webmaster · news.hada.io/topic?id=19225 (IndexNow)
- seonews.co.kr/naver-ai-briefing-geo-202605/ · opensurvey.co.kr/article/ai-search-2026-2/
- theegg.com/seo/korea/naver-blog-search-algorithm-history/

## 사이트 적용 결정 (2026-06-20)
- TECO `teco-ecm-motor` 글: **googleBot noindex**(구글 포기, 네이버 유지). power-distribution은 기존대로 전체 noindex(계약 전 비노출) 유지.
- IndexNow + RSS 구현 착수.
