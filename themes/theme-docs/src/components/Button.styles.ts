import { ThemeComponent, cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva({
  base: 'flex gap-2 rounded-xs px-3 py-2',
  variants: {
    variant: {
      ghost: 'text-secondary-700 hover:text-secondary-900 p-0',
      sunken:
        'text-secondary-600 hover:bg-secondary-400/20 bg-secondary-400/10 h-8 justify-start rounded-lg',
      inverted: 'bg-secondary-100',
      icon: 'border-none translate-y-0.5 outline-none p-0',
    },
    size: {
      small: 'px-3 py-1.5 text-sm',
    },
  },
});
