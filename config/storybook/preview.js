import { addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withThemes } from 'storybook-addon-themes/react';

import React from 'react';
import { MarigoldProvider } from '@marigold/system';
import b2bTheme from '@marigold/theme-b2b';
import unicornTheme from '@marigold/theme-unicorn';

// A11y
addDecorator(withA11y);

// Theme Switch
const themes = {
  b2b: b2bTheme,
  unicorn: unicornTheme,
};

addDecorator(withThemes);
addParameters({
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
});
