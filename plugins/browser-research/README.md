# Browser Research Plugin

A Claude Code plugin that provides a subagent for browser automation and web research using chrome-devtools MCP.

## Features

- **Browser automation** - Uses chrome-devtools MCP for page interaction
- **Window management** - Creates dedicated browser windows, cleans up when done
- **Research-focused** - Captures and summarizes web content

## Installation

```bash
claude plugin install browser-research@karbassi-claude-plugins
```

## Requirements

This plugin requires the [chrome-devtools MCP server](https://github.com/anthropics/anthropic-quickstarts/tree/main/mcp-servers/chrome-devtools) to be configured.

## Usage

The browser-research subagent follows a strict workflow:

1. Creates a new browser page with the target URL
2. Takes snapshots to understand page state
3. Interacts with page as needed
4. Captures relevant information
5. Closes the page when done

It never navigates existing pages or leaves pages open when finished.

## Plugin Structure

```
browser-research/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
└── agents/
    └── browser-research.md  # Subagent definition
```

## License

MIT
