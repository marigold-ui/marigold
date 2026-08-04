/**
 * Fake data for the copy-wizard example. Shaped after a "copy subscriptions"
 * batch job: pick source bundles, set the parameters that apply to the whole
 * run, map them onto targets, then review before starting.
 */

export interface BundleGroup {
  id: string;
  name: string;
}

export interface Bundle {
  id: string;
  name: string;
  type: 'series' | 'single';
  connections: number;
}

export interface MappingRow {
  id: string;
  source: string;
  target: string;
  seats: number;
  status: 'ready' | 'review' | 'blocked';
}

export const bundleGroups: BundleGroup[] = [
  { id: 'bg-1', name: 'Season 2026/27 — Main stage' },
  { id: 'bg-2', name: 'Season 2026/27 — Studio' },
  { id: 'bg-3', name: 'Chamber series' },
];

export const bundles: Bundle[] = [
  {
    id: 'b-1',
    name: 'Premiere subscription A',
    type: 'series',
    connections: 6,
  },
  {
    id: 'b-2',
    name: 'Premiere subscription B',
    type: 'series',
    connections: 6,
  },
  { id: 'b-3', name: 'Weekday subscription', type: 'series', connections: 8 },
  { id: 'b-4', name: 'Weekend subscription', type: 'series', connections: 8 },
  { id: 'b-5', name: 'Youth subscription', type: 'series', connections: 4 },
  { id: 'b-6', name: 'New Year gala', type: 'single', connections: 1 },
];

export const salesOutlets = [
  { id: 'so-1', name: 'Box office' },
  { id: 'so-2', name: 'Call centre' },
  { id: 'so-3', name: 'Online' },
];

export const branches = [
  { id: 'br-1', name: 'Main house' },
  { id: 'br-2', name: 'Studio stage' },
];

export const paymentTypes = [
  { id: 'pt-1', name: 'Invoice' },
  { id: 'pt-2', name: 'Direct debit' },
  { id: 'pt-3', name: 'Credit card' },
];

export const deliveryTypes = [
  { id: 'dt-1', name: 'Postal' },
  { id: 'dt-2', name: 'Print at home' },
  { id: 'dt-3', name: 'Pick-up' },
];

export const orderTags = [
  { id: 'tag-1', name: 'Press' },
  { id: 'tag-2', name: 'Sponsor' },
  { id: 'tag-3', name: 'Staff' },
  { id: 'tag-4', name: 'Cancelled 2025' },
  { id: 'tag-5', name: 'Payment reminder' },
];

export const mappings: MappingRow[] = [
  {
    id: 'm-1',
    source: 'Premiere subscription A',
    target: 'Premiere subscription A (26/27)',
    seats: 412,
    status: 'ready',
  },
  {
    id: 'm-2',
    source: 'Premiere subscription B',
    target: 'Premiere subscription B (26/27)',
    seats: 388,
    status: 'ready',
  },
  {
    id: 'm-3',
    source: 'Weekday subscription',
    target: 'Weekday subscription (26/27)',
    seats: 1204,
    status: 'review',
  },
  {
    id: 'm-4',
    source: 'Youth subscription',
    target: '—',
    seats: 96,
    status: 'blocked',
  },
];
