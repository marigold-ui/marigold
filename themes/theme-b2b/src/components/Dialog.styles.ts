import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva('relative -right-6 -top-2'),
  container: cva(
    'font-body bg-bg-surface rounded-sm px-8 pb-8 pt-4 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]'
  ),
};
