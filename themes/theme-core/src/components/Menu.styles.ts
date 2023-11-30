import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'bg-bg-surface list-none break-words rounded-[2px] border p-0',
    'sm:max-h-[75ch] md:max-h-[75vh] lg:max-h-[45vh]',
    'overflow-y-auto overflow-x-hidden',
  ]),
  item: cva([
    'cursor-pointer p-1 focus:outline-0',
    'hover:text-text-light hover:bg-highlight ',
    'text-xs',
  ]),
  section: cva('text-text-dark  border-t p-1 text-xs font-normal'),
};
