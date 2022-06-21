import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { Box, useStateProps } from '@marigold/system';
// Icons
// ---------------
const Plus = () =>
  React.createElement(
    Box,
    {
      as: 'svg',
      __baseCSS: { width: 16, height: 16 },
      viewBox: '0 0 20 20',
      fill: 'currentColor',
    },
    React.createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d: 'M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z',
    })
  );
const Minus = () =>
  React.createElement(
    Box,
    {
      as: 'svg',
      __baseCSS: { width: 16, height: 16 },
      viewBox: '0 0 20 20',
      fill: 'currentColor',
    },
    React.createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d: 'M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z',
    })
  );
// Components
// ---------------
export const StepButton = ({ direction, css, ...props }) => {
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
  return React.createElement(
    Box,
    {
      __baseCSS: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: props.isDisabled ? 'not-allowed' : 'pointer',
      },
      css: css,
      ...mergeProps(buttonProps, hoverProps),
      ...stateProps,
    },
    React.createElement(Icon, null)
  );
};
//# sourceMappingURL=StepButton.js.map
