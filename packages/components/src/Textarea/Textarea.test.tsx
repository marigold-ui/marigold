import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Textarea } from '@marigold/components';

const theme = {
  form: {
    textarea: {
      fontFamily: 'Inter Regular',
    },
    textarea2: {
      fontFamily: 'Roboto',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Textarea title="textarea" />
    </MarigoldProvider>
  );
  const textarea = screen.getByTitle(/textarea/);

  expect(textarea).toHaveStyle(`font-family: Inter Regular`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Textarea variant="textarea2" title="textarea" />
    </MarigoldProvider>
  );
  const textarea = screen.getByTitle(/textarea/);

  expect(textarea).toHaveStyle(`font-family: Roboto`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Textarea title="textarea" />
    </MarigoldProvider>
  );
  const textarea = screen.getByTitle(/textarea/);

  expect(textarea instanceof HTMLTextAreaElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Textarea className="custom-class-name" title="textarea" />
    </MarigoldProvider>
  );
  const textarea = screen.getByTitle(/textarea/);

  expect(textarea.className).toMatch('custom-class-name');
});
