import { CalendarDate } from '@internationalized/date';
import { DateField } from '@marigold/components';

export default () => (
  <DateField
    label="Event Date"
    defaultValue={new CalendarDate(2023, 10, 15)} // Updated to a future date relevant for ticketing
    description="Select the date for your ticket event."
  />
);
