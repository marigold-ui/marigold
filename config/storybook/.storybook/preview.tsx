import React from 'react';
import { StoryFn } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import unicornTheme from '@marigold/theme-unicorn';
import coreTheme from '@marigold/theme-core';
import { MarigoldProvider } from '@marigold/components';

import 'tailwindcss/tailwind.css';
import '@marigold/theme-unicorn/index.css';
import '@marigold/theme-core/index.css';

// .storybook/preview.js
import { withThemeByDataAttribute } from '@storybook/addon-styling';

// Helpers
// ---------------
const THEME = {
  unicorn: unicornTheme,
  core: coreTheme,
};

type ThemeNames = keyof typeof THEME;

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      b2b: 'b2b',
      core: 'core',
      unicorn: 'unicorn',
      stacked: 'stacked',
    },
    defaultTheme: 'b2b',
    attributeName: 'data-theme',
  }),
  (Story: StoryFn, { globals, parameters }: any) => {
    const globalTheme = {
      name: 'global',
      root: {
        body: 'Inter',
      },
    };

    const theme = isChromatic()
      ? parameters.theme || 'stacked'
      : globals.theme || parameters.theme || 'b2b';

    switch (theme) {
      case 'stacked': {
        return (
          <MarigoldProvider theme={globalTheme}>
            {Object.keys(THEME).map(key => (
              <Frame key={key} id={key} title={`Theme "${key}"`}>
                <MarigoldProvider
                  theme={THEME[key as ThemeNames]}
                  selector={`#${key}`}
                >
                  <Story />
                </MarigoldProvider>
              </Frame>
            ))}
          </MarigoldProvider>
        );
      }
      default: {
        return (
          <MarigoldProvider theme={THEME[theme as ThemeNames]}>
            <div style={{ height: '900px' }}>
              <Story />
            </div>
          </MarigoldProvider>
        );
      }
    }
  },
];

const Frame = ({ children, title, id }: any) => (
  <div className="p-4">
    <div className="p-0.5 mb-0.5 inline-block border rounded-lg border-solid border-orange-200 bg-orange-200 text-xs font-sans text-orange-900">
      {title}
    </div>
    <div className="p-4 border border-solid border-[#dee2e6] rounded-lg shadow-sm">
      <div id={id}>{children}</div>
    </div>
  </div>
);
