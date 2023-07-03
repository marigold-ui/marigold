import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva(
    'overflow-y-auto overflow-x-hidden rounded-sm border border-solid bg-white'
  ),
  item: cva('cursor-pointer p-5 hover:bg-slate-100'),
  section: cva(''),
};
