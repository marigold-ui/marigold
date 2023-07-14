import { ThemeComponent, cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  'flex gap-2 rounded-sm border border-solid p-2',
  {
    variants: {
      variant: {
        ghost:
          'text-secondary-700 hover:text-secondary-900 border-transparent p-0',
      },
    },
  }
);
