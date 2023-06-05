import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva('mg-disabled:text-text-disabled bg-white'),
  calendarCell: cva([
    'mg-disabled:text-text-disabled',
    'data-[hover]:bg-bg-hover-light',
    'group-aria-selected/cell:bg-bg-selected outline-none group-aria-selected/cell:font-semibold group-aria-selected/cell:text-white',
  ]),
  calendarControllers: cva(),
};
