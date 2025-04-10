import { ThemeComponent, cva } from '@marigold/system';
import {
  inputBox,
  inputDisabled,
  inputError,
  inputHeight,
  inputSpacing,
} from './Input.styles';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva('h-component'),
  stepper: cva('rac-disabled:bg-none rac-disabled:text-text-base-disabled'),
  input: cva([
    inputBox,
    inputHeight,
    inputSpacing,
    inputDisabled,
    inputError,
    'min-w-0 w-full',
    'leading-[22px]',
    'focus:outline-outline-focus -outline-offset-1 focus:outline',
    'read-only:border-transparent read-only:bg-transparent',
    // Extra padding for when an icon/action is present
    'group-[icon]/input:pl-5',
    'group-[action]/input:pr-8',
    'placeholder:text-text-inverted-disabled',
  ]),
};
