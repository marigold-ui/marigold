import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Menu } from './Menu';
import { MenuItem } from '../MenuItem';

const theme = {
  menu: {
    default: {
      padding: '4px',
    },
    custom: {
      padding: '8px',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Menu title="menu" onClick={() => {}}>
        <MenuItem href="#">Home</MenuItem>
      </Menu>
    </ThemeProvider>
  );
  const menu = screen.getByTitle(/menu/);

  expect(menu).toHaveStyle(`padding: 4px`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Menu variant="custom" title="menu" onClick={() => {}}>
        <MenuItem href="#">Home</MenuItem>
      </Menu>
    </ThemeProvider>
  );
  const menu = screen.getByTitle(/menu/);

  expect(menu).toHaveStyle(`padding: 8px`);
});

test('supports show prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Menu show={true} title="menu" onClick={() => {}}>
        <MenuItem href="#">Home</MenuItem>
      </Menu>
    </ThemeProvider>
  );
  const menu = screen.getByTitle(/menu/);

  expect(menu).toHaveStyle(`display: block`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Menu title="menu" onClick={() => {}}>
        <MenuItem href="#">Home</MenuItem>
      </Menu>
    </ThemeProvider>
  );
  const menu = screen.getByTitle(/menu/);

  expect(menu instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <Menu title="menu" onClick={() => {}} className="custom-class-name">
      <MenuItem href="#">Home</MenuItem>
    </Menu>
  );
  const menu = screen.getByTitle(/menu/);

  expect(menu.className).toMatch('custom-class-name');
});
