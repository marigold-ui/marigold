import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-vite';
import * as storybookAddonTestCodegen from 'storybook-addon-test-codegen/preview';
import './../styles.css';
import withMarigoldProviders from './decorators.js';

export default definePreview({
  parameters: {
    layout: 'fullscreen',

    a11y: {
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
  addons: [addonA11y(), addonDocs(), storybookAddonTestCodegen],
});
