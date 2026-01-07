'use client';

import { useState } from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { Columns, DateFormat, Radio, Stack } from '@marigold/components';

interface Locale {
  [key: string]: string;
}

const localeOptions: Locale = {
  'de-DE': '🇩🇪 de-DE',
  'en-US': '🇺🇸 en-US',
  'ar-EG': '🇪🇬 ar-EG',
};

export default () => {
  const [locale, setLocale] = useState('de-DE');
  return (
    <I18nProvider locale={locale}>
      <Columns columns={['fit', 1]} space={10}>
        <Radio.Group
          label="Locale"
          width={32}
          value={locale}
          onChange={setLocale}
        >
          {Object.entries(localeOptions).map(([id, label]) => (
            <Radio key={id} value={id}>
              {label}
            </Radio>
          ))}
        </Radio.Group>
        <Stack space={1}>
          <DateFormat value={new Date(2025, 0, 1)} />
          <DateFormat value={new Date(2025, 11, 31)} dateStyle="full" />
          <DateFormat
            value={new Date(2025, 6, 15, 14, 30)}
            dateStyle="medium"
            timeStyle="short"
          />
        </Stack>
      </Columns>
    </I18nProvider>
  );
};
