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
        
        <div style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 2rem" }}>
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Why Cosmos EVM?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
            <div>
              <h3>IBC Native</h3>
              <p>Seamlessly connect to the entire Cosmos ecosystem with built-in IBC support. Automatic ERC20 registration for IBC tokens.</p>
            </div>
            <div>
              <h3>EVM Compatibility</h3>
              <p>Full Ethereum compatibility - deploy existing Solidity contracts and use familiar tools like MetaMask, Hardhat, and Foundry.</p>
            </div>
            <div>
              <h3>Cosmos SDK Power</h3>
              <p>Leverage the full power of Cosmos SDK modules alongside EVM. Build sovereign, customizable blockchains.</p>
            </div>
            <div>
              <h3>Battle-Tested</h3>
              <p>Based on the proven evmOS codebase, maintained by Interchain Labs with enterprise-grade support available.</p>
            </div>
            <div>
              <h3>High Performance</h3>
              <p>CometBFT consensus delivers fast finality and high throughput for your EVM applications.</p>
            </div>
            <div>
              <h3>Developer Friendly</h3>
              <p>Comprehensive documentation, precompiled contracts for Cosmos modules, and active community support.</p>
            </div>
          </div>
        </div>
        
        <section className={styles.features}>
          <div className="container">
            <div className="row cards__container">
              <Card
                to="./protocol"
                header={{
                  label: "IBC Native",
                }}
                body={{
                  label:
                    "Seamlessly connect to the entire Cosmos ecosystem with built-in IBC support",
                }}
              />

              <Card
                to="./protocol"
                header={{
                  label: "EVM Compatibility",
                }}
                body={{
                  label:
                    "Full Ethereum compatibility - deploy existing Solidity contracts and use familiar tools",
                }}
              />

              <Card
                to="./develop/api"
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
                to="https://share-eu1.hsforms.com/2g6yO-PVaRoKj50rUgG4Pjg2e2sca"
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
