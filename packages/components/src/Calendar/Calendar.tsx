import type RAC from 'react-aria-components';
import { Calendar, DateValue } from 'react-aria-components';
import { WidthProp, cn, useClassNames } from '@marigold/system';
import { CalendarGrid } from './CalendarGrid';
import MonthControls from './MonthControls';
import { MonthList } from './MonthListBox';
import { YearList } from './YearListBox';

// Props
// ---------------
type RemovedProps =
  | 'visibleDuration'
  | 'pageBehavior'
  | 'isDateUnavailable'
  | 'isDisabled'
  | 'isReadOnly'
  | 'isInvalid'
  | 'errorMessage'
  | 'className'
  | 'style';

export interface CalendarProps
  extends Omit<RAC.CalendarProps<DateValue>, RemovedProps> {
  /**
   * Disables the Calendar.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the calendar value is immutable.
   * @default false
   */
  readOnly?: boolean;
  variant?: string;
  size?: string;
  /**
   * Width of the calendar.
   */
  width?: WidthProp['width'];
  /**
   * Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.
   */
  dateUnavailable?: RAC.CalendarProps<DateValue>['isDateUnavailable'];
}

// Component
// ---------------
export const _Calendar = ({
  disabled,
  readOnly,
  size,
  variant,
  dateUnavailable,
  ...rest
}: CalendarProps) => {
  const props: RAC.CalendarProps<DateValue> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isDateUnavailable: dateUnavailable,
    ...rest,
  };

  const classNames = useClassNames({ component: 'Calendar' });
  return (
    <Calendar
      className={cn(
        'flex min-h-[350px] w-fit flex-col rounded-xs p-4',
        classNames.calendar
      )}
      {...props}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex w-fit gap-4">
          <MonthList />
          <YearList />
        </div>
        <MonthControls />
      </div>
      <CalendarGrid />
    </Calendar>
  );
};

export { _Calendar as Calendar };
