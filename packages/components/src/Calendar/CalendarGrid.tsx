import type { DateDuration } from '@internationalized/date';
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
} from 'react-aria-components';
import { CalendarGridHeader } from './CalendarGridHeader';
import { useCalendarContext } from './Context';

export interface CalendarGridProps {
  /**
   * The offset for the calendar grid when displaying multiple months.
   * For example, { months: 1 } will show the next month.
   */
  offset?: DateDuration;
}

const _CalendarGrid = ({ offset }: CalendarGridProps) => {
  const { classNames } = useCalendarContext();

  return (
    <CalendarGrid offset={offset} className={classNames.calendarGrid}>
      <CalendarGridHeader />
      <CalendarGridBody>
        {date => (
          <CalendarCell date={date} className={classNames.calendarCell} />
        )}
      </CalendarGridBody>
    </CalendarGrid>
  );
};

export { _CalendarGrid as CalendarGrid };
