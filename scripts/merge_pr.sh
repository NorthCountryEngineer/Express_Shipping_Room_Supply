#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <PR_NUMBER> [<remote>]"
  exit 1
fi

PR_NUM=$1
REMOTE=${2:-origin}
PR_BRANCH="pr-${PR_NUM}"

# 1) Make sure we're on your local main and bring it up-to-date
echo "➡️  Checking out your local main…"
git checkout main

echo "⬆️  Fetching & rebasing ${REMOTE}/main onto your main…"
git fetch ${REMOTE} main
git rebase ${REMOTE}/main

# 2) Fetch the PR into its own branch
echo "🔄 Fetching PR #${PR_NUM} into ${PR_BRANCH}…"
git fetch ${REMOTE} pull/${PR_NUM}/head:${PR_BRANCH}

# 3) Merge the PR branch into your updated main
echo "🔀 Merging ${PR_BRANCH} into main…"
git merge --no-ff "${PR_BRANCH}" -m "Merge PR #${PR_NUM}"

# 4) Clean up
echo "🧹 Deleting temporary branch ${PR_BRANCH}…"
git branch -d "${PR_BRANCH}"

echo
echo "✅ Merge complete! Latest commits:"
git log --oneline -5

echo
echo "👉 Now push to ${REMOTE}:"
echo "   git push ${REMOTE} main"