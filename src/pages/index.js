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
          Welcome to Cosmos EVM Docs
        </h1>
        <section className={styles.features}>
          <div className="container">
            <div className="row cards__container">
              <Card
                to="./integrate"
                header={{
                  label: "Integrate Cosmos EVM",
                }}
                body={{
                  label:
                    "Getting started on Cosmos EVM with your chain",
                }}
              />

              <Card
                to="./protocol"
                header={{
                  label: "Learn about Cosmos EVM",
                }}
                body={{
                  label:
                    "Discover why Cosmos EVM is the flagship EVM on the Cosmos Ecosystem",
                }}
              />

              <Card
                to="./develop/api"
                header={{
                  label: "View Cosmos EVM APIs",
                }}
                body={{
                  label:
                    "Access low-level protocol interfaces to build your custom dapp",
                }}
              />

              <Card
                to="./develop/smart-contracts"
                header={{
                  label: "Launch dApp on a Cosmos EVM chain",
                }}
                body={{
                  label:
                    "Learn everything you need to deploy an EVM-compatible smart contract",
                }}
              />

              <Card
                to="./protocol/security"
                header={{
                  label: "Security on Cosmos EVM",
                }}
                body={{
                  label: "Learn about our Security Policy",
                }}
              />

              <Card
                to="https://github.com/cosmos/"
                header={{
                  label: "Contribute to Cosmos",
                }}
                body={{
                  label:
                    "Contribute to the thriving ecosystem of Cosmos.",
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
