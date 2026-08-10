import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __wsAttemptStatus?: 'pending' | 'open' | 'closed' | 'error';
  }
}

// Fixture for the sandbox's network egress test: opens a WebSocket on mount
// and records the outcome on `window`.
//
// Targets a fixed LOCAL port because the paired test binds its own handshake
// server there first, so this WOULD succeed without the sandbox's
// `routeWebSocket` handler — a real positive control. Against an external host
// that simply refuses, the test would pass either way.
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
