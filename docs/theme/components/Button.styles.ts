import { ThemeComponent, cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  'flex gap-2 rounded-sm p-2',
  {
    variants: {
      variant: {
        ghost: 'text-secondary-700 hover:text-secondary-900 p-0',
        menu: 'text-secondary-700 hover:bg-secondary-400/20 rounded-lg px-2 py-1',
        sunken:
          'text-text-primary-muted hover:bg-secondary-400/20 bg-secondary-400/10 h-8 w-full justify-start rounded-lg md:w-auto',
      },
      size: {
        small: 'text-sm',
      },
    },
  }
);
