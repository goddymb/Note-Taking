#!/bin/sh
# Make sure the data folder (often created by Docker as root) is writable, then run the app as the unprivileged "node" user.
set -e
mkdir -p "${DATA_DIR:-/data}/docs" "${DATA_DIR:-/data}/files"
if [ "$(id -u)" = "0" ]; then
  chown -R node:node "${DATA_DIR:-/data}" 2>/dev/null || true
  exec su-exec node "$@"
fi
exec "$@"
