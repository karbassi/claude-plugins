---
description: Show local git and GitHub repository status
allowed-tools: Bash, Task
user-invocable: true
---

Display a combined status of the local git repository and GitHub remote, including branch info, working tree status, open PRs, and open issues.

## Process

Use the Task tool with `run_in_background: true` to spawn a background agent that collects all the status information. This allows the user to continue working while the status is gathered.

The background agent should run these commands and compile the results:

### 1. Local Git Status

```bash
# Basic status
git status

# Last 5 commits
git log --oneline -5

# Stashed changes
git stash list

# Ahead/behind count
git rev-list --left-right --count HEAD...@{upstream} 2>/dev/null
```

Report:
- Current branch and tracking status
- Working tree status (clean/dirty, staged/unstaged changes)
- Stashed changes count (if any)
- Commits ahead/behind remote
- Last 5 commits

### 2. GitHub Repository Status

```bash
# Repo info
gh repo view --json name,owner,url,defaultBranchRef --jq '{name, owner: .owner.login, url, defaultBranch: .defaultBranchRef.name}'

# Current branch's PR (if exists)
gh pr view --json number,title,state,reviewDecision,statusCheckRollup --jq '{number, title, state, reviewDecision, checks: [.statusCheckRollup[]? | {name: .name, status: .status, conclusion: .conclusion}]}'

# Open PRs (authored by current user)
gh pr list --author @me --limit 10

# All open PRs
gh pr list --limit 10

# Assigned issues
gh issue list --assignee @me --limit 10

# All open issues
gh issue list --limit 10
```

Report:
- Repository name and owner
- Current branch's PR status (if exists):
  - Review decision (approved, changes requested, review required)
  - CI/CD check status (passing, failing, pending)
- Your open PRs (number, title, branch)
- All open PRs (number, title, branch)
- Your assigned issues (number, title)
- All open issues (number, title)

### 3. Branch Cleanup Check (Optional)

```bash
git branch --merged main | grep -v '^\*' | grep -v 'main'
```

If there are merged branches that can be cleaned up, mention them.

## Output Format

The background agent should compile results in this format:

**Local Git:**
- Branch: `branch-name`
- Tracking: up to date / X commits ahead / X commits behind / X ahead, Y behind
- Working tree: clean / X files modified (list them)
- Stashes: X stashed changes (if any)

**Current Branch PR:** (if exists)
- PR #X: title
- Review: approved / changes requested / review required / no reviews
- Checks: passing / failing (list failures) / pending

**GitHub (owner/repo):**
- Your open PRs: X
- All open PRs: X
- Your assigned issues: X
- All open issues: X

List the PRs and issues with their numbers and titles.

## Background Execution

1. Launch the Task agent with `run_in_background: true` and `subagent_type: "Bash"`
2. Tell the user the status check is running in the background
3. When the agent completes, present the compiled results to the user

Example Task invocation:
```
Task tool with:
  - subagent_type: "Bash"
  - run_in_background: true
  - allowed_tools: ["Bash(git *)", "Bash(gh *)"]
  - description: "Gather git/GitHub status"
  - prompt: <the commands and output format above>
```

Note: The `allowed_tools` parameter grants the background agent permission to run git and gh commands without prompting.
