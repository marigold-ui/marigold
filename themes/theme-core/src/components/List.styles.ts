import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const List: ThemeComponent<'List'> = {
  ol: cva('list-decimal'),
  ul: cva('list-disc'),
  item: cva(),
};
