import React, { Key, useRef } from 'react';

import { useSearchAutocomplete } from '@react-aria/autocomplete';
import { useFilter } from '@react-aria/i18n';
import { useComboBoxState } from '@react-stately/combobox';
import { Item } from '@react-stately/collections';
import { SearchAutocompleteProps } from '@react-types/autocomplete';

import { FieldBase } from '../FieldBase';
import { Input } from '../Input';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay';

import { ClearButton } from './ClearButton';

// Search Icon
// ---------------
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

// Props
// ---------------
export interface AutocompleteProps
  extends Omit<
    SearchAutocompleteProps<object>,
    | 'isDisabled'
    | 'isRequired'
    | 'isReadonly'
    | 'validationState'
    | 'icon'
    | 'onInputChange'
    | 'inputValue'
    | 'defaultInputValue'
  > {
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
  defaultValue?: SearchAutocompleteProps<object>['defaultInputValue'];
  value?: SearchAutocompleteProps<object>['inputValue'];
  /**
   * Handler that is called when the input value changes.
   */
  onChange?: SearchAutocompleteProps<object>['onInputChange'];
  /**
   * Handler that is called when the SearchAutocomplete is submitted.
   *
   * A `key` will be passed if the submission is a selected item (e.g. a user
   * clicks or presses enter on an option). If the input is a custom `value`, `key` will be `null`.
   *
   * A `value` will be passed if the submission is a custom value (e.g. a user
   * types then presses enter). If the input is a selected item, `value` will be `null`.
   */
  onSubmit?: (key: Key | null, value: string | null) => void;
  variant?: string;
  size?: string;
  width?: string;
}

export const Autocomplete = ({
  disabled,
  required,
  readOnly,
  error,
  onChange,
  value,
  defaultValue,
  variant,
  size,
  width,
  ...rest
}: AutocompleteProps) => {
  const { contains } = useFilter({ sensitivity: 'base' });
  const props = {
    ...rest,
    onInputChange: onChange,
    inputValue: value,
    defaultInputValue: defaultValue,
    isDisabled: disabled,
    isRequired: required,
    isReadOnly: readOnly,
    validationState: error ? 'invalid' : 'valid',
  } as const;

  const state = useComboBoxState({
    ...props,
    defaultFilter: contains,
    allowsCustomValue: true,
    onSelectionChange: key => key !== null && props.onSubmit?.(key, null),
    selectedKey: undefined,
    defaultSelectedKey: undefined,
  });

  const inputRef = useRef(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);

  const { inputProps, listBoxProps, labelProps, clearButtonProps } =
    useSearchAutocomplete(
      {
        ...props,

        onSubmit: (value: string | null, key: Key | null) =>
          props.onSubmit?.(key, value),
        popoverRef,
        listBoxRef,
        inputRef,
      },
      state
    );
  // TODO: until `react-aria` gives us error and description props.
  const errorMessageProps = { 'aria-invalid': error };
  const { isDisabled, ...restClearButtonProps } = clearButtonProps;

  return (
    <>
      <FieldBase
        label={props.label}
        labelProps={labelProps}
        description={props.description}
        error={error}
        errorMessage={props.errorMessage}
        errorMessageProps={errorMessageProps}
        disabled={disabled}
        width={width}
      >
        <Input
          /**
           * We use `size` for styles which is a string, not like
           * the regular HTML attribute, which is a number
           */
          {...(inputProps as any)}
          ref={inputRef}
          icon={<SearchIcon />}
          action={
            state.inputValue !== '' ? (
              <ClearButton
                preventFocus
                disabled={isDisabled}
                {...restClearButtonProps}
              />
            ) : null
          }
        />
      </FieldBase>
      <Popover
        state={state}
        ref={popoverRef}
        triggerRef={inputRef}
        scrollRef={listBoxRef}
        isNonModal
      >
        <ListBox ref={listBoxRef} state={state} {...listBoxProps} />
      </Popover>
    </>
  );
};

Autocomplete.Item = Item;
