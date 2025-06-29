# Wallet Integration

Wallet integration is an essential aspect of dApp development that allows users to securely interact with blockchain-based applications.

## EVM Wallet Compatibility

**Any standard EVM wallet works out of the box with Cosmos EVM chains.** This includes popular wallets like MetaMask, Rabby, WalletConnect, and any other wallet that supports Ethereum and EVM-compatible chains. No special configuration or custom integration is required - simply add your chain's RPC endpoint and chain ID to any EVM wallet.

### Key Integration Points

- **Standard EVM RPC**: Cosmos EVM exposes the standard Ethereum JSON-RPC API, ensuring compatibility with all EVM wallets
- **EIP-1559 Support**: Full support for EIP-1559 dynamic fee transactions, enabling automatic gas estimation
- **Address Format**: Uses standard Ethereum addresses (0x format) for EVM transactions
- **Transaction Types**: Supports all standard Ethereum transaction types including legacy and EIP-1559 transactions

## Wallet Support

| Wallet     | Type               | Notes                                                           |
| ---------- | ------------------ | --------------------------------------------------------------- |
| MetaMask   | EVM                | Works out of the box - just add network RPC                    |
| Rabby      | EVM                | Works out of the box - just add network RPC                    |
| WalletConnect | EVM             | Standard WalletConnect integration works                        |
| Keplr      | Cosmos + EVM       | Supports both Cosmos and Ethereum transaction formats           |
| Leap       | Cosmos + EVM       | Supports both Cosmos and Ethereum transaction formats           |
| Ledger     | Hardware           | Compatible via MetaMask or other wallet interfaces              |

## Client Libraries

For programmatic wallet integration, check out our [Client Integrations](./../../develop/tools/client-integrations) which provide TypeScript and Python libraries for interacting with Cosmos EVM chains.

## Quick Start

To add a Cosmos EVM chain to MetaMask or any EVM wallet:

1. Open your wallet and navigate to "Add Network"
2. Enter the following details:
   - **Network Name**: Your chain name
   - **RPC URL**: Your chain's JSON-RPC endpoint (port 8545)
   - **Chain ID**: Your EVM chain ID (integer)
   - **Currency Symbol**: Your native token symbol
   - **Block Explorer URL**: (optional) Your chain's block explorer

That's it! Your wallet is now ready to interact with the Cosmos EVM chain.
