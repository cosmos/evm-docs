---
sidebar_position: 3
---

# Command Line Interface (CLI)

The CLI tool (`appd`) provides a full-feature interface for interacting with the blockchain. This includes commands for node operations, key management, querying blockchain state, submitting transactions, and more.

:::info Node Requirements
To use the `query` and `tx` commands, your `appd` node must either:

- Be fully synced with the network you're interacting with, OR
- Be configured to use an external RPC endpoint in `~/.appd/config/client.toml`

Example client.toml configuration:

```toml
# The network chain ID
chain-id = "myapp-1"
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
| `--fees` | Fees to pay along with transaction (e.g., 10ustake) | |
| `--from` | Name or address of private key with which to sign | |
| `--gas-adjustment` | Adjustment factor to multiply against the estimate returned by tx simulation | `1` |
| `--gas-prices` | Gas prices to determine the transaction fee (e.g., 10ustake) | |
| `--home` | Directory for config and data | `~/.appd` |
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
appd start [flags]
```

Key flags:

- `--json-rpc.enable`: Enable the JSON-RPC server
- `--json-rpc.address`: JSON-RPC server address (default: `127.0.0.1:8545`)
- `--json-rpc.ws-address`: JSON-RPC WebSocket server address (default: `127.0.0.1:8546`)
- `--json-rpc.api`: API namespaces to enable (default: `eth,net,web3`)
- `--json-rpc.enable-indexer`: Enable the custom tx indexer for json-rpc
- `--json-rpc.enable-profiling`: Enable profiling in the debug namespace
- `--json-rpc.filter-cap`: Sets the global cap for total number of filters (default: `200`)
- `--json-rpc.gas-cap`: Sets a cap on gas that can be used in eth_call/estimateGas (default: `25000000`)
- `--json-rpc.txfee-cap`: Sets a cap on transaction fee that can be sent via RPC APIs (default: `1`)
- `--json-rpc.batch-request-limit`: Maximum number of requests in a batch (default: `1000`)
- `--json-rpc.evm-timeout`: Sets a timeout used for eth_call (default: `5s`)
- `--json-rpc.logs-cap`: Sets the max number of results from eth_getLogs query (default: `10000`)
- `--json-rpc.block-range-cap`: Sets the max block range allowed for eth_getLogs query (default: `10000`)

:::warning
You should only expose the debug endpoint in non production settings as it could impact network performance and uptime under certain conditions.
:::

#### `init`

Initialize private validator, p2p, genesis, and application configuration files.

```bash
appd init [moniker] [flags]
```

#### `status`

Query remote node for status.

```bash
appd status [flags]
```

#### `index-eth-tx`

Index historical Ethereum transactions.

```bash
appd index-eth-tx [backward|forward] [flags]
```

- `backward`: Index from first indexed block to earliest block
- `forward`: Index from latest indexed block to latest block

### Key Management

The `keys` command provides keyring management functionality for accounts.

#### `keys add`

Add a new key or recover from mnemonic.

```bash
appd keys add [name] [flags]
```

Flags:

- `--recover`: Recover key from mnemonic
- `--algo`: Key algorithm (eth_secp256k1)
- `--coin-type`: Coin type (60 for Ethereum)

#### `keys list`

List all keys in the keyring.

```bash
appd keys list [flags]
```

#### `keys list-key-types`

List all supported key types.

```bash
appd keys list-key-types [flags]
```

#### `keys show`

Display key information.

```bash
appd keys show [name|address] [flags]
```

#### `keys export`

Export a private key.

```bash
appd keys export [name] [flags]
```

#### `keys import`

Import a private key.

```bash
appd keys import [name] [keyfile] [flags]
```

#### EVM-specific Key Commands

##### `keys unsafe-export-eth-key`

Export an Ethereum private key (**UNSAFE**).

```bash
appd keys unsafe-export-eth-key [name] [flags]
```

##### `keys unsafe-import-eth-key`

Import Ethereum private keys into the local keybase (**UNSAFE**).

```bash
appd keys unsafe-import-eth-key [name] [pk] [flags]
```

### Query Commands

The `query` (or `q`) command provides read-only access to blockchain data.

#### EVM Module Queries

##### `query evm account`

Get account information for an address.

```bash
appd query evm account [address] [flags]
```

##### `query evm balance-bank`

Get bank balance for a 0x address.

```bash
appd query evm balance-bank [0x-address] [denom] [flags]
```

##### `query evm balance-erc20`

Get ERC20 token balance.

```bash
appd query evm balance-erc20 [0x-address] [erc20-address] [flags]
```

##### `query evm code`

Get smart contract code.

```bash
appd query evm code [address] [flags]
```

##### `query evm storage`

Get storage value at a specific key.

```bash
appd query evm storage [address] [key] [flags]
```

##### `query evm config`

Get EVM configuration values.

```bash
appd query evm config [flags]
```

##### `query evm params`

Get EVM module parameters.

```bash
appd query evm params [flags]
```

##### Address Conversion

Convert between Ethereum (0x) and Cosmos (bech32) addresses:

```bash
# 0x to bech32
appd query evm 0x-to-bech32 [0x-address] [flags]

# bech32 to 0x
appd query evm bech32-to-0x [bech32-address] [flags]
```

#### ERC20 Module Queries

##### `query erc20 token-pairs`

Get all registered token pairs.

```bash
appd query erc20 token-pairs [flags]
```

##### `query erc20 token-pair`

Get a specific token pair.

```bash
appd query erc20 token-pair [token-address-or-denom] [flags]
```

##### `query erc20 params`

Get ERC20 module parameters.

```bash
appd query erc20 params [flags]
```

#### Feemarket Module Queries

##### `query feemarket base-fee`

Get the base fee at a given height.

```bash
appd query feemarket base-fee [flags]
```

##### `query feemarket block-gas`

Get the block gas used at a given height.

```bash
appd query feemarket block-gas [flags]
```

##### `query feemarket params`

Get fee market parameters.

```bash
appd query feemarket params [flags]
```

#### Precisebank Module Queries

##### `query precisebank remainder`

Get the remainder amount in the precise bank module.

```bash
appd query precisebank remainder [flags]
```

##### `query precisebank fractional-balance`

Get the fractional balance of an account.

```bash
appd query precisebank fractional-balance [address] [flags]
```

#### Standard Cosmos Queries

##### Bank Module

```bash
# Get account balances
appd query bank balances [address] [flags]

# Get specific denom balance
appd query bank balance [address] [denom] [flags]

# Get total supply
appd query bank total [flags]
```

##### Staking Module

```bash
# Get all validators
appd query staking validators [flags]

# Get delegations for an address
appd query staking delegations [delegator-address] [flags]

# Get unbonding delegations
appd query staking unbonding-delegations [delegator-address] [flags]
```

##### Distribution Module

```bash
# Get rewards
appd query distribution rewards [delegator-address] [validator-address] [flags]

# Get commission
appd query distribution commission [validator-address] [flags]
```

##### Governance Module

```bash
# List all proposals
appd query gov proposals [flags]

# Get specific proposal
appd query gov proposal [proposal-id] [flags]

# Get votes on a proposal
appd query gov votes [proposal-id] [flags]
```

### Transaction Commands

The `tx` command is used to create and broadcast transactions.

#### EVM Transactions

##### `tx evm send`

Send funds between accounts.

```bash
appd tx evm send [from] [to] [amount] [flags]
```

##### `tx evm raw`

Build a Cosmos transaction from a raw Ethereum transaction.

```bash
appd tx evm raw [hex-encoded-tx] [flags]
```

#### ERC20 Transactions

##### `tx erc20 convert-coin`

Convert native Cosmos coins to ERC20 tokens.

```bash
appd tx erc20 convert-coin [amount] [receiver] [flags]
```

##### `tx erc20 convert-erc20`

Convert ERC20 tokens to native Cosmos coins.

```bash
appd tx erc20 convert-erc20 [contract-address] [amount] [receiver] [flags]
```

##### `tx erc20 register-erc20`

Register native ERC20 tokens (governance only).

```bash
appd tx erc20 register-erc20 [contract-address...] [flags]
```

##### `tx erc20 toggle-conversion`

Enable or disable token pair conversion (governance only).

```bash
appd tx erc20 toggle-conversion [token] [flags]
```

#### Standard Cosmos Transactions

##### Bank Transactions

```bash
# Send coins
appd tx bank send [from] [to] [amount] [flags]

# Multi-send
appd tx bank multi-send [from] [to1] [amount1] [to2] [amount2] ... [flags]
```

##### Staking Transactions

```bash
# Create validator
appd tx staking create-validator [flags]

# Delegate
appd tx staking delegate [validator-address] [amount] [flags]

# Unbond
appd tx staking unbond [validator-address] [amount] [flags]

# Redelegate
appd tx staking redelegate [src-validator] [dst-validator] [amount] [flags]
```

##### Governance Transactions

```bash
# Submit proposal
appd tx gov submit-proposal [proposal-type] [flags]

# Vote on proposal
appd tx gov vote [proposal-id] [option] [flags]

# Deposit on proposal
appd tx gov deposit [proposal-id] [amount] [flags]
```

### Advanced Commands

#### `genesis`

Genesis file manipulation commands.

```bash
# Add genesis account
appd genesis add-genesis-account [address] [coins] [flags]

# Collect genesis transactions
appd genesis collect-gentxs [flags]

# Generate genesis transaction
appd genesis gentx [key-name] [amount] [flags]
```

#### `comet`

CometBFT-specific commands.

```bash
# Show node ID
appd comet show-node-id [flags]

# Show validator info
appd comet show-validator [flags]

# Reset blockchain state
appd comet unsafe-reset-all [flags]
```

#### `debug`

Debugging utilities.

```bash
# Get raw bytes for address
appd debug addr [address] [flags]

# Decode raw hex bytes
appd debug raw-bytes [hex] [flags]

# Convert public key
appd debug pubkey [pubkey] [flags]
```

## Examples

### Setting up a new account

```bash
# Create a new account
appd keys add myaccount

# Import an Ethereum private key
appd keys unsafe-import-eth-key myethaccount 0x...

# List all accounts
appd keys list

# Show account details
appd keys show myaccount
```

### Querying blockchain state

```bash
# Get account balance
appd query bank balances cosmos1...

# Get EVM account info
appd query evm account 0x...

# Get ERC20 balance
appd query evm balance-erc20 0xUserAddress 0xTokenAddress

# Get base fee
appd query feemarket base-fee
```

### Sending transactions

```bash
# Send native tokens
appd tx bank send myaccount cosmos1... 100ustake --gas-prices 10ustake

# Send via EVM
appd tx evm send myaccount 0x... 100ustake --gas-prices 10ustake

# Convert coins to ERC20
appd tx erc20 convert-coin 100ustake 0x... --from myaccount
```

### Running a node

```bash
# Initialize node
appd init mynode --chain-id evmos_9001-2

# Start node with JSON-RPC enabled
appd start --json-rpc.enable --json-rpc.api eth,web3,net,txpool,debug

# Get node status
appd status
```

## Configuration

The CLI uses the following configuration structure:

- Configuration directory: `~/.appd/` (or specified by `--home`)
- Key storage: Managed by the keyring backend (os, file, test)
- Node configuration: `~/.appd/config/config.toml`
- App configuration: `~/.appd/config/app.toml`

For more detailed information about specific commands, use the `--help` flag with any command:

```bash
appd [command] --help
appd [command] [subcommand] --help
```