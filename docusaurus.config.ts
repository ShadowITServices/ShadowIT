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

  // Explicit rather than inferred. The live URLs already carry a trailing slash
  // (GitHub Pages redirects /about to /about/), so pinning this keeps every
  // existing link and search-engine result valid through the move to Cloudflare
  // Pages, which resolves trailing slashes differently by default.
  trailingSlash: true,

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
          // Exclude the leftover default Docusaurus tutorial scaffolding from the
          // build entirely — no routes/URLs and not indexed by search. The files
          // stay in the repo for reference. The first four globs preserve
          // Docusaurus's default exclusions (overriding `exclude` replaces them).
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            'tutorial-basics/**',
            'tutorial-extras/**',
          ],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Offline/local full-text search (static-hosting friendly; no backend/API key).
  // The navbar search box is positioned explicitly via the {type: 'search'} item
  // below, so it sits to the left of the colour-mode toggle.
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
      },
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
        // Left group, in reading order: Home | About | Study | Docs | Tools.
        //
        // Dropdowns open on hover on desktop — the theme adds
        // `dropdown--hoverable`, so no custom CSS is needed — and render as
        // collapsible sections on mobile. `activeBasePath` keeps the parent
        // highlighted across every page beneath it.
        {to: '/', label: 'Home', position: 'left', activeBaseRegex: '^/$'},
        {to: '/about', label: 'About', position: 'left'},
        {
          // Unlike Tools, Study has a real index page listing the programs, so
          // the parent label links to it rather than being inert.
          type: 'dropdown',
          label: 'Study',
          to: '/study',
          activeBasePath: '/study',
          position: 'left',
          items: [{to: '/study/AZ-104', label: 'AZ-104: Azure Administrator'}],
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          // No /tools index page exists, so this parent is a plain label.
          type: 'dropdown',
          label: 'Tools',
          activeBasePath: '/tools',
          position: 'left',
          items: [
            {to: '/tools/licensing', label: 'Microsoft Licensing'},
            {to: '/tools/copilot', label: 'Copilot Estimator'},
            {to: '/tools/chrome-extension', label: 'Chrome Extension'},
          ],
        },
        // Right-hand group, rendered in declaration order, with the colour-mode
        // toggle appended after them by the theme:
        //
        //   Remote · [search] · Private Site · [theme toggle]
        //
        // Both are separate hosts behind Cloudflare Access, not part of this
        // build. The `navbar-icon-link--*` classes swap the theme's generic
        // external-link arrow for an icon that says what the destination is —
        // a monitor for the remote session, a padlock for the private site.
        // See src/css/custom.css.
        {
          href: 'https://remote.shadowit.com.au/',
          label: 'Remote',
          position: 'right',
          className: 'navbar-icon-link navbar-icon-link--monitor',
        },
        {type: 'search', position: 'right'},
        {
          href: 'https://vault.shadowit.com.au/',
          label: 'Private Site',
          position: 'right',
          className: 'navbar-icon-link navbar-icon-link--lock',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Site Map',
          items: [
            {
              label: 'About',
              to: '/about',
            },
            {
              // The index listing the programs, not a single program — the
              // navbar dropdown is where you pick one.
              label: 'Study',
              to: '/study',
            },
            {
              label: 'Docs',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Tools',
          items: [
            {
              label: 'Microsoft Licensing',
              to: '/tools/licensing',
            },
            {
              label: 'Copilot Estimator',
              to: '/tools/copilot',
            },
            {
              label: 'Chrome Extension',
              to: '/tools/chrome-extension',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'AI Usage Policy',
              to: '/ai-policy',
            },
            {
              label: 'Privacy Policy',
              to: '/privacy-policy',
            },
            {
              label: 'Extension Privacy Policy',
              to: '/extension-privacy-policy',
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
              label: 'Contact',
              href: 'mailto:hello@shadowit.com.au',
            },
          ],
        },
        {
          // The two access-controlled hosts, mirroring the navbar. Both ask
          // for a sign-in; neither is reachable without one.
          title: 'Shortcuts',
          items: [
            {
              label: 'Remote',
              href: 'https://remote.shadowit.com.au/',
            },
            {
              label: 'Private Site',
              href: 'https://vault.shadowit.com.au/',
            },
          ],
        },
      ],
      copyright: `Copyright © 2023–${new Date().getFullYear()} Shadow IT.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
