'use client';

import { Theme } from '@marigold/system';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core';

import * as components from './components';

export const theme: Theme = {
  name: 'docs',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  components,
};

export { b2bTheme, coreTheme };
