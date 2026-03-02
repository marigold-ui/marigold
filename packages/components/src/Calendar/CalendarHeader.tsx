import { useContext } from 'react';
import { CalendarStateContext, Heading } from 'react-aria-components';
import { useDateFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { IconButton } from '../IconButton/IconButton';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import { useCalendarContext } from './Context';

export interface CalendarHeaderProps {
  /**
   * The month offset for this header (0 = first visible month)
   */
  monthOffset?: number;
  /**
   * Whether to show the previous month navigation button
   */
  showPrevious?: boolean;
  /**
   * Whether to show the next month navigation button
   */
  showNext?: boolean;
}

export const CalendarHeader = ({
  monthOffset = 0,
  showPrevious = true,
  showNext = true,
}: CalendarHeaderProps) => {
  const state = useContext(CalendarStateContext)!;
  const { classNames } = useCalendarContext();

  const monthFormatter = useDateFormatter({
    month: 'long',
    year: 'numeric',
    timeZone: state.timeZone,
  });

  const monthDate = state.visibleRange.start.add({ months: monthOffset });
  const formattedMonth = monthFormatter.format(
    monthDate.toDate(state.timeZone)
  );

  return (
    <div className="mb-4 flex min-h-[36px] items-center justify-between">
      <div className="flex-1">
        {showPrevious && (
          <IconButton
            className={cn(
              'inline-flex items-center justify-center gap-[0.5ch]',
              classNames.calendarControllers
            )}
            variant="navigation"
            slot="previous"
          >
            <ChevronLeft size="20" />
          </IconButton>
        )}
      </div>
      <Heading className="text-sm font-medium">{formattedMonth}</Heading>
      <div className="flex flex-1 justify-end">
        {showNext && (
          <IconButton
            className={cn(
              'inline-flex items-center justify-center gap-[0.5ch]',
              classNames.calendarControllers
            )}
            variant="navigation"
            slot="next"
          >
            <ChevronRight size="20" />
          </IconButton>
        )}
      </div>
    </div>
  );
};
