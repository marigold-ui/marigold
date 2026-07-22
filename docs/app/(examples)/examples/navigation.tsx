import { people } from '@/lib/data/people';
import {
  ClipboardList,
  LayoutDashboard,
  ListChecks,
  ListFilter,
  Package,
} from 'lucide-react';
import type { NavNode, RailTile, ShellConfig } from '../_shared';

const appShellDocs = {
  docsHref: '/patterns/layout/app-frame',
  docsLabel: 'App Frame Pattern',
} as const;

// The App Shell demo is a self-contained app: its screens are the panel's
// sub-navigation, not standalone examples.
const appShellItems: NavNode[] = [
  { kind: 'Item', slug: '', label: 'Dashboard', ...appShellDocs },
  { kind: 'Item', slug: 'analytics', label: 'Analytics', ...appShellDocs },
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
];

const formDocs = {
  docsHref: '/patterns/user-input/forms',
  docsLabel: 'Form Guidelines',
} as const;

const formItems: NavNode[] = [
  { kind: 'Item', slug: 'event-form', label: 'Event Form', ...formDocs },
  { kind: 'Item', slug: 'settings-form', label: 'Settings Form', ...formDocs },
  {
    kind: 'Item',
    slug: 'auto-save-settings',
    label: 'Auto-Save Settings',
    ...formDocs,
  },
];

const tiles: RailTile[] = [
  {
    kind: 'section',
    id: 'app-shell',
    label: 'App Shell',
    icon: <LayoutDashboard />,
    items: appShellItems,
  },
  {
    kind: 'link',
    id: 'filter',
    label: 'Filter',
    icon: <ListFilter />,
    slug: 'filter',
    docsHref: '/patterns/user-input/filter',
    docsLabel: 'Filter Guidelines',
  },
  {
    kind: 'link',
    id: 'bulk-actions',
    label: 'Bulk Actions',
    icon: <ListChecks />,
    slug: 'bulk-actions',
    docsHref: '/patterns/user-input/bulk-actions',
    docsLabel: 'Bulk Actions Guidelines',
  },
  {
    kind: 'section',
    id: 'forms',
    label: 'Forms',
    icon: <ClipboardList />,
    items: formItems,
  },
  {
    kind: 'link',
    id: 'inventory',
    label: 'Inventory',
    icon: <Package />,
    slug: 'inventory',
  },
];

export const config: ShellConfig = {
  base: '/examples',
  tiles,
  // Label the dynamic `users/[id]` segment with the member's name.
  resolveLabel: id => people.find(person => person.id === id)?.name,
};

// Flatten a section's nav tree into demo entries. Plain groupings ("Management")
// are not routes, so we recurse; GroupLabels and Separators are skipped.
const collectDemos = (
  items: NavNode[],
  base: string
): { name: string; url: string }[] =>
  items.flatMap(item => {
    if (item.kind !== 'Item') return [];
    if (item.children) return collectDemos(item.children, base);
    return [
      { name: item.label, url: item.slug ? `${base}/${item.slug}` : base },
    ];
  });

/**
 * All standalone example demos as `{ name, url }` entries for the docs cmdk
 * search. Only standalone demos are surfaced — not the internal screens of a
 * larger demo.
 *
 * A link tile is one demo. A section tile with an index leaf (empty slug) is a
 * single self-contained app (e.g. "App Shell", whose Users/Billing/… screens
 * are internal navigation): it collapses to one entry pointing at its landing.
 * A section without an index (e.g. "Forms") is just a grouping — each leaf is
 * its own demo.
 */
export const examplePages = (): { name: string; url: string }[] =>
  config.tiles.flatMap(tile => {
    if (tile.kind === 'link') {
      return [{ name: tile.label, url: `${config.base}/${tile.slug}` }];
    }
    const isSelfContainedApp = tile.items.some(
      item => item.kind === 'Item' && !item.children && item.slug === ''
    );
    return isSelfContainedApp
      ? [{ name: tile.label, url: config.base }]
      : collectDemos(tile.items, config.base);
  });
