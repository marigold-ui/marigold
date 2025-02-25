import { ThemeComponent, cva } from '@marigold/system';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva('rounded-lg border border-border p-2'),
  calendarCell: cva([
    'relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg',
    'border border-transparent p-0 text-sm font-normal text-foreground',
    'outline-offset-2 duration-150 [transition-property:color,background-color,border-radius,box-shadow]',
    'disabled:pointer-events-none data-[unavailable]:pointer-events-none data-focus-visible:z-10 data-[hovered]:bg-accent selected:bg-brand data-[hovered]:text-foreground selected:text-brand-foreground data-[unavailable]:line-through',
    'disabled:opacity-30 data-[unavailable]:opacity-30',
    'focus:outline-0 focus-visible:outline-2 focus-visible:outline-ring/70',
  ]),
  calendarControllers: cva([
    'size-9 rounded-lg',
    'text-muted-foreground/80',
    'outline-offset-2 transition-colors',
    'focus-visible:outline-2 focus-visible:outline-ring/70',
  ]),
  calendarHeader: cva([
    'size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80',
  ]),
  calendarGrid: cva(),
};
