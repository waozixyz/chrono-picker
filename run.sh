#!/bin/bash

# Define the paths
LIBRARY_PATH="./library"
QWIK_PACKAGE_PATH="$LIBRARY_PATH/packages/qwik"
QWIK_TEST_APP_PATH="./test-apps/qwik"

# Function to run a command in a specific directory
run_in_dir() {
    local dir=$1
    local command=$2
    (cd "$dir" && npm run "$command") &
}

# Run the processes
run_in_dir "$LIBRARY_PATH" "start"
run_in_dir "$QWIK_PACKAGE_PATH" "build:watch"
run_in_dir "$QWIK_TEST_APP_PATH" "dev"

# Wait for user input to terminate
echo "Press Enter to terminate all processes"
read

# Kill all background processes
kill $(jobs -p)
