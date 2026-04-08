---
name: "update"
description: "Gather recent git commits, categorize user-facing changes, and update CHANGELOG.md following Keep a Changelog format with commit SHA references. Use when preparing a release, before creating a PR, or after completing a feature or bug fix."
user-invocable: true
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Changelog Update

Update the project's CHANGELOG.md with recent changes following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

## Workflow

### Step 1: Gather Recent Changes

```bash
git log --oneline $(git describe --tags --abbrev=0 2>/dev/null || echo HEAD~10)..HEAD
```

### Step 2: Analyze and Categorize

For each commit, determine if it's user-facing (skip internal refactors, CI, formatting). Categorize into: Added, Changed, Deprecated, Removed, Fixed, Security.

### Step 3: Read Existing CHANGELOG.md

Check for an existing `[Unreleased]` section and match the current format and style.

### Step 4: Update the Changelog

Add entries under `[Unreleased]` using present tense, imperative mood. Include commit SHA references and PR/issue links where available.

```markdown
## [Unreleased]

### Added
- New feature description (abc1234)

### Changed
- Updated behavior description (#123)

### Fixed
- Bug fix description (def5678, fixes #456)
```

Use short commit SHAs (7 chars). GitHub auto-links `#123` to issues/PRs.

### Step 5: Verify

Ensure proper formatting and no duplicate entries.

## Categories (Keep a Changelog)

| Category | Use For |
|----------|---------|
| **Added** | New features |
| **Changed** | Changes in existing functionality |
| **Deprecated** | Soon-to-be removed features |
| **Removed** | Removed features |
| **Fixed** | Bug fixes |
| **Security** | Vulnerability fixes |

## Inclusion Criteria

**Include:** New user-facing features, breaking changes, bug fixes affecting users, security patches, deprecation notices.

**Exclude:** Internal refactoring, CI/CD changes, documentation-only updates (unless significant), non-security dependency bumps, code style/formatting.

## Release Workflow

When releasing a version, update the version header, add a new `[Unreleased]` section above, and update comparison links:

```markdown
[Unreleased]: https://github.com/user/repo/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/user/repo/compare/v1.1.0...v1.2.0
```

## Guidelines

- One changelog entry per logical change (not per commit)
- Be concise but descriptive
- Match formatting with existing entries
- Include migration notes for breaking changes
