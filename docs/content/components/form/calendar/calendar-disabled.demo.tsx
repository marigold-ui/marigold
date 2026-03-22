import { CalendarDate } from '@internationalized/date';
import { Calendar } from '@marigold/components';

export default () => (
  <Calendar
    aria-label="Event date"
    disabled
    defaultValue={new CalendarDate(2025, 8, 7)}
  />
);
