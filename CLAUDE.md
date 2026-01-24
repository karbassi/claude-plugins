# Claude Plugins

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
