import { ThemeComponent, cva } from '@marigold/system';

// Shared cell classes used by both Calendar and RangeCalendar. Only the
// cell shape (size/rounding) and the selected-state styling differ between
// them, so each consumer composes those on top.
export const calendarCellBase = [
  'relative flex items-center justify-center whitespace-nowrap justify-self-center',
  'my-0.5',
  'border border-transparent p-0 text-sm font-normal text-foreground',
  'outline-offset-2 duration-150 transition-[color]',
  'data-hovered:ui-state-hover',
  'data-focus-visible:z-10 focus-visible:ui-state-focus outline-none',
  'disabled:cursor-not-allowed disabled:text-disabled',
  'unavailable:cursor-not-allowed unavailable:text-disabled unavailable:line-through',
  'outside-month:hidden',
];

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva({
    base: [
      'min-h-[350px] min-w-fit ui-surface shadow-elevation-border p-2',
      // In a Popover (DatePicker) the Popover paints the overlay surface; the
      // calendar drops its own border + elevation. Standalone keeps the border.
      'group-data-trigger/popover:ring-0 group-data-trigger/popover:shadow-none',
      // In a Tray
      'group-[[role=dialog]]/tray:ring-0 group-[[role=dialog]]/tray:shadow-none group-[[role=dialog]]/tray:p-0 group-[[role=dialog]]/tray:place-self-center',
    ],
  }),
  calendarContainer: cva({ base: 'flex flex-col gap-4 sm:flex-row' }),
  calendarMonth: cva({ base: 'min-w-[250px] sm:flex-1' }),
  calendarCell: cva({
    base: [
      'size-9 rounded-lg',
      'selected:bg-selected-bold selected:text-selected-bold-foreground',
      ...calendarCellBase,
    ],
  }),
  calendarControllers: cva({
    base: [
      'inline-flex items-center justify-center gap-[0.5ch]',
      'size-9 rounded-lg',
      'text-secondary',
      'focus-visible:ui-state-focus outline-none',
    ],
  }),
  calendarHeader: cva({
    base: [
      'size-9 rounded-lg p-0 text-xs font-medium text-secondary text-center',
    ],
  }),
  calendarGrid: cva({
    base: 'w-full border-collapse border-spacing-0 [&_td]:p-0 [&_td]:group-[[role=dialog]]/tray:p-0',
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
      'hover:ui-state-hover',
      'aria-selected:bg-selected-bold aria-selected:text-selected-bold-foreground aria-selected:shadow-elevation-border aria-selected:hover:bg-selected-bold/90',
    ],
  }),
  select: cva({
    base: [
      '[&_svg]:text-secondary',
      // The month/year dropdown trigger IS the secondary Button — nothing bespoke:
      // muted surface + the shared neutral-button hover, elevation, focus, disabled.
      'ui-surface-muted shadow-elevation-border hover:ui-state-hover-muted',
      'flex h-control w-full px-3 py-2 rounded-lg text-sm font-medium text-foreground',
      'focus-visible:ui-state-focus outline-none',
      'disabled:ui-state-disabled',
      'cursor-pointer',
    ],
  }),
};
