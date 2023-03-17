import React from 'react';
import { screen, render } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Button } from './Button';
import { extendTheme, Theme } from './theme';

const baseTheme: Theme = {
  name: 'base',
  colors: {
    primary: '#d6336c',
    red: '#fa5252',
    white: '#fff',
    black: '#111',
  },
  components: {
    Button: {
      base: {
        color: 'white',
        bg: 'black',
      },
      variant: {
        primary: {
          bg: 'primary',
        },
      },
    },
  },
} as const;

test('allows to extend a theme with custom styles', () => {
  const result = extendTheme(baseTheme, {
    colors: {
      secondary: '#862e9c',
    },
    components: {
      Button: {
        variant: {
          secondary: {
            bg: 'secondary',
          },
        },
      },
    },
  });

  expect(result).toMatchInlineSnapshot(`
    {
      "colors": {
        "black": "#111",
        "primary": "#d6336c",
        "red": "#fa5252",
        "secondary": "#862e9c",
        "white": "#fff",
      },
      "components": {
        "Button": {
          "base": {
            "bg": "black",
            "color": "white",
          },
          "variant": {
            "primary": {
              "bg": "primary",
            },
            "secondary": {
              "bg": "secondary",
            },
          },
        },
      },
    }
  `);
});

test('works with the <ThemeProvider>', () => {
  const extension = {
    colors: {
      secondary: '#862e9c',
    },
    components: {
      Button: {
        variant: {
          secondary: {
            bg: 'secondary',
          },
        },
      },
    },
  };
  const custom = extendTheme(baseTheme, extension);

  render(
    <ThemeProvider theme={custom}>
      <Button variant="secondary">Button</Button>
    </ThemeProvider>
  );

  const button = screen.getByText('Button');
  expect(button).toHaveStyle(`background: ${extension.colors.secondary}`);
});
