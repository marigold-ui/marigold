import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Column } from '@marigold/components';

const theme = {
  layout: {
    column: {
      alignItems: 'center',
    },
    grid: {
      alignItems: 'right',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Column title="column">Default</Column>
    </ThemeProvider>
  );
  const column = screen.getByTitle(/column/);

  expect(column).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Column title="column" variant="grid">
        Grid
      </Column>
    </ThemeProvider>
  );
  const column = screen.getByTitle(/column/);

  expect(column).toHaveStyle(`align-items: right`);
});

test('supports width prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Column title="column" width={6}>
        column
      </Column>
    </ThemeProvider>
  );
  const column = screen.getByTitle(/column/);

  expect(column).toHaveStyle(`width: 50%`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Column title="column">Default</Column>
    </ThemeProvider>
  );
  const column = screen.getByTitle(/column/);

  expect(column instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Column className="custom-class-name" title="column">
        text
      </Column>
    </ThemeProvider>
  );
  const column = screen.getByTitle(/column/);

  expect(column.className).toMatch('custom-class-name');
});
