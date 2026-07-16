import { vi } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { cachePathFor } from '../lib/cache.js';
import { docsUrl } from '../lib/config.js';
import type { DoctorReport } from '../lib/doctor/index.js';
import { isDoctorFormat, runDoctor } from './doctor.js';

// --- fixture helpers --------------------------------------------------------

const write = (dir: string, rel: string, content: string) => {
  const full = path.join(dir, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
};

const json = (obj: unknown) => JSON.stringify(obj, null, 2);

// Minimal Response stand-in for mocking the best-effort manifest warm-fetch.
const manifestResponse = (packages: Record<string, string>) =>
  ({
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' },
    text: async () =>
      JSON.stringify({ baseUrl: 'https://example.test', packages, pages: [] }),
  }) as unknown as Response;

const PROVIDERS = `'use client';
import { MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-rui';

export function Providers({ children }: { children: React.ReactNode }) {
  return <MarigoldProvider theme={theme}>{children}</MarigoldProvider>;
}
`;

const LAYOUT = `import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
`;

const CSS_FULL = `@import 'tailwindcss';
@import '@marigold/theme-rui/theme.css';

@source '../node_modules/@marigold';
`;

interface SeedOptions {
  omitDeclare?: string[];
  omitInstall?: string[];
  components?: string;
  system?: string;
  theme?: string;
  react?: string;
  reactPeer?: string;
}

/** Seed a healthy Next.js App-Router project, overridable per option. */
const seedNext = (dir: string, o: SeedOptions = {}) => {
  const dependencies: Record<string, string> = {
    '@marigold/components': '^18.0.0',
    '@marigold/system': '^18.0.0',
    '@marigold/theme-rui': '^6.0.0',
    react: '^19.0.0',
    'react-dom': '^19.0.0',
  };
  for (const k of o.omitDeclare ?? []) delete dependencies[k];
  write(dir, 'package.json', json({ name: 'app', dependencies }));
  write(dir, 'next.config.mjs', '');
  write(dir, 'pnpm-lock.yaml', '');

  const installs: Record<string, Record<string, unknown>> = {
    '@marigold/components': {
      version: o.components ?? '18.0.0',
      peerDependencies: {
        react: o.reactPeer ?? '>=17.0.0',
        'react-dom': '>=17.0.0',
      },
    },
    '@marigold/system': { version: o.system ?? '18.0.0' },
    '@marigold/theme-rui': { version: o.theme ?? '6.0.0' },
    react: { version: o.react ?? '19.2.7' },
    'react-dom': { version: o.react ?? '19.2.7' },
  };
  for (const [name, meta] of Object.entries(installs)) {
    if ((o.omitInstall ?? []).includes(name)) continue;
    write(dir, `node_modules/${name}/package.json`, json({ name, ...meta }));
  }

  write(dir, 'app/providers.tsx', PROVIDERS);
  write(dir, 'app/layout.tsx', LAYOUT);
  write(dir, 'app/globals.css', CSS_FULL);
  write(
    dir,
    'postcss.config.mjs',
    `const config = { plugins: ['@tailwindcss/postcss'] };\nexport default config;\n`
  );
};

const checks = (report: DoctorReport) => ({
  errorIds: report.errors.map(e => e.check),
  warningIds: report.warnings.map(w => w.check),
});

// --- tests ------------------------------------------------------------------

describe('runDoctor', () => {
  let dir: string;
  let cacheDir: string;
  const originalCacheDir = process.env.MARIGOLD_CACHE_DIR;

  const seedManifest = (packages: Record<string, string>) => {
    const file = cachePathFor(`${docsUrl()}/manifest.json`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, json({ baseUrl: docsUrl(), packages, pages: [] }));
  };

  // Default the shared helper to offline so existing tests stay hermetic (no
  // manifest warm-fetch). The best-effort fetch path is covered explicitly
  // below with a mocked fetch.
  const run = (format?: 'text' | 'json') =>
    runDoctor({ cwd: dir, format, offline: true });

  const report = async (): Promise<DoctorReport> =>
    JSON.parse((await run('json')).output) as DoctorReport;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-doctor-'));
    // Hermetic, empty cache dir: freshness is skipped unless a test seeds it.
    cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-doctor-cache-'));
    process.env.MARIGOLD_CACHE_DIR = cacheDir;
  });

  afterEach(() => {
    if (originalCacheDir === undefined) delete process.env.MARIGOLD_CACHE_DIR;
    else process.env.MARIGOLD_CACHE_DIR = originalCacheDir;
    fs.rmSync(dir, { recursive: true, force: true });
    fs.rmSync(cacheDir, { recursive: true, force: true });
  });

  test('reports a healthy Next.js project with no errors or warnings', async () => {
    seedNext(dir);
    seedManifest({
      '@marigold/components': '18.0.0',
      '@marigold/system': '18.0.0',
      '@marigold/theme-rui': '6.0.0',
    });

    const { output, hasErrors } = await run();

    expect(hasErrors).toBe(false);
    expect(output).toContain('Marigold Doctor');
    expect(output).toContain('No issues found');

    const r = await report();
    expect(r.errors).toEqual([]);
    expect(r.warnings).toEqual([]);
    expect(r.passed).toContain('Up to date');
    expect(r.passed).toContain('MarigoldProvider wraps the app');
  });

  test('reports a healthy Vite project', async () => {
    seedNext(dir);
    // Convert to Vite: remove Next markers, add a Vite entry + config.
    fs.rmSync(path.join(dir, 'next.config.mjs'));
    fs.rmSync(path.join(dir, 'app'), { recursive: true, force: true });
    write(
      dir,
      'vite.config.ts',
      `import tailwindcss from '@tailwindcss/vite';\nexport default { plugins: [tailwindcss()] };\n`
    );
    write(
      dir,
      'src/main.tsx',
      `import { createRoot } from 'react-dom/client';\nimport { MarigoldProvider } from '@marigold/components';\nimport theme from '@marigold/theme-rui';\nimport App from './App';\ncreateRoot(document.getElementById('root')!).render(<MarigoldProvider theme={theme}><App /></MarigoldProvider>);\n`
    );
    write(dir, 'src/index.css', CSS_FULL);

    const { hasErrors } = await run();
    const { errorIds, warningIds } = checks(await report());

    expect(hasErrors).toBe(false);
    expect(errorIds).toEqual([]);
    expect(warningIds).not.toContain('provider-wrapper');
    expect(warningIds).not.toContain('tailwind-config');
  });

  test('detects a provider in the Next.js Pages Router entry', async () => {
    seedNext(dir);
    fs.rmSync(path.join(dir, 'app'), { recursive: true, force: true });
    write(
      dir,
      'pages/_app.tsx',
      `import { MarigoldProvider } from '@marigold/components';\nimport theme from '@marigold/theme-rui';\nexport default function App({ Component, pageProps }) {\n  return <MarigoldProvider theme={theme}><Component {...pageProps} /></MarigoldProvider>;\n}\n`
    );
    // Pages Router still needs a CSS entry.
    write(dir, 'styles/globals.css', CSS_FULL);

    const { warningIds } = checks(await report());
    expect(warningIds).not.toContain('provider-wrapper');
    expect(warningIds).not.toContain('theme-passed');
  });

  test('errors when a core package is missing', async () => {
    seedNext(dir, { omitDeclare: ['@marigold/system'] });

    const { hasErrors } = await run();
    const { errorIds } = checks(await report());

    expect(hasErrors).toBe(true);
    expect(errorIds).toContain('package-presence');
  });

  test('errors when components and system versions differ', async () => {
    seedNext(dir, { components: '18.0.0', system: '17.4.0' });

    const { hasErrors } = await run();
    const r = await report();

    expect(hasErrors).toBe(true);
    expect(r.errors.map(e => e.check)).toContain('version-match');
    expect(r.errors[0].details).toMatchObject({
      components: '18.0.0',
      system: '17.4.0',
    });
  });

  test('warns (not errors) when a provider cannot be found', async () => {
    seedNext(dir);
    // Layout with {children} but no provider wrapper.
    write(
      dir,
      'app/layout.tsx',
      `export default function RootLayout({ children }) {\n  return <html><body>{children}</body></html>;\n}\n`
    );
    fs.rmSync(path.join(dir, 'app/providers.tsx'));

    const { hasErrors } = await run();
    const { errorIds, warningIds } = checks(await report());

    expect(hasErrors).toBe(false);
    expect(errorIds).toEqual([]);
    expect(warningIds).toContain('provider-wrapper');
  });

  test('warns when the provider receives no theme prop', async () => {
    seedNext(dir);
    write(
      dir,
      'app/providers.tsx',
      `'use client';\nimport { MarigoldProvider } from '@marigold/components';\nexport function Providers({ children }) {\n  return <MarigoldProvider>{children}</MarigoldProvider>;\n}\n`
    );

    const { warningIds } = checks(await report());
    expect(warningIds).toContain('theme-passed');
    expect(warningIds).not.toContain('provider-wrapper');
  });

  test('errors when MarigoldProvider is rendered but not imported', async () => {
    seedNext(dir);
    // Provider element is present, but the import line is missing — the app
    // throws at runtime even though the JSX "looks" wired up.
    write(
      dir,
      'app/providers.tsx',
      `'use client';\nimport theme from '@marigold/theme-rui';\nexport function Providers({ children }) {\n  return <MarigoldProvider theme={theme}>{children}</MarigoldProvider>;\n}\n`
    );

    const { hasErrors } = await run();
    const r = await report();
    const pw = r.errors.find(e => e.check === 'provider-wrapper');

    expect(hasErrors).toBe(true);
    expect(pw?.message).toMatch(/not imported|never imported/);
    // theme-passed is assessed independently; here the theme *is* imported, so
    // only the provider import is flagged.
    expect(r.warnings.map(w => w.check)).not.toContain('theme-passed');
  });

  test('reports the missing provider and theme imports together in one run', async () => {
    seedNext(dir);
    // Both import lines deleted — doctor should surface both fixes at once
    // rather than revealing the theme issue only after the provider is fixed.
    write(
      dir,
      'app/providers.tsx',
      `'use client';\nexport function Providers({ children }) {\n  return <MarigoldProvider theme={theme}>{children}</MarigoldProvider>;\n}\n`
    );

    const { hasErrors } = await run();
    const { errorIds, warningIds } = checks(await report());

    expect(hasErrors).toBe(true);
    expect(errorIds).toContain('provider-wrapper');
    expect(warningIds).toContain('theme-passed');
  });

  test('warns when the theme value is passed but not imported', async () => {
    seedNext(dir);
    write(
      dir,
      'app/providers.tsx',
      `'use client';\nimport { MarigoldProvider } from '@marigold/components';\nexport function Providers({ children }) {\n  return <MarigoldProvider theme={theme}>{children}</MarigoldProvider>;\n}\n`
    );

    const r = await report();
    const { errorIds, warningIds } = checks(r);
    const tp = r.warnings.find(w => w.check === 'theme-passed');

    expect(errorIds).not.toContain('provider-wrapper');
    expect(warningIds).toContain('theme-passed');
    expect(tp?.message).toMatch(/never imported/);
  });

  test('accepts a theme received as a prop instead of an import', async () => {
    seedNext(dir);
    // A providers component that takes `theme` as a prop is valid — the value is
    // bound (a parameter), so doctor must not flag it as a missing import.
    write(
      dir,
      'app/providers.tsx',
      `'use client';\nimport { MarigoldProvider } from '@marigold/components';\nexport function Providers({ children, theme }) {\n  return <MarigoldProvider theme={theme}>{children}</MarigoldProvider>;\n}\n`
    );

    const { warningIds } = checks(await report());
    expect(warningIds).not.toContain('theme-passed');
    expect(warningIds).not.toContain('provider-wrapper');
  });

  test('warns when the Tailwind @source directive is missing', async () => {
    seedNext(dir);
    write(
      dir,
      'app/globals.css',
      `@import 'tailwindcss';\n@import '@marigold/theme-rui/theme.css';\n`
    );

    const r = await report();
    const { warningIds } = checks(r);
    const tw = r.warnings.find(w => w.check === 'tailwind-config');
    expect(warningIds).toContain('tailwind-config');
    expect(tw?.message).toContain('@source');
  });

  test('warns when React is below the peer requirement', async () => {
    seedNext(dir, { react: '16.14.0' });

    const { hasErrors } = await run();
    const { errorIds, warningIds } = checks(await report());

    expect(hasErrors).toBe(false);
    expect(errorIds).toEqual([]);
    expect(warningIds).toContain('react-peer');
  });

  test('warns when packages are declared but not installed', async () => {
    seedNext(dir, {
      omitInstall: ['@marigold/components', '@marigold/system'],
    });

    const r = await report();
    expect(r.errors).toEqual([]);
    expect(r.warnings.map(w => w.check)).toContain('version-match');
    // react-peer is skipped when components isn't installed.
    expect(r.warnings.map(w => w.check)).not.toContain('react-peer');
  });

  test('warns when React itself is not installed', async () => {
    seedNext(dir, { omitInstall: ['react'] });

    const react = (await report()).warnings.find(w => w.check === 'react-peer');
    expect(react?.message).toContain('react is not installed');
  });

  test('warns when only one of components/system is installed', async () => {
    seedNext(dir, { omitInstall: ['@marigold/system'] });

    const vm = (await report()).warnings.find(w => w.check === 'version-match');
    expect(vm?.details).toMatchObject({ notInstalled: ['@marigold/system'] });
  });

  test('skips freshness when the manifest lists no installed packages', async () => {
    seedNext(dir);
    seedManifest({ '@marigold/unrelated': '1.0.0' });

    const r = await report();
    const ids = [...r.errors, ...r.warnings, ...r.passed];
    expect(ids).not.toContain('version-freshness');
    expect(r.passed).not.toContain('Up to date');
  });

  test('summarizes multiple warnings with no errors', async () => {
    seedNext(dir, { react: '16.0.0' });
    write(
      dir,
      'app/globals.css',
      `@import 'tailwindcss';\n@import '@marigold/theme-rui/theme.css';\n`
    );

    const { output, hasErrors } = await run();
    expect(hasErrors).toBe(false);
    expect(output).toMatch(/\d+ warnings\./);
  });

  test('warns when an installed package is out of date', async () => {
    seedNext(dir);
    seedManifest({
      '@marigold/components': '18.1.0',
      '@marigold/system': '18.1.0',
      '@marigold/theme-rui': '6.0.0',
    });

    const r = await report();
    expect(r.warnings.map(w => w.check)).toContain('version-freshness');
  });

  test('omits the freshness check when the manifest is not cached (offline)', async () => {
    seedNext(dir); // no seedManifest → empty cache

    const r = await report();
    const ids = [...r.errors, ...r.warnings].map(i => i.check);
    expect(ids).not.toContain('version-freshness');
    expect(r.passed).not.toContain('Up to date');
  });

  test('best-effort fetches the manifest so freshness works without priming', async () => {
    seedNext(dir); // installed components/system 18.0.0; empty cache, unseeded
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      manifestResponse({
        '@marigold/components': '18.2.0',
        '@marigold/system': '18.2.0',
        '@marigold/theme-rui': '6.0.0',
      })
    );
    try {
      // Online (no offline flag): the warm-fetch populates the cache, so the
      // cache-only freshness check then has published versions to compare.
      const { output } = await runDoctor({ cwd: dir, format: 'json' });
      const parsed = JSON.parse(output) as DoctorReport;

      expect(fetchSpy).toHaveBeenCalled();
      expect(parsed.warnings.map(w => w.check)).toContain('version-freshness');
    } finally {
      fetchSpy.mockRestore();
    }
  });

  test('--offline skips the network warm-fetch entirely', async () => {
    seedNext(dir);
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        manifestResponse({ '@marigold/components': '18.2.0' })
      );
    try {
      const { output } = await runDoctor({
        cwd: dir,
        format: 'json',
        offline: true,
      });
      const parsed = JSON.parse(output) as DoctorReport;

      expect(fetchSpy).not.toHaveBeenCalled();
      // No cached manifest and no fetch → freshness is omitted, not guessed.
      expect(parsed.warnings.map(w => w.check)).not.toContain(
        'version-freshness'
      );
    } finally {
      fetchSpy.mockRestore();
    }
  });

  test('warns that Tailwind v3 is unsupported when a v3 config is present', async () => {
    seedNext(dir);
    fs.rmSync(path.join(dir, 'app/globals.css'));
    write(dir, 'tailwind.config.js', 'module.exports = {};\n');

    const tw = (await report()).warnings.find(
      w => w.check === 'tailwind-config'
    );
    expect(tw?.message).toContain('v3');
  });

  test('warns when there is no CSS entry with Tailwind imports', async () => {
    seedNext(dir);
    fs.rmSync(path.join(dir, 'app/globals.css'));

    const tw = (await report()).warnings.find(
      w => w.check === 'tailwind-config'
    );
    expect(tw?.message).toContain('CSS entry');
  });

  test('warns when the Vite Tailwind plugin is missing', async () => {
    seedNext(dir);
    fs.rmSync(path.join(dir, 'next.config.mjs'));
    fs.rmSync(path.join(dir, 'app'), { recursive: true, force: true });
    fs.rmSync(path.join(dir, 'postcss.config.mjs'));
    write(dir, 'vite.config.ts', `export default { plugins: [] };\n`);
    write(dir, 'src/index.css', CSS_FULL);
    write(
      dir,
      'src/main.tsx',
      `import { MarigoldProvider } from '@marigold/components';\nimport theme from '@marigold/theme-rui';\ncreateRoot(el).render(<MarigoldProvider theme={theme}><App /></MarigoldProvider>);\n`
    );

    const tw = (await report()).warnings.find(
      w => w.check === 'tailwind-config'
    );
    expect(tw?.message).toContain('vite');
  });

  test('summarizes a mix of errors and warnings in the text output', async () => {
    // Version mismatch (error) + missing @source (warning).
    seedNext(dir, { components: '18.0.0', system: '17.0.0' });
    write(
      dir,
      'app/globals.css',
      `@import 'tailwindcss';\n@import '@marigold/theme-rui/theme.css';\n`
    );

    const { output, hasErrors } = await run();
    expect(hasErrors).toBe(true);
    expect(output).toMatch(/1 error, \d+ warning/);
  });

  test('rejects with a usage error when there is no package.json', async () => {
    await expect(run()).rejects.toThrow(/No package.json found/);
  });

  test('--format json emits the documented contract', async () => {
    seedNext(dir);

    const { output } = await run('json');
    const parsed = JSON.parse(output) as DoctorReport;

    expect(parsed).toHaveProperty('errors');
    expect(parsed).toHaveProperty('warnings');
    expect(parsed).toHaveProperty('passed');
    expect(parsed).toHaveProperty('text');
    expect(Array.isArray(parsed.passed)).toBe(true);
  });

  test('isDoctorFormat guards the format flag', () => {
    expect(isDoctorFormat('text')).toBe(true);
    expect(isDoctorFormat('json')).toBe(true);
    expect(isDoctorFormat('markdown')).toBe(false);
  });
});
