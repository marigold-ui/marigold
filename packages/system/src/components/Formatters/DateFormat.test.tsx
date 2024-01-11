import { render, screen } from '@testing-library/react';
import React from 'react';

import { I18nProvider } from '@react-aria/i18n';

import { DateFormat } from './DateFormat';

test('supports formatting date based on specific locale', () => {
  render(
    <I18nProvider locale="ru-RU">
      <DateFormat value={new Date('2021-11-07T07:45:00Z')} />
    </I18nProvider>
  );
  const date = screen.getByText('07.11.2021');
  expect(date).toBeInTheDocument();
});
