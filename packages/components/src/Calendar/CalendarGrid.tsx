import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
} from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { CalendarGridHeader } from './CalendarGridHeader';

const _CalendarGrid = () => {
  const classNames = useClassNames({ component: 'Calendar' });

  return (
    <CalendarGrid className={classNames.calendarGrid}>
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
