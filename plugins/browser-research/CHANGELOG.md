# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-beta.2] - 2026-01-20

### Added

- Initial beta release
- Browser automation subagent using chrome-devtools MCP
- Strict window management: always creates dedicated pages, always cleans up
- Research-focused workflow: snapshots, interactions, content extraction
- Read-only by default: uses `disallowedTools` to block Edit, Write, Bash, Task
- Inherits MCP tools from parent session for chrome-devtools access
