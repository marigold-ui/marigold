import { people } from '@/lib/data/people';
import type { NavNode, NavSection, ShellConfig } from '../_shared';

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

const other: NavSection = {
  label: 'Other',
  items: [{ kind: 'Item', slug: 'inventory', label: 'Inventory' }],
};

export const config: ShellConfig = {
  base: '/examples',
  sections: [layout, userInput, other],
  // Label the dynamic `users/[id]` segment with the member's name.
  resolveLabel: id => people.find(person => person.id === id)?.name,
};

// Flatten the nav tree into the set of *standalone* example demos for the docs
// cmdk search. Only standalone demos are surfaced — not the internal screens of
// a larger demo. GroupLabels and Separators are not routes, so we skip them.
//
// A group with an index child (empty slug) is a single self-contained app
// (e.g. "App Shell", whose Users/Billing/… screens are internal navigation, not
// standalone examples): we collapse it to one entry pointing at its landing. A
// group without an index is just a sidebar grouping (e.g. "Form"), so we recurse
// and surface each child as its own demo.
const collectDemos = (
  items: NavNode[],
  base: string
): { name: string; url: string }[] =>
  items.flatMap(item => {
    if (item.kind !== 'Item') return [];
    if (item.children) {
      const isSelfContainedApp = item.children.some(
        child => child.kind === 'Item' && !child.children && child.slug === ''
      );
      return isSelfContainedApp
        ? [{ name: item.label, url: base }]
        : collectDemos(item.children, base);
    }
    return [
      { name: item.label, url: item.slug ? `${base}/${item.slug}` : base },
    ];
  });

/** All standalone example demos as `{ name, url }` entries from the nav config. */
export const examplePages = (): { name: string; url: string }[] =>
  config.sections.flatMap(section => collectDemos(section.items, config.base));
