---
name: "capture"
description: "Review the current conversation to extract decisions, action items, blockers, and findings, then write them to structured markdown files in the docs/ directory. Use when capturing meeting notes, recording architectural decisions, tracking action items, or documenting key findings from a conversation."
allowed-tools: Read, Write, Edit, Glob
disable-model-invocation: true
---

# Note Capture

Review the current conversation and capture key insights to the `docs/` directory, organized into four categories.

## Workflow

### Step 1: Review Conversation

Scan the recent conversation and identify content for each category below.

### Step 2: Check Existing Files

Use Glob to find existing note files in `docs/`. Read any existing files to avoid duplicates.

### Step 3: Write Notes

For each category with content, create the file (with a `# Category` header) if it doesn't exist, or append new entries. Use today's date. Never overwrite existing content.

### Step 4: Report Completion

```
Notes captured:
- decisions.md: [N] new entries
- action-items.md: [N] new items
- blockers.md: [N] new entries
- findings.md: [N] new entries
```

## Output Categories

### Decisions & Rationale → `docs/decisions.md`

```markdown
## [YYYY-MM-DD] Brief title

**Decision:** What was decided
**Rationale:** Why this choice
**Alternatives considered:**
- Option A (rejected: reason)
```

### Action Items → `docs/action-items.md`

```markdown
## [YYYY-MM-DD]

- [ ] Task description
```

### Blockers & Issues → `docs/blockers.md`

```markdown
## [YYYY-MM-DD] Brief title

**Issue:** The problem
**Status:** Current state
**Waiting on:** What's needed to resolve
```

### Findings → `docs/findings.md`

```markdown
## [YYYY-MM-DD] Brief title

**Finding:** What was discovered
**Details:** Context and evidence
**Implications:** What this means going forward
```

## Guidelines

- Be concise — capture the essence, not verbatim logs
- Skip categories with no new content
- Focus on what's actionable and important
- If unsure whether something is notable, include it
- Group related items under a single date header
- If no notable content found, report "No new insights to capture"
- If `docs/` doesn't exist, create it first
