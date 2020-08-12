import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Badge } from '@marigold/components';

const theme = {
  content: {
    badge: {
      borderRadius: '8px',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Badge title="badge" />
    </MarigoldProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge).toHaveStyle(`border-radius: 8px;`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Badge title="badge" />
    </MarigoldProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge instanceof HTMLDivElement).toBeTruthy();
});

test('supports custom borderColor prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Badge title="badge" borderColor="#000" />
    </MarigoldProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge).toHaveStyle(`border: 1px solid #000`);
});

test('supports custom backgroundColor prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Badge title="badge" backgroundColor="#1ee" />
    </MarigoldProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge).toHaveStyle(`background: #1ee`);
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Badge title="badge" css={{ borderRadius: 0 }}></Badge>
    </MarigoldProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge).toHaveStyle(`border-radius: 8px`);
  expect(badge).not.toHaveStyle(`border-radius: 0`);
});
