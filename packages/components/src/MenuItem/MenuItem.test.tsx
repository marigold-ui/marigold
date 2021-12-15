import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { MenuItem } from './MenuItem';

const theme = {
  space: {
    none: 0,
    small: 4,
    medium: 8,
  },
  menuItem: {
    default: {
      padding: 'small',
    },
    item: {
      padding: 'medium',
    },
  },
};

test('supports default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <MenuItem title="menuItem">Item</MenuItem>
    </ThemeProvider>
  );
  const menuItem = screen.getByTitle(/menuItem/);

  expect(menuItem.parentElement).toHaveStyle(`padding: 4px`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <MenuItem title="menuItem" variant="item">
        Item
      </MenuItem>
    </ThemeProvider>
  );
  const menuItem = screen.getByTitle(/menuItem/);

  expect(menuItem.parentElement).toHaveStyle(`padding: 8px`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <MenuItem title="menuItem">Item</MenuItem>
    </ThemeProvider>
  );
  const menuItem = screen.getByTitle(/menuItem/);

  expect(menuItem instanceof HTMLAnchorElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <MenuItem title="menuItem" className="custom-class-name">
        Item
      </MenuItem>
    </ThemeProvider>
  );
  const menuItem = screen.getByText(/Item/).parentElement;

  expect(menuItem).toHaveClass('custom-class-name');
});
