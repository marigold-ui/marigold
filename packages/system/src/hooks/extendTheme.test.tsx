import { render, screen } from '@testing-library/react';
import React from 'react';

import { Button } from '@marigold/components';

import { Theme } from '../types';
import { cva } from '../utils';
import { StylesProps, extendTheme } from './extendTheme';
import { ThemeProvider } from './useTheme';

const styles: StylesProps = {
  Button: cva('align-center flex', {
    variants: {
      variant: {
        secondary: 'text-secondary-800',
      },
      size: {
        medium: 'size-15',
      },
    },
  }),
};

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva('align-center flex disabled:bg-gray-600', {
      variants: {
        variant: {
          primary: 'text-primary-500',
          secondary: 'text-secondary-800',
          tertiary: 'text-green-300',
        },
        size: {
          small: 'size-10',
          large: 'w-50 h-50',
        },
      },
    }),
  },
};

test('return classnames (base only)', () => {
  const newTheme = extendTheme(styles, theme);
  render(
    <ThemeProvider theme={newTheme}>
      <Button variant="tertiary">button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText('button');
  console.log(button.className);
  expect(button.className).toMatchInlineSnapshot(
    `"items-center justify-center gap-[0.5ch] align-center disabled:bg-gray-600 align-center flex text-green-300"`
  );
});
