import React, { useRef } from 'react';

import { useSearchAutocomplete } from '@react-aria/autocomplete';
import { useButton } from '@react-aria/button';
import { useFilter } from '@react-aria/i18n';
import { useComboBoxState } from '@react-stately/combobox';
import { SearchAutocompleteProps } from '@react-types/autocomplete';
import { Item } from '@react-stately/collections';
import { ClearButton } from './ClearButton';

export interface AutocompleteProps
  extends Omit<SearchAutocompleteProps<object>, 'icon' | 'onInputChange'> {
  onChange?: SearchAutocompleteProps<object>['onInputChange'];
}

export const Autocomplete = ({ onChange, ...rest }: AutocompleteProps) => {
  const { contains } = useFilter({ sensitivity: 'base' });
  const props = {
    ...rest,
    onInputChange: onChange,
  };

  const state = useComboBoxState({
    ...props,
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

  return (
    <>
      <ClearButton preventFocus {...clearButtonProps} />
    </>
  );
};

Autocomplete.Item = Item;
