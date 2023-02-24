import React, { useRef } from 'react';
import { PressEvents } from '@react-types/shared';
import { HtmlProps } from '@marigold/types';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { Box, useStateProps } from '@marigold/system';
import { mergeProps } from '@react-aria/utils';

export interface ClearButtonProps extends PressEvents, HtmlProps<'button'> {
  preventFocus?: boolean;
}

export const ClearButton = ({
  preventFocus,
  disabled,
  onClick,
  onPress,
  onPressStart,
  onPressEnd,
  onPressChange,
  onPressUp,
  ...props
}: ClearButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
  const { isFocusVisible, focusProps } = useFocusRing({
    autoFocus: props.autoFocus,
  });
  const { buttonProps, isPressed } = useButton(
    {
      ...(props as any),
      onClick,
      onPress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
      isDisabled: disabled,
    },
    buttonRef
  );

  /**
   * For cases like the clear button in a search field, remove the tabIndex so
   * iOS 14 with VoiceOver doesn't focus the button and hide the keyboard when
   * moving the cursor over the clear button.
   */
  if (preventFocus) {
    delete buttonProps.tabIndex;
  }

  const stateProps = useStateProps({
    active: isPressed,
    focusVisible: isFocusVisible,
    hover: isHovered,
  });

  return (
    <Box
      {...mergeProps(buttonProps, focusProps, hoverProps, props)}
      {...stateProps}
      as="button"
      ref={buttonRef}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </Box>
  );
};
