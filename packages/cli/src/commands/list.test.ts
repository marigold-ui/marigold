import { vi } from 'vitest';
import type { Manifest } from '../lib/manifest.js';
import { runList } from './list.js';

const MANIFEST: Manifest = {
  baseUrl: 'https://www.marigold-ui.io',
  categories: [
    {
      name: 'form',
      label: 'Form',
      components: [
        {
          name: 'TextField',
          slug: 'components/form/text-field',
        },
      ],
    },
  ],
  pages: [
    {
      title: 'Installation',
      slug: 'getting-started/installation',
      category: 'getting-started',
    },
  ],
};

vi.mock('../lib/manifest.js', async importOriginal => ({
  ...(await importOriginal<typeof import('../lib/manifest.js')>()),
  loadManifest: vi.fn(async () => ({ manifest: MANIFEST, cacheHit: true })),
}));

// The resolved category is what telemetry records, so it has to be the
// manifest's spelling and never the input's.
describe('runList category resolution', () => {
  test('returns the manifest spelling of a component category', async () => {
    const result = await runList({ category: 'Form' });

    expect(result.category).toBe('form');
  });

  test('matches a page group the way the list filter does', async () => {
    const result = await runList({ category: 'getting started' });

    expect(result.category).toBe('getting-started');
  });

  test('returns undefined for a category that matches nothing', async () => {
    const result = await runList({ category: 'acme-internal' });

    expect(result.category).toBeUndefined();
  });

  test('returns undefined when no category was given', async () => {
    const result = await runList();

    expect(result.category).toBeUndefined();
  });
});
