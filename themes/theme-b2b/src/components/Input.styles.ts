import { ThemeComponent, cva } from '@marigold/system';

export const inputBox =
  'border-border-light rounded-sm border outline-none hover:border-border-hover';
export const inputFocus =
  'focus:border-border-focus focus:outline-outline-focus focus:-outline-offset-1';
export const inputBackground = 'bg-bg-surface';
export const inputDisabled =
  'disabled:bg-bg-disabled disabled:text-text-disabled disabled:hover:border-border-disabled disabled:border-border-disabled disabled:cursor-not-allowed';
export const inputError = (selector: string = 'error') =>
  `${selector}:border-border-error ${selector}:outline-outline-error ${selector}:-outline-offset-1`;
export const inputSpacing = 'px-2';

export const Input: ThemeComponent<'Input'> = {
  icon: cva('left-2'),
  action: cva('right-0'),
  input: cva([
    inputBox,
    inputBackground,
    inputFocus,
    inputDisabled,
    inputSpacing,
    inputError('data-[error]'),
    'leading-[2]',
    'read-only:focus:border-border-light read-only:focus:outline-none ',
    // Extra padding for when an icon/action is present
    'group-data-[icon]/input:pl-8',
  ]),
};
