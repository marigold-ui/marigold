import { forwardRef } from 'react';
import React from 'react';
import { ComboBox, ComboBoxStateContext, Key } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { FieldBase } from '../FieldBase/_FieldBase';
import { Input } from '../Input';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay/Popover';
import { AutocompleteClearButton } from './ClearButton';
import {
  AutocompleteComponent,
  AutocompleteProps,
  SearchIcon,
} from './_Autocomplete';

export const _Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      children,
      defaultValue,
      value,
      onChange,
      onSubmit,
      ...rest
    }: AutocompleteProps,
    ref
  ) => {
    let state = React.useContext(ComboBoxStateContext);
    // [props, ref] = useContextProps(props, ref, InputContext);
    const props: RAC.ComboBoxProps<object> = {
      onSelectionChange: key => key !== null && onSubmit?.(key, null),
      defaultInputValue: defaultValue,
      inputValue: value,
      onInputChange: onChange,
      ...rest,
    };

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
    console.log('autocomplete props', props);
    return (
      <>
        <FieldBase as={ComboBox} {...props}>
          <Input
            icon={<SearchIcon />}
            action={value !== '' ? <AutocompleteClearButton /> : undefined}
          />
          <Popover>
            <ListBox>{children}</ListBox>
          </Popover>
        </FieldBase>
      </>
    );
  }
) as AutocompleteComponent;
