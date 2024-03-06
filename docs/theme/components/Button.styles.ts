import { ThemeComponent, cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  'flex gap-2 rounded-sm p-2',
  {
    variants: {
      variant: {
        ghost: 'text-secondary-700 hover:text-secondary-900  p-0',
        menu: 'text-secondary-700 data-[hovered]:bg-secondary-200 p-0',
        sunken:
          'text-secondary-700 hover:bg-secondary-950 bg-secondary-950 h-8 rounded-lg',
      },
      size: {
        small: 'text-sm',
      },
    },
  }
);
