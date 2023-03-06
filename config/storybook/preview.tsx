import React from 'react';

import isChromatic from 'chromatic/isChromatic';
import { StoryFn } from '@storybook/react';

import { Box, MarigoldProvider } from '@marigold/components';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core';

import '../../themes/theme-unicorn/src/index.css';

// Helpers
// ---------------
const THEME = {
  b2b: b2bTheme,
  core: coreTheme,
  unicorn: coreTheme,
};

type ThemeNames = keyof typeof THEME;

const Frame = ({ children, title, id }: any) => (
  <Box css={{ p: '16px' }}>
    <Box
      css={{
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        display: 'inline-block',
        color: '#7c2d12',
        fontSize: '0.75rem',
        bg: '#fed7aa',
        borderRadius: 8,
        border: '1px solid #fed7aa',
        py: 1,
        px: 2,
        mb: 1,
      }}
    >
      {title}
    </Box>
    <Box
      id={id}
      css={{
        p: '16px',
        border: '1px solid #dee2e6',
        borderRadius: 8,
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
    // We do this since in a stacked context there is no global normalization otherwhise
    const globalTheme = {
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
