import { ThemeComponent, cva } from '@marigold/system';

export const ContextualHelp: ThemeComponent<'ContextualHelp'> = {
  trigger: cva(
    [
      'inline-flex items-center justify-center rounded-full transition-[color,box-shadow] hover:bg-hover hover:text-foreground',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      'focus-visible:state-focus outline-none',
      'cursor-pointer',
    ],
    {
      variants: {
        variant: {
          help: '',
          info: '',
        },
        size: {
          default: 'size-button [&_svg]:size-4',
          small: 'size-button-small [&_svg]:size-3.5',
          large: 'size-button-large [&_svg]:size-5',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  ),
  container: cva([
    'outline-none',
    'surface elevation-overlay util-scrollbar',
    'p-5',
    'data-small:max-w-3xs data-medium:max-w-xs data-large:max-w-md',
  ]),
  title: cva('text-lg font-semibold mb-1'),
  content: cva('text-sm'),
};
