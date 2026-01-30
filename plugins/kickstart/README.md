# Kickstart Plugin

Initialize new projects with a consistent, well-organized structure.

## Usage

```
/kickstart
```

## What It Creates

Running `/kickstart` will ask you a few questions and then create:

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project goals and development patterns |
| `TODO.md` | Task tracking with markdown checklists |
| `CHANGELOG.md` | Version history following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) |
| `README.md` | Project readme |
| `docs/README.md` | Research folder with guidelines |
| `.gitignore` | Common ignores for dependencies, builds, IDE files |

## Plugin Structure

```
kickstart/
├── commands/
│   └── kickstart.md      # Command logic
└── templates/            # Editable templates
    ├── CLAUDE.md
    ├── TODO.md
    ├── CHANGELOG.md
    ├── README.md
    ├── docs-README.md
    └── gitignore.txt
```

Templates are separate files - customize them to fit your workflow.

## Patterns Included

The generated `CLAUDE.md` sets up these patterns:

- **Conventional Commits** - Structured commit messages
- **SemVer** - Semantic versioning
- **Keep a Changelog** - Standardized changelog format
- **CommonMark** - Markdown formatting standard
- **MVP Focus** - Don't overcomplicate things

## Installation

Add this plugin to your Claude Code configuration:

```bash
claude plugins:add kickstart
```

## Example

```
> /kickstart

What should this project be called?
> TickTick CLI

What is the main goal? (1-2 sentences)
> A terminal tool that interacts with TickTick's API to help organize todo lists based on calendar availability.

What tech stack? (if known)
> Python, Click

What are the first 3-5 tasks?
> 1. Research TickTick API
> 2. Set up Python project structure
> 3. Implement authentication

[Creates CLAUDE.md, TODO.md, CHANGELOG.md, README.md, docs/README.md, .gitignore]
[Commits and pushes]
```
