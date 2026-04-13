import { PanelsTopLeft, Puzzle } from 'lucide-react';
import type { NavSection, ShellConfig } from '../_shared';

const appShellDocs = {
  docsHref: '/patterns/app-shell',
  docsLabel: 'App Shell Pattern',
} as const;

const appShell: NavSection = {
  label: 'App Shell',
  icon: PanelsTopLeft,
  items: [
    { kind: 'Item', slug: '', label: 'Dashboard', ...appShellDocs },
    { kind: 'Item', slug: 'analytics', label: 'Analytics', ...appShellDocs },
    { kind: 'Separator' },
    {
      kind: 'Item',
      label: 'Management',
      children: [
        { kind: 'Item', slug: 'users', label: 'Users', ...appShellDocs },
        { kind: 'Item', slug: 'teams', label: 'Teams', ...appShellDocs },
        { kind: 'Item', slug: 'billing', label: 'Billing', ...appShellDocs },
      ],
    },
    { kind: 'GroupLabel', label: 'Settings' },
    { kind: 'Item', slug: 'general', label: 'General', ...appShellDocs },
    { kind: 'Item', slug: 'security', label: 'Security', ...appShellDocs },
  ],
};

const patterns: NavSection = {
  label: 'Patterns',
  icon: Puzzle,
  items: [
    {
      kind: 'Item',
      slug: 'filter',
      label: 'Filter',
      docsHref: '/patterns/filter',
      docsLabel: 'Filter Guidelines',
    },
    {
      kind: 'Item',
      slug: 'form',
      label: 'Form',
      docsHref: '/patterns/form-implementation',
      docsLabel: 'Form Guidelines',
    },
    { kind: 'Item', slug: 'inventory', label: 'Inventory' },
  ],
};

export const config: ShellConfig = {
  base: '/examples',
  sections: [appShell, patterns],
};
