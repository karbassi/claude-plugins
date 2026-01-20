# Docs Update Plugin

A Claude Code plugin that provides a subagent for updating project documentation.

## Features

- **Documentation-focused** - Keeps README and docs/ up to date
- **Concise style** - Produces scannable, well-formatted content
- **Auto-commits** - Commits changes after updating docs

## Installation

```bash
claude plugin install docs-update@karbassi/claude-plugins
```

## Usage

The docs-update subagent updates documentation for your project:

- `README.md` - Project overview and design spec
- `docs/` - Additional documentation and examples

It follows these rules:

- Keeps content concise and scannable
- Uses code blocks for examples
- Updates README.md when design changes
- Commits with short descriptive messages

## Plugin Structure

```
docs-update/
├── .claude-plugin/
│   └── plugin.json       # Plugin manifest
└── agents/
    └── docs-update.md    # Subagent definition
```

## License

MIT
