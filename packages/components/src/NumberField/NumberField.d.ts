import React from 'react';
import { AriaNumberFieldProps } from '@react-types/numberfield';
import { ComponentProps } from '@marigold/types';
import { ThemeExtensionsWithParts } from '@marigold/system';
import { FieldBaseProps } from '../FieldBase';
export interface NumberFieldThemeExtension
  extends ThemeExtensionsWithParts<'NumberField', ['group', 'stepper']> {}
/**
 * `react-aria` has a slightly different API for some DOM props.
 * Thus, we adjust our regular props to match them.
 */
declare type CustomProps =
  | 'size'
  | 'width'
  | 'type'
  | 'value'
  | 'defaultValue'
  | 'step'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'min'
  | 'max';
export interface NumberFieldProps
  extends Omit<ComponentProps<'input'>, CustomProps>,
    Omit<AriaNumberFieldProps, 'isDisabled' | 'isRequired' | 'isReadOnly'>,
    Pick<FieldBaseProps, 'label' | 'description' | 'error' | 'errorMessage'> {
  variant?: string;
  size?: string;
  width?: string;
  hideStepper?: boolean;
}
export declare const NumberField: React.ForwardRefExoticComponent<
  NumberFieldProps & React.RefAttributes<HTMLInputElement>
>;
export {};
//# sourceMappingURL=NumberField.d.ts.map
