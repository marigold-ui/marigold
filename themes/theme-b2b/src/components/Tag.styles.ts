import { ThemeComponent, cva } from '@marigold/system';

export const Tag: ThemeComponent<'Tag'> = {
  tag: cva([
    'border-border-base flex items-center gap-1 rounded-md border p-1 ',
    'data-selected:bg-bg-selected-input data-selected:text-text-inverted data-selected:border-border-selected-input',
    'data-[disabled]:cursor-not-allowed data-[disabled]:text-text-base-disabled data-[disabled]:bg-bg-base-disabled',
  ]),
  closeButton: cva('right-1 size-4'),
  listItems: cva('flex flex-wrap items-center gap-1'),
};
