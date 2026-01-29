---
description: Create isolated git worktrees for feature work with smart directory selection and safety verification
allowed-tools: Bash, AskUserQuestion
user-invocable: true
---

# Git Worktrees

## Overview

Git worktrees create isolated workspaces sharing the same repository, allowing work on multiple branches simultaneously without switching.

**Core principle:** Systematic directory selection + safety verification = reliable isolation.

**Announce at start:** "I'm setting up an isolated git worktree workspace."

## Directory Selection Process

Follow this priority order:

### 1. Check Existing Directories

```bash
# Check in priority order
ls -d .worktrees 2>/dev/null     # Preferred (hidden)
ls -d worktrees 2>/dev/null      # Alternative
```

**If found:** Use that directory. If both exist, `.worktrees` wins.

### 2. Check CLAUDE.md

Look for a worktree directory preference in CLAUDE.md:

```bash
# Expected format in CLAUDE.md: "worktree directory: <path>"
# Example: "worktree directory: .my-worktrees"
grep -i "worktree.*directory" CLAUDE.md 2>/dev/null | sed 's/.*directory[: ]*//i'
```

**If preference specified:** Extract the directory path and use it without asking.

### 3. Create Directory

If no directory exists and no CLAUDE.md preference, create `.worktrees/` (preferred, hidden):

```bash
mkdir -p .worktrees
```

## Safety Verification

**MUST verify selected directory is ignored before creating worktree:**

```bash
# Set WORKTREE_DIR to the directory selected from the steps above
WORKTREE_DIR=".worktrees"  # example; replace with your chosen directory

# Verify it's ignored (use trailing slash to explicitly check as directory)
git check-ignore -q "$WORKTREE_DIR/" 2>/dev/null
```

**If NOT ignored:**

1. Add the selected directory to .gitignore: `echo "$WORKTREE_DIR/" >> .gitignore`
2. Commit the change
3. Proceed with worktree creation

**Why critical:** Prevents accidentally committing worktree contents to repository.

## Creation Steps

### 1. Create Worktree

The path name (directory inside worktree folder) and branch name can differ:
- **Path name**: Short, descriptive folder name (e.g., `auth`, `fix-login`)
- **Branch name**: Full branch name following project conventions (e.g., `feature/auth`, `fix/login-bug`)

```bash
# $WORKTREE_DIR is the selected directory (e.g., .worktrees)
# $PATH_NAME is the folder name (e.g., auth)
# $BRANCH_NAME is the git branch (e.g., feature/auth)

# Check if branch already exists
if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
  # Branch exists - create worktree for existing branch (no -b flag)
  git worktree add "$WORKTREE_DIR/$PATH_NAME" "$BRANCH_NAME"
else
  # Branch doesn't exist - create new branch with worktree
  git worktree add "$WORKTREE_DIR/$PATH_NAME" -b "$BRANCH_NAME"
fi

cd "$WORKTREE_DIR/$PATH_NAME"
```

### 2. Install Dependencies

**MUST install dependencies.** Worktrees share the git repo, but dependency directories installed inside the worktree (e.g., `node_modules/`, Python `venv/`) are local to that worktree. Always run the package manager **from within the worktree directory** to ensure isolated dependencies.

### 3. Report

```
Worktree ready at $WORKTREE_DIR/$PATH_NAME (branch: $BRANCH_NAME)
```

## Quick Reference

| Situation | Action |
|-----------|--------|
| `.worktrees/` exists | Use it (verify ignored) |
| `worktrees/` exists | Use it (verify ignored) |
| Both exist | Use `.worktrees/` |
| Neither exists | Check CLAUDE.md → Create `.worktrees/` |
| Directory not ignored | Add to .gitignore + commit |

## Common Mistakes

### Skipping ignore verification

- **Problem:** Worktree contents get tracked, pollute git status
- **Fix:** Always use `git check-ignore` before creating worktree

### Assuming directory location

- **Problem:** Creates inconsistency, violates project conventions
- **Fix:** Follow priority: existing > CLAUDE.md > create `.worktrees/`

## Example Workflow

```
You: I'm setting up an isolated git worktree workspace.

[Check .worktrees/ - exists]
[Verify ignored - git check-ignore confirms .worktrees/ is ignored]
[Create worktree: git worktree add .worktrees/auth -b feature/auth]
[Enter worktree: cd .worktrees/auth]
[Detect package.json - run npm install]

Worktree ready at .worktrees/auth (branch: feature/auth)
```

## Red Flags

**Never:**
- Create worktree without verifying it's ignored
- Assume directory location when ambiguous
- Skip CLAUDE.md check

**Always:**
- Follow directory priority: existing > CLAUDE.md > create `.worktrees/`
- Verify directory is ignored
