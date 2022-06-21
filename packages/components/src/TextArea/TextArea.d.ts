import { AriaTextFieldProps } from '@react-types/textfield';
import { ThemeExtension } from '@marigold/system';
import { ComponentProps } from '@marigold/types';
import { FieldBaseProps } from '../FieldBase';
export interface TextAreaThemeExtension extends ThemeExtension<'TextArea'> {}
/**
 * `react-aria` has a slightly different API for the above events.
 * Thus, we adjust our regular props to match them.
 */
export declare type CustomTextAreEvents =
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onCopy'
  | 'onSelect'
  | 'onPaste'
  | 'onCut'
  | 'onCompositionStart'
  | 'onCompositionUpdate'
  | 'onCompositionEnd'
  | 'onBeforeInput'
  | 'onInput';
export interface TextAreaProps
  extends Omit<
      ComponentProps<'textarea'>,
      'value' | 'defaultValue' | 'size' | CustomTextAreEvents
    >,
    Pick<AriaTextFieldProps, CustomTextAreEvents>,
    Pick<FieldBaseProps, 'label' | 'description' | 'error' | 'errorMessage'> {
  variant?: string;
  size?: string;
  width?: string;
  value?: string;
  defaultValue?: string;
}
export declare const TextArea: ({
  variant,
  size,
  width,
  disabled,
  required,
  readOnly,
  error,
  rows,
  ...props
}: TextAreaProps) => JSX.Element;
//# sourceMappingURL=TextArea.d.ts.map
