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
  popover: cva([
    'flex flex-col gap-0 p-5',
    'surface elevation-overlay',
    'data-small:max-w-3xs data-medium:max-w-xs data-large:max-w-md',

    'overflow-y-auto util-scrollbar',
  ]),
  container: cva('outline-none'),
  title: cva('text-lg font-semibold mb-1'),
  content: cva('text-sm'),
};
