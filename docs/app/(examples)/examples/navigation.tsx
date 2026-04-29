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
      label: 'Form',
      children: [
        {
          kind: 'Item',
          slug: 'event-form',
          label: 'Event Form',
          docsHref: '/patterns/user-input/forms',
          docsLabel: 'Form Guidelines',
        },
        {
          kind: 'Item',
          slug: 'settings-form',
          label: 'Settings Form',
          docsHref: '/patterns/user-input/forms',
          docsLabel: 'Form Guidelines',
        },
        {
          kind: 'Item',
          slug: 'auto-save-settings',
          label: 'Auto-Save Settings',
          docsHref: '/components/form/switch#settings-and-preference',
          docsLabel: 'Switch · Settings variant',
        },
      ],
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
