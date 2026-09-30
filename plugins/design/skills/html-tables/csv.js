// CSV export: <button type="button" data-csv="table-id" data-filename="name.csv">Download CSV</button>
// Exports the rows in their current (sorted) order. Uses data-v where present, so
// numbers stay raw. Skips empty and error rows. Neutralizes cells that a spreadsheet would run as formulas.
const text = (cell) => {
  const copy = cell.cloneNode(true); // textContent ignores CSS text-transform; <br> becomes a space
  copy.querySelectorAll("br").forEach((br) => br.replaceWith(" "));
  return copy.textContent;
};
const field = (cell) => {
  let s = (cell.dataset.v ?? text(cell)).replace(/\s+/g, " ").trim();
  if (/^[=+@]/.test(s) || (s.startsWith("-") && !Number.isFinite(Number(s)))) s = `'${s}`; // only plain negative numbers pass
  return `"${s.replace(/"/g, '""')}"`;
};

for (const button of document.querySelectorAll("button[data-csv]")) {
  button.addEventListener("click", () => {
    const table = document.getElementById(button.dataset.csv);
    const rows = [...table.rows].filter((r) => !r.classList.contains("state"));
    const csv = rows.map((r) => [...r.cells].map(field).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: button.dataset.filename || `${table.id}.csv` });
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}
