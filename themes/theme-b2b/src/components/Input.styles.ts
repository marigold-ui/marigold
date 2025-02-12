import { ThemeComponent, cva } from '@marigold/system';

export const inputBox =
  'border-border-base rounded-xs border outline-hidden outline-offset-[-1px] h-component';
export const inputBackground = 'bg-bg-surface';
export const inputSpacing = 'px-2';

export const inputFocus = {
  focus: 'focus:outline-outline-focus focus:outline-2',
};

export const inputDisabled = {
  disabled:
    'disabled:bg-bg-base-disabled disabled:text-text-base-disabled disabled:hover:border-border-base-disabled disabled:border-border-base-disabled disabled:cursor-not-allowed',
};

export const inputError = {
  groupErrorField: 'group-error/field:border-border-error',
};

export const inputHover = {
  hover: 'hover:border-border-base-hover',
};

export const Input: ThemeComponent<'Input'> = {
  icon: cva('left-1'),
  action: cva(''),
  input: cva([
    inputBox,
    inputBackground,
    inputFocus['focus'],
    inputDisabled['disabled'],
    inputHover['hover'],
    inputError['groupErrorField'],
    inputSpacing,
    'leading-loose',
    'read-only:focus:border-border-base read-only:focus:outline-hidden',
    // Extra padding for when an icon/action is present
    'group-[icon]/input:pl-8',
    'group-[action]/input:pr-8',
    'placeholder:text-text-base-disabled',
  ]),
};
