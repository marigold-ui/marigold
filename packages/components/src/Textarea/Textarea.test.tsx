import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Textarea } from '../Textarea';

const theme = {
  fonts: {
    body: 'Inter Regular',
    fancy: 'Roboto',
  },
  colors: {
    error: 'red',
  },
  textarea: {
    __default: {
      fontFamily: 'body',
    },
    custom: {
      fontFamily: 'fancy',
    },
  },
};

test('supports default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea label="label" htmlFor="id" title="textarea" />
    </ThemeProvider>
  );
  const textarea = screen.getByTitle(/textarea/);

  expect(textarea).toHaveStyle(`font-family: Inter Regular`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea label="label" htmlFor="id" variant="custom" title="textarea" />
    </ThemeProvider>
  );
  const textarea = screen.getByTitle(/textarea/);

  expect(textarea).toHaveStyle(`font-family: Roboto`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea label="label" htmlFor="id" title="textarea" />
    </ThemeProvider>
  );
  const textarea = screen.getByTitle(/textarea/);

  expect(textarea instanceof HTMLTextAreaElement).toBeTruthy();
});

test('supports label prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea label="test" htmlFor="id" title="textarea" />
    </ThemeProvider>
  );
  const label = screen.getByText(/test/);

  expect(label instanceof HTMLLabelElement).toBeTruthy();
});

test('supports error and errorMessage prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea
        error
        errorMessage="error"
        label="label"
        htmlFor="id"
        title="textarea"
      />
    </ThemeProvider>
  );
  const errorMessage = screen.getByText(/error/);
  expect(errorMessage).toBeDefined();
  const textarea = screen.getByTitle(/textarea/);
  expect(textarea).toHaveStyle(`outline-color: red`);
});

test('supports required prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea label="test" htmlFor="id" required title="textarea" />
    </ThemeProvider>
  );
  const label = screen.getByText(/test/);

  expect(label.nextSibling instanceof SVGElement).toBeTruthy();
});
