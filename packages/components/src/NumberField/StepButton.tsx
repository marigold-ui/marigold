import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';

import { Box, useStateProps } from '@marigold/system';

export interface StepButtonProps extends AriaButtonProps {
  // We allow `isDisabled` to be passed down here.
  direction: 'up' | 'down';
}

const Plus = () => (
  <Box
    as="svg"
    __baseCSS={{ width: 16, height: 16 }}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
    />
  </Box>
);

const Minus = () => (
  <Box
    as="svg"
    __baseCSS={{ width: 16, height: 16 }}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
    />
  </Box>
);

export const StepButton = ({ direction, ...props }: StepButtonProps) => {
  const ref = useRef(null);
  /**
   * We use a `div` because there is a but in safari with disabled
   * form elements. See: https://bugs.webkit.org/show_bug.cgi?id=219188
   */
  const { buttonProps, isPressed } = useButton(
    { ...props, elementType: 'div' },
    ref
  );
  const { hoverProps, isHovered } = useHover(props);
  const { focusProps, isFocusVisible } = useFocusRing();

  const stateProps = useStateProps({
    active: isPressed,
    hover: isHovered,
    focus: isFocusVisible,
  });

  const Icon = direction === 'up' ? Plus : Minus;

  return (
    <Box {...mergeProps(buttonProps, hoverProps, focusProps)} {...stateProps}>
      <Icon />
    </Box>
  );
};
