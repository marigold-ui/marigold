import { ThemeComponent, cva } from '@marigold/system';

export const Tag: ThemeComponent<'Tag'> = {
  container: cva({
    base: [
      'flex gap-3',
      // prevent layout jumps when a smaller empty state is shown (min height is set to height of tags)
      'min-h-7',
    ],
  }),
  tag: cva({
    base: [
      'relative inline-flex items-center gap-1.75',
      'ui-surface',
      'font-medium text-xs',
      'h-6 px-2 cursor-default',
      'selected:text-white selected:[--ui-background-color:var(--color-brand)]',
      'data-disabled:cursor-not-allowed data-disabled:text-disabled-foreground data-disabled:bg-disabled',
      'focus-visible:ui-state-focus outline-none',
    ],
  }),
  closeButton: cva({
    base: [
      'size-4',
      'disabled:bg-disabled disabled:text-disabled-foreground disabled:cursor-not-allowed',
    ],
  }),
  listItems: cva({
    base: [
      'flex flex-wrap gap-1',
      // mb-0 prevents whitespace when the hidden field is rendered
      'mb-0',
    ],
  }),
  removeAll: cva({
    base: [
      'inline whitespace-nowrap font-medium transition-[color,box-shadow,transform] rounded-md',
      'duration-150 active:scale-[0.97] pressed:scale-[0.97]',
      'focus-visible:ui-state-focus outline-none',
      'cursor-pointer',
      'text-link text-xs util-touch-hitbox',
    ],
  }),
};
