import path from 'path';

export const CONTENT_PATH = path.join(process.cwd(), 'content');

export const NAVIGATION_CONFIG = {
  order: [
    { name: 'introduction' },
    { name: 'foundation' },
    {
      name: 'components',
      groups: ['Content', 'Layout', 'Forms'],
    },
    { name: 'develop' },
  ],
  links: [
    {
      title: 'Github',
      slug: 'https://github.com/marigold-ui/marigold/',
    },
    {
      title: 'Issues',
      slug: 'https://github.com/marigold-ui/marigold/issues',
    },
    {
      title: 'Changelog',
      slug: 'https://github.com/marigold-ui/marigold/blob/main/packages/components/CHANGELOG.md',
    },
    {
      title: 'Slack Channel',
      slug: 'https://reservix.slack.com/archives/C02727BNZ3J',
    },
  ],
};
