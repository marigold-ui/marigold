import React from 'react';
import { useComboBoxState } from '@react-stately/combobox';
import { useComboBox } from '@react-aria/combobox';
import { ComboBoxProps as ComboBoxPropsI } from '@react-types/combobox';
import { useFilter } from '@react-aria/i18n';
import { useButton } from '@react-aria/button';

import { ListBox } from '../ListBox';
import { Popover } from '../Overlay';
import { FieldBase } from '../FieldBase';
import { Input } from '../Input';
import { Button } from '../Button';

import { Item } from '@react-stately/collections';
import { ChevronDown } from '../Chevron';

export interface ComboBoxProps
  extends Omit<
    ComboBoxPropsI<object>,
    | 'isDisabled'
    | 'isRequired'
    | 'isReadOnly'
    | 'defaultInputValue'
    | 'inputValue'
    | 'onInputChange'
  > {
  variant?: string;
  size?: string;
  error?: boolean;
  width?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  defaultValue?: ComboBoxPropsI<object>['defaultInputValue'];
  value?: ComboBoxPropsI<object>['inputValue'];
  onChange?: ComboBoxPropsI<object>['onInputChange'];
}

export const ComboBox = ({
  error,
  width,
  disabled,
  required,
  readOnly,
  defaultValue,
  value,
  onChange,
  variant,
  size,
  ...rest
}: ComboBoxProps) => {
  const props: ComboBoxPropsI<object> = {
    isDisabled: disabled,
    isRequired: required,
    isReadOnly: readOnly,
    defaultInputValue: defaultValue,
    inputValue: value,
    onInputChange: onChange,
    ...rest,
  };

  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({ ...props, defaultFilter: contains });
  const buttonRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const listBoxRef = React.useRef(null);
  const popoverRef = React.useRef(null);

  const {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps,
  } = useComboBox(
    { ...props, inputRef, buttonRef, listBoxRef, popoverRef },
    state
  );

  // TODO: until `react-aria` gives us error and description props.
  const errorMessageProps = { 'aria-invalid': error };
  const { buttonProps } = useButton(triggerProps, buttonRef);
  const { label, description, errorMessage } = props;

  return (
    <>
      <FieldBase
        label={label}
        labelProps={labelProps}
        description={description}
        error={error}
        errorMessage={errorMessage}
        errorMessageProps={errorMessageProps}
        width={width}
      >
        <Input
          {...(inputProps as any)}
          ref={inputRef}
          action={
            <Button
              className="absolute right-2 h-4 w-4 border-none bg-transparent p-0"
              ref={buttonRef}
              {...buttonProps}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
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

ComboBox.Item = Item;
