import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Page: ThemeComponent<'Page'> = {
  root: cva({}),
  header: cva({}),
  title: cva({
    base: 'text-2xl font-bold leading-none text-foreground',
  }),
  description: cva({
    base: 'mt-1 text-base leading-none text-secondary',
  }),
  actions: cva({}),
  content: cva({}),
};
