# Claude Plugins

A collection of Claude Code plugins by Ali Karbassi.

## Installation

```bash
claude plugin marketplace add karbassi/claude-plugins
```

Then install individual plugins:

```bash
claude plugin install note-taker@karbassi/claude-plugins
claude plugin install git-agent@karbassi/claude-plugins
claude plugin install docs-update@karbassi/claude-plugins
claude plugin install todo-update@karbassi/claude-plugins
claude plugin install browser-research@karbassi/claude-plugins
```

## Available Plugins

| Plugin | Description |
|--------|-------------|
| [note-taker](./plugins/note-taker/) | Background note-taker that captures decisions, action items, blockers, and key findings |
| [git-agent](./plugins/git-agent/) | Subagent that handles git operations (commit, stage, etc.) |
| [docs-update](./plugins/docs-update/) | Subagent that updates project documentation files |
| [todo-update](./plugins/todo-update/) | Subagent that keeps TODO.md current with task status |
| [browser-research](./plugins/browser-research/) | Subagent for browser automation and web research |

## Structure

```
claude-plugins/
├── .claude-plugin/
│   └── marketplace.json    # Plugin registry
├── plugins/
│   ├── note-taker/         # Background note-taking
│   ├── git-agent/          # Git operations
│   ├── docs-update/        # Documentation updates
│   ├── todo-update/        # Task tracking
│   └── browser-research/   # Browser automation
└── README.md
```

## License

MIT
