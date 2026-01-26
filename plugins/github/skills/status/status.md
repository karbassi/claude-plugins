---
description: Show local git and GitHub repository status
allowed-tools: Bash
user-invocable: true
---

Display a combined status of the local git repository and GitHub remote, including branch info, working tree status, open PRs, and open issues.

## Process

Run these commands and present the results in a clear, organized format:

### 1. Local Git Status

```bash
git status
git log --oneline -5
```

Report:
- Current branch and tracking status
- Working tree status (clean/dirty, staged/unstaged changes)
- Last 5 commits

### 2. GitHub Repository Status

```bash
gh repo view --json name,owner,url,defaultBranchRef --jq '{name, owner: .owner.login, url, defaultBranch: .defaultBranchRef.name}'
gh pr list --limit 10
gh issue list --limit 10
```

Report:
- Repository name and owner
- Open pull requests (number, title, branch, status)
- Open issues (number, title)

### 3. Branch Cleanup Check (Optional)

```bash
git branch --merged main | grep -v '^\*' | grep -v 'main'
```

If there are merged branches that can be cleaned up, mention them.

## Output Format

Present the information in a concise summary:

**Local Git:**
- Branch: `branch-name` (up to date / ahead / behind)
- Working tree: clean / X files modified

**GitHub (owner/repo):**
- X open PRs
- X open issues

List the PRs and issues with their numbers and titles.
