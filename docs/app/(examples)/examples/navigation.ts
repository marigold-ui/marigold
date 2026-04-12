import { PanelsTopLeft, Puzzle } from 'lucide-react';
import type { NavSection, ShellConfig } from '../_shared';
import { appShellNav, appShellPages } from '../_shared';

const appShell: NavSection = {
  label: 'App Shell',
  icon: PanelsTopLeft,
  nav: appShellNav,
  docsHref: '/patterns/app-shell',
};

const patterns: NavSection = {
  label: 'Patterns',
  icon: Puzzle,
  nav: [
    { type: 'item', label: 'Filter', slug: 'filter' },
    { type: 'item', label: 'Form', slug: 'form' },
    { type: 'item', label: 'Inventory', slug: 'inventory' },
  ],
  docsHref: '/',
};

export const config: ShellConfig = {
  base: '/examples',
  pages: {
    ...appShellPages,
    filter: { label: 'Filter' },
    form: { label: 'Form' },
    inventory: { label: 'Inventory' },
  },
  sections: [appShell, patterns],
};
