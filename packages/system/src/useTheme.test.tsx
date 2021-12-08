import React from 'react';
import { jsx } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { ThemeProvider, useTheme } from './useTheme';

// Setup
// ---------------
const theme = {
  colors: {
    primary: 'hotpink',
    black: '#000',
  },
  space: {
    none: 0,
    small: 16,
    medium: 24,
    large: 32,
  },
  text: {
    body: {
      fontSize: 1,
      color: 'black',
    },
    heading: {
      fontSize: 3,
      color: 'primary',
    },
  },
};

const wrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

test('returns the theme', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });
  expect(result.current.theme).toEqual(theme);
});

test('returns a "css" function', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });
  expect(result.current.css).toEqual(expect.any(Function));
});

test('transpile style object to css object', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });
  const css = result.current.css;

  expect(css({ p: 'small' })).toMatchInlineSnapshot(`
Object {
  "padding": 16,
}
`);
  expect(css({ color: 'primary', p: 'large' })).toMatchInlineSnapshot(`
Object {
  "color": "hotpink",
  "padding": 32,
}
`);
  expect(css({ variant: 'text.body' })).toMatchInlineSnapshot(`
Object {
  "color": "#000",
  "fontSize": 14,
}
`);
});

test('themes can be cascaded', () => {
  const outerTheme = {
    colors: {
      primary: 'coral',
    },
  };

  const innerTheme = {
    colors: {
      primary: 'gainsboro',
    },
  };

  const Theme = ({ testId }: { testId: string }) => {
    const { theme } = useTheme();
    return <div data-testid={testId}>{JSON.stringify(theme, null, 2)}</div>;
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
      \\"colors\\": {
        \\"primary\\": \\"coral\\"
      }
    }"
  `);
  expect(inner.innerHTML).toMatchInlineSnapshot(`
    "{
      \\"colors\\": {
        \\"primary\\": \\"gainsboro\\"
      }
    }"
  `);
});

test('theme is passed down to emotion', () => {
  const css = jest.fn().mockReturnValue({});
  render(<ThemeProvider theme={theme}>{jsx('div', { css })}</ThemeProvider>);

  expect(css).toHaveBeenCalledWith(theme);
});
