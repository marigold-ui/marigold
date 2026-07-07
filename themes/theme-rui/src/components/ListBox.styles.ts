import { type ThemeComponent, cva } from '@marigold/system';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva({
    base: [
      // Standalone, a ListBox is a form control: the control surface (opaque
      // boundary + depth bevel) plus its own elevation.
      'flex ui-surface-control shadow-elevation-border',
      // In a Popover or Tray the frame paints the surface, so the list drops its
      // own boundary, bevel and elevation and just fills it.
      'group-data-trigger/popover:ring-0 group-data-trigger/popover:inset-shadow-none group-data-trigger/popover:shadow-none group-data-trigger/popover:w-full',
      'group-[[role=dialog]]/tray:ring-0 group-[[role=dialog]]/tray:inset-shadow-none group-[[role=dialog]]/tray:shadow-none',
    ],
  }),
  list: cva({
    base: ['p-1 text-sm outline-0 space-y-px overflow-y-auto w-full'],
  }),
  item: cva({
    base: [
      'relative grid grid-cols-[auto_1fr] items-center gap-x-2 rounded-md px-2 py-1.5 text-sm text-foreground max-sm:min-h-11',
      '[&_.selection-indicator>svg]:invisible [&_.selection-indicator>svg]:block',
      'selected:bg-selected selected:[&_.selection-indicator>svg]:visible',
      'hover:ui-state-hover',
      'disabled:cursor-not-allowed disabled:text-disabled',
      'focus-visible:ui-state-focus outline-none transition-[border,color]',
      'cursor-default data-selection-mode:cursor-pointer',
    ],
  }),
  label: cva({ base: '' }),
  description: cva({
    base: 'col-start-2 row-start-2 text-xs text-secondary font-normal',
  }),
  section: cva({ base: '' }),
  header: cva({
    base: '[&_header]:px-2 [&_header]:py-1.5 [&_header]:text-xs [&_header]:font-medium [&_header]:text-secondary',
  }),
};
