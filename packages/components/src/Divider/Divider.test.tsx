import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Divider } from './Divider';

const theme = {
  space: {
    none: 0,
    small: 2,
  },
  borders: {
    none: 0,
    regular: '1px solid',
  },
  divider: {
    regular: {
      border: 'none',
      borderBottom: 'regular',
      margin: 'small',
    },
    bold: {
      border: 'none',
      borderBottom: '2px solid',
      margin: 'small',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Divider title="divider" />
    </ThemeProvider>
  );
  const divider = screen.getByTitle(/divider/);

  expect(divider).toHaveStyle(`borderBottom: 1px solid`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Divider variant="bold" title="divider" />
    </ThemeProvider>
  );
  const divider = screen.getByTitle(/divider/);

  expect(divider).toHaveStyle(`borderBottom: 2px solid`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Divider title="divider" />
    </ThemeProvider>
  );
  const divider = screen.getByTitle(/divider/);

  expect(divider instanceof HTMLHRElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Divider className="custom-class-name" title="divider" />
    </ThemeProvider>
  );
  const divider = screen.getByTitle(/divider/);

  expect(divider.className).toMatch('custom-class-name');
});
