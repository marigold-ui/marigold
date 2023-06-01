import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva('disabled:text-disabled-text'),
  radio: cva([
    'border-radio-border',
    'group-focus/radio:outline-radio-focus group-focus/radio:outline group-focus/radio:outline-offset-[3px]',
    'group-hover/radio:border-radio-hover',
    'group-checked/radio:text-secondary-50 group-checked/radio:bg-radio-checked checked:border-radio-checkedBorder',
    'group-disabled/radio:bg-disabled-bg group-disabled/radio:border-disabled-border',
  ]),
  label: cva(),
};
