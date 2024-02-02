import { ReactElement, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { SearchField } from 'react-aria-components';

import { WidthProp } from '@marigold/system';

import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { SearchInput } from '../Input/SearchInput';

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

export interface SearchFieldProps
  extends Omit<RAC.SearchFieldProps, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  icon?: ReactElement;
  action?: ReactElement;
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  error?: RAC.SearchFieldProps['isInvalid'];
  disabled?: RAC.SearchFieldProps['isDisabled'];
  required?: RAC.SearchFieldProps['isRequired'];
  readOnly?: RAC.SearchFieldProps['isReadOnly'];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
}

const _SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    { disabled, required, readOnly, error, action, ...rest }: SearchFieldProps,
    ref
  ) => {
    const props: RAC.SearchFieldProps = {
      ...rest,
      isDisabled: disabled,
      isRequired: required,
      isReadOnly: readOnly,
      isInvalid: error,
    };

    return (
      <FieldBase as={SearchField} {...props}>
        <SearchInput ref={ref} />
      </FieldBase>
    );
  }
);

export { _SearchField as SearchField };
