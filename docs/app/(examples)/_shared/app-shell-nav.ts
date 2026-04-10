import type { NavEntry } from './shell-types';

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

export const appShellPages: Record<string, { label: string; parent?: string }> =
  {
    '': { label: 'Dashboard' },
    analytics: { label: 'Analytics' },
    users: { label: 'Users', parent: 'Management' },
    teams: { label: 'Teams', parent: 'Management' },
    billing: { label: 'Billing', parent: 'Management' },
    general: { label: 'General', parent: 'Settings' },
    security: { label: 'Security', parent: 'Settings' },
  };
