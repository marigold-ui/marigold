import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { MenuItem } from '@marigold/components';

const theme = {
  content: {
    menuItem: {
      padding: '4px',
    },
    item: {
      padding: '8px',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <MenuItem title="menuItem" />
    </MarigoldProvider>
  );
  const menuItem = screen.getByTitle(/menuItem/);

  expect(menuItem).toHaveStyle(`padding: 4px`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <MenuItem title="menuItem" variant="item" />
    </MarigoldProvider>
  );
  const menuItem = screen.getByTitle(/menuItem/);

  expect(menuItem).toHaveStyle(`padding: 8px`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <MenuItem title="menuItem" />
    </MarigoldProvider>
  );
  const menuItem = screen.getByTitle(/menuItem/);

  expect(menuItem instanceof HTMLAnchorElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <MarigoldProvider theme={theme}>
      <MenuItem className="custom-class-name" title="menuItem" />
    </MarigoldProvider>
  );
  const menuItem = screen.getByTitle(/menuItem/);

  expect(menuItem.className).toMatch('custom-class-name');
});
