import { AriaTextFieldProps } from '@react-types/textfield';
import { ComponentProps } from '@marigold/types';
import { FieldBaseProps } from '../FieldBase';
export interface TextFieldProps
  extends Omit<
      ComponentProps<'input'>,
      | 'value'
      | 'defaultValue'
      | 'onChange'
      | 'onFocus'
      | 'onBlur'
      | 'size'
      | 'width'
    >,
    /**
     * `react-aria` has a slightly different API for `onChange`, `onFocus`
     * and `onBlur` events. Thus, we adjust our regular props to match them.
     */
    Pick<AriaTextFieldProps, 'onChange' | 'onFocus' | 'onBlur'>,
    Pick<FieldBaseProps, 'label' | 'description' | 'error' | 'errorMessage'> {
  variant?: string;
  size?: string;
  width?: string;
  value?: string;
  defaultValue?: string;
}
export declare const TextField: ({
  variant,
  size,
  width,
  disabled,
  required,
  readOnly,
  error,
  ...props
}: TextFieldProps) => JSX.Element;
//# sourceMappingURL=TextField.d.ts.map
