#!/bin/bash

# Assumes DATABASE_URL, DIRECT_URL, and VITE_API_URL are already set in environment

# Debug print to verify env vars (optional)
echo "DATABASE_URL = $DATABASE_URL"
echo "DIRECT_URL = $DIRECT_URL"
echo "API_URL = $VITE_API_URL"
echo "PORT = $VITE_API_PORT"

# Path to api executable (assuming api binary is in same folder)
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Start the api executable in background
"$DIR/api" > /dev/null 2>&1 &

# Wait until API responds with a 2xx or 3xx HTTP status
echo "Waiting for API at $API_URL ..."

until curl --output /dev/null --silent --head --fail "${API_URL}/health"; do
    sleep 0.5
done

echo "API is up!"
