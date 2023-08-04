import { ThemeComponent, cva } from '@marigold/system';
import {
  inputBackground,
  inputBox,
  inputDisabled,
  inputFocus,
  inputSpacing,
} from './Input.styles';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva([
    inputBox,
    inputBackground,
    inputDisabled('group-disabled/field'),
    inputFocus('group-focus/field'),
    inputSpacing,
    'h-[34px]',
    'group-hover/field:border-border-hover',
    'group-readonly/field:group-focus/field:border-border-light group-readonly/field:group-focus/field:outline-none',
    ' group-readonly/field:bg-bg-transparent group-readonly/field:text-text-disabled',
  ]),
  segment: cva(['rounded-sm', 'focus:bg-bg-focus focus:text-white']),
  action: cva(''),
};
