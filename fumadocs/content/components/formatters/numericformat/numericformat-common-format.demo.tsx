import { useState } from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { Columns, NumericFormat, Radio, Stack } from '@marigold/components';

interface Locale {
  [key: string]: string;
}

const localeOptions: Locale = {
  'de-DE': '🇩🇪 de-DE',
  'en-US': '🇺🇸 en-US',
  'ja-JP': '🇯🇵 ja-JP',
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
          <NumericFormat value={199.99} style="currency" currency="EUR" />
          <NumericFormat
            value={0.2571}
            style="percent"
            minimumFractionDigits={1}
          />
          <NumericFormat value={1250000} notation="compact" />
          <NumericFormat
            value={3.1415926}
            minimumFractionDigits={2}
            maximumFractionDigits={4}
          />
          <NumericFormat value={42} signDisplay="always" />
        </Stack>
      </Columns>
    </I18nProvider>
  );
};
