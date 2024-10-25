import { ThemeComponent, cva } from '@marigold/system';
import { ELEVALTION_RING } from '../mixins';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva(''),
  container: cva(
    [
      'font-body bg-bg-surface-overlay shadow-surface-overlay rounded-sm pl-8 pr-12 pb-8 pt-4',
      ELEVALTION_RING,
    ],
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
  header: cva('flex items-center'),
  content: cva(''),
  actions: cva('flex gap-2 justify-end'),
};
