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
      {
        text: 'Foundations ',
        url: '/foundations/component-principles',
        on: 'all',
      },
      {
        text: 'Components',
        url: '/components/application/provider',
        on: 'all',
      },
      {
        text: 'Patterns',
        url: '/patterns/layout/admin-master-mark',
        on: 'all',
      },
      { text: 'Releases', url: '/releases/release-notes', on: 'all' },
    ],
  };
};
