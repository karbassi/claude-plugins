#!/bin/bash
# Restricts Write/Edit operations to docs/ directory only

# Read input from stdin
INPUT=$(cat)

# Extract file_path from tool_input
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // ""')

# Check if path starts with docs/ or ./docs/ or contains /docs/
if [[ "$FILE_PATH" == docs/* ]] || [[ "$FILE_PATH" == ./docs/* ]] || [[ "$FILE_PATH" == */docs/* ]]; then
    echo '{"continue": true}'
else
    echo "{\"continue\": false, \"reason\": \"Note-taker can only write to docs/ directory. Attempted path: $FILE_PATH\"}"
fi
