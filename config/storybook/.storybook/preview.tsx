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
  // Wrapper to provide an overlay container
  Story => (
    <div id="overlay-container">
      <Story />
    </div>
  ),
  Story => (
    <MarigoldProvider theme={theme} className="min-h-screen p-6">
      <OverlayContainerProvider container="overlay-container">
        <Story />
      </OverlayContainerProvider>
    </MarigoldProvider>
  ),
];
