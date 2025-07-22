# Database Service (PostgreSQL)

A shared PostgreSQL infra chart for the Express Shipping Room Supply platform.  
This Helm chart installs a Bitnami PostgreSQL sub-chart (v15.x) with sane defaults, persistence, and a connectivity test job.

---

## 📦 Chart Structure

infrastructure/helm/database/
├── Chart.yaml
├── values.yaml
├── charts/
│ └── postgresql-12.x.x.tgz # Bitnami sub-chart
└── templates/
├── serviceaccount.yaml
├── service.yaml
├── tests/
│ └── test-connection.yaml
└── _helpers.tpl
---

## 🔑 Prerequisites

- Kubernetes cluster (v1.20+)
- Helm v3.7+
- `kubectl` configured against your cluster
- (Optional) `kind` for local testing
- `psql` client for manual connectivity tests

---

## ⚙️ Configuration

All chart defaults live in `values.yaml`. Important fields:

```yaml
postgresql:
  fullnameOverride: database
  postgresqlDatabase: shared_db
  postgresqlUsername: shared_user
  postgresqlPassword: CHART_POSTGRES_PASSWORD      # override via `--set postgresql.postgresqlPassword=…` or a Secret
  service:
    port: 5432
  persistence:
    enabled: true
    size: 8Gi

You can override any value with:

helm upgrade --install database ./ \
  --namespace infra-db \
  -f custom-values.yaml

🚀 Installation

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm dependency update

Install or upgrade into your target namespace:

helm upgrade --install database ./ \
  --namespace infra-db \
  --create-namespace \
  -f values.yaml

Wait for Postgres to be ready:

    kubectl rollout status statefulset/database-postgresql \
      -n infra-db --timeout=120s

🔍 Testing Connectivity
A) Built-in Job

kubectl apply -n infra-db \
  -f templates/tests/test-connection.yaml

kubectl wait --for=condition=complete job/test-connection \
  -n infra-db --timeout=60s

kubectl logs job/test-connection -n infra-db

You should see pg_isready: connection ok.
B) Manual via psql

    Port-forward the Postgres service:

kubectl port-forward svc/database-postgresql 5432:5432 -n infra-db &

Extract password and connect:

export PGPASSWORD=$(kubectl get secret database-postgresql -n infra-db \
  -o jsonpath="{.data.postgres-password}" | base64 --decode)

psql "host=localhost port=5432 user=postgres password=$PGPASSWORD dbname=postgres"

Smoke test:

CREATE TABLE smoke (id INT);
INSERT INTO smoke VALUES (123);
SELECT * FROM smoke;

Cleanup port-forward:

    kill %1

🧹 Cleanup

helm uninstall database -n infra-db
kubectl delete namespace infra-db

📖 Further Reading

    Bitnami PostgreSQL Helm Chart

    Helm Dependency Management