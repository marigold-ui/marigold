import { ThemeComponent, cva } from '@marigold/system';

import { inputBox, inputHeight, inputSpacing } from './Input.styles';

export const Select: ThemeComponent<'Select'> = {
  select: cva([inputBox, inputHeight, inputSpacing]),
  icon: cva(),
};
