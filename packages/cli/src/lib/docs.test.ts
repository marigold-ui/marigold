import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { cachePathFor } from './cache.js';
import { docsUrl } from './config.js';
import { getPageDocs, sliceSection } from './docs.js';

const markdown = `# Button

Some intro.

## Usage

Use this for actions.

## Props

| Name | Type | Default |
| ---- | ---- | ------- |
| variant | string | primary |

## Examples

\`\`\`tsx
<Button>Click</Button>
\`\`\`
`;

describe('sliceSection', () => {
  test('extracts props section', () => {
    const out = sliceSection(markdown, 'props');

    expect(out).toContain('## Props');
    expect(out).toContain('variant');
    expect(out).not.toContain('## Examples');
  });

  test('extracts usage section', () => {
    const out = sliceSection(markdown, 'usage');

    expect(out).toContain('## Usage');
    expect(out).toContain('Use this for actions.');
    expect(out).not.toContain('## Props');
  });

  test('extracts examples section', () => {
    const out = sliceSection(markdown, 'examples');

    expect(out).toContain('## Examples');
    expect(out).toContain('<Button>');
  });

  test('returns a placeholder when section is missing', () => {
    const out = sliceSection('# Thing\n\nNo sections.', 'props');

    expect(out).toContain('not found');
  });
});

const RAW_MANIFEST = JSON.stringify({
  baseUrl: 'https://www.marigold-ui.io',
  pages: [
    {
      name: 'Button',
      slug: 'components/actions/button',
      category: 'actions',
      description: 'Click me',
      badge: null,
      url: '/components/actions/button',
    },
    {
      name: 'Accessibility',
      slug: 'foundations/accessibility',
      category: 'foundations',
      description: 'A11y',
      badge: null,
      url: '/foundations/accessibility',
    },
    {
      name: 'Forms',
      slug: 'patterns/user-input/forms',
      category: 'patterns/user-input',
      description: 'Form pattern',
      badge: null,
      url: '/patterns/user-input/forms',
    },
    {
      name: 'Installation',
      slug: 'getting-started/installation',
      category: 'getting-started',
      description: 'Install',
      badge: null,
      url: '/getting-started/installation',
    },
    {
      // A standalone page under components/ with fewer than 3 slug segments:
      // listed by `list` but not a component, so `docs` must resolve it via
      // the page fallback rather than bailing on the component-cascade miss.
      name: 'Form',
      slug: 'components/form',
      category: 'components',
      description: 'Wrap your fields to submit user data',
      badge: null,
      url: '/components/form',
    },
  ],
});

const seedCache = (url: string, body: string) => {
  const file = cachePathFor(url);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
};

describe('getPageDocs', () => {
  let tmpDir: string;
  const originalCacheDir = process.env.MARIGOLD_CACHE_DIR;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-docs-test-'));
    process.env.MARIGOLD_CACHE_DIR = tmpDir;
    seedCache(`${docsUrl()}/manifest.json`, RAW_MANIFEST);
    seedCache(
      `${docsUrl()}/foundations/accessibility.md`,
      '# Accessibility\n\nFoundations content.\n'
    );
    seedCache(
      `${docsUrl()}/patterns/user-input/forms.md`,
      '# Forms\n\nPattern content.\n'
    );
    seedCache(
      `${docsUrl()}/getting-started/installation.md`,
      '# Installation\n\nInstall content.\n'
    );
    seedCache(
      `${docsUrl()}/components/actions/button.md`,
      '# Button\n\n## Props\n\nprops here.\n'
    );
    seedCache(
      `${docsUrl()}/components/form.md`,
      '# Form\n\nForm overview content.\n'
    );
  });

  afterEach(() => {
    if (originalCacheDir === undefined) delete process.env.MARIGOLD_CACHE_DIR;
    else process.env.MARIGOLD_CACHE_DIR = originalCacheDir;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('resolves a foundations page by name', async () => {
    const docs = await getPageDocs('Accessibility', { offline: true });

    expect(docs.kind).toBe('page');
    expect(docs.slug).toBe('foundations/accessibility');
    expect(docs.category).toBe('foundations');
    expect(docs.markdown).toContain('Foundations content');
  });

  test('resolves a patterns page by slug', async () => {
    const docs = await getPageDocs('patterns/user-input/forms', {
      offline: true,
    });

    expect(docs.kind).toBe('page');
    expect(docs.category).toBe('patterns');
    expect(docs.markdown).toContain('Pattern content');
  });

  test('resolves a getting-started page by slug tail', async () => {
    const docs = await getPageDocs('installation', { offline: true });

    expect(docs.kind).toBe('page');
    expect(docs.slug).toBe('getting-started/installation');
  });

  test('routes a components/ slug to the component, not a page', async () => {
    const docs = await getPageDocs('components/actions/button', {
      offline: true,
    });

    expect(docs.kind).toBe('component');
    expect(docs.category).toBe('actions');
  });

  test('falls back to the page resolver for a components/ standalone page', async () => {
    const docs = await getPageDocs('components/form', { offline: true });

    expect(docs.kind).toBe('page');
    expect(docs.slug).toBe('components/form');
    expect(docs.category).toBe('components');
    expect(docs.markdown).toContain('Form overview content');
  });

  test('resolves a bare component name as a component', async () => {
    const docs = await getPageDocs('Button', { offline: true });

    expect(docs.kind).toBe('component');
    expect(docs.slug).toBe('components/actions/button');
  });

  test('emits a page-aware note for --section props on a page', async () => {
    const docs = await getPageDocs('Accessibility', {
      offline: true,
      section: 'props',
    });

    expect(docs.markdown).toContain('component-only section');
  });

  test('throws with suggestions for an unknown query', async () => {
    await expect(
      getPageDocs('accessibilty', { offline: true })
    ).rejects.toThrow(/foundations\/accessibility/);
  });
});
