# Changelog Manager Plugin

A Claude Code plugin that provides a subagent for maintaining CHANGELOG.md following the [Keep a Changelog](https://keepachangelog.com/) format.

## Features

- **Keep a Changelog compliant** - Follows the industry-standard format
- **Strict filtering** - Only documents user-facing changes, skips internal/dev changes
- **Git workflow compliance** - Never commits directly to main, always uses branches and PRs
- **Full traceability** - Includes commit SHA, PR number, and issue references
- **Release management** - Supports version tagging with proper workflow (branch, PR, merge, tag)

## Installation

```bash
claude plugin install changelog-manager@karbassi-claude-plugins
```

## Permissions (Optional)

To auto-approve git and GitHub commands without prompts, add these to your project's `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git branch:*)",
      "Bash(git checkout:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git tag:*)",
      "Bash(gh pr:*)",
      "Bash(gh release:*)"
    ]
  }
}
```

## Usage

### Slash Command

```bash
/changelog              # Update with recent changes
/changelog release 1.2.0  # Create version release
```

### Automatic Invocation

The changelog manager subagent is also automatically invoked when:

1. **Before creating a PR** - Ensures all branch changes are documented
2. **After completing feature work** - Documents new features, bug fixes, or refactoring
3. **When explicitly requested** - User asks for changelog updates
4. **Before merging to main** - Verifies changelog is up to date
5. **For version releases** - Manages the release workflow and tagging

### Example Workflows

**After completing a feature:**
```
User: "I've finished the bulk reject feature"
Claude: Invokes changelog-manager to document the changes
```

**Creating a release:**
```
User: "Let's tag version 1.2.0"
Claude: Invokes changelog-manager to:
  1. Create release branch
  2. Move Unreleased entries to new version section
  3. Create PR
  4. (After merge) Tag the release
```

## What Gets Documented

The agent uses strict filtering to only document changes that matter to users:

**Included:**
- New user-facing features
- Bug fixes that affected users
- API endpoint changes
- Breaking changes
- Security fixes
- Noticeable performance improvements

**Excluded:**
- Documentation changes
- Internal tooling
- Refactoring without behavior change
- Test changes
- Dependency updates (unless user-facing)
- CI/CD changes

## Plugin Structure

```
changelog-manager/
├── .claude-plugin/
│   └── plugin.json           # Plugin manifest
├── agents/
│   └── changelog-manager.md  # Subagent definition
├── commands/
│   └── changelog.md          # /changelog slash command
├── CHANGELOG.md
└── README.md
```

## License

MIT
