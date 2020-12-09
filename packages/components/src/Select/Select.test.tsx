import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Select } from '@marigold/components';

const theme = {
  form: {
    select: {
      fontFamily: 'Inter',
    },
    other: {
      fontFamily: 'Oswald',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select title="select">
        <option>1</option>
      </Select>
    </ThemeProvider>
  );
  const select = screen.getByTitle(/select/);

  expect(select).toHaveStyle(`font-family: Inter`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select title="select" variant="other">
        <option>1</option>
      </Select>
    </ThemeProvider>
  );
  const select = screen.getByTitle(/select/);

  expect(select).toHaveStyle(`font-family: Oswald`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select title="select">
        <option>1</option>
      </Select>
    </ThemeProvider>
  );
  const select = screen.getByTitle(/select/);

  expect(select instanceof HTMLSelectElement).toBeTruthy();
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select title="select" css={{ fontFamily: 'Oswald Regular' }}>
        <option>1</option>
      </Select>
    </ThemeProvider>
  );
  const select = screen.getByTitle(/select/);

  expect(select).not.toHaveStyle(`font-family: Oswald Regular`);
  expect(select).toHaveStyle(`font-family: Inter`);
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select className="custom-class-name" title="select">
        <option>1</option>
      </Select>
    </ThemeProvider>
  );
  const select = screen.getByTitle(/select/);

  expect(select.className).toMatch('custom-class-name');
});
