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
      variant: {
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
      size: {
        medium: {
          p: 'medium-1',
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
  'uses styles based on given level from theme (%s)',
  lvl => {
    render(
      <ThemeProvider theme={theme}>
        <Headline data-testid="headline" level={lvl as any} />
      </ThemeProvider>
    );

    const headline = screen.getByTestId('headline');
    // @ts-expect-error
    const token = theme.components.Headline.variant[`level-${lvl}`].fontSize;
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
  const token = theme.components.Headline.variant[`level-1`].fontSize;
  // @ts-expect-error
  expect(headline).toHaveStyle(`font-size: ${theme.fontSizes[token]}`);
});

test('headline accepts a size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" size="medium" />
    </ThemeProvider>
  );
  const headline = screen.getByTestId('headline');
  expect(headline).toHaveStyle(`padding: ${theme.space['medium-1']}px`);
});
