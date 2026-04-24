import type { NavSection, ShellConfig } from '../_shared';

const appShellDocs = {
  docsHref: '/patterns/layout/app-shell',
  docsLabel: 'App Shell Pattern',
} as const;

const layout: NavSection = {
  label: 'Layout',
  items: [
    {
      kind: 'Item',
      label: 'App Shell',
      children: [
        { kind: 'Item', slug: '', label: 'Dashboard', ...appShellDocs },
        {
          kind: 'Item',
          slug: 'analytics',
          label: 'Analytics',
          ...appShellDocs,
        },
        { kind: 'Separator' },
        {
          kind: 'Item',
          label: 'Management',
          children: [
            { kind: 'Item', slug: 'users', label: 'Users', ...appShellDocs },
            { kind: 'Item', slug: 'teams', label: 'Teams', ...appShellDocs },
            {
              kind: 'Item',
              slug: 'billing',
              label: 'Billing',
              ...appShellDocs,
            },
          ],
        },
        { kind: 'GroupLabel', label: 'Settings' },
        { kind: 'Item', slug: 'general', label: 'General', ...appShellDocs },
        {
          kind: 'Item',
          slug: 'security',
          label: 'Security',
          ...appShellDocs,
        },
      ],
    },
  ],
};

const userInput: NavSection = {
  label: 'User Input',
  items: [
    {
      kind: 'Item',
      slug: 'filter',
      label: 'Filter',
      docsHref: '/patterns/user-input/filter',
      docsLabel: 'Filter Guidelines',
    },
    {
      kind: 'Item',
      slug: 'form',
      label: 'Form',
      docsHref: '/patterns/user-input/filter',
      docsLabel: 'Form Guidelines',
    },
    {
      kind: 'Item',
      slug: 'data-management',
      label: 'Data Management',
    },
  ],
};

const other: NavSection = {
  label: 'Other',
  items: [{ kind: 'Item', slug: 'inventory', label: 'Inventory' }],
};

export const config: ShellConfig = {
  base: '/examples',
  sections: [layout, userInput, other],
};
