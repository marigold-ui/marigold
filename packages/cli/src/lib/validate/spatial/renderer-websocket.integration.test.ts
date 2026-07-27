/* eslint-disable testing-library/no-render-in-lifecycle, testing-library/render-result-naming-convention -- `renderer.render` is this package's own Playwright-backed SharedRenderer, unrelated to React Testing Library's render(); the plugin's name-based heuristic false-positives on it. */
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import crypto from 'node:crypto';
import http from 'node:http';
import type { Socket } from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { type SharedRenderer, createRenderer } from './renderer.js';

// Integration coverage for the render sandbox's network egress control.
// page.route only intercepts HTTP(S); a WebSocket opened by untrusted
// generated code would otherwise bypass it. Same self-skip rationale as
// renderer.integration.test.ts: a real render needs a working Chromium, which
// isn't available on a bare CI runner.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const example = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

const viewport = { width: 1280, height: 720 };

// Must match the fixed port websocket-attempt.tsx's WebSocket targets — see
// that file's own comment for why a fixed local port, not an external host.
const WS_TARGET_PORT = 58211;
const WS_MAGIC_GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

// Thrown when WS_TARGET_PORT is still busy after every retry — a stray
// process holding the port is an environment problem, not a real assertion
// failure, so callers catch this specifically and skip rather than fail.
class PortBusyError extends Error {}

const PORT_BIND_RETRIES = 5;
const PORT_BIND_RETRY_DELAY_MS = 200;

// The minimal server-side half of the RFC 6455 opening handshake — enough to
// make a real client's `onopen` fire, nothing more (no frame parsing/echo;
// the fixture only observes open/close/error, never sends or expects a
// message). This is what makes websocket-attempt.tsx's target a genuine
// positive control: a bare `http` server with no 'upgrade' handling would
// refuse the request outright, and a target that refuses *unconditionally*
// can't tell "the sandbox blocked this" apart from "nothing was listening
// anyway" — the same gap this fixture used to have, and the reason it must
// be provably capable of accepting the handshake absent the sandbox.
const startWsHandshakeServer = (
  retriesLeft = PORT_BIND_RETRIES
): Promise<{ close: () => Promise<void> }> =>
  new Promise((resolve, reject) => {
    const server = http.createServer();
    // The upgraded raw socket bypasses http.Server's normal request
    // lifecycle, so it's never counted as "finished" the way a completed
    // HTTP response would be — a plain server.close() waits forever for a
    // connection it has no way of knowing is done, and closeAllConnections()
    // does not reach it either (confirmed empirically). Track and destroy
    // every raw socket by hand instead of waiting for a graceful end that
    // never comes.
    const sockets = new Set<Socket>();
    server.on('connection', socket => {
      sockets.add(socket);
      socket.on('close', () => sockets.delete(socket));
    });
    server.on('upgrade', (req, socket) => {
      const key = req.headers['sec-websocket-key'];
      if (typeof key !== 'string') {
        socket.destroy();
        return;
      }
      const accept = crypto
        .createHash('sha1')
        .update(key + WS_MAGIC_GUID)
        .digest('base64');
      socket.write(
        'HTTP/1.1 101 Switching Protocols\r\n' +
          'Upgrade: websocket\r\n' +
          'Connection: Upgrade\r\n' +
          `Sec-WebSocket-Accept: ${accept}\r\n\r\n`
      );
    });
    server.on('error', err => {
      // The fixture targets a fixed port on purpose (it must match
      // websocket-attempt.tsx's hardcoded target), so a stray process still
      // holding it from a prior interrupted run cannot be worked around by
      // picking a different port. Retry with a short backoff instead of
      // failing outright; only give up (as a distinguishable error, so
      // callers can skip instead of fail) once retries are exhausted.
      if (
        (err as NodeJS.ErrnoException).code === 'EADDRINUSE' &&
        retriesLeft > 0
      ) {
        setTimeout(() => {
          startWsHandshakeServer(retriesLeft - 1).then(resolve, reject);
        }, PORT_BIND_RETRY_DELAY_MS);
        return;
      }
      if ((err as NodeJS.ErrnoException).code === 'EADDRINUSE') {
        reject(
          new PortBusyError(
            `Port ${WS_TARGET_PORT} still in use after ${PORT_BIND_RETRIES} retries`
          )
        );
        return;
      }
      reject(err);
    });
    server.listen(WS_TARGET_PORT, '127.0.0.1', () =>
      resolve({
        close: () =>
          new Promise<void>((res, rej) => {
            for (const socket of sockets) socket.destroy();
            server.close(err => (err ? rej(err) : res()));
          }),
      })
    );
  });

let renderer: SharedRenderer | undefined;
let renderWorks = false;

beforeAll(async () => {
  try {
    renderer = await createRenderer();
    const handle = await renderer.render(example('valid-button.tsx'), viewport);
    renderWorks = handle.result.renderTimeMs > 0;
    await handle.close();
  } catch {
    renderWorks = false;
  }
}, 60_000);

afterAll(async () => {
  await renderer?.close();
});

describe('render sandbox network egress (requires a working render environment)', () => {
  let wsServer: { close: () => Promise<void> } | undefined;

  afterEach(async () => {
    await wsServer?.close();
    wsServer = undefined;
  });

  it('sanity check: the local target genuinely accepts a WebSocket handshake', async ctx => {
    // Proves the positive control itself is real — independent of the
    // renderer/sandbox entirely — using Node's own WebSocket client directly
    // against the same server and port the fixture targets. Without this,
    // a bug in startWsHandshakeServer could silently turn the main test back
    // into a vacuous one.
    try {
      wsServer = await startWsHandshakeServer();
    } catch (err) {
      if (err instanceof PortBusyError) return ctx.skip();
      throw err;
    }
    const socket = new WebSocket(`ws://127.0.0.1:${WS_TARGET_PORT}/`);
    try {
      await new Promise<void>((resolve, reject) => {
        socket.onopen = () => resolve();
        socket.onerror = () =>
          reject(new Error('expected the handshake to succeed'));
        setTimeout(
          () => reject(new Error('timed out waiting for open')),
          5_000
        );
      });
      expect(socket.readyState).toBe(WebSocket.OPEN);
    } finally {
      socket.close();
    }
  }, 10_000);

  it('closes a WebSocket opened by the rendered component instead of letting it connect', async ctx => {
    if (!renderWorks || !renderer) return ctx.skip();
    try {
      wsServer = await startWsHandshakeServer();
    } catch (err) {
      if (err instanceof PortBusyError) return ctx.skip();
      throw err;
    }

    const handle = await renderer.render(
      example('websocket-attempt.tsx'),
      viewport
    );
    type WsWindow = Window & { __wsAttemptStatus?: string };
    try {
      await handle.result.page.waitForFunction(
        () => (window as WsWindow).__wsAttemptStatus !== 'pending',
        undefined,
        { timeout: 10_000 }
      );
      const status = await handle.result.page.evaluate(
        () => (window as WsWindow).__wsAttemptStatus
      );
      // The sandbox must never let the socket reach `open` — it should be
      // closed (or errored) before the handshake completes. The sanity-check
      // test above proves this target would otherwise genuinely accept it.
      expect(status).not.toBe('open');
    } finally {
      await handle.close();
    }
  }, 60_000);
});
