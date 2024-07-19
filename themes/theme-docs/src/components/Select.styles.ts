import { ThemeComponent, cva } from '@marigold/system';

import { inputBackground, inputBox, inputSpacing } from './Input.styles';

export const Select: ThemeComponent<'Select'> = {
  icon: cva('text-border'),
  select: cva([inputBox, inputBackground, 'gap-3'], {
    variants: {
      variant: {
        default: '',
      },
      size: {
        default: [inputSpacing.default],
        small: [inputSpacing.small],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
};
