# Design Plugin

Design rules for the hand-written HTML pages I publish: throwaway reports, lessons, and a SvelteKit app. The rules live here, versioned, instead of being copied into each site's `CLAUDE.md`.

Everything is plain instructions plus small copy-paste CSS and JS snippets. There are no hooks, no scripts that run on load, and no network calls.

## Skills

| Skill | Use it when |
|-------|-------------|
| `/design:html-tables` | Writing or editing a data table: sticky headers, aligned numbers, accounting currency, semantic color, sorting, CSV export |
| `/design:motion` | Adding any animation or transition to a static page or a Svelte component |
| `/design:color` | Choosing colors, legends, or light and dark themes, or checking contrast |
| `/design:review <file>` | Auditing an HTML or Svelte file against all of the above. Reports `file:line` findings and never edits |

Claude also loads any of the four on its own when a task matches its description, so asking it to "check this page's tables" runs `review` without the slash command.

### Snippets

Each skill folder holds its snippets next to the instructions:

- `skills/color/tokens.css`: light and dark color tokens built on `light-dark()`, which the table CSS expects
- `skills/color/contrast.js`: a WCAG contrast-ratio function to run with `node`
- `skills/html-tables/table.css`: the table styles
- `skills/html-tables/sort.js`: tri-state column sorting (~40 lines)
- `skills/html-tables/csv.js`: optional "Download CSV" button
- `skills/motion/motion.css`: duration and easing tokens, the reduced-motion rule, and the button press

## Installation

```bash
claude plugin install design@karbassi-claude-plugins
```

## Credits

The rules are written in my own words. Some ideas were shaped by reading these MIT-licensed projects; no files or text were copied from them:

- [kylezantos/design-motion-principles](https://github.com/kylezantos/design-motion-principles): ideas for the motion rules
- [klimofey/design-motion](https://github.com/klimofey/design-motion): ideas for the motion rules
- [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): ideas for the table and color rules

## License

MIT
