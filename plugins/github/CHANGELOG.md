# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.3] - 2026-01-24

### Fixed

- Use shell variables (`$OWNER`, `$REPO`, `$PR_NUMBER`) instead of placeholders
- Rename `$COMMENT_ID` to `$COMMENT_DATABASE_ID` to clarify it's the numeric databaseId
- Always link to commit SHA when replying to feedback

### Changed

- Switch to Context7 HTTP transport per official recommendation

## [1.1.2] - 2026-01-24

### Fixed

- Added missing GraphQL variable parameters (`-f owner`, `-f repo`, `-F number`) to example commands

## [1.1.1] - 2026-01-24

### Fixed

- Fixed invalid jq expression for getting owner/repo in fix-pr skill

## [1.1.0] - 2026-01-24

### Added

- General PR comments support in `/github:fix-pr` skill
  - Fetches issue comments in addition to review threads
  - Handles comments that can't be "resolved" like review threads
- Reaction workflow for visual feedback
  - 👀 when starting work on a comment
  - 👍 when agreeing with feedback
  - 👎 when disagreeing with feedback
  - Removes 👀 after replying/resolving
- API commands for adding/removing reactions
- Edge cases for bot comments and stale PR comments

### Fixed

- Clarified that GitHub issue comments don't support threading

## [1.0.0] - 2026-01-24

### Changed

- Stable release (no changes from beta.5)

## [1.0.0-beta.5] - 2026-01-24

### Fixed

- Applied symlink workaround for plugin skill visibility bug ([anthropics/claude-code#17271](https://github.com/anthropics/claude-code/issues/17271))
  - Skills now appear in slash command menu
  - Added `commands` array to plugin.json

## [1.0.0-beta.4] - 2026-01-24

### Fixed

- Renamed skill file to SKILL.md for auto-discovery

## [1.0.0-beta.3] - 2026-01-24

### Added

- `/github:fix-pr` skill for systematically addressing PR review feedback
  - Fetches unresolved review threads
  - Evaluates each comment and prompts for disagreements
  - Makes fixes, tests, commits, and pushes
  - Replies to reviewers and resolves threads

## [1.0.0-beta] - 2026-01-20

### Added

- Initial beta release
- Unified GitHub agent combining issues and PR reviews
- **Issue Management:**
  - Product manager agent that creates well-structured GitHub Issues
  - Smart duplicate detection using `gh issue list --search`
  - Task prioritization when asked "what's next?"
  - Consistent issue format with User Request, Context, Current Behavior, Expected Outcome sections
  - Support for feature requests, bug reports, and improvements
  - Issue linking with "Related to #X" references
  - Label management with `gh issue edit`
  - Comment support with `gh issue comment`
- **PR Review Management:**
  - View PR review comments and threads
  - Reply to specific review threads via GraphQL
  - Resolve review threads after addressing feedback
  - Leave reviews (approve, comment, request changes)
  - GraphQL operations for advanced thread management

### Changed

- Renamed from `github-issue-manager` to `github` for unified GitHub operations
- Expanded agent triggers to include PR review scenarios
