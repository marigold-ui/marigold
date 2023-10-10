import React, { Ref, forwardRef } from 'react';
import {
  Label,
  Slider as RACSlider,
  SliderProps as RACSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';

import {
  WidthProp,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';

export interface SliderProps<T>
  extends Omit<RACSliderProps<T>, 'isDisabled' | 'label'> {
  thumbLabels?: string[];
  width?: WidthProp['width'];
  variant?: string;
  size?: string;
  disabled?: boolean;
}

export const Slider = forwardRef(
  <T extends number | number[]>(
    {
      thumbLabels,
      variant,
      size,
      width = 'full',
      disabled,
      ...rest
    }: SliderProps<T>,
    ref: Ref<HTMLDivElement>
  ) => {
    const classNames = useClassNames({
      component: 'Slider',
      variant,
      size,
    });
    const props: RACSliderProps = {
      isDisabled: disabled,
      ...rest,
    };
    return (
      <RACSlider
        className={cn('flex touch-none flex-col', twWidth[width])}
        ref={ref}
        {...props}
      >
        <div className="flex self-stretch">
          <Label>{props.children as React.ReactNode}</Label>
          <SliderOutput>
            {({ state }) =>
              state.values
                .map((_, i) => state.getThumbValueLabel(i))
                .join(' – ')
            }
          </SliderOutput>
        </div>

        <div className="h-8 w-full cursor-pointer data-[disabled]:cursor-not-allowed">
          <SliderTrack
            className={cn(
              'absolute top-1/2 h-2 w-full -translate-y-1/2',
              classNames.track
            )}
          >
            {({ state }) =>
              state.values.map((_, i) => (
                <SliderThumb
                  className={cn('top-1/2', classNames.thumb)}
                  key={i}
                  index={i}
                  aria-label={thumbLabels?.[i]}
                />
              ))
            }
          </SliderTrack>
        </div>
      </RACSlider>
    );
  }
);
