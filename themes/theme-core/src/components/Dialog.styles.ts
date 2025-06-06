import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva([
    'absolute top-4 right-4 ml-4',
    'size-6',
    'bg-bg-brand text-text-inverted',
    'border-border-brand rounded-xs border',
    'hover:bg-bg-brand-hover',
  ]),
  container: cva(
    'bg-bg-surface-overlay shadow-surface-overlay rounded-xs pl-8 pr-12 pb-8 pt-4',
    {
      variants: {
        size: {
          default: '',
          small: 'w-[min(100%,640px)]',
          medium: 'w-[min(100%,768px)]',
          large: 'w-[min(100%,1024px)]',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  ),
  header: cva('flex items-center mb-1'),
  content: cva(''),
  actions: cva('flex gap-2 justify-end mt-4'),
  title: cva('font-black text-2xl', {
    variants: {
      size: {},
      variant: {},
    },
  }),
};
