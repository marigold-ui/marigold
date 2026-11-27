import { people } from '@/lib/data/people';
import {
  Building2,
  CalendarDays,
  FileText,
  LayoutDashboard,
  MapPin,
  Package,
  Settings,
} from 'lucide-react';
import type { RailTile, ShellConfig } from '../_shared';

// The rail is the product: tiles name what a Riverside Events user manages,
// not which pattern a page demonstrates. The pattern is shown in the top bar,
// from each page's `docsHref` and `docsLabel`.

const appFrameDocs = {
  docsHref: '/patterns/layout/app-frame',
  docsLabel: 'App Frame Pattern',
} as const;

const formDocs = {
  docsHref: '/patterns/user-input/forms',
  docsLabel: 'Form Guidelines',
} as const;

const tiles: RailTile[] = [
  {
    kind: 'section',
    id: 'overview',
    label: 'Overview',
    icon: <LayoutDashboard />,
    items: [
      { kind: 'Item', slug: '', label: 'Dashboard', ...appFrameDocs },
      { kind: 'Item', slug: 'analytics', label: 'Analytics', ...appFrameDocs },
    ],
  },
  {
    kind: 'section',
    id: 'events',
    label: 'Events',
    icon: <CalendarDays />,
    items: [
      {
        kind: 'Item',
        slug: 'bulk-actions',
        label: 'All events',
        docsHref: '/patterns/user-input/bulk-actions',
        docsLabel: 'Bulk Actions Guidelines',
      },
      { kind: 'Item', slug: 'event-form', label: 'Create event', ...formDocs },
    ],
  },
  {
    kind: 'link',
    id: 'venues',
    label: 'Venues',
    icon: <MapPin />,
    slug: 'filter',
    docsHref: '/patterns/user-input/filter',
    docsLabel: 'Filter Guidelines',
  },
  {
    kind: 'link',
    id: 'reports',
    label: 'Reports',
    icon: <FileText />,
    slug: 'pick',
    docsHref: '/patterns/user-input/pick',
    docsLabel: 'Pick Guidelines',
  },
  {
    kind: 'section',
    id: 'organisation',
    label: 'Organisation',
    icon: <Building2 />,
    items: [
      { kind: 'Item', slug: 'users', label: 'Users', ...appFrameDocs },
      { kind: 'Item', slug: 'teams', label: 'Teams', ...appFrameDocs },
      { kind: 'Item', slug: 'billing', label: 'Billing', ...appFrameDocs },
    ],
  },
  {
    kind: 'section',
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    items: [
      { kind: 'Item', slug: 'general', label: 'General', ...appFrameDocs },
      { kind: 'Item', slug: 'security', label: 'Security', ...appFrameDocs },
      {
        kind: 'Item',
        slug: 'settings-form',
        label: 'Event defaults',
        ...formDocs,
      },
      {
        kind: 'Item',
        slug: 'auto-save-settings',
        label: 'Notifications and privacy',
        ...formDocs,
      },
    ],
  },
];

export const config: ShellConfig = {
  base: '/examples',
  tiles,
  // Not a product screen, so it sits with Docs and Help at the bottom of the
  // rail instead of among the product tiles.
  footerTiles: [
    {
      kind: 'link',
      id: 'inventory',
      label: 'Inventory',
      icon: <Package />,
      slug: 'inventory',
    },
  ],
  // Label the dynamic `users/[id]` segment with the member's name.
  resolveLabel: id => people.find(person => person.id === id)?.name,
};

/**
 * The examples as `{ name, url }` entries for the docs cmdk search. Visitors
 * search the docs for a pattern, not for a screen of the demo product, so the
 * entries use the pattern names and are listed explicitly rather than derived
 * from the rail labels.
 */
export const examplePages = (): { name: string; url: string }[] => [
  { name: 'App Shell', url: config.base },
  { name: 'Filter', url: `${config.base}/filter` },
  { name: 'Bulk Actions', url: `${config.base}/bulk-actions` },
  { name: 'Pick', url: `${config.base}/pick` },
  { name: 'Event Form', url: `${config.base}/event-form` },
  { name: 'Settings Form', url: `${config.base}/settings-form` },
  { name: 'Auto-Save Settings', url: `${config.base}/auto-save-settings` },
  { name: 'Inventory', url: `${config.base}/inventory` },
];
