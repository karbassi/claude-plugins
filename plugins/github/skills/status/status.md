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

The background agent should compile results in this format:

**Local Git:**
- Branch: `branch-name` (up to date / ahead / behind)
- Working tree: clean / X files modified

**GitHub (owner/repo):**
- X open PRs
- X open issues

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
