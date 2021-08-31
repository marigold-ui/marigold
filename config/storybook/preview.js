import { addDecorator, addParameters } from '@storybook/react';
import { withThemes } from 'storybook-addon-themes/react';

import React from 'react';
import { MarigoldProvider } from '@marigold/components';
import b2bTheme from '@marigold/theme-b2b';
import unicornTheme from '@marigold/theme-unicorn';

// Theme Switch
const themes = {
  b2b: b2bTheme,
  unicorn: unicornTheme,
};

addDecorator(withThemes);
addParameters({
  a11y: {
    element: '#root',
    config: {},
    options: {},
  },
  controls: { expanded: true },
  themes: {
    Decorator: ({ themeName, children }) => (
      <MarigoldProvider theme={themes[themeName]}>{children}</MarigoldProvider>
    ),
    list: Object.keys(themes).map(name => ({
      name,
      color: themes[name].colors.primary,
      default: name === 'b2b',
    })),
  },
  options: {
    storySort: {
      order: ['Welcome', 'Tokens', 'Components', 'Hooks'],
    },
  },
  viewMode: 'docs',
});
