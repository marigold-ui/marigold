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
  const { isDisabled, ...restClearButtonProps } = clearButtonProps;
  return (
    <>
      <FieldBase
        label={props.label}
        labelProps={labelProps}
        description={props.description}
        error={error}
        errorMessage={props.errorMessage}
        disabled={disabled}
        width={width}
      >
        <Input
          {...(inputProps as any)}
          ref={inputRef}
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
