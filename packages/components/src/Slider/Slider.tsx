import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import {
  Slider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components/Slider';
import { WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { Label } from '../Label/Label';

export interface SliderProps<T>
  extends
    Omit<
      RAC.SliderProps<T>,
      'children' | 'isDisabled' | 'orientation' | 'style'
    >,
    Pick<FieldBaseProps<'label'>, 'description'> {
  variant?: string;
  size?: string;

  /**
   * The `name` attribute for the slider input(s), used for form submission.
   * - For single-thumb sliders, provide a string.
   * - For range sliders (two thumbs), provide a tuple of two strings, one for each thumb.
   */
  name?: string | [string, string];

  /**
   * Aria labels for the thumbs in the slider.
   */
  thumbLabels?: string | [string, string];

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   *
   * Numeric/scale values are spacing-scale tokens, not pixels: `width={64}`
   * resolves to `calc(var(--spacing) * 64)` ~= 16rem (256px), not 64px.
   * @default full
   */
  width?: WidthProp['width'];

  /**
   * If `true`, the input is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Set the label of the slider.
   */
  label?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

const _Slider = <T extends number | number[]>({
  variant,
  size,
  width = 'full',
  disabled,
  label,
  name,
  thumbLabels,
  ref,
  ...rest
}: SliderProps<T>) => {
  const classNames = useClassNames({
    component: 'Slider',
    variant,
    size,
  });

  const names = Array.isArray(name) ? name : [name];
  const props = {
    isDisabled: disabled,
    ...rest,
  } satisfies RAC.SliderProps<T>;

  return (
    <FieldBase
      as={Slider}
      width={width}
      className={cn(
        'grid w-(--container-width) grid-cols-[auto_1fr] gap-y-1',
        classNames.container
      )}
      ref={ref}
      {...props}
    >
      {label && <Label>{label}</Label>}
      <SliderOutput className={cn('flex justify-end', classNames.output)}>
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(' - ')
        }
      </SliderOutput>

      <SliderTrack
        className={cn(
          'relative col-span-2 h-2 w-full',
          classNames.track,
          // Inset the track by half the thumb width (thumb is `size-5` → 10px)
          // so the thumb stays within the Slider's own box at the min/max
          // positions. Without this the thumb overhangs the track ends and
          // gets clipped by any ancestor scroll container (e.g.
          // `Drawer.Content`, whose `overflow-y: auto` promotes `overflow-x`
          // to a clipping value). `w-auto` lets the grid item stretch to the
          // column minus the margin.
          'mx-2.5 w-auto'
        )}
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
                name={names?.[i]}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </FieldBase>
  );
};

export { _Slider as Slider };
