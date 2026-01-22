---
description: View summary of captured notes
allowed-tools: Read, Glob, Bash
---

Show a summary of all captured notes in the `docs/` directory.

## Steps

1. **List note files**
   - Use Glob to find `docs/*.md` files
   - Focus on: `decisions.md`, `action-items.md`, `blockers.md`, `findings.md`

2. **Get file stats**
   - Use Bash with `ls -la docs/` to get last modified times
   - Count entries in each file by counting `## [` headers

3. **Read and count entries**
   For each note file found:
   - Read the file
   - Count the number of date-headed sections (`## [YYYY-MM-DD]`)
   - For action-items.md, also count:
     - Open items: `- [ ]`
     - Completed items: `- [x]`

4. **Report summary**
   Output in this format:
   ```
   Notes Summary
   =============

   decisions.md
     Entries: N
     Last updated: YYYY-MM-DD

   action-items.md
     Entries: N
     Open: N | Completed: N
     Last updated: YYYY-MM-DD

   blockers.md
     Entries: N
     Last updated: YYYY-MM-DD

   findings.md
     Entries: N
     Last updated: YYYY-MM-DD
   ```

## Edge Cases

- If docs/ doesn't exist, report "No notes directory found. Run /note-taker:init first."
- If docs/ exists but is empty, report "No notes captured yet."
- Only show files that exist, skip missing ones
- If a file exists but has no entries, show "Entries: 0"
