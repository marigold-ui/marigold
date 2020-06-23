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

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Textarea title="textarea" css={{ fontFamily: 'Oswald Regular' }} />
    </MarigoldProvider>
  );
  const textarea = screen.getByTitle(/textarea/);

  expect(textarea).not.toHaveStyle(`font-family: Oswald Regular`);
  expect(textarea).toHaveStyle(`font-family: Inter Regular`);
});
