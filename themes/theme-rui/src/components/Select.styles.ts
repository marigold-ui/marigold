import { type ThemeComponent, cva } from '@marigold/system';

export const Select: ThemeComponent<'Select'> = {
  icon: cva({ base: 'text-secondary/80' }),
  select: cva({
    base: [
      'ui-control ui-input h-control ',
      'cursor-pointer',
      'group-invalid/field:ui-state-error',
      'disabled:ui-state-disabled',
      'focus-visible:ui-state-focus outline-none',
      '*:data-placeholder:text-placeholder',
      // Drops the field spacing when there is no helptext. The spacing exists
      // because react-aria renders a hidden select after this one.
      'has-[+_[aria-hidden=true]]:mb-0',
    ],
  }),
};
