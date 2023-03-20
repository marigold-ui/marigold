import React from 'react';
import { screen, render } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { extendTheme, Theme } from './theme';
import { tv } from 'tailwind-variants';
import { Badge } from './Badge';

const baseTheme: Theme = {
  name: 'base',
  colors: {
    primary: '#22c55e',
    red: '#fa5252',
    white: '#fff',
    black: '#111',
  },
  components: {
    Badge: tv({
      base: 'bg-black text-white',
      variants: {
        variant: {
          primary: 'bg-primary',
        },
      },
    }),
  },
} as const;

test('allows to extend a theme with custom styles', () => {
  const result = extendTheme(baseTheme, {
    name: 'extension',
    colors: {
      secondary: '#862e9c',
    },
    components: {
      Badge: tv({
        variants: {
          variant: {
            secondary: 'bg-secondary',
          },
        },
      }),
    },
  });

  expect(result).toMatchInlineSnapshot(`
    {
      "colors": {
        "black": "#111",
        "primary": "#22c55e",
        "red": "#fa5252",
        "secondary": "#862e9c",
        "white": "#fff",
      },
      "components": {
        "Badge": [Function],
      },
      "name": "extension",
    }
  `);
});

test('works with the <ThemeProvider>', () => {
  const extension = {
    name: 'extension',
    colors: {
      secondary: '#862e9c',
    },
    components: {
      Badge: tv({
        variants: {
          variant: {
            secondary: 'bg-secondary',
          },
        },
      }),
    },
  };
  const custom = extendTheme(baseTheme, extension);

  render(
    <ThemeProvider theme={custom}>
      <Badge variant="secondary">Badge</Badge>
    </ThemeProvider>
  );

  const badge = custom.components.Badge;

  console.log(custom.components.Badge({ variant: 'secondary' }));
  expect(badge({ variant: 'secondary' })).toEqual(`bg-secondary`);
});
