---
title: "gRPC"
---

# Cosmos gRPC & REST

## Cosmos gRPC

Cosmos EVM exposes gRPC endpoints for all the integrated Cosmos SDK modules. gRPC is a significantly improved interface that provides automatic type generation and greatly reduced transmission overhead. [Read more..](https://grpc.io/docs/what-is-grpc/introduction/)

## Cosmos HTTP REST (gRPC-Gateway)

[gRPC-Gateway](https://grpc-ecosystem.github.io/grpc-gateway/) reads a gRPC service definition and
generates a reverse-proxy server which translates RESTful JSON API into gRPC. With gRPC-Gateway,
users can use REST to interact with the Cosmos gRPC service. See the list
of supported gRPC-Gateway API endpoints using Swagger [here](../api#clients).