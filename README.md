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

## opencode

These plugins can also be used with [opencode](https://opencode.ai). Since the agent and skill markdown files are compatible, you can copy them into opencode's configuration directories with minor frontmatter adjustments.

### Agents

Copy agent files from `plugins/<name>/agents/*.md` into `.opencode/agents/` (per-project) or `~/.config/opencode/agents/` (global).

The frontmatter needs to be adapted to opencode's format. For example, a Claude Code agent with:

```yaml
---
name: git
tools: ["Bash", "Read", "Glob", "Grep"]
model: haiku
---
```

Should be updated to:

```yaml
---
description: Handles git operations like commits, staging, and status checks
mode: subagent
model: anthropic/claude-haiku-4-5
tools:
  bash: true
  write: false
  edit: false
---
```

Key frontmatter mappings:

| Claude Code | opencode | Notes |
|-------------|----------|-------|
| `name` | _(filename)_ | opencode derives the agent name from the filename |
| `description` | `description` | Keep the first line; opencode doesn't use examples in the description |
| `tools` | `tools` | Change from array to boolean map; disable tools not in the list |
| `model` | `model` | Use full model IDs (e.g., `anthropic/claude-sonnet-4-5`) |
| `permissionMode: acceptEdits` | `permission.edit: allow` | Map permission modes accordingly |

### Skills → Commands

Claude Code skills map to opencode commands. Copy skill files from `plugins/<name>/skills/<skill>/<skill>.md` into `.opencode/commands/` (per-project) or `~/.config/opencode/commands/` (global).

Update the frontmatter from:

```yaml
---
description: Update CHANGELOG.md
user-invocable: true
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---
```

To:

```yaml
---
description: Update CHANGELOG.md
---
```

### Quick Setup

To copy all agents and skills into a project:

```bash
# Clone the repo
git clone https://github.com/karbassi/claude-plugins.git /tmp/claude-plugins

# Create opencode directories
mkdir -p .opencode/agents .opencode/commands

# Copy agents (frontmatter will need manual adjustment)
for dir in /tmp/claude-plugins/plugins/*/agents; do
  cp "$dir"/*.md .opencode/agents/ 2>/dev/null
done

# Copy skills as commands (frontmatter will need manual adjustment)
for skill in /tmp/claude-plugins/plugins/*/skills/*/; do
  name=$(basename "$skill")
  # Skip SKILL.md symlinks, copy the named file
  cp "$skill/$name.md" ".opencode/commands/$name.md" 2>/dev/null
done
```

After copying, update the frontmatter in each file to match opencode's format as described above.

## Available Plugins

| Plugin | Description |
|--------|-------------|
| [changelog-manager](./plugins/changelog-manager/) | Maintain CHANGELOG.md following Keep a Changelog format |
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
│   ├── changelog-manager/  # Changelog maintenance
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
