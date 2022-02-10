import React, { useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useSlider } from '@react-aria/slider';
import { useSliderState } from '@react-stately/slider';
import { useNumberFormatter } from '@react-aria/i18n';
import { NumberFormatOptions } from '@internationalized/number';
import { SliderProps as SliderPropsAria } from '@react-types/slider';

import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';
import { Label } from '../Label';
import { Thumb } from './Thumb';
import { SliderTrack } from './SliderTrack';

// Theme Extension
// ---------------
export interface SliderThemeExtension<Value> {
  slider?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export type SliderProps = {
  variant?: string;
  labelVariant?: string;
  formatOptions?: NumberFormatOptions;
  required?: boolean;
} & SliderPropsAria &
  ComponentProps<'input'>;

// Component
// ---------------
export const Slider: React.FC<SliderProps> = ({
  variant = '',
  labelVariant = 'above',
  required,
  ...props
}) => {
  const trackRef = useRef<HTMLElement>(null);
  const numberFormatter = useNumberFormatter(props.formatOptions);
  const state = useSliderState({ ...props, numberFormatter });
  const { groupProps, trackProps, labelProps } = useSlider(
    props,
    state,
    trackRef
  );
  const { isFocusVisible, focusProps, isFocused } = useFocusRing();
  const isSliderFocused =
    isFocused || isFocusVisible || state.isThumbDragging(0);

  // problem with focused und 0
  // problem with disabled
  return (
    <>
      <Box
        __baseCSS={{
          display: 'flex',
          flexDirection: 'column',
          width: 180,
          touchAction: 'none',
        }}
        {...groupProps}
      >
        {props.label && (
          <Label variant={labelVariant} required={required} {...labelProps}>
            {props.label}
          </Label>
        )}
        <SliderTrack
          variant={variant}
          state={state}
          {...trackProps}
          trackRef={trackRef}
          isFocused={isSliderFocused}
        >
          <Thumb
            index={0}
            state={state}
            trackRef={trackRef}
            disabled={props.disabled}
            isFocused={isSliderFocused}
            focusProps={focusProps}
          />
        </SliderTrack>
      </Box>
    </>
  );
};
