import { ThemeComponent, cva } from '@marigold/system';

export const ContextualHelp: ThemeComponent<'ContextualHelp'> = {
  trigger: cva(
    [
      'inline-flex items-center justify-center rounded-full transition-[color,box-shadow]',
      'hover:util-focus-ring hover:text-foreground',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      'focus-visible:ui-state-focus outline-none',
      'cursor-pointer util-touch-hitbox',
    ],
    {
      variants: {
        variant: {
          help: '',
          info: '',
        },
        size: {
          default: '[&_svg]:size-4',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  ),
  container: cva([
    'outline-none',
    'ui-surface ui-elevation-overlay util-scrollbar',
    'p-5',
    'data-small:max-w-3xs data-medium:max-w-xs data-large:max-w-md',
  ]),
  title: cva('text-lg font-semibold mb-1'),
  content: cva('text-sm'),
};
