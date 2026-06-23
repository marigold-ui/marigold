import { CalendarDate } from '@internationalized/date';
import { DateRangePicker } from '@marigold/components';

export default () => (
  <DateRangePicker
    label="Date Range"
    minValue={new CalendarDate(2024, 1, 1)}
    maxValue={new CalendarDate(2024, 12, 31)}
  />
);
