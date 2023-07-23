import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'border-border overflow-hidden rounded-md border bg-white px-1 py-1.5 text-sm shadow-md',
    'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
  ]),
  item: cva('hover:bg-bg-hover cursor-pointer p-2 outline-none'),
  section: cva(''),
};
