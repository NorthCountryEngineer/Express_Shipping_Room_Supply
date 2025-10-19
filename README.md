# Message Bus Helm Setup

This repository includes a Helm release named `message-bus` deployed into the `kafka` namespace. The release uses the [Bitnami Kafka](https://github.com/bitnami/charts/tree/main/bitnami/kafka) chart with minimal settings.

## Prerequisites

- [Helm v3](https://helm.sh/)
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/)
- A running Kubernetes cluster such as [Kind](https://kind.sigs.k8s.io/)

## Adding the Bitnami repository

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

## Installing the chart

To install directly from the Bitnami repository:

```bash
helm install message-bus bitnami/kafka \
  --namespace kafka --create-namespace \
  --set replicaCount=1 \
  --set zookeeper.replicaCount=1 \
  --set auth.clientProtocol=plaintext
```

## Using the local umbrella chart

You may also deploy using the umbrella chart found at `infrastructure/helm/message-bus` which references the Bitnami Kafka chart. From the repository root:

```bash
helm install message-bus ./infrastructure/helm/message-bus --namespace kafka --create-namespace
```

## Managing the release

- **Upgrade:** `helm upgrade message-bus bitnami/kafka -n kafka [flags...]`
- **List releases:** `helm list -n kafka`
- **Uninstall:** `helm uninstall message-bus -n kafka`


