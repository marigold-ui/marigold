import type { ShellConfig } from '../../../_shared';

export const config: ShellConfig = {
  base: '/pattern/app-shell',
  pages: {
    '': { label: 'Dashboard' },
    analytics: { label: 'Analytics' },
    users: { label: 'Users', parent: 'Management' },
    teams: { label: 'Teams', parent: 'Management' },
    billing: { label: 'Billing', parent: 'Management' },
    general: { label: 'General', parent: 'Settings' },
    security: { label: 'Security', parent: 'Settings' },
  },
  sections: [
    {
      label: 'App Shell',
      slugs: [
        '',
        'analytics',
        'users',
        'teams',
        'billing',
        'general',
        'security',
      ],
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
            {
              type: 'item',
              label: 'Billing',
              href: '/billing',
              slug: 'billing',
            },
          ],
        },
        {
          type: 'label-group',
          label: 'Settings',
          children: [
            {
              type: 'item',
              label: 'General',
              href: '/general',
              slug: 'general',
            },
            {
              type: 'item',
              label: 'Security',
              href: '/security',
              slug: 'security',
            },
          ],
        },
      ],
    },
  ],
};
