import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'text-foreground z-50 overflow-hidden rounded-md p-1 outline-none',
  ]),
  item: cva(
    [
      'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none text-nowrap',
      'disabled:text-disabled-foreground',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4',
    ],
    {
      variants: {
        variant: {
          default: 'text-foreground focus:bg-focus [&_svg]:opacity-60',
          destructive: 'text-destructive focus:bg-destructive/10',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  section: cva(
    'text-muted-foreground px-2 py-1.5 text-xs font-medium border-t border-t-border in-first:border-t-0'
  ),
  button: cva(
    [
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow]',
      '[&_svg]:shrink-0 [&_svg]:pointer-events-none',
      'focus-visible:util-focus-ring outline-none disabled:util-disabled',
      'cursor-pointer',
    ],
    {
      variants: {
        variant: {
          default:
            'border border-input bg-white shadow-xs hover:bg-hover hover:text-foreground expanded:bg-hover',
          ghost: 'hover:bg-hover hover:text-foreground expanded:bg-hover',
        },
        size: {
          default: 'h-button px-4 py-2 [&_svg]:size-4',
          small: 'h-button-small px-3 text-xs [&_svg]:size-3.5',
          large: 'h-button-large px-8 [&_svg]:size-5',
          icon: 'size-button [&_svg]:size-4',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    }
  ),
};
