import { type ThemeComponent, cva } from '@marigold/system';

export const Keyboard: ThemeComponent<'Keyboard'> = cva({
  // Standalone key-cap. Inside a styled container (e.g. Menu.Item) the item
  // provides its own appearance via KeyboardContext and this is not applied.
  base: 'inline-flex min-w-5 items-center justify-center rounded-sm border border-surface-border bg-muted px-1.5 py-0.5 text-xs font-medium text-secondary',
});
