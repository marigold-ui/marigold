import { ThemeComponent, cva } from '@marigold/system';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva('disabled:text-text-base-disabled'),
  calendarCell: cva([
    'data-disabled:text-text-base-disabled data-disabled:cursor-not-allowed',
    'data-unavailable:text-text-base-disabled data-unavailable:cursor-not-allowed',
    'data-hovered:[&:not([data-unavailable])]:bg-bg-inverted-hover',
    'data-selected:bg-bg-selected outline-hidden data-selected:font-semibold data-selected:text-white',
    'data-focus-visible:outline-outline-focus',
  ]),
  calendarControllers: cva(),
  calendarHeader: cva(['fontWeight:bolder p-2']),
  calendarGrid: cva('[&_td]:p-2'),
};
