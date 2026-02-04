import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { Divider } from './Divider';

const theme: Theme = {
  name: 'test',
  components: {
    Divider: cva({
      base: 'm-1',
      variants: {
        variant: {
          bold: 'm-2',
        },
      },
    }),
  },
};

test('supports base styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <Divider data-testid="divider" />
    </ThemeProvider>
  );
  const divider = screen.getByTestId(/divider/);

  expect(divider).toHaveClass('m-1');
});

test('accepts other variants', () => {
  render(
    <ThemeProvider theme={theme}>
      <Divider variant="bold" data-testid="divider" />
    </ThemeProvider>
  );
  const divider = screen.getByTestId(/divider/);

  expect(divider).toHaveClass(`m-2`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Divider data-testid="divider" />
    </ThemeProvider>
  );
  const divider = screen.getByTestId(/divider/);

  expect(divider instanceof HTMLHRElement).toBeTruthy();
});
