import {
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  forwardRef,
} from 'react';
import React from 'react';
import { ComboBox, ComboBoxStateContext, Key } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { FieldBase, FieldBaseProps } from '../FieldBase';
import { SearchInput } from '../Input/SearchInput';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay/Popover';

// Search Input (we can't use our SearchField because of FieldBase)
//----------------
interface AutocompleteInputProps {
  onSubmit?: (key: Key | null, value: string | null) => void;
  onClear?: () => void;
  ref?: Ref<HTMLInputElement> | undefined;
}
const AutocompleteInput = ({
  onSubmit,
  onClear,
  ref,
}: AutocompleteInputProps) => {
  const state = React.useContext(ComboBoxStateContext);

  return (
    <SearchInput
      ref={ref}
      className={{
        action: state?.inputValue === '' ? 'hidden' : undefined,
      }}
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
      onClear={() => {
        state?.setInputValue('');
        state?.setSelectedKey(null);
        onClear?.();
      }}
    />
  );
};

// Props
// ---------------
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
  onClear?: () => void;
  disabled?: RAC.ComboBoxProps<object>['isDisabled'];
  required?: RAC.ComboBoxProps<object>['isRequired'];
  error?: RAC.ComboBoxProps<object>['isInvalid'];
  readOnly?: RAC.ComboBoxProps<object>['isReadOnly'];
  variant?: string;
  size?: string;
  placeholder?: string;
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

// Component
// ---------------
const _Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      children,
      defaultValue,
      value,
      onChange,
      onClear,
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
      <FieldBase as={ComboBox} {...props}>
        <AutocompleteInput onSubmit={onSubmit} onClear={onClear} ref={ref} />
        <Popover>
          <ListBox>{children}</ListBox>
        </Popover>
      </FieldBase>
    );
  }
) as AutocompleteComponent;

_Autocomplete.Item = ListBox.Item;

export { _Autocomplete as Autocomplete };
