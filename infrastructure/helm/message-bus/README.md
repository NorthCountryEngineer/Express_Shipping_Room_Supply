# message-bus Helm Chart

This chart deploys the Strimzi Kafka operator and a Kafka cluster.

## Installation

```bash
helm upgrade --install message-bus ./ -n infra --create-namespace -f values.yaml
```

## Verify readiness

Wait for the Strimzi operator deployment:

```bash
kubectl rollout status deployment/kafka-operator -n infra
```

Wait for the Kafka cluster statefulset:

```bash
kubectl rollout status statefulset/kafka -n infra
```

## Test connection

```bash
kubectl apply -n infra -f templates/tests/test-connection.yaml
kubectl logs job/test-kafka -n infra
```
