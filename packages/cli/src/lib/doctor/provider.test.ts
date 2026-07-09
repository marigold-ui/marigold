import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { detectProvider } from './provider.js';

const write = (dir: string, rel: string, content: string) => {
  const full = path.join(dir, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
};

describe('detectProvider', () => {
  let dir: string;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-provider-'));
  });

  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
  });

  test('returns no layout when none of the candidates exist', () => {
    const result = detectProvider(dir);
    expect(result).toEqual({
      layoutFile: null,
      inspectedFile: null,
      providerFound: false,
      themePassed: false,
    });
  });

  test('finds MarigoldProvider used directly in the layout', () => {
    write(
      dir,
      'app/layout.tsx',
      `import { MarigoldProvider } from '@marigold/components';\nimport theme from '@marigold/theme-rui';\nexport default function L({ children }) {\n  return <MarigoldProvider theme={theme}>{children}</MarigoldProvider>;\n}\n`
    );

    const result = detectProvider(dir);
    expect(result.providerFound).toBe(true);
    expect(result.themePassed).toBe(true);
  });

  test('follows the <Providers> indirection to providers.tsx', () => {
    write(
      dir,
      'app/layout.tsx',
      `import { Providers } from './providers';\nexport default function L({ children }) {\n  return <body><Providers>{children}</Providers></body>;\n}\n`
    );
    write(
      dir,
      'app/providers.tsx',
      `import { MarigoldProvider } from '@marigold/components';\nimport theme from '@marigold/theme-rui';\nexport function Providers({ children }) {\n  return <MarigoldProvider theme={theme}>{children}</MarigoldProvider>;\n}\n`
    );

    const result = detectProvider(dir);
    expect(result.providerFound).toBe(true);
    expect(result.themePassed).toBe(true);
  });

  test('resolves a <Providers> import that points at a directory index', () => {
    write(
      dir,
      'app/layout.tsx',
      `import { Providers } from './providers';\nexport default function L({ children }) {\n  return <Providers>{children}</Providers>;\n}\n`
    );
    write(
      dir,
      'app/providers/index.tsx',
      `import { MarigoldProvider } from '@marigold/components';\nimport theme from '@marigold/theme-rui';\nexport function Providers({ children }) {\n  return <MarigoldProvider theme={theme}>{children}</MarigoldProvider>;\n}\n`
    );

    expect(detectProvider(dir).providerFound).toBe(true);
  });

  test('treats a spread prop on the provider as possibly carrying the theme', () => {
    write(
      dir,
      'app/layout.tsx',
      `import { MarigoldProvider } from '@marigold/components';\nexport default function L(props) {\n  return <MarigoldProvider {...props}>{props.children}</MarigoldProvider>;\n}\n`
    );

    const result = detectProvider(dir);
    expect(result.providerFound).toBe(true);
    expect(result.themePassed).toBe(true);
  });

  test('reports no provider when <Providers> cannot be resolved', () => {
    write(
      dir,
      'app/layout.tsx',
      `import { Providers } from '@/components/providers';\nexport default function L({ children }) {\n  return <Providers>{children}</Providers>;\n}\n`
    );

    const result = detectProvider(dir);
    expect(result.layoutFile).not.toBeNull();
    expect(result.providerFound).toBe(false);
  });

  test('reports no provider when a relative <Providers> import resolves to no file', () => {
    write(
      dir,
      'app/layout.tsx',
      `import { Providers } from './missing';\nexport default function L({ children }) {\n  return <Providers>{children}</Providers>;\n}\n`
    );

    expect(detectProvider(dir).providerFound).toBe(false);
  });

  test('resolves a default-imported Providers component', () => {
    write(
      dir,
      'app/layout.tsx',
      `import Providers from './providers';\nexport default function L({ children }) {\n  return <Providers>{children}</Providers>;\n}\n`
    );
    write(
      dir,
      'app/providers.tsx',
      `import { MarigoldProvider } from '@marigold/components';\nimport theme from '@marigold/theme-rui';\nexport default function Providers({ children }) {\n  return <MarigoldProvider theme={theme}>{children}</MarigoldProvider>;\n}\n`
    );

    expect(detectProvider(dir).providerFound).toBe(true);
  });

  test('reports no provider when the layout wraps nothing', () => {
    write(
      dir,
      'app/layout.tsx',
      `export default function L({ children }) {\n  return <html><body>{children}</body></html>;\n}\n`
    );

    expect(detectProvider(dir).providerFound).toBe(false);
  });

  test('finds a provider with no theme prop', () => {
    write(
      dir,
      'app/layout.tsx',
      `import { MarigoldProvider } from '@marigold/components';\nexport default function L({ children }) {\n  return <MarigoldProvider>{children}</MarigoldProvider>;\n}\n`
    );

    const result = detectProvider(dir);
    expect(result.providerFound).toBe(true);
    expect(result.themePassed).toBe(false);
  });
});
