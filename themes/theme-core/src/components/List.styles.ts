import { ThemeComponent, cva } from '@marigold/system';

export const List: ThemeComponent<'List'> = {
  ul: cva('ml-6 list-inside list-disc py-3'),
  ol: cva('ml-6 list-inside list-decimal py-3'),
  item: cva('pt-3'),
};
