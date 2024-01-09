import { useState } from 'react';

import { I18nProvider } from '@react-aria/i18n';

import { Inline, Radio } from '@marigold/components';
import { Currency } from '@marigold/system';

interface LocaleValues {
  [key: string]: string;
}

const localeValues: LocaleValues = {
  USD: 'en-US',
  EUR: 'de-DE',
  JPY: 'ja-JP',
};

export default () => {
  const [currentFormat, setCurrentFormat] = useState('USD');
  return (
    <I18nProvider locale={localeValues[currentFormat]}>
      <Inline space={12}>
        <Radio.Group
          label="chose current curreny format"
          width={'1/2'}
          defaultValue={currentFormat}
          onChange={setCurrentFormat}
        >
          <Radio value="USD">USD</Radio>
          <Radio value="EUR">EUR</Radio>
          <Radio value="JPY">JPY</Radio>
        </Radio.Group>
        <Currency value={233} currency={currentFormat} />
      </Inline>
    </I18nProvider>
  );
};
