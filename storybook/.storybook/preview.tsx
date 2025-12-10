import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-vite';
import '../styles.css';
import withMarigoldProviders from './decorators';

export default definePreview({
  addons: [addonA11y(), addonDocs()],
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
});
