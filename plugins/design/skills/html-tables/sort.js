// Sortable tables: <table class="sortable">, loaded with <script type="module">.
// Clicking a header (or Enter/Space on it) cycles ascending → descending → original order.
// Cells sort by data-v, falling back to their text. Numbers compare numerically,
// empty values always sort last, and ties keep the original order.
// A header with data-nosort stays static.
const NEXT = { none: "ascending", ascending: "descending", descending: "none" };

for (const table of document.querySelectorAll("table.sortable")) {
  const body = table.tBodies[0];
  const heads = [...table.tHead.rows[0].cells];
  [...body.rows].forEach((row, i) => (row.dataset.rank ??= i));

  const key = (row, col) => (row.cells[col]?.dataset.v ?? row.cells[col]?.textContent ?? "").trim();

  heads.forEach((th, col) => {
    if (th.hasAttribute("data-nosort")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.append(...th.childNodes);
    th.append(button);

    button.addEventListener("click", () => {
      const state = NEXT[th.getAttribute("aria-sort") ?? "none"];
      heads.forEach((h) => h.removeAttribute("aria-sort"));
      if (state !== "none") th.setAttribute("aria-sort", state);
      const dir = state === "descending" ? -1 : 1;

      const rows = [...body.rows].sort((a, b) => {
        const rank = a.dataset.rank - b.dataset.rank;
        if (state === "none") return rank;
        const x = key(a, col), y = key(b, col);
        if (!x || !y) return !x - !y || rank;
        const nx = Number(x), ny = Number(y);
        const c = Number.isNaN(nx) || Number.isNaN(ny)
          ? x.localeCompare(y, undefined, { numeric: true, sensitivity: "base" })
          : nx - ny;
        return c * dir || rank;
      });
      body.append(...rows);
    });
  });
}
