import path from 'path';

export const CONTENT_PATH = path.join(process.cwd(), 'content');

export const NAVIGATION_CONFIG = {
  order: [
    { name: 'introduction' },
    { name: 'foundation' },
    {
      name: 'components',
      groups: [
        'Layout',
        'Content',
        'Forms',
        'Collections',
        'Overlay',
        'Application',
      ],
    },
    { name: 'develop' },
  ],
  links: [
    {
      title: 'Github',
      url: 'https://github.com/marigold-ui/marigold/',
    },
    {
      title: 'Issues',
      url: 'https://github.com/marigold-ui/marigold/issues',
    },
    {
      title: 'Changelog',
      url: 'https://github.com/marigold-ui/marigold/blob/main/packages/components/CHANGELOG.md',
    },
    {
      title: 'Slack Channel',
      url: 'https://reservix.slack.com/archives/C02727BNZ3J',
    },
  ],
};
