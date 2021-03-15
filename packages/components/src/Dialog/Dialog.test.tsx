import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Dialog } from './Dialog';

const theme = {
  dialog: {
    wrapper: {
      alignItems: 'center',
    },
  },
};

test('supports default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog title="default">Default</Dialog>
    </ThemeProvider>
  );
  const dialog = screen.getByTitle(/default/);

  expect(dialog).toHaveStyle(`align-items: center`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog title="default">Default</Dialog>
    </ThemeProvider>
  );
  const dialog = screen.getByTitle(/default/);

  expect(dialog instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog className="custom-class-name" title="dialog">
        Dialog
      </Dialog>
    </ThemeProvider>
  );
  const dialog = screen.getByTitle(/dialog/);

  expect(dialog.className).toMatch('custom-class-name');
});
