import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-vite';
// @ts-expect-error - no type declarations available for this module
import * as storybookAddonTestCodegen from 'storybook-addon-test-codegen/preview';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import withMarigoldProviders from './decorators.js';
// @ts-expect-error - CSS side-effect import handled by Vite bundler
import './styles.css';

const customViewports = {
  smallScreen: {
    name: 'Small Screen (639px)',
    styles: {
      width: '639px',
      height: '900px',
    },
    type: 'mobile' as const,
  },
};

export default definePreview({
  addons: [addonA11y(), addonDocs(), storybookAddonTestCodegen],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
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
