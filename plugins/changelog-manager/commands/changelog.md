---
name: changelog
description: Update CHANGELOG.md with recent changes or create a version release
---

# Changelog Command

Update the project's CHANGELOG.md with recent changes or manage version releases.

## Usage

```
/changelog              # Update with recent changes
/changelog release 1.2.0  # Create version release
```

## Process

### For Updates (default)

1. Analyze commits on current branch since diverging from main
2. Filter for user-facing changes only (skip docs, tests, internal tooling)
3. Categorize changes (Added, Changed, Fixed, Removed)
4. Add entries to the `[Unreleased]` section with commit SHA, PR, and issue references
5. Commit the changelog update

### For Releases

1. Validate version format (semver: X.Y.Z)
2. Create release branch (`release/vX.Y.Z`)
3. Move `[Unreleased]` entries to new version section with date
4. Create PR for the release
5. After merge, tag the release

## Filtering Rules

Only document changes that matter to users:

**Include:**
- New user-facing features
- Bug fixes affecting users
- API changes
- Breaking changes
- Security fixes

**Exclude:**
- Documentation changes
- Internal tooling
- Refactoring without behavior change
- Test changes
- CI/CD changes

## Output Format

Each changelog entry includes:
- Description starting with past-tense verb
- Commit SHA (7 characters)
- PR number (if applicable)
- Issue number (if applicable)

Example: `- Fixed pagination bug causing duplicates (a1b2c3d) [#45] [Fixes #42]`
