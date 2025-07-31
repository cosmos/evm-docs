import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Card from "../components/Card";

function Home() {
  const context = useDocusaurusContext();

  return (
    <Layout title="Homepage" description="Documentation of Cosmos EVM, the canonical EVM solution for building EVM compatible L1s.">
      <main>
        <br />
        <h1 align="center" style={{ fontWeight: "750" }}>
          Cosmos EVM Documentation
        </h1>
        <p align="center" style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto 2rem" }}>
          The canonical EVM solution for Cosmos SDK chains. Build high-performance, 
          IBC-enabled EVM applications with battle-tested infrastructure.
        </p>
        
        
        <section className={styles.features}>
          <div className="container">
            <div className="row cards__container">
              <Card
                to="./develop/smart-contracts/cosmos-sdk-precompiles/ibc-transfer"
                header={{
                  label: "IBC Native",
                }}
                body={{
                  label:
                    "Seamlessly connect to the entire Cosmos ecosystem with built-in IBC support",
                }}
              />

              <Card
                to="./develop/smart-contracts"
                header={{
                  label: "EVM Compatibility",
                }}
                body={{
                  label:
                    "Full Ethereum compatibility - deploy existing Solidity contracts and use familiar tools",
                }}
              />

              <Card
                to="./integrate"
                header={{
                  label: "Cosmos SDK Power",
                }}
                body={{
                  label:
                    "Leverage the full power of Cosmos SDK modules alongside EVM",
                }}
              />

              <Card
                to="./protocol/security"
                header={{
                  label: "Battle-Tested",
                }}
                body={{
                  label: "Based on the proven evmOS codebase with enterprise-grade support",
                }}
              />

              <Card
                to="https://docs.cometbft.com/"
                header={{
                  label: "High Performance",
                }}
                body={{
                  label:
                    "CometBFT consensus delivers fast finality and high throughput",
                }}
              />

              <Card
                to="./develop"
                header={{
                  label: "Developer Friendly",
                }}
                body={{
                  label:
                    "Comprehensive documentation and active community support",
                }}
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
