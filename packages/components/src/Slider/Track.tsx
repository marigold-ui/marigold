import React, { RefObject } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { SliderState } from '@react-stately/slider';

import { CSSObject, useStateProps } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';
import { Thumb } from './Thumb';

// Props
// ---------------
export interface TrackProps extends Pick<ComponentProps<'input'>, 'disabled'> {
  state: SliderState;
  trackRef: RefObject<HTMLElement>;
  styles: CSSObject;
}

// Component
// ---------------
export const Track: React.FC<TrackProps> = ({
  trackRef,
  state,
  styles,
  ...props
}) => {
  const { disabled } = props;
  const thumbPercent = state.getThumbPercent(0);

  const { isFocusVisible, focusProps, isFocused } = useFocusRing();
  const focused = isFocused || isFocusVisible || state.isThumbDragging(0);

  // two tracks are needed to display one track without states styling in the back
  // and the other one with states style in the front
  const trackStateProps = useStateProps({
    focus: thumbPercent > 0 && focused,
    disabled: disabled,
    checked: thumbPercent > 0 && !focused,
  });
  const trackStyles = styles.track as CSSObject;
  const thumbStyles = styles.thumb as CSSObject;

  return (
    <Box
      __baseCSS={{
        position: 'relative',
        height: 32,
        width: '100%',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      ref={trackRef}
      {...props}
    >
      <Box width="100%" __baseCSS={trackStyles} />
      <Box
        width={`${thumbPercent * 100}%`}
        __baseCSS={trackStyles}
        {...trackStateProps}
      />
      <Thumb
        state={state}
        trackRef={trackRef}
        focused={focused}
        styles={thumbStyles}
        {...mergeProps(focusProps, props)}
      />
    </Box>
  );
};
