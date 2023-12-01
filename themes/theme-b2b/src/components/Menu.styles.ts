import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'border-border-light rounded-sm border border-solid bg-white',
    'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
    ' overflow-y-auto overflow-x-hidden',
  ]),
  item: cva(
    'focus:bg-bg-focus data-[selected]:bg-bg-selected cursor-pointer px-4 py-1 outline-none'
  ),
  section: cva('text-text-body-accent border-t px-4 py-1  text-sm'),
};
