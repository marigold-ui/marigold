import { type ThemeComponent, cva } from '@marigold/system';

export const Select: ThemeComponent<'Select'> = {
  icon: cva('text-muted-foreground/80'),
  select: cva([
    'ui-surface shadow-elevation-border ui-input h-input ',
    'cursor-pointer',
    'group-invalid/field:ui-state-error',
    'disabled:ui-state-disabled',
    'focus-visible:ui-state-focus outline-none',
    '*:data-placeholder:text-placeholder',
    /**
     * Removes the spacing from the field when there is no
     * helptext. Spacing is applied because the select is followed
     * by a hidden select that is rendered by react-aria.
     */
    'has-[+_[aria-hidden=true]]:mb-0',
  ]),
};
