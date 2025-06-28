# Order Management Service

This service handles order creation, updates, and fulfillment for Express Shipping Room Supply.

## Development

1. Install dependencies
    ```bash
    npm install
    ```
2. Start the service
    ```bash
    npm run start:dev
    ```

## Deployment

A Helm chart is provided under `infrastructure/helm/microservices/templates/order-management/`.

### Prerequisites

- Access to a Kubernetes cluster
- Helm installed
- Postgres database credentials
- Kafka bootstrap servers

### Required Values

Set the following values (e.g., in `values.yaml`) before deploying:

| Key | Description |
|-----|-------------|
| `postgres.host` | Database host name |
| `postgres.port` | Database port |
| `postgres.username` | Postgres user name |
| `postgres.password` | Postgres user password |
| `postgres.database` | Name of the database |
| `kafka.bootstrapServers` | Comma-separated list of Kafka brokers |

Example `values.yaml` snippet:
```yaml
postgres:
  host: db.example.com
  port: 5432
  username: order_user
  password: secret
  database: order_db
kafka:
  bootstrapServers: kafka1:9092,kafka2:9092
```

### Deploy via Helm

1. Change to the Helm chart directory:
    ```bash
    cd infrastructure/helm/microservices/templates/order-management
    ```
2. Install or upgrade the release:
    ```bash
    helm upgrade --install order-management . \
      --namespace order-management \
      --create-namespace \
      -f values.yaml
    ```
3. Check the rollout status:
    ```bash
    kubectl get pods -n order-management
    ```
