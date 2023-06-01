import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva('bg-white mg-disabled:text-calendar-disabled'),
  calendarCell: cva([
    'mg-disabled:text-calendar-disabled',
    'data-[hover]:bg-calendar-background',
    'group-aria-selected/cell:font-semibold group-aria-selected/cell:bg-calendar-calendarCell-selected group-aria-selected/cell:text-white outline-none',
  ]),
  calendarControllers: cva(),
};
