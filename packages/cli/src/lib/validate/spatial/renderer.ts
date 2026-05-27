import react from '@vitejs/plugin-react';
import {
  type Browser,
  type BrowserContext,
  type Page,
  chromium,
} from 'playwright';
import { type ViteDevServer, createLogger, createServer } from 'vite';
import fs from 'node:fs';
import { copyFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The renderer module gets bundled into dist/, so __dirname is `dist/` after
// build but `src/lib/validate/spatial/` in source. The harness lives at
// ../../harness relative to spatial/ in source, and at dist/harness in dist.
const findHarnessDir = (): string => {
  const candidates = [
    path.resolve(__dirname, 'harness'),
    path.resolve(__dirname, '..', 'harness'),
    path.resolve(__dirname, '..', '..', 'harness'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(path.join(c, 'index.html'))) return c;
  }
  throw new Error(
    `Could not locate harness directory. Searched: ${candidates.join(', ')}`
  );
};

const findPackageDir = (): string => {
  let dir = __dirname;
  while (dir !== path.dirname(dir)) {
    const pkg = path.join(dir, 'package.json');
    if (fs.existsSync(pkg)) {
      try {
        const json = JSON.parse(fs.readFileSync(pkg, 'utf-8')) as {
          name?: string;
        };
        if (json.name === '@marigold/cli') return dir;
      } catch {
        // Ignore unreadable package.json files and keep walking up.
      }
    }
    dir = path.dirname(dir);
  }
  throw new Error('Could not locate @marigold/cli package directory.');
};

let _harnessDir: string | null = null;
let _cacheDir: string | null = null;

const getHarnessDir = (): string => {
  if (!_harnessDir) _harnessDir = findHarnessDir();
  return _harnessDir;
};

const getCacheDir = (): string => {
  if (!_cacheDir) {
    _cacheDir = path.join(
      findPackageDir(),
      'node_modules',
      '.cache',
      'validate'
    );
  }
  return _cacheDir;
};

export type Viewport = { width: number; height: number };

export type CapturedRenderError = {
  message: string;
  stack?: string;
  componentStack?: string;
};

export type RenderResult = {
  page: Page;
  context: BrowserContext;
  consoleErrors: string[];
  pageErrors: string[];
  renderErrors: CapturedRenderError[];
  renderTimeMs: number;
};

export type RenderHandle = {
  result: RenderResult;
  close: () => Promise<void>;
};

export type SharedRenderer = {
  render: (filePath: string, viewport: Viewport) => Promise<RenderHandle>;
  close: () => Promise<void>;
};

const findFreePort = async (): Promise<number> =>
  new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const address = srv.address();
      if (address && typeof address === 'object') {
        const { port } = address;
        srv.close(() => resolve(port));
      } else {
        srv.close();
        reject(new Error('Could not allocate port for Vite dev server.'));
      }
    });
  });

const ensureCacheDir = async (): Promise<string> => {
  await mkdir(getCacheDir(), { recursive: true });
  return getCacheDir();
};

const stageHarnessFiles = async (
  workDir: string,
  filePath: string
): Promise<void> => {
  await mkdir(workDir, { recursive: true });
  for (const f of ['index.html', 'entry.tsx', 'setup.tsx']) {
    await copyFile(path.join(getHarnessDir(), f), path.join(workDir, f));
  }
  // The harness imports `./Component.js`; Vite resolves that to the staged
  // .tsx file via its bundler-style extension matching.
  await copyFile(filePath, path.join(workDir, 'Component.tsx'));
};

const findProjectNodeModules = (filePath: string): string | undefined => {
  let dir = path.dirname(filePath);
  while (dir !== path.dirname(dir)) {
    const nm = path.join(dir, 'node_modules');
    if (fs.existsSync(path.join(nm, '@marigold', 'components'))) return nm;
    dir = path.dirname(dir);
  }
  return undefined;
};

const linkProjectModules = (workDir: string, sourceFilePath: string): void => {
  const projectNm = findProjectNodeModules(sourceFilePath);
  if (!projectNm) return;
  const target = path.join(workDir, 'node_modules');
  if (fs.existsSync(target)) return;
  fs.symlinkSync(projectNm, target, 'junction');
};

const startViteServer = async (workDir: string): Promise<ViteDevServer> => {
  const port = await findFreePort();

  const server = await createServer({
    root: workDir,
    configFile: false,
    plugins: [react()],
    customLogger: createLogger('silent'),
    server: { port, strictPort: true, host: '127.0.0.1' },
    appType: 'spa',
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client'],
    },
  });
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error('Vite dev server startup timed out after 15s')),
      15_000
    )
  );
  await Promise.race([server.listen(), timeout]);
  return server;
};

export const createRenderer = async (): Promise<SharedRenderer> => {
  const browser: Browser = await chromium.launch();

  const render = async (
    filePath: string,
    viewport: Viewport
  ): Promise<RenderHandle> => {
    const start = Date.now();
    await ensureCacheDir();
    const workDir = await mkdtemp(path.join(getCacheDir(), 'run-'));
    let server: ViteDevServer | undefined;
    let context: BrowserContext | undefined;

    try {
      await stageHarnessFiles(workDir, filePath);
      linkProjectModules(workDir, filePath);
      server = await startViteServer(workDir);

      context = await browser.newContext({
        viewport,
        serviceWorkers: 'block',
      });
      const page = await context.newPage();

      await page.route('**/*', route => {
        const url = route.request().url();
        if (
          url.startsWith('http://127.0.0.1') ||
          url.startsWith('http://localhost')
        ) {
          return route.continue();
        }
        return route.abort('blockedbyclient');
      });

      await page.addInitScript(() => {
        (window as unknown as Record<string, unknown>).__cssPath = (
          el: Element
        ): string => {
          const parts: string[] = [];
          let cur: Element | null = el;
          while (
            cur &&
            cur.nodeType === 1 &&
            cur !== document.documentElement
          ) {
            const idx = cur.parentElement
              ? Array.from(cur.parentElement.children).indexOf(cur)
              : 0;
            parts.unshift(
              cur.tagName.toLowerCase() + ':nth-child(' + (idx + 1) + ')'
            );
            cur = cur.parentElement;
          }
          return parts.join(' > ');
        };
      });

      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', err => pageErrors.push(err.message));

      const address = server.httpServer?.address();
      const port = typeof address === 'object' && address ? address.port : null;
      if (port == null) throw new Error('Vite dev server has no port.');

      const url = `http://127.0.0.1:${port}/`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
      await page.waitForSelector('[data-validation-root="ready"]', {
        timeout: 30_000,
      });

      const renderErrors: CapturedRenderError[] = await page.evaluate(() => {
        const w = window as Window & {
          __marigoldValidateRenderErrors?: Array<{
            message: string;
            stack?: string;
            componentStack?: string;
          }>;
        };
        return w.__marigoldValidateRenderErrors ?? [];
      });

      const handle: RenderHandle = {
        result: {
          page,
          context,
          consoleErrors,
          pageErrors,
          renderErrors,
          renderTimeMs: Date.now() - start,
        },
        close: async () => {
          await context?.close();
          await server?.close();
          await rm(workDir, { recursive: true, force: true });
        },
      };
      return handle;
    } catch (err) {
      // Tear down any partially-constructed state, then rethrow so the
      // caller can convert the failure into a ValidationIssue.
      await context?.close().catch(() => undefined);
      await server?.close().catch(() => undefined);
      await rm(workDir, { recursive: true, force: true }).catch(
        () => undefined
      );
      throw err;
    }
  };

  return {
    render,
    close: async () => {
      await browser.close();
    },
  };
};
