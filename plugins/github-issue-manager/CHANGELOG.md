# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-beta] - 2026-01-20

### Added

- Initial beta release
- Product manager agent that creates well-structured GitHub Issues
- Smart duplicate detection using `gh issue list --search`
- Task prioritization when asked "what's next?"
- Consistent issue format with User Request, Context, Current Behavior, Expected Outcome sections
- Support for feature requests, bug reports, and improvements
- Issue linking with "Related to #X" references
- Label management with `gh issue edit`
- Comment support with `gh issue comment`
