import { ThemeComponent, cva } from '@marigold/system';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva(
    'rounded-md border group-[[data-trigger]]/popover:border-0 border-border p-2'
  ),
  calendarCell: cva([
    'relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg justify-self-center',
    'border border-transparent p-0 text-sm font-normal text-foreground',
    'outline-offset-2 duration-150 [transition-property:color,background-color,border-radius,box-shadow]',
    'disabled:pointer-events-none data-[unavailable]:pointer-events-none data-focus-visible:z-10 data-[hovered]:bg-hover selected:bg-brand data-[hovered]:text-foreground selected:text-brand-foreground data-[unavailable]:line-through',
    'disabled:opacity-30 data-[unavailable]:opacity-30',
    'focus-visible:util-focus-borderless-ring outline-none',
  ]),
  calendarControllers: cva([
    'size-9 rounded-lg',
    'text-muted-foreground/80',
    'transition-colors',
    'focus-visible:util-focus-ring outline-none',
  ]),
  calendarHeader: cva([
    'size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80',
  ]),
  calendarGrid: cva('[&_td]:p-2'),
  calendarListboxButton: cva([
    'rounded-md text-sm font-medium transition-[color,box-shadow]',
    'px-4 py-2',
    'focus-visible:util-focus-ring outline-none',
    'cursor-pointer',
    'hover:bg-hover',
    'aria-[current=true]:bg-brand aria-[current=true]:text-brand-foreground aria-[current=true]:shadow-sm aria-[current=true]:shadow-black/5 aria-[current=true]:hover:bg-brand/90',
  ]),
  select: cva([
    '[&svg]:text-muted-foreground/80',
    'flex w-full px-3 py-2 rounded-lg shadow-sm shadow-black/5 border border-input bg-background text-sm text-foreground transition-shadow',
    'focus-visible:util-focus-ring outline-none',
    'h-input',
    'disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled',
    'cursor-pointer',
  ]),
};
