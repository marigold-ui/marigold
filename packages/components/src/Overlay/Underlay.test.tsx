import React from 'react';
import { ThemeProvider } from '@marigold/system';
import { OverlayProvider } from '@react-aria/overlays';
import { render, screen } from '@testing-library/react';
import { Underlay } from './Underlay';

const theme = {
  colors: {
    black: '#212529',
    white: '#f8f9fa',
    pink: '#fcc2d7',
  },
  space: {
    none: 0,
    small: 4,
    large: 10,
  },
  components: {
    Underlay: {
      variant: {
        one: {
          bg: 'pink',
        },
      },
      size: {
        small: {
          p: 'small',
        },
      },
    },
  },
};

test('renders underlay', () => {
  render(
    <OverlayProvider>
      <Underlay data-testid="underlay">
        <div>something</div>
      </Underlay>
    </OverlayProvider>
  );

  const underlay = screen.getByTestId('underlay');
  expect(underlay).toBeInTheDocument();
});

test('underlay supports variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <OverlayProvider>
        <Underlay data-testid="underlay" variant="one">
          <div>something</div>
        </Underlay>
      </OverlayProvider>
    </ThemeProvider>
  );

  const underlay = screen.getByTestId('underlay');
  expect(underlay).toHaveStyle(`background-color: ${theme.colors.pink}`);
});

test('underlay supports size', () => {
  render(
    <ThemeProvider theme={theme}>
      <OverlayProvider>
        <Underlay data-testid="underlay" size="small">
          <div>something</div>
        </Underlay>
      </OverlayProvider>
    </ThemeProvider>
  );

  const underlay = screen.getByTestId('underlay');
  expect(underlay).toHaveStyle(`padding: ${theme.space.small}px`);
});
