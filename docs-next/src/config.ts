import path from 'path';

export const CONTENT_PATH = path.join(process.cwd(), 'content');

export const siteMetaData = {
  category: ['introduction', 'foundation', 'components', 'develop'],
  groups: ['Layout', 'Content', 'Forms'],
};

export const navigationLinks = [
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
];
