# Todo Update Plugin

A Claude Code plugin that provides a subagent for keeping TODO.md current with task status.

## Features

- **Lightweight** - Uses Haiku model for fast updates
- **Structured format** - Organizes tasks by status (In Progress, Pending, Completed)
- **Consistent formatting** - Maintains checkbox syntax and section organization

## Installation

```bash
claude plugin install todo-update@karbassi-claude-plugins
```

## Usage

The todo-update subagent maintains your TODO.md file with this format:

```markdown
# TODO

## In Progress
- [ ] Task currently being worked on

## Pending
- [ ] Task not yet started

## Completed
- [x] Finished task with brief result
```

## Plugin Structure

```
todo-update/
├── .claude-plugin/
│   └── plugin.json       # Plugin manifest
└── agents/
    └── todo-update.md    # Subagent definition
```

## License

MIT
