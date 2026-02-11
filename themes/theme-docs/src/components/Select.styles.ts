import { ThemeComponent, cva } from '@marigold/system';
import {
  inputBackground,
  inputBox,
  inputDisabled,
  inputSpacing,
} from './Input.styles';

export const Select: ThemeComponent<'Select'> = {
  icon: cva('text-secondary-400', {
    variants: {
      variant: {
        default: '',
        floating: 'justify-self-end',
      },
      size: {
        default: '',
        small: 'size-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  select: cva([inputBox, inputBackground, inputDisabled, 'outline-hidden'], {
    variants: {
      variant: {
        default: 'gap-2',
        floating: [
          'shadow-xs',
          'col-span-full row-start-1 grid! grid-cols-subgrid grid-rows-subgrid',
          // selected value and caret get moved to 2nd col
          '*:row-start-1 *:col-start-2 *:text-left',
          // leave space for the chevron icon at the end
          '[&>:first-child]:mr-6',
          // So the button gap is not used to separate label from selected value
          'gap-[inherit]',
        ],
      },
      size: {
        default: [inputSpacing.default],
        small: [inputSpacing.small, 'text-xs'],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: 'floating',
        size: 'default',
        className: 'px-4 py-1.5',
      },
      {
        variant: 'floating',
        size: 'small',
        className: 'px-3',
      },
    ],
  }),
};
