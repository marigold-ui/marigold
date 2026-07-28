import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __wsAttemptStatus?: 'pending' | 'open' | 'closed' | 'error';
  }
}

// Fixture for the render sandbox's network egress test: opens a WebSocket on
// mount and records the outcome on `window` so the test can assert the
// connection never completes (the sandbox must close it).
//
// Deliberately targets a fixed LOCAL port (58211), not an external host: the
// paired test (renderer-websocket.integration.test.ts) binds its own minimal
// WebSocket-handshake server to this exact port before rendering, so the
// connection attempt below WOULD actually succeed if the sandbox's
// `context.routeWebSocket` handler were removed — a real positive control.
// A fixture that targets an external host that simply refuses the handshake
// on its own (nothing is listening there) can't tell "the sandbox blocked
// this" apart from "the target was never reachable regardless" — the test
// would pass either way.
const WebSocketAttempt = () => {
  const [status, setStatus] = useState<'pending' | 'open' | 'closed' | 'error'>(
    'pending'
  );

  useEffect(() => {
    window.__wsAttemptStatus = 'pending';
    const socket = new WebSocket(
      'ws://127.0.0.1:58211/marigold-validate-probe'
    );
    socket.onopen = () => {
      setStatus('open');
      window.__wsAttemptStatus = 'open';
    };
    socket.onclose = () => {
      setStatus('closed');
      window.__wsAttemptStatus = 'closed';
    };
    socket.onerror = () => {
      setStatus('error');
      window.__wsAttemptStatus = 'error';
    };
    return () => socket.close();
  }, []);

  return <div data-testid="ws-status">{status}</div>;
};

export default WebSocketAttempt;
