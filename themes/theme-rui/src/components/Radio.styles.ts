import { ThemeComponent, cva } from '@marigold/system';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva('group-disabled/radio:cursor-not-allowed'),
  label: cva([
    'text-sm font-normal cursor-pointer w-full',
    'group-disabled/radio:text-disabled-foreground group-disabled/radio:cursor-not-allowed',
  ]),
  radio: cva([
    'aspect-square size-4 rounded-full',
    'border border-input shadow-xs',
    'group-focus-visible/radio:state-focus-borderless outline-none',
    'group-disabled/radio:group-selected/radio:bg-disabled group-disabled/radio:border-disabled! group-disabled/radio:cursor-not-allowed',
    'group-selected/radio:border-brand group-selected/radio:bg-brand group-selected/radio:text-brand-foreground',
  ]),
  group: cva(),
};
