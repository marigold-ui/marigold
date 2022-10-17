import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Headline } from './Headline';

const theme = {
  space: {
    none: 0,
    'small-1': 4,
    'medium-1': 16,
  },
  color: { white: '#FFF' },
  fontSizes: {
    xxsmall: '0.875rem',
    xsmall: '1rem',
    small: '1.125rem',
    medium: '1.25rem',
    large: '1.5rem',
    xlarge: '2rem',
  },
  components: {
    Headline: {
      base: {
        m: 'none',
        fontWeight: 'heading',
      },
      size: {
        'level-1': {
          fontSize: 'xlarge',
        },
        'level-2': {
          fontSize: 'large',
        },
        'level-3': {
          fontSize: 'medium',
        },
        'level-4': {
          fontSize: 'small',
        },
        'level-5': {
          fontSize: 'xsmall',
        },
        'level-6': {
          fontSize: 'xsmall',
          textTransform: 'uppercase',
        },
      },
      variant: {
        one: {
          color: 'white',
        },
      },
    },
  },
};

test('renders as a "section" element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" />
    </ThemeProvider>
  );

  const headline = screen.getByTestId('headline');
  expect(headline instanceof HTMLHeadingElement).toBeTruthy();
});

test.each(['1', '2', '3', '4', '5', '6'])(
  'uses styles based on given level from theme sizes (%s)',
  lvl => {
    render(
      <ThemeProvider theme={theme}>
        <Headline data-testid="headline" level={lvl as any} />
      </ThemeProvider>
    );

    const headline = screen.getByTestId('headline');
    // @ts-expect-error
    const token = theme.components.Headline.size[`level-${lvl}`].fontSize;
    // @ts-expect-error
    expect(headline).toHaveStyle(`font-size: ${theme.fontSizes[token]}`);
  }
);

test('uses "level-1" by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" />
    </ThemeProvider>
  );

  const headline = screen.getByTestId('headline');
  const token = theme.components.Headline.size[`level-1`].fontSize;
  // @ts-expect-error
  expect(headline).toHaveStyle(`font-size: ${theme.fontSizes[token]}`);
});

test('headline accepts a variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" variant="one" />
    </ThemeProvider>
  );
  const headline = screen.getByTestId('headline');
  expect(headline).toHaveStyle(`color: white`);
});

test('headline accepts align property', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" align="center" />
    </ThemeProvider>
  );
  const headline = screen.getByTestId('headline');
  expect(headline).toHaveStyle(`textAlign: center`);
});

test('headline accepts color property', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" color="red" />
    </ThemeProvider>
  );
  const headline = screen.getByTestId('headline');
  expect(headline).toHaveStyle(`color: red`);
});
