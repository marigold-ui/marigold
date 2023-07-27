export const siteConfig = {
  navigation: {
    componentGroups: [
      'Applicaiton',
      'Layout',
      'Navigation',
      'Form',
      'Collection',
      'Overlay',
      'Content',
    ],
  },
};

/**
 *
 * content page:
 *  pages/<section>/<page>.mdx
 *
 * component page:
 *  components/<name>/<name>.mdx
 *
 * ->
 *
 * pages/<section>/(<group>/)<page>.mdx
 * pages/<section>/(<group>/)<page>/<page>.mdx
 *
 * pages/introduction/about.mdx
 * pages/components/form/text-field/text-field.mdx
 *
 *
 */

const foo = {
  navigation: [
    {
      name: 'Introduction',
    },
    {
      name: 'Concepts',
    },
    {
      name: 'Components',
      groups: [
        'Applicaiton',
        'Layout',
        'Navigation',
        'Form',
        'Collection',
        'Overlay',
        'Content',
      ],
    },
  ],
};
