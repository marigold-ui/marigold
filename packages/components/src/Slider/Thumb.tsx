import React, { RefObject, useEffect } from 'react';
import { useSliderThumb } from '@react-aria/slider';
import { mergeProps } from '@react-aria/utils';
import { SliderState } from '@react-stately/slider';

import { ComponentProps } from '@marigold/types';
import { conditional } from '@marigold/system';

import { Box } from '../Box';
import { VisuallyHidden } from '../VisuallyHidden';

// Props
// ---------------
export type ThumbProps = {
  state: SliderState;
  trackRef: RefObject<HTMLElement>;
  variant?: string;
  index: number;
  disabled?: boolean;
  focused?: boolean;
} & ComponentProps<'input'>;

// Component
// ---------------
export const Thumb: React.FC<ThumbProps> = ({
  variant = '',
  disabled = false,
  index,
  state,
  trackRef,
  focused,
  ...props
}) => {
  const inputRef = React.useRef(null);
  const { thumbProps, inputProps } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    state
  );

  useEffect(() => {
    state.setThumbEditable(0, !disabled);
  }, [disabled, state]);

  return (
    <Box
      __baseCSS={{
        position: 'absolute',
        top: 16,
        transform: 'translateX(-50%)',
        left: `${state.getThumbPercent(index) * 100}%`,
      }}
    >
      <Box
        {...thumbProps}
        __baseCSS={{
          verticalAlign: 'middle',
        }}
        variant={conditional(`sliderThumb.${variant}`, {
          focus: focused,
          disabled: disabled,
        })}
      >
        <VisuallyHidden>
          <Box
            as="input"
            type="range"
            ref={inputRef}
            {...mergeProps(inputProps, props)}
          />
        </VisuallyHidden>
      </Box>
    </Box>
  );
};
