# plan-progress

Live plan progress bars above the Claude Code prompt: stages, steps, a pixel fill and soft sounds for decision, error and done.

This is a fork of [zycck/claude-mods](https://github.com/zycck/claude-mods) `plugins/plan-progress` at commit `aa1c260` (MIT, © Kirill Serditov, see `LICENSE`). It is not maintained against upstream. Fixes and features upstream will not show up here.

## What differs from upstream

- The update check is removed: no request to `api.github.com`, no timers, no "Check for updates" switch.
- The Update button is a no-op: nothing runs `claude plugin marketplace update`, `claude plugin update` or `reload-plugins`.
- The version row in the settings window only shows the version.
- The upstream `tests/` folder and translated READMEs are not included.

Everything else is unchanged, including the local-only calls (theme and locale probes through `defaults`, `gsettings`, `reg` and an omarchy theme file) and the hooks that add a rule to the system prompt, refuse the fourth edit of a turn once until a bar exists, and send a turn back once when bars are left open.

## Install

```bash
claude plugin marketplace add karbassi/claude-plugins
claude plugin install plan-progress@karbassi-claude-plugins
```

Requires Claude Code 2.1.295 or newer.

Commands, tool ops and settings are documented in `skills/plan-progress/SKILL.md`.
