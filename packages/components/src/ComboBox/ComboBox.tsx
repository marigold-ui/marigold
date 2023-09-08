import React, { useState } from 'react';

import { useButton } from '@react-aria/button';
import { useComboBox } from '@react-aria/combobox';
import { useFilter } from '@react-aria/i18n';

import { Item } from '@react-stately/collections';
import { useComboBoxState } from '@react-stately/combobox';

import { ComboBoxProps as ComboBoxPropsI } from '@react-types/combobox';

import { WidthProp } from '@marigold/system';

import { Button } from '../Button';
import { ChevronDown } from '../Chevron';
import { FieldBase } from '../FieldBase';
import { Input } from '../Input';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay';
import { Tag } from '../TagGroup';

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
  width?: WidthProp['width'];
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

interface MultiSelectProps
  extends Omit<
    ComboBoxProps,
    'children' | 'selectedKey' | 'defaultSelectedKey' | 'items'
  > {
  defaultSelectedValues?: unknown[];
  selectedValues?: object[];
  options: object[];
}

export const MulitSelect = ({
  defaultSelectedValues,
  selectedValues,
  options,
  ...props
}: MultiSelectProps) => {
  const [optionsValue, setOptionsValue] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState(selectedValues ?? []);

  const selectOption = (value: unknown) => {
    if (!value) return;
    setSelectedOptions((prev: any) => [value, ...prev]);
    setOptionsValue(prev =>
      prev.filter((option: { name: string }) => option.name !== value)
    );
  };

  const onRemove = (value: unknown) => {
    setSelectedOptions(prevItems => prevItems.filter(item => item !== value));
  };

  console.log('selectedOptions', selectedOptions);

  return (
    <>
      {selectOption.length && (
        <Tag.Group
          items={selectedOptions.map(element => ({ name: element }))}
          onRemove={keys => {
            console.log('keys', keys);
          }}
        >
          {item => <Tag key={Math.random()}>{item.name}</Tag>}
        </Tag.Group>
      )}
      <ComboBox
        onChange={value => {
          selectOption(value);
        }}
        items={optionsValue}
        {...props}
      >
        {(item: { name: string }) => (
          <ComboBox.Item key={item.name}>{item.name}</ComboBox.Item>
        )}
      </ComboBox>
    </>
  );
};

ComboBox.Item = Item;
