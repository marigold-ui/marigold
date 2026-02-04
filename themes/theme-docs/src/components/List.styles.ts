import { ThemeComponent, cva } from '@marigold/system';

export const List: ThemeComponent<'List'> = {
  ul: cva({ base: 'list-inside list-none' }),
  ol: cva({ base: '' }),
  item: cva({ base: 'list-none py-0.5' }),
};
