import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva('relative -right-6 -top-2'),
  container: cva(
    'font-body bg-bg-surface-overlay shadow-surface-overlay rounded-sm px-8 pb-8 pt-4'
  ),
};
