import { getLocalTimeZone, today } from '@internationalized/date';
import { Calendar } from '@marigold/components';

export const ReadOnlyCalendar = () => (
  <Calendar defaultValue={today(getLocalTimeZone())} readOnly />
);
