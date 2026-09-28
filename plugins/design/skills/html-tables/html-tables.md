---
name: html-tables
description: Rules and reference code for HTML data tables. Use when writing or editing any <table> of data on a hand-written HTML page or a Svelte component: reports, comparisons, rankings, price lists. Covers sticky headers, number alignment, currency, semantic cell color, sorting, narrow screens, empty states and CSV export.
user-invocable: true
---

# HTML tables

Every data table on a page follows these rules. The reference code sits next to this file: `table.css`, `sort.js` and `csv.js`. It expects the color tokens from the `design:color` skill (`../color/tokens.css`).

## Rules

### Structure

- Put every table in a scroll wrapper, `<div class="table-wrap">`, with `overflow: auto` and a `max-height` of about 75vh.
- Put the border radius and border on the wrapper, never on the table. `overflow: hidden` on a table breaks sticky headers.
- Make the headers sticky: `thead th { position: sticky; top: 0 }`, with a solid background so rows don't show through.
- Freeze the first column on wide tables (`<table class="freeze">`) so the row label stays visible while scrolling sideways.
- Use `scope="col"` on column headers.

### Narrow screens

- Let the wrapper scroll sideways. The page itself never scrolls horizontally.
- Tighten the padding and font size below 640px. Don't drop columns silently.
- Wrap text before truncating it. If a cell truncates (`td.clip`), use an ellipsis and put the full text in `title`.

### Numbers

- Right-align numbers, and set `font-variant-numeric: tabular-nums` on both the `th` and the `td` (`class="num"` on both).
- Put footnote marks (`*`, `†`) in a fixed-width slot (`<span class="mk">*</span>`), and put an empty slot on unmarked rows too, so the digits stay in line.
- Show zero differently from missing. A real zero is `0`. A missing or not-applicable value is an em dash in `td.none` with `data-v=""`, so it sorts last.

### No repeating values

- If every row repeats the same value (the `/42` in `3/42`, a unit, a currency code), move it into the header and show only the part that varies: "Missed · of 42", "p50 · s".
- Put the header's unit on a second line: `Missed<br><span class="u">of 42</span>`.

### Currency

- Use accounting format: `$` flush left and the amount flush right in the same cell (`<span class="acct"><span>$</span><span>1,234.50</span></span>`).
- Use exactly 2 decimals and thousands separators. Put the raw number in `data-v`.

### Color

- Pick a meaning, show a legend above the table, and use the meaning consistently. The default is green = what we want, amber = caveat, red = disqualifying, neutral otherwise.
- Tint only the cells that need attention (`td.w`, `td.b`). Good values get colored text only (`td.g`).
- Give each row a verdict dot (`<span class="dot b" role="img" aria-label="Disqualified" title="Disqualified"></span>`) when the row has an overall verdict. Color is never the only cue.
- Keep gridlines faint: row dividers in `--line`, no vertical rules, no zebra striping by default.

### Sorting

- Make tables with more than 10 rows sortable by any column: `<table class="sortable">` plus `sort.js`.
- Headers respond to clicks and to Enter/Space. The script wraps each header in a `<button>`, so the keyboard works without extra code, and it sets `aria-sort`.
- Clicking cycles through ascending → descending → the original order.
- Sort by `data-v` on each cell: numbers compare numerically, text compares naturally, and empty values go last in both directions.
- The page's default order is the meaningful one (the ranking, the timeline). Ties always fall back to it.
- Don't animate sorting. The rows just move.
- Mark columns that shouldn't sort (row actions, a free-text note) with `data-nosort`.

### States and export

- A table with no rows says so in one full-width row: `<tr class="state"><td colspan="6">No results for this filter.</td></tr>`. A failed load uses `tr.state.error` and says what failed. Never show an empty table body.
- Add a "Download CSV" button to big tables (more than about 25 rows, or ones people will want in a spreadsheet): `<button type="button" data-csv="table-id">Download CSV</button>` plus `csv.js`. It exports the current sort order, using raw `data-v` values.

## Minimal example

```html
<p class="legend"><span class="sw g">Wanted</span> <span class="sw w">Caveat</span> <span class="sw b">Disqualifying</span></p>
<div class="table-wrap">
  <table class="sortable freeze" id="plans">
    <thead><tr>
      <th scope="col">Plan</th>
      <th scope="col" class="num">Missed<br><span class="u">of 42</span></th>
      <th scope="col" class="money">Monthly</th>
    </tr></thead>
    <tbody>
      <tr>
        <td data-v="Basic"><span class="dot g" role="img" aria-label="Recommended" title="Recommended"></span>Basic</td>
        <td class="num g" data-v="0">0</td>
        <td class="money" data-v="1250"><span class="acct"><span>$</span><span>1,250.00<span class="mk"></span></span></span></td>
      </tr>
      <tr>
        <td data-v="Plus"><span class="dot b" role="img" aria-label="Disqualified" title="Disqualified"></span>Plus</td>
        <td class="num b" data-v="7">7</td>
        <td class="money none" data-v="">—</td>
      </tr>
    </tbody>
  </table>
</div>
<button type="button" data-csv="plans">Download CSV</button>
<script type="module" src="sort.js"></script>
<script type="module" src="csv.js"></script>
```

On a single-file page, paste the contents of `table.css` into the page's `<style>` after the tokens, and paste `sort.js` (and `csv.js` if you need it) into one `<script type="module">` at the end of `<body>`.

## Svelte

Use the same markup and classes, with `table.css` in a global stylesheet. Keep the sort state in `$state`, and derive the sorted rows with `$derived` rather than running `sort.js`. The comparison rules stay the same: `data-v` semantics, empties last, ties by original index, and the tri-state cycle. Bind `aria-sort` on the `th`, and put the click handler on a `<button>` inside it.
