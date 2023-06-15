import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva(),
  label: cva('disabled:text-text-disabled text-sm'),
  radio: cva([
    'border-border-light',
    'group-hover/radio:border-border-hover',
    'group-focus/radio:outline-outline-focus group-focus/radio:outline group-focus/radio:outline-2 group-focus/radio:outline-offset-2',
    'group-checked/radio:border-border-selected group-checked/radio:bg-bg-selected group-checked/radio:text-white',
    'group-disabled/radio:bg-bg-disabled group-disabled/radio:border-border-disabled',
  ]),
};
