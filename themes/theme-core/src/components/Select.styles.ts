import { ThemeComponent, cva } from '@marigold/system';

import { inputBox, inputHeight, inputSpacing } from './Input.styles';

export const Select: ThemeComponent<'Select'> = {
  icon: cva(),
  select: cva([inputBox, inputHeight, inputSpacing]),
};
