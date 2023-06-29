import { ThemeComponent, cva } from '@marigold/system';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva('disabled:text-text-disabled bg-white'),
  calendarCell: cva([
    'aria-disabled:text-text-disabled',
    'hover:bg-bg-hover-light',
    'group-aria-selected/cell:bg-bg-selected outline-none group-aria-selected/cell:font-semibold group-aria-selected/cell:text-white',
  ]),
  calendarControllers: cva(),
};
