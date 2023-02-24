import React, { useRef } from 'react';

import { useSearchAutocomplete } from '@react-aria/autocomplete';
import { useFilter } from '@react-aria/i18n';
import { useComboBoxState } from '@react-stately/combobox';
import { Item } from '@react-stately/collections';
import { SearchAutocompleteProps } from '@react-types/autocomplete';

import { Box } from '@marigold/system';

import { Popover } from '../Overlay';
import { FieldBase } from '../FieldBase';
import { ListBox } from '../ListBox';
import { ClearButton } from './ClearButton';

export interface AutocompleteProps
  extends Omit<
    SearchAutocompleteProps<object>,
    | 'isDisabled'
    | 'isRequired'
    | 'isReadonly'
    | 'validationState'
    | 'icon'
    | 'onInputChange'
  > {
  onChange?: SearchAutocompleteProps<object>['onInputChange'];
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
}

export const Autocomplete = ({
  disabled,
  required,
  readOnly,
  error,
  onChange,
  ...rest
}: AutocompleteProps) => {
  const { contains } = useFilter({ sensitivity: 'base' });
  const props = {
    ...rest,
    onInputChange: onChange,
    isDisabled: disabled,
    isRequired: required,
    isReadOnly: readOnly,
    validationState: error ? 'invalid' : 'valid',
  } as const;

  const state = useComboBoxState({
    ...props,
    allowsCustomValue: true,
    defaultFilter: contains,
  });

  const inputRef = useRef(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);

  const { inputProps, listBoxProps, labelProps, clearButtonProps } =
    useSearchAutocomplete(
      {
        ...props,
        popoverRef,
        listBoxRef,
        inputRef,
      },
      state
    );
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
      >
        <Box>
          <Box as="input" {...inputProps} ref={inputRef} />
          <ClearButton
            preventFocus
            disabled={isDisabled}
            {...restClearButtonProps}
          />
        </Box>
      </FieldBase>
      <Popover
        state={state}
        ref={popoverRef}
        triggerRef={inputRef}
        scrollRef={listBoxRef}
      >
        <ListBox ref={listBoxRef} state={state} {...listBoxProps} />
      </Popover>
    </>
  );
};

Autocomplete.Item = Item;
