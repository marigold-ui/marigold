import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Alert } from './Alert';

const theme = {
  alerts: {
    info: {
      alignItems: 'center',
    },
    error: {
      alignItems: 'right',
    },
    warning: {
      alignItems: 'left',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Alert title="default">Default</Alert>
    </ThemeProvider>
  );
  const alert = screen.getByTitle(/default/);

  expect(alert).toHaveStyle(`align-items: center`);
});

test('accepts error variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Alert title="error" variant="error">
        Error
      </Alert>
    </ThemeProvider>
  );
  const alert = screen.getByTitle(/error/);

  expect(alert).toHaveStyle(`align-items: right`);
});

test('accepts warning variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Alert title="warning" variant="warning">
        warning
      </Alert>
    </ThemeProvider>
  );
  const alert = screen.getByTitle(/warning/);

  expect(alert).toHaveStyle(`align-items: left`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Alert title="default">Default</Alert>
    </ThemeProvider>
  );
  const alert = screen.getByTitle(/default/);

  expect(alert instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Alert className="custom-class-name" title="alert">
        alert
      </Alert>
    </ThemeProvider>
  );
  const alert = screen.getByTitle(/alert/);

  expect(alert.className).toMatch('custom-class-name');
});
