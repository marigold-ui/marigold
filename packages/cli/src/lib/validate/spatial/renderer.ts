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
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildInstallScript } from './browser-helpers.js';
import { createCleanupStack } from './cleanup-stack.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// __dirname is `dist/` after bundling but `src/lib/validate/spatial/` in
// source, so try both layouts.
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
        // Unreadable package.json — keep walking up.
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

// Must stay inside the CLI's own package: `fs.allow` derives from `root`, and
// the harness loads the symlinked node_modules whose pnpm realpath points back
// into the installing project. From os.tmpdir() that realpath falls outside the
// boundary, React never loads, and every render dies on the budget timeout.
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

// Carries elapsed time so a timed-out render isn't reported as 0ms.
export type RenderTimingError = Error & { renderTimeMs?: number };

export type SharedRenderer = {
  render: (filePath: string, viewport: Viewport) => Promise<RenderHandle>;
  close: () => Promise<void>;
};

// Unsubstituted placeholders carry no information; only the text after them
// does. Anchored to the start so a genuine "%o" in a message body survives.
export const stripConsoleFormatTokens = (text: string): string =>
  text.replace(/^(?:%[sdifoOc]\s*)+/, '').trimStart();

// An unwritable workdir is an environment precondition (read-only or
// root-owned install), not a defect in the file being validated. The stable
// `name` lets validate/index.ts degrade to a warning without importing this
// module statically, which would pull playwright/vite onto the hot path.
export class RenderEnvironmentUnavailableError extends Error {
  override name = 'RenderEnvironmentUnavailableError';
}

const ensureCacheDir = async (): Promise<string> => {
  try {
    await mkdir(getCacheDir(), { recursive: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new RenderEnvironmentUnavailableError(
      `Cannot create the render workdir at ${getCacheDir()}: ${message}`
    );
  }
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
  // The harness imports `./Component.js`; Vite resolves that to this .tsx.
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
  const server = await createServer({
    root: workDir,
    configFile: false,
    plugins: [react()],
    customLogger: createLogger('silent'),
    server: {
      // Let the OS assign the port at bind time; probing one and re-binding
      // it with strictPort leaves a TOCTOU gap another process can win.
      port: 0,
      strictPort: false,
      host: '127.0.0.1',
      // Defense-in-depth for untrusted generated code; the route filter below
      // is the primary control, aborting every non-same-origin request.
      //
      // This is a DENYLIST. `fs.allow` stays at Vite's default (workspace
      // root) because the render must still serve Vite's client, react-refresh
      // and the symlinked node_modules whose pnpm realpath points back into the
      // repo — pinning it breaks the render across pnpm/npm layouts. Residual:
      // any other readable file under the workspace root matching no deny glob,
      // plus Vite's history of URL-encoding bypasses on `/@fs/`. Bounded by the
      // threat model (user's own single file, own machine, process exits after)
      // and the network block. Use an enforced allowlist if this ever renders
      // third-party code.
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
  } catch (err) {
    // On timeout `server` is never returned, so the caller's cleanup is never
    // registered and the socket/watchers would leak. Close it on this path.
    await server.close().catch(() => {});
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
  return server;
};

// Hard per-render ceiling (setup + mount): generous for a heavy page, tight
// enough to bound a hung one instead of letting the per-op waits stack.
const RENDER_BUDGET_MS = 45_000;

export const createRenderer = async (): Promise<SharedRenderer> => {
  // Explicit bound, like every other async step here, rather than relying on
  // Playwright's default.
  const browser: Browser = await chromium.launch({ timeout: 30_000 });

  const render = async (
    filePath: string,
    viewport: Viewport
  ): Promise<RenderHandle> => {
    const start = Date.now();
    await ensureCacheDir();
    const workDir = await mkdtemp(path.join(getCacheDir(), 'run-'));

    // Registered the instant each resource is created (LIFO). The budget race
    // below does not cancel build(), so an outer `server`/`context` snapshot
    // would orphan anything created after the budget fired; eager registration
    // plus the deferred sweep in the catch covers every resource.
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

      // A WebSocket would bypass an HTTP-only filter entirely.
      await context.routeWebSocket('**/*', ws => ws.close());

      // RTCPeerConnection and Workers are egress paths the route filters
      // cannot see: a peer connection leaks the host IP over UDP/STUN even
      // through a proxy, and a Worker runs its own scope with its own
      // fetch/WebSocket that the filters never attach to. Playwright has no
      // filter for either, so remove the constructors before any page script.
      await context.addInitScript(() => {
        const w = window as unknown as Record<string, unknown>;
        w.RTCPeerConnection = undefined;
        // Chromium exposes the legacy alias as a separate constructible
        // reference: with RTCPeerConnection undefined, `new
        // webkitRTCPeerConnection()` still succeeds.
        w.webkitRTCPeerConnection = undefined;
        w.RTCDataChannel = undefined;
        w.Worker = undefined;
        w.SharedWorker = undefined;
      });

      const page = await context.newPage();

      // Deny popups (window.open, target="_blank"). Registered after `page`
      // exists so it never fires for `page` itself. A popup's route handler
      // only takes effect once its initial navigation is underway, so closing
      // it beats relying on that timing.
      //
      // Only pages with a non-null `opener()` are genuine popups. An
      // unconditional `p !== page` check would also close the blank page
      // axe-core's driver opens via `context.newPage()` to aggregate
      // cross-frame results, failing every a11y audit.
      context.on('page', p => {
        if (p === page) return;
        p.opener()
          .then(opener => {
            if (opener === page) p.close().catch(() => {});
          })
          .catch(() => {});
      });

      // Only the dev server's origin may load — no other port and no
      // `localhost` alias, so generated code cannot reach local services
      // (SSRF). On the CONTEXT, not the page: `page.route` covers only the one
      // Page it was called on, leaving a popup with no filter at all.
      await context.route('**/*', route => {
        const url = route.request().url();
        if (url === serverOrigin || url.startsWith(serverOrigin + '/')) {
          return route.continue();
        }
        return route.abort('blockedbyclient');
      });

      // Shared helpers on window.__mv (cssPath, describeEl, isHidden) — the
      // single source every check uses to build selectors.
      await page.addInitScript({ content: buildInstallScript() });

      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() !== 'error') return;
        const text = msg.text();
        // Blocked or missing external resources are network noise, not React
        // errors — real crashes arrive via pageerror or the error boundary.
        if (/Failed to load resource|net::ERR_/i.test(text)) return;
        // Closing Vite's HMR WebSocket above costs three console errors on
        // every render regardless of the user's code: the client's reconnect
        // failure, the browser's connection failure, and the client's failure
        // to forward page errors over the dead transport.
        if (
          /^\[vite\] failed to connect to websocket/i.test(text) ||
          /^WebSocket connection to .* failed/i.test(text) ||
          /^Failed to send error to Vite server:/i.test(text)
        )
          return;
        // React's error-boundary report arrives as an unsubstituted template
        // ("%o\n\n%s\n\n%s\n"); strip the tokens but keep the text after them.
        consoleErrors.push(stripConsoleFormatTokens(text));
      });
      page.on('pageerror', err => pageErrors.push(err.message));

      const url = `${serverOrigin}/`;
      // 'commit', not 'networkidle': the ready-marker wait below is the real
      // readiness signal, and networkidle never settles here because the
      // closed HMR WebSocket keeps the client retrying.
      //
      // This and the two waits below use RENDER_BUDGET_MS rather than a
      // tighter value: the `budget` race already bounds build() as a whole, so
      // a tighter per-op timeout could only fire early on a slow-but-healthy
      // render. Cost: a hang reports the generic budget error instead of
      // naming the wait that stalled.
      await page.goto(url, { waitUntil: 'commit', timeout: RENDER_BUDGET_MS });

      // Wait for the harness "ready" marker, but fail fast on a Vite
      // compile/resolve error: the harness imports the target statically, so
      // an unresolvable import means the module never runs and "ready" never
      // appears. A React *render* error still sets "ready" via the harness
      // boundary and is unaffected.
      const readyPromise = page.waitForSelector(
        '[data-validation-root="ready"]',
        { timeout: RENDER_BUDGET_MS }
      );
      const overlayPromise = page
        .waitForSelector('vite-error-overlay', {
          state: 'attached',
          timeout: RENDER_BUDGET_MS,
        })
        .then(() => {
          throw new Error(
            'the file or one of its imports could not be resolved or compiled — the single-file render sandbox cannot see local modules (use --checks technical for those)'
          );
        });
      // The loser must not reject unhandled after the context closes.
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
    // If the budget wins, this rejects later with no awaiter.
    buildPromise.catch(() => {});

    try {
      return await Promise.race([buildPromise, budget]);
    } catch (err) {
      await cleanup.run();
      // build() isn't cancelled, so it may still create resources after the
      // sweep above. Its awaits are individually bounded, so schedule one more
      // teardown without blocking the caller on those timeouts.
      buildPromise.then(handle => handle.close()).catch(() => cleanup.run());
      // The caller still needs real elapsed time for its metadata.
      if (err instanceof Error) {
        (err as RenderTimingError).renderTimeMs = Date.now() - start;
      }
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
