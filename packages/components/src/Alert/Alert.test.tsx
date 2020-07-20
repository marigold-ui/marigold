import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
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
    <MarigoldProvider theme={theme}>
      <Alert title="default">Default</Alert>
    </MarigoldProvider>
  );
  const alert = screen.getByTitle(/default/);

  expect(alert).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Alert title="danger" variant="danger">
        Danger
      </Alert>
    </MarigoldProvider>
  );
  const alert = screen.getByTitle(/danger/);

  expect(alert).toHaveStyle(`align-items: right`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Alert title="default">Default</Alert>
    </MarigoldProvider>
  );
  const alert = screen.getByTitle(/default/);

  expect(alert instanceof HTMLDivElement).toBeTruthy();
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Alert title="default" css={{ alignItems: 'left' }}>
        Default
      </Alert>
    </MarigoldProvider>
  );
  const alert = screen.getByTitle(/default/);

  expect(alert).toHaveStyle(`align-items: center`);
  expect(alert).not.toHaveStyle(`align-items: left`);
});
