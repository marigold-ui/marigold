import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Tag: ThemeComponent<'Tag'> = {
  tag: cva('border-border-dark flex items-center rounded-md border p-1'),
  closeButton: cva('b right-1 h-4 w-4 cursor-pointer p-0 outline-none'),
  gridCell: cva('flex items-center justify-center gap-1'),
};
