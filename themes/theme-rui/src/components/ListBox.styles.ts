import { type ThemeComponent, cva } from '@marigold/system';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva([
    'flex surface',
    // Standalone
    'not-group-data-trigger/popover:shadow-elevation-base',
    // In a Popover
    'group-data-trigger/popover:shadow-elevation-overlay',
    'group-data-trigger/popover:w-full',
    'group-data-trigger/popover:overflow-hidden',
  ]),
  list: cva(['p-1 text-sm outline-0 space-y-px overflow-y-auto w-full']),
  item: cva([
    'relative grid grid-cols-[auto_1fr] items-center gap-x-2 rounded-md px-2 py-1.5 text-sm text-foreground',
    '[&_.selection-indicator>svg]:invisible [&_.selection-indicator>svg]:block',
    'selected:bg-selected selected:[&_.selection-indicator>svg]:visible',
    'hover:bg-hover hover:text-hover-foreground',
    'disabled:cursor-not-allowed disabled:text-disabled-foreground',
    'focus-visible:state-focus outline-none focus-visible:z-1 transition-[border,color]',
    'cursor-default data-selection-mode:cursor-pointer',
    '[&_[slot=description]]:col-start-2 [&_[slot=description]]:row-start-2 [&_[slot=description]]:text-xs [&_[slot=description]]:text-muted-foreground',
  ]),
  section: cva(''),
  header: cva(
    '[&_header]:px-2 [&_header]:py-1.5 [&_header]:text-xs [&_header]:font-medium [&_header]:text-muted-foreground'
  ),
};
