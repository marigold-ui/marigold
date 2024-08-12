import React, { Ref, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import {
  Slider,
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
import { Label } from '../Label';

export interface SliderProps<T>
  extends Omit<RAC.SliderProps<T>, 'isDisabled' | 'label'> {
  /**
   * Labels for the thumbs in the slider.
   */
  thumbLabels?: string[];

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default full
   */
  width?: WidthProp['width'];

  variant?: string;
  size?: string;

  /**
   * If `true`, the input is disabled.
   * @default false
   */
  disabled?: boolean;
}

const _Slider = forwardRef(
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
    const props: RAC.SliderProps = {
      isDisabled: disabled,
      ...rest,
    };
    return (
      <Slider
        className={cn(
          'grid grid-cols-[auto_1fr] gap-y-1',
          classNames.container,
          twWidth[width]
        )}
        ref={ref}
        {...props}
      >
        <Label>{props.children as React.ReactNode}</Label>
        <SliderOutput className={cn('flex justify-end', classNames.output)}>
          {({ state }) =>
            state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')
          }
        </SliderOutput>

        <SliderTrack
          className={cn('relative col-span-2 h-2 w-full', classNames.track)}
        >
          {({ state }) =>
            state.values.map((_, i) => (
              <SliderThumb
                className={cn('top-1/2 cursor-pointer', classNames.thumb)}
                key={i}
                index={i}
                aria-label={thumbLabels?.[i]}
              />
            ))
          }
        </SliderTrack>
      </Slider>
    );
  }
);

export { _Slider as Slider };
