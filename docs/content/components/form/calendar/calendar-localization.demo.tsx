import { I18nProvider } from '@marigold/components';
import { Calendar } from '@marigold/components';

export default () => (
  <I18nProvider locale="de-DE">
    <Calendar aria-label="Veranstaltungsdatum" />
  </I18nProvider>
);
