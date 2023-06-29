import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'border-border-light rounded-sm border border-solid bg-white',
    'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
    ' overflow-y-auto overflow-x-hidden',
  ]),
  item: cva('focus:bg-bg-focus cursor-pointer px-4 py-1 outline-none'),
  section: cva('text-text-primary-light p-4 text-sm'),
};
