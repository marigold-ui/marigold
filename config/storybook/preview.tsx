import React from 'react';

import isChromatic from 'chromatic/isChromatic';
import { StoryFn } from '@storybook/react';

import { Box, MarigoldProvider, useTheme } from '@marigold/components';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core';

// import css file and theme
import '@marigold/theme-unicorn/index.css';
import './index.css';

import unicornTheme from '@marigold/theme-unicorn';

// Helpers
// ---------------
const THEME = {
  b2b: b2bTheme,
  core: coreTheme,
  unicorn: unicornTheme,
};

type ThemeNames = keyof typeof THEME;

const Frame = ({ children, title, id }: any) => (
  <Box className="p-4">
    <Box className="p-0.5 mb-0.5 inline-block border rounded-lg border-solid border-orange-200 bg-orange-200 text-xs font-sans text-orange-900">
      {title}
    </Box>
    <Box
      id={id}
      className="p-4 border border-solid border-[#dee2e6] rounded-lg shadow"
    >
      {children}
    </Box>
  </Box>
);

// Parameters
// ---------------
export const parameters = {
  a11y: {
    element: '#root',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// Decorators
// ---------------
export const decorators = [
  (Story: StoryFn, { globals, parameters }: any) => {
    // We do this since in a stacked context there is no global normalization otherwhise
    const globalTheme = {
      name: 'global',
      root: {
        body: {
          fontFamily: 'Inter',
        },
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
              <Frame id={'345'} title={`Theme "${THEME.unicorn}"`}>
                <Story />
              </Frame>
            </div>
          </MarigoldProvider>
        );
      }
    }
  },
];

// Global Types
// ---------------
export const globalTypes = {
  // Add theme selector to toolbar
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      items: [
        ...Object.keys(THEME).map(key => ({
          value: key,
          title: key,
        })),
        { value: 'stacked', title: 'stacked' },
      ],
    },
  },
};
