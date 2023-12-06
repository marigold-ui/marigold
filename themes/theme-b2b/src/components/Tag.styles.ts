import { ThemeComponent, cva } from '@marigold/system';

export const Tag: ThemeComponent<'Tag'> = {
  tag: cva('border-border-dark flex items-center rounded-md border p-1'),
  closeButton: cva('right-1 h-4 w-4 cursor-pointer p-0 outline-none'),
  listItems: cva('flex items-center gap-1'),
};
