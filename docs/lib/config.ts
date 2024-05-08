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
