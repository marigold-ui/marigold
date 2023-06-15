import React, { useRef } from 'react';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { useButton } from '@react-aria/button';
import { PressEvents } from '@react-types/shared';
import { mergeProps } from '@react-aria/utils';

import { HtmlProps } from '@marigold/types';
import { cn, useStateProps } from '@marigold/system';

export interface ClearButtonProps extends PressEvents, HtmlProps<'button'> {
  excludeFromTabOrder?: boolean;
  preventFocus?: boolean;
  preventFocusOnPress?: boolean;
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
  excludeFromTabOrder,
  preventFocusOnPress,
  className,
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
      excludeFromTabOrder,
      preventFocusOnPress,
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
    <button
      {...mergeProps(buttonProps, focusProps, hoverProps, props)}
      {...stateProps}
      ref={buttonRef}
      className={cn(
        'cursor-pointer appearance-none border-none p-0 pr-1',
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        width={20}
        height={20}
      >
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>
  );
};
