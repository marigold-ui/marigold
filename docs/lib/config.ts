// Env
// ---------------
export const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

// Config
// ---------------
export const siteConfig = {
  version: process.env.version,
  defaultTheme: 'core',
  navigation: [
    {
      name: 'Introduction',
      slug: 'introduction',
    },
    {
      name: 'Concepts',
      slug: 'concepts',
    },
    {
      name: 'Components',
      slug: 'components',
      subsections: [
        {
          name: 'Application',
          slug: 'application',
        },
        {
          name: 'Layout',
          slug: 'layout',
        },
        {
          name: 'Form',
          slug: 'form',
        },
        {
          name: 'Collection',
          slug: 'collection',
        },
        {
          name: 'Navigation',
          slug: 'navigation',
        },
        {
          name: 'Overlay',
          slug: 'overlay',
        },
        {
          name: 'Content',
          slug: 'content',
        },
        {
          name: 'Formatters',
          slug: 'formatters',
        },
        {
          name: 'Hooks and Utils',
          slug: 'hooks-and-utils',
        },
      ],
    },
    {
      name: 'Patterns',
      slug: 'patterns',
    },
    {
      name: 'Recipes',
      slug: 'recipes',
    },
    {
      name: 'Develop',
      slug: 'develop',
    },
  ],
} as const;

export const links = [
  {
    name: 'Links',
    items: [
      {
        name: 'Slack',
        href: 'https://reservix.slack.com/archives/C02727BNZ3J',
        keywords: ['help'],
      },
      {
        name: 'Jira',
        href: 'https://reservix.atlassian.net/jira/software/projects/DST/boards/134',
      },
      {
        name: 'Figma Core Kit',
        href: 'https://www.figma.com/design/NbTUW9zk15nN8idlfsEttS/%F0%9F%8C%BC-Marigold-CORE?t=VfTLYo5foFEjRxFY-0',
        keywords: ['design'],
      },
      {
        name: 'Support Center',
        href: 'https://reservix.atlassian.net/servicedesk/customer/portal/77',
        keywords: ['help'],
      },
      {
        name: 'Storybook',
        href: 'https://marigold-latest.vercel.app/?path=/story/components-accordion--basic',
      },
      {
        name: 'Marigold Playground',
        href: 'https://stackblitz.com/edit/github-v1evcv?file=src%2FApp.tsx',
        keywords: ['playground', 'starter', 'stackblitz'],
      },
      {
        name: 'Code Repository',
        href: 'https://github.com/marigold-ui/marigold',
        keywords: ['code', 'github'],
      },
    ],
  },
];

export const themeswitch = [
  {
    name: 'Theme Switch',
    items: [
      {
        name: 'Switch to Core Theme',
        theme: 'core',
      },
      {
        name: 'Switch to B2B Theme',
        theme: 'b2b',
      },
    ],
  },
];
