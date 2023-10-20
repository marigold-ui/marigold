import { createCalendar } from '@internationalized/date';
import { useRef, useState } from 'react';

import {
  AriaCalendarProps,
  DateValue,
  useCalendar,
} from '@react-aria/calendar';
import { useDateFormatter, useLocale } from '@react-aria/i18n';

import { useCalendarState } from '@react-stately/calendar';

import { ChevronDown, ChevronLeft, ChevronRight } from '@marigold/icons';
import { cn, useClassNames, useStateProps } from '@marigold/system';

import { Button } from '../Button';
import { CalendarGrid } from './CalendarGrid';
import MonthDropdown from './MonthDropdown';
import YearDropdown from './YearDropdown';

// Props
// ---------------
export interface CalendarProps
  extends Omit<AriaCalendarProps<DateValue>, 'isDisabled' | 'isReadOnly'> {
  disabled?: boolean;
  readOnly?: boolean;
  variant?: string;
  size?: string;
}

const buttonStyles = 'flex items-center justify-between gap-1 overflow-hidden';

// Component
// ---------------
export const Calendar = ({
  disabled,
  readOnly,
  size,
  variant,
  ...rest
}: CalendarProps) => {
  const { locale } = useLocale();
  const props: AriaCalendarProps<DateValue> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    ...rest,
  };

  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });
  const ref = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );
  // destructure isDisabled to avoid passing it to the component and being used on dom element
  const {
    isDisabled: prevIsDisabled,
    onFocusChange: prevFocusChange,
    ...prevPropsRest
  } = prevButtonProps;

  const {
    isDisabled: nextIsDisabled,
    onFocusChange: nextFocusChange,
    ...nextPropsRest
  } = nextButtonProps;

  const calendarState = useStateProps({
    disabled: state.isDisabled,
    focusVisible: state.isFocused,
  });

  const classNames = useClassNames({ component: 'Calendar' });
  const { select: selectClassNames } = useClassNames({ component: 'Select' });

  const [selectedDropdown, setSelectedDropdown] = useState<
    string | undefined
  >();

  let months = [];
  let formatter = useDateFormatter({
    month: 'long',
    timeZone: state.timeZone,
  });
  let numMonths = state.focusedDate.calendar.getMonthsInYear(state.focusedDate);

  for (let i = 1; i <= numMonths; i++) {
    let date = state.focusedDate.set({ month: i });
    months.push(formatter.format(date.toDate(state.timeZone)));
  }

  const selectedValue = {
    month: months[state.focusedDate.month - 1].substring(0, 3),
    year: state.focusedDate.year,
  };

  return (
    <div
      tabIndex={-1}
      className={cn(
        'flex min-h-[350px] w-[360px] flex-col rounded-sm p-4  shadow-[0_4px_4px_rgba(165,165,165,0.25)]',
        classNames.calendar
      )}
      {...calendarProps}
      {...calendarState}
      ref={ref}
    >
      {selectedDropdown ? (
        selectedDropdown === 'month' ? (
          <MonthDropdown
            setSelectedDropdown={setSelectedDropdown}
            months={months}
            state={state}
          />
        ) : (
          <YearDropdown
            setSelectedDropdown={setSelectedDropdown}
            state={state}
          />
        )
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex w-full gap-4">
              <button
                disabled={state.isDisabled}
                onClick={() => setSelectedDropdown('month')}
                className={cn(buttonStyles, selectClassNames)}
                data-testid="month"
              >
                {selectedValue.month}
                <ChevronDown />
              </button>
              <button
                disabled={state.isDisabled}
                onClick={() => setSelectedDropdown('year')}
                className={cn(buttonStyles, selectClassNames)}
                data-testid="year"
              >
                {selectedValue.year}
                <ChevronDown />
              </button>
            </div>
            <div className="flex w-full flex-nowrap justify-end gap-[10px] [&_button:disabled]:cursor-not-allowed [&_button]:px-2 [&_button]:py-1">
              <Button
                className={classNames.calendarControllers}
                {...prevPropsRest}
                disabled={prevIsDisabled}
              >
                <ChevronLeft />
              </Button>
              <Button
                className={classNames.calendarControllers}
                {...nextPropsRest}
                disabled={nextIsDisabled}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <CalendarGrid state={state} />
        </>
      )}
    </div>
  );
};
