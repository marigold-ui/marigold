import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Label } from './Label';

const theme = {
  form: {
    label: {
      fontFamily: 'Inter Regular',
    },
    myLabel: {
      fontFamily: 'Oswald Regular',
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

test('supports other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Label htmlFor="labelId" variant="myLabel">
        label
      </Label>
    </MarigoldProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).toHaveStyle(`font-family: Oswald Regular`);
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

test('accepts custom styles prop className', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Label htmlFor="labelId" className="custom-class-name" title="label">
        label
      </Label>
    </MarigoldProvider>
  );
  const label = screen.getByTitle(/label/);

  expect(label.className).toMatch('custom-class-name');
});
