# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official Cosmos EVM documentation site built with Docusaurus v2. The documentation is organized into three main sections:
- **Integrate**: Guide for integrating Cosmos EVM into Cosmos SDK chains
- **Develop**: Developer documentation for building dApps on Cosmos EVM  
- **Protocol**: Technical protocol documentation and concepts

## Common Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run start

# Build production site
npm run build

# Serve built site locally
npm run serve

# Clear cache (if encountering build issues)
npm run clear
```

Note: This project does not have configured lint or test commands.

## Architecture & Structure

The documentation follows Docusaurus conventions with these key directories:

- `/docs/` - Markdown documentation content organized by section (integrate/, develop/, protocol/)
- `/src/components/` - Reusable React components (Accordion, Card, Collapse, etc.)
- `/src/css/` - Global styles and Tailwind CSS customizations
- `/static/` - Static assets including fonts and images

When editing documentation:
1. Markdown files in `/docs/` are automatically routed based on their path
2. Each section has its own sidebar configuration in `sidebars.js`
3. Front matter in markdown files controls metadata and navigation

## Key Configuration Values

From `docusaurus.config.js`:
- Project name: "Cosmos EVM"
- Chain IDs: 9001 (mainnet), 9000 (testnet)
- Binary: evmd
- Tokens: STAKE (mainnet), tSTAKE (testnet)

## Development Guidelines

1. **Documentation Changes**: Edit markdown files directly in the appropriate `/docs/` subdirectory
2. **Component Changes**: React components are in `/src/components/` - no TypeScript, use plain JavaScript/JSX
3. **Styling**: Use Tailwind CSS utilities where possible, custom CSS goes in `/src/css/`
4. **Search**: Powered by Algolia DocSearch - major structural changes may require re-indexing

## Content Writing Standards

Per CONTRIBUTING.md, when writing documentation:
- Consider the audience (developers, validators, protocol contributors)
- Provide clear explanations with supporting links
- Use rich media (images, diagrams) to illustrate concepts
- Cross-link related content across sections
- Place content in the appropriate section based on audience

## Important Notes

- This is a fork of evmOS documentation maintained by Interchain Labs
- The team is actively updating stale references from the migration
- Issues should be reported to https://github.com/cosmos/evm/issues
- The codebase for Cosmos EVM itself is at https://github.com/cosmos/evm