import { type ThemeComponent, cva } from '@marigold/system';

export const RangeCalendar: ThemeComponent<'RangeCalendar'> = {
  calendar: cva({
    base: [
      'min-h-[350px] ui-surface shadow-elevation-border p-2',
      'group-data-trigger/popover:shadow-elevation-overlay',
      'group-[[role=dialog]]/tray:shadow-none group-[[role=dialog]]/tray:border-0 group-[[role=dialog]]/tray:p-0 group-[[role=dialog]]/tray:place-self-center',
    ],
  }),
  calendarContainer: cva({ base: 'flex gap-4' }),
  calendarMonth: cva({ base: 'min-w-[250px] flex-1' }),
  calendarCell: cva({
    base: [
      'relative flex h-9 w-full items-center justify-center whitespace-nowrap rounded-none justify-self-center',
      'my-0.5',
      'border border-transparent p-0 text-sm font-normal text-foreground',
      'outline-offset-2 duration-150 transition-[color,background-color]',
      'selected:bg-brand/15 selected:text-foreground',
      'selection-start:bg-brand selection-start:text-brand-foreground selection-start:rounded-l-lg',
      'selection-end:bg-brand selection-end:text-brand-foreground selection-end:rounded-r-lg',
      'data-hovered:bg-hover data-hovered:text-foreground',
      'data-focus-visible:z-10 focus-visible:ui-state-focus outline-none',
      'disabled:pointer-events-none disabled:opacity-30',
      'unavailable:pointer-events-none unavailable:opacity-30 unavailable:line-through',
      'outside-month:hidden',
    ],
  }),
  calendarControllers: cva({
    base: [
      'inline-flex items-center justify-center gap-[0.5ch]',
      'size-9 rounded-lg',
      'text-muted-foreground',
      'focus-visible:ui-state-focus outline-none',
    ],
  }),
  calendarHeader: cva({
    base: [
      'size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground text-center',
    ],
  }),
  calendarGrid: cva({
    base: 'border-collapse border-spacing-0 [&_td]:p-0 [&_td]:group-[[role=dialog]]/tray:p-0',
  }),
  calendarHeading: cva({
    base: 'text-sm font-medium',
  }),
  calendarListboxButton: cva({
    base: [
      'rounded-md text-sm font-medium transition-[color,box-shadow]',
      'px-4 py-2',
      'focus-visible:ui-state-focus outline-none',
      'cursor-pointer',
      'hover:bg-hover',
      'aria-selected:bg-brand aria-selected:text-brand-foreground aria-selected:shadow-elevation-border aria-selected:hover:bg-brand/90',
    ],
  }),
  select: cva({
    base: [
      '[&svg]:text-muted-foreground',
      'flex w-full px-3 py-2 rounded-lg shadow-elevation-border border border-input bg-background text-sm text-foreground transition-shadow',
      'focus-visible:ui-state-focus outline-none',
      'h-input',
      'disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled',
      'cursor-pointer',
    ],
  }),
  errorMessage: cva({
    base: 'text-error text-xs mt-2',
  }),
};
