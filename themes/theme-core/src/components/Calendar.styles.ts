import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva('mg-disabled:text-calendar-disabled bg-white'),
  calendarCell: cva([
    'mg-disabled:text-calendar-disabled',
    'data-[hover]:bg-calendar-background',
    'group-aria-selected/cell:bg-calendar-calendarCell-selected outline-none group-aria-selected/cell:font-semibold group-aria-selected/cell:text-white',
  ]),
  calendarControllers: cva(),
};
