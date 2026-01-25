# Changelog Manager

Maintain your project's CHANGELOG.md following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

## Installation

```bash
claude plugin install changelog-manager@karbassi-claude-plugins
```

## Usage

### Slash Command

```
/changelog-manager:changelog
```

Run this command to analyze recent commits and update your CHANGELOG.md.

### Auto-Trigger

The agent automatically activates when:
- You're about to create a PR
- You've completed feature work
- You mention updating the changelog
- You're preparing a release

## Features

- **Keep a Changelog compliant** - Follows the industry-standard format
- **Smart filtering** - Only documents user-facing changes
- **Git workflow aware** - Never commits directly to main
- **Full traceability** - Includes commit SHA, PR, and issue references

## Categories

Changes are categorized as:

| Category | Description |
|----------|-------------|
| **Added** | New features |
| **Changed** | Changes in existing functionality |
| **Deprecated** | Soon-to-be removed features |
| **Removed** | Removed features |
| **Fixed** | Bug fixes |
| **Security** | Vulnerability fixes |

## What Gets Documented

**Included:**
- New features users can use
- Breaking changes
- Bug fixes affecting users
- Security patches
- Deprecation notices

**Excluded:**
- Internal refactoring
- CI/CD changes
- Documentation-only updates
- Dependency bumps (unless security)
- Code style changes

## Entry Format

```markdown
### Added
- New feature description (`abc1234`)
- Another feature (#123)

### Fixed
- Bug fix description (`def5678`, fixes #456)
```

## Release Workflow

When releasing a version, the skill will:

1. Change `[Unreleased]` to `[X.Y.Z] - YYYY-MM-DD`
2. Add a fresh `[Unreleased]` section
3. Update comparison links if present

## License

MIT
