import { createContext, useContext } from 'react';
import { ComponentClassNames } from '@marigold/system';

export const CalendarContext = createContext<{
  classNames: ComponentClassNames<'Calendar'>;
}>({} as any);
export const useCalendarContext = () => useContext(CalendarContext);
