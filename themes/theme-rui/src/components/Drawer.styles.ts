import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Drawer'> = {
  closeButton: cva(''),
  container: cva(''),
  header: cva(''),
  content: cva(''),
  actions: cva(''),
};
