import { type ThemeComponent, cva } from '@marigold/system';

export const Keyboard: ThemeComponent<'Keyboard'> = cva({
  // Standalone key cap (Menu.Item styles its own via KeyboardContext). Edge
  // and fill derive from the text colour, so the cap blends into any ground.
  // Inheriting the font undoes Tailwind's monospace preflight for `<kbd>`.
  base: 'inline-flex min-w-5 items-center justify-center rounded-sm [font-family:inherit] border border-current/(--alpha-300) bg-current/(--alpha-50) px-1.5 py-0.5 text-xs font-medium text-secondary',
});
