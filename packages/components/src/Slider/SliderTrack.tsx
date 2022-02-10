import React, { HTMLAttributes, RefObject } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { SliderState } from '@react-stately/slider';

import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';
import { Thumb } from './Thumb';
import { TrackLine } from './TrackLine';

// Track Props
// ---------------
export type SliderTrackProps = {
  variant?: string;
  thumbVariant?: string;
  trackRef: RefObject<HTMLElement>;
  state: SliderState;
} & HTMLAttributes<HTMLElement> &
  ComponentProps<'input'>;

// Track
// ---------------
export const SliderTrack: React.FC<SliderTrackProps> = ({
  variant = '',
  thumbVariant = '',
  trackRef,
  state,
  ...props
}) => {
  const { isFocusVisible, focusProps, isFocused } = useFocusRing();
  const focused = isFocused || isFocusVisible || state.isThumbDragging(0);

  return (
    <Box
      __baseCSS={{
        position: 'relative',
        height: 32,
        width: '100%',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
      }}
      ref={trackRef}
      {...props}
    >
      <TrackLine variant={variant} />
      <TrackLine
        variant={variant}
        disabled={props.disabled}
        focused={focused}
        thumbPercent={state.getThumbPercent(0)}
      />
      <Thumb
        state={state}
        trackRef={trackRef}
        variant={thumbVariant}
        index={0}
        disabled={props.disabled}
        focused={focused}
        {...mergeProps(focusProps, props)}
      />
    </Box>
  );
};
