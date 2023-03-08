import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { ThemeProvider, useTheme } from './useTheme';
import { tv } from 'tailwind-variants';

// Setup
// ---------------
const button = tv({
  base: 'border-none p-1',
  variants: {
    variant: {
      primary: 'bg-primary-700',
    },
  },
});

const theme = {
  name: 'test',
  components: {
    button: tv({
      base: 'border-none p-1',
      variants: {
        variant: {
          primary: 'bg-primary-700',
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
  expect(result.current).toEqual(theme.components);
});

test('get value from theme', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });
  const get = result.current.get;

  expect(get('colors.primary')).toEqual('hotpink');
  expect(get('space.small')).toEqual(16);
  expect(get('button')).toMatchInlineSnapshot(`
    {
      "border": "none",
      "fontSize": 16,
    }
  `);
});

test('themes can be cascaded', () => {
  const outerTheme = {
    components: {
      button,
    },
    color: {
      primary: 'bg-blue-700',
    },
  };

  const innerTheme = {
    components: {
      button,
    },
    color: {
      primary: 'bg-blue-500',
    },
  };

  const Theme = ({ testId }: { testId: string }) => {
    const { components, color } = useTheme();
    return (
      <div data-testid={testId}>
        {JSON.stringify({ components, color }, null, 2)}
      </div>
    );
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

  expect(outer.innerHTML).toMatchInlineSnapshot(`
    "{
      "colors": {
        "primary": "coral"
      }
    }"
  `);
  expect(inner.innerHTML).toMatchInlineSnapshot(`
    "{
      "colors": {
        "primary": "gainsboro"
      }
    }"
  `);
});
