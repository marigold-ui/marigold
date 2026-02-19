import { type ThemeComponent, cva } from '@marigold/system';

export const HelpText: ThemeComponent<'HelpText'> = {
  container: cva({
    base: [
      'text-xs text-muted-foreground group-disabled/field:text-disabled-foreground',
      'group-invalid/field:text-destructive',
      /**
       * Removes the spacing from the field when when there are hidden
       * elements (e.g. the hidden select rendered by react-aria).
       */
      'has-[+_[aria-hidden=true]]:mb-0',
    ],
  }),
  icon: cva({ base: '' }),
};
