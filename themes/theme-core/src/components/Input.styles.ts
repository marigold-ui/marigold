import { ThemeComponent, cva } from '@marigold/system';

export const inputHeight = 'h-component';
export const inputBox = 'border rounded-xs border-border-inverted bg-white';
export const inputSpacing = 'px-1';
export const inputDisabled =
  'disabled:bg-bg-inverted-disabled disabled:border-border-base-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed';

export const inputError = `data-invalid:border-border-error`;

export const Input: ThemeComponent<'Input'> = {
  input: cva([
    inputBox,
    inputHeight,
    inputSpacing,
    inputDisabled,
    inputError,
    '[&[type=file]]:leading-[16px]',
    'leading-[22px]',
    'focus:outline-outline-focus -outline-offset-1 focus:outline',
    'read-only:border-transparent read-only:bg-transparent',
    // Extra padding for when an icon/action is present
    'group-[[data-icon]]/input:pl-5',
    'group-[[data-action]]/input:pr-8',
    'placeholder:text-text-inverted-disabled',
  ]),
  icon: cva('left-1 size-4'),
  action: cva([inputHeight, '']),
};
