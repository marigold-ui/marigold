import React, { useRef } from 'react';

import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';

import { AriaButtonProps } from '@react-types/button';

import { cn, useStateProps } from '@marigold/system';

// Icons
// ---------------
const Plus = () => (
  <svg width={16} height={16} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
    />
  </svg>
);

const Minus = () => (
  <svg width={16} height={16} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
    />
  </svg>
);

// Props
// ---------------
export interface StepButtonProps extends AriaButtonProps {
  // We allow `isDisabled` to be passed down here.
  direction: 'up' | 'down';
  className?: string;
}

// Components
// ---------------
export const StepButton = ({
  direction,
  className,
  ...props
}: StepButtonProps) => {
  const ref = useRef(null);
  /**
   * We use a `div` because there is a bug in safari with disabled
   * form elements. See: https://bugs.webkit.org/show_bug.cgi?id=219188
   */
  const { buttonProps, isPressed } = useButton(
    { ...props, elementType: 'div' },
    ref
  );
  const { hoverProps, isHovered } = useHover(props);

  const stateProps = useStateProps({
    active: isPressed,
    hover: isHovered,
    disabled: props.isDisabled,
  });

  const Icon = direction === 'up' ? Plus : Minus;

  return (
    <div
      className={cn(
        [
          'flex items-center justify-center',
          'cursor-pointer data-[disabled]:cursor-not-allowed',
        ],
        className
      )}
      {...mergeProps(buttonProps, hoverProps)}
      {...stateProps}
    >
      <Icon />
    </div>
  );
};
