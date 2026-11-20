import { ThemeComponent, cva } from '@marigold/system';

export const Sheet: ThemeComponent<'Sheet'> = {
  // Only the bottom-most sheet of a stack dims the page.
  backdrop: cva({
    base: "data-[stack-index='0']:bg-overlay-backdrop",
  }),
  container: cva({
    base: [
      'w-full border-0 inset-shadow-black inset-shadow-sm/20',
      'rounded-b-none ui-surface shadow-elevation-overlay outline-hidden',
    ],
  }),
  content: cva({ base: 'outline-hidden' }),
};
