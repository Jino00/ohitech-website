import { articles, getArticleBody } from "../insights/_data";

const BASE_URL = "https://www.ohitech.co.kr";

export async function GET() {
  const items = articles
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .map((article) => {
      const title = article.title.ko;
      const description = getArticleBody(article, "ko").slice(0, 300).replace(/[<>&'"]/g, (c) => {
        const map: Record<string, string> = { "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" };
        return map[c];
      });
      const link = `${BASE_URL}/insights/${article.slug}`;
      const pubDate = article.publishedAt.toUTCString();
      return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${article.category}]]></category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OHI Tech 기술 인사이트</title>
    <link>${BASE_URL}/insights</link>
    <description>반도체·레이저·EV·열관리 분야의 전문 기술 가이드</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
