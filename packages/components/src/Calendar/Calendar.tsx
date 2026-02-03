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
import { CalendarHeader } from './CalendarHeader';
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
  | 'isDateUnavailable'
  | 'isDisabled'
  | 'isReadOnly'
  | 'isInvalid'
  | 'errorMessage'
  | 'className'
  | 'style';

export interface CalendarProps extends Omit<
  RAC.CalendarProps<DateValue>,
  RemovedProps
> {
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
  /**
   * The number of months to display at once. Up to 3 months are supported.
   * @default { months: 1 }
   */
  visibleDuration?: { months: number };
  /**
   * Controls how the calendar pages when navigating.
   * - 'single': Page by one month at a time
   * - 'visible': Page by the number of visible months
   * @default 'visible'
   */
  pageBehavior?: 'single' | 'visible';
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
  minValue,
  maxValue,
  visibleDuration = { months: 1 },
  pageBehavior = 'visible',
  ...rest
}: CalendarProps) => {
  const visibleMonths = visibleDuration?.months ?? 1;
  const isMultiMonth = visibleMonths > 1;

  const props: RAC.CalendarProps<DateValue> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isDateUnavailable: dateUnavailable,
    minValue,
    maxValue,
    visibleDuration,
    pageBehavior,
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

  // Multi-month view renders a simplified header per month without dropdowns
  if (isMultiMonth) {
    return (
      <CalendarContext.Provider
        value={{
          classNames,
          visibleMonths,
          minValue,
          maxValue,
          disabled,
        }}
      >
        <Calendar
          className={cn(
            'relative flex min-h-[350px] flex-col',
            twWidth[width],
            classNames.calendar
          )}
          {...props}
        >
          <div className={cn('flex gap-4', classNames.calendarContainer)}>
            {[...Array(visibleMonths).keys()].map(i => (
              <div key={i} className={cn('flex-1', classNames.calendarMonth)}>
                <CalendarHeader
                  monthOffset={i}
                  showPrevious={i === 0}
                  showNext={i === visibleMonths - 1}
                />
                <CalendarGrid offset={{ months: i }} />
              </div>
            ))}
          </div>
        </Calendar>
      </CalendarContext.Provider>
    );
  }

  // Single-month view with dropdowns for month/year selection
  return (
    <CalendarContext.Provider
      value={{
        classNames,
        visibleMonths,
        minValue,
        maxValue,
        disabled,
      }}
    >
      <Calendar
        className={cn(
          'relative flex min-h-[350px] flex-col',
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
