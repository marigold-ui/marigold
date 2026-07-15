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
import { buildInstallScript } from './browser-helpers.js';
import { createCleanupStack } from './cleanup-stack.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The renderer module gets bundled into dist/, so __dirname is `dist/` after
// build but `src/lib/validate/spatial/` in source. The harness lives at
// ../../../harness relative to spatial/ in source (packages/cli/src/harness),
// and at dist/harness in dist.
const findHarnessDir = (): string => {
  const candidates = [
    path.resolve(__dirname, 'harness'),
    path.resolve(__dirname, '..', 'harness'),
    path.resolve(__dirname, '..', '..', 'harness'),
    path.resolve(__dirname, '..', '..', '..', 'harness'),
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
    server: {
      port,
      strictPort: true,
      host: '127.0.0.1',
      // Defense-in-depth for running untrusted generated code. The primary
      // control is the page-level route filter (below): it aborts every
      // non-same-origin request, so nothing read off disk can be exfiltrated
      // over the network from the rendered page.
      //
      // On the filesystem side this is a DENYLIST, not an allowlist. `fs.allow`
      // is intentionally left at Vite's default (the workspace root) because the
      // render must still serve Vite's own client, the react-refresh runtime,
      // and the symlinked node_modules (whose pnpm realpath points back into the
      // repo) — pinning `allow` to a tight set silently breaks the render across
      // pnpm/npm layouts. So `fs.deny` only blocks the highest-value secrets
      // below; a same-origin `/@fs/<abs>` read of another non-denylisted file
      // the process user can read (e.g. ~/.aws/credentials, ~/.ssh/config,
      // arbitrary *.yaml) is NOT prevented here. That residual exposure is
      // bounded by the threat model — the CLI renders the user's own generated
      // component, in their own environment, single-file, and the process exits
      // right after — and by the network block that stops exfiltration. Tighten
      // to an enforced `allow` allowlist if this ever renders third-party code.
      fs: {
        strict: true,
        deny: [
          '**/.env',
          '**/.env.*',
          '**/*.pem',
          '**/*.key',
          '**/*.crt',
          '**/id_rsa*',
          '**/id_ed25519*',
          '**/.npmrc',
          '**/.git/**',
          '**/.aws/**',
          '**/.ssh/**',
        ],
      },
    },
    appType: 'spa',
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client'],
    },
  });
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error('Vite dev server startup timed out after 15s')),
      15_000
    );
  });
  try {
    await Promise.race([server.listen(), timeout]);
  } finally {
    clearTimeout(timeoutId);
  }
  return server;
};

// Hard per-render wall-clock ceiling (setup + mount). Generous enough for a
// legitimately heavy page, tight enough to bound a hung one (e.g. an infinite
// loop in the generated component) instead of letting the per-op 30s waits stack.
const RENDER_BUDGET_MS = 45_000;

export const createRenderer = async (): Promise<SharedRenderer> => {
  const browser: Browser = await chromium.launch();

  const render = async (
    filePath: string,
    viewport: Viewport
  ): Promise<RenderHandle> => {
    const start = Date.now();
    await ensureCacheDir();
    const workDir = await mkdtemp(path.join(getCacheDir(), 'run-'));

    // Teardown callbacks, registered the instant each resource is created (LIFO:
    // context → server → workDir). The budget race below does NOT cancel
    // build(); relying on an outer `server`/`context` snapshot would miss a
    // resource created *after* the budget fired and orphan it. Registering
    // eagerly — plus the deferred sweep in the catch — guarantees every resource
    // build() ever creates gets torn down, which matters for SharedRenderer reuse
    // and the multi-file follow-up. (Ordering/settle-all/re-run semantics are
    // unit-tested in cleanup-stack.test.ts.)
    const cleanup = createCleanupStack();
    cleanup.push(() => rm(workDir, { recursive: true, force: true }));

    let budgetTimer: ReturnType<typeof setTimeout> | undefined;
    const budget = new Promise<never>((_, reject) => {
      budgetTimer = setTimeout(
        () => reject(new Error(`Render exceeded ${RENDER_BUDGET_MS}ms budget`)),
        RENDER_BUDGET_MS
      );
    });

    const build = async (): Promise<RenderHandle> => {
      await stageHarnessFiles(workDir, filePath);
      linkProjectModules(workDir, filePath);
      const server = await startViteServer(workDir);
      cleanup.push(() => server.close());

      const address = server.httpServer?.address();
      const port = typeof address === 'object' && address ? address.port : null;
      if (port == null) throw new Error('Vite dev server has no port.');
      const serverOrigin = `http://127.0.0.1:${port}`;

      const context = await browser.newContext({
        viewport,
        serviceWorkers: 'block',
      });
      cleanup.push(() => context.close());

      // page.route only intercepts HTTP(S); a WebSocket (or WebRTC data
      // channel) opened by untrusted generated code would bypass it entirely.
      // Close every WebSocket connection attempt so the network sandbox below
      // actually covers all egress, not just fetch/XHR/navigation.
      await context.routeWebSocket('**/*', ws => ws.close());

      const page = await context.newPage();

      // Only the dev server's own origin may load. Untrusted generated code must
      // not reach other local services (SSRF), so no other port and no
      // `localhost` alias are allowed — everything else is aborted.
      await page.route('**/*', route => {
        const url = route.request().url();
        if (url === serverOrigin || url.startsWith(serverOrigin + '/')) {
          return route.continue();
        }
        return route.abort('blockedbyclient');
      });

      // Install the shared browser helpers on window.__mv (cssPath, describeEl,
      // isHidden). This is the single source every check uses to build selectors
      // and describe elements — defined once in browser-helpers.ts.
      await page.addInitScript({ content: buildInstallScript() });

      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() !== 'error') return;
        const text = msg.text();
        // Blocked or missing external resources (e.g. a placeholder image
        // returning net::ERR_BLOCKED_BY_CLIENT) are browser network noise, not
        // React render errors — real render crashes surface via pageerror or the
        // error boundary. Ignore them so a blocked image cannot mark an
        // otherwise valid render as failed.
        if (/Failed to load resource|net::ERR_/i.test(text)) return;
        consoleErrors.push(text);
      });
      page.on('pageerror', err => pageErrors.push(err.message));

      const url = `${serverOrigin}/`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });

      // Wait for the harness "ready" marker, but fail fast if Vite reports a
      // compile/resolve error instead. The harness imports the target file
      // statically, so if the file (or one of its imports) cannot be resolved —
      // the common case for a file that pulls in local modules the single-file
      // sandbox never stages — the module never runs, "ready" never appears, and
      // this would otherwise burn the full 30s. Vite injects a
      // <vite-error-overlay> for exactly those errors; a React *render* error is
      // caught by the harness boundary and still sets "ready", so it is
      // unaffected. Timeout stays 30s as a backstop for a genuinely slow render.
      const readyPromise = page.waitForSelector(
        '[data-validation-root="ready"]',
        { timeout: 30_000 }
      );
      const overlayPromise = page
        .waitForSelector('vite-error-overlay', {
          state: 'attached',
          timeout: 30_000,
        })
        .then(() => {
          throw new Error(
            'the file or one of its imports could not be resolved or compiled — the single-file render sandbox cannot see local modules (use --checks technical for those)'
          );
        });
      // Whichever promise loses the race must not reject unhandled after the
      // context closes.
      readyPromise.catch(() => {});
      overlayPromise.catch(() => {});
      await Promise.race([readyPromise, overlayPromise]);

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
        close: cleanup.run,
      };
      return handle;
    };

    const buildPromise = build();
    // If the budget wins the race, buildPromise rejects later with no local
    // awaiter; mark it handled so it never surfaces as an unhandled rejection.
    buildPromise.catch(() => {});

    try {
      return await Promise.race([buildPromise, budget]);
    } catch (err) {
      // Tear down whatever exists now (a hung page's context abort, the dev
      // server, the temp workdir).
      await cleanup.run();
      // build() is not cancelled by the budget, so it may still create the
      // server/context *after* the line above ran. Its awaits are individually
      // bounded (startup/goto/selector timeouts), so schedule one more teardown
      // once it finally settles — without blocking the caller on those timeouts.
      buildPromise.then(handle => handle.close()).catch(() => cleanup.run());
      throw err;
    } finally {
      clearTimeout(budgetTimer);
    }
  };

  return {
    render,
    close: async () => {
      await browser.close();
    },
  };
};
