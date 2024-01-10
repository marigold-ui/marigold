import { I18nProvider } from '@react-aria/i18n';

import { Text } from '@marigold/components';
import { DateFormatter } from '@marigold/system';

export default () => {
  return (
    <I18nProvider locale="de-DE">
      <Text>
        Current Date: <DateFormatter value={new Date()} />
      </Text>
    </I18nProvider>
  );
};
