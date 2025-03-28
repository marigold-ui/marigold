import { ThemeComponent, cva } from '@marigold/system';

export const Drawer: ThemeComponent<'Drawer'> = {
  closeButton: cva(''),
  container: cva(['bg-surface-overlay border-input border-l shadow-lg', 'p-5']),
  header: cva(''),
  content: cva(''),
  actions: cva(''),
};
