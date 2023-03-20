import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { ThemeProvider, useTheme } from './useTheme';
import { tv } from 'tailwind-variants';

// Setup
// ---------------

const theme = {
  name: 'test',
  components: {
    button: tv({
      base: 'border-none p-1',
      variants: {
        variant: {
          primary: 'bg-primary-700',
          secondary: 'bg-secondary-700',
        },
      },
    }),
  },
};

const wrapper = ({ children }: { children?: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

test('returns the theme', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });
  expect(result.current).toEqual(theme);
});

test('values from theme are given correctly', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });

  const button = result.current.components!.button;

  expect(button()).toEqual('border-none p-1');
  expect(button({ variant: 'primary' })).toEqual(
    'border-none p-1 bg-primary-700'
  );
});

test('themes can be cascaded', () => {
  const outerTheme = {
    name: 'outer',
    components: {
      button: tv({
        base: 'border-none p-1 bg-blue-100',
        variants: {
          variant: {
            primary: 'bg-primary-700',
          },
        },
      }),
    },
  };

  const innerTheme = {
    name: 'inner',
    components: {
      button: tv({
        base: 'p-3 bg-blue-500',
        variants: {
          variant: {
            secondary: 'bg-secondary-700',
          },
        },
      }),
    },
  };

  const Theme = ({ testId }: { testId: string }) => {
    const theme = useTheme();

    return <div data-testid={testId}>{JSON.stringify({ theme }, null, 2)}</div>;
  };

  render(
    <ThemeProvider theme={outerTheme}>
      <>
        <Theme testId="outer" />
        <ThemeProvider theme={innerTheme}>
          <Theme testId="inner" />
        </ThemeProvider>
      </>
    </ThemeProvider>
  );

  const outer = screen.getByTestId('outer');
  const inner = screen.getByTestId('inner');

  expect(outer.className).toMatchInlineSnapshot(`""`);
  expect(inner.className).toMatchInlineSnapshot(`""`);
});
