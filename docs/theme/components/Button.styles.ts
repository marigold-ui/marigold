import { ThemeComponent, cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  'flex gap-2 rounded-sm border border-solid p-2',
  {
    variants: {
      variant: {
        ghost:
          'text-secondary-700 hover:text-secondary-900 border-transparent p-0',
        menu: 'text-secondary-700 data-[hovered]:text-secondary-500 border-none p-0',
        sunken: 'text-secondary-700 h-8 rounded-lg hover:bg-gray-200',
      },
      size: {
        small: 'text-sm',
      },
    },
  }
);
