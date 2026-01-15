#!/bin/bash
# Restricts Read/Write/Edit/Glob operations to configured output directory
# Pure bash - no external dependencies

# Read input from stdin
INPUT=$(cat)

# Configurable output directory (default: docs)
OUTPUT_DIR="${NOTE_TAKER_DIR:-docs}"

# Extract tool_name to determine validation strategy
TOOL_NAME=""
if [[ "$INPUT" =~ \"tool_name\"[[:space:]]*:[[:space:]]*\"([^\"]+)\" ]]; then
    TOOL_NAME="${BASH_REMATCH[1]}"
fi

# Get project dir for path comparison
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"

# Function to validate a path is within the output directory
validate_path() {
    local FILE_PATH="$1"

    # Empty path is invalid
    if [[ -z "$FILE_PATH" ]]; then
        echo '{"continue": false, "reason": "No file path provided."}'
        return 1
    fi

    # Security: Reject any path containing parent directory traversal
    if [[ "$FILE_PATH" == *".."* ]]; then
        echo "{\"continue\": false, \"reason\": \"Path traversal (..) not allowed.\"}"
        return 1
    fi

    # Handle absolute paths
    if [[ "$FILE_PATH" == /* ]]; then
        if [[ "$FILE_PATH" == "$PROJECT_DIR/$OUTPUT_DIR/"* ]] || [[ "$FILE_PATH" == "$PROJECT_DIR/$OUTPUT_DIR" ]]; then
            # Security: Check for symlinks in absolute path
            if [[ -L "$FILE_PATH" ]]; then
                echo '{"continue": false, "reason": "Symbolic links not allowed."}'
                return 1
            fi
            echo '{"continue": true}'
            return 0
        else
            echo "{\"continue\": false, \"reason\": \"Paths must be under $OUTPUT_DIR/.\"}"
            return 1
        fi
    fi

    # Handle relative paths - normalize by removing leading ./
    local NORMALIZED_PATH="${FILE_PATH#./}"

    if [[ "$NORMALIZED_PATH" == "$OUTPUT_DIR/"* ]] || [[ "$NORMALIZED_PATH" == "$OUTPUT_DIR" ]]; then
        # Security: Check for symlinks in relative path
        local FULL_PATH="$PROJECT_DIR/$NORMALIZED_PATH"
        if [[ -L "$FULL_PATH" ]]; then
            echo '{"continue": false, "reason": "Symbolic links not allowed."}'
            return 1
        fi
        echo '{"continue": true}'
        return 0
    else
        echo "{\"continue\": false, \"reason\": \"Note-taker can only access $OUTPUT_DIR/ directory.\"}"
        return 1
    fi
}

# Handle Glob tool specially - has different parameters
if [[ "$TOOL_NAME" == "Glob" ]]; then
    # Extract pattern (required for Glob)
    GLOB_PATTERN=""
    if [[ "$INPUT" =~ \"pattern\"[[:space:]]*:[[:space:]]*\"([^\"]+)\" ]]; then
        GLOB_PATTERN="${BASH_REMATCH[1]}"
    fi

    # Check pattern for path traversal
    if [[ "$GLOB_PATTERN" == *".."* ]]; then
        echo '{"continue": false, "reason": "Path traversal (..) not allowed in glob pattern."}'
        exit 0
    fi

    # Extract path (optional base directory for Glob)
    GLOB_PATH=""
    if [[ "$INPUT" =~ \"path\"[[:space:]]*:[[:space:]]*\"([^\"]+)\" ]]; then
        GLOB_PATH="${BASH_REMATCH[1]}"
    fi

    # If path is specified, validate it
    if [[ -n "$GLOB_PATH" ]]; then
        validate_path "$GLOB_PATH"
        exit 0
    fi

    # If no path specified, pattern must start with output directory
    NORMALIZED_PATTERN="${GLOB_PATTERN#./}"
    if [[ "$NORMALIZED_PATTERN" == "$OUTPUT_DIR/"* ]] || [[ "$NORMALIZED_PATTERN" == "$OUTPUT_DIR" ]]; then
        echo '{"continue": true}'
    else
        echo "{\"continue\": false, \"reason\": \"Glob pattern must start with $OUTPUT_DIR/ or specify path within $OUTPUT_DIR/.\"}"
    fi
    exit 0
fi

# For Read/Write/Edit tools - extract file_path
FILE_PATH=""
if [[ "$INPUT" =~ \"file_path\"[[:space:]]*:[[:space:]]*\"([^\"]+)\" ]]; then
    FILE_PATH="${BASH_REMATCH[1]}"
elif [[ "$INPUT" =~ \"filePath\"[[:space:]]*:[[:space:]]*\"([^\"]+)\" ]]; then
    FILE_PATH="${BASH_REMATCH[1]}"
fi

# Validate the path
validate_path "$FILE_PATH"
