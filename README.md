# Claude Note-Taker Plugin

A Claude Code plugin that runs a background note-taker to capture decisions, action items, blockers, and technical findings from your conversations.

## Features

- **Background execution** - Runs automatically every 3 conversation exchanges
- **Smart categorization** - Organizes notes into separate files by type
- **Restricted writes** - Can only write to `docs/` directory
- **Executive assistant style** - Captures insights, not raw logs

## Installation

```bash
claude plugin add github:karbassi/claude-note-taker-plugin
```

## What It Captures

The note-taker creates/updates four files in your project's `docs/` directory:

| File | Content |
|------|---------|
| `docs/decisions.md` | Key decisions and rationale |
| `docs/action-items.md` | Tasks, TODOs, follow-ups |
| `docs/blockers.md` | Problems, unresolved questions |
| `docs/findings.md` | Technical discoveries |

## How It Works

1. A `UserPromptSubmit` hook tracks conversation exchanges
2. Every 3 exchanges, it prompts Claude to run the note-taker subagent
3. The subagent runs in the background (doesn't interrupt your work)
4. Notes are appended to the appropriate files in `docs/`

## Configuration

The note-taker uses:

- **Model:** Sonnet (latest)
- **Permission mode:** `acceptEdits` (auto-approved file writes)
- **Write restriction:** `PreToolUse` hook limits writes to `docs/` only

## Plugin Structure

```
claude-note-taker-plugin/
├── .claude-plugin/
│   └── plugin.json         # Plugin manifest
├── agents/
│   └── note-taker.md       # Subagent definition
└── hooks/
    ├── hooks.json          # Hook configuration
    ├── trigger-notes.sh    # Triggers every 3 exchanges
    └── restrict-to-docs.sh # Restricts writes to docs/
```

## Requirements

- Claude Code CLI
- `jq` (for the restriction hook to parse JSON)

## License

MIT
