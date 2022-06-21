import type { AriaRadioProps } from '@react-types/radio';
import {
  ThemeComponentProps,
  ThemeExtensionsWithParts,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';
export interface RadioThemeExtension
  extends ThemeExtensionsWithParts<'Radio', ['container', 'label', 'radio']> {}
export declare type CustomRadioProps =
  | 'size'
  | 'width'
  | 'type'
  | 'defaultChecked'
  | 'value'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyUp'
  | 'onKeyDown';
export interface RadioProps
  extends ThemeComponentProps,
    Omit<ComponentProps<'input'>, CustomRadioProps>,
    AriaRadioProps {
  width?: string;
  disabled?: boolean;
}
export declare const Radio: {
  ({ width, disabled, ...props }: RadioProps): JSX.Element;
  Group: ({
    children,
    orientation,
    size,
    variant,
    width,
    required,
    disabled,
    readOnly,
    error,
    ...rest
  }: import('./RadioGroup').RadioGroupProps) => JSX.Element;
};
//# sourceMappingURL=Radio.d.ts.map
