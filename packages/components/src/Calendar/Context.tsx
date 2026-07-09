import { createContext, use } from 'react';
import { CalendarStateContext } from 'react-aria-components/Calendar';
import type { DateValue } from 'react-aria-components/Calendar';
import { RangeCalendarStateContext } from 'react-aria-components/RangeCalendar';
import type { ComponentClassNames } from '@marigold/system';

export type CalendarSharedClassNames =
  | ComponentClassNames<'Calendar'>
  | ComponentClassNames<'RangeCalendar'>;

export interface CalendarContextValue {
  classNames: CalendarSharedClassNames;
  visibleMonths: number;
  minValue?: DateValue | null;
  maxValue?: DateValue | null;
  disabled?: boolean;
  readOnly?: boolean;
}

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export const useCalendarContext = () => {
  const ctx = use(CalendarContext);
  if (!ctx) {
    throw new Error('Calendar components must be used within <Calendar>');
  }
  return ctx;
};

export const useCalendarOrRangeState = () => {
  const calendarState = use(CalendarStateContext);
  const rangeState = use(RangeCalendarStateContext);
  const state = calendarState ?? rangeState;
  if (!state) {
    throw new Error(
      'Calendar subcomponents must be rendered inside <Calendar> or <RangeCalendar>'
    );
  }
  return state;
};
