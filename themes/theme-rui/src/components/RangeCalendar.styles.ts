import { type ThemeComponent, cva } from '@marigold/system';
import { Calendar } from './Calendar.styles';

export const RangeCalendar: ThemeComponent<'RangeCalendar'> = {
  ...Calendar,
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
  calendarGrid: cva({
    base: 'border-collapse border-spacing-0 [&_td]:p-0 [&_td]:group-[[role=dialog]]/tray:p-0',
  }),
  errorMessage: cva({
    base: 'text-error text-xs mt-2',
  }),
};
