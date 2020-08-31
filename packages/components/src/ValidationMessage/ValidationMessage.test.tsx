import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
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
    <MarigoldProvider theme={theme}>
      <ValidationMessage title="negative">negative</ValidationMessage>
    </MarigoldProvider>
  );
  const validation = screen.getByTitle(/negative/);

  expect(validation).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <ValidationMessage title="danger" variant="danger">
        Danger
      </ValidationMessage>
    </MarigoldProvider>
  );
  const validation = screen.getByTitle(/danger/);

  expect(validation).toHaveStyle(`align-items: right`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <ValidationMessage title="negative">negative</ValidationMessage>
    </MarigoldProvider>
  );
  const validation = screen.getByTitle(/negative/);

  expect(validation instanceof HTMLSpanElement).toBeTruthy();
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <ValidationMessage title="negative" css={{ alignItems: 'left' }}>
        negative
      </ValidationMessage>
    </MarigoldProvider>
  );
  const validation = screen.getByTitle(/negative/);

  expect(validation).toHaveStyle(`align-items: center`);
  expect(validation).not.toHaveStyle(`align-items: left`);
});
