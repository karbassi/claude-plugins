# Claude Plugins

A collection of Claude Code plugins by Ali Karbassi.

## Installation

### Global Installation

Install plugins globally so they're available in all projects:

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
claude plugin install github@karbassi/claude-plugins
```

### Project-Local Installation

To add plugins only to a specific project (not globally), use the `--local` flag:

```bash
# Add marketplace to project
claude plugin marketplace add karbassi/claude-plugins --local

# Install plugins locally
claude plugin install note-taker@karbassi/claude-plugins --local
claude plugin install github@karbassi/claude-plugins --local
```

This creates plugin configuration in your project's `.claude/` directory, making the plugins available only when working in that project.

**When to use local installation:**
- Project-specific workflows that don't apply elsewhere
- Testing plugins before installing globally
- Sharing plugin configuration with your team via version control

## Available Plugins

| Plugin | Description |
|--------|-------------|
| [note-taker](./plugins/note-taker/) | Background note-taker that captures decisions, action items, blockers, and key findings |
| [git-agent](./plugins/git-agent/) | Subagent that handles git operations (commit, stage, etc.) |
| [docs-update](./plugins/docs-update/) | Subagent that updates project documentation files |
| [todo-update](./plugins/todo-update/) | Subagent that keeps TODO.md current with task status |
| [browser-research](./plugins/browser-research/) | Subagent for browser automation and web research |
| [github](./plugins/github/) | Unified GitHub agent for issues, PRs, and code reviews |

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
│   ├── browser-research/   # Browser automation
│   └── github/             # GitHub issues & PR reviews
└── README.md
```

## License

MIT
