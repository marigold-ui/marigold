import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva([
    'size-6',
    'bg-bg-brand text-text-inverted',
    'border-border-brand rounded-sm border',
    'hover:bg-bg-brand-hover',
  ]),
  container: cva(
    'bg-bg-surface-overlay shadow-surface-overlay rounded-sm pl-8 pr-12 pb-8 pt-4',
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
  header: cva(''),
  content: cva(''),
  actions: cva(''),
};
