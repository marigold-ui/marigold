import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-vite';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import withMarigoldProviders from './decorators.js';
import './styles.css';

const customViewports = {
  smallScreen: {
    name: 'Small Screen (≤600px)',
    styles: {
      width: '600px',
      height: '900px',
    },
    type: 'mobile' as const,
  },
};

// Disable a11y checks during Vitest Storybook runs as the axe context
// is not available in the sb-vitest browser environment, causing
// "No elements found for include in frame Context" errors.
const isVitest =
  typeof import.meta !== 'undefined' &&
  // @ts-expect-error - vite injects env during build/test
  Boolean(import.meta.env && (import.meta.env as any).MODE === 'test');

export default definePreview({
  addons: [addonA11y(), addonDocs()],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
    },
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
