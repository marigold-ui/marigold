import type { NavSection, ShellConfig } from '../_shared';

const appShell: NavSection = {
  label: 'App Shell',
  slugs: ['', 'analytics', 'users', 'teams', 'billing', 'general', 'security'],
  nav: [
    { type: 'item', label: 'Dashboard', href: '/', slug: '' },
    {
      type: 'item',
      label: 'Analytics',
      href: '/analytics',
      slug: 'analytics',
    },
    { type: 'separator' },
    {
      type: 'group',
      label: 'Management',
      children: [
        { type: 'item', label: 'Users', href: '/users', slug: 'users' },
        { type: 'item', label: 'Teams', href: '/teams', slug: 'teams' },
        { type: 'item', label: 'Billing', href: '/billing', slug: 'billing' },
      ],
    },
    {
      type: 'label-group',
      label: 'Settings',
      children: [
        { type: 'item', label: 'General', href: '/general', slug: 'general' },
        {
          type: 'item',
          label: 'Security',
          href: '/security',
          slug: 'security',
        },
      ],
    },
  ],
};

const patterns: NavSection = {
  label: 'Patterns',
  slugs: ['filter', 'form', 'inventory'],
  nav: [
    { type: 'item', label: 'Filter', href: '/filter', slug: 'filter' },
    { type: 'item', label: 'Form', href: '/form', slug: 'form' },
    {
      type: 'item',
      label: 'Inventory',
      href: '/inventory',
      slug: 'inventory',
    },
  ],
};

export const config: ShellConfig = {
  base: '/examples',
  pages: {
    '': { label: 'Dashboard', docsHref: '/patterns/app-shell' },
    analytics: { label: 'Analytics', docsHref: '/patterns/app-shell' },
    users: {
      label: 'Users',
      parent: 'Management',
      docsHref: '/patterns/app-shell',
    },
    teams: {
      label: 'Teams',
      parent: 'Management',
      docsHref: '/patterns/app-shell',
    },
    billing: {
      label: 'Billing',
      parent: 'Management',
      docsHref: '/patterns/app-shell',
    },
    general: {
      label: 'General',
      parent: 'Settings',
      docsHref: '/patterns/app-shell',
    },
    security: {
      label: 'Security',
      parent: 'Settings',
      docsHref: '/patterns/app-shell',
    },
    filter: { label: 'Filter', docsHref: '/patterns/filter' },
    form: { label: 'Form', docsHref: '/patterns/forms' },
    inventory: { label: 'Inventory' },
  },
  sections: [appShell, patterns],
};
