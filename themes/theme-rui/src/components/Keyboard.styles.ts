import { type ThemeComponent, cva } from '@marigold/system';

export const Keyboard: ThemeComponent<'Keyboard'> = cva({
  // Standalone key-cap. Inside a styled container (e.g. Menu.Item) the item
  // provides its own appearance via KeyboardContext and this is not applied.
  // Edge and fill derive from the text colour (alpha scale), so the cap sits
  // in any ground, e.g. a highlighted row, instead of on top of it. A
  // container that sets `text-current` on the cap makes it follow the row's
  // colour too.
  base: 'inline-flex min-w-5 items-center justify-center rounded-sm border border-current/(--alpha-300) bg-current/(--alpha-50) px-1.5 py-0.5 text-xs font-medium text-secondary',
});
