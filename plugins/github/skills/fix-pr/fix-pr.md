---
description: Address PR review feedback by fixing issues and resolving comment threads
allowed-tools: Bash, Read, Grep, Glob, Edit, Write, AskUserQuestion
---

Address PR code review feedback systematically. Fetch unresolved review threads, evaluate each comment, make fixes, and resolve threads.

## Process

For each unresolved review thread:

1. **Evaluate the comment**
   - Understand what's being suggested
   - Determine if the feedback is valid
   - If valid: proceed to step 2
   - If you disagree: Use AskUserQuestion to present options:
     - Accept the feedback anyway
     - Push back with reasoning (explain why in the reply)
     - Skip this comment for now

2. **Make the change**
   - Implement the requested fix
   - Follow the codebase's existing patterns

3. **Test the change**
   - Run relevant tests or verify the fix works
   - Ensure no regressions

4. **Commit**
   - Create a commit with a descriptive message
   - Reference the PR in the commit if appropriate

5. **Push to branch**
   - Push the changes to the PR branch

6. **Reply to the reviewer**
   - Reply to the comment thread explaining what was changed

7. **Resolve the thread**
   ```bash
   gh api graphql -f query='
   mutation($threadId: ID!) {
     resolveReviewThread(input: { threadId: $threadId }) {
       thread { isResolved }
     }
   }' -f threadId='THREAD_ID'
   ```

8. **Move to next comment**

## Getting Started

### Determine the PR number

If not provided, get it from the current branch:
```bash
gh pr view --json number -q '.number'
```

### Fetch unresolved review threads

```bash
gh api graphql -f query='
query($owner: String!, $repo: String!, $number: Int!) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $number) {
      reviewThreads(first: 100) {
        nodes {
          id
          isResolved
          isOutdated
          path
          line
          comments(first: 10) {
            nodes {
              body
              author { login }
              createdAt
            }
          }
        }
      }
    }
  }
}'
```

Get owner/repo from:
```bash
gh repo view --json owner,name -q '"\(.owner.login)" "\(.name)"'
```

### Reply to a thread

```bash
gh api graphql -f query='
mutation($threadId: ID!, $body: String!) {
  addPullRequestReviewThreadReply(input: {
    pullRequestReviewThreadId: $threadId,
    body: $body
  }) {
    comment { id }
  }
}' -f threadId='PRRT_...' -f body='Fixed in latest commit'
```

## Guidelines

- Process comments one at a time for clarity
- Read the relevant file before making changes
- Keep commits focused on individual feedback items
- Be respectful when disagreeing with feedback
- Skip already-resolved or outdated threads
- Report progress: "Fixed 3/5 review comments, 2 skipped"

## Edge Cases

- **No unresolved threads**: Report "No unresolved review comments"
- **Outdated threads**: Skip with note "Thread is outdated (code has changed)"
- **Cannot fix**: Ask user how to proceed
- **Test failures**: Stop and report the issue before continuing
