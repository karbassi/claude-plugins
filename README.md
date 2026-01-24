# Claude Plugins

A collection of Claude Code plugins by Ali Karbassi.

## Installation

First, add the marketplace:

```bash
claude plugin marketplace add karbassi/claude-plugins
```

Then install plugins with your preferred scope:

```bash
claude plugin install github@karbassi-claude-plugins --scope <scope>
```

### Installation Scopes

| Scope | Flag | Description |
|-------|------|-------------|
| **user** | `--scope user` | Installed globally for your user account. Available in all projects. This is the default if no scope is specified. |
| **project** | `--scope project` | Installed for the current project. Configuration stored in project settings and can be shared via version control. |
| **local** | `--scope local` | Installed for the current working directory only. Most restrictive scope. |

### Examples

```bash
# Install globally (available everywhere)
claude plugin install github@karbassi-claude-plugins --scope user

# Install for this project (recommended for team projects)
claude plugin install github@karbassi-claude-plugins --scope project

# Install for this directory only
claude plugin install github@karbassi-claude-plugins --scope local
```

### Which scope should I use?

- **`user`** - Personal plugins you want everywhere (default)
- **`project`** - Team projects where plugins should be shared via version control
- **`local`** - Testing plugins or directory-specific workflows

## Available Plugins

| Plugin | Description |
|--------|-------------|
| [note-taker](./plugins/note-taker/) | Background note-taker that captures decisions, action items, blockers, and key findings |
| [git-agent](./plugins/git-agent/) | Subagent that handles git operations (commit, stage, etc.) |
| [docs-update](./plugins/docs-update/) | Subagent that updates project documentation files |
| [todo-update](./plugins/todo-update/) | Subagent that keeps TODO.md current with task status |
| [browser-research](./plugins/browser-research/) | Subagent for browser automation and web research |
| [github](./plugins/github/) | Unified GitHub agent for issues, PRs, and code reviews |
| [youtube-transcript](./plugins/youtube-transcript/) | Fetch and present transcripts from YouTube videos |

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
│   ├── github/             # GitHub issues & PR reviews
│   └── youtube-transcript/ # YouTube video transcripts
└── README.md
```

## License

MIT
