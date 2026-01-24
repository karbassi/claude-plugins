# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-beta.5] - 2026-01-24

### Fixed

- Added `commands` array to plugin.json for skill visibility workaround ([anthropics/claude-code#17271](https://github.com/anthropics/claude-code/issues/17271))

## [1.0.0-beta.4] - 2026-01-22

### Added

- Symlink workaround for plugin skill visibility bug
- `/note-taker:init` and `/note-taker:status` commands

## [1.0.0-beta.2] - 2026-01-20

### Changed

- Restructured repository for multi-plugin support
- Moved note-taker plugin to `plugins/note-taker/`
- Renamed marketplace from `karbassi-note-taker` to `karbassi-claude-plugins`
- Renamed plugin from `claude-note-taker-plugin` to `note-taker`
- Updated marketplace.json to follow official Anthropic schema pattern
- Reordered frontmatter fields for consistency (permissionMode before color)

## [1.0.0-beta] - 2026-01-15

### Added

- Initial beta release
- Background note-taker agent that captures insights every 3 conversation exchanges
- Four categorized output files:
  - `docs/decisions.md` - Key decisions and rationale
  - `docs/action-items.md` - Tasks and follow-ups
  - `docs/blockers.md` - Problems and unresolved questions
  - `docs/findings.md` - Important discoveries and insights
- `UserPromptSubmit` hook to trigger note-taking automatically
- `PreToolUse` hook to restrict all file operations to output directory only
- Configurable output directory via `NOTE_TAKER_DIR` environment variable (default: `docs`)
- Path traversal protection (blocks `..` in file paths and glob patterns)
- Symbolic link protection (blocks writes to symlinks)
- Security model: agent limited to Read, Write, Edit, Glob tools (no Bash)
- All tools (Read, Write, Edit, Glob) sandboxed to output directory
- Pure bash implementation with no external dependencies
