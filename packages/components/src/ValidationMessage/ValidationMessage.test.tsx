import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { ValidationMessage } from '@marigold/components';

const theme = {
  validation: {
    negative: {
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
      <ValidationMessage title="negative">negative</ValidationMessage>
    </ThemeProvider>
  );
  const validation = screen.getByTitle(/negative/);

  expect(validation).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <ValidationMessage title="danger" variant="danger">
        Danger
      </ValidationMessage>
    </ThemeProvider>
  );
  const validation = screen.getByTitle(/danger/);

  expect(validation).toHaveStyle(`align-items: right`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <ValidationMessage title="negative">negative</ValidationMessage>
    </ThemeProvider>
  );
  const validation = screen.getByTitle(/negative/);

  expect(validation instanceof HTMLSpanElement).toBeTruthy();
});
