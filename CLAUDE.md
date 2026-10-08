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
│       └── SKILL.md
├── CHANGELOG.md
└── README.md
```

## Agents vs Skills

- **Agents**: Auto-invoked by Claude based on task context. User doesn't call them directly.
- **Skills**: User-invoked via `/<plugin>:<skill>`. Add `user-invocable: true` in frontmatter.

## References

When developing plugins, consult:
- **Context7**: Use `context7` MCP to fetch latest Claude Code documentation
- **Official docs**: https://docs.anthropic.com/en/docs/claude-code
- **Official plugin repo**: https://github.com/anthropics/claude-code-plugins

## Local Development

Test plugins locally by symlinking to Claude's plugin directory:
```bash
ln -s <path-to-repo>/plugins/<name> ~/.claude/plugins/<name>
```

## Release Process

When making changes to a plugin:
1. Bump the version in `plugin.json` (patch for fixes, minor for features)
2. Update `CHANGELOG.md` with the changes
3. Commit version bump separately: `chore(<plugin>): bump version to X.Y.Z`

## Plugin Skills in the Slash Menu

[anthropics/claude-code#17271](https://github.com/anthropics/claude-code/issues/17271) hid plugin skills from the `/` menu until Claude Code 2.1.216. It is fixed, so give each skill a real `SKILL.md` and list it only under `skills` in plugin.json. Don't add symlinks or legacy `commands` entries for skills.
