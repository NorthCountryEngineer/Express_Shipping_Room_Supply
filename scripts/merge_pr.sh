#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <PR_NUMBER> [<remote>]"
  exit 1
fi

PR_NUM=$1
REMOTE=${2:-origin}
PR_BRANCH="pr-${PR_NUM}"

echo "🔄 Fetching latest ${REMOTE}/main…"
git fetch "${REMOTE}" main
git checkout main
git reset --hard "${REMOTE}/main"

echo "🔄 Fetching PR #${PR_NUM} into branch ${PR_BRANCH}…"
git fetch "${REMOTE}" pull/"${PR_NUM}"/head:"${PR_BRANCH}"

echo "🔀 Checking out ${PR_BRANCH}…"
git checkout "${PR_BRANCH}"

echo "🔄 Rebasing ${PR_BRANCH} onto main…"
git rebase main

echo "⬅️  Switching back to main…"
git checkout main

echo "🔀 Merging ${PR_BRANCH} into main…"
git merge --no-ff "${PR_BRANCH}" -m "Merge PR #${PR_NUM}"

echo "🧹 Deleting temporary branch…"
git branch -d "${PR_BRANCH}"

echo
echo "✅ Local merge complete. Here’s your history:"
git log --oneline -5

echo
echo "Next, push the new merge commit to ${REMOTE}:"
echo "  git push ${REMOTE} main"
