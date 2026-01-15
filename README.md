# Claude Plugins

A collection of Claude Code plugins by Ali Karbassi.

## Installation

```bash
claude plugin marketplace add karbassi/claude-plugins
```

Then install individual plugins:

```bash
claude plugin install note-taker@karbassi/claude-plugins
```

## Available Plugins

| Plugin | Description |
|--------|-------------|
| [note-taker](./plugins/note-taker/) | Background note-taker that captures decisions, action items, blockers, and key findings |

## Structure

```
claude-plugins/
├── .claude-plugin/
│   └── marketplace.json    # Plugin registry
├── plugins/
│   └── note-taker/         # Individual plugins
│       ├── .claude-plugin/
│       │   └── plugin.json
│       ├── agents/
│       ├── hooks/
│       └── README.md
└── README.md
```

## License

MIT
