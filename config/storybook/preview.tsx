import React from 'react';

import { MarigoldProvider } from '@marigold/components';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core';
import unicornTheme from '@marigold/theme-unicorn';

const THEME = {
  b2b: b2bTheme,
  core: coreTheme,
  unicorn: unicornTheme,
};

export const parameters = {
  a11y: {
    element: '#root',
    config: {},
    options: {},
  },
  controls: { expanded: true },
};

export const decorators = [];

export const globalTypes = {
  // Add theme selector to toolbar
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: { value: 'b2b', title: 'b2b' },
    toolbar: {
      icon: 'paintbrush',
      items: Object.keys(THEME).map(key => ({
        value: key,
        title: key,
      })),
    },
  },
};
