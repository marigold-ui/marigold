import { CalendarDate } from '@internationalized/date';
import { DatePicker } from '@marigold/components';

export const MinMaxDatePicker = () => (
  <DatePicker
    label="Date Picker"
    description="Determine min and max value for date picker"
    minValue={new CalendarDate(2019, 6, 5)}
    maxValue={new CalendarDate(2019, 6, 20)}
  />
);
