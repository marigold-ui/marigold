import { type ThemeComponent, cva } from '@marigold/system';

export const Select: ThemeComponent<'Select'> = {
  icon: cva('text-muted-foreground/80'),
  select: cva([
    'surface surface-input group-not-data-[invalid=true]/field:not-data-[focus-visible=true]:enabled:elevation-raised h-input',
    'group-invalid/field:surface-error',
    'disabled:state-disabled',
    'focus-visible:state-focus outline-none',
    '*:data-placeholder:text-placeholder',
    /**
     * Removes the spacing from the field when there is no
     * helptext. Spacing is applied because the select is followed
     * by a hidden select that is rendered by react-aria.
     */
    'has-[+_[aria-hidden=true]]:mb-0',
  ]),
};
