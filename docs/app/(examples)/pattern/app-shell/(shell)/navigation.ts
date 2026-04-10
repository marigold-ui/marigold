import type { ShellConfig } from '../../../_shared';
import { appShellNav, appShellPages } from '../../../_shared';

export const config: ShellConfig = {
  base: '/pattern/app-shell',
  pages: appShellPages,
  sections: [
    {
      label: 'App Shell',
      nav: appShellNav,
    },
  ],
};
