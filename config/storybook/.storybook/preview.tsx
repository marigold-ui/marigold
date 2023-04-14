import React from 'react';
import { StoryFn } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import unicornTheme from '@marigold/theme-unicorn';
import { MarigoldProvider } from '@marigold/components';

import 'tailwindcss/tailwind.css';
import '@marigold/theme-unicorn/index.css';

import '../../../themes/tailwind-core/dist/index.css';
import tailwindCore from '@marigold/tailwind-core';

import { withThemeByDataAttribute } from '@storybook/addon-styling';
// Helpers
// ---------------
const THEME = {
  unicorn: unicornTheme,
  core: tailwindCore,
};

type ThemeNames = keyof typeof THEME;

// fix type any
export const decorators: any = [
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
    <div className="mb-0.5 inline-block rounded-lg border border-solid border-orange-200 bg-orange-200 p-0.5 font-sans text-xs text-orange-900">
      {title}
    </div>
    <div className="rounded-lg border border-solid border-[#dee2e6] p-4 shadow-sm">
      <div id={id}>{children}</div>
    </div>
  </div>
);
