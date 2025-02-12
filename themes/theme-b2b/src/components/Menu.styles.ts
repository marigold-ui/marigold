import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'border-border-base bg-bg-surface-overlay rounded-xs border border-solid',
    'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
    ' flex flex-col overflow-y-auto overflow-x-hidden ',
  ]),
  item: cva([
    'focus:bg-bg-selected selected:bg-bg-selected-input selected:text-text-inverted cursor-pointer px-4 py-1 outline-hidden',
    'disabled:text-text-base-disabled',
  ]),
  section: cva('text-text-accent border-t px-4 py-1  text-sm'),
};
