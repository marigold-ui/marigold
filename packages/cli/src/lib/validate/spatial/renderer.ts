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

// The workdir has to stay inside the CLI's own package: Vite's `fs.allow`
// defaults to the workspace root derived from `root` (= the workdir), and the
// harness is served the symlinked node_modules whose pnpm realpath points back
// into the installing project. Relocating this to os.tmpdir() puts that realpath
// outside the allow boundary, so the harness can never load React and every
// render dies on the budget timeout instead. ensureCacheDir() below therefore
// classifies an unwritable location rather than moving off it.
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

// A render failure still carries how long it ran for, attached here so the
// caller's metadata isn't stuck reporting 0ms for a render that actually
// spent real wall-clock time before timing out.
export type RenderTimingError = Error & { renderTimeMs?: number };

export type SharedRenderer = {
  render: (filePath: string, viewport: Viewport) => Promise<RenderHandle>;
  close: () => Promise<void>;
};

// A console template whose placeholders were never substituted carries no
// information — only the text after them does. Anchored to the start and to
// whitespace-separated tokens so a genuine "%o" inside a message body (or a
// literal percent in user text) is left untouched.
export const stripConsoleFormatTokens = (text: string): string =>
  text.replace(/^(?:%[sdifoOc]\s*)+/, '').trimStart();

// An unwritable workdir location is an environment precondition — a read-only
// or root-owned install (`npm i -g` as root, an immutable container layer, a
// Nix/Homebrew-style store) — not a defect in the file being validated. Carries
// a stable `name` so validate/index.ts can recognise it and degrade to a
// warning without statically importing this module (which would pull
// playwright/vite back onto the hot path that the dynamic import keeps them off).
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
  const server = await createServer({
    root: workDir,
    configFile: false,
    plugins: [react()],
    customLogger: createLogger('silent'),
    server: {
      // Let the OS assign a free ephemeral port at bind time (port: 0)
      // instead of probing one, closing the probe, and re-binding it with
      // strictPort — the probe-then-rebind gap is a TOCTOU race another
      // process can win. `server.httpServer.address()` (read by the caller
      // once listen() resolves) gives the actual bound port.
      port: 0,
      strictPort: false,
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
      // pnpm/npm layouts. `fs.strict` plus the default `fs.allow` already confine
      // any `/@fs/<abs>` read to the workspace root, and the deny list below
      // covers the highest-value secrets a same-origin read could otherwise
      // reach there (`.aws/`, `.ssh/`, `.env*`, key/cert files, `.npmrc`). The
      // real residual is narrower than "anything outside the deny list": any
      // OTHER readable file inside the workspace root that doesn't match a deny
      // glob (e.g. an unrelated package's source, a stray `*.yaml`), plus the
      // fact that Vite's glob-based `fs.deny` has a documented history of
      // query-string/URL-encoding bypasses on `/@fs/` requests. That residual is
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
  } catch (err) {
    // If the startup timeout wins the race, this function throws before ever
    // returning `server` to the caller — so the caller's own
    // `cleanup.push(() => server.close())` (registered only after a
    // successful return) never runs, and the bound socket/watchers leak.
    // Close it here, on the throwing path itself.
    await server.close().catch(() => {});
    throw err;
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
  // Playwright already defaults launch's own timeout to 30s, but every other
  // async step in this file states its bound explicitly rather than relying
  // on an undocumented-from-this-file default — do the same here.
  const browser: Browser = await chromium.launch({ timeout: 30_000 });

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

      // A WebSocket or a WebRTC data channel opened by untrusted generated
      // code would bypass an HTTP-only filter entirely. Close every WebSocket
      // connection attempt so the network sandbox below actually covers more
      // than just fetch/XHR/navigation.
      await context.routeWebSocket('**/*', ws => ws.close());

      // WebRTC (RTCPeerConnection) and dedicated/shared Web Workers are
      // separate egress paths `context.route`/`routeWebSocket` cannot see:
      // - RTCPeerConnection can establish a P2P/STUN connection over UDP and
      //   leak the host's real IP even through a proxy.
      // - A Worker/SharedWorker runs its own global scope with its own
      //   fetch/XHR/WebSocket, which the route filters above never attach to
      //   — untrusted code could `new Worker(...)` a blob URL and exfiltrate
      //   straight from inside it, bypassing the HTTP-only page-level filter
      //   entirely.
      // There is no Playwright-level filter for either, so neuter the
      // constructors themselves before any page script runs — removing the
      // ability to create one in the first place, rather than trying to
      // sandbox it after the fact.
      await context.addInitScript(() => {
        const w = window as unknown as Record<string, unknown>;
        w.RTCPeerConnection = undefined;
        // Chromium still exposes the legacy prefixed alias as a separate,
        // independently constructible reference — nulling only the unprefixed
        // name leaves a working path to a peer connection (verified: with
        // RTCPeerConnection undefined, `new webkitRTCPeerConnection()` still
        // succeeds) and with it the UDP/STUN IP leak below.
        w.webkitRTCPeerConnection = undefined;
        w.RTCDataChannel = undefined;
        w.Worker = undefined;
        w.SharedWorker = undefined;
      });

      const page = await context.newPage();

      // Deny popups outright (window.open, target="_blank", a trusted click
      // fired by the interaction driver). Registered only AFTER the main
      // page above is created, so this never fires for `page` itself — it
      // would otherwise close the very page we just created. A popup Page
      // starts with no route handler of its own, so it would otherwise reach
      // the open network even with the context-level route below in place —
      // Playwright applies `context.route` to pages that exist at the time
      // it's registered plus ones created afterwards, but a route handler
      // still only takes effect once the new page's initial navigation is
      // underway, leaving a window for a popup to slip through. Closing it
      // immediately removes that window rather than relying on timing.
      //
      // Only pages with a non-null `opener()` are genuine popups — that's
      // exactly what distinguishes "opened via window.open()/target=_blank
      // from inside `page`" from a page the *Node side* creates directly via
      // `context.newPage()`. The a11y audit relies on the latter: axe-core's
      // playwright driver (`AxeBuilder.analyze()` -> `finishRun()`) opens its
      // own blank `context.newPage()` to aggregate cross-frame results; an
      // unconditional `p !== page` check would close that page out from
      // under it, making every axe audit fail with "Target page, context or
      // browser has been closed".
      context.on('page', p => {
        if (p === page) return;
        p.opener()
          .then(opener => {
            if (opener === page) p.close().catch(() => {});
          })
          .catch(() => {});
      });

      // Only the dev server's own origin may load. Untrusted generated code must
      // not reach other local services (SSRF), so no other port and no
      // `localhost` alias are allowed — everything else is aborted.
      // Registered on the CONTEXT, not the page: `page.route` only ever
      // covers the single Page it was called on, so a popup (a new Page)
      // would otherwise inherit no filter at all and reach the open network
      // — `context.route` covers every page in the context, present and
      // future, closing that gap.
      await context.route('**/*', route => {
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
        // The sandbox's own `context.routeWebSocket` above (necessarily)
        // closes every WebSocket, including Vite's own HMR client's — which
        // then logs its own reconnect failure, and the browser itself logs
        // the underlying connection failure too. With its transport gone,
        // Vite's client also can't forward the page's own runtime errors
        // back over HMR and logs that failure as a THIRD console.error (see
        // client.mjs's sendError -> "Failed to send error to Vite server:").
        // All three fire on every single render regardless of the user's
        // code, so surfacing them as "Console error during render" would be
        // pure sandbox self-noise, not a signal about the code under test.
        if (
          /^\[vite\] failed to connect to websocket/i.test(text) ||
          /^WebSocket connection to .* failed/i.test(text) ||
          /^Failed to send error to Vite server:/i.test(text)
        )
          return;
        // React logs its error-boundary report through a console template
        // ("%o\n\n%s\n\n%s\n") whose placeholders arrive unsubstituted, so the
        // message would otherwise be reported to the caller with a leading run
        // of literal %o/%s tokens before the real text. Strip that prefix —
        // dropping the message entirely would lose the error content that
        // follows it, which is genuine signal about the file under test.
        consoleErrors.push(stripConsoleFormatTokens(text));
      });
      page.on('pageerror', err => pageErrors.push(err.message));

      const url = `${serverOrigin}/`;
      // 'commit' rather than 'networkidle': the ready-marker wait right below
      // is the real readiness signal, so goto only needs to get the document
      // committed and start loading. 'networkidle' never reliably settles here
      // at all — the sandbox's own `context.routeWebSocket` above force-closes
      // Vite's HMR WebSocket, so the client keeps retrying the connection,
      // which counts as ongoing network activity and can burn goto's entire
      // timeout before the module has even finished evaluating.
      //
      // This and the two waits below are individually capped at
      // RENDER_BUDGET_MS rather than some tighter fixed value: the
      // Promise.race against `budget` further down already bounds build() as
      // a whole at RENDER_BUDGET_MS, so that's the real hang-detector for a
      // genuinely stuck render. A per-op timeout tighter than that adds no
      // extra protection — it can only fire *before* the real backstop would,
      // on a legitimately (if unusually) slow step under CPU contention,
      // turning a healthy-but-slow render into a false failure. Trade-off:
      // since the outer `budget` timer starts before any of setup/goto/wait
      // runs, it now always wins a genuine hang before these per-op timeouts
      // would — so every hang surfaces as the generic "Render exceeded
      // 45000ms budget" rather than pinpointing which specific wait stalled.
      // Accepted: a slightly less specific error message for a real hang, in
      // exchange for never turning a healthy-but-slow render into a false
      // failure.
      await page.goto(url, { waitUntil: 'commit', timeout: RENDER_BUDGET_MS });

      // Wait for the harness "ready" marker, but fail fast if Vite reports a
      // compile/resolve error instead. The harness imports the target file
      // statically, so if the file (or one of its imports) cannot be resolved —
      // the common case for a file that pulls in local modules the single-file
      // sandbox never stages — the module never runs, "ready" never appears, and
      // this would otherwise burn the full timeout. Vite injects a
      // <vite-error-overlay> for exactly those errors; a React *render* error is
      // caught by the harness boundary and still sets "ready", so it is
      // unaffected.
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
      // The caller (validate/index.ts) reports render failures as an issue but
      // still needs real elapsed time for its metadata — attach it here so a
      // timed-out render doesn't get reported as taking 0ms.
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
