import { CalendarDate } from '@internationalized/date';
import { RangeCalendar, RangeCalendarProps } from '@marigold/components';

export default (props: RangeCalendarProps) => (
  <RangeCalendar
    {...props}
    defaultValue={{
      start: new CalendarDate(2025, 8, 7),
      end: new CalendarDate(2025, 8, 14),
    }}
  />
);
