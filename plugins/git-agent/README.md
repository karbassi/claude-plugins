# Git Agent Plugin

A Claude Code plugin that provides a subagent for handling git operations (commit, stage, etc.).

## Features

- **Lightweight** - Uses Haiku model for fast, efficient commits
- **Background execution** - Runs git commands without interrupting your work
- **Safe defaults** - Never uses --force or destructive commands

## Installation

```bash
claude plugin install git-agent@karbassi/claude-plugins
```

## Usage

The git subagent can be invoked to handle git operations for your project. It follows these rules:

- Commits after each logical step
- Uses short, descriptive commit messages (imperative mood)
- Runs git commands in background
- Never amends commits unless explicitly asked

## Plugin Structure

```
git-agent/
├── .claude-plugin/
│   └── plugin.json    # Plugin manifest
└── agents/
    └── git.md         # Subagent definition
```

## License

MIT
