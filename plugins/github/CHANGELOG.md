# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
