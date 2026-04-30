import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { runInit } from './init.js';

let dir: string;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-init-'));
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

const seedNextProject = () => {
  fs.writeFileSync(path.join(dir, 'next.config.mjs'), '');
  fs.writeFileSync(path.join(dir, 'pnpm-lock.yaml'), '');
  fs.mkdirSync(path.join(dir, 'app'), { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'app/layout.tsx'),
    `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`
  );
};

const seedViteProject = () => {
  fs.writeFileSync(
    path.join(dir, 'vite.config.ts'),
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`
  );
  fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'src/main.tsx'),
    `import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(<App />);
`
  );
};

describe('runInit (integration, skipInstall)', () => {
  it('wires up a Next.js project end-to-end', async () => {
    seedNextProject();

    await runInit({ cwd: dir, yes: true, skipInstall: true });

    const layout = fs.readFileSync(path.join(dir, 'app/layout.tsx'), 'utf8');
    expect(layout).toContain(`import { Providers } from './providers';`);
    expect(layout).toContain('<Providers>{children}</Providers>');

    const providers = fs.readFileSync(
      path.join(dir, 'app/providers.tsx'),
      'utf8'
    );
    expect(providers).toContain('MarigoldProvider');

    const css = fs.readFileSync(path.join(dir, 'app/globals.css'), 'utf8');
    expect(css).toContain(`@import 'tailwindcss';`);
    expect(css).toContain(`@import '@marigold/theme-rui/theme.css';`);

    const postcss = fs.readFileSync(
      path.join(dir, 'postcss.config.mjs'),
      'utf8'
    );
    expect(postcss).toContain('@tailwindcss/postcss');
  });

  it('wires up a Vite project end-to-end', async () => {
    seedViteProject();

    await runInit({ cwd: dir, yes: true, skipInstall: true });

    const main = fs.readFileSync(path.join(dir, 'src/main.tsx'), 'utf8');
    expect(main).toContain(
      `import { MarigoldProvider } from '@marigold/components';`
    );
    expect(main).toContain(`import theme from '@marigold/theme-rui';`);
    expect(main).toContain(
      '<MarigoldProvider theme={theme}><App /></MarigoldProvider>'
    );

    const viteConfig = fs.readFileSync(
      path.join(dir, 'vite.config.ts'),
      'utf8'
    );
    expect(viteConfig).toContain(
      `import tailwindcss from '@tailwindcss/vite';`
    );
    expect(viteConfig).toMatch(/tailwindcss\(\)/);

    const css = fs.readFileSync(path.join(dir, 'src/index.css'), 'utf8');
    expect(css).toContain(`@import 'tailwindcss';`);
  });

  it('is idempotent — second run leaves files unchanged', async () => {
    seedNextProject();

    await runInit({ cwd: dir, yes: true, skipInstall: true });
    const layoutBefore = fs.readFileSync(
      path.join(dir, 'app/layout.tsx'),
      'utf8'
    );
    const cssBefore = fs.readFileSync(
      path.join(dir, 'app/globals.css'),
      'utf8'
    );

    await runInit({ cwd: dir, yes: true, skipInstall: true });
    const layoutAfter = fs.readFileSync(
      path.join(dir, 'app/layout.tsx'),
      'utf8'
    );
    const cssAfter = fs.readFileSync(path.join(dir, 'app/globals.css'), 'utf8');

    expect(layoutAfter).toBe(layoutBefore);
    expect(cssAfter).toBe(cssBefore);
  });

  it('preserves unrelated content in the layout file', async () => {
    fs.writeFileSync(path.join(dir, 'next.config.mjs'), '');
    fs.mkdirSync(path.join(dir, 'app'), { recursive: true });
    const original = `// custom banner — keep me\nimport './styles.css';\nimport { Inter } from 'next/font/google';\n\nconst inter = Inter({ subsets: ['latin'] });\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en" className={inter.className}>\n      <body>{children}</body>\n    </html>\n  );\n}\n`;
    fs.writeFileSync(path.join(dir, 'app/layout.tsx'), original);

    await runInit({ cwd: dir, yes: true, skipInstall: true });

    const layout = fs.readFileSync(path.join(dir, 'app/layout.tsx'), 'utf8');
    expect(layout).toContain('// custom banner — keep me');
    expect(layout).toContain(`import './styles.css';`);
    expect(layout).toContain(`Inter({ subsets: ['latin'] })`);
    expect(layout).toContain('<Providers>{children}</Providers>');
  });
});
