import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'overflow-y-auto overflow-x-hidden rounded-sm border border-solid bg-white ',
    'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
  ]),
  item: cva('hover:bg-bg-hover cursor-pointer px-2 py-1 outline-none'),
  section: cva(''),
};
