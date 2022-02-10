import React, { HTMLAttributes, RefObject } from 'react';
import { SliderState } from '@react-stately/slider';

import { conditional } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

// Track Props
// ---------------
export type SliderTrackProps = {
  variant?: string;
  isFocused?: boolean;
  trackRef: RefObject<HTMLElement>;
  state: SliderState;
} & HTMLAttributes<HTMLElement> &
  ComponentProps<'input'>;

// Track
// ---------------
export const SliderTrack: React.FC<SliderTrackProps> = ({
  variant = '',
  trackRef,
  isFocused,
  state,
  children,
  ...props
}) => (
  <Box
    __baseCSS={{
      position: 'relative',
      height: 32,
      width: ' 100%',
      cursor: 'pointer',
    }}
    ref={trackRef}
    variant={`track.${variant}`}
    {...props}
  >
    <TrackLine variant={variant} disabled={props.disabled} />
    <TrackLine
      variant={variant}
      disabled={props.disabled}
      isFocused={isFocused}
      thumbPercent={state.getThumbPercent(0)}
    />
    {children}
  </Box>
);

// TrackLine Props
// ---------------
type TrackLineProps = {
  variant?: string;
  disabled?: boolean;
  isFocused?: boolean;
  thumbPercent?: number;
};

// TrackLine
// ---------------
const TrackLine: React.FC<TrackLineProps> = ({
  variant = '',
  disabled = false,
  isFocused = false,
  thumbPercent,
}) => {
  return (
    <Box
      __baseCSS={{
        width: thumbPercent ? `${thumbPercent * 100}%` : '100%',
        position: 'absolute',
        top: 16,
        height: 8,
        border: 'none',
      }}
      variant={conditional(`slider.${variant}`, {
        focus: isFocused,
        disabled: disabled,
        checked: thumbPercent ? thumbPercent > 0 && !isFocused : false,
      })}
    />
  );
};
