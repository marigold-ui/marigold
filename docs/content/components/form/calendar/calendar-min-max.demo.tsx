import { CalendarDate } from '@internationalized/date';
import { Calendar } from '@marigold/components';

export default () => (
  <Calendar
    aria-label="Event date"
    minValue={new CalendarDate(2025, 6, 5)}
    maxValue={new CalendarDate(2025, 6, 20)}
  />
);
