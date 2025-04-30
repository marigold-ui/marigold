import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'text-foreground z-50 min-w-40 overflow-hidden rounded-md p-1',
  ]),
  item: cva([
    'focus:bg-focus focus:text-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none disabled:text-disabled-foreground',
  ]),
  section: cva(
    'text-muted-foreground px-2 py-1.5 text-xs font-medium border-t border-t-border in-first:border-t-0'
  ),
};
