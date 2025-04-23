import { ThemeComponent, cva } from '@marigold/system';

export const Tag: ThemeComponent<'Tag'> = {
  tag: cva([
    'border-border-base bg-bg-base flex items-center gap-1 rounded-xs border ',
    'data-selected:bg-bg-selected-input data-selected:text-text-inverted data-selected:border-border-selected',
    'px-1.5 py-[2px]',
    'data-[disabled]:cursor-not-allowed data-[disabled]:text-text-base-disabled data-[disabled]:bg-bg-inverted-disabled data-[disabled]:border-border-base-disabled',
  ]),
  listItems: cva('flex flex-wrap items-center gap-1'),
  closeButton: cva('size-4'),
};
