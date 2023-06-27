import { ThemeComponent, cva } from '@marigold/system';

export const List: ThemeComponent<'List'> = {
  ol: cva('list-decimal'),
  ul: cva('list-disc'),
  item: cva(),
};
