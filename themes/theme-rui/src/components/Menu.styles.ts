import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'bg-surface-overlay text-foreground z-50 min-w-40 overflow-hidden rounded-md border p-1  border-ring',
  ]),
  item: cva([
    'focus:bg-hover focus:text-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none disabled:bg-disabled disabled:text-disabled-foreground',
  ]),
  section: cva('text-muted-foreground px-2 py-1.5 text-xs font-medium'),
};
