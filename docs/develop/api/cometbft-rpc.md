---
title: "RPC"
---

# CometBFT RPC

The CometBFT RPC allows you to query transactions, blocks, consensus state, broadcast transactions, etc.

Complete documentation including a swagger interface can be found [here](https://docs.cometbft.com/v1.0/rpc/).

## URI/HTTP

A GET request with arguments encoded as query parameters:

```
curl localhost:26657/block?height=5
```

## RPC/HTTP

JSONRPC requests can be POST'd to the root RPC endpoint via HTTP. See the list
of supported CometBFT RPC endpoints using Swagger in the [API/clients](../api#clients) section.

## RPC/Websocket

### Cosmos and CometBFT Events

`Event`s are objects that contain information about the execution of the application
and are triggered after a block is committed. They are mainly used by service providers
like block explorers and wallet to track the execution of various messages and index transactions.
You can get the full list of `event` categories and values [here](#list-of-cometbft-events).

More on Events:

- [Cosmos SDK Events](https://docs.cosmos.network/main/learn/advanced/events)

## Subscribing to Events via WebSocket in CometBFT

CometBFT provides a WebSocket connection that allows you to subscribe to and unsubscribe from various blockchain events in real-time. This is a powerful tool for monitoring chain activity and building event-driven applications.

-----

### Prerequisites

- **CometBFT Node**: You need a running CometBFT node with its RPC WebSocket enabled.
- **`ws` tool**: A command-line WebSocket client. If you don't have it, you can install it via npm:

    ```bash
    npm i -g ws
    ```

-----

### Configuring the WebSocket RPC Endpoint

By default, the CometBFT RPC WebSocket listens on `tcp://127.0.0.1:26657`. If you need to change this, you can define the address using the `--rpc.laddr` flag when starting your node:

```bash
appd start --rpc.laddr="tcp://127.0.0.1:26657"
```

-----

### Subscribing to Events

1. **Connect to the CometBFT WebSocket**:
    Use the `ws` command to establish a connection to your node's WebSocket endpoint.

    ```bash
    ws ws://localhost:26657/websocket
    ```

    Once connected, you'll see your prompt ready to accept input (e.g., ` > `).

2. **Send a Subscription Request**:
    To subscribe to a specific event, send a JSON-RPC request with the `"method": "subscribe"` and a `"query"` parameter. The `query` uses a specific syntax to filter events.

    For example, to subscribe to `NewBlockHeader` events (which fire when a new block header is committed):

    ```json
    { "jsonrpc": "2.0", "method": "subscribe", "params": ["tm.event='NewBlockHeader'"], "id": 1 }
    ```

    Paste this JSON into your `ws` terminal and press Enter. You should receive a confirmation like:

    ```json
    { "jsonrpc": "2.0", "id": 1, "result": {} }
    ```

    Your terminal will now display incoming `NewBlockHeader` events as they occur.

-----

### Filtering Events with `query`

The `query` parameter in your subscription request allows for granular filtering of events. You can combine an `Event Type` with specific `Event Attributes` to narrow down the events you receive.

The generic syntax for the `query` is:

```json
{
    "jsonrpc": "2.0",
    "method": "subscribe",
    "id": "0",
    "params": {
        "query": "tm.event='<event_value>' AND eventType.eventAttribute='<attribute_value>'"
    }
}
```

**Example: Subscribing to specific Ethereum transactions on a Cosmos EVM chain**

If you're on a Cosmos EVM chain, `MsgEthereumTx` transactions trigger an `ethermint` event. You can filter these events by `sender` or `recipient` attributes. To subscribe to transactions where the `ethereum.recipient` is a specific hex address (e.g., `0x1122334455667788990011223344556677889900`):

```json
{
    "jsonrpc": "2.0",
    "method": "subscribe",
    "id": "0",
    "params": {
        "query": "tm.event='Tx' AND ethereum.recipient='0x1122334455667788990011223344556677889900'"
    }
}
```

-----

### Common CometBFT Events and Attributes

Here's a breakdown of key event types and their common uses for subscription:

#### Main Event Types (`tm.event` values)

These values are used with `tm.event='<Event Value>'`:

| Event Value             | Description                              | Categories  |
| :---------------------- | :--------------------------------------- | :---------- |
| `"NewBlock"`            | Contains events triggered during `BeginBlock` and `EndBlock`. | `block`     |
| `"NewBlockHeader"`      | Provides only the header of a new block. | `block`     |
| `"Tx"`                  | Contains events triggered during `DeliverTx` (i.e., transaction processing). | `block`     |
| `"ValidatorSetUpdates"` | Contains validator set updates for the block. | `block`     |
| `"NewEvidence"`         | Indicates new Byzantine evidence.        | `block`     |
| `"BlockSyncStatus"`     | Provides information about block synchronization status. | `consensus` |
| `"Lock"`                | Consensus: lock event.                   | `consensus` |
| `"NewRound"`            | Consensus: new round started.            | `consensus` |
| `"Polka"`               | Consensus: Polka event.                  | `consensus` |
| `"Relock"`              | Consensus: relock event.                 | `consensus` |
| `"StateSyncStatus"`     | Provides information about state synchronization status. | `consensus` |
| `"TimeoutPropose"`      | Consensus: timeout for propose.          | `consensus` |
| `"TimeoutWait"`         | Consensus: timeout for waiting.          | `consensus` |
| `"Unlock"`              | Consensus: unlock event.                 | `consensus` |
| `"ValidBlock"`          | Consensus: block is valid.               | `consensus` |
| `"Vote"`                | Consensus: vote event.                   | `consensus` |

#### Event Keys for Broader Filtering

These event keys can be used directly in the `query` (e.g., `tx.hash='<hash_value>'`):

| Event Key          | Description                                      | Categories |
| :----------------- | :----------------------------------------------- | :--------- |
| `"tm.event"`       | Subscribe to a specific event (e.g., `NewBlock`). | `block`    |
| `"tx.hash"`        | Subscribe to a specific transaction by its hash. | `block`    |
| `"tx.height"`      | Subscribe to transactions at a specific block height. | `block`    |
| `"block.height"`   | Index `BeginBlock` and `EndBlock` events.      | `block`    |
| `"begin_block"`    | Subscribe to ABCI `BeginBlock` events.         | `block`    |
| `"end_block"`      | Subscribe to ABCI `EndBlock` events.           | `consensus`|

:::tip
For a comprehensive list of event types and values for each Cosmos SDK module, refer to the [suspicious link removed] section in the official documentation. Specifically, check the `Events` page for each supported module to obtain the full event list for Cosmos EVM.
:::

-----

### Example: Subscribing to Validator Set Updates

Let's illustrate with an example to subscribe to `ValidatorSetUpdates`. This event is triggered when there are changes to the validator set for a block.

1. **Connect to the WebSocket**:

    ```bash
    ws ws://localhost:26657/websocket
    ```

2. **Send the Subscription Request**:

    ```json
    > { "jsonrpc": "2.0", "method": "subscribe", "params": ["tm.event='ValidatorSetUpdates'"], "id": 1 }
    ```

3. **Example Response (truncated for brevity)**:
    When a validator set update occurs, you'll receive a JSON response similar to this:

    ```json
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "query": "tm.event='ValidatorSetUpdates'",
            "data": {
                "type": "tendermint/event/ValidatorSetUpdates",
                "value": {
                  "validator_updates": [
                    {
                      "address": "09EAD022FD25DE3A02E64B0FE9610B1417183EE4",
                      "pub_key": {
                        "type": "tendermint/PubKeyEd25519",
                        "value": "ww0z4WaZ0Xg+YI10w43wTWbBmM3dpVza4mmSQYsd0ck="
                      },
                      "voting_power": "10",
                      "proposer_priority": "0"
                    }
                  ]
                }
            }
        }
    }
    ```

    This response indicates that the validator set has been updated, providing details about the changes (e.g., an updated validator `address`, `pub_key`, and `voting_power`).

:::tip
**Important Note on Transaction Hashes:**
When querying Ethereum transactions on a Cosmos EVM chain, remember that their transaction hashes will differ from standard Cosmos transactions. For Ethereum transactions, you'll typically need to use event queries with specific attributes (like `ethereum.recipient` as shown above) rather than `tx.hash`.
:::

-----
