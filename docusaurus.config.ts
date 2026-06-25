import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Shadow IT',
  tagline: 'Managing the Unseen',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://www.shadowit.com.au',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ShadowITServices', // Usually your GitHub org/user name.
  projectName: 'ShadowIT', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        htmlLang: 'en-AU', // Australian English for an Albury–Wodonga based MSP
      },
    },
  },

  // Load the brand heading font (Raleway) from Google Fonts, with preconnect
  // so it doesn't block render. Avenir (body) is licensed and falls back in CSS.
  stylesheets: [
    {href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800&display=swap', rel: 'stylesheet'},
  ],
  headTags: [
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'}},
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'}},
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ShadowITServices/ShadowIT/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {
        name: 'description',
        content:
          'Shadow IT — proactive cybersecurity and managed IT services for Australian businesses. We manage the unseen so you can focus on growth.',
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      // Title intentionally omitted — logo.png is a full wordmark that already
      // contains the "SHADOWIT" company name, so a text title would duplicate it.
      logo: {
        alt: 'Shadow IT',
        src: 'img/logo.png',
      },
      items: [
        {to: '/', label: 'Home', position: 'left', activeBaseRegex: '^/$'},
        {to: '/about', label: 'About', position: 'left'},
        {to: '/services', label: 'Services', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Services',
          items: [
            {
              label: 'How I work',
              to: '/services',
            },
            {
              label: 'Docs',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'AI Policy',
              to: '/ai-policy',
            },
            {
              label: 'Privacy Policy',
              to: '/privacy-policy',
            },
            {
              label: 'Contact',
              href: 'mailto:hello@shadowit.com.au',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'Website',
              href: 'https://www.shadowit.com.au',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/beaudean/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ShadowITServices/ShadowIT',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Shadow IT. Managing the Unseen.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
