---
name: color
description: Color rules for hand-written HTML pages and Svelte components. Use when choosing colors, adding a legend, coloring table cells or chart lines, setting up light and dark themes, or checking contrast.
user-invocable: true
---

# Color

Color carries meaning on these pages. Decide what each color means before you use it, show that meaning in a legend, and keep it the same everywhere on the page.

## Rules

### Meaning

- Pick the meaning first. The default is **green = what we want, amber = a caveat, red = disqualifying**, and neutral for everything else.
- Show a legend next to the thing it explains, directly above the table or chart, using the same classes the data uses so the swatches match exactly.
- Use one meaning per color across the whole page. If red means "disqualifying" in one table, it can't mean "high" in the next.
- Keep the accent (blue) for links, focus rings and interactive state. Don't use it as a data verdict unless the legend says so.
- Tint only what needs attention. Warnings and failures get a tinted background; good values get colored text only. Otherwise the page turns into a sea of green and the problems stop standing out.

### Never color alone

- Every color cue has a second cue: a word, a symbol, a shape or a position. A red cell also says "Fail" or shows the number that failed; a verdict dot has an `aria-label` and a `title`.
- Legends name the meaning ("Disqualifying"), not the color ("Red").

### Contrast (WCAG 2.2 AA)

- Body text: at least **4.5:1** against its background.
- Large text (24px, or 18.66px bold): at least **3:1**.
- UI parts and meaningful graphics (verdict dots, chart lines, input borders, focus rings): at least **3:1** against what's next to them.
- Purely decorative lines, like gridlines and card edges, are exempt. That's what lets gridlines stay faint.
- Check every text/background pair in **both** themes, including text on tints (`--warn` on `--warn-bg`) and on header backgrounds (`--good` on `--head`). Run `node "${CLAUDE_PLUGIN_ROOT}/skills/color/contrast.js" <fg> <bg>`.

### Themes

- Define every color once, as a token in `tokens.css`, using `light-dark()`. Don't write hex values anywhere else in the page.
- Follow the OS setting by default, and let `data-theme="light"` or `data-theme="dark"` on `<html>` override it.
- Give `body` an explicit background, so the page never falls back to the browser's white.
- Dark mode isn't an inversion. Semantic hues get lighter and slightly desaturated, and tints get darker, so the tint stays behind the text.
- Print uses the light theme.
- Derive hover and pressed states with `color-mix(in oklab, var(--accent), black 15%)` instead of adding new tokens.

### Charts

- Label lines and series directly, at the end of the line or on the bar, in the series color. Use a boxed legend only when the direct labels would collide.
- Keep the gridlines faint (`--line`) and the data strong.
- The chart colors follow the same semantic meaning as the tables on the page.

## Snippets

`${CLAUDE_PLUGIN_ROOT}/skills/color/tokens.css` is the token block. Paste it first, before any other page CSS. `html-tables/table.css` expects these names. The lowest-contrast text pairs in it are light `--good` on `--head` at 4.62, and light `--good` on `--good-bg` at 4.66. Re-check with `contrast.js` if you change any value.

A legend that reuses the data's classes:

```html
<p class="legend">
  <span class="sw g">Wanted</span>
  <span class="sw w">Caveat</span>
  <span class="sw b">Disqualifying</span>
</p>
```

```css
.legend { font-size: 0.82rem; color: var(--muted); }
.sw { padding: 0 5px; border-radius: 4px; font-weight: 600; }
.sw.g { color: var(--good); }
.sw.w { color: var(--warn); background: var(--warn-bg); }
.sw.b { color: var(--bad); background: var(--bad-bg); }
```

A directly labeled SVG line:

```html
<polyline points="0,80 60,62 120,40 180,22" fill="none" stroke="var(--good)" stroke-width="2" />
<text x="186" y="26" fill="var(--good)" font-size="12">Median</text>
```
