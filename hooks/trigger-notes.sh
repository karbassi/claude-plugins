#!/bin/bash
# Triggers note-taker subagent every 3 conversation exchanges

COUNTER_FILE="${CLAUDE_PROJECT_DIR:-.}/.claude/.note-counter"

# Ensure .claude directory exists
mkdir -p "$(dirname "$COUNTER_FILE")"

# Initialize counter if it doesn't exist
if [ ! -f "$COUNTER_FILE" ]; then
    echo "0" > "$COUNTER_FILE"
fi

# Read and increment counter
COUNT=$(cat "$COUNTER_FILE")
COUNT=$((COUNT + 1))
echo "$COUNT" > "$COUNTER_FILE"

# Trigger note-taker every 3 exchanges
if [ "$COUNT" -ge 3 ]; then
    echo "0" > "$COUNTER_FILE"
    echo '{"systemMessage": "Run the note-taker subagent in the background to capture any new decisions, action items, blockers, or technical findings from this conversation."}'
else
    echo '{"continue": true}'
fi
