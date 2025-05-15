import { ThemeComponent, cva } from '@marigold/system';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva('disabled:text-text-base-disabled'),
  calendarCell: cva([
    'data-disabled:text-text-base-disabled data-disabled:cursor-not-allowed',
    'data-unavailable:text-text-base-disabled data-unavailable:cursor-not-allowed',
    'data-hovered:[&:not([data-unavailable])]:bg-bg-inverted-hover',
    'data-selected:bg-bg-selected outline-hidden data-selected:font-semibold data-selected:text-white',
    'data-focus-visible:outline-outline-focus data-focus-visible:outline data-focus-visible:outline-offset-1',
  ]),
  calendarControllers: cva(),
  calendarHeader: cva(['fontWeight:bolder p-2']),
  calendarGrid: cva('[&_td]:p-2'),
  dateSelectorOption: cva([
    'text-text-base ease-ease-out h-component cursor-pointer rounded-xs px-4 py-0 text-sm leading-[22px] transition-all duration-200',
    'focus-visible:outline-outline-focus focus-visible:outline focus-visible:outline-offset-1 outline-hidden',
    'hover:bg-bg-inverted-hover',
    'aria-[current=true]:border-border-brand aria-[current=true]:bg-bg-brand aria-[current=true]:text-text-inverted aria-[current=true]:hover:bg-bg-brand-hover aria-[current=true]:hover:border-border-brand-hover',
  ]),
};
