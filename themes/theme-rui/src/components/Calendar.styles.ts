import { ThemeComponent, cva } from '@marigold/system';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva([
    'ui-surface shadow-elevation-border p-2',
    // In a Popover
    'group-data-trigger/popover:shadow-elevation-overlay',
    // In a Tray
    'group-[[role=dialog]]/tray:shadow-none group-[[role=dialog]]/tray:border-0 group-[[role=dialog]]/tray:p-0',
  ]),
  calendarCell: cva([
    'relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg justify-self-center',
    'border border-transparent p-0 text-sm font-normal text-foreground',
    'outline-offset-2 duration-150 transition-all',
    'selected:bg-brand  selected:text-brand-foreground',
    'data-hovered:bg-hover data-hovered:text-foreground',
    'data-focus-visible:z-10 focus-visible:ui-state-focus outline-none',
    'disabled:pointer-events-none disabled:opacity-30',
    'unavailable:pointer-events-none unavailable:opacity-30 unavailable:line-through',
  ]),
  calendarControllers: cva([
    'size-9 rounded-lg',
    'text-muted-foreground/80',
    'transition-colors',
    'focus-visible:ui-state-focus outline-none',
  ]),
  calendarHeader: cva([
    'size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80',
  ]),
  calendarGrid: cva('[&_td]:p-2 [&_td]:group-[[role=dialog]]/tray:p-0.75'),
  calendarListboxButton: cva([
    'rounded-md text-sm font-medium transition-[color,box-shadow]',
    'px-4 py-2',
    'focus-visible:ui-state-focus outline-none',
    'cursor-pointer',
    'hover:bg-hover',
    'aria-selected:bg-brand aria-selected:text-brand-foreground aria-selected:shadow-xs aria-selected:hover:bg-brand/90',
  ]),
  select: cva([
    '[&svg]:text-muted-foreground/80',
    'flex w-full px-3 py-2 rounded-lg shadow-xs border border-input bg-background text-sm text-foreground transition-shadow',
    'focus-visible:ui-state-focus outline-none',
    'h-input',
    'disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled',
    'cursor-pointer',
  ]),
};
