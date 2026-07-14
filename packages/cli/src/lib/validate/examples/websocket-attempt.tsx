import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __wsAttemptStatus?: 'pending' | 'open' | 'closed' | 'error';
  }
}

// Fixture for the render sandbox's network egress test: opens a WebSocket to
// an external origin on mount and records the outcome on `window` so the test
// can assert the connection never completes (the sandbox must close it).
const WebSocketAttempt = () => {
  const [status, setStatus] = useState<'pending' | 'open' | 'closed' | 'error'>(
    'pending'
  );

  useEffect(() => {
    window.__wsAttemptStatus = 'pending';
    const socket = new WebSocket('wss://example.com/marigold-validate-probe');
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
