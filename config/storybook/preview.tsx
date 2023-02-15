import React from 'react';

import isChromatic from 'chromatic/isChromatic';
import { StoryFn } from '@storybook/react';

import { Box, MarigoldProvider } from '@marigold/components';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core';
import unicornTheme from '@marigold/theme-unicorn';

// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';
import 'tailwindcss/tailwind.css';
import '../src/index.css';
import '../../themes/theme-unicorn/src/index.css';

// Helpers
// ---------------
const THEME = {
  b2b: b2bTheme,
  core: coreTheme,
  unicorn: unicornTheme,
};

type ThemeNames = keyof typeof THEME;

const Frame = ({ children, title }: any) => (
  <Box css={{ p: '16px' }}>
    <Box css={{ color: '#495057', fontSize: '0.75rem' }}>{title}</Box>
    <Box
      css={{
        p: '16px',
        border: '1px solid #dee2e6',
        borderRadius: 'clamp(0px, calc(100vw - 100%) * 1e5, 5px)',
        boxShadow: 'inset 0 1px 4px 0 hsl(220 3% 15% / 10%);',
      }}
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
  controls: { expanded: true },
};

// Decorators
// ---------------
export const decorators = [
  (Story: StoryFn, { globals, parameters }: any) => {
    const theme = isChromatic()
      ? parameters.theme || 'stacked'
      : globals.theme || parameters.theme || 'b2b';

    switch (theme) {
      case 'stacked': {
        return (
          <>
            {Object.keys(THEME).map(key => (
              <Frame key={key} title={`Theme "${key}"`}>
                <MarigoldProvider theme={THEME[key as ThemeNames]}>
                  <Story />
                </MarigoldProvider>
              </Frame>
            ))}
          </>
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
