import { ThemeComponent, cva } from '@marigold/system';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva({
    base: [
      'ui-surface shadow-elevation-border p-2',
      // In a Popover
      'group-data-trigger/popover:shadow-elevation-overlay',
      // In a Tray
      'group-[[role=dialog]]/tray:shadow-none group-[[role=dialog]]/tray:border-0 group-[[role=dialog]]/tray:p-0 group-[[role=dialog]]/tray:place-self-center',
    ],
  }),
  calendarContainer: cva({ base: 'flex gap-4' }),
  calendarMonth: cva({ base: 'min-w-[250px] flex-1' }),
  calendarCell: cva({
    base: [
      'relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg justify-self-center',
      'border border-transparent p-0 text-sm font-normal text-foreground',
      'outline-offset-2 duration-150 transition-all',
      'selected:bg-primary selected:text-primary-foreground',
      'data-hovered:bg-hover data-hovered:text-foreground',
      'data-focus-visible:z-10 focus-visible:ui-state-focus outline-none',
      'disabled:cursor-not-allowed disabled:text-disabled',
      'unavailable:cursor-not-allowed unavailable:text-disabled unavailable:line-through',
      'outside-month:hidden',
    ],
  }),
  calendarControllers: cva({
    base: [
      'size-9 rounded-lg',
      'text-secondary',
      'transition-colors',
      'focus-visible:ui-state-focus outline-none',
    ],
  }),
  calendarHeader: cva({
    base: ['size-9 rounded-lg p-0 text-xs font-medium text-secondary'],
  }),
  calendarGrid: cva({
    base: '[&_td]:p-2 [&_td]:group-[[role=dialog]]/tray:p-0.75',
  }),
  calendarListboxButton: cva({
    base: [
      'rounded-md text-sm font-medium transition-[color,box-shadow]',
      'px-4 py-2',
      'focus-visible:ui-state-focus outline-none',
      'cursor-pointer',
      'hover:bg-hover',
      'aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:shadow-elevation-border aria-selected:hover:bg-primary/90',
    ],
  }),
  select: cva({
    base: [
      '[&svg]:text-secondary',
      'flex w-full px-3 py-2 rounded-lg shadow-elevation-border border border-input bg-surface text-sm text-foreground transition-shadow',
      'focus-visible:ui-state-focus outline-none',
      'h-input',
      'disabled:cursor-not-allowed disabled:text-disabled disabled:bg-disabled-surface',
      'cursor-pointer',
    ],
  }),
};
