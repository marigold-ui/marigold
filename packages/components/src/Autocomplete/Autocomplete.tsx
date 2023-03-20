import React, { Key, useRef } from 'react';

import { useSearchAutocomplete } from '@react-aria/autocomplete';
import { useFilter } from '@react-aria/i18n';
import { useComboBoxState } from '@react-stately/combobox';
import { Item } from '@react-stately/collections';
import { SearchAutocompleteProps } from '@react-types/autocomplete';
import { SVG } from '@marigold/system';

import { FieldBase } from '../FieldBase';
import { Input } from '../Input';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay';

import { ClearButton } from './ClearButton';

// Search Icon
// ---------------
const SearchIcon = () => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    height={16}
    width={16}
  >
    <path
      fillRule="evenodd"
      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
      clipRule="evenodd"
    />
  </SVG>
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
  // Fix until `react-aria` gives us error and description props.
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
        <Input>
          <SearchIcon />
          <Input.Field {...inputProps} ref={inputRef} />
          {state.inputValue !== '' && (
            <ClearButton
              preventFocus
              disabled={isDisabled}
              {...restClearButtonProps}
            />
          )}
        </Input>
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
