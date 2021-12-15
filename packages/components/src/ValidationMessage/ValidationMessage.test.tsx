import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { ValidationMessage } from './ValidationMessage';

const theme = {
  space: {
    none: 0,
    small: 4,
    medium: 8,
  },
  validation: {
    error: {
      p: 'medium',
    },
    warning: {
      p: 'small',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <ValidationMessage title="error">error</ValidationMessage>
    </ThemeProvider>
  );
  const validation = screen.getByTitle(/error/);

  expect(validation).toHaveStyle(`padding: 8px`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <ValidationMessage title="warning" variant="warning">
        warning
      </ValidationMessage>
    </ThemeProvider>
  );
  const validation = screen.getByTitle(/warning/);

  expect(validation).toHaveStyle(`padding: 4px`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <ValidationMessage title="error">error</ValidationMessage>
    </ThemeProvider>
  );
  const validation = screen.getByTitle(/error/);

  expect(validation instanceof HTMLSpanElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <ValidationMessage className="custom-class-name" title="validation">
        validation
      </ValidationMessage>
    </ThemeProvider>
  );
  const validation = screen.getByTitle(/validation/);

  expect(validation.className).toMatch('custom-class-name');
});
