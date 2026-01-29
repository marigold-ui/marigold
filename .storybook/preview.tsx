import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-vite';
import withMarigoldProviders from './decorators.js';
import './styles.css';

// Disable a11y checks during Vitest Storybook runs as the axe context
// is not available in the sb-vitest browser environment, causing
// "No elements found for include in frame Context" errors.
const isVitest =
  typeof import.meta !== 'undefined' &&
  // @ts-expect-error - vite injects env during build/test
  Boolean(import.meta.env && (import.meta.env as any).MODE === 'test');

// Patch releasePointerCapture to handle invalid pointer IDs gracefully during tests.
// This is needed because react-aria's press handling uses pointer capture,
// which doesn't work properly in Firefox test environments.
if (isVitest && typeof Element !== 'undefined') {
  const originalReleasePointerCapture = Element.prototype.releasePointerCapture;
  Element.prototype.releasePointerCapture = function (pointerId: number) {
    try {
      originalReleasePointerCapture.call(this, pointerId);
    } catch {
      // Ignore "Invalid pointer id" errors in tests
    }
  };
}

export default definePreview({
  addons: [addonA11y(), addonDocs()],
  parameters: {
    layout: 'fullscreen',
    a11y: isVitest
      ? { disable: true }
      : {
          context: '#storybook-root',
        },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    controls: { expanded: true },
    docs: {
      codePanel: true,
    },
  },
  decorators: withMarigoldProviders,
});
