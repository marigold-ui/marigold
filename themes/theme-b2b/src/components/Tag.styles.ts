import { ThemeComponent, cva } from '@marigold/system';

export const Tag: ThemeComponent<'Tag'> = {
  tag: cva('border-border-base flex items-center rounded-md border p-1'),
  closeButton: cva('right-1 size-4 cursor-pointer p-0 outline-none'),
  listItems: cva('flex items-center gap-1'),
};
