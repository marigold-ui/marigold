import { ThemeComponent, cva } from '@marigold/system';

export const Tag: ThemeComponent<'Tag'> = {
  tag: cva([
    'border-border-base bg-bg-base flex items-center gap-1 rounded border ',
    'data-[selected]:bg-bg-selected-input data-[selected]:text-text-inverted border-border-selected',
    'px-1.5 py-[2px]',
  ]),
  listItems: cva('flex flex-wrap items-center gap-1'),
  closeButton: cva(
    'size-4 cursor-pointer border-none bg-transparent p-0 leading-normal outline-0'
  ),
};
