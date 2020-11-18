import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Alert } from '@marigold/components';

const theme = {
  alerts: {
    info: {
      alignItems: 'center',
    },
    danger: {
      alignItems: 'right',
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

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Alert title="danger" variant="danger">
        Danger
      </Alert>
    </ThemeProvider>
  );
  const alert = screen.getByTitle(/danger/);

  expect(alert).toHaveStyle(`align-items: right`);
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
