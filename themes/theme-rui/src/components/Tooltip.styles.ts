import { ThemeComponent, cva } from '@marigold/system';

export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva(
    [
      'relative max-w-70 rounded-md border px-3 py-1.5 text-sm',
      'placement-top:mb-2',
      'placement-bottom:mt-2',
      'placement-right:ml-2',
      'placement-left:mr-2',
    ],
    {
      variants: {
        variant: {
          default: 'text-brand-foreground bg-brand border-brand',
          white: 'text-secondary-foreground border-input bg-white',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),

  arrow: cva(
    [
      // right
      'placement-right:[&_svg]:rotate-90',
      // left
      'placement-left:[&_svg]:-rotate-90',
      // bottom
      'placement-bottom:[&_svg]:rotate-180',
    ],
    {
      variants: {
        variant: {
          default: 'fill-brand  stroke-brand',
          white: 'fill-white  stroke-input ',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
};
