import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Dialog } from './Dialog';

const theme = {
  dialog: {
    basic: {
      alignItems: 'center',
    },
    special: {
      alignItems: 'left',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog title="default">Default</Dialog>
    </ThemeProvider>
  );
  const dialog = screen.getByTitle(/default/);

  expect(dialog).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog title="dialog" variant="special">
        special
      </Dialog>
    </ThemeProvider>
  );
  const dialog = screen.getByTitle(/dialog/);

  expect(dialog).toHaveStyle(`align-items: left`);
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
