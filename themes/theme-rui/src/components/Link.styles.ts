import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva(
  'font-medium underline aria-[disabled]:cursor-not-allowed underline-offset-4'
);
