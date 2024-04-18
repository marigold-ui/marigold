import { ThemeComponent, cva } from '@marigold/system';

export const List: ThemeComponent<'List'> = {
  ul: cva('list-inside list-none font-normal'),
  ol: cva(''),
  item: cva('list-none py-1'),
};
