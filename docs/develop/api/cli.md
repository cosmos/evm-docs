---
sidebar_position: 3
---

# Command Line Interface (CLI)

The Cosmos EVM CLI (`evmd`) provides a comprehensive command-line interface for interacting with a Cosmos EVM-enabled blockchain. This includes commands for node operations, key management, querying blockchain state, submitting transactions, and more.

:::info Node Requirements
To use the `query` and `tx` commands, your `evmd` node must either:
- Be fully synced with the network you're interacting with, OR
- Be configured to use an external RPC endpoint in `~/.evmd/config/client.toml`

Example client.toml configuration:
```toml
# The network chain ID
chain-id = "evmos_9001-2"
# The keyring's backend
keyring-backend = "os"
# CLI output format
output = "text"
# <host>:<port> to CometBFT RPC interface for this chain
node = "tcp://localhost:26657"
# Transaction broadcasting mode (sync|async)
broadcast-mode = "sync"
```

To use an external RPC, update the `node` field to point to a public or private RPC endpoint.
:::

## Global Flags

These flags are available for all commands:

| Flag | Description | Default |
|------|-------------|---------|
| `-b, --broadcast-mode` | Transaction broadcasting mode (sync\|async) | `sync` |
| `--chain-id` | Specify Chain ID for sending Tx | |
| `--fees` | Fees to pay along with transaction (e.g., 10aevmos) | |
| `--from` | Name or address of private key with which to sign | |
| `--gas-adjustment` | Adjustment factor to multiply against the estimate returned by tx simulation | `1` |
| `--gas-prices` | Gas prices to determine the transaction fee (e.g., 10aevmos) | |
| `--home` | Directory for config and data | `~/.evmd` |
| `--keyring-backend` | Select keyring's backend | `os` |
| `--log_format` | The logging format (json\|plain) | `plain` |
| `--log_level` | The logging level | `info` |
| `--log_no_color` | Disable colored logs | |
| `--node` | \<host\>:\<port\> to CometBFT RPC interface | `tcp://localhost:26657` |
| `--trace` | Print out full stack trace on errors | |

## Core Commands

### Node Operations

#### `start`
Run the full node.

```bash
evmd start [flags]
```

Key flags:
- `--json-rpc.enable`: Enable the JSON-RPC server
- `--json-rpc.address`: JSON-RPC server address (default: `0.0.0.0:8545`)
- `--json-rpc.ws-address`: JSON-RPC WebSocket server address (default: `0.0.0.0:8546`)
- `--json-rpc.api`: API namespaces to enable (e.g., `eth,web3,net,txpool,debug`)

#### `init`
Initialize private validator, p2p, genesis, and application configuration files.

```bash
evmd init [moniker] [flags]
```

#### `status`
Query remote node for status.

```bash
evmd status [flags]
```

### Key Management

The `keys` command provides keyring management functionality for accounts.

#### `keys add`
Add a new key or recover from mnemonic.

```bash
evmd keys add [name] [flags]
```

Flags:
- `--recover`: Recover key from mnemonic
- `--algo`: Key algorithm (eth_secp256k1)
- `--coin-type`: Coin type (60 for Ethereum)

#### `keys list`
List all keys in the keyring.

```bash
evmd keys list [flags]
```

#### `keys show`
Display key information.

```bash
evmd keys show [name|address] [flags]
```

#### `keys export`
Export a private key.

```bash
evmd keys export [name] [flags]
```

#### `keys import`
Import a private key.

```bash
evmd keys import [name] [keyfile] [flags]
```

#### EVM-specific Key Commands

##### `keys unsafe-export-eth-key`
Export an Ethereum private key (**UNSAFE**).

```bash
evmd keys unsafe-export-eth-key [name] [flags]
```

##### `keys unsafe-import-eth-key`
Import Ethereum private keys into the local keybase (**UNSAFE**).

```bash
evmd keys unsafe-import-eth-key [name] [pk] [flags]
```

### Query Commands

The `query` (or `q`) command provides read-only access to blockchain data.

#### EVM Module Queries

##### `query evm account`
Get account information for an address.

```bash
evmd query evm account [address] [flags]
```

##### `query evm balance-erc20`
Get ERC20 token balance.

```bash
evmd query evm balance-erc20 [address] [erc20-address] [flags]
```

##### `query evm code`
Get smart contract code.

```bash
evmd query evm code [address] [flags]
```

##### `query evm storage`
Get storage value at a specific key.

```bash
evmd query evm storage [address] [key] [flags]
```

##### `query evm params`
Get EVM module parameters.

```bash
evmd query evm params [flags]
```

##### Address Conversion

Convert between Ethereum (0x) and Cosmos (bech32) addresses:

```bash
# 0x to bech32
evmd query evm 0x-to-bech32 [0x-address] [flags]

# bech32 to 0x
evmd query evm bech32-to-0x [bech32-address] [flags]
```

#### ERC20 Module Queries

##### `query erc20 token-pairs`
Get all registered token pairs.

```bash
evmd query erc20 token-pairs [flags]
```

##### `query erc20 token-pair`
Get a specific token pair.

```bash
evmd query erc20 token-pair [token-address-or-denom] [flags]
```

##### `query erc20 params`
Get ERC20 module parameters.

```bash
evmd query erc20 params [flags]
```

#### Feemarket Module Queries

##### `query feemarket base-fee`
Get the base fee at a given height.

```bash
evmd query feemarket base-fee [flags]
```

##### `query feemarket block-gas`
Get the block gas used at a given height.

```bash
evmd query feemarket block-gas [flags]
```

##### `query feemarket params`
Get fee market parameters.

```bash
evmd query feemarket params [flags]
```

#### Standard Cosmos Queries

##### Bank Module
```bash
# Get account balances
evmd query bank balances [address] [flags]

# Get specific denom balance
evmd query bank balance [address] [denom] [flags]

# Get total supply
evmd query bank total [flags]
```

##### Staking Module
```bash
# Get all validators
evmd query staking validators [flags]

# Get delegations for an address
evmd query staking delegations [delegator-address] [flags]

# Get unbonding delegations
evmd query staking unbonding-delegations [delegator-address] [flags]
```

##### Distribution Module
```bash
# Get rewards
evmd query distribution rewards [delegator-address] [validator-address] [flags]

# Get commission
evmd query distribution commission [validator-address] [flags]
```

##### Governance Module
```bash
# List all proposals
evmd query gov proposals [flags]

# Get specific proposal
evmd query gov proposal [proposal-id] [flags]

# Get votes on a proposal
evmd query gov votes [proposal-id] [flags]
```

### Transaction Commands

The `tx` command is used to create and broadcast transactions.

#### EVM Transactions

##### `tx evm send`
Send funds between accounts.

```bash
evmd tx evm send [from] [to] [amount] [flags]
```

##### `tx evm raw`
Build a Cosmos transaction from a raw Ethereum transaction.

```bash
evmd tx evm raw [hex-encoded-tx] [flags]
```

#### ERC20 Transactions

##### `tx erc20 convert-coin`
Convert native Cosmos coins to ERC20 tokens.

```bash
evmd tx erc20 convert-coin [amount] [receiver] [flags]
```

##### `tx erc20 convert-erc20`
Convert ERC20 tokens to native Cosmos coins.

```bash
evmd tx erc20 convert-erc20 [contract-address] [amount] [receiver] [flags]
```

#### Standard Cosmos Transactions

##### Bank Transactions
```bash
# Send coins
evmd tx bank send [from] [to] [amount] [flags]

# Multi-send
evmd tx bank multi-send [from] [to1] [amount1] [to2] [amount2] ... [flags]
```

##### Staking Transactions
```bash
# Create validator
evmd tx staking create-validator [flags]

# Delegate
evmd tx staking delegate [validator-address] [amount] [flags]

# Unbond
evmd tx staking unbond [validator-address] [amount] [flags]

# Redelegate
evmd tx staking redelegate [src-validator] [dst-validator] [amount] [flags]
```

##### Governance Transactions
```bash
# Submit proposal
evmd tx gov submit-proposal [proposal-type] [flags]

# Vote on proposal
evmd tx gov vote [proposal-id] [option] [flags]

# Deposit on proposal
evmd tx gov deposit [proposal-id] [amount] [flags]
```

### Advanced Commands

#### `genesis`
Genesis file manipulation commands.

```bash
# Add genesis account
evmd genesis add-genesis-account [address] [coins] [flags]

# Collect genesis transactions
evmd genesis collect-gentxs [flags]

# Generate genesis transaction
evmd genesis gentx [key-name] [amount] [flags]
```

#### `comet`
CometBFT-specific commands.

```bash
# Show node ID
evmd comet show-node-id [flags]

# Show validator info
evmd comet show-validator [flags]

# Reset blockchain state
evmd comet unsafe-reset-all [flags]
```

#### `debug`
Debugging utilities.

```bash
# Get raw bytes for address
evmd debug addr [address] [flags]

# Decode raw hex bytes
evmd debug raw-bytes [hex] [flags]

# Convert public key
evmd debug pubkey [pubkey] [flags]
```

## Examples

### Setting up a new account
```bash
# Create a new account
evmd keys add myaccount

# Import an Ethereum private key
evmd keys unsafe-import-eth-key myethaccount 0x...

# List all accounts
evmd keys list

# Show account details
evmd keys show myaccount
```

### Querying blockchain state
```bash
# Get account balance
evmd query bank balances evmos1...

# Get EVM account info
evmd query evm account 0x...

# Get ERC20 balance
evmd query evm balance-erc20 0xUserAddress 0xTokenAddress

# Get base fee
evmd query feemarket base-fee
```

### Sending transactions
```bash
# Send native tokens
evmd tx bank send myaccount evmos1... 100aevmos --gas-prices 10aevmos

# Send via EVM
evmd tx evm send myaccount 0x... 100aevmos --gas-prices 10aevmos

# Convert coins to ERC20
evmd tx erc20 convert-coin 100aevmos 0x... --from myaccount
```

### Running a node
```bash
# Initialize node
evmd init mynode --chain-id evmos_9001-2

# Start node with JSON-RPC enabled
evmd start --json-rpc.enable --json-rpc.api eth,web3,net,txpool,debug

# Get node status
evmd status
```

## Configuration

The CLI uses the following configuration structure:
- Configuration directory: `~/.evmd/` (or specified by `--home`)
- Key storage: Managed by the keyring backend (os, file, test)
- Node configuration: `~/.evmd/config/config.toml`
- App configuration: `~/.evmd/config/app.toml`

For more detailed information about specific commands, use the `--help` flag with any command:

```bash
evmd [command] --help
evmd [command] [subcommand] --help
```