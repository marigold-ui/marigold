import React, { ReactNode, Ref, forwardRef } from 'react';
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
import { FieldBase, FieldBaseProps } from '../FieldBase';
import { Label } from '../Label';

export interface SliderProps<T>
  extends Omit<RAC.SliderProps<T>, 'isDisabled' | 'orientation'>,
    Pick<FieldBaseProps<'label'>, 'description'> {
  /**
   * Labels for the thumbs in the slider. Also used for the name when submitting the form.
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

  /**
   * @deprecated Will be removed in the next major version. Use `label` prop instead.
   */
  children?: ReactNode;

  /**
   * Set the label of the slider.
   */
  label?: string;
}

const _Slider = forwardRef(
  <T extends number | number[]>(
    {
      thumbLabels,
      variant,
      size,
      width = 'full',
      disabled,
      label,
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
      <FieldBase
        as={Slider}
        className={cn(
          'grid grid-cols-[auto_1fr] gap-y-1',
          classNames.container,
          twWidth[width]
        )}
        ref={ref}
        {...props}
      >
        <Label>
          {(props.children && (props.children as React.ReactNode)) ||
            (label && (label as React.ReactNode))}
        </Label>
        <SliderOutput className={cn('flex justify-end', classNames.output)}>
          {({ state }) =>
            state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')
          }
        </SliderOutput>

        <SliderTrack
          className={cn('relative col-span-2 h-2 w-full', classNames.track)}
        >
          {({ state }) => (
            <>
              {/* track */}
              <div
                className={cn(
                  'absolute top-[50%] h-2 w-full translate-y-[-50%]',
                  classNames.track
                )}
              />
              {/* fill */}
              <div
                className={cn(
                  'absolute top-[50%] h-2 translate-y-[-50%]',
                  classNames.selectedTrack
                )}
                style={
                  state.values.length === 1
                    ? { width: state.getThumbPercent(0) * 100 + '%' }
                    : {
                        width:
                          state.getThumbPercent(1) * 100 -
                          state.getThumbPercent(0) * 100 +
                          '%',
                        left: state.getThumbPercent(0) * 100 + '%',
                      }
                }
              />
              {state.values.map((_, i) => (
                <SliderThumb
                  className={cn('top-1/2 cursor-pointer', classNames.thumb)}
                  key={i}
                  index={i}
                  aria-label={thumbLabels?.[i]}
                  name={thumbLabels?.[i]}
                />
              ))}
            </>
          )}
        </SliderTrack>
      </FieldBase>
    );
  }
);

export { _Slider as Slider };
