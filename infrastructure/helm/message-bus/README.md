# Message Bus (Kafka) Helm Chart

This README explains how to deploy a single-node Kafka cluster using the [Bitnami Kafka](https://github.com/bitnami/charts/tree/main/bitnami/kafka) chart. It mirrors the `message-bus` release deployed in the `kafka` namespace.

## Prerequisites

- [Helm v3](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) configured for your cluster
- A running Kubernetes cluster (e.g., [Kind](https://kind.sigs.k8s.io/))

## Add the Bitnami Repository

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

## Install the Chart

Run the following command to install Kafka with a single broker and single ZooKeeper node using plaintext authentication:

```bash
helm install message-bus bitnami/kafka \
  --namespace kafka --create-namespace \
  --set replicaCount=1 \
  --set zookeeper.replicaCount=1 \
  --set auth.clientProtocol=plaintext
```

### Parameter explanation

- `replicaCount=1` – deploy a single Kafka broker.
- `zookeeper.replicaCount=1` – deploy a single ZooKeeper pod.
- `auth.clientProtocol=plaintext` – disable encryption/authentication for clients. **Not recommended for production.**

## Verify the Deployment

Check the running pods and services:

```bash
kubectl -n kafka get pods,svc
```

## Create a Kafka Client Pod

To interact with the cluster, create a temporary Kafka client pod:

```bash
kubectl run kafka-client \
  --restart=Never \
  --image docker.io/bitnami/kafka:4.0.0-debian-12-r8 \
  --namespace kafka \
  --command -- sleep infinity
```

## Interact with Kafka

1. **Exec into the client pod:**

   ```bash
   kubectl -n kafka exec -it kafka-client -- bash
   ```

2. **Create a topic:**

   ```bash
   kafka-topics.sh --create --topic demo --bootstrap-server message-bus-kafka:9092
   ```

3. **List topics:**

   ```bash
   kafka-topics.sh --list --bootstrap-server message-bus-kafka:9092
   ```

4. **Produce messages:**

   ```bash
   kafka-console-producer.sh --topic demo --bootstrap-server message-bus-kafka:9092
   ```

5. **Consume messages:**

   ```bash
   kafka-console-consumer.sh --topic demo --from-beginning --bootstrap-server message-bus-kafka:9092
   ```

Exit the pod when finished.

## Port Forwarding

Expose Kafka locally so non-cluster clients can connect:

```bash
kubectl -n kafka port-forward svc/message-bus-kafka 9092:9092
```

## Upgrading

Update to a newer chart version or modify values:

```bash
helm upgrade message-bus bitnami/kafka \ 
  --namespace kafka \
  --set replicaCount=1 \
  --set zookeeper.replicaCount=1 \
  --set auth.clientProtocol=plaintext
```

## Uninstalling

Remove the release and namespace:

```bash
helm uninstall message-bus --namespace kafka
```

## Next Steps & Tips

- **Persistence:** Configure storage classes and persistent volumes for long-lived clusters.
- **Scaling:** Increase `replicaCount` and `zookeeper.replicaCount` for higher availability.
- **Security:** Enable TLS/SASL by setting `auth.clientProtocol` to `tls`, `sasl`, or `sasl_tls` and provide the required credentials.
- **Monitoring:** Deploy metrics exporters such as `kafka-exporter` and integrate with Prometheus/Grafana.

