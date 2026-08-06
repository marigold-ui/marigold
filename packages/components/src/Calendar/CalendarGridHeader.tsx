import {
  CalendarHeaderCell,
  CalendarGridHeader as RACCalendarGridHeader,
} from 'react-aria-components/Calendar';
import { useCalendarContext } from './Context';

export function CalendarGridHeader() {
  const { classNames } = useCalendarContext();

  return (
    <RACCalendarGridHeader>
      {day => (
        <CalendarHeaderCell className={classNames.calendarHeader}>
          {day.substring(0, 2)}
        </CalendarHeaderCell>
      )}
    </RACCalendarGridHeader>
  );
}
