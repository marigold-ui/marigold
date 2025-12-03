import { ThemeComponent, cva } from '@marigold/system';

export const ContextualHelp: ThemeComponent<'ContextualHelp'> = {
  trigger: cva(
    [
      'inline-flex items-center justify-center rounded-full transition-[color,box-shadow] hover:bg-hover hover:text-foreground',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      'focus-visible:util-focus-ring outline-none',
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
          large: 'size-9 [&_svg]:size-4',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  ),
  popover: cva([
    'flex flex-col rounded-xl p-5 util-surface-overlay',
    'data-small:max-w-3xs data-medium:max-w-xs data-large:max-w-md',
    'overflow-y-auto util-scrollbar outline-none',
  ]),
  container: cva(''),
  title: cva('text-lg font-semibold mb-1'),
  content: cva('text-sm'),
};
