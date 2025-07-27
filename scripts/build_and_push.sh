#!/usr/bin/env bash
set -euo pipefail

# ─── CONFIG ────────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="${SCRIPT_DIR}/.."
SERVICE_DIR="${PROJECT_ROOT}/Services/Order_Management/order-management"
IMAGE="ncacademy/express_shipping"
TAG="latest"
# ────────────────────────────────────────────────────────────────────────────────

echo "🔹 Building Docker image from ${SERVICE_DIR} …"
docker build \
  -t ${IMAGE}:${TAG} \
  -f ${SERVICE_DIR}/Dockerfile \
  ${SERVICE_DIR}

echo "🔹 Pushing image to Docker Hub…"
docker push ${IMAGE}:${TAG}

echo "✅ Built & pushed ${IMAGE}:${TAG}"
