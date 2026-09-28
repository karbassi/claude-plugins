// CSV export: <button type="button" data-csv="table-id" data-filename="name.csv">Download CSV</button>
// Exports the rows in their current (sorted) order. Uses data-v where present, so
// numbers stay raw. Skips empty and error rows. Neutralizes cells that a spreadsheet would run as formulas.
const field = (cell) => {
  let s = (cell.dataset.v ?? cell.innerText).replace(/\s+/g, " ").trim();
  if (/^[=+@]|^-(?!\d)/.test(s)) s = `'${s}`;
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
