import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'ui-surface shadow-elevation-overlay w-full',
    'text-foreground z-50 overflow-hidden p-1 outline-none',
  ]),
  item: cva(
    [
      'relative flex cursor-pointer items-center gap-2 rounded-[calc(var(--radius-surface)-3px)] p-2 text-sm outline-hidden select-none text-nowrap',
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
    'text-muted-foreground p-2 text-xs font-medium border-t border-t-border in-first:border-t-0'
  ),
  button: cva(
    [
      'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium',
      'focus-visible:ui-state-focus outline-none disabled:ui-state-disabled',
      'cursor-pointer',
      '[&_svg]:shrink-0 [&_svg]:pointer-events-none',
    ],
    {
      variants: {
        variant: {
          default: 'ui-surface shadow-elevation-base expanded:bg-hover',
          ghost:
            'hover:bg-hover hover:text-foreground expanded:bg-hover rounded-surface',
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
