import { createContext, useContext } from 'react';
import type { DateValue } from 'react-aria-components';
import type { ComponentClassNames } from '@marigold/system';

export interface CalendarContextValue {
  classNames: ComponentClassNames<'Calendar'>;
  visibleMonths: number;
  minValue?: DateValue | null;
  maxValue?: DateValue | null;
  disabled?: boolean;
}

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export const useCalendarContext = () => {
  const ctx = useContext(CalendarContext);
  if (!ctx) {
    throw new Error('Calendar components must be used within <Calendar>');
  }
  return ctx;
};
