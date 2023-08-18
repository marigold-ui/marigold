/**
 * Thanks to react-aria: https://react-spectrum.adobe.com/react-aria/useSlider.html
 */
import React, { ReactNode, forwardRef } from 'react';

import { useNumberFormatter } from '@react-aria/i18n';
import { useSlider } from '@react-aria/slider';
import { useObjectRef } from '@react-aria/utils';

import { useSliderState } from '@react-stately/slider';

import { AriaSliderProps } from '@react-types/slider';

import { cn, createVar, useClassNames, useStateProps } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { Thumb } from './Thumb';

// Props
// ---------------
export interface SliderProps
  extends Omit<
      HtmlProps<'input'>,
      | 'step'
      | 'value'
      | 'defaultValue'
      | 'onChange'
      | 'onFocus'
      | 'onBlur'
      | 'size'
      | 'width'
    >,
    /**
     * `react-aria` has a slightly different API for some events e.g `onChange`, `onFocus`
     * `onBlur`. Thus, we adjust our regular props to match them.
     */
    Pick<
      AriaSliderProps,
      'maxValue' | 'step' | 'value' | 'defaultValue' | 'onChange'
    > {
  variant?: string;
  size?: string;
  width?: string;
  formatOptions?: Intl.NumberFormatOptions;
  children?: ReactNode;
}

// Component
// ---------------
/**
 * The slider consists of two parts.
 * A label + the output value and the slider functionality itself.
 * The slider itself consists of a track line and a thumb.
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ variant, size, width = '100%', ...props }, ref) => {
    const { formatOptions } = props;
    const trackRef = useObjectRef(ref);
    const numberFormatter = useNumberFormatter(formatOptions);
    const state = useSliderState({ ...props, numberFormatter });
    const { groupProps, trackProps, labelProps, outputProps } = useSlider(
      {
        label: props.children,
        ...props,
      },
      state,
      trackRef
    );
    const classNames = useClassNames({
      component: 'Slider',
      variant,
      size,
    });
    const sliderState = useStateProps({
      disabled: props.disabled,
    });
    return (
      <div
        className="flex w-[var(--slideWidth)] touch-none flex-col"
        style={createVar({ slideWidth: width })}
        {...groupProps}
      >
        {/* Flex container for the label and output element. */}
        <div className="flex self-stretch">
          {props.children && (
            <label className={classNames.label} {...labelProps}>
              {props.children}
            </label>
          )}
          <output
            className={cn(
              'flex flex-shrink-0 flex-grow basis-auto',
              classNames.output
            )}
            {...outputProps}
          >
            {state.getThumbValueLabel(0)}
          </output>
        </div>
        {/* The track element holds the visible track line and the thumb. */}
        <div
          className="h-8 w-full cursor-pointer data-[disabled]:cursor-not-allowed"
          {...trackProps}
          {...sliderState}
          ref={trackRef}
        >
          <div
            className={cn(
              'absolute top-2/4 h-2 w-full -translate-y-1/2',
              classNames.track
            )}
          />
          <Thumb
            state={state}
            trackRef={trackRef}
            disabled={props.disabled}
            className={classNames.thumb}
          />
        </div>
      </div>
    );
  }
);
