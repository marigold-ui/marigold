import { type ThemeComponent, cva } from '@marigold/system';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva([
    'overflow-hidden rounded-lg border border-input group-[trigger]/popover:border-0',
  ]),
  list: cva(['space-y-1 bg-background p-1 text-sm outline-0']),
  option: cva([
    'relative flex flex-col rounded-md px-2 py-1.5 text-sm text-foreground cursor-pointer',
    'selected:bg-selected',
    'disabled:cursor-not-allowed disabled:text-disabled-foreground',
    'mixin-ring-focus-visible',
  ]),
  section: cva(''),
  header: cva(
    '[&_header]:px-2 [&_header]:py-1.5 [&_header]:text-xs [&_header]:font-medium [&_header]:text-muted-foreground'
  ),
};
