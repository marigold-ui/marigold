import type { NavEntry, PageMeta } from './shell-types';

export const appShellNav: NavEntry[] = [
  { type: 'item', label: 'Dashboard', slug: '' },
  { type: 'item', label: 'Analytics', slug: 'analytics' },
  { type: 'separator' },
  {
    type: 'group',
    label: 'Management',
    children: [
      { type: 'item', label: 'Users', slug: 'users' },
      { type: 'item', label: 'Teams', slug: 'teams' },
      { type: 'item', label: 'Billing', slug: 'billing' },
    ],
  },
  {
    type: 'label-group',
    label: 'Settings',
    children: [
      { type: 'item', label: 'General', slug: 'general' },
      { type: 'item', label: 'Security', slug: 'security' },
    ],
  },
];

const appShellDocs = {
  docsHref: '/patterns/app-shell',
  docsLabel: 'App Shell Pattern',
};

export const appShellPages: Record<string, PageMeta> = {
  '': { label: 'Dashboard', ...appShellDocs },
  analytics: { label: 'Analytics', ...appShellDocs },
  users: { label: 'Users', parent: 'Management', ...appShellDocs },
  teams: { label: 'Teams', parent: 'Management', ...appShellDocs },
  billing: { label: 'Billing', parent: 'Management', ...appShellDocs },
  general: { label: 'General', parent: 'Settings', ...appShellDocs },
  security: { label: 'Security', parent: 'Settings', ...appShellDocs },
};
