---
description: Initialize a new project with CLAUDE.md, TODO.md, CHANGELOG.md, README.md, and docs structure
---

# Kickstart Project Initialization

Help the user initialize a new project with a consistent structure. Keep it simple.

## Step 1: Gather Information

Ask the user:

1. **Project name** - What should this project be called?
2. **Project goal** - What is the main goal? (1-2 sentences)
3. **Tech stack** - What languages/frameworks? (if known)
4. **Initial tasks** - What are the first 3-5 things to do?

## Step 2: Create Files

Read the templates from the `templates/` folder in this plugin directory and create the following files, filling in the user's answers:

| Template | Creates | Notes |
|----------|---------|-------|
| `templates/CLAUDE.md` | `CLAUDE.md` | Fill in project name, goal, tech stack |
| `templates/TODO.md` | `TODO.md` | Fill in initial tasks |
| `templates/CHANGELOG.md` | `CHANGELOG.md` | Use as-is |
| `templates/README.md` | `README.md` | Fill in project name and description |
| `templates/docs-README.md` | `docs/README.md` | Use as-is |
| `templates/gitignore.txt` | `.gitignore` | Use as-is |

## Step 3: Git Setup

1. If not a git repo, run `git init`
2. Stage all files: `git add .`
3. Commit: `git commit -m "feat: initialize project structure"`
4. Push if remote is configured

## Notes

- If files already exist, ask before overwriting
- Keep everything minimal - user can expand later
