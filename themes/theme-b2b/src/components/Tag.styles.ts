import { ThemeComponent, cva } from '@marigold/system';

export const Tag: ThemeComponent<'Tag'> = {
  tag: cva([
    'border-border-base flex items-center gap-1 rounded-md border p-1 ',
    'data-[selected]:bg-bg-selected-input data-[selected]:text-text-inverted',
  ]),
  closeButton: cva('right-1 size-4 cursor-pointer p-0 outline-none'),
  listItems: cva('flex flex-wrap items-center gap-1'),
};
