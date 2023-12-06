import { ReactElement, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { SearchField } from 'react-aria-components';

import { WidthProp } from '@marigold/system';

import { FieldBase, FieldBaseProps } from '../FieldBase/_FieldBase';
import { Input } from '../Input/_Input';

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

const SearchIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={24}
    height={24}
    {...props}
  >
    <path d="M16.1865 14.5142H15.3057L14.9936 14.2131C16.0862 12.9421 16.744 11.292 16.744 9.497C16.744 5.49443 13.4996 2.25 9.497 2.25C5.49443 2.25 2.25 5.49443 2.25 9.497C2.25 13.4996 5.49443 16.744 9.497 16.744C11.292 16.744 12.9421 16.0862 14.2131 14.9936L14.5142 15.3057V16.1865L20.0888 21.75L21.75 20.0888L16.1865 14.5142ZM9.49701 14.5142C6.72085 14.5142 4.47986 12.2732 4.47986 9.49701C4.47986 6.72085 6.72085 4.47986 9.49701 4.47986C12.2732 4.47986 14.5142 6.72085 14.5142 9.49701C14.5142 12.2732 12.2732 14.5142 9.49701 14.5142Z" />
  </svg>
);

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
        <Input ref={ref} icon={<SearchIcon />} />
      </FieldBase>
    );
  }
);

export { _SearchField as SearchField };
