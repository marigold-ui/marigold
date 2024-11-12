import { CalendarDate } from '@internationalized/date';
import { DatePicker } from '@marigold/components';

export default () => (
  <DatePicker
    label="Event Date"
    description="Choose a date for your ticket purchase. Dates must be between June 5, 2025, and June 20, 2025."
    minValue={new CalendarDate(2025, 6, 5)}
    maxValue={new CalendarDate(2025, 6, 20)}
  />
);
