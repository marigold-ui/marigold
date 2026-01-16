import { type ThemeComponent, cva } from '@marigold/system';

export const Select: ThemeComponent<'Select'> = {
  icon: cva('text-muted-foreground/80'),
  select: cva([
    'w-full min-w-0',
    'px-3 py-2',
    'bg-transparent',
    'outline-none',
    'text-foreground placeholder:text-placeholder text-sm',
    'surface shadow-elevation-base h-input',
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
