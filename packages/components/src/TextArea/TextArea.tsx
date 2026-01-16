import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { TextArea, TextField } from 'react-aria-components';
import { WidthProp, useClassNames } from '@marigold/system';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';

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
  | 'defaultValue';

export interface TextAreaProps
  extends
    Omit<RAC.TextFieldProps, RemovedProps>,
    Pick<RAC.TextAreaProps, 'rows'>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  variant?: string;
  size?: string;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default full
   */
  width?: WidthProp['width'];

  /**
   * If `true`, the textarea is disabled.
   * @default false
   */
  disabled?: RAC.TextFieldProps['isDisabled'];

  /**
   * If `true`, the textarea is required.
   * @default false
   */
  required?: RAC.TextFieldProps['isRequired'];

  /**
   * If `true`, the field is considered invalid and if set the `errorMessage` is shown instead of the `description`.
   * @default false
   */
  error?: RAC.TextFieldProps['isInvalid'];

  /**
   * If `true`, the textarea is read-only.
   * @default false
   */
  readOnly?: RAC.TextFieldProps['isReadOnly'];

  /**
   * The value of the textarea.
   * @default none
   */
  value?: string;

  /**
   * The default value of the textarea.
   * @default none
   */
  defaultValue?: string;

  /**
   * Placeholder text for the textarea.
   * @default none
   */
  placeholder?: string;

  /**
   * Sets the number of rows in the textarea.
   * @default none
   */
  rows?: number;
}

// Component
// ---------------
const _TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant,
      size,
      required,
      disabled,
      readOnly,
      error,
      rows,
      ...rest
    }: TextAreaProps,
    ref
  ) => {
    const classNames = useClassNames({ component: 'TextArea', variant, size });

    const props: RAC.TextFieldProps = {
      isDisabled: disabled,
      isReadOnly: readOnly,
      isInvalid: error,
      isRequired: required,
      ...rest,
    };

    return (
      <FieldBase as={TextField} {...props} variant={variant} size={size}>
        <TextArea className={classNames} ref={ref} rows={rows} />
      </FieldBase>
    );
  }
);

export { _TextArea as TextArea };
