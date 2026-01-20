# GitHub Plugin

A Claude Code plugin that acts as a unified GitHub agent for managing issues, pull requests, and code reviews.

## Features

### Issues
- **Smart issue detection** - Recognizes feature requests, bug reports, and improvements in conversation
- **Duplicate prevention** - Searches existing issues before creating new ones
- **Task prioritization** - Finds the next most relevant issue when asked "what's next?"
- **PM-style documentation** - Focuses on outcomes, not implementations
- **Issue linking** - Connects related issues and PRs automatically

### PR Reviews
- **View review feedback** - Fetch and summarize PR review comments
- **Reply to threads** - Respond to specific review comments
- **Resolve threads** - Mark review threads as resolved after addressing feedback
- **Review management** - Leave approvals, comments, or request changes

## Installation

```bash
claude plugin install github@karbassi-claude-plugins
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
| **Check PR feedback** | "What comments are on PR #42?", "Check my PR" |
| **Respond to reviews** | "Reply to that comment", "Resolve the thread" |
| **Address feedback** | "Fix that and resolve the comment" |

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

### Viewing PR Reviews

Check feedback on your pull requests:

```
User: "What comments are on PR #42?"
Agent: Fetches all review threads and summarizes the feedback
```

### Responding to Review Feedback

Address and resolve review comments:

```
User: "Reply to that comment saying I fixed it"
Agent: Adds a reply to the review thread

User: "Resolve that thread"
Agent: Marks the review thread as resolved
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
- **Be responsive** - Efficiently manages PR review feedback

## GitHub CLI Commands Used

### Issues

| Command | Purpose |
|---------|---------|
| `gh issue list` | Search and list issues |
| `gh issue create` | Create new issues |
| `gh issue view` | View issue details |
| `gh issue edit` | Update issue labels |
| `gh issue comment` | Add comments to issues |

### Pull Requests

| Command | Purpose |
|---------|---------|
| `gh pr view` | View PR details |
| `gh pr view --comments` | View PR with comments |
| `gh pr view --json` | Get PR data as JSON |
| `gh pr comment` | Add PR comment |
| `gh pr review` | Leave a review (approve/comment/request-changes) |
| `gh api graphql` | GraphQL for review thread operations |

### GraphQL Operations

For advanced review thread management, the agent uses GraphQL:

- **Fetch review threads** - Get all threads with their resolved status
- **Reply to threads** - Add responses to specific review comments
- **Resolve threads** - Mark threads as resolved after addressing feedback

## Plugin Structure

```
github/
├── .claude-plugin/
│   └── plugin.json           # Plugin manifest
├── agents/
│   └── github.md             # Agent definition
├── CHANGELOG.md
└── README.md
```

## License

MIT
