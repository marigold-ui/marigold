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
  calendarListboxButton: cva([
    'rounded-xs border-none px-4 leading-[48px] h-component outline-hidden',
    'focus-visible:outline-outline-focus focus-visible:outline focus-visible:outline-offset-1',
    'hover:bg-bg-brand-hover hover:text-text-inverted',
    'aria-[current=true]:text-text-inverted aria-[current=true]:bg-bg-brand',
    'aria-[current=true]:hover:bg-bg-brand-hover',
  ]),
  select: cva([
    'bg-bg-surface',
    'px-2',
    'border-border-base rounded-xs border outline-hidden outline-offset-[-1px] h-component',
    'focus:outline-outline-focus focus:outline-2',
    'hover:border-border-base-hover',
    'disabled:bg-bg-base-disabled disabled:text-text-base-disabled disabled:hover:border-border-base-disabled disabled:border-border-base-disabled disabled:cursor-not-allowed',
  ]),
};
