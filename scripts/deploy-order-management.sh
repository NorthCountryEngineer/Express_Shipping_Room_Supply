#!/usr/bin/env bash
set -euo pipefail

# ─── CONFIG ────────────────────────────────────────────────────────────────────
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.."
BUILD_SCRIPT="${PROJECT_ROOT}/scripts/build_and_push.sh"
CHART_DIR="${PROJECT_ROOT}/infrastructure/helm/microservices/order-management"
NAMESPACE="order-management"
RELEASE_NAME="order-management"
IMAGE_REPO="ncacademy/express_shipping"
IMAGE_TAG="latest"
# ────────────────────────────────────────────────────────────────────────────────

echo "🔹 Step 1: Build & push image"
bash "${BUILD_SCRIPT}"

echo
echo "🔹 Step 2: Deploy Helm chart"
helm upgrade --install "${RELEASE_NAME}" "${CHART_DIR}" \
  --namespace "${NAMESPACE}" --create-namespace \
  --set image.repository="${IMAGE_REPO}" \
  --set image.tag="${IMAGE_TAG}"

echo
echo "🔹 Step 3: Wait for rollout"
kubectl rollout status deployment/"${RELEASE_NAME}" -n "${NAMESPACE}" --timeout=120s

echo
echo "✅ order-management is live in namespace ${NAMESPACE}"