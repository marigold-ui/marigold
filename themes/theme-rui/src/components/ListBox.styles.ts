import { type ThemeComponent, cva } from '@marigold/system';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva([
    'overflow-hidden rounded-md border border-input group-[[data-trigger]]/popover:border-0',
  ]),
  list: cva(['bg-background p-1 text-sm outline-0']),
  item: cva([
    'relative flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground cursor-pointer',
    '[&_svg]:invisible [&_svg]:block',
    'selected:bg-selected selected:[&_svg]:visible',
    'hover:bg-hover hover:text-hover-foreground',
    'disabled:cursor-not-allowed disabled:text-disabled-foreground',
    'focus-visible:util-focus-ring outline-none',
    'cursor-default data-selection-mode:cursor-pointer',
  ]),
  section: cva(''),
  header: cva(
    '[&_header]:px-2 [&_header]:py-1.5 [&_header]:text-xs [&_header]:font-medium [&_header]:text-muted-foreground'
  ),
};
