import { PanelsTopLeft, Puzzle } from 'lucide-react';
import type { NavSection, ShellConfig } from '../_shared';
import { appShellNav, appShellPages } from '../_shared';

const appShell: NavSection = {
  label: 'App Shell',
  icon: PanelsTopLeft,
  nav: appShellNav,
};

const patterns: NavSection = {
  label: 'Patterns',
  icon: Puzzle,
  nav: [
    { type: 'item', label: 'Filter', slug: 'filter' },
    { type: 'item', label: 'Form', slug: 'form' },
    { type: 'item', label: 'Inventory', slug: 'inventory' },
  ],
};

export const config: ShellConfig = {
  base: '/examples',
  pages: {
    ...appShellPages,
    filter: {
      label: 'Filter',
      docsHref: '/patterns/filter',
      docsLabel: 'Filter Guidelines',
    },
    form: {
      label: 'Form',
      docsHref: '/patterns/form-implementation',
      docsLabel: 'Form Guidelines',
    },
    inventory: { label: 'Inventory' },
  },
  sections: [appShell, patterns],
};
