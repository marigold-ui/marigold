import { Decorator, Preview } from '@storybook/react';
import {
  MarigoldProvider,
  OverlayContainerProvider,
} from '@marigold/components';
import theme from '@marigold/theme-rui';
import './../styles.css';

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

export const decorators: Decorator[] = [
  Story => (
    <MarigoldProvider theme={theme} className="min-h-screen p-6">
      <OverlayContainerProvider container="storybook-root">
        <Story />
      </OverlayContainerProvider>
    </MarigoldProvider>
  ),
];
