import { ThemeComponent, cva } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva({
  base: ['relative w-full overflow-hidden rounded-xl'],
  variants: {
    variant: {
      default: 'bg-bg-surface-raised p-6 shadow-xs border border-secondary-300',
      hovering:
        'bg-bg-surface-raised p-6 shadow-xs transition-shadow hover:cursor-pointer hover:shadow-md border border-secondary-300',
      content:
        'bg-bg-surface-raised my-6 shadow-xs border border-secondary-300',
      outline: 'bg-white/40 my-6 border border-secondary-200',
      lowered: 'bg-bg-surface-raised-lowered p-6',
      image: '',
    },
    size: {
      default: '',
      full: 'size-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
