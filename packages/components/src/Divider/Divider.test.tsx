import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Divider } from './Divider';

const theme = {
  divider: {
    regular: {
      border: 0,
      borderBottom: '1px solid',
      margin: '2px',
    },
    bold: {
      border: 0,
      borderBottom: '2px solid',
      margin: '2px',
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
