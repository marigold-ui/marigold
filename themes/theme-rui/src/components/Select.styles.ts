import { type ThemeComponent, cva } from '@marigold/system';
import { inputContainer, inputDisabled, inputInvalid } from './Input.styles';

export const Select: ThemeComponent<'Select'> = {
  icon: cva('text-muted-foreground/80'),
  select: cva([
    inputContainer,
    inputInvalid,
    inputDisabled,
    'focus-visible:util-focus-ring outline-none',
    'h-input',
    'cursor-pointer',
    '*:data-placeholder:text-placeholder',
    /**
     * Removes the spacing from the field when there is no
     * helptext. Spacing is applied because the select is followed
     * by a hidden select that is rendered by react-aria.
     */
    'has-[+_[aria-hidden=true]]:mb-0',
  ]),
};
