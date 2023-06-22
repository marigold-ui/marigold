import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

import { inputBox, inputHeight, inputSpacing } from './Input.styles';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva([
    inputBox,
    inputHeight,
    inputSpacing,
    ' group-disabled/field:bg-bg-disabled group-disabled/field:border-border-disabled group-disabled/field:text-text-disabled',
    ' group-readonly/field:bg-bg-transparent group-readonly/field:text-text-disabled',
  ]),

  segment: cva(['rounded-sm', 'focus:bg-bg-focus focus:text-text-focus']),

  action: cva('pr-2'),
};
