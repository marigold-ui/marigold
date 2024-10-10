import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  container: cva(
    'bg-bg-surface-overlay shadow-surface-overlay rounded-sm px-8 pb-8 pt-4',
    {
      variants: {
        size: {
          small: 'sm:w-[640px]',
          medium: 'md:w-[768px]',
          large: 'lg:w-[1024px]',
        },
      },
    }
  ),
  closeButton: cva([
    'size-6',
    'bg-bg-brand text-text-inverted',
    'border-border-brand rounded-sm border',
    'hover:bg-bg-brand-hover',
  ]),
};
