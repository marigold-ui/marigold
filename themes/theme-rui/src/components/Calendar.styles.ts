import { ThemeComponent, cva } from '@marigold/system';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva(
    'rounded-md border group-[[data-trigger]]/popover:border-0 border-border p-2'
  ),
  calendarCell: cva([
    'relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg',
    'border border-transparent p-0 text-sm font-normal text-foreground',
    'outline-offset-2 duration-150 [transition-property:color,background-color,border-radius,box-shadow]',
    'disabled:pointer-events-none data-[unavailable]:pointer-events-none data-focus-visible:z-10 data-[hovered]:bg-hover selected:bg-brand data-[hovered]:text-foreground selected:text-brand-foreground data-[unavailable]:line-through',
    'disabled:opacity-30 data-[unavailable]:opacity-30',
    'mixin-ring-focus-visible-borderless',
  ]),
  calendarControllers: cva([
    'size-9 rounded-lg',
    'text-muted-foreground/80',
    'transition-colors',
    'mixin-ring-focus-visible',
  ]),
  calendarHeader: cva([
    'size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80',
  ]),
  calendarGrid: cva('[&_td]:p-2'),
};
