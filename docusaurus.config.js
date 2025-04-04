// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

function defineSection(section, options = {}) {
  return [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      path: `docs/${section}`,
      routeBasePath: section,
      id: section,
      sidebarPath: require.resolve('./sidebars.js'),
      breadcrumbs: true,
      editUrl: 'https://github.com/cosmos/evm-docs/tree/main/',
      ...options,
    }),
  ];
}

const SECTIONS = [
  defineSection('integrate'),
  defineSection('develop'),
  defineSection('protocol'),
//  defineSection('validate'),
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cosmos EVM',
  tagline: 'Develop on Cosmos EVM',
  url: 'https://evm.cosmos.network/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cosmos', // Usually your GitHub org/user name.
  projectName: 'Docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    project: {
      name: "Cosmos EVM",
      denom: "stake",
      ticker: "STAKE",
      binary: "evmd",
      testnet_denom: "tStake",
      testnet_ticker: "tSTAKE",
      rpc_url: "",
      rpc_url_testnet: "",
      rpc_url_local: "http://localhost:8545/",
      chain_id: "9001",
      testnet_chain_id: "9000",
      latest_version: "v16.0.2",
      mainnet_version: "v16.0.0",
      testnet_version: "v16.0.0-rc5",
      version_number: "2",
      testnet_version_number: "4",
      testnet_evm_explorer_url: "https://testnet.escan.live",
      evm_explorer_url: "https://escan.live",
      testnet_cosmos_explorer_url: "",
      cosmos_explorer_url: "",
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs/home',
          // routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-3JSJBBPS3L',
          anonymizeIP: false,
        },
      }),
    ],
  ],
  plugins: [
    ...SECTIONS,
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 80,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Cosmos EVM',
        logo: {
          href: '/',
          alt: 'Cosmos EVM',
          src: 'img/cosmos-evm.svg',
        },
        items: [
          {
            position: 'left',
            label: 'Integrate',
            to: '/integrate',
          },
          {
            position: 'left',
            label: 'Develop',
            to: '/develop',
          },
          {
            position: 'left',
            label: 'Protocol',
            to: '/protocol',
          },
//          {
//            position: 'left',
//            label: 'Validate',
//            to: '/validate',
//          },
          {
            position: 'right',
            label: 'Tools',
            to: '/develop/tools',
          },
          {
            position: 'right',
            label: 'Cosmos',
            to: 'https://cosmos.network/',
          },
          {
            href: 'https://github.com/cosmos/evm/',
            className: 'pseudo-icon github-icon',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Build a Dapp',
                to: '/develop/smart-contracts',
              },
              {
                label: 'Visit Cosmos',
                to: 'https://cosmos.network/',
              },
       //       {
   //             label: 'Become a Validator',
      //          to: '/validate',
        //     },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Telegram',
                href: 'https://t.me/cosmostechstack',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/interchain',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/cosmos',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://blog.cosmos.network/',
              },
              {
                label: 'Cosmos GitHub',
                href: 'https://github.com/Cosmos',
              },
            ],
          },
        ],
        copyright: `Cosmos EVM is a fork of evmOS, maintained by Interchain Labs. © ${new Date().getFullYear()} All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      metadata: [
        {
          name: "Cosmos EVM Docs", 
          content: "Official Cosmos EVM Docs, the native EVM implementation of Cosmos."
        },
        {
          name: "author",
          content: "The Interchain Labs Core Team @interchain_io"
        },
        {
          name: "keywords",
          content: "EMM, cross-chain, Cosmos SDK, IBC, fast-finality, native, cross-chain applications, EVM on Cosmos"
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0"
        }
      ],
      algolia: {
        // The application ID provided by Algolia
        appId: 'IEET1JIXIY',
  
        // Public API key: it is safe to commit it
        apiKey: '9278938f3473a22479c18c8079e2e6b5',
  
        indexName: 'cosmosevmdocs',
  
        contextualSearch: true,
        searchParameters: {},
      },
    }),
};

module.exports = config;
