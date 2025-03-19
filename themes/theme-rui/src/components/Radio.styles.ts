import { ThemeComponent, cva } from '@marigold/system';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva('group-disabled/radio:cursor-not-allowed'),
  label: cva([
    'group-disabled/radio:text-disabled-foreground',
    'text-sm font-normal',
  ]),
  radio: cva([
    'aspect-square size-4 rounded-full',
    'border border-input shadow-sm shadow-black/5',
    'mixin-ring-focus-visible-radio',
    'group-disabled/radio:border-disabled',
    'group-selected/radio:border-brand group-selected/radio:bg-brand group-selected/radio:text-brand-foreground',
  ]),
  group: cva(),
};
