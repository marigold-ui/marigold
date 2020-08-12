import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Hidden, Text } from '@marigold/components';

const theme = {
  layout: {
    hidden: {
      alignItems: 'center',
    },
    unvisible: {
      alignItems: 'right',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Hidden title="hidden">Default</Hidden>
    </MarigoldProvider>
  );
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Hidden title="unvisible" variant="unvisible">
        Unvisible
      </Hidden>
    </MarigoldProvider>
  );
  const hidden = screen.getByTitle(/unvisible/);

  expect(hidden).toHaveStyle(`align-items: right`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Hidden title="hidden">Default</Hidden>
    </MarigoldProvider>
  );
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden instanceof HTMLDivElement).toBeTruthy();
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Hidden title="hidden" css={{ alignItems: 'left' }}>
        Hidden
      </Hidden>
    </MarigoldProvider>
  );
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden).toHaveStyle(`align-items: center`);
  expect(hidden).not.toHaveStyle(`align-items: left`);
});

test('text is not visible', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Hidden title="hidden">Hidden</Hidden>
    </MarigoldProvider>
  );
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden).not.toBeVisible();
});
