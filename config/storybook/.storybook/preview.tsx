import { Decorator, Preview } from '@storybook/react';
import {
  MarigoldProvider,
  OverlayContainerProvider,
} from '@marigold/components';
import rui from '@marigold/theme-rui';
import './../styles.css';

// Helpers
// ---------------
const THEME = {
  rui,
};

type ThemeNames = keyof typeof THEME;

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
  Story => {
    const theme = 'rui';
    return (
      <MarigoldProvider
        theme={THEME[theme as ThemeNames]}
        className="h-screen p-6"
      >
        {/* Use the "storybook-root" container for overlays to interaction tests work. */}
        <OverlayContainerProvider container="storybook-root">
          <Story />
        </OverlayContainerProvider>
      </MarigoldProvider>
    );
  },
];
