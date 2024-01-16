import { I18nProvider } from '@react-aria/i18n';

import { DateFormat } from '@marigold/system';

export default () => {
  return (
    <I18nProvider locale="de-DE">
      <DateFormat dateStyle="full" value={new Date()} />
    </I18nProvider>
  );
};
