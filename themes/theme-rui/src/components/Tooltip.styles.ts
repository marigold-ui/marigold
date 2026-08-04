import { ThemeComponent, cva } from '@marigold/system';

export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva({
    base: [
      'relative max-w-70 rounded-md border px-3 py-1.5 text-sm',
      'placement-top:mb-2',
      'placement-bottom:mt-2',
      'placement-right:ml-2',
      'placement-left:mr-2',
    ],
    variants: {
      variant: {
        default: 'text-primary-foreground bg-primary border-primary',
        white: 'text-foreground border-border bg-surface',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),

  arrow: cva({
    base: [
      // right
      'placement-right:[&_svg]:rotate-90',
      // left
      'placement-left:[&_svg]:-rotate-90',
      // bottom
      'placement-bottom:[&_svg]:rotate-180',
    ],
    variants: {
      variant: {
        default: 'fill-primary  stroke-primary',
        white: 'fill-surface  stroke-border ',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
};
