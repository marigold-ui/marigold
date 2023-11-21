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
    inputDisabled('data-[disabled]'),
    inputFocus('data-[focus]'),
    inputSpacing,
    'h-[34px]',
    'data-[hovered]:border-border-hover',
  ]),
  segment: cva([
    'rounded-sm',
    'focus:bg-bg-focus focus:text-white',
    'aria-[readonly]:focus:border-border-light aria-[readonly]:focus:outline-none',
    ' aria-[readonly]:bg-bg-transparent aria-[readonly]:text-text-disabled',
  ]),
  action: cva(''),
};
