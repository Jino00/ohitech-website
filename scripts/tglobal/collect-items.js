// SA1 page-context collector. Runs in a leaf category page via `browse eval`.
// Returns the list of product-detail URLs found on the page (string).
(() => {
  const links = [
    ...new Set(
      [...document.querySelectorAll(".item a.link")]
        .map((a) => a.href)
        .filter((h) => /\/products-detail\//.test(h))
        .map((h) => h.split("?")[0].replace(/\/$/, "") + "/")
    ),
  ];
  return JSON.stringify(links);
})();
