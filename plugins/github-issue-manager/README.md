# GitHub Issue Manager Plugin

A Claude Code plugin that acts as a product manager, translating user requests into well-structured GitHub Issues.

## Features

- **Smart issue detection** - Recognizes feature requests, bug reports, and improvements in conversation
- **Duplicate prevention** - Searches existing issues before creating new ones
- **Task prioritization** - Finds the next most relevant issue when asked "what's next?"
- **PM-style documentation** - Focuses on outcomes, not implementations
- **Issue linking** - Connects related issues and PRs automatically

## Installation

```bash
claude plugin install github-issue-manager@karbassi-claude-plugins
```

## Prerequisites

- [GitHub CLI](https://cli.github.com/) (`gh`) must be installed and authenticated
- Repository must be a git repo with a GitHub remote

## When It Triggers

The agent activates when you:

| Trigger | Examples |
|---------|----------|
| **Request a feature** | "Can you add...", "I need...", "It would be nice if..." |
| **Report a bug** | "There's a bug where...", "When I click X, nothing happens" |
| **Ask for next task** | "What's next?", "What should I work on?" |
| **Describe improvements** | "The list should show...", "Can you make X persist?" |

## Usage

### Creating Issues

Simply describe what you need in natural language:

```
User: "The candidate list should show the application date"
Agent: Creates/updates a GitHub issue for this feature request
```

### Finding Next Task

Ask the agent what to work on:

```
User: "What's the next task?"
Agent: Reviews open issues, prioritizes by age and relevance, recommends the best one
```

### Bug Reports

Describe unexpected behavior:

```
User: "When I click the reject button, nothing happens"
Agent: Documents the bug in a well-structured issue
```

## Issue Format

Created issues follow a consistent structure:

```markdown
## User Request
[Original request verbatim]

## Context
[Why this matters, where it fits in the workflow]

## Current Behavior
[What happens now - for bugs/changes only]

## Expected Outcome
[What the user needs to be able to do]

## Additional Notes
[Constraints, dependencies, considerations]
```

## Key Principles

- **Outcomes over implementations** - Describes what, not how
- **Oldest first** - Prioritizes addressing existing issues before creating new ones
- **Keep it focused** - Prefers multiple small issues over one large issue
- **Link related work** - Connects issues using GitHub references

## GitHub CLI Commands Used

| Command | Purpose |
|---------|---------|
| `gh issue list` | Search and list issues |
| `gh issue create` | Create new issues |
| `gh issue view` | View issue details |
| `gh issue edit` | Update issue labels |
| `gh issue comment` | Add comments to issues |

## Plugin Structure

```
github-issue-manager/
├── .claude-plugin/
│   └── plugin.json           # Plugin manifest
├── agents/
│   └── github-issue-manager.md  # Agent definition
├── CHANGELOG.md
└── README.md
```

## License

MIT
