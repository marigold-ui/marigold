import { ReactElement, RefObject, forwardRef, useRef } from 'react';

import { useSearchField } from '@react-aria/searchfield';

import { useSearchFieldState } from '@react-stately/searchfield';

import { SpectrumSearchFieldProps } from '@react-types/searchfield';
import { TextFieldRef } from '@react-types/textfield';

import { WidthProp, useStateProps } from '@marigold/system';

import { FieldBase } from '../FieldBase';
import { Input } from '../Input';

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

export interface SearchFieldInterface
  extends Omit<
    SpectrumSearchFieldProps,
    'isDisabled' | 'isRequired' | 'isReadOnly'
  > {
  action?: ReactElement | null;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
}

const SearchField = (
  {
    disabled,
    required,
    readOnly,
    width,
    error,
    action,
    ...rest
  }: SearchFieldInterface,
  ref: RefObject<TextFieldRef>
) => {
  const props = {
    ...rest,
    isDiabled: disabled,
    isRequired: required,
    isReadOnly: readOnly,
  };
  const state = useSearchFieldState(props);
  const inputRef = useRef(null);
  const { labelProps, descriptionProps, errorMessageProps, inputProps } =
    useSearchField(props, state, inputRef);

  const stateProps = useStateProps({
    error,
    required,
  });

  return (
    <FieldBase
      label={props.label}
      labelProps={labelProps}
      description={props.description}
      descriptionProps={descriptionProps}
      error={error}
      errorMessage={props.errorMessage}
      errorMessageProps={{ ...errorMessageProps, 'aria-invalid': error }}
      disabled={disabled}
      width={width}
      stateProps={stateProps}
    >
      <Input
        /**
         * We use `size` for styles which is a string, not like
         * the regular HTML attribute, which is a number
         */
        {...(inputProps as any)}
        ref={ref ? ref : inputRef}
        icon={<SearchIcon />}
        action={action}
        disabled={disabled}
      />
    </FieldBase>
  );
};

let _SearchField = forwardRef(SearchField);
export { _SearchField as SearchField };
