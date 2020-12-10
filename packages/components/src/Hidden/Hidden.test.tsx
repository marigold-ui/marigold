import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Hidden } from '@marigold/components';

const theme = {
  layout: {
    hidden: {
      alignItems: 'center',
    },
    invisible: {
      alignItems: 'right',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Hidden title="hidden">Default</Hidden>
    </ThemeProvider>
  );
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Hidden title="invisible" variant="invisible">
        Invisible
      </Hidden>
    </ThemeProvider>
  );
  const hidden = screen.getByTitle(/invisible/);

  expect(hidden).toHaveStyle(`align-items: right`);
});

test('text is not visible, show prop = false', () => {
  render(
    <ThemeProvider theme={theme}>
      <Hidden title="hidden">Hidden</Hidden>
    </ThemeProvider>
  );
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden).not.toBeVisible();
});

test('support show prop = true', () => {
  render(
    <ThemeProvider theme={theme}>
      <Hidden title="hidden" show={true}>
        Default
      </Hidden>
    </ThemeProvider>
  );
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden).toBeVisible();
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Hidden title="hidden">Default</Hidden>
    </ThemeProvider>
  );
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden instanceof HTMLSpanElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Hidden className="custom-class-name" title="hidden">
        text
      </Hidden>
    </ThemeProvider>
  );
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden.className).toMatch('custom-class-name');
});
