import type { DateValue } from '@internationalized/date';
import { isWeekend } from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import { Calendar } from '@marigold/components';

export default () => {
  const { locale } = useLocale();

  return (
    <Calendar
      aria-label="Appointment date"
      dateUnavailable={(date: DateValue) => isWeekend(date, locale)}
    />
  );
};
