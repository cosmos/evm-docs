---
sidebar_position: 2
---

# EIP-155: Replay Protection

[EIP-155](https://eips.ethereum.org/EIPS/eip-155) is an Ethereum Improvement Proposal,
that has introduced a simple replay protection mechanism,
by including the chain ID information into the signed transaction data.
This was necessary, because Ethereum-based transactions rely on the Hex representation of addresses,
which are not necessarily unique to a given network.
This means that single signed transaction could be valid on multiple networks,
as the same addresses are involved e.g. in a token transfer.
This holds the potential for exploits and is addressed by enforcing the EIP-155 replay protection.

Cosmos SDK-based blockchains use Bech32 representations for addresses, which contain a unique prefix per chain.
This means, that for Cosmos transactions, replay protection is inherently present as addresses of a given chain
are not valid addresses on other chains.
However, as the Cosmos EVM also accepts EVM transactions, handling only those transactions that conform to EIP-155
becomes a requirement again.

This requires special care to be taken when selecting an EIP-155 compliant [chain ID](./chain-id.mdx)
to avoid duplication amongst chains.

## Configuring Replay Protection

By default, replay protection is enabled on any Cosmos EVM node.
There are two distinct steps required to accept unprotected transactions, i.e. those that do not contain the chain ID
in the signed transaction data:

1. **Disable Module Parameter**:
The [EVM module](../modules/vm#parameters) contains a governance controlled parameter,
that globally dictates if unprotected transactions are supported.
This has to be disabled via a governance vote or
by setting the `allow_unprotected_txs` field to `true` in the genesis of a local node.

2. **Adjust Node Configuration**:
When the global parameter is set accordingly, each node operator has the option to individually opt into allowing
unprotected transactions to be sent to their nodes.

The EIP-155 replay protection is enabled globally in the EVM module parameters.
In case this is disabled as a global requirement, node operators can opt into supporting unprotected transactions
by adjusting the corresponding setting in the [node configuration](https://github.com/cosmos/evm/blob/v0.1.0/server/config/toml.go#L74-L76):

```toml
# in $HOME/.evmosd/config/config.toml

# AllowUnprotectedTxs restricts unprotected (non EIP-155 signed) transactions to be submitted via
# the node's RPC when the global parameter is disabled.
allow-unprotected-txs = true  # false by default
```

More information about EIP-155 can be found here: [EIP-155: Replay Protection](../../protocol/concepts/replay-protection.md).