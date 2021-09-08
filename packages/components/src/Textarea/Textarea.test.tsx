import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Textarea } from '../Textarea';

const theme = {
  textarea: {
    default: {
      fontFamily: 'Inter Regular',
    },
    textarea2: {
      fontFamily: 'Roboto',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea title="textarea" />
    </ThemeProvider>
  );
  const textarea = screen.getByTitle(/textarea/);

  expect(textarea).toHaveStyle(`font-family: Inter Regular`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea variant="textarea2" title="textarea" />
    </ThemeProvider>
  );
  const textarea = screen.getByTitle(/textarea/);

  expect(textarea).toHaveStyle(`font-family: Roboto`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea title="textarea" />
    </ThemeProvider>
  );
  const textarea = screen.getByTitle(/textarea/);

  expect(textarea instanceof HTMLTextAreaElement).toBeTruthy();
});

test('supports label prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea label="test" htmlFor="myId" title="textarea" />
    </ThemeProvider>
  );
  const textarea = screen.getByText(/test/);

  expect(textarea instanceof HTMLLabelElement).toBeTruthy();
});

test('supports errorMessage prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea errorMessage="error" title="textarea" />
    </ThemeProvider>
  );
  const textarea = screen.getByText(/error/);

  expect(textarea).toBeDefined();
});

test('supports required prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea label="test" htmlFor="myId" required title="textarea" />
    </ThemeProvider>
  );
  const label = screen.getByText(/test/);

  expect(label.nextSibling instanceof SVGElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Textarea className="custom-class-name" title="textarea" />
    </ThemeProvider>
  );
  const textarea = screen.getByTitle(/textarea/);

  expect(textarea.className).toMatch('custom-class-name');
});
