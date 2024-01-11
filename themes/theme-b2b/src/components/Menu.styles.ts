import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'border-border-base rounded-sm border border-solid bg-bg-surface-overlay',
    'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
    ' flex flex-col overflow-y-auto overflow-x-hidden ',
  ]),
  item: cva([
    'rac-focus:bg-bg-selected rac-selected:bg-bg-selected-input rac-selected:text-text-inverted cursor-pointer px-4 py-1 outline-none',
    'rac-disabled:text-text-base-disabled',
  ]),
  section: cva('text-text-accent border-t px-4 py-1  text-sm'),
};
