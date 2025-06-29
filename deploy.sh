#!/usr/bin/env bash
set -euo pipefail

# === 1. Ensure Kind cluster ===
CLUSTER_NAME=shipping-room
if ! kind get clusters | grep -q "^${CLUSTER_NAME}$"; then
  echo "🛠️  Creating kind cluster '${CLUSTER_NAME}'..."
  kind create cluster --name "${CLUSTER_NAME}"
else
  echo "✅ Kind cluster '${CLUSTER_NAME}' already exists"
fi

echo "🌐 Using cluster context:"
kubectl cluster-info --context "kind-${CLUSTER_NAME}"

# === 2. Deploy Postgres ===
echo "🚀 Deploying Postgres..."
helm upgrade --install database ./infrastructure/helm/database \
  --namespace infra --create-namespace \
  -f infrastructure/helm/microservices/templates/order-management/values.yaml

echo "⏳ Waiting for Postgres to be ready..."
kubectl rollout status statefulset/database-postgresql -n infra --timeout=120s

# === 3. Deploy Kafka (Strimzi) ===
echo "🚀 Deploying Kafka..."
helm upgrade --install kafka ./infrastructure/helm/message_bus \
  --namespace infra --create-namespace \
  -f infrastructure/helm/message_bus/values.yaml

echo "⏳ Waiting for Kafka to be ready..."
# adjust label if your Strimzi chart names it differently
kubectl rollout status statefulset/kafka -n infra --timeout=180s

# === 4. Deploy Order Management Service ===
echo "🚀 Deploying Order Management service..."
helm upgrade --install order-management ./infrastructure/helm/microservices/templates/order-management \
  --namespace order-management --create-namespace \
  -f infrastructure/helm/microservices/templates/order-management/values.yaml

echo "⏳ Waiting for Order Management pods..."
kubectl rollout status deployment/order-management -n order-management --timeout=120s

# === 5. Final check ===
echo
echo "🎉 All components are up!"
echo "• infra namespace pods:"
kubectl get pods -n infra
echo "• order-management namespace pods:"
kubectl get pods -n order-management

echo
echo "👉 To test the API locally, you can port-forward:"
echo "   kubectl port-forward svc/order-management 3000:3000 -n order-management"
echo "   curl http://localhost:3000/orders"