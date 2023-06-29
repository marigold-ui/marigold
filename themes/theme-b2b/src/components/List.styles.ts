import { ThemeComponent, cva } from '@marigold/system';

export const List: ThemeComponent<'List'> = {
  ul: cva('list-disc'),
  ol: cva('list-decimal'),
  item: cva(),
};
