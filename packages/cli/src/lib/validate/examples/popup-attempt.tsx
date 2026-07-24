import { useEffect } from 'react';

declare global {
  interface Window {
    __popupClosed?: boolean;
  }
}

// Fixture for the render sandbox's network egress test: opens a popup
// (window.open) to an external origin on mount. A popup is a brand-new
// Playwright Page with no route handler of its own — the sandbox must close
// it outright rather than let it reach the open network. Polls the popup's
// own `.closed` flag (from the opener's side) rather than relying on the
// test racing a Playwright-level page event against how fast the sandbox
// closes it.
const PopupAttempt = () => {
  useEffect(() => {
    const popup = window.open(
      'https://example.com/marigold-validate-popup-probe',
      '_blank'
    );
    if (!popup) {
      window.__popupClosed = true;
      return;
    }
    const interval = setInterval(() => {
      if (popup.closed) {
        window.__popupClosed = true;
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return <div>popup attempt</div>;
};

export default PopupAttempt;
