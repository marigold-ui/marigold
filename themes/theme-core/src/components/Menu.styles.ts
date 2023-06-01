import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'bg-secondary-50 list-none break-words rounded-[2pxs] border p-0',
    'sm:max-h-[75ch] md:max-h-[75vh] lg:max-h-[45vh]',
    'overflow-y-auto overflow-x-hidden',
  ]),
  item: cva([
    'cursor-pointer p-1 focus:outline-0',
    'hover:text-secondary-50 hover:bg-hover-bg',
  ]),
  section: cva('text-secondary-400 px-1 py-4 text-xs font-normal'),
};
