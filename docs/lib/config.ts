export const siteConfig = {
  version: process.env.version,
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
      name: 'Recipes',
      slug: 'recipes',
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
          name: 'Navigation',
          slug: 'navigation',
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
          name: 'Overlay',
          slug: 'overlay',
        },
        {
          name: 'Content',
          slug: 'content',
        },
      ],
    },
    {
      name: 'Hooks and Utils',
      slug: 'hooks-and-utils',
    },
    {
      name: 'Develop',
      slug: 'develop',
    },
  ],
};
