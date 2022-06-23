import React from 'react';

import isChromatic from 'chromatic/isChromatic';
import type { StoryFn } from '@storybook/react';

import { Box, MarigoldProvider } from '@marigold/components';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core';
import unicornTheme from '@marigold/theme-unicorn';

// Helpers
// ---------------
const THEME = {
  b2b: b2bTheme,
  core: coreTheme,
  unicorn: unicornTheme,
};

type ThemeNames = keyof typeof THEME;

const Divider = () => (
  <Box
    css={{
      width: '100vw',
      height: 1,
      bg: '#adb5bd',
      my: '1.5rem',
      mx: '-1rem',
    }}
  />
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
    const theme: ThemeNames = globals.theme || parameters.theme || 'b2b';
    const layout: 'single' | 'stacked' =
      globals.layout ||
      parameters.layout ||
      (isChromatic() ? 'stacked' : 'single');

    switch (layout) {
      case 'stacked': {
        return (
          <>
            {Object.keys(THEME).map((key, idx) => (
              <React.Fragment key={key}>
                {idx > 0 ? <Divider /> : null}
                <MarigoldProvider theme={THEME[key as ThemeNames]}>
                  <Story />
                </MarigoldProvider>
              </React.Fragment>
            ))}
          </>
        );
      }
      default: {
        return (
          <MarigoldProvider theme={THEME[theme]}>
            <Story />
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
      items: Object.keys(THEME).map(key => ({
        value: key,
        title: key,
      })),
    },
  },
  // Change layout
  layout: {
    name: 'Layout',
    description: 'Toggle theme display',
    toolbar: {
      icon: 'grid',
      items: [
        {
          title: 'Single',
          value: 'single',
        },
        {
          title: 'Stacked',
          value: 'stacked',
        },
      ],
    },
  },
};
