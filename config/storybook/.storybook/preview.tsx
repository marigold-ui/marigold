import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { Preview } from '@storybook/react';
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

// fix type any
export const decorators: any = [
  withThemeByDataAttribute({
    themes: {
      rui: rui.name,
    },
    defaultTheme: rui.name,
    attributeName: 'data-theme',
  }),

  (Story: any) => {
    const theme = 'rui';
    return (
      <MarigoldProvider
        theme={THEME[theme as ThemeNames]}
        className="h-screen p-6"
      >
        <OverlayContainerProvider container="storybook-root">
          <div className="h-screen p-6">
            <Story />
          </div>
        </OverlayContainerProvider>
      </MarigoldProvider>
    );
  },
];
