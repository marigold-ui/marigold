import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Label } from './Label';

const theme = {
  form: {
    label: {
      fontFamily: 'Inter Regular',
    },
    primary: {
      fontFamily: 'Arial Black',
      fontSize: '10px',
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

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Label variant="primary" htmlFor="labelId">
        label
      </Label>
    </MarigoldProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).toHaveStyle(`font-family: Arial Black`);
  expect(label).toHaveStyle(`font-size: 10px`);
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
      <Label htmlFor="labelId" css={{ fontSize: '14px' }}>
        label
      </Label>
    </MarigoldProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).not.toHaveStyle('font-size: 10px');
});
