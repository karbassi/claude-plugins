# Claude Plugins

## Plugin Structure

Each plugin lives in `plugins/<name>/` with:
```
plugins/<name>/
├── .claude-plugin/
│   └── plugin.json      # Required: name, version, description
├── agents/              # Subagents (auto-invoked by Claude)
│   └── <agent>.md
├── skills/              # User-invocable commands (/<plugin>:<skill>)
│   └── <skill>/
│       └── SKILL.md     # Or <skill>.md with symlink (see workaround below)
├── CHANGELOG.md
└── README.md
```

## Agents vs Skills

- **Agents**: Auto-invoked by Claude based on task context. User doesn't call them directly.
- **Skills**: User-invoked via `/<plugin>:<skill>`. Add `user-invocable: true` in frontmatter (currently ignored due to known issue below, but include for future compatibility).

## References

When developing plugins, consult:
- **Context7**: Use `context7` MCP to fetch latest Claude Code documentation
- **Official docs**: https://docs.anthropic.com/en/docs/claude-code
- **Official plugin repo**: https://github.com/anthropics/claude-code-plugins

## Local Development

Test plugins locally by symlinking to Claude's plugin directory:
```bash
ln -s ~/Projects/personal/claude-plugins/plugins/<name> ~/.claude/plugins/<name>
```

## Release Process

When making changes to a plugin:
1. Bump the version in `plugin.json` (patch for fixes, minor for features)
2. Update `CHANGELOG.md` with the changes
3. Commit version bump separately: `chore(<plugin>): bump version to X.Y.Z`

## Known Issues & Workarounds

### Plugin Skills Not Showing in Slash Menu (2026-01-24)

**Issue:** [anthropics/claude-code#17271](https://github.com/anthropics/claude-code/issues/17271)

Plugin skills don't appear in the `/` slash command menu due to a bug where `isHidden` is hardcoded to `true` for plugin skills, ignoring the `user-invocable` frontmatter.

**Workaround applied:** Symlink method
- Renamed `SKILL.md` to `<skillname>.md`
- Created symlink: `SKILL.md -> <skillname>.md`
- Added skill to both `skills` and `commands` arrays in plugin.json

**Affected plugins:**
- `github` - `/github:fix-pr` skill

**Check back:** 2026-01-31 to see if this bug has been fixed. If fixed, revert the symlink workaround:
1. Remove the symlink
2. Rename `<skillname>.md` back to `SKILL.md`
3. Remove `commands` array from plugin.json (keep only `skills`)
