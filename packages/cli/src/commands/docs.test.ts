import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { cachePathFor } from '../lib/cache.js';
import { docsUrl } from '../lib/config.js';
import { runDocs } from './docs.js';

const seedCache = (url: string, body: string) => {
  const file = cachePathFor(url);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
};

const install = (cwd: string, version: string) => {
  const dir = path.join(cwd, 'node_modules', '@marigold', 'components');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ version }));
};

describe('runDocs version warning', () => {
  let tmpDir: string;
  let app: string;
  const originalCacheDir = process.env.MARIGOLD_CACHE_DIR;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-docs-cmd-'));
    app = path.join(tmpDir, 'app');
    process.env.MARIGOLD_CACHE_DIR = tmpDir;
    seedCache(
      `${docsUrl()}/manifest.json`,
      JSON.stringify({
        baseUrl: 'https://www.marigold-ui.io',
        packages: { '@marigold/components': '18.2.1' },
        pages: [
          {
            name: 'Button',
            slug: 'components/actions/button',
            category: 'actions',
            description: 'Click me',
            badge: null,
            url: '/components/actions/button',
          },
        ],
      })
    );
    seedCache(`${docsUrl()}/components/actions/button.md`, '# Button\n');
  });

  afterEach(() => {
    if (originalCacheDir === undefined) delete process.env.MARIGOLD_CACHE_DIR;
    else process.env.MARIGOLD_CACHE_DIR = originalCacheDir;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('adds the warning to the JSON when the installed version is older', async () => {
    install(app, '17.4.0');

    const { output, warning } = await runDocs({
      component: 'Button',
      format: 'json',
      offline: true,
      cwd: app,
    });

    expect(warning).toMatchObject({ installed: '17.4.0', docs: '18.2.1' });
    expect(JSON.parse(output).warning).toEqual(warning);
  });

  test('leaves the JSON unchanged when the versions match', async () => {
    install(app, '18.2.1');

    const { output, warning } = await runDocs({
      component: 'Button',
      format: 'json',
      offline: true,
      cwd: app,
    });

    expect(warning).toBeNull();
    expect(JSON.parse(output)).not.toHaveProperty('warning');
  });

  test('keeps the warning out of the markdown output', async () => {
    install(app, '17.4.0');

    const { output, warning } = await runDocs({
      component: 'Button',
      format: 'plain',
      offline: true,
      cwd: app,
    });

    expect(warning).not.toBeNull();
    expect(output).not.toContain('17.4.0');
  });
});
