import { render, screen } from '@testing-library/react';
import React from 'react';

import { I18nProvider } from '@react-aria/i18n';

import { Currency } from './Currency';

test('renders Currency', () => {
  render(
    <I18nProvider locale="en-US">
      <Currency currency="USD" value={20} />
    </I18nProvider>
  );
  const currency = screen.getByText('$20.00');
  expect(currency).toBeInTheDocument();
});

test('supports different language', () => {
  render(
    <I18nProvider locale="de-DE">
      <Currency currency="EUR" value={30} />
    </I18nProvider>
  );
  const currency = screen.getByText('30,00 €');
  expect(currency).toBeInTheDocument();
});
