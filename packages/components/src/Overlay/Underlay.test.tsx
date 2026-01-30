import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { Underlay } from './Underlay';

// Note: Underlay is an internal component that renders into a portal.
// It requires ThemeProvider directly due to portal rendering behavior.
// Its functionality is also tested through Dialog and Drawer components.

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
      <Underlay open>
        <div>something</div>
      </Underlay>
    </ThemeProvider>
  );

  const underlay = screen.getByText('something');
  expect(underlay).toBeInTheDocument();
});

test('underlay supports variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Underlay open variant="one">
        <div>something</div>
      </Underlay>
    </ThemeProvider>
  );

  const underlay = screen.getByTestId('underlay-id');
  expect(underlay).toHaveClass(`bg-pink-600`);
});

test('underlay supports size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Underlay open size="small">
        <div>something</div>
      </Underlay>
    </ThemeProvider>
  );

  const underlay = screen.getByTestId('underlay-id');
  expect(underlay).toHaveClass(`p-4`);
});
