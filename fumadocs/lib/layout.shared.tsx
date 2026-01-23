import { SiteLogo } from '@/app/_components/SiteLogo';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions = (): BaseLayoutProps => {
  return {
    nav: {
      title: <SiteLogo />,
    },
  };
};
