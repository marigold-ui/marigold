import React from 'react';

import { conditional } from '@marigold/system';

import { Box } from '../Box';

// TrackLine Props
// ---------------
export type TrackLineProps = {
  variant?: string;
  disabled?: boolean;
  focused?: boolean;
  thumbPercent?: number;
};

// TrackLine
// ---------------
export const TrackLine: React.FC<TrackLineProps> = ({
  variant = '',
  disabled = false,
  focused = false,
  thumbPercent,
}) => (
  <Box
    __baseCSS={{
      width: thumbPercent ? `${thumbPercent * 100}%` : '100%',
      position: 'absolute',
      top: 16,
      height: 8,
      border: 'none',
    }}
    variant={conditional(`slider.${variant}`, {
      focus: thumbPercent ? thumbPercent > 0 && focused : false,
      disabled: disabled,
      checked: thumbPercent ? thumbPercent > 0 && !focused : false,
    })}
  />
);
