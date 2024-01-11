import { ThemeComponent, cva } from '@marigold/system';

export const inputBox =
  'border-border-base rounded-sm border outline-none outline-offset-[-1px]';
export const inputBackground = 'bg-bg-surface';
export const inputSpacing = 'px-2';

export const inputFocus = (selector: string = 'focus') =>
  `${selector}:outline-outline-focus`;

export const inputDisabled = (selector: string = 'disabled') =>
  `${selector}:bg-bg-base-disabled ${selector}:text-text-base-disabled ${selector}:hover:border-border-base-disabled ${selector}:border-border-base-disabled ${selector}:cursor-not-allowed`;

export const inputError = (selector: string = 'error') =>
  `${selector}:border-border-error`;

export const inputHover = (selector: string = 'hover') =>
  `${selector}:border-border-base-hover`;

export const Input: ThemeComponent<'Input'> = {
  icon: cva('left-2'),
  action: cva('right-0'),
  input: cva([
    inputBox,
    inputBackground,
    inputFocus(),
    inputDisabled(),
    inputHover(),
    inputError('group-error/field'),
    inputSpacing,
    'leading-[2]',
    'read-only:focus:border-border-base read-only:focus:outline-none',
    // Extra padding for when an icon/action is present
    'group-data-[icon]/input:pl-8',
  ]),
};
