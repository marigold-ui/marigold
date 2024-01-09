import { render, screen } from '@testing-library/react';
import React from 'react';

import { Numeric } from './Numeric';

test('supports specification of the max number fraction', () => {
  render(<Numeric value={123.456789} maximumFractionDigits={2} />);
  const number = screen.getByText('123.46');
  expect(number).toBeInTheDocument();
});

test('supports the notation style for formatting numbers', () => {
  render(<Numeric value={123456789} notation="compact" />);
  const number = screen.getByText('123M');
  expect(number).toBeInTheDocument();
});

test('supports the unit of measurement to display alongside the number', () => {
  render(<Numeric value={10} styleFormat={'unit'} unit="mile-per-hour" />);
  const number = screen.getByText('10 mph');
  expect(number).toBeInTheDocument();
});
