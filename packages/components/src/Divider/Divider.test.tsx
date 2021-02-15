import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Divider } from '@marigold/components';

const theme = {
  divider: {
    regular: {
      border: 0,
      borderBottom: '1px solid',
      margin: '2px',
    },
    bold: {
      border: 0,
      borderBottom: '2px solid',
      margin: '2px',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Divider title="divider" />
    </MarigoldProvider>
  );
  const divider = screen.getByTitle(/divider/);

  expect(divider).toHaveStyle(`borderBottom: 1px solid`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Divider variant="bold" title="divider" />
    </MarigoldProvider>
  );
  const divider = screen.getByTitle(/divider/);

  expect(divider).toHaveStyle(`borderBottom: 2px solid`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Divider title="divider" />
    </MarigoldProvider>
  );
  const divider = screen.getByTitle(/divider/);

  expect(divider instanceof HTMLHRElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Divider className="custom-class-name" title="divider" />
    </MarigoldProvider>
  );
  const divider = screen.getByTitle(/divider/);

  expect(divider.className).toMatch('custom-class-name');
});
