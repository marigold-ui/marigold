import { people } from '@/lib/data/people';
import type { NavSection, ShellConfig } from '../_shared';
import { getSnapshot } from './_revenue-report/store';

const appShellDocs = {
  docsHref: '/patterns/layout/app-frame',
  docsLabel: 'App Frame Pattern',
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
          docsHref: '/patterns/user-input/forms',
          docsLabel: 'Form Guidelines',
        },
      ],
    },
  ],
};

const reporting: NavSection = {
  label: 'Reporting',
  items: [
    {
      kind: 'Item',
      label: 'Umsatzreport',
      children: [
        {
          kind: 'Item',
          slug: 'revenue-report-flows',
          label: 'Übersicht: Varianten',
          docsHref: '/patterns/layout/app-frame',
          docsLabel: 'App Frame Pattern',
        },
        {
          kind: 'Item',
          slug: 'revenue-report',
          label: 'Variante A: Liste',
          docsHref: '/patterns/layout/app-frame',
          docsLabel: 'App Frame Pattern',
        },
        {
          kind: 'Item',
          slug: 'revenue-report-wizard',
          label: 'Variante B: Assistent',
          docsHref: '/patterns/user-input/forms',
          docsLabel: 'Form Guidelines',
        },
        {
          kind: 'Item',
          slug: 'revenue-report-classic',
          label: 'Variante C: Kombiniert',
          docsHref: '/patterns/user-input/filter',
          docsLabel: 'Filter Guidelines',
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
  sections: [layout, userInput, reporting, other],
  // Label dynamic segments: `users/[id]` with the member's name,
  // `revenue-report*/[id]` with the report's name, `new` with the builder.
  resolveLabel: id => {
    if (id === 'new') return 'Neuer Report';
    return (
      people.find(person => person.id === id)?.name ??
      getSnapshot().reports.find(report => report.id === id)?.name
    );
  },
};
