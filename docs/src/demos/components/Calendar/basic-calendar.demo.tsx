import { getLocalTimeZone, today } from '@internationalized/date';
import { Calendar } from '@marigold/components';

export const BasicCalendar = () => (
  <Calendar defaultValue={today(getLocalTimeZone())} />
);
