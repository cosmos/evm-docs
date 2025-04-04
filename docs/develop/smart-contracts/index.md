# Smart Contracts

Since the introduction of Ethereum in 2015,
the ability to control digital assets through [smart contracts](https://ethereum.org/en/smart-contracts/)
has attracted a large community of developers
to build decentralized applications on the Ethereum Virtual Machine (EVM).
This community is continuously creating extensive tooling and introducing standards,
which are further increasing the adoption rate of EVM-compatible technology.

Whether you are building new use cases on a Cosmos EVM-enabled chain,
or porting an existing dApp from another EVM-based chain (e.g. Ethereum),
you can easily build and deploy EVM smart contracts to implement the core business logic of your dApp.
**Cosmos EVM is fully compatible with the EVM**,
so it allows you to use the same tools (Solidity, Remix, Oracles, etc.)
and APIs (i.e. Ethereum JSON-RPC) that are available on the EVM.

Leveraging the interoperability of Cosmos chains,
Cosmos EVM enables you to build scalable cross-chain applications within a familiar EVM environment.
Learn about the essential components when building and deploying EVM smart contracts on Cosmos EVM below.

## Build with Solidity

You can develop EVM smart contracts using [Solidity](https://github.com/ethereum/solidity).
Solidity is also used to build smart contracts on Ethereum.
So if you have deployed smart contracts on Ethereum (or any other EVM-compatible chain)
you can use the same contracts on a Cosmos EVM chain.

Since it is the most widely used smart contract programming language in Blockchain,
Solidity comes with well-documented and rich language support.
Head over to our list of Tools and IDE Plugins to help you get started.

### Cosmos EVM Precompiles

EVM precompiles are precompiled contracts that are built into the Ethereum Virtual Machine (EVM).
Each offers specific functionality, that can be used by other smart contracts.
Generally, they are used to perform operations that are either not possible
or would be too expensive to perform with a regular smart contract
implementation, such as hashing, elliptic curve cryptography, and modular exponentiation.

By adding custom EVM precompiles to Ethereum's basic feature set,
Cosmos EVM allows developers to use previously unavailable functionality in smart contracts, like staking and governance operations.
This will allow more complex smart contracts to be built on a Cosmos EVM chain
and further improves the interoperability between Cosmos and Ethereum.

To enable the described functionalities, Cosmos EVM introduces so-called *stateful* precompiled smart contracts,
which can perform a state transition,
as opposed to those offered by the standard Go-Ethereum implementation,
which can only read state information.
This is necessary because an operation like e.g. staking tokens
will ultimately change the chain state.

View a list of available EVM precompiles [here](./list-precompiles.md).

## Deploy with Ethereum JSON-RPC

Cosmos EVM is fully compatible with the [Ethereum JSON-RPC](./../../develop/api/ethereum-json-rpc/) APIs,
allowing you to deploy and interact with smart contracts
and connect with existing Ethereum-compatible web3 tooling.

### Block Explorers

You can use [block explorers](./block-explorers)
to view and debug interactions with your smart contracts deployed on a Cosmos EVM chain.
Block explorers index blocks and their transactions
so that you can search for real-time and historical information about the blockchain,
including data related to blocks, transactions, addresses, and more.
