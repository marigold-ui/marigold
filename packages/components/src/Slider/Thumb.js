import React, { useEffect } from 'react';
import { useSliderThumb } from '@react-aria/slider';
import { mergeProps } from '@react-aria/utils';
import { useStateProps } from '@marigold/system';
import { Box } from '../Box';
import { VisuallyHidden } from '../VisuallyHidden';
import { useFocusRing } from '@react-aria/focus';
// Component
// ---------------
export const Thumb = ({ state, trackRef, styles, ...props }) => {
  const { disabled } = props;
  const inputRef = React.useRef(null);
  const { isFocusVisible, focusProps, isFocused } = useFocusRing();
  const focused = isFocused || isFocusVisible || state.isThumbDragging(0);
  const stateProps = useStateProps({
    focus: focused,
    disabled: disabled,
  });
  const { thumbProps, inputProps } = useSliderThumb(
    {
      index: 0,
      trackRef,
      inputRef,
      isDisabled: disabled,
    },
    state
  );
  useEffect(() => {
    state.setThumbEditable(0, !disabled);
  }, [disabled, state]);
  return React.createElement(
    Box,
    {
      __baseCSS: {
        position: 'absolute',
        top: 16,
        transform: 'translateX(-50%)',
        left: `${state.getThumbPercent(0) * 100}%`,
      },
    },
    React.createElement(
      Box,
      { ...thumbProps, __baseCSS: styles, ...stateProps },
      React.createElement(
        VisuallyHidden,
        null,
        React.createElement(Box, {
          as: 'input',
          type: 'range',
          ref: inputRef,
          ...mergeProps(inputProps, focusProps),
        })
      )
    )
  );
};
//# sourceMappingURL=Thumb.js.map
