import { Preview } from '@storybook/react';
import './../styles.css';
import withMarigoldProviders from './decorators';

// Parameters
// ---------------

export const parameters: Preview['parameters'] = {
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
};

export const decorators = [withMarigoldProviders];
