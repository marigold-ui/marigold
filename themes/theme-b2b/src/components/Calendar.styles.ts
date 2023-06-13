import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva('disabled:text-text-disabled bg-white'),
  calendarCell: cva([
    'aria-disabled:text-text-disabled',
    'data-[hover]:bg-bg-primary-light',
    'group-aria-selected/cell:bg-bg-selected outline-none group-aria-selected/cell:font-semibold group-aria-selected/cell:text-white',
  ]),
  calendarControllers: cva([
    // should fix this
    'data-[active]:bg-red-600',
    // used #2b2b2b directly because it is used only here
    ' data-[hover]:bg-bg-hover data-[hover]:text-[#2b2b2b]',
  ]),
};
