import type { DateDuration } from '@internationalized/date';
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
} from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { CalendarGridHeader } from './CalendarGridHeader';

export interface CalendarGridProps {
  /**
   * The offset for the calendar grid when displaying multiple months.
   * For example, { months: 1 } will show the next month.
   */
  offset?: DateDuration;
}

const _CalendarGrid = ({ offset }: CalendarGridProps) => {
  const classNames = useClassNames({ component: 'Calendar' });

  return (
    <CalendarGrid offset={offset} className={classNames.calendarGrid}>
      <CalendarGridHeader />
      <CalendarGridBody>
        {date => (
          <CalendarCell
            date={date}
            className={cn(
              'flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full p-[5.3px] text-sm font-normal aria-disabled:cursor-default',
              classNames.calendarCell
            )}
          />
        )}
      </CalendarGridBody>
    </CalendarGrid>
  );
};

export { _CalendarGrid as CalendarGrid };
