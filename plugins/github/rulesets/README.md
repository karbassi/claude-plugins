# GitHub Rulesets

Reusable GitHub repository ruleset configurations.

## Available Rulesets

### Require PR for Main

Blocks direct commits to main branch - all changes must go through a pull request.

```bash
gh api repos/OWNER/REPO/rulesets --method POST --input rulesets/require-pr-for-main.json
```

### Copilot Auto Review (Default Branch)

Automatically requests a GitHub Copilot code review for PRs targeting the default branch.

```bash
gh api repos/OWNER/REPO/rulesets --method POST --input rulesets/copilot-auto-review-default-branch.json
```

### Copilot Auto Review (All Branches)

Automatically requests a GitHub Copilot code review for PRs targeting any branch.

```bash
gh api repos/OWNER/REPO/rulesets --method POST --input rulesets/copilot-auto-review-all-branches.json
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `review_on_push` | Trigger review when new commits are pushed to the PR |
| `review_draft_pull_requests` | Also review draft PRs (default: false) |

## Updating an Existing Ruleset

```bash
# List existing rulesets
gh api repos/OWNER/REPO/rulesets

# Update a ruleset by ID
gh api repos/OWNER/REPO/rulesets/RULESET_ID --method PUT --input rulesets/copilot-auto-review-default-branch.json
```

## Prerequisites

- GitHub Copilot Business or Enterprise plan
- Repository admin access
