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
  | 'defaultValue';

export interface TextFieldProps
  extends Omit<RAC.TextFieldProps, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  disabled?: RAC.TextFieldProps['isDisabled'];
  required?: RAC.TextFieldProps['isRequired'];
  error?: RAC.TextFieldProps['isInvalid'];
  readOnly?: RAC.TextFieldProps['isReadOnly'];
  min?: HTMLInputElement['min'];
  max?: HTMLInputElement['max'];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
}

// Component
// ---------------
const _TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant,
      size,
      required,
      disabled,
      readOnly,
      error,
      ...rest
    }: TextFieldProps,
    ref
  ) => {
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
