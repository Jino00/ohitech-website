// IndexNow 제출 스크립트 — 네이버(서치어드바이저)에 URL 색인 요청을 즉시 보낸다.
// 네이버는 2023.7부터 IndexNow 지원. 구글은 IndexNow 미참여라 이 스크립트로는 구글에 통보되지 않는다.
//
// 사용법:
//   node scripts/indexnow.mjs                         # sitemap.xml 전체 URL 제출
//   node scripts/indexnow.mjs https://www.ohitech.co.kr/insights/...   # 특정 URL만 제출
//
// 배포/콘텐츠 수정 후 실행하면 네이버 Yeti가 해당 URL을 능동적으로 재수집한다.

const HOST = "www.ohitech.co.kr";
const KEY = "a96c35953eb127c0303de334ddf80387";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://searchadvisor.naver.com/indexnow"; // 네이버 IndexNow
const FETCH_TIMEOUT_MS = 15000;

async function withTimeout(promise, ms, label) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await promise(ctrl.signal);
  } catch (err) {
    throw new Error(`${label} 실패: ${err.message}`);
  } finally {
    clearTimeout(timer);
  }
}

async function getSitemapUrls() {
  const xml = await withTimeout(
    (signal) => fetch(SITEMAP_URL, { signal }).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.text();
    }),
    FETCH_TIMEOUT_MS,
    "sitemap 조회"
  );
  // <loc> 안의 URL만 추출 (alternate hreflang은 무시 — 정규 URL만 제출)
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set(locs)];
}

async function submit(urlList) {
  if (urlList.length === 0) {
    console.error("제출할 URL이 없습니다.");
    process.exit(1);
  }
  // IndexNow는 1회 최대 10,000 URL. 우리 사이트는 그 이하라 단일 요청.
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
  const res = await withTimeout(
    (signal) =>
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
        signal,
      }),
    FETCH_TIMEOUT_MS,
    "IndexNow 제출"
  );
  // 200/202 = 정상 수신. 그 외는 본문 출력.
  console.log(`IndexNow 응답: HTTP ${res.status}`);
  if (res.status !== 200 && res.status !== 202) {
    console.log(await res.text().catch(() => "(본문 없음)"));
  }
  return res.status;
}

function onHost(u) {
  try {
    return new URL(u).host === HOST;
  } catch {
    return false;
  }
}

async function main() {
  const argUrls = process.argv.slice(2).filter((u) => u.startsWith("http"));
  let urls;
  if (argUrls.length > 0) {
    // 호스트 검증: 우리 도메인(HOST) URL만 제출 — 오입력 시 네이버 422 방지.
    urls = argUrls.filter(onHost);
    const rejected = argUrls.filter((u) => !onHost(u));
    if (rejected.length) console.warn(`⚠️ 호스트 불일치로 무시: ${rejected.join(", ")}`);
    if (urls.length === 0) {
      console.error(`제출할 ${HOST} URL이 없습니다. (인자 URL의 호스트를 확인하세요)`);
      process.exit(1);
    }
  } else {
    urls = await getSitemapUrls();
  }
  console.log(`제출 대상 ${urls.length}개 URL → ${ENDPOINT}`);
  const status = await submit(urls);
  if (status === 200 || status === 202) {
    console.log("✅ 네이버에 색인 요청 전송 완료.");
  } else {
    console.error("⚠️ 비정상 응답. 위 본문/상태코드를 확인하세요.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`❌ ${err.message}`);
  process.exit(1);
});
