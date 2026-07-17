#!/bin/sh
# Copies public/ and .next/static into the standalone bundle, next to server.js.
#
# The standalone layout is NOT always flat. In a git worktree (.claude/worktrees/*)
# there is no local node_modules, so Next.js correctly roots the build at the main
# repo (where node_modules lives) and nests the app under
# .next/standalone/.claude/worktrees/<name>/. In the main repo the layout is flat.
# Pinning the root via turbopack.root/outputFileTracingRoot is NOT the fix: a worktree
# has no resolvable node_modules of its own, so pinning either breaks the build or
# produces a standalone that silently lacks its dependencies. The layout difference is
# legitimate — this script just locates server.js instead of assuming where it is.
set -eu

SERVER_JS=$(find .next/standalone -name server.js -not -path "*/node_modules/*" | head -1)
if [ -z "$SERVER_JS" ]; then
  echo "postbuild: server.js not found under .next/standalone — did the build produce standalone output?" >&2
  exit 1
fi
APP_DIR=$(dirname "$SERVER_JS")

rm -rf "$APP_DIR/.next/static" "$APP_DIR/public"
cp -r .next/static "$APP_DIR/.next/static"
cp -r public "$APP_DIR/public"
chmod -R a+rX "$APP_DIR/public"
echo "postbuild: static + public -> $APP_DIR"
