import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { TextArea, TextField } from 'react-aria-components';

import { WidthProp, useClassNames } from '@marigold/system';

import { FieldBase, FieldBaseProps } from '../FieldBase/_FieldBase';

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
  extends Omit<RAC.TextFieldProps, RemovedProps>,
    Pick<RAC.TextAreaProps, 'rows'>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  disabled?: RAC.TextFieldProps['isDisabled'];
  required?: RAC.TextFieldProps['isRequired'];
  error?: RAC.TextFieldProps['isInvalid'];
  readOnly?: RAC.TextFieldProps['isReadOnly'];
  value?: string;
  defaultValue?: string;
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
