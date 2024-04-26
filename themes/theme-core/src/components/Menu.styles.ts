import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'bg-bg-surface list-none break-words rounded-[2px] border p-0',
    'sm:max-h-[75ch] md:max-h-[75vh] lg:max-h-[45vh]',
    'flex flex-col overflow-y-auto overflow-x-hidden',
    'border-border-inverted bg-surface-overlay border-solid',
  ]),
  item: cva([
    'cursor-pointer p-1 focus:outline-0',
    'rac-disabled:text-text-base-disabled rac-disabled:cursor-not-allowed',
    'data-[hovered]:text-text-inverted data-[hovered]:bg-highlight',
    'text-xs',
    'data-[selected]:bg-bg-selected',
  ]),
  section: cva('text-text-base border-t p-1 text-xs font-normal'),
};
