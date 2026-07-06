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
      'ui-surface-control shadow-elevation-border',
      // Inside a TagField the frame is already an input-styled control, so a chip
      // in the same raised treatment reads as an input nested in an input. A Tag in
      // the trigger sheds the lift and bottom bevel and lightens its ring a step
      // (token-derived), leaving a quiet flat chip that still reads as a removable token.
      'in-[.tagfield-trigger]:shadow-none in-[.tagfield-trigger]:inset-shadow-none in-[.tagfield-trigger]:[--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_-_0.10))]',
      'font-medium text-xs',
      'h-6 px-2 cursor-default',
      'selected:text-selected-bold-foreground selected:[--ui-background-color:var(--color-selected-bold)]',
      'data-disabled:cursor-not-allowed data-disabled:text-disabled data-disabled:bg-disabled-surface',
      'focus-visible:ui-state-focus outline-none',
    ],
  }),
  closeButton: cva({
    base: [
      'size-4',
      'disabled:bg-disabled-surface disabled:text-disabled disabled:cursor-not-allowed',
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
      'ui-press',
      'focus-visible:ui-state-focus outline-none',
      'cursor-pointer',
      'text-link text-xs ui-touch-hitbox',
    ],
  }),
};
