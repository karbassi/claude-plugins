# Docs Update Plugin

A Claude Code plugin that provides a subagent for updating project documentation.

## Features

- **Documentation-focused** - Keeps README and docs/ up to date
- **Concise style** - Produces scannable, well-formatted content
- **Web research** - Can fetch external docs for reference

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
- Matches existing documentation style

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
