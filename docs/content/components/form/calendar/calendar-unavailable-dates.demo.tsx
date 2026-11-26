import { useLocale } from '@react-aria/i18n';
import { Calendar, type DateValue, isWeekend } from '@marigold/components';

export default () => {
  const { locale } = useLocale();

  return (
    <Calendar
      aria-label="Appointment date"
      dateUnavailable={(date: DateValue) => isWeekend(date, locale)}
    />
  );
};
