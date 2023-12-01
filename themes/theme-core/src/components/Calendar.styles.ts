import { ThemeComponent, cva } from '@marigold/system';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva('disabled:text-text-disabled bg-white'),
  calendarCell: cva([
    'data-[disabled]:text-text-disabled',
    'hover:bg-bg-hover-light',
    'data-[selected]:bg-bg-selected outline-none data-[selected]:font-semibold data-[selected]:text-white',
  ]),
  calendarControllers: cva(),
};
