import { PanelsTopLeft, Puzzle } from 'lucide-react';
import type { NavSection, ShellConfig } from '../_shared';
import { appShellNav, appShellPages } from '../_shared';

const appShell: NavSection = {
  label: 'App Shell',
  icon: PanelsTopLeft,
  nav: appShellNav,
  pages: appShellPages,
};

const patterns: NavSection = {
  label: 'Patterns',
  icon: Puzzle,
  nav: ({ item }) => (
    <>
      {item('filter', 'Filter')}
      {item('form', 'Form')}
      {item('inventory', 'Inventory')}
    </>
  ),
  pages: {
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
};

export const config: ShellConfig = {
  base: '/examples',
  sections: [appShell, patterns],
};
