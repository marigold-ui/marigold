import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'list-none p-0 break-words bg-secondary-50 border rounded-[2pxs]',
    'sm:max-h-[75ch] md:max-h-[75vh] lg:max-h-[45vh]',
    'overflow-x-hidden overflow-y-auto',
  ]),
  item: cva([
    'focus:outline-0 px-1 p-1 cursor-pointer',
    'hover:text-secondary-50 hover:bg-hover-bg',
  ]),
  section: cva('text-xs px-1 py-4 font-normal text-secondary-400'),
};
