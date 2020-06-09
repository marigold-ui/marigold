import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Label } from './Label';

const theme = {
  form: {
    label: {
      fontFamily: 'Inter Regular',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Label htmlFor="labelId">label</Label>
    </MarigoldProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).toHaveStyle(`font-family: Inter Regular`);
});

test('supports htmlFor prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Label htmlFor="labelId">label</Label>
    </MarigoldProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).toHaveAttribute('for');
});

test('renders <label> element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Label htmlFor="labelId">label</Label>
    </MarigoldProvider>
  );
  const label = screen.getByText(/label/);

  expect(label instanceof HTMLLabelElement).toBeTruthy();
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Label htmlFor="labelId" css={{ fontFamily: 'Oswald Regular' }}>
        label
      </Label>
    </MarigoldProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).not.toHaveStyle(`font-family: Oswald Regular`);
  expect(label).toHaveStyle(`font-family: Inter Regular`);
});
