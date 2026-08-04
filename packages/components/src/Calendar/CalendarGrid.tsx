import type { DateDuration } from '@internationalized/date';
import { useContext } from 'react';
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
} from 'react-aria-components/Calendar';
import { RangeCalendarStateContext } from 'react-aria-components/RangeCalendar';
import { cn } from '@marigold/system';
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
  // RAC strips `data-selected` from every cell when the calendar is disabled,
  // so the in-range fill disappears in disabled <RangeCalendar>. We mark
  // cells in the selected range ourselves so the theme can style them
  // independently of RAC's interactive selection state. Use
  // `highlightedRange` so the fill follows the in-progress selection
  // instead of the previously committed value.
  const rangeState = useContext(RangeCalendarStateContext);
  const range = rangeState?.highlightedRange ?? null;

  return (
    <CalendarGrid
      offset={offset}
      weekdayStyle="short"
      className={classNames.calendarGrid}
    >
      <CalendarGridHeader />
      <CalendarGridBody>
        {date => {
          const isInRange =
            !!range &&
            date.compare(range.start) >= 0 &&
            date.compare(range.end) <= 0;
          return (
            <CalendarCell
              date={date}
              className={cn(classNames.calendarCell, 'data-focus-visible:z-10')}
              data-in-range={isInRange ? '' : undefined}
            />
          );
        }}
      </CalendarGridBody>
    </CalendarGrid>
  );
};

export { _CalendarGrid as CalendarGrid };
