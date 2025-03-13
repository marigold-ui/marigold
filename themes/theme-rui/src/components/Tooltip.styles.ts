import { ThemeComponent, cva } from '@marigold/system';

export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva(
    [
      'text-brand-foreground bg-brand relative z-50 max-w-70 rounded-md border border-brand px-3 py-1.5 text-sm ',
      'placement-t:mb-2',
      'placement-b:mt-2',
      'placement-r:ml-2',
      'placement-l:mr-2',
    ],
    {
      variants: {
        variant: {
          default: '',
          white: 'text-secondary-foreground border-border bg-white',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),

  arrow: cva(
    [
      'fill-brand  stroke-brand',

      // right
      'data-[placement=right]:[&_svg]:rotate-90',

      // left
      'data-[placement=left]:[&_svg]:-rotate-90',

      // bottom
      'data-[placement=bottom]:[&_svg]:rotate-180',
    ],
    {
      variants: {
        variant: {
          default: '',
          white: 'fill-white  stroke-border ',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
};
