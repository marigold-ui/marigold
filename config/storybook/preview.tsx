import React from 'react';

import { addDecorator, addParameters } from '@storybook/react';
// @ts-ignore (no types)
import { withThemes } from 'storybook-addon-themes/react';

import { MarigoldProvider } from '@marigold/components';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core';
import unicornTheme from '@marigold/theme-unicorn';

// Theme Switch
const themes = {
  b2b: b2bTheme,
  core: coreTheme,
  unicorn: unicornTheme,
} as const;

type ThemeNames = keyof typeof themes;

addDecorator(withThemes);
addParameters({
  a11y: {
    element: '#root',
    config: {},
    options: {},
  },
  controls: { expanded: true },
  themes: {
    Decorator: ({
      themeName,
      children,
    }: {
      themeName: ThemeNames;
      children: React.ReactChild;
    }) => (
      <MarigoldProvider theme={themes[themeName]}>{children}</MarigoldProvider>
    ),
    list: (Object.keys(themes) as ThemeNames[]).map(name => ({
      name,
      color: themes[name].colors!.primary,
      default: name === 'b2b',
    })),
  },
});
