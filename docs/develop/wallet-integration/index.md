# Wallet Integration

Wallet integration is an essential aspect of dApp development that allows users to securely interact with blockchain-based
applications. Here are some key points from various sources on wallet integration in dApp development:

- The integration implementation checklist for dApp developers consists of three categories: frontend features,
transactions and wallet interactions, and more. Developers enabling transactions on their dApp have to determine
the wallet type of the user, create the transaction, request signatures from the corresponding wallet, and finally broadcast.

- Leverage Metamask and any other EVM-compatible wallet, Keplr, Leap, Ledger, WalletConnect and more with Cosmos EVM.

- Head over to our [Cosmos EVM Client Integrations](./../../develop/tools/client-integrations)
  to leverage our Typescript or Python libraries.

| Wallet     | Support            | URL                                                             |
| ---------- | --------------     | --------------------------------------------------------------- |
| Keplr      | `cosmos, ethereum` | [Extension](https://chromewebstore.google.com/detail/nkbihfbeogaeaoehlefnkodbefgpgknn) |
| Metamask   | `ethereum`         | [Extension](https://chromewebstore.google.com/detail/dmkamcknogkgcdfhhbddcghachkejeap) |
| Rabby      | `ethereum`         | [Extension](https://chromewebstore.google.com/detail/acmacodkjbdgmoleebolmdjonilkdbch) |

## Gas & Estimation

When developing and running dApps on Cosmos EVM, the wallet configuration will attempt to calculate the correct gas amount
for user's to sign. [Gas and Fees](./../../../protocol/concepts/gas-and-fees) breaks down these concepts in more detail.
We have a module called [feemarket](./../../../protocol/modules/feemarket#concepts) that describes our module implementation
of transaction prioritization since prior to Cosmos SDK 0.46 it did not have such implementation.
