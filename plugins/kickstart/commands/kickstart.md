---
description: Initialize a new project with CLAUDE.md, TODO.md, CHANGELOG.md, and docs structure
---

# Kickstart Project Initialization

You are helping the user initialize a new project with a consistent, well-organized structure. Your goal is to set up the foundation for a successful project without overcomplicating things.

## Step 1: Gather Project Information

Ask the user the following questions (you may ask them all at once or conversationally):

1. **Project Name**: What should this project be called?
2. **Project Goal**: What is the main goal of this project? (Keep it to 1-2 sentences)
3. **Tech Stack**: What languages/frameworks will be used? (if known)
4. **Initial Tasks**: What are the first 3-5 things that need to be done?

## Step 2: Create Project Files

Once you have the information, create these files:

### CLAUDE.md

Create a minimal CLAUDE.md with:

```markdown
# [Project Name]

## Goal
[1-2 sentence project goal]

## Patterns
- Commit often using Conventional Commits
- Follow SemVer for versioning
- Keep a CHANGELOG.md following https://keepachangelog.com/en/1.1.0/
- Track tasks in TODO.md using markdown checklists
- Store research in /docs folder with citations
- Use CommonMark for all markdown
- Focus on MVP - don't overcomplicate or overengineer
- Push to remote regularly

## Tech Stack
[List technologies if provided]
```

### TODO.md

Create a TODO.md with the user's initial tasks:

```markdown
# TODO

## Current Sprint

- [ ] [Task 1]
- [ ] [Task 2]
- [ ] [Task 3]

## Backlog

- [ ] (Add future tasks here)
```

### CHANGELOG.md

Create an initial CHANGELOG.md:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup
```

### docs/ folder

Create the docs folder with a README:

```markdown
# Research & Documentation

This folder contains research findings and documentation for the project.

## Guidelines
- Each topic gets its own markdown file
- Start each file with a TLDR section
- Cite all sources using markdown footnotes
- Use CommonMark formatting
```

## Step 3: Commit and Push

After creating the files:

1. Stage all new files: `git add CLAUDE.md TODO.md CHANGELOG.md docs/`
2. Create initial commit: `git commit -m "feat: initialize project structure"`
3. Push to remote (if configured)

## Important Notes

- Keep everything minimal and focused on MVP
- Don't add unnecessary complexity
- The user can always expand these files later
- If this is an existing project, ask before overwriting any files
