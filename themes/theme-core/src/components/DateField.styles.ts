import { ThemeComponent, cva } from '@marigold/system';

import { inputBox, inputHeight, inputSpacing } from './Input.styles';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva([
    inputBox,
    inputHeight,
    inputSpacing,
    'data-[disabled]:bg-bg-disabled data-[disabled]:border-border-disabled data-[disabled]:text-text-disabled',
  ]),

  segment: cva([
    'rounded-sm',
    'focus:bg-bg-focus focus:text-text-focus',
    'aria-[readonly]:bg-bg-transparent aria-[readonly]:text-text-disabled',
  ]),
  action: cva('pr-2'),
};
