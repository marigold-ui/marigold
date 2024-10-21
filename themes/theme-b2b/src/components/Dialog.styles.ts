import { ThemeComponent, cva } from '@marigold/system';
import { ELEVALTION_RING } from '../mixins';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva(''),
  container: cva(
    [
      'font-body bg-bg-surface-overlay shadow-surface-overlay rounded-sm pl-8 pr-16 pb-8 pt-4',
      ELEVALTION_RING,
    ],
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
};
