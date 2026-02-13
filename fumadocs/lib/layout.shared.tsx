import { SiteLogo } from '@/app/_components/SiteLogo';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions = (): BaseLayoutProps => {
  return {
    nav: {
      title: <SiteLogo />,
    },

    links: [
      {
        text: 'Getting Started',
        url: '/getting-started/installation',
        on: 'all',
      },
      { text: 'Foundations ', url: '/foundations/accessibility', on: 'all' },
      {
        text: 'Components',
        url: '/components/application/provider',
        on: 'all',
      },
      { text: 'Patterns', url: '/patterns/admin-master-mark', on: 'all' },
      { text: 'Releases', url: '/releases/blog-overview', on: 'all' },
    ],
  };
};
