'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import {
  Button,
  ButtonContext,
  FieldErrorContext,
  InputContext,
  Provider,
  type ValidationResult,
  Input as _Input,
} from 'react-aria-components';
import Select, {
  ClassNamesConfig,
  InputProps,
  MultiValueRemoveProps,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@react-aria/label';
import { useId } from '@react-aria/utils';
import { ComponentClassNames, cn, useClassNames } from '@marigold/system';
import { FieldBaseProps } from '../FieldBase/FieldBase';
import { HelpText } from '../HelpText/HelpText';
import { Label } from '../Label/Label';
import { ChevronsVertical } from '../icons/ChevronsVertical';
import { X } from '../icons/X';

export interface MultipleSelectProps extends Pick<
  FieldBaseProps<'label'>,
  'size' | 'variant' | 'label' | 'description' | 'errorMessage'
> {
  /**
   * Sets the width of the field.
   * @remarks `WidthProp`
   */
  width?: FieldBaseProps<'label'>['width'];
  /**
   * If the select should be disabled.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * If the select should be required.
   *
   * @default false
   */
  required?: boolean;
  /**
   * If the select should be read only.
   *
   * @default false
   */
  readOnly?: boolean;
  /**
   * If the select should throw an error.
   *
   * @default false
   */
  error?: boolean;
  /**
   * The items of the select.
   */
  items?: SelectProps['options'];
  /**
   * Set a error message for the select.
   */
  errorMessage?: string | ((validation: ValidationResult) => string);
  /**
   * The placdeholder of the select when it is empty.
   */
  placeholder?: string;
  /**
   * Items that should be selected by default (uncontrolled).
   */
  defaultSelectedItems?: SelectProps['defaultValue'];
  /**
   * Selected items (controlled):
   */
  selectedItems?: SelectProps['value'];
  /**
   * Input text that should be set by default.
   */
  defaultValue?: SelectProps['defaultInputValue'];
  /**
   * Handler that is called when the input changes.
   */
  onChange?: SelectProps['onInputChange'];
  /**
   * Provides content to display when there are no items in the list.
   */
  emptyState?: (obj: { inputValue: string }) => ReactNode;
  /**
   * Handler that is called when the selection changes.
   */
  onSelectionChange?: SelectProps['onChange'];

  /** Focus the control when it is mounted */
  autoFocus?: SelectProps['autoFocus'];
  /**
   * Override the built-in logic to detect whether an option is disabled
   * */
  isOptionDisabled?: SelectProps['isOptionDisabled'];
  /**
   * Text to display when there are no options
   * */
  noOptionsMessage?: SelectProps['noOptionsMessage'];
  /**
   * Handle blur events on the control
   */
  onBlur?: SelectProps['onBlur'];
  /**
   * Handle focus events on the control
   */
  onFocus?: SelectProps['onFocus'];
  /**
   * HTML ID of an element containing an error message related to the input*
   */
  'aria-errormessage'?: SelectProps['aria-errormessage'];
  /**
   * Indicate if the value entered in the field is invalid *
   */
  'aria-invalid'?: SelectProps['aria-invalid'];
  /**
   * Aria label (for assistive tech)
   */
  'aria-label'?: SelectProps['aria-label'];
  /**
   * HTML ID of an element that should be used as the label (for assistive tech)
   */
  'aria-labelledby'?: SelectProps['aria-labelledby'];
  /**
   * Used to set the priority with which screen reader should treat updates to live regions. The possible settings are: off, polite (default) or assertive
   */
  'aria-live'?: SelectProps['aria-live'];
  /**
   * Customise the messages used by the aria-live component
   */
  ariaLiveMessages?: SelectProps['ariaLiveMessages'];
}

const propsToBeRemoved = [
  'clearValue',
  'getStyles',
  'getClassNames',
  'getValue',
  'hasValue',
  'isMulti',
  'isRtl',
  'selectOption',
  'selectProps',
  'setValue',
  'isDisabled',
  'isHidden',
  'cx',
];
const Input = ({ innerRef, placeholder, hasValue, ...props }: InputProps) => {
  // innerRef is needed for focusing the input
  const inputProps = Object.entries(props).reduce(
    (acc: Record<string, any>, [key, value]) => {
      if (!propsToBeRemoved.includes(key)) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>
  );

  return (
    <_Input
      disabled={props.isDisabled}
      ref={innerRef}
      placeholder={!hasValue ? placeholder : ''}
      {...inputProps}
    />
  );
};

const MultiValueRemove = ({ innerProps }: MultiValueRemoveProps) => {
  return (
    <Button slot="remove" {...(innerProps as any)}>
      <X size="16" />
    </Button>
  );
};

const getClassNames = (
  classNames: ComponentClassNames<'MultiSelect'>
): ClassNamesConfig => ({
  control: () =>
    cn(
      'relative flex items-center box-border flex-wrap justify-between',
      classNames.container
    ),
  container: () => 'pointer-events-auto',
  indicatorSeparator: () => 'hidden',
  menu: () => cn('b', classNames.listContainer),
  menuList: () =>
    cn('overflow-y-auto sm:max-h-[75vh] lg:max-h-[45vh] p-0', classNames.list),
  multiValue: () => cn(classNames.tag, 'm-0 '),
  multiValueLabel: () => 'p-0',
  option: ({ isFocused }) => cn(classNames.option, { isFocused: isFocused }),
  placeholder: () => 'hidden',
  valueContainer: () => classNames.valueContainer,
});

/**
 * @deprecated Use `TagField` instead. Will be removed in a future major version.
 */
export const Multiselect = ({
  disabled,
  readOnly = false,
  items,
  selectedItems,
  defaultSelectedItems,
  defaultValue,
  error,
  errorMessage,
  size,
  variant,
  placeholder,
  description,
  emptyState,
  onChange,
  onSelectionChange,
  width,
  ...rest
}: MultipleSelectProps) => {
  const classNames = useClassNames({
    component: 'MultiSelect',
    size,
    variant,
  });

  const props = {
    options: items,
    defaultInputValue: defaultValue,
    defaultValue: defaultSelectedItems,
    value: selectedItems,
    noOptionsMessage: emptyState,
    onInputChange: onChange,
    onChange: onSelectionChange,
    ...rest,
  };

  let { labelProps, fieldProps } = useField({
    label: props.label,
    errorMessage,
  });

  return (
    <Provider
      values={[
        [
          FieldErrorContext,
          {
            isInvalid: !!error,
            validationDetails: {} as any,
            validationErrors: [],
          },
        ],
        [
          InputContext,
          {
            ...fieldProps,
            placeholder,
            className: classNames.input,
          },
        ],
        [
          ButtonContext,
          {
            // react-select doesn't handle readonly so we had to do it manually here
            // keep to the button disabled in read only to prevent menu from opening
            isDisabled: disabled || readOnly,
            className: cn('flex items-center', classNames.closeButton),
          },
        ],
      ]}
    >
      <div
        className={cn(classNames.field, 'group/field', `w-${width}`)}
        data-required={props.required}
        data-invalid={error}
        data-readonly={readOnly}
      >
        {props.label && <Label {...labelProps}>{props.label}</Label>}
        <Select
          {...props}
          styles={{
            control: () => ({ display: 'flex' }),
            menu: () => ({
              boxSizing: 'border-box',
              position: 'absolute',
              top: '100%',
              width: '100%',
              zIndex: 20, // react-select requires inline style; matches z-20 token
            }),
            // Return empty object to reset react-select styles
            valueContainer: base => ({ ...base }),
            container: base => ({ ...base, pointerEvents: 'auto' }),
            menuList: () => ({}),
            // eslint-disable-next-line no-empty-pattern
            option: ({}) => ({}),
            multiValue: () => ({}),
            multiValueLabel: () => ({}),
          }}
          inputId={fieldProps.id}
          aria-invalid={error}
          isClearable={false}
          // Used to solve hydration react-select problem in next 15
          instanceId={useId()}
          isSearchable={!readOnly}
          isMulti
          closeMenuOnSelect={false}
          classNames={getClassNames(classNames)}
          menuIsOpen={readOnly ? false : undefined}
          isDisabled={disabled}
          components={{
            Input,
            MultiValueRemove,
            // eslint-disable-next-line react/prop-types
            DropdownIndicator: ({ innerProps, isDisabled }) => (
              <button
                {...(innerProps as ButtonHTMLAttributes<HTMLButtonElement>)}
                disabled={isDisabled}
                className={classNames.icon}
              >
                <ChevronsVertical size="16" />
              </button>
            ),
          }}
        />
        <HelpText description={description} errorMessage={errorMessage} />
      </div>
    </Provider>
  );
};
