import { ThemeComponent, cva } from '@marigold/system';

import {
  inputBackground,
  inputBox,
  inputPlaceholder,
  inputSpacing,
} from './Input.styles';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva([
    'flex flex-1 items-center',
    inputBox,
    inputBackground,
    inputSpacing,
    'h-[34px]',
    'data-[hovered]:border-border-base-hover',
    // inputDisabled('data-[disabled]') color tokens are not working with in this component
    'data-[disabled]:bg-bg-base-disabled data-[disabled]:border-border-base-disabled data-[disabled]:text-text-base-disabled data-[disabled]:cursor-not-allowed',
    // inputFocus('data-[focus-within]') is not working with this component
    'data-[focus-within]:outline-outline-focus',
    'group-data-[invalid]/field:border-border-error',
  ]),
  segment: cva([
    'group/segment',
    'text-center leading-none outline-0',
    '[data-type="literal]"' && 'p-[0.75px]',
    'rounded-sm',
    'focus:bg-bg-accent focus:text-text-inverted',
    'aria-[readonly]:focus:border-border-base aria-[readonly]:focus:outline-none',
    'aria-[readonly]:text-text-base-disabled aria-[readonly]:bg-transparent',
    inputPlaceholder(),
  ]),
  action: cva(''),
};
