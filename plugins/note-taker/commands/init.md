---
description: Initialize note-taking in a project
allowed-tools: Read, Write, Edit, Glob
---

Initialize note-taking for this project.

## Steps

1. **Check for CLAUDE.md**
   - Use Glob to check if `CLAUDE.md` exists in the project root
   - If it doesn't exist, create it with a basic structure

2. **Add note-taking reference**
   - Read the existing CLAUDE.md (if it exists)
   - Add or update the note-taking section with:
   ```markdown
   ## Note-Taking

   Use `/note-taker:capture` to capture significant insights (decisions, findings, blockers, action items) to `docs/`.
   ```
   - If the section already exists, leave it unchanged

3. **Create docs directory**
   - Check if `docs/` directory exists
   - If not, create it by writing a `.gitkeep` file to `docs/.gitkeep`

4. **Report completion**
   Output a summary:
   ```
   Note-taking initialized:
   - CLAUDE.md: [created/updated/already configured]
   - docs/: [created/already exists]
   ```

## Edge Cases

- If CLAUDE.md exists but has no note-taking section, append the section
- If CLAUDE.md exists and already has a note-taking section, report "already configured"
- If docs/ already exists, report "already exists"
