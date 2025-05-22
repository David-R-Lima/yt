#!/bin/bash

#set database url and direct url when running script: DIRECT_URL and DATABASE_URL

# Load .env variables
set -o allexport
source .env
set +o allexport

#yt-dlp is required for this to work

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
"$DIR/nest-yt"
