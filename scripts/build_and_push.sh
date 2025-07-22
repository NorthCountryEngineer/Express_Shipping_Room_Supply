#!/usr/bin/env bash
set -euo pipefail

# ─── CONFIG ────────────────────────────────────────────────────────────────────
SERVICE_DIR="Services/Order_Management/order-management"
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
