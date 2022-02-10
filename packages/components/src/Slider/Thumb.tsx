import React, { HTMLAttributes, RefObject, useEffect } from 'react';
import { useSliderThumb } from '@react-aria/slider';
import { mergeProps } from '@react-aria/utils';
import { SliderState } from '@react-stately/slider';
import { AriaSliderThumbProps } from '@react-types/slider';

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
  disabled?: boolean;
  isFocused: boolean;
  focusProps: HTMLAttributes<HTMLElement>;
} & AriaSliderThumbProps &
  ComponentProps<'div'>;

// Component
// ---------------
export const Thumb: React.FC<ThumbProps> = ({
  variant = '',
  disabled = false,
  index,
  state,
  trackRef,
  focusProps,
  isFocused,
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
        variant={conditional(`thumb.${variant}`, {
          focus: isFocused,
          disabled: disabled,
        })}
      >
        <VisuallyHidden>
          <Box
            as="input"
            type="range"
            ref={inputRef}
            {...mergeProps(inputProps, focusProps, props)}
          />
        </VisuallyHidden>
      </Box>
    </Box>
  );
};
