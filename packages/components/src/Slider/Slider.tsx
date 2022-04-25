import React, { useRef } from 'react';
import { useSlider } from '@react-aria/slider';
import { mergeProps } from '@react-aria/utils';
import { useSliderState } from '@react-stately/slider';
import { useNumberFormatter } from '@react-aria/i18n';
import { AriaSliderProps } from '@react-types/slider';

import { useComponentStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';
import { Field, FieldProps } from '../Field';
import { Track } from './Track';

// Theme Extension
// ---------------
export interface SliderThemeExtension<Value> {
  Slider?: {
    base: Value;
    variant?: {
      [key: string]: Value;
    };
  };
}

// Props
// ---------------
export interface SliderProps
  extends Omit<
      ComponentProps<'input'>,
      'step' | 'value' | 'defaultValue' | 'onChange' | 'onFocus' | 'onBlur'
    >,
    /**
     * `react-aria` has a slightly different API for `onChange`, `onFocus`
     * and `onBlur` events. Thus, we adjust our regular props to match them.
     */
    Pick<
      AriaSliderProps,
      'maxValue' | 'step' | 'value' | 'defaultValue' | 'onChange'
    >,
    Pick<FieldProps, 'label'> {
  variant?: string;
  width?: number | string;
  formatOptions?: Intl.NumberFormatOptions;
}

// Component
// ---------------
export const Slider: React.FC<SliderProps> = ({
  variant,
  width = 180,
  ...props
}) => {
  const { disabled, label, formatOptions } = props;
  const trackRef = useRef<HTMLElement>(null);
  const numberFormatter = useNumberFormatter(formatOptions);
  const state = useSliderState({ ...props, numberFormatter });

  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    {
      isDisabled: disabled,
      ...props,
    },
    state,
    trackRef
  );

  const styles = useComponentStyles(
    'Slider',
    { variant },
    { parts: ['track', 'thumb'] }
  );

  return (
    <Field
      label={label}
      labelProps={labelProps}
      description={state.getThumbValueLabel(0)}
      descriptionProps={outputProps}
    >
      <Box
        __baseCSS={{
          display: 'flex',
          flexDirection: 'column',
          width: width,
          touchAction: 'none',
        }}
        {...groupProps}
      >
        <Track
          state={state}
          trackRef={trackRef}
          styles={styles}
          {...mergeProps(trackProps, props)}
        />
      </Box>
    </Field>
  );
};
