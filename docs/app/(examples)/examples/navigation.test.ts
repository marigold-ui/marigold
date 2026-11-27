import { describe, expect, it } from 'vitest';
import type { NavNode } from '../_shared';
import { config, examplePages } from './navigation';

// Every route the shell can navigate to, from the rail and its footer.
const leafSlugs = (items: NavNode[]): string[] =>
  items.flatMap(item => {
    if (item.kind !== 'Item') return [];
    return item.children ? leafSlugs(item.children) : [item.slug];
  });

const routes = [...config.tiles, ...(config.footerTiles ?? [])].flatMap(tile =>
  tile.kind === 'link' ? [tile.slug] : leafSlugs(tile.items)
);
const urls = routes.map(slug =>
  slug ? `${config.base}/${slug}` : config.base
);

describe('examplePages', () => {
  it('lists the examples under their pattern names', () => {
    // The full contract of the docs cmdk search: visitors search for a
    // pattern, so the names are the patterns, not the rail labels.
    expect(examplePages()).toEqual([
      { name: 'App Shell', url: '/examples' },
      { name: 'Filter', url: '/examples/filter' },
      { name: 'Bulk Actions', url: '/examples/bulk-actions' },
      { name: 'Pick', url: '/examples/pick' },
      { name: 'Event Form', url: '/examples/event-form' },
      { name: 'Settings Form', url: '/examples/settings-form' },
      { name: 'Auto-Save Settings', url: '/examples/auto-save-settings' },
      { name: 'Inventory', url: '/examples/inventory' },
    ]);
  });

  it('only links to routes the shell navigates to', () => {
    // The list is written by hand, so this catches a renamed or removed route.
    for (const page of examplePages()) {
      expect(urls).toContain(page.url);
    }
  });
});

describe('config', () => {
  it('names the rail after product areas', () => {
    expect(config.tiles.map(tile => tile.label)).toEqual([
      'Overview',
      'Events',
      'Venues',
      'Reports',
      'Organisation',
      'Settings',
    ]);
  });

  it('keeps every example route', () => {
    expect([...urls].sort()).toEqual(
      [
        '/examples',
        '/examples/analytics',
        '/examples/auto-save-settings',
        '/examples/billing',
        '/examples/bulk-actions',
        '/examples/event-form',
        '/examples/filter',
        '/examples/general',
        '/examples/inventory',
        '/examples/pick',
        '/examples/security',
        '/examples/settings-form',
        '/examples/teams',
        '/examples/users',
      ].sort()
    );
  });

  it('gives every product page a pattern to link to', () => {
    // The top bar shows the pattern from `docsHref` and `docsLabel`. Only the
    // footer's Inventory has no pattern page.
    for (const tile of config.tiles) {
      const pages =
        tile.kind === 'link'
          ? [tile]
          : tile.items.filter(item => item.kind === 'Item');
      for (const page of pages) {
        expect(page).toMatchObject({
          docsHref: expect.stringMatching(/^\/patterns\//),
          docsLabel: expect.any(String),
        });
      }
    }
  });
});
