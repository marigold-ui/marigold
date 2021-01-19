import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
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
    <ThemeProvider theme={theme}>
      <MenuItem title="menuItem" />
    </ThemeProvider>
  );
  const menuItem = screen.getByTitle(/menuItem/);

  expect(menuItem).toHaveStyle(`padding: 4px`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <MenuItem title="menuItem" variant="item" />
    </ThemeProvider>
  );
  const menuItem = screen.getByTitle(/menuItem/);

  expect(menuItem).toHaveStyle(`padding: 8px`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <MenuItem title="menuItem" />
    </ThemeProvider>
  );
  const menuItem = screen.getByTitle(/menuItem/);

  expect(menuItem instanceof HTMLAnchorElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <MenuItem className="custom-class-name" title="menuItem" />
    </ThemeProvider>
  );
  const menuItem = screen.getByTitle(/menuItem/);

  expect(menuItem.className).toMatch('custom-class-name');
});
