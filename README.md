# Claude Note-Taker Plugin

A Claude Code plugin that runs a background note-taker to capture decisions, action items, blockers, and key findings from your conversations.

## Features

- **Background execution** - Runs automatically every 3 conversation exchanges
- **Smart categorization** - Organizes notes into separate files by type
- **Sandboxed file access** - All file operations restricted to output directory
- **Configurable output** - Change output directory via `NOTE_TAKER_DIR` environment variable
- **Executive assistant style** - Captures insights, not raw logs

## Installation

```bash
claude plugin install github:karbassi/claude-note-taker-plugin
```

## What It Captures

The note-taker creates/updates four files in your project's output directory (default: `docs/`):

| File | Content |
|------|---------|
| `decisions.md` | Key decisions and rationale |
| `action-items.md` | Tasks, TODOs, follow-ups |
| `blockers.md` | Problems, unresolved questions |
| `findings.md` | Important discoveries and insights |

## How It Works

1. A `UserPromptSubmit` hook tracks conversation exchanges
2. Every 3 exchanges, it prompts Claude to run the note-taker subagent
3. The subagent runs in the background (doesn't interrupt your work)
4. Notes are appended to the appropriate files in the output directory

## Configuration

### Output Directory

By default, notes are written to `docs/`. To change this, set the `NOTE_TAKER_DIR` environment variable:

```bash
# Use 'notes' directory instead of 'docs'
export NOTE_TAKER_DIR=notes

# Or set it in your shell profile (~/.bashrc, ~/.zshrc, etc.)
```

### Other Settings

- **Model:** Sonnet (latest)
- **Permission mode:** `acceptEdits` (auto-approved file operations)
- **Sandbox:** `PreToolUse` hook restricts all file operations (Read, Write, Edit, Glob) to output directory only

## Plugin Structure

```
claude-note-taker-plugin/
├── .claude-plugin/
│   └── plugin.json         # Plugin manifest
├── agents/
│   └── note-taker.md       # Subagent definition
├── hooks/
│   ├── hooks.json          # Hook configuration
│   ├── trigger-notes.sh    # Triggers every 3 exchanges
│   └── restrict-to-docs.sh # Restricts writes to docs/
├── CHANGELOG.md            # Version history
└── LICENSE                 # MIT license
```

## Requirements

- Claude Code CLI

## License

MIT
