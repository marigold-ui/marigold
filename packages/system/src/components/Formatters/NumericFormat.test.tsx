/* eslint react/style-prop-object: 0 */
import { render, screen } from '@testing-library/react';
import { I18nProvider } from '@react-aria/i18n';
import { NumericFormat } from './NumericFormat';

test('renders Currency', () => {
  render(
    <I18nProvider locale="en-US">
      <NumericFormat style="currency" currency="USD" value={20} />
    </I18nProvider>
  );
  const currency = screen.getByText('$20.00');
  expect(currency).toBeInTheDocument();
});

test('supports formatting currency in different language', () => {
  render(
    <I18nProvider locale="de-DE">
      <NumericFormat style="currency" currency="EUR" value={30} />
    </I18nProvider>
  );
  const currency = screen.getByText('30,00 €');
  expect(currency).toBeInTheDocument();
});

test('supports specification of the max number fraction', () => {
  render(<NumericFormat value={123.456789} maximumFractionDigits={2} />);
  const number = screen.getByText('123.46');
  expect(number).toBeInTheDocument();
});

test('supports the notation style for formatting numbers', () => {
  render(<NumericFormat value={123456789} notation="compact" />);
  const number = screen.getByText('123M');
  expect(number).toBeInTheDocument();
});

test('supports the unit of measurement to display alongside the number', () => {
  render(<NumericFormat value={10} style="unit" unit="mile-per-hour" />);
  const number = screen.getByText('10 mph');
  expect(number).toBeInTheDocument();
});

test('renders value in percentage', () => {
  render(<NumericFormat style="percent" value={0.2} />);
  const percentage = screen.getByText('20%');
  expect(percentage).toBeInTheDocument();
});

test('supports formatting a range', () => {
  render(
    <I18nProvider locale="en-US">
      <NumericFormat value={[10, 30]} minimumFractionDigits={1} />
      <NumericFormat value={[20, 35]} style="currency" currency="USD" />
      <NumericFormat value={[55, 80]} style="unit" unit="mile-per-hour" />
      <NumericFormat value={[0.2, 0.3]} style="percent" />
    </I18nProvider>
  );

  const range = screen.getByText('10.0–30.0');
  const currency = screen.getByText('$20.00 – $35.00');
  const unit = screen.getByText('55–80 mph');
  const percent = screen.getByText('20% – 30%');

  expect(range).toBeInTheDocument();
  expect(currency).toBeInTheDocument();
  expect(unit).toBeInTheDocument();
  expect(percent).toBeInTheDocument();
});
