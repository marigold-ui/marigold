import { render, screen } from '@testing-library/react';

import { OverlayProvider } from '@react-aria/overlays';

import { Theme, ThemeProvider, cva } from '@marigold/system';

import { Modal } from './Modal';
import { Underlay } from './Underlay';

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
        <Underlay open>
          <div>something</div>
        </Underlay>
      </OverlayProvider>
    </ThemeProvider>
  );

  const underlay = screen.getByText('something');
  expect(underlay).toBeInTheDocument();
});

test('underlay supports variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <OverlayProvider>
        <Underlay open variant="one">
          <div>something</div>
        </Underlay>
      </OverlayProvider>
    </ThemeProvider>
  );

  const underlay = screen.getByTestId('underlay-id');
  expect(underlay).toHaveClass(`bg-pink-600`);
});

test('underlay supports size', () => {
  render(
    <ThemeProvider theme={theme}>
      <OverlayProvider>
        <Underlay open size="small">
          <div>something</div>
        </Underlay>
      </OverlayProvider>
    </ThemeProvider>
  );

  const underlay = screen.getByTestId('underlay-id');
  expect(underlay).toHaveClass(`p-4`);
});
