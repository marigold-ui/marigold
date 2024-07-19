import { ThemeComponent, cva } from '@marigold/system';

import { inputBackground, inputBox, inputSpacing } from './Input.styles';

export const Select: ThemeComponent<'Select'> = {
  icon: cva('text-secondary-400'),
  select: cva([inputBox, inputBackground, 'gap-2'], {
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
