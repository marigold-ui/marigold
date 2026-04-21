import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { TextField } from 'react-aria-components';
import { WidthProp } from '@marigold/system';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { Input } from '../Input/Input';

// Props
// ---------------
type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly'
  | 'value'
  | 'defaultValue'
  | 'slot';

export interface TextFieldProps
  extends
    Omit<RAC.TextFieldProps, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  variant?: string;
  size?: string;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default full
   */
  width?: WidthProp['width'];

  /**
   * If `true`, the input is disabled.
   * @default false
   */
  disabled?: RAC.TextFieldProps['isDisabled'];

  /**
   * If `true`, the input is required.
   * @default false
   */
  required?: RAC.TextFieldProps['isRequired'];

  /**
   * If `true`, the field is considered invalid and if set the `errorMessage` is shown instead of the `description`.
   * @default false
   */
  error?: RAC.TextFieldProps['isInvalid'];

  /**
   * If `true`, the input is readOnly.
   * @default false
   */
  readOnly?: RAC.TextFieldProps['isReadOnly'];

  /**
   * The minimum value for the input field.
   * @default none
   */
  min?: HTMLInputElement['min'];

  /**
   * The maximum value for the input field.
   * @default none
   */
  max?: HTMLInputElement['max'];

  /**
   * The value of the input field.
   * @default none
   */
  value?: string;

  /**
   * The default value of the input field.
   * @default none
   */
  defaultValue?: string;

  /**
   * Placeholder text for the input field.
   * @default none
   */
  placeholder?: string;
}

// Component
// ---------------
const _TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ required, disabled, readOnly, error, ...rest }: TextFieldProps, ref) => {
    const props: RAC.TextFieldProps = {
      isDisabled: disabled,
      isReadOnly: readOnly,
      isInvalid: error,
      isRequired: required,
      ...rest,
    };

    return (
      <FieldBase as={TextField} {...props}>
        <Input ref={ref} />
      </FieldBase>
    );
  }
);

export { _TextField as TextField };
