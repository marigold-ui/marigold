import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const List: ThemeComponent<'List'> = {
  ul: cva('list-disc'),
  ol: cva('list-decimal'),
  item: cva(),
};
