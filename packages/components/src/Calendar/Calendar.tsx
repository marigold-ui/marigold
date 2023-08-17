import { createCalendar } from '@internationalized/date';
import React, { useRef } from 'react';

import {
  AriaCalendarProps,
  DateValue,
  useCalendar,
} from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';

import { useCalendarState } from '@react-stately/calendar';

import { ChevronLeft, ChevronRight } from '@marigold/icons';
import { cn, useClassNames, useStateProps } from '@marigold/system';

import { Button } from '../Button';
import { CalendarGrid } from './CalendarGrid';
import MonthDropdown from './MonthDropdown';
import YearDropdown from './YearDropdown';

export interface CalendarProps
  extends Omit<AriaCalendarProps<DateValue>, 'isDisabled' | 'isReadOnly'> {
  disabled?: boolean;
  readOnly?: boolean;
  variant?: string;
  size?: string;
}

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

  return (
    <div
      tabIndex={-1}
      className={cn(
        'flex w-[360px] flex-col rounded-sm p-4 shadow-[0_4px_4px_rgba(165,165,165,0.25)]',
        classNames.calendar
      )}
      {...calendarProps}
      {...calendarState}
      ref={ref}
    >
      <div className="mb-4 flex items-center gap-[60px]">
        <div className="flex min-w-[170px] gap-[9px] [&_div]:flex">
          <MonthDropdown state={state} />
          <YearDropdown state={state} />
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
    </div>
  );
};
