import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva(['text-foreground z-50 overflow-hidden rounded-md p-1']),
  item: cva([
    'focus:bg-focus focus:text-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none disabled:text-disabled-foreground',
  ]),
  section: cva(
    'text-muted-foreground px-2 py-1.5 text-xs font-medium border-t border-t-border in-first:border-t-0'
  ),
  button: cva([
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md h-button px-4 py-2',
    'text-sm font-medium outline-none cursor-pointer',
    'border border-input bg-background shadow-xs',
    'hover:bg-hover hover:text-foreground',
    'transition-[color,box-shadow]',
    'disabled:pointer-not-allowed disabled:bg-disabled disabled:text-disabled-foreground',
    'focus-visible:util-focus-ring',
  ]),
};
