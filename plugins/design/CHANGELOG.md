# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-09-28

### Added

- `/design:html-tables`: table rules with reference `table.css`, a tri-state `sort.js`, and an optional `csv.js` export
  - Sticky headers in a scroll wrapper, frozen first column, right-aligned tabular numbers, footnote slots
  - Units and denominators moved into headers, accounting currency, zero distinct from missing
  - Semantic cell color with a legend and verdict dots, faint gridlines, truncation with tooltips
  - Sorting for tables with more than 10 rows, empty and error states, CSV export for big tables
- `/design:motion`: motion never gates content, transform and opacity under 300ms, faster exits, 50ms stagger, reduced motion via near-zero durations, Svelte transition guidance, `motion.css` snippet
- `/design:color`: semantic color and legends, never color alone, WCAG 2.2 AA contrast in both themes, `light-dark()` tokens (`tokens.css`), direct chart labels, and a `contrast.js` checker
- `/design:review`: read-only audit of an HTML or Svelte file against all of the above, reporting `file:line` findings by severity
