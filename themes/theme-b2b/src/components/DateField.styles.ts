import { ThemeComponent, cva } from '@marigold/system';

import { inputBackground, inputBox, inputSpacing } from './Input.styles';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva([
    'flex flex-1 items-center',
    inputBox,
    inputBackground,
    inputSpacing,
    'h-[34px]',
    'data-[hovered]:border-border-hover',
    // inputDisabled('data-[disabled]') color tokens are not working with in this component
    'data-[disabled]:bg-bg-disabled data-[disabled]:border-border-disabled data-[disabled]:text-text-disabled data-[disabled]:cursor-not-allowed',
    // inputFocus('data-[focus-within]') is not working with this component
    'data-[focus-within]:border-border-focus data-[focus-within]:outline-outline-focus',
    'group-data-[invalid]/field:border-border-error',
  ]),
  segment: cva([
    'rounded-sm',
    'focus:bg-bg-focus focus:text-white',
    'aria-[readonly]:focus:border-border-light aria-[readonly]:focus:outline-none',
    'aria-[readonly]:bg-bg-transparent aria-[readonly]:text-text-disabled',
  ]),
  action: cva(''),
};
