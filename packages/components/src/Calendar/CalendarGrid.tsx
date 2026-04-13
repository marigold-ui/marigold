import type { DateDuration } from '@internationalized/date';
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
} from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { CalendarGridHeader } from './CalendarGridHeader';

export interface CalendarGridProps {
  /**
   * The offset for the calendar grid when displaying multiple months.
   * For example, { months: 1 } will show the next month.
   */
  offset?: DateDuration;
}

const CalendarGridComp = ({ offset }: CalendarGridProps) => {
  const classNames = useClassNames({ component: 'Calendar' });

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

export { CalendarGridComp as CalendarGrid };
