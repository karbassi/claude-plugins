---
name: review
description: Audit an HTML page or Svelte component against the design plugin's table, motion and color rules, and report the findings as file:line. Read-only; it never edits. Use when asked to review, audit or check a page's design, tables, motion or colors.
argument-hint: <file or glob> [more files]
allowed-tools: Read, Grep, Glob, Bash(node:*)
user-invocable: true
---

# Design review

Audit the files in `$ARGUMENTS` against the rules in the sibling skills, and report what breaks them. **Never edit, write or reformat any file.** This skill only reports. If the user wants fixes, they'll ask separately.

## Process

1. **Resolve the targets.** Expand globs with Glob. If `$ARGUMENTS` is empty, ask with AskUserQuestion which file to review. Review only `.html`, `.svelte` and `.css` files. For a Svelte component, also read the global stylesheet it relies on, if one is obvious (`app.css`, `+layout.svelte`).
2. **Load the rules.** Read `../html-tables/html-tables.md`, `../motion/motion.md` and `../color/color.md`, relative to this skill's folder. Those files are the checklist. Don't audit from memory.
3. **Read each target in full**, with line numbers, and check it against the sections below.
4. **Check contrast by computing it.** Resolve each foreground/background token pair actually used for text, in both themes, and run `node ../color/contrast.js <fg> <bg>` from this skill's folder. Report the measured ratio. Never estimate it.
5. **Report**, in the format below.

## Checklist

Skip any section that doesn't apply (there's no table, no animation). Say that you skipped it.

**Tables** (for each `<table>` of data):

- A scroll wrapper with `overflow: auto` and a `max-height`; the radius on the wrapper, not the table; no `overflow: hidden` on the table
- `thead th` sticky, with a solid background
- Wide tables freeze the first column; the page never scrolls sideways
- Numbers right-aligned, with `tabular-nums` on both `th` and `td`; footnote marks in a fixed slot
- Values repeated in every row (units, denominators, currency codes) moved into the header
- Currency in accounting layout, with 2 decimals and separators
- Zero distinct from missing; truncated cells have a `title`
- Semantic color with a legend; tints only on problem cells; good values as text only; verdict dots labeled
- More than 10 rows means sortable: keyboard-operable headers, `aria-sort`, `data-v`, empties last, tri-state, stable ties
- Empty and error states present where the data can be empty; CSV export on big tables

**Motion:**

- Any content (not action-triggered UI) that starts at `opacity: 0` or `visibility: hidden` and depends on an animation, observer or timer to appear. **This is always high severity.**
- Animated properties other than `transform` and `opacity` (layout properties especially)
- Durations of 300ms or more; linear easing on non-loops; exits not faster than entrances
- Motion on frequent actions (sort, tabs, filters); `scale(0)` starts; more than 3 `will-change`s, or `will-change` in a blanket rule
- `prefers-reduced-motion` missing, or handled with `animation: none` instead of near-zero durations; Svelte transitions that ignore `prefersReducedMotion`

**Color:**

- Any text pair under 4.5:1 (3:1 for large text), or any UI part or meaningful graphic under 3:1, in either theme
- Hex or rgb values outside the token block; no dark theme; no explicit `body` background
- Color as the only cue; legends that name colors instead of meanings; one color meaning two things
- Chart legends in a box when direct labels would fit

## Report format

Group the findings by severity, most severe first. Give one line per finding, and anchor each one to the most specific line:

```
## High
- path/to/page.html:118: Table "Every model" has 21 rows but is not sortable (tables: >10 rows are sortable). Add class="sortable" and sort.js.

## Medium
- path/to/page.html:42: --warn on --warn-bg is 3.9:1 in dark mode, below 4.5:1 (color: contrast). Lighten --warn in the dark branch.

## Low
- path/to/page.html:130: "$" repeated in every Cost cell (tables: accounting format). Use .acct.
```

- **High:** content can go missing or can't be used: gated visibility, contrast failures on body text, an unsortable large table, color as the only cue.
- **Medium:** the rule is clearly broken but the page still works.
- **Low:** polish.

End with a one-line tally ("3 high, 5 medium, 2 low across 1 file") and the sections you skipped. If nothing breaks a rule, say so plainly. Don't pad the report.
