import { type ThemeComponent, cva } from '@marigold/system';
import { inputContainer, inputDisabled, inputInvalid } from './Input.styles';

export const Select: ThemeComponent<'Select'> = {
  icon: cva('text-muted-foreground/80'),
  select: cva([
    inputContainer,
    inputInvalid,
    inputDisabled,
    'mixin-ring-focus-visible',
    'h-input',
    'cursor-pointer',
    '*:data-placeholder:text-placeholder',
  ]),
};
