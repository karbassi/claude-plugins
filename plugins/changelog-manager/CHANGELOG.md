# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.1] - 2026-10-07

### Changed

- Skills ship a real `SKILL.md` again and `plugin.json` no longer registers them as legacy `commands`, now that [anthropics/claude-code#17271](https://github.com/anthropics/claude-code/issues/17271) is fixed

## [1.1.0] - 2026-01-25

### Changed

- Rename skill from `/changelog-manager:changelog` to `/changelog-manager:update` for clarity

## [1.0.0] - 2026-01-24

### Added

- Initial release
- Add `/changelog-manager:update` skill for updating CHANGELOG.md
- Add Keep a Changelog format compliance
- Add auto-categorization of changes (Added, Changed, Deprecated, Removed, Fixed, Security)
- Add commit SHA and PR/issue reference support
- Add release workflow documentation
