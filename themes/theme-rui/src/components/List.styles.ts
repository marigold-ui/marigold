import { ThemeComponent, cva } from '@marigold/system';

export const List: ThemeComponent<'List'> = {
  ul: cva('ml-6 list-outside list-disc'),
  ol: cva('ml-6 list-outside list-decimal'),
  item: cva('not-first:pt-3'),
};
