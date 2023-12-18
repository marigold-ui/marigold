import {
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  forwardRef,
} from 'react';
import React from 'react';
import { ComboBox, ComboBoxStateContext, Key } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { FieldBase, FieldBaseProps } from '../FieldBase/_FieldBase';
import { Input } from '../Input';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay/Popover';
import { AutocompleteClearButton } from './ClearButton';

// Search Input (we can't use our SearchField because of FieldBase)
//----------------
interface SearchInputProps {
  onSubmit?: (key: Key | null, value: string | null) => void;
  ref?: Ref<HTMLInputElement> | undefined;
  placeholder?: string;
}
const SearchInput = ({ onSubmit, placeholder, ref }: SearchInputProps) => {
  const state = React.useContext(ComboBoxStateContext);

  return (
    <Input
      ref={ref}
      icon={<SearchIcon />}
      action={
        state?.inputValue !== '' ? <AutocompleteClearButton /> : undefined
      }
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
        }
        if (e.key === 'Enter') {
          if (state.selectionManager.focusedKey === null) {
            onSubmit?.(null, state.inputValue);
          }
        }
      }}
    />
  );
};

// Search Icon
//----------------
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

type RemovedProps =
  | 'className'
  | 'style'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly'
  | 'inputValue'
  | 'onInputChange'
  | 'defaultValue'
  | 'validate'
  | 'validationState';

export interface AutocompleteProps
  extends Omit<RAC.ComboBoxProps<object>, RemovedProps>,
    Pick<
      FieldBaseProps<'label'>,
      'width' | 'label' | 'description' | 'errorMessage'
    > {
  defaultValue?: RAC.ComboBoxProps<object>['defaultInputValue'];
  value?: RAC.ComboBoxProps<object>['inputValue'];
  onChange?: RAC.ComboBoxProps<object>['onInputChange'];
  disabled?: RAC.ComboBoxProps<object>['isDisabled'];
  required?: RAC.ComboBoxProps<object>['isRequired'];
  error?: RAC.ComboBoxProps<object>['isInvalid'];
  readOnly?: RAC.ComboBoxProps<object>['isReadOnly'];
  variant?: string;
  size?: string;
  /**
   * Handler that is called when the SearchAutocomplete is submitted.
   *
   * A `key` will be passed if the submission is a selected item (e.g. a user
   * clicks or presses enter on an option). If the input is a custom `value`, `key` will be `null`.
   *
   * A `value` will be passed if the submission is a custom value (e.g. a user
   * types then presses enter). If the input is a selected item, `value` will be `null`.
   */
  onSubmit?: (value: string | number | null, key: Key | null) => void;
}

interface AutocompleteComponent
  extends ForwardRefExoticComponent<
    AutocompleteProps & RefAttributes<HTMLInputElement>
  > {
  Item: typeof ListBox.Item;
}
const _Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      children,
      defaultValue,
      value,
      onChange,
      onSubmit,
      disabled,
      error,
      readOnly,
      required,
      ...rest
    }: AutocompleteProps,
    ref
  ) => {
    const props: RAC.ComboBoxProps<object> = {
      onSelectionChange: key => key !== null && onSubmit?.(key, null),
      defaultInputValue: defaultValue,
      inputValue: value,
      onInputChange: onChange,
      allowsCustomValue: true,
      isDisabled: disabled,
      isInvalid: error,
      isReadOnly: readOnly,
      isRequired: required,
      ...rest,
    };

    return (
      <>
        <FieldBase as={ComboBox} {...props}>
          <SearchInput onSubmit={onSubmit} ref={ref} />
          <Popover>
            <ListBox>{children}</ListBox>
          </Popover>
        </FieldBase>
      </>
    );
  }
) as AutocompleteComponent;

_Autocomplete.Item = ListBox.Item;

export { _Autocomplete as Autocomplete };
