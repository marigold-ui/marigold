import React from 'react';
import { ThemeProvider, Theme } from '@marigold/system';
import { OverlayProvider } from '@react-aria/overlays';
import { render, screen } from '@testing-library/react';
import { Underlay } from './Underlay';

import { cva } from 'class-variance-authority';

const theme: Theme = {
  name: 'test',
  components: {
    Underlay: cva('flex', {
      variants: {
        variant: {
          one: 'bg-pink-600',
        },
        size: {
          small: 'p-4',
        },
      },
    }),
  },
};

test('renders underlay', () => {
  render(
    <ThemeProvider theme={theme}>
      <OverlayProvider>
        <Underlay data-testid="underlay">
          <div>something</div>
        </Underlay>
      </OverlayProvider>
    </ThemeProvider>
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
  expect(underlay).toHaveClass(`bg-pink-600`);
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
  expect(underlay).toHaveClass(`p-4`);
});
