import { ThemeComponent, cva } from '@marigold/system';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva({ base: 'group-disabled/radio:cursor-not-allowed' }),
  label: cva({
    base: [
      'text-sm font-normal cursor-pointer w-full',
      'group-disabled/radio:text-disabled group-disabled/radio:cursor-not-allowed',
    ],
  }),
  radio: cva({
    base: [
      'aspect-square size-4 rounded-full',
      'border border-input shadow-elevation-border',
      'group-focus-visible/radio:ui-state-focus outline-none',
      'group-disabled/radio:group-selected/radio:bg-disabled-surface group-disabled/radio:border-disabled-surface! group-disabled/radio:cursor-not-allowed',
      'group-selected/radio:border-primary group-selected/radio:bg-primary group-selected/radio:text-primary-foreground',
    ],
  }),
  group: cva({}),
};
