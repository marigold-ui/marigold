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
        on: 'nav',
      },
      { text: 'Foundations ', url: '/foundations/accessibility', on: 'nav' },
      {
        text: 'Components',
        url: '/components/application/provider',
        on: 'nav',
      },
      { text: 'Patterns', url: '/patterns/admin-master-mark', on: 'nav' },
      { text: 'Releases', url: '/releases/blog-overview', on: 'nav' },
    ],
  };
};
