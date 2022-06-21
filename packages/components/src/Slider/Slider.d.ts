/**
 * Thanks to react-aria: https://react-spectrum.adobe.com/react-aria/useSlider.html
 */
import { ReactNode } from 'react';
import { AriaSliderProps } from '@react-types/slider';
import { ThemeExtensionsWithParts } from '@marigold/system';
import { ComponentProps } from '@marigold/types';
export interface SliderThemeExtension
  extends ThemeExtensionsWithParts<
    'Slider',
    ['track', 'thumb', 'label', 'output']
  > {}
export interface SliderProps
  extends Omit<
      ComponentProps<'input'>,
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
/**
 * The slider consists of two parts.
 * A label + the output value and the slider functionality itself.
 * The slider itself consists of a track line and a thumb.
 */
export declare const Slider: ({
  variant,
  size,
  width,
  ...props
}: SliderProps) => JSX.Element;
//# sourceMappingURL=Slider.d.ts.map
