import { ThemeComponent, cva } from '@marigold/system';

export const List: ThemeComponent<'List'> = {
  ul: cva('ml-6 list-outside list-disc py-3'),
  ol: cva('ml-6 list-outside list-decimal py-3'),
  item: cva('pt-3'),
};
