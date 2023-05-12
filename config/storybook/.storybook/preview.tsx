import React from 'react';
import { StoryFn } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { MarigoldProvider } from '@marigold/components';

import 'tailwindcss/tailwind.css';

import '../../../themes/theme-core/dist/index.css';
import core from '@marigold/theme-core';

import { withThemeByDataAttribute } from '@storybook/addon-styling';
// Helpers
// ---------------
const THEME = {
  core: core,
};

type ThemeNames = keyof typeof THEME;

// Parameters
// ---------------
export const parameters = {
  layout: 'fullscreen',
  a11y: {
    element: '#root',
  },
  controls: { expanded: true },
};

// fix type any
export const decorators: any = [
  withThemeByDataAttribute({
    themes: {
      core: 'core',
      stacked: 'stacked',
    },
    defaultTheme: core.name,
    attributeName: 'data-theme',
  }),
  (Story: StoryFn, { globals, parameters }: any) => {
    const theme = isChromatic()
      ? parameters.theme || 'stacked'
      : globals.theme || parameters.theme || 'core';

    switch (theme) {
      case 'stacked': {
        return (
          <MarigoldProvider theme={core}>
            {Object.keys(THEME).map(key => (
              <Frame key={key} id={key} title={`Theme "${key}"`}>
                <MarigoldProvider theme={THEME[key as ThemeNames]}>
                  <div className="p-4">
                    <Story />
                  </div>
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

const Frame = ({ children, title }: any) => (
  <div className="p-4">
    <div className="mb-0.5 inline-block rounded-lg border border-solid border-orange-200 bg-orange-200 p-0.5 font-sans text-xs text-orange-900">
      {title}
    </div>
    <div className="rounded-lg border border-solid border-[#dee2e6] shadow-sm">
      {children}
    </div>
  </div>
);
