import { useState } from 'react';
import type RAC from 'react-aria-components';
import { Calendar, DateValue } from 'react-aria-components';
import {
  WidthProp,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';
import { CalendarGrid } from './CalendarGrid';
import { CalendarListBox } from './CalendarListBox';
import { CalendarContext } from './Context';
import MonthControls from './MonthControls';
import MonthListBox from './MonthListBox';
import YearListBox from './YearListBox';
import {
  hasOnlyOneSelectableMonth,
  hasOnlyOneSelectableYear,
} from './calendarListBoxSelectableCheck';

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
   * Sets the width of the calendar. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default fit
   */
  width?: WidthProp['width'];
  /**
   * Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.
   */
  dateUnavailable?: RAC.CalendarProps<DateValue>['isDateUnavailable'];
}

type ViewMapKeys = 'month' | 'year';
// Component
// ---------------

const _Calendar = ({
  disabled,
  readOnly,
  size,
  variant,
  width = 'fit',
  dateUnavailable,
  minValue: _minValue,
  maxValue: _maxValue,
  ...rest
}: CalendarProps) => {
  const minValue = _minValue;
  const maxValue = _maxValue;
  const props: RAC.CalendarProps<DateValue> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isDateUnavailable: dateUnavailable,
    minValue,
    maxValue,
    ...rest,
  };

  const classNames = useClassNames({ component: 'Calendar', size, variant });

  const [selectedDropdown, setSelectedDropdown] = useState<
    ViewMapKeys | undefined
  >();

  const ViewMap = {
    month: (
      <MonthListBox
        setSelectedDropdown={setSelectedDropdown}
        minValue={minValue}
        maxValue={maxValue}
      />
    ),
    year: (
      <YearListBox
        setSelectedDropdown={setSelectedDropdown}
        minValue={minValue}
        maxValue={maxValue}
      />
    ),
  } satisfies { [key in ViewMapKeys]: React.JSX.Element };

  return (
    <CalendarContext.Provider value={{ classNames }}>
      <Calendar
        className={cn(
          'relative flex min-h-[350px] flex-col rounded-xs p-4',
          twWidth[width],
          classNames.calendar
        )}
        {...props}
      >
        <div
          className={cn(
            'pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-0',
            selectedDropdown && 'pointer-events-auto opacity-100'
          )}
        >
          {ViewMap[selectedDropdown as ViewMapKeys]}
        </div>

        <div
          className={cn(
            'flex flex-col',
            selectedDropdown && 'pointer-events-none opacity-0'
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex w-fit gap-4">
              <CalendarListBox
                key="month"
                type="month"
                isDisabled={
                  hasOnlyOneSelectableMonth(minValue, maxValue) ||
                  props.isDisabled
                }
                setSelectedDropdown={setSelectedDropdown}
              />
              <CalendarListBox
                key="year"
                type="year"
                isDisabled={
                  hasOnlyOneSelectableYear(minValue, maxValue) ||
                  props.isDisabled
                }
                setSelectedDropdown={setSelectedDropdown}
              />
            </div>
            <MonthControls />
          </div>
          <CalendarGrid />
        </div>
      </Calendar>
    </CalendarContext.Provider>
  );
};

export { _Calendar as Calendar };
