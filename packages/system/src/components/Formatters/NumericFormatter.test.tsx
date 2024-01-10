import { render, screen } from '@testing-library/react';
import React from 'react';

import { I18nProvider } from '@react-aria/i18n';

import { NumericFormatter } from './NumericFormatter';

test('renders Currency', () => {
  render(
    <I18nProvider locale="en-US">
      <NumericFormatter styleFormat="currency" currency="USD" value={20} />
    </I18nProvider>
  );
  const currency = screen.getByText('$20.00');
  expect(currency).toBeInTheDocument();
});

test('supports formatting currency in different language', () => {
  render(
    <I18nProvider locale="de-DE">
      <NumericFormatter styleFormat="currency" currency="EUR" value={30} />
    </I18nProvider>
  );
  const currency = screen.getByText('30,00 €');
  expect(currency).toBeInTheDocument();
});

test('supports specification of the max number fraction', () => {
  render(<NumericFormatter value={123.456789} maximumFractionDigits={2} />);
  const number = screen.getByText('123.46');
  expect(number).toBeInTheDocument();
});

test('supports the notation style for formatting numbers', () => {
  render(<NumericFormatter value={123456789} notation="compact" />);
  const number = screen.getByText('123M');
  expect(number).toBeInTheDocument();
});

test('supports the unit of measurement to display alongside the number', () => {
  render(
    <NumericFormatter value={10} styleFormat={'unit'} unit="mile-per-hour" />
  );
  const number = screen.getByText('10 mph');
  expect(number).toBeInTheDocument();
});

test('renders value in percentage', () => {
  render(<NumericFormatter styleFormat="percent" value={0.2} />);
  const percentage = screen.getByText('20%');
  expect(percentage).toBeInTheDocument();
});
