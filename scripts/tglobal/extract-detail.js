// SA2 page-context extractor. Runs in the product-detail page via `browse eval`.
// Returns a single normalized product JSON (string).
(() => {
  const txt = (el) => (el ? el.textContent.replace(/\s+/g, " ").trim() : "");

  const h1 = txt(document.querySelector("h1"));

  // Spec datasheet: .specTable > .specTableRow > .specTableColumn (4 cols)
  const rows = [...document.querySelectorAll(".specTable .specTableRow")];
  let header = [];
  const specs = [];
  for (const r of rows) {
    const cells = [...r.querySelectorAll(".specTableColumn")].map((c) =>
      c.textContent.replace(/\s+/g, " ").trim()
    );
    if (!cells.length) continue;
    if (r.classList.contains("specTableRowHead")) {
      header = cells;
      continue;
    }
    specs.push({
      property: cells[0] || "",
      unit: cells[1] || "",
      value: cells[2] || "",
      testMethod: cells[3] || "",
    });
  }

  // Description / benefits: the intro/desc block
  const descEl =
    document.querySelector(".desc, .description, [class*=intro], [class*=summary]") ||
    null;
  let benefits = [];
  let descText = "";
  if (descEl) {
    benefits = [...descEl.querySelectorAll("li")]
      .map((li) => li.textContent.replace(/\s+/g, " ").trim())
      .filter(Boolean);
    descText = descEl.innerText
      .replace(/\s*\n\s*/g, "\n")
      .replace(/Share：[\s\S]*$/i, "")
      .trim();
  }

  // Product images: upload/catalog_b/<...>.webp (dedupe, drop ?query)
  const imgs = [
    ...new Set(
      [...document.querySelectorAll("img")]
        .map((i) => i.src || i.getAttribute("data-src") || "")
        .filter((s) => /\/upload\/catalog_b\//.test(s))
        .map((s) => s.split("?")[0])
    ),
  ];

  // Breadcrumb category trail from JSON-LD
  let breadcrumb = [];
  const ld = document.querySelector('script[type="application/ld+json"]');
  if (ld) {
    try {
      const j = JSON.parse(ld.textContent);
      if (j && j.itemListElement) {
        breadcrumb = j.itemListElement.map((e) => (e.item && e.item.name) || "");
      }
    } catch (e) {}
  }

  return JSON.stringify({
    url: location.href,
    slug: location.pathname.replace(/.*products-detail\/([^/]+).*/, "$1"),
    title: h1,
    headerCols: header,
    specs,
    benefits,
    description: descText,
    images: imgs,
    breadcrumb,
  });
})();
