import { ThemeComponent, cva } from '@marigold/system';

export const inputBox =
  'border-border-light rounded-sm border outline-none outline-offset-[-1px]';
export const inputBackground = 'bg-bg-surface';
export const inputSpacing = 'px-2';

export const inputFocus = (selector: string = 'focus') =>
  `${selector}:border-border-focus ${selector}:outline-outline-focus`;

export const inputDisabled = (selector: string = 'disabled') =>
  `${selector}:bg-bg-disabled ${selector}:text-text-disabled ${selector}:hover:border-border-disabled ${selector}:border-border-disabled ${selector}:cursor-not-allowed`;

export const inputError = (selector: string = 'error') =>
  `${selector}:border-border-error ${selector}:outline-outline-error ${selector}:-outline-offset-1`;

export const inputHover = (selector: string = 'hover') =>
  `${selector}:border-border-hover`;

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
    'read-only:focus:border-border-light read-only:focus:outline-none',
    // Extra padding for when an icon/action is present
    'group-data-[icon]/input:pl-8',
  ]),
};
