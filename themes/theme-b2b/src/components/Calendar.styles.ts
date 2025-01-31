import { ThemeComponent, cva } from '@marigold/system';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva('disabled:text-text-base-disabled'),
  calendarCell: cva([
    'data-disabled:text-text-base-disabled data-disabled:cursor-not-allowed',
    'data-unavailable:text-text-base-disabled data-unavailable:cursor-not-allowed',
    'data-hovered:[&:not([data-unavailable])]:bg-bg-accent-hover data-hovered:[&:not([data-unavailable])]:text-text-inverted',
    'data-selected:bg-bg-selected-input data-selected:text-text-inverted outline-hidden data-selected:font-semibold',
    'data-focus-visible:outline-outline-focus data-focus-visible:outline data-focus-visible:outline-offset-1',
  ]),
  calendarControllers: cva([
    '[&_button[data-hovered]]:bg-bg-base-hover [&_button[data-hovered]]:text-text-base-hover',
  ]),
  calendarHeader: cva(['fontWeight:bolder p-2']),
  calendarGrid: cva('[&_td]:p-2'),
};
